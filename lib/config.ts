// Tek ayar dosyası. Ekonomiyi ve fazı buradan çevir.

export const CONFIG = {
  siteName: "outbid.love",
  tagline: "Outbid for love.",
  url: "https://outbid.love",

  // --- FAZ ---
  // 'founding' : ödeme kapalı, ilk N kayıt ücretsiz kuruluş kredisiyle giriyor
  // 'paid'     : ödeme açık (Shopier)
  // Deploy'suz değiştirmek için Netlify'da PHASE=paid env değişkenini kullan.
  phase: (process.env.PHASE === "paid" ? "paid" : "founding") as "founding" | "paid",

  // --- Kuruluş fazı ---
  foundingSlots: 30,
  foundingCents: 1000, // herkese $10'lık çürüyen kredi

  // --- Şehrin ilk kaydı ücretsiz ---
  // Bir şehirde canlı kayıt yoksa o şehri açan ilk kişi ödemeden giriyor.
  // Sembolik tutar: min teklif $5 olduğu için ilk ödeyen anında geçer;
  // amaç boş şehri doldurmak, bedava #1 dağıtmak değil.
  // DB'deki app_config.free_city_cents asıl otorite — ikisini birlikte değiştir.
  // DB'deki app_config.free_city_cents ile AYNI olmalı — burası sadece gösterim
  // (FreeClaimForm "credit" rozeti ve /api/claim fallback'i). 300 yazıyordu ama
  // DB $2 veriyordu: form "$3 bedava" deyip $2 yazıyordu.
  freeFirstCents: 200, // $2 → %10/gün çürümeyle ~7 gün board'da kalır
  freeFirstPerIpHours: 24,

  // --- Ödemeli faz ---
  // DB'deki app_config (min_bid_cents / max_bid_cents) asıl otorite;
  // buradakiler arayüz gösterimi için. İkisini birlikte değiştir.
  // $3: ücretsiz şehir hakkının ($2) kesin üstünde olmalı — leaderboard
  // eşitliği `created_at asc` ile bozuluyor, yani $2 ödeyen bedava kaydı
  // geçemezdi. Shopier komisyonu ($3'te ~%6) bu tutarda hâlâ sorun değil.
  minBidCents: 300,    // $3
  stepCents: 100,      // $1 (şu an hiçbir yerde kullanılmıyor)
  maxBidCents: 500000,

  // --- Çürüme ---
  // Günde %10. 7 günde $100 → $48, 14 günde → $23.
  // db/schema.sql içindeki 0.90 ile AYNI olmalı — ikisini birlikte değiştir.
  decayPerDay: 0.9,
  dropoutCents: 100,   // $1 altına düşen board'dan çıkar

  // --- Moderasyon ---
  blockedHosts: [
    "bit.ly", "t.co", "tinyurl.com", "lnkd.in", "goo.gl", "ow.ly",
    "rebrand.ly", "cutt.ly", "is.gd", "buff.ly", "shorturl.at",
    "discord.gg", "discord.com", "t.me", "telegram.me", "wa.me",
  ] as string[],

  // Aynı IP'den saatte kaç kayıt
  submitsPerHourPerIp: 3,
} as const;

export function centsToUsd(c: number): string {
  const v = c / 100;
  return "$" + v.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(v) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

/** Bir tutarın N gün sonraki çürümüş değeri. */
export function decayed(cents: number, days: number): number {
  return Math.round(cents * Math.pow(CONFIG.decayPerDay, days));
}

/**
 * "Kaç saat sonra bu tutarın altına düşerim?"
 * Çürüme göstergesini besleyen fonksiyon — ürünün asıl özelliği bu.
 * Dönen değer saat cinsinden; hedef zaten geçilmişse 0.
 */
export function hoursUntilBelow(currentCents: number, targetCents: number): number {
  if (currentCents <= targetCents) return 0;
  if (targetCents <= 0) return Infinity;
  const days = Math.log(targetCents / currentCents) / Math.log(CONFIG.decayPerDay);
  return Math.max(0, days * 24);
}

/** "3 saat", "2 gün" gibi kısa süre metni. */
export function humanHours(h: number): string {
  if (!Number.isFinite(h)) return "—";
  if (h < 1) return `${Math.max(1, Math.round(h * 60))} min`;
  if (h < 48) return `${Math.round(h)}h`;
  return `${Math.round(h / 24)}d`;
}
