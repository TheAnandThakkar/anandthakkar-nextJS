import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const imagePath = path.join(process.cwd(), "public", "opengraph-image.jpg");

export async function socialImageResponse() {
  const image = await readFile(imagePath);

  return new NextResponse(image, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800",
    },
  });
}
