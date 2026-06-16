export type Contribution = {
  name: string;
  description: string;
  url: string;
  liveUrl?: string;
  tech: string[];
  /** GitHub repo path, used to generate the OG thumbnail */
  repo: string;
  featured?: boolean;
};

export const contributions: Contribution[] = [
  {
    name: "Taxaltus",
    description:
      "An income-tax companion for Indian salaried employees: Form 16 explorer, old vs new regime comparison, tax & CTC estimators, and plain-English guides for filing prep. Built because most people shouldn't need a CA to understand their own salary slip.",
    url: "https://github.com/TheAnandThakkar/Taxaltus",
    liveUrl: "https://www.taxaltus.com",
    tech: ["Next.js", "TypeScript", "Fintech", "Tax"],
    repo: "TheAnandThakkar/Taxaltus",
    featured: true,
  },
  {
    name: "anandthakkar-nextJS",
    description:
      "This very site, open source. Clone it, break it, ship your own presence. A fast Next.js personal site starter, free for anyone.",
    url: "https://github.com/TheAnandThakkar/anandthakkar-nextJS",
    liveUrl: "https://www.anandthakkar.com",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    repo: "TheAnandThakkar/anandthakkar-nextJS",
  },
  {
    name: "EMI Calculation API",
    description:
      "A NestJS API for wage-based loan and salary EMIs. Accurate financial planning behind clean HTTP endpoints.",
    url: "https://github.com/TheAnandThakkar/emi_calculation_nestjs",
    tech: ["NestJS", "TypeScript", "Fintech"],
    repo: "TheAnandThakkar/emi_calculation_nestjs",
  },
  {
    name: "Concerto Linter",
    description:
      "A linter tool for the Concerto modeling language. Validation, early error catching, and better developer productivity.",
    url: "https://github.com/TheAnandThakkar/concerto-linter",
    tech: ["Node.js", "Open Source", "DX"],
    repo: "TheAnandThakkar/concerto-linter",
  },
  {
    name: "Sanity Portfolio",
    description:
      "Sanity Studio plus Next.js in one repo: schema-driven content, GROQ queries, blog routes. Open source CMS-backed portfolio starter.",
    url: "https://github.com/TheAnandThakkar/sanity-portfolio",
    tech: ["Next.js", "Sanity", "CMS"],
    repo: "TheAnandThakkar/sanity-portfolio",
  },
  {
    name: "anandthakkar-swiftUI",
    description:
      "A minimal SwiftUI learning project with a tabbed shell. Mock data, learner-friendly, contributions welcome.",
    url: "https://github.com/TheAnandThakkar/anandthakkar-swiftUI",
    tech: ["SwiftUI", "iOS", "Mobile"],
    repo: "TheAnandThakkar/anandthakkar-swiftUI",
  },
];
