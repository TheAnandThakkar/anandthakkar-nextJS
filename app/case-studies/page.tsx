import { CaseStudies } from "../components/case-studies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Anand Thakkar",
  description:
    "In-depth case studies on real engineering problems, the systems designed to solve them, and the outcomes they led to.",
  alternates: {
    canonical: "/case-studies",
  },
};

export default function CaseStudiesPage() {
  return (
    <section className="pt-20 pb-12">
      <div className="container-main">
        <header className="mb-8 sm:mb-10">
          <h1 className="section-title">Case Studies</h1>
          <p className="section-subtitle mt-2">
            Deep dives into real problems, the systems I designed, and the
            outcomes they led to.
          </p>
        </header>
        <CaseStudies />
      </div>
    </section>
  );
}
