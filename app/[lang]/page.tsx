import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityLeague, getStats } from "@/lib/db";
import { topCities, CITIES } from "@/lib/cities";
import { CONFIG, centsToUsd } from "@/lib/config";
import { CATEGORIES } from "@/lib/categories";
import {
  ALT_LOCALES,
  DIR,
  HREFLANG,
  OG_LOCALE,
  altLanguages,
  dict,
  fill,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n";
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
export const dynamicParams = false;

export function generateStaticParams() {
  return ALT_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const c = CITY[lang];
  const t = dict(lang);
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDesc,
    keywords: t.keywords,
    alternates: { canonical: localePath(lang, "/"), languages: altLanguages("") },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDesc,
      url: `${CONFIG.url}${localePath(lang, "/")}`,
      siteName: CONFIG.siteName,
      type: "website",
      locale: OG_LOCALE[lang],
      images: [{ url: "/og-card.png", width: 1200, height: 630, alt: CONFIG.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.metaTitle,
      description: c.metaDesc,
      images: ["/og-card.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocalizedGlobe({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  const t = dict(l);
  const c = CITY[l];
  const hl = HREFLANG[l];
  const prefix = `/${l}`;

  const [league, stats] = await Promise.all([getCityLeague(200), getStats()]);

  const activeIds = new Set(league.map((x) => x.id));
  const cities: GlobeCity[] = [
    ...league.map((x) => ({
      id: x.id,
      name: x.name,
      country: x.country,
      cc: x.country_code,
      lat: x.lat,
      lon: x.lon,
      cents: x.effective_cents,
      listings: x.listings,
      rank: x.league_rank,
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

  const total = league.reduce((s, x) => s + x.effective_cents, 0);
  const pct = Math.round((1 - CONFIG.decayPerDay) * 100);

  const vars = {
    pct,
    min: centsToUsd(CONFIG.minBidCents),
    a: centsToUsd(10000),
    b: centsToUsd(4783),
    c: centsToUsd(2288),
    drop: centsToUsd(CONFIG.dropoutCents),
    n: CITIES.length.toLocaleString("en-US"),
  };

  const ld = [
    websiteLd(c.metaDesc, hl),
    organizationLd(),
    serviceLd(c.metaDesc),
    faqLd(t.faq, hl),
    howToLd(c.stepsH2, c.steps.map((s) => fill(s, vars)), hl),
    leagueLd(league, {
      name: c.leagueH2,
      url: `${CONFIG.url}${prefix}`,
      lang: hl,
    }),
    breadcrumbLd([{ name: CONFIG.siteName, url: `${CONFIG.url}${prefix}` }]),
  ];

  return (
    <main className="page page--wide" lang={hl} dir={DIR[l]}>
      <Jsonld data={ld} />

      <header className="hero">
        <div className="topbar">
          <a className="brand" href={prefix}>
            outbid<span className="tld">.love</span>
          </a>
          <LiveStats initialVisits={stats.visits} initialOnline={stats.online} />
        </div>
        <Nav current="/" locale={l} />

        <h1>{c.h1}</h1>
        <p className="lede" dangerouslySetInnerHTML={{ __html: fill(c.lede, vars) }} />
      </header>

      <GlobeSection cities={cities} paid={CONFIG.phase === "paid"} locale={l} />

      <section className="globe-stats" aria-label={c.leagueH2}>
        <div>
          <strong>{league.length}</strong>
          <span>{c.statCities}</span>
        </div>
        <div>
          <strong>{stats.listings}</strong>
          <span>{c.statProfiles}</span>
        </div>
        <div>
          <strong>{centsToUsd(total)}</strong>
          <span>{c.statLive}</span>
        </div>
      </section>

      <section className="board" aria-label={c.leagueH2}>
        <div className="section-head">
          <h2>{c.leagueH2}</h2>
          <p className="fine">{c.leagueSub}</p>
        </div>
        <LeagueTable rows={league} langPrefix={prefix} profiles={t.catListings} />
      </section>

      <section className="explain" id="how-it-works">
        <h2>{c.stepsH2}</h2>
        <ol className="steps">
          {c.steps.map((s, i) => (
            <li key={i}>{fill(s, vars)}</li>
          ))}
        </ol>
      </section>

      <section className="prose" id="what-is-it">
        {t.intro.map((p, i) => (
          <p key={i}>{fill(p, vars)}</p>
        ))}
        <h2>{t.decayH2}</h2>
        <p>{fill(t.decayP, vars)}</p>
        <p className="fine">{t.decayFine}</p>
        <h2>{t.vsH2}</h2>
        <p>{t.vsP}</p>
      </section>

      <Faq items={t.faq} title={t.faqH2} />

      <section className="cats" aria-label={t.catsH2} id="categories">
        <h2 className="cats-h">{t.catsH2}</h2>
        {CATEGORIES.map((cat) => (
          <a key={cat.slug} className="cat" href={localePath(l, `/categories/${cat.slug}`)}>
            <span className="cat-name">{t.cats[cat.slug] ?? cat.name}</span>
          </a>
        ))}
      </section>

      <LangSwitcher locale={l} path="" />

      <Footer listings={stats.listings} locale={l} />

      <p className="fine translated-note">{t.translatedNote}</p>
    </main>
  );
}
