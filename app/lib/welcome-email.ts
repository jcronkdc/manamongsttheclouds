import { Resend } from "resend";
import crypto from "crypto";

let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.manamongsttheclouds.com";

export async function sendWelcomeEmail(email: string): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.warn("[welcome-email] RESEND_API_KEY not set, skipping email");
    return false;
  }

  try {
    await resend.emails.send({
      from: "Stillfire Press <books@stillfirepress.com>",
      to: email,
      subject: "Welcome — the Song begins here",
      html: buildWelcomeHtml(email),
    });
    console.log(`Welcome email sent to ${email}`);
    return true;
  } catch (err) {
    console.error(`Failed to send welcome email to ${email}:`, err);
    return false;
  }
}

function generateUnsubscribeToken(email: string): string {
  const secret =
    process.env.UNSUBSCRIBE_SECRET || process.env.DOWNLOAD_SECRET || "fallback";
  const expiry = Date.now() + 365 * 24 * 60 * 60 * 1000; // 1 year
  const payload = `${email}:${expiry}`;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return Buffer.from(`${payload}:${signature}`).toString("base64url");
}

function buildWelcomeHtml(email: string): string {
  const unsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${generateUnsubscribeToken(email)}`;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;color:#ededed;font-family:Georgia,'Times New Roman',serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">

    <p style="color:#c9a84c;font-size:11px;letter-spacing:0.35em;text-transform:uppercase;text-align:center;margin-bottom:32px;">
      Stillfire Press
    </p>

    <h1 style="font-size:28px;font-weight:300;text-align:center;letter-spacing:0.05em;line-height:1.3;margin-bottom:8px;">
      You&rsquo;re in.
    </h1>

    <p style="text-align:center;color:#8a8a8a;font-style:italic;font-size:16px;margin-bottom:40px;">
      The Song remembers those who listen.
    </p>

    <div style="border:1px solid rgba(201,168,76,0.2);padding:32px;margin-bottom:32px;">
      <p style="font-size:15px;color:#ededed;line-height:1.8;margin-bottom:16px;">
        Thanks for signing up. Here&rsquo;s what you get:
      </p>
      <ul style="font-size:14px;color:#c4beb4;line-height:2.2;padding-left:20px;margin-bottom:0;">
        <li>First word when new parts release</li>
        <li>Behind-the-scenes content &mdash; world-building, writing process, early drafts</li>
        <li>Exclusive short stories set in the world of MATC</li>
      </ul>
    </div>

    <p style="font-size:14px;color:#999;line-height:1.7;margin-bottom:24px;">
      If you haven&rsquo;t started reading yet, the entire first part is free &mdash; no account needed:
    </p>

    <p style="text-align:center;margin-bottom:32px;">
      <a href="https://stillfirepress.com/read/matc" style="display:inline-block;padding:14px 32px;background-color:#c9a84c;color:#0a0a0a;font-size:13px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;font-family:sans-serif;">
        Read Part One Free
      </a>
    </p>

    <p style="font-size:14px;color:#999;line-height:1.7;margin-bottom:24px;">
      Already read it? The complete novel &mdash; all five parts, 48 chapters &mdash; is
      <a href="https://www.amazon.com/dp/B0GSSPN6LN" style="color:#c9a84c;text-decoration:none;">available now on Amazon</a>.
    </p>

    <div style="border-top:1px solid #222;padding-top:24px;margin-top:32px;">
      <p style="font-size:12px;color:#444;text-align:center;font-style:italic;">
        &ldquo;The world sang to itself, as it always had. And in the space between the notes, where silence lived, a man breathed &mdash; and the air remembered.&rdquo;
      </p>
      <p style="font-size:11px;color:#333;text-align:center;margin-top:16px;">
        Stillfire Press &middot; <a href="${siteUrl}" style="color:#444;text-decoration:none;">manamongsttheclouds.com</a>
      </p>
      <p style="font-size:10px;color:#333;text-align:center;margin-top:8px;">
        You signed up at ${siteUrl}. <a href="${unsubscribeUrl}" style="color:#444;text-decoration:none;">Unsubscribe</a>
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();
}
