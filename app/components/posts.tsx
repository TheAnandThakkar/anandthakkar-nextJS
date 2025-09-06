// app/components/posts.tsx
import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

type Blog = {
  slug: string;
  metadata: {
    title: string;
    publishedAt?: string;
    summary?: string;
    description?: string;
  };
};

export function BlogPosts() {
  const allBlogs = getBlogPosts() as Blog[];

  // Sort newest first
  const blogs = [...allBlogs].sort((a, b) => {
    const ta = a.metadata.publishedAt
      ? new Date(a.metadata.publishedAt).getTime()
      : 0;
    const tb = b.metadata.publishedAt
      ? new Date(b.metadata.publishedAt).getTime()
      : 0;
    return tb - ta;
  });

  // If there are no posts, show a simple placeholder
  if (blogs.length === 0) {
    return (
      <section>
        <h2 className="mb-6 text-2xl font-semibold tracking-tighter">
          Blog Posts 📝
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          No posts yet — check back soon.
        </p>
      </section>
    );
  }

  // JSON-LD for visible posts
  const jsonLd = blogs
    .filter((p) => !!p.metadata.publishedAt)
    .map((p) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.metadata.title,
      datePublished: p.metadata.publishedAt,
      url: `https://www.anandthakkar.com/blog/${p.slug}`,
      description: p.metadata.summary || p.metadata.description || "",
      author: { "@type": "Person", name: "Anand Thakkar" },
    }));

  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold tracking-tighter">
        Blog Posts 📝
      </h2>

      {/* SEO: BlogPosting JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-6">
        {blogs.map((post) => {
          const dateStr = post.metadata.publishedAt
            ? formatDate(post.metadata.publishedAt, false)
            : null;
          const summary =
            post.metadata.summary || post.metadata.description || null;

          return (
            <article key={post.slug} className="space-y-2">
              <h3 className="text-lg font-medium tracking-tight">
                {post.metadata.title}
              </h3>

              {summary && (
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {summary}
                </p>
              )}

              <div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-medium text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                  aria-label={`Read blog post: ${post.metadata.title}${
                    dateStr ? ` (${dateStr})` : ""
                  }`}
                >
                  Read more →
                </Link>
              </div>

              {dateStr && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {dateStr}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
