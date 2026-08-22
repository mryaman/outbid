import type { Metadata } from "next";
import Script from "next/script";
import { CONFIG } from "@/lib/config";
import "./globals.css";

const DESC =
  "The pay-to-rank leaderboard where every bid decays 10% a day. Bid any amount to put your site or X handle on top — nobody sits at #1 forever.";

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.url),
  title: {
    default: `${CONFIG.siteName} — ${CONFIG.tagline}`,
    template: `%s · ${CONFIG.siteName}`,
  },
  description: DESC,
  alternates: { canonical: "/" },
  keywords: [
    "outbid",
    "pay to rank leaderboard",
    "bid for the top spot",
    "decaying leaderboard",
    "advertise your website",
    "outbid.lol alternative",
  ],
  openGraph: {
    title: `${CONFIG.siteName} — ${CONFIG.tagline}`,
    description: DESC,
    url: CONFIG.url,
    siteName: CONFIG.siteName,
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-card.png", width: 1200, height: 630, alt: CONFIG.siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${CONFIG.siteName} — ${CONFIG.tagline}`,
    description: DESC,
    images: ["/og-card.png"],
  },
  robots: { index: true, follow: true },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: CONFIG.siteName,
  url: CONFIG.url,
  description: DESC,
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=Public+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
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
