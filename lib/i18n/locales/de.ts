import type { Dict } from "../types";

export const de: Dict = {
  metaTitle: "outbid.love — das Bezahl-Ranking, in dem jedes Gebot täglich 10% verliert",
  metaDesc:
    "Biete einen beliebigen Betrag und bring deine Website oder deinen X-Account in ein öffentliches Ranking. Jedes Gebot verliert täglich 10% an Wert – Platz 1 lässt sich also nicht dauerhaft kaufen. Ab 5 $, ohne Konto, ohne Werbung.",
  keywords: [
    "Bezahl-Ranking",
    "Ranking ersteigern",
    "outbid.lol Alternative",
    "Website bewerben ohne Werbung",
    "Platz 1 kaufen Ranking",
    "Aufmerksamkeitsmarkt",
    "Startup bewerben Leaderboard",
    "Gebot Rangliste",
    "Produkt Launch Verzeichnis",
    "bezahlte Platzierung Website",
  ],

  nav: {
    board: "Rangliste",
    categories: "Kategorien",
    how: "So funktioniert es",
    faq: "FAQ",
    about: "Über",
    rules: "Regeln",
  },

  h1: "Platz 1 ist immer zu holen.",
  lede:
    "Dein Rang ist genau das, was du bezahlt hast – aber jede Zahlung <strong>verliert {pct}% pro Tag</strong>. Niemand sitzt dauerhaft oben, und die Rangliste steht nie still.",

  intro: [
    "outbid.love ist eine Rangliste, auf der man sich einkauft: Du bietest Geld für deine Website, dein Produkt oder deinen X-Account, und deine Position ergibt sich ausschließlich aus dem gezahlten Betrag. Kein Algorithmus, keine redaktionelle Auswahl, keine Werbeauktion, kein Konto.",
    "Der Unterschied zu jedem anderen Bietboard ist der Wertverfall. Jede Zahlung verliert ab dem Moment der Bestätigung {pct}% ihres Werts pro Tag – ein Gebot ist damit Miete, nicht Eigentum. Ein heute gekaufter Platz ist in einer Woche weniger als die Hälfte wert. Genau deshalb bleibt Platz 1 dauerhaft angreifbar, und wer mit kleinem Budget neu dazukommt, überholt jederzeit jemanden, der einmal gezahlt hat und dann verschwunden ist.",
    "Gebote starten bei {min}. Jeder Eintrag verlinkt auf deine Seite, ausgehende Klicks werden öffentlich gezählt, und jede Kategorie hat ihre eigene Rangliste – eine leere Nische holst du dir für das Mindestgebot.",
  ],

  bidPill: "Gebote laufen",
  bidBody:
    "Setz deinen Link auf die Rangliste – oder überbiete den Eintrag über dir. Du zahlst genau das, was du bietest, einmal.",
  bidFine: "Deine Produktseite oder dein X-Account. Kein Konto, keine E-Mail – Kartenzahlung über Shopier.",

  formLinkPlaceholder: "deineseite.de oder @deinaccount",
  formSubmit: "Überbieten →",
  formFine:
    "Mindestens {min}. Platz 1 kostet gerade {top}. Kartenzahlung über Shopier (Abrechnung in türkischer Lira zum Tageskurs) – dein Gebot geht live, sobald die Zahlung bestätigt ist, und verfällt danach wie alle anderen.",

  boardTitle: "Rangliste",
  boardEmpty: "Die Rangliste ist leer. Hol dir den ersten Platz.",

  decayH2: "So funktioniert der Wertverfall",
  decayP:
    "Jede Zahlung verliert {pct}% ihres Werts pro Tag, gerechnet ab dem Zeitpunkt der Zahlung. Aus {a} werden nach einer Woche {b} und nach zwei Wochen {c}. Fällt ein Eintrag unter {drop}, verschwindet er von der Rangliste.",
  decayFine:
    "Das ist das ganze Produkt. Ein Rang ist laufende Ausgabe, kein Kauf – und deshalb ist Platz 1 nie außer Reichweite.",

  howH2: "So kommst du auf Platz 1",
  howSteps: [
    "Entscheide, was du platzierst: eine Produkt-URL oder einen X-Account. Keine Anmeldung, keine E-Mail.",
    "Schau dir das aktuelle Höchstgebot an. Ein Cent mehr reicht, um sofort vorne zu stehen.",
    "Zahle per Karte. Dein Gebot erscheint, sobald die Zahlung durch ist.",
    "Komm wieder und leg nach. Weil dein Gebot täglich {pct}% verliert, kostet Platz 1 jeden Tag ein bisschen statt einmal sehr viel.",
  ],

  faqH2: "Häufige Fragen",
  faq: [
    {
      q: "Was ist outbid.love?",
      a: "outbid.love ist eine öffentliche Rangliste, in die man sich einkauft. Du bietest Geld, um eine Website oder einen X-Account zu listen, und dein Rang entspricht dem gezahlten Betrag. Anders als bei anderen Bietboards verliert jedes Gebot täglich 10% an Wert – die Rangliste bewegt sich also ständig und Platz 1 ist immer angreifbar.",
    },
    {
      q: "Wie genau funktionieren die 10% Wertverfall pro Tag?",
      a: "Ab dem Moment der Zahlungsbestätigung wird der wirksame Betrag deines Gebots für jeden vergangenen Tag mit 0,9 multipliziert. Ein Gebot von 100 $ ist nach sieben Tagen rund 47,83 $ wert und nach vierzehn Tagen rund 22,88 $. Unter 1 $ fällt der Eintrag ganz aus der Rangliste.",
    },
    {
      q: "Was kostet Platz 1?",
      a: "Genau einen Cent mehr als der verfallene Wert des aktuellen Spitzenreiters – und dieser Wert sinkt stündlich. Das Mindestgebot beträgt 5 $, bei leerer Rangliste oder freier Kategorie kostet Platz 1 also 5 $.",
    },
    {
      q: "Ist das dasselbe wie outbid.lol?",
      a: "Nein. Die Idee des Bezahl-Rankings teilen sich beide, aber bei outbid.lol ist ein Gebot dauerhaft: Wer einmal am meisten zahlt, hält die Position unbegrenzt. Bei outbid.love verliert jedes Gebot täglich 10%, wodurch die Spitze ein wiederkehrender Wettbewerb statt eines einmaligen Kaufs ist.",
    },
    {
      q: "Brauche ich ein Konto oder eine E-Mail-Adresse?",
      a: "Nein. Keine Registrierung, kein Login, keine E-Mail. Du gibst einen Link ein, wählst einen Betrag, zahlst per Karte – und der Eintrag erscheint.",
    },
    {
      q: "Wie und in welcher Währung wird gezahlt?",
      a: "Per Karte über Shopier. Gebote werden in US-Dollar angezeigt und in türkischer Lira zum aktuellen Kurs abgerechnet. Nach bestätigter Zahlung geht das Gebot automatisch live.",
    },
    {
      q: "Wie lange hält ein Gebot?",
      a: "Bis es unter 1 $ gefallen ist. Ein Gebot von 5 $ hält etwa zwei Wochen, eines von 100 $ etwa sechs Wochen. Du kannst jederzeit nachlegen.",
    },
    {
      q: "Kann jemand Platz 1 dauerhaft kaufen?",
      a: "Nein, genau dafür gibt es den Wertverfall. Eine große Einmalzahlung kauft ein paar Tage starke Position, erodiert aber automatisch – die Spitze zu halten heißt, wiederholt zu zahlen.",
    },
    {
      q: "Was darf ich eintragen?",
      a: "Eine Produkt- oder Firmenwebsite oder einen X-Account (Twitter). Linkkürzer, Einladungslinks und Messenger-Links sind gesperrt, Einträge werden nach den veröffentlichten Regeln moderiert.",
    },
    {
      q: "Bekomme ich einen SEO-Backlink?",
      a: "Nein – ausgehende Links sind nofollow und laufen über eine Weiterleitung. Ein Eintrag bringt echten Traffic und Sichtbarkeit; die Zahl der ausgehenden Klicks steht öffentlich in jeder Zeile.",
    },
    {
      q: "Kann ich den Eintrag von jemand anderem pushen?",
      a: "Ja. Jeder Eintrag kann von jedem aufgestockt werden – du kannst deinen eigenen stärken oder einem Projekt, das du magst, einen Boost schenken.",
    },
    {
      q: "Welche Kategorien gibt es?",
      a: "Siebenundzwanzig, von KI-Agenten und Entwicklerwerkzeugen bis zu E-Commerce, Jobs, Games und Immobilien. Jede Kategorie hat ihre eigene Rangliste, eine freie Kategorie holst du dir für die 5 $ Mindestgebot.",
    },
  ],

  catsH2: "Kategorien",
  catsLede:
    "Jede Kategorie hat ihre eigene Rangliste. Such dir deine aus – in einer leeren Kategorie kostet <strong>Platz 1 das Mindestgebot</strong>.",
  catsAll: "Alle Kategorien",
  catUnclaimed: "Frei – sei der Erste",
  catListings: "{n} Einträge",
  catTopIs: "Platz 1 ist {title} mit {amt}",
  catTitle: "{name} – Rangliste",
  catMetaDesc:
    "Wer führt {name} gerade an? Biete einen beliebigen Betrag und hol dir Platz 1 – jedes Gebot verliert täglich 10%, die Spitze ist also immer zu holen.",
  catHeroWith: "{n} Einträge – Platz 1 kostet gerade <strong>{price}</strong>, und der Preis sinkt stündlich.",
  catHeroEmpty: "Diese Kategorie ist noch frei. <strong>Platz 1 kostet {price}.</strong>",
  catEmpty: "Leer. Das erste Gebot bekommt diese Kategorie.",

  vsH2: "Warum Wertverfall besser ist als dauerhafte Gebote",
  vsP:
    "Ranglisten mit dauerhaften Geboten enden immer gleich: Jemand mit tiefen Taschen parkt auf Platz 1, alle anderen hören auf mitzuspielen. Der Wertverfall nimmt dieses Ende weg. Jede Position ist vorübergehend, ein Comeback ist billig, und die Rangliste bewegt sich auch dann, wenn niemand Neues dazukommt.",

  footer: {
    rules: "Regeln",
    pricing: "Preise",
    terms: "AGB",
    privacy: "Datenschutz",
    refunds: "Erstattungen",
    traffic: "Live-Traffic",
    listings: "{n} Einträge",
    back: "← Zurück zur Rangliste",
  },

  langLabel: "Sprache",
  translatedNote:
    "Dies ist die deutsche Ausgabe. Die Rangliste selbst ist global – Gebote aus jedem Land landen auf demselben Board.",

  cats: {
    "ai-agents": "KI-Agenten & Infrastruktur",
    "ai-media": "KI-Medienerzeugung",
    marketing: "Marketing & Werbung",
    "dev-tools": "Entwicklerwerkzeuge",
    productivity: "Produktivität & persönliche Tools",
    people: "Personen & Profile",
    design: "Design & Kreatives",
    seo: "SEO & KI-Sichtbarkeit",
    social: "Social Media & Creator-Tools",
    writing: "Schreiben & Content",
    sales: "Vertrieb & Leadgenerierung",
    business: "Business, Finanzen & Recht",
    games: "Games & Unterhaltung",
    education: "Bildung & Lernen",
    health: "Gesundheit, Fitness & Wohlbefinden",
    ecommerce: "E-Commerce & Handel",
    directories: "Verzeichnisse, Launches & Entdeckung",
    hiring: "Jobs, Recruiting & Karriere",
    audio: "Audio, Voice & Podcasting",
    agencies: "Agenturen, Studios & Dienstleistungen",
    security: "Sicherheit, Datenschutz & Compliance",
    travel: "Reisen, Lokales & Lifestyle",
    media: "Medien & News",
    domains: "Domains & Web-Assets",
    leaderboards: "Ranglisten & Aufmerksamkeitsmärkte",
    "real-estate": "Immobilien",
    other: "Sonstiges",
  },
};
