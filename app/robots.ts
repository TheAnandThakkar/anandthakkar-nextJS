import { baseUrl } from 'app/sitemap'

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
