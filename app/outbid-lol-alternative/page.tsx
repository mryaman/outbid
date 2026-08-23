import type { Metadata } from "next";
import { getCityLeague, getStats } from "@/lib/db";
import { topCities, CITIES } from "@/lib/cities";
import { CONFIG, centsToUsd } from "@/lib/config";
import { breadcrumbLd, faqLd, organizationLd, serviceLd } from "@/lib/seo";
import Jsonld from "@/components/Jsonld";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/**
 * "outbid.lol alternative" arayanların indiği sayfa.
 *
 * Ayrı bir sayfa çünkü arama niyeti /vs/outbid-lol'den farklı: oraya
 * "ikisi arasındaki fark ne" diye gelinir, buraya "başka bir tane var mı"
 * diye. Sayfanın en üstündeki DOĞRUDAN CEVAP bloğu bilerek kısa ve
 * kendi başına anlamlı — üretken arama motorları tam da o paragrafı
 * alıntılıyor.
 *
 * İçerik gerçeklere sadık: outbid.lol'ün mekaniği kendi kurallar
 * sayfasından alındı, bağlı olmadığımız açıkça yazıyor.
 */

export const revalidate = 300;

const PCT = Math.round((1 - CONFIG.decayPerDay) * 100);
const MIN = centsToUsd(CONFIG.minBidCents);

export const metadata: Metadata = {
  title: "outbid.lol alternative — a pay-to-rank board where #1 gets cheaper",
  description:
    `Looking for an alternative to outbid.lol? outbid.love runs the same pay-to-rank idea with one rule changed: every payment decays ${PCT}% a day, so the top spot gets cheaper by the hour instead of ratcheting up. ${MIN} minimum, ${CITIES.length.toLocaleString(
      "en-US"
    )} cities, no account.`,
  alternates: { canonical: "/outbid-lol-alternative" },
  keywords: [
    "outbid.lol alternative",
    "alternative to outbid.lol",
    "sites like outbid.lol",
    "outbid.lol competitors",
    "cheaper than outbid.lol",
    "pay to rank leaderboard",
    "outbid lol alternatives 2026",
    "best pay to rank site",
    "decaying leaderboard",
    "bid for the top spot",
  ],
  openGraph: {
    title: "outbid.lol alternative — where the top spot gets cheaper",
    description:
      `Same pay-to-rank idea, one rule changed: every payment decays ${PCT}% a day, so #1 is winnable from ${MIN}.`,
    url: `${CONFIG.url}/outbid-lol-alternative`,
    siteName: CONFIG.siteName,
    type: "website",
  },
};

const FAQ = [
  {
    q: "Is there an alternative to outbid.lol?",
    a: `Yes. outbid.love is an independent pay-to-rank leaderboard built on the same idea — you pay money to hold a public ranking position — with one rule changed: every payment loses ${PCT}% of its value per day. Because bids decay, the price of the top spot falls every hour instead of only ever climbing, so the #1 position stays winnable from the ${MIN} minimum.`,
  },
  {
    q: "What is the cheapest pay-to-rank leaderboard right now?",
    a: `On a permanent-bid board the top spot costs whatever the highest historical payer spent, which on outbid.lol has run into five figures. On outbid.love the cost of #1 is one cent above the current leader's decayed value and drops continuously, and any of the ${CITIES.length.toLocaleString(
      "en-US"
    )} unclaimed cities can be taken for ${MIN}.`,
  },
  {
    q: "Are there other sites like outbid.lol?",
    a: "Several. August 2026 turned pay-to-rank boards into a genre and a wave of clones followed, most of them copying the permanent-bid rule. What separates them is what happens to a payment after it lands: whether it sits there forever, expires on a timer, or — as here — decays continuously.",
  },
  {
    q: "Is outbid.love affiliated with outbid.lol?",
    a: "No. They are unrelated projects run by different people. outbid.love does not resell, mirror or syndicate outbid.lol listings, and nothing you buy here appears there.",
  },
  {
    q: "Can I list on both?",
    a: "Yes, and plenty of people do. Neither board is exclusive, so the same site or handle can appear on both at the same time.",
  },
  {
    q: "Which one is better value?",
    a: "It depends on the shape of the spend. A permanent bid is one payment for a position that slowly slides as others outbid it — simpler if you want a line item that stays listed. A decaying bid is a running cost for a position that is visible now — cheaper if you want the top during a launch week or a campaign, because you are renting attention rather than buying a plaque.",
  },
  {
    q: "What do I actually get for the money?",
    a: "A ranked listing that links out to your site or profile through a counted redirect, with the outbound click count shown publicly on every row. Links are nofollow, so it buys human traffic and visibility rather than search-engine link equity.",
  },
];

