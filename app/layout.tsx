// app/layout.tsx
import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";

// 1) Tweak titles for exact-name ranking
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Anand Thakkar", // <- put your name first
    template: "%s | Anand Thakkar",
  },
  description:
    "Software developer & tech creator — projects, blogs, and open-source.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Anand Thakkar",
    description:
      "Explore projects, blogs, and open-source contributions of Anand Thakkar.",
    url: baseUrl,
    siteName: "Anand Thakkar",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/preview-image.png`, // <- absolute URL
        width: 1200,
        height: 630,
        alt: "Anand Thakkar Personal Website Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anand Thakkar",
    description:
      "Explore projects, blogs, and open-source contributions of Anand Thakkar.",
    images: [`${baseUrl}/preview-image.png`], // <- absolute URL
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
};

// ================= JSON-LD blocks (put ABOVE RootLayout) =================
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
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: "Anand Thakkar",
  alternateName: ["TheAnandThakkar"],
  jobTitle: "Backend Engineer",
  url: siteUrl,
  image: { "@id": `${siteUrl}#headshot` },
  sameAs: [
    "https://github.com/TheAnandThakkar",
    "https://www.linkedin.com/in/theanandthakkar/",
    "https://x.com/TheAnandThakkar",
  ],
  worksFor: { "@type": "Organization", name: "Agile Infoways" },
  knowsAbout: [
    "Java",
    "Spring Boot",
    "NestJS",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Kubernetes",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressLocality: "Ahmedabad",
  },
};
// ========================================================================

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

        {/* Main content */}
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
