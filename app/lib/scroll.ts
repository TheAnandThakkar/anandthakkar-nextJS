/** Fixed navbar height; keep in sync with `nav` `h-12` (3rem = 48px). */
export const NAVBAR_HEIGHT_PX = 48;

/**
 * Scrolls so the element with `id` sits below the fixed navbar.
 */
export function scrollToSectionId(id: string, behavior: ScrollBehavior = "smooth") {
  const clean = id.replace(/^#/, "");
  const el = document.getElementById(clean);
  if (!el) return;

  const top =
    el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT_PX;
  window.scrollTo({ top, behavior });
}
