/**
 * Generates a small WebP avatar for in-page use (nav/blog).
 * Run: node scripts/optimize-headshot.mjs
 * Requires: public/headshot.jpg
 */
import sharp from "sharp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const input = join(root, "public", "headshot.jpg");
const outWebp = join(root, "public", "headshot-avatar.webp");

async function main() {
  await sharp(input)
    .resize(256, 256, { fit: "cover", position: "attention" })
    .webp({ quality: 82, effort: 6 })
    .toFile(outWebp);

  console.log("Wrote", outWebp);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
