# PRD — Dr. B Harsha Vardhana Reddy (Apollo Hospitals) Website

## Original Problem Statement
Build a comprehensive, SEO-optimized website for Dr. B Harsha Vardhana Reddy, Senior Orthopedic Surgeon at Apollo Hospitals, Financial District, Hyderabad. The site must rank quickly on Google for orthopedic queries (knee/ACL/joint replacement, robotic surgery, sports injuries, location-based keywords for Hyderabad).

## CRITICAL Architectural Pivot (locked in)
User explicitly chose to **drop the backend and database** and migrate to a **fully static Next.js 14 (App Router) frontend** to maximize Google indexing speed via Vercel. ALL forms and chat widgets must route to a single WhatsApp deep-link button (`+91 99599 64567`).

## Tech Stack (final)
- **Next.js 14 App Router** (static + SSG, **188 prerendered pages**)
- **Tailwind CSS** + custom design tokens (sky/slate medical palette)
- **next/font Google** — Outfit (headings) + Plus Jakarta Sans (body)
- **lucide-react** icons, **framer-motion** ready
- **No backend, no database** — content lives in `/app/frontend/lib/data.js` and SEO page slug files
- **Vercel** as deployment target
- **WhatsApp** deep-link as the single contact channel (`https://wa.me/919959964567`)

## Design System (current — UI UX Pro Max overhaul, Feb 2026)
- **Palette**: slate-900 authority + sky-600 medical trust + #25D366 WhatsApp green CTA + slate-50 bone-white surface. No purple/AI gradients, no dark mode.
- **Type**: Outfit headings (semibold, tracking-tight) + Plus Jakarta Sans body (leading-relaxed). Editorial scale.
- **Motion**: hover translate-y(-0.5), scale 1.05, 300ms transitions; ping animation on WhatsApp float; ambient gradient blobs.
- **Layout**: asymmetric 7/5 hero, dark stats strip with negative-margin overlap, bento grid for "Why Choose", section-padding py-16 / md:py-24 / lg:py-28.
- **Components**: glass-blur sticky Header, slate-950 Footer with CTA strip, premium card-base + card-hover utilities, prose-medical for editorial article rendering.

## Repository Layout
```
/app
├── frontend/                  # Next.js 14 app (production)
│   ├── app/                   # App Router pages
│   ├── components/            # Header, Footer, WhatsAppButton
│   ├── lib/                   # data.js, seoData.js, locationPages*, moreSEOPages, extendedSEOPages
│   ├── public/
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── package.json
├── _archive_old/              # OBSOLETE — old React + FastAPI + MongoDB stack
├── memory/PRD.md              # This file
├── CONTENT_AUTHORING_GUIDE.md # How to add new conditions/treatments/blogs without a backend
├── design_guidelines.json     # UI UX Pro Max design system blueprint
└── test_reports/              # iteration_17.json (latest, 50/50 pass)
```

## Current Status (Feb 2026)
- ✅ Next.js static migration complete — 188 static pages
- ✅ UI/UX Pro Max premium redesign complete (Outfit + Plus Jakarta Sans, sky/slate palette)
- ✅ Vercel Root Directory issue diagnosed & fixed (`Root Directory = frontend`)
- ✅ All contact CTAs route to WhatsApp (`wa.me/919959964567`)
- ✅ Frontend testing agent (iter 17): **50/50 tests pass — 100%**
- ✅ Old React + FastAPI archived to `/app/_archive_old/`

## Routes (sample)
- `/` (homepage), `/about`, `/contact`, `/testimonials`, `/gallery`, `/blog`
- `/conditions`, `/conditions/[slug]` (39 condition pages)
- `/treatments`, `/treatments/[slug]` (20 treatment pages)
- `/blog/[slug]` (27 blog posts)
- `/[slug]` — 90+ SEO landing pages (location + procedure + condition + age-specific + cost + sports-injury combinations)
- `/sitemap.xml` (180+ URLs), `/robots.txt`

## P0 — Done
- [x] Next.js migration + supervisor swap (frontend → /app/frontend on port 3000)
- [x] Archive old React + FastAPI to `/app/_archive_old/`
- [x] Fix broken re-exports in `lib/seoData.js` (recovered 75+ silently-missing SEO pages)
- [x] Vercel Root Directory fix → site live, no more 404
- [x] UI UX Pro Max premium redesign with new design system
- [x] All `data-testid` contracts fulfilled (verified by testing agent)
- [x] Frontend regression: 50/50 pass

## P1 / Backlog
- [ ] User QA on the live Vercel URL
- [ ] After Vercel re-deploy with latest commits, submit `https://drharshaortho.com/sitemap.xml` to Google Search Console
- [ ] Bump `next` to 14.2.34+ to clear the security CVE in 14.2.18 (build log warning)
- [ ] Permanently delete `/app/_archive_old/` once Vercel deploy is confirmed stable
- [ ] Resolve preview-only RSC prefetch console noise (likely auto-resolved on Vercel; verify post-deploy)

## P2 / Future
- [ ] Add JSON-LD `MedicalBusiness` + `MedicalProcedure` schema variants per location/treatment page for Local SEO
- [ ] Add Open Graph cover images per blog post (currently using a generic fallback)
- [ ] IndexNow + Google URL Inspection API auto-ping on push (cron + GitHub Action)
- [ ] Quarterly SEO content additions via `lib/seoPages.js`, `moreSEOPages.js`

## Test Credentials
N/A — no auth, no database, no admin dashboard.

## Last Test Reports
- `/app/test_reports/iteration_16.json` — Pre-redesign baseline 29/29 pass
- `/app/test_reports/iteration_17.json` — Post-redesign + regression 50/50 pass
