"use client";

import { useEffect, useState } from "react";

/**
 * Ödeme dönüşü / hata bildirimleri. Query string istemci tarafında okunur ki
 * sayfa ISR-statik kalabilsin.
 */
const ERR: Record<string, string> = {
  closed: "Paid bidding isn't open yet.",
  bad_request: "That didn't come through right. Try again.",
  bad_link: "That link isn't valid.",
  bad_amount: "Enter a valid amount (min $5, max $5,000).",
  unknown_city: "Pick a city from the search list first.",
  duplicate: "That link already holds a spot in this city.",
  rate_limited: "Too many attempts from your network. Try again in a bit.",
  not_configured: "Payments are being wired up. Try again soon.",
  provider_error: "Our payment provider hiccuped. Nothing was charged — try again.",
  server_error: "Something went wrong on our end. Nothing was charged.",
  forbidden: "Something went wrong on our end. Nothing was charged.",
};

export default function Banner() {
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get("paid")) {
      setMsg({
        kind: "ok",
        text: "Payment received. Your bid lands on the board the moment Shopier confirms it — usually within seconds. Refresh if you don't see it yet.",
      });
    } else if (q.get("err")) {
      const custom = q.get("m");
      setMsg({
        kind: "err",
        text: custom || ERR[q.get("err") ?? ""] || "Something went wrong.",
      });
    }
  }, []);

  if (!msg) return null;
  return (
    <p className={msg.kind === "ok" ? "notice notice--ok" : "notice notice--err"} role="status">
      {msg.text}
    </p>
  );
}
