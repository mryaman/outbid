/**
 * Yapısal veri (JSON-LD) üreticileri.
 *
 * Bunlar hem klasik SEO (rich result) hem de GEO için: ChatGPT, Perplexity,
 * Google AI Overviews gibi üretken arama motorları sayfayı alıntılarken
 * önce makine-okunur bloklara bakıyor. FAQPage + HowTo + ItemList üçlüsü
 * "outbid.love nedir / nasıl 1 olurum / şu an lider kim" sorularının
 * cevabını doğrudan veriyor.
 */

import { CONFIG } from "@/lib/config";
import type { Row } from "@/lib/db";
import type { QA } from "@/lib/i18n/types";

const U = CONFIG.url;

export function jsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export function websiteLd(desc: string, lang: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${U}/#website`,
    name: CONFIG.siteName,
    alternateName: "outbid love",
    url: U,
    description: desc,
    inLanguage: lang,
    publisher: { "@id": `${U}/#org` },
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${U}/#org`,
    name: CONFIG.siteName,
    url: U,
    logo: `${U}/og.png`,
    description:
      "Operator of outbid.love, a pay-to-rank leaderboard where every bid decays 10% per day.",
  };
}

/** Ürünün kendisi: fiyatı ve mekaniği makine-okunur biçimde. */
export function serviceLd(desc: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${U}/#service`,
    name: `${CONFIG.siteName} listing`,
    serviceType: "Paid ranking placement on a decaying leaderboard",
    description: desc,
    provider: { "@id": `${U}/#org` },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: (CONFIG.minBidCents / 100).toFixed(2),
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: (CONFIG.minBidCents / 100).toFixed(2),
        maxPrice: (CONFIG.maxBidCents / 100).toFixed(2),
        priceCurrency: "USD",
        valueAddedTaxIncluded: true,
      },
      availability: "https://schema.org/InStock",
      url: U,
    },
  };
}

export function faqLd(items: QA[], lang: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function howToLd(name: string, steps: string[], lang: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    inLanguage: lang,
    totalTime: "PT3M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: (CONFIG.minBidCents / 100).toFixed(2),
    },
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.split(/[.:]/)[0].slice(0, 80),
      text: s,
    })),
  };
}

/** Canlı sıralamanın kendisi — üretken motorlar "şu an lider kim" derken bunu okur. */
export function leaderboardLd(
  rows: Row[],
  opts: { name: string; url: string; lang: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    url: opts.url,
    inLanguage: opts.lang,
    numberOfItems: rows.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: rows.slice(0, 50).map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.title,
      url: r.kind === "url" ? r.target_url : `https://x.com/${r.title.replace(/^@/, "")}`,
    })),
  };
}

export function breadcrumbLd(trail: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.url,
    })),
  };
}

/**
 * Şehir sayfası için Place + coğrafi koordinat.
 * "kim 1 numara <şehir>" sorularında üretken motorların doğru şehirle
 * eşleştirmesini sağlıyor.
 */
export function cityLd(city: {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  pop: number;
}, opts: { url: string; lang: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${opts.url}#place`,
    name: city.name,
    url: opts.url,
    description: opts.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressCountry: city.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.lat,
      longitude: city.lon,
    },
    additionalProperty: {
      "@type": "PropertyValue",
      name: "population",
      value: city.pop,
    },
  };
}

/** Şehir ligi — "en çok harcayan şehirler" sorusunun makine-okunur cevabı. */
export function leagueLd(
  rows: { id: string; name: string; country: string; effective_cents: number }[],
  opts: { name: string; url: string; lang: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    url: opts.url,
    inLanguage: opts.lang,
    numberOfItems: rows.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: rows.slice(0, 50).map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${r.name}, ${r.country}`,
      url: `${U}/city/${r.id}`,
    })),
  };
}
