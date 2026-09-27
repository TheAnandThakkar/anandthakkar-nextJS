/** Client-safe date formatting (no Node `fs`). Shared with `app/blog/utils.ts`. */

// One formatter instance instead of building locale data on every call.
const FULL_DATE = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function parse(date: string) {
  // Date-only strings are parsed as local midnight so server and client agree
  // on the calendar day.
  return new Date(date.includes("T") ? date : `${date}T00:00:00`);
}

function relative(target: Date, now = new Date()) {
  const days = Math.floor((now.getTime() - target.getTime()) / 86_400_000);
  if (days < 1) return "Today";
  if (days < 30) return `${days}d ago`;
  const months =
    (now.getFullYear() - target.getFullYear()) * 12 +
    (now.getMonth() - target.getMonth());
  if (months < 12) return `${Math.max(months, 1)}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function formatDate(date: string, includeRelative = false) {
  const target = parse(date);
  const fullDate = FULL_DATE.format(target);
  return includeRelative ? `${fullDate} (${relative(target)})` : fullDate;
}
