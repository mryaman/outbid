import type { Metadata } from "next";
import { CONFIG, centsToUsd } from "@/lib/config";
import { breadcrumbLd, faqLd, organizationLd } from "@/lib/seo";
import Jsonld from "@/components/Jsonld";
import Nav from "@/components/Nav";
import LangSwitcher from "@/components/LangSwitcher";

const PCT = Math.round((1 - CONFIG.decayPerDay) * 100);

export const metadata: Metadata = {
  title: "outbid.love vs outbid.lol — permanent bids or decaying bids",
  description:
    "A factual comparison of the two pay-to-rank leaderboards. On outbid.lol a bid is permanent, so the top spot climbs and stays bought. On outbid.love every bid decays 10% a day, so #1 is contestable from $5.",
  alternates: { canonical: "/vs/outbid-lol" },
  keywords: [
    "outbid.lol alternative",
    "outbid.love vs outbid.lol",
    "pay to rank leaderboard comparison",
    "cheaper than outbid.lol",
    "decaying bid vs permanent bid",
  ],
};

const COMPARISON: { row: string; love: string; lol: string }[] = [
  {
    row: "What decides your rank",
    love: "The money you have paid, after decay",
    lol: "The money you have paid",
  },
  {
    row: "What happens to a bid over time",
    love: `Loses ${PCT}% of its value every day`,
    lol: "Keeps its amount until raised or outranked",
  },
  {
    row: "Can #1 be bought permanently",
    love: "No — the position erodes automatically",
    lol: "In practice yes, while nobody pays more",
  },
  {
    row: "Direction the price of #1 moves",
    love: "Down, every hour, unless the leader tops up",
    lol: "Up — each new leader has to beat the last",
  },
  {
    row: "Minimum bid",
    love: centsToUsd(CONFIG.minBidCents),
    lol: "$5",
  },
  {
    row: "Realistic cost of the top spot",
    love: "One cent over the decayed leader — often single or double digits",
    lol: "Whatever the last leader paid, which has run into five figures",
  },
  {
    row: "When a listing disappears",
    love: `When its value decays below ${centsToUsd(CONFIG.dropoutCents)}`,
    lol: "It stays, sliding down as others outbid it",
  },
  {
    row: "Account required",
    love: "No",
    lol: "No",
  },
  {
    row: "Outbound links",
    love: "Counted redirect, nofollow, click count shown publicly",
    lol: "Direct listing link",
  },
  {
    row: "Categories",
    love: "27, each with its own ranking and its own page",
    lol: "27",
  },
  {
    row: "Languages",
    love: "12, each with translated pages",
    lol: "English",
  },
];

const FAQ = [
  {
    q: "Is outbid.love an alternative to outbid.lol?",
    a: "It is the same idea — a public leaderboard where rank is bought — with one rule changed. On outbid.lol a bid keeps its amount until somebody raises or outranks it. On outbid.love every bid loses 10% of its value per day, so positions expire on their own and the top spot returns to being affordable.",
  },
  {
    q: "Which one is cheaper to reach #1 on?",
    a: "outbid.love, structurally. On a permanent board the price of the top spot only ratchets upward, because each new leader must beat the highest amount ever paid. On a decaying board the price of #1 falls every hour that the leader does not top up, so the entry point stays close to the $5 minimum for most of the time.",
  },
  {
    q: "Is a permanent bid better value?",
    a: "It depends on what you are buying. A permanent bid is a one-time cost for a position that slowly slides as others outbid it. A decaying bid is a running cost for a position that is visible now. If you want a spot for a launch week, decay is cheaper; if you want a line item that sits on a board indefinitely, permanence is simpler.",
  },
  {
    q: "Can I list on both?",
    a: "Yes. They are unrelated projects and nothing stops the same site or X handle appearing on both boards.",
  },
];

export default function VsOutbidLol() {
  return (
    <main className="page">
      <Jsonld
        data={[
          organizationLd(),
          faqLd(FAQ, "en"),
          breadcrumbLd([
            { name: CONFIG.siteName, url: CONFIG.url },
            { name: "outbid.love vs outbid.lol", url: `${CONFIG.url}/vs/outbid-lol` },
          ]),
        ]}
      />

      <div className="topbar">
        <a className="brand" href="/">
          outbid<span className="tld">.love</span>
        </a>
        <Nav current="/vs" />
      </div>

      <div className="prose">
        <h1>outbid.love vs outbid.lol</h1>
        <p className="lede">
          Both are pay-to-rank leaderboards. One rule separates them: whether a
          bid keeps its value forever, or loses {PCT}% of it every day.
        </p>

        <h2>The short version</h2>
        <p>
          outbid.lol popularised the format in August 2026: enter a link, pay
          more than the listing above you, and hold that rank until somebody
          pays more. Because a bid keeps its amount, the price of the top spot
          only goes up, and the leaderboard settles into whoever spent the most
          on the day they arrived.
        </p>
        <p>
          outbid.love keeps the format and changes the economics. Every payment
          loses {PCT}% of its value per day, so a bid is rent rather than
          property. The board reorders itself even when nobody pays anything,
          the cost of taking #1 falls every hour, and a listing that stops being
          fed eventually drops off entirely.
        </p>

        <h2>Side by side</h2>
        <div className="table-wrap">
          <table className="decay-table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">outbid.love</th>
                <th scope="col">outbid.lol</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((c) => (
                <tr key={c.row}>
                  <th scope="row">{c.row}</th>
                  <td>{c.love}</td>
                  <td>{c.lol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="fine">
          Details for outbid.lol are taken from its own public rules page. It is
          an independent project with no connection to outbid.love; if anything
          here is out of date, its site is the authority.
        </p>

        <h2>Which one suits you</h2>
        <p>
          Pick the permanent board if you want to pay once, be listed
          indefinitely, and treat the amount as a sunk marketing cost. Pick the
          decaying board if you want visibility during a specific window — a
          launch, a campaign, a funding announcement — and would rather pay a
          little repeatedly than a lot once. The decaying board is also the only
          one of the two where arriving late is not a disadvantage: the price of
          the top has been falling the whole time you were away.
        </p>

        <h2>Questions</h2>
        <dl>
          {FAQ.map((f, i) => (
            <div className="qa" key={i}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>

        <p>
          <a href="/">See what #1 costs right now →</a>
          <span aria-hidden> · </span>
          <a href="/how-it-works">How the decay maths works →</a>
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
