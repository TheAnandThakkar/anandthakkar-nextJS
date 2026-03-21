import type { ReactNode } from "react";

const accentBar: Record<"magenta" | "violet" | "brand-rose", string> = {
  magenta: "bg-magenta",
  violet: "bg-violet",
  "brand-rose": "bg-brand-rose",
};

type SectionHeadingProps = {
  title: ReactNode;
  /** Short line under the title, sets context for the section */
  subtitle: ReactNode;
  accent: keyof typeof accentBar;
};

/**
 * Section title + accent bar + one-line description (homepage sections).
 */
export function SectionHeading({ title, subtitle, accent }: SectionHeadingProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex gap-3">
        <div
          className={`w-1 shrink-0 self-stretch rounded-full min-h-[2.5rem] ${accentBar[accent]}`}
          aria-hidden
        />
        <div className="min-w-0 flex-1 pt-0.5">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle mt-2">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
