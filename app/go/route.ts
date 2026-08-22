import { NextResponse } from "next/server";
import { registerClick, getTarget } from "@/lib/db";
import { withUtm } from "@/lib/normalize";
import { CONFIG } from "@/lib/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BOT = /bot|crawler|spider|crawling|preview|fetch|curl|wget|headless|slurp/i;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Outbound redirect + click counter.  /go?id=<uuid>
 * Bots still reach the destination (link previews must work) but don't
 * move the counter, so the public click numbers stay honest.
 */
export async function GET(req: Request) {
  const home = process.env.NEXT_PUBLIC_SITE_URL || CONFIG.url;
  const id = new URL(req.url).searchParams.get("id") ?? "";

  if (!UUID.test(id)) return NextResponse.redirect(home, 302);

  const isBot = BOT.test(req.headers.get("user-agent") ?? "");
  const target = isBot ? await getTarget(id) : await registerClick(id);

  if (!target) return NextResponse.redirect(home, 302);
  return NextResponse.redirect(withUtm(target), 302);
}
