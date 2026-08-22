import type { Metadata } from "next";
import { getBoard } from "@/lib/db";
import { CATEGORIES } from "@/lib/categories";
import { CONFIG, centsToUsd } from "@/lib/config";
import { altLanguages } from "@/lib/i18n";
import { breadcrumbLd, organizationLd } from "@/lib/seo";
import Jsonld from "@/components/Jsonld";
import Nav from "@/components/Nav";
import LangSwitcher from "@/components/LangSwitcher";
import Footer from "@/components/Footer";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Categories — 27 decaying leaderboards, one per niche",
  description:
    "Every category has its own pay-to-rank leaderboard. Pick a niche and outbid your way to the top — an unclaimed category costs the $5 minimum.",
  alternates: { canonical: "/categories", languages: altLanguages("/categories") },
  keywords: [
    "leaderboard categories",
    "niche ranking board",
    "ai tools leaderboard",
    "developer tools ranking",
    "claim a category",
  ],
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
      <Jsonld
        data={[
          organizationLd(),
          breadcrumbLd([
            { name: CONFIG.siteName, url: CONFIG.url },
            { name: "Categories", url: `${CONFIG.url}/categories` },
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
        <h1>Categories</h1>
        <p className="lede">
          Every category has its own ranking. Pick yours — an empty category
          means <strong>#1 costs the minimum bid</strong> of{" "}
          {centsToUsd(CONFIG.minBidCents)}.
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

      <LangSwitcher locale="en" path="/categories" />

      <Footer />
    </main>
  );
}
