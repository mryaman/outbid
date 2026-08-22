import type { Dict } from "../types";

export const pl: Dict = {
  metaTitle: "outbid.love — płatny ranking, w którym każda oferta traci 10% dziennie",
  metaDesc:
    "Zalicytuj dowolną kwotę, by wypchnąć swoją stronę lub konto X w publicznym rankingu. Każda oferta traci 10% wartości dziennie, więc nikt nie ma pierwszego miejsca na zawsze. Od 5 $, bez konta i bez reklam.",
  keywords: [
    "płatny ranking",
    "licytacja pierwszego miejsca",
    "alternatywa dla outbid.lol",
    "promocja strony bez reklam",
    "kup pierwsze miejsce w rankingu",
    "rynek uwagi",
    "leaderboard z licytacją",
    "promocja startupu",
    "płatny katalog produktów",
    "przebij ofertę ranking",
  ],

  nav: {
    board: "Ranking",
    categories: "Kategorie",
    how: "Jak to działa",
    faq: "Pytania",
    about: "O projekcie",
    rules: "Zasady",
  },

  h1: "Szczyt zawsze da się zdobyć.",
  lede:
    "Twoja pozycja to dokładnie tyle, ile zapłaciłeś — ale każda płatność <strong>traci {pct}% dziennie</strong>. Nikt nie siedzi na górze wiecznie, a ranking nigdy nie zamiera.",

  intro: [
    "outbid.love to ranking, w którym miejsce się kupuje: licytujesz pieniędzmi swoją stronę, produkt albo konto X, a pozycję wyznacza wyłącznie zapłacona kwota. Bez algorytmu, bez redakcyjnej selekcji, bez aukcji reklamowej i bez zakładania konta.",
    "Od każdej innej tablicy licytacyjnej odróżnia go utrata wartości. Każda płatność traci {pct}% wartości dziennie od momentu zaksięgowania, więc oferta jest czynszem, a nie własnością. Miejsce kupione dziś po tygodniu warte jest mniej niż połowę — dlatego pierwsza pozycja pozostaje stale do odebrania, a nowy uczestnik z małym budżetem zawsze może wyprzedzić kogoś, kto zapłacił raz i zniknął.",
    "Licytacja zaczyna się od {min}. Każdy wpis prowadzi na twoją stronę, kliknięcia wychodzące są liczone publicznie, a każda kategoria ma własny ranking — pustą niszę można zająć za minimalną stawkę.",
  ],

  bidPill: "Licytacja trwa",
  bidBody:
    "Umieść swój link na tablicy albo przebij tego nad tobą. Płacisz dokładnie tyle, ile licytujesz, jeden raz.",
  bidFine: "Strona twojego produktu albo twoje konto X. Bez konta i bez e-maila — płatność kartą przez Shopier.",

  formLinkPlaceholder: "twojastrona.pl albo @twojekonto",
  formSubmit: "Przebij →",
  formFine:
    "Minimum {min}. Pierwsze miejsce kosztuje teraz {top}. Płatność kartą przez Shopier (obciążenie w lirach tureckich po bieżącym kursie) — oferta trafia do rankingu w chwili zaksięgowania płatności, a potem traci wartość jak wszystkie inne.",

  boardTitle: "Ranking",
  boardEmpty: "Tablica jest pusta. Zajmij pierwsze miejsce.",

  decayH2: "Jak działa utrata wartości",
  decayP:
    "Każda płatność traci {pct}% wartości dziennie, licząc od chwili jej dokonania. {a} po tygodniu jest warte {b}, a po dwóch {c}. Gdy wpis spadnie poniżej {drop}, znika z tablicy.",
  decayFine:
    "To cały produkt. Pozycja jest kosztem bieżącym, a nie zakupem — dlatego pierwsze miejsce nigdy nie jest poza zasięgiem.",

  howH2: "Jak dostać się na pierwsze miejsce",
  howSteps: [
    "Wybierz, co wystawiasz: adres produktu albo konto X. Bez rejestracji i bez e-maila.",
    "Sprawdź obecnie najwyższą ofertę. Przebicie jej o jednego centa wystarczy, żeby prowadzić już teraz.",
    "Zapłać kartą. Oferta pojawia się na tablicy, gdy tylko płatność przejdzie.",
    "Wróć i dołóż. Ponieważ oferta traci {pct}% dziennie, utrzymanie pierwszego miejsca kosztuje po trochu codziennie, zamiast dużo jednorazowo.",
  ],

  faqH2: "Najczęstsze pytania",
  faq: [
    {
      q: "Czym jest outbid.love?",
      a: "outbid.love to publiczny ranking, w którym pozycję się opłaca. Licytujesz, by wystawić stronę lub konto X, a twoja pozycja równa się zapłaconej kwocie. W odróżnieniu od innych tablic licytacyjnych każda oferta traci 10% dziennie, więc ranking stale się przetasowuje, a pierwsze miejsce zawsze można odebrać.",
    },
    {
      q: "Jak dokładnie liczona jest utrata 10% dziennie?",
      a: "Od chwili zaksięgowania płatności efektywna wartość oferty jest mnożona przez 0,9 za każdy miniony dzień. Oferta 100 $ warta jest około 47,83 $ po siedmiu dniach i około 22,88 $ po czternastu. Po spadku poniżej 1 $ wpis znika z tablicy całkowicie.",
    },
    {
      q: "Ile kosztuje pierwsze miejsce?",
      a: "Dokładnie o jednego centa więcej niż zdeprecjonowana wartość obecnego lidera — a ta spada co godzinę. Minimalna oferta to 5 $, więc przy pustej tablicy lub wolnej kategorii pierwsze miejsce kosztuje 5 $.",
    },
    {
      q: "Czy to to samo co outbid.lol?",
      a: "Nie. Pomysł płatnego rankingu jest wspólny, ale na outbid.lol oferta jest trwała: kto raz zapłaci najwięcej, trzyma pozycję bezterminowo. Na outbid.love każda oferta traci 10% dziennie, więc szczyt to powtarzalna rywalizacja, a nie jednorazowy zakup.",
    },
    {
      q: "Czy potrzebuję konta albo adresu e-mail?",
      a: "Nie. Żadnej rejestracji, logowania ani e-maila. Wpisujesz link, wybierasz kwotę, płacisz kartą — i wpis się pojawia.",
    },
    {
      q: "Jak i w jakiej walucie się płaci?",
      a: "Kartą, przez Shopier. Oferty podawane są w dolarach amerykańskich, a obciążenie następuje w lirach tureckich po bieżącym kursie. Oferta aktywuje się automatycznie po potwierdzeniu płatności.",
    },
    {
      q: "Jak długo trwa oferta?",
      a: "Dopóki nie spadnie poniżej 1 $. Oferta 5 $ trwa około dwóch tygodni, 100 $ — około sześciu. Wpis można dowolnie doładować.",
    },
    {
      q: "Czy ktoś może kupić pierwsze miejsce na zawsze?",
      a: "Nie i o to właśnie chodzi w regule utraty wartości. Duża jednorazowa wpłata kupuje mocną pozycję na kilka dni, ale sama się wykrusza — utrzymanie szczytu wymaga powtarzalnych płatności.",
    },
    {
      q: "Co mogę wystawić?",
      a: "Stronę produktu lub firmy albo konto X (Twitter). Skracacze linków, zaproszenia i linki do komunikatorów są zablokowane, a wpisy moderowane zgodnie z opublikowanymi zasadami.",
    },
    {
      q: "Czy dostaję link zwrotny dla SEO?",
      a: "Nie — linki wychodzące mają nofollow i idą przez przekierowanie. Wpis daje realny ruch i widoczność, a liczba kliknięć wychodzących jest publicznie pokazywana w każdym wierszu.",
    },
    {
      q: "Czy mogę podbić cudzy wpis?",
      a: "Tak. Każdy może dołożyć do dowolnego wpisu — możesz wzmocnić swój albo podarować podbicie projektowi, który lubisz.",
    },
    {
      q: "Jakie są kategorie?",
      a: "Dwadzieścia siedem — od agentów AI i narzędzi dla programistów po e-commerce, rekrutację, gry i nieruchomości. Każda kategoria ma własny ranking, a wolną kategorię można zająć za minimalne 5 $.",
    },
  ],

  catsH2: "Kategorie",
  catsLede:
    "Każda kategoria ma własny ranking. Wybierz swoją — w pustej kategorii <strong>pierwsze miejsce kosztuje minimalną stawkę</strong>.",
  catsAll: "Wszystkie kategorie",
  catUnclaimed: "Wolna — bądź pierwszy",
  catListings: "wpisów: {n}",
  catTopIs: "prowadzi {title} z {amt}",
  catTitle: "Ranking: {name}",
  catMetaDesc:
    "Kto prowadzi teraz w kategorii {name}? Zalicytuj dowolną kwotę i zajmij szczyt — każda oferta traci 10% dziennie, więc pierwsze miejsce zawsze da się zdobyć.",
  catHeroWith: "wpisów: {n} — zajęcie pierwszego miejsca kosztuje teraz <strong>{price}</strong> i spada co godzinę.",
  catHeroEmpty: "Tej kategorii nikt jeszcze nie zajął. <strong>Pierwsze miejsce kosztuje {price}.</strong>",
  catEmpty: "Pusto. Pierwsza oferta bierze tę kategorię.",

  vsH2: "Dlaczego utrata wartości bije oferty trwałe",
  vsP:
    "Rankingi z trwałymi ofertami umierają zawsze tak samo: ktoś z głęboką kieszenią parkuje na pierwszym miejscu, a reszta przestaje grać. Utrata wartości usuwa to zakończenie. Każda pozycja jest tymczasowa, powrót jest tani, a tablica rusza się nawet wtedy, gdy nikt nowy nie przychodzi.",

  footer: {
    rules: "Zasady",
    pricing: "Cennik",
    terms: "Regulamin",
    privacy: "Prywatność",
    refunds: "Zwroty",
    traffic: "Ruch na żywo",
    listings: "wpisów: {n}",
    back: "← Wróć do rankingu",
  },

  langLabel: "Język",
  translatedNote:
    "To jest wydanie polskie. Sam ranking jest globalny — oferty z każdego kraju rywalizują na tej samej tablicy.",

  cats: {
    "ai-agents": "Agenci AI i infrastruktura",
    "ai-media": "Generowanie mediów przez AI",
    marketing: "Marketing i reklama",
    "dev-tools": "Narzędzia dla programistów",
    productivity: "Produktywność i narzędzia osobiste",
    people: "Ludzie i profile",
    design: "Design i kreatywność",
    seo: "SEO i widoczność w AI",
    social: "Media społecznościowe i narzędzia twórców",
    writing: "Pisanie i treści",
    sales: "Sprzedaż i pozyskiwanie klientów",
    business: "Biznes, finanse i prawo",
    games: "Gry i rozrywka",
    education: "Edukacja i nauka",
    health: "Zdrowie, fitness i wellness",
    ecommerce: "E-commerce i handel",
    directories: "Katalogi, premiery i odkrywanie",
    hiring: "Rekrutacja, praca i kariera",
    audio: "Audio, głos i podcasty",
    agencies: "Agencje, studia i usługi",
    security: "Bezpieczeństwo, prywatność i zgodność",
    travel: "Podróże, lokalne i lifestyle",
    media: "Media i wiadomości",
    domains: "Domeny i aktywa internetowe",
    leaderboards: "Rankingi i rynki uwagi",
    "real-estate": "Nieruchomości",
    other: "Inne",
  },
};
