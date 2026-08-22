import { NextResponse } from "next/server";
import { confirmPaymentByProduct } from "@/lib/db";
import { shopierClient, shopierFlow, moneyToCents } from "@/lib/shopier";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Shopier REST webhook alıcısı (order.created).
 *
 * - İmza: HMAC-SHA256(raw body, SHOPIER_WEBHOOK_TOKEN) — SDK doğruluyor.
 * - Bid burada, yalnızca burada yazılır (bids.payment_id unique → tekrar
 *   gönderimler sessizce yok sayılır).
 * - Tutar kontrolü RPC içinde: bildirilen tutar beklenenin altındaysa kayıt
 *   düşmez.
 * - Başarıda taşıyıcı ürün otomatik silinir (autoDeleteProduct).
 */
export async function POST(req: Request) {
  if (!process.env.SHOPIER_WEBHOOK_TOKEN) {
    return NextResponse.json({ error: "webhook not configured" }, { status: 503 });
  }

  const raw = await req.text();

  try {
    const result = await shopierFlow().handleWebhookPayload(
      raw,
      req.headers,
      async ({ order, productId, lineItem }) => {
        const paidCents =
          moneyToCents(lineItem.total) ??
          moneyToCents(lineItem.price) ??
          null;

        const res = await confirmPaymentByProduct({
          productId,
          paymentId: order.id,
          paidCents,
        });

        if (res.error && res.error !== "not_found") {
          // not_found: bize ait olmayan (board dışı) bir satış olabilir — 200 dön.
          // Diğer hatalarda 500 dönerek Shopier'in yeniden denemesini iste.
          throw new Error(`confirm failed: ${res.error}`);
        }
        if (res.error === "not_found") {
          console.warn("webhook: no pending payment for product", productId);
          return;
        }

        // Yalnızca BİZE ait taşıyıcı ürünü temizle (mağazanın gerçek
        // ürünlerine dokunma).
        try {
          await shopierClient().products.delete(productId);
        } catch (err) {
          console.warn("carrier product cleanup failed", productId, err);
        }
      }
    );

    return NextResponse.json({ ok: true, processed: result.processed });
  } catch (e) {
    console.error("shopier webhook error", e);
    const msg = e instanceof Error ? e.message : "error";
    const status = /signature/i.test(msg) ? 401 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
