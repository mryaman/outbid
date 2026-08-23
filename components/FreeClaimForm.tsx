"use client";

/**
 * Boş şehri ücretsiz alma formu.
 *
 * Yalnızca o şehirde canlı kayıt yokken gösterilir. Ödeme yok: /api/claim
 * bir kez çağrılır, sunucu sembolik çürüyen krediyle kaydı açar. Şehir bu
 * arada dolmuşsa sunucu `city_taken` döner — kullanıcıya ödemeli akış önerilir.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CONFIG, centsToUsd } from "@/lib/config";
import { FREE, freeError, type FreeLabels } from "@/lib/i18n/free";

export default function FreeClaimForm({
  cityId,
  cityName,
  labels = FREE.en,
  credit = CONFIG.freeFirstCents,
  placeholder = "@yourhandle, a profile link, or yoursite.com",
}: {
  cityId: string;
  cityName: string;
  labels?: FreeLabels;
  credit?: number;
  /** Çevrilmiş sayfalardan geçirilir. */
  placeholder?: string;
}) {
  const router = useRouter();
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("other");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  // Kategori sayfasından gelen ?cat=<slug> ve Boost'tan gelen ?bid=
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const c = q.get("cat");
    if (c && /^[a-z0-9-]{1,40}$/.test(c)) setCategory(c);
    const b = q.get("bid");
    if (b) setLink(b);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ link, website, category, city: cityId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(freeError(labels, data.code, data.error));
        setState("idle");
        return;
      }
      setState("done");
      setLink("");
      router.refresh();
    } catch {
      setError(labels.errNetwork);
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <p className="ok" role="status">
        {labels.done.replace("{city}", cityName).replace("{credit}", centsToUsd(credit))}
      </p>
    );
  }

  return (
    <form className="form form--free" onSubmit={submit}>
      <label className="sr-only" htmlFor="free-link">
        {labels.submit.replace("{city}", cityName)}
      </label>
      <input
        id="free-link"
        name="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        required
      />
      <input
        tabIndex={-1}
        autoComplete="off"
        className="hp"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      <button type="submit" className="free-go" disabled={state === "sending"}>
        {state === "sending" ? labels.sending : labels.submit.replace("{city}", cityName)}
      </button>
      {error && (
        <p className="err" role="alert">
          {error}
        </p>
      )}
      <p className="fine">
        {labels.fine
          .replace("{credit}", centsToUsd(credit))
          .replace("{pct}", String(Math.round((1 - CONFIG.decayPerDay) * 100)))
          .replace("{min}", centsToUsd(CONFIG.minBidCents))}
      </p>
    </form>
  );
}
