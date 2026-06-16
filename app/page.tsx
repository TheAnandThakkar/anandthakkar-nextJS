import { BlogPosts } from "app/components/posts";
import { HeroActions } from "./components/hero-actions";
import { HeroVisitBadge } from "./components/hero-visit-badge";
import { About } from "./components/about";
import { Journey } from "./components/journey";
import { Philosophy } from "./components/philosophy";
import { Now } from "./components/now";
import { Moments } from "./components/moments";
import { Subscribe } from "./components/subscribe";
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
        <div
          className="pointer-events-none z-0 w-full overflow-hidden bg-[url('/anand_thakkar_bg.webp')] bg-no-repeat h-[40vh] min-h-[240px] sm:h-[48vh] sm:min-h-[280px] md:min-h-[300px] max-lg:landscape:h-[min(72vh,560px)] max-lg:landscape:min-h-[320px] bg-cover bg-[position:50%_18%] sm:bg-[position:48%_16%] md:bg-[position:50%_12%] max-lg:landscape:bg-[length:auto_100%] max-lg:landscape:bg-center lg:h-auto lg:min-h-0 lg:max-h-none lg:absolute lg:inset-0 lg:bg-cover lg:bg-[position:center_center]"
          aria-hidden
        />

        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-neutral-950/40 to-neutral-950/90 pointer-events-none z-10" />

        <div className="relative z-20 flex-1 flex flex-col justify-center lg:min-h-screen overflow-hidden lg:overflow-visible">

          <div className="absolute inset-0 lg:hidden bg-[#050505] z-0">
            <div className="absolute top-[5%] -left-[10%] w-[20rem] h-[20rem] bg-green-500/40 rounded-full blur-[80px]" />
            <div className="absolute top-[40%] right-[0%] w-[18rem] h-[18rem] bg-orange-500/40 rounded-full blur-[80px]" />
            <div className="absolute bottom-[5%] left-[15%] w-[22rem] h-[22rem] bg-[#c47731]/40 rounded-full blur-[90px]" />
          </div>

          <div className="absolute inset-0 lg:hidden z-0 bg-black/30 backdrop-blur-[50px] border-t border-white/10" />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent lg:hidden pointer-events-none z-10" />

          <div className="container-main relative z-20 h-full flex justify-center lg:justify-end items-center py-8 sm:py-10 lg:py-24 lg:m-0 lg:max-w-none lg:pr-[10%]">
            <div className="flex min-w-0 max-w-full flex-col w-full lg:w-1/2 items-center text-center">
              <HeroVisitBadge />

              <h1
                aria-label="Hi, I'm Anand Thakkar"
                className="max-w-full text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-white mb-4 sm:mb-6 mt-3 lg:mt-0"
              >
                Hi, I&apos;m{" "}
                <br className="sm:hidden" />
                <span className="bg-gradient-to-r from-[#7B2FF7] to-[#E91E63] bg-clip-text text-transparent">
                  Anand
                </span>
                {" "}
                <br />
                <span className="text-white">Thakkar</span>
              </h1>

              <p className="max-w-full text-lg sm:text-2xl text-neutral-200 leading-relaxed mb-3 sm:mb-4 font-medium">
                <span className="inline-block">Builder</span>
                <span className="mx-1">·</span>
                <span className="inline-block">Finance × Tech</span>
              </p>

              <p className="max-w-full px-2 sm:px-0 text-sm sm:text-lg text-neutral-300 leading-relaxed mb-5 sm:mb-8">
                I spent eight years inside India&apos;s financial system. <br className="hidden lg:block" />
                Then I started writing code. Now I live at the intersection of both. <br className="hidden lg:block" />
                This is where I write about everything I find there.
              </p>

              <HeroActions />

            </div>
          </div>
        </div>

        <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-neutral-300 dark:text-neutral-600 motion-reduce:animate-none animate-bounce">
          <div className="w-5 h-8 rounded-full border border-neutral-300 dark:border-neutral-600 flex items-start justify-center pt-1">
            <div className="w-1 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600" />
          </div>
        </div>
      </section>

      {/* ======= ABOUT ======= */}
      <section id="about" className="scroll-mt-12 py-8 sm:py-10 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-white/10">
        <div className="container-main">
          <SectionHeading
            accent="magenta"
            title="About"
            subtitle="Who I am and how I got here."
          />
          <About />
        </div>
      </section>

      {/* ======= NOW ======= */}
      <section id="now" className="scroll-mt-12 py-8 sm:py-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="container-main">
          <SectionHeading
            accent="violet"
            title="Now"
            subtitle="What I'm doing, building, and thinking about at this moment."
          />
          <Now />
        </div>
      </section>

      {/* ======= JOURNEY ======= */}
      <section id="journey" className="scroll-mt-12 py-8 sm:py-10 bg-white dark:bg-neutral-900">
        <div className="container-main">
          <SectionHeading
            accent="magenta"
            title="The Journey"
            subtitle="Where I've been and how each chapter shaped the next."
          />
          <Journey />
        </div>
      </section>

      {/* ======= MOMENTS ======= */}
      <section id="moments" className="scroll-mt-12 py-8 sm:py-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="container-main">
          <SectionHeading
            accent="magenta"
            title="Moments"
            subtitle="Glimpses from the journey, on and off the screen."
          />
          <Moments />
        </div>
      </section>

      {/* ======= PHILOSOPHY ======= */}
      <section id="philosophy" className="scroll-mt-12 py-8 sm:py-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="container-main">
          <SectionHeading
            accent="violet"
            title="Things I Believe"
            subtitle="The ideas that shape how I think, build, and write."
          />
          <Philosophy />
        </div>
      </section>

      {/* ======= BLOG ======= */}
      <section id="blog" className="scroll-mt-12 py-8 sm:py-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="container-main">
          <SectionHeading
            accent="violet"
            title="Writing"
            subtitle="Long-form thoughts on finance, technology, and what happens when the two collide."
          />
          <BlogPosts limit={4} showLoadMore />
        </div>
      </section>

      {/* ======= SUBSCRIBE ======= */}
      <section id="subscribe" className="scroll-mt-12 py-12 sm:py-16 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
        <div className="container-main text-center">
          <h2 className="section-title mb-2">Follow the Journey</h2>
          <p className="section-subtitle mx-auto mb-8">When I write something worth reading, I&apos;ll send it your way.</p>
          <Subscribe />
        </div>
      </section>

      {/* ======= FOOTER CTA ======= */}
      <section id="contact" className="scroll-mt-12 py-16 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-900">
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
