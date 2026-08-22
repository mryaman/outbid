import type { Locale } from "./index";
import type { QA } from "./types";

/**
 * Şehir / küre yüzeyinin metinleri.
 *
 * Ana sözlük (locales/*.ts) ürünün genel anlatımını taşıyor; burası
 * "her şehrin bir 1 numarası var" katmanı. Ayrı dosyada çünkü asıl SEO
 * hacmi burada: "kim 1 numara <şehir>" araması her dilde ayrı bir talep.
 *
 * Yer tutucular: {pct} {city} {country} {price} {min} {rank} {n} {a} {b}
 */
export type CityDict = {
  navGlobe: string;
  navBoard: string;

  metaTitle: string;
  metaDesc: string;

  h1: string;
  lede: string;

  statCities: string;
  statProfiles: string;
  statLive: string;

  leagueH2: string;
  leagueSub: string;

  stepsH2: string;
  steps: string[];

  /** Şehir sayfası */
  cityMetaTitle: string;
  cityMetaDesc: string;
  cityLede: string;
  cityLedeEmpty: string;
  cityBoardEmpty: string;
  cityLeagueRank: string;
  cityUnranked: string;
  cityIntro: string;
  cityTakeBtn: string;
  cityAll: string;

  /** Dünya panosu */
  boardTitle: string;
  boardDesc: string;

  /** Şehir sayfasına özel 4 soru — GEO için */
  cityFaq: QA[];
};

