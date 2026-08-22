/**
 * Supabase REST (PostgREST) istemcisi.
 * Doğrudan Postgres bağlantısı yerine HTTP: DB parolası gerekmiyor,
 * serverless'ta bağlantı havuzu derdi yok.
 *
 * Taban tablolar RLS ile kapalı. Okuma `leaderboard` / `city_league`
 * view'larından, yazma SECURITY DEFINER RPC'lerinden geçiyor.
 */

const URL_ = process.env.SUPABASE_URL ?? "https://twlzxnpbkvrjpcjqahrq.supabase.co";
const KEY =
  process.env.SUPABASE_ANON_KEY ??
  "sb_publishable_NxNtRbKC1B-2-AaYvHkt-A_Ss8VCc4y";

async function rest<T>(
  path: string,
  init: RequestInit & { revalidate?: number } = {},
  fallback: T
): Promise<T> {
  if (!URL_ || !KEY) {
    console.error("supabase env missing");
    return fallback;
  }
  const { revalidate, ...rest } = init;
  try {
    const res = await fetch(`${URL_}/rest/v1/${path}`, {
      ...rest,
      headers: {
        apikey: KEY,
        authorization: `Bearer ${KEY}`,
        "content-type": "application/json",
        ...(rest.headers ?? {}),
      },
      ...(revalidate === undefined
        ? { cache: "no-store" as const }
        : { next: { revalidate } }),
    });
    if (!res.ok) {
      console.error("supabase error", path, res.status, await res.text());
      return fallback;
    }
    return (await res.json()) as T;
  } catch (e) {
    console.error("supabase fetch failed", path, e);
    return fallback;
  }
}

export type Row = {
  id: string;
  kind: "x" | "url";
  target_url: string;
  title: string;
  icon_url: string | null;
  category: string;
  city_id: string | null;
  city_name: string | null;
  city_country: string | null;
  city_cc: string | null;
  city_lat: number | null;
  city_lon: number | null;
  city_rank: number;
  click_count: number;
  created_at: string;
  last_bid_at: string;
  lifetime_cents: number;
  effective_cents: number;
};

export type LeagueRow = {
  id: string;
  name: string;
  country: string;
  country_code: string;
  lat: number;
  lon: number;
  population: number;
  listings: number;
  effective_cents: number;
  lifetime_cents: number;
  last_bid_at: string;
  top_title: string | null;
  top_icon_url: string | null;
  top_listing_id: string | null;
  top_kind: string | null;
  league_rank: number;
};

export type Stats = {
  listings: number;
  visits: number;
  online: number;
  slots: number;
  cities: number;
};

/** Global board — çürüme SQL'de. Kategori/şehir verilirse filtrelenir. */
export function getBoard(limit = 100, opts: { category?: string; cityId?: string } = {}) {
  const filters = [
    opts.category ? `&category=eq.${encodeURIComponent(opts.category)}` : "",
    opts.cityId ? `&city_id=eq.${encodeURIComponent(opts.cityId)}` : "",
  ].join("");
  return rest<Row[]>(
    `leaderboard?select=*${filters}&order=effective_cents.desc,created_at.asc&limit=${limit}`,
    { revalidate: 15 },
    []
  );
}

/** Bir şehrin kendi ligi — sıralama şehir içinde. */
export function getCityBoard(cityId: string, limit = 100) {
  return getBoard(limit, { cityId });
}

/** Şehirler ligi — en çok harcayandan en aza. */
export function getCityLeague(limit = 100) {
  return rest<LeagueRow[]>(
    `city_league?select=*&order=effective_cents.desc&limit=${limit}`,
    { revalidate: 15 },
    []
  );
}

export function getStats() {
  return rest<Stats>(
    "rpc/board_stats",
    { method: "POST", body: "{}", revalidate: 15 },
    { listings: 0, visits: 0, online: 0, slots: 30, cities: 0 }
  );
}

// ---------------------------------------------------------------------------
// Şehir kaydı — gömülü GeoNames verisiyle, sunucudan, secret ile
// ---------------------------------------------------------------------------

function rpcSecret(): string {
  const s = process.env.PAYMENT_RPC_SECRET;
  if (!s) console.error("PAYMENT_RPC_SECRET is not set");
  return s ?? "";
}

