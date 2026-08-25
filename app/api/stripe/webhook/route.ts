import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getDb, ensureTables } from "@/lib/db";
import { sendProductDelivery } from "@/lib/email";
import { PRODUCTS } from "@/lib/data";
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
    const email = session.customer_details?.email;
    const product = PRODUCTS.find((p) => p.id === productId);

    if (product && email) {
      await ensureTables();
      const db = getDb();
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
    }
  }

  return NextResponse.json({ received: true });
}
