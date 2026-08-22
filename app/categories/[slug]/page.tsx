import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBoard } from "@/lib/db";
import { CATEGORIES, categoryName, isValidCategory } from "@/lib/categories";
import { CONFIG, centsToUsd } from "@/lib/config";
import Nav from "@/components/Nav";
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
  return {
    title: `${name} leaderboard`,
    description: `Who leads ${name} right now? Bid any amount to take the top spot — every bid decays 10% a day, so #1 is always winnable.`,
    alternates: { canonical: `/categories/${slug}` },
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

  return (
    <main className="page">
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
              taking #1 costs{" "}
              <strong>{centsToUsd(board[0].effective_cents + 1)}</strong> right
              now, and it drops by the hour.
            </>
          ) : (
            <>
              Nobody has claimed this category yet.{" "}
              <strong>#1 costs {centsToUsd(CONFIG.minBidCents)}.</strong>
            </>
          )}
        </p>
        <p className="fine">
          <a href="/#bid">Place a bid on the main board →</a>
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
              showCity
            />
          ))
        )}
      </section>

      <footer className="foot">
        <a href="/categories">← All categories</a>
        <span aria-hidden>·</span>
        <a href="/">Main board</a>
      </footer>
    </main>
  );
}
