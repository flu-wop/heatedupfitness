"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [already, setAlready] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Signup failed");
      setAlready(!!data.already);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="font-body text-cream" role="status">
        {already
          ? "You're already on the list — check your inbox (and spam) for the guide."
          : "Check your inbox — the guide is on its way."}
      </p>
    );
  }

  return (
    <>
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="flex-1 rounded-full px-5 py-3 text-charcoal font-body focus:outline-none focus:ring-2 focus:ring-ember"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-heat-gradient px-6 py-3 font-body font-semibold text-ink hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "loading" ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      {status === "error" && (
        <p className="font-body text-sm text-pink mt-3" role="alert">{error}</p>
      )}
    </>
  );
}
