-- outbid.love — "şehrin ilk kaydı ücretsiz" (003)
--
-- Karar: bir şehirde canlı (>$1) hiç kayıt yoksa o şehri açan ilk kişi
-- ücretsiz giriyor ve $3'lık çürüyen krediyle board'a düşüyor. Min teklif $5
-- olduğu için bu kredi rekabette ağırlık taşımıyor: ilk ödeyen anında geçer.
-- Amaç boş şehri doldurup küre üstünde ışık yakmak, bedava #1 dağıtmak değil.
--
-- Şehir boşalırsa (tek kayıt $1 altına çürüyüp board'dan düşerse) hak yeniden
-- açılır. Sömürüye karşı iki sınır:
--   1) aynı profil (şehirsiz kimlik) tüm sitede yalnızca BİR kez bedava alır
--   2) aynı IP 24 saatte yalnızca bir bedava kayıt açar
-- Ayrıca mevcut submit_log saatlik IP limiti de geçerli.

-- ---------------------------------------------------------------------------
-- Ayarlar
-- ---------------------------------------------------------------------------
insert into app_config (key, value) values
  ('free_city_cents', 300),        -- $3 çürüyen kredi (~10 gün görünür)
  ('free_ip_limit_hours', 24)      -- IP başına bir bedava kayıt / 24 saat
on conflict (key) do nothing;

-- Bedava kayıtlar ayrı kaynak olarak işaretlensin (analitik + geri alma).
alter table bids drop constraint if exists bids_source_check;
alter table bids add constraint bids_source_check
  check (source in ('paid', 'founding', 'free_city'));

-- ---------------------------------------------------------------------------
-- Bedava hak defteri
-- identity_key: dedupe_key'in şehirsiz hâli — 'x:zeynep', 'instagram:ali',
-- 'url:example.com'. Primary key olduğu için "profil başına toplam 1" kuralı
-- veritabanı düzeyinde garanti.
-- ---------------------------------------------------------------------------
create table if not exists free_claims (
  identity_key text primary key,
  city_id      text not null,
  listing_id   uuid,
  ip           text not null default '',
  created_at   timestamptz not null default now()
);

create index if not exists free_claims_ip_idx   on free_claims (ip, created_at desc);
create index if not exists free_claims_city_idx on free_claims (city_id);

alter table free_claims enable row level security;
-- Politika yok => anon/authenticated erişemez; yalnızca RPC (security definer).

-- ---------------------------------------------------------------------------
-- claim_free_city — sunucudan, PAYMENT_RPC_SECRET ile
-- ---------------------------------------------------------------------------
drop function if exists claim_free_city(text,text,text,text,text,text,text,text,text,text);

create function claim_free_city(
  p_secret text,
  p_kind text,
  p_identity_key text,          -- şehirsiz kimlik: 'x:zeynep'
  p_dedupe_key text,            -- şehirli: 'istanbul-tr|x:zeynep'
  p_target_url text,
  p_title text,
  p_icon_url text,
  p_ip text,
  p_city_id text,
  p_category text default 'other'
) returns json language plpgsql security definer set search_path = public as $$
declare
  v_secret text; v_cents int; v_hours int; v_iplimit int;
  v_recent int; v_listing uuid;
begin
  select value into v_secret from payment_secrets where key = 'rpc_secret';
  if v_secret is null or p_secret is distinct from v_secret then
    return json_build_object('error','forbidden');
  end if;

  if p_kind not in ('x','url') then
    return json_build_object('error','invalid_kind');
  end if;
  if p_city_id is null or not exists (select 1 from cities where id = p_city_id) then
    return json_build_object('error','unknown_city');
  end if;
  if p_identity_key is null or length(p_identity_key) < 3 or length(p_identity_key) > 200
     or length(p_target_url) > 500 or length(p_title) > 120
     or length(coalesce(p_icon_url,'')) > 500
     or length(coalesce(p_category,'')) > 60 then
    return json_build_object('error','invalid_kind');
  end if;

  select coalesce((select value from app_config where key='free_city_cents'), 300)   into v_cents;
  select coalesce((select value from app_config where key='free_ip_limit_hours'), 24) into v_hours;
  select coalesce((select value from app_config where key='ip_limit_per_hour'), 3)    into v_iplimit;

  -- Aynı şehre aynı anda gelen iki bedava isteği yarışmasın.
  perform pg_advisory_xact_lock(hashtext('free_city:' || p_city_id));

  -- Şehir gerçekten boş mu? (leaderboard zaten status='live' + >=$1 süzüyor)
  if exists (select 1 from leaderboard where city_id = p_city_id) then
    return json_build_object('error','city_taken');
  end if;

  -- Bu profil daha önce bir şehri bedava aldı mı?
  if exists (select 1 from free_claims where identity_key = p_identity_key) then
    return json_build_object('error','free_used');
  end if;

  -- IP: 24 saatte bir bedava kayıt.
  select count(*) into v_recent from free_claims
   where ip = p_ip and created_at > now() - make_interval(hours => v_hours);
  if v_recent >= 1 then
    return json_build_object('error','free_ip_limit');
  end if;

  -- Genel saatlik IP limiti de geçerli.
  select count(*) into v_recent from submit_log
   where ip = p_ip and created_at > now() - interval '1 hour';
  if v_recent >= v_iplimit then
    return json_build_object('error','rate_limited');
  end if;

  -- Aynı profil bu şehirde zaten kayıtlı mı? (çürümüş ama duran kayıt dahil)
  if exists (select 1 from listings where dedupe_key = p_dedupe_key) then
    return json_build_object('error','duplicate');
  end if;

  insert into listings (kind, dedupe_key, target_url, title, icon_url, category, city_id)
  values (p_kind, p_dedupe_key, p_target_url, p_title, p_icon_url,
          coalesce(nullif(p_category,''),'other'), p_city_id)
  returning id into v_listing;

  insert into bids (listing_id, amount_cents, source)
  values (v_listing, v_cents, 'free_city');

  insert into free_claims (identity_key, city_id, listing_id, ip)
  values (p_identity_key, p_city_id, v_listing, p_ip);

  insert into submit_log (ip) values (p_ip);

  return json_build_object('id', v_listing, 'cents', v_cents);
exception when unique_violation then
  return json_build_object('error','duplicate');
end; $$;

grant execute on function claim_free_city(text,text,text,text,text,text,text,text,text,text) to anon;

-- ---------------------------------------------------------------------------
-- city_free — "bu şehir şu an bedava alınabilir mi?" (arayüz için, hafif)
-- ---------------------------------------------------------------------------
create or replace function city_free(p_city_id text)
returns json language sql security definer set search_path = public as $$
  select json_build_object(
    'free', not exists (select 1 from leaderboard where city_id = p_city_id),
    'cents', coalesce((select value from app_config where key='free_city_cents'), 300)
  );
$$;

grant execute on function city_free(text) to anon;
