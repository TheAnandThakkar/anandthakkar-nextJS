type StatIcon = "impressions" | "comments" | "reactions" | "recognition";

type HighlightStat = {
  icon: StatIcon;
  label: string;
  value: string;
};

type LinkedInHighlight = {
  /** Public URL of the LinkedIn post */
  url: string;
  /** Opening line or hook of the post */
  quote: string;
  /** Month and year the post was published */
  date: string;
  /** Up to three stats shown on the card */
  stats: HighlightStat[];
};

// Add a new entry whenever a post performs well. Newest first.
const highlights: LinkedInHighlight[] = [
  {
    url: "https://www.linkedin.com/feed/update/urn:li:share:7478744170292236288",
    quote:
      "“When I shared that I joined HCLTech as a Senior Technical Lead, a lot of people asked me about my preparation journey.”",
    date: "July 2026",
    stats: [
      { icon: "impressions", label: "Impressions", value: "20K+" },
      { icon: "reactions", label: "Reactions", value: "50+" },
      { icon: "recognition", label: "Recognition", value: "Scaler" },
    ],
  },
  {
    url: "https://www.linkedin.com/feed/update/urn:li:share:7478035015298371585",
    quote:
      "“Delighted to join HCLTech as a Senior Technical Lead at GIFT City today!”",
    date: "July 2026",
    stats: [
      { icon: "impressions", label: "Impressions", value: "15K+" },
      { icon: "comments", label: "Comments", value: "100+" },
      { icon: "reactions", label: "Reactions", value: "300+" },
    ],
  },
];

const statIcons: Record<StatIcon, React.ReactNode> = {
  impressions: (
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  ),
  comments: (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  ),
  reactions: (
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14ZM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  ),
  recognition: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.5 13 17 22l-5-3-5 3 1.5-9" />
    </>
  ),
};

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function SocialHighlights() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {highlights.map((post) => (
        <a
          key={post.url}
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#0A66C2]/40 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950 sm:p-8"
        >
          <div className="flex items-center gap-3">
            <span className="text-[#0A66C2]">
              <LinkedInIcon />
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                Anand Thakkar on LinkedIn
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {post.date}
              </p>
            </div>
          </div>

          <p className="flex-1 text-lg font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">
            {post.quote}
          </p>

          <div className="grid grid-cols-3 gap-4 border-t border-neutral-100 pt-5 dark:border-neutral-800">
            {post.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hidden h-4 w-4 shrink-0 sm:block"
                  >
                    {statIcons[stat.icon]}
                  </svg>
                  <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider sm:text-[11px] sm:tracking-widest">
                    {stat.label}
                  </span>
                </span>
                <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm font-semibold text-[#0A66C2] transition-colors group-hover:text-[#004182] dark:group-hover:text-[#70B5F9]">
            Join the conversation →
          </p>
        </a>
      ))}
    </div>
  );
}
