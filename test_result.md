# Test Plan - SEO Expansion & CMS Backend

## Test Focus
1. New SEO pages (155 total now)
2. CMS API endpoints
3. Analytics Dashboard (already verified)

## Test Scenarios

### 1. New SEO Pages
- **Test**: Navigate to /orthopedic-surgeon-banjara-hills
- **Expected**: Page loads with hero "Expert Orthopedic Care for Banjara Hills Residents"
- **Test**: Navigate to /cricket-injuries-treatment-hyderabad  
- **Expected**: Page loads with sports injury content
- **Test**: Navigate to /senior-citizen-orthopedic-hyderabad
- **Expected**: Page loads with age-specific content

### 2. CMS API Endpoints
- **Test**: POST /api/admin/cms/pages - Create a page
- **Test**: GET /api/admin/cms/pages - List all pages
- **Test**: GET /api/cms/pages/{slug} - Get published page
- All endpoints should return proper JSON responses

### 3. Homepage & Existing Pages
- Verify homepage still loads
- Verify existing conditions/treatments pages work
- Verify admin dashboard still works

## Admin Credentials
- URL: /admin
- Password: drharsha2025
