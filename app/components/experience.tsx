// app/components/experience.tsx
import Image from "next/image";
import { experience } from "app/data/experience";
import { FaExternalLinkAlt } from "react-icons/fa";

export function Experience() {
  // Keep logo size consistent with Awards (32x32)
  const LOGO_SIZE = 32;

  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold tracking-tighter">
        Work Experience 💼
      </h2>

      <div className="space-y-6">
        {experience.map((job) => (
          <div
            key={`${job.company}-${job.joiningDate ?? ""}`}
            className="space-y-1"
          >
            <div className="flex items-start gap-3">
              {job.logo ? (
                <Image
                  src={job.logo}
                  alt={`${job.company} logo`}
                  width={LOGO_SIZE}
                  height={LOGO_SIZE}
                  className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-white object-contain p-1"
                />
              ) : null}

              <div className="flex-1">
                {/* Company (no link on title) */}
                <h3 className="text-lg font-medium">{job.company}</h3>

                {/* Designation */}
                {job.designation && (
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                    {job.designation}
                  </p>
                )}

                {/* Description */}
                {job.description && (
                  <p className="text-neutral-600 dark:text-neutral-400 text-left text-sm">
                    {job.description}
                  </p>
                )}

                {/* Joining date (simple line, no pill) */}
                {job.joiningDate && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    <span className="font-medium">Joining Date:</span>{" "}
                    {job.joiningDate}
                  </p>
                )}

                {/* Separate CTA link */}
                {job.website && (
                  <a
                    // inside <a ...> in Experience()
                    className="mt-1 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                    href={job.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit website: ${job.company}`}
                  >
                    <FaExternalLinkAlt className="text-lg" />
                    <span>Visit website</span>
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
