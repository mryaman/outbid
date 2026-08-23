import { NextResponse } from "next/server";
import { CONFIG } from "@/lib/config";
import { confirmPaymentByProduct, openPaymentProducts } from "@/lib/db";
import { shopierClient, siteUrl, moneyToCents } from "@/lib/shopier";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Tek seferlik kurulum/teşhis ucu. PAYMENT_RPC_SECRET ile korunur:
 *
 *   GET /api/shopier/setup?key=<PAYMENT_RPC_SECRET>            → durum raporu
 *       (taşıyıcı ürün sayısı + kaçı "Tükendi" dâhil)
 *   &create_webhook=1    order.created aboneliği yoksa oluşturur; yanıtta token.
 *   &orders=1            son 24 saatin ham sipariş listesi
 *   &products=1          taşıyıcı ürünlerin id/başlık/stok dökümü
 *   &sync_orders=1[&hours=N]  kaçan webhook telafisi: ödenmiş siparişleri
 *                        yeniden onaylatır (işlenmişler duplicate döner)
 *   &cleanup_products=1  terk edilmiş taşıyıcı ürünleri siler (son 3 saatteki
 *                        açık checkout'ların ürünlerine dokunmaz)
 *   &enable_cart=1 / &disable_cart=1   mağaza sepeti. Hosted checkout sepet
 *                        adımını kullandığı için sepet AÇIK olmalı.
 *
 * Dönen webhook token'ı Vercel'de SHOPIER_WEBHOOK_TOKEN olarak kaydedilmeli.
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

  // Son 24 saatin siparişleri (ödeme geldi mi teşhisi)
  if (url.searchParams.get("orders") === "1") {
    try {
      report.orders = await client.orders.list({
        dateStart: new Date(Date.now() - 24 * 3600e3).toISOString().replace(/\.\d+Z$/, "Z"),
        dateEnd: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
      });
    } catch (e) {
      report.ordersError = String(e);
    }
  }

  // Sepet ayarı. DİKKAT: hosted checkout tarayıcıyı
  // shopier.com/s/shipping/<slug> adresine POST'luyor — bu sepet adımıdır.
  // Sepet kapalıyken o POST tutmaz, kullanıcı boş mağaza sayfasına düşer.
  // disable_cart yalnızca hosted checkout kapalıyken mantıklı.
  if (url.searchParams.get("disable_cart") === "1") {
    try {
      report.cartUpdate = await client.shop.updateSettings({ cart: false });
    } catch (e) {
      report.cartUpdateError = String(e);
    }
  }
  if (url.searchParams.get("enable_cart") === "1") {
    try {
      report.cartUpdate = await client.shop.updateSettings({ cart: true });
    } catch (e) {
      report.cartUpdateError = String(e);
    }
  }

  // Taşıyıcı ürünlerin dökümü: kaç tane birikmiş, stok durumları ne.
  // ("Tükendi" olan bir ürün checkout'u boş mağaza sayfasına atar.)
  const carrierPrefix = CONFIG.siteName; // "outbid.love — <başlık> in <şehir>"
  let carriers: Array<{ id?: string; title?: string; stockStatus?: string }> = [];
  try {
    const all = await client.products.list({ limit: 100 });
    carriers = (all ?? []).filter((p) =>
      (p as { title?: string }).title?.startsWith(carrierPrefix)
    );
    report.carrierCount = carriers.length;
    report.carrierOutOfStock = carriers.filter(
      (p) => p.stockStatus === "outOfStock"
    ).length;
    if (url.searchParams.get("products") === "1") {
      report.carriers = carriers.map((p) => ({
        id: p.id,
        title: p.title,
        stockStatus: p.stockStatus,
      }));
    }
  } catch (e) {
    report.productsError = String(e);
  }

  // Temizlik: terk edilmiş taşıyıcı ürünleri sil. Son 3 saatte açılmış ve hâlâ
  // ödenmemiş checkout'ların ürünleri korunur — kullanıcı kart ekranında olabilir.
  if (url.searchParams.get("cleanup_products") === "1") {
    try {
      const keep = new Set(await openPaymentProducts());
      const deleted: string[] = [];
      const kept: string[] = [];
      for (const p of carriers) {
        if (!p.id) continue;
        if (keep.has(p.id)) {
          kept.push(p.id);
          continue;
        }
        try {
          await client.products.delete(p.id);
          deleted.push(p.id);
        } catch {
          /* tek tek geç */
        }
      }
      report.cleanupDeleted = deleted;
      report.cleanupKept = kept;
    } catch (e) {
      report.cleanupError = String(e);
    }
  }

  // Kaçan webhook telafisi: son N saatin ödenmiş siparişlerini tek tek
  // confirm_payment_by_product'a ver. Zaten işlenmişler duplicate döner.
  if (url.searchParams.get("sync_orders") === "1") {
    const hours = Math.min(Math.max(Number(url.searchParams.get("hours")) || 24, 1), 720);
    const synced: Array<Record<string, unknown>> = [];
    try {
      const orders = await client.orders.list({
        dateStart: new Date(Date.now() - hours * 3600e3).toISOString().replace(/\.\d+Z$/, "Z"),
        dateEnd: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
      });
      for (const order of orders ?? []) {
        if (order.paymentStatus && order.paymentStatus !== "paid") continue;
        for (const li of order.lineItems ?? []) {
          if (!li.productId) continue;
          const res = await confirmPaymentByProduct({
            productId: li.productId,
            paymentId: order.id,
            paidCents: moneyToCents(li.total) ?? moneyToCents(li.price) ?? null,
          });
          synced.push({ order: order.id, product: li.productId, ...res });
        }
      }
      report.syncedOrders = synced;
    } catch (e) {
      report.syncError = String(e);
      report.syncedOrders = synced;
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
