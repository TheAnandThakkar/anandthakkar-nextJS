"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Moment = {
  src: string;
  alt: string;
  caption: string;
};

// Milestones in reverse-chronological order (latest first).
const moments: Moment[] = [
  {
    src: "/hcltech-joining.jpg",
    alt: "Anand Thakkar on his first day as Senior Technical Lead at HCLTech, GIFT City, 2026",
    caption: "Day one as Senior Technical Lead at HCLTech, GIFT City, 2026",
  },
  {
    src: "/gdg-devfest-2022.jpg",
    alt: "Anand Thakkar at his first Google Developer Group DevFest, 2022",
    caption: "My first GDG DevFest, 2022",
  },
  {
    src: "/first-it-job-2022.jpg",
    alt: "Anand Thakkar at his desk during his first IT job as a software developer, 2022",
    caption: "My very first IT job as a software developer, 2022",
  },
  {
    src: "/family-business-2018.jpg",
    alt: "Anand Thakkar taking charge of the family business, 2018",
    caption: "Taking charge of a family business, 2018",
  },
  {
    src: "/techspark-2017-bengaluru.jpg",
    alt: "Anand Thakkar as a delegate at his first TechSpark, Bengaluru, 2017",
    caption: "My first TechSpark as a delegate, Bengaluru, 2017",
  },
];

export function Moments() {
  const [active, setActive] = useState<Moment | null>(null);

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

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {moments.map((m) => (
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
