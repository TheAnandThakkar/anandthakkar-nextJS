/* eslint-disable @next/next/no-img-element -- ImageResponse (Satori) requires a plain img; next/image is unsupported in OG image generation */
import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export async function socialImageResponse() {
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
            style={{ fontSize: 26, color: "#9e9e9e", letterSpacing: "0.04em" }}
          >
            anandthakkar.com
          </span>
        </div>

        {/* Middle: identity + headshot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 800, letterSpacing: "-0.02em" }}>
              <span style={{ color: "#E91E63" }}>Anand</span>
              <span style={{ color: "#ffffff", marginLeft: 18 }}>Thakkar</span>
            </div>
            <span
              style={{
                fontSize: 30,
                fontWeight: 600,
                color: "#d4d4d4",
                marginTop: 20,
              }}
            >
              Builder · Finance × Tech
            </span>
            <span
              style={{
                fontSize: 26,
                color: "#9e9e9e",
                marginTop: 18,
                lineHeight: 1.4,
              }}
            >
              Eight years inside India&apos;s financial system. Then I started writing code.
            </span>
          </div>

          {/* Headshot */}
          <div
            style={{
              display: "flex",
              width: 280,
              height: 280,
              borderRadius: 9999,
              overflow: "hidden",
              border: "5px solid #E91E63",
              flexShrink: 0,
              marginLeft: 48,
            }}
          >
            <img src={headshotSrc} alt="" width={280} height={280} style={{ objectFit: "cover" }} />
          </div>
        </div>

        {/* Bottom: accent + line */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 6,
              background: "#E91E63",
              borderRadius: 9999,
              marginRight: 24,
            }}
          />
          <span style={{ fontSize: 24, color: "#9e9e9e" }}>
            Building at the intersection of finance and technology.
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
