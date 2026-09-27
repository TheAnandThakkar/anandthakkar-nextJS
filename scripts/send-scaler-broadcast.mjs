// Sends the Scaler Spotlight announcement to every subscriber in your Resend
// audience, using Resend Broadcasts (unsubscribe handling is automatic).
//
// Usage (run from the project root, after deploying so the image is live):
//   node scripts/send-scaler-broadcast.mjs           # create draft + send now
//   node scripts/send-scaler-broadcast.mjs --draft   # create the broadcast only, review in the dashboard, send manually
//
// Requires RESEND_API_KEY and RESEND_AUDIENCE_ID in your environment
// (they are already in .env.local for this project).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Resend } from "resend";

const __dirname = dirname(fileURLToPath(import.meta.url));

const apiKey = process.env.RESEND_API_KEY;
const audienceId = process.env.RESEND_AUDIENCE_ID;

if (!apiKey || !audienceId) {
  console.error(
    "Missing RESEND_API_KEY or RESEND_AUDIENCE_ID. Load them first, e.g.:\n" +
      "  set -a && source .env.local && set +a && node scripts/send-scaler-broadcast.mjs"
  );
  process.exit(1);
}

const html = readFileSync(
  join(__dirname, "scaler-spotlight-broadcast.html"),
  "utf-8"
);

const draftOnly = process.argv.includes("--draft");

const resend = new Resend(apiKey);

const { data: broadcast, error: createError } = await resend.broadcasts.create({
  audienceId,
  from: "Anand Thakkar <hello@anandthakkar.com>",
  replyTo: "anand.thakkar@outlook.com",
  subject: "My name is on a trophy now",
  html,
});

if (createError) {
  console.error("Failed to create broadcast:", createError);
  process.exit(1);
}

console.log("Broadcast created:", broadcast.id);

if (draftOnly) {
  console.log(
    "Draft only. Open Resend → Broadcasts to review and send it manually."
  );
  process.exit(0);
}

const { error: sendError } = await resend.broadcasts.send(broadcast.id);

if (sendError) {
  console.error("Failed to send broadcast:", sendError);
  process.exit(1);
}

console.log("Sent to your audience. Done.");
