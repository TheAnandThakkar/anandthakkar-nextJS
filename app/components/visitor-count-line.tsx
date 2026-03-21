"use client";

import { useVisitorCount } from "app/lib/use-visitor-count";
import { IoPulseOutline } from "react-icons/io5";

export const VISITOR_COUNT_SINCE_ISO = "2026-03-21";
export const VISITOR_COUNT_SINCE_LABEL = "March 21, 2026";

type Variant = "hero" | "footer";

/**
 * Shared visitor line: pulse icon + count + “Number of visitors since …”.
 * Hero: light text on dark image. Footer: readable on light/dark footer backgrounds.
 */
export function VisitorCountLine({ variant }: { variant: Variant }) {
  const { count, loading, configured } = useVisitorCount();
  const isHero = variant === "hero";

  if (!configured) {
    return null;
  }

  const iconClass = isHero
    ? "h-3.5 w-3.5 shrink-0 opacity-75 text-neutral-300"
    : "h-3.5 w-3.5 shrink-0 opacity-75 text-neutral-500 dark:text-neutral-400";

  const wrapClass = isHero ? "mb-4 w-full px-2 text-center" : "w-full";

  const rowClass = isHero
    ? "inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] leading-snug text-neutral-400 sm:text-xs"
    : "inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] leading-snug text-neutral-600 dark:text-neutral-400 sm:justify-start sm:text-xs";

  const countClass = isHero
    ? "font-medium tabular-nums text-neutral-100"
    : "font-medium tabular-nums text-neutral-900 dark:text-neutral-100";

  const dotClass = isHero ? "text-neutral-600" : "text-neutral-400 dark:text-neutral-600";

  const timeClass = isHero
    ? "text-neutral-300"
    : "text-neutral-700 dark:text-neutral-300";

  const skeletonClass = isHero
    ? "inline-block h-3 w-14 animate-pulse rounded bg-white/10"
    : "inline-block h-3 w-14 animate-pulse rounded bg-neutral-200 dark:bg-white/10";

  return (
    <div className={wrapClass}>
      <p
        className={rowClass}
        aria-live="polite"
        title="Approximate visits (one per browser; Upstash Redis). Same total as the hero."
      >
        <IoPulseOutline className={iconClass} aria-hidden />

        {loading ? (
          <span className={skeletonClass} aria-busy="true" />
        ) : count != null ? (
          <>
            <span className={countClass}>{count.toLocaleString("en-IN")}</span>
            <span className={dotClass} aria-hidden>
              ·
            </span>
            <span>
              Number of visitors since{" "}
              <time dateTime={VISITOR_COUNT_SINCE_ISO} className={timeClass}>
                {VISITOR_COUNT_SINCE_LABEL}
              </time>
            </span>
          </>
        ) : null}
      </p>
    </div>
  );
}
