import { BlogPosts } from "app/components/posts";
import { Contributions } from "./components/contributions";
import { Awards } from "./components/awards";
import { Experience } from "./components/experience";
import { HeroActions } from "./components/hero-actions";
import { HeroVisitBadge } from "./components/hero-visit-badge";
import { About } from "./components/about";
import { SectionHeading } from "./components/section-heading";
import type { Metadata } from "next";

export const revalidate = 86400;
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return (
    <div className="relative">

      {/* ======= HERO ======= */}
      <section id="home" className="relative lg:min-h-screen flex flex-col lg:block overflow-hidden">
        {/* Background image: portrait/tablet use cover + face-biased position; landscape (pre-lg) uses height-first sizing so wide viewports don’t crop the face; desktop full-bleed cover */}
        <div
          className="pointer-events-none z-0 w-full overflow-hidden bg-[url('/anand_thakkar_bg.png')] bg-no-repeat h-[55vh] min-h-[260px] sm:min-h-[280px] md:min-h-[300px] max-lg:landscape:h-[min(72vh,560px)] max-lg:landscape:min-h-[320px] bg-cover bg-[position:50%_18%] sm:bg-[position:48%_16%] md:bg-[position:50%_12%] max-lg:landscape:bg-[length:auto_100%] max-lg:landscape:bg-center lg:h-auto lg:min-h-0 lg:max-h-none lg:absolute lg:inset-0 lg:bg-cover lg:bg-[position:center_center]"
          aria-hidden
        />

        {/* Desktop Gradient Overlay (hidden on mobile) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-neutral-950/40 to-neutral-950/90 pointer-events-none z-10" />

        {/* Content Container */}
        <div className="relative z-20 flex-1 flex flex-col justify-center lg:min-h-screen overflow-hidden lg:overflow-visible">

          {/* Mobile Ambient Glow Background (Behind the glass) */}
          <div className="absolute inset-0 lg:hidden bg-[#050505] z-0">
            <div className="absolute top-[5%] -left-[10%] w-[20rem] h-[20rem] bg-green-500/40 rounded-full blur-[80px]" />
            <div className="absolute top-[40%] right-[0%] w-[18rem] h-[18rem] bg-orange-500/40 rounded-full blur-[80px]" />
            <div className="absolute bottom-[5%] left-[15%] w-[22rem] h-[22rem] bg-[#c47731]/40 rounded-full blur-[90px]" />
          </div>

          {/* Frosted Black Glass Overlay (Mobile only) */}
          <div className="absolute inset-0 lg:hidden z-0 bg-black/30 backdrop-blur-[50px] border-t border-white/10" />

          {/* subtle top shadow on mobile to blend with the image above it */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent lg:hidden pointer-events-none z-10" />

          <div className="container-main relative z-20 h-full flex justify-end items-center py-12 lg:py-24 lg:m-0 lg:max-w-none lg:pr-[10%]">
            <div className="flex flex-col w-full lg:w-1/2 items-center text-center">
              <HeroVisitBadge />

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-white mb-6 mt-4 lg:mt-0">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-[#7B2FF7] to-[#E91E63] bg-clip-text text-transparent">
                  Anand
                </span>
                <br />
                <span className="text-white">Thakkar</span>
              </h1>

              <p className="text-xl sm:text-2xl text-neutral-200 leading-relaxed mb-4 font-medium">
                Software Developer · Fintech/SaaS
              </p>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8">
                Finance and technology are converging to reshape the global <br className="hidden lg:block" />
                economy. At that intersection, every line of code is an opportunity to <br className="hidden lg:block" />
                make financial access faster, smarter, and more human.
              </p>

              {/* Client component for interactive scroll buttons */}
              <HeroActions />

            </div>
          </div>
        </div>

        {/* Scroll indicator - hidden on mobile so it doesn't overlap the white background block */}
        <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-neutral-300 dark:text-neutral-600 motion-reduce:animate-none animate-bounce">
          <div className="w-5 h-8 rounded-full border border-neutral-300 dark:border-neutral-600 flex items-start justify-center pt-1">
            <div className="w-1 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600" />
          </div>
        </div>
      </section>

      {/* ======= ABOUT ======= */}
      <section id="about" className="py-8 sm:py-10 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-white/10">
        <div className="container-main">
          <SectionHeading
            accent="magenta"
            title="About Me"
            subtitle="Background, focus areas, and what I care about in software and finance."
          />
          <About />
        </div>
      </section>

      {/* ======= EXPERIENCE ======= */}
      <section id="experience" className="py-8 sm:py-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="container-main">
          <SectionHeading
            accent="violet"
            title="Work Experience"
            subtitle="Roles and impact across fintech, SaaS, and cloud, where I’ve shipped and learned."
          />
          <Experience />
        </div>
      </section>

      {/* ======= AWARDS / CERTIFICATIONS ======= */}
      <section id="recognition" className="py-8 sm:py-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="container-main">
          <SectionHeading
            accent="magenta"
            title="Recognition"
            subtitle="Certifications and credentials that back how I build and ship."
          />
          <Awards />
        </div>
      </section>

      {/* ======= OPEN SOURCE ======= */}
      <section id="projects" className="py-8 sm:py-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="container-main">
          <SectionHeading
            accent="brand-rose"
            title="Open Source & Contributions"
            subtitle="Public repos I maintain, tools, experiments, and things others can fork or learn from."
          />
          <Contributions />
        </div>
      </section>

      {/* ======= BLOG ======= */}
      <section id="blog" className="py-8 sm:py-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="container-main">
          <SectionHeading
            accent="magenta"
            title="Blog"
            subtitle="Longer notes on engineering, systems, and building at the edge of finance and tech."
          />
          <BlogPosts limit={4} showLoadMore />
        </div>
      </section>

      {/* ======= FOOTER CTA ======= */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-900">
        <div className="container-main text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">Let&apos;s Shape What&apos;s Next</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto mb-8">
            The intersection of finance, AI, and software is evolving fast. If you&apos;re building something meaningful in that space, or just want to exchange ideas, let&apos;s connect.
          </p>
          <a
            href="mailto:anand.thakkar@outlook.com?subject=Hello%20Anand"
            className="btn-primary"
          >
            Let&apos;s Connect
          </a>
        </div>
      </section>
    </div>
  );
}
