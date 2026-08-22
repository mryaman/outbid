import { NextResponse } from "next/server";
import { trackVisit } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  try {
    const { session } = await req.json();
    if (typeof session !== "string" || !UUID.test(session)) {
      return NextResponse.json({ total: 0, online: 0 });
    }
    return NextResponse.json(await trackVisit(session));
  } catch {
    return NextResponse.json({ total: 0, online: 0 });
  }
}
