import type { QA } from "@/lib/i18n/types";

/**
 * SSS listesi. <details> yerine düz başlık+paragraf kullanılıyor:
 * cevaplar kaynak HTML'de açık duruyor, üretken arama motorları
 * (ChatGPT, Perplexity, AI Overviews) gizli metni güvenilmez sayıyor.
 */
export default function Faq({ items, title, id = "faq" }: { items: QA[]; title: string; id?: string }) {
  return (
    <section className="faq" id={id} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>{title}</h2>
      <dl>
        {items.map((f, i) => (
          <div className="qa" key={i}>
            <dt>{f.q}</dt>
            <dd>{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
