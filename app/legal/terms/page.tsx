import { BUSINESS } from "@/lib/data";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of service for HeatedUpFitness training, coaching, and digital plans.",
};

export default function Terms() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-3xl px-6 py-20 font-body text-charcoal/80 leading-relaxed">
        <h1 className="font-display text-3xl text-plum mb-2">Terms of Service</h1>
        <p className="text-sm text-charcoal/70 mb-8">
          Last updated: PLACEHOLDER — set to launch date. Have an attorney review before publishing.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Services</h2>
        <p>
          {BUSINESS.name} provides personal training, nutrition coaching, digital meal and
          workout plans, and related fitness content, delivered in-person on the{" "}
          {BUSINESS.serviceArea} or virtually.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Not Medical Advice</h2>
        <p>
          Content and coaching provided by {BUSINESS.name} is for general fitness and
          educational purposes only and is not a substitute for professional medical advice.
          Consult your physician before beginning any new exercise or nutrition program,
          especially if you have a pre-existing health condition.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Booking & Cancellations</h2>
        <p>
          PLACEHOLDER — confirm Mikia's cancellation/no-show policy (e.g. 24-hour notice
          required) and add it here.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Digital Products</h2>
        <p>
          Digital plans are for personal use only and may not be resold, redistributed, or
          shared. See our Refund Policy for details on digital product purchases.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Limitation of Liability</h2>
        <p>
          By using our services, you acknowledge the inherent risks of physical exercise. See
          our Health &amp; Liability Waiver for full terms.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Contact</h2>
        <p>Questions? Email {BUSINESS.email}.</p>

        <p className="text-xs text-charcoal/70 mt-12">
          PLACEHOLDER DOCUMENT — drafted as a starting point, not legal advice. Have this
          reviewed by an attorney before the site goes live.
        </p>
      </div>
    </section>
  );
}
