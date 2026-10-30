import { BUSINESS } from "@/lib/data";

export const metadata = {
  title: "Refund Policy",
  description: "Refund and cancellation terms for HeatedUpFitness plans and coaching.",
};

export default function Refund() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-3xl px-6 py-20 font-body text-charcoal/80 leading-relaxed">
        <h1 className="font-display text-3xl text-plum mb-2">Refund Policy</h1>
        <p className="text-sm text-charcoal/70 mb-8">
          Last updated: PLACEHOLDER — set to launch date. Confirm exact terms with Mikia.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Digital Plans</h2>
        <p>
          Because digital meal and workout plans are delivered instantly and cannot be
          "returned," all digital plan sales are final. PLACEHOLDER — confirm whether Mikia
          wants to offer any exceptions (e.g. duplicate purchase, technical delivery failure).
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Coaching Packages</h2>
        <p>
          PLACEHOLDER — confirm cancellation/refund terms for monthly coaching (e.g. cancel
          anytime, no refund on the current billing period; prorated refunds; etc.).
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">In-Person Sessions</h2>
        <p>
          PLACEHOLDER — confirm no-show / late cancellation policy (e.g. sessions canceled with
          less than 24 hours notice are forfeited).
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Questions</h2>
        <p>Email {BUSINESS.email} for any billing questions.</p>

        <p className="text-xs text-charcoal/70 mt-12">
          PLACEHOLDER DOCUMENT — drafted as a starting point, not legal advice. Have this
          reviewed by an attorney before the site goes live.
        </p>
      </div>
    </section>
  );
}
