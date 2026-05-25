const aboutHighlights = [
  {
    title: "Taxation Foundation",
    meta: "2012 to 2020",
    body:
      "I spent eight years in taxation and accounting, working across Income Tax, GST, TDS compliance, assessments, and appellate proceedings. That phase trained me to think with precision, accountability, and respect for financial systems.",
  },
  {
    title: "Transition to Technology",
    meta: "Finance to software",
    body:
      "While working with regulatory workflows, I became increasingly curious about how software could simplify complex processes. That curiosity led me from financial operations into programming, backend systems, and cloud-native development.",
  },
  {
    title: "Software and Fintech",
    meta: "What I build now",
    body:
      "Today I build scalable backend systems and digital platforms using Java, Spring Boot, Node.js, and cloud-native architectures. My finance background helps me design systems for compliance-heavy, rule-driven, and data-sensitive domains.",
  },
] as const;

export function About() {
  return (
    <div className="space-y-6 text-neutral-600 dark:text-neutral-300">
      <div className="max-w-3xl space-y-4">
        <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-200">
          From ledgers to lines of code, my journey has been one of reinvention,
          curiosity, and continuous learning.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          I started in taxation and accounting, built a strong understanding of
          financial systems, and eventually moved into software development to
          solve those kinds of problems with code. I also worked on{" "}
          <a
            href="https://www.taxaltus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-neutral-900 underline decoration-2 decoration-magenta/30 underline-offset-4 transition-colors hover:text-magenta hover:decoration-magenta dark:text-white dark:hover:text-magenta"
          >
            Taxaltus
          </a>
          , an educational initiative focused on making tax terminology clearer
          for everyday users.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {aboutHighlights.map((item) => (
          <article
            key={item.title}
            className="card-hover p-5 sm:p-6"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-magenta">
              {item.meta}
            </p>
            <h3 className="mb-3 text-lg font-bold text-neutral-900 dark:text-white">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {item.body}
            </p>
          </article>
        ))}
      </div>

      <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
        Looking back, the journey from taxation to technology was not a
        departure, it was an evolution. The same curiosity that once drove me to
        understand financial systems now drives me to build technology that
        makes complex processes simpler, smarter, and more accessible.
      </p>
    </div>
  );
}
