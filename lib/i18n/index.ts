/**
 * Çok dilli SEO katmanı.
 *
 * İngilizce kök dizinde (`/`) kalır — kanonik dil odur. Diğer 11 dil
 * `/ru`, `/zh` ... öneki alır. Her sayfa kendi hreflang alternatiflerini
 * yayınlar, x-default İngilizce'yi gösterir.
 *
 * Amaç: outbid.lol ve benzeri panolara giden İngilizce dışı aramaları
 * ("платный рейтинг", "竞价排行榜", "경매 순위", "subasta de posiciones")
 * bu siteye çekmek.
 */

import type { Dict } from "./types";
import { en } from "./locales/en";
import { ru } from "./locales/ru";
import { zh } from "./locales/zh";
import { ko } from "./locales/ko";
import { es } from "./locales/es";
import { ja } from "./locales/ja";
import { de } from "./locales/de";
import { fr } from "./locales/fr";
import { pt } from "./locales/pt";
import { hi } from "./locales/hi";
import { id } from "./locales/id";
import { tr } from "./locales/tr";
import { ar } from "./locales/ar";
import { vi } from "./locales/vi";
import { th } from "./locales/th";
import { it } from "./locales/it";
import { pl } from "./locales/pl";
import { uk } from "./locales/uk";

export type { Dict } from "./types";

export const LOCALES = [
  "en", "ru", "zh", "ko", "es", "ja",
  "de", "fr", "pt", "hi", "id", "tr",
  "ar", "vi", "th", "it", "pl", "uk",
] as const;

export type Locale = (typeof LOCALES)[number];

/** İngilizce dışındaki diller — `/[lang]` rotasının statik parametreleri. */
export const ALT_LOCALES = LOCALES.filter((l) => l !== "en") as Exclude<Locale, "en">[];

const DICTS: Record<Locale, Dict> = {
  en, ru, zh, ko, es, ja, de, fr, pt, hi, id, tr, ar, vi, th, it, pl, uk,
};

export function dict(l: Locale): Dict {
  return DICTS[l] ?? en;
}

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

/** <html lang> ve hreflang değeri. */
export const HREFLANG: Record<Locale, string> = {
  en: "en",
  ru: "ru",
  zh: "zh-Hans",
  ko: "ko",
  es: "es",
  ja: "ja",
  de: "de",
  fr: "fr",
  pt: "pt-BR",
  hi: "hi",
  id: "id",
  tr: "tr",
  ar: "ar",
  vi: "vi",
  th: "th",
  it: "it",
  pl: "pl",
  uk: "uk",
};

/** Open Graph locale kodu. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
  zh: "zh_CN",
  ko: "ko_KR",
  es: "es_ES",
  ja: "ja_JP",
  de: "de_DE",
  fr: "fr_FR",
  pt: "pt_BR",
  hi: "hi_IN",
  id: "id_ID",
  tr: "tr_TR",
  ar: "ar_AR",
  vi: "vi_VN",
  th: "th_TH",
  it: "it_IT",
  pl: "pl_PL",
  uk: "uk_UA",
};

/** Dil seçicide gösterilen ad — her zaman kendi dilinde. */
export const ENDONYM: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  zh: "中文",
  ko: "한국어",
  es: "Español",
  ja: "日本語",
  de: "Deutsch",
  fr: "Français",
  pt: "Português",
  hi: "हिन्दी",
  id: "Bahasa Indonesia",
  tr: "Türkçe",
  ar: "العربية",
  vi: "Tiếng Việt",
  th: "ไทย",
  it: "Italiano",
  pl: "Polski",
  uk: "Українська",
};

/** Yazı yönü. Arapça sağdan sola. */
export const DIR: Record<Locale, "ltr" | "rtl"> = Object.fromEntries(
  LOCALES.map((l) => [l, l === "ar" ? "rtl" : "ltr"])
) as Record<Locale, "ltr" | "rtl">;

/**
 * Bir yolun o dildeki karşılığı.
 * localePath("ru", "/categories") -> "/ru/categories"
 * localePath("en", "/categories") -> "/categories"
 */
export function localePath(l: Locale, path = ""): string {
  const p = path === "/" ? "" : path;
  return l === "en" ? p || "/" : `/${l}${p}`;
}

/**
 * metadata.alternates.languages için hreflang haritası.
 * Next.js `x-default`'ı da destekliyor.
 */
export function altLanguages(path = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of LOCALES) out[HREFLANG[l]] = localePath(l, path);
  out["x-default"] = localePath("en", path);
  return out;
}

/** "{pct}" gibi yer tutucuları doldurur. */
export function fill(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}
