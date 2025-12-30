#!/usr/bin/env python3
"""
CMS Content Migration Script
Migrates static JavaScript content to MongoDB CMS collection
"""

import asyncio
import os
import uuid
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'careconnect')

# Sample content to migrate (conditions)
CONDITIONS_TO_MIGRATE = [
    {
        "slug": "osteoarthritis",
        "type": "condition",
        "title": "Osteoarthritis Treatment in Hyderabad",
        "meta_title": "Osteoarthritis Treatment Hyderabad | Joint Arthritis | Dr. Harsha",
        "meta_description": "Expert osteoarthritis treatment in Hyderabad. Knee, hip & joint arthritis care with advanced therapies. Dr. Harsha at Yashoda Hospital.",
        "keywords": ["osteoarthritis treatment hyderabad", "joint arthritis", "knee arthritis", "hip arthritis"],
        "content": {
            "hero": {
                "title": "Expert Osteoarthritis Treatment",
                "subtitle": "Comprehensive care for joint arthritis with advanced treatment options"
            },
            "introduction": "Osteoarthritis (OA) is the most common form of arthritis, affecting millions of people worldwide. It occurs when the protective cartilage that cushions the ends of bones wears down over time. Dr. Harsha provides comprehensive osteoarthritis treatment at Yashoda Hospital, Hyderabad.",
            "symptoms": [
                "Joint pain during or after movement",
                "Joint stiffness, especially in the morning",
                "Tenderness when applying pressure",
                "Loss of flexibility",
                "Grating sensation in the joint",
                "Bone spurs around affected joint"
            ],
            "treatments": [
                {"name": "Physical Therapy", "description": "Exercises to strengthen muscles and improve flexibility"},
                {"name": "Medications", "description": "Pain relievers and anti-inflammatory drugs"},
                {"name": "Injections", "description": "Corticosteroid or hyaluronic acid injections"},
                {"name": "Joint Replacement", "description": "Surgical option for severe cases"}
            ]
        },
        "status": "published"
    },
    {
        "slug": "acl-injury",
        "type": "condition",
        "title": "ACL Injury Treatment in Hyderabad",
        "meta_title": "ACL Injury Treatment Hyderabad | ACL Tear Surgery | Dr. Harsha",
        "meta_description": "Expert ACL injury treatment and reconstruction surgery in Hyderabad. Sports injury specialist Dr. Harsha at Yashoda Hospital.",
        "keywords": ["ACL injury treatment", "ACL tear surgery hyderabad", "ACL reconstruction", "sports injury"],
        "content": {
            "hero": {
                "title": "ACL Injury Specialist",
                "subtitle": "Get back to your active lifestyle with expert ACL treatment"
            },
            "introduction": "The anterior cruciate ligament (ACL) is one of the key ligaments that help stabilize your knee joint. ACL injuries commonly occur during sports that involve sudden stops, changes in direction, or jumping. Dr. Harsha is an expert in ACL reconstruction surgery.",
            "symptoms": [
                "Loud 'pop' at time of injury",
                "Severe pain and inability to continue activity",
                "Rapid swelling within hours",
                "Loss of range of motion",
                "Feeling of instability or 'giving way'"
            ],
            "treatments": [
                {"name": "RICE Protocol", "description": "Rest, Ice, Compression, Elevation for initial management"},
                {"name": "Physical Therapy", "description": "Pre and post-surgical rehabilitation"},
                {"name": "ACL Reconstruction", "description": "Arthroscopic surgery to replace the torn ligament"},
                {"name": "Bracing", "description": "Support during healing and return to activity"}
            ]
        },
        "status": "published"
    },
    {
        "slug": "meniscus-tear",
        "type": "condition",
        "title": "Meniscus Tear Treatment in Hyderabad",
        "meta_title": "Meniscus Tear Treatment Hyderabad | Knee Cartilage Injury | Dr. Harsha",
        "meta_description": "Expert meniscus tear treatment in Hyderabad. Arthroscopic meniscus repair and surgery. Dr. Harsha at Yashoda Hospital.",
        "keywords": ["meniscus tear treatment", "torn meniscus surgery", "knee cartilage injury", "arthroscopic repair"],
        "content": {
            "hero": {
                "title": "Meniscus Tear Treatment",
                "subtitle": "Advanced arthroscopic techniques for cartilage repair"
            },
            "introduction": "The meniscus is a C-shaped piece of cartilage that cushions and stabilizes the knee. Meniscus tears are among the most common knee injuries. They can occur from a traumatic injury or from degenerative wear over time.",
            "symptoms": [
                "Pain, especially when twisting or rotating",
                "Swelling or stiffness",
                "Difficulty straightening knee fully",
                "Feeling knee is locked or catching",
                "Sensation of knee giving way"
            ],
            "treatments": [
                {"name": "Conservative Treatment", "description": "Rest, ice, and physical therapy for minor tears"},
                {"name": "Arthroscopic Repair", "description": "Minimally invasive surgery to repair the tear"},
                {"name": "Partial Meniscectomy", "description": "Removal of damaged meniscus tissue"},
                {"name": "Meniscus Transplant", "description": "For severe cases in younger patients"}
            ]
        },
        "status": "published"
    }
]

