"use client";

/**
 * Şehir araması. 5.000 şehir sunucuda duruyor (istemciye 800 KB indirmek
 * yerine), sorgu /api/cities'e gidiyor. Klavyeyle gezerken küre o şehre
 * dönüyor; Enter/tık şehir sayfasını açıyor.
 */

import { useEffect, useRef, useState } from "react";

export type Hit = {
  id: string;
  name: string;
  country: string;
  cc: string;
  flag: string;
  cents: number;
  listings: number;
};

export default function CitySearch({
  onPreview,
  placeholder = "Search any city — Istanbul, Lagos, São Paulo…",
  autoFocus = false,
}: {
  onPreview?: (id: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const seq = useRef(0);

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setHits([]);
      return;
    }
    const id = ++seq.current;
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/cities?q=${encodeURIComponent(term)}`);
        const data = (await res.json()) as { cities: Hit[] };
        if (id === seq.current) {
          setHits(data.cities ?? []);
          setActive(0);
          setOpen(true);
        }
      } catch {
        /* sessiz geç — arama kritik yol değil */
      }
    }, 140);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const go = (h: Hit) => {
    window.location.href = `/city/${h.id}`;
  };

  const move = (delta: number) => {
    if (!hits.length) return;
    const next = (active + delta + hits.length) % hits.length;
    setActive(next);
    onPreview?.(hits[next].id);
  };

  return (
    <div className="csearch" ref={boxRef}>
      <input
        type="search"
        value={q}
        autoFocus={autoFocus}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => hits.length && setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
          else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
          else if (e.key === "Enter" && hits[active]) { e.preventDefault(); go(hits[active]); }
          else if (e.key === "Escape") setOpen(false);
        }}
        placeholder={placeholder}
        aria-label="Search cities"
        autoComplete="off"
        spellCheck={false}
      />

      {open && hits.length > 0 && (
        <ul className="csearch__list" role="listbox">
          {hits.map((h, i) => (
            <li key={h.id}>
              <button
                type="button"
                role="option"
                aria-selected={i === active}
                className={i === active ? "is-active" : ""}
                onMouseEnter={() => { setActive(i); onPreview?.(h.id); }}
                onClick={() => go(h)}
              >
                <span className="csearch__flag" aria-hidden>{h.flag}</span>
                <span className="csearch__name">
                  {h.name}
                  <span className="csearch__country">{h.country}</span>
                </span>
                <span className="csearch__amt">
                  {h.cents > 0
                    ? `$${(h.cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`
                    : "open"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
