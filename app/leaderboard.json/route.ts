import { CONFIG } from "@/lib/config";
import { getBoard, getCityLeague, getStats } from "@/lib/db";
import { CITIES } from "@/lib/cities";

/**
 * Herkese açık, makine-okunur sıralama. Üretken arama motorları ve
 * ajanlar "şu an <şehir>'de 1 numara kim" sorusuna HTML kazımadan cevap
 * verebilsin diye. robots.txt /api/ dizinini kapattığı için bu uç
 * kasten kök dizinde duruyor.
 */

export const revalidate = 60;

export async function GET() {
  const [board, league, stats] = await Promise.all([
    getBoard(100),
    getCityLeague(100),
    getStats(),
  ]);

  const payload = {
    site: CONFIG.url,
    name: CONFIG.siteName,
    description:
      `City-by-city pay-to-rank leaderboard. Rank equals money paid; every payment decays ` +
      `${Math.round((1 - CONFIG.decayPerDay) * 100)}% per day.`,
    generatedAt: new Date().toISOString(),
    rules: {
      decayPerDay: 1 - CONFIG.decayPerDay,
      formula: "effective = paid * 0.9 ^ daysSincePayment",
      minBidUsd: CONFIG.minBidCents / 100,
      maxBidUsd: CONFIG.maxBidCents / 100,
      dropoutUsd: CONFIG.dropoutCents / 100,
      currencyQuoted: "USD",
      currencyCharged: "TRY",
      totalCities: CITIES.length,
    },
    stats: {
      listings: stats.listings,
      visits: stats.visits,
      online: stats.online,
      citiesInPlay: league.length,
    },
    costToTakeTopSpotUsd: board.length
      ? Math.round(board[0].effective_cents + 1) / 100
      : CONFIG.minBidCents / 100,
    cityLeague: league.map((x, i) => ({
      rank: i + 1,
      city: x.name,
      country: x.country,
      countryCode: x.country_code,
      url: `${CONFIG.url}/city/${x.id}`,
      effectiveUsd: x.effective_cents / 100,
      listings: x.listings,
      topProfile: x.top_title ?? null,
    })),
    worldBoard: board.map((r, i) => ({
      rank: i + 1,
      title: r.title,
      kind: r.kind,
      url: r.kind === "url" ? r.target_url : `https://x.com/${r.title.replace(/^@/, "")}`,
      city: r.city_name ?? null,
      category: r.category,
      effectiveUsd: r.effective_cents / 100,
      lifetimePaidUsd: r.lifetime_cents / 100,
      outboundClicks: r.click_count,
      lastBidAt: r.last_bid_at,
    })),
  };

  return Response.json(payload, {
    headers: {
      "cache-control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
      "access-control-allow-origin": "*",
    },
  });
}
