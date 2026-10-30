// Legal page content. One source of truth so the pages, the checkout agreement
// and the recorded "version accepted" can never drift apart.
// Bump LEGAL.version + LEGAL.updated whenever any document below changes.
import { BUSINESS } from "@/lib/data";

export const LEGAL = {
  updated: "October 29, 2026",
  version: "2026-10-29",
};

export type LegalSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
  after?: string[];
};

const CO = BUSINESS.legalName;
const OWNER = BUSINESS.ownerName;
const EMAIL = BUSINESS.email;
const PHONE = BUSINESS.phone;

// ---------------------------------------------------------------------------
export const TERMS: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      `These Terms of Service ("Terms") are an agreement between you and ${CO} ("${BUSINESS.name}," "we," "us"), a fitness training and coaching business owned by ${OWNER} and based in the Westbank area of New Orleans, Louisiana. By using this website, booking a consult, or buying anything from us, you agree to these Terms, our Refund Policy, our Privacy Policy, and our Health & Liability Waiver.`,
    ],
  },
  {
    heading: "What we offer",
    bullets: [
      "Free consults to talk about your goals.",
      "1:1 online coaching: custom workout programming and nutrition guidance with check-ins.",
      "In-person personal training on the Westbank, at Anytime Fitness or your gym of choice.",
      "Digital meal plans and workout plans, delivered by email.",
      "Free resources, such as the Healthy Snack Guide.",
    ],
    after: [
      "What each service includes is described on the page where it is sold. We may update, add, or remove services over time.",
    ],
  },
  {
    heading: "Who can use our services",
    body: [
      "You must be at least 18 to buy from us or book training. If you are under 18, a parent or legal guardian must contact us first, and we will not start without their written consent.",
    ],
  },
  {
    heading: "Not medical advice",
    body: [
      "Everything we provide is general fitness and nutrition education and coaching. It is not medical advice, diagnosis, or treatment, and it does not replace your doctor, a registered dietitian, or a mental health professional.",
      "Talk to your physician before you start any exercise or nutrition program, especially if you have a health condition, an injury, food allergies, or are pregnant or nursing. If something hurts or feels wrong, stop and get medical help. Never ignore medical advice because of something you read or heard from us.",
    ],
  },
  {
    heading: "Your responsibilities",
    bullets: [
      "Give us accurate information about your health, injuries, and limitations, and tell us when they change.",
      "Follow instructions, use equipment properly, and follow the rules of the gym where you train.",
      "Train within your own limits. You are always free to stop or modify an exercise.",
    ],
  },
  {
    heading: "Pricing and payment",
    body: [
      "Prices are in U.S. dollars and are shown before you pay. Payments are processed by Stripe. We never see or store your full card number. By paying, you authorize the charge shown at checkout.",
      "Coaching and in-person training are sold month by month and paid in advance. We may change prices for future purchases, but never for something you have already paid for.",
    ],
  },
  {
    heading: "Booking, scheduling and cancellations",
    body: [
      "Free consults can be rescheduled or canceled any time; please just let us know.",
      "For paid in-person sessions, we ask for at least 24 hours' notice to cancel or reschedule. Sessions canceled with less notice, and no-shows, are forfeited. If we cancel a session, we will reschedule it at no cost. Full details are in our Refund Policy.",
    ],
  },
  {
    heading: "Digital plans",
    body: [
      "When you buy a digital plan we give you a personal, non-transferable license to use it for yourself. You may not resell, share, post, or distribute it. Because digital plans are delivered immediately, they are subject to our Refund Policy.",
    ],
  },
  {
    heading: "Results",
    body: [
      "Results vary from person to person and depend on many things we do not control, including your effort, consistency, health, genetics, and lifestyle. We do not guarantee any particular outcome. Any client stories or results shown on this site reflect the individual and are not a promise of what you will achieve.",
    ],
  },
  {
    heading: "Photos, videos and testimonials",
    body: [
      "We will not use your photos, videos, name, or testimonial in our marketing without your separate, written permission. You can withdraw that permission for future use at any time by emailing us.",
    ],
  },
  {
    heading: "Our content",
    body: [
      `The ${BUSINESS.name} name, logo, website, plans, videos, photos, and written content belong to ${CO} or its licensors. You may view and use them for your own personal, non-commercial purposes, but you may not copy, sell, or republish them without our written permission.`,
    ],
  },
  {
    heading: "Using this website",
    body: [
      "Please do not misuse the site: no attempts to break, overload, scan, or gain unauthorized access to it or its data, no automated scraping, no submitting information that is false or belongs to someone else, and no unlawful use.",
    ],
  },
  {
    heading: "Limits on our liability",
    body: [
      "Exercise carries inherent risks, which are explained in our Health & Liability Waiver. To the fullest extent the law allows, we are not responsible for indirect, incidental, or consequential damages, and our total liability to you for any claim related to our services is limited to the amount you paid us in the three months before the claim arose.",
      "Nothing in these Terms limits liability that cannot be limited under Louisiana or other applicable law. This includes liability for intentional or gross fault, and for physical injury caused by our fault. It also does not limit any consumer rights you have by law.",
    ],
  },
  {
    heading: "Governing law and disputes",
    body: [
      "These Terms are governed by the laws of the State of Louisiana. If we have a disagreement, please contact us first so we can try to work it out. If we cannot, any lawsuit must be brought in the state or federal courts located in Louisiana.",
    ],
  },
  {
    heading: "Changes to these Terms",
    body: [
      "We may update these Terms from time to time. The date at the top shows when they last changed. Changes apply going forward; for anything you have already paid for, the Terms in effect when you bought it continue to apply.",
    ],
  },
  {
    heading: "Contact",
    body: [`Questions about these Terms? Email ${EMAIL} or call ${PHONE}.`],
  },
];

