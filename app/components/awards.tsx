// app/components/awards.tsx
import Image from "next/image";
import { awards } from "app/data/awards";
import { SiCredly } from "react-icons/si";
import { FaExternalLinkAlt, FaGoogle, FaGithub } from "react-icons/fa";

type Platform = "credly" | "google-developers" | "github" | "other";

const linkMeta: Record<
  Platform,
  { label: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  credly: { label: "View on Credly", Icon: SiCredly },
  "google-developers": { label: "View on Google Developers", Icon: FaGoogle },
  github: { label: "View on GitHub", Icon: FaGithub },
  other: { label: "Open link", Icon: FaExternalLinkAlt },
};

function detectPlatform(url?: string): Platform {
  if (!url) return "other";
  if (/credly\.com/i.test(url)) return "credly";
  if (/g\.dev|developers\.google\.com/i.test(url)) return "google-developers";
  if (/github\.com/i.test(url)) return "github";
  return "other";
}

export function Awards() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {awards.map((item) => {
          const platform = detectPlatform(item.url);
          const { label, Icon } = linkMeta[platform];

          return (
            <div
              key={(item.title ?? "") + (item.url ?? "")}
              className="card p-5 sm:p-6 flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                {item.icon ? (
                  <div className="shrink-0 w-12 h-12 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center shadow-sm overflow-hidden p-1.5">
                    <Image
                      src={item.icon}
                      alt={`${item.title} logo`}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                ) : null}

                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight mb-1">{item.title}</h3>

                  {/* (year pill for non-Credly only) */}
                  {platform !== "credly" && item.year && (
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                      {item.year}
                    </span>
                  )}
                  {/* For Credly: simple issue date line below the link (no pill) */}
                  {platform === "credly" && item.year && (
                    <p className="text-xs font-medium text-magenta mt-1">
                      Issued: {item.year}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-neutral-600 dark:text-neutral-400 text-sm/relaxed mb-5 flex-1">
                  {item.description}
                </p>
              )}

              {/* CTA link */}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-magenta hover:text-magenta/80 transition-colors focus-visible:outline-none"
                  aria-label={`${label}: ${item.title}`}
                >
                  <Icon className="text-sm" />
                  <span>{label}</span>
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
