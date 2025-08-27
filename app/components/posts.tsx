import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            {/* The parent container is now always a column (flex-col) */}
            <div className="w-full flex flex-col space-x-0">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight underline hover:text-neutral-600 dark:hover:text-neutral-400 font-medium">
                {post.metadata.title}
              </p>
              {/* This line is now full width and aligns text to the right */}
              <p className="text-neutral-600 dark:text-neutral-400 w-full text-left tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
