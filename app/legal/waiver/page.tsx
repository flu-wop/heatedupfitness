import { BUSINESS } from "@/lib/data";

export default function Waiver() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-3xl px-6 py-20 font-body text-charcoal/80 leading-relaxed">
        <h1 className="font-display text-3xl text-plum mb-2">Health & Liability Waiver</h1>
        <p className="text-sm text-charcoal/50 mb-8">
          DRAFT — built from scratch since no waiver previously existed. This must be
          reviewed by an attorney and formally signed (digitally or on paper) by every
          client before their first session. Do not rely on this page alone as a substitute
          for a signed waiver.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Assumption of Risk</h2>
        <p>
          I understand that participation in personal training, group fitness, and related
          physical activity offered by {BUSINESS.name} ("{BUSINESS.ownerName}") involves
          inherent risks, including but not limited to muscle strain, joint injury,
          cardiovascular events, and in rare cases, serious injury or death. I voluntarily
          assume all such risks.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Health Disclosure (PAR-Q Style)</h2>
        <p>
          I confirm that I am not aware of any medical condition that would prevent me from
          participating in physical exercise, or I have consulted a physician who has cleared
          me to participate. I agree to inform {BUSINESS.ownerName} of any changes to my
          health status, injuries, or physical limitations before each session.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Release of Liability</h2>
        <p>
          In consideration of being permitted to participate in training services, I release
          and hold harmless {BUSINESS.name}, {BUSINESS.ownerName}, and any affiliated
          facilities (including gym locations used for in-person sessions) from any and all
          claims, liabilities, damages, or costs arising from my participation, except in
          cases of gross negligence.
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Photo/Video Release (Optional)</h2>
        <p>
          PLACEHOLDER — decide whether to include an opt-in/opt-out clause for using client
          progress photos or videos in marketing (with the client's separate consent).
        </p>

        <h2 className="font-body font-semibold text-lg text-plum mt-8 mb-2">Acknowledgment & Signature</h2>
        <p>
          By signing below (digitally or in person), I confirm that I have read and
          understood this waiver and agree to its terms.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 gap-6 text-sm">
          <div className="border-b border-charcoal/30 pb-1">Client Signature / Date</div>
          <div className="border-b border-charcoal/30 pb-1">Print Name</div>
        </div>

        <p className="text-xs text-charcoal/40 mt-12">
          PLACEHOLDER DOCUMENT — this is a standard-form starting point, not legal advice.
          Have an attorney review and, ideally, convert this into a proper e-signature flow
          before requiring clients to accept it.
        </p>
      </div>
    </section>
  );
}
