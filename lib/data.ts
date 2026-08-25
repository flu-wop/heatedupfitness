// ============================================================================
// HEATED UP FITNESS — SITE CONTENT
// Every value marked PLACEHOLDER should be confirmed with Mikia before launch.
// This file is the single source of truth for copy/pricing across the site —
// edit here, it updates everywhere.
// ============================================================================

export const BUSINESS = {
  name: "HeatedUpFitness",
  ownerName: "Mikia Gumms",
  tagline: "Where everyBODY's someBODY",
  email: "mikiagbusiness@gmail.com",
  phone: "(504) 345-8709",
  phoneRaw: "5043458709",
  serviceArea: "Westbank New Orleans — Anytime Fitness or client's gym of choice",
  trainingModes: ["In-person (Westbank New Orleans)", "Virtual / Online Coaching"],
  hashtag: "#stayheated",
};

export const CREDENTIALS = {
  certification: "ISSA Certified Personal Trainer",
  yearsExperience: 4,
  bio: `Hey there my fiery buddies, my name is Mikia Gumms. I'm THE trainer and owner of
HeatedUpFitness. My passion is to help you change your life the simplest and most realistic
way possible when it comes to your body and nutrition. Getting fit does not have to be
difficult, but often times it is. I'm here to work with you through it all.`,
  story: `I was always a runner. I ran track back in school. Even before running track, I would
always find myself running and racing in my neighborhood. I took working out more seriously
my junior year in high school, and after I've seen how defined my abs were looking, I turned
into a fitness freak. Start your fitness and health journey with me!`,
};

// Team No Fears — credibility line, not a competing CTA. Content is already
// produced (videos + 2 weeks of meal plans), so it's passive/no ongoing time
// cost to Mikia — safe to give it real (but secondary) visibility.
export const TEAM_NO_FEARS = {
  label: "Also coaching on Team No Fears",
  blurb: `Mikia is a coach on Team No Fears, a Westbank-based training team built on the
FitBudd app. Her pre-recorded workout library and two-week meal plans are available there
as a passive, on-demand option alongside her direct coaching.`,
  url: "#", // PLACEHOLDER — add real FitBudd/Team No Fears app link when available
};

// ---------------------------------------------------------------------------
// SERVICES / COACHING TIERS — pricing is a PLACEHOLDER recommendation.
// Her current rate was $150/mo. Suggested structure below gives room for a
// lower-commitment tier and prices the in-person/full-service tier above her
// old flat rate to reflect 4 years + ISSA cert. Confirm all three with her.
// ---------------------------------------------------------------------------
export const SERVICES = [
  {
    id: "self-guided",
    name: "Self-Guided Plans",
    price: "From $18",
    cadence: "one-time",
    description: "Done-for-you workout and meal plans you follow on your own schedule.",
    features: [
      "Instant digital download",
      "Meal plans and/or workout programs",
      "No coaching check-ins included",
    ],
    cta: "Browse Plans",
    ctaHref: "/shop",
    featured: false,
  },
  {
    id: "coaching",
    name: "1:1 Online Coaching",
    price: "$175/mo", // PLACEHOLDER — was $150/mo flat; suggested bump reflects
                       // cert + experience and adds structured check-ins
    cadence: "monthly",
    description: "Custom programming and nutrition guidance with weekly check-ins, fully remote.",
    features: [
      "Custom workout programming",
      "Custom nutrition guidance",
      "Weekly check-ins via message",
      "Progress tracking",
    ],
    cta: "Start Coaching",
    ctaHref: "/contact",
    featured: true,
  },
  {
    id: "in-person",
    name: "In-Person Training",
    price: "$250/mo", // PLACEHOLDER — confirm session count/frequency with Mikia
    cadence: "monthly",
    description: "Train face-to-face at Anytime Fitness or your gym on the Westbank.",
    features: [
      "In-person sessions (Westbank NOLA)",
      "Everything in Online Coaching",
      "Hands-on form correction",
    ],
    cta: "Book a Consult",
    ctaHref: "/contact",
    featured: false,
  },
];

// ---------------------------------------------------------------------------
// SHOP — replaces the old 14-product Squarespace grid. All PLACEHOLDER —
// confirm real plan content/pricing once Mikia's plans (item #4) are ready.
// ---------------------------------------------------------------------------
export type Product = {
  id: string;
  category: "Meal Plans" | "Workout Plans" | "Challenges";
  name: string;
  price: number; // 0 = free
  priceLabel: string;
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "meal-muscle-4wk",
    category: "Meal Plans",
    name: "4-Week Muscle Building Meal Plan",
    price: 25,
    priceLabel: "$25",
    description: "A four-week meal plan built to fuel muscle growth and recovery.",
  },
  {
    id: "meal-fatloss-4wk",
    category: "Meal Plans",
    name: "4-Week Fat Loss Meal Plan",
    price: 25,
    priceLabel: "$25",
    description: "A four-week meal plan designed for sustainable fat loss.",
  },
  {
    id: "snack-guide",
    category: "Meal Plans",
    name: "Healthy Snack Guide",
    price: 0,
    priceLabel: "Free",
    description: "A free guide to satisfying, on-plan snacks — get it delivered to your inbox.",
  },
  {
    id: "workout-fullbody",
    category: "Workout Plans",
    name: "HeatedUp Full-Body Program",
    price: 20,
    priceLabel: "$20",
    description: "A 4-week full-body training program for all levels.",
  },
  {
    id: "workout-glutes",
    category: "Workout Plans",
    name: "Glute Focus Program",
    price: 20,
    priceLabel: "$20",
    description: "A 4-week program focused on lower body strength and shape.",
  },
  {
    id: "workout-core",
    category: "Workout Plans",
    name: "Core & Abs Intensive",
    price: 18,
    priceLabel: "$18",
    description: "A 21-day core-focused program to build strength and definition.",
  },
  {
    id: "workout-arms",
    category: "Workout Plans",
    name: "Arm Definition Program",
    price: 18,
    priceLabel: "$18",
    description: "A 3-week program targeting arm strength and tone.",
  },
  {
    id: "challenge-home",
    category: "Challenges",
    name: '"Too Hot" Fitness Challenge — At-Home Edition',
    price: 25,
    priceLabel: "$25",
    description: "A full-body, glute, and ab-focused challenge you can do at home.",
  },
  {
    id: "challenge-gym",
    category: "Challenges",
    name: '"Too Hot" Fitness Challenge — Gym Edition',
    price: 25,
    priceLabel: "$25",
    description: "The same challenge, built out for a full gym setup.",
  },
];

// ---------------------------------------------------------------------------
// TESTIMONIALS — placeholders only. Nothing here is a real client quote.
// Swap every entry before launch.
// ---------------------------------------------------------------------------
export const TESTIMONIALS = [
  {
    quote: "PLACEHOLDER — real client testimonial goes here once Mikia shares one.",
    name: "Client Name",
    result: "Result / program completed",
  },
  {
    quote: "PLACEHOLDER — real client testimonial goes here once Mikia shares one.",
    name: "Client Name",
    result: "Result / program completed",
  },
  {
    quote: "PLACEHOLDER — real client testimonial goes here once Mikia shares one.",
    name: "Client Name",
    result: "Result / program completed",
  },
];

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Coaching", href: "/services" },
  { label: "Shop", href: "/shop" },
  { label: "Results", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];
