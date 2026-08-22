import type { Metadata } from "next";
import { CONFIG, centsToUsd } from "@/lib/config";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund and cancellation policy for outbid.love.",
  alternates: { canonical: "/policy" },
};

export default function Policy() {
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
        <h1>Refund Policy</h1>
        <p className="fine">Last updated: August 22, 2026</p>

        <p>
          A bid on outbid.love buys immediate placement on a public
          leaderboard. Because the service is delivered in full the moment your
          payment is confirmed — and because losing {pct}% of effective value
          per day is the product&apos;s core rule, not a fault — completed bids
          are generally non-refundable.
        </p>

        <h2>We will refund you when</h2>
        <ul>
          <li>
            Your payment was charged but your bid never appeared on the board.
            Tell us and we will either place the bid or refund the payment in
            full — your choice.
          </li>
          <li>
            We remove your listing for our own reasons (not a rules violation).
            We refund the remaining effective value at the time of removal.
          </li>
          <li>A duplicate charge occurred for a single bid.</li>
          <li>A refund is required by applicable consumer law.</li>
        </ul>

        <h2>We will not refund</h2>
        <ul>
          <li>Value lost to decay — that is how the board works.</li>
          <li>Being outbid by someone else.</li>
          <li>
            Listings removed for violating the{" "}
            <a href="/rules">rules</a> (prohibited content, links you
            don&apos;t own, abuse).
          </li>
          <li>Change of mind after the bid has been placed on the board.</li>
        </ul>

        <h2>How to request a refund</h2>
        <p>
          Email{" "}
          <a href="mailto:suleyman.yaman@yahoo.com">suleyman.yaman@yahoo.com</a>{" "}
          with your order reference (shown by the payment provider) and the
          link you bid on. We respond within 3 business days; approved refunds
          are returned to the original payment method, typically within 5–10
          business days depending on your bank. Minimum bid for reference:{" "}
          {centsToUsd(CONFIG.minBidCents)}.
        </p>
      </div>

      <footer className="foot">
        <a href="/">← Back to the board</a>
        <span aria-hidden>·</span>
        <a href="/terms">Terms</a>
        <span aria-hidden>·</span>
        <a href="/privacy">Privacy</a>
      </footer>
    </main>
  );
}
