# CareConnect - Dr. Harsha Orthopedic Website PRD

## Original Problem Statement
Build a comprehensive, SEO-optimized website for Dr. B Harsha Vardhana Reddy, an orthopedic surgeon. The goal is for this website to become the top-ranking site for orthopedic queries in their region, aiming for at least 100 new visits per day.

## Current Practice Information
- **Hospital**: Apollo Hospitals, Financial District
- **Address**: Nanakramguda, Serilingampally, Hyderabad, Telangana 500032
- **Phone**: +91 99599 64567
- **Timings**: Monday - Saturday, 9:00 AM - 5:00 PM
- **Appointment Booking**: https://www.apollo247.com/doctors/dr-b-harsha-vardhana-reddy-51807eec-1507-467c-91fb-4c6b2cb599ff
- **Google Maps**: https://maps.app.goo.gl/8nE3J5ajgmtizEyTA

## Core Requirements
1. Build a full-stack website named "CareConnect"
2. SEO-ready to achieve #1 search ranking and drive 100+ daily visitors
3. Professional details and imagery for the doctor
4. Comprehensive content on medical conditions and treatments
5. SEO-optimized blog content with CMS management
6. Google Analytics and comprehensive sitemap
7. Email notifications for appointment bookings
8. Password-protected admin dashboard
9. AI Chat assistant integration
10. Pre-rendering (SSG) for optimal SEO performance
11. Self-adaptive organic growth automation system

## Tech Stack
- **Frontend**: React 19, TailwindCSS, Shadcn/UI, Framer Motion
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **AI**: OpenAI GPT-4o via Emergent LLM Key
- **Email**: Resend
- **Analytics**: Google Tag Manager, PostHog
- **SEO**: react-snap (pre-rendering), IndexNow, APScheduler
- **Automation**: Self-adaptive growth engine with daily tracking

## Architecture Overview
```
/app
├── backend/
│   ├── automation.py      # Self-adaptive SEO automation engine + SEO Health Monitor
│   └── server.py          # FastAPI with CMS, Analytics, Growth Tracking, AI Chat, SEO Audit
└── frontend/
    └── src/
        ├── components/
        │   └── admin/
        │       └── OrganicGrowthDashboard.jsx  # Unified growth dashboard + SEO Health Monitor
        └── pages/
            └── Admin.jsx   # Clean 3-tab admin: Growth, Analytics, CMS
```

## Data Architecture
- ALL 39 conditions and 20 treatments stored in MongoDB CMS (`cms_pages`)
- Frontend fetches exclusively from CMS API
- Growth snapshots tracked daily in `growth_snapshots` collection
- Blog posts auto-generated with AI, stored in `blog_posts`

## Key Database Collections
- `cms_pages`: All CMS content (conditions, treatments, blogs)
- `blog_posts`: Blog content (manual + AI-generated)
- `page_views`: Analytics data
- `growth_snapshots`: Daily growth metrics snapshots
- `automation_log`: Automation cycle tracking
- `indexnow_submissions`: SEO indexing records
- `seo_audits`: SEO Health Monitor audit results
- `seo_fixes`: Self-healing SEO auto-fix history

---

## What's Been Implemented

### March 6, 2026 - SEO Health Monitor (Self-Running)
- **COMPLETED**: Built full SEO Health Monitor that crawls site and audits all pages
- **BACKEND**: Added crawler using BeautifulSoup + lxml to `automation.py`
  - Fetches all URLs from dynamic sitemap (`/api/sitemap.xml`)
  - Audits each page for: title tags, meta descriptions, canonical tags, JSON-LD schema, H1 headings, image alt text, content length, OG tags, viewport meta
  - Scores each page and calculates overall health score (0-100)
  - Stores results in MongoDB `seo_audits` collection
- **API**: 3 new endpoints: `/api/seo-audit/run`, `/api/seo-audit/latest`, `/api/seo-audit/history`
- **FRONTEND**: SEO Health Monitor section in Organic Growth dashboard
  - Overall score with animated progress bar (green ≥80, amber ≥50, red <50)
  - Issue breakdown: Critical/Warning/Info counts with colored cards
  - Category breakdown (meta, schema, headings, content, images, social, mobile)
  - Expandable detailed issues list with severity icons and fix suggestions
- **TESTED**: 100% backend (6/6 tests), 100% frontend (all UI components verified)
- **INSTALLED**: beautifulsoup4, lxml added to requirements.txt

### March 6, 2026 - Auto-Run + Self-Healing SEO
- **COMPLETED**: Integrated SEO audit into APScheduler for fully automated daily runs
  - `_run_daily_seo_audit()` runs once per day, skips if already run today
  - After each audit, auto-fix is triggered automatically
- **COMPLETED**: Self-Healing SEO engine using GPT-4o
  - Auto-generates missing/weak meta descriptions for CMS pages
  - Auto-generates missing/weak meta titles for CMS pages
  - Stores fix history in MongoDB `seo_fixes` collection
- **API**: 2 new endpoints: `/api/seo-audit/auto-fix`, `/api/seo-audit/fixes`
- **FRONTEND**: "Self-Heal" button in SEO Health Monitor with fix results display
- **TESTED**: 100% backend (6/6 tests), 100% frontend — all passing

### March 6, 2026 - Content Gap Analysis & Enrichment + SEO Trend Chart
- **COMPLETED**: SEO Audit Score Trend visualization (bar chart showing score history over time)
- **COMPLETED**: Content Gap Analysis engine
  - Analyzes all 59 CMS pages for missing sections (overview, symptoms, faq, prevention, etc.)
  - Scores each page's completeness percentage
  - Identifies 51 pages needing enrichment (69% avg completeness)
