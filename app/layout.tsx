import type { Metadata } from "next";
import Script from "next/script";
import { CONFIG } from "@/lib/config";
import "./globals.css";

const DESC =
  "Your rank is whatever you paid — but every payment decays 10% a day. The top is always winnable.";

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.url),
  title: `${CONFIG.siteName} — ${CONFIG.tagline}`,
  description: DESC,
  openGraph: {
    title: `${CONFIG.siteName} — ${CONFIG.tagline}`,
    description: DESC,
    url: CONFIG.url,
    siteName: CONFIG.siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${CONFIG.siteName} — ${CONFIG.tagline}`,
    description: DESC,
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
