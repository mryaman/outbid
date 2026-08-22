"use client";

import { useEffect, useState } from "react";
import { CONFIG, centsToUsd } from "@/lib/config";
import { CATEGORIES } from "@/lib/categories";

/**
 * Ödemeli faz formu. fetch YOK — normal form POST:
 * sunucu, tarayıcıyı Shopier hosted checkout'a gönderen HTML ile yanıtlar.
 */
export default function BidForm({
  prefillLink = "",
  topCents = 0,
}: {
  prefillLink?: string;
  topCents?: number;
}) {
  const [link, setLink] = useState(prefillLink);
  const [amount, setAmount] = useState("");

  // "Outbid" butonundan gelen ?bid= önceden doldurma — sayfa statik kalsın
  // diye istemci tarafında okunur.
  useEffect(() => {
    const b = new URLSearchParams(window.location.search).get("bid");
    if (b) setLink(b);
  }, []);

  const minUsd = CONFIG.minBidCents / 100;
  const beatTop = topCents > 0 ? Math.ceil((topCents + 1) / 100) : null;

  return (
    <form className="form form--bid" method="POST" action="/api/checkout" id="bid">
      <label className="sr-only" htmlFor="bid-link">
        Your link or X handle
      </label>
      <input
        id="bid-link"
        name="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="yoursite.com or @yourhandle"
        autoComplete="off"
        spellCheck={false}
        required
      />
      <label className="sr-only" htmlFor="bid-amount">
        Bid amount in US dollars
      </label>
      <div className="amount-wrap">
        <span className="cur" aria-hidden>
          $
        </span>
        <input
          id="bid-amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="decimal"
          pattern="[0-9]+([.,][0-9]{1,2})?"
          placeholder={String(minUsd)}
          required
        />
      </div>
      <label className="sr-only" htmlFor="bid-category">
        Category
      </label>
      <select id="bid-category" name="category" defaultValue="other" className="cat-select">
        {CATEGORIES.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>
      {/* honeypot */}
      <input
        tabIndex={-1}
        autoComplete="off"
        className="hp"
        aria-hidden="true"
        name="website"
        defaultValue=""
      />
      <button type="submit">Outbid →</button>
      <p className="fine">
        Min {centsToUsd(CONFIG.minBidCents)}.
        {beatTop !== null && (
          <>
            {" "}
            Take #1 for <strong>${beatTop.toLocaleString("en-US")}</strong>.
          </>
        )}{" "}
        Pay by card via Shopier (charged in Turkish lira at the live rate) —
        your bid goes live the moment the payment clears, then starts decaying
        like everyone else&apos;s.
      </p>
    </form>
  );
}
