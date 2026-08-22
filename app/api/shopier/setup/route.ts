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

  return NextResponse.json(report);
}
