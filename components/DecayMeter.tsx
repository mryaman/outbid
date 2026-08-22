"use client";

import { CONFIG, centsToUsd, decayed } from "@/lib/config";

/** Fourteen days of decay. Fastest way to explain the rule. */
export default function DecayMeter({ startCents }: { startCents: number }) {
  const days = [0, 1, 3, 7, 10, 14];
  const max = startCents || 1;

  return (
    <div className="meter" role="img" aria-label="Decay curve over fourteen days">
      {days.map((d) => {
        const v = decayed(startCents, d);
        return (
          <div className="bar" key={d}>
            <div className="fill" style={{ height: `${Math.max(3, (v / max) * 100)}%` }} />
            <span className="val">{centsToUsd(v)}</span>
            <span className="day">{d === 0 ? "now" : `${d}d`}</span>
          </div>
        );
      })}
      <p className="meter-note">
        {Math.round((1 - CONFIG.decayPerDay) * 100)}% per day
      </p>
    </div>
  );
}
