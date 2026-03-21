// app/components/posts.tsx
import Link from "next/link";
import { getBlogPosts } from "app/blog/utils";
import { BlogPostGrid, type BlogPostItem } from "./blog-post-grid";

type Blog = BlogPostItem;

type BlogPostsProps = {
  /** If set, only the first N posts (after newest-first sort) are shown. */
  limit?: number;
  /** When there are more posts than `limit`, show a link to `/blog`. */
  showLoadMore?: boolean;
};

export function BlogPosts({ limit, showLoadMore }: BlogPostsProps = {}) {
  const allBlogs = getBlogPosts() as Blog[];

  const blogs = [...allBlogs].sort((a, b) => {
    const ta = a.metadata.publishedAt
      ? new Date(a.metadata.publishedAt).getTime()
      : 0;
    const tb = b.metadata.publishedAt
      ? new Date(b.metadata.publishedAt).getTime()
      : 0;
    return tb - ta;
  });

  const visible =
    typeof limit === "number" && limit > 0 ? blogs.slice(0, limit) : blogs;
  const hasMore =
    Boolean(showLoadMore && typeof limit === "number" && blogs.length > limit);

  if (blogs.length === 0) {
    return (
      <section>
        <p className="text-neutral-600 dark:text-neutral-400">
          No posts yet, check back soon.
        </p>
      </section>
    );
  }

  const jsonLd = visible
    .filter((p) => !!p.metadata.publishedAt)
    .map((p) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.metadata.title,
      datePublished: p.metadata.publishedAt,
      url: `https://www.anandthakkar.com/blog/${p.slug}`,
      description: p.metadata.summary || p.metadata.description || "",
      author: { "@type": "Person", name: "Anand Thakkar" },
      image: p.metadata.image
        ? `https://www.anandthakkar.com${p.metadata.image}`
        : undefined,
    }));

  return (
    <section id="blog">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogPostGrid posts={visible} />

      {hasMore && (
        <div className="relative mt-12 sm:mt-14">
          {/* Hairline separator, ties the CTA to the grid without a heavy box */}
          <div
            className="pointer-events-none absolute inset-x-0 -top-6 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-neutral-800"
            aria-hidden
          />
          <Link
            href="/blog"
            className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-neutral-200/90 bg-gradient-to-br from-white via-white to-neutral-50/90 p-5 shadow-sm transition-all duration-300 hover:border-magenta/30 hover:shadow-md dark:border-neutral-800 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950/90 dark:hover:border-magenta/35 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6"
            aria-label={`View all blog posts. Showing ${visible.length} of ${blogs.length} on the home page.`}
          >
            {/* Soft accent wash on hover */}
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-magenta/[0.06] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-magenta/10"
              aria-hidden
            />
            <div className="relative min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                Full archive
              </p>
              <p className="mt-1.5 text-sm leading-snug text-neutral-600 dark:text-neutral-300">
                You&apos;re seeing the latest {visible.length} of {blogs.length}{" "}
                posts, continue to the blog for the full list.
              </p>
            </div>
            <span className="relative inline-flex shrink-0 items-center justify-center gap-2 self-stretch rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 group-hover:bg-magenta group-hover:shadow-lg group-hover:shadow-magenta/25 dark:bg-white dark:text-neutral-900 dark:group-hover:bg-magenta dark:group-hover:text-white sm:self-center sm:py-3.5">
              <span>View all posts</span>
              <span
                className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              >
                →
              </span>
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