// ---------------------------------------------------------------------------
export const REFUND: LegalSection[] = [
  {
    heading: "The short version",
    bullets: [
      "Digital plans: all sales are final, with a few fair exceptions below.",
      "1:1 online coaching: full refund if we have not started within 5 business days; no refund for a month once it has started.",
      "In-person training: 24 hours' notice to cancel or reschedule; late cancellations and no-shows are forfeited.",
      "Free consults and free guides: always free.",
    ],
  },
  {
    heading: "Digital meal and workout plans",
    body: [
      "Digital plans are delivered immediately by email and cannot be returned, so all sales are final.",
      "We will fix the problem or refund you if: you were charged more than once for the same plan; you did not receive your plan; or the file is damaged or will not open and we cannot fix it. Email us within 7 days of purchase and we will make it right.",
    ],
  },
  {
    heading: "1:1 online coaching",
    body: [
      "Online coaching is month to month and paid in advance. After you pay, we will contact you to begin onboarding. If we have not contacted you within 5 business days of your payment, you may ask for a full refund.",
      "Once your coaching has started (your onboarding has begun or your first program has been delivered), the fee for the current month is non-refundable, and we do not prorate partial months. You can stop at any time by emailing us before your next payment is due, and you will not be charged again.",
    ],
  },
  {
    heading: "In-person training",
    body: [
      "If you change your mind before your first session, email us at least 24 hours before it and we will refund you in full.",
      "After that, please give at least 24 hours' notice to cancel or reschedule a session, and we will happily move it. Sessions canceled with less than 24 hours' notice, and no-shows, are forfeited and not refunded. Sessions do not roll over past the month you paid for unless we agree to it in writing.",
      `If ${OWNER} cancels or has to reschedule a session, we will move it to a time that works for you at no cost or credit or refund that session. If illness or an injury keeps you from training, tell us and we will work with you to reschedule or pause.`,
    ],
  },
  {
    heading: "Free consults and free resources",
    body: [
      "Consults and free resources like the Healthy Snack Guide have no charge, so there is nothing to refund.",
    ],
  },
  {
    heading: "How refunds work",
    body: [
      "Approved refunds go back to the card you paid with, through Stripe. Your bank may take 5 to 10 business days to show it. If you think you were billed in error, please email us before contacting your bank so we can fix it quickly.",
      "Nothing in this policy limits any rights you have under applicable law.",
    ],
  },
  {
    heading: "Contact",
    body: [`Billing questions? Email ${EMAIL} or call ${PHONE}.`],
  },
];

