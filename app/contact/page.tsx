"use client";

import { useState } from "react";
import { BUSINESS } from "@/lib/data";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    mode: "In-person",
    date: "",
    time: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="bg-cream min-h-[60vh] flex items-center justify-center text-center px-6">
        <div>
          <h1 className="font-display text-3xl text-plum mb-3">You&apos;re booked!</h1>
          <p className="font-body text-charcoal/70">
            Check your email for a confirmation and calendar invite. Mikia will follow up
            at {BUSINESS.phone} or {BUSINESS.email} to confirm details.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-ink text-cream grain">
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-12 text-center">
          <h1 className="font-display text-4xl mb-3">Book a Free Consult</h1>
          <div className="heat-edge w-32 mx-auto mb-6" />
          <p className="font-body text-mist max-w-xl mx-auto">
            In-person on the {BUSINESS.serviceArea}, or virtual — pick what works.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-2xl border border-plum/10 shadow-sm p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="c-name" className="font-body text-sm font-semibold text-charcoal block mb-1">Name</label>
                <input
                id="c-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-plum/20 px-4 py-2.5 font-body focus:outline-none focus:ring-2 focus:ring-magenta"
                />
              </div>
              <div>
                <label htmlFor="c-phone" className="font-body text-sm font-semibold text-charcoal block mb-1">Phone</label>
                <input
                id="c-phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-plum/20 px-4 py-2.5 font-body focus:outline-none focus:ring-2 focus:ring-magenta"
                />
              </div>
            </div>
            <div>
              <label htmlFor="c-email" className="font-body text-sm font-semibold text-charcoal block mb-1">Email</label>
              <input
                id="c-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-plum/20 px-4 py-2.5 font-body focus:outline-none focus:ring-2 focus:ring-magenta"
              />
            </div>
            <div>
              <label htmlFor="c-mode" className="font-body text-sm font-semibold text-charcoal block mb-1">
                Training mode
              </label>
              <select
                id="c-mode"
                value={form.mode}
                onChange={(e) => setForm({ ...form, mode: e.target.value })}
                className="w-full rounded-lg border border-plum/20 px-4 py-2.5 font-body focus:outline-none focus:ring-2 focus:ring-magenta"
              >
                <option>In-person</option>
                <option>Virtual / Online</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="c-date" className="font-body text-sm font-semibold text-charcoal block mb-1">
                  Preferred date
                </label>
                <input
                id="c-date"
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full rounded-lg border border-plum/20 px-4 py-2.5 font-body focus:outline-none focus:ring-2 focus:ring-magenta"
                />
              </div>
              <div>
                <label htmlFor="c-time" className="font-body text-sm font-semibold text-charcoal block mb-1">
                  Preferred time
                </label>
                <input
                id="c-time"
                  type="time"
                  required
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full rounded-lg border border-plum/20 px-4 py-2.5 font-body focus:outline-none focus:ring-2 focus:ring-magenta"
                />
              </div>
            </div>
            <div>
              <label htmlFor="c-message" className="font-body text-sm font-semibold text-charcoal block mb-1">
                What are your goals?
              </label>
              <textarea
                id="c-message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-plum/20 px-4 py-2.5 font-body focus:outline-none focus:ring-2 focus:ring-magenta"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-heat-gradient px-6 py-3 font-body font-semibold text-ink hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {status === "loading" ? "Booking..." : "Confirm Consult"}
            </button>
            {status === "error" && (
              <p className="font-body text-sm text-red-600 text-center">
                Something went wrong — please try again or email {BUSINESS.email}.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
