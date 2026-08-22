"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

export default function SubmitForm() {
  const router = useRouter();
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("other");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError(null);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ link, website, category }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setState("idle");
        return;
      }
      setState("done");
      setLink("");
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Try again.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <p className="ok" role="status">
        You&apos;re on the board. Your credit started decaying just now.
      </p>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <label className="sr-only" htmlFor="link">
        Your link or X handle
      </label>
      <input
        id="link"
        name="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="yoursite.com or @yourhandle"
        autoComplete="off"
        spellCheck={false}
        required
      />
      <label className="sr-only" htmlFor="category">
        Category
      </label>
      <select
        id="category"
        className="cat-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {CATEGORIES.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        tabIndex={-1}
        autoComplete="off"
        className="hp"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      <button type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Claiming…" : "Claim a spot"}
      </button>
      {error && (
        <p className="err" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
