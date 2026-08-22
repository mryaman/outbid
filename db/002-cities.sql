-- outbid.love — şehir boyutu (schema.sql üzerine uygulanır)
--
-- Konsept: her şehrin kendi #1'i var. Sıralama şehir içinde, şehirler de
-- kendi aralarında toplam etkin harcamaya göre sıralanıyor. Çürüme mantığı
-- değişmedi: cron yok, okuma anında SQL'de.
--
-- Şehir sözlüğü kodda (data/cities.json, GeoNames türevi 5.000 şehir);
-- bu tabloya yalnızca fiilen teklif alan şehirler yazılır. Kullanıcı şehri
-- serbest yazamaz — sunucu gömülü listeden doğrular, sonra ensure_city çağırır.

create extension if not exists pg_trgm;

create table if not exists cities (
  id           text primary key,           -- slug: istanbul-tr
  name         text not null,
  country      text not null,
  country_code text not null,
  lat          double precision not null,
  lon          double precision not null,
  population   integer not null default 0,
  search_text  text not null default ''
);

create index if not exists cities_pop_idx    on cities (population desc);
create index if not exists cities_search_idx on cities using gin (search_text gin_trgm_ops);

alter table listings         add column if not exists city_id text references cities(id);
alter table pending_payments add column if not exists city_id text;

create index if not exists listings_city_idx on listings (city_id) where status = 'live';

alter table cities enable row level security;
drop policy if exists cities_public_read on cities;
create policy cities_public_read on cities for select to anon, authenticated using (true);
grant select on cities to anon, authenticated;

-- ===============================================================
-- Şehir kaydı — sunucudan, PAYMENT_RPC_SECRET ile
-- ===============================================================

create or replace function ensure_city(
  p_secret text, p_id text, p_name text, p_country text,
  p_cc text, p_lat double precision, p_lon double precision, p_pop int
) returns json language plpgsql security definer set search_path = public as $$
declare v_secret text;
begin
  select value into v_secret from payment_secrets where key = 'rpc_secret';
  if v_secret is null or p_secret is distinct from v_secret then
    return json_build_object('error','forbidden');
  end if;
  if p_id is null or length(p_id) > 80 or length(p_name) > 120
     or length(p_country) > 80 or length(p_cc) <> 2
     or p_lat not between -90 and 90 or p_lon not between -180 and 180 then
    return json_build_object('error','invalid_city');
  end if;
  insert into cities (id, name, country, country_code, lat, lon, population, search_text)
  values (p_id, p_name, p_country, upper(p_cc), p_lat, p_lon, coalesce(p_pop,0),
          lower(p_name||' '||p_country))
  on conflict (id) do nothing;
  return json_build_object('ok', true, 'id', p_id);
end; $$;

grant execute on function ensure_city(text,text,text,text,text,double precision,double precision,int) to anon;

-- ===============================================================
-- Sıralama — şehir alanları + şehir içi rank
-- ===============================================================

drop view if exists leaderboard cascade;

create view leaderboard as
with agg as (
  select
    l.id, l.kind, l.target_url, l.title, l.icon_url, l.category, l.city_id,
    l.click_count, l.created_at,
    max(b.created_at) as last_bid_at,
    sum(b.amount_cents)::int as lifetime_cents,
    round(sum(
      b.amount_cents * power(0.90, extract(epoch from (now() - b.created_at)) / 86400.0)
    ))::int as effective_cents
  from listings l
  join bids b on b.listing_id = l.id
  where l.status = 'live'
  group by l.id
)
select
  a.*,
  c.name         as city_name,
  c.country      as city_country,
  c.country_code as city_cc,
  c.lat          as city_lat,
  c.lon          as city_lon,
  rank() over (
    partition by a.city_id
    order by a.effective_cents desc, a.created_at asc
  )::int as city_rank
from agg a
left join cities c on c.id = a.city_id
where a.effective_cents >= 100;

grant select on leaderboard to anon, authenticated;

-- ===============================================================
-- Şehirler ligi — kalabalıktan seyreğe
-- ===============================================================

