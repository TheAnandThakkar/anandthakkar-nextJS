export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudyImage = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type ProblemStep = {
  title: string;
  description: string;
};

export type CaseStudy = {
  slug: string;
  /** Card + page title */
  title: string;
  /** One-line hook used on the homepage card */
  tagline: string;
  /** Short label, e.g. "May 2026 · GIFT City, Gandhinagar" */
  context: string;
  /** What you actually did */
  role: string;
  /** The headline result, shown prominently */
  outcome: string;
  heroImage: string;
  images?: CaseStudyImage[];
  /** Key numbers shown as a strip */
  metrics: CaseStudyMetric[];
  /** Sanitized problem statement */
  problem: {
    label: string;
    title: string;
    summary: string;
    steps: ProblemStep[];
    /** Path to the sanitized PDF in /public */
    pdf?: string;
  };
  /** Narrative sections (heading + paragraphs) */
  sections: { heading: string; body: string[] }[];
  /** Bulleted constraints under which the work happened */
  constraints: string[];
  /** Architecture / solution components */
  architecture: string[];
  /** Short, scannable takeaways */
  takeaways: string[];
  stack: string[];
  /** Optional link to the long-form blog post */
  blogSlug?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "hcltech-gift-city-hackathon",
    title: "HCLTech GIFT City Hackathon → Senior Technical Lead",
    tagline:
      "Designed and shipped a Java full-stack fintech system end-to-end in one day under jury review, and turned it into a Senior Technical Lead offer.",
    context: "May 2026 · HCLTech GIFT City, Gandhinagar",
    role: "Backend architecture & business-workflow design · Team 03 (Java Full Stack)",
    outcome:
      "Provisionally selected within 3 days and offered the Senior Technical Lead role. Offer accepted; joining July 1, 2026.",
    heroImage: "/hcltech-hackathon-hero.webp",
    images: [
      {
        src: "/hcltech-hackathon-floor.webp",
        alt: "Developers working during the HCLTech Hackathon at GIFT City, Gandhinagar",
        caption:
          "The hackathon floor at HCLTech GIFT City. Same pressure, same deadline, different approaches.",
        width: 1400,
        height: 788,
      },
    ],
    metrics: [
      { value: "~8 hrs", label: "Design to working demo" },
      { value: "6", label: "Services + frontend shipped" },
      { value: "4", label: "Strangers → one team" },
      { value: "3 days", label: "To provisional selection" },
    ],
    problem: {
      label: "Sanitized problem statement",
      title: "Credit card application system",
      summary:
        "Build a Java full-stack credit-card flow: customer application, credit-score check, card allocation, and a first-time PIN update, designed as communicating services with a working end-to-end demo.",
      steps: [
        {
          title: "Apply",
          description: "Capture customer, employment, and identity details.",
        },
        {
          title: "Score",
          description:
            "Use an existing credit score, or calculate from salary and current card count.",
        },
        {
          title: "Approve",
          description: "Allocate a card type or request additional documents.",
        },
        {
          title: "First login",
          description: "Validate card details and let the customer set a new PIN.",
        },
      ],
      pdf: "/hcltech-hackathon-problem-statement-sanitized.pdf",
    },
    constraints: [
      "Single working day (8:30 AM to 6:30 PM) from problem reveal to final jury presentation.",
      "Java mandatory for the full-stack track; framework and frontend choices were ours.",
      "Team formed on the spot from four developers who had never worked together.",
      "Design had to be approved by the jury before any code was written.",
      "AI tools were allowed for everyone, so they were a baseline, not a differentiator.",
    ],
    architecture: [
      "Customer onboarding service",
      "Credit-score evaluation service",
      "Card-approval workflow service",
      "Kafka-based event communication between services",
      "API Gateway for routing",
      "ReactJS frontend for customer and admin workflows",
    ],
    sections: [
      {
        heading: "The challenge",
        body: [
          "HCLTech ran a one-day hackathon at its newly opened GIFT City office. After an intro to the company and its roadmap, three tracks were revealed by QR code: Java Full Stack, Java Backend, and AI & Data. Based on my stack I joined the Java Full Stack track and was placed in Team 03 with three developers I'd just met.",
          "The brief was a fintech credit-card system spanning application, credit scoring, card allocation, and a first-time PIN update. With only a working day available, the real test wasn't algorithmic complexity. It was whether we could turn a business problem into a practical, working system and defend our trade-offs to a jury.",
        ],
      },
      {
        heading: "Approach",
        body: [
          "We spent the first hour purely on system design: mapping the flow, sketching the architecture on paper, defining service boundaries, and deciding how services would communicate. We presented that design to the jury, answered their questions, and only began building once it was approved.",
          "I focused on backend architecture and business-workflow design. That meant defining service boundaries, thinking through the API flows, implementing core backend functionality, and keeping the team aligned on a solution we could actually finish. Several times we paused implementation to make sure everyone shared the same understanding before moving on, which kept confusion low and momentum high.",
          "We deliberately optimized for a working end-to-end flow over feature completeness, proving the system solved the problem reliably rather than chasing every advanced feature.",
        ],
      },
      {
        heading: "The AI lesson",
        body: [
          "Every participant had access to AI tools, yet solution quality varied widely. The differentiator wasn't access. It was the ability to provide the right context, verify outputs, and make engineering decisions.",
          "AI accelerated implementation, but understanding the business problem, designing the system, choosing the data flow, knowing where Kafka and APIs fit, reviewing generated code, and debugging with clarity all remained human responsibilities.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "Around 6 PM we submitted multiple microservices plus the frontend and presented our architecture, modules, and approach to the jury. Three days later, on Tuesday, May 12, 2026, I received an email confirming provisional selection for the Senior Technical Lead role. I've since accepted the formal offer, with an expected joining date of July 1, 2026.",
        ],
      },
    ],
    takeaways: [
      "Working functionality under pressure beats unnecessary complexity.",
      "Clear communication and shared understanding are as decisive as strong code.",
      "AI accelerates delivery but doesn't replace engineering judgment.",
      "Time pressure reveals real team dynamics, and alignment is a skill.",
      "Practical delivery under real constraints is worth more than a perfect design that never ships.",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "ReactJS",
      "Apache Kafka",
      "Microservices",
      "REST APIs",
      "API Gateway",
      "Relational DB design",
      "AI-assisted development",
    ],
    blogSlug: "hcltech-hackathon-gift-city",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
