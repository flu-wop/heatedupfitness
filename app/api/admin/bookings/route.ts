import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureTables } from "@/lib/db";
import { isAdminAuthed } from "@/lib/admin-auth";

export async function GET(_req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTables();
  const db = getDb();
  const result = await db.execute("SELECT * FROM bookings ORDER BY date DESC, time DESC");
  return NextResponse.json({ bookings: result.rows });
}
