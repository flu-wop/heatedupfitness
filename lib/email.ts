import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (_resend) return _resend;
  _resend = new Resend(process.env.RESEND_API_KEY!);
  return _resend;
}

export async function sendBookingConfirmation(opts: {
  to: string;
  name: string;
  date: string;
  time: string;
  mode: string;
  icsContent?: string;
}) {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  await resend.emails.send({
    from: `HeatedUpFitness <${from}>`,
    to: opts.to,
    subject: "You're booked with HeatedUpFitness!",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color:#C42D8E;">You're booked, ${opts.name}!</h2>
        <p>Your consult is set for <strong>${opts.date} at ${opts.time}</strong> (${opts.mode}).</p>
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

  // Notify the owner too
  const ownerEmail = process.env.RESEND_TO_EMAIL;
  if (ownerEmail) {
    await resend.emails.send({
      from: `HeatedUpFitness <${from}>`,
      to: ownerEmail,
      subject: `New booking: ${opts.name}`,
      html: `<p>${opts.name} booked a consult for ${opts.date} at ${opts.time} (${opts.mode}).</p>`,
    });
  }
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
        <p>Your <strong>${opts.productName}</strong> is attached / linked below.</p>
        <p style="color:#888;font-size:12px;">PLACEHOLDER — attach the real PDF or download link here once the plan content is finalized.</p>
      </div>
    `,
  });
}
