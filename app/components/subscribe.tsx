"use client";

import { useState } from "react";

type State = "idle" | "loading" | "success" | "error";

export function Subscribe() {
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
        setErrorMsg(data.error ?? "Something went wrong.");
        setState("error");
        return;
      }

      setState("success");
      setEmail("");
    } catch {
      setErrorMsg("Could not connect. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="max-w-2xl mx-auto text-center py-6">
        <p className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
          You&apos;re in. Welcome.
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          I&apos;ll write when I have something worth saying. No noise, no newsletters for the sake of it.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 mb-6 text-center">
        I write about finance, technology, and what happens when the two collide.
        From someone who has lived on both sides of that line. No schedule, no filler. Only when it matters.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta/50 transition"
          disabled={state === "loading"}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="shrink-0 rounded-xl bg-magenta px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-magenta/90 hover:shadow-md hover:shadow-magenta/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state === "loading" ? "Subscribing..." : "Follow the journey"}
        </button>
      </form>
      {state === "error" && (
        <p className="mt-3 text-sm text-red-500 dark:text-red-400 text-center">{errorMsg}</p>
      )}
      <p className="mt-3 text-xs text-neutral-400 dark:text-neutral-600 text-center">
        No spam. Unsubscribe any time.
      </p>
    </div>
  );
}
