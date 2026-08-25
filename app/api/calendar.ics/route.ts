import { NextResponse } from "next/server";
import { getDb, ensureTables } from "@/lib/db";
import { createEvents, type EventAttributes } from "ics";

export async function GET() {
  await ensureTables();
  const db = getDb();
  const result = await db.execute("SELECT * FROM bookings ORDER BY date, time");

  const events: EventAttributes[] = result.rows.map((row) => {
    const [year, month, day] = (row.date as string).split("-").map(Number);
    const [hour, minute] = (row.time as string).split(":").map(Number);
    return {
      start: [year, month, day, hour, minute],
      duration: { hours: 1 },
      title: `Consult — ${row.name}`,
      description: `${row.mode} · ${row.email}`,
      status: "CONFIRMED",
    };
  });

  const { error, value } = createEvents(events);
  if (error || !value) {
    return NextResponse.json({ error: "Failed to generate calendar" }, { status: 500 });
  }

  return new NextResponse(value, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "attachment; filename=heatedupfitness-bookings.ics",
    },
  });
}
