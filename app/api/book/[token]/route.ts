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
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const result = verifyToken(token);

  if (!result.valid) {
    return NextResponse.json({ error: result.reason }, { status: 403 });
  }

  const filePath = path.join(process.cwd(), "private", "matc-part1.epub");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/epub+zip",
      "Cache-Control": "private, max-age=3600",
    },
  });
}
