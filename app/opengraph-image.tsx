import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const alt = 'Anand Thakkar — Software Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const bgPath = path.join(process.cwd(), 'public', 'anand_thakkar_bg.png');
  const bgBuffer = fs.readFileSync(bgPath);
  const bgBase64 = bgBuffer.toString('base64');
  const bgDataUrl = `data:image/png;base64,${bgBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#050505',
          position: 'relative',
        }}
      >
        <img
          src={bgDataUrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(to right, rgba(5,5,5,0) 0%, rgba(5,5,5,0.6) 45%, rgba(5,5,5,0.95) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 80,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.05em',
              marginBottom: '10px',
            }}
          >
            Anand Thakkar
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 36,
              fontWeight: 500,
              color: '#d4d4d8',
              marginBottom: '30px',
            }}
          >
            Software Developer · Fintech/SaaS
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              color: '#a1a1aa',
              maxWidth: '650px',
              textAlign: 'right',
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            Building scalable solutions at the intersection of finance and technology. Every line of code is an opportunity.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
