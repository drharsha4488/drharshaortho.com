# PRD — Dr. B Harsha Vardhana Reddy (Apollo Hospitals) Website

## Original Problem Statement
Build a comprehensive, SEO-optimized website for Dr. B Harsha Vardhana Reddy, Senior Consultant Orthopedic Surgeon at Apollo Hospitals, Financial District, Hyderabad. The site must rank quickly on Google for orthopedic queries (knee/ACL/joint replacement, sports injuries, location-based keywords for Hyderabad).

## Architectural Decision (locked in)
- **Fully static Next.js 14 (App Router)** — no backend, no database, deployed to Vercel
- All forms/chats route to **WhatsApp deep-link** (+91 99599 64567) — single conversion channel
- Content lives in plain JS files under `/app/frontend/lib/` so the user can edit and redeploy without a CMS

## Tech Stack
- Next.js 14 App Router (static + SSG, **2,052 prerendered pages**)
- Tailwind CSS + custom design tokens (sky-600 medical / slate-950 / #25D366 WhatsApp)
- next/font Google — Outfit (headings) + Plus Jakarta Sans (body)
- motion@12 — scroll-triggered fade-up animations
- lucide-react icons

## Design System (Feb 2026, UI UX Pro Max overhaul)
- Slate-900 authority + sky-600 medical trust + #25D366 WhatsApp green CTA
- Light-mode only — clinical, premium, mobile-first
- Editorial type scale (Outfit / Plus Jakarta Sans)
- Asymmetric 7/5 hero, dark stats strip with -mt-12 overlap, bento "why choose" grid
- Glass-blur sticky header, slate-950 footer with full-width CTA strip

## Repository Layout
```
/app
├── frontend/                  # Next.js 14 app (production)
│   ├── app/                   # App Router pages
│   ├── components/            # Header, Footer, WhatsAppButton, Reveal, RelatedLinks
│   ├── lib/                   # data.js, seoData.js, programmaticSEOPages.js, internalLinks.js, etc.
│   └── public/
├── _archive_old/              # OBSOLETE — old React + FastAPI + MongoDB
├── memory/PRD.md              # This file
├── CONTENT_AUTHORING_GUIDE.md # How to add new conditions/treatments/blogs without a CMS
├── design_guidelines.json     # UI UX Pro Max design blueprint
└── test_reports/              # iteration_17.json (latest)
```

## Routes — 992 total static pages
- Core: `/`, `/about`, `/contact`, `/testimonials`, `/gallery`, `/blog`
- 39 condition pages: `/conditions/[slug]`
- 20 treatment pages: `/treatments/[slug]`
- 27 blog posts: `/blog/[slug]`
- 90+ curated SEO landing pages: `/[slug]`
- **805 programmatic SEO landing pages**: 14 procedures × 12 locations × 4 modifiers (best/cost-of/top/in) + 12 conditions × 12 locations
- `/sitemap.xml` (989 URLs) + `/robots.txt`

## Real Bio (recovered from old archive — Feb 2026)
- **Name**: Dr. B Harsha Vardhana Reddy
- **Title**: Senior Consultant Orthopedic Surgeon at Apollo Hospitals, Financial District, Hyderabad
- **Education**: MBBS (2012, KVG Bangalore) → D.Ortho (2015, Dr. G.S. Kulkarni Institute Miraj) → Fellowship Arthroplasty (2016, Continental Hyderabad) → Fellowship Arthroscopy (2017, Continental Hyderabad) → DNB Orthopedics (2020, Continental Hyderabad) → MBA Hospital Admin (2020, ICFAI Business School)
- **Career**: 2022 — Himagiri Hospital Gachibowli · 2025 — Apollo Hospitals Financial District (Senior Consultant)
- **Stats**: 4,000+ surgeries · 2,000+ joint replacements · 1,500+ arthroscopies · 3,000+ trauma cases · 500+ regenerative · 95%+ success · 8,000+ patients · 15+ years
- **Memberships**: IOA, Telangana Orthopaedic Association, Indian Arthroscopy Society
- *(AgileOrtho Healthcare reference removed per user request)*

## Internal Linking Hub
Each programmatic page now has ~17 inbound/outbound internal links:
- Hub → Spokes: `/conditions/acl-tear` and `/treatments/total-knee-replacement` link to 12 location-specific programmatic pages
- Spoke → Siblings: `/best-knee-replacement-in-hyderabad` links to 8 other locations + 8 other procedures in same location
- Spoke → Hub: each programmatic page links back to canonical `/treatments/[slug]` or `/conditions/[slug]`
- Maps maintained in `/lib/internalLinks.js`

## Anti-Duplicate-Content Measures
- 4 rotating intro templates per procedure × 3 per condition (deterministic by slug-hash)
- 6 of 8 "Why Choose" benefits picked deterministically per page
- Unique title / meta / H1 / FAQ wording for every URL
- Real cost ranges, recovery times, location context — not lorem
- All FAQ blocks emit JSON-LD `FAQPage` schema for rich snippets

## Current Status
- ✅ Real bio restored across all pages (no fictional credentials)
- ✅ Premium UI/UX redesign with Outfit + Plus Jakarta Sans
- ✅ 805 programmatic SEO pages generated
- ✅ **Regional expansion (Jun 2026): Telangana + Andhra Pradesh cities** — programmatic SEO grown to 1,864 pages (site total 2,052). 20 regional cities (Warangal, Nizamabad, Karimnagar, Khammam, Mahbubnagar, Nalgonda, Siddipet, Suryapet, Adilabad + Vijayawada, Visakhapatnam, Guntur, Nellore, Kurnool, Rajahmundry, Kakinada, Tirupati, Anantapur, Kadapa, Ongole) with travel/teleconsult-focused content (WhatsApp reports before travel, single-trip planning, outstation support, distance context). Two-tier location model (metro = short-drive framing, regional = travel framing) in `lib/programmaticSEOPages.js`. Tier-aware renderer in `app/[slug]/page.js` (localContext section, dynamic location blurb, regional WhatsApp CTA, "Across Telangana & Andhra Pradesh" related links). Physician JSON-LD `areaServed` = Telangana + AP.
- ✅ Removed stale `public/sitemap.xml` + `public/robots.txt` that shadowed dynamic routes — `/sitemap.xml` now serves all 2,049 URLs incl. regional pages.
- ✅ Internal linking hub wired
- ✅ Vercel `Root Directory = frontend` documented
- ✅ Build clean — 2,052 static pages, 0 errors
- ⏳ User QA pending on live preview / Vercel deploy

## P1 / Backlog
- [ ] User QA on Emergent preview & after Vercel redeploy
- [ ] Bump `next` 14.2.18 → 14.2.34+ (security CVE)
- [ ] Submit `https://drharshaortho.com/sitemap.xml` to Google Search Console
- [ ] Watch GSC "Pages indexed" — if any programmatic pages get filtered as "thin", harden body copy
- [ ] Real Google/Practo testimonials replace anonymized samples
- [ ] Permanently delete `/app/_archive_old/` once Vercel is stable

## P2 / Future
- [ ] IndexNow + Google URL Inspection auto-ping on every push (cron + GitHub Action)
- [ ] JSON-LD `MedicalProcedure` schema per treatment page
- [ ] Per-blog OG cover images
- [ ] Trust bar with Apollo / Practo logos under hero (highest-leverage conversion)
- [ ] Cost calculator widget for joint replacement

## Test Credentials
N/A — no auth, no database, no admin dashboard.

## Last Test Reports
- `/app/test_reports/iteration_17.json` — Frontend 50/50 pass (post-redesign)
