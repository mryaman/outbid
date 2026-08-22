import type { Metadata } from "next";
import { getBoard } from "@/lib/db";
import { CATEGORIES } from "@/lib/categories";
import { centsToUsd } from "@/lib/config";
import Nav from "@/components/Nav";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Every category has its own decaying leaderboard. Pick one and outbid your way to the top of your niche.",
  alternates: { canonical: "/categories" },
};

export default async function Categories() {
  const board = await getBoard(200);

  const byCat = new Map<string, { count: number; topTitle: string; topCents: number }>();
  for (const r of board) {
    const cur = byCat.get(r.category);
    if (!cur) {
      byCat.set(r.category, { count: 1, topTitle: r.title, topCents: r.effective_cents });
    } else {
      cur.count += 1;
    }
  }

  return (
    <main className="page">
      <div className="topbar">
        <a className="brand" href="/">
          outbid<span className="tld">.love</span>
        </a>
        <Nav current="/categories" />
      </div>

      <header className="hero">
        <h1>Categories</h1>
        <p className="lede">
          Every category has its own ranking. Pick yours — an empty category
          means <strong>#1 costs the minimum bid</strong>.
        </p>
      </header>

      <section className="cats" aria-label="Category list">
        {CATEGORIES.map((c) => {
          const s = byCat.get(c.slug);
          return (
            <a key={c.slug} className="cat" href={`/categories/${c.slug}`}>
              <span className="cat-name">{c.name}</span>
              {s ? (
                <span className="cat-sub">
                  {s.count} {s.count === 1 ? "listing" : "listings"} · #1 is{" "}
                  {s.topTitle} at {centsToUsd(s.topCents)}
                </span>
              ) : (
                <span className="cat-sub cat-sub--empty">
                  Unclaimed — be the first
                </span>
              )}
            </a>
          );
        })}
      </section>

      <footer className="foot">
        <a href="/">← Back to the board</a>
      </footer>
    </main>
  );
}
