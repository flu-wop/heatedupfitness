import type { LegalSection } from "@/lib/legal";
import { LEGAL } from "@/lib/legal";

export default function LegalPage({
  title,
  sections,
}: {
  title: string;
  sections: LegalSection[];
}) {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-3xl px-6 py-20 font-body text-charcoal/80 leading-relaxed">
        <h1 className="font-display text-3xl text-plum mb-2">{title}</h1>
        <p className="text-sm text-charcoal/70 mb-10">Last updated: {LEGAL.updated}</p>
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="font-body font-semibold text-lg text-plum mt-9 mb-2">{s.heading}</h2>
            {s.body?.map((p, i) => (
              <p key={i} className="mb-3">{p}</p>
            ))}
            {s.bullets && (
              <ul className="list-disc pl-6 space-y-1.5 mb-3">
                {s.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
            {s.after?.map((p, i) => (
              <p key={i} className="mb-3">{p}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
