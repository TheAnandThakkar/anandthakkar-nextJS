"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SUBSCRIBED_KEY, useSubscribe } from "app/lib/use-subscribe";

const SESSION_KEY = "subscribe-popup-shown";
/** Show once the reader is this far through the page... */
const SCROLL_TRIGGER = 0.5;
/** ...or after this long on the page, whichever comes first. */
const TIME_TRIGGER_MS = 25_000;

export function SubscribePopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { email, setEmail, state, errorMsg, handleSubmit } = useSubscribe();

  useEffect(() => {
    // Skip on the dedicated subscribe page, for subscribers, and if already
    // shown this browser session (fresh visits get it again).
    if (pathname === "/subscribe") return;
    try {
      if (localStorage.getItem(SUBSCRIBED_KEY)) return;
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      cleanup();
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
      setOpen(true);
    };

    let frame = 0;
    const check = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= SCROLL_TRIGGER) show();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    const timer = setTimeout(show, TIME_TRIGGER_MS);
    window.addEventListener("scroll", onScroll, { passive: true });

    function cleanup() {
      clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Auto-close after a successful signup; cleared if the popup unmounts first.
  useEffect(() => {
    if (state !== "success") return;
    const t = setTimeout(() => setOpen(false), 2600);
    return () => clearTimeout(t);
  }, [state]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Subscribe to Anand Thakkar"
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm sm:items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 sm:p-8"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        >
          &times;
        </button>

        {state === "success" ? (
          <div className="py-6 text-center">
            <p className="mb-2 text-xl font-bold text-neutral-900 dark:text-white">
              You&apos;re in. Welcome. 🎉
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Check your inbox for a hello from me.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center gap-4">
              <Image
                src="/headshot.jpg"
                alt="Anand Thakkar"
                width={56}
                height={56}
                className="rounded-full border-2 border-magenta/20 object-cover"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-magenta">
                  Newsletter
                </p>
                <h2 className="text-lg font-bold leading-tight text-neutral-900 dark:text-white">
                  Subscribe to Anand Thakkar
                </h2>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Finance, technology, and what happens when the two collide.
              Milestones and honest lessons from the journey, straight to your
              inbox. No spam, unsubscribe any time.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                name="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-magenta/50 focus:ring-2 focus:ring-magenta/30 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-600"
                disabled={state === "loading"}
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="w-full rounded-xl bg-magenta px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-magenta/90 hover:shadow-md hover:shadow-magenta/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {state === "loading" ? "Subscribing..." : "Follow the journey"}
              </button>
            </form>
            {state === "error" && (
              <p className="mt-3 text-center text-sm text-red-500 dark:text-red-400">
                {errorMsg}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
