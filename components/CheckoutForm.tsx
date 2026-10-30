"use client";

import { useState } from "react";

export default function CheckoutForm({
  planId,
  amount,
  mock,
}: {
  planId: string;
  amount: number;
  mock: boolean;
}) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/checkout/service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, ...form }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setStatus("error");
    }
  }

  const input =
    "w-full rounded-lg border border-plum/20 px-4 py-2.5 font-body focus:outline-none focus:ring-2 focus:ring-ember";

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className="font-body text-sm font-semibold text-charcoal block mb-1">Full name</label>
        <input required className={input} value={form.name} autoComplete="name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <label className="font-body text-sm font-semibold text-charcoal block mb-1">Email</label>
        <input required type="email" className={input} value={form.email} autoComplete="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      {mock && (
        <p className="rounded-lg bg-ember/10 border border-ember/30 px-4 py-3 font-body text-xs text-charcoal/80">
          <strong>Test mode:</strong> payments aren&apos;t connected yet. Submitting walks the
          full flow but no card is charged.
        </p>
      )}
      {status === "error" && <p className="font-body text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-heat-gradient px-6 py-3.5 font-body font-semibold text-ink hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "loading" ? "Processing..." : `Pay $${amount} today`}
      </button>
    </form>
  );
}
