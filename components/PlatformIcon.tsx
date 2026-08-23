"use client";

import type { Platform } from "@/lib/normalize";
import { PLATFORM_LABEL } from "@/lib/normalize";
// Yollar küre işaretleriyle ortak: lib/platformPaths.ts tek kaynak.
import { PLATFORM_PATH as PATH } from "@/lib/platformPaths";

/**
 * Platform amblemi. Profil fotoğrafı YOK: her kayıt yapıştırdığı adresin
 * kendi logosunu taşır, web siteleri dünya simgesini. Böylece hiçbir satır
 * boş kalmaz ve dış bir avatar servisine bağlı kalmayız.
 *
 * Marka yolları `lib/platformPaths.ts` içinde — küre üzerindeki işaretler de
 * aynı yolları kullanıyor.
 */


export default function PlatformIcon({
  platform,
  className = "icon",
}: {
  platform: Platform;
  className?: string;
}) {
  const label = PLATFORM_LABEL[platform];

  if (platform === "web") {
    return (
      <span className={`${className} plogo plogo--web`} role="img" aria-label={label}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <circle cx="12" cy="12" r="9.2" />
          <ellipse cx="12" cy="12" rx="4.1" ry="9.2" />
          <path d="M2.9 9.2h18.2M2.9 14.8h18.2" />
        </svg>
      </span>
    );
  }

  return (
    <span className={`${className} plogo plogo--${platform}`} role="img" aria-label={label}>
      <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden>
        <path d={PATH[platform]} />
      </svg>
    </span>
  );
}
