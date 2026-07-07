"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { moments, type Moment } from "app/data/moments";

type MomentsProps = {
  /** Show only the first N moments (newest first). Omit to show all. */
  limit?: number;
  /** Show the "view all" card when there are more moments than the limit. */
  showViewAll?: boolean;
  /** Show the year filter dropdown (used on the /moments gallery page). */
  showFilter?: boolean;
};

export function Moments({ limit, showViewAll, showFilter }: MomentsProps = {}) {
  const [active, setActive] = useState<Moment | null>(null);
  const [year, setYear] = useState<string>("all");

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    // Prevent background scroll while the lightbox is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close]);

  const visible =
    typeof limit === "number" ? moments.slice(0, limit) : moments;
  const hasMore = Boolean(
    showViewAll && typeof limit === "number" && moments.length > limit
  );

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((m) => (
          <figure
            key={m.src}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800"
          >
            <button
              type="button"
              onClick={() => setActive(m)}
              aria-label={`Expand photo: ${m.caption}`}
              className="block w-full cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-sm font-medium text-white">
                {m.caption}
              </figcaption>
            </button>
          </figure>
        ))}
      </div>

      {hasMore && (
        <div className="relative mt-10">
          <div
            className="pointer-events-none absolute inset-x-0 -top-6 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-neutral-800"
            aria-hidden
          />
          <Link
            href="/moments"
            className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-neutral-200/90 bg-gradient-to-br from-white via-white to-neutral-50/90 p-5 shadow-sm transition-all duration-300 hover:border-magenta/30 hover:shadow-md dark:border-neutral-800 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950/90 dark:hover:border-magenta/35 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6"
            aria-label={`View all moments. Showing ${visible.length} of ${moments.length} on the home page.`}
          >
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-magenta/[0.06] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-magenta/10"
              aria-hidden
            />
            <div className="relative min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                Full gallery
              </p>
              <p className="mt-1.5 text-sm leading-snug text-neutral-600 dark:text-neutral-300">
                You&apos;re seeing the latest {visible.length} of{" "}
                {moments.length} moments, continue to the gallery for every
                photo.
              </p>
            </div>
            <span className="relative inline-flex shrink-0 items-center justify-center gap-2 self-stretch rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 group-hover:bg-magenta group-hover:shadow-lg group-hover:shadow-magenta/25 dark:bg-white dark:text-neutral-900 dark:group-hover:bg-magenta dark:group-hover:text-white sm:self-center sm:py-3.5">
              <span>View all moments</span>
              <span
                className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              >
                →
              </span>
            </span>
          </Link>
        </div>
      )}

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            &times;
          </button>
          <figure
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[95vh] w-[95vw] items-center justify-center"
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="95vw"
              className="object-contain"
            />
            <figcaption className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-center text-sm font-medium text-white sm:p-6 sm:text-base">
              {active.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
