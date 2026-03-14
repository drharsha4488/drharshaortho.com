"""
Test SEO Auto-Fix and Self-Healing endpoints:
- POST /api/seo-audit/auto-fix - triggers GPT-4o auto-fix for SEO issues
- GET /api/seo-audit/fixes - returns fix history
- Regression: POST /api/seo-audit/run, GET /api/seo-audit/latest, GET /api/seo-audit/history
"""
import pytest
import requests
import os

# Use the public URL from frontend .env
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://care-growth-hub.preview.emergentagent.com')

class TestSEOAutoFix:
    """Tests for SEO Auto-Fix self-healing feature"""

    def test_seo_audit_latest_exists(self):
        """GET /api/seo-audit/latest - verify we have audit data"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/latest")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data.get("success") == True, "Expected success=True"
        # If there's audit data, verify structure
        if data.get("overall_score") is not None:
            assert "overall_score" in data
            assert "pages_audited" in data
            assert "total_issues" in data
            print(f"✓ Latest audit: Score {data.get('overall_score')}/100, {data.get('total_issues')} issues")
        else:
            print("✓ No audit data yet (expected if no audit has run)")

    def test_seo_auto_fix_endpoint(self):
        """POST /api/seo-audit/auto-fix - triggers AI auto-fix"""
        response = requests.post(f"{BASE_URL}/api/seo-audit/auto-fix")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "success" in data, "Response should have 'success' field"
        assert data.get("success") == True, "Expected success=True"
        
        # Verify fix result fields
        assert "fixes_applied" in data, "Response should have 'fixes_applied' count"
        fixes_applied = data.get("fixes_applied", 0)
        assert isinstance(fixes_applied, int), "fixes_applied should be integer"
        
        # If fixes were applied, verify the fixes array
        if fixes_applied > 0:
            assert "fixes" in data, "Response should have 'fixes' array when fixes were applied"
            fixes = data.get("fixes", [])
            assert isinstance(fixes, list), "fixes should be a list"
            if len(fixes) > 0:
                fix = fixes[0]
                assert "type" in fix, "Each fix should have 'type'"
                assert "slug" in fix, "Each fix should have 'slug'"
                print(f"✓ Auto-fix applied {fixes_applied} fixes")
        else:
            # No fixes needed - all pages already have meta data
            print(f"✓ Auto-fix returned: 0 fixes needed (CMS pages already have meta descriptions)")

    def test_seo_fix_history_endpoint(self):
        """GET /api/seo-audit/fixes - returns fix history"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/fixes")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "success" in data, "Response should have 'success' field"
        assert data.get("success") == True, "Expected success=True"
        
        # Verify required fields
        assert "latest" in data, "Response should have 'latest' field"
        assert "history" in data, "Response should have 'history' field"
        
        history = data.get("history", [])
        assert isinstance(history, list), "history should be a list"
        
        # If there's history, verify structure
        if len(history) > 0:
            record = history[0]
            assert "date" in record, "History record should have 'date'"
            assert "fixes_applied" in record, "History record should have 'fixes_applied'"
            print(f"✓ Fix history has {len(history)} records")
        else:
            print("✓ Fix history is empty (expected if no auto-fixes have run)")
        
        # Check latest fix if present
        latest = data.get("latest")
        if latest:
            print(f"✓ Latest fix: {latest.get('fixes_applied', 0)} fixes on {latest.get('date', 'unknown')}")


class TestSEOAuditRegression:
    """Regression tests for existing SEO audit endpoints"""

    def test_seo_audit_run_still_works(self):
        """POST /api/seo-audit/run - regression: run audit"""
        response = requests.post(
            f"{BASE_URL}/api/seo-audit/run",
            headers={"Content-Type": "application/json"},
            json={"max_pages": 5}  # Limit to 5 pages for speed
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data.get("success") == True, "Expected success=True"
        assert "overall_score" in data, "Response should have 'overall_score'"
        assert "pages_audited" in data, "Response should have 'pages_audited'"
        assert "total_issues" in data, "Response should have 'total_issues'"
        
        print(f"✓ Audit run: Score {data.get('overall_score')}/100, {data.get('pages_audited')} pages, {data.get('total_issues')} issues")

    def test_seo_audit_latest_still_works(self):
        """GET /api/seo-audit/latest - regression: get latest audit"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/latest")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data.get("success") == True, "Expected success=True"
        print(f"✓ Latest audit accessible with score {data.get('overall_score', 'N/A')}/100")

    def test_seo_audit_history_still_works(self):
        """GET /api/seo-audit/history - regression: get audit history"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/history")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data.get("success") == True, "Expected success=True"
        history = data.get("history", [])
        assert isinstance(history, list), "history should be a list"
        
        print(f"✓ Audit history has {len(history)} records")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
