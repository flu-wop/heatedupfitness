"use client";

import { useState } from "react";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  mode: string;
  date: string;
  time: string;
  message: string;
};

export default function AdminBookings() {
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const loginRes = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!loginRes.ok) {
      const data = await loginRes.json().catch(() => ({}));
      setError(data.error || "Incorrect password");
      return;
    }

    const res = await fetch("/api/admin/bookings");
    if (!res.ok) {
      setError("Logged in, but failed to load bookings");
      return;
    }
    const data = await res.json();
    setBookings(data.bookings);
    setPassword("");
  }

  if (!bookings) {
    return (
      <section className="bg-cream min-h-[70vh] flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-plum/10 shadow-sm p-8 max-w-sm w-full">
          <h1 className="font-display text-2xl text-plum mb-4">Admin Login</h1>
          <input
            aria-label="Admin password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full rounded-lg border border-plum/20 px-4 py-2.5 font-body mb-4 focus:outline-none focus:ring-2 focus:ring-magenta"
          />
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          <button className="w-full rounded-full bg-heat-gradient px-6 py-2.5 font-body font-semibold text-ink">
            Log In
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="bg-cream min-h-[70vh] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl text-plum mb-6">Bookings</h1>
        <div className="overflow-x-auto rounded-2xl border border-plum/10 bg-white shadow-sm">
          <table className="w-full text-sm font-body">
            <thead className="bg-plum text-cream text-left">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t border-plum/10">
                  <td className="px-4 py-3">{b.date}</td>
                  <td className="px-4 py-3">{b.time}</td>
                  <td className="px-4 py-3">{b.name}</td>
                  <td className="px-4 py-3">{b.email}</td>
                  <td className="px-4 py-3">{b.phone}</td>
                  <td className="px-4 py-3">{b.mode}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{b.message}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-charcoal/70">
                    No bookings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
