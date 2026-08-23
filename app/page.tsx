import type { Metadata } from "next";
import { getCityLeague, getStats } from "@/lib/db";
import { platformOf } from "@/lib/normalize";
import { topCities, CITIES } from "@/lib/cities";
import { CONFIG, centsToUsd } from "@/lib/config";
import { CATEGORIES } from "@/lib/categories";
import { altLanguages, dict, fill } from "@/lib/i18n";
import { CITY } from "@/lib/i18n/city";
import {
  breadcrumbLd,
  faqLd,
  howToLd,
  leagueLd,
  organizationLd,
  serviceLd,
  websiteLd,
} from "@/lib/seo";
import Jsonld from "@/components/Jsonld";
import Faq from "@/components/Faq";
import LangSwitcher from "@/components/LangSwitcher";
import GlobeSection from "@/components/GlobeSection";
import LeagueTable from "@/components/LeagueTable";
import type { GlobeCity } from "@/components/GlobeView";
import Nav from "@/components/Nav";
import LiveStats from "@/components/LiveStats";
import Footer from "@/components/Footer";

export const revalidate = 15;

const t = dict("en");
const c = CITY.en;

export const metadata: Metadata = {
  title: { absolute: c.metaTitle },
  description: c.metaDesc,
  keywords: [
    ...t.keywords,
    "city leaderboard",
    "who is number one in my city",
    "put your profile on a city",
    "world city ranking",
  ],
  alternates: { canonical: "/", languages: altLanguages("") },
  openGraph: {
    title: c.metaTitle,
    description: c.metaDesc,
    url: CONFIG.url,
    siteName: CONFIG.siteName,
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-card.png", width: 1200, height: 630, alt: CONFIG.siteName }],
  },
};

export default async function Home() {
  const [league, stats] = await Promise.all([getCityLeague(200), getStats()]);

  const activeIds = new Set(league.map((l) => l.id));
  const cities: GlobeCity[] = [
    ...league.map((l) => ({
      id: l.id,
      name: l.name,
      country: l.country,
      cc: l.country_code,
      lat: l.lat,
      lon: l.lon,
      cents: l.effective_cents,
      listings: l.listings,
      rank: l.league_rank,
      // Küredeki işaret o şehrin #1'inin amblemini taşıyor.
      platform: l.top_target_url ? platformOf(l.top_target_url) : undefined,
      top: l.top_title,
    })),
    ...topCities(240)
      .filter((x) => !activeIds.has(x.id))
      .map((x) => ({
        id: x.id,
        name: x.name,
        country: x.country,
        cc: x.cc,
        lat: x.lat,
        lon: x.lon,
        cents: 0,
        listings: 0,
        rank: 0,
      })),
  ];

  const total = league.reduce((s, l) => s + l.effective_cents, 0);
  const decayPct = Math.round((1 - CONFIG.decayPerDay) * 100);

  const vars = {
    pct: decayPct,
    min: centsToUsd(CONFIG.minBidCents),
    a: centsToUsd(10000),
    b: centsToUsd(4783),
    c: centsToUsd(2288),
    drop: centsToUsd(CONFIG.dropoutCents),
    n: CITIES.length.toLocaleString("en-US"),
  };

  // Ana sayfada ilk 6 soru; tamamı /faq'ta — iki sayfa aynı FAQ bloğunu
  // birebir tekrar etmesin diye şema da bu altkümeyi veriyor.
  const homeFaq = t.faq.slice(0, 6);

  return (
    <main className="page page--wide">
      <Jsonld
        data={[
          websiteLd(c.metaDesc, "en"),
          organizationLd(),
          serviceLd(c.metaDesc),
          faqLd(homeFaq, "en"),
          howToLd(c.stepsH2, c.steps.map((s) => fill(s, vars)), "en"),
          leagueLd(league, { name: c.leagueH2, url: CONFIG.url, lang: "en" }),
          breadcrumbLd([{ name: CONFIG.siteName, url: CONFIG.url }]),
        ]}
      />

      <header className="hero">
        <div className="topbar">
          <span className="brand">
            outbid<span className="tld">.love</span>
          </span>
          <LiveStats initialVisits={stats.visits} initialOnline={stats.online} />
        </div>
        <Nav current="/" />

        <h1>Every city has a #1. Take yours.</h1>
        <p className="lede">
          Put your X, TikTok, Instagram, LinkedIn — or any link you own — on a
          city. The biggest payment in that city sits at the top of it. Every
          payment <strong>decays {decayPct}% a day</strong>, so no one holds a
          city forever.
        </p>
      </header>

      <GlobeSection cities={cities} paid={CONFIG.phase === "paid"} />

      <p className="fine browse-hint">
        Just looking? Click any glowing city on the globe, or open one from the
        league below.
      </p>

      <section className="globe-stats" aria-label="Live totals">
        <div>
          <strong>{league.length}</strong>
          <span>cities in play</span>
        </div>
        <div>
          <strong>{stats.listings}</strong>
          <span>profiles listed</span>
        </div>
        <div>
          <strong>{centsToUsd(total)}</strong>
          <span>live on the map</span>
        </div>
      </section>

      <section className="board" aria-label="City league">
        <div className="section-head">
          <h2>The city league</h2>
          <p className="fine">
            Ranked by everything still burning in each city — busiest at the
            top, quietest at the bottom.
          </p>
        </div>
        <LeagueTable rows={league} />
      </section>

      <section className="explain" id="how-it-works">
        <h2>How it works</h2>
        <ol className="steps">
          <li>
            <strong>Find your city.</strong> Search it or click it on the globe.
            All {vars.n} cities are open — most of them have no #1 yet.
          </li>
          <li>
            <strong>Put your profile on it.</strong> An @handle, a social link,
            or your own site. No account, no email.
          </li>
          <li>
            <strong>Pay what the spot is worth to you.</strong> The largest
            live amount in that city is #1 — and the city itself climbs the
            world league as its people spend.
          </li>
          <li>
            <strong>Watch it burn.</strong> Every payment loses {decayPct}% of
            its value per day. {centsToUsd(10000)} is worth{" "}
            {centsToUsd(4783)} after a week. Rank is a running cost, not a
            purchase — which is why #1 is never out of reach.
          </li>
        </ol>
      </section>

      <section className="prose" id="what-is-it">
        <h2>What outbid.love is</h2>
        {t.intro.map((p, i) => (
          <p key={i}>{fill(p, vars)}</p>
        ))}
        <p>
          <a href="/how-it-works">The decay maths, step by step →</a>
          <span aria-hidden> · </span>
          <a href="/outbid-lol-alternative">The outbid.lol alternative →</a>
          <span aria-hidden> · </span>
          <a href="/vs/outbid-lol">outbid.love vs outbid.lol →</a>
          <span aria-hidden> · </span>
          <a href="/board">The world board →</a>
        </p>
      </section>

      <Faq items={homeFaq} title={t.faqH2} />
      <p className="fine">
        <a href="/faq">Read all {t.faq.length} questions →</a>
      </p>

      <section className="cats" aria-label="Categories" id="categories">
        <h2 className="cats-h">Categories</h2>
        {CATEGORIES.map((cat) => (
          <a key={cat.slug} className="cat" href={`/categories/${cat.slug}`}>
            <span className="cat-name">{cat.name}</span>
          </a>
        ))}
      </section>

      <LangSwitcher locale="en" path="" />

      <Footer listings={stats.listings} />
    </main>
  );
}
