#!/usr/bin/env python3
"""
Backend API Testing for Dr. Harsha Reddy Orthopedic Website
Tests all backend endpoints using the production URL
"""

import requests
import json
import sys
from datetime import datetime

# Get backend URL from frontend .env
BACKEND_URL = "https://ortho-excellence-1.preview.emergentagent.com/api"

def test_api_root():
    """Test the API root endpoint"""
    print("🔍 Testing API Root...")
    try:
        response = requests.get(f"{BACKEND_URL}/", timeout=10)
        print(f"   Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Response: {data}")
            return True
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_testimonials_api():
    """Test GET /api/testimonials endpoint"""
    print("🔍 Testing GET /api/testimonials...")
    try:
        response = requests.get(f"{BACKEND_URL}/testimonials", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Found {len(data)} testimonials")
            if len(data) > 0:
                print(f"   Sample testimonial: {data[0].get('patient_name', 'N/A')} - {data[0].get('rating', 'N/A')} stars")
            return True
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_blog_posts_api():
    """Test GET /api/blog endpoint (note: endpoint is /blog not /blog_posts)"""
    print("🔍 Testing GET /api/blog...")
    try:
        response = requests.get(f"{BACKEND_URL}/blog", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Found {len(data)} blog posts")
            if len(data) > 0:
                print(f"   Sample post: {data[0].get('title', 'N/A')} by {data[0].get('author', 'N/A')}")
            return True
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_appointments_api():
    """Test POST /api/appointments endpoint"""
    print("🔍 Testing POST /api/appointments...")
    
    # Test data as specified in the review request
    test_appointment = {
        "name": "Rajesh Kumar",
        "email": "rajesh.kumar@example.com",
        "phone": "9876543210",
        "preferred_date": "2025-01-15",
        "message": "Joint pain consultation - knee discomfort for 2 weeks"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/appointments", 
            json=test_appointment,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Appointment created successfully")
            print(f"   Appointment ID: {data.get('id', 'N/A')}")
            print(f"   Patient: {data.get('name', 'N/A')}")
            print(f"   Status: {data.get('status', 'N/A')}")
            return True
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_get_appointments_api():
    """Test GET /api/appointments endpoint"""
    print("🔍 Testing GET /api/appointments...")
    try:
        response = requests.get(f"{BACKEND_URL}/appointments", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Found {len(data)} appointments")
            if len(data) > 0:
                print(f"   Latest appointment: {data[0].get('name', 'N/A')} - {data[0].get('status', 'N/A')}")
            return True
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_contact_api():
    """Test POST /api/contact endpoint"""
    print("🔍 Testing POST /api/contact...")
    
    test_contact = {
        "name": "Priya Sharma",
        "email": "priya.sharma@example.com",
        "phone": "9123456789",
        "subject": "Inquiry about knee replacement surgery",
        "message": "I would like to know more about knee replacement procedures and recovery time."
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/contact", 
            json=test_contact,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Contact form submitted successfully")
            print(f"   Contact ID: {data.get('id', 'N/A')}")
            print(f"   Subject: {data.get('subject', 'N/A')}")
            return True
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_cms_pages_list():
    """Test GET /api/admin/cms/pages endpoint"""
    print("🔍 Testing GET /api/admin/cms/pages...")
    try:
        response = requests.get(f"{BACKEND_URL}/admin/cms/pages", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Found {len(data)} CMS pages")
            if len(data) > 0:
                print(f"   Sample page: {data[0].get('title', 'N/A')} ({data[0].get('slug', 'N/A')})")
            return True
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_cms_page_create():
    """Test POST /api/admin/cms/pages endpoint"""
    print("🔍 Testing POST /api/admin/cms/pages...")
    
    test_page = {
        "slug": "test-sports-page",
        "type": "sports",
        "title": "Test Sports Page",
        "status": "published",
        "meta_title": "Sports Injury Treatment in Hyderabad",
        "meta_description": "Expert sports injury treatment and rehabilitation services",
        "keywords": ["sports injury", "treatment", "hyderabad"],
        "content": {
            "hero": {
                "title": "Sports Injury Treatment",
                "subtitle": "Get back to your game with expert care"
            },
            "sections": [
                {
                    "type": "text",
                    "content": "Our specialized sports medicine team provides comprehensive treatment for all types of sports injuries."
                }
            ]
        }
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/admin/cms/pages", 
            json=test_page,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ CMS page created successfully")
            print(f"   Page ID: {data.get('id', 'N/A')}")
            print(f"   Slug: {data.get('slug', 'N/A')}")
            return data.get('id')  # Return ID for cleanup
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_cms_page_get_public(slug):
    """Test GET /api/cms/pages/{slug} endpoint"""
    print(f"🔍 Testing GET /api/cms/pages/{slug}...")
    try:
        response = requests.get(f"{BACKEND_URL}/cms/pages/{slug}", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Public CMS page retrieved successfully")
            print(f"   Title: {data.get('title', 'N/A')}")
            print(f"   Type: {data.get('type', 'N/A')}")
            print(f"   Status: {data.get('status', 'N/A')}")
            return True
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_cms_page_delete(page_id):
    """Test DELETE /api/admin/cms/pages/{id} endpoint"""
    if not page_id:
        print("🔍 Skipping DELETE test - no page ID available")
        return True
        
    print(f"🔍 Testing DELETE /api/admin/cms/pages/{page_id}...")
    try:
        response = requests.delete(f"{BACKEND_URL}/admin/cms/pages/{page_id}", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ CMS page deleted successfully")
            print(f"   Message: {data.get('message', 'N/A')}")
            return True
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_analytics_api():
    """Test GET /api/admin/analytics endpoint"""
    print("🔍 Testing GET /api/admin/analytics...")
    try:
        response = requests.get(f"{BACKEND_URL}/admin/analytics", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Analytics data retrieved successfully")
            overview = data.get('overview', {})
            print(f"   Total views: {overview.get('total_views', 'N/A')}")
            print(f"   Today views: {overview.get('today_views', 'N/A')}")
            print(f"   Top pages: {len(data.get('top_pages', []))}")
            return True
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_analytics_pageview():
    """Test POST /api/analytics/pageview endpoint"""
    print("🔍 Testing POST /api/analytics/pageview...")
    
    test_pageview = {
        "page_path": "/test-page",
        "page_title": "Test Page",
        "referrer": "https://google.com",
        "user_agent": "Mozilla/5.0 (Test Browser)",
        "session_id": "test-session-123"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/analytics/pageview", 
            json=test_pageview,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Page view tracked successfully")
            print(f"   Success: {data.get('success', 'N/A')}")
            return True
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_admin_blog_api():
    """Test GET /api/admin/blog endpoint"""
    print("🔍 Testing GET /api/admin/blog...")
    try:
        response = requests.get(f"{BACKEND_URL}/admin/blog", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Found {len(data)} blog posts (admin view)")
            if len(data) > 0:
                print(f"   Sample post: {data[0].get('title', 'N/A')} by {data[0].get('author', 'N/A')}")
            return True
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def main():
    """Run all backend API tests"""
    print("=" * 60)
    print("🏥 Dr. Harsha Reddy Orthopedic Website - Backend API Tests")
    print("=" * 60)
    print(f"Backend URL: {BACKEND_URL}")
    print()
    
    test_results = []
    created_page_id = None
    
    # Test all endpoints
    test_results.append(("API Root", test_api_root()))
    test_results.append(("Testimonials API", test_testimonials_api()))
    test_results.append(("Blog Posts API", test_blog_posts_api()))
    test_results.append(("Create Appointment API", test_appointments_api()))
    test_results.append(("Get Appointments API", test_get_appointments_api()))
    test_results.append(("Contact Form API", test_contact_api()))
    
    # New CMS API Tests
    test_results.append(("CMS Pages List API", test_cms_pages_list()))
    created_page_id = test_cms_page_create()
    test_results.append(("CMS Page Create API", bool(created_page_id)))
    
    if created_page_id:
        test_results.append(("CMS Page Get Public API", test_cms_page_get_public("test-sports-page")))
        test_results.append(("CMS Page Delete API", test_cms_page_delete(created_page_id)))
    else:
        test_results.append(("CMS Page Get Public API", False))
        test_results.append(("CMS Page Delete API", False))
    
    # Analytics API Tests
    test_results.append(("Analytics API", test_analytics_api()))
    test_results.append(("Analytics Pageview API", test_analytics_pageview()))
    
    # Admin Blog API Test
    test_results.append(("Admin Blog API", test_admin_blog_api()))
    
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    
    passed = 0
    failed = 0
    
    for test_name, result in test_results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name:<30} {status}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal Tests: {len(test_results)}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 All backend API tests passed!")
        return True
    else:
        print(f"\n⚠️  {failed} test(s) failed. Please check the issues above.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)