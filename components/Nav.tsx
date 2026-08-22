import { dict, localePath, type Locale } from "@/lib/i18n";
import { CITY } from "@/lib/i18n/city";

/**
 * Ana gezinme.
 *
 * İngilizce'de "nasıl çalışır" ve "SSS" kendi sayfalarında; çevrilmiş
 * dillerde aynı içerik dil ana sayfasının içinde bölüm olarak duruyor,
 * bu yüzden oralarda bağlantı çapa (#) olur — kırık link olmaz.
 */
export default function Nav({
  current = "/",
  locale = "en",
}: {
  /** Dil öneki OLMADAN geçerli yol: "/", "/board", "/categories", "/faq" ... */
  current?: string;
  locale?: Locale;
}) {
  const t = dict(locale);
  const c = CITY[locale];
  const home = localePath(locale, "/");

  const links =
    locale === "en"
      ? [
          { href: "/", key: "/", label: c.navGlobe },
          { href: "/board", key: "/board", label: c.navBoard },
          { href: "/categories", key: "/categories", label: t.nav.categories },
          { href: "/how-it-works", key: "/how-it-works", label: t.nav.how },
          { href: "/faq", key: "/faq", label: t.nav.faq },
          { href: "/rules", key: "/rules", label: t.nav.rules },
        ]
      : [
          { href: home, key: "/", label: c.navGlobe },
          { href: localePath(locale, "/board"), key: "/board", label: c.navBoard },
          { href: localePath(locale, "/categories"), key: "/categories", label: t.nav.categories },
          { href: `${home}#how-it-works`, key: "#how", label: t.nav.how },
          { href: `${home}#faq`, key: "#faq", label: t.nav.faq },
        ];

  return (
    <nav className="nav" aria-label="Main">
      {links.map((l) => (
        <a key={l.key} href={l.href} aria-current={current === l.key ? "page" : undefined}>
          {l.label}
        </a>
      ))}
    </nav>
  );
}
