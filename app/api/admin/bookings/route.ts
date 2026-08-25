import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureTables } from "@/lib/db";

export async function GET(req: NextRequest) {
  const password = req.nextUrl.searchParams.get("password");
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTables();
  const db = getDb();
  const result = await db.execute("SELECT * FROM bookings ORDER BY date DESC, time DESC");
  return NextResponse.json({ bookings: result.rows });
}
