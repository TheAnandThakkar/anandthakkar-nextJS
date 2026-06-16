import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { caseStudies } from "app/data/case-studies";

export function CaseStudies() {
  return (
    <section>
      <div className="grid gap-6">
        {caseStudies.map((cs) => (
          <article
            key={cs.slug}
            className="card-hover p-4 sm:p-5 flex flex-col sm:flex-row gap-5 sm:items-center"
          >
            {/* Visual */}
            <Link
              href={`/case-studies/${cs.slug}`}
              className="relative block w-full sm:w-2/5 lg:w-1/3 shrink-0 aspect-video overflow-hidden rounded-xl group focus-visible:outline-none"
              aria-label={`Read case study: ${cs.title}`}
            >
              <Image
                src={cs.heroImage}
                alt={cs.title}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 40vw, 100vw"
                className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="absolute left-2.5 top-2.5 inline-flex items-center rounded-full bg-magenta px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                Case Study
              </span>
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
                {cs.context}
              </p>
              <h3 className="mt-2 text-lg sm:text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="hover:text-magenta transition-colors focus-visible:outline-none"
                >
                  {cs.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm/relaxed text-neutral-600 dark:text-neutral-400">
                {cs.tagline}
              </p>

              {/* Outcome highlight */}
              <p className="mt-4 rounded-xl bg-magenta/5 border border-magenta/15 px-4 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                <span className="text-magenta font-semibold">Outcome:</span>{" "}
                {cs.outcome}
              </p>

              {/* Stack chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {cs.stack.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
                {cs.stack.length > 5 && (
                  <span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    +{cs.stack.length - 5} more
                  </span>
                )}
              </div>

              <Link
                href={`/case-studies/${cs.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-magenta hover:text-magenta/80 transition-colors focus-visible:outline-none"
              >
                <span>Read case study</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
