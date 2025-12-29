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
BACKEND_URL = "https://ortho-caresite.preview.emergentagent.com/api"

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

def main():
    """Run all backend API tests"""
    print("=" * 60)
    print("🏥 Dr. Harsha Reddy Orthopedic Website - Backend API Tests")
    print("=" * 60)
    print(f"Backend URL: {BACKEND_URL}")
    print()
    
    test_results = []
    
    # Test all endpoints
    test_results.append(("API Root", test_api_root()))
    test_results.append(("Testimonials API", test_testimonials_api()))
    test_results.append(("Blog Posts API", test_blog_posts_api()))
    test_results.append(("Create Appointment API", test_appointments_api()))
    test_results.append(("Get Appointments API", test_get_appointments_api()))
    test_results.append(("Contact Form API", test_contact_api()))
    
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    
    passed = 0
    failed = 0
    
    for test_name, result in test_results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name:<25} {status}")
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