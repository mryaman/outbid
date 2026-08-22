import { HREFLANG, type Locale } from "./index";

/**
 * Ülke adını kullanıcının dilinde ver. Şehir adları çeviri listesi
 * gerektirir (5.000 şehir), ama ülke adları Intl'den bedava geliyor —
 * "Стамбул, Турция" / "Estambul, Turquía" gibi doğal başlıklar için yeterli.
 */
const CACHE = new Map<string, Intl.DisplayNames>();

export function countryName(cc: string, locale: Locale, fallback: string): string {
  if (!/^[A-Za-z]{2}$/.test(cc)) return fallback;
  try {
    const key = HREFLANG[locale];
    let dn = CACHE.get(key);
    if (!dn) {
      dn = new Intl.DisplayNames([key], { type: "region" });
      CACHE.set(key, dn);
    }
    return dn.of(cc.toUpperCase()) ?? fallback;
  } catch {
    return fallback;
  }
}
