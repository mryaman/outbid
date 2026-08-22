"use client";

/**
 * Şehirler ligi — en kalabalıktan (en çok harcayandan) en aza.
 * Tutarlar tarayıcıda saniye saniye eriyor: board satırlarıyla aynı formül.
 */

import { useEffect, useState } from "react";
import { CONFIG, centsToUsd } from "@/lib/config";
import type { LeagueRow } from "@/lib/db";

function useDecay(base: number): number {
  const [cents, setCents] = useState(base);
  useEffect(() => {
    const t0 = Date.now();
    const id = setInterval(() => {
      const days = (Date.now() - t0) / 86_400_000;
      setCents(Math.round(base * Math.pow(CONFIG.decayPerDay, days)));
    }, 1000);
    return () => clearInterval(id);
  }, [base]);
  return cents;
}

function flag(cc: string): string {
  if (!/^[A-Za-z]{2}$/.test(cc)) return "";
  return String.fromCodePoint(
    ...cc.toUpperCase().split("").map((ch) => 127397 + ch.charCodeAt(0))
  );
}

function LeagueRowView({
  row,
  rank,
  langPrefix = "",
  profiles = "{n} profiles",
}: {
  row: LeagueRow;
  rank: number;
  langPrefix?: string;
  profiles?: string;
}) {
  const cents = useDecay(row.effective_cents);

  return (
    <a className="lrow" href={`${langPrefix}/city/${row.id}`}>
      <span className="rank">#{rank}</span>
      <span className="lflag" aria-hidden>{flag(row.country_code)}</span>
      <span className="meta">
        <span className="title">
          {row.name}
          <span className="lcountry">{row.country}</span>
        </span>
        <span className="sub">
          {profiles.replace("{n}", String(row.listings))}
          {row.top_title && (
            <>
              <span aria-hidden> · </span>
              <span className="ltop">#1 {row.top_title}</span>
            </>
          )}
        </span>
      </span>
      <span className="amount" title={`Total paid: ${centsToUsd(row.lifetime_cents)}`}>
        {centsToUsd(cents)}
      </span>
    </a>
  );
}

export default function LeagueTable({
  rows,
  langPrefix = "",
  profiles,
  empty = "No city has been claimed yet. The first payment anywhere on earth takes the top of the league.",
}: {
  rows: LeagueRow[];
  langPrefix?: string;
  profiles?: string;
  empty?: string;
}) {
  if (!rows.length) {
    return <p className="empty">{empty}</p>;
  }
  return (
    <div className="league">
      {rows.map((r, i) => (
        <LeagueRowView
          key={r.id}
          row={r}
          rank={i + 1}
          langPrefix={langPrefix}
          profiles={profiles}
        />
      ))}
    </div>
  );
}
