import { CONFIG } from "./config";
// Girdi normalizasyonu — tek alan, iki tip. Detaylar: docs/blueprint

export type Normalized = {
  kind: "x" | "url";
  dedupeKey: string;
  targetUrl: string;
  title: string;
  iconUrl: string;
};

const X_HANDLE = /^@?([A-Za-z0-9_]{1,15})$/;
const X_URL = /^https?:\/\/(?:www\.)?(?:x|twitter)\.com\/@?([A-Za-z0-9_]{1,15})\/?/i;

/**
 * Tek input alanı, iki tip. Kullanıcı tip seçmez — sunucu anlar.
 * @handle veya x.com linki  → X profili
 * diğer her şey             → URL
 */
export function normalizeInput(raw: string): Normalized {
  const input = raw.trim();
  if (!input) throw new Error("Enter a link or an @handle.");

  // --- X profili ---
  const xUrl = input.match(X_URL);
  const xHandle = !input.includes("/") && !input.includes(".") ? input.match(X_HANDLE) : null;
  const handle = xUrl?.[1] ?? xHandle?.[1];

  if (handle) {
    const h = handle.toLowerCase();
    // X'in rezerve yolları hesap değil
    if (["home", "explore", "i", "search", "settings", "notifications"].includes(h)) {
      throw new Error("That is not an X profile.");
    }
    return {
      kind: "x",
      dedupeKey: `x:${h}`,
      targetUrl: `https://x.com/${handle}`,
      title: `@${handle}`,
      // gstatic favicon X'te işe yaramaz (hepsi aynı X logosunu döndürür)
      iconUrl: `https://unavatar.io/x/${handle}`,
    };
  }

  // --- URL ---
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`);
  } catch {
    throw new Error("That is not a valid link.");
  }

  if (!/^https?:$/.test(url.protocol)) throw new Error("Only http and https links are accepted.");

  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (!host.includes(".")) throw new Error("That is not a valid domain.");
  if (CONFIG.blockedHosts.includes(host as never)) {
    throw new Error("Shorteners and chat invites are not accepted.");
  }

  // Affiliate / referral suistimalini keser — outbid.lol'ün de yaptığı şey.
  url.search = "";
  url.hash = "";

  const clean = url.toString().replace(/\/$/, "");

  return {
    kind: "url",
    dedupeKey: `url:${host}`, // aynı domainin farklı yolları TEK kayıt
    targetUrl: clean,
    title: host,
    iconUrl:
      "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON" +
      `&fallback_opts=TYPE,SIZE,URL&size=128&url=${encodeURIComponent(url.origin)}`,
  };
}

/** Çıkış linkine kendi UTM'ini ekler. /go/:id redirect'inde kullanılır. */
export function withUtm(targetUrl: string): string {
  try {
    const u = new URL(targetUrl);
    u.searchParams.set("utm_source", "outbid.love");
    return u.toString();
  } catch {
    return targetUrl;
  }
}
