/**
 * Şehir sözlüğü — GeoNames türevi 5.000 şehir (nüfusa göre), koordinatlı.
 * Sunucu tarafında tutulur: arama ve doğrulama buradan geçer, veritabanına
 * yalnızca fiilen teklif alan şehirler yazılır (bkz. ensure_city RPC).
 *
 * Şehri kullanıcı serbest yazmıyor: seçtiği slug bu listede yoksa reddedilir.
 * Böylece "Istanbul / İstanbul / Constantinople" gibi çiftlenmeler oluşmuyor
 * ve küre üzerindeki konum her zaman doğru.
 */

import RAW from "@/data/cities.json";

export type City = {
  id: string;       // slug — istanbul-tr
  name: string;
  country: string;
  cc: string;       // ISO-3166 alpha-2
  lat: number;
  lon: number;
  pop: number;
  search: string;   // aramada taranan düz metin (aksansız + ülke takma adları)
};

export const CITIES = RAW as City[];

const BY_ID = new Map(CITIES.map((c) => [c.id, c]));

/** Aksanları düşürür, Türkçe harfleri latinleştirir. */
export function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function getCity(id: string | null | undefined): City | null {
  if (!id) return null;
  return BY_ID.get(id) ?? null;
}

export function isValidCity(id: string): boolean {
  return BY_ID.has(id);
}

/** Küre boş kalmasın diye kullanılan sabit "ambiyans" şehirleri. */
export function topCities(n = 220): City[] {
  return CITIES.slice(0, n);
}

/**
 * Arama: tam ad başlangıcı > kelime başlangıcı > içinde geçen,
 * eşitlikte nüfus. 5.000 kayıtta lineer tarama ~1ms.
 */
export function searchCities(q: string, limit = 8): City[] {
  const needle = fold(q);
  if (needle.length < 2) return [];

  const hits: { c: City; score: number }[] = [];
  for (const c of CITIES) {
    const hay = c.search;
    const at = hay.indexOf(needle);
    if (at < 0) continue;
    const nameFolded = fold(c.name);
    let score = 3;
    if (nameFolded === needle) score = 0;
    else if (nameFolded.startsWith(needle)) score = 1;
    else if (at === 0 || hay[at - 1] === " ") score = 2;
    hits.push({ c, score });
    if (hits.length > 400) break; // aşırı geniş sorguda erken çık
  }

  hits.sort((a, b) => a.score - b.score || b.c.pop - a.c.pop);
  return hits.slice(0, limit).map((h) => h.c);
}

/** Bayrak emojisi — ülke kodundan, ek varlık gerekmeden. */
export function flagOf(cc: string): string {
  if (!/^[A-Za-z]{2}$/.test(cc)) return "";
  return String.fromCodePoint(
    ...cc.toUpperCase().split("").map((ch) => 127397 + ch.charCodeAt(0))
  );
}
