import { NextResponse } from "next/server";
import { submitListing } from "@/lib/db";
import { CONFIG } from "@/lib/config";
import { normalizeInput } from "@/lib/normalize";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MESSAGES: Record<string, string> = {
  full: "The founding roster is full.",
  duplicate: "That link is already on the board.",
  rate_limited: "Too many attempts. Try again in a little while.",
  invalid_kind: "That link isn't valid.",
  server_error: "Something went wrong on our end.",
};

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : "").trim() || "0.0.0.0";
}

export async function POST(req: Request) {
  let body: { link?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot — real people never see this field.
  if (body.website) return NextResponse.json({ ok: true });

  if (CONFIG.phase !== "founding") {
    return NextResponse.json(
      { error: "The founding phase has closed." },
      { status: 403 }
    );
  }

  let n;
  try {
    n = normalizeInput(String(body.link ?? ""));
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "That link isn't valid." },
      { status: 400 }
    );
  }

  const result = await submitListing({
    kind: n.kind,
    dedupeKey: n.dedupeKey,
    targetUrl: n.targetUrl,
    title: n.title,
    iconUrl: n.iconUrl,
    ip: clientIp(req),
  });

  if (result.error) {
    const status =
      result.error === "full" || result.error === "duplicate"
        ? 409
        : result.error === "rate_limited"
          ? 429
          : 400;
    return NextResponse.json(
      { error: MESSAGES[result.error] ?? MESSAGES.server_error, code: result.error },
      { status }
    );
  }

  return NextResponse.json({ ok: true, id: result.id });
}
