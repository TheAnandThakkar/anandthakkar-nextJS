"use client";

import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { contributions } from "app/data/contributions";

function ProjectCard({
  project,
  featured = false,
}: {
  project: (typeof contributions)[number];
  featured?: boolean;
}) {
  const thumbnailUrl = `https://opengraph.githubassets.com/1/${project.repo}`;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40 hover:-translate-y-1 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Thumbnail */}
      <div
        className={`relative w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 ${
          featured ? "aspect-[2/1]" : "aspect-video"
        }`}
      >
        <Image
          src={thumbnailUrl}
          alt={`${project.name} preview`}
          fill
          sizes={featured ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          unoptimized
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured badge */}
        {featured && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-magenta px-3 py-1 text-xs font-semibold text-white shadow-sm">
            Featured
          </span>
        )}

        {/* Live link floats up on hover */}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 dark:bg-neutral-900/95 px-3 py-1.5 text-xs font-semibold text-neutral-900 dark:text-white shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <FaExternalLinkAlt className="text-[10px] text-magenta" />
            Live site
          </a>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[11px] font-medium text-neutral-500 dark:text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-magenta transition-colors">
          {project.name}
        </h3>

        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 flex-1">
          {project.description}
        </p>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-magenta dark:hover:text-magenta transition-colors"
        >
          <FaGithub className="text-base" />
          View on GitHub
        </a>
      </div>
    </article>
  );
}

export function Contributions() {
  const featured = contributions.filter((c) => c.featured);
  const rest = contributions.filter((c) => !c.featured);

  return (
    <section className="space-y-6">
      {/* Featured projects */}
      {featured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.url} project={project} featured />
          ))}
          {/* Fill the third column with the first non-featured if only one featured */}
          {featured.length === 1 && rest[0] && (
            <ProjectCard key={rest[0].url} project={rest[0]} />
          )}
        </div>
      )}

      {/* Rest of projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(featured.length === 1 ? rest.slice(1) : rest).map((project) => (
          <ProjectCard key={project.url} project={project} />
        ))}
      </div>
    </section>
  );
}
