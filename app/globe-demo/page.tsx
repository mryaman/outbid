import GlobeSection from "@/components/GlobeSection";
import LeagueTable from "@/components/LeagueTable";
import { topCities } from "@/lib/cities";
import type { GlobeCity } from "@/components/GlobeView";
import type { LeagueRow } from "@/lib/db";

/** Yerel önizleme — veritabanına erişimi olmayan ortamda küreyi denemek için. */

export const metadata = {
  title: "Globe preview",
  robots: { index: false, follow: false },
};

const SEED: [string, string, string, string, number, number, number, number][] = [
  ["istanbul-tr", "Istanbul", "Türkiye", "TR", 41.0138, 28.9497, 70630, 4],
  ["london-gb", "London", "United Kingdom", "GB", 51.5085, -0.1257, 40713, 2],
  ["dubai-ae", "Dubai", "United Arab Emirates", "AE", 25.0772, 55.3093, 37502, 1],
  ["los-angeles-us", "Los Angeles", "United States", "US", 34.0522, -118.2437, 27876, 1],
  ["tokyo-jp", "Tokyo", "Japan", "JP", 35.6895, 139.6917, 24665, 1],
  ["lagos-ng", "Lagos", "Nigeria", "NG", 6.4541, 3.3947, 21617, 1],
  ["sao-paulo-br", "São Paulo", "Brazil", "BR", -23.5475, -46.6361, 15166, 1],
  ["berlin-de", "Berlin", "Germany", "DE", 52.5244, 13.4105, 13860, 1],
  ["mumbai-in", "Mumbai", "India", "IN", 19.0728, 72.8826, 12257, 1],
  ["seoul-kr", "Seoul", "South Korea", "KR", 37.566, 126.9784, 10254, 1],
  ["ankara-tr", "Ankara", "Türkiye", "TR", 39.9199, 32.8543, 6699, 1],
  ["bogota-co", "Bogotá", "Colombia", "CO", 4.6097, -74.0817, 5660, 1],
  ["izmir-tr", "İzmir", "Türkiye", "TR", 38.4127, 27.1384, 3950, 1],
];

export default function GlobeDemo() {
  const active: GlobeCity[] = SEED.map(([id, name, country, cc, lat, lon, cents, listings], i) => ({
    id, name, country, cc, lat, lon, cents, listings, rank: i + 1,
  }));
  const ids = new Set(active.map((a) => a.id));
  const cities = [
    ...active,
    ...topCities(240).filter((c) => !ids.has(c.id)).map((c) => ({
      id: c.id, name: c.name, country: c.country, cc: c.cc,
      lat: c.lat, lon: c.lon, cents: 0, listings: 0, rank: 0,
    })),
  ];

  const rows: LeagueRow[] = SEED.map(([id, name, country, cc, lat, lon, cents, listings], i) => ({
    id, name, country, country_code: cc, lat, lon, population: 0,
    listings, effective_cents: cents, lifetime_cents: cents,
    last_bid_at: new Date().toISOString(),
    top_title: "@someone", top_icon_url: null, top_listing_id: null, top_kind: "x",
    league_rank: i + 1,
  }));

  return (
    <main className="page page--wide">
      <h1>Globe preview</h1>
      <GlobeSection cities={cities} />
      <LeagueTable rows={rows} />
    </main>
  );
}
