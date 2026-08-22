import type { MetadataRoute } from "next";
import { CONFIG } from "@/lib/config";

/**
 * Klasik tarayıcılara ek olarak üretken arama motorlarının botlarını da
 * AÇIKÇA davet ediyoruz. GEO'nun ön koşulu bu: ChatGPT / Perplexity /
 * Google AI Overviews sayfayı okuyamazsa alıntılayamaz.
 */
const AI_BOTS = [
  "GPTBot",            // OpenAI eğitim + arama tarayıcısı
  "OAI-SearchBot",     // ChatGPT arama
  "ChatGPT-User",      // ChatGPT içinden tıklanan sayfalar
  "ClaudeBot",         // Anthropic
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",   // Gemini / AI Overviews
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "Amazonbot",
  "Meta-ExternalAgent",
  "cohere-ai",
  "YouBot",
  "DuckAssistBot",
  "MistralAI-User",
  "CCBot",             // Common Crawl — birçok modelin veri kaynağı
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/go", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${CONFIG.url}/sitemap.xml`,
    host: CONFIG.url,
  };
}