create or replace view city_league as
with per_listing as (
  select
    l.city_id, l.id as listing_id,
    max(b.created_at) as last_bid_at,
    sum(b.amount_cents)::int as lifetime_cents,
    round(sum(
      b.amount_cents * power(0.90, extract(epoch from (now() - b.created_at)) / 86400.0)
    ))::int as effective_cents
  from listings l
  join bids b on b.listing_id = l.id
  where l.status = 'live' and l.city_id is not null
  group by l.city_id, l.id
),
alive as (select * from per_listing where effective_cents >= 100),
agg as (
  select
    city_id,
    count(*)::int             as listings,
    sum(effective_cents)::int as effective_cents,
    sum(lifetime_cents)::int  as lifetime_cents,
    max(last_bid_at)          as last_bid_at
  from alive group by city_id
)
select
  c.id, c.name, c.country, c.country_code, c.lat, c.lon, c.population,
  g.listings, g.effective_cents, g.lifetime_cents, g.last_bid_at,
  t.title as top_title, t.icon_url as top_icon_url,
  t.id as top_listing_id, t.kind as top_kind,
  rank() over (order by g.effective_cents desc, c.id asc)::int as league_rank
from agg g
join cities c on c.id = g.city_id
left join lateral (
  select lb.id, lb.title, lb.icon_url, lb.kind
  from leaderboard lb
  where lb.city_id = g.city_id
  order by lb.effective_cents desc, lb.created_at asc
  limit 1
) t on true;

grant select on city_league to anon, authenticated;

-- ===============================================================
-- RPC'ler şehir taşıyor
-- Not: canlıda eski (şehirsiz) imzalar geçiş için duruyor; yeni kod
-- yayına alındıktan sonra silinebilir:
--   drop function submit_listing(text,text,text,text,text,text,text);
--   drop function create_pending_payment(text,text,text,text,text,text,text,text,integer,text,text,text,integer);
-- ===============================================================

drop function if exists submit_listing(text,text,text,text,text,text,text,text);

create function submit_listing(
  p_kind text, p_dedupe_key text, p_target_url text, p_title text,
  p_icon_url text, p_ip text, p_city_id text, p_category text default 'other'
) returns json language plpgsql security definer set search_path = public as $$
declare
  v_slots int; v_credit int; v_iplimit int;
  v_live int; v_recent int; v_listing uuid;
begin
  if p_kind not in ('x','url') then
    return json_build_object('error','invalid_kind');
  end if;
  if p_city_id is not null and not exists (select 1 from cities where id = p_city_id) then
    return json_build_object('error','unknown_city');
  end if;
  if length(p_target_url) > 500 or length(p_title) > 120
     or length(coalesce(p_icon_url,'')) > 500
     or length(coalesce(p_category,'')) > 60 then
    return json_build_object('error','invalid_kind');
  end if;

  select value into v_slots   from app_config where key = 'founding_slots';
  select value into v_credit  from app_config where key = 'founding_credit';
  select value into v_iplimit from app_config where key = 'ip_limit_per_hour';

  select count(*) into v_live from listings where status = 'live';
  if v_live >= v_slots then return json_build_object('error','full'); end if;

  select count(*) into v_recent from submit_log
   where ip = p_ip and created_at > now() - interval '1 hour';
  if v_recent >= v_iplimit then return json_build_object('error','rate_limited'); end if;

  if exists (select 1 from listings where dedupe_key = p_dedupe_key) then
    return json_build_object('error','duplicate');
  end if;

  insert into listings (kind, dedupe_key, target_url, title, icon_url, category, city_id)
  values (p_kind, p_dedupe_key, p_target_url, p_title, p_icon_url,
          coalesce(nullif(p_category,''),'other'), p_city_id)
  returning id into v_listing;

  insert into bids (listing_id, amount_cents, source) values (v_listing, v_credit, 'founding');
  insert into submit_log (ip) values (p_ip);
  return json_build_object('id', v_listing);
exception when unique_violation then
  return json_build_object('error','duplicate');
end; $$;

grant execute on function submit_listing(text,text,text,text,text,text,text,text) to anon;

drop function if exists create_pending_payment(text,text,text,text,text,text,text,text,integer,text,text,text,text,integer);

create function create_pending_payment(
  p_secret text, p_order_ref text, p_product_id text, p_kind text,
  p_dedupe_key text, p_target_url text, p_title text, p_icon_url text,
  p_amount_cents integer, p_email text, p_ip text, p_city_id text,
  p_category text default 'other', p_amount_try_cents integer default null
) returns json language plpgsql security definer set search_path = public as $$
declare
  v_secret text; v_min int; v_max int; v_limit int; v_recent int; v_id uuid;
