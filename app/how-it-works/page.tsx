import type { Metadata } from "next";
import { CONFIG, centsToUsd, decayed } from "@/lib/config";
import { dict, fill } from "@/lib/i18n";
import { breadcrumbLd, howToLd, organizationLd, serviceLd } from "@/lib/seo";
import Jsonld from "@/components/Jsonld";
import Nav from "@/components/Nav";
import LangSwitcher from "@/components/LangSwitcher";

const t = dict("en");
const PCT = Math.round((1 - CONFIG.decayPerDay) * 100);

export const metadata: Metadata = {
  title: "How it works — bidding, decay and the price of #1",
  description:
    "The full mechanic behind outbid.love: how a bid is priced, how the 10% daily decay is calculated, how long each amount survives on the board, and exactly what it costs to take the top spot.",
  alternates: { canonical: "/how-it-works" },
  keywords: [
    "how pay to rank leaderboard works",
    "decaying bid explained",
    "cost of number one spot",
    "bid decay calculation",
    "attention market mechanics",
  ],
};

/** Kaç gün sonra hangi tutar — tabloyu koddan üretiyoruz ki kural tek yerde kalsın. */
const SCHEDULE = [0, 1, 2, 3, 5, 7, 10, 14, 21, 30];

/** Bir tutarın $1 altına düşmesine kaç gün kalır. */
function lifespanDays(cents: number): number {
  return Math.ceil(Math.log(CONFIG.dropoutCents / cents) / Math.log(CONFIG.decayPerDay));
}

const EXAMPLES = [500, 2000, 10000, 50000];

