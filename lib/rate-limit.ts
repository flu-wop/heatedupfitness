// Turso-backed rate limiter — matches the standard pattern used across
// James's other sites (see site-security skill). Fixed-window counter.
import { getDb, ensureTables } from "@/lib/db";
import type { NextRequest } from "next/server";

export function clientIp(req: NextRequest | Request): string {
  const h = req.headers;
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  await ensureTables();
  const db = getDb();
  const now = Date.now();

  const row = (await db.execute({
    sql: `SELECT count, window_start FROM rate_limits WHERE key = ?`,
    args: [key],
  })).rows[0] as unknown as { count: number; window_start: string } | undefined;

  if (!row) {
    await db.execute({
      sql: `INSERT INTO rate_limits (key, count, window_start) VALUES (?, 1, ?)`,
      args: [key, String(now)],
    });
    return true;
  }

  const windowStart = Number(row.window_start);
  if (now - windowStart > windowSeconds * 1000) {
    // Window expired — reset.
    await db.execute({
      sql: `UPDATE rate_limits SET count = 1, window_start = ? WHERE key = ?`,
      args: [String(now), key],
    });
    return true;
  }

  if (Number(row.count) >= limit) return false;

  await db.execute({
    sql: `UPDATE rate_limits SET count = count + 1 WHERE key = ?`,
    args: [key],
  });
  return true;
}
