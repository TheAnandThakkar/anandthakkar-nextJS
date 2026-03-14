// app/layout.tsx
import "./global.css";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "./components/footer";
import { Navbar } from "./components/nav";
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
  keywords: ["Anand Thakkar", "Software Developer", "Tech Creator", "Fintech", "Taxaltus"],
  description: "Software Developer · Fintech/SaaS · AWS Cloud Practitioner. Building scalable solutions at the intersection of finance and technology.",
  openGraph: {
    title: "Anand Thakkar",
    description: "Software Developer · Fintech/SaaS · AWS Cloud Practitioner. Building scalable solutions at the intersection of finance and technology.",
    url: baseUrl,
    siteName: "Anand Thakkar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anand Thakkar",
    description: "Software Developer · Fintech/SaaS · AWS Cloud Practitioner.",
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
  jobTitle: "Software Developer",
  description: "Software Developer specializing in Fintech, SaaS, and AWS Cloud.",
  url: siteUrl,
  image: { "@id": `${siteUrl}#headshot` },
  sameAs: [
    "https://github.com/TheAnandThakkar",
    "https://www.linkedin.com/in/theanandthakkar/",
    "https://x.com/TheAnandThakkar",
    "https://anandthakkar.dev"
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
    "Tech Creator",
    "Taxaltus",
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
      <body className="antialiased min-h-screen">
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

        <Navbar />
        <main className="flex-auto min-w-0 flex flex-col">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
