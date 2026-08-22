import { NextResponse } from "next/server";
import { searchCities, flagOf } from "@/lib/cities";
import { getCityLeague } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Şehir araması. Eşleşen şehirler gömülü listeden, üzerlerindeki para
 * ligden geliyor — böylece arama sonucunda "burada ne dönüyor" görünüyor.
 */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  const cities = searchCities(q, 8);
  if (!cities.length) return NextResponse.json({ cities: [] });

  const league = await getCityLeague(500);
  const money = new Map(league.map((l) => [l.id, l]));

  return NextResponse.json({
    cities: cities.map((c) => {
      const m = money.get(c.id);
      return {
        id: c.id,
        name: c.name,
        country: c.country,
        cc: c.cc,
        flag: flagOf(c.cc),
        cents: m?.effective_cents ?? 0,
        listings: m?.listings ?? 0,
      };
    }),
  });
}
