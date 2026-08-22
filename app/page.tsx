import { getCityLeague, getStats } from "@/lib/db";
import { topCities } from "@/lib/cities";
import { CONFIG, centsToUsd } from "@/lib/config";
import GlobeSection from "@/components/GlobeSection";
import LeagueTable from "@/components/LeagueTable";
import type { GlobeCity } from "@/components/GlobeView";
import Nav from "@/components/Nav";
import LiveStats from "@/components/LiveStats";
import Footer from "@/components/Footer";

export const revalidate = 15;

export const metadata = {
  title: "outbid.love — the city leaderboard of the world",
  description:
    "Pick your city, put your X, TikTok, Instagram, LinkedIn or your own link on it, and pay to sit at #1. Every payment decays 10% a day, so the top is always winnable.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [league, stats] = await Promise.all([getCityLeague(200), getStats()]);

  const activeIds = new Set(league.map((l) => l.id));
  const cities: GlobeCity[] = [
    ...league.map((l) => ({
      id: l.id,
      name: l.name,
      country: l.country,
      cc: l.country_code,
      lat: l.lat,
      lon: l.lon,
      cents: l.effective_cents,
      listings: l.listings,
      rank: l.league_rank,
    })),
    ...topCities(240)
      .filter((c) => !activeIds.has(c.id))
      .map((c) => ({
        id: c.id,
        name: c.name,
        country: c.country,
        cc: c.cc,
        lat: c.lat,
        lon: c.lon,
        cents: 0,
        listings: 0,
        rank: 0,
      })),
  ];

  const total = league.reduce((s, l) => s + l.effective_cents, 0);
  const decayPct = Math.round((1 - CONFIG.decayPerDay) * 100);

  return (
    <main className="page page--wide">
      <header className="hero">
        <div className="topbar">
          <span className="brand">
            outbid<span className="tld">.love</span>
          </span>
          <LiveStats initialVisits={stats.visits} initialOnline={stats.online} />
        </div>
        <Nav current="/" />

        <h1>Every city has a #1. Take yours.</h1>
        <p className="lede">
          Put your X, TikTok, Instagram, LinkedIn — or any link you own — on a
          city. The biggest payment in that city sits at the top of it. Every
          payment <strong>decays {decayPct}% a day</strong>, so no one holds a
          city forever.
        </p>
      </header>

      <GlobeSection cities={cities} paid={CONFIG.phase === "paid"} />

      <p className="fine browse-hint">
        Just looking? Click any glowing city on the globe, or open one from the
        league below.
      </p>

      <section className="globe-stats" aria-label="Live totals">
        <div>
          <strong>{league.length}</strong>
          <span>cities in play</span>
        </div>
        <div>
          <strong>{stats.listings}</strong>
          <span>profiles listed</span>
        </div>
        <div>
          <strong>{centsToUsd(total)}</strong>
          <span>live on the map</span>
        </div>
      </section>

      <section className="board" aria-label="City league">
        <div className="section-head">
          <h2>The city league</h2>
          <p className="fine">
            Ranked by everything still burning in each city — busiest at the
            top, quietest at the bottom.
          </p>
        </div>
        <LeagueTable rows={league} />
      </section>

      <section className="explain">
        <h2>How it works</h2>
        <ol className="steps">
          <li>
            <strong>Find your city.</strong> Search it or click it on the globe.
            All {(5000).toLocaleString("en-US")} cities are open — most of them
            have no #1 yet.
          </li>
          <li>
            <strong>Put your profile on it.</strong> An @handle, a social link,
            or your own site. No account, no email.
          </li>
          <li>
            <strong>Pay what the spot is worth to you.</strong> The largest
            live amount in that city is #1 — and the city itself climbs the
            world league as its people spend.
          </li>
          <li>
            <strong>Watch it burn.</strong> Every payment loses {decayPct}% of
            its value per day. {centsToUsd(10000)} is worth{" "}
            {centsToUsd(4783)} after a week. Rank is a running cost, not a
            purchase — which is why #1 is never out of reach.
          </li>
        </ol>
      </section>

      <Footer listings={stats.listings} />
    </main>
  );
}
