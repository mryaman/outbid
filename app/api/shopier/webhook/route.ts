import { NextResponse } from "next/server";
import { confirmPaymentByProduct } from "@/lib/db";
import { shopierClient, shopierFlow, moneyToCents } from "@/lib/shopier";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Her webhook denemesini DB'ye yaz — Vercel loglarına bakmadan teşhis için. */
async function dblog(ok: boolean, event: string, note: string, bodyHead: string) {
  try {
    const url = process.env.SUPABASE_URL ?? "https://twlzxnpbkvrjpcjqahrq.supabase.co";
    const key =
      process.env.SUPABASE_ANON_KEY ?? "sb_publishable_NxNtRbKC1B-2-AaYvHkt-A_Ss8VCc4y";
    await fetch(`${url}/rest/v1/rpc/log_webhook`, {
      method: "POST",
      headers: {
        apikey: key,
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        p_secret: process.env.PAYMENT_RPC_SECRET ?? "",
        p_ok: ok,
        p_event: event,
        p_note: note,
        p_body_head: bodyHead,
      }),
    });
  } catch {
    /* log asla akışı bozmasın */
  }
}

/**
 * Shopier REST webhook alıcısı (order.created).
 * - İmza: HMAC-SHA256(raw body, SHOPIER_WEBHOOK_TOKEN) — SDK doğruluyor.
 * - Bid yalnızca burada yazılır (bids.payment_id unique → tekrar zararsız).
 */
export async function POST(req: Request) {
  if (!process.env.SHOPIER_WEBHOOK_TOKEN) {
    return NextResponse.json({ error: "webhook not configured" }, { status: 503 });
  }

  const raw = await req.text();
  const sigHeader = req.headers.get("shopier-signature") ?? "(yok)";
  const eventHeader = req.headers.get("shopier-event") ?? "(yok)";

  try {
    const result = await shopierFlow().handleWebhookPayload(
      raw,
      req.headers,
      async ({ order, productId, lineItem }) => {
        const paidCents =
          moneyToCents(lineItem.total) ?? moneyToCents(lineItem.price) ?? null;

        const res = await confirmPaymentByProduct({
          productId,
          paymentId: order.id,
          paidCents,
        });

        if (res.error && res.error !== "not_found") {
          throw new Error(`confirm failed: ${res.error}`);
        }
        if (res.error === "not_found") {
          await dblog(false, eventHeader, `not_found product=${productId}`, raw.slice(0, 500));
          return;
        }

        await dblog(true, eventHeader, `confirmed product=${productId} paid=${paidCents}`, "");

        try {
          await shopierClient().products.delete(productId);
        } catch {
          /* best effort */
        }
      }
    );

    if (!result.processed) {
      await dblog(true, eventHeader, "received, not order.created or no line items", raw.slice(0, 500));
    }
    return NextResponse.json({ ok: true, processed: result.processed });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "error";
    await dblog(false, eventHeader, `error: ${msg} sig=${sigHeader.slice(0, 24)}`, raw.slice(0, 500));
    const status = /signature/i.test(msg) ? 401 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
