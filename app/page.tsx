import Image from "next/image";
import { BlogPosts } from "app/components/posts";
import { Contributions } from "./components/contributions";
import { Awards } from "./components/awards";
import { Experience } from "./components/experience";
import SocialPreviewCard from "./components/social-preview";
import { HeroActions } from "./components/hero-actions";
import { About } from "./components/about";

export const revalidate = 86400;

export default function Page() {
  return (
    <div className="relative">

      {/* ======= HERO ======= */}
      <section id="home" className="relative lg:min-h-screen flex flex-col lg:block overflow-hidden">

        {/* Background Image Container */}
        {/* On mobile, this occupies the top 55vh, on desktop it covers the whole screen */}
        <div className="w-full h-[55vh] lg:h-auto lg:absolute lg:inset-0 bg-[url('/anand_thakkar_bg.png')] bg-cover bg-[position:40%_top] lg:bg-[position:center_center] bg-no-repeat z-0" />

        {/* Desktop Gradient Overlay (hidden on mobile) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-neutral-950/40 to-neutral-950/90 pointer-events-none z-10" />

        {/* Content Container */}
        <div className="relative z-20 flex-1 flex flex-col justify-center bg-gradient-to-b from-[#111] to-black lg:bg-none lg:bg-transparent lg:min-h-screen">
          {/* subtle top shadow on mobile to blend the dark gradient with the image above it */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent lg:hidden pointer-events-none" />

          <div className="container-main relative z-20 h-full flex justify-end items-center py-12 lg:py-24 lg:m-0 lg:max-w-none lg:pr-[10%]">
            <div className="flex flex-col w-full lg:w-1/2 items-center text-center">

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-white mb-6 mt-4 lg:mt-0">
                Hi, I'm{" "}
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
        <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-neutral-300 dark:text-neutral-600 animate-bounce">
          <div className="w-5 h-8 rounded-full border border-neutral-300 dark:border-neutral-600 flex items-start justify-center pt-1">
            <div className="w-1 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600" />
          </div>
        </div>
      </section>

      {/* ======= ABOUT ======= */}
      <section id="about" className="py-8 sm:py-10 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-white/10">
        <div className="container-main">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-[#E91E63]" />
            <h2 className="section-title">About Me</h2>
          </div>
          <About />
        </div>
      </section>

      {/* ======= EXPERIENCE ======= */}
      <section id="experience" className="py-8 sm:py-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="container-main">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-gold" />
            <h2 className="section-title">Work Experience</h2>
          </div>
          <Experience />
        </div>
      </section>

      {/* ======= AWARDS / CERTIFICATIONS ======= */}
      <section id="recognition" className="py-8 sm:py-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="container-main">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-teal" />
            <h2 className="section-title">Recognition</h2>
          </div>
          <Awards />
        </div>
      </section>

      {/* ======= OPEN SOURCE ======= */}
      <section id="projects" className="py-8 sm:py-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="container-main">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-indigo" />
            <h2 className="section-title">Open Source &amp; Contributions</h2>
          </div>
          <Contributions />
        </div>
      </section>

      {/* ======= BLOG ======= */}
      <section id="blog" className="py-8 sm:py-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="container-main">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-teal" />
            <h2 className="section-title">Blog</h2>
          </div>
          <BlogPosts />
        </div>
      </section>

      {/* ======= FOOTER CTA ======= */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-900">
        <div className="container-main text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">Let's Shape What's Next</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto mb-8">
            The intersection of finance, AI, and software is evolving fast. If you're building something meaningful in that space — or just want to exchange ideas — let's connect.
          </p>
          <a
            href="mailto:anand.thakkar@outlook.com?subject=Hello%20Anand"
            className="btn-primary"
          >
            Let's Connect
          </a>
        </div>
      </section>
    </div>
  );
}
