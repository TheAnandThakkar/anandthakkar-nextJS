"use client";

import { useCallback, useState } from "react";
import { EMAIL_RE } from "app/lib/site";

/** localStorage flag the popup checks so subscribers are never re-prompted. */
export const SUBSCRIBED_KEY = "subscribed";

export type SubscribeState = "idle" | "loading" | "success" | "error";

/**
 * Shared submit logic for the inline subscribe form and the popup.
 * Validates client-side first so obviously bad input never hits the API.
 */
export function useSubscribe() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubscribeState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = email.trim();
      if (!EMAIL_RE.test(trimmed)) {
        setErrorMsg("Please enter a valid email address.");
        setState("error");
        return;
      }

      setState("loading");
      setErrorMsg("");

      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed }),
        });
        // A proxy/edge error page may not be JSON; don't let that mask the status.
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setErrorMsg(data.error ?? "Something went wrong.");
          setState("error");
          return;
        }

        setState("success");
        setEmail("");
        // Covers both the inline form and the popup, so signing up inline
        // also stops the popup from appearing later.
        try {
          localStorage.setItem(SUBSCRIBED_KEY, "1");
        } catch {}
      } catch {
        setErrorMsg("Could not connect. Please try again.");
        setState("error");
      }
    },
    [email]
  );

  return { email, setEmail, state, errorMsg, handleSubmit };
}
