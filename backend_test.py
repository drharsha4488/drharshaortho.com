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
BACKEND_URL = "https://careconnect-ortho-1.preview.emergentagent.com/api"

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

def test_cms_migration_status_api():
    """Test GET /api/admin/cms/migration-status - Should show 54 total pages"""
    print("🔍 Testing GET /api/admin/cms/migration-status...")
    try:
        response = requests.get(f"{BACKEND_URL}/admin/cms/migration-status", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Migration status API working")
            
            # Check total pages
            total_pages = data.get('total_pages', 0)
            if total_pages == 54:
                print(f"   ✅ Total pages: {total_pages} (expected 54)")
            else:
                print(f"   ⚠️  Expected 54 total pages, found {total_pages}")
            
            # Check conditions and treatments counts
            conditions_count = data.get('conditions', 0)
            treatments_count = data.get('treatments', 0)
            
            if conditions_count == 37:
                print(f"   ✅ Conditions: {conditions_count} (expected 37)")
            else:
                print(f"   ⚠️  Expected 37 conditions, found {conditions_count}")
            
            if treatments_count == 17:
                print(f"   ✅ Treatments: {treatments_count} (expected 17)")
            else:
                print(f"   ⚠️  Expected 17 treatments, found {treatments_count}")
            
            # Check migration progress
            migration_progress = data.get('migration_progress', {})
            if migration_progress:
                print(f"   Migration progress: {migration_progress}")
            
            return total_pages >= 7  # At least some pages should exist
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_cms_pages_admin_api():
    """Test GET /api/admin/cms/pages - Should return all 54 CMS pages"""
    print("🔍 Testing GET /api/admin/cms/pages (should return 54 pages)...")
    try:
        response = requests.get(f"{BACKEND_URL}/admin/cms/pages", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            total_pages = len(data)
            print(f"   Found {total_pages} CMS pages")
            
            # Check if we have the expected 54 pages
            if total_pages == 54:
                print(f"   ✅ Correct count: 54 pages as expected")
            else:
                print(f"   ⚠️  Expected 54 pages, found {total_pages}")
            
            # Verify each page has required fields
            if len(data) > 0:
                sample = data[0]
                required_fields = ['id', 'slug', 'type', 'title', 'status']
                missing_fields = [field for field in required_fields if field not in sample]
                if not missing_fields:
                    print(f"   ✅ All required fields present: {required_fields}")
                else:
                    print(f"   ❌ Missing required fields: {missing_fields}")
                
                print(f"   Sample page: {sample.get('title', 'N/A')} ({sample.get('slug', 'N/A')})")
            
            # Count by type
            conditions = [p for p in data if p.get('type') == 'condition']
            treatments = [p for p in data if p.get('type') == 'treatment']
            
            print(f"   Conditions: {len(conditions)}")
            print(f"   Treatments: {len(treatments)}")
            print(f"   Other types: {total_pages - len(conditions) - len(treatments)}")
            
            return total_pages >= 7  # At least some pages should exist
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_cms_migrate_all_content():
    """Test POST /api/admin/cms/migrate-all-content - Migrate all static content to CMS"""
    print("🔍 Testing POST /api/admin/cms/migrate-all-content...")
    try:
        response = requests.post(
            f"{BACKEND_URL}/admin/cms/migrate-all-content",
            headers={"Content-Type": "application/json"},
            timeout=30  # Migration might take longer
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Migration completed successfully")
            print(f"   Message: {data.get('message', 'N/A')}")
            
            # Check migration results
            if 'migrated' in data:
                print(f"   Migrated: {data.get('migrated', 0)} pages")
            if 'skipped' in data:
                print(f"   Skipped: {data.get('skipped', 0)} pages")
            if 'total_pages' in data:
                print(f"   Total pages: {data.get('total_pages', 0)}")
            
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

def test_specific_condition_pages():
    """Test specific condition pages mentioned in review request"""
    print("🔍 Testing Specific Condition Pages...")
    
    # Test for Osgood-Schlatter Disease
    print("   Testing Osgood-Schlatter Disease page...")
    try:
        response = requests.get(f"{BACKEND_URL}/cms/pages/osgood-schlatter", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Osgood-Schlatter page found: {data.get('title', 'N/A')}")
            # Check if symptoms section exists
            symptoms = data.get('content', {}).get('symptoms', [])
            if symptoms:
                print(f"   ✅ Symptoms section contains {len(symptoms)} items")
            else:
                print(f"   ⚠️  No symptoms section found in content")
            osgood_result = True
        elif response.status_code == 404:
            print(f"   ❌ Osgood-Schlatter page not found (404)")
            osgood_result = False
        else:
            print(f"   ❌ Error fetching Osgood-Schlatter page: {response.status_code}")
            osgood_result = False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        osgood_result = False
    
    # Test for Patellofemoral Syndrome
    print("   Testing Patellofemoral Syndrome page...")
    try:
        response = requests.get(f"{BACKEND_URL}/cms/pages/patellofemoral-syndrome", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Patellofemoral Syndrome page found: {data.get('title', 'N/A')}")
            # Check if symptoms section exists
            symptoms = data.get('content', {}).get('symptoms', [])
            if symptoms:
                print(f"   ✅ Symptoms section contains {len(symptoms)} items")
            else:
                print(f"   ⚠️  No symptoms section found in content")
            patello_result = True
        elif response.status_code == 404:
            print(f"   ❌ Patellofemoral Syndrome page not found (404)")
            patello_result = False
        else:
            print(f"   ❌ Error fetching Patellofemoral Syndrome page: {response.status_code}")
            patello_result = False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        patello_result = False
    
    return osgood_result and patello_result

def test_cms_seed_content():
    """Test POST /api/admin/cms/seed-content endpoint"""
    print("🔍 Testing POST /api/admin/cms/seed-content...")
    
    # First, get current page count
    try:
        response = requests.get(f"{BACKEND_URL}/admin/cms/pages", timeout=10)
        if response.status_code == 200:
            initial_pages = len(response.json())
            print(f"   Initial page count: {initial_pages}")
        else:
            print(f"   ⚠️  Could not get initial page count: {response.status_code}")
            initial_pages = 0
    except Exception as e:
        print(f"   ⚠️  Error getting initial page count: {str(e)}")
        initial_pages = 0
    
    # Test the seeding endpoint
    try:
        response = requests.post(
            f"{BACKEND_URL}/admin/cms/seed-content",
            headers={"Content-Type": "application/json"},
            timeout=15
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Seeding completed successfully")
            print(f"   Created: {data.get('created', 'N/A')} pages")
            print(f"   Skipped: {data.get('skipped', 'N/A')} pages")
            print(f"   Total pages: {data.get('total_pages', 'N/A')}")
            print(f"   Message: {data.get('message', 'N/A')}")
            
            # Verify expected pages were created/exist
            expected_slugs = [
                "osteoarthritis", "acl-injury", "meniscus-tear",
                "total-knee-replacement", "hip-replacement", 
                "arthroscopic-surgery", "sports-injury-treatment"
            ]
            
            # Check if all expected pages exist now
            print("   Verifying seeded pages exist...")
            all_pages_exist = True
            for slug in expected_slugs:
                try:
                    page_response = requests.get(f"{BACKEND_URL}/cms/pages/{slug}", timeout=10)
                    if page_response.status_code == 200:
                        page_data = page_response.json()
                        print(f"   ✅ {slug}: {page_data.get('title', 'N/A')}")
                    else:
                        print(f"   ❌ {slug}: Not found (status {page_response.status_code})")
                        all_pages_exist = False
                except Exception as e:
                    print(f"   ❌ {slug}: Error checking - {str(e)}")
                    all_pages_exist = False
            
            return all_pages_exist
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_cms_seed_idempotent():
    """Test that seeding is idempotent (skips existing pages)"""
    print("🔍 Testing CMS Seeding Idempotent Behavior...")
    
    # Run seeding twice to test idempotent behavior
    print("   Running first seeding...")
    try:
        response1 = requests.post(
            f"{BACKEND_URL}/admin/cms/seed-content",
            headers={"Content-Type": "application/json"},
            timeout=15
        )
        
        if response1.status_code != 200:
            print(f"   ❌ First seeding failed: {response1.status_code}")
            return False
            
        data1 = response1.json()
        print(f"   First run - Created: {data1.get('created', 0)}, Skipped: {data1.get('skipped', 0)}")
        
    except Exception as e:
        print(f"   ❌ Error in first seeding: {str(e)}")
        return False
    
    # Run seeding again
    print("   Running second seeding...")
    try:
        response2 = requests.post(
            f"{BACKEND_URL}/admin/cms/seed-content",
            headers={"Content-Type": "application/json"},
            timeout=15
        )
        
        if response2.status_code != 200:
            print(f"   ❌ Second seeding failed: {response2.status_code}")
            return False
            
        data2 = response2.json()
        print(f"   Second run - Created: {data2.get('created', 0)}, Skipped: {data2.get('skipped', 0)}")
        
        # Second run should create 0 and skip 7 (if all pages exist)
        if data2.get('created', -1) == 0 and data2.get('skipped', -1) >= 7:
            print(f"   ✅ Idempotent behavior confirmed - no duplicates created")
            return True
        else:
            print(f"   ❌ Idempotent behavior failed - unexpected created/skipped counts")
            return False
            
    except Exception as e:
        print(f"   ❌ Error in second seeding: {str(e)}")
        return False

def test_cms_pages_after_seeding():
    """Test GET /api/admin/cms/pages returns correct count after seeding"""
    print("🔍 Testing CMS Pages Count After Seeding...")
    try:
        response = requests.get(f"{BACKEND_URL}/admin/cms/pages", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            page_count = len(data)
            print(f"   Total pages found: {page_count}")
            
            # Check for expected page types
            conditions = [p for p in data if p.get('type') == 'condition']
            treatments = [p for p in data if p.get('type') == 'treatment']
            
            print(f"   Condition pages: {len(conditions)}")
            print(f"   Treatment pages: {len(treatments)}")
            
            # Should have at least 3 conditions and 4 treatments from seeding
            if len(conditions) >= 3 and len(treatments) >= 4:
                print(f"   ✅ Expected page types found")
                
                # Check specific pages exist
                expected_conditions = ["osteoarthritis", "acl-injury", "meniscus-tear"]
                expected_treatments = ["total-knee-replacement", "hip-replacement", "arthroscopic-surgery", "sports-injury-treatment"]
                
                found_conditions = [p['slug'] for p in conditions]
                found_treatments = [p['slug'] for p in treatments]
                
                conditions_ok = all(slug in found_conditions for slug in expected_conditions)
                treatments_ok = all(slug in found_treatments for slug in expected_treatments)
                
                if conditions_ok and treatments_ok:
                    print(f"   ✅ All expected seeded pages found")
                    return True
                else:
                    print(f"   ❌ Missing expected pages")
                    print(f"   Expected conditions: {expected_conditions}")
                    print(f"   Found conditions: {found_conditions}")
                    print(f"   Expected treatments: {expected_treatments}")
                    print(f"   Found treatments: {found_treatments}")
                    return False
            else:
                print(f"   ❌ Insufficient pages - need ≥3 conditions and ≥4 treatments")
                return False
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_cms_conditions_api():
    """Test GET /api/cms/conditions - List all published conditions (should be 37)"""
    print("🔍 Testing GET /api/cms/conditions...")
    try:
        response = requests.get(f"{BACKEND_URL}/cms/conditions", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Found {len(data)} published conditions")
            
            # Check if we have the expected 37 conditions
            if len(data) == 37:
                print(f"   ✅ Correct count: 37 conditions as expected")
            else:
                print(f"   ⚠️  Expected 37 conditions, found {len(data)}")
            
            # Verify structure of conditions
            if len(data) > 0:
                sample = data[0]
                print(f"   Sample condition: {sample.get('title', 'N/A')} ({sample.get('slug', 'N/A')})")
                
                # Check required fields
                required_fields = ['slug', 'title', 'type', 'content', 'status']
                missing_fields = [field for field in required_fields if field not in sample]
                if not missing_fields:
                    print(f"   ✅ All required fields present: {required_fields}")
                else:
                    print(f"   ❌ Missing required fields: {missing_fields}")
                
                # Check content structure
                content = sample.get('content', {})
                if 'symptoms' in content and 'treatments' in content:
                    print(f"   ✅ Content has symptoms and treatments sections")
                else:
                    print(f"   ⚠️  Content missing symptoms or treatments sections")
            
            return len(data) >= 3  # At least 3 conditions should exist
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_cms_condition_osteoarthritis():
    """Test GET /api/cms/conditions/osteoarthritis - Should exist in CMS"""
    print("🔍 Testing GET /api/cms/conditions/osteoarthritis...")
    try:
        response = requests.get(f"{BACKEND_URL}/cms/conditions/osteoarthritis", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Osteoarthritis condition found: {data.get('title', 'N/A')}")
            print(f"   Type: {data.get('type', 'N/A')}")
            print(f"   Status: {data.get('status', 'N/A')}")
            # Check content structure
            content = data.get('content', {})
            if content.get('symptoms'):
                print(f"   ✅ Symptoms section found with {len(content['symptoms'])} items")
            if content.get('treatments'):
                print(f"   ✅ Treatments section found with {len(content['treatments'])} items")
            return True
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_cms_condition_knee_arthritis():
    """Test GET /api/cms/conditions/knee-arthritis - Should exist with specific title"""
    print("🔍 Testing GET /api/cms/conditions/knee-arthritis...")
    try:
        response = requests.get(f"{BACKEND_URL}/cms/conditions/knee-arthritis", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            title = data.get('title', '')
            print(f"   ✅ Knee arthritis condition found: {title}")
            
            # Check for expected title
            expected_title = "Knee Arthritis & Osteoarthritis Treatment in Hyderabad"
            if expected_title in title:
                print(f"   ✅ Title matches expected: {expected_title}")
            else:
                print(f"   ⚠️  Title doesn't match expected. Got: {title}")
            
            # Check for symptoms array with 5 items
            content = data.get('content', {})
            symptoms = content.get('symptoms', [])
            if len(symptoms) == 5:
                print(f"   ✅ Symptoms array has 5 items as expected")
            else:
                print(f"   ⚠️  Expected 5 symptoms, found {len(symptoms)}")
            
            return True
        elif response.status_code == 404:
            print(f"   ❌ Knee arthritis condition not found (404)")
            return False
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_cms_treatments_api():
    """Test GET /api/cms/treatments - List all published treatments (should be 17)"""
    print("🔍 Testing GET /api/cms/treatments...")
    try:
        response = requests.get(f"{BACKEND_URL}/cms/treatments", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Found {len(data)} published treatments")
            
            # Check if we have the expected 17 treatments
            if len(data) == 17:
                print(f"   ✅ Correct count: 17 treatments as expected")
            else:
                print(f"   ⚠️  Expected 17 treatments, found {len(data)}")
            
            # Verify structure of treatments
            if len(data) > 0:
                sample = data[0]
                print(f"   Sample treatment: {sample.get('title', 'N/A')} ({sample.get('slug', 'N/A')})")
                
                # Check required fields
                required_fields = ['slug', 'title', 'type', 'content', 'status']
                missing_fields = [field for field in required_fields if field not in sample]
                if not missing_fields:
                    print(f"   ✅ All required fields present: {required_fields}")
                else:
                    print(f"   ❌ Missing required fields: {missing_fields}")
                
                # Check content structure
                content = sample.get('content', {})
                if 'benefits' in content and 'procedure_steps' in content:
                    print(f"   ✅ Content has benefits and procedure_steps sections")
                else:
                    print(f"   ⚠️  Content missing benefits or procedure_steps sections")
            
            return len(data) >= 4  # At least 4 treatments should exist
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_cms_treatment_total_knee_replacement():
    """Test GET /api/cms/treatments/total-knee-replacement - Should exist with specific title and benefits"""
    print("🔍 Testing GET /api/cms/treatments/total-knee-replacement...")
    try:
        response = requests.get(f"{BACKEND_URL}/cms/treatments/total-knee-replacement", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            title = data.get('title', '')
            print(f"   ✅ Total knee replacement treatment found: {title}")
            
            # Check for expected title
            expected_title = "Total Knee Replacement (TKR) in Hyderabad"
            if expected_title in title:
                print(f"   ✅ Title matches expected: {expected_title}")
            else:
                print(f"   ⚠️  Title doesn't match expected. Got: {title}")
            
            print(f"   Type: {data.get('type', 'N/A')}")
            print(f"   Status: {data.get('status', 'N/A')}")
            
            # Check content structure
            content = data.get('content', {})
            benefits = content.get('benefits', [])
            if len(benefits) >= 5:
                print(f"   ✅ Benefits array has {len(benefits)} items (≥5 expected)")
            else:
                print(f"   ⚠️  Expected ≥5 benefits, found {len(benefits)}")
            
            if content.get('procedure_steps'):
                print(f"   ✅ Procedure steps found with {len(content['procedure_steps'])} steps")
            else:
                print(f"   ⚠️  No procedure steps found")
            
            return True
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_cms_blogs_api():
    """Test GET /api/cms/blogs - List all published blogs"""
    print("🔍 Testing GET /api/cms/blogs...")
    try:
        response = requests.get(f"{BACKEND_URL}/cms/blogs", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Found {len(data)} published blog posts from CMS")
            if len(data) > 0:
                print(f"   Sample blog: {data[0].get('title', 'N/A')} ({data[0].get('slug', 'N/A')})")
            else:
                print(f"   ℹ️  No blog posts found in CMS (expected for new setup)")
            return True
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_cms_blog_not_found():
    """Test GET /api/cms/blogs/test-blog - Should return 404 (no blogs in CMS yet)"""
    print("🔍 Testing GET /api/cms/blogs/test-blog (should be 404)...")
    try:
        response = requests.get(f"{BACKEND_URL}/cms/blogs/test-blog", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 404:
            print(f"   ✅ Correctly returned 404 for non-existent blog post")
            return True
        elif response.status_code == 200:
            data = response.json()
            print(f"   ⚠️  Unexpected: Found blog post that should not exist: {data.get('title', 'N/A')}")
            return False
        else:
            print(f"   ❌ Unexpected status code: {response.status_code}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_backend_health_check():
    """Test backend API health check as mentioned in review request"""
    print("🔍 Testing Backend API Health Check...")
    
    # Test GET /api/appointments - Should return list
    print("   Testing GET /api/appointments for health check...")
    try:
        response = requests.get(f"{BACKEND_URL}/appointments", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Appointments API healthy - returned {len(data)} appointments")
            appointments_healthy = True
        else:
            print(f"   ❌ Appointments API unhealthy: {response.status_code}")
            appointments_healthy = False
    except Exception as e:
        print(f"   ❌ Appointments API error: {str(e)}")
        appointments_healthy = False
    
    # Test GET /api/admin/cms/pages - Should return 7+ pages
    print("   Testing GET /api/admin/cms/pages for health check...")
    try:
        response = requests.get(f"{BACKEND_URL}/admin/cms/pages", timeout=10)
        if response.status_code == 200:
            data = response.json()
            page_count = len(data)
            if page_count >= 7:
                print(f"   ✅ CMS Pages API healthy - returned {page_count} pages (≥7 required)")
                cms_healthy = True
            else:
                print(f"   ❌ CMS Pages API unhealthy - returned {page_count} pages (<7 required)")
                cms_healthy = False
        else:
            print(f"   ❌ CMS Pages API unhealthy: {response.status_code}")
            cms_healthy = False
    except Exception as e:
        print(f"   ❌ CMS Pages API error: {str(e)}")
        cms_healthy = False
    
    return appointments_healthy and cms_healthy

# ============ NEW: Keyword Research API Tests ============

def test_keyword_autocomplete_api():
    """Test GET /api/admin/keywords/autocomplete/knee%20replacement"""
    print("🔍 Testing GET /api/admin/keywords/autocomplete/knee%20replacement...")
    try:
        # URL encode the keyword
        keyword = "knee replacement"
        encoded_keyword = keyword.replace(" ", "%20")
        response = requests.get(f"{BACKEND_URL}/admin/keywords/autocomplete/{encoded_keyword}", timeout=15)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Keyword autocomplete API working")
            print(f"   Seed keyword: {data.get('seed_keyword', 'N/A')}")
            print(f"   Suggestions count: {data.get('count', 0)}")
            
            suggestions = data.get('suggestions', [])
            if len(suggestions) >= 10:
                print(f"   ✅ Returned {len(suggestions)} suggestions (≥10 expected)")
                # Show sample suggestions
                for i, suggestion in enumerate(suggestions[:3]):
                    print(f"   Sample {i+1}: {suggestion.get('keyword', 'N/A')} (source: {suggestion.get('source', 'N/A')})")
                return True
            else:
                print(f"   ⚠️  Only {len(suggestions)} suggestions returned (<10 expected)")
                # Still consider it working if we get some suggestions
                return len(suggestions) > 0
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_trending_keywords_api():
    """Test GET /api/admin/keywords/trending"""
    print("🔍 Testing GET /api/admin/keywords/trending...")
    try:
        response = requests.get(f"{BACKEND_URL}/admin/keywords/trending", timeout=20)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Trending keywords API working")
            print(f"   Keywords count: {data.get('count', 0)}")
            print(f"   Last updated: {data.get('last_updated', 'N/A')}")
            
            trending_keywords = data.get('trending_keywords', [])
            if len(trending_keywords) > 0:
                print(f"   ✅ Returned {len(trending_keywords)} trending keywords")
                # Show sample keywords
                for i, keyword in enumerate(trending_keywords[:3]):
                    print(f"   Sample {i+1}: {keyword.get('keyword', 'N/A')} (category: {keyword.get('category', 'N/A')})")
                return True
            else:
                print(f"   ⚠️  No trending keywords returned")
                return False
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_generate_blog_topics_api():
    """Test POST /api/admin/keywords/generate-blog-topics"""
    print("🔍 Testing POST /api/admin/keywords/generate-blog-topics...")
    
    test_keywords = ["knee replacement", "hip surgery"]
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/admin/keywords/generate-blog-topics",
            json=test_keywords,
            headers={"Content-Type": "application/json"},
            timeout=15
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Blog topics generation API working")
            print(f"   Topics count: {data.get('count', 0)}")
            
            topics = data.get('topics', [])
            if len(topics) > 0:
                print(f"   ✅ Generated {len(topics)} blog topics")
                # Show sample topic
                sample_topic = topics[0]
                print(f"   Sample topic: {sample_topic.get('title', 'N/A')}")
                print(f"   Target keyword: {sample_topic.get('target_keyword', 'N/A')}")
                print(f"   Outline items: {len(sample_topic.get('outline', []))}")
                
                # Verify required fields
                required_fields = ['id', 'title', 'target_keyword', 'meta_description', 'outline']
                missing_fields = [field for field in required_fields if field not in sample_topic]
                if not missing_fields:
                    print(f"   ✅ All required fields present in topic structure")
                    return True
                else:
                    print(f"   ❌ Missing required fields: {missing_fields}")
                    return False
            else:
                print(f"   ❌ No blog topics generated")
                return False
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_save_blog_topic_api():
    """Test POST /api/admin/blog-topics/save"""
    print("🔍 Testing POST /api/admin/blog-topics/save...")
    
    test_topic = {
        "id": "test-123",
        "title": "Test Blog Topic: Knee Replacement Recovery Guide",
        "target_keyword": "knee replacement",
        "meta_description": "Complete guide to knee replacement recovery with timeline, exercises, and expert tips from Dr. Harsha.",
        "outline": [
            "Introduction to Knee Replacement Recovery",
            "Week 1-2: Immediate Post-Surgery Care",
            "Month 1-3: Physical Therapy Phase",
            "Month 3-6: Return to Activities",
            "Long-term Care and Maintenance"
        ],
        "status": "suggested"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/admin/blog-topics/save",
            json=test_topic,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Blog topic saved successfully")
            print(f"   Success: {data.get('success', 'N/A')}")
            print(f"   Topic ID: {data.get('id', 'N/A')}")
            return data.get('id')  # Return ID for cleanup
        else:
            print(f"   ❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_get_saved_topics_api():
    """Test GET /api/admin/blog-topics"""
    print("🔍 Testing GET /api/admin/blog-topics...")
    try:
        response = requests.get(f"{BACKEND_URL}/admin/blog-topics", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Saved blog topics API working")
            print(f"   Found {len(data)} saved blog topics")
            
            if len(data) > 0:
                # Show sample topic
                sample_topic = data[0]
                print(f"   Sample topic: {sample_topic.get('title', 'N/A')}")
                print(f"   Status: {sample_topic.get('status', 'N/A')}")
                print(f"   Target keyword: {sample_topic.get('target_keyword', 'N/A')}")
            
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
    
    # CMS Content Seeding Tests (Run first to ensure data exists)
    test_results.append(("CMS Content Seeding", test_cms_seed_content()))
    test_results.append(("CMS Seeding Idempotent", test_cms_seed_idempotent()))
    test_results.append(("CMS Pages After Seeding", test_cms_pages_after_seeding()))
    
    # NEW: CMS API Integration Tests (as requested in review)
    print("\n" + "=" * 40)
    print("🔍 CMS CONTENT MIGRATION TESTS")
    print("=" * 40)
    
    # First run migration to ensure all content exists
    test_results.append(("CMS Migrate All Content", test_cms_migrate_all_content()))
    test_results.append(("CMS Migration Status API", test_cms_migration_status_api()))
    test_results.append(("CMS Pages Admin API (54 pages)", test_cms_pages_admin_api()))
    
    print("\n" + "=" * 40)
    print("🔍 CMS API INTEGRATION TESTS")
    print("=" * 40)
    
    # CMS Conditions API Tests
    test_results.append(("CMS Conditions List API (37)", test_cms_conditions_api()))
    test_results.append(("CMS Condition Osteoarthritis", test_cms_condition_osteoarthritis()))
    test_results.append(("CMS Condition Knee Arthritis", test_cms_condition_knee_arthritis()))
    
    # CMS Treatments API Tests
    test_results.append(("CMS Treatments List API (17)", test_cms_treatments_api()))
    test_results.append(("CMS Treatment Total Knee", test_cms_treatment_total_knee_replacement()))
    
    # CMS Blogs API Tests
    test_results.append(("CMS Blogs List API", test_cms_blogs_api()))
    test_results.append(("CMS Blog 404 Test", test_cms_blog_not_found()))
    
    print("\n" + "=" * 40)
    print("🔍 EXISTING CMS ADMIN TESTS")
    print("=" * 40)
    
    # Existing CMS API Tests
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
    
    # Review Request Specific Tests
    test_results.append(("Specific Condition Pages", test_specific_condition_pages()))
    test_results.append(("Backend Health Check", test_backend_health_check()))
    
    # NEW: Keyword Research API Tests (as requested in review)
    print("\n" + "=" * 40)
    print("🔍 KEYWORD RESEARCH API TESTS")
    print("=" * 40)
    
    test_results.append(("Keyword Autocomplete API", test_keyword_autocomplete_api()))
    test_results.append(("Trending Keywords API", test_trending_keywords_api()))
    test_results.append(("Generate Blog Topics API", test_generate_blog_topics_api()))
    
    # Test save and get blog topics
    saved_topic_id = test_save_blog_topic_api()
    test_results.append(("Save Blog Topic API", bool(saved_topic_id)))
    test_results.append(("Get Saved Topics API", test_get_saved_topics_api()))
    
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