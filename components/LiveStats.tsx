"use client";

import { useEffect, useState } from "react";

/**
 * "N visitors · X online" — the reference boards' live counter.
 * A session id lives in sessionStorage so a reload isn't a new visitor.
 * Every read/write is wrapped: storage throws in private windows and
 * preview contexts, and the counter must never break the page.
 */
export default function LiveStats({
  initialVisits,
  initialOnline,
}: {
  initialVisits: number;
  initialOnline: number;
}) {
  const [visits, setVisits] = useState(initialVisits);
  const [online, setOnline] = useState(initialOnline);

  useEffect(() => {
    let session: string;
    try {
      const stored = sessionStorage.getItem("ob_sid");
      session = stored ?? crypto.randomUUID();
      if (!stored) sessionStorage.setItem("ob_sid", session);
    } catch {
      session = crypto.randomUUID();
    }

    let alive = true;
    const ping = async () => {
      try {
        const res = await fetch("/api/visit", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ session }),
        });
        if (!res.ok || !alive) return;
        const d = await res.json();
        if (typeof d.total === "number") setVisits(d.total);
        if (typeof d.online === "number") setOnline(d.online);
      } catch {
        /* sayaç sessizce başarısız olur, sayfayı etkilemez */
      }
    };

    ping();
    const id = setInterval(ping, 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return (
    <span className="live">
      <span className="dot" aria-hidden />
      {online.toLocaleString("en-US")} online
      <span className="sep" aria-hidden>
        ·
      </span>
      {visits.toLocaleString("en-US")} visitors
    </span>
  );
}
