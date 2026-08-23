import type { Metadata } from "next";
import { CONFIG } from "@/lib/config";
import { dict } from "@/lib/i18n";
import { breadcrumbLd, faqLd, organizationLd } from "@/lib/seo";
import Jsonld from "@/components/Jsonld";
import Faq from "@/components/Faq";
import Nav from "@/components/Nav";
import LangSwitcher from "@/components/LangSwitcher";

const t = dict("en");

export const metadata: Metadata = {
  title: "FAQ — how the decaying pay-to-rank leaderboard works",
  description:
    "Answers to the common questions about outbid.love: what the 10% daily decay does, what #1 costs right now, how payment works, how long a bid lasts, and how it differs from outbid.lol.",
  alternates: { canonical: "/faq" },
  keywords: [
    "outbid.love faq",
    "how does pay to rank work",
    "what is a decaying leaderboard",
    "outbid.lol vs outbid.love",
    "how much does the top spot cost",
  ],
};

export default function FaqPage() {
  return (
    <main className="page">
      <Jsonld
        data={[
          organizationLd(),
          faqLd(t.faq, "en"),
          breadcrumbLd([
            { name: CONFIG.siteName, url: CONFIG.url },
            { name: "FAQ", url: `${CONFIG.url}/faq` },
          ]),
        ]}
      />

      <div className="topbar">
        <a className="brand" href="/">
          outbid<span className="tld">.love</span>
        </a>
        <Nav current="/faq" />
      </div>

      <header className="hero">
        <h1>Frequently asked questions</h1>
        <p className="lede">
          Everything about the board in one place — the decay rule, the price of
          #1, payment, moderation, and how this differs from a permanent
          bid-for-rank board.
        </p>
      </header>

      <Faq items={t.faq} title="Questions" id="questions" />

      <section className="prose">
        <h2>Still stuck?</h2>
        <p>
          The <a href="/rules">rules</a> page covers what is allowed on the
          board and how moderation works, <a href="/price">pricing</a> covers
          amounts and currency, and <a href="/policy">refunds</a> covers what
          happens when a payment goes wrong. If your question is about the
          mechanic itself, <a href="/how-it-works">how it works</a> walks through
          the maths. Arrived here from a competitor's board? The{" "}
          <a href="/outbid-lol-alternative">outbid.lol alternative</a> page
          covers what is different and what it costs today.
        </p>
      </section>

      <LangSwitcher locale="en" path="" />

      <footer className="foot">
        <a href="/">← Back to the board</a>
      </footer>
    </main>
  );
}
