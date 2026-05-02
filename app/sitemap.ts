import { getBlogPosts } from "app/blog/utils";

export const baseUrl = "https://www.anandthakkar.com";

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ["", "/blog", "/about", "/projects"].map((route) => {
    const routeData = {
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    };

    if (route === "") {
      return {
        ...routeData,
        images: [`${baseUrl}/headshot.jpg`],
      };
    }

    return routeData;
  });

  return [...routes, ...blogs];
}
