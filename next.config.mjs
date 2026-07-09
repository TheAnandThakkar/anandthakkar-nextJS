/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "font-src 'self' data:",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "frame-src 'self'",
  "img-src 'self' data: blob: https:",
  "manifest-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com https://*.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "worker-src 'self' blob:",
  "connect-src 'self' https://vitals.vercel-insights.com https://*.vercel-insights.com https://va.vercel-scripts.com",
].join("; ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = {
  images: {
    qualities: [75, 85],
    // All images are self-hosted; photos only change by getting a new filename,
    // so optimized variants can be cached long-term.
    minimumCacheTTL: 2678400, // 31 days
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Static photos and icons in /public change by getting a new filename,
        // so they can be cached for 30 days instead of revalidating every visit.
        source: "/:all*(jpg|jpeg|png|webp|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
