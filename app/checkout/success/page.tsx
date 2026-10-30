import Link from "next/link";
import { PAID_PLANS, BUSINESS } from "@/lib/data";

export const metadata = {
  title: "You're in",
  description: "Your HeatedUpFitness signup is confirmed.",
  robots: { index: false, follow: false },
};

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; mock?: string }>;
}) {
  const { plan: planId, mock } = await searchParams;
  const plan = PAID_PLANS.find((p) => p.id === planId);
  return (
    <section className="bg-cream min-h-[60vh] flex items-center justify-center text-center px-6 py-20">
      <div className="max-w-md">
        {mock === "1" && (
          <p className="mb-6 rounded-lg bg-ember/10 border border-ember/30 px-4 py-3 font-body text-xs text-charcoal/80">
            <strong>Test mode:</strong> this was a mock checkout — nothing was charged.
          </p>
        )}
        <h1 className="font-display text-3xl text-plum mb-3">Welcome to the heat!</h1>
        <p className="font-body text-charcoal/70 mb-6">
          {plan ? `You're signed up for ${plan.name} ($${plan.amount} paid in full). ` : ""}
          Mikia will reach out at the email you used to get you started, or call{" "}
          {BUSINESS.phone}.
        </p>
        <Link href="/" className="font-body font-semibold text-magenta hover:text-ember transition-colors">
          Back to home →
        </Link>
      </div>
    </section>
  );
}