- **COMPLETED**: AI Content Enrichment engine using GPT-4o
  - Bulk or per-page enrichment of missing content sections
  - Generates structured medical content (symptoms, causes, treatments, FAQs, prevention tips)
  - Stores enriched content directly in CMS pages collection
- **API**: 2 new endpoints: `GET /api/content-gaps`, `POST /api/content-enrich`
- **FRONTEND**: Content Gap Analysis section in Organic Growth dashboard
  - Stats grid (conditions, treatments, total pages, needing enrichment)
  - Completeness progress bar
  - Expandable list showing each page with missing sections tags
  - "Auto-Enrich" bulk button + per-page lightning bolt button
- **TESTED**: 100% backend (9/9 tests), 100% frontend — all passing


### February 25, 2026 - Admin Dashboard Refactor & Self-Adaptive Growth System
- **COMPLETED**: Admin dashboard refactored to 3 clean tabs: Organic Growth, Analytics, CMS Pages
- **REMOVED**: Appointments tab (handled externally via Apollo link)
- **REMOVED**: Separate Blog, SEO, Automation tabs (merged into Organic Growth)
- **DELETED**: Unused components: AutomationDashboard.jsx, AutoSEODashboard.jsx, KeywordResearchTool.jsx
- **FIXED**: API endpoint mismatch (OrganicGrowthDashboard now calls /api/admin/blog correctly)
- **NEW**: Self-adaptive growth tracking system:
  - Daily growth snapshots (content pages, views, sitemap URLs, indexed pages)
  - Growth trend analysis (growing/flat/declining)
  - Auto-adjusts strategy: normal (3 posts) → boost (5 posts) → aggressive (7 posts)
  - Adaptive keyword selection based on performance
  - Visual growth progress charts (content + page views over time)
- **NEW**: Growth API endpoints: /api/admin/growth/snapshot, /api/admin/growth/history, /api/admin/growth/analysis
- **TESTED**: 13/13 backend tests passed, 100% frontend tests passed

### Previous Sessions
- Full CMS system with 39 conditions and 20 treatments
- Blog management system with SEO features
- AI Chat assistant integration
- Email notifications for appointments
- Pre-rendering with react-snap
- CMS content enrichment (10 key pages with detailed protocols)
- Full CMS-only migration & static file removal
- Automated content generation engine (APScheduler + GPT-4o)
- Dynamic sitemap generation (/api/sitemap.xml)

---

## Prioritized Backlog

### P0 - Completed
- [x] CMS content migration (59 pages)
- [x] CMS enrichment with detailed treatment protocols
- [x] Pre-rendering (SSG) with react-snap
- [x] IndexNow integration
- [x] Fix "Treatment Not Found" bug
- [x] Remove static data fallback system
- [x] Automated SEO content engine
- [x] Dynamic sitemap generation
- [x] Admin dashboard refactor (3-tab layout)
- [x] Self-adaptive growth tracking system
- [x] SEO Health Monitor (automated site auditing)

### P1 - High Priority (Next)
- [ ] Run bulk content enrichment to bring all 51 gap pages to 90%+ completeness
- [ ] SEO audit trend: accumulate more daily data points for meaningful trend visualization
- [ ] Generate new blog posts targeting underperforming keywords

### P2 - Medium Priority
- [ ] Backlink building campaign (directory-submission-kit.html)
- [ ] Patient testimonial videos with Review schema
- [ ] Advanced analytics dashboard features

### P3 - Future
- [ ] Headless CMS migration evaluation
- [ ] Multi-language support
- [ ] Patient portal integration

---

## API Endpoints Reference

### SEO Health Monitor
- `POST /api/seo-audit/run` - Trigger full site SEO audit
- `GET /api/seo-audit/latest` - Get most recent audit results
- `GET /api/seo-audit/history` - Get audit score history
- `POST /api/seo-audit/auto-fix` - Trigger AI auto-fix for SEO issues
- `GET /api/seo-audit/fixes` - Get auto-fix history

### Content Gap Analysis & Enrichment
- `GET /api/content-gaps` - Analyze all CMS pages for missing sections
- `POST /api/content-enrich` - AI bulk enrichment of CMS pages

### Growth Tracking (NEW)
- `POST /api/admin/growth/snapshot` - Record daily growth metrics
- `GET /api/admin/growth/history?days=30` - Get growth snapshots
- `GET /api/admin/growth/analysis` - Get growth analysis & strategy

### Automation
- `GET /api/admin/automation/status` - Status including growth analysis
- `POST /api/admin/automation/run-now` - Run adaptive cycle
- `POST /api/admin/automation/regenerate-sitemap` - Rebuild sitemap
- `POST /api/admin/automation/generate-blog` - Generate single blog post
- `GET /api/sitemap.xml` - Dynamic sitemap

### CMS
- `GET /api/cms/conditions` / `GET /api/cms/conditions/{slug}`
- `GET /api/cms/treatments` / `GET /api/cms/treatments/{slug}`
- `GET/POST /api/admin/cms/pages`

### Admin
- `POST /api/admin/login` - Auth (password: drharsha2025)
- `GET /api/admin/blog` - Blog posts list
- `GET /api/admin/analytics` - Dashboard analytics

---

## Test Credentials
- **Admin Dashboard**: `/admin`
- **Admin Password**: `drharsha2025`
