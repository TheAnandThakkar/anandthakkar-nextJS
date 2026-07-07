import { baseUrl } from "app/sitemap";

/**
 * Person + WebSite + ImageObject JSON-LD for Google rich results.
 * Lives in root layout because `app/head.tsx` is not used by the App Router.
 */
/** Milestone photos from the Moments section — declared so Google Images indexes them. */
const momentPhotos = [
  {
    path: "/hcltech-joining.jpg",
    caption:
      "Anand Thakkar on his first day as Senior Technical Lead at HCLTech, GIFT City, 2026",
  },
  {
    path: "/cape-town-2023.jpg",
    caption:
      "Anand Thakkar at the Cape of Good Hope, the most south-western point of the African continent, Cape Town, 2023",
  },
  {
    path: "/gdg-devfest-2022.jpg",
    caption: "Anand Thakkar at his first Google Developer Group DevFest, 2022",
  },
  {
    path: "/first-it-job-2022.jpg",
    caption:
      "Anand Thakkar at his first IT job as a software developer, 2022",
  },
  {
    path: "/family-business-2018.jpg",
    caption: "Anand Thakkar taking charge of the family business, 2018",
  },
  {
    path: "/techspark-2017-bengaluru.jpg",
    caption:
      "Anand Thakkar as a delegate at his first TechSpark, Bengaluru, 2017",
  },
  {
    path: "/taxaltus-techsparks-2017.jpg",
    caption:
      "TechSparks 2017 delegate badge with Anand Thakkar representing Taxaltus, Bengaluru",
  },
];

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
    width: 1200,
    height: 1200,
  };

  const momentImageObjects = momentPhotos.map((photo) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${siteUrl}${photo.path}#image`,
    url: `${siteUrl}${photo.path}`,
    contentUrl: `${siteUrl}${photo.path}`,
    caption: photo.caption,
  }));

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
    jobTitle: "Senior Technical Lead",
    description:
      "Senior Technical Lead at HCLTech (GIFT City) specializing in Fintech, SaaS, and AWS Cloud.",
    url: siteUrl,
    // Only the headshot here: this is what Google shows next to search results
    // for "Anand Thakkar". Moments photos are indexed separately via their own
    // ImageObject scripts and the image sitemap.
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
    worksFor: {
      "@type": "Organization",
      name: "HCLTech",
      url: "https://www.hcltech.com",
    },
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
      {momentImageObjects.map((obj) => (
        <script
          key={obj["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
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
