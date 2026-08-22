/**
 * Shopier (PAT) entegrasyonu.
 *
 * Akış — Shopier'in modern PAT modeli, klasik api_pay4 değil:
 *   1. /api/checkout  → teklif tutarında tek seferlik Shopier ürünü oluşturulur
 *                       (ürün-başına-ödeme), pending_payments'a yazılır ve
 *                       tarayıcı Shopier hosted checkout'a POST edilir.
 *   2. Shopier webhook (order.created) → imza doğrulanır, tutar kontrol edilir,
 *                       bid SADECE burada yazılır. Ürün silinerek temizlenir.
 *
 * Gerekli env:
 *   SHOPIER_PAT            Kişisel Erişim Belirteci (panel → Hesap Yönetimi)
 *   SHOPIER_SHOP_SLUG      shopier.com/<slug> mağaza adı
 *   SHOPIER_WEBHOOK_TOKEN  webhook aboneliği token'ı (/api/shopier/setup verir)
 *   PAYMENT_RPC_SECRET     Supabase RPC'leriyle paylaşılan sunucu sırrı
 */

import { ShopierApiClient, ShopierPaymentFlow } from "@nopeion/shopier";
import { CONFIG } from "./config";

let _client: ShopierApiClient | null = null;
let _flow: ShopierPaymentFlow | null = null;

export function shopierClient(): ShopierApiClient {
  if (!process.env.SHOPIER_PAT) throw new Error("SHOPIER_PAT is not set");
  if (!_client) _client = new ShopierApiClient({ pat: process.env.SHOPIER_PAT });
  return _client;
}

export function shopierFlow(): ShopierPaymentFlow {
  if (!_flow) {
    _flow = new ShopierPaymentFlow({
      client: shopierClient(),
      shopSlug: process.env.SHOPIER_SHOP_SLUG,
      webhookToken: process.env.SHOPIER_WEBHOOK_TOKEN,
      defaultImageUrl: `${siteUrl()}/og.png`,
      // Dikkat: webhook TÜM mağaza siparişlerine gelir. Otomatik silme kapalı —
      // yalnızca bize ait (pending_payments'ta eşleşen) taşıyıcı ürünler
      // webhook handler'ında elle silinir. Aksi hâlde mağazadaki gerçek bir
      // ürünün satışı o ürünü silerdi.
      autoDeleteProduct: false,
    });
  }
  return _flow;
}

export function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL || // Netlify primary URL
    CONFIG.url
  ).replace(/\/$/, "");
}

/** "12.34" → 1234; hatalıysa null */
export function moneyToCents(s: string | undefined | null): number | null {
  if (!s) return null;
  const n = Number(String(s).replace(",", "."));
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.round(n * 100);
}
