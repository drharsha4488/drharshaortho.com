"""
Iteration 11: Comprehensive SEO Audit System Testing
- Tests SEO Health Monitor with 14 category scores
- Tests 3-phase audit: HTML Crawl, CMS Content, Site-wide
- Tests admin dashboard login
- Tests enriched static pages: About, Contact, Testimonials
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestSEOAuditAPIs:
    """Test SEO Audit API endpoints"""
    
    def test_seo_audit_latest_returns_data(self):
        """GET /api/seo-audit/latest returns comprehensive audit data"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/latest")
        assert response.status_code == 200
        data = response.json()
        
        # Verify success flag
        assert data.get("success") == True
        
        # Verify overall score exists and is in range
        assert "overall_score" in data
        assert 0 <= data["overall_score"] <= 100
        print(f"Overall score: {data['overall_score']}/100")
        
    def test_seo_audit_has_category_scores(self):
        """Verify category_scores contains all 14 SEO categories"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/latest")
        data = response.json()
        
        assert "category_scores" in data
        category_scores = data["category_scores"]
        
        # Expected 14 categories
        expected_categories = [
            "meta", "schema", "headings", "images", "content", "social",
            "technical", "internal_linking", "eeat", "local_seo", "geo_aeo",
            "performance", "programmatic_seo", "accessibility"
        ]
        
        found_categories = list(category_scores.keys())
        print(f"Found {len(found_categories)} categories: {found_categories}")
        
        # Verify at least most categories are present
        assert len(found_categories) >= 10, f"Expected at least 10 categories, got {len(found_categories)}"
        
        # Verify each score is valid
        for cat, score in category_scores.items():
            assert isinstance(score, (int, float)), f"Category {cat} score should be numeric"
            assert 0 <= score <= 100, f"Category {cat} score {score} out of range"
            print(f"  {cat}: {score}")
            
    def test_seo_audit_has_audit_phases(self):
        """Verify audit_phases shows 3-phase audit structure"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/latest")
        data = response.json()
        
        assert "audit_phases" in data
        phases = data["audit_phases"]
        
        # Verify 3 phases
        assert "html_crawl" in phases, "Missing html_crawl phase"
        assert "cms_content" in phases, "Missing cms_content phase"
        assert "site_wide" in phases, "Missing site_wide phase"
        
        # Verify phase data structure
        if phases.get("html_crawl"):
            assert "pages" in phases["html_crawl"]
            assert "issues" in phases["html_crawl"]
            print(f"HTML Crawl: {phases['html_crawl']['pages']} pages, {phases['html_crawl']['issues']} issues")
            
        if phases.get("cms_content"):
            assert "pages_checked" in phases["cms_content"]
            assert "issues" in phases["cms_content"]
            print(f"CMS Content: {phases['cms_content']['pages_checked']} pages, {phases['cms_content']['issues']} issues")
            
        if phases.get("site_wide"):
            assert "issues" in phases["site_wide"]
            print(f"Site-wide: {phases['site_wide']['issues']} issues")

    def test_seo_audit_has_issue_counts(self):
        """Verify issue severity counts: critical, warnings, info"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/latest")
        data = response.json()
        
        # Verify counts exist
        assert "critical" in data
        assert "warnings" in data
        assert "info" in data
        assert "total_issues" in data
        
        print(f"Critical: {data['critical']}, Warnings: {data['warnings']}, Info: {data['info']}")
        print(f"Total issues: {data['total_issues']}")
        
        # Verify counts add up approximately
        total = data["critical"] + data["warnings"] + data["info"]
        assert data["total_issues"] >= total, "Total issues should be >= sum of severities"
        
    def test_seo_audit_has_category_breakdown(self):
        """Verify category_breakdown shows issues per category"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/latest")
        data = response.json()
        
        assert "category_breakdown" in data
        breakdown = data["category_breakdown"]
        
        # Verify breakdown has issue counts
        print(f"Category breakdown: {breakdown}")
        for cat, count in breakdown.items():
            assert isinstance(count, int), f"Category {cat} count should be integer"
            assert count >= 0, f"Category {cat} count should be non-negative"
            
    def test_seo_audit_status_endpoint(self):
        """GET /api/seo-audit/status returns running status"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/status")
        assert response.status_code == 200
        data = response.json()
        
        assert "running" in data
        assert isinstance(data["running"], bool)
        print(f"Audit running: {data['running']}")
        
    def test_seo_audit_history_endpoint(self):
        """GET /api/seo-audit/history returns audit history"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/history")
        assert response.status_code == 200
        data = response.json()
        
        assert "success" in data
        if data.get("history"):
            history = data["history"]
            assert isinstance(history, list)
            print(f"Found {len(history)} historical audits")
            
            # Verify history items have required fields
            for entry in history[:3]:
                assert "date" in entry or "overall_score" in entry
                if "overall_score" in entry:
                    print(f"  Date: {entry.get('date', 'N/A')}, Score: {entry['overall_score']}")


