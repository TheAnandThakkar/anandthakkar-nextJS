// app/layout.tsx
import "./global.css";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "./components/footer";
import { Navbar } from "./components/nav";
import { SiteJsonLd } from "./components/site-json-ld";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";

const siteTitle = "Anand Thakkar - Building at the Intersection of Finance & Tech";
const siteDescription =
  "From India's tax system to building fintech software. Anand Thakkar on finance, technology, and what happens when the two collide.";

/** Light-first default; dark styles follow system preference. */
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteTitle,
    template: "%s | Anand Thakkar",
  },
  keywords: [
    "Anand Thakkar",
    "Anand Thakkar Software Developer",
    "Anand Thakkar from Ahmedabad",
    "Anand Thakkar from Gujarat",
    "Anand Thakkar from India",
    "Anand Thakkar from Ahmedabad, Gujarat, India",
    "Who is Anand Thakkar",
    "Anand Thakkar Taxaltus",
    "Anand Thakkar Java Developer",
    "Anand Thakkar Backend Developer",
    "Anand Thakkar Software Engineer",
    "Who is Anand",
    "Who is Thakkar",
    "Anand Thakkar Fintech",
    "Fintech",
    "Anand Thakkar Fintech/SaaS",
    "Thoughts of Anand Thakkar",
    "Software Developer",
    "Tech Creator",
    "Taxaltus",
    "TheAnandThakkar",
    "TheAnandThakkar on GitHub",
    "TheAnandThakkar on LinkedIn",
    "TheAnandThakkar on X (Twitter)",
    "TheAnandThakkar on Instagram",
    "TheAnandThakkar on Facebook",
    "AnandHThakkar on YouTube",
  ],
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: baseUrl,
    siteName: "Anand Thakkar",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Anand Thakkar, building at the intersection of finance and technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@TheAnandThakkar",
    images: [`${baseUrl}/twitter-image`],
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
        <SiteJsonLd />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-auto min-w-0 flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
        >
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
