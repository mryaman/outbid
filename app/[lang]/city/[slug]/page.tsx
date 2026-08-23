import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBoard, getCityLeague } from "@/lib/db";
import { platformOf } from "@/lib/normalize";
import { getCity, flagOf, topCities, CITIES } from "@/lib/cities";
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
import { countryName } from "@/lib/i18n/geo";
import { bidLabels, submitLabels } from "@/lib/i18n/labels";
import { FREE } from "@/lib/i18n/free";
import { breadcrumbLd, cityLd, faqLd, leaderboardLd, organizationLd } from "@/lib/seo";
import Jsonld from "@/components/Jsonld";
import Nav from "@/components/Nav";
import Row from "@/components/Row";
import BidForm from "@/components/BidForm";
import SubmitForm from "@/components/SubmitForm";
import FreeClaimForm from "@/components/FreeClaimForm";
import CityGlobe from "@/components/CityGlobe";
import Banner from "@/components/Banner";
import Faq from "@/components/Faq";
import LangSwitcher from "@/components/LangSwitcher";
import Footer from "@/components/Footer";
import type { GlobeCity } from "@/components/GlobeView";

export const revalidate = 15;
export const dynamicParams = true;

/**
 * Her dilde yalnızca en büyük şehirler önceden üretilir; kalan 5.000 şehir
 * ilk istekte üretilip ISR ile saklanır. 18 dil × 5.000 şehri build'de
 * üretmek anlamsız olurdu — talep gelenler zaten önbelleğe giriyor.
 */