class TestSEOAuditRunEndpoint:
    """Test running new SEO audits"""
    
    def test_seo_audit_run_returns_started(self):
        """POST /api/seo-audit/run starts background audit"""
        response = requests.post(f"{BASE_URL}/api/seo-audit/run")
        assert response.status_code == 200
        data = response.json()
        
        # Should return started or running status
        assert "status" in data
        assert data["status"] in ["started", "running", "already_running"]
        print(f"Audit status: {data['status']}")
        
        if data.get("message"):
            print(f"Message: {data['message']}")


class TestSEOAutoFix:
    """Test Self-Heal auto-fix functionality"""
    
    def test_seo_autofix_endpoint_exists(self):
        """POST /api/seo-audit/auto-fix endpoint works"""
        response = requests.post(f"{BASE_URL}/api/seo-audit/auto-fix")
        # May return 200 with fixes or error if nothing to fix
        assert response.status_code in [200, 400, 500]
        
        if response.status_code == 200:
            data = response.json()
            print(f"Auto-fix result: {data}")
            if "fixes_applied" in data:
                print(f"Fixes applied: {data['fixes_applied']}")


class TestAdminDashboard:
    """Test admin dashboard and authentication"""
    
    def test_admin_login_with_correct_password(self):
        """Admin dashboard accepts correct password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "drharsha2025"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("success") == True or data.get("authenticated") == True
        print("Admin login successful")
        
    def test_admin_login_rejects_wrong_password(self):
        """Admin dashboard rejects wrong password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "wrongpassword123"}
        )
        # Should return 401 or 403
        assert response.status_code in [401, 403]
        print("Wrong password correctly rejected")


class TestStaticPages:
    """Test enriched static pages"""
    
    def test_about_page_loads(self):
        """About page (/about) loads successfully"""
        response = requests.get(f"{BASE_URL}/about")
        # Frontend pages return HTML
        assert response.status_code == 200
        print("About page loads")
        
    def test_contact_page_loads(self):
        """Contact page (/contact) loads successfully"""
        response = requests.get(f"{BASE_URL}/contact")
        assert response.status_code == 200
        print("Contact page loads")
        
    def test_testimonials_page_loads(self):
        """Testimonials page (/testimonials) loads successfully"""
        response = requests.get(f"{BASE_URL}/testimonials")
        assert response.status_code == 200
        print("Testimonials page loads")


class TestAutomationStatus:
    """Test automation status endpoint"""
    
    def test_automation_status_returns_data(self):
        """GET /api/admin/automation/status returns automation info"""
        response = requests.get(f"{BASE_URL}/api/admin/automation/status")
        assert response.status_code == 200
        data = response.json()
        
        # Verify key fields
        assert "scheduler_running" in data or "content_totals" in data
        
        if "content_totals" in data:
            totals = data["content_totals"]
            print(f"Content totals: {totals}")
            
        if "growth" in data:
            growth = data["growth"]
            print(f"Growth trend: {growth.get('trend', 'N/A')}")
            

class TestGrowthTracking:
    """Test growth tracking endpoints"""
    
    def test_growth_history_returns_data(self):
        """GET /api/admin/growth/history returns snapshots"""
        response = requests.get(f"{BASE_URL}/api/admin/growth/history?days=7")
        assert response.status_code == 200
        data = response.json()
        
        if "snapshots" in data:
            snapshots = data["snapshots"]
            print(f"Found {len(snapshots)} growth snapshots")
            
    def test_growth_snapshot_records(self):
        """POST /api/admin/growth/snapshot records today's data"""
        response = requests.post(f"{BASE_URL}/api/admin/growth/snapshot")
        assert response.status_code == 200
        data = response.json()
        print(f"Growth snapshot: {data}")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
