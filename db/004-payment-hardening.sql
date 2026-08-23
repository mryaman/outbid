-- 004 — ödeme akışı sağlamlaştırma (23 Ağu 2026)
--
-- Sorun: Shopier taşıyıcı ürünleri stockQuantity=1 ile açılıyordu. Shopier ödeme
-- başlatıldığında stoğu rezerve ettiği için kullanıcı kart ekranından geri
-- dönüp tekrar denediğinde ürün "Tükendi" oluyor, Shopier onu mağaza köküne
-- atıyor ve kullanıcı "Bu mağazada ürün yok" ekranıyla karşılaşıyordu.
-- Uygulama tarafında stok 99'a çıkarıldı; bu da aynı taşıyıcı ürünün iki kez
-- satın alınmasını teorik olarak mümkün kılıyor. Bu dosya DB tarafını buna
-- hazırlıyor.
--
-- Supabase'e uygulandı: migration `payment_confirm_repeat_safe`.

-- 1) Tekrar ödemeye dayanıklı onay.
--    Eski hâli: pending 'paid' ise hemen duplicate dönüyordu → ikinci gerçek
--    ödeme yutuluyordu (para alınır, bid yazılmaz). Artık farklı payment_id
--    yeni bir bid açar; aynı payment_id (webhook tekrarı) sessizce elenir.
--    Ayrıca amount_mismatch artık ödenmiş bir satırı 'failed' yapamaz.
create or replace function public.confirm_payment_by_product(
  p_secret text, p_product_id text, p_payment_id text, p_paid_cents integer
) returns json
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_secret text; v pending_payments%rowtype; v_listing uuid; v_expected int;
  v_already boolean; v_new_bid boolean := false;
begin
  select value into v_secret from payment_secrets where key = 'rpc_secret';
  if v_secret is null or p_secret is distinct from v_secret then
    return json_build_object('error','forbidden');
  end if;

  select * into v from pending_payments
   where product_id = p_product_id order by created_at desc limit 1;
  if not found then
    return json_build_object('error','not_found');
  end if;

  -- Aynı webhook tekrar geldi: hiçbir şey yapma.
  if v.status = 'paid' and v.payment_id is not distinct from p_payment_id then
    return json_build_object('ok', true, 'status','paid',
      'listing_id', v.listing_id, 'title', v.title, 'city_id', v.city_id,
      'duplicate', true);
  end if;

  v_expected := coalesce(v.amount_try_cents, v.amount_cents);
  if p_paid_cents is not null and p_paid_cents < v_expected then
    if v.status <> 'paid' then
      update pending_payments set status = 'failed' where id = v.id;
    end if;
    return json_build_object('error','amount_mismatch','expected',v_expected,'paid',p_paid_cents);
  end if;

  v_already := (v.status = 'paid');

  select id into v_listing from listings where dedupe_key = v.dedupe_key;
  if v_listing is null then
    insert into listings (kind, dedupe_key, target_url, title, icon_url, category, city_id)
    values (v.kind, v.dedupe_key, v.target_url, v.title, v.icon_url,
            coalesce(v.category,'other'), v.city_id)
    returning id into v_listing;
  end if;

  -- bids.payment_id unique → gerçek webhook tekrarları burada eleniyor.
  begin
    insert into bids (listing_id, amount_cents, payment_id, source)
    values (v_listing, v.amount_cents, p_payment_id, 'paid');
    v_new_bid := true;
  exception when unique_violation then
    v_new_bid := false;
  end;

  if not v_already then
    update pending_payments
       set status='paid', payment_id=p_payment_id, listing_id=v_listing, paid_at=now()
     where id = v.id;
  end if;

  return json_build_object('ok', true, 'status','paid',
    'listing_id', v_listing, 'title', v.title, 'city_id', v.city_id,
    'duplicate', not v_new_bid, 'repeat', v_already);
end; $function$;

-- 2) Açık checkout'ların taşıyıcı ürünleri: /api/shopier/setup?cleanup_products=1
--    bunlara dokunmasın (kullanıcı hâlâ kart ekranında olabilir).
create or replace function public.open_payment_products(p_secret text)
returns setof text
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if not exists (
    select 1 from payment_secrets where key = 'rpc_secret' and value = p_secret
  ) then
    return;
  end if;
  return query
    select product_id from pending_payments
     where status = 'pending'
       and product_id is not null
       and created_at > now() - interval '3 hours';
end; $function$;

-- 3) Arayüz minimum teklifi $5 (CONFIG.minBidCents) ama app_config 300'de
--    kalmıştı: elle hazırlanmış bir POST ile $3'e giriş mümkündü.
update app_config set value = 500 where key = 'min_bid_cents';
