import { BUSINESS } from "@/lib/data";

export default function Privacy() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-3xl px-6 py-20 font-body text-charcoal/80 leading-relaxed">
        <h1 className="font-display text-3xl text-plum mb-2">Privacy Policy</h1>
        <p className="text-sm text-charcoal/50 mb-8">
          Last updated: PLACEHOLDER — set to launch date. Have an attorney review before publishing.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Information We Collect</h2>
        <p>
          When you book a consult, purchase a digital plan, or sign up for our email list, we collect
          the information you provide directly: name, email address, phone number, and any goals or
          notes you share with us.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">How We Use Your Information</h2>
        <p>
          We use your information to schedule and confirm consults and training sessions, deliver
          digital products you purchase, respond to inquiries, and send occasional updates about
          plans, challenges, and coaching — you can unsubscribe from marketing emails at any time.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Payment Information</h2>
        <p>
          Payments are processed securely through Stripe. We do not store your credit card
          information on our servers.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Data Sharing</h2>
        <p>
          We do not sell your personal information. We share information only with service
          providers (payment processing, email delivery, scheduling) as needed to run
          {" "}{BUSINESS.name}.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Contact Us</h2>
        <p>
          Questions about this policy? Email {BUSINESS.email}.
        </p>

        <p className="text-xs text-charcoal/40 mt-12">
          PLACEHOLDER DOCUMENT — drafted as a starting point, not legal advice. Have this
          reviewed by an attorney before the site goes live.
        </p>
      </div>
    </section>
  );
}
