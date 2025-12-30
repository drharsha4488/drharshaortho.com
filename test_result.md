# Test Plan - UI Polish & Analytics Dashboard

## Test Focus
Testing the new UI polish changes (Header/Footer animations) and Advanced Analytics Dashboard in Admin portal.

## Test Scenarios

### 1. UI Polish - Header
- **Test**: Header animation on page load (slide down)
- **Test**: Active nav link indicator (dot underneath)
- **Test**: Phone icon animation (subtle shake)
- **Test**: Book Appointment button hover with chevron animation
- **Test**: Mobile menu toggle animation (hamburger to X)
- **Test**: Mobile menu slide animation

### 2. UI Polish - Footer  
- **Test**: Footer has staggered animation when scrolling into view
- **Test**: Quick links have hover effects (arrow appears)
- **Test**: Contact info has gold icon badges
- **Test**: "Made with heart" text at bottom

### 3. Admin Analytics Dashboard
- **Test**: Login to admin with password: drharsha2025
- **Test**: Click on "Analytics" tab
- **Test**: Verify Overview Stats cards show data (Total Views, Today, This Week, This Month, Unique Visitors)
- **Test**: Verify Daily Views chart shows last 7 days
- **Test**: Verify Top Pages list is displayed
- **Test**: Verify AI Chat Engagement shows conversation count
- **Test**: Verify Top Referrers section is displayed (may be empty)
- **Test**: Blue info banner at bottom about analytics tracking

### 4. Analytics Tracking
- **Test**: Browse multiple pages and verify page views are tracked
- **Test**: Refresh admin analytics to see updated counts

## Expected Behavior
- All animations should be smooth (60fps)
- No console errors
- Analytics data should update when pages are visited
- Admin dashboard should display all metrics correctly

## Admin Credentials
- URL: /admin
- Password: drharsha2025
