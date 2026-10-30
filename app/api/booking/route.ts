import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureTables } from "@/lib/db";
import { sendBookingConfirmation } from "@/lib/email";
import { generateBookingIcs } from "@/lib/ical";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { randomUUID } from "crypto";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MODES = ["In-person", "Virtual / Online"];

function validDate(d: unknown): d is string {
  if (typeof d !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(d)) return false;
  const t = Date.parse(d + "T00:00:00Z");
  return !Number.isNaN(t) && new Date(t).toISOString().startsWith(d);
}

export async function POST(req: NextRequest) {
  try {
    const allowed = await rateLimit(`booking:${clientIp(req)}`, 5, 10 * 60);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const { name, email, phone, mode, date, time, message } = body;

    if (typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
      return NextResponse.json({ error: "Enter your name" }, { status: 400 });
    }
    if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json({ error: "Enter a valid email" }, { status: 400 });
    }
    if (!validDate(date) || typeof time !== "string" || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
      return NextResponse.json({ error: "Enter a valid date and time" }, { status: 400 });
    }
    const cleanPhone = typeof phone === "string" ? phone.slice(0, 40) : "";
    const cleanMessage = typeof message === "string" ? message.slice(0, 1000) : "";
    const cleanMode = typeof mode === "string" && MODES.includes(mode) ? mode : "";
    const cleanName = name.trim();

    await ensureTables();
    const db = getDb();
    const id = randomUUID();

    await db.execute({
      sql: `INSERT INTO bookings (id, name, email, phone, mode, date, time, message, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [id, cleanName, email, cleanPhone, cleanMode, date, time, cleanMessage, new Date().toISOString()],
    });

    // The booking is saved at this point. An email failure must not tell the
    // customer "Booking failed" (they would retry and double-book).
    try {
      const ics = generateBookingIcs({ date, time, name: cleanName, mode: cleanMode });
      await sendBookingConfirmation({
        to: email,
        name: cleanName,
        phone: cleanPhone,
        message: cleanMessage,
        date,
        time,
        mode: cleanMode,
        icsContent: ics || undefined,
      });
    } catch (err) {
      console.error(`[booking] saved ${id} but email failed:`, err);
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}
