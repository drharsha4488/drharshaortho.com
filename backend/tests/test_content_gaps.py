"""
Test suite for iteration 7:
- GET /api/content-gaps - Content gap analysis endpoint
- POST /api/content-enrich - Content enrichment endpoint  
- GET /api/seo-audit/run, /api/seo-audit/latest, /api/seo-audit/history - Regression tests
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestContentGapAnalysis:
    """Tests for Content Gap Analysis feature"""
    
    def test_content_gaps_endpoint_returns_200(self):
        """Test GET /api/content-gaps returns 200 status"""
        response = requests.get(f"{BASE_URL}/api/content-gaps")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        print("PASS: /api/content-gaps returns 200")
    
    def test_content_gaps_response_structure(self):
        """Test GET /api/content-gaps returns correct structure"""
        response = requests.get(f"{BASE_URL}/api/content-gaps")
        assert response.status_code == 200
        data = response.json()
        
        # Check success flag
        assert data.get("success") == True, "Expected success=True"
        
        # Check required fields
        required_fields = ["total_pages", "conditions_count", "treatments_count", 
                          "avg_completeness", "pages_needing_enrichment"]
        for field in required_fields:
            assert field in data, f"Missing field: {field}"
        
        # Validate types
        assert isinstance(data["total_pages"], int), "total_pages should be int"
        assert isinstance(data["conditions_count"], int), "conditions_count should be int"
        assert isinstance(data["treatments_count"], int), "treatments_count should be int"
        assert isinstance(data["avg_completeness"], int), "avg_completeness should be int"
        assert isinstance(data["pages_needing_enrichment"], int), "pages_needing_enrichment should be int"
        
        print(f"PASS: Response structure valid - {data['total_pages']} pages, {data['avg_completeness']}% avg completeness")
    
    def test_content_gaps_gap_pages_structure(self):
        """Test that gap_pages array has proper structure"""
        response = requests.get(f"{BASE_URL}/api/content-gaps")
        assert response.status_code == 200
        data = response.json()
        
        assert "gap_pages" in data, "Missing gap_pages field"
        assert isinstance(data["gap_pages"], list), "gap_pages should be a list"
        
        if len(data["gap_pages"]) > 0:
            page = data["gap_pages"][0]
            # Check page structure
            assert "slug" in page, "gap_page missing slug"
            assert "title" in page, "gap_page missing title"
            assert "type" in page, "gap_page missing type"
            assert "completeness" in page, "gap_page missing completeness"
            assert "missing_sections" in page, "gap_page missing missing_sections"
            assert "needs_enrichment" in page, "gap_page missing needs_enrichment"
            
            print(f"PASS: gap_pages structure valid - first page: {page['slug']} ({page['completeness']}%)")
        else:
            print("PASS: gap_pages is empty (all pages complete)")
    
    def test_content_gaps_missing_sections_format(self):
        """Test that missing_sections contains expected section names"""
        response = requests.get(f"{BASE_URL}/api/content-gaps")
        assert response.status_code == 200
        data = response.json()
        
        # Expected sections for conditions and treatments
        condition_sections = {"overview", "introduction", "symptoms", "causes", "treatments", "faq", "prevention", "when_to_see_doctor"}
        treatment_sections = {"description", "benefits", "procedure_steps", "recovery", "faq", "risks", "ideal_candidates", "candidacy"}
        
        for page in data.get("gap_pages", [])[:5]:  # Check first 5 gap pages
            missing = set(page.get("missing_sections", []))
            if page.get("type") == "condition":
                # Check missing sections are valid condition sections
                for sec in missing:
                    assert sec in condition_sections or sec in treatment_sections, f"Unknown section: {sec}"
            print(f"  Checked: {page['slug']} - missing {len(missing)} sections")
        
        print("PASS: missing_sections contain valid section names")


class TestContentEnrichment:
    """Tests for Content Enrichment endpoint - DO NOT trigger bulk enrichment"""
    
    def test_content_enrich_endpoint_structure(self):
        """Test POST /api/content-enrich responds correctly (without triggering actual enrichment)"""
        # Send empty slugs list to test endpoint without triggering AI
        response = requests.post(
            f"{BASE_URL}/api/content-enrich",
            json={"slugs": [], "max_pages": 0}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        assert "success" in data, "Missing success field"
        print("PASS: /api/content-enrich endpoint responds correctly")
    
    def test_content_enrich_with_invalid_slug(self):
        """Test POST /api/content-enrich with non-existent slug"""
        response = requests.post(
            f"{BASE_URL}/api/content-enrich",
            json={"slugs": ["nonexistent-test-slug-xyz"], "max_pages": 1}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        
        assert data.get("success") == True, "Expected success=True"
        # With invalid slug, enriched should be 0
        assert data.get("enriched") == 0, f"Expected enriched=0 for invalid slug, got {data.get('enriched')}"
        
        print("PASS: Invalid slug handled correctly - enriched=0")


class TestSeoAuditRegression:
    """Regression tests for SEO Audit endpoints"""
    
    def test_seo_audit_run_endpoint(self):
        """Regression: POST /api/seo-audit/run works"""
        response = requests.post(
            f"{BASE_URL}/api/seo-audit/run",
            json={"max_pages": 3}  # Minimal pages for quick test
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        assert data.get("success") == True, "Expected success=True"
        assert "overall_score" in data, "Missing overall_score"
        assert "pages_audited" in data, "Missing pages_audited"
        
        print(f"PASS: POST /api/seo-audit/run - score={data['overall_score']}, pages={data['pages_audited']}")
    
    def test_seo_audit_latest_endpoint(self):
        """Regression: GET /api/seo-audit/latest works"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/latest")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        
        # Either has audit data or says no data
        assert "success" in data, "Missing success field"
        if data.get("success"):
            assert "overall_score" in data, "Missing overall_score when success=True"
        
        print(f"PASS: GET /api/seo-audit/latest - success={data.get('success')}")
    
    def test_seo_audit_history_endpoint(self):
        """Regression: GET /api/seo-audit/history works"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/history")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        
        assert data.get("success") == True, "Expected success=True"
        assert "history" in data, "Missing history field"
        assert isinstance(data["history"], list), "history should be a list"
        
        print(f"PASS: GET /api/seo-audit/history - {len(data['history'])} records")


@pytest.fixture(scope="module")
def verify_base_url():
    """Verify BASE_URL is set"""
    if not BASE_URL:
        pytest.skip("REACT_APP_BACKEND_URL not set")
    return BASE_URL


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