export const CITY: Record<Locale, CityDict> = {
  en: {
    navGlobe: "Globe",
    navBoard: "World board",
    metaTitle: "outbid.love — the city leaderboard of the world",
    metaDesc:
      "Every city on Earth has a #1. Put your X, TikTok, Instagram, LinkedIn or your own link on a city and pay to sit at the top of it. Every payment decays 10% a day, so the top is always winnable.",
    h1: "Every city has a #1. Take yours.",
    lede:
      "Put your X, TikTok, Instagram, LinkedIn — or any link you own — on a city. The biggest payment in that city sits at the top of it. Every payment <strong>decays {pct}% a day</strong>, so no one holds a city forever.",
    statCities: "cities in play",
    statProfiles: "profiles listed",
    statLive: "live on the map",
    leagueH2: "The city league",
    leagueSub:
      "Ranked by everything still burning in each city — busiest at the top, quietest at the bottom.",
    stepsH2: "How it works",
    steps: [
      "Find your city. Search it or click it on the globe. All {n} cities are open — most of them have no #1 yet.",
      "Put your profile on it. An @handle, a social link, or your own site. No account, no email.",
      "Pay what the spot is worth to you. The largest live amount in that city is #1 — and the city itself climbs the world league as its people spend.",
      "Watch it burn. Every payment loses {pct}% of its value per day. {a} is worth {b} after a week. Rank is a running cost, not a purchase.",
    ],
    cityMetaTitle: "Who is #1 in {city}?",
    cityMetaDesc:
      "The live people leaderboard of {city}, {country}. Put your X, TikTok, Instagram, LinkedIn or your own link on {city} and take the top — every payment decays 10% a day, so #1 is always winnable.",
    cityLede:
      "Taking the top of {city} costs <strong>{price}</strong> right now, and it drops by the hour.",
    cityLedeEmpty: "Nobody holds {city} yet. <strong>#1 costs {price}.</strong>",
    cityBoardEmpty: "{city} is empty. The first payment owns the city.",
    cityLeagueRank: "#{rank} in the world league",
    cityUnranked: "not in the world league yet",
    cityIntro:
      "{city} is one of {n} cities on outbid.love, a leaderboard where position is bought rather than voted for. Whoever has the largest live payment on {city} sits at the top of it, and every payment loses {pct}% of its value per day — so the price of #1 in {city} falls continuously until somebody tops up. The minimum is {min}, there is no account to create, and the city climbs the world league as the people on it spend.",
    cityTakeBtn: "Take {city} →",
    cityAll: "← All cities",
    boardTitle: "World board — every listing, every city",
    boardDesc:
      "The global ranking across all cities. Every payment decays 10% a day, so the order changes even when nobody bids.",
    cityFaq: [
      {
        q: "How do I become #1 in {city}?",
        a: "Put your link or @handle on {city} and pay one cent more than the current top listing's decayed value. That value falls every hour, so the price of the top is lower the longer the leader waits.",
      },
      {
        q: "What does the top spot in {city} cost?",
        a: "Whatever the current leader is worth after decay, plus a cent. If nobody holds {city} yet, it costs the $5 minimum.",
      },
      {
        q: "How long do I stay #1 in {city}?",
        a: "Until somebody pays more, or until your own payment decays below theirs. Every payment loses 10% of its value per day, so holding {city} means topping up rather than paying once.",
      },
      {
        q: "What can I put on {city}?",
        a: "An X, TikTok, Instagram or LinkedIn profile, or any website you own. No account and no email are required.",
      },
    ],
  },

  ru: {
    navGlobe: "Глобус",
    navBoard: "Мировой рейтинг",
    metaTitle: "outbid.love — городской рейтинг всего мира",
    metaDesc:
      "У каждого города есть своё первое место. Разместите свой X, TikTok, Instagram, LinkedIn или собственную ссылку на городе и заплатите, чтобы оказаться наверху. Каждый платёж сгорает на 10% в день, поэтому вершину всегда можно отобрать.",
    h1: "У каждого города есть №1. Займите свой.",
    lede:
      "Разместите свой X, TikTok, Instagram, LinkedIn — или любую свою ссылку — на городе. Наверху города стоит самый крупный платёж. Каждый платёж <strong>сгорает на {pct}% в день</strong>, поэтому город никому не принадлежит навсегда.",
    statCities: "городов в игре",
    statProfiles: "размещённых профилей",
    statLive: "горит на карте",
    leagueH2: "Лига городов",
    leagueSub:
      "Рейтинг по всему, что ещё горит в каждом городе, — самые активные сверху, самые тихие снизу.",
    stepsH2: "Как это работает",
    steps: [
      "Найдите свой город. Через поиск или кликом по глобусу. Открыты все {n} городов — у большинства ещё нет своего №1.",
      "Разместите профиль. @аккаунт, ссылка на соцсеть или ваш собственный сайт. Без регистрации и почты.",
      "Заплатите столько, сколько место для вас стоит. Наибольшая живая сумма в городе — это №1, а сам город поднимается в мировой лиге по мере трат его жителей.",
      "Смотрите, как оно сгорает. Каждый платёж теряет {pct}% стоимости в сутки. {a} через неделю стоит {b}. Место — это текущий расход, а не покупка.",
    ],
    cityMetaTitle: "Кто №1 в городе {city}?",
    cityMetaDesc:
      "Живой рейтинг людей города {city} ({country}). Разместите свой X, TikTok, Instagram, LinkedIn или собственную ссылку на {city} и займите вершину — каждый платёж сгорает на 10% в день, поэтому первое место всегда достижимо.",
    cityLede:
      "Занять вершину города {city} сейчас стоит <strong>{price}</strong>, и цена падает с каждым часом.",
    cityLedeEmpty: "Город {city} ещё никто не занял. <strong>Первое место стоит {price}.</strong>",
    cityBoardEmpty: "В городе {city} пусто. Первый платёж забирает город.",
    cityLeagueRank: "№{rank} в мировой лиге",
    cityUnranked: "ещё не в мировой лиге",
    cityIntro:
      "{city} — один из {n} городов на outbid.love, рейтинге, где место покупается, а не выбирается голосованием. Наверху города стоит тот, чей живой платёж больше всех, и каждый платёж теряет {pct}% стоимости в сутки — поэтому цена первого места в городе {city} падает непрерывно, пока кто-нибудь не пополнит ставку. Минимум — {min}, регистрация не нужна, а город поднимается в мировой лиге по мере трат разместившихся в нём людей.",
    cityTakeBtn: "Занять {city} →",
    cityAll: "← Все города",
    boardTitle: "Мировой рейтинг — все размещения, все города",
    boardDesc:
      "Общий рейтинг по всем городам. Каждый платёж сгорает на 10% в день, поэтому порядок меняется даже без новых ставок.",
    cityFaq: [
      {
        q: "Как стать №1 в городе {city}?",
        a: "Разместите свою ссылку или @аккаунт на городе {city} и заплатите на один цент больше сгоревшей стоимости текущего лидера. Эта величина падает каждый час, поэтому чем дольше лидер ждёт, тем дешевле вершина.",
      },
      {
        q: "Сколько стоит первое место в городе {city}?",
        a: "Столько, сколько сейчас стоит лидер после сгорания, плюс цент. Если город ещё никто не занял, первое место стоит минимальные $5.",
      },
      {
        q: "Как долго я продержусь №1 в городе {city}?",
        a: "Пока кто-то не заплатит больше или пока ваш платёж не сгорит ниже чужого. Каждый платёж теряет 10% в сутки, поэтому удержание города — это пополнения, а не разовая оплата.",
      },
      {
        q: "Что можно разместить на городе {city}?",
        a: "Профиль X, TikTok, Instagram или LinkedIn либо любой сайт, которым вы владеете. Регистрация и почта не нужны.",
      },
    ],
  },

  zh: {
    navGlobe: "地球",
    navBoard: "全球榜",
    metaTitle: "outbid.love — 全世界的城市排行榜",
    metaDesc:
      "地球上每座城市都有一个第一名。把你的 X、TikTok、Instagram、LinkedIn 或自己的链接放到某座城市上，付费坐上榜首。每笔付款每天衰减 10%，所以第一名永远抢得到。",
    h1: "每座城市都有第一名。把你的拿下。",
    lede:
      "把你的 X、TikTok、Instagram、LinkedIn——或任何属于你的链接——放到一座城市上。该城市里金额最大的付款坐在最上面。每笔付款<strong>每天衰减 {pct}%</strong>，所以没人能永久占住一座城市。",
    statCities: "座城市在争夺",
    statProfiles: "个已上榜账号",
    statLive: "正在地图上燃烧",
    leagueH2: "城市联赛",
    leagueSub: "按每座城市仍在燃烧的总额排名——最热闹的在上，最安静的在下。",
    stepsH2: "玩法说明",
    steps: [
      "找到你的城市。搜索它，或者在地球上点它。全部 {n} 座城市都开放——大多数还没有第一名。",
      "把你的账号放上去。一个 @账号、一个社交主页，或者你自己的网站。不用注册，不用邮箱。",
      "按这个位置对你的价值付款。城市里金额最大的那笔就是第一名——城市本身也会随着居民的花费在世界联赛中上升。",
      "看着它烧掉。每笔付款每天损失 {pct}% 的价值。{a} 一周后只值 {b}。排名是持续开销，不是一次性买断。",
    ],
    cityMetaTitle: "{city} 现在谁是第一名？",
    cityMetaDesc:
      "{city}（{country}）的实时人物排行榜。把你的 X、TikTok、Instagram、LinkedIn 或自己的链接放到 {city} 上抢下榜首——每笔付款每天衰减 10%，所以第一名永远抢得到。",
    cityLede: "现在拿下 {city} 的榜首需要 <strong>{price}</strong>，而且价格每小时都在下降。",
    cityLedeEmpty: "{city} 还没有人占据。<strong>第一名只要 {price}。</strong>",
    cityBoardEmpty: "{city} 还是空的。第一笔付款就能拿下这座城市。",
    cityLeagueRank: "世界联赛第 {rank} 名",
    cityUnranked: "尚未进入世界联赛",
    cityIntro:
      "{city} 是 outbid.love 上 {n} 座城市之一。这是一个用钱买位置、而不是靠投票的排行榜：在 {city} 上有效付款金额最大的人坐在最上面，而每笔付款每天损失 {pct}% 的价值——所以只要没人加价，{city} 第一名的价格就在持续下跌。最低 {min}，无需注册；城市也会随着上榜者的花费在世界联赛中上升。",
    cityTakeBtn: "拿下 {city} →",
    cityAll: "← 所有城市",
    boardTitle: "全球榜 — 所有条目，所有城市",
    boardDesc: "跨所有城市的总排行。每笔付款每天衰减 10%，所以即使没人出价，顺序也会变。",
    cityFaq: [
      {
        q: "怎样成为 {city} 的第一名？",
        a: "把你的链接或 @账号放到 {city} 上，付比当前榜首衰减后金额多一美分即可。那个金额每小时都在下降，所以榜首等得越久，价格越便宜。",
      },
      {
        q: "{city} 的第一名要多少钱？",
        a: "等于当前榜首衰减后的金额再加一美分。如果还没人占据 {city}，那就是 5 美元最低价。",
      },
      {
        q: "我能在 {city} 保持第一名多久？",
        a: "直到有人付得更多，或者你的付款衰减到低于对方为止。每笔付款每天损失 10%，所以守住 {city} 靠的是持续加价，而不是一次性付款。",
      },
      {
        q: "可以往 {city} 上放什么？",
        a: "X、TikTok、Instagram 或 LinkedIn 主页，或者任何你拥有的网站。不需要账号，也不需要邮箱。",
      },
    ],
  },

  ko: {
    navGlobe: "지구본",
    navBoard: "세계 보드",
    metaTitle: "outbid.love — 전 세계 도시 랭킹",
    metaDesc:
      "지구상의 모든 도시에는 1위가 있습니다. X, TikTok, Instagram, LinkedIn 또는 내 링크를 도시에 올리고 결제해 정상에 앉으세요. 모든 결제는 하루 10%씩 소멸하므로 1위는 언제나 뺏을 수 있습니다.",
    h1: "모든 도시에 1위가 있습니다. 당신의 도시를 가져가세요.",
    lede:
      "X, TikTok, Instagram, LinkedIn — 또는 당신이 가진 어떤 링크든 — 도시에 올리세요. 그 도시에서 가장 큰 결제가 맨 위에 놓입니다. 모든 결제는 <strong>하루 {pct}%씩 소멸</strong>하므로 누구도 도시를 영원히 차지할 수 없습니다.",
    statCities: "개 도시 경쟁 중",
    statProfiles: "개 프로필 등록",
    statLive: "지도 위에서 소멸 중",
    leagueH2: "도시 리그",
    leagueSub: "각 도시에서 아직 타고 있는 금액 기준 — 가장 뜨거운 곳이 위, 조용한 곳이 아래.",
    stepsH2: "작동 방식",
    steps: [
      "도시를 찾으세요. 검색하거나 지구본에서 클릭하세요. {n}개 도시가 모두 열려 있고, 대부분은 아직 1위가 없습니다.",
      "프로필을 올리세요. @계정, 소셜 링크, 또는 내 사이트. 가입도 이메일도 없습니다.",
      "그 자리의 값어치만큼 결제하세요. 그 도시에서 가장 큰 유효 금액이 1위이며, 도시 자체도 사람들의 지출에 따라 세계 리그를 올라갑니다.",
      "소멸하는 것을 지켜보세요. 모든 결제는 하루 {pct}%씩 가치를 잃습니다. {a}는 일주일 뒤 {b}가 됩니다. 순위는 구매가 아니라 유지 비용입니다.",
    ],
    cityMetaTitle: "{city}에서 1위는 누구일까요?",
    cityMetaDesc:
      "{country} {city}의 실시간 인물 랭킹. X, TikTok, Instagram, LinkedIn 또는 내 링크를 {city}에 올리고 정상을 차지하세요 — 모든 결제는 하루 10%씩 소멸하므로 1위는 언제나 뺏을 수 있습니다.",
    cityLede: "지금 {city}의 정상을 차지하는 비용은 <strong>{price}</strong>이고, 매시간 내려갑니다.",
    cityLedeEmpty: "{city}는 아직 아무도 차지하지 않았습니다. <strong>1위는 {price}.</strong>",
    cityBoardEmpty: "{city}는 비어 있습니다. 첫 결제가 이 도시를 가져갑니다.",
    cityLeagueRank: "세계 리그 {rank}위",
    cityUnranked: "아직 세계 리그에 없음",
    cityIntro:
      "{city}는 outbid.love의 {n}개 도시 중 하나입니다. 투표가 아니라 돈으로 자리를 사는 랭킹으로, {city}에서 유효 결제 금액이 가장 큰 사람이 맨 위에 앉습니다. 모든 결제는 하루 {pct}%씩 가치를 잃기 때문에 누군가 추가 결제를 하기 전까지 {city} 1위의 가격은 계속 떨어집니다. 최소 {min}, 계정 생성은 필요 없으며, 도시도 그 안의 사람들이 쓴 만큼 세계 리그를 올라갑니다.",
    cityTakeBtn: "{city} 차지하기 →",
    cityAll: "← 모든 도시",
    boardTitle: "세계 보드 — 모든 등록, 모든 도시",
    boardDesc:
      "모든 도시를 아우르는 전체 랭킹. 모든 결제가 하루 10%씩 소멸하므로 아무도 입찰하지 않아도 순서가 바뀝니다.",
    cityFaq: [
      {
        q: "{city}에서 1위가 되려면 어떻게 하나요?",
        a: "{city}에 링크나 @계정을 올리고 현재 1위의 소멸 후 금액보다 1센트만 더 결제하면 됩니다. 그 금액은 매시간 떨어지므로 1위가 오래 기다릴수록 정상은 저렴해집니다.",
      },
      {
        q: "{city}의 1위 자리는 얼마인가요?",
        a: "현재 1위의 소멸 후 가치에 1센트를 더한 금액입니다. 아직 아무도 {city}를 차지하지 않았다면 최소 금액인 5달러입니다.",
      },
      {
        q: "{city}에서 1위를 얼마나 유지할 수 있나요?",
        a: "누군가 더 많이 결제하거나, 내 결제가 상대보다 아래로 소멸할 때까지입니다. 모든 결제는 하루 10%씩 줄어들기 때문에 {city}를 지키려면 한 번이 아니라 계속 채워야 합니다.",
      },
      {
        q: "{city}에 무엇을 올릴 수 있나요?",
        a: "X, TikTok, Instagram, LinkedIn 프로필 또는 본인이 소유한 웹사이트입니다. 계정도 이메일도 필요 없습니다.",
      },
    ],
  },

  es: {
    navGlobe: "Globo",
    navBoard: "Tablón mundial",
    metaTitle: "outbid.love — el ranking de ciudades del mundo",
    metaDesc:
      "Cada ciudad del planeta tiene un nº1. Pon tu X, TikTok, Instagram, LinkedIn o tu propio enlace sobre una ciudad y paga por sentarte en lo más alto. Cada pago se deprecia un 10% al día, así que el nº1 siempre se puede ganar.",
    h1: "Cada ciudad tiene un nº1. Quédate con la tuya.",
    lede:
      "Pon tu X, TikTok, Instagram, LinkedIn — o cualquier enlace tuyo — sobre una ciudad. El pago más alto de esa ciudad se sienta arriba. Cada pago <strong>se deprecia un {pct}% al día</strong>, así que nadie se queda con una ciudad para siempre.",
    statCities: "ciudades en juego",
    statProfiles: "perfiles listados",
    statLive: "vivo en el mapa",
    leagueH2: "La liga de ciudades",
    leagueSub:
      "Ordenadas por todo lo que sigue ardiendo en cada ciudad: las más activas arriba, las más tranquilas abajo.",
    stepsH2: "Cómo funciona",
    steps: [
      "Encuentra tu ciudad. Búscala o haz clic en el globo. Las {n} ciudades están abiertas y la mayoría aún no tiene nº1.",
      "Pon tu perfil en ella. Un @usuario, un enlace social o tu propia web. Sin cuenta y sin email.",
      "Paga lo que ese puesto vale para ti. La mayor cantidad viva de esa ciudad es el nº1, y la ciudad sube en la liga mundial a medida que su gente gasta.",
      "Míralo arder. Cada pago pierde un {pct}% de su valor al día. {a} valen {b} al cabo de una semana. La posición es un gasto corriente, no una compra.",
    ],
    cityMetaTitle: "¿Quién es el nº1 en {city}?",
    cityMetaDesc:
      "El ranking en vivo de {city}, {country}. Pon tu X, TikTok, Instagram, LinkedIn o tu propio enlace sobre {city} y llévate el primer puesto: cada pago se deprecia un 10% al día, así que el nº1 siempre se puede ganar.",
    cityLede: "Llevarte lo más alto de {city} cuesta ahora <strong>{price}</strong>, y baja cada hora.",
    cityLedeEmpty: "Nadie tiene {city} todavía. <strong>El nº1 cuesta {price}.</strong>",
    cityBoardEmpty: "{city} está vacía. El primer pago se queda con la ciudad.",
    cityLeagueRank: "nº{rank} de la liga mundial",
    cityUnranked: "aún fuera de la liga mundial",
    cityIntro:
      "{city} es una de las {n} ciudades de outbid.love, un ranking en el que la posición se compra en vez de votarse. Quien tenga el pago vivo más alto sobre {city} se sienta arriba, y cada pago pierde un {pct}% de su valor al día, así que el precio del nº1 en {city} baja de forma continua hasta que alguien recarga. El mínimo es {min}, no hay cuenta que crear, y la ciudad sube en la liga mundial a medida que gasta su gente.",
    cityTakeBtn: "Llévate {city} →",
    cityAll: "← Todas las ciudades",
    boardTitle: "Tablón mundial: todas las entradas, todas las ciudades",
    boardDesc:
      "El ranking global de todas las ciudades. Cada pago se deprecia un 10% al día, así que el orden cambia aunque nadie puje.",
    cityFaq: [
      {
        q: "¿Cómo llego a ser el nº1 en {city}?",
        a: "Pon tu enlace o @usuario sobre {city} y paga un céntimo más que el valor depreciado del primero. Ese valor baja cada hora, así que cuanto más espere el líder, más barato sale lo más alto.",
      },
      {
        q: "¿Cuánto cuesta el primer puesto en {city}?",
        a: "Lo que vale el líder actual tras la depreciación, más un céntimo. Si nadie tiene {city} todavía, cuesta el mínimo de 5 $.",
      },
      {
        q: "¿Cuánto tiempo me quedo como nº1 en {city}?",
        a: "Hasta que alguien pague más o hasta que tu propio pago se deprecie por debajo del suyo. Cada pago pierde un 10% al día, así que mantener {city} se trata de recargar, no de pagar una vez.",
      },
      {
        q: "¿Qué puedo poner en {city}?",
        a: "Un perfil de X, TikTok, Instagram o LinkedIn, o cualquier web que sea tuya. No hace falta cuenta ni email.",
      },
    ],
  },

  ja: {
    navGlobe: "地球儀",
    navBoard: "世界ボード",
    metaTitle: "outbid.love — 世界の都市リーダーボード",
    metaDesc:
      "地球上のどの都市にも1位があります。X・TikTok・Instagram・LinkedIn、または自分のリンクを都市に置いて、支払って頂点に座りましょう。すべての支払いは1日10%ずつ減価するので、1位はいつでも奪えます。",
    h1: "どの都市にも1位がある。あなたの街を取ろう。",
    lede:
      "X・TikTok・Instagram・LinkedIn、あるいは自分の持つどんなリンクでも、都市の上に置けます。その都市で最も大きい支払いが頂点に座ります。すべての支払いは<strong>1日{pct}%ずつ減価</strong>するので、誰も都市を永久には持てません。",
    statCities: "都市が争奪中",
    statProfiles: "件の掲載",
    statLive: "が地図上で燃焼中",
    leagueH2: "都市リーグ",
    leagueSub: "各都市でまだ燃えている総額順 — 熱い街が上、静かな街が下。",
    stepsH2: "仕組み",
    steps: [
      "自分の都市を探す。検索するか、地球儀をクリック。{n} 都市すべてが開いていて、その大半にはまだ1位がいません。",
      "プロフィールを置く。@ハンドル、SNSのリンク、または自分のサイト。登録もメールも不要です。",
      "その席の価値だと思う額を支払う。その都市で最大の有効額が1位で、都市自体も住人の支払いに応じて世界リーグを上がります。",
      "燃えるのを見る。すべての支払いは1日{pct}%ずつ価値を失います。{a} は1週間後に {b}。順位は買い切りではなくランニングコストです。",
    ],
    cityMetaTitle: "{city} の1位は誰か？",
    cityMetaDesc:
      "{country}・{city} のライブ人物ランキング。X・TikTok・Instagram・LinkedIn、または自分のリンクを {city} に置いて頂点を取りましょう。すべての支払いは1日10%ずつ減価するので、1位はいつでも奪えます。",
    cityLede: "いま {city} の頂点を取るには <strong>{price}</strong>。金額は1時間ごとに下がります。",
    cityLedeEmpty: "{city} はまだ誰も取っていません。<strong>1位は {price}。</strong>",
    cityBoardEmpty: "{city} は空です。最初の支払いがこの都市を取ります。",
    cityLeagueRank: "世界リーグ {rank} 位",
    cityUnranked: "まだ世界リーグ圏外",
    cityIntro:
      "{city} は outbid.love の {n} 都市のひとつです。投票ではなくお金で席を買うランキングで、{city} に対する有効支払額が最も大きい人が頂点に座ります。すべての支払いは1日{pct}%ずつ価値を失うため、誰かが積み増すまで {city} の1位の価格は下がり続けます。最低額は {min}、アカウント登録は不要。都市自体も、そこに集まる人の支払いに応じて世界リーグを上がっていきます。",
    cityTakeBtn: "{city} を取る →",
    cityAll: "← すべての都市",
    boardTitle: "世界ボード — 全掲載・全都市",
    boardDesc:
      "すべての都市を横断した総合ランキング。支払いは1日10%ずつ減価するので、誰も入札しなくても順位は動きます。",
    cityFaq: [
      {
        q: "{city} で1位になるには？",
        a: "{city} に自分のリンクか @ハンドルを置き、現在の首位の減価後の金額より1セント多く支払えば十分です。その金額は1時間ごとに下がるので、首位が待つほど頂点は安くなります。",
      },
      {
        q: "{city} の1位はいくら？",
        a: "現在の首位の減価後の価値に1セントを足した額です。まだ誰も {city} を取っていなければ、最低額の5ドルです。",
      },
      {
        q: "{city} の1位はどれくらい維持できる？",
        a: "誰かがより多く支払うまで、あるいは自分の支払いが相手より下に減価するまでです。支払いは1日10%減るので、{city} を守るには一度きりではなく積み増しが要ります。",
      },
      {
        q: "{city} には何を置ける？",
        a: "X・TikTok・Instagram・LinkedIn のプロフィール、または自分が所有するウェブサイトです。アカウントもメールも不要です。",
      },
    ],
  },

  de: {
    navGlobe: "Globus",
    navBoard: "Weltrangliste",
    metaTitle: "outbid.love — die Städte-Rangliste der Welt",
    metaDesc:
      "Jede Stadt der Welt hat eine Nummer 1. Setz dein X, TikTok, Instagram, LinkedIn oder deinen eigenen Link auf eine Stadt und zahl dich an die Spitze. Jede Zahlung verliert täglich 10% — Platz 1 ist immer zu holen.",
    h1: "Jede Stadt hat eine Nummer 1. Hol dir deine.",
    lede:
      "Setz dein X, TikTok, Instagram, LinkedIn — oder irgendeinen Link, der dir gehört — auf eine Stadt. Die größte Zahlung in dieser Stadt sitzt oben. Jede Zahlung <strong>verliert {pct}% pro Tag</strong>, also hält niemand eine Stadt für immer.",
    statCities: "Städte im Rennen",
    statProfiles: "Einträge",
    statLive: "aktiv auf der Karte",
    leagueH2: "Die Städteliga",
    leagueSub:
      "Sortiert nach allem, was in jeder Stadt noch brennt — die lebhaftesten oben, die ruhigsten unten.",
    stepsH2: "So funktioniert es",
    steps: [
      "Finde deine Stadt. Such sie oder klick sie auf dem Globus an. Alle {n} Städte sind offen, die meisten haben noch keine Nummer 1.",
      "Setz dein Profil darauf. Ein @Handle, ein Social-Link oder deine eigene Seite. Kein Konto, keine E-Mail.",
      "Zahl, was dir der Platz wert ist. Der größte aktive Betrag in der Stadt ist die Nummer 1 — und die Stadt selbst steigt in der Weltliga, je mehr ihre Leute ausgeben.",
      "Sieh zu, wie es verbrennt. Jede Zahlung verliert täglich {pct}% ihres Werts. Aus {a} werden nach einer Woche {b}. Ein Rang ist laufende Ausgabe, kein Kauf.",
    ],
    cityMetaTitle: "Wer ist die Nummer 1 in {city}?",
    cityMetaDesc:
      "Die Live-Rangliste von {city}, {country}. Setz dein X, TikTok, Instagram, LinkedIn oder deinen eigenen Link auf {city} und hol dir Platz 1 — jede Zahlung verliert täglich 10%, die Spitze ist also immer zu holen.",
    cityLede: "Die Spitze von {city} kostet gerade <strong>{price}</strong>, und der Preis sinkt stündlich.",
    cityLedeEmpty: "{city} hält noch niemand. <strong>Platz 1 kostet {price}.</strong>",
    cityBoardEmpty: "{city} ist leer. Die erste Zahlung bekommt die Stadt.",
    cityLeagueRank: "Platz {rank} der Weltliga",
    cityUnranked: "noch nicht in der Weltliga",
    cityIntro:
      "{city} ist eine von {n} Städten auf outbid.love, einer Rangliste, in der man sich einkauft statt gewählt zu werden. Wer die größte aktive Zahlung auf {city} hat, sitzt oben, und jede Zahlung verliert täglich {pct}% ihres Werts — der Preis für Platz 1 in {city} sinkt also fortlaufend, bis jemand nachlegt. Das Minimum liegt bei {min}, ein Konto braucht es nicht, und die Stadt steigt in der Weltliga, je mehr ihre Leute ausgeben.",
    cityTakeBtn: "{city} holen →",
    cityAll: "← Alle Städte",
    boardTitle: "Weltrangliste — alle Einträge, alle Städte",
    boardDesc:
      "Die globale Rangliste über alle Städte. Jede Zahlung verliert täglich 10%, die Reihenfolge ändert sich also auch ohne neue Gebote.",
    cityFaq: [
      {
        q: "Wie werde ich Nummer 1 in {city}?",
        a: "Setz deinen Link oder dein @Handle auf {city} und zahl einen Cent mehr als den verfallenen Wert des aktuellen Ersten. Dieser Wert sinkt stündlich — je länger der Erste wartet, desto günstiger wird die Spitze.",
      },
      {
        q: "Was kostet Platz 1 in {city}?",
        a: "So viel, wie der aktuelle Erste nach dem Wertverfall noch wert ist, plus einen Cent. Hält {city} noch niemand, kostet Platz 1 das Minimum von 5 $.",
      },
      {
        q: "Wie lange bleibe ich Nummer 1 in {city}?",
        a: "Bis jemand mehr zahlt oder deine eigene Zahlung unter seine fällt. Jede Zahlung verliert täglich 10%, {city} zu halten heißt also nachlegen statt einmal zahlen.",
      },
      {
        q: "Was darf ich auf {city} setzen?",
        a: "Ein Profil bei X, TikTok, Instagram oder LinkedIn oder eine Website, die dir gehört. Weder Konto noch E-Mail nötig.",
      },
    ],
  },

  fr: {
    navGlobe: "Globe",
    navBoard: "Classement mondial",
    metaTitle: "outbid.love — le classement des villes du monde",
    metaDesc:
      "Chaque ville a son nº1. Placez votre X, TikTok, Instagram, LinkedIn ou votre propre lien sur une ville et payez pour occuper le sommet. Chaque paiement perd 10% par jour : la première place se reprend toujours.",
    h1: "Chaque ville a un nº1. Prenez la vôtre.",
    lede:
      "Placez votre X, TikTok, Instagram, LinkedIn — ou n'importe quel lien qui vous appartient — sur une ville. Le plus gros paiement de cette ville occupe le sommet. Chaque paiement <strong>perd {pct}% par jour</strong>, personne ne garde donc une ville indéfiniment.",
    statCities: "villes en jeu",
    statProfiles: "profils référencés",
    statLive: "en vie sur la carte",
    leagueH2: "La ligue des villes",
    leagueSub:
      "Classées selon tout ce qui brûle encore dans chaque ville : les plus animées en haut, les plus calmes en bas.",
    stepsH2: "Comment ça marche",
    steps: [
      "Trouvez votre ville. Cherchez-la ou cliquez sur le globe. Les {n} villes sont ouvertes et la plupart n'ont pas encore de nº1.",
      "Posez votre profil dessus. Un @pseudo, un lien social ou votre propre site. Sans compte ni e-mail.",
      "Payez ce que la place vaut pour vous. Le plus gros montant vivant de la ville est le nº1 — et la ville elle-même grimpe dans la ligue mondiale à mesure que ses habitants dépensent.",
      "Regardez ça brûler. Chaque paiement perd {pct}% de sa valeur par jour. {a} valent {b} au bout d'une semaine. Un rang est une dépense courante, pas un achat.",
    ],
    cityMetaTitle: "Qui est nº1 à {city} ?",
    cityMetaDesc:
      "Le classement en direct de {city}, {country}. Placez votre X, TikTok, Instagram, LinkedIn ou votre propre lien sur {city} et prenez la tête — chaque paiement perd 10% par jour, la première place se reprend donc toujours.",
    cityLede: "Prendre le sommet de {city} coûte <strong>{price}</strong> en ce moment, et ça baisse d'heure en heure.",
    cityLedeEmpty: "Personne ne tient encore {city}. <strong>La 1re place coûte {price}.</strong>",
    cityBoardEmpty: "{city} est vide. Le premier paiement emporte la ville.",
    cityLeagueRank: "nº{rank} de la ligue mondiale",
    cityUnranked: "pas encore dans la ligue mondiale",
    cityIntro:
      "{city} est l'une des {n} villes d'outbid.love, un classement où la place s'achète au lieu de se voter. Celui qui détient le paiement vivant le plus élevé sur {city} occupe le sommet, et chaque paiement perd {pct}% de sa valeur par jour : le prix du nº1 à {city} baisse donc en continu jusqu'à ce que quelqu'un recharge. Le minimum est de {min}, aucun compte à créer, et la ville grimpe dans la ligue mondiale à mesure que ses habitants dépensent.",
    cityTakeBtn: "Prendre {city} →",
    cityAll: "← Toutes les villes",
    boardTitle: "Classement mondial — toutes les entrées, toutes les villes",
    boardDesc:
      "Le classement global sur toutes les villes. Chaque paiement perd 10% par jour : l'ordre change même sans nouvelle enchère.",
    cityFaq: [
      {
        q: "Comment devenir nº1 à {city} ?",
        a: "Placez votre lien ou votre @pseudo sur {city} et payez un centime de plus que la valeur dépréciée du premier. Cette valeur baisse chaque heure : plus le leader attend, moins le sommet coûte cher.",
      },
      {
        q: "Combien coûte la première place à {city} ?",
        a: "La valeur dépréciée du leader actuel, plus un centime. Si personne ne tient encore {city}, elle coûte le minimum de 5 $.",
      },
      {
        q: "Combien de temps reste-t-on nº1 à {city} ?",
        a: "Jusqu'à ce que quelqu'un paie davantage, ou que votre propre paiement se déprécie sous le sien. Chaque paiement perd 10% par jour : tenir {city} suppose de recharger, pas de payer une fois.",
      },
      {
        q: "Que puis-je placer sur {city} ?",
        a: "Un profil X, TikTok, Instagram ou LinkedIn, ou n'importe quel site qui vous appartient. Ni compte ni e-mail nécessaires.",
      },
    ],
  },

  pt: {
    navGlobe: "Globo",
    navBoard: "Placar mundial",
    metaTitle: "outbid.love — o ranking de cidades do mundo",
    metaDesc:
      "Toda cidade tem um 1º lugar. Coloque seu X, TikTok, Instagram, LinkedIn ou seu próprio link numa cidade e pague para sentar no topo. Todo pagamento perde 10% por dia, então o 1º lugar sempre dá para tomar.",
    h1: "Toda cidade tem um 1º lugar. Pegue a sua.",
    lede:
      "Coloque seu X, TikTok, Instagram, LinkedIn — ou qualquer link seu — numa cidade. O maior pagamento daquela cidade fica no topo. Todo pagamento <strong>perde {pct}% por dia</strong>, então ninguém segura uma cidade para sempre.",
    statCities: "cidades em disputa",
    statProfiles: "perfis listados",
    statLive: "vivo no mapa",
    leagueH2: "A liga das cidades",
    leagueSub:
      "Ordenadas por tudo que ainda queima em cada cidade — as mais agitadas em cima, as mais quietas embaixo.",
    stepsH2: "Como funciona",
    steps: [
      "Ache sua cidade. Busque ou clique no globo. As {n} cidades estão abertas e a maioria ainda não tem 1º lugar.",
      "Coloque seu perfil nela. Um @usuário, um link social ou seu próprio site. Sem cadastro, sem e-mail.",
      "Pague o que a posição vale para você. O maior valor vivo daquela cidade é o 1º lugar — e a cidade sobe na liga mundial conforme sua gente gasta.",
      "Veja queimar. Todo pagamento perde {pct}% do valor por dia. {a} viram {b} depois de uma semana. Posição é despesa corrente, não compra.",
    ],
    cityMetaTitle: "Quem é o 1º lugar em {city}?",
    cityMetaDesc:
      "O ranking ao vivo de {city}, {country}. Coloque seu X, TikTok, Instagram, LinkedIn ou seu próprio link em {city} e assuma o topo — todo pagamento perde 10% por dia, então o 1º lugar sempre dá para tomar.",
    cityLede: "Assumir o topo de {city} custa <strong>{price}</strong> agora, e cai a cada hora.",
    cityLedeEmpty: "Ninguém segura {city} ainda. <strong>O 1º lugar custa {price}.</strong>",
    cityBoardEmpty: "{city} está vazia. O primeiro pagamento leva a cidade.",
    cityLeagueRank: "{rank}º na liga mundial",
    cityUnranked: "ainda fora da liga mundial",
    cityIntro:
      "{city} é uma das {n} cidades do outbid.love, um ranking em que a posição é comprada e não votada. Quem tiver o maior pagamento vivo em {city} fica no topo, e todo pagamento perde {pct}% do valor por dia — ou seja, o preço do 1º lugar em {city} cai continuamente até alguém reforçar. O mínimo é {min}, não há cadastro, e a cidade sobe na liga mundial conforme sua gente gasta.",
    cityTakeBtn: "Pegar {city} →",
    cityAll: "← Todas as cidades",
    boardTitle: "Placar mundial — todas as entradas, todas as cidades",
    boardDesc:
      "O ranking global de todas as cidades. Todo pagamento perde 10% por dia, então a ordem muda mesmo sem lances novos.",
    cityFaq: [
      {
        q: "Como eu viro 1º lugar em {city}?",
        a: "Coloque seu link ou @usuário em {city} e pague um centavo a mais que o valor já depreciado do líder. Esse valor cai a cada hora, então quanto mais o líder espera, mais barato fica o topo.",
      },
      {
        q: "Quanto custa o 1º lugar em {city}?",
        a: "O valor depreciado do líder atual mais um centavo. Se ninguém segura {city} ainda, custa o mínimo de US$ 5.",
      },
      {
        q: "Por quanto tempo eu fico em 1º em {city}?",
        a: "Até alguém pagar mais, ou até seu pagamento se depreciar abaixo do dele. Todo pagamento perde 10% por dia, então segurar {city} é reforçar, não pagar uma vez só.",
      },
      {
        q: "O que posso colocar em {city}?",
        a: "Um perfil do X, TikTok, Instagram ou LinkedIn, ou qualquer site seu. Não precisa de conta nem e-mail.",
      },
    ],
  },

  hi: {
    navGlobe: "ग्लोब",
    navBoard: "वैश्विक बोर्ड",
    metaTitle: "outbid.love — दुनिया का शहर लीडरबोर्ड",
    metaDesc:
      "धरती के हर शहर का एक नंबर वन है। अपना X, TikTok, Instagram, LinkedIn या अपना लिंक किसी शहर पर रखिए और भुगतान करके शीर्ष पर बैठिए। हर भुगतान रोज़ 10% घटता है, इसलिए पहला स्थान हमेशा जीता जा सकता है।",
    h1: "हर शहर का एक नंबर वन है। अपना ले लीजिए।",
    lede:
      "अपना X, TikTok, Instagram, LinkedIn — या अपना कोई भी लिंक — किसी शहर पर रखिए। उस शहर का सबसे बड़ा भुगतान सबसे ऊपर बैठता है। हर भुगतान <strong>रोज़ {pct}% घटता है</strong>, इसलिए कोई भी शहर हमेशा के लिए नहीं रोक सकता।",
    statCities: "शहर मुक़ाबले में",
    statProfiles: "प्रोफ़ाइल सूचीबद्ध",
    statLive: "नक़्शे पर सक्रिय",
    leagueH2: "शहरों की लीग",
    leagueSub:
      "हर शहर में अब भी जल रही कुल रकम के हिसाब से — सबसे व्यस्त ऊपर, सबसे शांत नीचे।",
    stepsH2: "यह कैसे काम करता है",
    steps: [
      "अपना शहर ढूँढिए। खोजिए या ग्लोब पर क्लिक कीजिए। सभी {n} शहर खुले हैं और ज़्यादातर में अभी कोई नंबर वन नहीं है।",
      "अपनी प्रोफ़ाइल रखिए। @हैंडल, सोशल लिंक, या अपनी साइट। न अकाउंट, न ईमेल।",
      "जितना यह जगह आपके लिए मायने रखती है, उतना दीजिए। उस शहर की सबसे बड़ी सक्रिय रकम ही नंबर वन है — और शहर भी अपने लोगों के ख़र्च के साथ वैश्विक लीग में ऊपर चढ़ता है।",
      "इसे जलते देखिए। हर भुगतान रोज़ {pct}% मूल्य खोता है। {a} एक हफ़्ते बाद {b} रह जाते हैं। रैंक एक चालू ख़र्च है, ख़रीद नहीं।",
    ],
    cityMetaTitle: "{city} में नंबर वन कौन है?",
    cityMetaDesc:
      "{country} के {city} की लाइव रैंकिंग। अपना X, TikTok, Instagram, LinkedIn या अपना लिंक {city} पर रखकर शीर्ष ले लीजिए — हर भुगतान रोज़ 10% घटता है, इसलिए पहला स्थान हमेशा जीता जा सकता है।",
    cityLede: "अभी {city} का शीर्ष लेने का ख़र्च <strong>{price}</strong> है, और यह हर घंटे गिर रहा है।",
    cityLedeEmpty: "{city} अभी किसी के पास नहीं है। <strong>पहला स्थान {price} में।</strong>",
    cityBoardEmpty: "{city} ख़ाली है। पहला भुगतान इस शहर का मालिक बन जाएगा।",
    cityLeagueRank: "वैश्विक लीग में #{rank}",
    cityUnranked: "अभी वैश्विक लीग में नहीं",
    cityIntro:
      "{city}, outbid.love के {n} शहरों में से एक है — यह ऐसी रैंकिंग है जहाँ जगह वोट से नहीं, पैसे से मिलती है। {city} पर जिसका सक्रिय भुगतान सबसे बड़ा है, वही सबसे ऊपर बैठता है, और हर भुगतान रोज़ {pct}% मूल्य खोता है — यानी जब तक कोई और नहीं जोड़ता, {city} में पहले स्थान की क़ीमत लगातार गिरती रहती है। न्यूनतम {min} है, कोई अकाउंट नहीं बनाना पड़ता, और शहर भी अपने लोगों के ख़र्च के साथ वैश्विक लीग में ऊपर चढ़ता है।",
    cityTakeBtn: "{city} ले लीजिए →",
    cityAll: "← सभी शहर",
    boardTitle: "वैश्विक बोर्ड — हर लिस्टिंग, हर शहर",
    boardDesc:
      "सभी शहरों की संयुक्त रैंकिंग। हर भुगतान रोज़ 10% घटता है, इसलिए कोई बोली न लगाए तब भी क्रम बदलता रहता है।",
    cityFaq: [
      {
        q: "{city} में नंबर वन कैसे बनूँ?",
        a: "अपना लिंक या @हैंडल {city} पर रखिए और मौजूदा शीर्ष के घटे हुए मूल्य से एक सेंट ज़्यादा दीजिए। वह मूल्य हर घंटे गिरता है, इसलिए शीर्ष वाला जितना इंतज़ार करेगा, चोटी उतनी सस्ती होगी।",
      },
      {
        q: "{city} में पहले स्थान की क़ीमत कितनी है?",
        a: "मौजूदा शीर्ष का घटा हुआ मूल्य और एक सेंट। अगर {city} अभी किसी के पास नहीं है, तो न्यूनतम $5।",
      },
      {
        q: "{city} में कितने समय नंबर वन रहूँगा?",
        a: "जब तक कोई ज़्यादा न दे, या आपका अपना भुगतान घटकर उनसे नीचे न आ जाए। हर भुगतान रोज़ 10% घटता है, इसलिए {city} को बनाए रखना एक बार देना नहीं, बार-बार जोड़ना है।",
      },
      {
        q: "{city} पर क्या रख सकते हैं?",
        a: "X, TikTok, Instagram या LinkedIn प्रोफ़ाइल, या आपकी अपनी कोई वेबसाइट। न अकाउंट चाहिए, न ईमेल।",
      },
    ],
  },

  id: {
    navGlobe: "Globe",
    navBoard: "Papan dunia",
    metaTitle: "outbid.love — papan peringkat kota sedunia",
    metaDesc:
      "Setiap kota punya peringkat 1. Pasang X, TikTok, Instagram, LinkedIn, atau tautan Anda sendiri di sebuah kota dan bayar untuk duduk di puncaknya. Setiap pembayaran menyusut 10% per hari, jadi puncak selalu bisa direbut.",
    h1: "Setiap kota punya peringkat 1. Rebut kota Anda.",
    lede:
      "Pasang X, TikTok, Instagram, LinkedIn — atau tautan apa pun milik Anda — di sebuah kota. Pembayaran terbesar di kota itu duduk paling atas. Setiap pembayaran <strong>menyusut {pct}% per hari</strong>, jadi tidak ada yang memegang sebuah kota selamanya.",
    statCities: "kota diperebutkan",
    statProfiles: "profil terdaftar",
    statLive: "hidup di peta",
    leagueH2: "Liga kota",
    leagueSub:
      "Diurutkan dari semua yang masih menyala di tiap kota — paling ramai di atas, paling sepi di bawah.",
    stepsH2: "Cara kerjanya",
    steps: [
      "Temukan kota Anda. Cari atau klik di globe. Semua {n} kota terbuka dan sebagian besar belum punya peringkat 1.",
      "Pasang profil Anda di sana. Sebuah @akun, tautan sosial, atau situs Anda sendiri. Tanpa akun, tanpa email.",
      "Bayar sebesar nilai posisi itu bagi Anda. Jumlah aktif terbesar di kota itu adalah peringkat 1 — dan kotanya sendiri naik di liga dunia seiring warganya membayar.",
      "Lihat nilainya menyusut. Setiap pembayaran kehilangan {pct}% nilainya per hari. {a} menjadi {b} setelah sepekan. Peringkat adalah biaya berjalan, bukan pembelian.",
    ],
    cityMetaTitle: "Siapa peringkat 1 di {city}?",
    cityMetaDesc:
      "Papan peringkat langsung {city}, {country}. Pasang X, TikTok, Instagram, LinkedIn, atau tautan Anda sendiri di {city} dan rebut puncaknya — setiap pembayaran menyusut 10% per hari, jadi peringkat 1 selalu bisa direbut.",
    cityLede: "Merebut puncak {city} sekarang butuh <strong>{price}</strong>, dan angkanya turun tiap jam.",
    cityLedeEmpty: "Belum ada yang memegang {city}. <strong>Peringkat 1 seharga {price}.</strong>",
    cityBoardEmpty: "{city} masih kosong. Pembayaran pertama memiliki kota ini.",
    cityLeagueRank: "peringkat {rank} liga dunia",
    cityUnranked: "belum masuk liga dunia",
    cityIntro:
      "{city} adalah salah satu dari {n} kota di outbid.love, papan peringkat yang posisinya dibeli, bukan dipilih. Siapa pun yang punya pembayaran aktif terbesar di {city} duduk paling atas, dan setiap pembayaran kehilangan {pct}% nilainya per hari — sehingga harga peringkat 1 di {city} terus turun sampai ada yang menambah. Minimumnya {min}, tidak perlu membuat akun, dan kota itu ikut naik di liga dunia seiring pengeluaran warganya.",
    cityTakeBtn: "Rebut {city} →",
    cityAll: "← Semua kota",
    boardTitle: "Papan dunia — semua entri, semua kota",
    boardDesc:
      "Peringkat global lintas semua kota. Setiap pembayaran menyusut 10% per hari, jadi urutannya berubah bahkan tanpa tawaran baru.",
    cityFaq: [
      {
        q: "Bagaimana caranya jadi peringkat 1 di {city}?",
        a: "Pasang tautan atau @akun Anda di {city} lalu bayar satu sen lebih tinggi dari nilai tersusut pemuncak saat ini. Nilai itu turun tiap jam, jadi makin lama pemuncak menunggu, makin murah puncaknya.",
      },
      {
        q: "Berapa harga peringkat 1 di {city}?",
        a: "Nilai tersusut pemuncak saat ini ditambah satu sen. Kalau {city} belum dipegang siapa pun, harganya minimum $5.",
      },
      {
        q: "Berapa lama saya bertahan di peringkat 1 {city}?",
        a: "Sampai ada yang membayar lebih besar, atau sampai pembayaran Anda menyusut di bawah miliknya. Setiap pembayaran turun 10% per hari, jadi menjaga {city} berarti menambah, bukan membayar sekali.",
      },
      {
        q: "Apa yang bisa dipasang di {city}?",
        a: "Profil X, TikTok, Instagram, atau LinkedIn, atau situs apa pun milik Anda. Tidak perlu akun maupun email.",
      },
    ],
  },

  tr: {
    navGlobe: "Küre",
    navBoard: "Dünya tahtası",
    metaTitle: "outbid.love — dünyanın şehir sıralaması",
    metaDesc:
      "Her şehrin bir 1 numarası var. X, TikTok, Instagram, LinkedIn hesabını ya da kendi linkini bir şehre koy, ödeyip zirveye otur. Her ödeme günde %10 eriyor; yani zirve her zaman kazanılabilir.",
    h1: "Her şehrin bir 1 numarası var. Seninkini al.",
    lede:
      "X, TikTok, Instagram, LinkedIn — ya da sana ait herhangi bir link — bir şehrin üstüne koy. O şehirdeki en büyük ödeme en tepede oturur. Her ödeme <strong>günde %{pct} eriyor</strong>, yani kimse bir şehri temelli tutamıyor.",
    statCities: "şehir yarışta",
    statProfiles: "kayıtlı profil",
    statLive: "haritada canlı",
    leagueH2: "Şehir ligi",
    leagueSub: "Her şehirde hâlâ yanan tutara göre sıralı — en hareketli üstte, en sessiz altta.",
    stepsH2: "Nasıl çalışır",
    steps: [
      "Şehrini bul. Arayarak ya da küre üzerinde tıklayarak. {n} şehrin tamamı açık — çoğunun henüz 1 numarası yok.",
      "Profilini koy. Bir @kullanıcı adı, sosyal medya linki ya da kendi siten. Üyelik yok, e-posta yok.",
      "Bu yerin sana değdiği kadarını öde. Şehirdeki en büyük canlı tutar 1 numaradır — şehir de içindekiler harcadıkça dünya liginde yükselir.",
      "Yanışını izle. Her ödeme günde %{pct} değer kaybeder. {a}, bir hafta sonra {b} eder. Sıra bir satın alma değil, süregelen bir giderdir.",
    ],
    cityMetaTitle: "{city} şehrinde 1 numara kim?",
    cityMetaDesc:
      "{country} / {city} canlı sıralaması. X, TikTok, Instagram, LinkedIn hesabını ya da kendi linkini {city} üstüne koy ve zirveyi al — her ödeme günde %10 eridiği için 1. sıra her zaman kazanılabilir.",
    cityLede: "{city} zirvesini almak şu an <strong>{price}</strong>, ve saat başı düşüyor.",
    cityLedeEmpty: "{city} şehrini henüz kimse tutmuyor. <strong>1. sıra {price}.</strong>",
    cityBoardEmpty: "{city} boş. İlk ödeme bu şehrin sahibi olur.",
    cityLeagueRank: "dünya liginde {rank}. sırada",
    cityUnranked: "henüz dünya liginde değil",
    cityIntro:
      "{city}, outbid.love üzerindeki {n} şehirden biri. Burada sıra oyla değil parayla alınıyor: {city} üstünde canlı ödemesi en büyük olan kişi en tepede oturuyor ve her ödeme günde %{pct} değer kaybediyor — yani biri üstüne koymadıkça {city} 1. sırasının fiyatı sürekli düşüyor. Asgari tutar {min}, açılacak hesap yok; şehir de üstündeki insanlar harcadıkça dünya liginde yükseliyor.",
    cityTakeBtn: "{city} şehrini al →",
    cityAll: "← Tüm şehirler",
    boardTitle: "Dünya tahtası — tüm kayıtlar, tüm şehirler",
    boardDesc:
      "Bütün şehirleri kapsayan genel sıralama. Her ödeme günde %10 eridiği için kimse teklif vermese bile sıra değişir.",
    cityFaq: [
      {
        q: "{city} şehrinde 1 numara nasıl olurum?",
        a: "Linkini ya da @kullanıcı adını {city} üstüne koy ve mevcut liderin erimiş değerinden bir sent fazlasını öde. O değer her saat düştüğü için lider bekledikçe zirve ucuzlar.",
      },
      {
        q: "{city} şehrinde 1. sıra kaça?",
        a: "Mevcut liderin erimeden sonraki değeri artı bir sent. {city} şehrini henüz kimse tutmuyorsa asgari 5 dolar.",
      },
      {
        q: "{city} şehrinde ne kadar 1 numara kalırım?",
        a: "Biri daha fazlasını ödeyene ya da senin ödemen onunkinin altına eriyene kadar. Her ödeme günde %10 azaldığı için {city} şehrini tutmak tek seferlik değil, üstüne koymayla olur.",
      },
      {
        q: "{city} üstüne ne koyabilirim?",
        a: "X, TikTok, Instagram ya da LinkedIn profili veya sahibi olduğun herhangi bir site. Hesap da e-posta da gerekmiyor.",
      },
    ],
  },
  ar: {
    navGlobe: "الكرة الأرضية",
    navBoard: "اللوحة العالمية",
    metaTitle: "outbid.love — لوحة ترتيب مدن العالم",
    metaDesc:
      "لكل مدينة على الأرض مركز أول. ضع حسابك على X أو TikTok أو Instagram أو LinkedIn أو رابطك الخاص على مدينة وادفع لتجلس في القمة. كل دفعة تتآكل 10% يوميًا، فالقمة قابلة للفوز دائمًا.",
    h1: "لكل مدينة مركز أول. خذ مدينتك.",
    lede:
      "ضع حسابك على X أو TikTok أو Instagram أو LinkedIn — أو أي رابط تملكه — على مدينة. أكبر دفعة في تلك المدينة تجلس في قمتها. كل دفعة <strong>تتآكل {pct}% يوميًا</strong>، فلا أحد يحتفظ بمدينة إلى الأبد.",
    statCities: "مدينة في المنافسة",
    statProfiles: "حساب مُدرج",
    statLive: "نشط على الخريطة",
    leagueH2: "دوري المدن",
    leagueSub: "مرتبة حسب كل ما لا يزال يشتعل في كل مدينة — الأكثر حركة في الأعلى والأهدأ في الأسفل.",
    stepsH2: "كيف تعمل",
    steps: [
      "ابحث عن مدينتك أو انقر عليها على الكرة الأرضية. المدن الـ {n} كلها مفتوحة، ومعظمها بلا مركز أول بعد.",
      "ضع حسابك عليها. @معرّف، رابط اجتماعي، أو موقعك الخاص. بلا حساب وبلا بريد.",
      "ادفع ما يساويه المركز عندك. أكبر مبلغ نشط في المدينة هو المركز الأول — والمدينة نفسها تصعد في الدوري العالمي كلما أنفق أهلها.",
      "شاهده يحترق. كل دفعة تفقد {pct}% من قيمتها يوميًا. {a} تساوي {b} بعد أسبوع. الترتيب مصروف جارٍ لا عملية شراء.",
    ],
    cityMetaTitle: "من هو الأول في {city}؟",
    cityMetaDesc:
      "لوحة الترتيب الحية لمدينة {city}، {country}. ضع حسابك على X أو TikTok أو Instagram أو LinkedIn أو رابطك الخاص على {city} وخذ القمة — كل دفعة تتآكل 10% يوميًا، فالمركز الأول قابل للفوز دائمًا.",
    cityLede: "أخذ قمة {city} يكلف الآن <strong>{price}</strong>، والمبلغ ينخفض كل ساعة.",
    cityLedeEmpty: "لا أحد يملك {city} بعد. <strong>المركز الأول بـ {price}.</strong>",
    cityBoardEmpty: "{city} فارغة. أول دفعة تملك المدينة.",
    cityLeagueRank: "المركز {rank} في الدوري العالمي",
    cityUnranked: "لم تدخل الدوري العالمي بعد",
    cityIntro:
      "{city} واحدة من {n} مدينة على outbid.love، وهي لوحة ترتيب يُشترى فيها المركز بدل أن يُنتخب. من يملك أكبر دفعة نشطة على {city} يجلس في قمتها، وكل دفعة تفقد {pct}% من قيمتها يوميًا — لذا يظل سعر المركز الأول في {city} ينخفض حتى يضيف أحدهم. الحد الأدنى {min}، ولا حساب تنشئه، والمدينة تصعد في الدوري العالمي كلما أنفق أهلها.",
    cityTakeBtn: "خذ {city} ←",
    cityAll: "← كل المدن",
    boardTitle: "اللوحة العالمية — كل الإدراجات، كل المدن",
    boardDesc:
      "الترتيب العالمي عبر كل المدن. كل دفعة تتآكل 10% يوميًا، فيتغير الترتيب حتى بلا مزايدات جديدة.",
    cityFaq: [
      {
        q: "كيف أصبح الأول في {city}؟",
        a: "ضع رابطك أو معرّفك على {city} وادفع سنتًا واحدًا فوق القيمة المتآكلة للمتصدر الحالي. تلك القيمة تنخفض كل ساعة، فكلما انتظر المتصدر صارت القمة أرخص.",
      },
      {
        q: "كم يكلف المركز الأول في {city}؟",
        a: "قيمة المتصدر الحالي بعد التآكل زائد سنت. وإن لم يملك أحد {city} بعد، فالحد الأدنى 5 دولارات.",
      },
      {
        q: "كم أبقى أول في {city}؟",
        a: "حتى يدفع أحدهم أكثر، أو حتى تتآكل دفعتك تحت دفعته. كل دفعة تفقد 10% يوميًا، فالاحتفاظ بـ {city} يعني الإضافة لا الدفع مرة واحدة.",
      },
      {
        q: "ماذا أستطيع أن أضع على {city}؟",
        a: "حساب X أو TikTok أو Instagram أو LinkedIn، أو أي موقع تملكه. لا حساب ولا بريد إلكتروني مطلوب.",
      },
    ],
  },

  vi: {
    navGlobe: "Quả cầu",
    navBoard: "Bảng thế giới",
    metaTitle: "outbid.love — bảng xếp hạng thành phố của cả thế giới",
    metaDesc:
      "Mỗi thành phố đều có một vị trí số 1. Đặt X, TikTok, Instagram, LinkedIn hoặc link của riêng bạn lên một thành phố và trả tiền để ngồi trên đỉnh. Mỗi khoản thanh toán hao mòn 10% mỗi ngày, nên đỉnh luôn có thể giành được.",
    h1: "Mỗi thành phố có một số 1. Giành lấy thành phố của bạn.",
    lede:
      "Đặt X, TikTok, Instagram, LinkedIn — hoặc bất kỳ link nào của bạn — lên một thành phố. Khoản thanh toán lớn nhất ở thành phố đó ngồi trên cùng. Mỗi khoản <strong>hao mòn {pct}% mỗi ngày</strong>, nên không ai giữ một thành phố mãi mãi.",
    statCities: "thành phố đang tranh",
    statProfiles: "hồ sơ đã lên bảng",
    statLive: "đang cháy trên bản đồ",
    leagueH2: "Giải đấu thành phố",
    leagueSub:
      "Xếp theo tất cả những gì còn đang cháy ở mỗi thành phố — sôi động nhất ở trên, yên ắng nhất ở dưới.",
    stepsH2: "Cách hoạt động",
    steps: [
      "Tìm thành phố của bạn. Tìm kiếm hoặc bấm trên quả cầu. Cả {n} thành phố đều mở và phần lớn chưa có số 1.",
      "Đặt hồ sơ của bạn lên đó. Một @tài khoản, một link mạng xã hội, hoặc website của bạn. Không tài khoản, không email.",
      "Trả đúng giá trị mà vị trí đó đáng với bạn. Khoản còn sống lớn nhất ở thành phố đó là số 1 — và chính thành phố cũng leo bảng thế giới khi người của nó chi tiền.",
      "Nhìn nó cháy dần. Mỗi khoản mất {pct}% giá trị mỗi ngày. {a} còn {b} sau một tuần. Thứ hạng là chi phí duy trì, không phải một lần mua.",
    ],
    cityMetaTitle: "Ai đang là số 1 ở {city}?",
    cityMetaDesc:
      "Bảng xếp hạng trực tiếp của {city}, {country}. Đặt X, TikTok, Instagram, LinkedIn hoặc link của bạn lên {city} và chiếm đỉnh — mỗi khoản thanh toán hao mòn 10% mỗi ngày, nên số 1 luôn giành được.",
    cityLede: "Chiếm đỉnh {city} lúc này tốn <strong>{price}</strong>, và con số giảm từng giờ.",
    cityLedeEmpty: "Chưa ai giữ {city}. <strong>Vị trí số 1 giá {price}.</strong>",
    cityBoardEmpty: "{city} đang trống. Khoản thanh toán đầu tiên sở hữu thành phố này.",
    cityLeagueRank: "hạng {rank} bảng thế giới",
    cityUnranked: "chưa vào bảng thế giới",
    cityIntro:
      "{city} là một trong {n} thành phố trên outbid.love, bảng xếp hạng nơi vị trí được mua chứ không phải bầu chọn. Ai có khoản thanh toán còn sống lớn nhất trên {city} sẽ ngồi trên đỉnh, và mỗi khoản mất {pct}% giá trị mỗi ngày — nên giá của vị trí số 1 tại {city} giảm liên tục cho tới khi có người nạp thêm. Mức tối thiểu là {min}, không cần tạo tài khoản, và thành phố cũng leo bảng thế giới khi người của nó chi tiền.",
    cityTakeBtn: "Giành {city} →",
    cityAll: "← Tất cả thành phố",
    boardTitle: "Bảng thế giới — mọi mục, mọi thành phố",
    boardDesc:
      "Bảng xếp hạng toàn cầu qua tất cả thành phố. Mỗi khoản hao mòn 10% mỗi ngày, nên thứ tự đổi cả khi không ai đặt giá.",
    cityFaq: [
      {
        q: "Làm sao để thành số 1 ở {city}?",
        a: "Đặt link hoặc @tài khoản của bạn lên {city} và trả nhiều hơn giá trị đã hao mòn của người dẫn đầu một xu. Giá trị đó giảm từng giờ, nên người dẫn đầu càng chờ thì đỉnh càng rẻ.",
      },
      {
        q: "Vị trí số 1 ở {city} giá bao nhiêu?",
        a: "Bằng giá trị đã hao mòn của người dẫn đầu cộng một xu. Nếu chưa ai giữ {city}, giá là mức tối thiểu 5 đô.",
      },
      {
        q: "Tôi giữ số 1 ở {city} được bao lâu?",
        a: "Cho đến khi ai đó trả nhiều hơn, hoặc khoản của bạn hao mòn xuống dưới khoản của họ. Mỗi khoản mất 10% mỗi ngày, nên giữ {city} là nạp thêm chứ không phải trả một lần.",
      },
      {
        q: "Tôi được đặt gì lên {city}?",
        a: "Hồ sơ X, TikTok, Instagram hay LinkedIn, hoặc bất kỳ website nào của bạn. Không cần tài khoản, không cần email.",
      },
    ],
  },

  th: {
    navGlobe: "ลูกโลก",
    navBoard: "กระดานโลก",
    metaTitle: "outbid.love — กระดานอันดับเมืองทั่วโลก",
    metaDesc:
      "ทุกเมืองบนโลกมีอันดับ 1 ของตัวเอง วาง X, TikTok, Instagram, LinkedIn หรือลิงก์ของคุณลงบนเมืองแล้วจ่ายเพื่อนั่งบนยอด ทุกการจ่ายเสื่อมค่าวันละ 10% ยอดจึงชิงได้เสมอ",
    h1: "ทุกเมืองมีอันดับ 1 ไปเอาเมืองของคุณ",
    lede:
      "วาง X, TikTok, Instagram, LinkedIn — หรือลิงก์ใดก็ได้ที่เป็นของคุณ — ลงบนเมือง ยอดจ่ายที่ใหญ่ที่สุดในเมืองนั้นนั่งอยู่บนสุด ทุกการจ่าย<strong>เสื่อมค่าวันละ {pct}%</strong> จึงไม่มีใครถือเมืองไว้ได้ตลอดไป",
    statCities: "เมืองกำลังแข่ง",
    statProfiles: "โปรไฟล์บนกระดาน",
    statLive: "ยังเผาไหม้บนแผนที่",
    leagueH2: "ลีกเมือง",
    leagueSub: "เรียงตามยอดที่ยังเผาไหม้อยู่ในแต่ละเมือง — คึกคักที่สุดอยู่บน เงียบที่สุดอยู่ล่าง",
    stepsH2: "วิธีทำงาน",
    steps: [
      "หาเมืองของคุณ ค้นหาหรือคลิกบนลูกโลก ทั้ง {n} เมืองเปิดหมด และส่วนใหญ่ยังไม่มีอันดับ 1",
      "วางโปรไฟล์ของคุณลงไป @บัญชี ลิงก์โซเชียล หรือเว็บไซต์ของคุณเอง ไม่ต้องมีบัญชี ไม่ต้องใช้อีเมล",
      "จ่ายเท่าที่ตำแหน่งนั้นมีค่าสำหรับคุณ ยอดที่ยังมีผลสูงสุดในเมืองนั้นคืออันดับ 1 — และเมืองเองก็ไต่ลีกโลกตามการใช้จ่ายของคนในเมือง",
      "ดูมันเผาไหม้ ทุกการจ่ายเสียมูลค่าวันละ {pct}% {a} เหลือ {b} หลังหนึ่งสัปดาห์ อันดับคือค่าใช้จ่ายต่อเนื่อง ไม่ใช่การซื้อขาด",
    ],
    cityMetaTitle: "ใครคืออันดับ 1 ใน {city}",
    cityMetaDesc:
      "กระดานอันดับสดของ {city} ประเทศ{country} วาง X, TikTok, Instagram, LinkedIn หรือลิงก์ของคุณบน {city} แล้วยึดยอด — ทุกการจ่ายเสื่อมค่าวันละ 10% อันดับ 1 จึงชิงได้เสมอ",
    cityLede: "ยึดยอดของ {city} ตอนนี้ต้องใช้ <strong>{price}</strong> และลดลงทุกชั่วโมง",
    cityLedeEmpty: "ยังไม่มีใครถือ {city} <strong>อันดับ 1 ราคา {price}</strong>",
    cityBoardEmpty: "{city} ยังว่าง ยอดจ่ายแรกได้ครองเมืองนี้",
    cityLeagueRank: "อันดับ {rank} ของลีกโลก",
    cityUnranked: "ยังไม่ติดลีกโลก",
    cityIntro:
      "{city} เป็นหนึ่งใน {n} เมืองบน outbid.love กระดานอันดับที่ตำแหน่งซื้อได้ ไม่ใช่โหวต ใครมียอดจ่ายที่ยังมีผลสูงสุดบน {city} คนนั้นนั่งบนสุด และทุกการจ่ายเสียมูลค่าวันละ {pct}% — ราคาอันดับ 1 ของ {city} จึงลดลงเรื่อย ๆ จนกว่าจะมีคนเติม ขั้นต่ำคือ {min} ไม่ต้องสมัครบัญชี และเมืองก็ไต่ลีกโลกตามการใช้จ่ายของคนในเมือง",
    cityTakeBtn: "ยึด {city} →",
    cityAll: "← ทุกเมือง",
    boardTitle: "กระดานโลก — ทุกรายการ ทุกเมือง",
    boardDesc: "อันดับรวมข้ามทุกเมือง ทุกการจ่ายเสื่อมค่าวันละ 10% ลำดับจึงเปลี่ยนแม้ไม่มีใครประมูล",
    cityFaq: [
      {
        q: "จะเป็นอันดับ 1 ใน {city} ได้อย่างไร",
        a: "วางลิงก์หรือ @บัญชีของคุณบน {city} แล้วจ่ายมากกว่ามูลค่าหลังเสื่อมค่าของผู้นำปัจจุบันหนึ่งเซนต์ มูลค่านั้นลดลงทุกชั่วโมง ผู้นำยิ่งรอ ยอดยิ่งถูก",
      },
      {
        q: "อันดับ 1 ใน {city} ราคาเท่าไร",
        a: "เท่ากับมูลค่าหลังเสื่อมค่าของผู้นำปัจจุบันบวกหนึ่งเซนต์ ถ้ายังไม่มีใครถือ {city} ก็เท่ากับขั้นต่ำ 5 ดอลลาร์",
      },
      {
        q: "อยู่อันดับ 1 ใน {city} ได้นานแค่ไหน",
        a: "จนกว่าจะมีคนจ่ายมากกว่า หรือยอดของคุณเสื่อมค่าลงต่ำกว่าของเขา ทุกยอดลดวันละ 10% การรักษา {city} จึงต้องเติม ไม่ใช่จ่ายครั้งเดียว",
      },
      {
        q: "วางอะไรบน {city} ได้บ้าง",
        a: "โปรไฟล์ X, TikTok, Instagram หรือ LinkedIn หรือเว็บไซต์ใดก็ได้ที่เป็นของคุณ ไม่ต้องมีบัญชีและไม่ต้องใช้อีเมล",
      },
    ],
  },

  it: {
    navGlobe: "Globo",
    navBoard: "Classifica mondiale",
    metaTitle: "outbid.love — la classifica delle città del mondo",
    metaDesc:
      "Ogni città ha un numero uno. Metti il tuo X, TikTok, Instagram, LinkedIn o il tuo link su una città e paga per sederti in cima. Ogni pagamento si deprezza del 10% al giorno, quindi la vetta si può sempre conquistare.",
    h1: "Ogni città ha un numero uno. Prenditi la tua.",
    lede:
      "Metti il tuo X, TikTok, Instagram, LinkedIn — o qualsiasi link tuo — su una città. Il pagamento più alto di quella città sta in cima. Ogni pagamento <strong>si deprezza del {pct}% al giorno</strong>, quindi nessuno tiene una città per sempre.",
    statCities: "città in gioco",
    statProfiles: "profili in classifica",
    statLive: "vivo sulla mappa",
    leagueH2: "La lega delle città",
    leagueSub:
      "Ordinate per tutto quello che brucia ancora in ogni città: le più vivaci in alto, le più tranquille in basso.",
    stepsH2: "Come funziona",
    steps: [
      "Trova la tua città. Cercala o cliccala sul globo. Tutte le {n} città sono aperte e la maggior parte non ha ancora un numero uno.",
      "Mettici il tuo profilo. Un @handle, un link social o il tuo sito. Senza account e senza email.",
      "Paga quanto vale per te quel posto. La somma viva più alta di quella città è il numero uno — e la città stessa sale nella lega mondiale man mano che la sua gente spende.",
      "Guardalo bruciare. Ogni pagamento perde il {pct}% del valore al giorno. {a} valgono {b} dopo una settimana. La posizione è una spesa corrente, non un acquisto.",
    ],
    cityMetaTitle: "Chi è il numero uno a {city}?",
    cityMetaDesc:
      "La classifica in tempo reale di {city}, {country}. Metti il tuo X, TikTok, Instagram, LinkedIn o il tuo link su {city} e prenditi la vetta — ogni pagamento si deprezza del 10% al giorno, quindi il primo posto è sempre conquistabile.",
    cityLede: "Prendersi la vetta di {city} costa ora <strong>{price}</strong>, e cala di ora in ora.",
    cityLedeEmpty: "{city} non la tiene ancora nessuno. <strong>Il primo posto costa {price}.</strong>",
    cityBoardEmpty: "{city} è vuota. Il primo pagamento si prende la città.",
    cityLeagueRank: "n°{rank} nella lega mondiale",
    cityUnranked: "non ancora nella lega mondiale",
    cityIntro:
      "{city} è una delle {n} città di outbid.love, una classifica in cui il posto si compra invece di votarlo. Chi ha il pagamento vivo più alto su {city} sta in cima, e ogni pagamento perde il {pct}% del valore al giorno: il prezzo del primo posto a {city} scende quindi di continuo finché qualcuno non ricarica. Il minimo è {min}, non c'è nessun account da creare, e la città sale nella lega mondiale man mano che la sua gente spende.",
    cityTakeBtn: "Prenditi {city} →",
    cityAll: "← Tutte le città",
    boardTitle: "Classifica mondiale — tutte le voci, tutte le città",
    boardDesc:
      "La classifica globale su tutte le città. Ogni pagamento si deprezza del 10% al giorno, quindi l'ordine cambia anche senza nuove offerte.",
    cityFaq: [
      {
        q: "Come divento numero uno a {city}?",
        a: "Metti il tuo link o @handle su {city} e paga un centesimo in più del valore deprezzato di chi guida. Quel valore scende ogni ora: più il leader aspetta, meno costa la vetta.",
      },
      {
        q: "Quanto costa il primo posto a {city}?",
        a: "Il valore deprezzato del leader attuale più un centesimo. Se {city} non la tiene ancora nessuno, costa il minimo di 5 $.",
      },
      {
        q: "Quanto resto numero uno a {city}?",
        a: "Finché qualcuno non paga di più, o finché il tuo pagamento non si deprezza sotto il suo. Ogni pagamento perde il 10% al giorno: tenere {city} significa ricaricare, non pagare una volta.",
      },
      {
        q: "Cosa posso mettere su {city}?",
        a: "Un profilo X, TikTok, Instagram o LinkedIn, o qualsiasi sito che sia tuo. Non servono né account né email.",
      },
    ],
  },

  pl: {
    navGlobe: "Globus",
    navBoard: "Tablica świata",
    metaTitle: "outbid.love — ranking miast całego świata",
    metaDesc:
      "Każde miasto ma swoje pierwsze miejsce. Umieść swój X, TikTok, Instagram, LinkedIn albo własny link na mieście i zapłać, by usiąść na szczycie. Każda płatność traci 10% dziennie, więc szczyt zawsze da się zdobyć.",
    h1: "Każde miasto ma swoją jedynkę. Weź swoją.",
    lede:
      "Umieść swój X, TikTok, Instagram, LinkedIn — albo dowolny swój link — na mieście. Największa płatność w tym mieście siedzi na jego szczycie. Każda płatność <strong>traci {pct}% dziennie</strong>, więc nikt nie trzyma miasta wiecznie.",
    statCities: "miast w grze",
    statProfiles: "wystawionych profili",
    statLive: "żyje na mapie",
    leagueH2: "Liga miast",
    leagueSub:
      "Uszeregowane według wszystkiego, co jeszcze płonie w każdym mieście — najbardziej ruchliwe na górze, najcichsze na dole.",
    stepsH2: "Jak to działa",
    steps: [
      "Znajdź swoje miasto. Wyszukaj je albo kliknij na globusie. Wszystkie {n} miast są otwarte, a większość nie ma jeszcze jedynki.",
      "Umieść na nim swój profil. @nazwa, link do social mediów albo własna strona. Bez konta, bez e-maila.",
      "Zapłać tyle, ile to miejsce jest dla ciebie warte. Największa żywa kwota w mieście to pierwsze miejsce — a samo miasto pnie się w lidze świata, im więcej wydają jego ludzie.",
      "Patrz, jak się wypala. Każda płatność traci {pct}% wartości dziennie. {a} po tygodniu jest warte {b}. Pozycja to koszt bieżący, a nie zakup.",
    ],
    cityMetaTitle: "Kto jest numerem jeden w mieście {city}?",
    cityMetaDesc:
      "Ranking miasta {city} ({country}) na żywo. Umieść swój X, TikTok, Instagram, LinkedIn albo własny link na mieście {city} i zajmij szczyt — każda płatność traci 10% dziennie, więc pierwsze miejsce zawsze da się zdobyć.",
    cityLede: "Zajęcie szczytu miasta {city} kosztuje teraz <strong>{price}</strong> i spada co godzinę.",
    cityLedeEmpty: "Nikt jeszcze nie trzyma miasta {city}. <strong>Pierwsze miejsce kosztuje {price}.</strong>",
    cityBoardEmpty: "{city} jest puste. Pierwsza płatność bierze to miasto.",
    cityLeagueRank: "{rank}. miejsce w lidze świata",
    cityUnranked: "jeszcze poza ligą świata",
    cityIntro:
      "{city} to jedno z {n} miast na outbid.love — rankingu, w którym miejsce się kupuje, a nie wybiera głosowaniem. Kto ma największą żywą płatność na mieście {city}, siedzi na jego szczycie, a każda płatność traci {pct}% wartości dziennie — więc cena pierwszego miejsca w mieście {city} spada nieprzerwanie, dopóki ktoś nie dołoży. Minimum to {min}, nie ma konta do zakładania, a miasto pnie się w lidze świata wraz z wydatkami swoich ludzi.",
    cityTakeBtn: "Weź {city} →",
    cityAll: "← Wszystkie miasta",
    boardTitle: "Tablica świata — wszystkie wpisy, wszystkie miasta",
    boardDesc:
      "Globalny ranking ze wszystkich miast. Każda płatność traci 10% dziennie, więc kolejność zmienia się nawet bez nowych ofert.",
    cityFaq: [
      {
        q: "Jak zostać numerem jeden w mieście {city}?",
        a: "Umieść swój link lub @nazwę na mieście {city} i zapłać o jednego centa więcej niż zdeprecjonowana wartość obecnego lidera. Ta wartość spada co godzinę, więc im dłużej lider czeka, tym tańszy jest szczyt.",
      },
      {
        q: "Ile kosztuje pierwsze miejsce w mieście {city}?",
        a: "Zdeprecjonowana wartość obecnego lidera plus jeden cent. Jeśli nikt jeszcze nie trzyma miasta {city}, kosztuje minimalne 5 $.",
      },
      {
        q: "Jak długo utrzymam pierwsze miejsce w mieście {city}?",
        a: "Dopóki ktoś nie zapłaci więcej albo twoja własna płatność nie spadnie poniżej jego. Każda płatność traci 10% dziennie, więc utrzymanie miasta {city} to dokładanie, a nie jednorazowa opłata.",
      },
      {
        q: "Co mogę umieścić na mieście {city}?",
        a: "Profil X, TikTok, Instagram lub LinkedIn albo dowolną stronę, którą posiadasz. Konto ani e-mail nie są potrzebne.",
      },
    ],
  },

  uk: {
    navGlobe: "Глобус",
    navBoard: "Світова дошка",
    metaTitle: "outbid.love — міський рейтинг усього світу",
    metaDesc:
      "У кожного міста є своє перше місце. Розмістіть свій X, TikTok, Instagram, LinkedIn або власне посилання на місті й заплатіть, щоб опинитися на вершині. Кожен платіж згоряє на 10% щодня, тож вершину завжди можна відібрати.",
    h1: "У кожного міста є свій №1. Займіть своє.",
    lede:
      "Розмістіть свій X, TikTok, Instagram, LinkedIn — або будь-яке своє посилання — на місті. На вершині міста стоїть найбільший платіж. Кожен платіж <strong>згоряє на {pct}% щодня</strong>, тож ніхто не тримає місто вічно.",
    statCities: "міст у грі",
    statProfiles: "розміщених профілів",
    statLive: "горить на карті",
    leagueH2: "Ліга міст",
    leagueSub:
      "Рейтинг за всім, що ще горить у кожному місті, — найактивніші вгорі, найтихіші внизу.",
    stepsH2: "Як це працює",
    steps: [
      "Знайдіть своє місто. Через пошук або кліком по глобусу. Відкриті всі {n} міст — у більшості ще немає свого №1.",
      "Розмістіть профіль. @акаунт, посилання на соцмережу або власний сайт. Без реєстрації та пошти.",
      "Заплатіть стільки, скільки місце для вас варте. Найбільша жива сума в місті — це №1, а саме місто піднімається у світовій лізі в міру витрат його людей.",
      "Дивіться, як воно згоряє. Кожен платіж втрачає {pct}% вартості на добу. {a} через тиждень коштує {b}. Місце — це поточна витрата, а не покупка.",
    ],
    cityMetaTitle: "Хто №1 у місті {city}?",
    cityMetaDesc:
      "Живий рейтинг міста {city} ({country}). Розмістіть свій X, TikTok, Instagram, LinkedIn або власне посилання на {city} і займіть вершину — кожен платіж згоряє на 10% щодня, тож перше місце завжди досяжне.",
    cityLede: "Зайняти вершину міста {city} зараз коштує <strong>{price}</strong>, і ціна падає щогодини.",
    cityLedeEmpty: "Місто {city} ще ніхто не зайняв. <strong>Перше місце коштує {price}.</strong>",
    cityBoardEmpty: "У місті {city} порожньо. Перший платіж забирає місто.",
    cityLeagueRank: "№{rank} у світовій лізі",
    cityUnranked: "ще не у світовій лізі",
    cityIntro:
      "{city} — одне з {n} міст на outbid.love, рейтингу, де місце купують, а не обирають голосуванням. На вершині міста стоїть той, чий живий платіж найбільший, і кожен платіж втрачає {pct}% вартості на добу — тому ціна першого місця в місті {city} падає безперервно, доки хтось не поповнить. Мінімум — {min}, реєстрація не потрібна, а місто піднімається у світовій лізі в міру витрат своїх людей.",
    cityTakeBtn: "Зайняти {city} →",
    cityAll: "← Усі міста",
    boardTitle: "Світова дошка — усі розміщення, усі міста",
    boardDesc:
      "Загальний рейтинг за всіма містами. Кожен платіж згоряє на 10% щодня, тож порядок змінюється навіть без нових ставок.",
    cityFaq: [
      {
        q: "Як стати №1 у місті {city}?",
        a: "Розмістіть своє посилання чи @акаунт на місті {city} і заплатіть на один цент більше за згорілу вартість поточного лідера. Ця величина падає щогодини, тож чим довше лідер чекає, тим дешевша вершина.",
      },
      {
        q: "Скільки коштує перше місце в місті {city}?",
        a: "Стільки, скільки зараз коштує лідер після згоряння, плюс цент. Якщо місто {city} ще ніхто не зайняв, перше місце коштує мінімальні $5.",
      },
      {
        q: "Скільки я протримаюся №1 у місті {city}?",
        a: "Доки хтось не заплатить більше або доки ваш платіж не згорить нижче чужого. Кожен платіж втрачає 10% на добу, тож утримання міста {city} — це поповнення, а не разова оплата.",
      },
      {
        q: "Що можна розмістити на місті {city}?",
        a: "Профіль X, TikTok, Instagram чи LinkedIn або будь-який сайт, яким ви володієте. Реєстрація й пошта не потрібні.",
      },
    ],
  },
};
