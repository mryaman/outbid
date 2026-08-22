import type { Metadata } from "next";
import Script from "next/script";
import { CONFIG } from "@/lib/config";
import { OG_LOCALE, altLanguages, dict } from "@/lib/i18n";
import { CITY } from "@/lib/i18n/city";
import "./globals.css";

const EN = dict("en");
const C = CITY.en;

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.url),
  title: {
    default: C.metaTitle,
    template: `%s · ${CONFIG.siteName}`,
  },
  description: C.metaDesc,
  applicationName: CONFIG.siteName,
  alternates: { canonical: "/", languages: altLanguages("") },
  keywords: EN.keywords,
  category: "technology",
  openGraph: {
    title: C.metaTitle,
    description: C.metaDesc,
    url: CONFIG.url,
    siteName: CONFIG.siteName,
    type: "website",
    locale: "en_US",
    alternateLocale: Object.values(OG_LOCALE).filter((x) => x !== "en_US"),
    images: [{ url: "/og-card.png", width: 1200, height: 630, alt: CONFIG.siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: C.metaTitle,
    description: C.metaDesc,
    images: ["/og-card.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Plausible: cookiesiz, GDPR uyumlu, milyonluk günlük hit'e dayanır.
  // Domain env'den geliyor ki alan adı bağlanmadan önce de deploy edilebilsin.
  const domain =
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || new URL(CONFIG.url).hostname;

  return (
    // Kök <html lang> İngilizce; çevrilmiş sayfalar kendi <main lang=".." dir="..">
    // özniteliğini veriyor (Next'te kök layout dinamik parametre alamıyor).
    // Dil sinyali asıl olarak hreflang + og:locale + içeriğin kendisinden geliyor.
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=Public+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap"
        />
        {/* Üretken arama motorları için makine-okunur özet. */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
        <link
          rel="alternate"
          type="application/json"
          href="/leaderboard.json"
          title="Live leaderboard data"
        />
      </head>
      <body>
        {children}
        <Script
          defer
          data-domain={domain}
          src="https://plausible.io/js/script.outbound-links.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
