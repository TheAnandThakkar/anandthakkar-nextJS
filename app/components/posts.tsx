import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold tracking-tighter">
        Blog Posts 📝
      </h2>
      <div className="space-y-6">
        {allBlogs
          .sort((a, b) =>
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
              ? -1
              : 1
          )
          .map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1"
              href={`/blog/${post.slug}`}
            >
              <p className="text-blue-600 dark:text-blue-400 tracking-tight underline hover:text-blue-800 dark:hover:text-blue-300 font-medium text-lg">
                {post.metadata.title}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-left tabular-nums text-sm">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
            </Link>
          ))}
      </div>
    </section>
  );
}
