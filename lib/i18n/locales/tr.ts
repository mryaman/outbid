import type { Dict } from "../types";

export const tr: Dict = {
  metaTitle: "outbid.love — her teklifin günde %10 eridiği paralı sıralama tahtası",
  metaDesc:
    "İstediğin tutarı teklif et, siten ya da X hesabın herkese açık sıralamada yükselsin. Her teklif günde %10 değer kaybeder; yani 1. sırayı kimse temelli satın alamaz. 5 dolardan başlar, üyelik yok, reklam yok.",
  keywords: [
    "paralı sıralama",
    "teklif vererek sıralama",
    "outbid.lol alternatifi",
    "reklamsız site tanıtımı",
    "ilk sırayı satın al",
    "dikkat pazarı",
    "girişim tanıtımı liste",
    "ürün lansman listesi",
    "liderlik tablosu teklif",
    "site linkini öne çıkar",
  ],

  nav: {
    board: "Sıralama",
    categories: "Kategoriler",
    how: "Nasıl çalışır",
    faq: "SSS",
    about: "Hakkında",
    rules: "Kurallar",
  },

  h1: "Zirve her zaman kazanılabilir.",
  lede:
    "Sıran, ödediğin tutarın ta kendisi — ama her ödeme <strong>günde %{pct} eriyor</strong>. Kimse zirvede sonsuza kadar oturamaz, tahta hiç donmaz.",

  intro: [
    "outbid.love, sırasını parayla satın aldığın herkese açık bir sıralama tahtası: siten, ürünün ya da X hesabın için teklif veriyorsun ve konumunu yalnızca ödediğin tutar belirliyor. Algoritma yok, editör seçkisi yok, reklam ihalesi yok, açılacak hesap yok.",
    "Diğer bütün teklif tahtalarından ayıran şey erime. Her ödeme, onaylandığı andan itibaren günde %{pct} değer kaybediyor; yani teklif mülkiyet değil kira. Bugün alınan sıra bir hafta sonra yarısından az ediyor. Bu yüzden 1. sıra sürekli tartışmaya açık kalıyor ve küçük bütçeli bir yeni gelen, bir kez ödeyip ortadan kaybolan birini her zaman geçebiliyor.",
    "Teklifler {min} tutarından başlıyor. Her kayıt senin sitene çıkıyor, dışarı tıklamalar herkese açık sayılıyor ve her kategorinin kendi sıralaması var — boş bir niş, asgari teklifle kapılabiliyor.",
  ],

  bidPill: "Teklifler açık",
  bidBody:
    "Linkini tahtaya koy ya da üstündekini geç. Yazdığın tutarı, bir kez ödüyorsun.",
  bidFine: "Ürün siten ya da X hesabın. Üyelik yok, e-posta yok — Shopier ile kartla ödeme.",

  formLinkPlaceholder: "siten.com ya da @kullaniciadin",
  formSubmit: "Teklifi geç →",
  formFine:
    "Asgari {min}. Şu an 1. sıra {top}. Shopier ile kartla ödeme (güncel kurdan Türk lirası olarak tahsil edilir) — ödemen geçtiği anda teklifin tahtaya düşer ve herkesinki gibi erimeye başlar.",

  boardTitle: "Sıralama",
  boardEmpty: "Tahta boş. İlk sırayı sen kap.",

  decayH2: "Erime nasıl işliyor",
  decayP:
    "Her ödeme, yapıldığı andan sayılarak günde %{pct} değer kaybeder. {a}, bir hafta sonra {b}, iki hafta sonra {c} eder. Bir kayıt {drop} altına düştüğünde tahtadan çıkar.",
  decayFine:
    "Ürünün tamamı bu. Sıra bir satın alma değil, süregelen bir gider — 1. sıranın hiçbir zaman ulaşılmaz olmamasının sebebi de bu.",

  howH2: "1. sıraya nasıl çıkılır",
  howSteps: [
    "Neyi öne çıkaracağına karar ver: ürün adresi ya da X hesabı. Kayıt yok, e-posta yok.",
    "Tahtadaki en yüksek teklife bak. Onu bir sent geçmek şu an lider olmaya yetiyor.",
    "Kartla öde. Ödeme geçtiği anda teklifin tahtada görünür.",
    "Geri gel ve üstüne koy. Teklifin günde %{pct} eridiği için 1. sırayı tutmak, bir seferde çok değil, her gün biraz ödemek demek.",
  ],

  faqH2: "Sık sorulan sorular",
  faq: [
    {
      q: "outbid.love nedir?",
      a: "outbid.love, sıranın parayla alındığı herkese açık bir sıralama tahtasıdır. Bir site ya da X hesabı için teklif verirsin ve sıran ödediğin paraya eşit olur. Diğer teklif tahtalarından farklı olarak her teklif günde %10 erir; böylece sıralama sürekli değişir ve 1. sıra her zaman alınabilir.",
    },
    {
      q: "Günde %10 erime tam olarak nasıl hesaplanıyor?",
      a: "Ödemenin onaylandığı andan itibaren teklifinin etkin değeri geçen her gün için 0,9 ile çarpılır. 100 dolarlık bir teklif yedi gün sonra yaklaşık 47,83 dolar, on dört gün sonra yaklaşık 22,88 dolar eder. 1 doların altına düşen kayıt tahtadan tamamen çıkar.",
    },
    {
      q: "1. sıraya çıkmak ne kadar tutar?",
      a: "Mevcut liderin erimiş değerinden tam bir sent fazlası — ve o değer her saat düşüyor. Asgari teklif 5 dolar, dolayısıyla tahta boşsa ya da kategori sahipsizse 1. sıra 5 dolardır.",
    },
    {
      q: "outbid.lol ile aynı şey mi?",
      a: "Hayır. Paralı sıralama fikri ortak ama outbid.lol'de teklif kalıcıdır: bir kez en çok ödeyen sırayı süresiz tutar. outbid.love'da her teklif günde %10 erir; bu da zirveyi tek seferlik bir alışveriş değil, sürekli tekrarlanan bir yarış hâline getirir.",
    },
    {
      q: "Hesap ya da e-posta gerekiyor mu?",
      a: "Hayır. Kayıt, giriş ve e-posta yok. Linki girersin, tutarı seçersin, kartla ödersin; kayıt görünür.",
    },
    {
      q: "Ödeme nasıl ve hangi para biriminde yapılıyor?",
      a: "Shopier üzerinden kartla. Teklifler ABD doları olarak gösterilir, güncel kurdan Türk lirası olarak tahsil edilir. Ödeme onaylandığı anda teklif otomatik olarak devreye girer.",
    },
    {
      q: "Bir teklif ne kadar sürer?",
      a: "1 doların altına erimesine kadar. 5 dolarlık teklif yaklaşık iki hafta, 100 dolarlık teklif yaklaşık altı hafta dayanır. Kaydına dilediğin an ekleme yapıp yukarı itebilirsin.",
    },
    {
      q: "Biri 1. sırayı temelli satın alabilir mi?",
      a: "Hayır; erime kuralının amacı tam olarak bu. Tek seferlik büyük bir ödeme birkaç günlük güçlü bir konum alır ama kendiliğinden aşınır. Zirveyi korumak tekrar tekrar ödemeyi gerektirir.",
    },
    {
      q: "Neleri listeleyebilirim?",
      a: "Bir ürün veya şirket sitesini ya da bir X (Twitter) hesabını. Link kısaltıcılar, davet linkleri ve mesajlaşma uygulaması linkleri engellidir; kayıtlar yayımlanmış kurallara göre denetlenir.",
    },
    {
      q: "SEO backlink kazandırıyor mu?",
      a: "Hayır — dışarı çıkan linkler nofollow ve yönlendirme üzerinden gider. Kaydın sana kazandırdığı şey gerçek trafik ve görünürlük; dışarı tıklama sayısı her satırda herkese açık gösterilir.",
    },
    {
      q: "Başkasının kaydını yukarı itebilir miyim?",
      a: "Evet. Herhangi bir kayda herkes ekleme yapabilir; kendi kaydını güçlendirebilir ya da sevdiğin bir projeye destek hediye edebilirsin.",
    },
    {
      q: "Hangi kategoriler var?",
      a: "Yirmi yedi tane: yapay zekâ ajanlarından geliştirici araçlarına, e-ticaretten iş ilanlarına, oyunlardan gayrimenkule. Her kategorinin kendi sıralaması var ve sahipsiz bir kategori asgari 5 dolarla alınabilir.",
    },
  ],

  catsH2: "Kategoriler",
  catsLede:
    "Her kategorinin kendi sıralaması var. Seninkini seç — boş bir kategoride <strong>1. sıra asgari teklife gelir</strong>.",
  catsAll: "Tüm kategoriler",
  catUnclaimed: "Sahipsiz — ilk sen ol",
  catListings: "{n} kayıt",
  catTopIs: "1. sıra {title}, {amt}",
  catTitle: "{name} sıralaması",
  catMetaDesc:
    "{name} kategorisinde şu an lider kim? İstediğin tutarı teklif edip zirveyi al — her teklif günde %10 eridiği için 1. sıra her zaman kazanılabilir.",
  catHeroWith: "{n} kayıt — 1. sırayı almak şu an <strong>{price}</strong>, ve saat başı düşüyor.",
  catHeroEmpty: "Bu kategoriyi henüz kimse almadı. <strong>1. sıra {price}.</strong>",
  catEmpty: "Boş. İlk teklif bu kategorinin sahibi olur.",

  vsH2: "Erime neden kalıcı tekliflerden iyi",
  vsP:
    "Kalıcı teklifli sıralamalar hep aynı şekilde ölür: cebi derin biri 1. sıraya park eder, geri kalan herkes oyunu bırakır. Erime bu sonu ortadan kaldırır. Her konum geçicidir, geri dönüş ucuzdur ve yeni kimse gelmese bile tahta hareket etmeye devam eder.",

  footer: {
    rules: "Kurallar",
    pricing: "Fiyat",
    terms: "Koşullar",
    privacy: "Gizlilik",
    refunds: "İade",
    traffic: "Canlı trafik",
    listings: "{n} kayıt",
    back: "← Tahtaya dön",
  },

  langLabel: "Dil",
  translatedNote:
    "Bu sayfa Türkçe sürümdür. Sıralamanın kendisi küresel — hangi ülkeden gelirse gelsin tüm teklifler aynı tahtada yarışır.",

  cats: {
    "ai-agents": "Yapay Zekâ Ajanları ve Altyapı",
    "ai-media": "Yapay Zekâ ile Medya Üretimi",
    marketing: "Pazarlama ve Reklam",
    "dev-tools": "Geliştirici Araçları",
    productivity: "Verimlilik ve Kişisel Araçlar",
    people: "Kişiler ve Profiller",
    design: "Tasarım ve Yaratıcılık",
    seo: "SEO ve Yapay Zekâ Görünürlüğü",
    social: "Sosyal Medya ve İçerik Üretici Araçları",
    writing: "Yazı ve İçerik",
    sales: "Satış ve Müşteri Kazanımı",
    business: "İş, Finans ve Hukuk",
    games: "Oyun ve Eğlence",
    education: "Eğitim ve Öğrenme",
    health: "Sağlık, Fitness ve İyi Yaşam",
    ecommerce: "E-ticaret ve Perakende",
    directories: "Dizinler, Lansman ve Keşif",
    hiring: "İşe Alım, İlanlar ve Kariyer",
    audio: "Ses, Konuşma ve Podcast",
    agencies: "Ajanslar, Stüdyolar ve Hizmetler",
    security: "Güvenlik, Gizlilik ve Uyum",
    travel: "Seyahat, Yerel ve Yaşam Tarzı",
    media: "Medya ve Haber",
    domains: "Alan Adları ve Web Varlıkları",
    leaderboards: "Sıralamalar ve Dikkat Pazarları",
    "real-estate": "Gayrimenkul",
    other: "Diğer",
  },
};
