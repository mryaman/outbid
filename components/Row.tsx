"use client";

import { useEffect, useState } from "react";
import { CONFIG, centsToUsd, hoursUntilBelow, humanHours } from "@/lib/config";
import type { Row as R } from "@/lib/db";

/**
 * A board row. The effective amount decays in the browser, second by
 * second, starting from the server value and applying the same formula.
 * Watching the number fall is what makes people pay again — if decay is
 * invisible, the whole mechanic does nothing.
 */
export default function Row({
  rank,
  row,
  nextCents,
  canOutbid = false,
}: {
  rank: number;
  row: R;
  nextCents: number;
  canOutbid?: boolean;
}) {
  const [cents, setCents] = useState(row.effective_cents);

  useEffect(() => {
    const base = row.effective_cents;
    const t0 = Date.now();
    const id = setInterval(() => {
      const days = (Date.now() - t0) / 86_400_000;
      setCents(Math.round(base * Math.pow(CONFIG.decayPerDay, days)));
    }, 1000);
    return () => clearInterval(id);
  }, [row.effective_cents]);

  const hrs = nextCents > 0 ? hoursUntilBelow(cents, nextCents) : Infinity;
  const soon = Number.isFinite(hrs) && hrs < 48;

  return (
    <a className="row" href={`/go?id=${row.id}`} rel="nofollow noopener">
      <span className="rank">#{rank}</span>
      {row.icon_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="icon"
          src={row.icon_url}
          alt=""
          width={40}
          height={40}
          loading="lazy"
        />
      ) : (
        <span className="icon icon--blank" aria-hidden />
      )}
      <span className="meta">
        <span className="title">{row.title}</span>
        <span className="sub">
          {row.click_count.toLocaleString("en-US")} clicks
          {soon && (
            <>
              <span aria-hidden> · </span>
              <span className="warn">
                falls to #{rank + 1} in {humanHours(hrs)}
              </span>
            </>
          )}
        </span>
      </span>
      <span
        className="amount"
        title={`Total paid: ${centsToUsd(row.lifetime_cents)}`}
      >
        {centsToUsd(cents)}
      </span>
      {canOutbid && (
        <button
          type="button"
          className="outbid-btn"
          title={`Add to ${row.title}'s bid`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const prefill = row.kind === "x" ? row.title : row.target_url;
            window.location.href = `/?bid=${encodeURIComponent(prefill)}#bid`;
          }}
        >
          Boost
        </button>
      )}
    </a>
  );
}
