import type { Metadata } from "next";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for outbid.love.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <main className="page">
      <div className="topbar">
        <a className="brand" href="/">
          outbid<span className="tld">.love</span>
        </a>
        <Nav />
      </div>

      <div className="prose">
        <h1>Privacy Policy</h1>
        <p className="fine">Last updated: August 22, 2026</p>

        <p>
          outbid.love is operated by Süleyman Yaman, Istanbul, Türkiye. This
          policy explains what we collect and why. The short version: we
          collect as little as possible — no accounts, no tracking cookies.
        </p>

        <h2>What we collect</h2>
        <p>
          <strong>Listings.</strong> The link or handle you submit, the
          category you choose, and the bid amounts attached to it are public —
          that is the product.
        </p>
        <p>
          <strong>Payments.</strong> Payments are processed by third-party
          payment providers. We receive confirmation of the payment (order id,
          amount, status) but never your card details. The provider processes
          your payment data under its own privacy policy as an independent
          controller.
        </p>
        <p>
          <strong>Technical data.</strong> We temporarily record IP addresses
          for rate-limiting and abuse prevention, and a random session
          identifier (kept in your browser&apos;s sessionStorage, not a cookie)
          to count visitors and concurrent users. Aggregate, cookieless
          analytics are provided by Plausible.
        </p>

        <h2>What we don&apos;t do</h2>
        <p>
          No advertising trackers, no sale of personal data, no profiling, no
          marketing emails (we don&apos;t even collect your email unless you
          write to us or the payment provider passes it along for receipts and
          fraud prevention).
        </p>

        <h2>Retention</h2>
        <p>
          Listing and payment records are kept for as long as needed for
          bookkeeping and legal obligations. Rate-limiting logs are
          short-lived. Presence data expires within minutes.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live (including under GDPR and KVKK), you may
          have rights to access, correct, or delete personal data we hold about
          you, and to object to processing. To exercise them, or to have a
          listing removed, contact{" "}
          <a href="mailto:suleyman.yaman@yahoo.com">suleyman.yaman@yahoo.com</a>.
        </p>

        <h2>Changes</h2>
        <p>
          We will post any changes to this policy on this page with an updated
          date.
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
