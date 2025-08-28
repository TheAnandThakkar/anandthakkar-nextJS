import Image from "next/image";
import { experience } from "app/data/experience";

export function Experience() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold tracking-tighter">
        Work Experience 💼
      </h2>
      <div className="space-y-6">
        {experience.map((job) => (
          <div key={job.company} className="flex items-start space-x-3">
            {/* Company Logo */}
            <Image
              src={job.logo}
              alt={job.company}
              width={64}
              height={64}
              className="rounded"
            />

            {/* Job Details */}
            <div className="flex flex-col space-y-1">
              <a
                href={job.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 tracking-tight underline hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                {job.company}
              </a>
              <p className="text-neutral-600 dark:text-neutral-400 text-left tabular-nums">
                {job.designation} • {job.joiningDate}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-left">
                {job.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
