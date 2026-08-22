import type { Dict } from "../types";

export const fr: Dict = {
  metaTitle: "outbid.love — le classement payant où chaque enchère perd 10% par jour",
  metaDesc:
    "Enchérissez du montant de votre choix pour placer votre site ou votre compte X dans un classement public. Chaque enchère perd 10% de sa valeur par jour : personne ne garde la 1re place pour toujours. À partir de 5 $, sans compte, sans publicité.",
  keywords: [
    "classement payant",
    "enchère référencement site",
    "alternative outbid.lol",
    "acheter la première place classement",
    "promouvoir son site sans publicité",
    "marché de l'attention",
    "leaderboard enchères",
    "promouvoir sa startup",
    "annuaire de produits payant",
    "surenchérir classement",
  ],

  nav: {
    board: "Classement",
    categories: "Catégories",
    how: "Comment ça marche",
    faq: "FAQ",
    about: "À propos",
    rules: "Règles",
  },

  h1: "La première place se reprend toujours.",
  lede:
    "Votre rang, c'est exactement ce que vous avez payé — mais chaque paiement <strong>perd {pct}% par jour</strong>. Personne ne reste au sommet indéfiniment, et le classement ne se fige jamais.",

  intro: [
    "outbid.love est un classement où la place s'achète : vous enchérissez pour votre site, votre produit ou votre compte X, et votre position dépend uniquement de la somme payée. Pas d'algorithme, pas de sélection éditoriale, pas d'enchère publicitaire, pas de compte à créer.",
    "Ce qui le distingue de tous les autres tableaux d'enchères, c'est la dépréciation. Chaque paiement perd {pct}% de sa valeur par jour à partir de sa validation : une enchère est donc un loyer, pas une propriété. Une place achetée aujourd'hui vaut moins de la moitié dans une semaine — la 1re position reste donc contestable en permanence, et un nouveau venu au petit budget peut toujours dépasser celui qui a payé une fois puis disparu.",
    "Les enchères commencent à {min}. Chaque entrée renvoie vers votre site, les clics sortants sont comptés publiquement, et chaque catégorie possède son propre classement : une niche vide se prend au montant minimum.",
  ],

  bidPill: "Enchères ouvertes",
  bidBody:
    "Placez votre lien sur le tableau — ou surenchérissez sur celui juste au-dessus. Vous payez exactement ce que vous enchérissez, une seule fois.",
  bidFine: "Le site de votre produit ou votre compte X. Sans compte ni e-mail — paiement par carte via Shopier.",

  formLinkPlaceholder: "votresite.com ou @votrecompte",
  formSubmit: "Surenchérir →",
  formFine:
    "Minimum {min}. La 1re place coûte {top} en ce moment. Paiement par carte via Shopier (débité en livres turques au taux du jour) — votre enchère apparaît dès la validation du paiement, puis se déprécie comme toutes les autres.",

  boardTitle: "Classement",
  boardEmpty: "Le tableau est vide. Prenez la première place.",

  decayH2: "Comment fonctionne la dépréciation",
  decayP:
    "Chaque paiement perd {pct}% de sa valeur par jour, à compter du moment où il a été effectué. {a} valent {b} après une semaine et {c} après deux. Dès qu'une entrée passe sous {drop}, elle quitte le tableau.",
  decayFine:
    "C'est tout le produit. Un rang est une dépense courante, pas un achat — voilà pourquoi la 1re place n'est jamais hors de portée.",

  howH2: "Comment atteindre la 1re place",
  howSteps: [
    "Choisissez ce que vous placez : l'URL d'un produit ou un compte X. Sans inscription ni e-mail.",
    "Regardez l'enchère la plus haute du moment. Un centime de plus suffit pour prendre la tête immédiatement.",
    "Payez par carte. Votre enchère apparaît dès que le paiement est validé.",
    "Revenez recharger. Comme votre enchère perd {pct}% par jour, garder la 1re place coûte un peu chaque jour plutôt que beaucoup une seule fois.",
  ],

  faqH2: "Questions fréquentes",
  faq: [
    {
      q: "Qu'est-ce que outbid.love ?",
      a: "outbid.love est un classement public où la place s'achète. Vous enchérissez pour référencer un site ou un compte X, et votre rang correspond à la somme payée. Contrairement aux autres tableaux d'enchères, chaque enchère perd 10% par jour : le classement bouge en permanence et la 1re place peut toujours être reprise.",
    },
    {
      q: "Comment fonctionne exactement la dépréciation de 10% par jour ?",
      a: "À partir de la validation du paiement, la valeur effective de votre enchère est multipliée par 0,9 pour chaque jour écoulé. Une enchère de 100 $ vaut environ 47,83 $ au bout de sept jours et environ 22,88 $ au bout de quatorze. Sous 1 $, l'entrée disparaît totalement du tableau.",
    },
    {
      q: "Combien coûte la 1re place ?",
      a: "Exactement un centime de plus que la valeur dépréciée du leader actuel — et cette valeur baisse d'heure en heure. L'enchère minimale est de 5 $, donc si le tableau est vide ou la catégorie libre, la 1re place coûte 5 $.",
    },
    {
      q: "Est-ce la même chose que outbid.lol ?",
      a: "Non. L'idée du classement payant est commune, mais sur outbid.lol l'enchère est définitive : celui qui paie le plus une fois garde la position indéfiniment. Sur outbid.love, chaque enchère perd 10% par jour, ce qui fait du sommet une compétition récurrente plutôt qu'un achat unique.",
    },
    {
      q: "Faut-il un compte ou une adresse e-mail ?",
      a: "Non. Aucune inscription, aucune connexion, aucun e-mail. Vous saisissez un lien, choisissez un montant, payez par carte, et l'entrée apparaît.",
    },
    {
      q: "Comment et dans quelle devise paie-t-on ?",
      a: "Par carte, via Shopier. Les enchères sont affichées en dollars américains et débitées en livres turques au taux en vigueur. L'enchère est activée automatiquement dès confirmation du paiement.",
    },
    {
      q: "Combien de temps dure une enchère ?",
      a: "Jusqu'à ce qu'elle passe sous 1 $. Une enchère de 5 $ tient environ deux semaines, une de 100 $ environ six semaines. Vous pouvez recharger une entrée à tout moment.",
    },
    {
      q: "Quelqu'un peut-il acheter la 1re place pour toujours ?",
      a: "Non, c'est précisément l'objet de la règle de dépréciation. Un gros paiement achète une position forte pour quelques jours, mais elle s'érode automatiquement : tenir le sommet suppose de payer à répétition.",
    },
    {
      q: "Que puis-je référencer ?",
      a: "Le site d'un produit ou d'une entreprise, ou un compte X (Twitter). Les raccourcisseurs de liens, les invitations et les liens de messagerie sont bloqués, et les entrées sont modérées selon les règles publiées.",
    },
    {
      q: "Est-ce que j'obtiens un backlink SEO ?",
      a: "Non — les liens sortants sont en nofollow et passent par une redirection. Une entrée vous apporte du trafic réel et de la visibilité, avec le nombre de clics sortants affiché publiquement sur chaque ligne.",
    },
    {
      q: "Puis-je booster l'entrée de quelqu'un d'autre ?",
      a: "Oui. N'importe qui peut recharger n'importe quelle entrée : renforcez la vôtre ou offrez un coup de pouce à un projet que vous aimez.",
    },
    {
      q: "Quelles catégories existent ?",
      a: "Vingt-sept, des agents IA et outils pour développeurs jusqu'à l'e-commerce, le recrutement, le jeu vidéo et l'immobilier. Chaque catégorie a son propre classement, et une catégorie libre se prend pour 5 $ minimum.",
    },
  ],

  catsH2: "Catégories",
  catsLede:
    "Chaque catégorie a son propre classement. Choisissez la vôtre — dans une catégorie vide, <strong>la 1re place coûte l'enchère minimale</strong>.",
  catsAll: "Toutes les catégories",
  catUnclaimed: "Libre — soyez le premier",
  catListings: "{n} entrées",
  catTopIs: "1re place : {title} à {amt}",
  catTitle: "Classement {name}",
  catMetaDesc:
    "Qui domine {name} en ce moment ? Enchérissez du montant de votre choix pour prendre la tête — chaque enchère perd 10% par jour, la 1re place se reprend donc toujours.",
  catHeroWith: "{n} entrées — prendre la 1re place coûte <strong>{price}</strong> maintenant, et ça baisse d'heure en heure.",
  catHeroEmpty: "Personne n'a encore réclamé cette catégorie. <strong>La 1re place coûte {price}.</strong>",
  catEmpty: "Vide. La première enchère emporte la catégorie.",

  vsH2: "Pourquoi la dépréciation vaut mieux que les enchères définitives",
  vsP:
    "Les classements à enchères définitives meurent toujours de la même façon : un portefeuille profond se gare à la 1re place et tous les autres arrêtent de jouer. La dépréciation supprime cette fin. Toute position est temporaire, revenir coûte peu, et le tableau continue de bouger même sans nouveaux arrivants.",

  footer: {
    rules: "Règles",
    pricing: "Tarifs",
    terms: "Conditions",
    privacy: "Confidentialité",
    refunds: "Remboursements",
    traffic: "Trafic en direct",
    listings: "{n} entrées",
    back: "← Retour au classement",
  },

  langLabel: "Langue",
  translatedNote:
    "Ceci est l'édition française. Le classement lui-même est mondial : les enchères de tous les pays se disputent le même tableau.",

  cats: {
    "ai-agents": "Agents IA & infrastructure",
    "ai-media": "Génération de médias par IA",
    marketing: "Marketing & publicité",
    "dev-tools": "Outils pour développeurs",
    productivity: "Productivité & outils personnels",
    people: "Personnes & profils",
    design: "Design & création",
    seo: "SEO & visibilité IA",
    social: "Réseaux sociaux & outils créateurs",
    writing: "Écriture & contenu",
    sales: "Vente & génération de leads",
    business: "Business, finance & juridique",
    games: "Jeux & divertissement",
    education: "Éducation & apprentissage",
    health: "Santé, forme & bien-être",
    ecommerce: "E-commerce & retail",
    directories: "Annuaires, lancements & découverte",
    hiring: "Recrutement, emplois & carrières",
    audio: "Audio, voix & podcast",
    agencies: "Agences, studios & services",
    security: "Sécurité, vie privée & conformité",
    travel: "Voyage, local & lifestyle",
    media: "Médias & actualités",
    domains: "Noms de domaine & actifs web",
    leaderboards: "Classements & marchés de l'attention",
    "real-estate": "Immobilier",
    other: "Autre",
  },
};
