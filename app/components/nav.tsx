"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToSectionId } from "app/lib/scroll";

const NAV_SECTIONS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#recognition", label: "Recognition" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
] as const;

const SECTION_IDS = NAV_SECTIONS.map((s) => s.href.replace("#", ""));

function navItemClass(active: boolean) {
  return `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
    active
      ? "bg-magenta/10 text-magenta dark:text-magenta dark:bg-magenta/15"
      : "text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10"
  }`;
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    queueMicrotask(() => menuButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (!isHome) {
      setActiveSectionId(null);
      return;
    }

    const updateActive = () => {
      const navH = 48;
      const marker = window.scrollY + navH + 120;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= marker) current = id;
      }
      setActiveSectionId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [isHome]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-neutral-200 dark:border-white/5 py-0">
      <div className="container-main">
        <nav
          className="flex items-center justify-between h-12"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label="Go to homepage"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform">
              <Image
                src="/favicon.ico"
                alt=""
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col" style={{ lineHeight: "1" }}>
              <span
                className="font-bold text-neutral-900 dark:text-white tracking-tight text-base"
                style={{ lineHeight: "1" }}
              >
                Anand
              </span>
              <span
                className="font-bold text-neutral-900 dark:text-white tracking-tight text-base"
                style={{ lineHeight: "1" }}
              >
                Thakkar
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-6">
            <div className="hidden md:flex items-center gap-1">
              {isHome
                ? NAV_SECTIONS.map(({ href, label }) => {
                    const id = href.replace("#", "");
                    const active = activeSectionId === id;
                    return (
                      <button
                        key={href}
                        type="button"
                        onClick={() => scrollToSectionId(href)}
                        className={navItemClass(active)}
                        aria-current={active ? "true" : undefined}
                      >
                        {label}
                      </button>
                    );
                  })
                : NAV_SECTIONS.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={`/${href}`}
                      className={navItemClass(false)}
                    >
                      {label}
                    </Link>
                  ))}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                ref={menuButtonRef}
                type="button"
                className="md:hidden flex flex-col gap-1.5 p-2 text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white"
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-menu"
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </button>
            </div>
          </div>
        </nav>

        {menuOpen && (
          <div
            id="mobile-nav-menu"
            className="md:hidden bg-white/98 dark:bg-neutral-950/98 border-t border-neutral-200 dark:border-white/10 py-4 pb-6 flex flex-col gap-1"
            role="navigation"
            aria-label="Section links"
          >
            {isHome
              ? NAV_SECTIONS.map(({ href, label }) => {
                  const id = href.replace("#", "");
                  const active = activeSectionId === id;
                  return (
                    <button
                      key={href}
                      type="button"
                      onClick={() => {
                        scrollToSectionId(href);
                        closeMenu();
                      }}
                      className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        active
                          ? "bg-magenta/10 text-magenta dark:text-magenta dark:bg-magenta/15"
                          : "text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10"
                      }`}
                      aria-current={active ? "true" : undefined}
                    >
                      {label}
                    </button>
                  );
                })
              : NAV_SECTIONS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={`/${href}`}
                    className="text-left px-4 py-2.5 text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 rounded-lg text-sm font-medium transition-all"
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                ))}
          </div>
        )}
      </div>
    </header>
  );
}
