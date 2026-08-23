import type { Locale } from "./index";

/**
 * "Şehrin ilk kaydı ücretsiz" metinleri.
 *
 * Yer tutucular: {city} {credit} {min} {pct}
 * Ana sözlükleri şişirmemek için ayrı dosyada — FORM/CITY ile aynı desen.
 */
export type FreeLabels = {
  /** {city} */
  intro: string;
  /** {city} */
  submit: string;
  sending: string;
  /** {city} {credit} */
  done: string;
  /** {credit} {pct} {min} */
  fine: string;
  orBid: string;
  /** {city} */
  boardEmpty: string;
  errGeneric: string;
  errNetwork: string;
  errCityTaken: string;
  errFreeUsed: string;
  errIpLimit: string;
};

export const FREE: Record<Locale, FreeLabels> = {
  en: {
    intro: "Nobody holds {city} yet — so the first spot is free. Drop your link and the city is yours.",
    submit: "Claim {city} — free",
    sending: "Claiming…",
    done: "{city} is yours. You started with {credit} of decaying credit.",
    fine: "Free, no card. You start with {credit} of credit that falls {pct}% a day, and anyone can outbid you from {min}.",
    orBid: "Rather start higher? Place a paid bid instead.",
    boardEmpty: "{city} is empty. Claim it above — the first spot costs nothing.",
    errGeneric: "Something went wrong.",
    errNetwork: "Couldn't reach the server. Try again.",
    errCityTaken: "Somebody just took this city. Place a bid instead.",
    errFreeUsed: "This profile has already claimed a free city.",
    errIpLimit: "One free city per day. Try again tomorrow, or place a bid.",
  },
  ru: {
    intro: "Город {city} ещё никто не занял — первое место бесплатно. Оставьте ссылку, и город ваш.",
    submit: "Занять {city} — бесплатно",
    sending: "Занимаем…",
    done: "{city} ваш. Вы начали с {credit} сгорающего кредита.",
    fine: "Бесплатно, без карты. Вы начинаете с {credit}, кредит сгорает на {pct}% в день, и вас может перебить любой от {min}.",
    orBid: "Хотите начать выше? Сделайте платную ставку.",
    boardEmpty: "В городе {city} пусто. Займите его выше — первое место бесплатно.",
    errGeneric: "Что-то пошло не так.",
    errNetwork: "Не удалось связаться с сервером. Попробуйте ещё раз.",
    errCityTaken: "Город только что заняли. Сделайте ставку.",
    errFreeUsed: "Этот профиль уже занял бесплатный город.",
    errIpLimit: "Один бесплатный город в сутки. Попробуйте завтра или сделайте ставку.",
  },
  zh: {
    intro: "还没有人拿下 {city} — 第一个位置免费。放上你的链接，这座城市就是你的。",
    submit: "免费拿下 {city}",
    sending: "正在占位…",
    done: "{city} 是你的了。你从 {credit} 的衰减额度开始。",
    fine: "免费，无需信用卡。你从 {credit} 额度开始，每天衰减 {pct}%，任何人都可以从 {min} 起出价超过你。",
    orBid: "想起点更高？改为付费出价。",
    boardEmpty: "{city} 还是空的。在上面认领它 — 第一个位置不花钱。",
    errGeneric: "出了点问题。",
    errNetwork: "连不上服务器，请重试。",
    errCityTaken: "这座城市刚刚被人拿走了，请改为出价。",
    errFreeUsed: "这个账号已经免费拿过一座城市了。",
    errIpLimit: "每天只能免费拿一座城市。明天再试，或直接出价。",
  },
  ko: {
    intro: "{city}은(는) 아직 주인이 없습니다 — 첫 자리는 무료입니다. 링크만 넣으면 도시는 당신 것.",
    submit: "{city} 무료로 차지하기",
    sending: "차지하는 중…",
    done: "{city}은(는) 당신 것입니다. {credit}의 소멸 크레딧으로 시작했습니다.",
    fine: "무료, 카드 필요 없음. {credit} 크레딧으로 시작하며 하루 {pct}%씩 줄어듭니다. 누구나 {min}부터 당신을 제칠 수 있습니다.",
    orBid: "더 높게 시작하고 싶나요? 유료 입찰을 하세요.",
    boardEmpty: "{city}은(는) 비어 있습니다. 위에서 차지하세요 — 첫 자리는 공짜입니다.",
    errGeneric: "문제가 발생했습니다.",
    errNetwork: "서버에 연결하지 못했습니다. 다시 시도해 주세요.",
    errCityTaken: "방금 누군가 이 도시를 차지했습니다. 입찰해 주세요.",
    errFreeUsed: "이 프로필은 이미 무료 도시를 차지했습니다.",
    errIpLimit: "하루에 무료 도시 하나. 내일 다시 시도하거나 입찰하세요.",
  },
  es: {
    intro: "Nadie tiene {city} todavía: el primer puesto es gratis. Deja tu enlace y la ciudad es tuya.",
    submit: "Quédate {city} — gratis",
    sending: "Reclamando…",
    done: "{city} es tuya. Has empezado con {credit} de crédito que se deprecia.",
    fine: "Gratis, sin tarjeta. Empiezas con {credit} de crédito que cae un {pct}% al día, y cualquiera puede superarte desde {min}.",
    orBid: "¿Prefieres empezar más alto? Haz una puja de pago.",
    boardEmpty: "{city} está vacía. Reclámala arriba: el primer puesto no cuesta nada.",
    errGeneric: "Algo ha salido mal.",
    errNetwork: "No se pudo contactar con el servidor. Inténtalo de nuevo.",
    errCityTaken: "Alguien acaba de llevarse esta ciudad. Haz una puja.",
    errFreeUsed: "Este perfil ya se ha llevado una ciudad gratis.",
    errIpLimit: "Una ciudad gratis al día. Prueba mañana o haz una puja.",
  },
  ja: {
    intro: "{city} はまだ誰のものでもありません。最初の一枠は無料です。リンクを入れれば街はあなたのもの。",
    submit: "{city} を無料で取る",
    sending: "確保中…",
    done: "{city} はあなたのものです。{credit} の減価クレジットで始まりました。",
    fine: "無料、カード不要。{credit} のクレジットで始まり、1日 {pct}% ずつ減ります。誰でも {min} からあなたを抜けます。",
    orBid: "もっと高くから始めますか？有料で入札できます。",
    boardEmpty: "{city} はまだ空です。上から取ってください — 最初の一枠は無料です。",
    errGeneric: "問題が発生しました。",
    errNetwork: "サーバーに接続できませんでした。もう一度お試しください。",
    errCityTaken: "この街は今しがた取られました。入札してください。",
    errFreeUsed: "このプロフィールはすでに無料の街を取っています。",
    errIpLimit: "無料の街は1日1つまで。明日試すか、入札してください。",
  },
  de: {
    intro: "{city} gehört noch niemandem — der erste Platz ist gratis. Link rein, Stadt gehört dir.",
    submit: "{city} gratis holen",
    sending: "Wird geholt…",
    done: "{city} gehört dir. Du startest mit {credit} verfallendem Guthaben.",
    fine: "Gratis, ohne Karte. Du startest mit {credit} Guthaben, das täglich um {pct}% fällt — überbieten kann dich jeder ab {min}.",
    orBid: "Lieber höher einsteigen? Gib ein bezahltes Gebot ab.",
    boardEmpty: "{city} ist leer. Hol sie dir oben — der erste Platz kostet nichts.",
    errGeneric: "Etwas ist schiefgelaufen.",
    errNetwork: "Server nicht erreichbar. Bitte nochmal versuchen.",
    errCityTaken: "Diese Stadt wurde gerade geholt. Gib ein Gebot ab.",
    errFreeUsed: "Dieses Profil hat schon eine Stadt gratis geholt.",
    errIpLimit: "Eine Gratis-Stadt pro Tag. Morgen wieder — oder biete mit.",
  },
  fr: {
    intro: "Personne ne tient encore {city} — la première place est gratuite. Dépose ton lien, la ville est à toi.",
    submit: "Prendre {city} — gratuit",
    sending: "En cours…",
    done: "{city} est à toi. Tu démarres avec {credit} de crédit qui fond.",
    fine: "Gratuit, sans carte. Tu démarres avec {credit} de crédit qui perd {pct}% par jour, et n'importe qui peut te dépasser dès {min}.",
    orBid: "Tu préfères démarrer plus haut ? Fais une enchère payante.",
    boardEmpty: "{city} est vide. Prends-la ci-dessus : la première place ne coûte rien.",
    errGeneric: "Une erreur est survenue.",
    errNetwork: "Serveur injoignable. Réessaie.",
    errCityTaken: "Quelqu'un vient de prendre cette ville. Fais une enchère.",
    errFreeUsed: "Ce profil a déjà pris une ville gratuite.",
    errIpLimit: "Une ville gratuite par jour. Réessaie demain ou enchéris.",
  },
  pt: {
    intro: "Ninguém tem {city} ainda — a primeira vaga é grátis. Solta o teu link e a cidade é tua.",
    submit: "Pegar {city} — grátis",
    sending: "Reservando…",
    done: "{city} é tua. Começaste com {credit} de crédito que decai.",
    fine: "Grátis, sem cartão. Começas com {credit} de crédito que cai {pct}% por dia, e qualquer um pode te superar a partir de {min}.",
    orBid: "Prefere começar mais alto? Faça um lance pago.",
    boardEmpty: "{city} está vazia. Pega acima — a primeira vaga não custa nada.",
    errGeneric: "Algo deu errado.",
    errNetwork: "Não foi possível falar com o servidor. Tente de novo.",
    errCityTaken: "Alguém acabou de pegar esta cidade. Faça um lance.",
    errFreeUsed: "Este perfil já pegou uma cidade grátis.",
    errIpLimit: "Uma cidade grátis por dia. Tente amanhã ou dê um lance.",
  },
  hi: {
    intro: "{city} पर अभी किसी का कब्ज़ा नहीं है — पहली जगह मुफ़्त है। अपना लिंक डालिए, शहर आपका।",
    submit: "{city} मुफ़्त में लें",
    sending: "ले रहे हैं…",
    done: "{city} अब आपका है। आपने {credit} के घटते क्रेडिट से शुरुआत की।",
    fine: "मुफ़्त, कार्ड नहीं चाहिए। आप {credit} क्रेडिट से शुरू करते हैं जो रोज़ {pct}% घटता है, और कोई भी {min} से आपको पीछे छोड़ सकता है।",
    orBid: "ऊँचे से शुरू करना है? भुगतान वाली बोली लगाइए।",
    boardEmpty: "{city} खाली है। ऊपर से इसे लीजिए — पहली जगह का कोई पैसा नहीं।",
    errGeneric: "कुछ गड़बड़ हो गई।",
    errNetwork: "सर्वर से संपर्क नहीं हुआ। फिर कोशिश करें।",
    errCityTaken: "यह शहर अभी-अभी किसी ने ले लिया। बोली लगाइए।",
    errFreeUsed: "यह प्रोफ़ाइल पहले ही एक मुफ़्त शहर ले चुकी है।",
    errIpLimit: "दिन में एक मुफ़्त शहर। कल कोशिश करें या बोली लगाएँ।",
  },
  id: {
    intro: "{city} belum ada yang pegang — tempat pertama gratis. Taruh tautanmu, kotanya jadi milikmu.",
    submit: "Ambil {city} — gratis",
    sending: "Mengambil…",
    done: "{city} milikmu. Kamu mulai dengan kredit {credit} yang menyusut.",
    fine: "Gratis, tanpa kartu. Kamu mulai dengan kredit {credit} yang turun {pct}% per hari, dan siapa pun bisa melewatimu mulai {min}.",
    orBid: "Mau mulai lebih tinggi? Pasang tawaran berbayar.",
    boardEmpty: "{city} masih kosong. Ambil di atas — tempat pertama tidak berbayar.",
    errGeneric: "Ada yang salah.",
    errNetwork: "Tidak bisa menghubungi server. Coba lagi.",
    errCityTaken: "Kota ini baru saja diambil orang. Pasang tawaran saja.",
    errFreeUsed: "Profil ini sudah pernah mengambil kota gratis.",
    errIpLimit: "Satu kota gratis per hari. Coba besok, atau pasang tawaran.",
  },
  tr: {
    intro: "{city} henüz kimsenin değil — ilk sıra ücretsiz. Linkini bırak, şehir senin.",
    submit: "{city} şehrini ücretsiz al",
    sending: "Alınıyor…",
    done: "{city} senin. {credit} çürüyen krediyle başladın.",
    fine: "Ücretsiz, kart yok. {credit} krediyle başlıyorsun; günde %{pct} eriyor ve herkes {min} vererek seni geçebilir.",
    orBid: "Daha yüksekten başlamak ister misin? Ücretli teklif ver.",
    boardEmpty: "{city} boş. Yukarıdan al — ilk sıra bedava.",
    errGeneric: "Bir şeyler ters gitti.",
    errNetwork: "Sunucuya ulaşılamadı. Tekrar dene.",
    errCityTaken: "Bu şehri az önce biri aldı. Teklif vererek geçebilirsin.",
    errFreeUsed: "Bu profil zaten bir şehri ücretsiz aldı.",
    errIpLimit: "Günde bir ücretsiz şehir. Yarın tekrar dene ya da teklif ver.",
  },
  ar: {
    intro: "لا أحد يملك {city} بعد — المركز الأول مجاني. ضع رابطك وتصبح المدينة لك.",
    submit: "خذ {city} مجانًا",
    sending: "جارٍ الحجز…",
    done: "{city} لك الآن. بدأت برصيد {credit} يتناقص.",
    fine: "مجانًا، بدون بطاقة. تبدأ برصيد {credit} ينخفض {pct}% يوميًا، ويمكن لأي شخص أن يتجاوزك ابتداءً من {min}.",
    orBid: "تفضّل البدء بمبلغ أعلى؟ قدّم عرضًا مدفوعًا.",
    boardEmpty: "{city} فارغة. خذها من الأعلى — المركز الأول بلا مقابل.",
    errGeneric: "حدث خطأ ما.",
    errNetwork: "تعذّر الوصول إلى الخادم. حاول مرة أخرى.",
    errCityTaken: "أخذ أحدهم هذه المدينة للتو. قدّم عرضًا بدلاً من ذلك.",
    errFreeUsed: "هذا الحساب أخذ مدينة مجانية بالفعل.",
    errIpLimit: "مدينة مجانية واحدة في اليوم. حاول غدًا أو قدّم عرضًا.",
  },
  vi: {
    intro: "Chưa ai giữ {city} — vị trí đầu tiên miễn phí. Thả link của bạn vào, thành phố là của bạn.",
    submit: "Nhận {city} — miễn phí",
    sending: "Đang nhận…",
    done: "{city} là của bạn. Bạn bắt đầu với {credit} tín dụng đang hao mòn.",
    fine: "Miễn phí, không cần thẻ. Bạn bắt đầu với {credit} tín dụng, giảm {pct}% mỗi ngày, và ai cũng có thể vượt bạn từ {min}.",
    orBid: "Muốn bắt đầu cao hơn? Hãy đặt giá trả phí.",
    boardEmpty: "{city} đang trống. Nhận ở trên — vị trí đầu tiên không mất phí.",
    errGeneric: "Đã có lỗi xảy ra.",
    errNetwork: "Không kết nối được máy chủ. Thử lại nhé.",
    errCityTaken: "Vừa có người lấy thành phố này. Hãy đặt giá.",
    errFreeUsed: "Hồ sơ này đã nhận một thành phố miễn phí rồi.",
    errIpLimit: "Mỗi ngày một thành phố miễn phí. Thử lại ngày mai hoặc đặt giá.",
  },
  th: {
    intro: "ยังไม่มีใครครอง {city} — ที่แรกฟรี ใส่ลิงก์ของคุณ แล้วเมืองนี้ก็เป็นของคุณ",
    submit: "รับ {city} ฟรี",
    sending: "กำลังจอง…",
    done: "{city} เป็นของคุณแล้ว คุณเริ่มด้วยเครดิต {credit} ที่ลดลงเรื่อย ๆ",
    fine: "ฟรี ไม่ต้องใช้บัตร คุณเริ่มด้วยเครดิต {credit} ที่ลดลงวันละ {pct}% และใครก็แซงคุณได้เริ่มที่ {min}",
    orBid: "อยากเริ่มสูงกว่านี้? เสนอราคาแบบจ่ายเงินได้เลย",
    boardEmpty: "{city} ยังว่างอยู่ รับได้ที่ด้านบน — ที่แรกไม่มีค่าใช้จ่าย",
    errGeneric: "เกิดข้อผิดพลาด",
    errNetwork: "ติดต่อเซิร์ฟเวอร์ไม่ได้ ลองใหม่อีกครั้ง",
    errCityTaken: "เพิ่งมีคนคว้าเมืองนี้ไป ลองเสนอราคาแทน",
    errFreeUsed: "โปรไฟล์นี้รับเมืองฟรีไปแล้ว",
    errIpLimit: "วันละหนึ่งเมืองฟรี ลองพรุ่งนี้หรือเสนอราคา",
  },
  it: {
    intro: "{city} non è ancora di nessuno — il primo posto è gratis. Metti il tuo link e la città è tua.",
    submit: "Prendi {city} — gratis",
    sending: "In corso…",
    done: "{city} è tua. Sei partito con {credit} di credito che si consuma.",
    fine: "Gratis, senza carta. Parti con {credit} di credito che cala del {pct}% al giorno, e chiunque può superarti da {min}.",
    orBid: "Preferisci partire più in alto? Fai un'offerta a pagamento.",
    boardEmpty: "{city} è vuota. Prendila qui sopra: il primo posto non costa nulla.",
    errGeneric: "Qualcosa è andato storto.",
    errNetwork: "Server non raggiungibile. Riprova.",
    errCityTaken: "Qualcuno ha appena preso questa città. Fai un'offerta.",
    errFreeUsed: "Questo profilo ha già preso una città gratis.",
    errIpLimit: "Una città gratis al giorno. Riprova domani o fai un'offerta.",
  },
  pl: {
    intro: "{city} jeszcze nie ma właściciela — pierwsze miejsce jest za darmo. Wrzuć link i miasto jest twoje.",
    submit: "Weź {city} — za darmo",
    sending: "Zajmuję…",
    done: "{city} jest twoje. Zaczynasz z {credit} topniejącego kredytu.",
    fine: "Za darmo, bez karty. Zaczynasz z {credit} kredytu, który spada o {pct}% dziennie, a przebić cię może każdy od {min}.",
    orBid: "Wolisz zacząć wyżej? Złóż płatną ofertę.",
    boardEmpty: "{city} jest puste. Weź je powyżej — pierwsze miejsce nic nie kosztuje.",
    errGeneric: "Coś poszło nie tak.",
    errNetwork: "Brak połączenia z serwerem. Spróbuj ponownie.",
    errCityTaken: "Ktoś właśnie zajął to miasto. Złóż ofertę.",
    errFreeUsed: "Ten profil już zajął darmowe miasto.",
    errIpLimit: "Jedno darmowe miasto dziennie. Spróbuj jutro albo licytuj.",
  },
  uk: {
    intro: "{city} ще ніхто не зайняв — перше місце безкоштовне. Лишіть посилання, і місто ваше.",
    submit: "Зайняти {city} — безкоштовно",
    sending: "Займаємо…",
    done: "{city} ваше. Ви почали з {credit} кредиту, що згорає.",
    fine: "Безкоштовно, без картки. Ви починаєте з {credit} кредиту, який падає на {pct}% щодня, і будь-хто може перебити вас від {min}.",
    orBid: "Хочете почати вище? Зробіть платну ставку.",
    boardEmpty: "{city} порожнє. Займіть його вище — перше місце безкоштовне.",
    errGeneric: "Щось пішло не так.",
    errNetwork: "Не вдалося зв'язатися з сервером. Спробуйте ще раз.",
    errCityTaken: "Це місто щойно зайняли. Зробіть ставку.",
    errFreeUsed: "Цей профіль уже зайняв безкоштовне місто.",
    errIpLimit: "Одне безкоштовне місто на добу. Спробуйте завтра або зробіть ставку.",
  },
};

/** Sunucudan gelen hata kodunu diline çevirir. */
export function freeError(labels: FreeLabels, code: string | undefined, fallback: string): string {
  switch (code) {
    case "city_taken": return labels.errCityTaken;
    case "free_used": return labels.errFreeUsed;
    case "free_ip_limit": return labels.errIpLimit;
    default: return fallback || labels.errGeneric;
  }
}
