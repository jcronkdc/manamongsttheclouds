import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Man Amongst the Clouds — A Literary Fantasy Novel by Justin Cronk";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Gold glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Borders */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "1px solid rgba(201,168,76,0.2)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            right: 32,
            bottom: 32,
            border: "1px solid rgba(201,168,76,0.1)",
            display: "flex",
          }}
        />

        {/* Epigraph */}
        <div
          style={{
            color: "rgba(138,138,138,0.6)",
            fontSize: 16,
            fontStyle: "italic",
            marginBottom: 40,
            display: "flex",
          }}
        >
          &ldquo;Magic is memory. The Song is love made audible. The cost is
          everything.&rdquo;
        </div>

        {/* Title */}
        <div
          style={{
            color: "#ededed",
            fontSize: 64,
            fontWeight: 300,
            letterSpacing: "0.05em",
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>Man Amongst</span>
          <span>the Clouds</span>
        </div>

        {/* Author */}
        <div
          style={{
            color: "rgba(201,168,76,0.7)",
            fontSize: 20,
            letterSpacing: "0.15em",
            marginBottom: 32,
            display: "flex",
          }}
        >
          by Justin Cronk
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              background: "rgba(201,168,76,0.3)",
              display: "flex",
            }}
          />
          <div
            style={{
              color: "rgba(201,168,76,0.5)",
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              display: "flex",
            }}
          >
            A Literary Fantasy Novel &bull; Part I Available Now &bull; $2.99
          </div>
          <div
            style={{
              width: 40,
              height: 1,
              background: "rgba(201,168,76,0.3)",
              display: "flex",
            }}
          />
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            color: "rgba(138,138,138,0.4)",
            fontSize: 12,
            letterSpacing: "0.2em",
            display: "flex",
          }}
        >
          manamongsttheclouds.com
        </div>
      </div>
    ),
    { ...size }
  );
}
