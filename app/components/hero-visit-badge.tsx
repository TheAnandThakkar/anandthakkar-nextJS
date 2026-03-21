"use client";

import { VisitorCountLine } from "./visitor-count-line";

export { VISITOR_COUNT_SINCE_ISO, VISITOR_COUNT_SINCE_LABEL } from "./visitor-count-line";

/** Hero: same line as footer visitor counter, styled for dark hero image. */
export function HeroVisitBadge() {
  return <VisitorCountLine variant="hero" />;
}
