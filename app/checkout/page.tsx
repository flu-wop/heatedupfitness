import Link from "next/link";
import { notFound } from "next/navigation";
import { PAID_PLANS } from "@/lib/data";
import CheckoutForm from "@/components/CheckoutForm";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  const found = PAID_PLANS.find((p) => p.id === plan);
  return {
    title: found ? `Checkout — ${found.name}` : "Checkout",
    description: found ? `Sign up for ${found.name} with HeatedUpFitness.` : "Check out with HeatedUpFitness.",
    robots: { index: false, follow: false },
  };
}

export default async function Checkout({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; canceled?: string }>;
}) {
  const { plan: planId, canceled } = await searchParams;
  const plan = PAID_PLANS.find((p) => p.id === planId);
  if (!plan) notFound();
  const mock = !process.env.STRIPE_SECRET_KEY;

  return (
    <>
      <section className="bg-ink text-cream grain">
        <div className="mx-auto max-w-4xl px-6 pt-16 pb-10 text-center">
          <h1 className="font-display text-4xl mb-3">Checkout</h1>
          <div className="heat-edge w-32 mx-auto" />
        </div>
      </section>
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl bg-ink text-cream p-8 border border-white/10">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-pink mb-2">Your plan</p>
            <h2 className="font-display text-2xl mb-1">{plan.name}</h2>
            <p className="font-body text-mist text-sm mb-6">{plan.description}</p>
            <ul className="font-body text-sm space-y-2 mb-8 text-mist">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2"><span>•</span><span>{f}</span></li>
              ))}
            </ul>
            <div className="border-t border-white/15 pt-5 flex items-baseline justify-between">
              <span className="font-body text-sm text-mist">Due today (full first month)</span>
              <span className="font-display text-3xl text-heat-gradient">${plan.amount}</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-plum/10 shadow-sm p-8">
            {canceled && (
              <p className="font-body text-sm text-charcoal/70 mb-4">Checkout canceled — you weren&apos;t charged.</p>
            )}
            <CheckoutForm planId={plan.id} amount={plan.amount} mock={mock} />
          </div>
        </div>
      </section>
    </>
  );
}
