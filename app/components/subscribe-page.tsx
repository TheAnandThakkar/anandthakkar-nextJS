"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type State = "idle" | "loading" | "success" | "error";

export function SubscribePage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setErrorMsg("Could not connect. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950 px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto mb-6 w-20 h-20 rounded-full overflow-hidden border-2 border-magenta/20 shadow-lg">
            <Image
              src="/headshot.jpg"
              alt="Anand Thakkar"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
            You&apos;re in. Welcome.
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-6">
            Check your inbox. I&apos;ve sent you a confirmation. I&apos;ll write when I have
            something worth saying. No noise, no filler.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-magenta hover:text-magenta/80 transition-colors"
          >
            ← Back to the site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">

      {/* Top bar */}
      <header className="border-b border-neutral-100 dark:border-neutral-900 py-4 px-6">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md overflow-hidden">
            <Image src="/favicon.ico" alt="" width={28} height={28} className="object-cover" />
          </div>
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
            anandthakkar.com
          </span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full">

          {/* Avatar */}
          <div className="mb-8 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-neutral-100 dark:border-neutral-800 shadow-md shrink-0">
              <Image
                src="/headshot.jpg"
                alt="Anand Thakkar"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="font-bold text-neutral-900 dark:text-white text-base">Anand Thakkar</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Builder · Finance × Tech</p>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4 leading-tight">
            Follow the journey.
          </h1>

          <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
            I spent eight years inside India&apos;s financial system. Then I started writing code.
            Now I live at the intersection of both, and I write about everything I find there.
          </p>

          <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 mb-8">
            When I have something worth saying, an idea, an observation, a story, you&apos;ll
            get it in your inbox. No schedule. No filler. Only when it matters.
          </p>

          {/* What to expect */}
          <div className="mb-8 space-y-3">
            {[
              "Finance and technology, from someone who's lived on both sides",
              "Honest writing about reinvention, systems, and what India's building",
              "No newsletters for the sake of it. Only when there's something real to say",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-magenta shrink-0" />
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{item}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-4 py-3.5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta/50 transition"
              disabled={state === "loading"}
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="w-full rounded-xl bg-magenta px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-magenta/90 hover:shadow-lg hover:shadow-magenta/20 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === "loading" ? "Subscribing..." : "Subscribe, it's free"}
            </button>
          </form>

          {state === "error" && (
            <p className="mt-3 text-sm text-red-500 dark:text-red-400">{errorMsg}</p>
          )}

          <p className="mt-4 text-xs text-neutral-400 dark:text-neutral-600 text-center">
            No spam, ever. Unsubscribe any time with one click.
          </p>
        </div>
      </main>
    </div>
  );
}
