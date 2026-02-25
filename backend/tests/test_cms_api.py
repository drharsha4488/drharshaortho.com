"""
Test CMS API endpoints for Dr. Harsha Orthopedic Website
Tests: Public CMS endpoints for conditions and treatments
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://careconnect-cms.preview.emergentagent.com').rstrip('/')


class TestHealthAndRoot:
    """Basic health and root endpoint tests"""
    
    def test_health_endpoint(self):
        """Test health check endpoint - Note: /health is handled by frontend in preview"""
        # In preview environment, /health may be caught by React router
        # We verify backend is working via /api/ endpoint instead
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        print(f"PASS: API is accessible (health check via root API)")
    
    def test_root_api_endpoint(self):
        """Test root API endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "CareConnect" in data.get("message", "")
        print(f"PASS: Root API endpoint working")


class TestCMSConditionsAPI:
    """Test CMS Conditions endpoints"""
    
    def test_get_all_conditions(self):
        """Test fetching all conditions"""
        response = requests.get(f"{BASE_URL}/api/cms/conditions")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        print(f"PASS: Retrieved {len(data)} conditions from CMS")
    
    def test_get_knee_arthritis_condition(self):
        """Test knee-arthritis condition has detailed content"""
        response = requests.get(f"{BASE_URL}/api/cms/conditions/knee-arthritis")
        assert response.status_code == 200
        data = response.json()
        
        # Verify basic fields
        assert data.get("slug") == "knee-arthritis"
        assert data.get("status") == "published"
        
        # Verify content structure
        content = data.get("content", {})
        assert content.get("overview"), "Missing overview"
        assert len(content.get("causes", [])) > 0, "Missing causes"
        assert len(content.get("symptoms", [])) > 0, "Missing symptoms"
        
        # Verify detailed non-surgical treatments
        non_surgical = content.get("nonSurgicalTreatments", [])
        assert len(non_surgical) > 0, "Missing nonSurgicalTreatments"
        
        # Verify Physical Therapy Protocol has details
        physical_therapy = next((t for t in non_surgical if "Physical Therapy" in t.get("name", "")), None)
        assert physical_therapy, "Physical Therapy Protocol not found"
        assert physical_therapy.get("details"), "Physical Therapy missing details"
        assert len(physical_therapy.get("details", [])) >= 3, "Physical Therapy should have multiple details"
        print(f"PASS: Physical Therapy Protocol has {len(physical_therapy.get('details', []))} details")
        
        # Verify surgical treatments
        surgical = content.get("surgicalTreatments", [])
        assert len(surgical) > 0, "Missing surgicalTreatments"
        
        # Verify FAQs
        faqs = content.get("faqs", [])
        assert len(faqs) > 0, "Missing FAQs"
        print(f"PASS: knee-arthritis condition has {len(faqs)} FAQs")
    
    def test_get_acl_tear_condition(self):
        """Test acl-tear condition has RICE Protocol and Physical Therapy details"""
        response = requests.get(f"{BASE_URL}/api/cms/conditions/acl-tear")
        assert response.status_code == 200
        data = response.json()
        
        content = data.get("content", {})
        non_surgical = content.get("nonSurgicalTreatments", [])
        
        # Verify RICE Protocol
        rice = next((t for t in non_surgical if "RICE" in t.get("name", "")), None)
        assert rice, "RICE Protocol not found"
        assert rice.get("details"), "RICE Protocol missing details"
        print(f"PASS: RICE Protocol found with {len(rice.get('details', []))} details")
        
        # Verify Physical Therapy for ACL
        pt = next((t for t in non_surgical if "Physical Therapy" in t.get("name", "")), None)
        assert pt, "Physical Therapy not found for ACL"
        assert pt.get("details"), "Physical Therapy missing details"
        print(f"PASS: Physical Therapy found with {len(pt.get('details', []))} details")
        
        # Verify FAQs
        faqs = content.get("faqs", [])
        assert len(faqs) > 0, "Missing FAQs for ACL tear"
        print(f"PASS: acl-tear condition has {len(faqs)} FAQs")
    
    def test_condition_not_found(self):
        """Test 404 for non-existent condition"""
        response = requests.get(f"{BASE_URL}/api/cms/conditions/non-existent-condition-xyz")
        assert response.status_code == 404
        print("PASS: Returns 404 for non-existent condition")


class TestCMSTreatmentsAPI:
    """Test CMS Treatments endpoints"""
    
    def test_get_all_treatments(self):
        """Test fetching all treatments"""
        response = requests.get(f"{BASE_URL}/api/cms/treatments")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        print(f"PASS: Retrieved {len(data)} treatments from CMS")
    
    def test_get_total_knee_replacement_treatment(self):
        """Test total-knee-replacement treatment has detailed content"""
        response = requests.get(f"{BASE_URL}/api/cms/treatments/total-knee-replacement")
        assert response.status_code == 200
        data = response.json()
        
        # Verify basic fields
        assert data.get("slug") == "total-knee-replacement"
        assert data.get("status") == "published"
        
        content = data.get("content", {})
        
        # Verify overview
        assert content.get("overview"), "Missing overview"
        
        # Verify statistics
        statistics = content.get("statistics", [])
        assert len(statistics) > 0, "Missing statistics"
        print(f"PASS: TKR has {len(statistics)} statistics")
        
        # Verify procedure steps
        procedure_steps = content.get("procedureSteps", [])
        assert len(procedure_steps) > 0, "Missing procedureSteps"
        
        # Verify each step has title and description
        for step in procedure_steps[:3]:
            assert step.get("title"), "Step missing title"
            assert step.get("description"), "Step missing description"
        print(f"PASS: TKR has {len(procedure_steps)} procedure steps")
        
        # Verify benefits
        benefits = content.get("benefits", [])
        assert len(benefits) > 0, "Missing benefits"
        print(f"PASS: TKR has {len(benefits)} benefits")
        
        # Verify FAQs
        faqs = content.get("faqs", [])
        assert len(faqs) > 0, "Missing FAQs"
        print(f"PASS: TKR has {len(faqs)} FAQs")
        
        # Verify recovery timeline
        recovery = content.get("recoveryTimeline", [])
        assert len(recovery) > 0, "Missing recovery timeline"
        print(f"PASS: TKR has {len(recovery)} recovery phases")
    
    def test_treatment_not_found(self):
        """Test 404 for non-existent treatment"""
        response = requests.get(f"{BASE_URL}/api/cms/treatments/non-existent-treatment-xyz")
        assert response.status_code == 404
        print("PASS: Returns 404 for non-existent treatment")


class TestCMSEnrichmentEndpoint:
    """Test CMS Enrichment Admin Endpoint"""
    
    def test_enrich_detailed_content_endpoint_exists(self):
        """Test that the enrichment endpoint exists (POST)"""
        # Just test the endpoint is accessible (returns success or already enriched)
        response = requests.post(f"{BASE_URL}/api/admin/cms/enrich-detailed-content")
        # Should return 200 (already enriched) or success
        assert response.status_code == 200
        data = response.json()
        assert data.get("success") == True
        print(f"PASS: Enrichment endpoint returned success: {data.get('message')}")


class TestOtherAPIEndpoints:
    """Test other API endpoints"""
    
    def test_testimonials_endpoint(self):
        """Test testimonials endpoint"""
        response = requests.get(f"{BASE_URL}/api/testimonials")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: Testimonials endpoint returns {len(data)} items")
    
    def test_blog_endpoint(self):
        """Test blog endpoint"""
        response = requests.get(f"{BASE_URL}/api/blog")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: Blog endpoint returns {len(data)} items")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
