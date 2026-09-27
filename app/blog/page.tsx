import { getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/lib/site";
import BackButton from "app/components/back-button";
import { BlogListingClient } from "app/components/blog-listing-client";
import type { BlogPostItem } from "app/components/blog-post-grid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and technical notes, search by title and sort by date. Long-form voice on software, systems, and finance × technology.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default function BlogPage() {
  // Only ship the fields the client grid needs, not the full MDX bodies.
  const posts: BlogPostItem[] = getBlogPosts().map(({ slug, metadata }) => ({
    slug,
    metadata,
  }));

  const jsonLd = posts
    .filter((p) => !!p.metadata.publishedAt)
    .map((p) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.metadata.title,
      datePublished: p.metadata.publishedAt,
      url: `${baseUrl}/blog/${p.slug}`,
      description: p.metadata.summary || p.metadata.description || "",
      author: { "@type": "Person", name: "Anand Thakkar" },
      image: p.metadata.image
        ? `${baseUrl}${p.metadata.image}`
        : undefined,
    }));

  return (
    <section className="pt-20 pb-12">
      <div className="container-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="mb-10">
          <BackButton fallback="/#blog" />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-2">
          Long-form
        </p>
        <h1 className="section-title mb-3">Blog</h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mb-10 leading-relaxed">
          Search by title and sort posts by date. Everything published in one place.
        </p>

        <BlogListingClient posts={posts} />
      </div>
    </section>
  );
}
