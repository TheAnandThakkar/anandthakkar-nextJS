// app/layout.tsx
import "./global.css";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "./components/footer";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";

/** Light-first default; dark styles follow system preference. */
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light dark",
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
    images: [
      {
        url: `${baseUrl}/headshot.jpg`,
        width: 2519,
        height: 2519,
        alt: "Anand Thakkar headshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anand Thakkar",
    description: "Software Developer · Fintech/SaaS · AWS Cloud Practitioner.",
    creator: "@TheAnandThakkar",
    images: [`${baseUrl}/headshot.jpg`],
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
