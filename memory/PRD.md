# PRD — Dr. B Harsha Vardhana Reddy (Apollo Hospitals) Website

## Original Problem Statement
Build a comprehensive, SEO-optimized website for Dr. B Harsha Vardhana Reddy, Senior Orthopedic Surgeon at Apollo Hospitals, Financial District, Hyderabad. The site must rank quickly on Google for orthopedic queries (knee/ACL/joint replacement, robotic surgery, sports injuries, location-based keywords for Hyderabad).

## CRITICAL Architectural Pivot (locked in)
User explicitly chose to **drop the backend and database** and migrate to a **fully static Next.js 14 (App Router) frontend** to maximize Google indexing speed via Vercel. ALL forms and chat widgets must route to a single WhatsApp deep-link button (`+91 99599 64567`).

## Tech Stack (final)
- **Next.js 14 App Router** (static + SSG, 154 prerendered pages)
- **Tailwind CSS** + custom design tokens
- **lucide-react** icons, **framer-motion** animations
- **No backend, no database** — all CMS content lives in `/app/frontend/lib/data.js` and SEO page slug files
- **Vercel** as deployment target
- **WhatsApp** deep-link as the single contact channel (`https://wa.me/919959964567`)

## Repository Layout
```
/app
├── frontend/                  # Next.js 14 app (was /app/nextjs, now the active workspace)
│   ├── app/                   # App Router pages
│   ├── components/            # Header, Footer, WhatsAppButton
│   ├── lib/                   # data.js, seoData.js, locationPages*, moreSEOPages, etc.
│   ├── public/
│   ├── next.config.js
│   └── package.json
├── _archive_old/              # OBSOLETE — old React + FastAPI + MongoDB stack archived here
│   ├── frontend_react/
│   └── backend_fastapi/
├── memory/PRD.md              # This file
├── CONTENT_AUTHORING_GUIDE.md # How to add new conditions/treatments/blogs without a backend
└── test_reports/              # iteration_16.json (latest, frontend-only)
```

## Current Status (Feb 2026)
- ✅ Next.js static migration complete — 154 static pages generated, build clean (no warnings)
- ✅ Supervisor swapped: `frontend` service now runs `next start -p 3000` on `/app/frontend`; backend service intentionally STOPPED
- ✅ Old React + FastAPI code archived to `/app/_archive_old/`
- ✅ All contact CTAs route to WhatsApp (`wa.me/919959964567`)
- ✅ Floating WhatsApp button on every page (`data-testid="whatsapp-float-btn"`)
- ✅ Header inline WhatsApp CTA (`data-testid="whatsapp-inline-btn"`) + tel link
- ✅ `/sitemap.xml` and `/robots.txt` generated dynamically by Next.js
- ✅ Frontend testing agent: **29/29 tests passed (100%)**
- ✅ Content authoring guide written at `/app/CONTENT_AUTHORING_GUIDE.md`

## Routes (sample)
- `/` (homepage), `/about`, `/contact`, `/testimonials`, `/gallery`, `/blog`
- `/conditions`, `/conditions/[slug]` (39 condition pages)
- `/treatments`, `/treatments/[slug]` (20 treatment pages)
- `/blog/[slug]` (27 blog posts)
- `/[slug]` — 55+ SEO landing pages (location + procedure + condition combinations)
- `/sitemap.xml`, `/robots.txt`

## P0 — Done (this session)
- [x] Migrate /app/nextjs → /app/frontend so supervisor's `yarn start` runs Next.js on port 3000
- [x] Archive old React + FastAPI to `/app/_archive_old/`
- [x] Fix broken re-exports in `lib/seoData.js` (was hiding 41 SEO pages from build)
- [x] Run frontend testing agent (29/29 pass)
- [x] Add `data-testid="whatsapp-inline-btn"` per spec contract
- [x] Author CONTENT_AUTHORING_GUIDE.md

## P1 / Backlog
- [ ] User QA on the live preview URL — `https://dr-harsha-nextjs.preview.emergentagent.com`
- [ ] Push `/app/frontend` to GitHub and connect to Vercel for production deploy
- [ ] Resolve preview-only RSC prefetch console noise (likely auto-resolved on Vercel; verify post-deploy)
- [ ] Permanently delete `/app/_archive_old/` once Vercel deploy is confirmed working

## P2 / Future
- [ ] Add more SEO landing pages quarterly (just append to `lib/seoPages.js`, `moreSEOPages.js`, etc.)
- [ ] Add JSON-LD `MedicalBusiness` schema variants per location page for Local SEO
- [ ] Add Open Graph cover images per blog post (currently using a generic fallback)
- [ ] Connect Google Search Console + submit sitemap immediately after Vercel deploy

## Test Credentials
N/A — no auth, no database, no admin dashboard.

## Last Test Report
`/app/test_reports/iteration_16.json` — Frontend 100% (29/29). Two cosmetic items (1 fixed, 1 preview-ingress only).
