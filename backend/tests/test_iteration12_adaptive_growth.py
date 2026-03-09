"""
Iteration 12 Tests: Self-Adaptive Growth Engine
Tests for:
1. GET /api/growth/adaptive-status - returns strategy, seo_score, keyword_coverage_pct, content_velocity, adaptive_actions
2. POST /api/growth/generate-blogs - returns success with status:started (background task)
3. POST /api/growth/enrich-weak-sections - returns success with status:started (background task)
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestAdaptiveGrowthEndpoints:
    """Tests for the new Self-Adaptive Growth Engine endpoints"""

    def test_adaptive_status_endpoint_returns_success(self):
        """Test GET /api/growth/adaptive-status returns success"""
        response = requests.get(f"{BASE_URL}/api/growth/adaptive-status")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data.get("success") is True, f"Expected success=True, got: {data}"

    def test_adaptive_status_has_strategy_field(self):
        """Test adaptive-status returns strategy field"""
        response = requests.get(f"{BASE_URL}/api/growth/adaptive-status")
        assert response.status_code == 200
        data = response.json()
        assert "strategy" in data, f"Missing 'strategy' field: {data.keys()}"
        assert data["strategy"] in ["maintain", "boost", "aggressive", "normal"], f"Invalid strategy: {data['strategy']}"

    def test_adaptive_status_has_seo_score(self):
        """Test adaptive-status returns seo_score field"""
        response = requests.get(f"{BASE_URL}/api/growth/adaptive-status")
        assert response.status_code == 200
        data = response.json()
        assert "seo_score" in data, f"Missing 'seo_score' field: {data.keys()}"
        assert isinstance(data["seo_score"], (int, float)), f"seo_score should be numeric: {type(data['seo_score'])}"
        assert 0 <= data["seo_score"] <= 100, f"seo_score should be 0-100: {data['seo_score']}"

    def test_adaptive_status_has_keyword_coverage_pct(self):
        """Test adaptive-status returns keyword_coverage_pct field"""
        response = requests.get(f"{BASE_URL}/api/growth/adaptive-status")
        assert response.status_code == 200
        data = response.json()
        assert "keyword_coverage_pct" in data, f"Missing 'keyword_coverage_pct' field: {data.keys()}"
        assert isinstance(data["keyword_coverage_pct"], (int, float)), f"keyword_coverage_pct should be numeric"
        assert 0 <= data["keyword_coverage_pct"] <= 100, f"keyword_coverage_pct should be 0-100: {data['keyword_coverage_pct']}"

    def test_adaptive_status_has_content_velocity(self):
        """Test adaptive-status returns content_velocity field"""
        response = requests.get(f"{BASE_URL}/api/growth/adaptive-status")
        assert response.status_code == 200
        data = response.json()
        assert "content_velocity" in data, f"Missing 'content_velocity' field: {data.keys()}"
        assert isinstance(data["content_velocity"], (int, float)), f"content_velocity should be numeric"

    def test_adaptive_status_has_adaptive_actions(self):
        """Test adaptive-status returns adaptive_actions field (list)"""
        response = requests.get(f"{BASE_URL}/api/growth/adaptive-status")
        assert response.status_code == 200
        data = response.json()
        assert "adaptive_actions" in data, f"Missing 'adaptive_actions' field: {data.keys()}"
        assert isinstance(data["adaptive_actions"], list), f"adaptive_actions should be a list"

    def test_adaptive_status_has_total_blogs(self):
        """Test adaptive-status returns total_blogs field"""
        response = requests.get(f"{BASE_URL}/api/growth/adaptive-status")
        assert response.status_code == 200
        data = response.json()
        assert "total_blogs" in data, f"Missing 'total_blogs' field: {data.keys()}"
        assert isinstance(data["total_blogs"], int), f"total_blogs should be integer"

    def test_adaptive_status_has_total_cms_pages(self):
        """Test adaptive-status returns total_cms_pages field"""
        response = requests.get(f"{BASE_URL}/api/growth/adaptive-status")
        assert response.status_code == 200
        data = response.json()
        assert "total_cms_pages" in data, f"Missing 'total_cms_pages' field: {data.keys()}"
        assert isinstance(data["total_cms_pages"], int), f"total_cms_pages should be integer"

    def test_adaptive_status_has_message(self):
        """Test adaptive-status returns message field"""
        response = requests.get(f"{BASE_URL}/api/growth/adaptive-status")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data, f"Missing 'message' field: {data.keys()}"
        assert isinstance(data["message"], str), f"message should be string"

    def test_adaptive_status_has_keywords_used_and_total(self):
        """Test adaptive-status returns keywords_used and keywords_total"""
        response = requests.get(f"{BASE_URL}/api/growth/adaptive-status")
        assert response.status_code == 200
        data = response.json()
        assert "keywords_used" in data, f"Missing 'keywords_used'"
        assert "keywords_total" in data, f"Missing 'keywords_total'"


class TestGenerateBlogsEndpoint:
    """Tests for POST /api/growth/generate-blogs"""

    def test_generate_blogs_returns_200(self):
        """Test POST /api/growth/generate-blogs returns 200"""
        response = requests.post(
            f"{BASE_URL}/api/growth/generate-blogs",
            json={"count": 5},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"

    def test_generate_blogs_returns_success_and_started(self):
        """Test generate-blogs returns success:true and status:started"""
        response = requests.post(
            f"{BASE_URL}/api/growth/generate-blogs",
            json={"count": 1},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("success") is True, f"Expected success=True: {data}"
        assert data.get("status") == "started", f"Expected status=started: {data}"

    def test_generate_blogs_returns_message(self):
        """Test generate-blogs returns a message"""
        response = requests.post(
            f"{BASE_URL}/api/growth/generate-blogs",
            json={"count": 2},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "message" in data, f"Expected message in response: {data}"
        assert isinstance(data["message"], str), f"message should be string"


class TestEnrichWeakSectionsEndpoint:
    """Tests for POST /api/growth/enrich-weak-sections"""

    def test_enrich_sections_returns_200(self):
        """Test POST /api/growth/enrich-weak-sections returns 200"""
        response = requests.post(f"{BASE_URL}/api/growth/enrich-weak-sections")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"

    def test_enrich_sections_returns_success_and_started(self):
        """Test enrich-weak-sections returns success:true and status:started"""
        response = requests.post(f"{BASE_URL}/api/growth/enrich-weak-sections")
        assert response.status_code == 200
        data = response.json()
        assert data.get("success") is True, f"Expected success=True: {data}"
        assert data.get("status") == "started", f"Expected status=started: {data}"

    def test_enrich_sections_returns_message(self):
        """Test enrich-weak-sections returns a message"""
        response = requests.post(f"{BASE_URL}/api/growth/enrich-weak-sections")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data, f"Expected message in response: {data}"
        assert isinstance(data["message"], str), f"message should be string"


class TestIntegrationDataConsistency:
    """Tests verifying data consistency across endpoints"""

    def test_adaptive_status_totals_match_api_counts(self):
        """Verify adaptive-status totals match dedicated API counts"""
        # Get adaptive status
        status_resp = requests.get(f"{BASE_URL}/api/growth/adaptive-status")
        assert status_resp.status_code == 200
        status = status_resp.json()
        
        # Get blog count from blog API
        blog_resp = requests.get(f"{BASE_URL}/api/blog")
        assert blog_resp.status_code == 200
        blogs = blog_resp.json()
        
        # Compare total_blogs (may be slightly different if new ones being generated)
        assert abs(status["total_blogs"] - len(blogs)) <= 5, f"Blog count mismatch: adaptive={status['total_blogs']}, api={len(blogs)}"

    def test_seo_score_consistent_with_audit(self):
        """Verify seo_score in adaptive-status matches SEO audit"""
        status_resp = requests.get(f"{BASE_URL}/api/growth/adaptive-status")
        assert status_resp.status_code == 200
        status = status_resp.json()
        
        audit_resp = requests.get(f"{BASE_URL}/api/seo-audit/latest")
        assert audit_resp.status_code == 200
        audit = audit_resp.json()
        
        if audit.get("success") and audit.get("overall_score") is not None:
            assert status["seo_score"] == audit["overall_score"], f"SEO score mismatch: adaptive={status['seo_score']}, audit={audit['overall_score']}"


class TestBlogCount:
    """Verify blog post count per requirements"""

    def test_blog_count_is_at_least_14(self):
        """Test that blog posts increased from 9 to at least 14"""
        response = requests.get(f"{BASE_URL}/api/blog")
        assert response.status_code == 200
        blogs = response.json()
        assert len(blogs) >= 14, f"Expected at least 14 blog posts, got {len(blogs)}"


class TestSitemapURLs:
    """Verify sitemap URL count per requirements"""

    def test_sitemap_has_at_least_169_urls(self):
        """Test that sitemap now has at least 169 URLs (up from 164)"""
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        assert response.status_code == 200
        # Count <loc> tags
        xml_content = response.text
        url_count = xml_content.count("<loc>")
        assert url_count >= 169, f"Expected at least 169 URLs in sitemap, got {url_count}"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
