"use client";

import Link from "next/link";
import { scrollToSectionId } from "app/lib/scroll";

export function HeroActions() {
  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
      <div className="flex flex-row w-full gap-3 sm:gap-4 justify-center">
        <a
          href="mailto:anand.thakkar@outlook.com?subject=Hello%20Anand"
          className="btn-primary flex-1 lg:flex-none flex justify-center items-center text-xs sm:text-base whitespace-nowrap px-2 sm:px-6 py-2.5 sm:py-3"
        >
          Let&apos;s Connect ✉️
        </a>

        <a
          href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=theanandthakkar"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 lg:flex-none items-center justify-center text-xs sm:text-base whitespace-nowrap px-2 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#0A66C2] text-white font-semibold hover:bg-[#004182] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#0A66C2] focus:outline-none dark:focus:ring-offset-neutral-950"
        >
          Follow on LinkedIn
        </a>
      </div>
      <Link
        href="/subscribe"
        className="inline-flex w-full lg:w-auto items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/25 bg-white/10 px-6 py-2.5 text-xs sm:text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-magenta/60 hover:bg-magenta/20 focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2 focus:ring-offset-transparent sm:py-3"
      >
        🔔 Subscribe to Anand Thakkar
      </Link>
      <button
        type="button"
        onClick={() => scrollToSectionId("about")}
        className="text-neutral-400 hover:text-magenta text-sm font-medium transition-colors flex items-center gap-1"
      >
        Read my story ↓
      </button>
    </div>
  );
}
