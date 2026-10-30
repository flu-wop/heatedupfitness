import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PAID_PLANS } from "@/lib/data";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { planId, name, email } = await req.json();

    // Amount always comes from the server-side plan list, never the client.
    const plan = PAID_PLANS.find((p) => p.id === planId);
    if (!plan) return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    if (typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
      return NextResponse.json({ error: "Enter your name" }, { status: 400 });
    }
    if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json({ error: "Enter a valid email" }, { status: 400 });
    }

    if (process.env.TURSO_DATABASE_URL) {
      const ok = await rateLimit(`service-checkout:${clientIp(req)}`, 10, 600);
      if (!ok) return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
    const fullCents = plan.amount * 100;

    // MOCK MODE — no Stripe key configured: skip payment, go straight to the
    // success page flagged as a test. Nothing is charged or recorded.
    if (!process.env.STRIPE_SECRET_KEY) {
      const qs = new URLSearchParams({ mock: "1", plan: plan.id, amount: String(plan.amount) });
      return NextResponse.json({ url: `${siteUrl}/checkout/success?${qs}`, mock: true });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `${plan.name} — first month` },
            unit_amount: fullCents, // full amount, no deposit
          },
          quantity: 1,
        },
      ],
      metadata: { planId: plan.id, customerName: name.trim() },
      success_url: `${siteUrl}/checkout/success?plan=${plan.id}&amount=${plan.amount}`,
      cancel_url: `${siteUrl}/checkout?plan=${plan.id}&canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Service checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
