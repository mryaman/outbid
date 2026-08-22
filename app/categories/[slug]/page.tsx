import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBoard } from "@/lib/db";
import { CATEGORIES, categoryName, isValidCategory } from "@/lib/categories";
import { CONFIG, centsToUsd } from "@/lib/config";
import { altLanguages } from "@/lib/i18n";
import { ROW_LABELS } from "@/lib/i18n/row";
import { breadcrumbLd, leaderboardLd, organizationLd } from "@/lib/seo";
import Jsonld from "@/components/Jsonld";
import Nav from "@/components/Nav";
import LangSwitcher from "@/components/LangSwitcher";
import Footer from "@/components/Footer";
import Row from "@/components/Row";

export const revalidate = 15;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = categoryName(slug);
  const path = `/categories/${slug}`;
  return {
    title: `${name} leaderboard`,
    description: `Who leads ${name} right now? Bid any amount to take the top spot — every bid decays 10% a day, so #1 is always winnable. Unclaimed categories start at ${centsToUsd(
      CONFIG.minBidCents
    )}.`,
    alternates: { canonical: path, languages: altLanguages(path) },
    keywords: [
      `${name} leaderboard`,
      `best ${name.toLowerCase()}`,
      `top ${name.toLowerCase()} ranking`,
      "pay to rank",
      "outbid.lol alternative",
    ],
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isValidCategory(slug)) notFound();

  const board = await getBoard(100, { category: slug });
  const name = categoryName(slug);
  const path = `/categories/${slug}`;
  const claimPrice =
    board.length > 0 ? centsToUsd(board[0].effective_cents + 1) : centsToUsd(CONFIG.minBidCents);

  return (
    <main className="page">
      <Jsonld
        data={[
          organizationLd(),
          leaderboardLd(board, {
            name: `${name} leaderboard`,
            url: `${CONFIG.url}${path}`,
            lang: "en",
          }),
          breadcrumbLd([
            { name: CONFIG.siteName, url: CONFIG.url },
            { name: "Categories", url: `${CONFIG.url}/categories` },
            { name, url: `${CONFIG.url}${path}` },
          ]),
        ]}
      />

      <div className="topbar">
        <a className="brand" href="/">
          outbid<span className="tld">.love</span>
        </a>
        <Nav current="/categories" />
      </div>

      <header className="hero">
        <h1>{name}</h1>
        <p className="lede">
          {board.length > 0 ? (
            <>
              {board.length} {board.length === 1 ? "listing" : "listings"} —
              taking #1 costs <strong>{claimPrice}</strong> right now, and it
              drops by the hour.
            </>
          ) : (
            <>
              Nobody has claimed this category yet.{" "}
              <strong>#1 costs {claimPrice}.</strong>
            </>
          )}
        </p>
        <p className="fine">
          <a href={`/board?cat=${slug}`}>Claim a spot in {name} →</a>
        </p>
      </header>

      <section className="board" aria-label={`${name} leaderboard`}>
        {board.length === 0 ? (
          <p className="empty">Empty. The first bid owns this category.</p>
        ) : (
          board.map((r, i) => (
            <Row
              key={r.id}
              rank={i + 1}
              row={r}
              nextCents={board[i + 1]?.effective_cents ?? 0}
              canOutbid={CONFIG.phase === "paid"}
              labels={ROW_LABELS.en}
              showCity
            />
          ))
        )}
      </section>

      <section className="prose">
        <h2>How ranking in {name} works</h2>
        <p>
          This category is its own leaderboard. Your position is the amount you
          have paid, decayed by {Math.round((1 - CONFIG.decayPerDay) * 100)}% for
          every day since the payment cleared, so the price of the top spot in{" "}
          {name} falls continuously until somebody tops up. Bids are placed
          inside a city — pick yours on the{" "}
          <a href="/">globe</a> — and a category with no listings can be claimed
          for the {centsToUsd(CONFIG.minBidCents)} minimum. See{" "}
          <a href="/how-it-works">how it works</a> for the maths, or the{" "}
          <a href="/faq">FAQ</a> for the practical questions.
        </p>
      </section>

      <LangSwitcher locale="en" path={path} />

      <Footer />
    </main>
  );
}
