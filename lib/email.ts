import { Resend } from "resend";

let _resend: Resend | null = null;

// Every user-supplied value that lands in an HTML email goes through this.
export function esc(v: unknown): string {
  return String(v ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}

function getResend(): Resend {
  if (_resend) return _resend;
  _resend = new Resend(process.env.RESEND_API_KEY!);
  return _resend;
}

// Stripe already charged the customer by the time this fires — a failed DB
// write here means real money moved with no record of it. Best-effort: if
// this alert itself fails to send, that's only logged, never re-thrown.
export async function sendWebhookFailureAlert(details: { sessionId: string; error: string }) {
  try {
    const resend = getResend();
    const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const ownerEmail = process.env.RESEND_TO_EMAIL;
    if (!ownerEmail) {
      console.error("[webhook-failure-alert] RESEND_TO_EMAIL not set — cannot alert:", details);
      return;
    }
    await resend.emails.send({
      from: `HeatedUpFitness <${from}>`,
      to: ownerEmail,
      subject: `⚠️ Payment received but order record failed — session ${details.sessionId}`,
      html: `
        <p><strong>Manual reconciliation needed.</strong></p>
        <p>Stripe confirmed payment for session <code>${esc(details.sessionId)}</code>, but recording
        or delivering the order failed.</p>
        <p>The customer was charged. Check Stripe's dashboard for this session and follow up
        with the customer directly.</p>
        <p style="color:#888;font-size:13px">Error: ${esc(details.error)}</p>
      `,
    });
  } catch (err) {
    console.error("[webhook-failure-alert] Failed to send alert:", err);
  }
}

export async function sendBookingConfirmation(opts: {
  to: string;
  name: string;
  phone?: string;
  message?: string;
  date: string;
  time: string;
  mode: string;
  icsContent?: string;
}) {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const errors: unknown[] = [];

  // Owner notice goes first and is independent: Mikia hears about the booking
  // even if the customer's confirmation fails (and vice versa).
  const ownerEmail = process.env.RESEND_TO_EMAIL;
  if (ownerEmail) {
    try {
      await resend.emails.send({
        from: `HeatedUpFitness <${from}>`,
        to: ownerEmail,
        subject: `New booking: ${opts.name.replace(/[\r\n]+/g, " ")}`,
        html: `<p><strong>${esc(opts.name)}</strong> booked a consult for ${esc(opts.date)} at ${esc(opts.time)} (${esc(opts.mode)}).</p>
<p>Email: ${esc(opts.to)}<br/>Phone: ${esc(opts.phone || "—")}</p>
<p>Goals: ${esc(opts.message || "—")}</p>`,
      });
    } catch (err) {
      errors.push(err);
    }
  }

  try {
    await resend.emails.send({
      from: `HeatedUpFitness <${from}>`,
      to: opts.to,
      subject: "You're booked with HeatedUpFitness!",
      html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color:#C42D8E;">You're booked, ${esc(opts.name)}!</h2>
        <p>Your consult is set for <strong>${esc(opts.date)} at ${esc(opts.time)}</strong> (${esc(opts.mode)}).</p>
        <p>Mikia will follow up shortly to confirm details.</p>
        <p style="color:#888;font-size:12px;">#stayheated</p>
      </div>
    `,
      ...(opts.icsContent
        ? {
            attachments: [
              {
                filename: "consult.ics",
                content: Buffer.from(opts.icsContent).toString("base64"),
              },
            ],
          }
        : {}),
    });
  } catch (err) {
    errors.push(err);
  }

  // Surface (not swallow) — the route logs this; the booking itself is already saved.
  if (errors.length) throw new Error(`Booking email failed (${errors.length}): ${String(errors[0])}`);
}

export async function sendProductDelivery(opts: { to: string; productName: string }) {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  await resend.emails.send({
    from: `HeatedUpFitness <${from}>`,
    to: opts.to,
    subject: `Your ${opts.productName} is here!`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color:#C42D8E;">Thanks for your purchase!</h2>
        <p>Your <strong>${esc(opts.productName)}</strong> is attached / linked below.</p>
        <p style="color:#888;font-size:12px;">PLACEHOLDER — attach the real PDF or download link here once the plan content is finalized.</p>
      </div>
    `,
  });
}

// Tell Mikia a coaching/training plan was paid for so she can start onboarding.
export async function sendPlanPurchaseNotice(opts: {
  planName: string;
  amount: number;
  customerEmail: string;
  customerName: string;
}) {
  const ownerEmail = process.env.RESEND_TO_EMAIL;
  if (!ownerEmail) {
    console.error("[plan-purchase] RESEND_TO_EMAIL not set — cannot notify:", opts);
    return;
  }
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const esc = (v: string) => v.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
  await resend.emails.send({
    from: `HeatedUpFitness <${from}>`,
    to: ownerEmail,
    subject: `New ${opts.planName} client — $${opts.amount} paid`,
    html: `<p><strong>${esc(opts.customerName || "A new client")}</strong> (${esc(opts.customerEmail)}) paid <strong>$${opts.amount}</strong> in full for <strong>${esc(opts.planName)}</strong>. Reach out to start onboarding.</p>`,
  });
}
