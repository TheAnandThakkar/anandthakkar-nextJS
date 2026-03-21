"use client";

import { VisitorCountLine } from "./visitor-count-line";

/** Footer: same visitor line as hero (pulse + count + since date). */
export function VisitorCounter() {
  return <VisitorCountLine variant="footer" />;
}
