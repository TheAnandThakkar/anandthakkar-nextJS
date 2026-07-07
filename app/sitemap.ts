import { getBlogPosts } from "app/blog/utils";

export const baseUrl = "https://www.anandthakkar.com";

/** Homepage images declared for Google Images indexing (headshot + Moments photos). */
const homepageImages = [
  "/opengraph-image",
  "/headshot.jpg",
  "/hcltech-joining.jpg",
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

  const staticRoutes = ["", "/blog", "/about", "/moments"].map((route) => {
    const routeData = {
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
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
