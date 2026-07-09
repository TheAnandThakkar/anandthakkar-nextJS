import { getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/sitemap";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getBlogPosts()
    .filter((post) => post.metadata.publishedAt)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    );

  const items = posts
    .map((post) => {
      const url = `${baseUrl}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.metadata.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(post.metadata.summary ?? "")}</description>
      <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Anand Thakkar</title>
    <link>${baseUrl}</link>
    <description>From India's tax system to building fintech software. Anand Thakkar on finance, technology, and what happens when the two collide.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
