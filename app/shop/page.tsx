"use client";

import { useState } from "react";
import { PRODUCTS, Product } from "@/lib/data";

const CATEGORIES = ["Meal Plans", "Workout Plans", "Challenges"] as const;

export default function Shop() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleBuy(product: Product) {
    if (product.price === 0) {
      window.location.href = "/#snack-guide";
      return;
    }
    setLoadingId(product.id);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <>
      <section className="bg-ink text-cream grain">
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-12 text-center">
          <h1 className="font-display text-4xl mb-3">Shop Plans</h1>
          <div className="heat-edge w-32 mx-auto mb-6" />
          <p className="font-body text-mist max-w-xl mx-auto">
            Done-for-you meal and workout plans, delivered instantly to your inbox.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-16 space-y-16">
          {CATEGORIES.map((category) => (
            <div key={category}>
              <h2 className="font-display text-2xl text-plum mb-6">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRODUCTS.filter((p) => p.category === category).map((product) => (
                  <div
                    key={product.id}
                    className="card-lift rounded-2xl bg-white border border-plum/10 shadow-sm p-6 flex flex-col"
                  >
                    <h3 className="font-body font-semibold text-charcoal mb-1">
                      {product.name}
                    </h3>
                    <p className="font-display text-xl text-magenta mb-3">
                      {product.priceLabel}
                    </p>
                    <p className="font-body text-sm text-charcoal/60 mb-6 flex-1">
                      {product.description}
                    </p>
                    <button
                      onClick={() => handleBuy(product)}
                      disabled={loadingId === product.id}
                      className="rounded-full bg-heat-gradient px-5 py-2.5 font-body font-semibold text-ink hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {loadingId === product.id
                        ? "Loading..."
                        : product.price === 0
                        ? "Get It Free"
                        : "Buy Now"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center font-body text-xs text-charcoal/40 pb-10">
          All plans and pricing shown are placeholders — confirm final content before launch.
        </p>
      </section>
    </>
  );
}
