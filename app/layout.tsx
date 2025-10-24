// app/layout.tsx
import "./global.css";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Anand Thakkar",
    template: "%s | Anand Thakkar",
  },
  description: "Software Developer & Tech Creator.",
  openGraph: {
    title: "Anand Thakkar",
    description: "Software Developer & Tech Creator.",
    url: baseUrl,
    siteName: "Anand Thakkar",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/preview-image.png`,
        width: 1200,
        height: 630,
        alt: "Anand Thakkar – Software Developer & Tech Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anand Thakkar",
    description: "Software Developer & Tech Creator.",
    images: [`${baseUrl}/preview-image.png`],
    creator: "@TheAnandThakkar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  verification: {
    google: "NcYI6AaN1NLYNYRJKntQcoJ0stFodzOvIsNDpqXOGfw",
  },
};

// ================= JSON-LD blocks =================
const siteUrl = "https://www.anandthakkar.com";
const personId = `${siteUrl}#person`;
const websiteId = `${siteUrl}#website`;

const imageObject = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "@id": `${siteUrl}#headshot`,
  url: `${siteUrl}/headshot.jpg`,
  contentUrl: `${siteUrl}/headshot.jpg`,
  caption: "Anand Thakkar headshot",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: "Anand Thakkar",
  // Add SearchAction only if you actually have /search implemented.
  // potentialAction: {
  //   "@type": "SearchAction",
  //   target: `${siteUrl}/search?q={search_term_string}`,
  //   "query-input": "required name=search_term_string",
  // },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}#person`,
  name: "Anand Thakkar",
  alternateName: ["TheAnandThakkar"],
  jobTitle: "Software Developer & Tech Creator",
  url: siteUrl,
  image: { "@id": `${siteUrl}#headshot` },
  sameAs: [
    "https://github.com/TheAnandThakkar",
    "https://www.linkedin.com/in/theanandthakkar/",
    "https://x.com/TheAnandThakkar",
  ],
  worksFor: { "@type": "Organization", name: "Agile Infoways" },
  // Keep this to real topics (10–15 max)
  knowsAbout: [
    "Software development",
    "Backend engineering",
    "System design",
    "API design",
    "Java",
    "Spring Boot",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Performance optimization",
    "Microservices",
    "Distributed systems",
    "Technical writing",
    "Developer tooling",
  ],
  knowsLanguage: ["en", "hi"], // optional but nice
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressLocality: "Ahmedabad",
  },
};

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        {/* JSON-LD (OK in body) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObject) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        <main className="flex-auto min-w-0 flex flex-col px-2 md:px-0">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
