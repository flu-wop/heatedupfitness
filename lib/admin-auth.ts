// Cookie-based admin session — replaces the old ?password=... query-string
// scheme (which risked landing in server/browser logs and had no rate
// limiting). Session token is an HMAC over ADMIN_PASSWORD, not the raw
// password, so a leaked cookie doesn't disclose the password itself.
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "hufit_admin";

export function sessionToken(): string {
  return createHmac("sha256", process.env.ADMIN_PASSWORD || "")
    .update("heatedupfitness-admin-session")
    .digest("hex");
}

export function safeEq(a: string, b: string): boolean {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

export async function isAdminAuthed(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false; // fail closed
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE)?.value;
  return !!cookie && safeEq(cookie, sessionToken());
}
