import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { verifyToken } from "@/app/lib/verify-token";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const result = verifyToken(token);

  if (!result.valid) {
    return NextResponse.json({ error: result.reason }, { status: 403 });
  }

  const filePath = path.join(process.cwd(), "private", "matc-part1.epub");

  try {
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/epub+zip",
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
