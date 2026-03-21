import Image from "next/image";
import Link from "next/link";
import { formatDate } from "app/blog/format-date";

export type BlogPostItem = {
  slug: string;
  metadata: {
    title: string;
    publishedAt?: string;
    summary?: string;
    description?: string;
    image?: string;
  };
};

export function BlogPostGrid({ posts }: { posts: BlogPostItem[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-neutral-600 dark:text-neutral-400">
        No posts to show.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {posts.map((post) => {
        const href = `/blog/${post.slug}`;
        const dateStr = post.metadata.publishedAt
          ? formatDate(post.metadata.publishedAt, false)
          : null;
        const summary =
          post.metadata.summary || post.metadata.description || "";
        const img = post.metadata.image || "/preview-image.png";

        return (
          <div
            key={post.slug}
            className="card-hover flex flex-col group p-2"
            aria-label={`Read blog post: ${post.metadata.title}${dateStr ? ` (${dateStr})` : ""}`}
          >
            <Link href={href} className="flex-1 flex flex-col focus-visible:outline-none">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={img}
                  alt={post.metadata.title}
                  width={800}
                  height={420}
                  className="h-44 w-full rounded-xl object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                  priority={false}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent rounded-b-xl" />
              </div>

              <div className="p-3">
                <h3 className="line-clamp-2 text-lg font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-magenta transition-colors">
                  {post.metadata.title}
                </h3>

                {summary && (
                  <p className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {summary}
                  </p>
                )}

                <div className="mt-4 flex items-center justify-between">
                  {dateStr && (
                    <span className="block text-xs font-semibold text-magenta bg-magenta/10 px-2 py-0.5 rounded-sm">
                      {dateStr}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-magenta flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
