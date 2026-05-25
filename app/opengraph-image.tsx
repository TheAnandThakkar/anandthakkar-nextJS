import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const alt =
  "Anand Thakkar, Software Developer building fintech and SaaS systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const readImageDataUrl = (filename: string, mimeType: string) => {
  const imagePath = path.join(process.cwd(), "public", filename);
  const imageBuffer = fs.readFileSync(imagePath);
  return `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
};

export default async function Image() {
  const bgDataUrl = readImageDataUrl("anand_thakkar_bg-og.jpg", "image/jpeg");
  const logoDataUrl = readImageDataUrl("icon-192.png", "image/png");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#050505",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <img
          src={bgDataUrl}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(90deg, rgba(5,5,5,0.1) 0%, rgba(5,5,5,0.42) 42%, rgba(5,5,5,0.93) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(180deg, rgba(5,5,5,0.12) 0%, rgba(5,5,5,0) 42%, rgba(5,5,5,0.58) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 54,
            left: 64,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <img
            src={logoDataUrl}
            alt=""
            width={58}
            height={58}
            style={{
              borderRadius: 14,
              boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              Anand Thakkar
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 6,
                fontSize: 16,
                color: "#d4d4d8",
              }}
            >
              anandthakkar.com
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 68,
            top: 128,
            width: 560,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 0.95,
              fontWeight: 900,
              letterSpacing: "-0.045em",
              textShadow: "0 6px 28px rgba(0,0,0,0.75)",
            }}
          >
            Anand Thakkar
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 24,
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 999,
              padding: "10px 16px",
              color: "#f5f5f5",
              backgroundColor: "rgba(255,255,255,0.08)",
              fontSize: 19,
              fontWeight: 700,
              textShadow: "0 3px 14px rgba(0,0,0,0.65)",
            }}
          >
            Software Developer · Fintech/SaaS
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              maxWidth: 500,
              fontSize: 42,
              lineHeight: 1.12,
              color: "#d4d4d8",
              fontWeight: 800,
              textShadow: "0 5px 24px rgba(0,0,0,0.8)",
            }}
          >
            Building financial systems with code.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 48,
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#e5e5e5",
            fontSize: 18,
            fontWeight: 600,
            textShadow: "0 3px 14px rgba(0,0,0,0.7)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background:
                "linear-gradient(135deg, #7B2FF7 0%, #E91E63 100%)",
            }}
          />
          Portfolio · Blog · Open Source
        </div>
      </div>
    ),
    { ...size }
  );
}
