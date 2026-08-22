import type { Locale } from "./index";

/**
 * Satır ve form bileşenlerindeki kısa etiketler.
 * Sözlük dosyalarını şişirmemek için ayrı tutuldu.
 * {n} tıklama sayısı, {rank} düşülecek sıra, {t} süre, {amt} tutar.
 */
export type RowLabels = {
  clicks: string;
  falls: string;
  boost: string;
  totalPaid: string;
};

export const ROW_LABELS: Record<Locale, RowLabels> = {
  en: {
    clicks: "{n} clicks",
    falls: "falls to #{rank} in {t}",
    boost: "Boost",
    totalPaid: "Total paid: {amt}",
  },
  ru: {
    clicks: "переходов: {n}",
    falls: "упадёт на #{rank} через {t}",
    boost: "Поднять",
    totalPaid: "Всего оплачено: {amt}",
  },
  zh: {
    clicks: "{n} 次点击",
    falls: "{t} 后跌到第 {rank} 名",
    boost: "加价",
    totalPaid: "累计支付：{amt}",
  },
  ko: {
    clicks: "클릭 {n}회",
    falls: "{t} 후 {rank}위로 하락",
    boost: "부스트",
    totalPaid: "누적 결제: {amt}",
  },
  es: {
    clicks: "{n} clics",
    falls: "cae al #{rank} en {t}",
    boost: "Impulsar",
    totalPaid: "Total pagado: {amt}",
  },
  ja: {
    clicks: "クリック {n}",
    falls: "{t} 後に {rank} 位へ",
    boost: "上乗せ",
    totalPaid: "支払い総額: {amt}",
  },
  de: {
    clicks: "{n} Klicks",
    falls: "fällt in {t} auf Platz {rank}",
    boost: "Aufstocken",
    totalPaid: "Insgesamt gezahlt: {amt}",
  },
  fr: {
    clicks: "{n} clics",
    falls: "tombe au #{rank} dans {t}",
    boost: "Booster",
    totalPaid: "Total payé : {amt}",
  },
  pt: {
    clicks: "{n} cliques",
    falls: "cai para #{rank} em {t}",
    boost: "Impulsionar",
    totalPaid: "Total pago: {amt}",
  },
  hi: {
    clicks: "{n} क्लिक",
    falls: "{t} में #{rank} पर गिरेगा",
    boost: "बूस्ट",
    totalPaid: "कुल भुगतान: {amt}",
  },
  id: {
    clicks: "{n} klik",
    falls: "turun ke #{rank} dalam {t}",
    boost: "Dorong",
    totalPaid: "Total dibayar: {amt}",
  },
  tr: {
    clicks: "{n} tıklama",
    falls: "{t} içinde #{rank} sıraya düşer",
    boost: "Yükselt",
    totalPaid: "Toplam ödenen: {amt}",
  },
  ar: {
    clicks: "{n} نقرة",
    falls: "يهبط إلى #{rank} خلال {t}",
    boost: "ادعم",
    totalPaid: "إجمالي المدفوع: {amt}",
  },
  vi: {
    clicks: "{n} lượt nhấp",
    falls: "rơi xuống #{rank} sau {t}",
    boost: "Đẩy",
    totalPaid: "Tổng đã trả: {amt}",
  },
  th: {
    clicks: "{n} คลิก",
    falls: "ตกไปอันดับ {rank} ใน {t}",
    boost: "ดัน",
    totalPaid: "จ่ายรวม: {amt}",
  },
  it: {
    clicks: "{n} clic",
    falls: "scende al #{rank} tra {t}",
    boost: "Spingi",
    totalPaid: "Totale pagato: {amt}",
  },
  pl: {
    clicks: "kliknięć: {n}",
    falls: "spadnie na #{rank} za {t}",
    boost: "Podbij",
    totalPaid: "Zapłacono łącznie: {amt}",
  },
  uk: {
    clicks: "переходів: {n}",
    falls: "впаде на #{rank} через {t}",
    boost: "Підняти",
    totalPaid: "Усього сплачено: {amt}",
  },
};