begin
  select value into v_secret from payment_secrets where key = 'rpc_secret';
  if v_secret is null or p_secret is distinct from v_secret then
    return json_build_object('error','forbidden');
  end if;
  if p_kind not in ('x','url') then
    return json_build_object('error','invalid_kind');
  end if;
  if p_city_id is not null and not exists (select 1 from cities where id = p_city_id) then
    return json_build_object('error','unknown_city');
  end if;
  if length(p_target_url) > 500 or length(p_title) > 120
     or length(coalesce(p_icon_url,'')) > 500
     or length(coalesce(p_category,'')) > 60 then
    return json_build_object('error','invalid_kind');
  end if;

  select coalesce((select value from app_config where key='min_bid_cents'), 500)    into v_min;
  select coalesce((select value from app_config where key='max_bid_cents'), 500000) into v_max;
  if p_amount_cents < v_min or p_amount_cents > v_max then
    return json_build_object('error','bad_amount','min',v_min,'max',v_max);
  end if;

  select coalesce((select value from app_config where key='ip_limit_per_hour'), 3) into v_limit;
  select count(*) into v_recent from submit_log
   where ip = p_ip and created_at > now() - interval '1 hour';
  if v_recent >= v_limit * 3 then
    return json_build_object('error','rate_limited');
  end if;

  insert into pending_payments
    (order_ref, product_id, kind, dedupe_key, target_url, title, icon_url,
     amount_cents, amount_try_cents, buyer_email, ip, category, city_id)
  values
    (p_order_ref, p_product_id, p_kind, p_dedupe_key, p_target_url, p_title, p_icon_url,
     p_amount_cents, p_amount_try_cents, p_email, p_ip,
     coalesce(nullif(p_category,''),'other'), p_city_id)
  returning id into v_id;

  insert into submit_log (ip) values (p_ip);
  return json_build_object('id', v_id, 'order_ref', p_order_ref);
end; $$;

grant execute on function create_pending_payment(text,text,text,text,text,text,text,text,integer,text,text,text,text,integer) to anon;

-- Webhook onayı: listing artık şehirle açılır.
create or replace function confirm_payment_by_product(
  p_secret text, p_product_id text, p_payment_id text, p_paid_cents integer
) returns json language plpgsql security definer set search_path = public as $$
declare
  v_secret text; v pending_payments%rowtype; v_listing uuid; v_expected int;
begin
  select value into v_secret from payment_secrets where key = 'rpc_secret';
  if v_secret is null or p_secret is distinct from v_secret then
    return json_build_object('error','forbidden');
  end if;

  select * into v from pending_payments
   where product_id = p_product_id order by created_at desc limit 1;
  if not found then return json_build_object('error','not_found'); end if;

  if v.status = 'paid' then
    return json_build_object('ok', true, 'status','paid',
      'listing_id', v.listing_id, 'title', v.title, 'city_id', v.city_id, 'duplicate', true);
  end if;

  v_expected := coalesce(v.amount_try_cents, v.amount_cents);
  if p_paid_cents is not null and p_paid_cents < v_expected then
    update pending_payments set status = 'failed' where id = v.id;
    return json_build_object('error','amount_mismatch','expected',v_expected,'paid',p_paid_cents);
  end if;

  select id into v_listing from listings where dedupe_key = v.dedupe_key;
  if v_listing is null then
    insert into listings (kind, dedupe_key, target_url, title, icon_url, category, city_id)
    values (v.kind, v.dedupe_key, v.target_url, v.title, v.icon_url,
            coalesce(v.category,'other'), v.city_id)
    returning id into v_listing;
  end if;

  begin
    insert into bids (listing_id, amount_cents, payment_id, source)
    values (v_listing, v.amount_cents, p_payment_id, 'paid');
  exception when unique_violation then
    null;
  end;

  update pending_payments
     set status='paid', payment_id=p_payment_id, listing_id=v_listing, paid_at=now()
   where id = v.id;

  return json_build_object('ok', true, 'status','paid',
    'listing_id', v_listing, 'title', v.title, 'city_id', v.city_id);
end; $$;

-- Board özeti — şehir sayısı eklendi.
create or replace function board_stats()
returns json language sql security definer set search_path = public as $$
  select json_build_object(
    'listings', (select count(*) from listings where status = 'live'),
    'visits',   (select value from counters where key = 'visits'),
    'online',   (select count(*) from presence where seen_at > now() - interval '5 minutes'),
    'slots',    (select value from app_config where key = 'founding_slots'),
    'cities',   (select count(*) from city_league)
  );
$$;

grant execute on function board_stats() to anon;
