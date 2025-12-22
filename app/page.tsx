// app/page.tsx
import Image from "next/image";
import { BlogPosts } from "app/components/posts";
import { Contributions } from "./components/contributions";
import { Awards } from "./components/awards";
import { Experience } from "./components/experience";
import { FaEnvelope, FaFilePdf } from "react-icons/fa6";
import { baseUrl } from "./sitemap";
import SocialPreviewCard from "./components/social-preview";
import QrContactButton from "./components/qr-contact";

export const revalidate = 86400; // ✅ lightly cache the page (24h)

// Helper: label like "more than 3 years" (no months)
function getExperienceYearsLabel(startDate: string) {
  const start = new Date(startDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const m = now.getMonth() - start.getMonth();
  const d = now.getDate() - start.getDate();

  // If current month/day is before start month/day, we haven't completed this year yet
  if (m < 0 || (m === 0 && d < 0)) years -= 1;

  // If there are leftover months/days beyond whole years, say "more than X years"
  const hasRemainder = m > 0 || (m === 0 && d > 0);
  return hasRemainder ? `more than ${years} years` : `${years} years`;
}

// Date when I started professional experience
const expYearsLabel = getExperienceYearsLabel("2022-05-16");

export default function Page() {
  return (
    <section className="pt-6 md:pt-10">
      {/* Intro / Hero */}
      <header className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-end gap-4">
        <Image
          src="/headshot.jpg"
          alt="Photo of Anand Thakkar"
          width={144}
          height={144}
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
        {`Backend developer with ${expYearsLabel} of experience in fintech/SaaS. Skilled in Java, Spring Boot, AWS, and building scalable APIs with a focus on performance and cost optimization. Strong cross-functional collaborator bridging engineering and product.`}
      </p>

      {/* Quick actions */}
      <div className="mb-10 flex flex-wrap items-center gap-3">
        {/* Primary: Contact (neutral wording) */}
        <a
          href="mailto:anand.thakkar@outlook.com?subject=Hello%20Anand"
          className="group inline-flex items-center gap-2 rounded-xl border border-blue-600 bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-offset-0"
          aria-label="Contact Anand Thakkar"
        >
          <FaEnvelope aria-hidden className="opacity-95" />
          Let’s connect
        </a>

        {/* Secondary: Resume */}
        <a
          href="/Anand_Thakkar.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
          aria-label="Download résumé"
        >
          <FaFilePdf aria-hidden className="text-red-600" />
          Download résumé
        </a>

        {/* Save contact: open QR modal */}
        {/* <QrContactButton /> */}
      </div>

      {/* Awards (cred strip near top for quick skim) */}
      <div className="my-8 md:my-10">
        <Awards />
      </div>

      {/* Open Source Contributions */}
      <div className="my-10 md:my-12">
        <Contributions />
      </div>

      {/* Work Experience */}
      <div className="my-10 md:my-12">
        <Experience />
      </div>

      {/* Blog */}
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
