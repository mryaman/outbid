import { CONFIG, centsToUsd } from "@/lib/config";
import { CATEGORIES } from "@/lib/categories";
import { CITIES, topCities } from "@/lib/cities";
import { LOCALES, ENDONYM, localePath } from "@/lib/i18n";

/**
 * llms.txt — üretken arama motorları ve ajanlar için siteyi tek dosyada
 * özetleyen, insan da okuyabilen markdown. Amaç: bir modele "outbid.love
 * nedir / <şehir>'de 1 numara kim / outbid.lol'den farkı ne" diye
 * sorulduğunda cevabı tahmin etmek yerine buradan okusun.
 */

export const revalidate = 3600;

const U = CONFIG.url;
const PCT = Math.round((1 - CONFIG.decayPerDay) * 100);

export async function GET() {
  const body = `# outbid.love

> A city-by-city pay-to-rank leaderboard. Every city on Earth has a #1: whoever has the largest live payment on that city sits at the top of it. Every payment loses ${PCT}% of its value per day, so nobody owns a city permanently and the price of the top falls every hour. Minimum ${centsToUsd(
    CONFIG.minBidCents
  )}, no account required, card payment via Shopier.

## The rule in one line

effective_value = amount_paid × 0.9 ^ days_since_payment

A ${centsToUsd(10000)} payment is worth ${centsToUsd(4783)} after 7 days and ${centsToUsd(
    2288
  )} after 14. A listing leaves the board once its effective value falls below ${centsToUsd(
    CONFIG.dropoutCents
  )}.

## Key facts

- Type: pay-to-rank leaderboard / attention market, organised by city
- Cities: ${CITIES.length.toLocaleString("en-US")}, each with its own ranking page at ${U}/city/<slug>
- Decay: ${PCT}% per day, continuous, applied from the moment payment clears
- Minimum: ${centsToUsd(CONFIG.minBidCents)} · Maximum: ${centsToUsd(CONFIG.maxBidCents)}
- Cost of #1 in a city: one cent more than that city's current leader after decay, falling hourly; an unclaimed city costs the minimum
- Listable: an X, TikTok, Instagram, LinkedIn, YouTube or GitHub profile, or any website you own
- Accounts: none — no signup, no email
- Payment: card via Shopier; quoted in USD, charged in Turkish lira at the live rate
- Outbound links: nofollow, counted redirect; click counts are public
- City league: cities are ranked against each other by everything still burning inside them
- Categories: ${CATEGORIES.length}, cross-cutting the cities
- Languages: ${LOCALES.length} (${LOCALES.map((l) => ENDONYM[l]).join(", ")})
- Difference from outbid.lol: there a bid keeps its amount until raised or outranked, so the price of #1 only climbs; here payments decay, so #1 is repeatedly winnable

## Core pages

- [Globe and city league](${U}/): the live world map and the ranking of cities
- [World board](${U}/board): every listing across every city
- [How it works](${U}/how-it-works): decay maths, lifespan tables, glossary
- [FAQ](${U}/faq): payment, moderation, refunds, backlinks, lifespan
- [outbid.love vs outbid.lol](${U}/vs/outbid-lol): side-by-side comparison
- [Categories](${U}/categories): ${CATEGORIES.length} separate rankings
- [Rules](${U}/rules) · [Pricing](${U}/price) · [Terms](${U}/terms) · [Privacy](${U}/privacy) · [Refunds](${U}/policy)

## Machine-readable data

- [Live leaderboard JSON](${U}/leaderboard.json): current ranks, effective values, city league, click counts
- [Full text for models](${U}/llms-full.txt): every question and answer in one file
- [Sitemap](${U}/sitemap.xml)

## Translated editions

${LOCALES.filter((l) => l !== "en")
  .map((l) => `- [${ENDONYM[l]}](${U}${localePath(l, "/")})`)
  .join("\n")}

Every city page exists in all ${LOCALES.length} languages: ${U}/<lang>/city/<slug>.

## Largest city pages

${topCities(40)
  .map((c) => `- [${c.name}, ${c.country}](${U}/city/${c.id})`)
  .join("\n")}

## Categories

${CATEGORIES.map((c) => `- [${c.name}](${U}/categories/${c.slug})`).join("\n")}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
