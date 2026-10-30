import Image from "next/image";
import Link from "next/link";
import { CREDENTIALS, BUSINESS, TEAM_NO_FEARS } from "@/lib/data";
import { MEDIA } from "@/lib/media";
import MediaSlot from "@/components/MediaSlot";

export const metadata = {
  title: "About Mikia",
  description: "Meet Mikia Gumms — ISSA-certified personal trainer and owner of HeatedUpFitness in Westbank New Orleans.",
};

export default function About() {
  return (
    <>
      <section className="bg-ink text-cream grain">
        <div className="mx-auto max-w-6xl px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
            <MediaSlot
              image={MEDIA.portrait}
              alt="Mikia Gumms, ISSA certified personal trainer"
              label="Photo of Mikia"
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div>
            <h1 className="font-display text-4xl mb-2">About Mikia</h1>
            <div className="heat-edge w-32 mb-6" />
            <p className="font-body text-mist leading-relaxed mb-4">{CREDENTIALS.bio}</p>
            <p className="font-body text-mist leading-relaxed">{CREDENTIALS.story}</p>
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="font-display text-2xl text-plum mb-8 text-center">Credentials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white border border-plum/10 p-6 text-center shadow-sm">
              <p className="font-display text-2xl text-magenta mb-1">ISSA</p>
              <p className="font-body text-sm text-charcoal/70">Certified Personal Trainer</p>
            </div>
            <div className="rounded-2xl bg-white border border-plum/10 p-6 text-center shadow-sm">
              <p className="font-display text-2xl text-magenta mb-1">
                {CREDENTIALS.yearsExperience}+ Years
              </p>
              <p className="font-body text-sm text-charcoal/70">Training Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM NO FEARS — secondary credibility mention, not a competing CTA */}
      <section className="bg-plum text-cream">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center">
          <h2 className="font-display text-xl mb-3">{TEAM_NO_FEARS.label}</h2>
          <p className="font-body text-mist text-sm leading-relaxed mb-2">
            {TEAM_NO_FEARS.blurb}
          </p>
          <p className="font-body text-xs text-mist/80">
            (Link to the Team No Fears / FitBudd app — placeholder until available)
          </p>
        </div>
      </section>

      <section className="bg-ink text-cream text-center">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h2 className="font-display text-2xl mb-4">Ready to start?</h2>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-heat-gradient px-7 py-3 font-body font-semibold text-ink hover:opacity-90 transition-opacity"
          >
            Book a Free Consult
          </Link>
        </div>
      </section>
    </>
  );
}
