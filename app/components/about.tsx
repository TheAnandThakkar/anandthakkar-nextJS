import Image from "next/image";

export function About() {
  return (
    <div className="max-w-4xl space-y-6">
      {/* Portrait floats right; text wraps to the left across all breakpoints */}
      <div className="float-right ml-5 mb-4 sm:ml-7 w-32 sm:w-48 lg:w-72">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <Image
              src="/headshot.jpg"
              alt="Anand Thakkar"
              fill
              sizes="(min-width: 1024px) 288px, (min-width: 640px) 192px, 128px"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute -bottom-3 -right-3 -z-10 h-20 w-20 rounded-2xl bg-magenta/10" aria-hidden />
          <p className="mt-3 text-center text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Anand Thakkar
            <span className="mx-1.5 text-neutral-300 dark:text-neutral-700">·</span>
            India
          </p>
        </div>
      </div>

      <p className="text-lg sm:text-xl leading-relaxed text-neutral-800 dark:text-neutral-100 font-medium">
        I didn&apos;t start in tech. I started in a tax office.
      </p>

      <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
        For eight years I worked deep inside India&apos;s financial system. Filing returns, fighting
        assessments, understanding money at its most human level. I built{" "}
        <a
          href="https://www.taxaltus.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-neutral-900 underline decoration-2 decoration-magenta/30 underline-offset-4 transition-colors hover:text-magenta hover:decoration-magenta dark:text-white dark:hover:text-magenta"
        >
          Taxaltus
        </a>{" "}
        not because someone told me to, but because I saw that most people had no idea
        how money worked around them, and I wanted to change that.
      </p>

      <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
        Somewhere in those years, I started writing code. Not to get a job. To solve a
        problem I couldn&apos;t solve with spreadsheets. One thing led to another. APIs,
        databases, cloud systems, microservices. I crossed from one world into another,
        carrying the financial instinct with me.
      </p>

      <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
        Today I build at the intersection of finance and technology. I think that intersection
        is the most interesting place to be right now. The people who understand both
        sides of it will define what comes next.
      </p>

      <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-200">
        This site is where I think out loud, share what I&apos;m building, and write about
        the ideas that keep me up at night. Pull up a chair.
      </p>
    </div>
  );
}
