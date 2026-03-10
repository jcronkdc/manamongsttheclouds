import crypto from "crypto";

const downloadSecret = process.env.DOWNLOAD_SECRET!;

export function verifyToken(token: string): { valid: boolean; reason?: string } {
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
