import Link from "next/link";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <>
      <section className="bg-ink text-cream grain">
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-12 text-center">
          <h1 className="font-display text-4xl mb-3">Real Results</h1>
          <div className="heat-edge w-32 mx-auto mb-6" />
          <p className="font-body text-mist max-w-xl mx-auto">
            What clients say after training with Mikia.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-5xl px-6 py-16 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card-lift rounded-2xl bg-white p-6 border border-plum/10 shadow-sm">
              <p className="font-body text-charcoal/70 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-body font-semibold text-plum text-sm">{t.name}</p>
              <p className="font-body text-xs text-charcoal/50">{t.result}</p>
            </div>
          ))}
        </div>
        <p className="text-center font-body text-xs text-charcoal/40 pb-6">
          All testimonials above are placeholders pending real client quotes and before/after photos.
        </p>
      </section>

      <section className="bg-plum text-cream text-center">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h2 className="font-display text-2xl mb-4">Ready to write your own story?</h2>
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
