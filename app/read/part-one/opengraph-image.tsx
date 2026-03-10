import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt =
  "Read Part One: The Still Water — Man Amongst the Clouds by Justin Cronk";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const coverPath = join(process.cwd(), "public", "cover-part-one.jpg");
  const coverBuffer = await readFile(coverPath);
  const coverBase64 = `data:image/jpeg;base64,${coverBuffer.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Georgia, serif",
        position: "relative",
      }}
    >
      {/* Subtle glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "30%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(100,130,170,0.12) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Border */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          right: 20,
          bottom: 20,
          border: "1px solid rgba(201,168,76,0.15)",
          display: "flex",
        }}
      />

      {/* Left: Book cover */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 480,
          height: "100%",
          paddingLeft: 60,
        }}
      >
        <img
          src={coverBase64}
          alt=""
          width={320}
          height={414}
          style={{
            objectFit: "cover",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(100,130,170,0.1)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
      </div>

      {/* Right: Text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          flex: 1,
          paddingLeft: 40,
          paddingRight: 60,
        }}
      >
        <div
          style={{
            background: "rgba(201,168,76,0.15)",
            border: "1px solid rgba(201,168,76,0.3)",
            padding: "6px 16px",
            marginBottom: 24,
            display: "flex",
          }}
        >
          <span
            style={{
              color: "#c9a84c",
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
            }}
          >
            Free to Read
          </span>
        </div>

        <div
          style={{
            color: "rgba(201,168,76,0.5)",
            fontSize: 11,
            letterSpacing: "0.35em",
            textTransform: "uppercase" as const,
            marginBottom: 16,
            display: "flex",
          }}
        >
          Man Amongst the Clouds
        </div>

        <div
          style={{
            color: "#ededed",
            fontSize: 46,
            fontWeight: 300,
            letterSpacing: "0.04em",
            lineHeight: 1.1,
            marginBottom: 6,
            display: "flex",
          }}
        >
          Part One
        </div>

        <div
          style={{
            color: "#c9a84c",
            fontSize: 28,
            fontWeight: 300,
            fontStyle: "italic",
            letterSpacing: "0.06em",
            marginBottom: 28,
            display: "flex",
          }}
        >
          The Still Water
        </div>

        <div
          style={{
            width: 50,
            height: 1,
            background: "rgba(201,168,76,0.35)",
            marginBottom: 22,
            display: "flex",
          }}
        />

        <div
          style={{
            color: "rgba(200,200,200,0.5)",
            fontSize: 14,
            letterSpacing: "0.15em",
            marginBottom: 8,
            display: "flex",
          }}
        >
          by Justin Cronk
        </div>

        <div
          style={{
            color: "rgba(138,138,138,0.35)",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            display: "flex",
          }}
        >
          10 Chapters &bull; manamongsttheclouds.com
        </div>
      </div>
    </div>,
    { ...size },
  );
}
