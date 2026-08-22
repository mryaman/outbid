import type { Dict } from "../types";

export const es: Dict = {
  metaTitle: "outbid.love — el ranking de pago donde cada puja se deprecia un 10% al día",
  metaDesc:
    "Puja lo que quieras para colocar tu web o tu cuenta de X en un ranking público. Cada puja pierde un 10% de su valor cada día, así que nadie se queda con el nº1 para siempre. Desde 5 $, sin cuenta y sin anuncios.",
  keywords: [
    "ranking de pago",
    "subasta de posiciones web",
    "alternativa a outbid.lol",
    "comprar el primer puesto ranking",
    "promocionar tu web sin anuncios",
    "mercado de atención",
    "leaderboard de pujas",
    "posicionar startup",
    "pujar por el top 1",
    "directorio de productos de pago",
  ],

  nav: {
    board: "Ranking",
    categories: "Categorías",
    how: "Cómo funciona",
    faq: "Preguntas",
    about: "Acerca de",
    rules: "Reglas",
  },

  h1: "El nº1 siempre se puede ganar.",
  lede:
    "Tu posición es exactamente lo que pagaste, pero cada pago <strong>se deprecia un {pct}% al día</strong>. Nadie se queda arriba para siempre y el ranking nunca se congela.",

  intro: [
    "outbid.love es un ranking en el que la posición se compra: pujas dinero por tu web, tu producto o tu cuenta de X, y tu puesto lo decide únicamente la cantidad que has pagado. No hay algoritmo, ni criterio editorial, ni subasta publicitaria, ni cuenta que crear.",
    "Lo que lo separa de cualquier otro tablón de pujas es la depreciación. Cada pago pierde un {pct}% de su valor cada día desde el momento en que se confirma, así que una puja es alquiler y no propiedad. Un puesto comprado hoy vale menos de la mitad dentro de una semana: el nº1 es permanentemente disputable y alguien con poco presupuesto siempre puede adelantar a quien pagó una vez y desapareció.",
    "Las pujas empiezan en {min}. Cada entrada enlaza a tu sitio, los clics salientes se cuentan en público y cada categoría tiene su propio ranking, así que un nicho vacío se conquista con la puja mínima.",
  ],

  bidPill: "Pujas abiertas",
  bidBody:
    "Pon tu enlace en el tablón o supera la puja del que está justo encima. Pagas exactamente lo que pujas, una sola vez.",
  bidFine: "La web de tu producto o tu cuenta de X. Sin cuenta ni email: pago con tarjeta vía Shopier.",

  formLinkPlaceholder: "tuweb.com o @tucuenta",
  formSubmit: "Pujar más alto →",
  formFine:
    "Mínimo {min}. Ahora mismo el nº1 cuesta {top}. Pago con tarjeta a través de Shopier (se cobra en liras turcas al cambio del día): tu puja entra en el ranking en cuanto se confirma el pago y empieza a depreciarse como todas las demás.",

  boardTitle: "Ranking",
  boardEmpty: "El tablón está vacío. Reclama el primer puesto.",

  decayH2: "Cómo funciona la depreciación",
  decayP:
    "Cada pago pierde un {pct}% de su valor al día, contado desde el momento en que se hizo. {a} valen {b} al cabo de una semana y {c} al cabo de dos. Cuando una entrada baja de {drop}, desaparece del tablón.",
  decayFine:
    "En eso consiste todo el producto. La posición es un gasto corriente, no una compra, y por eso el nº1 nunca queda fuera de alcance.",

  howH2: "Cómo llegar al nº1",
  howSteps: [
    "Decide qué quieres posicionar: la URL de un producto o una cuenta de X. Sin registro ni email.",
    "Mira la puja más alta actual. Superarla por un céntimo basta para ponerte primero ahora mismo.",
    "Paga con tarjeta. Tu puja aparece en el tablón en cuanto se confirma el pago.",
    "Vuelve y recarga. Como tu puja se deprecia un {pct}% al día, mantener el nº1 cuesta un poco cada día en lugar de mucho una sola vez.",
  ],

  faqH2: "Preguntas frecuentes",
  faq: [
    {
      q: "¿Qué es outbid.love?",
      a: "outbid.love es un ranking público en el que la posición se paga. Pujas dinero para listar una web o una cuenta de X y tu puesto equivale al dinero que has pagado. A diferencia de otros tablones de pujas, cada puja se deprecia un 10% al día, así que el ranking cambia constantemente y el nº1 siempre se puede arrebatar.",
    },
    {
      q: "¿Cómo funciona exactamente la depreciación del 10% diario?",
      a: "Desde que se confirma el pago, el valor efectivo de tu puja se multiplica por 0,9 por cada día transcurrido. Una puja de 100 $ vale unos 47,83 $ a los siete días y unos 22,88 $ a los catorce. Cuando una entrada baja de 1 $, sale del tablón por completo.",
    },
    {
      q: "¿Cuánto cuesta llegar al nº1?",
      a: "Exactamente un céntimo más que el valor depreciado del primero — y esa cifra baja cada hora. La puja mínima es de 5 $, así que si el tablón está vacío o la categoría no tiene dueño, el nº1 cuesta 5 $.",
    },
    {
      q: "¿Es lo mismo que outbid.lol?",
      a: "No. Comparten la idea del ranking de pago, pero en outbid.lol la puja es permanente: quien paga más una vez conserva la posición indefinidamente. En outbid.love cada puja se deprecia un 10% al día, lo que convierte el primer puesto en una competición recurrente en lugar de una compra única.",
    },
    {
      q: "¿Necesito cuenta o correo electrónico?",
      a: "No. No hay registro, ni inicio de sesión, ni email. Introduces un enlace, eliges un importe, pagas con tarjeta y la entrada aparece.",
    },
    {
      q: "¿Cómo se paga y en qué moneda?",
      a: "Con tarjeta, a través de Shopier. Las pujas se muestran en dólares estadounidenses y se cobran en liras turcas al tipo de cambio del momento. La puja se activa automáticamente en cuanto se confirma el pago.",
    },
    {
      q: "¿Cuánto dura una puja?",
      a: "Hasta que se deprecia por debajo de 1 $. Una puja de 5 $ dura unas dos semanas; una de 100 $, unas seis. Puedes recargar una entrada en cualquier momento para volver a subirla.",
    },
    {
      q: "¿Alguien puede comprar el nº1 para siempre?",
      a: "No, y ese es justo el sentido de la depreciación. Un pago grande compra una posición fuerte durante unos días, pero se erosiona sola, así que mantener la cima obliga a pagar de forma repetida.",
    },
    {
      q: "¿Qué puedo listar?",
      a: "La web de un producto o una empresa, o una cuenta de X (Twitter). Los acortadores de enlaces, las invitaciones y los enlaces de mensajería están bloqueados, y las entradas se moderan según las reglas publicadas.",
    },
    {
      q: "¿Consigo un backlink SEO?",
      a: "No: los enlaces salientes son nofollow y pasan por una redirección. Lo que te da una entrada es tráfico real y visibilidad, con el número de clics salientes visible en público en cada fila.",
    },
    {
      q: "¿Puedo impulsar la entrada de otra persona?",
      a: "Sí. Cualquiera puede recargar cualquier entrada, así que puedes reforzar la tuya o regalar un impulso a un proyecto que te guste.",
    },
    {
      q: "¿Qué categorías hay?",
      a: "Veintisiete, desde agentes de IA y herramientas para desarrolladores hasta ecommerce, empleo, videojuegos e inmobiliaria. Cada categoría tiene su propio ranking y una categoría libre se conquista por el mínimo de 5 $.",
    },
  ],

  catsH2: "Categorías",
  catsLede:
    "Cada categoría tiene su propio ranking. Elige la tuya: en una categoría vacía, <strong>el nº1 cuesta la puja mínima</strong>.",
  catsAll: "Todas las categorías",
  catUnclaimed: "Libre: sé el primero",
  catListings: "{n} entradas",
  catTopIs: "el nº1 es {title} con {amt}",
  catTitle: "Ranking de {name}",
  catMetaDesc:
    "¿Quién lidera {name} ahora mismo? Puja lo que quieras para llevarte el primer puesto: cada puja se deprecia un 10% al día, así que el nº1 siempre se puede ganar.",
  catHeroWith: "{n} entradas — llevarse el nº1 cuesta ahora <strong>{price}</strong>, y baja cada hora.",
  catHeroEmpty: "Nadie ha reclamado esta categoría todavía. <strong>El nº1 cuesta {price}.</strong>",
  catEmpty: "Vacía. La primera puja se queda con la categoría.",

  vsH2: "Por qué la depreciación gana a las pujas permanentes",
  vsP:
    "Los rankings de puja permanente mueren siempre igual: alguien con dinero se instala en el nº1 y los demás dejan de jugar. La depreciación elimina ese final. Toda posición es temporal, remontar es barato y el tablón se mueve aunque no llegue nadie nuevo.",

  footer: {
    rules: "Reglas",
    pricing: "Precios",
    terms: "Términos",
    privacy: "Privacidad",
    refunds: "Reembolsos",
    traffic: "Tráfico en vivo",
    listings: "{n} entradas",
    back: "← Volver al ranking",
  },

  langLabel: "Idioma",
  translatedNote:
    "Esta es la edición en español. El ranking es global: las pujas de cualquier país compiten en el mismo tablón.",

  cats: {
    "ai-agents": "Agentes de IA e infraestructura",
    "ai-media": "Generación de medios con IA",
    marketing: "Marketing y publicidad",
    "dev-tools": "Herramientas para desarrolladores",
    productivity: "Productividad y herramientas personales",
    people: "Personas y perfiles",
    design: "Diseño y creatividad",
    seo: "SEO y visibilidad en IA",
    social: "Redes sociales y herramientas para creadores",
    writing: "Escritura y contenido",
    sales: "Ventas y generación de leads",
    business: "Negocios, finanzas y legal",
    games: "Videojuegos y entretenimiento",
    education: "Educación y aprendizaje",
    health: "Salud, fitness y bienestar",
    ecommerce: "Ecommerce y retail",
    directories: "Directorios, lanzamientos y descubrimiento",
    hiring: "Empleo, vacantes y carrera",
    audio: "Audio, voz y pódcast",
    agencies: "Agencias, estudios y servicios",
    security: "Seguridad, privacidad y cumplimiento",
    travel: "Viajes, local y estilo de vida",
    media: "Medios y noticias",
    domains: "Dominios y activos web",
    leaderboards: "Rankings y mercados de atención",
    "real-estate": "Inmobiliaria",
    other: "Otros",
  },
};
