import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-24 pb-16 bg-white dark:bg-neutral-950">
      <p className="text-sm font-semibold text-magenta uppercase tracking-wider mb-2">
        404
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white text-center mb-3">
        Page not found
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 text-center max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or was moved. Let&apos;s
        get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="btn-primary text-center">
          Back to home
        </Link>
        <Link
          href="/blog"
          className="btn-outline text-center dark:border-magenta dark:text-magenta dark:hover:bg-magenta/10"
        >
          Read the blog
        </Link>
      </div>
    </div>
  );
}
