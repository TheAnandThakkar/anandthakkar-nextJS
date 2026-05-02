import { baseUrl } from "app/sitemap";

/**
 * Person + WebSite + ImageObject JSON-LD for Google rich results.
 * Lives in root layout because `app/head.tsx` is not used by the App Router.
 */
export function SiteJsonLd() {
  const siteUrl = baseUrl;
  const personId = `${siteUrl}#person`;
  const websiteId = `${siteUrl}#website`;
  const profilePageId = `${siteUrl}#profile-page`;
  const headshotUrl = `${siteUrl}/headshot.jpg`;

  const imageObject = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${siteUrl}#headshot`,
    url: headshotUrl,
    contentUrl: headshotUrl,
    thumbnailUrl: headshotUrl,
    caption: "Anand Thakkar headshot",
    representativeOfPage: true,
    width: 2519,
    height: 2519,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: "Anand Thakkar",
  };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: "Anand Thakkar",
    alternateName: ["TheAnandThakkar"],
    jobTitle: "Software Developer",
    description: "Software Developer specializing in Fintech, SaaS, and AWS Cloud.",
    url: siteUrl,
    image: [
      { "@id": `${siteUrl}#headshot` },
      headshotUrl,
    ],
    logo: { "@id": `${siteUrl}#headshot` },
    sameAs: [
      "https://github.com/TheAnandThakkar",
      "https://www.linkedin.com/in/theanandthakkar/",
      "https://x.com/TheAnandThakkar",
      "https://anandthakkar.dev",
    ],
    worksFor: { "@type": "Organization", name: "Agile Infoways" },
    knowsAbout: [
      "Software development",
      "Backend engineering",
      "System design",
      "API design",
      "Java",
      "Spring Boot",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Performance optimization",
      "Microservices",
      "Distributed systems",
      "Tech Creator",
      "Taxaltus",
      "Technical writing",
      "Developer tooling",
    ],
    knowsLanguage: ["en", "hi"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "Ahmedabad",
    },
  };

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": profilePageId,
    url: siteUrl,
    name: "Anand Thakkar",
    mainEntity: { "@id": personId },
    primaryImageOfPage: { "@id": `${siteUrl}#headshot` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObject) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
    </>
  );
}
