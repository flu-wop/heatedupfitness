import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureTables } from "@/lib/db";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sendSnackGuide } from "@/lib/email";
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
    const clean = email.trim().toLowerCase();
    await ensureTables();
    const db = getDb();
    // UNIQUE(email): a repeat signup inserts nothing. We only email on the
    // FIRST signup so this form can't be used to flood someone's inbox.
    const ins = await db.execute({
      sql: `INSERT OR IGNORE INTO newsletter (id, email, created_at) VALUES (?, ?, ?)`,
      args: [randomUUID(), clean, new Date().toISOString()],
    });
    if (ins.rowsAffected === 0) {
      return NextResponse.json({ success: true, already: true });
    }
    try {
      await sendSnackGuide(clean);
    } catch (err) {
      // Don't claim success when the guide wasn't sent; undo the signup so a retry works.
      console.error("[newsletter] snack guide email failed:", err);
      await db.execute({ sql: `DELETE FROM newsletter WHERE email = ?`, args: [clean] });
      return NextResponse.json(
        { error: "We couldn't send the guide right now. Please try again in a few minutes." },
        { status: 502 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter signup error:", err);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
