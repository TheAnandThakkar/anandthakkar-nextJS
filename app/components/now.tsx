const nowItems = [
  {
    label: "New chapter",
    text: "Starting as Senior Technical Lead at HCLTech's GIFT City office in July 2026. India's first IFSC, the country's international financial nerve centre. The finance brain and the engineering brain are finally in the same room.",
  },
  {
    label: "Building",
    text: "Working on ideas at the edge of Indian fintech and developer tooling. Some will ship. Some will teach me something. Both are the point.",
  },
  {
    label: "Writing",
    text: "Writing more honestly about reinvention, systems, and the way technology is changing what it means to participate in the economy. Less tutorial, more perspective.",
  },
  {
    label: "Thinking about",
    text: "Account aggregators. Digital public infrastructure. What happens when a billion people have programmable money. The India stack is the most underrated engineering project in the world right now.",
  },
] as const;

export function Now() {
  return (
    <div className="max-w-3xl space-y-6">
      <p className="text-sm text-neutral-400 dark:text-neutral-500 font-medium uppercase tracking-widest">
        Last updated · June 2026
      </p>
      <div className="space-y-6">
        {nowItems.map((item) => (
          <div key={item.label} className="flex gap-4 sm:gap-6">
            <div className="shrink-0 pt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-magenta mt-2" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-magenta mb-1">
                {item.label}
              </p>
              <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
