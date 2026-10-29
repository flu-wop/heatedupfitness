import Link from "next/link";
import Image from "next/image";
import { BUSINESS, CREDENTIALS, SERVICES, TESTIMONIALS, TEAM_NO_FEARS } from "@/lib/data";
import { MEDIA, mediaExists } from "@/lib/media";
import MediaSlot from "@/components/MediaSlot";

export default function Home() {
  const heroHasMedia = mediaExists(MEDIA.hero.video) || mediaExists(MEDIA.hero.poster);
  return (
    <>
      {/* HERO */}
      <section className={`relative bg-ink text-cream overflow-hidden grain ${heroHasMedia ? "min-h-[88vh] flex items-center" : ""}`}>
        {heroHasMedia ? (
          <>
            <MediaSlot
              video={MEDIA.hero.video}
              image={MEDIA.hero.poster}
              alt="Mikia Gumms training a client"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/10" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-plum-glow" />
        )}
        <div className={`relative mx-auto w-full max-w-6xl px-6 pt-20 pb-24 grid gap-12 items-center ${heroHasMedia ? "md:grid-cols-1" : "md:grid-cols-2"}`}>
          <div>
            <p className="font-body text-sm uppercase tracking-[0.2em] text-pink mb-4">
              {BUSINESS.hashtag} · Westbank New Orleans
            </p>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mb-6">
              Where every<span className="text-heat-gradient">BODY&apos;s</span>
              <br />
              some<span className="text-heat-gradient">BODY</span>
            </h1>
            <div className="heat-edge w-40 mb-6" />
            <p className="font-body text-mist text-lg mb-8 max-w-md">
              ISSA-certified training and nutrition coaching from Mikia Gumms —
              in-person on the Westbank or online, wherever you are.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-heat-gradient px-7 py-3 font-body font-semibold text-ink hover:opacity-90 transition-opacity"
              >
                Book a Free Consult
              </Link>
              <Link
                href="/shop"
                className="rounded-full border border-white/30 px-7 py-3 font-body font-semibold text-cream hover:border-white/60 transition-colors"
              >
                Shop Plans
              </Link>
            </div>
          </div>
          {!heroHasMedia && (
            <div className="relative aspect-square max-w-sm mx-auto">
              <div className="absolute inset-0 glow-ring rounded-full" />
              <Image
                src="/images/logo-dark.jpg"
                alt="HeatedUpFitness logo"
                fill
                className="object-contain relative"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <section className="bg-plum text-cream">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-sm font-body">
          <span className="font-semibold">{CREDENTIALS.certification}</span>
          <span className="opacity-60">|</span>
          <span>{CREDENTIALS.yearsExperience}+ Years Experience</span>
          <span className="opacity-60">|</span>
          <span>{TEAM_NO_FEARS.label}</span>
        </div>
      </section>

      {/* REELS */}
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-body text-sm uppercase tracking-[0.2em] text-pink mb-3">In the gym</p>
          <h2 className="font-display text-3xl md:text-4xl mb-10">See the work</h2>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:overflow-visible">
            {MEDIA.reels.map((reel, i) => (
              <figure
                key={i}
                className="relative shrink-0 w-[62%] sm:w-[40%] md:w-auto snap-start aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 card-lift"
              >
                <MediaSlot
                  video={reel.video}
                  image={reel.poster}
                  alt={`${reel.label} clip`}
                  label={reel.label}
                  sizes="(min-width: 768px) 25vw, 62vw"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink/90 to-transparent font-body text-sm font-semibold">
                  {reel.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="font-display text-3xl text-plum mb-6">
            What is HeatedUpFitness?
          </h2>
          <p className="font-body text-charcoal/80 leading-relaxed">
            We&apos;re a fitness brand that promotes health, wellness, and nutrition to all
            age groups and body types. We provide a variety of meal plans, training sessions,
            and independent workout plans. Our mission is to help you build a level of fitness
            that brings you peace with your health — and a mindset that says &ldquo;I will, I am,
            and I can do this.&rdquo;
          </p>
          <Link href="/about" className="inline-block mt-6 font-body font-semibold text-magenta hover:text-ember transition-colors">
            Read Mikia&apos;s story →
          </Link>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl mb-2">Train With Me</h2>
          <p className="text-mist font-body mb-10">Three ways to get started, in-person or online.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className={`card-lift rounded-2xl p-6 border ${
                  service.featured
                    ? "bg-heat-gradient text-ink border-transparent"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <h3 className="font-display text-xl mb-1">{service.name}</h3>
                <p className="font-body font-semibold mb-3">{service.price}</p>
                <p className={`font-body text-sm mb-4 ${service.featured ? "text-ink/80" : "text-mist"}`}>
                  {service.description}
                </p>
                <Link
                  href={service.ctaHref}
                  className={`font-body text-sm font-semibold ${
                    service.featured ? "text-ink" : "text-pink"
                  } hover:underline`}
                >
                  {service.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-BLEED BAND */}
      <section className="relative h-[55vh] min-h-[360px] bg-ink text-cream overflow-hidden">
        <MediaSlot image={MEDIA.band} alt="Training session" label="Full-width photo" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/40" />
        <div className="relative h-full mx-auto max-w-6xl px-6 flex items-end pb-12">
          <p className="font-display text-4xl md:text-6xl leading-tight max-w-2xl">
            I will. I am. <span className="text-heat-gradient">I can.</span>
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl text-plum mb-10">Stay Heated</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {MEDIA.gallery.map((file, i) => (
              <div
                key={file}
                className={`relative overflow-hidden rounded-xl bg-ink ${
                  i === 0 || i === 5 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-[4/5]"
                }`}
              >
                <MediaSlot image={file} alt={`HeatedUpFitness training photo ${i + 1}`} label="Photo" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS PREVIEW */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl text-plum mb-10">Real Results</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <div key={i} className="card-lift rounded-2xl bg-white p-6 border border-plum/10 shadow-sm">
                <p className="font-body text-charcoal/70 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-body font-semibold text-plum text-sm">{t.name}</p>
                <p className="font-body text-xs text-charcoal/50">{t.result}</p>
              </div>
            ))}
          </div>
          <Link href="/testimonials" className="inline-block mt-8 font-body font-semibold text-magenta hover:text-ember transition-colors">
            See more results →
          </Link>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section className="bg-plum text-cream">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h2 className="font-display text-3xl mb-3">Get the Free Snack Guide</h2>
          <p className="font-body text-mist mb-8">
            Sign up and we&apos;ll send you the Healthy Snack Guide, plus updates on new
            plans and challenges.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Email address"
              className="flex-1 rounded-full px-5 py-3 text-charcoal font-body focus:outline-none focus:ring-2 focus:ring-ember"
            />
            <button
              type="submit"
              className="rounded-full bg-heat-gradient px-6 py-3 font-body font-semibold text-ink hover:opacity-90 transition-opacity"
            >
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
