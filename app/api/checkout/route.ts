import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCTS } from "@/lib/data";

let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (_stripe) return _stripe;
  _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  return _stripe;
}

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();
    const product = PRODUCTS.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    if (product.price === 0) {
      return NextResponse.json({ error: "Free products don't need checkout" }, { status: 400 });
    }

    const stripe = getStripe();
    // Never fall back to localhost in production: customers would land there after paying.
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: product.name },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      custom_text: {
        submit: {
          message: `By paying you agree to our Terms (${siteUrl}/legal/terms) and Refund Policy (${siteUrl}/legal/refund). Digital plan sales are final.`,
        },
      },
      metadata: { productId: product.id },
      success_url: `${siteUrl}/shop?success=true`,
      cancel_url: `${siteUrl}/shop?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
