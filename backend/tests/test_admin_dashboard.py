"""
Test cases for Admin Dashboard refactored to 3 tabs:
- Organic Growth tab (blog, automation, growth tracking)
- Analytics tab
- CMS Pages tab

Also tests growth tracking and self-adaptive automation APIs.
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_PASSWORD = "drharsha2025"


class TestAdminAuth:
    """Test admin login functionality"""
    
    def test_admin_login_success(self):
        """Test admin login with correct password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": ADMIN_PASSWORD}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data.get("success") is True
        print(f"PASS: Admin login successful with password '{ADMIN_PASSWORD}'")
    
    def test_admin_login_failure(self):
        """Test admin login with wrong password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "wrongpassword123"}
        )
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("PASS: Admin login correctly rejects wrong password")


class TestBlogPostsAPI:
    """Test blog posts API - used by Organic Growth tab"""
    
    def test_get_admin_blog_posts(self):
        """GET /api/admin/blog should return list of blog posts"""
        response = requests.get(f"{BASE_URL}/api/admin/blog")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert isinstance(data, list), f"Expected list, got {type(data)}"
        print(f"PASS: GET /api/admin/blog returns {len(data)} blog posts")
        
        # Check structure of first post if exists
        if len(data) > 0:
            post = data[0]
            assert "id" in post, "Blog post missing 'id' field"
            assert "title" in post, "Blog post missing 'title' field"
            assert "slug" in post, "Blog post missing 'slug' field"
            print(f"PASS: Blog post structure valid. First post: '{post['title']}'")
    
    def test_get_public_blog_posts(self):
        """GET /api/blog should return public blog posts"""
        response = requests.get(f"{BASE_URL}/api/blog")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: GET /api/blog returns {len(data)} public blog posts")


class TestGrowthTrackingAPI:
    """Test growth tracking APIs - self-adaptive automation system"""
    
    def test_record_growth_snapshot(self):
        """POST /api/admin/growth/snapshot should record today's snapshot"""
        response = requests.post(f"{BASE_URL}/api/admin/growth/snapshot")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data.get("success") is True, "Expected success: true"
        assert "snapshot" in data, "Response missing 'snapshot' field"
        
        snapshot = data["snapshot"]
        assert "date" in snapshot, "Snapshot missing 'date' field"
        assert "total_blogs" in snapshot, "Snapshot missing 'total_blogs' field"
        assert "total_content_pages" in snapshot, "Snapshot missing 'total_content_pages' field"
        print(f"PASS: Growth snapshot recorded - Date: {snapshot['date']}, Total content: {snapshot.get('total_content_pages', 0)}")
    
    def test_get_growth_history(self):
        """GET /api/admin/growth/history?days=7 should return history"""
        response = requests.get(f"{BASE_URL}/api/admin/growth/history?days=7")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "snapshots" in data, "Response missing 'snapshots' field"
        assert "total" in data, "Response missing 'total' field"
        assert isinstance(data["snapshots"], list), "Snapshots should be a list"
        print(f"PASS: GET /api/admin/growth/history returns {data['total']} snapshots")
    
    def test_get_growth_analysis(self):
        """GET /api/admin/growth/analysis should return analysis and strategy"""
        response = requests.get(f"{BASE_URL}/api/admin/growth/analysis")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Check required fields in analysis
        assert "trend" in data, "Analysis missing 'trend' field"
        assert "strategy" in data, "Analysis missing 'strategy' field"
        assert "posts_per_cycle" in data, "Analysis missing 'posts_per_cycle' field"
        
        print(f"PASS: Growth analysis - Trend: {data['trend']}, Strategy: {data['strategy']}, Posts/cycle: {data['posts_per_cycle']}")
        
        # With only 1 day of data, should be 'insufficient_data'
        # After 2+ days it will have actual analysis
        if data["trend"] == "insufficient_data":
            print(f"INFO: Trend shows 'insufficient_data' - expected for new system with <2 days of data")