// ---------------------------------------------------------------------------
export const PRIVACY: LegalSection[] = [
  {
    heading: "Overview",
    body: [
      `${CO} ("${BUSINESS.name}," "we," "us") respects your privacy. This policy explains what we collect through this website, why, who we share it with, and the choices you have. We do not sell your personal information.`,
    ],
  },
  {
    heading: "What we collect",
    bullets: [
      "Booking a consult: your name, email, phone (optional), training mode, preferred date and time, and any goals or notes you choose to share.",
      "Buying a plan or signing up for coaching: your name and email. Your card details go directly to Stripe. We never see or store your full card number.",
      "Joining our email list or getting the Healthy Snack Guide: your email address.",
      "Contacting us: whatever you send us by email, phone, or text.",
      "Automatically: your IP address and basic browser and device information, in server logs and to protect the site from spam and abuse. We also set one cookie, used only to keep the site owner signed in to a private admin area. We do not currently use advertising or analytics cookies or tracking pixels.",
    ],
  },
  {
    heading: "Health and fitness information",
    body: [
      "To train and coach you safely, we may ask about injuries, limitations, and health history. You decide what to share. We use it only to plan your training and keep you safe, and we keep it confidential. We are a fitness business, not a healthcare provider, so health privacy laws that apply to doctors and hospitals do not govern us, but we treat what you tell us with care.",
    ],
  },
  {
    heading: "How we use your information",
    bullets: [
      "Schedule and confirm consults and sessions.",
      "Deliver the plans and guides you request and provide your coaching.",
      "Process payments and keep records of your purchases.",
      "Reply to your questions.",
      "Send you updates about plans, challenges, and coaching if you signed up for them.",
      "Keep the site secure, prevent fraud and abuse, and meet legal obligations.",
    ],
  },
  {
    heading: "Who we share it with",
    body: [
      "We share information only with the service providers that help us run the business, and only as needed to do their job:",
    ],
    bullets: [
      "Stripe: payment processing.",
      "Resend: sending our emails (confirmations, plans, the guide).",
      "Turso: the database that stores bookings, orders, and email signups.",
      "Vercel: hosting this website.",
    ],
    after: [
      "We may also disclose information if the law requires it, to protect our rights or safety or others', or as part of a sale or transfer of the business. We do not sell your information or share it for advertising.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "We keep booking and order records as long as we need them to serve you and for business, tax, and legal purposes. Email list addresses are kept until you ask us to remove you. You can ask us to delete your information at any time (see below); we may keep what we are required by law to keep.",
    ],
  },
  {
    heading: "Your choices",
    bullets: [
      `Unsubscribe: email ${EMAIL} with "unsubscribe" and we will remove you from our email list.`,
      "Access, correct, or delete: email us and we will help. We may need to verify it is you first.",
      "Depending on where you live, you may have additional privacy rights. Contact us and we will honor the rights that apply to you.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We use reasonable measures to protect your information, including encrypted connections, restricted access, and trusted providers. No method of transmission or storage is perfectly secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Children",
    body: [
      "Our services are for adults. We do not knowingly collect personal information from anyone under 13. If you believe a child has given us information, email us and we will delete it.",
    ],
  },
  {
    heading: "Links to other sites",
    body: [
      "Our site may link to other services, such as the Team No Fears app. Those have their own privacy practices, and this policy does not cover them.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy. The date at the top shows the latest version. If we make a significant change we will say so on this page.",
    ],
  },
  {
    heading: "Contact us",
    body: [`Questions or requests? Email ${EMAIL} or call ${PHONE}.`],
  },
];

// ---------------------------------------------------------------------------
export const WAIVER: LegalSection[] = [
  {
    heading: "About this waiver",
    body: [
      `This Health & Liability Waiver (Assumption of Risk and Informed Consent) applies to anyone who trains or coaches with ${CO} and ${OWNER}. It is meant to make sure you understand the risks of exercise and what we each need to do to stay safe. It is part of our Terms of Service.`,
    ],
  },
  {
    heading: "Voluntary participation",
    body: [
      "I am choosing to take part in fitness training, coaching, and related physical activity voluntarily. I understand I can stop, slow down, or modify any exercise at any time.",
    ],
  },
  {
    heading: "I understand the risks",
    body: [
      "Exercise, including strength training, cardio, conditioning, and stretching, has inherent risks, even when done correctly with proper instruction and equipment. These include muscle, joint, and tendon strains and sprains, falls, equipment-related injuries, dizziness or fainting, heart and blood pressure events, and, in rare cases, serious injury, disability, or death. Following a nutrition plan carries its own risks, such as digestive upset or reactions to foods.",
    ],
  },
  {
    heading: "My health and my responsibilities",
    bullets: [
      "I have disclosed, or will disclose before training, any injury, medical condition, pregnancy, or medication that could affect my ability to exercise safely, and I will update this if it changes.",
      "I either have no known condition that would prevent me from exercising safely, or my physician has cleared me to participate.",
      "I will stop and tell my trainer right away if I feel pain, dizziness, shortness of breath, or anything unusual.",
      "I will follow instructions and the rules of any gym or facility where I train, and I will use equipment as shown.",
      "I understand this program is not a substitute for medical care, and I am responsible for my own medical decisions.",
    ],
  },
  {
    heading: "Assumption of risk",
    body: [
      "I knowingly and voluntarily accept the ordinary, inherent risks of exercise and training described above.",
    ],
  },
  {
    heading: "What this waiver does not do",
    body: [
      `To the extent Louisiana law allows, I release ${CO}, ${OWNER}, and the gyms or facilities where we train from claims arising from the ordinary inherent risks of exercise.`,
      "This waiver does not release anyone from liability that Louisiana law does not allow to be waived in advance, including liability for intentional or gross fault, and for physical injury caused by another person's fault. It does not limit any right I have under law. If any part of this waiver is found unenforceable, the rest stays in effect.",
    ],
  },
  {
    heading: "Emergencies",
    body: [
      `If I am injured or become ill during a session, I authorize ${OWNER} to call 911 or arrange emergency medical care for me. I am responsible for the cost of that care.`,
    ],
  },
  {
    heading: "Photos and video",
    body: [
      "We will not use photos or videos of me in marketing or on social media unless I give separate written permission.",
    ],
  },
  {
    heading: "Minors",
    body: [
      "Training is for adults 18 and older. A parent or legal guardian must contact us before anyone under 18 trains with us, and a separate guardian agreement is required.",
    ],
  },
  {
    heading: "My agreement",
    body: [
      `I have read this waiver and understand it. When I check the agreement box at checkout, my acceptance is recorded with the date and the version of this waiver (version ${LEGAL.version}). Clients training in person may also be asked to sign a copy at their first session. You can email ${EMAIL} for a copy at any time.`,
    ],
  },
];
