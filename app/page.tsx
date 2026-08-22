import { getBoard, getStats } from "@/lib/db";
import { CONFIG, centsToUsd } from "@/lib/config";
import SubmitForm from "@/components/SubmitForm";
import BidForm from "@/components/BidForm";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import DecayMeter from "@/components/DecayMeter";
import LiveStats from "@/components/LiveStats";
import Row from "@/components/Row";

// The board refreshes every 15s. The live feel comes from the decay
// ticking in the browser, not from hammering the database.
export const revalidate = 15;

export default async function Home() {
  const [board, stats] = await Promise.all([getBoard(100), getStats()]);

  const slots = stats.slots || CONFIG.foundingSlots;
  const remaining = Math.max(0, slots - stats.listings);
  const topCents = board[0]?.effective_cents ?? 10000;
  const decayPct = Math.round((1 - CONFIG.decayPerDay) * 100);

  return (
    <main className="page">
      <header className="hero">
        <div className="topbar">
          <span className="brand">
            outbid<span className="tld">.love</span>
          </span>
          <LiveStats initialVisits={stats.visits} initialOnline={stats.online} />
        </div>
        <Nav current="/" />

        <h1>The top is always winnable.</h1>
        <p className="lede">
          Your rank is whatever you paid — but every payment{" "}
          <strong>decays {decayPct}% a day</strong>. Nobody sits at the top
          forever, and the board never freezes.
        </p>

        <Banner />

        {CONFIG.phase === "paid" ? (
          <div className="founding">
            <span className="pill">Live bidding</span>
            <p>
              Put your link on the board — or outbid the one above you. You pay
              exactly what you bid, once.
            </p>
            <BidForm topCents={board[0]?.effective_cents ?? 0} />
            <p className="fine">
              Your product site or your X handle. No account, no email — card
              checkout via Shopier.
            </p>
          </div>
        ) : remaining > 0 ? (
          <div className="founding">
            <span className="pill">Founding roster</span>
            <p>
              The first {slots} listings are free and start with{" "}
              {centsToUsd(CONFIG.foundingCents)} of credit.{" "}
              <strong>{remaining} left.</strong>
            </p>
            <SubmitForm />
            <p className="fine">
              Your product site or your X handle. No account, no email.
            </p>
          </div>
        ) : (
          <div className="founding">
            <span className="pill">Roster full</span>
            <p>
              All {slots} founding spots are taken. Paid bidding
              opens soon — until then the board keeps decaying.
            </p>
          </div>
        )}
      </header>

      <section className="board" aria-label="Leaderboard">
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
            />
          ))
        )}
      </section>

      <section className="explain">
        <h2>How decay works</h2>
        <p>
          Every payment loses {decayPct}% of its value per day, counted from the
          moment it was made. {centsToUsd(10000)} is worth{" "}
          {centsToUsd(4783)} after a week and {centsToUsd(2288)} after two.
          Once a listing drops below {centsToUsd(CONFIG.dropoutCents)} it leaves
          the board.
        </p>
        <DecayMeter startCents={topCents} />
        <p className="fine">
          This is the whole product. Rank is a running cost, not a purchase —
          which is why the #1 spot is never out of reach.
        </p>
      </section>

      <footer className="foot">
        <a href="/rules">Rules</a>
        <span aria-hidden>·</span>
        <a href="/price">Pricing</a>
        <span aria-hidden>·</span>
        <a href="/terms">Terms</a>
        <span aria-hidden>·</span>
        <a href="/privacy">Privacy</a>
        <span aria-hidden>·</span>
        <a href="/policy">Refunds</a>
        <span aria-hidden>·</span>
        <span>{stats.listings} listings</span>
        <span aria-hidden>·</span>
        <a
          href={
            process.env.NEXT_PUBLIC_STATS_URL ||
            `https://plausible.io/${new URL(CONFIG.url).hostname}`
          }
          target="_blank"
          rel="noopener"
        >
          Live traffic
        </a>
      </footer>
    </main>
  );
}
