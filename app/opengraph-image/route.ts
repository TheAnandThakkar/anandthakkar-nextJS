import { socialImageResponse } from "app/lib/social-image-response";

export const runtime = "nodejs";
export const revalidate = 86400;

export async function GET() {
  return socialImageResponse();
}
