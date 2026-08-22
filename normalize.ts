import { CONFIG } from "./config";

/**
 * Girdi normalizasyonu — tek alan, çok platform.
 * Kullanıcı tip seçmez: @handle, sosyal profil linki ya da kendi sitesi;
 * sunucu ne olduğunu anlar, ikonu ve başlığı kendisi çıkarır.
 *
 * Veritabanındaki `kind` yalnızca 'x' | 'url' olabilir (mevcut kısıt).
 * Platform ayrımı dedupe_key ve hedef URL üzerinden korunur; arayüz rozetini
 * `platformOf()` hedef adresten türetir.
 */

export type Platform = "x" | "instagram" | "tiktok" | "linkedin" | "youtube" | "github" | "web";

export type Normalized = {
  kind: "x" | "url";
  platform: Platform;
  dedupeKey: string;   // şehir ön eki olmadan — şehri çağıran ekler
  targetUrl: string;
  title: string;
  iconUrl: string;
};

const X_HANDLE = /^([A-Za-z0-9_]{1,15})$/;   // '@' olmadan gövde
const X_URL = /^https?:\/\/(?:www\.)?(?:x|twitter)\.com\/@?([A-Za-z0-9_]{1,15})(?:[/?#]|$)/i;
const IG_URL = /^https?:\/\/(?:www\.)?instagram\.com\/@?([A-Za-z0-9._]{1,30})(?:[/?#]|$)/i;
const TT_URL = /^https?:\/\/(?:www\.)?tiktok\.com\/@([A-Za-z0-9._]{1,24})(?:[/?#]|$)/i;
const YT_URL = /^https?:\/\/(?:www\.)?youtube\.com\/@([A-Za-z0-9._-]{1,30})(?:[/?#]|$)/i;
const GH_URL = /^https?:\/\/(?:www\.)?github\.com\/([A-Za-z0-9-]{1,39})\/?$/i;
const LI_USER = /^https?:\/\/(?:[a-z]{2,3}\.)?linkedin\.com\/in\/([A-Za-z0-9À-ɏ-]{1,100})(?:[/?#]|$)/i;
const LI_ORG = /^https?:\/\/(?:[a-z]{2,3}\.)?linkedin\.com\/company\/([A-Za-z0-9-]{1,100})(?:[/?#]|$)/i;

const RESERVED = ["home", "explore", "i", "search", "settings", "notifications", "login", "signup"];

// Not: profil fotoğrafı çekilmiyor. Arayüzde her kayıt platformunun kendi
// amblemini gösteriyor (components/PlatformIcon.tsx), web siteleri dünya
// simgesini. iconUrl alanı şema uyumu için duruyor, boş geçiliyor.

/** '@' ile başlayıp X handle'ı olamayan girdi için anlaşılır mesaj. */
function handleError(body: string): string {
  if (!body) return "Type a handle after the @, or paste a full profile link.";
  if (body.includes("/")) return "Paste the full profile link, starting with https://";
  if (body.includes("."))
    return "X handles have no dots. For Instagram, TikTok or YouTube, paste the full profile link.";
  if (/^[A-Za-z0-9_]+$/.test(body)) return "X handles are at most 15 characters.";
  return "An X handle can only contain letters, digits and _ . For other platforms, paste the full profile link.";
}

export function normalizeInput(raw: string): Normalized {
  const input = raw.trim();
  if (!input) throw new Error("Enter a link or an @handle.");

  // --- X: çıplak @handle ya da x.com linki ---
  // '@' ile başlayan girdi HER ZAMAN bir profil adı beyanıdır ve asla serbest
  // URL dalına düşmez. (Aksi halde "@zeynep.k" sessizce https://zeynep.k/
  // adresine giden bir web kaydına dönüşüyordu.)
  // Şemasız yapıştırılan linkler ("x.com/ali", "instagram.com/zeynep") de
  // platform olarak tanınsın: aksi halde serbest URL dalına düşüp
  // dedupe_key'i `url:instagram.com` oluyor ve o şehirde ikinci bir
  // Instagram kaydı açılamıyordu.
  const hasAt = input.startsWith("@");
  const urlish = /^https?:\/\//i.test(input) ? input : `https://${input}`;

  const xUrl = hasAt ? null : urlish.match(X_URL);
  let handle = xUrl?.[1];

  if (!handle) {
    const body = hasAt ? input.slice(1) : input;
    if (hasAt || (!body.includes("/") && !body.includes("."))) {
      const m = body.match(X_HANDLE);
      if (m) handle = m[1];
      else if (hasAt) throw new Error(handleError(body));
    }
  }

  if (handle) {
    const h = handle.toLowerCase();
    if (RESERVED.includes(h)) throw new Error("That is not an X profile.");
    return {
      kind: "x",
      platform: "x",
      dedupeKey: `x:${h}`,
      targetUrl: `https://x.com/${handle}`,
      title: `@${handle}`,
      iconUrl: "",
    };
  }

  // --- Diğer sosyal profiller ---
  const ig = urlish.match(IG_URL);
  if (ig && !RESERVED.includes(ig[1].toLowerCase())) {
    return {
      kind: "url",
      platform: "instagram",
      dedupeKey: `instagram:${ig[1].toLowerCase()}`,
      targetUrl: `https://instagram.com/${ig[1]}`,
      title: `@${ig[1]}`,
      iconUrl: "",
    };
  }

  const tt = urlish.match(TT_URL);
  if (tt) {
    return {
      kind: "url",
      platform: "tiktok",
      dedupeKey: `tiktok:${tt[1].toLowerCase()}`,
      targetUrl: `https://tiktok.com/@${tt[1]}`,
      title: `@${tt[1]}`,
      iconUrl: "",
    };
  }

  const yt = urlish.match(YT_URL);
  if (yt) {
    return {
      kind: "url",
      platform: "youtube",
      dedupeKey: `youtube:${yt[1].toLowerCase()}`,
      targetUrl: `https://youtube.com/@${yt[1]}`,
      title: `@${yt[1]}`,
      iconUrl: "",
    };
  }

  const gh = urlish.match(GH_URL);
  if (gh) {
    return {
      kind: "url",
      platform: "github",
      dedupeKey: `github:${gh[1].toLowerCase()}`,
      targetUrl: `https://github.com/${gh[1]}`,
      title: gh[1],
      iconUrl: "",
    };
  }

  const li = urlish.match(LI_USER) ?? urlish.match(LI_ORG);
  if (li) {
    const isOrg = LI_ORG.test(urlish);
    const slug = li[1];
    return {
      kind: "url",
      platform: "linkedin",
      dedupeKey: `linkedin:${(isOrg ? "co-" : "") + slug.toLowerCase()}`,
      targetUrl: `https://linkedin.com/${isOrg ? "company" : "in"}/${slug}`,
      title: slug.replace(/-[0-9a-f]{4,}$/i, "").replace(/-/g, " "),
      iconUrl: "",
    };
  }

  // --- Serbest URL ---
  let url: URL;
  try {
    url = new URL(urlish);
  } catch {
    throw new Error("That is not a valid link.");
  }

  if (!/^https?:$/.test(url.protocol)) throw new Error("Only http and https links are accepted.");

  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (!host.includes(".")) throw new Error("That is not a valid domain.");
  if (CONFIG.blockedHosts.includes(host as never)) {
    throw new Error("Shorteners and chat invites are not accepted.");
  }

  // Affiliate / referral suistimalini keser.
  url.search = "";
  url.hash = "";
  const clean = url.toString().replace(/\/$/, "");

  return {
    kind: "url",
    platform: "web",
    dedupeKey: `url:${host}`, // aynı domainin farklı yolları TEK kayıt
    targetUrl: clean,
    title: host,
    iconUrl: "",
  };
}

/** Kaydın şehir içindeki tekilleştirme anahtarı: aynı kişi başka şehirde ayrı kayıt. */
export function cityDedupeKey(cityId: string, key: string): string {
  return `${cityId}|${key}`;
}

/** Rozet için: hedef adresten platformu geri okur. */
export function platformOf(targetUrl: string): Platform {
  const u = targetUrl.toLowerCase();
  if (/(^|\/\/)(www\.)?(x|twitter)\.com\//.test(u)) return "x";
  if (u.includes("instagram.com/")) return "instagram";
  if (u.includes("tiktok.com/")) return "tiktok";
  if (u.includes("linkedin.com/")) return "linkedin";
  if (u.includes("youtube.com/")) return "youtube";
  if (u.includes("github.com/")) return "github";
  return "web";
}

export const PLATFORM_LABEL: Record<Platform, string> = {
  x: "X",
  instagram: "Instagram",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  github: "GitHub",
  web: "Web",
};

/** Çıkış linkine kendi UTM'ini ekler. /go?id= redirect'inde kullanılır. */
export function withUtm(targetUrl: string): string {
  try {
    const u = new URL(targetUrl);
    u.searchParams.set("utm_source", "outbid.love");
    return u.toString();
  } catch {
    return targetUrl;
  }
}
