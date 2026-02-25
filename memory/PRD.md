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

### February 25, 2026 - Hospital Address Change (Yashoda → Apollo)
- **MIGRATED**: All hospital references from Yashoda Hospital Hi-Tech City to Apollo Hospitals, Financial District
- **UPDATED FILES**: 50+ files across frontend and backend
  - Contact page: New address, map embed, timings (9 AM - 5 PM)
  - Header/Footer: Apollo Hospitals branding, Apollo247 booking link
  - About page: Updated career timeline (2025: Senior Consultant at Apollo)
  - SEO components: Updated schema markup, geo coordinates (17.4167554, 78.3550579)
  - AI Chat: Updated system prompt with new location info
  - Email templates: New hospital info in appointment notifications
  - Static data files: All condition/treatment pages updated
- **BOOKING**: Book Appointment button now links directly to Apollo247 profile
- **TESTED**: All 8 key features verified (100% pass rate)

---

## Prioritized Backlog

### P0 - Completed
- [x] CMS content migration (59 pages)
- [x] CMS enrichment with detailed treatment protocols (10 key pages)
- [x] Pre-rendering (SSG) with react-snap
- [x] IndexNow integration

### P1 - High Priority (Next)
- [ ] Enrich remaining conditions and treatments with detailed content
- [ ] Use Automated SEO Engine to expand medical content
- [ ] Code cleanup - evaluate which static data files can be deprecated

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
