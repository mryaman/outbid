import type { Dict } from "../types";

export const en: Dict = {
  metaTitle: "outbid.love — the pay-to-rank leaderboard where every bid decays 10% a day",
  metaDesc:
    "Bid any amount to rank your website or X handle on a public leaderboard. Every bid loses 10% of its value per day, so nobody owns #1 forever. From $5, no account, no ads.",
  keywords: [
    "pay to rank leaderboard",
    "outbid.lol alternative",
    "decaying leaderboard",
    "bid for the top spot",
    "buy the number one spot website",
    "attention market",
    "advertise your website without ads",
    "highest bidder ranking site",
    "paid ranking leaderboard",
    "promote your startup link",
  ],

  nav: {
    board: "Leaderboard",
    categories: "Categories",
    how: "How it works",
    faq: "FAQ",
    about: "About",
    rules: "Rules",
  },

  h1: "The top is always winnable.",
  lede:
    "Your rank is whatever you paid — but every payment <strong>decays {pct}% a day</strong>. Nobody sits at the top forever, and the board never freezes.",

  intro: [
    "outbid.love is a pay-to-rank leaderboard: you bid money to place your website, product or X handle in a public ranking, and your position is decided by nothing but the amount you paid. There is no algorithm, no editorial review, no ad auction and no account to create.",
    "The difference from every other bid-for-rank board is decay. Each payment loses {pct}% of its value every day from the moment it clears, so a bid is rent rather than property. A spot bought today is worth less than half as much a week from now, which means the #1 position is permanently contestable and a newcomer with a small budget can always take the top from someone who paid once and walked away.",
    "Bidding starts at {min}. Listings link out to your site, outbound clicks are counted in public, and every category keeps its own ranking — so an empty niche can be claimed for the minimum bid.",
  ],

  bidPill: "Live bidding",
  bidBody:
    "Put your link on the board — or outbid the one above you. You pay exactly what you bid, once.",
  bidFine: "Your product site or your X handle. No account, no email — card checkout via Shopier.",

  formLinkPlaceholder: "yoursite.com or @yourhandle",
  formSubmit: "Outbid →",
  formFine:
    "Min {min}. Take #1 for {top}. Pay by card via Shopier (charged in Turkish lira at the live rate) — your bid goes live the moment the payment clears, then starts decaying like everyone else's.",

  boardTitle: "Leaderboard",
  boardEmpty: "The board is empty. Claim the first spot.",

  decayH2: "How decay works",
  decayP:
    "Every payment loses {pct}% of its value per day, counted from the moment it was made. {a} is worth {b} after a week and {c} after two. Once a listing drops below {drop} it leaves the board.",
  decayFine:
    "This is the whole product. Rank is a running cost, not a purchase — which is why the #1 spot is never out of reach.",

  howH2: "How to get to #1",
  howSteps: [
    "Pick what you are ranking: a product URL or an X handle. No signup, no email.",
    "Check the current top bid on the board. Beating it by one cent is enough to take the lead right now.",
    "Pay by card. Your bid appears on the board as soon as the payment clears.",
    "Come back and top up. Because your bid decays {pct}% a day, holding #1 costs a little every day instead of a lot once.",
  ],

  faqH2: "Frequently asked questions",
  faq: [
    {
      q: "What is outbid.love?",
      a: "outbid.love is a public pay-to-rank leaderboard. You bid money to list a website or X handle, and your rank equals the money you have paid. Unlike other bid-for-rank boards, every bid decays 10% per day, so rankings churn constantly and the #1 spot can always be taken.",
    },
    {
      q: "How does the 10% daily decay work?",
      a: "From the moment your payment clears, the effective value of your bid is multiplied by 0.9 for every day that passes. A $100 bid is worth about $47.83 after seven days and about $22.88 after fourteen. When a listing falls below $1 it drops off the board entirely.",
    },
    {
      q: "How much does it cost to reach #1?",
      a: "Exactly one cent more than the current top listing's decayed value — and that value falls every hour. The minimum bid is $5, so if the board is empty or a category is unclaimed, #1 costs $5.",
    },
    {
      q: "Is outbid.love the same as outbid.lol?",
      a: "No. They share the pay-to-rank idea, but on outbid.lol a bid is permanent, so whoever pays the most once holds the position indefinitely. On outbid.love every bid decays 10% a day, which makes the top spot a recurring contest instead of a one-time purchase.",
    },
    {
      q: "Do I need an account or an email address?",
      a: "No. There is no signup, no login and no email required. You enter a link, choose an amount, pay by card, and the listing appears.",
    },
    {
      q: "How do I pay, and in what currency?",
      a: "By card, through Shopier. Bids are quoted in US dollars and charged in Turkish lira at the live exchange rate. The bid goes live automatically once the payment is confirmed.",
    },
    {
      q: "How long does a bid last?",
      a: "Until it decays below $1. A $5 bid lasts about two weeks; a $100 bid lasts about six weeks before it drops off the board. You can add to a listing at any time to push it back up.",
    },
    {
      q: "Can somebody buy #1 permanently?",
      a: "No. That is the point of the decay rule. A single large payment buys a strong position for a few days, but it erodes automatically, so holding the top means paying repeatedly.",
    },
    {
      q: "What can I list?",
      a: "A product or company website, or an X (Twitter) handle. Link shorteners, invite links and chat-app links are blocked, and listings are moderated against the published rules.",
    },
    {
      q: "Does a listing give me an SEO backlink?",
      a: "No — outbound links are nofollow and pass through a redirect. What a listing gives you is human traffic and visibility, with the outbound click count shown publicly on every row.",
    },
    {
      q: "Can I boost somebody else's listing?",
      a: "Yes. Any listing can be topped up by anyone, so you can boost your own entry or gift a boost to a project you like.",
    },
    {
      q: "Which categories are there?",
      a: "Twenty-seven, from AI agents and developer tools to ecommerce, hiring, games and real estate. Each category has its own leaderboard, and an unclaimed category can be taken for the $5 minimum.",
    },
  ],

  catsH2: "Categories",
  catsLede:
    "Every category has its own ranking. Pick yours — an empty category means <strong>#1 costs the minimum bid</strong>.",
  catsAll: "All categories",
  catUnclaimed: "Unclaimed — be the first",
  catListings: "{n} listings",
  catTopIs: "#1 is {title} at {amt}",
  catTitle: "{name} leaderboard",
  catMetaDesc:
    "Who leads {name} right now? Bid any amount to take the top spot — every bid decays 10% a day, so #1 is always winnable.",
  catHeroWith: "{n} listings — taking #1 costs <strong>{price}</strong> right now, and it drops by the hour.",
  catHeroEmpty: "Nobody has claimed this category yet. <strong>#1 costs {price}.</strong>",
  catEmpty: "Empty. The first bid owns this category.",

  vsH2: "Why decay beats permanent bids",
  vsP:
    "Permanent bid-for-rank boards die the same way: one deep pocket parks at #1 and everyone else stops playing. Decay removes that ending. Every position is temporary, comebacks are cheap, and the board keeps moving whether or not anyone new arrives.",

  footer: {
    rules: "Rules",
    pricing: "Pricing",
    terms: "Terms",
    privacy: "Privacy",
    refunds: "Refunds",
    traffic: "Live traffic",
    listings: "{n} listings",
    back: "← Back to the board",
  },

  langLabel: "Language",
  translatedNote:
    "This page is the English edition. The leaderboard itself is global — bids from any country rank on the same board.",

  cats: {
    "ai-agents": "AI Agents & Infrastructure",
    "ai-media": "AI Media Generation",
    marketing: "Marketing & Advertising",
    "dev-tools": "Developer Tools",
    productivity: "Productivity & Personal Tools",
    people: "People & Profiles",
    design: "Design & Creative",
    seo: "SEO & AI Visibility",
    social: "Social Media & Creator Tools",
    writing: "Writing & Content",
    sales: "Sales & Lead Generation",
    business: "Business, Finance & Legal",
    games: "Games & Entertainment",
    education: "Education & Learning",
    health: "Health, Fitness & Wellness",
    ecommerce: "Ecommerce & Retail",
    directories: "Directories, Launch & Discovery",
    hiring: "Hiring, Jobs & Careers",
    audio: "Audio, Voice & Podcasting",
    agencies: "Agencies, Studios & Services",
    security: "Security, Privacy & Compliance",
    travel: "Travel, Local & Lifestyle",
    media: "Media & News",
    domains: "Domains & Web Assets",
    leaderboards: "Leaderboards & Attention Markets",
    "real-estate": "Real Estate & Property",
    other: "Other",
  },
};