class TestAutomationStatusAPI:
    """Test automation status API - includes growth data"""
    
    def test_get_automation_status(self):
        """GET /api/admin/automation/status should return status with growth data"""
        response = requests.get(f"{BASE_URL}/api/admin/automation/status")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Check key fields
        assert "scheduler_running" in data, "Missing 'scheduler_running' field"
        assert "content_totals" in data, "Missing 'content_totals' field"
        
        # Check for growth data
        assert "growth" in data, "Missing 'growth' field in automation status"
        growth = data["growth"]
        assert "trend" in growth, "Growth data missing 'trend'"
        assert "strategy" in growth, "Growth data missing 'strategy'"
        
        print(f"PASS: Automation status - Scheduler: {data['scheduler_running']}")
        print(f"       Content: {data['content_totals']}")
        print(f"       Growth trend: {growth['trend']}, Strategy: {growth['strategy']}")
    
    def test_regenerate_sitemap(self):
        """POST /api/admin/automation/regenerate-sitemap should update sitemap"""
        response = requests.post(f"{BASE_URL}/api/admin/automation/regenerate-sitemap")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        assert data.get("success") is True, "Expected success: true"
        assert "url_count" in data, "Missing 'url_count' in response"
        
        print(f"PASS: Sitemap regenerated - {data['url_count']} URLs")


class TestAnalyticsAPI:
    """Test analytics API - used by Analytics tab"""
    
    def test_get_analytics(self):
        """GET /api/admin/analytics should return analytics data"""
        response = requests.get(f"{BASE_URL}/api/admin/analytics")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Check key sections
        assert "overview" in data, "Missing 'overview' section"
        
        overview = data["overview"]
        assert "total_views" in overview, "Overview missing 'total_views'"
        assert "unique_visitors" in overview, "Overview missing 'unique_visitors'"
        
        print(f"PASS: Analytics - Total views: {overview.get('total_views', 0)}, Unique visitors: {overview.get('unique_visitors', 0)}")


class TestCMSPagesAPI:
    """Test CMS pages API - used by CMS Pages tab"""
    
    def test_get_cms_pages(self):
        """GET /api/admin/cms/pages should return list of CMS pages"""
        response = requests.get(f"{BASE_URL}/api/admin/cms/pages")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        assert isinstance(data, list), f"Expected list, got {type(data)}"
        print(f"PASS: GET /api/admin/cms/pages returns {len(data)} CMS pages")
        
        if len(data) > 0:
            page = data[0]
            assert "id" in page, "CMS page missing 'id' field"
            assert "title" in page, "CMS page missing 'title' field"
            assert "slug" in page, "CMS page missing 'slug' field"
            assert "type" in page, "CMS page missing 'type' field"
            assert "status" in page, "CMS page missing 'status' field"
            print(f"PASS: CMS page structure valid. First page: '{page['title']}' (type: {page['type']}, status: {page['status']})")


class TestSEOTopicsAPI:
    """Test SEO suggestions API - used in Organic Growth tab"""
    
    def test_get_seo_suggestions(self):
        """GET /api/admin/seo/suggestions should return SEO topics"""
        response = requests.get(f"{BASE_URL}/api/admin/seo/suggestions?limit=10")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        assert "suggestions" in data, "Response missing 'suggestions' field"
        print(f"PASS: GET /api/admin/seo/suggestions returns {len(data.get('suggestions', []))} topics")


class TestIndexNowAPI:
    """Test IndexNow API - used in Organic Growth tab"""
    
    def test_get_indexnow_status(self):
        """GET /api/admin/seo/indexnow/status should return IndexNow status"""
        response = requests.get(f"{BASE_URL}/api/admin/seo/indexnow/status")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        assert "enabled" in data, "Response missing 'enabled' field"
        print(f"PASS: IndexNow status - Enabled: {data.get('enabled')}, Submissions: {data.get('total_submissions', 0)}")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
