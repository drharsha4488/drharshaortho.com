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

## Tech Stack
- **Frontend**: React 19, TailwindCSS, Shadcn/UI, Framer Motion
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **AI**: OpenAI GPT via Emergent LLM Key
- **Email**: Resend
- **Analytics**: Google Tag Manager, PostHog
- **SEO**: react-snap (pre-rendering), IndexNow

## Architecture Overview
```
/app
├── backend/
│   └── server.py         # FastAPI with CMS, Analytics, IndexNow, AI Chat
├── frontend/
│   ├── build/            # Pre-rendered static HTML (react-snap)
│   ├── src/
│   │   ├── components/   # UI components, admin dashboard
│   │   ├── data/         # SEO pages, blog posts (static), location pages
│   │   └── pages/        # React pages - ALL CMS-driven (no static fallbacks)
│   └── package.json      # react-snap for SSG
```

## Data Architecture (Post-Migration)
- ALL 39 conditions and 20 treatments are stored in MongoDB CMS (`cms_pages`)
- Frontend fetches exclusively from CMS API - no static data fallbacks
- Static data files removed: conditions.js, conditionsDetailed.js, treatments.js, treatmentsDetailed.js

## Key Database Collections
- `cms_pages`: Stores all CMS content (conditions, treatments, blogs)
- `appointments`: Patient appointment bookings
- `blog_posts`: Blog content
- `page_views`: Analytics data
- `indexnow_submissions`: SEO indexing records

---

## What's Been Implemented

### December 2025 - January 2026
- Full CMS system with 39 conditions and 20 treatments
- Blog management system with SEO features
- Admin dashboard with analytics
- AI Chat assistant integration
- Email notifications for appointments
- Pre-rendering with react-snap

### February 25, 2026 - CMS Content Enrichment
- **NEW**: Created `/api/admin/cms/enrich-detailed-content` endpoint
- **ENRICHED**: 10 key pages with detailed treatment protocols:
  - Conditions: knee-arthritis, acl-tear, hip-arthritis, frozen-shoulder, meniscus-tear
  - Treatments: total-knee-replacement, total-hip-replacement, acl-reconstruction, knee-arthroscopy, shoulder-arthroscopy
- **CONTENT**: Each page now includes:
  - `nonSurgicalTreatments` with protocol details, duration, evidence level
  - `surgicalTreatments` with indications, procedure, recovery, success rate
  - `faqs` with medical Q&A
  - `recoveryTimeline` with phase-by-phase milestones
  - `causes`, `symptoms`, `diagnosis` arrays

### February 25, 2026 - CMS-Only Migration & Static File Removal (This Session)
- **FIXED**: "Treatment Not Found" bug on treatment detail pages (e.g., `/treatments/prp-therapy`)
  - Root cause: `TreatmentDetailEnhanced.jsx` was 100% static (no CMS API calls)
  - Fix: Rewrote to fetch exclusively from `/api/cms/treatments/${slug}`
- **REFACTORED**: `ConditionDetail.jsx` - removed hybrid static+CMS system, now CMS-only
- **UPDATED**: `Treatments.jsx` and `Conditions.jsx` list pages - now fetch from CMS API
- **DELETED**: ~4000+ lines of static data (conditions.js, conditionsDetailed.js, treatments.js, treatmentsDetailed.js, old TreatmentDetail.jsx)
- **TESTED**: 9/9 tests passed (all treatment and condition pages working)

---

## Prioritized Backlog

### P0 - Completed
- [x] CMS content migration (59 pages)
- [x] CMS enrichment with detailed treatment protocols
- [x] Pre-rendering (SSG) with react-snap
- [x] IndexNow integration
- [x] Fix "Treatment Not Found" bug - full CMS-only migration complete
- [x] Remove static data fallback system

### P1 - High Priority (Next)
- [ ] Use Automated SEO Engine to expand medical content beyond 59 pages
- [ ] Deeper content enrichment for remaining conditions/treatments

### P2 - Medium Priority
- [ ] Backlink building campaign (use directory-submission-kit.html)
- [ ] Integrate patient testimonial videos with Review schema
- [ ] Advanced analytics dashboard features

### P3 - Future
- [ ] Headless CMS migration evaluation
- [ ] Multi-language support
- [ ] Patient portal integration

---

## API Endpoints Reference

### CMS Endpoints
- `GET /api/cms/conditions` - List all conditions
- `GET /api/cms/conditions/{slug}` - Get condition details
- `GET /api/cms/treatments` - List all treatments
- `GET /api/cms/treatments/{slug}` - Get treatment details
- `POST /api/admin/cms/enrich-detailed-content` - Enrich CMS with detailed protocols

### Admin Endpoints
- `POST /api/admin/login` - Admin authentication (password: drharsha2025)
- `GET /api/admin/analytics` - Dashboard analytics
- `POST /api/admin/indexnow/submit-all-pages` - Trigger IndexNow submission

---

## Test Credentials
- **Admin Dashboard**: `/admin`
- **Admin Password**: `drharsha2025`

---

## Notes
- The hybrid CMS approach (CMS data + static file fallback) ensures reliability
- Pre-rendered HTML files improve SEO and initial load times
- IndexNow is configured for instant Bing/Yandex indexing
