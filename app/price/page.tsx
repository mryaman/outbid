import type { Metadata } from "next";
import { CONFIG, centsToUsd } from "@/lib/config";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "outbid.love pricing: you pay exactly what you bid, once. Minimum $5, no subscriptions, no hidden fees.",
  alternates: { canonical: "/price" },
};

export default function Price() {
  const pct = Math.round((1 - CONFIG.decayPerDay) * 100);

  return (
    <main className="page">
      <div className="topbar">
        <a className="brand" href="/">
          outbid<span className="tld">.love</span>
        </a>
        <Nav />
      </div>

      <div className="prose">
        <h1>Pricing</h1>

        <p>
          There is exactly one thing for sale on outbid.love: a bid. You choose
          the amount, you pay it once, and your link ranks by that amount as it
          decays. No subscriptions, no tiers, no hidden fees.
        </p>

        <h2>How it works</h2>
        <ul>
          <li>
            <strong>Minimum bid:</strong> {centsToUsd(CONFIG.minBidCents)}
          </li>
          <li>
            <strong>Maximum per payment:</strong>{" "}
            {centsToUsd(CONFIG.maxBidCents)}
          </li>
          <li>
            <strong>You pay what you type.</strong> A $25 bid costs $25 — once.
            Prices are in US dollars; your card may be charged in your local
            currency at the live exchange rate, shown before you pay.
          </li>
          <li>
            <strong>Decay:</strong> every bid loses {pct}% of its effective
            value per day from the moment of payment. {centsToUsd(10000)} ranks
            like {centsToUsd(4783)} after a week. Listings below{" "}
            {centsToUsd(CONFIG.dropoutCents)} leave the board.
          </li>
          <li>
            <strong>Stacking:</strong> anyone can add a new bid to any listing
            at any time; each payment decays on its own clock.
          </li>
        </ul>

        <h2>What you get</h2>
        <p>
          Immediate placement on the public leaderboard (and your category
          board), a live click-through link, public click counting, and the
          right to defend your rank by bidding again. Placement is delivered
          the moment your payment is confirmed.
        </p>

        <h2>Refunds</h2>
        <p>
          Bids decay by design and are non-refundable once placed — see the{" "}
          <a href="/policy">Refund Policy</a> for the exceptions.
        </p>
      </div>

      <footer className="foot">
        <a href="/">← Back to the board</a>
        <span aria-hidden>·</span>
        <a href="/terms">Terms</a>
        <span aria-hidden>·</span>
        <a href="/policy">Refunds</a>
      </footer>
    </main>
  );
}
