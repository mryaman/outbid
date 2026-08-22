import type { MetadataRoute } from "next";
import { CONFIG } from "@/lib/config";
import { CATEGORIES } from "@/lib/categories";
import { topCities } from "@/lib/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: CONFIG.url,
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${CONFIG.url}/board`,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    // Şehir sayfaları asıl SEO yüzeyi: "who is #1 in <city>".
    ...topCities(1200).map((c) => ({
      url: `${CONFIG.url}/city/${c.id}`,
      changeFrequency: "hourly" as const,
      priority: 0.7,
    })),
    {
      url: `${CONFIG.url}/categories`,
      changeFrequency: "hourly",
      priority: 0.8,
    },
    ...CATEGORIES.map((c) => ({
      url: `${CONFIG.url}/categories/${c.slug}`,
      changeFrequency: "hourly" as const,
      priority: 0.6,
    })),
    {
      url: `${CONFIG.url}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${CONFIG.url}/rules`,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    ...["price", "terms", "privacy", "policy"].map((p) => ({
      url: `${CONFIG.url}/${p}`,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];
}