export function generateStaticParams() {
  return ALT_LOCALES.flatMap((lang) =>
    topCities(40).map((c) => ({ lang, slug: c.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const city = getCity(slug);
  if (!city) return { title: "City not found" };
  const c = CITY[lang];
  const country = countryName(city.cc, lang, city.country);
  const path = `/city/${city.id}`;

  return {
    title: { absolute: `${fill(c.cityMetaTitle, { city: city.name })} · ${CONFIG.siteName}` },
    description: fill(c.cityMetaDesc, { city: city.name, country }),
    alternates: { canonical: localePath(lang, path), languages: altLanguages(path) },
    openGraph: {
      title: fill(c.cityMetaTitle, { city: city.name }),
      description: fill(c.cityMetaDesc, { city: city.name, country }),
      url: `${CONFIG.url}${localePath(lang, path)}`,
      siteName: CONFIG.siteName,
      type: "website",
      locale: OG_LOCALE[lang],
    },
  };
}

export default async function LocalizedCityPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const city = getCity(slug);
  if (!city) notFound();

  const l = lang as Locale;
  const t = dict(l);
  const c = CITY[l];
  const prefix = `/${l}`;
  const path = `/city/${city.id}`;
  const country = countryName(city.cc, l, city.country);

  const [board, league] = await Promise.all([
    getCityBoard(city.id, 100),
    getCityLeague(300),
  ]);

  const mine = league.find((x) => x.id === city.id);
  const flag = flagOf(city.cc);
  const topCents = board[0]?.effective_cents ?? 0;
  const takeTop = Math.max(CONFIG.minBidCents, topCents + 1);
  // Şehirde canlı kayıt yoksa ilk sıra ücretsiz — sunucu (claim_free_city)
  // aynı koşulu yeniden kontrol ediyor, burası sadece arayüz.
  const freeCity = board.length === 0;

  const globeCities: GlobeCity[] = [
    ...league.slice(0, 120).map((x) => ({
      id: x.id,
      name: x.name,
      country: x.country,
      cc: x.country_code,
      lat: x.lat,
      lon: x.lon,
      cents: x.effective_cents,
      listings: x.listings,
      rank: x.league_rank,
      // Küredeki işaret o şehrin #1'inin amblemini taşıyor.
      platform: x.top_target_url ? platformOf(x.top_target_url) : undefined,
      top: x.top_title,
    })),
    ...(mine
      ? []
      : [{
          id: city.id,
          name: city.name,
          country: city.country,
          cc: city.cc,
          lat: city.lat,
          lon: city.lon,
          cents: 0,
          listings: 0,
          rank: 0,
        }]),
    ...topCities(160)
      .filter((x) => x.id !== city.id && !league.some((y) => y.id === x.id))
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

  const vars = {
    city: city.name,
    country,
    price: centsToUsd(takeTop),
    min: centsToUsd(CONFIG.minBidCents),
    pct: Math.round((1 - CONFIG.decayPerDay) * 100),
    n: CITIES.length.toLocaleString("en-US"),
  };

  const localFaq = c.cityFaq.map((f) => ({
    q: fill(f.q, vars),
    a: fill(f.a, vars),
  }));

  return (
    <main className="page" lang={HREFLANG[l]} dir={DIR[l]}>
      <Jsonld
        data={[
          organizationLd(),
          cityLd(city, {
            url: `${CONFIG.url}${localePath(l, path)}`,
            lang: HREFLANG[l],
            description: fill(c.cityMetaDesc, vars),
          }),
          leaderboardLd(board, {
            name: fill(c.cityMetaTitle, vars),
            url: `${CONFIG.url}${localePath(l, path)}`,
            lang: HREFLANG[l],
          }),
          faqLd(localFaq, HREFLANG[l]),
          breadcrumbLd([
            { name: CONFIG.siteName, url: `${CONFIG.url}${prefix}` },
            { name: country, url: `${CONFIG.url}${prefix}` },
            { name: city.name, url: `${CONFIG.url}${localePath(l, path)}` },
          ]),
        ]}
      />

      <div className="topbar">
        <a className="brand" href={prefix}>
          outbid<span className="tld">.love</span>
        </a>
        <Nav current="/" locale={l} />
      </div>

      <header className="hero city-hero">
        <p className="crumb">
          <a href={prefix}>← {c.navGlobe}</a>
          <span aria-hidden> · </span>
          <span>{country}</span>
        </p>

        <h1>
          <span className="cityflag" aria-hidden>{flag}</span> {city.name}
        </h1>

        <p
          className="lede"
          dangerouslySetInnerHTML={{
            __html: board.length > 0
              ? fill(c.cityLede, vars)
              : FREE[l].intro.replace("{city}", city.name),
          }}
        />

        <Banner />

        <div className="city-facts">
          <div>
            <strong>{mine ? `#${mine.league_rank}` : "—"}</strong>
            <span>{mine ? fill(c.cityLeagueRank, { rank: mine.league_rank }) : c.cityUnranked}</span>
          </div>
          <div>
            <strong>{centsToUsd(mine?.effective_cents ?? 0)}</strong>
            <span>{c.statLive}</span>
          </div>
          <div>
            <strong>{board.length}</strong>
            <span>{c.statProfiles}</span>
          </div>
        </div>
      </header>

      <CityGlobe cities={globeCities} focusId={city.id} />

      <section className="founding" id="bid">
        <span className="pill">{city.name}</span>
        {freeCity ? (
          <>
            <FreeClaimForm
              cityId={city.id}
              cityName={city.name}
              labels={FREE[l]}
              credit={CONFIG.freeFirstCents}
              placeholder={t.formLinkPlaceholder}
            />
            {CONFIG.phase === "paid" && (
              <details className="alt-bid">
                <summary>{FREE[l].orBid}</summary>
                <BidForm
                  cityId={city.id}
                  cityName={city.name}
                  topCents={topCents}
                  labels={bidLabels(l)}
                  locale={l}
                />
              </details>
            )}
          </>
        ) : CONFIG.phase === "paid" ? (
          <>
            <p>{fill(c.steps[1], vars)}</p>
            <BidForm
              cityId={city.id}
              cityName={city.name}
              topCents={topCents}
              labels={bidLabels(l)}
              locale={l}
            />
          </>
        ) : (
          <>
            <p>{fill(c.steps[1], vars)}</p>
            <SubmitForm cityId={city.id} cityName={city.name} labels={submitLabels(l)} />
          </>
        )}
        {!freeCity && <p className="fine">{t.bidFine}</p>}
      </section>

      <section className="board" aria-label={fill(c.cityMetaTitle, vars)}>
        {board.length === 0 ? (
          <p className="empty">{FREE[l].boardEmpty.replace("{city}", city.name)}</p>
        ) : (
          board.map((r, i) => (
            <Row
              key={r.id}
              rank={i + 1}
              row={r}
              nextCents={board[i + 1]?.effective_cents ?? 0}
              canOutbid={CONFIG.phase === "paid"}
              cityId={city.id}
              labels={ROW_LABELS[l]}
              langPrefix={prefix}
            />
          ))
        )}
      </section>

      <section className="prose">
        <h2>{fill(c.cityMetaTitle, vars)}</h2>
        <p>{fill(c.cityIntro, vars)}</p>
      </section>

      <Faq items={localFaq} title={t.faqH2} id="city-faq" />

      <LangSwitcher locale={l} path={path} />

      <footer className="foot">
        <a href={prefix}>{c.cityAll}</a>
        <span aria-hidden>·</span>
        <a href={`${prefix}/board`}>{c.navBoard}</a>
      </footer>

      <Footer locale={l} />
    </main>
  );
}
