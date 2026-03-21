# Build your portfolio in minutes — clone, customize, deploy. Free & open-source.

> Modern Next.js + Tailwind. One-click deploy on Vercel. Fully customizable.

This is the source for my personal website, **[anandthakkar.com](https://www.anandthakkar.com/)** — a modern, fast, Next.js portfolio you can clone and make your own.

> If you have ideas, feature requests, or optimizations (UX, accessibility, performance, content, code), **please open an issue or PR** — I’d love your feedback! 🙌  
> **Special thanks** to **[Vercel](https://vercel.com/)** for providing blazing-fast, free hosting for this portfolio.

---

## ✨ What’s inside

- **Next.js 15** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS** (clean, accessible UI with light/dark mode)
- SEO best-practices (metadata, OpenGraph/Twitter, JSON-LD)
- Sections for **Awards/Certifications**, **Open-Source & Contributions**, **Experience**, **Blog**
- Optional **QR vCard** component to save contact info quickly

---

## 🔗 Follow & support

If you like this project:

- **⭐️ Star the repo** to help others discover it
- **Follow me** for updates & new projects:
  - GitHub: [@TheAnandThakkar](https://github.com/TheAnandThakkar)
  - LinkedIn: [/in/theanandthakkar](https://www.linkedin.com/in/theanandthakkar/)
  - X (Twitter): [@TheAnandThakkar](https://x.com/TheAnandThakkar)

---

## 🧭 Live site

- **Production:** https://www.anandthakkar.com/

---

## 📦 Getting started (clone my repo)

> Requires **Node 20+** (LTS recommended) and **npm** (or **pnpm**/**yarn**).

```bash
# 1) Clone this repository
git clone https://github.com/TheAnandThakkar/anandthakkar.git
cd anandthakkar

# 2) Install dependencies
npm install
# (or) pnpm install
# (or) yarn

# 3) Run locally
npm run dev
# open http://localhost:3000

# 4) Build for production (optional)
npm run build
npm run start

# Lint (same as CI)
npm run lint

# Regenerate small WebP avatar from public/headshot.jpg (optional)
npm run optimize-images
```

**Environment variables?**  
For most use-cases, none are required. Copy `.env.example` to `.env.local` if you use optional features.

### Visitor counter (optional)

The footer can show **total visits** using [Upstash Redis](https://upstash.com/) (serverless key-value over HTTPS — no traditional database). Without these vars, the counter is hidden.

1. Create a free **Redis** database on Upstash and copy **REST URL** + **REST TOKEN**.
2. Put them in **`.env.local`** (not `.env.example` — Next.js never loads that file). Variable names:

   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

3. Restart `npm run dev`. For **Vercel production**, add the same variables under **Project → Settings → Environment Variables**, then redeploy.
4. Each **new browser** gets a random id in `localStorage`; the API increments the global count **once per id** (idempotent, safe with React Strict Mode).

**Vercel Web Analytics** (`@vercel/analytics`) does **not** expose visit totals through any public API — those numbers stay in the Vercel dashboard. The **hero** and **footer** “Visits” numbers use this same Redis counter only (they share one request).

---

## 🍴 Make your own copy (fork → personalize → deploy)

1. **Fork** this repository: https://github.com/TheAnandThakkar/anandthakkar
2. **Clone your fork**:
   ```bash
   git clone https://github.com/<your-username>/<your-fork-name>.git
   cd <your-fork-name>
   npm install
   npm run dev
   ```
3. **Personalize**:
   - Replace **headshot**, **resume**, and **social links**.
   - Edit hero/summary text in `app/page.tsx`.
   - Update data lists in `app/data/*` (experience, awards, contributions).
   - Add or update blog posts in `app/blog/*` (depending on your setup).
   - Swap the OG preview image at `/public/preview-image.png`.
4. **Commit & push**:
   ```bash
   git add .
   git commit -m "Personalize portfolio"
   git push origin main
   ```

---

## 🚀 Deploy to Vercel (recommended)

### Option A — One-click via dashboard

1. Go to **https://vercel.com/new** and pick your **forked** repo.
2. Framework should auto-detect **Next.js**. Keep defaults.
3. Click **Deploy**.
4. Add a custom domain if you want (e.g., `yourname.com`).

### Option B — From CLI

```bash
npm i -g vercel

vercel
# follow prompts (link project, select scope, prod deploy)
```

**Post-deploy checks**:

- Visit your site URL to verify pages
- Test social share preview (paste URL on LinkedIn/X)
- If you include a vCard: confirm `/anand.vcf` downloads

---

## 🧩 How to contribute & make a PR

I welcome contributions of all sizes — from typo fixes to new components. Here’s the quickest path to a great PR:

### 1) Fork & clone

```bash
# Fork on GitHub (top-right button), then:
git clone https://github.com/<your-username>/<your-fork-name>.git
cd <your-fork-name>
npm install
```

### 2) Create a feature branch

```bash
# Use a descriptive branch name
git checkout -b feat/case-study-card    # new feature
# or
git checkout -b fix/typo-blog-title     # small fix
```

### 3) Make your changes

- Keep the UI consistent (rounded-2xl, soft rings, accessible focus states)
- Prefer server components where possible; keep client components minimal
- Follow existing file structure under `app/`

### 4) Run locally & verify

```bash
npm run dev
# open http://localhost:3000 and test the changed pages/components
```

### 5) Commit with a clear message

```bash
git add .
git commit -m "feat(case-studies): add case study card with metrics and CTAs"
```

### 6) Push & open the PR

```bash
git push origin feat/case-study-card
```

- Open a PR from your branch to this repo’s **main**:  
  https://github.com/TheAnandThakkar/anandthakkar/compare
- Describe **what changed**, **why**, and add **screenshots/GIFs** for UI.
- Link any related issues (e.g., `Closes #123`).

### 7) PR checklist (speeds up review)

- [ ] Builds locally (`npm run build`) without type errors
- [ ] No obvious console errors/warnings
- [ ] Accessible (labels, alt text, focus rings)
- [ ] Mobile/desktop screenshots included for UI changes
- [ ] Small, focused scope — larger ideas are great too, but split if possible

---

## 🧱 Common customizations

- **Branding & colors** — tweak Tailwind classes or extend Tailwind config
- **Icons** — use `react-icons` (fa6/io5) or inline SVG
- **Analytics** — add Vercel Analytics or your provider
- **Blog** — add MD/MDX posts as needed
- **QR vCard** — provide an `/anand.vcf` in `/public` and a QR image if desired

---

## 📣 Community & contact

Questions, feedback, or collaboration?

- Email: **anand.thakkar@outlook.com**
- Issues: open a ticket on this repo — https://github.com/TheAnandThakkar/anandthakkar/issues

If this project helped you, **please star it** and **share it**. It makes a big difference for discoverability. 🙏

---

## 📝 License

MIT — feel free to use this as a starting point for your own site. A credit link is appreciated but not required.

---

**Thanks again to [Vercel](https://vercel.com/) for free hosting** and a smooth DX for Next.js.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)