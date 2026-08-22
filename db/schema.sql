-- outbid.love — schema
-- Supabase SQL Editor'a yapıştır ve çalıştır.
--
-- Tasarım kararları:
--  * bids append-only  → toplam üzerine asla yazılmaz, idempotency bedava gelir
--  * çürüme view'da    → cron yok, okuma anında hesaplanır
--  * RLS kapalı kapı   → taban tablolara anon erişimi yok; her şey view + RPC üzerinden

create extension if not exists "pgcrypto";

-- ===============================================================
-- Tablolar
-- ===============================================================

create table if not exists listings (
  id           uuid primary key default gen_random_uuid(),
  kind         text not null check (kind in ('x','url')),
  dedupe_key   text not null unique,          -- x:<handle> | url:<host>
  target_url   text not null,
  title        text not null,
  icon_url     text,
  status       text not null default 'live' check (status in ('live','hidden','banned')),
  click_count  integer not null default 0,
  created_at   timestamptz not null default now()
);

create table if not exists bids (
  id           uuid primary key default gen_random_uuid(),
  listing_id   uuid not null references listings(id) on delete cascade,
  amount_cents integer not null check (amount_cents > 0),
  payment_id   text unique,                   -- webhook iki kez gelse de tek satır
  source       text not null default 'paid' check (source in ('paid','founding')),
  created_at   timestamptz not null default now()
);

create table if not exists submit_log (
  id         bigserial primary key,
  ip         text not null,
  created_at timestamptz not null default now()
);

create table if not exists counters (
  key   text primary key,
  value bigint not null default 0
);
insert into counters (key, value) values ('visits', 0) on conflict (key) do nothing;

create table if not exists presence (
  session_id uuid primary key,
  seen_at    timestamptz not null default now()
);

create index if not exists bids_listing_idx     on bids (listing_id, created_at desc);
create index if not exists listings_status_idx  on listings (status);
create index if not exists submit_log_ip_idx    on submit_log (ip, created_at desc);
create index if not exists presence_seen_idx    on presence (seen_at);

-- ===============================================================
-- Çürüyen sıralama — cron YOK, okuma anında hesaplanır.
-- Her bid KENDİ tarihinden itibaren günde %10 erir.
-- ===============================================================

create or replace view leaderboard as
select
  l.id,
  l.kind,
  l.target_url,
  l.title,
  l.icon_url,
  l.click_count,
  l.created_at,
  max(b.created_at) as last_bid_at,
  sum(b.amount_cents)::int as lifetime_cents,
  round(sum(
    b.amount_cents * power(0.90, extract(epoch from (now() - b.created_at)) / 86400.0)
  ))::int as effective_cents
from listings l
join bids b on b.listing_id = l.id
where l.status = 'live'
group by l.id
having round(sum(
  b.amount_cents * power(0.90, extract(epoch from (now() - b.created_at)) / 86400.0)
)) >= 100
order by effective_cents desc, l.created_at asc;

-- ===============================================================
-- Güvenlik: taban tablolar kapalı, erişim yalnızca view + RPC
-- ===============================================================

alter table listings   enable row level security;
alter table bids       enable row level security;
alter table submit_log enable row level security;
alter table counters   enable row level security;
alter table presence   enable row level security;
-- Politika tanımlanmadı => anon/authenticated taban tablolara erişemez.

grant usage on schema public to anon, authenticated;
grant select on leaderboard to anon, authenticated;
-- View security_invoker=false (varsayılan) olduğu için sahibi olarak çalışır
-- ve taban tabloların RLS'ini aşar. İstenen davranış bu.

-- ===============================================================
-- RPC: kayıt gönderimi
-- Kontenjan, hız sınırı ve tekilleştirme veritabanında zorlanır —
-- istemciye güvenilmez.
-- ===============================================================

create or replace function submit_listing(
  p_kind       text,
  p_dedupe_key text,
  p_target_url text,
  p_title      text,
  p_icon_url   text,
  p_ip         text,
  p_slots      int,
  p_credit     int,
  p_ip_limit   int
) returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_live      int;
  v_recent    int;
  v_listing   uuid;
begin
  if p_kind not in ('x','url') then
    return json_build_object('error', 'invalid_kind');
  end if;

  select count(*) into v_live from listings where status = 'live';
  if v_live >= p_slots then
    return json_build_object('error', 'full');
  end if;

  select count(*) into v_recent
  from submit_log
  where ip = p_ip and created_at > now() - interval '1 hour';
  if v_recent >= p_ip_limit then
    return json_build_object('error', 'rate_limited');
  end if;

  if exists (select 1 from listings where dedupe_key = p_dedupe_key) then
    return json_build_object('error', 'duplicate');
  end if;

  insert into listings (kind, dedupe_key, target_url, title, icon_url)
  values (p_kind, p_dedupe_key, p_target_url, p_title, p_icon_url)
  returning id into v_listing;

  insert into bids (listing_id, amount_cents, source)
  values (v_listing, p_credit, 'founding');

  insert into submit_log (ip) values (p_ip);

  return json_build_object('id', v_listing);
exception
  when unique_violation then
    return json_build_object('error', 'duplicate');
end;
$$;

grant execute on function submit_listing(text,text,text,text,text,text,int,int,int) to anon;

-- ===============================================================
-- RPC: tık sayacı
-- ===============================================================

create or replace function register_click(p_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare v_url text;
begin
  update listings
     set click_count = click_count + 1
   where id = p_id and status = 'live'
  returning target_url into v_url;
  return v_url;
end;
$$;

grant execute on function register_click(uuid) to anon;

-- ===============================================================
-- RPC: ziyaretçi sayacı + anlık online
-- Referans sitelerdeki "N ziyaretçi / X online" göstergesinin karşılığı.
-- ===============================================================

create or replace function track_visit(p_session uuid)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_new    boolean;
  v_total  bigint;
  v_online int;
begin
  v_new := not exists (select 1 from presence where session_id = p_session);

  insert into presence (session_id, seen_at)
  values (p_session, now())
  on conflict (session_id) do update set seen_at = now();

  if v_new then
    update counters set value = value + 1 where key = 'visits';
  end if;

  -- ucuz temizlik: 10 dakikadan eski oturumlar online sayılmaz
  delete from presence where seen_at < now() - interval '10 minutes';

  select value into v_total from counters where key = 'visits';
  select count(*) into v_online from presence where seen_at > now() - interval '5 minutes';

  return json_build_object('total', v_total, 'online', v_online);
end;
$$;

grant execute on function track_visit(uuid) to anon;

-- ===============================================================
-- RPC: board özeti (kontenjan göstergesi için)
-- ===============================================================

create or replace function board_stats()
returns json
language sql
security definer
set search_path = public
as $$
  select json_build_object(
    'listings', (select count(*) from listings where status = 'live'),
    'visits',   (select value from counters where key = 'visits'),
    'online',   (select count(*) from presence where seen_at > now() - interval '5 minutes')
  );
$$;

grant execute on function board_stats() to anon;
