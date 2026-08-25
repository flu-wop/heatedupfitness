import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureTables } from "@/lib/db";
import { sendBookingConfirmation } from "@/lib/email";
import { generateBookingIcs } from "@/lib/ical";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, mode, date, time, message } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await ensureTables();
    const db = getDb();
    const id = randomUUID();

    await db.execute({
      sql: `INSERT INTO bookings (id, name, email, phone, mode, date, time, message, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [id, name, email, phone || "", mode || "", date, time, message || "", new Date().toISOString()],
    });

    const ics = generateBookingIcs({ date, time, name, mode });

    await sendBookingConfirmation({
      to: email,
      name,
      date,
      time,
      mode,
      icsContent: ics || undefined,
    });

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}
