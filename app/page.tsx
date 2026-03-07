import Image from "next/image";
import { BlogPosts } from "app/components/posts";
import { Contributions } from "./components/contributions";
import { Awards } from "./components/awards";
import { Experience } from "./components/experience";
import SocialPreviewCard from "./components/social-preview";
import { HeroActions } from "./components/hero-actions";

export const revalidate = 86400;

export default function Page() {
  return (
    <div className="relative">

      {/* ======= HERO ======= */}
      <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-white dark:bg-neutral-950">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-teal/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-indigo/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-teal/5 blur-3xl" />
        </div>

        <div className="container-main relative z-10 pt-28 pb-24">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
            {/* Text content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-neutral-900 dark:text-white mb-6">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-[#7B2FF7] to-[#E91E63] bg-clip-text text-transparent">
                  Anand
                </span>
                <br />
                <span className="text-neutral-800 dark:text-white/90">Thakkar</span>
              </h1>

              <p className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed mb-4 mx-auto lg:mx-0 font-medium">
                Software Developer · Fintech/SaaS
              </p>
              <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0">
                Finance and technology are converging to reshape the global economy. At that intersection, every line of code is an opportunity to make financial access faster, smarter, and more human.
              </p>

              {/* Client component for interactive scroll buttons */}
              <HeroActions />

              {/* Removed skill pills */}
            </div>

            {/* Photo */}
            <div className="shrink-0 flex flex-col items-center gap-6">
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 shadow-2xl rounded-full overflow-hidden border-4 border-white dark:border-neutral-900">
                {/* Photo */}
                <Image
                  src="/headshot.jpg"
                  alt="Photo of Anand Thakkar"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-300 dark:text-neutral-600 animate-bounce">
          <div className="w-5 h-8 rounded-full border border-neutral-300 dark:border-neutral-600 flex items-start justify-center pt-1">
            <div className="w-1 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600" />
          </div>
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
      <section id="about" className="py-8 sm:py-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="container-main">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-teal" />
            <h2 className="section-title">Awards &amp; Certifications</h2>
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
