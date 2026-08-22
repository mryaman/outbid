"use client";

/**
 * Ana sayfadaki tek adımlık teklif formu: link + şehir + tutar.
 *
 * Teklif her zaman bir şehre verilir, ama kullanıcıyı önce şehir sayfasına
 * yollamak insan kaybettiriyordu — şehri buradan seçiyor, küre de seçtiği
 * şehre dönüyor. Ödemeli fazda normal form POST'u (sunucu Shopier hosted
 * checkout HTML'i döndürüyor); kuruluş fazında /api/submit.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CONFIG, centsToUsd } from "@/lib/config";
import CitySearch, { type Hit } from "./CitySearch";
import { dict, localePath, type Locale } from "@/lib/i18n";
import { CITY } from "@/lib/i18n/city";
import { FORM } from "@/lib/i18n/forms";

export default function ClaimForm({
  onPreview,
  paid,
  locale = "en",
}: {
  onPreview?: (id: string) => void;
  /** Faz sunucudan geliyor: PHASE bir NEXT_PUBLIC_ değişkeni değil, yani
   *  istemci paketinde okunamaz. */
  paid: boolean;
  /** Çevrilmiş sayfalarda dil — etiketler ve şehir bağlantısı buradan. */
  locale?: Locale;
}) {
  const router = useRouter();
  const t = dict(locale);
  const f = FORM[locale];
  const c = CITY[locale];

  const [link, setLink] = useState("");
  const [city, setCity] = useState<Hit | null>(null);
  const [amount, setAmount] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  // "Boost" düğmesinden gelen ?bid= önceden doldurma
  useEffect(() => {
    const b = new URLSearchParams(window.location.search).get("bid");
    if (b) setLink(b);
  }, []);

  const pick = (h: Hit) => {
    setCity(h);
    setError(null);
    onPreview?.(h.id);
  };

  // --- kuruluş fazı: fetch ile ---
  async function submitFounding(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    if (!city) { setError(f.pickCityFirst); return; }
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ link, website, city: city.id, category: "other" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? f.errGeneric);
        setState("idle");
        return;
      }
      setState("done");
      setLink("");
      router.refresh();
    } catch {
      setError(f.errNetwork);
      setState("idle");
    }
  }

  if (state === "done" && city) {
    return (
      <p className="ok" role="status">
        {f.done.replace("{city}", city.name)}{" "}
        <a href={localePath(locale, `/city/${city.id}`)}>{f.seeCity}</a>
      </p>
    );
  }

  const cityField = (
    <div className="claim__city">
      {city ? (
        <button
          type="button"
          className="citypick"
          onClick={() => setCity(null)}
          title={f.changeCity}
        >
          <span aria-hidden>{city.flag}</span>
          <b>{city.name}</b>
          <span className="citypick__x" aria-hidden>×</span>
        </button>
      ) : (
        <CitySearch
          onPreview={onPreview}
          onPick={pick}
          clearOnPick
          placeholder={f.cityPlaceholder}
        />
      )}
    </div>
  );

  // --- ödemeli faz: düz form POST ---
  if (paid) {
    return (
      <form
        className="claim"
        method="POST"
        action="/api/checkout"
        id="bid"
        onSubmit={(e) => {
          if (!city) { e.preventDefault(); setError(f.pickCityFirst); }
        }}
      >
        <input type="hidden" name="city" value={city?.id ?? ""} />
        <input type="hidden" name="category" value="other" />
        {locale !== "en" && <input type="hidden" name="lang" value={locale} />}

        <label className="sr-only" htmlFor="claim-link">{t.formLinkPlaceholder}</label>
        <input
          id="claim-link"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder={t.formLinkPlaceholder}
          autoComplete="off"
          spellCheck={false}
          required
        />

        {cityField}

        <div className="amount-wrap">
          <span className="cur" aria-hidden>$</span>
          <label className="sr-only" htmlFor="claim-amount">{f.amountAria}</label>
          <input
            id="claim-amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputMode="decimal"
            pattern="[0-9]+([.,][0-9]{1,2})?"
            placeholder={String(CONFIG.minBidCents / 100)}
            required
          />
        </div>

        <input
          tabIndex={-1}
          autoComplete="off"
          className="hp"
          aria-hidden="true"
          name="website"
          defaultValue=""
        />

        <button type="submit" className="claim__go">
          {city ? c.cityTakeBtn.replace("{city}", city.name) : f.takeYourCity}
        </button>

        {error && <p className="err" role="alert">{error}</p>}

        <p className="fine">{t.bidFine}</p>
      </form>
    );
  }

  // --- kuruluş fazı ---
  return (
    <form className="claim" onSubmit={submitFounding} id="bid">
      <label className="sr-only" htmlFor="claim-link">{t.formLinkPlaceholder}</label>
      <input
        id="claim-link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder={t.formLinkPlaceholder}
        autoComplete="off"
        spellCheck={false}
        required
      />

      {cityField}

      <input
        tabIndex={-1}
        autoComplete="off"
        className="hp"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />

      <button type="submit" className="claim__go" disabled={state === "sending"}>
        {state === "sending" ? "Claiming…" : city ? `Claim ${city.name}` : "Claim your city"}
      </button>

      {error && <p className="err" role="alert">{error}</p>}

      <p className="fine">
        Founding phase: free, and you start with {centsToUsd(CONFIG.foundingCents)}{" "}
        of decaying credit. X, TikTok, Instagram, LinkedIn, YouTube, GitHub — or
        any link you own.
      </p>
    </form>
  );
}
