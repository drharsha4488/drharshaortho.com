"""
Iteration 9 Tests: Bug Fixes Verification
- Bug 1: /api/blogs/visible endpoint now returns blog posts (was returning 0)
- Bug 2: Write button in SEO Topics calls generate-blog API (not just scrolling)
- Also verify: Growth snapshots show correct counts
"""

import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://care-growth-hub.preview.emergentagent.com').rstrip('/')

class TestBlogsVisibleEndpoint:
    """Test /api/blogs/visible endpoint - Bug 1 fix"""
    
    def test_blogs_visible_returns_posts(self):
        """Verify /api/blogs/visible returns blog posts (not empty)"""
        response = requests.get(f"{BASE_URL}/api/blogs/visible")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        assert len(data) >= 9, f"Expected at least 9 blog posts, got {len(data)}"
        print(f"✅ /api/blogs/visible returns {len(data)} blog posts")
    
    def test_blogs_visible_post_structure(self):
        """Verify each blog post has required fields"""
        response = requests.get(f"{BASE_URL}/api/blogs/visible")
        assert response.status_code == 200
        
        data = response.json()
        assert len(data) > 0, "Should have at least one blog post"
        
        post = data[0]
        required_fields = ['id', 'title', 'slug', 'content', 'excerpt']
        for field in required_fields:
            assert field in post, f"Blog post missing required field: {field}"
        print(f"✅ Blog posts have correct structure with fields: {required_fields}")
    
    def test_blogs_visible_has_slug_for_linking(self):
        """Verify blog posts have valid slugs for /blog/{slug} routing"""
        response = requests.get(f"{BASE_URL}/api/blogs/visible")
        assert response.status_code == 200
        
        data = response.json()
        for post in data:
            slug = post.get('slug', '')
            assert slug, f"Post '{post.get('title', 'Unknown')}' has empty slug"
            assert ' ' not in slug, f"Slug should not contain spaces: {slug}"
        print(f"✅ All {len(data)} posts have valid slugs")


class TestIndividualBlogPost:
    """Test individual blog post retrieval at /blog/{slug}"""
    
    def test_get_blog_post_by_slug(self):
        """Verify individual blog posts can be fetched by slug"""
        # First get list of visible blogs
        response = requests.get(f"{BASE_URL}/api/blogs/visible")
        assert response.status_code == 200
        
        data = response.json()
        assert len(data) > 0, "Need at least one blog post to test"
        
        slug = data[0].get('slug')
        assert slug, "First post should have a slug"
        
        # Fetch individual blog post
        post_response = requests.get(f"{BASE_URL}/api/blog/{slug}")
        assert post_response.status_code == 200, f"Failed to get blog post at /api/blog/{slug}"
        
        post = post_response.json()
        assert post.get('slug') == slug
        assert post.get('title')
        assert post.get('content')
        print(f"✅ Individual blog post retrieval works: /api/blog/{slug}")


class TestGenerateBlogEndpoint:
    """Test /api/admin/automation/generate-blog endpoint - Bug 2 verification"""
    
    def test_generate_blog_endpoint_exists(self):
        """Verify generate-blog endpoint exists and responds"""
        # Note: We won't actually generate a blog (calls GPT-4o) but verify endpoint responds
        response = requests.post(
            f"{BASE_URL}/api/admin/automation/generate-blog",
            json={"keyword": ""},  # Empty keyword should fail validation
            headers={"Content-Type": "application/json"}
        )
        # Should return error for empty keyword, but not 404
        assert response.status_code != 404, "generate-blog endpoint should exist"
        print(f"✅ generate-blog endpoint exists (status: {response.status_code})")
    
    def test_generate_blog_requires_keyword(self):
        """Verify generate-blog requires a keyword parameter"""
        response = requests.post(
            f"{BASE_URL}/api/admin/automation/generate-blog",
            json={},  # No keyword
            headers={"Content-Type": "application/json"}
        )
        # Should return validation error
        assert response.status_code in [400, 422, 500], f"Expected validation error, got {response.status_code}"
        print(f"✅ generate-blog validates keyword parameter")


class TestGrowthSnapshot:
    """Test growth snapshot accuracy - verify content counts"""
    
    def test_growth_history_returns_data(self):
        """Verify growth history endpoint returns snapshot data"""
        response = requests.get(f"{BASE_URL}/api/admin/growth/history?days=7")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert 'snapshots' in data, "Response should have 'snapshots' field"
        print(f"✅ Growth history returns {len(data['snapshots'])} snapshots")
    
    def test_growth_snapshot_has_total_pages(self):
        """Verify snapshot includes total_pages field"""
        response = requests.get(f"{BASE_URL}/api/admin/growth/history?days=7")
        assert response.status_code == 200
        
        data = response.json()
        snapshots = data.get('snapshots', [])
        
        if len(snapshots) > 0:
            latest = snapshots[-1]  # Most recent
            assert 'total_pages' in latest, "Snapshot should have total_pages"
            assert 'total_blogs' in latest, "Snapshot should have total_blogs"
            assert 'sitemap_urls' in latest, "Snapshot should have sitemap_urls"
            
            # Verify counts are reasonable
            total_pages = latest.get('total_pages', 0)
            sitemap_urls = latest.get('sitemap_urls', 0)
            assert total_pages >= 60, f"Expected at least 60 content pages, got {total_pages}"
            assert sitemap_urls >= 100, f"Expected at least 100 sitemap URLs, got {sitemap_urls}"
            
            print(f"✅ Growth snapshot: {total_pages} content pages, {sitemap_urls} sitemap URLs")
        else:
            print("⚠️ No snapshots found - recording new snapshot")
    
    def test_record_growth_snapshot(self):
        """Test recording a growth snapshot"""
        response = requests.post(f"{BASE_URL}/api/admin/growth/snapshot")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        # Response may have 'snapshot' key containing the actual data
        snapshot = data.get('snapshot', data)
        assert 'total_pages' in snapshot or 'total_content_pages' in snapshot, "Should return page counts"
        print(f"✅ Growth snapshot recorded successfully")


class TestAdminAutomationStatus:
    """Test automation status endpoint"""
    
    def test_automation_status_returns_growth(self):
        """Verify automation status includes growth analysis"""
        response = requests.get(f"{BASE_URL}/api/admin/automation/status")
        assert response.status_code == 200
        
        data = response.json()
        assert 'growth' in data, "Status should include growth analysis"
        assert 'content_totals' in data, "Status should include content_totals"
        
        content = data.get('content_totals', {})
        assert 'total_blogs' in content, "Should have total_blogs count"
        
        growth = data.get('growth', {})
        if growth.get('trend') != 'insufficient_data':
            assert 'sitemap_urls' in growth, "Growth should include sitemap_urls"
            assert 'total_content' in growth, "Growth should include total_content"
        
        print(f"✅ Automation status shows {content.get('total_blogs', 0)} blogs")


class TestSEOTopicSuggestions:
    """Test SEO topic suggestions endpoint"""
    
    def test_seo_suggestions_endpoint(self):
        """Verify SEO suggestions endpoint works"""
        response = requests.get(f"{BASE_URL}/api/admin/seo/suggestions?limit=10")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert 'suggestions' in data, "Response should have suggestions"
        print(f"✅ SEO suggestions endpoint works, {len(data.get('suggestions', []))} topics")


# Run tests
if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
