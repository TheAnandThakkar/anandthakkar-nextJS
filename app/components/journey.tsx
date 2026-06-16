const chapters = [
  {
    era: "2012 to 2020",
    title: "The Tax Years",
    body: "Eight years inside India's financial machinery. I filed returns, argued assessments, navigated GST, built a firm, and learned how money actually moves through people's lives. Most people never see this layer. I lived in it. It gave me something no bootcamp teaches: I understand why financial systems are built the way they are, not just how to code them.",
  },
  {
    era: "2020 to 2022",
    title: "The Crossing",
    body: "I started writing code to solve problems I couldn't solve with spreadsheets. Then I couldn't stop. I built Taxaltus from scratch, a platform to help ordinary people understand Indian taxation without needing a CA. I wasn't switching careers. I was extending what I already knew into a new medium.",
  },
  {
    era: "2022 to Now",
    title: "Building at the Intersection",
    body: "Backend systems, cloud architecture, fintech products. Java, Spring Boot, microservices, Kafka, AWS. I've shipped production systems, contributed to open source, and picked up every tool that helped me build faster and better. The finance background is still the differentiator. It shapes how I think about data models, compliance constraints, and what a system needs to get right versus what it can afford to get wrong.",
  },
] as const;

export function Journey() {
  return (
    <div className="relative max-w-3xl">
      <div className="space-y-10">
        {chapters.map((chapter, i) => (
          <div key={i} className="flex gap-6 sm:gap-8">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-magenta mt-1.5 shrink-0" />
              {i < chapters.length - 1 && (
                <div className="w-px flex-1 bg-neutral-200 dark:bg-neutral-800 mt-2" />
              )}
            </div>
            <div className="pb-10 last:pb-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-magenta mb-1">
                {chapter.era}
              </p>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {chapter.title}
              </h3>
              <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                {chapter.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
