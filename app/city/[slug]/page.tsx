import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBoard, getCityLeague } from "@/lib/db";
import { getCity, flagOf, topCities } from "@/lib/cities";
import { CONFIG, centsToUsd } from "@/lib/config";
import Nav from "@/components/Nav";
import Row from "@/components/Row";
import BidForm from "@/components/BidForm";
import SubmitForm from "@/components/SubmitForm";
import CityGlobe from "@/components/CityGlobe";
import CitySearch from "@/components/CitySearch";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import type { GlobeCity } from "@/components/GlobeView";

export const revalidate = 15;
export const dynamicParams = true;

/** Yalnızca en büyük şehirler önceden üretilir; gerisi ilk istekte. */
export function generateStaticParams() {
  return topCities(60).map((c) => ({ slug: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return { title: "City not found" };
  return {
    title: `${city.name} leaderboard`,
    description: `Who is #1 in ${city.name}, ${city.country}? Put your X, TikTok, Instagram, LinkedIn or your own link on ${city.name} — the biggest live payment takes the top of the city.`,
    alternates: { canonical: `/city/${city.id}` },
    openGraph: {
      title: `${city.name} — outbid.love`,
      description: `The people leaderboard of ${city.name}. Every payment decays 10% a day.`,
      url: `${CONFIG.url}/city/${city.id}`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const [board, league] = await Promise.all([
    getCityBoard(city.id, 100),
    getCityLeague(300),
  ]);

  const mine = league.find((l) => l.id === city.id);
  const flag = flagOf(city.cc);
  const topCents = board[0]?.effective_cents ?? 0;
  const takeTop = Math.max(CONFIG.minBidCents, topCents + 1);

  const globeCities: GlobeCity[] = [
    ...league.slice(0, 120).map((l) => ({
      id: l.id,
      name: l.name,
      country: l.country,
      cc: l.country_code,
      lat: l.lat,
      lon: l.lon,
      cents: l.effective_cents,
      listings: l.listings,
      rank: l.league_rank,
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
      .filter((c) => c.id !== city.id && !league.some((l) => l.id === c.id))
      .map((c) => ({
        id: c.id,
        name: c.name,
        country: c.country,
        cc: c.cc,
        lat: c.lat,
        lon: c.lon,
        cents: 0,
        listings: 0,
        rank: 0,
      })),
  ];

  return (
    <main className="page">
      <div className="topbar">
        <a className="brand" href="/">
          outbid<span className="tld">.love</span>
        </a>
        <Nav current="/" />
      </div>

      <header className="hero city-hero">
        <p className="crumb">
          <a href="/">← Globe</a>
          <span aria-hidden> · </span>
          <span>{city.country}</span>
        </p>

        <h1>
          <span className="cityflag" aria-hidden>{flag}</span> {city.name}
        </h1>

        <p className="lede">
          {board.length > 0 ? (
            <>
              {board.length} {board.length === 1 ? "profile" : "profiles"} live
              here. Taking #1 in {city.name} costs{" "}
              <strong>{centsToUsd(takeTop)}</strong> right now — and it falls
              every hour.
            </>
          ) : (
            <>
              Nobody has claimed {city.name} yet.{" "}
              <strong>#1 costs {centsToUsd(CONFIG.minBidCents)}.</strong>
            </>
          )}
        </p>

        <Banner />

        <div className="city-facts">
          <div>
            <strong>{mine ? `#${mine.league_rank}` : "—"}</strong>
            <span>in the world league</span>
          </div>
          <div>
            <strong>{centsToUsd(mine?.effective_cents ?? 0)}</strong>
            <span>burning here</span>
          </div>
          <div>
            <strong>{city.pop.toLocaleString("en-US")}</strong>
            <span>people to outbid</span>
          </div>
        </div>
      </header>

      <CityGlobe cities={globeCities} focusId={city.id} />

      <section className="founding" id="bid">
        <span className="pill">{city.name}</span>
        {CONFIG.phase === "paid" ? (
          <>
            <p>
              Put your profile on {city.name} — or outbid whoever is sitting on
              it. You pay exactly what you bid, once.
            </p>
            <BidForm cityId={city.id} cityName={city.name} topCents={topCents} />
          </>
        ) : (
          <>
            <p>
              Founding phase: the first listings are free and start with{" "}
              {centsToUsd(CONFIG.foundingCents)} of decaying credit.
            </p>
            <SubmitForm cityId={city.id} cityName={city.name} />
          </>
        )}
        <p className="fine">
          X, TikTok, Instagram, LinkedIn, YouTube, GitHub — or any link you own.
        </p>
      </section>

      <section className="board" aria-label={`${city.name} leaderboard`}>
        {board.length === 0 ? (
          <p className="empty">
            Empty. The first payment owns {city.name}.
          </p>
        ) : (
          board.map((r, i) => (
            <Row
              key={r.id}
              rank={i + 1}
              row={r}
              nextCents={board[i + 1]?.effective_cents ?? 0}
              canOutbid={CONFIG.phase === "paid"}
              cityId={city.id}
            />
          ))
        )}
      </section>

      <section className="explain">
        <h2>Somewhere else?</h2>
        <CitySearch placeholder={`Jump to another city…`} />
      </section>

      <Footer />
    </main>
  );
}
