import type { Metadata } from "next";
import { CONFIG, centsToUsd } from "@/lib/config";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "About",
  description:
    "outbid.love is the decaying attention market: bid any amount to rank your site or X handle, and watch every bid rot 10% a day. The top is always winnable.",
  alternates: { canonical: "/about" },
};

export default function About() {
  const pct = Math.round((1 - CONFIG.decayPerDay) * 100);

  return (
    <main className="page">
      <div className="topbar">
        <a className="brand" href="/">
          outbid<span className="tld">.love</span>
        </a>
        <Nav current="/about" />
      </div>

      <div className="prose">
        <h1>About</h1>

        <p>
          outbid.love is a leaderboard you can buy your way onto. Put your
          product site or your X handle on the board, pay whatever you bid,
          and rank exactly where your money puts you. No accounts, no ads, no
          algorithm — the ranking <em>is</em> the price.
        </p>

        <h2>The twist: everything decays</h2>
        <p>
          Bid-for-rank boards have one boring failure mode: someone rich parks
          at #1 and the game dies. Here, every payment loses {pct}% of its
          value per day from the moment it lands. {centsToUsd(10000)} becomes{" "}
          {centsToUsd(4783)} in a week and {centsToUsd(2288)} in two. Hold the
          top by paying for it — or watch your spot rot out from under you.
          The board never freezes, and the #1 spot is never out of reach.
        </p>

        <h2>Why build another one?</h2>
        <p>
          August 2026 turned pay-to-rank leaderboards into a genre overnight —
          outbid.lol went viral and a wave of boards followed. Most of them
          copied the part that doesn&apos;t age well: permanent bids.
          outbid.love exists because a market for attention should behave like
          attention — it fades unless you feed it. That one rule changes
          everything: rankings churn daily, comebacks are cheap, and the
          drama never runs out.
        </p>

        <h2>How the money works</h2>
        <p>
          You pay per bid, exactly the amount you typed, by card through{" "}
          <a href="https://www.shopier.com" target="_blank" rel="noopener">
            Shopier
          </a>
          . Your bid goes live automatically the moment the payment is
          confirmed. Anyone can add to any listing — boost your own, or gift a
          boost to something you love. Clicks out of the board are counted
          publicly, so a spot here is traffic, not just bragging rights.
        </p>

        <h2>Contact</h2>
        <p>
          Something on the board that shouldn&apos;t be? A payment that
          didn&apos;t show up? Reach out on X or check the{" "}
          <a href="/rules">rules</a>.
        </p>
      </div>

      <footer className="foot">
        <a href="/">← Back to the board</a>
      </footer>
    </main>
  );
}
