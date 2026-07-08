"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { moments } from "app/data/moments";

type MomentsProps = {
  /** Show only the first N moments (newest first). Omit to show all. */
  limit?: number;
  /** Show the "view all" card when there are more moments than the limit. */
  showViewAll?: boolean;
  /** Show the year filter dropdown (used on the /moments gallery page). */
  showFilter?: boolean;
};

export function Moments({ limit, showViewAll, showFilter }: MomentsProps = {}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [year, setYear] = useState<string>("all");
  const touchStartX = useRef<number | null>(null);

  const years = Array.from(new Set(moments.map((m) => m.year))).sort(
    (a, b) => b - a
  );
  const filtered =
    showFilter && year !== "all"
      ? moments.filter((m) => m.year === Number(year))
      : moments;
  const visible =
    typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  const hasMore = Boolean(
    showViewAll && typeof limit === "number" && moments.length > limit
  );

  const close = useCallback(() => setActiveIndex(null), []);

  const step = useCallback(
    (delta: number) => {
      setActiveIndex((current) => {
        if (current === null) return current;
        return (current + delta + visible.length) % visible.length;
      });
    },
    [visible.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    // Prevent background scroll while the viewer is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, close, step]);

  const active = activeIndex === null ? null : visible[activeIndex];

  return (
    <>
      {showFilter && (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full sm:w-auto sm:min-w-[11rem]">
            <label
              htmlFor="moments-year"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
            >
              Year
            </label>
            <select
              id="moments-year"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setActiveIndex(null);
              }}
              className="w-full cursor-pointer rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm outline-none transition-colors focus:border-magenta focus:ring-2 focus:ring-magenta/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            >
              <option value="all">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Showing{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              {visible.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              {moments.length}
            </span>{" "}
            moments
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((m, index) => (
          <figure
            key={m.src}
            className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View photo: ${m.caption}`}
              className="flex w-full flex-1 cursor-pointer flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="flex flex-1 flex-col gap-2 p-4">
                <p className="line-clamp-2 text-sm font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">
                  {m.caption}
                </p>
                <span className="mt-auto text-xs font-semibold text-magenta transition-colors group-hover:text-magenta/80">
                  Read more →
                </span>
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
          className="fixed inset-0 z-50 flex flex-col bg-black lg:flex-row"
        >
          {/* Photo area */}
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center"
            onClick={close}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const delta = e.changedTouches[0].clientX - touchStartX.current;
              touchStartX.current = null;
              if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1);
            }}
          >
            <div
              className="relative h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              &times;
            </button>

            {/* Counter */}
            <span className="absolute right-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
              {activeIndex! + 1} / {visible.length}
            </span>

            {/* Prev / Next */}
            {visible.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Description panel (Facebook-style sidebar) */}
          <aside
            className="max-h-[38vh] w-full shrink-0 overflow-y-auto border-t border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900 lg:max-h-none lg:h-full lg:w-[380px] lg:border-l lg:border-t-0 lg:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/headshot.jpg"
                alt="Anand Thakkar"
                width={44}
                height={44}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Anand Thakkar
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Moments · {active.year}
                </p>
              </div>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-200">
              {active.caption}
            </p>
          </aside>
        </div>
      )}
    </>
  );
}
