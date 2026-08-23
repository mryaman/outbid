"use client";

import { useEffect, useState } from "react";
import { CONFIG, centsToUsd, hoursUntilBelow, humanHours } from "@/lib/config";
import { platformOf } from "@/lib/normalize";
import PlatformIcon from "./PlatformIcon";
import type { Row as R } from "@/lib/db";
import { ROW_LABELS, type RowLabels } from "@/lib/i18n/row";

const t = (s: string, v: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (m, k) => (k in v ? String(v[k]) : m));

/**
 * Board satırı. Etkin tutar tarayıcıda saniye saniye eriyor — sunucudan
 * gelen değerden başlayıp aynı formülü uygulayarak. Çürüme görünmezse
 * mekanik hiçbir şey yapmaz; asıl ürün bu sayının düşüşü.
 *
 * `labels` / `langPrefix` çevrilmiş sayfalardan geçirilir; verilmezse İngilizce.
 */
export default function Row({
  rank,
  row,
  nextCents,
  canOutbid = false,
  cityId,
  showCity = false,
  labels = ROW_LABELS.en,
  langPrefix = "",
}: {
  rank: number;
  row: R;
  nextCents: number;
  canOutbid?: boolean;
  cityId?: string;
  showCity?: boolean;
  labels?: RowLabels;
  /** "" (İngilizce) ya da "/ru" gibi dil öneki. */
  langPrefix?: string;
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
  const platform = platformOf(row.target_url);
  // Teklif her zaman bir şehre verilir; şehri olmayan eski kayıtta Boost
  // gidecek bir yer bulamaz — düğmeyi hiç göstermiyoruz.
  const boostCity = cityId ?? row.city_id;

  return (
    <a className="row" href={`/go?id=${row.id}`} rel="nofollow noopener">
      <span className="rank">#{rank}</span>

      <PlatformIcon platform={platform} />

      <span className="meta">
        <span className="title">{row.title}</span>
        <span className="sub">
          {showCity && row.city_name && (
            <>
              <span className="citychip">{row.city_name}</span>
              <span aria-hidden> · </span>
            </>
          )}
          {t(labels.clicks, { n: row.click_count.toLocaleString("en-US") })}
          {soon && (
            <>
              <span aria-hidden> · </span>
              <span className="warn">
                {t(labels.falls, { rank: rank + 1, t: humanHours(hrs) })}
              </span>
            </>
          )}
        </span>
      </span>

      <span className="amount" title={t(labels.totalPaid, { amt: centsToUsd(row.lifetime_cents) })}>
        {centsToUsd(cents)}
      </span>

      {canOutbid && boostCity && (
        <button
          type="button"
          className="outbid-btn"
          title={`${labels.boost} — ${row.title}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const prefill = row.kind === "x" ? row.title : row.target_url;
            window.location.href =
              `${langPrefix}/city/${boostCity}?bid=${encodeURIComponent(prefill)}#bid`;
          }}
        >
          {labels.boost}
        </button>
      )}
    </a>
  );
}
