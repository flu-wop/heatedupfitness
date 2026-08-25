# HeatedUpFitness

Next.js 16 site for Mikia Gumms / HeatedUpFitness. Pro bono build.

## Stack
Next.js App Router + TypeScript + Tailwind, Turso (bookings/orders/newsletter),
Stripe Checkout (digital plans), Resend (confirmation emails + .ics invites).

## Placeholders still needed before launch (all centralized in `lib/data.ts` unless noted)

1. Real digital plan content (currently 9 placeholder plans in `lib/data.ts` → `PRODUCTS`)
2. Coaching tier pricing — suggested $175/mo (online) and $250/mo (in-person) vs. her old
   flat $150/mo; confirm final numbers in `lib/data.ts` → `SERVICES`
3. Real client testimonials + before/after photos (`lib/data.ts` → `TESTIMONIALS`,
   `app/testimonials/page.tsx`)
4. Team No Fears / FitBudd app link (`lib/data.ts` → `TEAM_NO_FEARS.url`)
5. Professional photo of Mikia for the About page hero (`app/about/page.tsx` — currently a
   placeholder block)
6. Actual PDF files / delivery links for digital plans, wired into
   `lib/email.ts` → `sendProductDelivery`
7. Cancellation/no-show policy details for `app/legal/terms` and `app/legal/refund`
8. Attorney review of all four legal pages before launch — they're drafted starting points,
   not legal advice, especially the liability waiver (`app/legal/waiver`)
9. Logo files are already in `public/images/` (light + dark versions) from the assets she sent

## Local setup

```bash
npm install
cp .env.example .env.local
# fill in .env.local with real Turso/Stripe/Resend keys
npm run dev
```

## Accounts needed (same pattern as your other booking-system sites)

- Turso — create a new DB: `turso db create heatedupfitness-bookings`
- Stripe — get keys from dashboard, add a webhook endpoint pointing to
  `/api/stripe/webhook` for the `checkout.session.completed` event
- Resend — verify a sending domain when ready (using `onboarding@resend.dev` for now)

## Deploy

```bash
git init
git add .
git commit -m "Initial HeatedUpFitness site"
git branch -M main
git remote add origin https://github.com/flu-wop/heatedupfitness.git
git push -u origin main
```

Then in Vercel: import the repo, add all env vars from `.env.example` with real values,
and set the production domain once she has one.
