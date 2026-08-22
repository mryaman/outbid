import type { Metadata } from "next";
import { CONFIG, centsToUsd } from "@/lib/config";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for outbid.love.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
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
        <h1>Terms of Service</h1>
        <p className="fine">Last updated: August 22, 2026</p>

        <p>
          These terms govern your use of outbid.love (&quot;the Service&quot;),
          operated by Süleyman Yaman, Istanbul, Türkiye (&quot;we&quot;,
          &quot;us&quot;). By using the Service or placing a bid you agree to
          these terms.
        </p>

        <h2>1. What the Service is</h2>
        <p>
          outbid.love is a public leaderboard. You pay the amount you choose
          (&quot;bid&quot;) to place a link — your own website or your own X
          handle — on the board. Rank is determined solely by the effective
          value of the bids attached to a listing. This is a digital promotion
          service: what you purchase is temporary placement on the board, not a
          physical or downloadable good.
        </p>

        <h2>2. Decay</h2>
        <p>
          Every bid loses {pct}% of its effective value per day, counted from
          the moment of payment. For example, {centsToUsd(10000)} is worth
          about {centsToUsd(4783)} after seven days. A listing whose effective
          value falls below {centsToUsd(CONFIG.dropoutCents)} leaves the board.
          Decay is the core mechanic of the Service and is not a defect,
          malfunction, or grounds for a refund.
        </p>

        <h2>3. Payments</h2>
        <p>
          Bids start at {centsToUsd(CONFIG.minBidCents)} and are capped at{" "}
          {centsToUsd(CONFIG.maxBidCents)} per payment. Prices are shown in US
          dollars; depending on the payment provider, your card may be charged
          in another currency at the prevailing exchange rate, which is shown
          before you pay. Payment processing is handled by third-party
          providers; we never see or store your card details. Your bid appears
          on the board automatically once the payment is confirmed.
        </p>

        <h2>4. Refunds</h2>
        <p>
          See our <a href="/policy">Refund Policy</a>. In short: because
          placement is delivered immediately and decays by design, completed
          bids are non-refundable, except where a payment was charged but the
          bid never appeared, or where a refund is required by law.
        </p>

        <h2>5. Acceptable use</h2>
        <p>
          You may only list websites and accounts you own or are authorized to
          promote. The following may not be listed: adult content, gambling and
          betting, crypto or financial trading offers, illegal goods or
          services, malware or deceptive sites, link shorteners, and chat
          invites. Query strings are stripped from listed URLs. We may remove
          any listing that violates these rules or applicable law, without
          notice and without refund of decayed value; if we remove a listing
          for our own reasons rather than a rules violation, we will refund the
          remaining effective value.
        </p>

        <h2>6. No endorsement; availability</h2>
        <p>
          Listings are submitted by users. We do not vet, endorse, or guarantee
          anything about listed sites. The Service is provided &quot;as
          is&quot;; we do not guarantee uninterrupted availability, and our
          total liability for any claim is limited to the amount of the bid
          concerned.
        </p>

        <h2>7. Changes</h2>
        <p>
          We may update these terms and the Service&apos;s parameters (minimum
          bid, decay rate, categories) prospectively. Material changes will be
          reflected on this page with an updated date.
        </p>

        <h2>8. Contact</h2>
        <p>
          Questions and disputes: <a href="mailto:suleyman.yaman@yahoo.com">suleyman.yaman@yahoo.com</a>.
        </p>
      </div>

      <footer className="foot">
        <a href="/">← Back to the board</a>
        <span aria-hidden>·</span>
        <a href="/privacy">Privacy</a>
        <span aria-hidden>·</span>
        <a href="/policy">Refunds</a>
        <span aria-hidden>·</span>
        <a href="/price">Pricing</a>
      </footer>
    </main>
  );
}
