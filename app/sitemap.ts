import { getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/lib/site";

// Re-exported for existing imports; prefer importing from `app/lib/site`.
export { baseUrl };

/** Homepage images declared for Google Images indexing (headshot + Moments photos). */
const homepageImages = [
  "/opengraph-image",
  "/headshot.jpg",
  "/hcltech-inauguration-2026.jpg",
  "/hcltech-joining.jpg",
  "/singapore-2024.jpg",
  "/cape-town-2023.jpg",
  "/gdg-devfest-2022.jpg",
  "/first-it-job-2022.jpg",
  "/family-business-2018.jpg",
  "/techspark-2017-bengaluru.jpg",
  "/taxaltus-techsparks-2017.jpg",
].map((path) => `${baseUrl}${path}`);

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const today = new Date().toISOString().split("T")[0];

  const staticRoutes = ["", "/blog", "/about", "/moments", "/subscribe"].map((route) => {
    const routeData = {
      url: `${baseUrl}${route}`,
      lastModified: today,
    };

    // Declare the photos on both pages that display them.
    if (route === "" || route === "/moments") {
      return {
        ...routeData,
        images: homepageImages,
      };
    }

    return routeData;
  });

  return [...staticRoutes, ...blogs];
}
