import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const downloadSecret = process.env.DOWNLOAD_SECRET!;

function verifyToken(token: string): { valid: boolean; reason?: string } {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const parts = decoded.split(":");

    if (parts.length !== 3) {
      return { valid: false, reason: "Malformed token" };
    }

    const [sessionId, expiryStr, signature] = parts;
    const expiry = parseInt(expiryStr, 10);

    if (Date.now() > expiry) {
      return { valid: false, reason: "Token expired" };
    }

    const payload = `${sessionId}:${expiryStr}`;
    const expectedSignature = crypto
      .createHmac("sha256", downloadSecret)
      .update(payload)
      .digest("hex");

    if (signature !== expectedSignature) {
      return { valid: false, reason: "Invalid signature" };
    }

    return { valid: true };
  } catch {
    return { valid: false, reason: "Invalid token" };
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const url = new URL(req.url);
  const direct = url.searchParams.get("dl") === "1";
  const result = verifyToken(token);

  if (!result.valid) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head><title>Download Expired</title></head>
      <body style="margin:0;padding:60px 24px;background:#0a0a0a;color:#ededed;font-family:Georgia,serif;text-align:center;">
        <h1 style="font-size:28px;font-weight:300;letter-spacing:0.05em;margin-bottom:16px;">Download Unavailable</h1>
        <p style="color:#8a8a8a;font-size:16px;margin-bottom:8px;">${result.reason === "Token expired" ? "This download link has expired." : "This download link is invalid."}</p>
        <p style="color:#666;font-size:14px;margin-bottom:32px;">Please contact <a href="mailto:hello@stillfirepress.com" style="color:#c9a84c;">hello@stillfirepress.com</a> for a new download link.</p>
        <a href="https://manamongsttheclouds.com" style="color:#c9a84c;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;">Return to Site</a>
      </body>
      </html>
      `.trim(),
      {
        status: 410,
        headers: { "Content-Type": "text/html" },
      },
    );
  }

  // If ?dl=1, serve the actual file
  if (direct) {
    const filePath = path.join(process.cwd(), "private", "matc-part1.epub");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "File not found. Please contact hello@stillfirepress.com" },
        { status: 404 },
      );
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/epub+zip",
        "Content-Disposition":
          'attachment; filename="Man Amongst the Clouds - Part I The Still Water.epub"',
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "no-store",
      },
    });
  }

  // Show landing page with Read Online + Download options
  const dlUrl = `${url.pathname}?dl=1`;
  const readUrl = `/read/${token}`;
  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head>
  <title>Your Book — Man Amongst the Clouds</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#ededed;font-family:Georgia,'Times New Roman',serif;min-height:100vh;display:flex;align-items:center;justify-content:center;">
  <div style="text-align:center;padding:40px 24px;max-width:480px;">
    <p style="color:#c9a84c;font-size:11px;letter-spacing:0.35em;text-transform:uppercase;margin-bottom:32px;">Stillfire Press</p>
    <h1 style="font-size:24px;font-weight:300;letter-spacing:0.05em;line-height:1.4;margin-bottom:8px;">Man Amongst the Clouds</h1>
    <p style="color:#8a8a8a;font-size:14px;margin-bottom:12px;">Part I: The Still Water</p>
    <p style="color:#555;font-size:12px;margin-bottom:40px;">Prologue + Chapters 1&ndash;10</p>

    <a href="${readUrl}" style="display:inline-block;padding:16px 40px;background:#c9a84c;color:#0a0a0a;font-size:13px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;font-family:sans-serif;margin-bottom:16px;">Read Online</a>
    <br>
    <a href="${dlUrl}" style="display:inline-block;padding:12px 32px;border:1px solid rgba(201,168,76,0.3);color:#c9a84c;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;font-family:sans-serif;margin-top:12px;">Download EPUB</a>

    <p style="color:#555;font-size:11px;margin-top:32px;line-height:1.6;">
      Read instantly in your browser, or download the EPUB<br>for Apple Books, Kindle, Kobo, or any e-reader.
    </p>

    <div style="border-top:1px solid #222;margin-top:40px;padding-top:24px;">
      <p style="font-size:12px;color:#444;font-style:italic;">&ldquo;The world sang to itself. And in the space between the notes,<br>where silence lived, a man breathed &mdash; and the air remembered.&rdquo;</p>
      <p style="font-size:11px;color:#333;margin-top:16px;">Stillfire Press &middot; &copy; 2026 Justin Cronk</p>
    </div>
  </div>
</body>
</html>`,
    {
      status: 200,
      headers: { "Content-Type": "text/html" },
    },
  );
}
