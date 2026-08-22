import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBoard } from "@/lib/db";
import { CATEGORIES } from "@/lib/categories";
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
import { breadcrumbLd, organizationLd } from "@/lib/seo";
import Jsonld from "@/components/Jsonld";
import LangSwitcher from "@/components/LangSwitcher";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export const revalidate = 30;
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
  const t = dict(lang);
  const title = `${t.catsH2} · ${CONFIG.siteName}`;
  const desc = t.catsLede.replace(/<[^>]+>/g, "");
  return {
    title: { absolute: title },
    description: desc,
    alternates: {
      canonical: localePath(lang, "/categories"),
      languages: altLanguages("/categories"),
    },
    openGraph: {
      title,
      description: desc,
      url: `${CONFIG.url}${localePath(lang, "/categories")}`,
      siteName: CONFIG.siteName,
      type: "website",
      locale: OG_LOCALE[lang],
    },
  };
}

export default async function LocalizedCategories({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  const t = dict(l);
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

  const home = localePath(l, "/");

  return (
    <main className="page" lang={HREFLANG[l]} dir={DIR[l]}>
      <Jsonld
        data={[
          organizationLd(),
          breadcrumbLd([
            { name: CONFIG.siteName, url: `${CONFIG.url}${home}` },
            { name: t.catsH2, url: `${CONFIG.url}${localePath(l, "/categories")}` },
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
        <h1>{t.catsH2}</h1>
        <p className="lede" dangerouslySetInnerHTML={{ __html: t.catsLede }} />
      </header>

      <section className="cats" aria-label={t.catsH2}>
        {CATEGORIES.map((c) => {
          const s = byCat.get(c.slug);
          return (
            <a key={c.slug} className="cat" href={localePath(l, `/categories/${c.slug}`)}>
              <span className="cat-name">{t.cats[c.slug] ?? c.name}</span>
              {s ? (
                <span className="cat-sub">
                  {fill(t.catListings, { n: s.count })} ·{" "}
                  {fill(t.catTopIs, { title: s.topTitle, amt: centsToUsd(s.topCents) })}
                </span>
              ) : (
                <span className="cat-sub cat-sub--empty">{t.catUnclaimed}</span>
              )}
            </a>
          );
        })}
      </section>

      <LangSwitcher locale={l} path="/categories" />

      <Footer locale={l} />
    </main>
  );
}
