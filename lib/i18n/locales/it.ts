import type { Dict } from "../types";

export const it: Dict = {
  metaTitle: "outbid.love — la classifica a pagamento dove ogni offerta perde il 10% al giorno",
  metaDesc:
    "Offri quanto vuoi per portare il tuo sito o il tuo profilo X in una classifica pubblica. Ogni offerta perde il 10% del suo valore ogni giorno, quindi nessuno tiene il primo posto per sempre. Da 5 $, senza account e senza pubblicità.",
  keywords: [
    "classifica a pagamento",
    "asta per il primo posto",
    "alternativa a outbid.lol",
    "promuovere il sito senza pubblicità",
    "comprare il primo posto in classifica",
    "mercato dell'attenzione",
    "leaderboard con offerte",
    "promuovere una startup",
    "directory di prodotti a pagamento",
    "rilanciare offerta classifica",
  ],

  nav: {
    board: "Classifica",
    categories: "Categorie",
    how: "Come funziona",
    faq: "Domande",
    about: "Info",
    rules: "Regole",
  },

  h1: "Il primo posto si può sempre conquistare.",
  lede:
    "La tua posizione è esattamente quello che hai pagato — ma ogni pagamento <strong>perde il {pct}% al giorno</strong>. Nessuno resta in cima per sempre e la classifica non si blocca mai.",

  intro: [
    "outbid.love è una classifica in cui la posizione si compra: fai un'offerta in denaro per il tuo sito, il tuo prodotto o il tuo profilo X, e il posto lo decide soltanto la cifra pagata. Nessun algoritmo, nessuna selezione editoriale, nessuna asta pubblicitaria, nessun account da creare.",
    "La differenza rispetto a ogni altra bacheca di offerte è il deprezzamento. Ogni pagamento perde il {pct}% del suo valore al giorno dal momento in cui viene confermato, quindi un'offerta è un affitto e non una proprietà. Una posizione comprata oggi vale meno della metà dopo una settimana: per questo il primo posto resta sempre contendibile e chi arriva con poco budget può superare chi ha pagato una volta ed è sparito.",
    "Le offerte partono da {min}. Ogni voce rimanda al tuo sito, i clic in uscita sono contati pubblicamente e ogni categoria ha la sua classifica — una nicchia vuota si prende con l'offerta minima.",
  ],

  bidPill: "Offerte aperte",
  bidBody:
    "Metti il tuo link in classifica — o supera l'offerta di chi ti sta sopra. Paghi esattamente quello che offri, una volta sola.",
  bidFine: "Il sito del tuo prodotto o il tuo profilo X. Senza account né email — pagamento con carta via Shopier.",

  formLinkPlaceholder: "iltuosito.com o @iltuoprofilo",
  formSubmit: "Rilancia →",
  formFine:
    "Minimo {min}. In questo momento il primo posto costa {top}. Pagamento con carta via Shopier (addebitato in lire turche al cambio del momento) — la tua offerta entra in classifica appena il pagamento va a buon fine, poi inizia a deprezzarsi come tutte le altre.",

  boardTitle: "Classifica",
  boardEmpty: "La classifica è vuota. Prendi il primo posto.",

  decayH2: "Come funziona il deprezzamento",
  decayP:
    "Ogni pagamento perde il {pct}% del suo valore al giorno, a partire dal momento in cui è stato fatto. {a} valgono {b} dopo una settimana e {c} dopo due. Quando una voce scende sotto {drop} esce dalla classifica.",
  decayFine:
    "È tutto qui il prodotto. La posizione è una spesa corrente, non un acquisto — ed è per questo che il primo posto non è mai fuori portata.",

  howH2: "Come arrivare al primo posto",
  howSteps: [
    "Scegli cosa mettere in classifica: l'URL di un prodotto o un profilo X. Senza registrazione né email.",
    "Guarda l'offerta più alta del momento. Superarla di un centesimo basta per andare in testa subito.",
    "Paga con carta. La tua offerta compare appena il pagamento è confermato.",
    "Torna e ricarica. Poiché la tua offerta perde il {pct}% al giorno, tenere il primo posto costa poco ogni giorno invece di molto una volta sola.",
  ],

  faqH2: "Domande frequenti",
  faq: [
    {
      q: "Che cos'è outbid.love?",
      a: "outbid.love è una classifica pubblica in cui la posizione si paga. Fai un'offerta per inserire un sito o un profilo X e la tua posizione corrisponde al denaro versato. A differenza di altre bacheche di offerte, ogni offerta si deprezza del 10% al giorno, quindi la classifica cambia di continuo e il primo posto può sempre essere strappato.",
    },
    {
      q: "Come funziona esattamente il deprezzamento del 10% al giorno?",
      a: "Dal momento in cui il pagamento è confermato, il valore effettivo dell'offerta viene moltiplicato per 0,9 per ogni giorno trascorso. Un'offerta da 100 $ vale circa 47,83 $ dopo sette giorni e circa 22,88 $ dopo quattordici. Sotto 1 $ la voce esce del tutto dalla classifica.",
    },
    {
      q: "Quanto costa arrivare primo?",
      a: "Esattamente un centesimo in più del valore deprezzato di chi guida — e quel valore scende ogni ora. L'offerta minima è 5 $, quindi con la classifica vuota o una categoria libera il primo posto costa 5 $.",
    },
    {
      q: "È la stessa cosa di outbid.lol?",
      a: "No. L'idea della classifica a pagamento è comune, ma su outbid.lol l'offerta è permanente: chi paga di più una volta tiene la posizione a tempo indeterminato. Su outbid.love ogni offerta si deprezza del 10% al giorno, il che rende la vetta una gara ricorrente e non un acquisto una tantum.",
    },
    {
      q: "Serve un account o un'email?",
      a: "No. Niente registrazione, niente login, niente email. Inserisci un link, scegli un importo, paghi con carta e la voce compare.",
    },
    {
      q: "Come si paga e in che valuta?",
      a: "Con carta, tramite Shopier. Le offerte sono in dollari statunitensi e l'addebito avviene in lire turche al cambio del momento. L'offerta si attiva automaticamente a pagamento confermato.",
    },
    {
      q: "Quanto dura un'offerta?",
      a: "Finché non si deprezza sotto 1 $. Un'offerta da 5 $ dura circa due settimane, una da 100 $ circa sei. Puoi ricaricare una voce in qualsiasi momento.",
    },
    {
      q: "Qualcuno può comprare il primo posto per sempre?",
      a: "No, ed è proprio il senso della regola del deprezzamento. Un pagamento grosso compra una posizione forte per qualche giorno, ma si erode da solo: tenere la vetta significa pagare ripetutamente.",
    },
    {
      q: "Cosa posso inserire?",
      a: "Il sito di un prodotto o di un'azienda, oppure un profilo X (Twitter). Accorciatori di link, inviti e link di messaggistica sono bloccati, e le voci sono moderate secondo le regole pubblicate.",
    },
    {
      q: "Ottengo un backlink SEO?",
      a: "No: i link in uscita sono nofollow e passano da un redirect. Quello che ottieni è traffico reale e visibilità, con il numero di clic in uscita mostrato pubblicamente su ogni riga.",
    },
    {
      q: "Posso spingere la voce di qualcun altro?",
      a: "Sì. Chiunque può ricaricare qualsiasi voce: puoi rafforzare la tua o regalare una spinta a un progetto che ti piace.",
    },
    {
      q: "Quali categorie ci sono?",
      a: "Ventisette, dagli agenti AI e gli strumenti per sviluppatori fino a e-commerce, lavoro, videogiochi e immobiliare. Ogni categoria ha la sua classifica e una categoria libera si prende con il minimo di 5 $.",
    },
  ],

  catsH2: "Categorie",
  catsLede:
    "Ogni categoria ha la sua classifica. Scegli la tua — in una categoria vuota <strong>il primo posto costa l'offerta minima</strong>.",
  catsAll: "Tutte le categorie",
  catUnclaimed: "Libera — sii il primo",
  catListings: "{n} voci",
  catTopIs: "in testa {title} con {amt}",
  catTitle: "Classifica {name}",
  catMetaDesc:
    "Chi guida {name} in questo momento? Offri quanto vuoi per prenderti la vetta — ogni offerta si deprezza del 10% al giorno, quindi il primo posto è sempre conquistabile.",
  catHeroWith: "{n} voci — prendersi il primo posto costa ora <strong>{price}</strong>, e cala di ora in ora.",
  catHeroEmpty: "Questa categoria non l'ha ancora presa nessuno. <strong>Il primo posto costa {price}.</strong>",
  catEmpty: "Vuota. La prima offerta si prende la categoria.",

  vsH2: "Perché il deprezzamento batte le offerte permanenti",
  vsP:
    "Le classifiche a offerta permanente muoiono sempre allo stesso modo: qualcuno con tasche profonde parcheggia al primo posto e tutti gli altri smettono di giocare. Il deprezzamento cancella quel finale. Ogni posizione è temporanea, la rimonta costa poco e la classifica si muove anche se non arriva nessuno di nuovo.",

  footer: {
    rules: "Regole",
    pricing: "Prezzi",
    terms: "Termini",
    privacy: "Privacy",
    refunds: "Rimborsi",
    traffic: "Traffico live",
    listings: "{n} voci",
    back: "← Torna alla classifica",
  },

  langLabel: "Lingua",
  translatedNote:
    "Questa è l'edizione italiana. La classifica in sé è globale: le offerte da qualsiasi paese finiscono sulla stessa bacheca.",

  cats: {
    "ai-agents": "Agenti AI e infrastruttura",
    "ai-media": "Generazione di media con AI",
    marketing: "Marketing e pubblicità",
    "dev-tools": "Strumenti per sviluppatori",
    productivity: "Produttività e strumenti personali",
    people: "Persone e profili",
    design: "Design e creatività",
    seo: "SEO e visibilità nelle AI",
    social: "Social media e strumenti per creator",
    writing: "Scrittura e contenuti",
    sales: "Vendite e generazione di lead",
    business: "Business, finanza e legale",
    games: "Videogiochi e intrattenimento",
    education: "Istruzione e apprendimento",
    health: "Salute, fitness e benessere",
    ecommerce: "E-commerce e retail",
    directories: "Directory, lanci e scoperta",
    hiring: "Lavoro, offerte e carriera",
    audio: "Audio, voce e podcast",
    agencies: "Agenzie, studi e servizi",
    security: "Sicurezza, privacy e compliance",
    travel: "Viaggi, locale e lifestyle",
    media: "Media e notizie",
    domains: "Domini e asset web",
    leaderboards: "Classifiche e mercati dell'attenzione",
    "real-estate": "Immobiliare",
    other: "Altro",
  },
};
