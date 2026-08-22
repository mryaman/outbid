import type { Metadata } from "next";
import { getBoard, getStats } from "@/lib/db";
import { CONFIG, centsToUsd } from "@/lib/config";
import Nav from "@/components/Nav";
import Row from "@/components/Row";
import Banner from "@/components/Banner";
import DecayMeter from "@/components/DecayMeter";
import LiveStats from "@/components/LiveStats";
import CitySearch from "@/components/CitySearch";
import Footer from "@/components/Footer";
import Jsonld from "@/components/Jsonld";
import LangSwitcher from "@/components/LangSwitcher";
import { altLanguages } from "@/lib/i18n";
import { CITY } from "@/lib/i18n/city";
import { breadcrumbLd, leaderboardLd, organizationLd } from "@/lib/seo";

export const revalidate = 15;

export const metadata: Metadata = {
  title: "World board — every listing, every city",
  description:
    "Every listing on outbid.love, from every city, ranked by what is still burning. Every payment decays 10% a day, so the order changes even when nobody bids.",
  alternates: { canonical: "/board", languages: altLanguages("/board") },
  keywords: [
    "global leaderboard",
    "pay to rank world board",
    "outbid.lol alternative",
    "decaying leaderboard",
    "promote your profile",
  ],
};

export default async function BoardPage() {
  const [board, stats] = await Promise.all([getBoard(100), getStats()]);
  const decayPct = Math.round((1 - CONFIG.decayPerDay) * 100);
  const topCents = board[0]?.effective_cents ?? 10000;

  return (
    <main className="page">
      <Jsonld
        data={[
          organizationLd(),
          leaderboardLd(board, {
            name: CITY.en.boardTitle,
            url: `${CONFIG.url}/board`,
            lang: "en",
          }),
          breadcrumbLd([
            { name: CONFIG.siteName, url: CONFIG.url },
            { name: "World board", url: `${CONFIG.url}/board` },
          ]),
        ]}
      />

      <header className="hero">
        <div className="topbar">
          <a className="brand" href="/">
            outbid<span className="tld">.love</span>
          </a>
          <LiveStats initialVisits={stats.visits} initialOnline={stats.online} />
        </div>
        <Nav current="/board" />

        <h1>The world board.</h1>
        <p className="lede">
          Everyone on the map, in one list, across every city. Rank is whatever
          you paid — and every payment{" "}
          <strong>decays {decayPct}% a day</strong>.
        </p>

        <Banner />

        <div className="founding">
          <span className="pill">Pick a city to bid</span>
          <p>Bids happen inside a city. Find yours:</p>
          <CitySearch placeholder="Search your city…" />
        </div>
      </header>

      <section className="board" aria-label="World leaderboard">
        {board.length === 0 ? (
          <p className="empty">The board is empty. Claim the first spot.</p>
        ) : (
          board.map((r, i) => (
            <Row
              key={r.id}
              rank={i + 1}
              row={r}
              nextCents={board[i + 1]?.effective_cents ?? 0}
              canOutbid={CONFIG.phase === "paid"}
              showCity
            />
          ))
        )}
      </section>

      <section className="explain">
        <h2>How decay works</h2>
        <p>
          Every payment loses {decayPct}% of its value per day, counted from the
          moment it was made. {centsToUsd(10000)} is worth {centsToUsd(4783)}{" "}
          after a week and {centsToUsd(2288)} after two. Once a listing drops
          below {centsToUsd(CONFIG.dropoutCents)} it leaves the board.
        </p>
        <DecayMeter startCents={topCents} />
      </section>

      <LangSwitcher locale="en" path="/board" />

      <Footer listings={stats.listings} />
    </main>
  );
}
