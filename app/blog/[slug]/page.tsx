// app/blog/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/sitemap";
import BackButton from "app/components/back-button";
import SharePost from "app/components/share-post";

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

  const heroImageUrl = post.metadata.image
    ? `${baseUrl}${post.metadata.image}`
    : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.publishedAt,
    description: post.metadata.summary,
    image: heroImageUrl,
    url: `${baseUrl}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
    author: {
      "@type": "Person",
      "@id": `${baseUrl}#person`,
      name: "Anand Thakkar",
      url: baseUrl,
      image: {
        "@type": "ImageObject",
        url: `${baseUrl}/headshot.jpg`,
      },
      sameAs: [
        "https://github.com/TheAnandThakkar",
        "https://www.linkedin.com/in/theanandthakkar/",
        "https://x.com/TheAnandThakkar",
      ],
    },
    publisher: {
      "@type": "Person",
      name: "Anand Thakkar",
      url: baseUrl,
    },
  };

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-screen pt-28 pb-24">
      <section className="container-main max-w-3xl">
        <div className="mb-10">
          <BackButton fallback="/#blog" />
        </div>

        {/* JSON-LD for SEO */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight mb-8">
          {post.metadata.title}
        </h1>

        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-8 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm border border-neutral-100 dark:border-neutral-800">
              <Image
                src="/headshot-avatar.webp"
                alt="Anand Thakkar"
                width={48}
                height={48}
                sizes="48px"
                quality={85}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="font-bold text-neutral-900 dark:text-white">Anand Thakkar</p>
              <p className="text-sm font-medium text-magenta">
                {formatDate(post.metadata.publishedAt)}
              </p>
            </div>
          </div>
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

        <article className="prose prose-neutral dark:prose-invert prose-lg w-full max-w-none text-neutral-700 dark:text-neutral-300 mb-12">
          <CustomMDX source={post.content} />
        </article>

        {/* Share Section */}
        <SharePost title={post.metadata.title} slug={post.slug} />

      </section>
    </div>
  );
}