export default function HowItWorks() {
  const vars = {
    pct: PCT,
    min: centsToUsd(CONFIG.minBidCents),
    a: centsToUsd(10000),
    b: centsToUsd(4783),
    c: centsToUsd(2288),
    drop: centsToUsd(CONFIG.dropoutCents),
  };

  return (
    <main className="page">
      <Jsonld
        data={[
          organizationLd(),
          serviceLd(t.metaDesc),
          howToLd("How to reach #1 on outbid.love", t.howSteps.map((s) => fill(s, vars)), "en"),
          breadcrumbLd([
            { name: CONFIG.siteName, url: CONFIG.url },
            { name: "How it works", url: `${CONFIG.url}/how-it-works` },
          ]),
        ]}
      />

      <div className="topbar">
        <a className="brand" href="/">
          outbid<span className="tld">.love</span>
        </a>
        <Nav current="/how-it-works" />
      </div>

      <div className="prose">
        <h1>How it works</h1>
        <p className="lede">
          One rule runs the whole board: your rank is the money you have paid,
          and that money loses {PCT}% of its value every day.
        </p>

        <h2>The four steps</h2>
        <ol>
          {t.howSteps.map((s, i) => (
            <li key={i}>{fill(s, vars)}</li>
          ))}
        </ol>

        <h2>How the decay is calculated</h2>
        <p>
          The effective value of a bid is the amount paid multiplied by{" "}
          <code>0.9</code> for every day elapsed since the payment cleared:{" "}
          <code>effective = paid × 0.9^days</code>. Days are continuous, not
          rounded — the number falls every second, which is why the figure on
          each row keeps ticking down while you watch it. Rankings are sorted on
          this effective value, so positions can swap without anybody paying
          anything.
        </p>

        <h3>What {centsToUsd(10000)} is worth over a month</h3>
        <div className="table-wrap">
          <table className="decay-table">
            <thead>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Effective value</th>
                <th scope="col">Share of the original</th>
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map((d) => {
                const v = decayed(10000, d);
                return (
                  <tr key={d}>
                    <th scope="row">{d === 0 ? "Paid" : `Day ${d}`}</th>
                    <td>{centsToUsd(v)}</td>
                    <td>{Math.round((v / 10000) * 100)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3>How long each bid survives</h3>
        <p>
          A listing leaves the board once its effective value falls below{" "}
          {centsToUsd(CONFIG.dropoutCents)}. That gives every amount a
          predictable lifespan:
        </p>
        <div className="table-wrap">
          <table className="decay-table">
            <thead>
              <tr>
                <th scope="col">Bid</th>
                <th scope="col">Days on the board</th>
                <th scope="col">Cost per day on average</th>
              </tr>
            </thead>
            <tbody>
              {EXAMPLES.map((c) => {
                const days = lifespanDays(c);
                return (
                  <tr key={c}>
                    <th scope="row">{centsToUsd(c)}</th>
                    <td>≈ {days}</td>
                    <td>{centsToUsd(Math.round(c / days))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2>What it costs to take #1</h2>
        <p>
          Exactly one cent more than the current leader&apos;s decayed value.
          Because that value falls continuously, the price of the top spot is
          lower every hour you wait — and lower still if the leader stops
          topping up. The minimum bid is {centsToUsd(CONFIG.minBidCents)}, and
          the maximum is {centsToUsd(CONFIG.maxBidCents)}. An unclaimed{" "}
          <a href="/categories">category</a> can be taken for the minimum,
          because in an empty category there is nothing to beat.
        </p>

        <h2>Cities: where a bid actually lands</h2>
        <p>
          Every payment is made on a city. Whoever has the largest live payment
          on a given city sits at the top of it, and the cities themselves are
          ranked against one another in a world league by how much is still
          burning inside them. That means there is not one #1 to win but
          thousands: an unclaimed city can be taken for the{" "}
          {centsToUsd(CONFIG.minBidCents)} minimum, and a crowded one costs a
          cent more than its current leader after decay. Pick yours on the{" "}
          <a href="/">globe</a>, or see everything at once on the{" "}
          <a href="/board">world board</a>.
        </p>

        <h2>Where the traffic goes</h2>
        <p>
          Every row links out to the listed site through a counted redirect.
          Outbound clicks are shown publicly next to each listing, so the board
          reports what a position is actually worth in visits rather than
          impressions. The links are <code>nofollow</code>: a listing buys
          human attention, not search-engine link equity.
        </p>

        <h2>Glossary</h2>
        <dl className="glossary">
          <div className="qa">
            <dt>Pay-to-rank leaderboard</dt>
            <dd>
              A public ranking in which position is determined by money paid
              rather than by votes, editorial judgement or an algorithm.
            </dd>
          </div>
          <div className="qa">
            <dt>Decay</dt>
            <dd>
              The daily reduction — here {PCT}% — applied to every bid&apos;s
              effective value, so a payment behaves like rent rather than a
              purchase.
            </dd>
          </div>
          <div className="qa">
            <dt>Effective value</dt>
            <dd>
              What a bid is worth right now after decay. This is the number the
              board sorts on, not the amount originally paid.
            </dd>
          </div>
          <div className="qa">
            <dt>Lifetime paid</dt>
            <dd>
              The total ever paid into a listing, including top-ups. Shown on
              hover; it does not affect rank.
            </dd>
          </div>
          <div className="qa">
            <dt>Dropout threshold</dt>
            <dd>
              {centsToUsd(CONFIG.dropoutCents)} — the effective value below
              which a listing leaves the board entirely.
            </dd>
          </div>
          <div className="qa">
            <dt>Attention market</dt>
            <dd>
              A market where the good being traded is visibility. Decay makes it
              behave like real attention: it fades unless it is fed.
            </dd>
          </div>
        </dl>

        <h2>Compared with a permanent bid board</h2>
        <p>
          {t.vsP} A side-by-side breakdown lives on{" "}
          <a href="/vs/outbid-lol">outbid.love vs outbid.lol</a>, and the{" "}
          <a href="/faq">FAQ</a> covers the practical questions about payment,
          moderation and refunds.
        </p>
      </div>

      <LangSwitcher locale="en" path="" />

      <footer className="foot">
        <a href="/">← Back to the board</a>
        <span aria-hidden>·</span>
        <a href="/faq">FAQ</a>
      </footer>
    </main>
  );
}
