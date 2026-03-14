"""
Test Iteration 8 Features:
1. POST /api/seo-audit/auto-fix - Self-Heal finds CMS pages with meta descriptions >160 or <80 chars and fixes them
2. POST /api/content-enrich - Enrichment with max_pages=2 to avoid timeout
3. Inline status banners are returned correctly
4. Regression tests for GET /api/seo-audit/latest and GET /api/content-gaps
"""
import pytest
import requests
import os

# Use the public URL from frontend .env
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://care-growth-hub.preview.emergentagent.com')


class TestSEOAutoFix:
    """Tests for Self-Heal feature - now scans CMS pages directly for bad meta descriptions"""

    def test_auto_fix_endpoint_returns_success(self):
        """POST /api/seo-audit/auto-fix - returns success with fix details"""
        response = requests.post(f"{BASE_URL}/api/seo-audit/auto-fix")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data.get("success") == True, "Expected success=True"
        assert "fixes_applied" in data, "Response should have 'fixes_applied'"
        assert "total_needing_fix" in data, "Response should have 'total_needing_fix'"
        print(f"✓ Auto-fix: {data.get('fixes_applied')} fixes applied, {data.get('total_needing_fix')} total needing fix")

    def test_auto_fix_returns_action_field(self):
        """POST /api/seo-audit/auto-fix - fixes contain action='shortened' for long descriptions"""
        response = requests.post(f"{BASE_URL}/api/seo-audit/auto-fix")
        assert response.status_code == 200
        
        data = response.json()
        fixes = data.get("fixes", [])
        
        if len(fixes) > 0:
            fix = fixes[0]
            assert "action" in fix, "Fix should have 'action' field"
            assert fix.get("action") in ["shortened", "generated", "improved"], f"Unexpected action: {fix.get('action')}"
            assert "old_length" in fix, "Fix should have 'old_length' field"
            assert "new_length" in fix, "Fix should have 'new_length' field"
            print(f"✓ First fix: action={fix.get('action')}, {fix.get('old_length')}→{fix.get('new_length')} chars")
        else:
            print("✓ No fixes needed - all pages have valid meta descriptions (80-160 chars)")

    def test_auto_fix_fixes_have_valid_lengths(self):
        """Verify fixed meta descriptions are within valid range (50-160 chars)"""
        response = requests.post(f"{BASE_URL}/api/seo-audit/auto-fix")
        assert response.status_code == 200
        
        data = response.json()
        fixes = data.get("fixes", [])
        
        for fix in fixes[:5]:  # Check first 5 fixes
            new_length = fix.get("new_length", 0)
            assert 50 <= new_length <= 160, f"Fix new_length={new_length} is outside valid range 50-160"
            print(f"✓ Fix /{fix.get('slug')}: {new_length} chars (valid)")


class TestContentEnrichment:
    """Tests for Content Enrichment - now batched to 2 pages to avoid timeout"""

    def test_content_enrich_with_max_pages_2(self):
        """POST /api/content-enrich with max_pages=2 completes without timeout"""
        response = requests.post(
            f"{BASE_URL}/api/content-enrich",
            headers={"Content-Type": "application/json"},
            json={"max_pages": 2},
            timeout=120  # Allow up to 2 minutes
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data.get("success") == True, "Expected success=True"
        assert "enriched" in data, "Response should have 'enriched' count"
        assert "total_attempted" in data, "Response should have 'total_attempted'"
        assert data.get("total_attempted") <= 2, f"Should only attempt 2 pages, got {data.get('total_attempted')}"
        print(f"✓ Enrichment: {data.get('enriched')}/{data.get('total_attempted')} pages enriched")

    def test_content_enrich_returns_sections_added(self):
        """POST /api/content-enrich returns details of sections added"""
        response = requests.post(
            f"{BASE_URL}/api/content-enrich",
            headers={"Content-Type": "application/json"},
            json={"max_pages": 2},
            timeout=120
        )
        assert response.status_code == 200
        
        data = response.json()
        results = data.get("results", [])
        
        if len(results) > 0:
            for result in results:
                if result.get("enriched"):
                    assert "sections_added" in result, "Enriched result should have 'sections_added'"
                    assert "type" in result, "Result should have 'type' (condition/treatment)"
                    print(f"✓ /{result.get('slug')}: +{len(result.get('sections_added', []))} sections")
        else:
            print("✓ No pages enriched (all complete or no gaps)")


class TestRegressionChecks:
    """Regression tests for existing endpoints"""

    def test_seo_audit_latest_works(self):
        """GET /api/seo-audit/latest - regression check"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/latest")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data.get("success") == True, "Expected success=True"
        
        if data.get("overall_score") is not None:
            assert "overall_score" in data
            assert "pages_audited" in data
            assert "total_issues" in data
            print(f"✓ Latest audit: {data.get('overall_score')}/100, {data.get('pages_audited')} pages, {data.get('total_issues')} issues")
        else:
            print("✓ No audit data yet")

    def test_content_gaps_endpoint_works(self):
        """GET /api/content-gaps - regression check"""
        response = requests.get(f"{BASE_URL}/api/content-gaps")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data.get("success") == True, "Expected success=True"
        assert "total_pages" in data, "Should have 'total_pages'"
        assert "conditions_count" in data, "Should have 'conditions_count'"
        assert "treatments_count" in data, "Should have 'treatments_count'"
        assert "avg_completeness" in data, "Should have 'avg_completeness'"
        assert "pages_needing_enrichment" in data, "Should have 'pages_needing_enrichment'"
        assert "gap_pages" in data, "Should have 'gap_pages' array"
        
        print(f"✓ Content gaps: {data.get('total_pages')} pages, {data.get('avg_completeness')}% complete, {data.get('pages_needing_enrichment')} need enrichment")

    def test_seo_audit_history_works(self):
        """GET /api/seo-audit/history - regression check"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/history")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data.get("success") == True, "Expected success=True"
        assert "history" in data, "Should have 'history' array"
        
        history = data.get("history", [])
        print(f"✓ Audit history: {len(history)} records")


class TestSEOFixHistory:
    """Tests for SEO fix history endpoint"""

    def test_seo_fix_history_endpoint(self):
        """GET /api/seo-audit/fixes - returns fix history"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/fixes")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data.get("success") == True, "Expected success=True"
        assert "history" in data, "Should have 'history' array"
        assert "latest" in data, "Should have 'latest' field"
        
        history = data.get("history", [])
        print(f"✓ Fix history: {len(history)} records")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
