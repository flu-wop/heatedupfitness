import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureTables } from "@/lib/db";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { randomUUID } from "crypto";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    if (!(await rateLimit(`newsletter:${clientIp(req)}`, 5, 10 * 60))) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }
    let email: unknown;
    try {
      ({ email } = await req.json());
    } catch {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    if (typeof email !== "string" || !EMAIL_RE.test(email.trim()) || email.length > 200) {
      return NextResponse.json({ error: "Enter a valid email" }, { status: 400 });
    }
    await ensureTables();
    const db = getDb();
    // UNIQUE(email): signing up twice is a quiet success, not an error.
    await db.execute({
      sql: `INSERT OR IGNORE INTO newsletter (id, email, created_at) VALUES (?, ?, ?)`,
      args: [randomUUID(), email.trim().toLowerCase(), new Date().toISOString()],
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter signup error:", err);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
