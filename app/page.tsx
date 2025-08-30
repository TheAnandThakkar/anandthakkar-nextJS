// app/page.tsx
import Image from "next/image";
import { BlogPosts } from "app/components/posts";
// import { Skills } from "./components/skills"; // unused right now
import { Contributions } from "./components/contributions";
import { Awards } from "./components/awards";
import { Experience } from "./components/experience";
import { FaEnvelope, FaFilePdf } from "react-icons/fa";

import { baseUrl } from "./sitemap";
import SocialPreviewCard from "./components/social-preview";

// Helper: compute years & months since a start date
function getExperience(startDate: string) {
  const start = new Date(startDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months };
}

function formatExperience(exp: { years: number; months: number }) {
  const y = exp.years;
  const m = exp.months;
  const ys = y > 0 ? `${y} yr${y > 1 ? "s" : ""}` : "";
  const ms = m > 0 ? `${m} mo${m > 1 ? "s" : ""}` : "";
  return [ys, ms].filter(Boolean).join(" ");
}

export default function Page() {
  const exp = getExperience("2022-05-16");
  const expStr = formatExperience(exp);

  return (
    <section className="pt-6 md:pt-10">
      {/* Intro / Hero */}
      <header className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-end gap-4">
        <Image
          src="/headshot.jpg"
          alt="Portrait of Anand Thakkar"
          width={144} // was 128
          height={144} // was 128
          priority
          className="rounded-xl border border-neutral-200 dark:border-neutral-800 object-cover"
        />
        <div className="flex flex-col leading-tight">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="block">Anand</span>
            <span className="block">Thakkar</span>
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Backend Engineer • AWS Certified Cloud Practitioner • Fintech/SaaS
          </p>
        </div>
      </header>

      {/* Summary */}
      <p className="mb-6 text-neutral-800 dark:text-neutral-200">
        {`Backend developer with ${expStr} of experience in fintech/SaaS. Skilled in Java, Spring Boot, AWS, and building scalable APIs with a focus on performance and cost optimization. Strong cross-functional collaborator bridging engineering and product.`}
      </p>

      {/* Quick actions (colorful icons) */}
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <a
          href="mailto:anand.thakkar@outlook.com"
          className="group inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
          aria-label="Email Anand Thakkar"
        >
          <FaEnvelope
            aria-hidden
            className="text-blue-600 group-hover:text-blue-700 dark:group-hover:text-blue-500"
          />
          Email
        </a>
        <a
          href="/resume.pdf" // ensure /public/resume.pdf exists
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
          aria-label="Download Resume"
        >
          <FaFilePdf
            aria-hidden
            className="text-red-600 group-hover:text-red-700 dark:group-hover:text-red-500"
          />
          Resume
        </a>
      </div>

      {/* Work Experience */}
      <div className="my-10 md:my-12">
        <Experience />
      </div>

      {/* Open Source Contributions */}
      <div className="my-10 md:my-12">
        <Contributions />
      </div>

      {/* Awards & Certifications */}
      <div className="my-10 md:my-12">
        <Awards />
      </div>

      {/* Skills (currently hidden)
      <div className="my-10 md:my-12">
        <Skills />
      </div> */}

      {/* Blog Posts */}
      <div className="my-10 md:my-12">
        <BlogPosts />
      </div>

      {/* Social preview card */}
      <div className="my-8">
        <SocialPreviewCard
          url={baseUrl}
          title="Anand Thakkar – Software Developer & Tech Creator"
          description="Explore projects, blogs, and open-source contributions of Anand Thakkar."
          image="/preview-image.png"
        />
      </div>
    </section>
  );
}
