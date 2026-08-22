import { LOCALES, ENDONYM, HREFLANG, localePath, dict, type Locale } from "@/lib/i18n";

/**
 * Dil seçici. Sunucu bileşeni — düz <a> listesi, JS yok.
 * Tarama motorları için de gerçek bir iç bağlantı ağı kuruyor:
 * her dil sayfası diğer 11 dile link veriyor.
 */
export default function LangSwitcher({
  locale,
  path = "",
}: {
  locale: Locale;
  /** Dil öneki olmadan geçerli yol: "" (ana sayfa), "/categories", ... */
  path?: string;
}) {
  return (
    <nav className="langs" aria-label={dict(locale).langLabel}>
      <span className="langs-label">{dict(locale).langLabel}:</span>
      {LOCALES.map((l) => (
        <a
          key={l}
          href={localePath(l, path)}
          hrefLang={HREFLANG[l]}
          aria-current={l === locale ? "true" : undefined}
          className={l === locale ? "lang lang--on" : "lang"}
        >
          {ENDONYM[l]}
        </a>
      ))}
    </nav>
  );
}
