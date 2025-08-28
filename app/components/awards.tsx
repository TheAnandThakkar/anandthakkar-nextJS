import Image from "next/image";
import { awards } from "app/data/awards";

export function Awards() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold tracking-tighter">
        Awards & Certifications 🎉
      </h2>
      <div className="space-y-6">
        {awards.map((award) => (
          <div key={award.url} className="flex items-start space-x-3">
            {/* Icon */}
            <Image
              src={award.icon}
              alt={award.title}
              width={64}
              height={64}
              className="rounded"
            />

            {/* Title + Year + Description */}
            <div className="flex flex-col space-y-1">
              <a
                href={award.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 tracking-tight underline hover:text-blue-800 dark:hover:text-blue-300 font-medium text-lg"
              >
                {award.title}
              </a>
              <p className="text-neutral-600 dark:text-neutral-400 text-left tabular-nums text-sm">
                {award.year}
              </p>
              {award.description && (
                <p className="text-neutral-600 dark:text-neutral-400 text-left text-sm">
                  {award.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
