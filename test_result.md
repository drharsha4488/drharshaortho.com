# CareConnect Testing - CMS API Integration

## Testing Focus
Test the new CMS API endpoints and frontend integration for conditions, treatments, and blog pages.

## Tasks to Test

### Backend API Tests
1. Test `GET /api/cms/conditions` - Should return all published conditions
2. Test `GET /api/cms/conditions/{slug}` - Should return single condition
3. Test `GET /api/cms/treatments` - Should return all published treatments  
4. Test `GET /api/cms/treatments/{slug}` - Should return single treatment
5. Test `GET /api/cms/blogs` - Should return all published blogs
6. Test `GET /api/cms/blogs/{slug}` - Should return single blog

### Frontend Integration Tests
1. Condition Detail Page - Should load with CMS data OR fallback to static data
2. Treatment Detail Page - Should load with CMS data OR fallback to static data
3. Blog Post Page - Should load with CMS data OR fallback to static data
4. Loading states - Pages should show loading spinner while fetching

## Expected Behavior
- If CMS has data for the slug, use CMS data
- If CMS returns 404, fallback to static JS data files
- Pages should always render content (no blank pages)

## API Endpoints
- Base URL: From REACT_APP_BACKEND_URL env variable
- CMS Conditions: `/api/cms/conditions` and `/api/cms/conditions/{slug}`
- CMS Treatments: `/api/cms/treatments` and `/api/cms/treatments/{slug}`
- CMS Blogs: `/api/cms/blogs` and `/api/cms/blogs/{slug}`

## Test Pages
- Condition with CMS data: `/conditions/osteoarthritis` (should use CMS)
- Condition with static fallback: `/conditions/knee-arthritis` (should use static)
- Treatment page: `/treatments/total-knee-replacement`
- Blog page: `/blog/knee-replacement-recovery-timeline`

