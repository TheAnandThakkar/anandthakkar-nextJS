import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const revalidate = 86400;

export const alt = "Follow the journey with Anand Thakkar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const headshot = await readFile(
    path.join(process.cwd(), "public", "headshot.jpg")
  );
  const headshotSrc = `data:image/jpeg;base64,${headshot.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0a",
          padding: "72px 80px",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: brand */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: 26,
              color: "#9e9e9e",
              letterSpacing: "0.04em",
            }}
          >
            anandthakkar.com
          </span>
        </div>

        {/* Middle: content row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 660 }}>
            <span
              style={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#E91E63",
                marginBottom: 18,
              }}
            >
              Follow the journey
            </span>
            <span
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Finance, technology, and what happens when the two collide.
            </span>
          </div>

          {/* Headshot */}
          <div
            style={{
              display: "flex",
              width: 240,
              height: 240,
              borderRadius: 9999,
              overflow: "hidden",
              border: "5px solid #E91E63",
              flexShrink: 0,
              marginLeft: 48,
            }}
          >
            <img
              src={headshotSrc}
              alt=""
              width={240}
              height={240}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Bottom: name + subscribe button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 700, color: "#ffffff" }}>
              Anand Thakkar
            </span>
            <span style={{ fontSize: 22, color: "#9e9e9e", marginTop: 6 }}>
              No noise, only when it matters.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#E91E63",
              color: "#ffffff",
              fontSize: 28,
              fontWeight: 700,
              padding: "20px 44px",
              borderRadius: 16,
            }}
          >
            Subscribe
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
