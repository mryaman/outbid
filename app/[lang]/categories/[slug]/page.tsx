import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBoard } from "@/lib/db";
import { CATEGORIES, isValidCategory } from "@/lib/categories";
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
import { ROW_LABELS } from "@/lib/i18n/row";
import { breadcrumbLd, leaderboardLd, organizationLd } from "@/lib/seo";
import Jsonld from "@/components/Jsonld";
import LangSwitcher from "@/components/LangSwitcher";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Row from "@/components/Row";

export const revalidate = 15;
export const dynamicParams = false;

export function generateStaticParams() {
  return ALT_LOCALES.flatMap((lang) => CATEGORIES.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isValidCategory(slug)) return {};
  const t = dict(lang);
  const name = t.cats[slug] ?? slug;
  const path = `/categories/${slug}`;
  return {
    title: fill(t.catTitle, { name }),
    description: fill(t.catMetaDesc, { name }),
    alternates: { canonical: localePath(lang, path), languages: altLanguages(path) },
    openGraph: {
      title: fill(t.catTitle, { name }),
      description: fill(t.catMetaDesc, { name }),
      url: `${CONFIG.url}${localePath(lang, path)}`,
      siteName: CONFIG.siteName,
      type: "website",
      locale: OG_LOCALE[lang],
    },
  };
}

export default async function LocalizedCategory({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isValidCategory(slug)) notFound();
  const l = lang as Locale;
  const t = dict(l);
  const name = t.cats[slug] ?? slug;
  const board = await getBoard(100, { category: slug });
  const home = localePath(l, "/");
  const path = `/categories/${slug}`;

  const claimPrice =
    board.length > 0 ? centsToUsd(board[0].effective_cents + 1) : centsToUsd(CONFIG.minBidCents);

  return (
    <main className="page" lang={HREFLANG[l]} dir={DIR[l]}>
      <Jsonld
        data={[
          organizationLd(),
          leaderboardLd(board, {
            name: fill(t.catTitle, { name }),
            url: `${CONFIG.url}${localePath(l, path)}`,
            lang: HREFLANG[l],
          }),
          breadcrumbLd([
            { name: CONFIG.siteName, url: `${CONFIG.url}${home}` },
            { name: t.catsH2, url: `${CONFIG.url}${localePath(l, "/categories")}` },
            { name, url: `${CONFIG.url}${localePath(l, path)}` },
          ]),
        ]}
      />

      <div className="topbar">
        <a className="brand" href={home}>
          outbid<span className="tld">.love</span>
        </a>
        <Nav current="/categories" locale={l} />
      </div>

      <header className="hero">
        <h1>{name}</h1>
        <p
          className="lede"
          dangerouslySetInnerHTML={{
            __html:
              board.length > 0
                ? fill(t.catHeroWith, { n: board.length, price: claimPrice })
                : fill(t.catHeroEmpty, { price: claimPrice }),
          }}
        />
        <p className="fine">
          <a href={`${localePath(l, "/board")}?cat=${slug}`}>{t.formSubmit}</a>
        </p>
      </header>

      <section className="board" aria-label={fill(t.catTitle, { name })}>
        {board.length === 0 ? (
          <p className="empty">{t.catEmpty}</p>
        ) : (
          board.map((r, i) => (
            <Row
              key={r.id}
              rank={i + 1}
              row={r}
              nextCents={board[i + 1]?.effective_cents ?? 0}
              canOutbid={CONFIG.phase === "paid"}
              labels={ROW_LABELS[l]}
              langPrefix={`/${l}`}
              showCity
            />
          ))
        )}
      </section>

      <section className="prose">
        <h2>{t.decayH2}</h2>
        <p>
          {fill(t.decayP, {
            pct: Math.round((1 - CONFIG.decayPerDay) * 100),
            a: centsToUsd(10000),
            b: centsToUsd(4783),
            c: centsToUsd(2288),
            drop: centsToUsd(CONFIG.dropoutCents),
          })}
        </p>
      </section>

      <LangSwitcher locale={l} path={path} />

      <footer className="foot">
        <a href={localePath(l, "/categories")}>{t.catsAll}</a>
        <span aria-hidden>·</span>
        <a href={home}>{t.footer.back}</a>
      </footer>

      <Footer locale={l} />
    </main>
  );
}