# Treatments to migrate
TREATMENTS_TO_MIGRATE = [
    {
        "slug": "total-knee-replacement",
        "type": "treatment",
        "title": "Total Knee Replacement Surgery in Hyderabad",
        "meta_title": "Total Knee Replacement Hyderabad | TKR Surgery | Dr. Harsha",
        "meta_description": "Expert total knee replacement surgery in Hyderabad. Computer-navigated TKR by Dr. Harsha at Yashoda Hospital. 95%+ success rate.",
        "keywords": ["total knee replacement", "TKR surgery hyderabad", "knee replacement cost", "knee arthroplasty"],
        "content": {
            "hero": {
                "title": "Total Knee Replacement Surgery",
                "subtitle": "Regain mobility with advanced joint replacement technology"
            },
            "introduction": "Total knee replacement (TKR) is a surgical procedure to replace the weight-bearing surfaces of the knee joint to relieve pain and disability. It is most commonly performed for osteoarthritis but also for other knee diseases.",
            "benefits": [
                "Significant pain relief",
                "Improved mobility and function",
                "Better quality of life",
                "Long-lasting results (20+ years)",
                "Return to daily activities"
            ],
            "procedure_steps": [
                {"step": "1", "title": "Anesthesia", "description": "Spinal or general anesthesia is administered"},
                {"step": "2", "title": "Incision", "description": "An incision is made to expose the knee joint"},
                {"step": "3", "title": "Bone Preparation", "description": "Damaged bone and cartilage are removed"},
                {"step": "4", "title": "Implant Placement", "description": "Metal and plastic components are positioned"},
                {"step": "5", "title": "Closure", "description": "The incision is closed and dressing applied"}
            ],
            "recovery": "Most patients can walk with support on the day of surgery. Hospital stay is typically 2-4 days. Full recovery takes 3-6 months."
        },
        "status": "published"
    },
    {
        "slug": "hip-replacement",
        "type": "treatment",
        "title": "Hip Replacement Surgery in Hyderabad",
        "meta_title": "Hip Replacement Surgery Hyderabad | THR | Dr. Harsha",
        "meta_description": "Expert hip replacement surgery in Hyderabad. Total and partial hip replacement by Dr. Harsha at Yashoda Hospital.",
        "keywords": ["hip replacement surgery", "THR hyderabad", "hip arthroplasty", "hip joint replacement"],
        "content": {
            "hero": {
                "title": "Hip Replacement Surgery",
                "subtitle": "Advanced hip joint replacement for pain-free movement"
            },
            "introduction": "Hip replacement surgery removes the damaged hip joint and replaces it with an artificial joint. This procedure is performed to relieve pain and improve hip function in patients with severe hip arthritis or hip fractures.",
            "benefits": [
                "Relief from chronic hip pain",
                "Restored hip mobility",
                "Improved walking ability",
                "Return to activities",
                "High success rate"
            ],
            "recovery": "Hospital stay is typically 3-5 days. Most patients use a walker initially and transition to a cane. Full recovery takes 3-6 months."
        },
        "status": "published"
    },
    {
        "slug": "arthroscopic-surgery",
        "type": "treatment",
        "title": "Arthroscopic Surgery in Hyderabad",
        "meta_title": "Arthroscopic Surgery Hyderabad | Keyhole Surgery | Dr. Harsha",
        "meta_description": "Minimally invasive arthroscopic surgery in Hyderabad. Knee, shoulder, ankle arthroscopy by Dr. Harsha at Yashoda Hospital.",
        "keywords": ["arthroscopic surgery", "keyhole surgery", "minimally invasive surgery", "arthroscopy hyderabad"],
        "content": {
            "hero": {
                "title": "Arthroscopic Surgery",
                "subtitle": "Minimally invasive surgery for faster recovery"
            },
            "introduction": "Arthroscopy is a minimally invasive surgical procedure used to diagnose and treat joint problems. A small camera (arthroscope) is inserted through a tiny incision, allowing the surgeon to see inside the joint on a video monitor.",
            "benefits": [
                "Smaller incisions",
                "Less pain after surgery",
                "Faster recovery time",
                "Lower infection risk",
                "Outpatient procedure possible"
            ],
            "joints_treated": ["Knee", "Shoulder", "Hip", "Ankle", "Elbow", "Wrist"],
            "common_procedures": [
                "ACL reconstruction",
                "Meniscus repair",
                "Rotator cuff repair",
                "Loose body removal",
                "Cartilage repair"
            ]
        },
        "status": "published"
    }
]

async def migrate_content():
    """Migrate static content to MongoDB"""
    print("🚀 Starting CMS content migration...")
    
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # Combine all content
    all_pages = CONDITIONS_TO_MIGRATE + TREATMENTS_TO_MIGRATE
    
    migrated_count = 0
    skipped_count = 0
    
    for page_data in all_pages:
        # Check if page already exists
        existing = await db.cms_pages.find_one({"slug": page_data["slug"]})
        
        if existing:
            print(f"  ⏭️  Skipped (exists): {page_data['title']}")
            skipped_count += 1
            continue
        
        # Create the page document
        page_doc = {
            "id": str(uuid.uuid4()),
            "slug": page_data["slug"],
            "type": page_data["type"],
            "title": page_data["title"],
            "meta_title": page_data.get("meta_title", ""),
            "meta_description": page_data.get("meta_description", ""),
            "keywords": page_data.get("keywords", []),
            "content": page_data.get("content", {}),
            "status": page_data.get("status", "draft"),
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "published_at": datetime.now(timezone.utc).isoformat() if page_data.get("status") == "published" else None
        }
        
        await db.cms_pages.insert_one(page_doc)
        print(f"  ✅ Migrated: {page_data['title']}")
        migrated_count += 1
    
    print(f"\n📊 Migration complete!")
    print(f"   - Migrated: {migrated_count} pages")
    print(f"   - Skipped: {skipped_count} pages")
    
    # Print total pages in CMS
    total = await db.cms_pages.count_documents({})
    print(f"   - Total CMS pages: {total}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(migrate_content())
