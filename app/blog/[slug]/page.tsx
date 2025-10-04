// app/blog/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/sitemap";

// Build static paths for all posts
export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

// 🔧 Await `params` here (Next 14.2.x can pass it as a Promise)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPosts().find((p) => p.slug === slug);
  if (!post) return {};

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  const ogImage = image ?? `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// 🔧 And await `params` here too
export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getBlogPosts().find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <section>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: { "@type": "Person", name: "Anand Thakkar" },
          }),
        }}
      />

      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>

      <div className="flex justify-between items-center mt-2 mb-6 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>

      {/* Optional hero image from front-matter */}
      {post.metadata.image && (
        <div className="mb-8">
          <Image
            src={post.metadata.image} // e.g. "/ai_vs_developer.png"
            alt={post.metadata.title}
            width={1200}
            height={630}
            className="w-full h-auto rounded-xl border border-neutral-200 dark:border-neutral-800"
            priority={false}
          />
        </div>
      )}

      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
