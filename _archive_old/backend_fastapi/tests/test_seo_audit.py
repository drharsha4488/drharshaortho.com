"""
Test SEO Audit API endpoints
- POST /api/seo-audit/run - triggers a full site audit
- GET /api/seo-audit/latest - returns the most recent audit data
- GET /api/seo-audit/history - returns audit history list
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    raise ValueError("REACT_APP_BACKEND_URL environment variable is required")


class TestSEOAuditAPIs:
    """Test SEO Audit API endpoints"""
    
    def test_seo_audit_latest_endpoint(self):
        """Test GET /api/seo-audit/latest returns audit data if exists"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/latest", timeout=10)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "success" in data, "Response should contain 'success' field"
        
        if data.get("success"):
            # Validate audit result structure
            assert "overall_score" in data, "Audit should have overall_score"
            assert "pages_audited" in data, "Audit should have pages_audited"
            assert "total_issues" in data, "Audit should have total_issues"
            assert "critical" in data, "Audit should have critical count"
            assert "warnings" in data, "Audit should have warnings count"
            assert "info" in data, "Audit should have info count"
            assert "category_breakdown" in data, "Audit should have category_breakdown"
            
            # Validate data types
            assert isinstance(data["overall_score"], (int, float)), "overall_score should be numeric"
            assert isinstance(data["pages_audited"], int), "pages_audited should be integer"
            assert isinstance(data["total_issues"], int), "total_issues should be integer"
            print(f"PASS: Latest audit score={data['overall_score']}, pages={data['pages_audited']}, issues={data['total_issues']}")
        else:
            # No audit data yet - this is acceptable
            assert "message" in data, "Should have message if no audit data"
            print(f"PASS: No audit data yet - {data.get('message', 'No message')}")
    
    def test_seo_audit_history_endpoint(self):
        """Test GET /api/seo-audit/history returns list of audits"""
        response = requests.get(f"{BASE_URL}/api/seo-audit/history?limit=10", timeout=10)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "success" in data, "Response should contain 'success' field"
        assert data.get("success") == True, "History endpoint should return success=True"
        assert "history" in data, "Response should contain 'history' field"
        assert isinstance(data["history"], list), "history should be a list"
        
        if len(data["history"]) > 0:
            # Validate history item structure
            item = data["history"][0]
            assert "overall_score" in item, "History item should have overall_score"
            assert "pages_audited" in item, "History item should have pages_audited"
            assert "date" in item, "History item should have date"
            print(f"PASS: Found {len(data['history'])} audit history records")
        else:
            print("PASS: History is empty but endpoint works")
    
    def test_seo_audit_run_endpoint(self):
        """Test POST /api/seo-audit/run triggers an audit and returns results"""
        # Note: This test may take 10-30 seconds as it actually crawls the site
        payload = {"max_pages": 10}  # Limit pages to speed up test
        
        response = requests.post(
            f"{BASE_URL}/api/seo-audit/run",
            json=payload,
            timeout=120  # Allow 2 minutes for audit
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "success" in data, "Response should contain 'success' field"
        assert data.get("success") == True, f"Audit should succeed, got: {data}"
        
        # Validate full audit result structure
        assert "overall_score" in data, "Audit result should have overall_score"
        assert isinstance(data["overall_score"], (int, float)), "overall_score should be numeric"
        assert 0 <= data["overall_score"] <= 100, "Score should be between 0 and 100"
        
        assert "pages_audited" in data, "Audit result should have pages_audited"
        assert data["pages_audited"] > 0, "Should have audited at least 1 page"
        
        assert "total_issues" in data, "Audit result should have total_issues"
        assert isinstance(data["total_issues"], int), "total_issues should be integer"
        
        assert "critical" in data, "Audit result should have critical count"
        assert "warnings" in data, "Audit result should have warnings count"
        assert "info" in data, "Audit result should have info count"
        
        # Verify counts add up
        issue_sum = data["critical"] + data["warnings"] + data["info"]
        assert issue_sum == data["total_issues"], f"Issue counts should add up: {issue_sum} vs {data['total_issues']}"
        
        assert "category_breakdown" in data, "Audit result should have category_breakdown"
        assert isinstance(data["category_breakdown"], dict), "category_breakdown should be a dict"
        
        assert "issues" in data, "Audit result should have issues array"
        assert isinstance(data["issues"], list), "issues should be a list"
        
        # Validate issue structure if issues exist
        if len(data["issues"]) > 0:
            issue = data["issues"][0]
            assert "url" in issue, "Issue should have url"
            assert "category" in issue, "Issue should have category"
            assert "severity" in issue, "Issue should have severity"
            assert "issue" in issue, "Issue should have issue description"
        
        print(f"PASS: Audit completed - Score={data['overall_score']}/100, Pages={data['pages_audited']}, Issues={data['total_issues']} (C:{data['critical']}/W:{data['warnings']}/I:{data['info']})")
        print(f"Categories: {data['category_breakdown']}")
    
    def test_seo_audit_latest_after_run(self):
        """Test GET /api/seo-audit/latest returns data after audit has been run"""
        # This test verifies persistence - should return data after test_seo_audit_run_endpoint
        response = requests.get(f"{BASE_URL}/api/seo-audit/latest", timeout=10)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data.get("success") == True, "Should have audit data after running audit"
        assert "overall_score" in data, "Should have overall_score"
        print(f"PASS: Latest audit persisted - Score={data['overall_score']}/100")


class TestAdminLogin:
    """Test admin login to access dashboard"""
    
    def test_admin_login_success(self):
        """Test POST /api/admin/login with correct password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "drharsha2025"},
            timeout=10
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data.get("success") == True, "Login should succeed"
        print("PASS: Admin login successful")
    
    def test_admin_login_wrong_password(self):
        """Test POST /api/admin/login with wrong password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "wrongpassword"},
            timeout=10
        )
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("PASS: Wrong password correctly rejected with 401")


# Run tests
if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
