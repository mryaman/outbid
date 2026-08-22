import type { NextConfig } from "next";

const config: NextConfig = {
  // İkonlar dış CDN'lerden geliyor (gstatic favicon, unavatar).
  // <img> kullanıyoruz, bu yüzden remotePatterns'a gerek yok — depolama maliyeti sıfır.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default config;
