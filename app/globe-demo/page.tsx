import GlobeSection from "@/components/GlobeSection";
import LeagueTable from "@/components/LeagueTable";
import Row from "@/components/Row";
import { topCities } from "@/lib/cities";
import { centsToUsd } from "@/lib/config";
import type { GlobeCity } from "@/components/GlobeView";
import type { LeagueRow, Row as R } from "@/lib/db";

/**
 * Tasarım önizlemesi — veritabanına erişimi olmayan ortamda küreyi, ligi ve
 * dolu bir şehir listesini denemek için.
 *
 * BURADAKİ HER SAYI VE HER PROFİL UYDURMA. Kimse bu kayıtlar için para
 * ödemedi; hiçbiri gerçek bir hesaba işaret etmiyor. Sayfa noindex ve
 * tepesinde uyarı şeridi var — canlı sayfalardaki rakamlar `city_league`
 * view'ından, yani gerçek ödemelerden geliyor.
 */

export const metadata = {
  title: "Design preview — sample data",
  robots: { index: false, follow: false },
};

// [id, ad, ülke, cc, lat, lon, etkin kuruş, kayıt sayısı]
const SEED: [string, string, string, string, number, number, number, number][] = [
  ["istanbul-tr", "Istanbul", "Türkiye", "TR", 41.0138, 28.9497, 70630, 9],
  ["london-gb", "London", "United Kingdom", "GB", 51.5085, -0.1257, 40713, 6],
  ["dubai-ae", "Dubai", "United Arab Emirates", "AE", 25.0772, 55.3093, 37502, 5],
  ["los-angeles-us", "Los Angeles", "United States", "US", 34.0522, -118.2437, 27876, 4],
  ["tokyo-jp", "Tokyo", "Japan", "JP", 35.6895, 139.6917, 24665, 4],
  ["lagos-ng", "Lagos", "Nigeria", "NG", 6.4541, 3.3947, 21617, 3],
  ["sao-paulo-br", "São Paulo", "Brazil", "BR", -23.5475, -46.6361, 15166, 3],
  ["berlin-de", "Berlin", "Germany", "DE", 52.5244, 13.4105, 13860, 3],
  ["mumbai-in", "Mumbai", "India", "IN", 19.0728, 72.8826, 12257, 2],
  ["seoul-kr", "Seoul", "South Korea", "KR", 37.566, 126.9784, 10254, 2],
  ["ankara-tr", "Ankara", "Türkiye", "TR", 39.9199, 32.8543, 6699, 2],
  ["bogota-co", "Bogotá", "Colombia", "CO", 4.6097, -74.0817, 5660, 2],
  ["izmir-tr", "İzmir", "Türkiye", "TR", 38.4127, 27.1384, 3950, 2],
];

// Istanbul listesi — hepsi uydurma. Toplamı SEED'deki 70.630 kuruşa eşit.
const BOARD: [string, string, number][] = [
  ["https://x.com/ornek_deniz", "@ornek_deniz", 18400],
  ["https://instagram.com/ornek.kubilay", "@ornek.kubilay", 12750],
  ["https://tiktok.com/@ornek.efe", "@ornek.efe", 9600],
  ["https://x.com/ornek_selin", "@ornek_selin", 7300],
  ["https://linkedin.com/in/ornek-burak", "ornek-burak", 5450],
  ["https://youtube.com/@ornekgecemavisi", "@ornekgecemavisi", 4900],
  ["https://github.com/ornek-aysenur", "ornek-aysenur", 4200],
  ["https://ornek-kahve.example", "ornek-kahve.example", 4030],
  ["https://x.com/ornek_mehmet", "@ornek_mehmet", 4000],
];

// Lig tablosunda her şehrin kendi #1'i görünsün diye — hepsi uydurma.
const TOPS = [
  "@ornek_deniz", "@ornek.harper", "@ornek_zayd", "@ornek.rivera",
  "@ornek_haruki", "@ornek.ade", "@ornek.luiza", "@ornek_jonas",
  "@ornek.arjun", "@ornek_jiwoo", "@ornek_ceren", "@ornek.mateo",
  "@ornek.eylul",
];

const ISO = "2026-08-20T12:00:00.000Z";

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
    last_bid_at: ISO,
    top_title: TOPS[i] ?? BOARD[0][1], top_icon_url: null, top_listing_id: null, top_kind: "x",
    league_rank: i + 1,
  }));

  const board: R[] = BOARD.map(([url, title, cents], i) => ({
    id: `sample-${i + 1}`,
    kind: url.includes("x.com/") ? "x" : "url",
    target_url: url,
    title,
    icon_url: null,
    category: "other",
    city_id: "istanbul-tr",
    city_name: "Istanbul",
    city_country: "Türkiye",
    city_cc: "TR",
    city_lat: 41.0138,
    city_lon: 28.9497,
    city_rank: i + 1,
    click_count: 0,
    created_at: ISO,
    last_bid_at: ISO,
    lifetime_cents: cents,
    effective_cents: cents,
  }));

  const total = SEED.reduce((s, r) => s + r[6], 0);
  const listings = SEED.reduce((s, r) => s + r[7], 0);

  return (
    <main className="page page--wide">
      <p className="sample-warn" role="note">
        <strong>Design preview.</strong> Every profile and every number on this
        page is invented — nobody paid for these spots and none of the handles
        point at a real account. The live site shows only real payments.
      </p>

      <h1>Design preview</h1>

      <GlobeSection cities={cities} paid />

      <section className="globe-stats" aria-label="Sample totals">
        <div>
          <strong>{SEED.length}</strong>
          <span>cities in play</span>
        </div>
        <div>
          <strong>{listings}</strong>
          <span>profiles listed</span>
        </div>
        <div>
          <strong>{centsToUsd(total)}</strong>
          <span>live on the map</span>
        </div>
      </section>

      <section className="board" aria-label="Sample city league">
        <div className="section-head">
          <h2>The city league</h2>
          <p className="fine">Sample data — ranked by what is still burning in each city.</p>
        </div>
        <LeagueTable rows={rows} />
      </section>

      <section className="board" aria-label="Sample Istanbul leaderboard">
        <div className="section-head">
          <h2>Istanbul — how a busy city reads</h2>
          <p className="fine">
            Sample data. {BOARD.length} profiles, {centsToUsd(SEED[0][6])} burning,
            top spot {centsToUsd(BOARD[0][2] + 1)}.
          </p>
        </div>
        {board.map((r, i) => (
          <Row
            key={r.id}
            rank={i + 1}
            row={r}
            nextCents={board[i + 1]?.effective_cents ?? 0}
            canOutbid={false}
            cityId="istanbul-tr"
          />
        ))}
      </section>
    </main>
  );
}