export function ensureCity(city: {
  id: string;
  name: string;
  country: string;
  cc: string;
  lat: number;
  lon: number;
  pop: number;
}) {
  return rest<{ ok?: boolean; error?: string }>(
    "rpc/ensure_city",
    {
      method: "POST",
      body: JSON.stringify({
        p_secret: rpcSecret(),
        p_id: city.id,
        p_name: city.name,
        p_country: city.country,
        p_cc: city.cc,
        p_lat: city.lat,
        p_lon: city.lon,
        p_pop: city.pop,
      }),
    },
    { error: "server_error" }
  );
}

export type SubmitResult = { id?: string; error?: string };

export function submitListing(args: {
  kind: string;
  dedupeKey: string;
  targetUrl: string;
  title: string;
  iconUrl: string;
  ip: string;
  cityId: string;
  category?: string;
}) {
  return rest<SubmitResult>(
    "rpc/submit_listing",
    {
      method: "POST",
      body: JSON.stringify({
        p_kind: args.kind,
        p_dedupe_key: args.dedupeKey,
        p_target_url: args.targetUrl,
        p_title: args.title,
        p_icon_url: args.iconUrl,
        p_ip: args.ip,
        p_city_id: args.cityId,
        p_category: args.category ?? "other",
      }),
    },
    { error: "server_error" }
  );
}

/** Hedefi sayaç artırmadan okur — bot ve link önizlemeleri için. */
export async function getTarget(id: string): Promise<string | null> {
  const rows = await rest<{ target_url: string }[]>(
    `leaderboard?select=target_url&id=eq.${encodeURIComponent(id)}&limit=1`,
    {},
    []
  );
  return rows[0]?.target_url ?? null;
}

export function registerClick(id: string) {
  return rest<string | null>(
    "rpc/register_click",
    { method: "POST", body: JSON.stringify({ p_id: id }) },
    null
  );
}

export function trackVisit(sessionId: string) {
  return rest<{ total: number; online: number }>(
    "rpc/track_visit",
    { method: "POST", body: JSON.stringify({ p_session: sessionId }) },
    { total: 0, online: 0 }
  );
}

// ---------------------------------------------------------------------------
// Ödeme (Shopier) — RPC'ler PAYMENT_RPC_SECRET ile korunuyor.
// ---------------------------------------------------------------------------

export type PendingResult = {
  id?: string;
  order_ref?: string;
  error?: string;
  min?: number;
  max?: number;
};

export function createPendingPayment(args: {
  orderRef: string;
  productId: string;
  kind: string;
  dedupeKey: string;
  targetUrl: string;
  title: string;
  iconUrl: string;
  amountCents: number;
  amountTryCents?: number | null;
  email?: string | null;
  ip: string;
  cityId: string;
  category?: string;
}) {
  return rest<PendingResult>(
    "rpc/create_pending_payment",
    {
      method: "POST",
      body: JSON.stringify({
        p_secret: rpcSecret(),
        p_order_ref: args.orderRef,
        p_product_id: args.productId,
        p_kind: args.kind,
        p_dedupe_key: args.dedupeKey,
        p_target_url: args.targetUrl,
        p_title: args.title,
        p_icon_url: args.iconUrl,
        p_amount_cents: args.amountCents,
        p_amount_try_cents: args.amountTryCents ?? null,
        p_email: args.email ?? null,
        p_ip: args.ip,
        p_city_id: args.cityId,
        p_category: args.category ?? "other",
      }),
    },
    { error: "server_error" }
  );
}

export type ConfirmResult = {
  ok?: boolean;
  status?: string;
  listing_id?: string;
  title?: string;
  city_id?: string;
  duplicate?: boolean;
  error?: string;
  expected?: number;
  paid?: number;
};

export function confirmPaymentByProduct(args: {
  productId: string;
  paymentId: string;
  paidCents: number | null;
}) {
  return rest<ConfirmResult>(
    "rpc/confirm_payment_by_product",
    {
      method: "POST",
      body: JSON.stringify({
        p_secret: rpcSecret(),
        p_product_id: args.productId,
        p_payment_id: args.paymentId,
        p_paid_cents: args.paidCents,
      }),
    },
    { error: "server_error" }
  );
}
