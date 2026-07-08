import BackButton from "app/components/back-button";
import { Moments } from "app/components/moments";
import { moments } from "app/data/moments";
import { baseUrl } from "app/sitemap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moments",
  description:
    "Milestones from Anand Thakkar's journey in photos, from taking charge of a family business to joining HCLTech as a Senior Technical Lead at GIFT City.",
  alternates: {
    canonical: "/moments",
  },
};

export default function MomentsPage() {
  const jsonLd = moments.map((m) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    url: `${baseUrl}${m.src}`,
    contentUrl: `${baseUrl}${m.src}`,
    caption: m.caption,
  }));

  return (
    <section className="pt-20 pb-12">
      <div className="container-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="mb-10">
          <BackButton fallback="/#moments" />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-2">
          The gallery
        </p>
        <h1 className="section-title mb-3">Moments</h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mb-10 leading-relaxed">
          Every milestone in one place, from the family business desk to GIFT
          City. Click any photo to see it full screen.
        </p>

        <Moments showFilter />
      </div>
    </section>
  );
}
