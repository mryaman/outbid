import type { Dict } from "../types";

export const pt: Dict = {
  metaTitle: "outbid.love — o ranking pago em que cada lance perde 10% por dia",
  metaDesc:
    "Dê o lance que quiser para colocar seu site ou perfil do X num ranking público. Cada lance perde 10% do valor por dia, então ninguém fica em 1º para sempre. A partir de US$ 5, sem cadastro e sem anúncios.",
  keywords: [
    "ranking pago",
    "leilão de posição no ranking",
    "alternativa ao outbid.lol",
    "comprar primeiro lugar ranking",
    "divulgar site sem anúncios",
    "mercado de atenção",
    "leaderboard de lances",
    "divulgar startup",
    "diretório de produtos pago",
    "dar lance maior ranking",
  ],

  nav: {
    board: "Ranking",
    categories: "Categorias",
    how: "Como funciona",
    faq: "Dúvidas",
    about: "Sobre",
    rules: "Regras",
  },

  h1: "O primeiro lugar sempre dá para tomar.",
  lede:
    "Sua posição é exatamente o que você pagou — mas todo pagamento <strong>perde {pct}% por dia</strong>. Ninguém fica no topo para sempre, e o ranking nunca congela.",

  intro: [
    "outbid.love é um ranking em que a posição se compra: você dá um lance em dinheiro pelo seu site, produto ou perfil do X, e o seu lugar é decidido apenas pelo valor pago. Não há algoritmo, curadoria editorial, leilão de anúncios nem cadastro.",
    "A diferença para qualquer outro quadro de lances é a depreciação. Cada pagamento perde {pct}% do valor por dia a partir da confirmação, então o lance é aluguel e não propriedade. Uma posição comprada hoje vale menos da metade daqui a uma semana — por isso o 1º lugar é permanentemente disputável e quem chega com pouco orçamento sempre pode ultrapassar quem pagou uma vez e sumiu.",
    "Os lances começam em {min}. Cada entrada leva para o seu site, os cliques de saída são contados publicamente e cada categoria tem o próprio ranking — um nicho vazio se conquista com o lance mínimo.",
  ],

  bidPill: "Lances abertos",
  bidBody:
    "Coloque seu link no quadro — ou dê um lance maior que o de cima. Você paga exatamente o que der de lance, uma única vez.",
  bidFine: "O site do seu produto ou seu perfil do X. Sem cadastro nem e-mail — pagamento com cartão via Shopier.",

  formLinkPlaceholder: "seusite.com ou @seuperfil",
  formSubmit: "Dar lance maior →",
  formFine:
    "Mínimo {min}. Agora o 1º lugar sai por {top}. Pagamento com cartão via Shopier (cobrado em liras turcas pela cotação do momento) — seu lance entra no ranking assim que o pagamento é confirmado e passa a se depreciar como todos os outros.",

  boardTitle: "Ranking",
  boardEmpty: "O quadro está vazio. Fique com o primeiro lugar.",

  decayH2: "Como funciona a depreciação",
  decayP:
    "Todo pagamento perde {pct}% do valor por dia, contado a partir do momento em que foi feito. {a} viram {b} depois de uma semana e {c} depois de duas. Quando uma entrada cai abaixo de {drop}, ela sai do quadro.",
  decayFine:
    "É esse o produto inteiro. Posição é despesa corrente, não compra — e é por isso que o 1º lugar nunca fica fora de alcance.",

  howH2: "Como chegar ao 1º lugar",
  howSteps: [
    "Escolha o que vai divulgar: a URL de um produto ou um perfil do X. Sem cadastro, sem e-mail.",
    "Veja o lance mais alto no momento. Um centavo a mais já basta para assumir a liderança agora.",
    "Pague com cartão. Seu lance aparece no quadro assim que o pagamento é confirmado.",
    "Volte e reforce. Como o lance perde {pct}% por dia, segurar o 1º lugar custa um pouco todo dia em vez de muito de uma vez.",
  ],

  faqH2: "Perguntas frequentes",
  faq: [
    {
      q: "O que é o outbid.love?",
      a: "outbid.love é um ranking público em que a posição é paga. Você dá um lance para listar um site ou perfil do X, e a sua posição equivale ao dinheiro pago. Diferente de outros quadros de lances, cada lance perde 10% por dia, então o ranking muda o tempo todo e o 1º lugar sempre pode ser tomado.",
    },
    {
      q: "Como funciona exatamente a perda de 10% ao dia?",
      a: "A partir da confirmação do pagamento, o valor efetivo do lance é multiplicado por 0,9 a cada dia que passa. Um lance de US$ 100 vale cerca de US$ 47,83 depois de sete dias e cerca de US$ 22,88 depois de catorze. Abaixo de US$ 1 a entrada sai completamente do quadro.",
    },
    {
      q: "Quanto custa chegar ao 1º lugar?",
      a: "Exatamente um centavo a mais que o valor já depreciado do líder atual — e esse valor cai a cada hora. O lance mínimo é US$ 5, então com o quadro vazio ou uma categoria livre o 1º lugar custa US$ 5.",
    },
    {
      q: "É a mesma coisa que o outbid.lol?",
      a: "Não. A ideia de ranking pago é a mesma, mas no outbid.lol o lance é permanente: quem paga mais uma vez fica com a posição indefinidamente. No outbid.love cada lance perde 10% por dia, o que transforma o topo numa disputa recorrente em vez de uma compra única.",
    },
    {
      q: "Preciso de conta ou e-mail?",
      a: "Não. Sem cadastro, sem login, sem e-mail. Você informa um link, escolhe um valor, paga com cartão e a entrada aparece.",
    },
    {
      q: "Como e em qual moeda é o pagamento?",
      a: "Com cartão, via Shopier. Os lances são exibidos em dólares e cobrados em liras turcas pela cotação do momento. O lance entra automaticamente assim que o pagamento é confirmado.",
    },
    {
      q: "Quanto tempo dura um lance?",
      a: "Até se depreciar abaixo de US$ 1. Um lance de US$ 5 dura cerca de duas semanas; um de US$ 100, cerca de seis semanas. Você pode reforçar a entrada a qualquer momento.",
    },
    {
      q: "Alguém pode comprar o 1º lugar para sempre?",
      a: "Não, e é justamente esse o objetivo da regra de depreciação. Um pagamento grande compra uma posição forte por alguns dias, mas ela se desgasta sozinha — segurar o topo exige pagar de novo.",
    },
    {
      q: "O que posso listar?",
      a: "O site de um produto ou empresa, ou um perfil do X (Twitter). Encurtadores de link, convites e links de mensageiros são bloqueados, e as entradas são moderadas conforme as regras publicadas.",
    },
    {
      q: "Ganho um backlink de SEO?",
      a: "Não — os links de saída são nofollow e passam por redirecionamento. O que a entrada dá é tráfego real e visibilidade, com a contagem de cliques exibida publicamente em cada linha.",
    },
    {
      q: "Posso impulsionar a entrada de outra pessoa?",
      a: "Pode. Qualquer entrada pode ser reforçada por qualquer um, então dá para fortalecer a sua ou presentear com um impulso um projeto de que você goste.",
    },
    {
      q: "Quais categorias existem?",
      a: "Vinte e sete, de agentes de IA e ferramentas para desenvolvedores a e-commerce, vagas, games e imóveis. Cada categoria tem o próprio ranking, e uma categoria livre sai pelo mínimo de US$ 5.",
    },
  ],

  catsH2: "Categorias",
  catsLede:
    "Cada categoria tem o próprio ranking. Escolha a sua — numa categoria vazia, <strong>o 1º lugar custa o lance mínimo</strong>.",
  catsAll: "Todas as categorias",
  catUnclaimed: "Livre — seja o primeiro",
  catListings: "{n} entradas",
  catTopIs: "1º lugar é {title} com {amt}",
  catTitle: "Ranking de {name}",
  catMetaDesc:
    "Quem lidera {name} agora? Dê o lance que quiser para assumir o topo — cada lance perde 10% por dia, então o 1º lugar sempre dá para tomar.",
  catHeroWith: "{n} entradas — assumir o 1º lugar custa <strong>{price}</strong> agora, e cai a cada hora.",
  catHeroEmpty: "Ninguém reivindicou esta categoria ainda. <strong>O 1º lugar custa {price}.</strong>",
  catEmpty: "Vazia. O primeiro lance leva a categoria.",

  vsH2: "Por que depreciação é melhor que lance permanente",
  vsP:
    "Rankings de lance permanente morrem sempre do mesmo jeito: alguém com bolso fundo estaciona no 1º lugar e o resto para de jogar. A depreciação elimina esse final. Toda posição é temporária, a virada é barata e o quadro continua se mexendo mesmo sem gente nova.",

  footer: {
    rules: "Regras",
    pricing: "Preços",
    terms: "Termos",
    privacy: "Privacidade",
    refunds: "Reembolsos",
    traffic: "Tráfego ao vivo",
    listings: "{n} entradas",
    back: "← Voltar ao ranking",
  },

  langLabel: "Idioma",
  translatedNote:
    "Esta é a edição em português. O ranking em si é global — lances de qualquer país disputam o mesmo quadro.",

  cats: {
    "ai-agents": "Agentes de IA e infraestrutura",
    "ai-media": "Geração de mídia com IA",
    marketing: "Marketing e publicidade",
    "dev-tools": "Ferramentas para desenvolvedores",
    productivity: "Produtividade e ferramentas pessoais",
    people: "Pessoas e perfis",
    design: "Design e criação",
    seo: "SEO e visibilidade em IA",
    social: "Redes sociais e ferramentas de criadores",
    writing: "Escrita e conteúdo",
    sales: "Vendas e geração de leads",
    business: "Negócios, finanças e jurídico",
    games: "Games e entretenimento",
    education: "Educação e aprendizado",
    health: "Saúde, fitness e bem-estar",
    ecommerce: "E-commerce e varejo",
    directories: "Diretórios, lançamentos e descoberta",
    hiring: "Vagas, recrutamento e carreira",
    audio: "Áudio, voz e podcast",
    agencies: "Agências, estúdios e serviços",
    security: "Segurança, privacidade e conformidade",
    travel: "Viagem, local e estilo de vida",
    media: "Mídia e notícias",
    domains: "Domínios e ativos web",
    leaderboards: "Rankings e mercados de atenção",
    "real-estate": "Imóveis",
    other: "Outros",
  },
};
