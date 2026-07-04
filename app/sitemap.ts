import { getBlogPosts } from "app/blog/utils";

export const baseUrl = "https://www.anandthakkar.com";

/** Homepage images declared for Google Images indexing (headshot + Moments photos). */
const homepageImages = [
  "/opengraph-image",
  "/headshot.jpg",
  "/hcltech-joining.jpg",
  "/gdg-devfest-2022.jpg",
  "/first-it-job-2022.jpg",
  "/family-business-2018.jpg",
  "/techspark-2017-bengaluru.jpg",
].map((path) => `${baseUrl}${path}`);

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const staticRoutes = ["", "/blog", "/about"].map((route) => {
    const routeData = {
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    };

    if (route === "") {
      return {
        ...routeData,
        images: homepageImages,
      };
    }

    return routeData;
  });

  return [...staticRoutes, ...blogs];
}
