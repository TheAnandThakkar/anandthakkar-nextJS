"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function BackButton({ fallback = "/" }: { fallback?: string }) {
  const router = useRouter();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      try {
        // If user actually navigated here from the same site, go back
        const ref = document.referrer;
        const sameOrigin =
          ref && new URL(ref).origin === window.location.origin;
        if (sameOrigin && window.history.length > 1) {
          router.back();
          return;
        }
      } catch {}
      // Otherwise, use the safe fallback (set to "/blog" if you have an index page)
      router.push(fallback);
    },
    [router, fallback]
  );

  return (
    <a
      href={fallback}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
      aria-label="Go back"
    >
      {/* inline chevron icon (no 3rd-party deps) */}
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          d="M15.5 19a1 1 0 0 1-.7-.29l-6-6a1 1 0 0 1 0-1.42l6-6a1 1 0 1 1 1.4 1.42L10.9 12l5.3 5.29A1 1 0 0 1 15.5 19z"
          fill="currentColor"
        />
      </svg>
      Back
    </a>
  );
}
