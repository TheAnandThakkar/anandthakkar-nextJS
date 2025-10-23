// app/components/posts.tsx
import Image from "next/image";
import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

type Blog = {
  slug: string;
  metadata: {
    title: string;
    publishedAt?: string;
    summary?: string;
    description?: string;
    image?: string; // <- thumbnail path (e.g., "/ai_vs_developer.png")
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

  // SEO: BlogPosting JSON-LD for visible posts
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
      image: p.metadata.image
        ? `https://www.anandthakkar.com${p.metadata.image}`
        : undefined,
    }));

  return (
    <section id="blog">
      <h2 className="mb-6 text-2xl font-semibold tracking-tighter">
        Blog Posts 📝
      </h2>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Responsive grid of cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        {blogs.map((post) => {
          const href = `/blog/${post.slug}`;
          const dateStr = post.metadata.publishedAt
            ? formatDate(post.metadata.publishedAt, false)
            : null;
          const summary =
            post.metadata.summary || post.metadata.description || "";
          const img = post.metadata.image || "/preview-image.png"; // graceful fallback

          return (
            <Link
              key={post.slug}
              href={href}
              className="group rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-800 dark:bg-neutral-950"
              aria-label={`Read blog post: ${post.metadata.title}${
                dateStr ? ` (${dateStr})` : ""
              }`}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={img}
                  alt={post.metadata.title}
                  width={800}
                  height={420}
                  className="h-44 w-full rounded-xl object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                  priority={false}
                />
                {/* subtle overlay gradient */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent rounded-b-xl" />
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="line-clamp-2 text-base font-semibold tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {post.metadata.title}
                </h3>

                {summary && (
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {summary}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between">
                  {dateStr && (
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {dateStr}
                    </span>
                  )}
                  <span className="text-sm font-medium text-blue-600 underline-offset-4 group-hover:underline dark:text-blue-400">
                    Read more →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
