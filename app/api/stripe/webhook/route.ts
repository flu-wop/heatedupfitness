import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getDb, ensureTables } from "@/lib/db";
import { sendProductDelivery, sendWebhookFailureAlert, sendPlanPurchaseNotice } from "@/lib/email";
import { PRODUCTS, PAID_PLANS } from "@/lib/data";
import { randomUUID } from "crypto";

let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (_stripe) return _stripe;
  _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  return _stripe;
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const productId = session.metadata?.productId;
    const planId = session.metadata?.planId;
    const email = session.customer_details?.email;

    // Coaching/training plan purchase — record it and tell Mikia.
    if (planId) {
      const plan = PAID_PLANS.find((p) => p.id === planId);
      if (!plan || !email) {
        await sendWebhookFailureAlert({
          sessionId: session.id,
          error: `Plan checkout missing plan (${planId}) or email.`,
        });
        return NextResponse.json({ received: true, error: "Missing plan/email, will retry" }, { status: 500 });
      }
      try {
        await ensureTables();
        const db = getDb();
        const dup = await db.execute({
          sql: `SELECT id FROM orders WHERE stripe_session_id = ?`,
          args: [session.id],
        });
        if (dup.rows.length > 0) return NextResponse.json({ received: true, duplicate: true });
        await db.execute({
          sql: `INSERT INTO orders (id, product_id, email, stripe_session_id, amount_cents, created_at)
                VALUES (?, ?, ?, ?, ?, ?)`,
          args: [randomUUID(), `plan:${plan.id}`, email, session.id, session.amount_total || 0, new Date().toISOString()],
        });
        await sendPlanPurchaseNotice({
          planName: plan.name,
          amount: (session.amount_total || 0) / 100,
          customerEmail: email,
          customerName: session.metadata?.customerName || "",
          termsVersion: session.metadata?.termsVersion || "",
          termsAcceptedAt: session.metadata?.termsAcceptedAt || "",
        });
      } catch (err: any) {
        console.error("[stripe-webhook] Plan order failed:", err);
        await sendWebhookFailureAlert({ sessionId: session.id, error: err?.message || String(err) });
        return NextResponse.json({ received: true, error: "Plan order failed, will retry" }, { status: 500 });
      }
      return NextResponse.json({ received: true });
    }
    const product = PRODUCTS.find((p) => p.id === productId);

    if (!product || !email) {
      // Payment succeeded but we can't identify what was bought or who to
      // send it to — this used to be a silent no-op. It's now the same
      // "needs a human immediately" case as a DB failure.
      console.error(`Webhook missing product or email for session ${session.id}`, { productId, email });
      await sendWebhookFailureAlert({
        sessionId: session.id,
        error: `Missing product (${productId ?? "none"}) or customer email for a completed checkout.`,
      });
      return NextResponse.json({ received: true, error: "Missing product/email, will retry" }, { status: 500 });
    }

    try {
      await ensureTables();
      const db = getDb();

      // IDEMPOTENCY: Stripe retries webhook delivery on timeout/non-200 —
      // without this check, a retry would insert a duplicate order row and
      // send the product a second time.
      const existing = await db.execute({
        sql: `SELECT id FROM orders WHERE stripe_session_id = ?`,
        args: [session.id],
      });
      if (existing.rows.length > 0) {
        return NextResponse.json({ received: true, duplicate: true });
      }

      await db.execute({
        sql: `INSERT INTO orders (id, product_id, email, stripe_session_id, amount_cents, created_at)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          randomUUID(),
          product.id,
          email,
          session.id,
          session.amount_total || 0,
          new Date().toISOString(),
        ],
      });

      await sendProductDelivery({ to: email, productName: product.name });
    } catch (err: any) {
      console.error("[stripe-webhook] Order DB write or delivery failed:", err);
      await sendWebhookFailureAlert({ sessionId: session.id, error: err?.message || String(err) });
      return NextResponse.json({ received: true, error: "DB write failed, will retry" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
