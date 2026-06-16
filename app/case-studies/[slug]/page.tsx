// app/case-studies/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowRight, FaFilePdf, FaDownload } from "react-icons/fa";
import { caseStudies, getCaseStudy } from "app/data/case-studies";
import { baseUrl } from "app/sitemap";
import BackButton from "app/components/back-button";

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};

  const title = cs.title;
  const description = cs.tagline;
  const ogImage = `${baseUrl}${cs.heroImage}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/case-studies/${cs.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${baseUrl}/case-studies/${cs.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.tagline,
    image: `${baseUrl}${cs.heroImage}`,
    url: `${baseUrl}/case-studies/${cs.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/case-studies/${cs.slug}`,
    },
    author: {
      "@type": "Person",
      "@id": `${baseUrl}#person`,
      name: "Anand Thakkar",
      url: baseUrl,
    },
  };

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-screen pt-28 pb-24">
      <article className="container-main max-w-3xl">
        <div className="mb-8">
          <BackButton fallback="/#case-studies" />
        </div>

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Header */}
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-magenta">
          Case Study
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
          {cs.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          {cs.tagline}
        </p>

        {/* Meta row */}
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 border-y border-neutral-100 dark:border-neutral-900 py-6">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              When &amp; where
            </dt>
            <dd className="mt-1 text-sm font-medium text-neutral-800 dark:text-neutral-200">
              {cs.context}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              My role
            </dt>
            <dd className="mt-1 text-sm font-medium text-neutral-800 dark:text-neutral-200">
              {cs.role}
            </dd>
          </div>
        </dl>

        {/* Hero image */}
        <div className="mt-8 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
          <Image
            src={cs.heroImage}
            alt={cs.title}
            width={1200}
            height={675}
            priority
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Metrics strip */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {cs.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 text-center"
            >
              <p className="text-xl sm:text-2xl font-extrabold text-magenta">
                {m.value}
              </p>
              <p className="mt-1 text-xs leading-snug text-neutral-600 dark:text-neutral-400">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Outcome highlight */}
        <div className="mt-6 rounded-2xl bg-magenta/5 border border-magenta/15 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-magenta">
            Outcome
          </p>
          <p className="mt-2 text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
            {cs.outcome}
          </p>
        </div>

        {/* The challenge: sanitized problem statement */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            The challenge
          </h2>
          <div className="mt-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <div className="bg-neutral-50 dark:bg-neutral-900 p-5 sm:p-6 border-b border-neutral-200 dark:border-neutral-800">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-magenta">
                {cs.problem.label}
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {cs.problem.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {cs.problem.summary}
              </p>

              <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                {cs.problem.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-magenta text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* PDF viewer */}
            {cs.problem.pdf && (
              <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    <FaFilePdf className="text-magenta" aria-hidden />
                    <span>Full sanitized problem brief</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={cs.problem.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors focus-visible:outline-none"
                    >
                      Open in new tab
                    </a>
                    <a
                      href={cs.problem.pdf}
                      download
                      className="inline-flex items-center gap-2 rounded-lg bg-magenta px-3 py-1.5 text-sm font-semibold text-white hover:bg-magenta/90 transition-colors focus-visible:outline-none"
                    >
                      <FaDownload className="text-xs" aria-hidden />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <iframe
                    src={`${cs.problem.pdf}#view=FitH`}
                    title={`${cs.problem.title}: sanitized problem statement`}
                    loading="lazy"
                    className="h-[480px] w-full bg-neutral-100 dark:bg-neutral-900"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Constraints */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Constraints
          </h2>
          <ul className="mt-4 grid gap-3">
            {cs.constraints.map((c) => (
              <li
                key={c}
                className="flex gap-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-magenta"
                  aria-hidden
                />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Architecture */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Solution architecture
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {cs.architecture.map((a) => (
              <div
                key={a}
                className="rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-200"
              >
                {a}
              </div>
            ))}
          </div>
        </section>

        {/* Narrative sections */}
        {cs.sections.map((sec) => (
          <section key={sec.heading} className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {sec.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {sec.body.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300"
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* Supporting images */}
        {cs.images?.length ? (
          <section className="mt-12 grid gap-4">
            {cs.images.map((img) => (
              <figure key={img.src}>
                <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width ?? 1200}
                    height={img.height ?? 675}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {img.caption && (
                  <figcaption className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </section>
        ) : null}

        {/* Takeaways */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Key takeaways
          </h2>
          <ul className="mt-4 grid gap-3">
            {cs.takeaways.map((t) => (
              <li
                key={t}
                className="flex gap-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet"
                  aria-hidden
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Stack */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Tech stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {cs.stack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Full story CTA */}
        {cs.blogSlug && (
          <section className="mt-12 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6 text-center">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
              Want the full story?
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Read the long-form account of the day, the team, and what it taught me.
            </p>
            <Link
              href={`/blog/${cs.blogSlug}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-magenta hover:text-magenta/80 transition-colors focus-visible:outline-none"
            >
              <span>Read the full write-up</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </section>
        )}
      </article>
    </div>
  );
}
