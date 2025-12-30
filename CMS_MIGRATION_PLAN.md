# Headless CMS Migration Plan

## Current State
The website currently stores all content in static JavaScript files:
- `/app/frontend/src/data/conditions.js` - Condition listings
- `/app/frontend/src/data/conditionsDetailed.js` - Detailed condition content
- `/app/frontend/src/data/treatments.js` - Treatment listings
- `/app/frontend/src/data/treatmentsDetailed.js` - Detailed treatment content
- `/app/frontend/src/data/seoPages.js` - SEO landing page content
- `/app/frontend/src/data/seoBlogPosts.js` - Blog post content
- etc.

## Problems with Current Approach
1. **No Admin Interface**: Content changes require code deployment
2. **Version Control Complexity**: Content mixed with code
3. **Non-Technical Users**: Can't update content without developer help
4. **Scalability**: Hard to manage 150+ pages of content
5. **Real-time Updates**: Changes require rebuild/restart

## Proposed Solution: MongoDB-based Headless CMS

### Phase 1: Database Schema & API (Backend)
Create MongoDB collections and REST APIs for:
- `cms_pages` - All page content (conditions, treatments, SEO pages)
- `cms_blog_posts` - Blog articles (already partially done)
- `cms_settings` - Site-wide settings

### Phase 2: Admin Content Management UI
Extend the existing Admin dashboard with:
- Page editor with rich text support
- Image upload capability
- SEO metadata editor
- Preview functionality
- Draft/Publish workflow

### Phase 3: Frontend Integration
Update frontend components to:
- Fetch content from API instead of static files
- Add loading states and error handling
- Implement caching for performance
- Fallback to static content if API fails

## Database Schema

### cms_pages Collection
```javascript
{
  id: "string",           // UUID
  slug: "string",         // URL-friendly identifier
  type: "string",         // "condition" | "treatment" | "seo_landing" | "general"
  title: "string",
  meta_title: "string",
  meta_description: "string",
  keywords: ["string"],
  content: {
    hero: { title, subtitle, image },
    sections: [{ type, title, content }],
    faqs: [{ question, answer }],
    // ... flexible structure
  },
  status: "string",       // "draft" | "published"
  created_at: "datetime",
  updated_at: "datetime",
  published_at: "datetime"
}
```

### cms_blog_posts Collection (Enhanced)
```javascript
{
  id: "string",
  slug: "string",
  title: "string",
  excerpt: "string",
  content: "string",      // Markdown or HTML
  author: "string",
  category: "string",
  tags: ["string"],
  featured_image: "string",
  meta_title: "string",
  meta_description: "string",
  status: "draft" | "published",
  created_at: "datetime",
  updated_at: "datetime",
  published_at: "datetime",
  views: "number"
}
```

## Implementation Priority

### High Priority (Phase 1)
1. ✅ Blog posts API (already exists)
2. [ ] CMS pages API endpoints
3. [ ] Content migration script

### Medium Priority (Phase 2)
4. [ ] Admin page editor UI
5. [ ] Rich text editor integration
6. [ ] Image upload system

### Lower Priority (Phase 3)
7. [ ] Frontend API integration
8. [ ] Caching layer
9. [ ] Content versioning

## API Endpoints to Create

```
POST   /api/admin/cms/pages          - Create page
GET    /api/admin/cms/pages          - List all pages
GET    /api/admin/cms/pages/:id      - Get page by ID
PUT    /api/admin/cms/pages/:id      - Update page
DELETE /api/admin/cms/pages/:id      - Delete page
GET    /api/cms/pages/:slug          - Public: Get published page by slug
GET    /api/cms/pages/type/:type     - Public: Get pages by type
```

## Migration Steps

1. **Create API endpoints** (backend)
2. **Create migration script** to move static content to MongoDB
3. **Update Admin UI** with page management
4. **Test thoroughly** before switching frontend
5. **Update frontend** to use API (with fallback)
6. **Remove static files** after verification

## Benefits After Migration

1. **Easy Content Updates**: Non-technical staff can update content
2. **Real-time Publishing**: No code deployment needed
3. **Better SEO Control**: Easy meta tag management
4. **Analytics Integration**: Track page views per content
5. **A/B Testing Ready**: Easy to create content variations
6. **Multi-user Support**: Different editors for different sections

## Timeline Estimate

- Phase 1 (Backend): 2-3 hours
- Phase 2 (Admin UI): 3-4 hours  
- Phase 3 (Frontend): 2-3 hours
- Testing & Migration: 2-3 hours

**Total: ~10-13 hours**

## Next Steps

1. Implement basic CMS API endpoints
2. Create admin page management UI
3. Start with blog posts (already have partial support)
4. Gradually migrate other content types
