import type { MetadataRoute } from "next";
import { CONFIG } from "@/lib/config";
import { CATEGORIES } from "@/lib/categories";
import { topCities } from "@/lib/cities";
import { LOCALES, HREFLANG, localePath } from "@/lib/i18n";

/**
 * Sitemap + hreflang.
 *
 * Az sayıdaki "gövde" sayfa (ana sayfa, board, kategoriler) hreflang
 * alternatiflerini sitemap içinde de bildiriyor. Şehir sayfaları çok
 * kalabalık olduğu için orada alternatif blokları tekrarlanmıyor —
 * hreflang zaten her sayfanın <head>'inde var ve Google için yeterli;
 * aksi hâlde dosya gereksiz yere megabaytlarca şişerdi.
 */

const abs = (p: string) => `${CONFIG.url}${p === "/" ? "" : p}`;

/** Bir yolun tüm dillerdeki karşılığı — hreflang haritası. */
function langs(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of LOCALES) out[HREFLANG[l]] = abs(localePath(l, path));
  out["x-default"] = abs(localePath("en", path));
  return out;
}

function multilingual(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number
): MetadataRoute.Sitemap {
  const alternates = { languages: langs(path) };
  return LOCALES.map((l) => ({
    url: abs(localePath(l, path)),
    changeFrequency,
    priority: l === "en" ? priority : Math.max(0.1, priority - 0.1),
    alternates,
  }));
}

/** Çevrilmiş şehir sayfaları: en büyük şehirler her dilde. */
const CITIES_PER_LOCALE = 400;
/** İngilizce tarafta uzun kuyruk. */
const CITIES_EN = 1500;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const englishOnly = [
    { p: "/how-it-works", f: "monthly" as const, pr: 0.8 },
    { p: "/faq", f: "monthly" as const, pr: 0.8 },
    { p: "/outbid-lol-alternative", f: "weekly" as const, pr: 0.9 },
    { p: "/vs/outbid-lol", f: "monthly" as const, pr: 0.8 },
    { p: "/about", f: "monthly" as const, pr: 0.5 },
    { p: "/rules", f: "weekly" as const, pr: 0.4 },
    { p: "/price", f: "monthly" as const, pr: 0.4 },
    { p: "/terms", f: "yearly" as const, pr: 0.2 },
    { p: "/privacy", f: "yearly" as const, pr: 0.2 },
    { p: "/policy", f: "yearly" as const, pr: 0.2 },
  ];

  const enCities = topCities(CITIES_EN).map((c) => ({
    url: abs(`/city/${c.id}`),
    changeFrequency: "hourly" as const,
    priority: 0.7,
  }));

  const localizedCities = LOCALES.filter((l) => l !== "en").flatMap((l) =>
    topCities(CITIES_PER_LOCALE).map((c) => ({
      url: abs(localePath(l, `/city/${c.id}`)),
      changeFrequency: "hourly" as const,
      priority: 0.6,
    }))
  );

  return [
    ...multilingual("/", "hourly", 1),
    ...multilingual("/board", "hourly", 0.9),
    ...multilingual("/categories", "daily", 0.8),
    ...CATEGORIES.flatMap((c) => multilingual(`/categories/${c.slug}`, "daily", 0.6)),
    ...enCities,
    ...localizedCities,
    ...englishOnly.map((e) => ({
      url: abs(e.p),
      lastModified: now,
      changeFrequency: e.f,
      priority: e.pr,
    })),
  ];
}
