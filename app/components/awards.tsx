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
      <h2 className="mb-6 text-2xl font-semibold tracking-tighter">
        Awards & Certifications 🏆
      </h2>

      <div className="space-y-6">
        {awards.map((item) => {
          const platform = detectPlatform(item.url);
          const { label, Icon } = linkMeta[platform];

          return (
            <div
              key={(item.title ?? "") + (item.url ?? "")}
              className="space-y-1"
            >
              <div className="flex items-start gap-3">
                {item.icon ? (
                  <Image
                    src={item.icon}
                    alt={`${item.title} logo`}
                    width={32}
                    height={32}
                    className="rounded-md border border-neutral-200 dark:border-neutral-800"
                  />
                ) : null}

                <div className="flex-1">
                  {/* Title + (year pill for non-Credly only) */}
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    {platform !== "credly" && item.year && (
                      <span className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-400">
                        {item.year}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="text-neutral-600 dark:text-neutral-400 text-left text-sm">
                      {item.description}
                    </p>
                  )}

                  {/* CTA link */}
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                      aria-label={`${label}: ${item.title}`}
                    >
                      <Icon className="text-lg" />
                      <span>{label}</span>
                    </a>
                  )}

                  {/* For Credly: simple issue date line below the link (no pill) */}
                  {platform === "credly" && item.year && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Issue date: {item.year}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
