"use client";

import { useMemo, useState } from "react";
import { BlogPostGrid, type BlogPostItem } from "./blog-post-grid";

type Props = {
  posts: BlogPostItem[];
};

export function BlogListingClient({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"desc" | "asc">("desc");

  const filtered = useMemo(() => {
    if (posts.length === 0) return [];
    const q = query.trim().toLowerCase();
    const list = q
      ? posts.filter((p) => p.metadata.title.toLowerCase().includes(q))
      : [...posts];

    list.sort((a, b) => {
      const ta = a.metadata.publishedAt
        ? new Date(a.metadata.publishedAt).getTime()
        : 0;
      const tb = b.metadata.publishedAt
        ? new Date(b.metadata.publishedAt).getTime()
        : 0;
      return sort === "desc" ? tb - ta : ta - tb;
    });

    return list;
  }, [posts, query, sort]);

  if (posts.length === 0) {
    return (
      <p className="text-neutral-600 dark:text-neutral-400">
        No posts yet, check back soon.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-md">
          <label htmlFor="blog-search" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Search
          </label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by title…"
            autoComplete="off"
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-magenta focus:ring-2 focus:ring-magenta/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500"
          />
        </div>

        <div className="w-full sm:w-auto sm:min-w-[11rem]">
          <label htmlFor="blog-sort" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Date
          </label>
          <select
            id="blog-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as "desc" | "asc")}
            className="w-full cursor-pointer rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm outline-none transition-colors focus:border-magenta focus:ring-2 focus:ring-magenta/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-8 text-center text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
          No posts match &ldquo;{query.trim()}&rdquo;. Try another search.
        </p>
      ) : (
        <>
          <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
            Showing {filtered.length} of {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
          <BlogPostGrid posts={filtered} />
        </>
      )}
    </div>
  );
}
