import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBoard, getStats } from "@/lib/db";
import { CONFIG, centsToUsd } from "@/lib/config";
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
import { ROW_LABELS } from "@/lib/i18n/row";
import { breadcrumbLd, leaderboardLd, organizationLd } from "@/lib/seo";
import Jsonld from "@/components/Jsonld";
import Nav from "@/components/Nav";
import Row from "@/components/Row";
import Banner from "@/components/Banner";
import DecayMeter from "@/components/DecayMeter";
import LiveStats from "@/components/LiveStats";
import CitySearch from "@/components/CitySearch";
import LangSwitcher from "@/components/LangSwitcher";
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
  return {
    title: { absolute: `${c.boardTitle} · ${CONFIG.siteName}` },
    description: c.boardDesc,
    alternates: { canonical: localePath(lang, "/board"), languages: altLanguages("/board") },
    openGraph: {
      title: c.boardTitle,
      description: c.boardDesc,
      url: `${CONFIG.url}${localePath(lang, "/board")}`,
      siteName: CONFIG.siteName,
      type: "website",
      locale: OG_LOCALE[lang],
    },
  };
}

export default async function LocalizedBoard({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  const t = dict(l);
  const c = CITY[l];
  const prefix = `/${l}`;

  const [board, stats] = await Promise.all([getBoard(100), getStats()]);
  const pct = Math.round((1 - CONFIG.decayPerDay) * 100);
  const topCents = board[0]?.effective_cents ?? 10000;

  const vars = {
    pct,
    min: centsToUsd(CONFIG.minBidCents),
    a: centsToUsd(10000),
    b: centsToUsd(4783),
    c: centsToUsd(2288),
    drop: centsToUsd(CONFIG.dropoutCents),
  };

  return (
    <main className="page" lang={HREFLANG[l]} dir={DIR[l]}>
      <Jsonld
        data={[
          organizationLd(),
          leaderboardLd(board, {
            name: c.boardTitle,
            url: `${CONFIG.url}${prefix}/board`,
            lang: HREFLANG[l],
          }),
          breadcrumbLd([
            { name: CONFIG.siteName, url: `${CONFIG.url}${prefix}` },
            { name: c.navBoard, url: `${CONFIG.url}${prefix}/board` },
          ]),
        ]}
      />

      <header className="hero">
        <div className="topbar">
          <a className="brand" href={prefix}>
            outbid<span className="tld">.love</span>
          </a>
          <LiveStats initialVisits={stats.visits} initialOnline={stats.online} />
        </div>
        <Nav current="/board" locale={l} />

        <h1>{c.navBoard}</h1>
        <p className="lede" dangerouslySetInnerHTML={{ __html: fill(t.lede, vars) }} />

        <Banner />

        <div className="founding">
          <span className="pill">{c.navGlobe}</span>
          <p>{c.boardDesc}</p>
          <CitySearch langPrefix={prefix} />
        </div>
      </header>

      <section className="board" aria-label={c.boardTitle}>
        {board.length === 0 ? (
          <p className="empty">{t.boardEmpty}</p>
        ) : (
          board.map((r, i) => (
            <Row
              key={r.id}
              rank={i + 1}
              row={r}
              nextCents={board[i + 1]?.effective_cents ?? 0}
              canOutbid={CONFIG.phase === "paid"}
              showCity
              labels={ROW_LABELS[l]}
              langPrefix={prefix}
            />
          ))
        )}
      </section>

      <section className="explain">
        <h2>{t.decayH2}</h2>
        <p>{fill(t.decayP, vars)}</p>
        <DecayMeter startCents={topCents} />
        <p className="fine">{t.decayFine}</p>
      </section>

      <LangSwitcher locale={l} path="/board" />

      <Footer listings={stats.listings} locale={l} />
    </main>
  );
}
