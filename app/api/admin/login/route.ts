import { NextRequest, NextResponse } from "next/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { safeEq, sessionToken, ADMIN_COOKIE } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const allowed = await rateLimit(`admin-login:${clientIp(req)}`, 5, 15 * 60);
  if (!allowed) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Admin auth is not configured." }, { status: 503 });
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const password = body.password || "";
  if (!safeEq(password, process.env.ADMIN_PASSWORD)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 8 * 60 * 60, // 8 hours
    path: "/",
  });
  return res;
}
