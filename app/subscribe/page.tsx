import BackButton from "app/components/back-button";
import { Subscribe } from "app/components/subscribe";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Subscribe to Anand Thakkar's newsletter. Finance, technology, and honest lessons from the journey, straight to your inbox. No spam, unsubscribe any time.",
  alternates: {
    canonical: "/subscribe",
  },
};

export default function SubscribePage() {
  return (
    <section className="pt-20 pb-16">
      <div className="container-main">
        <div className="mb-10">
          <BackButton fallback="/#subscribe" />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            Newsletter
          </p>
          <h1 className="section-title mb-3">Subscribe to Anand Thakkar</h1>
          <p className="mb-10 leading-relaxed text-neutral-600 dark:text-neutral-400">
            Milestones, honest lessons, and long-form thinking from the
            intersection of finance and technology. You&apos;ll only hear from
            me when there is something worth your time.
          </p>
          <Subscribe />
        </div>
      </div>
    </section>
  );
}
