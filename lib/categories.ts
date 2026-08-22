/** Kategori taksonomisi — her biri kendi sıralama sayfasına (SEO yüzeyi) sahip. */

export type Category = { slug: string; name: string };

export const CATEGORIES: Category[] = [
  { slug: "ai-agents", name: "AI Agents & Infrastructure" },
  { slug: "ai-media", name: "AI Media Generation" },
  { slug: "marketing", name: "Marketing & Advertising" },
  { slug: "dev-tools", name: "Developer Tools" },
  { slug: "productivity", name: "Productivity & Personal Tools" },
  { slug: "people", name: "People & Profiles" },
  { slug: "design", name: "Design & Creative" },
  { slug: "seo", name: "SEO & AI Visibility" },
  { slug: "social", name: "Social Media & Creator Tools" },
  { slug: "writing", name: "Writing & Content" },
  { slug: "sales", name: "Sales & Lead Generation" },
  { slug: "business", name: "Business, Finance & Legal" },
  { slug: "games", name: "Games & Entertainment" },
  { slug: "education", name: "Education & Learning" },
  { slug: "health", name: "Health, Fitness & Wellness" },
  { slug: "ecommerce", name: "Ecommerce & Retail" },
  { slug: "directories", name: "Directories, Launch & Discovery" },
  { slug: "hiring", name: "Hiring, Jobs & Careers" },
  { slug: "audio", name: "Audio, Voice & Podcasting" },
  { slug: "agencies", name: "Agencies, Studios & Services" },
  { slug: "security", name: "Security, Privacy & Compliance" },
  { slug: "travel", name: "Travel, Local & Lifestyle" },
  { slug: "media", name: "Media & News" },
  { slug: "domains", name: "Domains & Web Assets" },
  { slug: "leaderboards", name: "Leaderboards & Attention Markets" },
  { slug: "real-estate", name: "Real Estate & Property" },
  { slug: "other", name: "Other" },
];

const BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));

export function categoryName(slug: string | null | undefined): string {
  return BY_SLUG.get(slug ?? "other")?.name ?? "Other";
}

export function isValidCategory(slug: string): boolean {
  return BY_SLUG.has(slug);
}
