// app/layout.tsx
import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Anand Thakkar – Software Developer & Tech Creator",
    template: "%s | Anand Thakkar",
  },
  description:
    "Anand Thakkar – software developer sharing projects, blogs, and open-source insights.",
  openGraph: {
    title: "Anand Thakkar – Software Developer & Tech Creator",
    description:
      "Explore projects, blogs, and open-source contributions of Anand Thakkar.",
    url: baseUrl,
    siteName: "Anand Thakkar",
    locale: "en_US",
    type: "website",
    images: [
      {
        // Use relative URL since metadataBase is set
        url: "/preview-image.png",
        width: 1200,
        height: 630,
        alt: "Anand Thakkar Personal Website Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anand Thakkar – Software Developer & Tech Creator",
    description:
      "Explore projects, blogs, and open-source contributions of Anand Thakkar.",
    images: ["/preview-image.png"],
    creator: "@theanandthakkar",
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

// Tiny utility for conditional classnames (typed)
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
        {/* Main content */}
        <main className="flex-auto min-w-0 flex flex-col px-2 md:px-0">
          {children}
        </main>

        <Footer />

        {/* Analytics & Performance */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