export default async function OutbidLolAlternative() {
  const [league, stats] = await Promise.all([getCityLeague(12), getStats()]);
  const cheapest = league.length
    ? centsToUsd(league[league.length - 1].effective_cents + 1)
    : MIN;
  const showcase = league.length >= 6 ? league.slice(0, 8) : topCities(8);

  return (
    <main className="page">
      <Jsonld
        data={[
          organizationLd(),
          serviceLd(
            `Pay-to-rank leaderboard and an alternative to outbid.lol: every payment decays ${PCT}% per day, so the top spot is repeatedly winnable.`
          ),
          faqLd(FAQ, "en"),
          breadcrumbLd([
            { name: CONFIG.siteName, url: CONFIG.url },
            { name: "outbid.lol alternative", url: `${CONFIG.url}/outbid-lol-alternative` },
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
        <h1>The outbid.lol alternative where #1 gets cheaper</h1>

        <p className="lede">
          Same idea — a public leaderboard you buy your way onto. One rule
          changed: every payment <strong>decays {PCT}% a day</strong>, so the
          price of the top falls by the hour instead of only ever climbing.
        </p>

        <h2>The short answer</h2>
        <p>
          outbid.love is an independent pay-to-rank leaderboard. Like
          outbid.lol, your position is decided by money rather than votes,
          editors or an algorithm, and there is no account to create. Unlike
          outbid.lol, a payment here is rent rather than property: it loses{" "}
          {PCT}% of its value every day from the moment it clears. That single
          change flips the economics — on a permanent-bid board the cost of #1
          only ratchets upward, while here it falls continuously until somebody
          tops up. Entry is {MIN}, and the board is organised by city, so there
          are {CITIES.length.toLocaleString("en-US")} separate #1 positions
          rather than one.
        </p>

        <h2>Why people go looking for an alternative</h2>
        <ol>
          <li>
            <strong>The price only goes up.</strong> When bids are permanent,
            every new leader has to beat the highest amount anybody ever paid.
            A board that trends viral prices its own top spot out of reach
            within days.
          </li>
          <li>
            <strong>One payer parks at the top.</strong> Nothing dislodges a
            permanent #1 except a bigger cheque, so the interesting part of the
            game ends early and the board stops moving.
          </li>
          <li>
            <strong>Arriving late is a penalty.</strong> On a permanent board
            the people who showed up on day one hold the good positions
            indefinitely. Here the opposite is true: every hour you wait, the
            top gets cheaper.
          </li>
        </ol>

        <h2>What outbid.love does differently</h2>
        <ul>
          <li>
            <strong>Decay, not permanence.</strong> {centsToUsd(10000)} is worth{" "}
            {centsToUsd(4783)} after a week and {centsToUsd(2288)} after two.
            Below {centsToUsd(CONFIG.dropoutCents)} a listing leaves the board.
          </li>
          <li>
            <strong>Cities, not one global list.</strong> Every city on Earth
            has its own #1 and its own page, and the cities compete against each
            other in a world league. Most of them are still unclaimed.
          </li>
          <li>
            <strong>Profiles, not just products.</strong> An X, TikTok,
            Instagram, LinkedIn, YouTube or GitHub profile works as well as a
            website.
          </li>
          <li>
            <strong>Eighteen languages.</strong> The board, the city pages and
            the rules are translated, so a bid from anywhere lands on the same
            ranking without an English-only funnel.
          </li>
        </ul>

        <h2>What it costs today</h2>
        <p>
          Right now there {stats.listings === 1 ? "is" : "are"}{" "}
          <strong>{stats.listings}</strong>{" "}
          {stats.listings === 1 ? "listing" : "listings"} live across{" "}
          <strong>{league.length}</strong>{" "}
          {league.length === 1 ? "city" : "cities"}. The quietest city currently
          in play can be taken for <strong>{cheapest}</strong>, and any city
          nobody has claimed costs the <strong>{MIN}</strong> minimum. Those
          numbers move every hour, which is the point — check the{" "}
          <a href="/">live globe</a> rather than trusting this paragraph.
        </p>

        <p className="fine">
          Payment is by card through Shopier. Bids are quoted in US dollars and
          charged in Turkish lira at the live rate. No account, no email.
        </p>

        <h2>Cities to start from</h2>
        <div className="cats" style={{ marginBottom: 8 }}>
          {showcase.map((c) => (
            <a key={c.id} className="cat" href={`/city/${c.id}`}>
              <span className="cat-name">{c.name}</span>
              <span className="cat-sub">{c.country}</span>
            </a>
          ))}
        </div>
        <p className="fine">
          <a href="/board">Every listing, every city →</a>
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

        <h2>Read next</h2>
        <p>
          <a href="/vs/outbid-lol">
            outbid.love vs outbid.lol — the full side-by-side table →
          </a>
          <span aria-hidden> · </span>
          <a href="/how-it-works">How the decay maths works →</a>
          <span aria-hidden> · </span>
          <a href="/faq">FAQ →</a>
        </p>

        <p className="fine">
          outbid.lol is an independent project with no connection to
          outbid.love. Details about it here are taken from its own public
          rules page; if anything is out of date, its site is the authority.
        </p>
      </div>

      <Footer listings={stats.listings} />
    </main>
  );
}
