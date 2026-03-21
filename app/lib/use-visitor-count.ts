"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "anand_site_visitor_id";

let sessionFallbackId: string | null = null;

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    if (!sessionFallbackId) sessionFallbackId = crypto.randomUUID();
    return sessionFallbackId;
  }
}

type ApiResponse =
  | { count: number; configured: true }
  | { count: null; configured: false }
  | { count: null; configured: true; error: true }
  | { error: "visitorId required" };

export type VisitorCountState = {
  count: number | null;
  loading: boolean;
  configured: boolean;
};

let cached: VisitorCountState | null = null;
let inflight: Promise<VisitorCountState> | null = null;

async function fetchVisitorCount(): Promise<VisitorCountState> {
  try {
    const visitorId = getOrCreateVisitorId();
    if (!visitorId) {
      return { count: null, loading: false, configured: false };
    }

    const res = await fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId }),
      cache: "no-store",
    });
    const data = (await res.json()) as ApiResponse;

    if ("error" in data && data.error === "visitorId required") {
      return { count: null, loading: false, configured: false };
    }
    if (!("configured" in data)) {
      return { count: null, loading: false, configured: false };
    }
    if (!data.configured || data.count == null) {
      return { count: null, loading: false, configured: false };
    }
    if ("error" in data && data.error === true) {
      return { count: null, loading: false, configured: true };
    }
    return { count: data.count, loading: false, configured: true };
  } catch {
    return { count: null, loading: false, configured: false };
  }
}

/**
 * Live visit total from `/api/visitors` (Upstash Redis).
 * Vercel Analytics does not expose page-view totals via API — this is the on-site counter only.
 * Fetch is deduped across hero + footer.
 */
export function useVisitorCount(): VisitorCountState {
  const [state, setState] = useState<VisitorCountState>(
    () => cached ?? { count: null, loading: true, configured: false }
  );

  useEffect(() => {
    if (cached) {
      setState(cached);
      return;
    }
    if (!inflight) {
      inflight = fetchVisitorCount()
        .then((s) => {
          cached = s;
          inflight = null;
          return s;
        })
        .catch(() => {
          inflight = null;
          const fallback: VisitorCountState = { count: null, loading: false, configured: false };
          cached = fallback;
          return fallback;
        });
    }
    inflight.then((s) => setState(s));
  }, []);

  return state;
}
