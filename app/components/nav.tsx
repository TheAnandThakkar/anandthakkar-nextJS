"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_SECTIONS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#recognition", label: "Recognition" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id.replace("#", ""));
  if (el) {
    const navbarHeight = 48; // fixed navbar height offset
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-neutral-200 dark:border-white/5 py-0`}
    >
      <div className="container-main">
        <nav className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label="Go to homepage"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform">
              <Image
                src="/favicon.ico"
                alt="Anand Thakkar Logo"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col" style={{ lineHeight: "1" }}>
              <span className="font-bold text-neutral-900 dark:text-white tracking-tight text-base" style={{ lineHeight: "1" }}>Anand</span>
              <span className="font-bold text-neutral-900 dark:text-white tracking-tight text-base" style={{ lineHeight: "1" }}>Thakkar</span>
            </div>
          </Link>

          {/* Right-aligned Navigation & Actions */}
          <div className="flex items-center gap-2 sm:gap-6">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {isHome
                ? NAV_SECTIONS.map(({ href, label }) => (
                  <button
                    key={href}
                    onClick={() => scrollToSection(href)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-all duration-200"
                  >
                    {label}
                  </button>
                ))
                : NAV_SECTIONS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={`/${href}`}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-all duration-200"
                  >
                    {label}
                  </Link>
                ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <a
                href="/Anand_Thakkar.pdf"
                download
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white bg-teal hover:bg-teal/90 px-4 py-2 rounded-lg transition-all duration-200 shadow-[0_2px_8px_-2px_rgba(233,30,99,0.3)]"
              >
                Resume
              </a>

              {/* Mobile hamburger */}
              <button
                className="md:hidden flex flex-col gap-1.5 p-2 text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white/98 dark:bg-neutral-950/98 border-t border-neutral-200 dark:border-white/10 py-4 pb-6 flex flex-col gap-1">
            {NAV_SECTIONS.map(({ href, label }) => (
              <button
                key={href}
                onClick={() => {
                  scrollToSection(href);
                  setMenuOpen(false);
                }}
                className="text-left px-4 py-2.5 text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 rounded-lg text-sm font-medium transition-all"
              >
                {label}
              </button>
            ))}
            <a
              href="/Anand_Thakkar.pdf"
              download
              className="mx-4 mt-2 text-center text-sm font-semibold text-white bg-teal hover:bg-teal/90 transition-colors px-4 py-2.5 rounded-lg shadow-sm"
            >
              Download Resume
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
