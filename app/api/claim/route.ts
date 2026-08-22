import { NextResponse } from "next/server";
import { claimFreeCity, cityFreeStatus, ensureCity } from "@/lib/db";
import { CONFIG } from "@/lib/config";
import { normalizeInput, cityDedupeKey } from "@/lib/normalize";
import { isValidCategory } from "@/lib/categories";
import { getCity } from "@/lib/cities";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Şehrin ilk kaydı ücretsiz.
 *
 * GET  /api/claim?city=<slug>  → { free, cents }  (ana sayfa formu buna bakar)
 * POST /api/claim              → boş şehri ücretsiz açar
 *
 * Fazdan bağımsız çalışır: ödemeli fazda da boş şehir bedava açılabilir.
 * Asıl kurallar DB'de (claim_free_city): şehir gerçekten boş mu, profil daha
 * önce bedava almış mı, IP 24 saat içinde bedava almış mı. Burada yalnızca
 * girdi doğrulaması ve mesaja çevirme var.
 */

const MESSAGES: Record<string, string> = {
  city_taken: "Somebody already holds this city. Place a bid instead.",
  free_used: "You've already claimed a free city with this profile.",
  free_ip_limit: "One free city per day. Try again tomorrow, or place a bid.",
  duplicate: "That link already holds a spot in this city.",
  rate_limited: "Too many attempts. Try again in a little while.",
  invalid_kind: "That link isn't valid.",
  unknown_city: "Pick a city from the list.",
  forbidden: "Free claims are not available right now.",
  server_error: "Something went wrong on our end.",
};

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : "").trim() || "0.0.0.0";
}

export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get("city") ?? "";
  const city = getCity(slug);
  if (!city) return NextResponse.json({ free: false, cents: CONFIG.freeFirstCents });
  const status = await cityFreeStatus(city.id);
  return NextResponse.json({
    free: Boolean(status?.free),
    cents: status?.cents ?? CONFIG.freeFirstCents,
  });
}

export async function POST(req: Request) {
  let body: { link?: string; website?: string; category?: string; city?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot — gerçek kullanıcı bu alanı görmez.
  if (body.website) return NextResponse.json({ ok: true });

  // Şehir gömülü listeden doğrulanır: kullanıcı serbest metin gönderemez.
  const city = getCity(String(body.city ?? ""));
  if (!city) {
    return NextResponse.json(
      { error: MESSAGES.unknown_city, code: "unknown_city" },
      { status: 400 }
    );
  }

  let n;
  try {
    n = normalizeInput(String(body.link ?? ""));
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : MESSAGES.invalid_kind, code: "bad_link" },
      { status: 400 }
    );
  }

  await ensureCity(city);

  const cat = String(body.category ?? "other");
  const result = await claimFreeCity({
    kind: n.kind,
    identityKey: n.dedupeKey,
    dedupeKey: cityDedupeKey(city.id, n.dedupeKey),
    targetUrl: n.targetUrl,
    title: n.title,
    iconUrl: n.iconUrl,
    ip: clientIp(req),
    cityId: city.id,
    category: isValidCategory(cat) ? cat : "other",
  });

  if (result.error) {
    const status =
      result.error === "city_taken" ||
      result.error === "duplicate" ||
      result.error === "free_used"
        ? 409
        : result.error === "rate_limited" || result.error === "free_ip_limit"
          ? 429
          : 400;
    return NextResponse.json(
      { error: MESSAGES[result.error] ?? MESSAGES.server_error, code: result.error },
      { status }
    );
  }

  return NextResponse.json({
    ok: true,
    id: result.id,
    cents: result.cents ?? CONFIG.freeFirstCents,
  });
}
