/**
 * Supabase REST (PostgREST) istemcisi.
 * Doğrudan Postgres bağlantısı yerine HTTP kullanıyoruz: DB parolası
 * gerekmiyor, serverless'ta bağlantı havuzu derdi yok.
 *
 * Taban tablolar RLS ile kapalı. Okuma `leaderboard` view'ından,
 * yazma SECURITY DEFINER RPC'lerinden geçiyor.
 */

// Sunucu tarafı değişkenler — tarayıcıya gönderilmiyor.
// Tüm veri erişimi Server Component'ler ve route handler'lar üzerinden.
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
  click_count: number;
  created_at: string;
  last_bid_at: string;
  lifetime_cents: number;
  effective_cents: number;
};

export type Stats = {
  listings: number;
  visits: number;
  online: number;
  slots: number;
};

/** Board — çürüme SQL'de hesaplanıyor. Kategori verilirse filtrelenir. */
export function getBoard(limit = 100, category?: string) {
  const filter = category ? `&category=eq.${encodeURIComponent(category)}` : "";
  return rest<Row[]>(
    `leaderboard?select=*${filter}&limit=${limit}`,
    { revalidate: 15 },
    []
  );
}

export function getStats() {
  return rest<Stats>(
    "rpc/board_stats",
    { method: "POST", body: "{}", revalidate: 15 },
    { listings: 0, visits: 0, online: 0, slots: 30 }
  );
}

export type SubmitResult = { id?: string; error?: string };

/**
 * Kontenjan, kredi tutarı ve hız sınırı veritabanındaki app_config'ten
 * okunuyor — çağıran taraf bunları belirleyemez.
 */
export function submitListing(args: {
  kind: string;
  dedupeKey: string;
  targetUrl: string;
  title: string;
  iconUrl: string;
  ip: string;
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

function rpcSecret(): string {
  const s = process.env.PAYMENT_RPC_SECRET;
  if (!s) console.error("PAYMENT_RPC_SECRET is not set");
  return s ?? "";
}

export type PendingResult = { id?: string; order_ref?: string; error?: string; min?: number; max?: number };

export function createPendingPayment(args: {
  orderRef: string;
  productId: string;
  kind: string;
  dedupeKey: string;
  targetUrl: string;
  title: string;
  iconUrl: string;
  amountCents: number;
  email?: string | null;
  ip: string;
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
        p_email: args.email ?? null,
        p_ip: args.ip,
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
