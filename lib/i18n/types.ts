/** Bir dilin tüm metinleri. Yer tutucular: {pct} {min} {a} {b} {c} {drop} {n} {price} {title} {amt} {name} */

export type QA = { q: string; a: string };

export type Dict = {
  /** <title> — marka adı dahil, tam başlık. */
  metaTitle: string;
  metaDesc: string;
  keywords: string[];

  nav: {
    board: string;
    categories: string;
    how: string;
    faq: string;
    about: string;
    rules: string;
  };

  h1: string;
  /** {pct} */
  lede: string;
  /** Arama motorları ve LLM'ler için 2–3 paragraf bağlam. {pct} {min} */
  intro: string[];

  bidPill: string;
  /** {min} */
  bidBody: string;
  bidFine: string;

  formLinkPlaceholder: string;
  formSubmit: string;
  /** {min} {top} */
  formFine: string;

  boardTitle: string;
  boardEmpty: string;

  decayH2: string;
  /** {pct} {a} {b} {c} {drop} */
  decayP: string;
  decayFine: string;

  howH2: string;
  /** 4 adım */
  howSteps: string[];

  faqH2: string;
  faq: QA[];

  catsH2: string;
  catsLede: string;
  catsAll: string;
  catUnclaimed: string;
  /** {n} */
  catListings: string;
  /** {title} {amt} */
  catTopIs: string;
  /** {name} */
  catTitle: string;
  /** {name} */
  catMetaDesc: string;
  /** {n} {price} */
  catHeroWith: string;
  /** {price} */
  catHeroEmpty: string;
  catEmpty: string;

  vsH2: string;
  vsP: string;

  footer: {
    rules: string;
    pricing: string;
    terms: string;
    privacy: string;
    refunds: string;
    traffic: string;
    /** {n} */
    listings: string;
    back: string;
  };

  langLabel: string;
  /** Çeviri notu — asıl pano İngilizce ve global. */
  translatedNote: string;

  /** slug -> o dildeki kategori adı */
  cats: Record<string, string>;
};
