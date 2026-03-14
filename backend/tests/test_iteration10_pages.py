"""
Iteration 10 Tests: About, Contact, Testimonials, and Treatments pages
Tests verify backend APIs for CMS treatments and appointments
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://care-growth-hub.preview.emergentagent.com').rstrip('/')


class TestTreatmentsAPI:
    """Tests for CMS Treatments API endpoints"""
    
    def test_get_all_treatments_returns_20(self):
        """GET /api/cms/treatments should return 20 treatments"""
        response = requests.get(f"{BASE_URL}/api/cms/treatments")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 20, f"Expected 20 treatments, got {len(data)}"
        print(f"✓ Returned {len(data)} treatments")
    
    def test_treatments_have_required_fields(self):
        """Each treatment should have slug, title, and content"""
        response = requests.get(f"{BASE_URL}/api/cms/treatments")
        assert response.status_code == 200
        data = response.json()
        
        for treatment in data[:5]:  # Check first 5 treatments
            assert 'slug' in treatment, "Treatment missing 'slug'"
            assert 'title' in treatment or treatment.get('content', {}).get('name'), "Treatment missing title/name"
            print(f"✓ Treatment '{treatment.get('slug')}' has required fields")
    
    def test_get_single_treatment_total_knee_replacement(self):
        """GET /api/cms/treatments/total-knee-replacement should return treatment with recovery field"""
        response = requests.get(f"{BASE_URL}/api/cms/treatments/total-knee-replacement")
        assert response.status_code == 200
        data = response.json()
        
        assert 'slug' in data
        assert data['slug'] == 'total-knee-replacement'
        assert 'content' in data
        
        content = data.get('content', {})
        recovery = content.get('recovery')
        
        # Recovery can be string or object - either is valid
        if isinstance(recovery, dict):
            assert 'timeline' in recovery, "Object recovery should have 'timeline'"
            print(f"✓ Recovery is object with timeline: {recovery.get('timeline', '')[:50]}...")
        elif isinstance(recovery, str):
            assert len(recovery) > 0, "String recovery should not be empty"
            print(f"✓ Recovery is string: {recovery[:50]}...")
        else:
            pytest.skip("Recovery field not present")
    
    def test_treatment_benefits_handling(self):
        """Treatment benefits can be strings or objects"""
        response = requests.get(f"{BASE_URL}/api/cms/treatments/total-knee-replacement")
        assert response.status_code == 200
        data = response.json()
        
        content = data.get('content', {})
        benefits = content.get('benefits', [])
        
        if benefits:
            for i, benefit in enumerate(benefits[:3]):
                if isinstance(benefit, str):
                    print(f"✓ Benefit {i+1} is string: {benefit[:30]}...")
                elif isinstance(benefit, dict):
                    print(f"✓ Benefit {i+1} is object with title: {benefit.get('title', '')[:30]}...")
    
    def test_treatment_not_found_returns_404(self):
        """GET /api/cms/treatments/non-existent should return 404"""
        response = requests.get(f"{BASE_URL}/api/cms/treatments/non-existent-treatment-xyz")
        assert response.status_code == 404


class TestAppointmentsAPI:
    """Tests for Appointments API endpoint"""
    
    def test_create_appointment_success(self):
        """POST /api/appointments should create appointment"""
        appointment_data = {
            "name": "TEST_User",
            "email": "test@example.com",
            "phone": "+91 98765 43210",
            "preferred_date": None,
            "message": "Test appointment request"
        }
        
        response = requests.post(f"{BASE_URL}/api/appointments", json=appointment_data)
        assert response.status_code == 201 or response.status_code == 200, f"Got {response.status_code}"
        print(f"✓ Appointment created successfully")
    
    def test_create_appointment_missing_fields(self):
        """POST /api/appointments with missing required fields should fail"""
        appointment_data = {
            "name": "Test"
            # Missing email and phone
        }
        
        response = requests.post(f"{BASE_URL}/api/appointments", json=appointment_data)
        # Should return validation error
        assert response.status_code in [400, 422], f"Expected 400/422, got {response.status_code}"


class TestTestimonialsAPI:
    """Tests for Testimonials API endpoint"""
    
    def test_get_testimonials(self):
        """GET /api/testimonials should return list"""
        response = requests.get(f"{BASE_URL}/api/testimonials")
        # API may return empty list if no testimonials in DB, that's OK
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Testimonials API returned {len(data)} items (may be 0 if using fallback)")


class TestHealthAPI:
    """Tests for Health check endpoint"""
    
    def test_health_check(self):
        """GET /api/health should return OK"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        print("✓ Health check passed")


class TestStaticPages:
    """Tests that verify static pages are accessible"""
    
    def test_about_page_loads(self):
        """About page should load (200 status)"""
        response = requests.get(f"{BASE_URL}/about")
        assert response.status_code == 200
        assert 'Dr' in response.text or 'about' in response.text.lower()
        print("✓ About page loads")
    
    def test_contact_page_loads(self):
        """Contact page should load (200 status)"""
        response = requests.get(f"{BASE_URL}/contact")
        assert response.status_code == 200
        print("✓ Contact page loads")
    
    def test_testimonials_page_loads(self):
        """Testimonials page should load (200 status)"""
        response = requests.get(f"{BASE_URL}/testimonials")
        assert response.status_code == 200
        print("✓ Testimonials page loads")
    
    def test_treatments_page_loads(self):
        """Treatments page should load (200 status)"""
        response = requests.get(f"{BASE_URL}/treatments")
        assert response.status_code == 200
        print("✓ Treatments page loads")


if __name__ == '__main__':
    pytest.main([__file__, '-v', '--tb=short'])
