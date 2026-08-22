import { NextResponse } from "next/server";
import { CONFIG, centsToUsd } from "@/lib/config";
import { normalizeInput, cityDedupeKey } from "@/lib/normalize";
import { isValidCategory } from "@/lib/categories";
import { getCity } from "@/lib/cities";
import { createPendingPayment, ensureCity } from "@/lib/db";
import { shopierClient, shopierFlow, siteUrl, moneyToCents, getUsdTryRate } from "@/lib/shopier";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Ödemeli faz girişi. Normal <form method="POST"> ile çağrılır:
 * başarıda tarayıcıyı Shopier hosted checkout'a POST eden HTML döner,
 * hatada geldiği şehir sayfasına geri yönlendirir.
 *
 * Bid SADECE webhook'ta yazılır — burada yalnızca pending_payments oluşur.
 */

/** Hata dönüşü — kullanıcı hangi dildeki sayfadan geldiyse oraya. */
function back(citySlug: string, code: string, extra = "", lang = ""): NextResponse {
  const root = `${siteUrl()}${lang}`;
  const base = citySlug ? `${root}/city/${citySlug}` : root || siteUrl();
  return NextResponse.redirect(`${base}?err=${encodeURIComponent(code)}${extra}#bid`, 303);
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : "").trim() || "0.0.0.0";
}

export async function POST(req: Request) {
  let link = "", amountRaw = "", honeypot = "", category = "other", citySlug = "";
  // Çevrilmiş sayfalardan gelen gizli alan: hata dönüşü aynı dile gitsin.
  let lang = "";
  try {
    const form = await req.formData();
    link = String(form.get("link") ?? "");
    amountRaw = String(form.get("amount") ?? "");
    honeypot = String(form.get("website") ?? "");
    citySlug = String(form.get("city") ?? "");
    const c = String(form.get("category") ?? "other");
    category = isValidCategory(c) ? c : "other";
    const lg = String(form.get("lang") ?? "");
    if (/^[a-z]{2}$/.test(lg) && lg !== "en") lang = `/${lg}`;
  } catch {
    return back("", "bad_request");
  }

  if (CONFIG.phase !== "paid") return back(citySlug, "closed", "", lang);
  if (honeypot) return NextResponse.redirect(siteUrl(), 303);

  // Şehir gömülü GeoNames listesinden doğrulanır.
  const city = getCity(citySlug);
  if (!city) return back("", "unknown_city", "", lang);

  let n;
  try {
    n = normalizeInput(link);
  } catch (e) {
    return back(city.id, "bad_link", `&m=${encodeURIComponent(e instanceof Error ? e.message : "")}`, lang);
  }

  const cents = moneyToCents(amountRaw);
  if (cents === null || cents < CONFIG.minBidCents || cents > CONFIG.maxBidCents) {
    return back(city.id, "bad_amount", "", lang);
  }

  if (!process.env.SHOPIER_PAT) return back(city.id, "not_configured", "", lang);

  // Shopier mağazası yalnızca TRY tahsil edebiliyor: teklif USD, tahsilat
  // anlık kurdan TL. Kur alınamazsa ödeme başlatılmaz (yanlış tutar riski).
  const rate = await getUsdTryRate();
  if (!rate) return back(city.id, "provider_error", "", lang);
  const tryCents = Math.ceil((cents * rate) / 100) * 100; // tam TL'ye yukarı yuvarla
  const tryAmount = (tryCents / 100).toFixed(2);

  const orderRef =
    "OL" +
    Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).slice(2, 8).toUpperCase();

  // Şehir kaydı ödeme başlamadan açılır — webhook döndüğünde hazır olsun.
  await ensureCity(city);

  // 1) Shopier tarafında tek seferlik "ürün" (ödeme taşıyıcısı) oluştur
  let payment;
  try {
    payment = await shopierFlow().createPaymentLink({
      title: `${CONFIG.siteName} — ${n.title} in ${city.name}`.slice(0, 100),
      description:
        `Bid of ${centsToUsd(cents)} (₺${tryAmount}) for "${n.title}" in ${city.name}, ` +
        `${city.country} on ${CONFIG.siteName}. Order ${orderRef}. ` +
        `The bid goes live automatically after payment.`,
      amount: tryAmount,
      currency: "TRY",
      productType: "digital",
      // Shopier'in görsel botu redirect takip etmiyor; apex→www yönlendirmesine
      // takılmasın diye görsel sabit, yönlendirmesiz bir adresten veriliyor.
      imageUrl: "https://raw.githubusercontent.com/mryaman/outbid/main/public/og.png",
      customNote: `Your bid is live in ${city.name}: ${siteUrl()}/city/${city.id}`,
      orderId: orderRef,
      hostedCheckout: Boolean(process.env.SHOPIER_SHOP_SLUG),
      shopSlug: process.env.SHOPIER_SHOP_SLUG,
    });
  } catch (e) {
    console.error(
      "shopier create failed",
      e,
      JSON.stringify((e as { details?: unknown })?.details ?? null)
    );
    return back(city.id, "provider_error", "", lang);
  }

  // 2) Beklemedeki ödemeyi kaydet (webhook bununla eşleşecek)
  const pending = await createPendingPayment({
    orderRef,
    productId: payment.productId,
    kind: n.kind,
    dedupeKey: cityDedupeKey(city.id, n.dedupeKey),
    targetUrl: n.targetUrl,
    title: n.title,
    iconUrl: n.iconUrl,
    amountCents: cents,
    amountTryCents: tryCents,
    ip: clientIp(req),
    cityId: city.id,
    category,
  });

  if (pending.error) {
    // DB reddetti — Shopier'de açılan ürünü geri temizle
    try {
      await shopierClient().products.delete(payment.productId);
    } catch {
      /* best effort */
    }
    return back(city.id, pending.error, "", lang);
  }

  // 3) Tarayıcıyı Shopier'e gönder
  if (payment.checkoutHtml) {
    return new NextResponse(payment.checkoutHtml, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
  return NextResponse.redirect(payment.paymentUrl, 303);
}
