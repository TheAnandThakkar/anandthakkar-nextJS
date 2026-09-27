import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

/** Single counter key in Redis (one integer, not a relational DB). */
const VISITOR_KEY = "site:visitors:v1";

/** Per-browser anonymous id, prevents double-count on parallel requests / React Strict Mode. */
const DEDUPE_PREFIX = "visitor:dedupe:";

const DEDUPE_TTL_SEC = 60 * 60 * 24 * 365 * 10; // 10 years

const VISITOR_ID_RE = /^[a-zA-Z0-9-]{8,128}$/;

// One client per server instance, created on first use (reused across warm invocations).
let redisClient: Redis | null = null;

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  redisClient ??= Redis.fromEnv();
  return redisClient;
}

function sanitizeVisitorId(raw: unknown): string | null {
  return typeof raw === "string" && VISITOR_ID_RE.test(raw) ? raw : null;
}

function toCount(raw: unknown): number {
  if (typeof raw === "number") return raw;
  return raw != null ? parseInt(String(raw), 10) || 0 : 0;
}

const notConfigured = () => NextResponse.json({ count: null, configured: false as const });

const failed = (e: unknown) => {
  console.error("[visitors]", e);
  return NextResponse.json(
    { count: null, configured: true as const, error: true as const },
    { status: 500 }
  );
};

export async function POST(request: Request) {
  const redis = getRedis();
  if (!redis) return notConfigured();

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

  try {
    // Dedupe check and current total in ONE round trip. Returning visitors
    // (the common case) are done after this; first-timers need one more INCR,
    // whose return value is the new total, so no extra GET is needed.
    const [firstTime, current] = await redis
      .pipeline()
      .set(`${DEDUPE_PREFIX}${visitorId}`, "1", { nx: true, ex: DEDUPE_TTL_SEC })
      .get<string | number>(VISITOR_KEY)
      .exec<[string | null, string | number | null]>();

    const count = firstTime ? await redis.incr(VISITOR_KEY) : toCount(current);

    return NextResponse.json({ count, configured: true as const });
  } catch (e) {
    return failed(e);
  }
}

export async function GET() {
  const redis = getRedis();
  if (!redis) return notConfigured();

  try {
    const count = toCount(await redis.get<string | number>(VISITOR_KEY));
    return NextResponse.json({ count, configured: true as const });
  } catch (e) {
    return failed(e);
  }
}
