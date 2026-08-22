"use client";

import { useEffect, useState } from "react";
import { CONFIG, centsToUsd } from "@/lib/config";

/**
 * Ödemeli faz formu. fetch YOK — normal form POST:
 * sunucu, tarayıcıyı Shopier hosted checkout'a gönderen HTML ile yanıtlar.
 * Şehir formun bir parçası: teklif her zaman bir şehre verilir.
 *
 * Kategori seçimi formda GÖRÜNMÜYOR (kullanıcı isteği). Kategori sayfasından
 * gelen ?cat=<slug> gizli alan olarak taşınır; doğrudan gelenler "other".
 *
 * `labels` / `locale` çevrilmiş sayfalardan geçirilir; verilmezse İngilizce.
 */

export type BidLabels = {
  linkAria: string;
  linkPlaceholder: string;
  amountAria: string;
  /** {city} */
  submit: string;
  /** {min} {top} */
  fine: string;
};

const EN: BidLabels = {
  linkAria: "Your profile link or @handle",
  linkPlaceholder: "@yourhandle, a profile link, or yoursite.com",
  amountAria: "Bid amount in US dollars",
  submit: "Take {city} →",
  fine:
    "Min {min}. Take #1 for {top}. Pay by card via Shopier (charged in Turkish lira at the live rate) — your bid goes live the moment the payment clears, then starts decaying like everyone else's.",
};

export default function BidForm({
  cityId,
  cityName,
  prefillLink = "",
  topCents = 0,
  labels = EN,
  locale,
}: {
  cityId: string;
  cityName?: string;
  prefillLink?: string;
  topCents?: number;
  labels?: BidLabels;
  locale?: string;
}) {
  const [link, setLink] = useState(prefillLink);
  const [amount, setAmount] = useState("");
  const [cat, setCat] = useState("other");

  // "Boost" butonundan gelen ?bid= ve kategori sayfasından gelen ?cat=
  // istemci tarafında okunur — sayfa ISR-statik kalsın diye.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const b = q.get("bid");
    if (b) setLink(b);
    const c = q.get("cat");
    if (c && /^[a-z0-9-]{1,40}$/.test(c)) setCat(c);
  }, []);

  const minUsd = CONFIG.minBidCents / 100;
  const beatTop = topCents > 0 ? topCents + 1 : CONFIG.minBidCents;
  const fine = labels.fine
    .replace("{min}", centsToUsd(CONFIG.minBidCents))
    .replace("{top}", "$" + Math.ceil(beatTop / 100).toLocaleString("en-US"));

  return (
    <form className="form form--bid" method="POST" action="/api/checkout" id="bid">
      <input type="hidden" name="city" value={cityId} />
      <input type="hidden" name="category" value={cat} />
      {locale && locale !== "en" && <input type="hidden" name="lang" value={locale} />}

      <label className="sr-only" htmlFor="bid-link">
        {labels.linkAria}
      </label>
      <input
        id="bid-link"
        name="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder={labels.linkPlaceholder}
        autoComplete="off"
        spellCheck={false}
        required
      />

      <label className="sr-only" htmlFor="bid-amount">
        {labels.amountAria}
      </label>
      <div className="amount-wrap">
        <span className="cur" aria-hidden>$</span>
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

      {/* honeypot */}
      <input
        tabIndex={-1}
        autoComplete="off"
        className="hp"
        aria-hidden="true"
        name="website"
        defaultValue=""
      />

      <button type="submit">{labels.submit.replace("{city}", cityName ?? "")}</button>

      <p className="fine">{fine}</p>
    </form>
  );
}
