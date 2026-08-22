import { CONFIG, centsToUsd } from "@/lib/config";

export const metadata = { title: `Rules · ${CONFIG.siteName}` };

export default function Rules() {
  const pct = Math.round((1 - CONFIG.decayPerDay) * 100);

  return (
    <main className="page">
      <div className="topbar">
        <span className="brand">
          outbid<span className="tld">.love</span>
        </span>
      </div>

      <div className="prose">
        <h1>Rules</h1>

        <h2>Ranking</h2>
        <ul>
          <li>Rank is the effective amount. Nothing else moves it.</li>
          <li>
            Every payment loses {pct}% of its value per day, counted from the
            moment it was made.
          </li>
          <li>
            A listing whose effective value falls below{" "}
            {centsToUsd(CONFIG.dropoutCents)} leaves the board.
          </li>
          <li>Ties are broken by whoever listed first.</li>
        </ul>

        <h2>Founding phase</h2>
        <ul>
          <li>
            The first {CONFIG.foundingSlots} listings are free and start with{" "}
            {centsToUsd(CONFIG.foundingCents)} of credit.
          </li>
          <li>Founding credit decays exactly like a payment.</li>
          <li>Paid bidding opens later. No payment is collected today.</li>
        </ul>

        <h2>What you can list</h2>
        <ul>
          <li>Your own product website, or your own X handle.</li>
          <li>
            Query strings are stripped, so affiliate and referral links will not
            work.
          </li>
          <li>One listing per domain or handle.</li>
        </ul>

        <h2>What you cannot list</h2>
        <ul>
          <li>Adult content.</li>
          <li>Gambling and betting.</li>
          <li>Crypto and financial trading offers.</li>
          <li>Link shorteners (bit.ly, t.co and similar).</li>
          <li>Chat invites (Discord, Telegram, WhatsApp).</li>
        </ul>
        <p>Listings that break these rules are removed without notice.</p>

        <h2>Responsibility</h2>
        <p>
          Listed sites belong to the people who submitted them. outbid.love
          shows the link and nothing more — it does not vet, endorse, or
          guarantee anything about what you find on the other side.
        </p>
      </div>

      <footer className="foot">
        <a href="/">← Back to the board</a>
      </footer>
    </main>
  );
}
