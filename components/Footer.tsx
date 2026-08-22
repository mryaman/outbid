import { CONFIG } from "@/lib/config";
import { dict, fill, type Locale } from "@/lib/i18n";

export default function Footer({
  listings,
  locale = "en",
}: {
  listings?: number;
  locale?: Locale;
}) {
  const t = dict(locale).footer;

  return (
    <footer className="foot">
      <a href="/rules">{t.rules}</a>
      <span aria-hidden>·</span>
      <a href="/price">{t.pricing}</a>
      <span aria-hidden>·</span>
      <a href="/terms">{t.terms}</a>
      <span aria-hidden>·</span>
      <a href="/privacy">{t.privacy}</a>
      <span aria-hidden>·</span>
      <a href="/policy">{t.refunds}</a>
      {typeof listings === "number" && (
        <>
          <span aria-hidden>·</span>
          <span>{fill(t.listings, { n: listings })}</span>
        </>
      )}
      <span aria-hidden>·</span>
      <a
        href={
          process.env.NEXT_PUBLIC_STATS_URL ||
          `https://plausible.io/${new URL(CONFIG.url).hostname}`
        }
        target="_blank"
        rel="noopener"
      >
        {t.traffic}
      </a>
    </footer>
  );
}
