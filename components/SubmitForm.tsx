"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Kuruluş fazı formu.
 *
 * Kategori formda SORULMUYOR (kullanıcı isteği): kategori sayfasındaki
 * "burayı kap" bağlantısı ?cat=<slug> taşır, doğrudan gelenler "other".
 *
 * `labels` çevrilmiş sayfalardan geçirilir; verilmezse İngilizce.
 */

export type SubmitLabels = {
  linkAria: string;
  linkPlaceholder: string;
  submit: string;
  sending: string;
  /** {city} */
  done: string;
  errGeneric: string;
  errNetwork: string;
};

const EN: SubmitLabels = {
  linkAria: "Your link or X handle",
  linkPlaceholder: "@yourhandle, a profile link, or yoursite.com",
  submit: "Claim a spot",
  sending: "Claiming…",
  done: "You're on {city}. Your credit started decaying just now.",
  errGeneric: "Something went wrong.",
  errNetwork: "Couldn't reach the server. Try again.",
};

export default function SubmitForm({
  cityId,
  cityName,
  labels = EN,
}: {
  cityId: string;
  cityName?: string;
  labels?: SubmitLabels;
}) {
  const router = useRouter();
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("other");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  // Kategori sayfasındaki "burayı kap" bağlantısı ?cat=<slug> taşır.
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("cat");
    if (c && /^[a-z0-9-]{1,40}$/.test(c)) setCategory(c);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError(null);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ link, website, category, city: cityId }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? labels.errGeneric);
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
        {labels.done.replace("{city}", cityName ?? "the board")}
      </p>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <label className="sr-only" htmlFor="link">
        {labels.linkAria}
      </label>
      <input
        id="link"
        name="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder={labels.linkPlaceholder}
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
      <button type="submit" disabled={state === "sending"}>
        {state === "sending" ? labels.sending : labels.submit}
      </button>
      {error && (
        <p className="err" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
