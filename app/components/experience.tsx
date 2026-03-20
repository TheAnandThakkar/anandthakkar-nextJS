// app/components/experience.tsx
import Image from "next/image";
import { experience } from "app/data/experience";
import { FaExternalLinkAlt } from "react-icons/fa";

export function Experience() {
  // Keep logo size consistent with Awards (32x32)
  const LOGO_SIZE = 32;

  return (
    <section>
      <div className="grid gap-6">
        {experience.map((job) => (
          <div
            key={`${job.company}-${job.joiningDate ?? ""}`}
            className="card p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              {job.logo ? (
                <div className="shrink-0 w-14 h-14 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center shadow-sm overflow-hidden">
                  <Image
                    src={job.logo}
                    alt={`${job.company} logo`}
                    width={LOGO_SIZE}
                    height={LOGO_SIZE}
                    className="object-contain"
                  />
                </div>
              ) : null}

              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    {/* Company (no link on title) */}
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">{job.company}</h3>

                    {/* Designation */}
                    {job.designation && (
                      <p className="text-magenta font-semibold text-sm">
                        {job.designation}
                      </p>
                    )}
                  </div>

                  {/* Joining date */}
                  {job.joiningDate && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-300 whitespace-nowrap">
                      {job.joiningDate}
                    </span>
                  )}
                </div>

                {/* Description */}
                {job.description && (
                  <p className="text-neutral-600 dark:text-neutral-400 text-left text-sm/relaxed mb-4 mt-3">
                    {job.description}
                  </p>
                )}

                {/* Separate CTA link */}
                {job.website && (
                  <a
                    className="inline-flex items-center gap-2 text-sm font-medium text-magenta hover:text-magenta/80 transition-colors focus-visible:outline-none"
                    href={job.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit website: ${job.company}`}
                  >
                    <span>Visit website</span>
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
