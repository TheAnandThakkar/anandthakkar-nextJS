/**
 * Site-wide constants. Safe to import from both server and client components
 * (no Node APIs), unlike `app/sitemap.ts`, which pulls in `fs` via the blog loader.
 */
export const baseUrl = "https://www.anandthakkar.com";

export const CONTACT_EMAIL = "anand.thakkar@outlook.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Hello%20Anand`;

export const AUTHOR_NAME = "Anand Thakkar";

/** Simple, permissive email check shared by the subscribe form and API route. */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
