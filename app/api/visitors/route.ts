import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

/** Single counter key in Redis (one integer, not a relational DB). */
const VISITOR_KEY = "site:visitors:v1";

/** Per-browser anonymous id, prevents double-count on parallel requests / React Strict Mode. */
const DEDUPE_PREFIX = "visitor:dedupe:";

const DEDUPE_TTL_SEC = 60 * 60 * 24 * 365 * 10; // 10 years

function isRedisConfigured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function sanitizeVisitorId(raw: unknown): string | null {
  if (typeof raw !== "string" || raw.length < 8 || raw.length > 128) return null;
  if (!/^[a-zA-Z0-9-]+$/.test(raw)) return null;
  return raw;
}

export async function POST(request: Request) {
  if (!isRedisConfigured()) {
    return NextResponse.json({ count: null, configured: false as const });
  }

  let body: { visitorId?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    /* empty body */
  }

  const visitorId = sanitizeVisitorId(body.visitorId);
  if (!visitorId) {
    return NextResponse.json({ error: "visitorId required" as const }, { status: 400 });
  }

  const redis = Redis.fromEnv();

  try {
    const dedupeKey = `${DEDUPE_PREFIX}${visitorId}`;
    const firstTime = await redis.set(dedupeKey, "1", { nx: true, ex: DEDUPE_TTL_SEC });

    if (firstTime) {
      await redis.incr(VISITOR_KEY);
    }

    const raw = await redis.get<string | number>(VISITOR_KEY);
    const count =
      typeof raw === "number" ? raw : raw != null ? parseInt(String(raw), 10) || 0 : 0;

    return NextResponse.json({ count, configured: true as const });
  } catch (e) {
    console.error("[visitors]", e);
    return NextResponse.json({ count: null, configured: true as const, error: true as const }, { status: 500 });
  }
}

export async function GET() {
  if (!isRedisConfigured()) {
    return NextResponse.json({ count: null, configured: false as const });
  }

  try {
    const redis = Redis.fromEnv();
    const raw = await redis.get<string | number>(VISITOR_KEY);
    const count =
      typeof raw === "number" ? raw : raw != null ? parseInt(String(raw), 10) || 0 : 0;
    return NextResponse.json({ count, configured: true as const });
  } catch (e) {
    console.error("[visitors]", e);
    return NextResponse.json({ count: null, configured: true as const, error: true as const }, { status: 500 });
  }
}
