import { NextResponse } from "next/server";
import { shopierClient, siteUrl } from "@/lib/shopier";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Tek seferlik kurulum/teşhis ucu. PAYMENT_RPC_SECRET ile korunur:
 *
 *   GET /api/shopier/setup?key=<PAYMENT_RPC_SECRET>            → durum raporu
 *   GET /api/shopier/setup?key=...&create_webhook=1            → order.created
 *       aboneliği yoksa oluşturur; yanıtta webhook token'ı (varsa) döner.
 *
 * Dönen webhook token'ı Netlify'da SHOPIER_WEBHOOK_TOKEN olarak kaydedilmeli.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key") ?? "";
  if (!process.env.PAYMENT_RPC_SECRET || key !== process.env.PAYMENT_RPC_SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (!process.env.SHOPIER_PAT) {
    return NextResponse.json({ error: "SHOPIER_PAT not set" }, { status: 503 });
  }

  const client = shopierClient();
  const report: Record<string, unknown> = { site: siteUrl() };

  try {
    report.shopOwner = await client.shop.getOwner();
    report.shopSettings = await client.shop.getSettings();
  } catch (e) {
    report.shopError = String(e);
  }

  // Mağaza slug adayları herkese açık sayfadan doğrulanır
  const candidates = [process.env.SHOPIER_SHOP_SLUG, "outbid", "out"].filter(
    (s, i, a): s is string => Boolean(s) && a.indexOf(s) === i
  );
  const slugChecks: Record<string, number | string> = {};
  for (const slug of candidates) {
    try {
      const r = await fetch(`https://www.shopier.com/${encodeURIComponent(slug)}`, {
        method: "GET",
        redirect: "manual",
        cache: "no-store",
      });
      slugChecks[slug] = r.status;
    } catch (e) {
      slugChecks[slug] = String(e);
    }
  }
  report.slugChecks = slugChecks;
  report.shopSlugEnv = process.env.SHOPIER_SHOP_SLUG ?? null;

  const webhookUrl = `${siteUrl()}/api/shopier/webhook`;
  try {
    const hooks = await client.webhooks.list();
    report.webhooks = hooks;

    const existing = hooks.find((h) => h.event === "order.created" && h.url === webhookUrl);
    if (!existing && url.searchParams.get("create_webhook") === "1") {
      const created = await client.webhooks.create({ event: "order.created", url: webhookUrl });
      report.createdWebhook = created; // token alanı burada dönebilir — env'e taşınmalı
    }
    report.webhookTokenEnvSet = Boolean(process.env.SHOPIER_WEBHOOK_TOKEN);
  } catch (e) {
    report.webhookError = String(e);
  }

  // Mağaza sepetini kapat: taşıyıcı-ürün modelinde sepet birikmesi
  // (terk edilen denemeler) istemiyoruz; her ödeme tek ürün olmalı.
  if (url.searchParams.get("disable_cart") === "1") {
    try {
      report.cartUpdate = await client.shop.updateSettings({ cart: false });
    } catch (e) {
      report.cartUpdateError = String(e);
    }
  }

  // Temizlik: terk edilen taşıyıcı ürünleri sil ("outbid.love bid" başlıklı,
  // bekleyen ödemesi olmayanlar dahil hepsi — aktif checkout'lar yeni ürün açar).
  if (url.searchParams.get("cleanup_products") === "1") {
    try {
      const all = await client.products.list({ limit: 100 });
      const carriers = (all ?? []).filter((p) =>
        (p as { title?: string }).title?.startsWith("outbid.love bid")
      );
      const deleted: string[] = [];
      for (const p of carriers) {
        const id = (p as { id?: string }).id;
        if (!id) continue;
        try {
          await client.products.delete(id);
          deleted.push(id);
        } catch {
          /* tek tek geç */
        }
      }
      report.cleanupDeleted = deleted;
    } catch (e) {
      report.cleanupError = String(e);
    }
  }

  // Teşhis: farklı ürün kombinasyonlarını dene, ham API hatasını raporla.
  // Oluşan test ürünleri hemen silinir.
  if (url.searchParams.get("test_product") === "1") {
    const variants: Array<{ label: string; input: Record<string, unknown> }> = [
      {
        label: "digital-USD",
        input: { type: "digital", priceData: { currency: "USD", price: "5.00" } },
      },
      {
        label: "digital-TRY",
        input: { type: "digital", priceData: { currency: "TRY", price: "5.00" } },
      },
      {
        label: "physical-USD",
        input: { type: "physical", priceData: { currency: "USD", price: "5.00" } },
      },
      {
        label: "physical-TRY-noimage",
        input: { type: "physical", priceData: { currency: "TRY", price: "5.00" }, media: undefined },
      },
    ];
    const results: Record<string, unknown> = {};
    for (const v of variants) {
      try {
        const base: Record<string, unknown> = {
          title: `outbid test ${v.label}`,
          description: `test ${v.label}`,
          shippingPayer: "sellerPays",
          stockQuantity: 1,
          customListing: true,
          media: [{ type: "image", url: `${siteUrl()}/og.png`, placement: 1 }],
          ...v.input,
        };
        if (!("media" in v.input && v.input.media === undefined)) {
          // media stays
        } else {
          delete base.media;
        }
        const p = await client.request<{ id?: string; url?: string }>("/products", {
          method: "POST",
          body: base,
        });
        results[v.label] = { ok: true, id: p?.id, url: p?.url };
        if (p?.id) {
          try {
            await client.products.delete(p.id);
          } catch {
            /* cleanup best effort */
          }
        }
        break; // ilk başarılı kombinasyon yeterli
      } catch (e) {
        const err = e as { message?: string; status?: number; details?: unknown };
        results[v.label] = {
          ok: false,
          message: err.message,
          status: err.status,
          details: err.details,
        };
      }
    }
    report.productTests = results;
  }

  return NextResponse.json(report);
}
