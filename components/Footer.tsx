import { CONFIG } from "@/lib/config";

export default function Footer({ listings }: { listings?: number }) {
  return (
    <footer className="foot">
      <a href="/rules">Rules</a>
      <span aria-hidden>·</span>
      <a href="/price">Pricing</a>
      <span aria-hidden>·</span>
      <a href="/terms">Terms</a>
      <span aria-hidden>·</span>
      <a href="/privacy">Privacy</a>
      <span aria-hidden>·</span>
      <a href="/policy">Refunds</a>
      {typeof listings === "number" && (
        <>
          <span aria-hidden>·</span>
          <span>{listings} listings</span>
        </>
      )}
      <span aria-hidden>·</span>
      <a
        href={
          process.env.NEXT_PUBLIC_STATS_URL ||
          `https://plausible.io/${new URL(CONFIG.url).hostname}`
        }
        target="_blank"
        rel="noopener"
      >
        Live traffic
      </a>
    </footer>
  );
}
