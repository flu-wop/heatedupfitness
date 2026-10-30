import Link from "next/link";
import { SERVICES, BUSINESS } from "@/lib/data";

export default function Services() {
  return (
    <>
      <section className="bg-ink text-cream grain">
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-12 text-center">
          <h1 className="font-display text-4xl mb-3">Coaching & Services</h1>
          <div className="heat-edge w-32 mx-auto mb-6" />
          <p className="font-body text-mist max-w-xl mx-auto">
            In-person on the {BUSINESS.serviceArea}, or online from anywhere. Pick the
            level of support that fits where you&apos;re at.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`card-lift rounded-2xl p-8 border flex flex-col ${
                service.featured
                  ? "bg-heat-gradient text-ink border-transparent md:scale-105"
                  : "bg-white text-charcoal border-plum/10 shadow-sm"
              }`}
            >
              <h2 className="font-display text-2xl mb-1">{service.name}</h2>
              <p className="font-body text-2xl font-bold mb-4">{service.price}</p>
              <p className={`font-body text-sm mb-6 ${service.featured ? "text-ink/80" : "text-charcoal/70"}`}>
                {service.description}
              </p>
              <ul className="font-body text-sm space-y-2 mb-8 flex-1">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={service.ctaHref}
                className={`text-center rounded-full px-6 py-3 font-body font-semibold transition-opacity hover:opacity-90 ${
                  service.featured
                    ? "bg-ink text-cream"
                    : "bg-heat-gradient text-ink"
                }`}
              >
                {service.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
