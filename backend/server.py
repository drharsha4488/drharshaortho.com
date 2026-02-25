from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import httpx
import json
import re
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone

# Try to import resend for email notifications
try:
    import resend
    RESEND_AVAILABLE = True
except ImportError:
    RESEND_AVAILABLE = False

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection with better error handling for Atlas
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'careconnect')

# Configure MongoDB client with connection pooling for production
client = AsyncIOMotorClient(
    mongo_url,
    maxPoolSize=10,
    minPoolSize=1,
    maxIdleTimeMS=30000,
    serverSelectionTimeoutMS=5000,
    connectTimeoutMS=10000,
    retryWrites=True
)
db = client[db_name]

# Email configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'info@drharshaortho.com')

# IndexNow configuration for instant SEO indexing
INDEXNOW_KEY = "4a23f9921f4a4ef087adc0bd40b03484"
INDEXNOW_ENABLED = True
SITE_HOST = os.environ.get('SITE_HOST', 'drharshaortho.com')

# Initialize Resend
if RESEND_AVAILABLE and RESEND_API_KEY and RESEND_API_KEY != 're_placeholder':
    resend.api_key = RESEND_API_KEY

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============ Models ============

# Appointment Models
class AppointmentCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    preferred_date: Optional[str] = None
    message: Optional[str] = None

class Appointment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    preferred_date: Optional[str] = None
    message: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Testimonial Models
class TestimonialCreate(BaseModel):
    patient_name: str
    condition: str
    treatment: str
    rating: int = Field(ge=1, le=5)
    testimonial_text: str

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    patient_name: str
    condition: str
    treatment: str
    rating: int
    testimonial_text: str
    approved: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Blog Models
class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    content: str
    excerpt: str
    author: str = "Dr. B Harsha Vardhana Reddy"
    published_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    tags: List[str] = []
    image_url: Optional[str] = None


# Contact Models
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    subject: str
    message: str

class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ============ Keyword Research Models ============

class KeywordSuggestion(BaseModel):
    keyword: str
    search_volume: Optional[str] = "Unknown"
    difficulty: Optional[str] = "Medium"
    source: str = "autocomplete"

class BlogTopicSuggestion(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    target_keyword: str
    meta_description: str
    outline: List[str] = []
    estimated_word_count: int = 1500
    priority: str = "medium"  # high, medium, low
    status: str = "suggested"  # suggested, approved, in_progress, published, rejected
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    published_at: Optional[datetime] = None

class ContentIdea(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: str  # blog, landing_page, faq
    title: str
    keywords: List[str] = []
    notes: Optional[str] = None
    status: str = "idea"  # idea, planned, in_progress, published
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ============ Routes ============

# Health check endpoint for Kubernetes (at root level, not under /api)
@app.get("/health")
async def health_check():
    """Health check endpoint for Kubernetes liveness/readiness probes"""
    return {"status": "healthy", "service": "careconnect-backend"}

@api_router.get("/")
async def root():
    return {"message": "CareConnect API - Dr. B Harsha Vardhana Reddy"}


# Email notification helper function
async def send_appointment_notification(appointment: Appointment):
    """Send email notification for new appointment"""
    if not RESEND_AVAILABLE or not RESEND_API_KEY or RESEND_API_KEY == 're_placeholder':
        logger.info("Email notifications not configured, skipping email")
        return False
    
    try:
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #0d9488; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">New Appointment Request</h1>
            </div>
            <div style="padding: 20px; background-color: #f9fafb;">
                <h2 style="color: #1f2937;">Patient Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Name:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">{appointment.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">{appointment.email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">{appointment.phone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Preferred Date:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">{appointment.preferred_date}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Message:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">{appointment.message or 'No message provided'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; font-weight: bold;">Submitted At:</td>
                        <td style="padding: 10px;">{appointment.created_at.strftime('%B %d, %Y at %I:%M %p')}</td>
                    </tr>
                </table>
            </div>
            <div style="padding: 20px; background-color: #0d9488; text-align: center;">
                <p style="color: white; margin: 0;">Dr. B Harsha Vardhana Reddy - Orthopedic Surgeon</p>
                <p style="color: white; margin: 5px 0 0 0; font-size: 12px;">Apollo Hospitals, Financial District, Hyderabad</p>
            </div>
        </div>
        """
        
        params = {
            "from": SENDER_EMAIL,
            "to": [NOTIFICATION_EMAIL],
            "subject": f"New Appointment Request from {appointment.name}",
            "html": html_content
        }
        
        # Run sync SDK in thread to keep FastAPI non-blocking
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Appointment notification email sent to {NOTIFICATION_EMAIL}")
        return True
    except Exception as e:
        logger.error(f"Failed to send appointment notification email: {str(e)}")
        return False


# Appointment Endpoints
@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(appointment_data: AppointmentCreate):
    """Create a new appointment request"""
    try:
        appointment = Appointment(**appointment_data.model_dump())
        doc = appointment.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        await db.appointments.insert_one(doc)
        
        logger.info(f"New appointment created: {appointment.name} - {appointment.email}")
        
        # Send email notification (non-blocking)
        asyncio.create_task(send_appointment_notification(appointment))
        
        return appointment
    except Exception as e:
        logger.error(f"Error creating appointment: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create appointment")


@api_router.get("/appointments", response_model=List[Appointment])
async def get_appointments():
    """Get all appointments (admin endpoint)"""
    try:
        appointments = await db.appointments.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
        
        for appointment in appointments:
            if isinstance(appointment.get('created_at'), str):
                appointment['created_at'] = datetime.fromisoformat(appointment['created_at'])
        
        return appointments
    except Exception as e:
        logger.error(f"Error fetching appointments: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch appointments")


# Testimonial Endpoints
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    """Get all approved testimonials"""
    try:
        testimonials = await db.testimonials.find(
            {"approved": True}, 
            {"_id": 0}
        ).sort("created_at", -1).to_list(50)
        
        for testimonial in testimonials:
            if isinstance(testimonial.get('created_at'), str):
                testimonial['created_at'] = datetime.fromisoformat(testimonial['created_at'])
        
        return testimonials
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch testimonials")


@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial_data: TestimonialCreate):
    """Submit a new testimonial"""
    try:
        testimonial = Testimonial(**testimonial_data.model_dump())
        doc = testimonial.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        await db.testimonials.insert_one(doc)
        
        logger.info(f"New testimonial submitted: {testimonial.patient_name}")
        return testimonial
    except Exception as e:
        logger.error(f"Error creating testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit testimonial")


# Blog Endpoints
@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts():
    """Get all blog posts"""
    try:
        posts = await db.blog_posts.find({}, {"_id": 0}).sort("published_date", -1).to_list(50)
        
        for post in posts:
            if isinstance(post.get('published_date'), str):
                post['published_date'] = datetime.fromisoformat(post['published_date'])
        
        return posts
    except Exception as e:
        logger.error(f"Error fetching blog posts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog posts")


@api_router.get("/blog/{slug}")
async def get_blog_post(slug: str):
    """Get a single blog post by slug"""
    try:
        post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
        
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        if isinstance(post.get('published_date'), str):
            post['published_date'] = datetime.fromisoformat(post['published_date'])
        
        return post
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog post")


# Contact Endpoints
@api_router.post("/contact", response_model=Contact)
async def create_contact(contact_data: ContactCreate):
    """Submit a contact form"""
    try:
        contact = Contact(**contact_data.model_dump())
        doc = contact.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        await db.contacts.insert_one(doc)
        
        logger.info(f"New contact form submitted: {contact.name} - {contact.subject}")
        return contact
    except Exception as e:
        logger.error(f"Error creating contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")


# ============ Admin Endpoints ============

# Simple password check (in production, use proper auth)
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'drharsha2025')

class AdminLogin(BaseModel):
    password: str

class StatusUpdate(BaseModel):
    status: str  # pending, confirmed, completed, cancelled

@api_router.post("/admin/login")
async def admin_login(login: AdminLogin):
    """Simple admin authentication"""
    if login.password == ADMIN_PASSWORD:
        return {"success": True, "message": "Login successful"}
    raise HTTPException(status_code=401, detail="Invalid password")

@api_router.get("/admin/appointments")
async def get_admin_appointments():
    """Get all appointments for admin"""
    try:
        appointments = await db.appointments.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
        
        for appointment in appointments:
            if isinstance(appointment.get('created_at'), str):
                appointment['created_at'] = datetime.fromisoformat(appointment['created_at'])
        
        return appointments
    except Exception as e:
        logger.error(f"Error fetching admin appointments: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch appointments")

@api_router.put("/admin/appointments/{appointment_id}")
async def update_appointment_status(appointment_id: str, status_update: StatusUpdate):
    """Update appointment status"""
    try:
        result = await db.appointments.update_one(
            {"id": appointment_id},
            {"$set": {"status": status_update.status}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Appointment not found")
        
        logger.info(f"Appointment {appointment_id} status updated to {status_update.status}")
        return {"success": True, "message": f"Status updated to {status_update.status}"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating appointment: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update appointment")

@api_router.delete("/admin/appointments/{appointment_id}")
async def delete_appointment(appointment_id: str):
    """Delete an appointment"""
    try:
        result = await db.appointments.delete_one({"id": appointment_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Appointment not found")
        
        logger.info(f"Appointment {appointment_id} deleted")
        return {"success": True, "message": "Appointment deleted"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting appointment: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete appointment")

@api_router.get("/admin/stats")
async def get_admin_stats():
    """Get dashboard statistics"""
    try:
        total_appointments = await db.appointments.count_documents({})
        pending_appointments = await db.appointments.count_documents({"status": "pending"})
        confirmed_appointments = await db.appointments.count_documents({"status": "confirmed"})
        completed_appointments = await db.appointments.count_documents({"status": "completed"})
        total_blog_posts = await db.blog_posts.count_documents({})
        
        # Get recent appointments
        recent = await db.appointments.find({}, {"_id": 0}).sort("created_at", -1).to_list(5)
        
        return {
            "total": total_appointments,
            "pending": pending_appointments,
            "confirmed": confirmed_appointments,
            "completed": completed_appointments,
            "blog_posts": total_blog_posts,
            "recent": recent
        }
    except Exception as e:
        logger.error(f"Error fetching stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch statistics")


# ============ Blog Management Endpoints ============

class BlogPostCreate(BaseModel):
    title: str
    content: str
    excerpt: str
    tags: List[str] = []
    image_url: Optional[str] = None

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    tags: Optional[List[str]] = None
    image_url: Optional[str] = None

def generate_slug(title: str) -> str:
    """Generate URL-friendly slug from title"""
    import re
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s_]+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

@api_router.get("/admin/blog")
async def get_admin_blog_posts():
    """Get all blog posts for admin"""
    try:
        posts = await db.blog_posts.find({}, {"_id": 0}).sort("published_date", -1).to_list(100)
        
        for post in posts:
            if isinstance(post.get('published_date'), str):
                post['published_date'] = datetime.fromisoformat(post['published_date'])
        
        return posts
    except Exception as e:
        logger.error(f"Error fetching admin blog posts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog posts")

@api_router.post("/admin/blog")
async def create_blog_post(post_data: BlogPostCreate):
    """Create a new blog post"""
    try:
        slug = generate_slug(post_data.title)
        
        # Check if slug exists
        existing = await db.blog_posts.find_one({"slug": slug})
        if existing:
            slug = f"{slug}-{str(uuid.uuid4())[:8]}"
        
        post = BlogPost(
            title=post_data.title,
            slug=slug,
            content=post_data.content,
            excerpt=post_data.excerpt,
            tags=post_data.tags,
            image_url=post_data.image_url
        )
        
        doc = post.model_dump()
        doc['published_date'] = doc['published_date'].isoformat()
        
        await db.blog_posts.insert_one(doc)
        
        logger.info(f"New blog post created: {post.title}")
        return {"success": True, "id": post.id, "slug": post.slug}
    except Exception as e:
        logger.error(f"Error creating blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create blog post")

@api_router.put("/admin/blog/{post_id}")
async def update_blog_post(post_id: str, post_data: BlogPostUpdate):
    """Update a blog post"""
    try:
        update_data = {k: v for k, v in post_data.model_dump().items() if v is not None}
        
        if 'title' in update_data:
            update_data['slug'] = generate_slug(update_data['title'])
        
        result = await db.blog_posts.update_one(
            {"id": post_id},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        logger.info(f"Blog post {post_id} updated")
        return {"success": True, "message": "Blog post updated"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update blog post")

@api_router.delete("/admin/blog/{post_id}")
async def delete_blog_post(post_id: str):
    """Delete a blog post"""
    try:
        result = await db.blog_posts.delete_one({"id": post_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        logger.info(f"Blog post {post_id} deleted")
        return {"success": True, "message": "Blog post deleted"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete blog post")


# ============ CMS Pages Endpoints ============

class CMSPageCreate(BaseModel):
    slug: str
    type: str  # condition, treatment, seo_landing, blog, general
    title: str
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    keywords: List[str] = []
    content: dict = {}  # Flexible content structure
    status: str = "draft"  # draft, published

class CMSPageUpdate(BaseModel):
    slug: Optional[str] = None
    type: Optional[str] = None
    title: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    keywords: Optional[List[str]] = None
    content: Optional[dict] = None
    status: Optional[str] = None

class CMSPage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    type: str
    title: str
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    keywords: List[str] = []
    content: dict = {}
    status: str = "draft"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    published_at: Optional[datetime] = None

@api_router.get("/admin/cms/pages")
async def get_cms_pages(type: Optional[str] = None, status: Optional[str] = None):
    """Get all CMS pages (admin)"""
    try:
        query = {}
        if type:
            query["type"] = type
        if status:
            query["status"] = status
        
        pages = await db.cms_pages.find(query, {"_id": 0}).sort("updated_at", -1).to_list(500)
        
        # Convert date strings to datetime objects (handle various formats)
        for page in pages:
            for date_field in ['created_at', 'updated_at', 'published_at']:
                if date_field in page and page[date_field]:
                    try:
                        if isinstance(page[date_field], str):
                            # Try parsing ISO format with timezone
                            page[date_field] = page[date_field]  # Keep as string for JSON serialization
                    except Exception:
                        pass
        
        return pages
    except Exception as e:
        logger.error(f"Error fetching CMS pages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch pages")

@api_router.post("/admin/cms/pages")
async def create_cms_page(page_data: CMSPageCreate):
    """Create a new CMS page"""
    try:
        # Check if slug exists
        existing = await db.cms_pages.find_one({"slug": page_data.slug})
        if existing:
            raise HTTPException(status_code=400, detail="Page with this slug already exists")
        
        page = CMSPage(**page_data.model_dump())
        
        if page_data.status == "published":
            page.published_at = datetime.now(timezone.utc)
        
        doc = page.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        doc['updated_at'] = doc['updated_at'].isoformat()
        if doc['published_at']:
            doc['published_at'] = doc['published_at'].isoformat()
        
        await db.cms_pages.insert_one(doc)
        
        logger.info(f"CMS page created: {page.title} ({page.slug})")
        return {"success": True, "id": page.id, "slug": page.slug}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating CMS page: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create page")

@api_router.get("/admin/cms/pages/{page_id}")
async def get_cms_page_by_id(page_id: str):
    """Get a CMS page by ID (admin)"""
    try:
        page = await db.cms_pages.find_one({"id": page_id}, {"_id": 0})
        
        if not page:
            raise HTTPException(status_code=404, detail="Page not found")
        
        return page
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching CMS page: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch page")

@api_router.put("/admin/cms/pages/{page_id}")
async def update_cms_page(page_id: str, page_data: CMSPageUpdate):
    """Update a CMS page"""
    try:
        update_data = {k: v for k, v in page_data.model_dump().items() if v is not None}
        update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
        
        # If publishing, set published_at
        if update_data.get('status') == 'published':
            existing = await db.cms_pages.find_one({"id": page_id})
            if existing and not existing.get('published_at'):
                update_data['published_at'] = datetime.now(timezone.utc).isoformat()
        
        result = await db.cms_pages.update_one(
            {"id": page_id},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Page not found")
        
        logger.info(f"CMS page updated: {page_id}")
        return {"success": True, "message": "Page updated"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating CMS page: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update page")

@api_router.delete("/admin/cms/pages/{page_id}")
async def delete_cms_page(page_id: str):
    """Delete a CMS page"""
    try:
        result = await db.cms_pages.delete_one({"id": page_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Page not found")
        
        logger.info(f"CMS page deleted: {page_id}")
        return {"success": True, "message": "Page deleted"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting CMS page: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete page")

# Public CMS endpoints
@api_router.get("/cms/pages/{slug}")
async def get_public_cms_page(slug: str):
    """Get a published CMS page by slug (public)"""
    try:
        page = await db.cms_pages.find_one(
            {"slug": slug, "status": "published"}, 
            {"_id": 0}
        )
        
        if not page:
            raise HTTPException(status_code=404, detail="Page not found")
        
        return page
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching public CMS page: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch page")

@api_router.get("/cms/pages/type/{page_type}")
async def get_public_cms_pages_by_type(page_type: str):
    """Get all published CMS pages of a specific type (public)"""
    try:
        pages = await db.cms_pages.find(
            {"type": page_type, "status": "published"},
            {"_id": 0, "content": 0}  # Exclude full content for listing
        ).sort("title", 1).to_list(100)
        
        return pages
    except Exception as e:
        logger.error(f"Error fetching public CMS pages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch pages")


# ============ CMS Content Seeding ============

# Seed content for production database
CMS_SEED_CONTENT = [
    # Conditions
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
    },
    # Treatments
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
    },
    {
        "slug": "sports-injury-treatment",
        "type": "treatment",
        "title": "Sports Injury Treatment in Hyderabad",
        "meta_title": "Sports Injury Treatment Hyderabad | Sports Medicine | Dr. Harsha",
        "meta_description": "Expert sports injury treatment in Hyderabad. ACL, meniscus, rotator cuff injuries. Dr. Harsha at Yashoda Hospital.",
        "keywords": ["sports injury treatment", "sports medicine hyderabad", "ACL injury", "meniscus tear"],
        "content": {
            "hero": {
                "title": "Sports Injury Treatment",
                "subtitle": "Get back in the game with expert sports medicine care"
            },
            "introduction": "Sports injuries require specialized care to ensure proper healing and return to activity. Dr. Harsha provides comprehensive sports injury treatment using the latest techniques in sports medicine.",
            "common_injuries": [
                "ACL and ligament tears",
                "Meniscus injuries",
                "Rotator cuff tears",
                "Tennis elbow",
                "Ankle sprains",
                "Stress fractures"
            ],
            "treatment_approach": [
                "Accurate diagnosis with advanced imaging",
                "Conservative treatment when appropriate",
                "Minimally invasive surgery when needed",
                "Comprehensive rehabilitation program",
                "Return-to-sport protocols"
            ]
        },
        "status": "published"
    }
]

@api_router.post("/admin/cms/seed-content")
async def seed_cms_content():
    """Seed initial CMS content to database (for production setup)"""
    try:
        migrated_count = 0
        skipped_count = 0
        results = []
        
        for page_data in CMS_SEED_CONTENT:
            # Check if page already exists
            existing = await db.cms_pages.find_one({"slug": page_data["slug"]})
            
            if existing:
                results.append({"slug": page_data["slug"], "status": "skipped", "reason": "already exists"})
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
            results.append({"slug": page_data["slug"], "status": "created", "title": page_data["title"]})
            migrated_count += 1
            logger.info(f"CMS page seeded: {page_data['title']}")
        
        # Get total count
        total_pages = await db.cms_pages.count_documents({})
        
        return {
            "success": True,
            "message": f"Seeding complete. Created: {migrated_count}, Skipped: {skipped_count}",
            "created": migrated_count,
            "skipped": skipped_count,
            "total_pages": total_pages,
            "details": results
        }
    except Exception as e:
        logger.error(f"Error seeding CMS content: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to seed content: {str(e)}")


# ============ Full CMS Content Migration with Detailed Data ============

# Comprehensive condition data with full treatment protocols (from conditionsDetailed.js)
CONDITIONS_DETAILED_DATA = {
    "knee-arthritis": {
        "name": "Knee Arthritis & Osteoarthritis",
        "category": "Knee",
        "icon": "🦵",
        "imageUrl": "https://images.pexels.com/photos/7446985/pexels-photo-7446985.jpeg?auto=compress&cs=tinysrgb&w=800",
        "overview": "Knee osteoarthritis (OA) is the most common form of arthritis affecting millions worldwide. It occurs when the protective cartilage cushioning the knee joint gradually wears down, leading to bone-on-bone contact, inflammation, and pain. Dr. B Harsha Vardhana Reddy specializes in comprehensive knee arthritis management at Yashoda Hospital, Hyderabad.",
        "causes": [
            "Age-related wear and tear (most common in adults over 50)",
            "Previous knee injuries (ACL tears, meniscus injuries, fractures)",
            "Obesity and excess body weight",
            "Genetic predisposition",
            "Repetitive stress from occupational activities",
            "Malalignment (bow legs or knock knees)",
            "Inflammatory conditions like rheumatoid arthritis"
        ],
        "symptoms": [
            {"name": "Knee pain and stiffness", "description": "Especially after prolonged sitting or in the morning"},
            {"name": "Swelling and inflammation", "description": "Joint appears puffy, warm to touch"},
            {"name": "Difficulty walking or climbing stairs", "description": "Pain worsens with activity"},
            {"name": "Grinding sensation (crepitus)", "description": "Feeling or hearing crackling during movement"},
            {"name": "Reduced range of motion", "description": "Difficulty fully bending or straightening the knee"},
            {"name": "Joint instability", "description": "Feeling of knee giving way"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Assessment of range of motion, swelling, tenderness, and alignment"},
            {"name": "X-rays", "description": "Standing weight-bearing views to assess joint space narrowing"},
            {"name": "MRI Scan", "description": "Detailed imaging of cartilage, meniscus, and soft tissues"},
            {"name": "Blood Tests", "description": "To rule out inflammatory arthritis conditions"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Physical Therapy Protocol",
                "link": "/treatments/physical-therapy",
                "description": "Structured exercise program to strengthen muscles and improve joint function",
                "details": [
                    "Quadriceps strengthening: Straight leg raises (3 sets x 15 reps, daily)",
                    "Hamstring curls: Seated or standing (3 sets x 12 reps)",
                    "Range of motion exercises: Heel slides, knee bends",
                    "Low-impact aerobics: Swimming, cycling (30 min, 3-5 times/week)",
                    "Balance training: Single leg stands, wobble board exercises"
                ],
                "duration": "6-12 weeks initial program, ongoing maintenance",
                "evidenceLevel": "Strong evidence (Level A) - Cochrane Review 2022"
            },
            {
                "name": "Weight Management",
                "description": "Every 1 kg of weight loss reduces knee joint load by 4 kg",
                "details": [
                    "Target: BMI < 25 for optimal joint health",
                    "Caloric deficit of 500-750 calories/day for gradual weight loss",
                    "Anti-inflammatory diet: Mediterranean diet recommended",
                    "Avoid processed foods, excess sugar, and red meat"
                ],
                "evidenceLevel": "Strong evidence (Level A)"
            },
            {
                "name": "Medications",
                "description": "Pain relief and inflammation control",
                "details": [
                    "Paracetamol (Acetaminophen): First-line, up to 3g/day",
                    "NSAIDs (Ibuprofen, Diclofenac): Short-term use for flare-ups",
                    "Topical NSAIDs: Diclofenac gel applied 3-4 times daily",
                    "Glucosamine & Chondroitin: 1500mg/1200mg daily (moderate evidence)"
                ],
                "evidenceLevel": "Moderate evidence (Level B)"
            },
            {
                "name": "Intra-articular Injections",
                "link": "/treatments/prp-injections",
                "description": "Direct injection into the knee joint",
                "details": [
                    "Corticosteroid injections: Quick relief, lasts 4-12 weeks (max 3-4/year)",
                    "Hyaluronic acid (Viscosupplementation): Lubricates joint, may last 6 months",
                    "PRP (Platelet-Rich Plasma): Uses body's healing factors",
                    "Stem cell therapy: Emerging treatment for cartilage regeneration"
                ],
                "evidenceLevel": "Moderate evidence for steroids/HA, emerging for PRP"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Arthroscopic Debridement",
                "link": "/treatments/knee-arthroscopy",
                "description": "Keyhole surgery to clean up the joint",
                "indications": "Mechanical symptoms (catching, locking) with loose bodies",
                "procedure": "Removal of loose cartilage fragments, smoothening of rough surfaces",
                "recovery": "2-4 weeks",
                "successRate": "Limited for pure OA, better for mechanical symptoms"
            },
            {
                "name": "High Tibial Osteotomy (HTO)",
                "link": "/treatments/osteotomy",
                "description": "Bone realignment surgery for younger patients",
                "indications": "Unicompartmental OA with malalignment, age < 60",
                "procedure": "Cutting and realigning the tibia to shift weight to healthy cartilage",
                "recovery": "3-6 months",
                "successRate": "80-90% good results at 10 years"
            },
            {
                "name": "Partial Knee Replacement (UKR)",
                "link": "/treatments/partial-knee-replacement",
                "description": "Replacing only the damaged compartment",
                "indications": "Single compartment OA with intact ligaments",
                "procedure": "Resurfacing of medial or lateral compartment only",
                "recovery": "4-6 weeks",
                "successRate": "90% survival at 15 years"
            },
            {
                "name": "Total Knee Replacement (TKR)",
                "link": "/treatments/total-knee-replacement",
                "description": "Gold standard for end-stage knee arthritis",
                "indications": "Severe OA affecting multiple compartments, failed conservative treatment",
                "procedure": "Replacing all three compartments with metal and plastic implants",
                "recovery": "6-12 weeks for walking independence, 3-6 months full recovery",
                "successRate": "95% survival at 15-20 years"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Pain management, gentle range of motion exercises"},
            {"phase": "Week 3-6", "milestone": "Progressive strengthening, walking with assistance"},
            {"phase": "Week 7-12", "milestone": "Independent walking, stair climbing"},
            {"phase": "Month 3-6", "milestone": "Return to normal daily activities"},
            {"phase": "Month 6-12", "milestone": "Full recovery, return to recreational activities"}
        ],
        "faqs": [
            {
                "question": "Can knee arthritis be cured without surgery?",
                "answer": "While knee arthritis cannot be completely reversed, many patients achieve significant pain relief and improved function through non-surgical treatments including physical therapy, weight loss, medications, and injections. Surgery is only considered when conservative treatments fail."
            },
            {
                "question": "How long does a knee replacement last?",
                "answer": "Modern knee replacements have excellent durability with 95% of implants lasting 15-20 years. With proper care and activity modification, many patients enjoy pain-free function for their lifetime."
            },
            {
                "question": "What is the best exercise for knee arthritis?",
                "answer": "Low-impact exercises are best: swimming, cycling, walking on flat surfaces, and specific strengthening exercises for quadriceps and hamstrings. High-impact activities like running and jumping should be avoided."
            },
            {
                "question": "When should I consider knee replacement surgery?",
                "answer": "Consider surgery when pain significantly affects your quality of life, sleep, and daily activities despite trying conservative treatments for 3-6 months. X-rays showing severe joint damage and failure of medications/injections are additional indicators."
            }
        ],
        "relatedConditions": ["meniscus-tear", "acl-tear", "patella-dislocation"],
        "relatedTreatments": ["total-knee-replacement", "knee-arthroscopy", "prp-injections"]
    },
    "acl-tear": {
        "name": "ACL Tear & Knee Ligament Injuries",
        "category": "Sports Injury",
        "icon": "⚽",
        "imageUrl": "https://images.unsplash.com/photo-1649751361457-01d3a696c7e6?w=800&q=80",
        "overview": "The anterior cruciate ligament (ACL) is one of the key ligaments that help stabilize the knee joint. ACL injuries commonly occur during sports that involve sudden stops, changes in direction, or jumping. Dr. B Harsha Vardhana Reddy is an expert in ACL reconstruction surgery at Yashoda Hospital, Hyderabad, using advanced arthroscopic techniques.",
        "causes": [
            "Sports injuries: Sudden pivoting or cutting movements",
            "Direct blow to the knee during contact sports",
            "Landing awkwardly from a jump",
            "Rapidly slowing down while running",
            "Hyperextension of the knee",
            "Female athletes at higher risk (anatomical and hormonal factors)"
        ],
        "symptoms": [
            {"name": "Loud 'pop' at time of injury", "description": "Many patients hear or feel a popping sensation"},
            {"name": "Severe pain and swelling", "description": "Rapid swelling within hours of injury"},
            {"name": "Knee instability", "description": "Feeling of knee giving way, especially with pivoting"},
            {"name": "Loss of range of motion", "description": "Difficulty fully extending the knee"},
            {"name": "Difficulty bearing weight", "description": "Unable to continue activity after injury"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Lachman test, anterior drawer test, pivot shift test"},
            {"name": "X-rays", "description": "To rule out fractures"},
            {"name": "MRI Scan", "description": "Gold standard - shows ACL tear and associated injuries"},
            {"name": "Arthroscopy", "description": "Direct visualization during surgery"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "RICE Protocol",
                "description": "Immediate first aid management",
                "details": [
                    "Rest: Avoid weight bearing, use crutches",
                    "Ice: 20 minutes every 2-3 hours for first 48-72 hours",
                    "Compression: Elastic bandage to control swelling",
                    "Elevation: Keep leg elevated above heart level"
                ],
                "duration": "First 1-2 weeks",
                "evidenceLevel": "Standard of care for acute injury"
            },
            {
                "name": "Physical Therapy (Pre-habilitation)",
                "description": "Preparation before surgery",
                "details": [
                    "Restore full range of motion before surgery",
                    "Reduce swelling through exercises and modalities",
                    "Strengthen quadriceps and hamstrings",
                    "Improve proprioception and balance"
                ],
                "duration": "2-4 weeks before surgery",
                "evidenceLevel": "Strong evidence for better surgical outcomes"
            },
            {
                "name": "Functional Bracing",
                "description": "For patients opting out of surgery",
                "details": [
                    "Hinged knee brace for stability",
                    "Activity modification - avoid pivoting sports",
                    "Ongoing strengthening program",
                    "May be suitable for older, less active patients"
                ],
                "evidenceLevel": "Moderate evidence for selected patients"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "ACL Reconstruction (Arthroscopic)",
                "link": "/treatments/acl-reconstruction",
                "description": "Gold standard surgical treatment",
                "indications": "Active individuals, athletes, recurrent instability, associated injuries",
                "procedure": "Replace torn ACL with graft (hamstring, patellar tendon, or allograft)",
                "recovery": "6-9 months for return to sports",
                "successRate": "90-95% return to previous activity level"
            },
            {
                "name": "ACL Repair (Bridge-Enhanced)",
                "description": "Newer technique for proximal tears",
                "indications": "Acute proximal ACL tears, good tissue quality",
                "procedure": "Repair native ACL with scaffold and biological augmentation",
                "recovery": "6-9 months",
                "successRate": "Emerging technique with promising results"
            },
            {
                "name": "Multi-Ligament Reconstruction",
                "description": "For combined ligament injuries",
                "indications": "ACL + PCL, ACL + MCL, knee dislocation",
                "procedure": "Staged or single-stage reconstruction of multiple ligaments",
                "recovery": "9-12 months",
                "successRate": "Variable based on injury severity"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Pain and swelling control, restore extension"},
            {"phase": "Week 2-6", "milestone": "Progress range of motion, begin strengthening"},
            {"phase": "Month 2-3", "milestone": "Full ROM, progressive strengthening, stationary bike"},
            {"phase": "Month 3-6", "milestone": "Running progression, sport-specific training"},
            {"phase": "Month 6-9", "milestone": "Return to sport after clearance testing"}
        ],
        "faqs": [
            {
                "question": "Can you walk with a torn ACL?",
                "answer": "Yes, many people can walk with a torn ACL once the initial swelling subsides. However, the knee may feel unstable, especially with pivoting or turning movements. Walking in a straight line is usually possible."
            },
            {
                "question": "Is ACL surgery necessary?",
                "answer": "Not always. Surgery is recommended for active individuals, athletes, and those with recurrent instability. Older, less active patients may manage well with physical therapy and bracing."
            },
            {
                "question": "How long before I can play sports after ACL surgery?",
                "answer": "Most athletes return to sports 6-9 months after ACL reconstruction, following successful completion of rehabilitation and return-to-sport testing."
            },
            {
                "question": "What is the best graft for ACL reconstruction?",
                "answer": "The choice depends on individual factors. Patellar tendon and hamstring autografts are most common. Your surgeon will recommend the best option based on your activity level and goals."
            }
        ],
        "relatedConditions": ["meniscus-tear", "pcl-injury", "knee-arthritis"],
        "relatedTreatments": ["acl-reconstruction", "knee-arthroscopy", "physical-therapy"]
    },
    "hip-arthritis": {
        "name": "Hip Arthritis & AVN",
        "category": "Hip",
        "icon": "🦴",
        "imageUrl": "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800",
        "overview": "Hip arthritis and avascular necrosis (AVN) are conditions that cause progressive hip joint damage and pain. Osteoarthritis involves wear of cartilage, while AVN occurs when blood supply to the femoral head is disrupted. Dr. B Harsha Vardhana Reddy specializes in hip preservation and replacement surgery at Yashoda Hospital, Hyderabad.",
        "causes": [
            "Age-related wear and tear (primary osteoarthritis)",
            "Previous hip injury or fracture",
            "Avascular necrosis from steroid use, alcohol, or trauma",
            "Developmental dysplasia of hip (DDH)",
            "Inflammatory conditions (rheumatoid arthritis)",
            "Femoroacetabular impingement (FAI)"
        ],
        "symptoms": [
            {"name": "Groin pain", "description": "Deep aching pain in the groin area, the hallmark of hip arthritis"},
            {"name": "Pain with activity", "description": "Worse with walking, climbing stairs, getting up from chair"},
            {"name": "Limping", "description": "Antalgic gait to offload the painful hip"},
            {"name": "Stiffness", "description": "Difficulty putting on shoes, socks, cutting toenails"},
            {"name": "Referred pain", "description": "Pain may radiate to thigh, buttock, or knee"},
            {"name": "Night pain", "description": "Pain disturbing sleep in advanced cases"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Range of motion testing, gait analysis, impingement tests"},
            {"name": "X-rays", "description": "Standing AP pelvis and lateral hip views"},
            {"name": "MRI Scan", "description": "Essential for diagnosing AVN and labral tears"},
            {"name": "CT Scan", "description": "For complex deformity planning"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Activity Modification",
                "description": "Lifestyle changes to reduce hip stress",
                "details": [
                    "Avoid prolonged standing and walking",
                    "Use walking aids (cane in opposite hand)",
                    "Avoid stairs, squatting, sitting cross-legged",
                    "Swimming and cycling are preferred exercises"
                ],
                "evidenceLevel": "Standard recommendation"
            },
            {
                "name": "Physical Therapy",
                "description": "Hip strengthening and mobility program",
                "details": [
                    "Hip abductor strengthening (gluteus medius)",
                    "Core stability exercises",
                    "Gentle stretching for hip flexors",
                    "Aquatic therapy for low-impact exercise"
                ],
                "duration": "6-12 weeks",
                "evidenceLevel": "Moderate evidence"
            },
            {
                "name": "Medications",
                "description": "Pain and inflammation control",
                "details": [
                    "NSAIDs for pain relief",
                    "Paracetamol as first-line option",
                    "Disease-modifying drugs for inflammatory arthritis"
                ],
                "evidenceLevel": "Moderate evidence"
            },
            {
                "name": "Hip Injections",
                "description": "Intra-articular injections for diagnosis and treatment",
                "details": [
                    "Corticosteroid injection: Provides 4-12 weeks relief",
                    "Hyaluronic acid: May provide longer-lasting relief",
                    "PRP: Emerging treatment option",
                    "Diagnostic injection confirms hip as pain source"
                ],
                "evidenceLevel": "Moderate short-term evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Hip Arthroscopy",
                "link": "/treatments/hip-arthroscopy",
                "description": "Keyhole surgery for hip preservation",
                "indications": "FAI, labral tears, early arthritis in young patients",
                "procedure": "Reshaping bone, repairing labrum through small incisions",
                "recovery": "3-6 months",
                "successRate": "Good results in properly selected patients"
            },
            {
                "name": "Core Decompression",
                "description": "For early-stage AVN",
                "indications": "AVN stage 1-2, before collapse",
                "procedure": "Drilling into femoral head to relieve pressure and stimulate healing",
                "recovery": "6-8 weeks protected weight bearing",
                "successRate": "Variable, 50-80% in early stages"
            },
            {
                "name": "Total Hip Replacement",
                "link": "/treatments/total-hip-replacement",
                "description": "Gold standard for end-stage hip disease",
                "indications": "Severe arthritis, advanced AVN, failed conservative treatment",
                "procedure": "Replace femoral head and acetabulum with artificial joint",
                "recovery": "6-12 weeks, walking with support day 1",
                "successRate": "95%+ patient satisfaction, 25+ year implant life"
            },
            {
                "name": "Hip Resurfacing",
                "description": "Bone-conserving alternative for young active patients",
                "indications": "Young males with good bone quality, large femoral head",
                "procedure": "Cap the femoral head instead of replacing it",
                "recovery": "Similar to total hip replacement",
                "successRate": "90% at 10 years in selected patients"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Day 1", "milestone": "Stand and walk with support (hip replacement)"},
            {"phase": "Week 1-2", "milestone": "Walk with walker, basic activities"},
            {"phase": "Week 3-6", "milestone": "Transition to cane, drive automatic car"},
            {"phase": "Month 2-3", "milestone": "Walk independently, return to desk work"},
            {"phase": "Month 3-6", "milestone": "Full recovery, return to recreational activities"}
        ],
        "faqs": [
            {
                "question": "What is the difference between hip arthritis and AVN?",
                "answer": "Hip arthritis is wear of cartilage covering the joint surfaces. AVN (avascular necrosis) is death of bone in the femoral head due to loss of blood supply. Both can lead to joint destruction requiring hip replacement."
            },
            {
                "question": "How long does a hip replacement last?",
                "answer": "Modern hip replacements with ceramic bearings can last 25+ years. Over 95% of hip replacements are still functioning well at 15 years."
            },
            {
                "question": "Can hip arthritis be cured without surgery?",
                "answer": "Hip arthritis cannot be cured, but symptoms can often be managed for years with exercise, weight loss, medications, and injections. Surgery is considered when these measures no longer provide adequate relief."
            }
        ],
        "relatedConditions": ["knee-arthritis", "bursitis"],
        "relatedTreatments": ["total-hip-replacement", "hip-arthroscopy"]
    },
    "frozen-shoulder": {
        "name": "Frozen Shoulder (Adhesive Capsulitis)",
        "category": "Shoulder",
        "icon": "🥶",
        "imageUrl": "https://images.unsplash.com/photo-1631217871099-88310a909a32?w=800&q=80",
        "overview": "Frozen shoulder, also known as adhesive capsulitis, is a condition characterized by stiffness and pain in the shoulder joint. It typically develops gradually over months and can take 1-3 years to resolve. Dr. B Harsha Vardhana Reddy offers both conservative and surgical treatment options at Yashoda Hospital, Hyderabad.",
        "causes": [
            "Diabetes mellitus (5x higher risk)",
            "Thyroid disorders",
            "Prolonged immobilization after surgery or injury",
            "Idiopathic (unknown cause)",
            "More common in women aged 40-60",
            "Associated with Parkinson's disease and cardiac disease"
        ],
        "symptoms": [
            {"name": "Gradual onset of pain", "description": "Deep, aching shoulder pain, worse at night"},
            {"name": "Progressive stiffness", "description": "Difficulty with overhead activities, reaching behind back"},
            {"name": "Three stages", "description": "Freezing (2-9 months), Frozen (4-12 months), Thawing (5-24 months)"},
            {"name": "Sleep disturbance", "description": "Unable to sleep on affected side"},
            {"name": "Limited daily activities", "description": "Difficulty dressing, grooming, reaching"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Loss of both active and passive range of motion"},
            {"name": "X-rays", "description": "Usually normal, rule out arthritis"},
            {"name": "MRI", "description": "May show thickened capsule, rule out rotator cuff tear"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Physical Therapy",
                "description": "Cornerstone of treatment",
                "details": [
                    "Gentle stretching within pain tolerance",
                    "Pendulum exercises",
                    "Wall walks and finger ladder",
                    "External rotation stretches with stick",
                    "Heat before, ice after exercises"
                ],
                "duration": "6-12 months or longer",
                "evidenceLevel": "Strong evidence"
            },
            {
                "name": "Corticosteroid Injections",
                "description": "Reduce inflammation and pain",
                "details": [
                    "Intra-articular injection under ultrasound guidance",
                    "Provides 4-8 weeks of pain relief",
                    "Allows more effective physical therapy",
                    "May be repeated 2-3 times"
                ],
                "evidenceLevel": "Moderate evidence for short-term relief"
            },
            {
                "name": "Hydrodilatation",
                "description": "Stretch the capsule with fluid injection",
                "details": [
                    "Inject saline and steroid under pressure",
                    "Stretches the contracted capsule",
                    "Performed under image guidance",
                    "Combined with physical therapy"
                ],
                "evidenceLevel": "Moderate evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Manipulation Under Anesthesia (MUA)",
                "description": "Forceful stretching while asleep",
                "indications": "Persistent stiffness despite 6+ months of conservative treatment",
                "procedure": "Gentle, controlled movements to break adhesions while under anesthesia",
                "recovery": "Intensive physical therapy immediately after",
                "successRate": "Good results in most patients"
            },
            {
                "name": "Arthroscopic Capsular Release",
                "link": "/treatments/shoulder-arthroscopy",
                "description": "Keyhole surgery to cut the tight capsule",
                "indications": "Failed MUA, diabetic patients, revision cases",
                "procedure": "Cut 360-degree capsule release using arthroscope",
                "recovery": "Intensive PT immediately after, 3-6 months full recovery",
                "successRate": "85-90% significant improvement"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Freezing Stage", "milestone": "Pain predominant, stiffness beginning (2-9 months)"},
            {"phase": "Frozen Stage", "milestone": "Pain decreasing, maximum stiffness (4-12 months)"},
            {"phase": "Thawing Stage", "milestone": "Gradual improvement in motion (5-24 months)"},
            {"phase": "Post-Surgery", "milestone": "Intensive PT for 6-12 weeks, ongoing exercises"}
        ],
        "faqs": [
            {
                "question": "How long does frozen shoulder last?",
                "answer": "Frozen shoulder typically lasts 1-3 years if untreated. With proper treatment including physical therapy and possibly injections, recovery may be faster."
            },
            {
                "question": "Can frozen shoulder come back?",
                "answer": "Recurrence in the same shoulder is rare (about 5%). However, the other shoulder may be affected in 6-17% of patients."
            },
            {
                "question": "Is surgery necessary for frozen shoulder?",
                "answer": "Most cases resolve with conservative treatment. Surgery (manipulation or arthroscopic release) is considered if symptoms persist despite 6+ months of appropriate treatment."
            }
        ],
        "relatedConditions": ["rotator-cuff-tear", "shoulder-dislocation"],
        "relatedTreatments": ["shoulder-arthroscopy", "physical-therapy"]
    },
    "meniscus-tear": {
        "name": "Meniscus Tear",
        "category": "Knee",
        "icon": "🦵",
        "imageUrl": "https://images.pexels.com/photos/339619/pexels-photo-339619.jpeg?auto=compress&cs=tinysrgb&w=800",
        "overview": "The meniscus is a C-shaped piece of cartilage that acts as a shock absorber between the thigh bone and shin bone. Meniscus tears are among the most common knee injuries. Dr. B Harsha Vardhana Reddy specializes in arthroscopic meniscus surgery at Yashoda Hospital, Hyderabad, prioritizing meniscus preservation when possible.",
        "causes": [
            "Sports injuries with twisting motion",
            "Degenerative changes in older adults",
            "Squatting or kneeling activities",
            "Associated with ACL injuries",
            "Occupational stress (repeated squatting)"
        ],
        "symptoms": [
            {"name": "Pain along joint line", "description": "Localized to inner or outer side of knee"},
            {"name": "Swelling", "description": "May develop over 24-48 hours"},
            {"name": "Catching or locking", "description": "Knee gets stuck and cannot fully straighten"},
            {"name": "Popping sensation", "description": "Feeling of something moving in the knee"},
            {"name": "Difficulty squatting", "description": "Pain with deep bending of knee"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "McMurray test, Apley test, joint line tenderness"},
            {"name": "MRI Scan", "description": "Gold standard for meniscus imaging"},
            {"name": "X-rays", "description": "Rule out arthritis and other conditions"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "RICE Protocol",
                "description": "Initial management for acute tears",
                "details": [
                    "Rest and activity modification",
                    "Ice application 20 minutes, 3-4 times daily",
                    "Compression with elastic bandage",
                    "Elevation above heart level"
                ],
                "duration": "First 1-2 weeks",
                "evidenceLevel": "Standard of care"
            },
            {
                "name": "Physical Therapy",
                "description": "For stable, degenerative tears",
                "details": [
                    "Quadriceps and hamstring strengthening",
                    "Range of motion exercises",
                    "Balance and proprioception training",
                    "Activity modification guidance"
                ],
                "duration": "6-12 weeks",
                "evidenceLevel": "Strong evidence for degenerative tears"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Arthroscopic Meniscus Repair",
                "link": "/treatments/knee-arthroscopy",
                "description": "Preserving the meniscus by stitching it",
                "indications": "Peripheral tears in vascular zone, young patients",
                "procedure": "Sutures placed to hold tear together and allow healing",
                "recovery": "6-8 weeks protected, 4-6 months full activity",
                "successRate": "85-90% healing rate in good tears"
            },
            {
                "name": "Partial Meniscectomy",
                "link": "/treatments/knee-arthroscopy",
                "description": "Removing only the damaged portion",
                "indications": "Complex tears, degenerative tears, inner zone tears",
                "procedure": "Trim damaged tissue, preserve as much healthy meniscus as possible",
                "recovery": "2-4 weeks, quick return to activity",
                "successRate": "Good short-term results, may accelerate arthritis long-term"
            },
            {
                "name": "Meniscus Transplant",
                "description": "Replacing meniscus with donor tissue",
                "indications": "Young patients who had total meniscectomy",
                "procedure": "Implant donor meniscus into knee",
                "recovery": "6-9 months",
                "successRate": "75-85% good results at 10 years"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Post-op Day 1", "milestone": "Weight bearing as tolerated (meniscectomy)"},
            {"phase": "Week 1-2", "milestone": "Return to desk work (meniscectomy)"},
            {"phase": "Week 4-6", "milestone": "Return to sports (meniscectomy)"},
            {"phase": "Week 6-8", "milestone": "Protected weight bearing ends (repair)"},
            {"phase": "Month 4-6", "milestone": "Return to sports (repair)"}
        ],
        "faqs": [
            {
                "question": "Can a meniscus tear heal on its own?",
                "answer": "Small tears in the outer edge (vascular zone) may heal with rest. However, most tears, especially in the inner zone, do not heal due to poor blood supply."
            },
            {
                "question": "Is meniscus repair better than removal?",
                "answer": "Yes, preserving the meniscus is preferred when possible. The meniscus protects the knee from arthritis. Repair has longer recovery but better long-term outcomes."
            },
            {
                "question": "How long is recovery after meniscus surgery?",
                "answer": "Partial meniscectomy: 2-4 weeks. Meniscus repair: 4-6 months. Recovery depends on the type of surgery and individual factors."
            }
        ],
        "relatedConditions": ["acl-tear", "knee-arthritis"],
        "relatedTreatments": ["knee-arthroscopy", "acl-reconstruction"]
    }
}

# Comprehensive treatment data with full protocols (from treatmentsDetailed.js)
TREATMENTS_DETAILED_DATA = {
    "total-knee-replacement": {
        "name": "Total Knee Replacement (TKR)",
        "category": "Joint Replacement",
        "icon": "🦵",
        "imageUrl": "https://images.pexels.com/photos/263337/pexels-photo-263337.jpeg?auto=compress&cs=tinysrgb&w=800",
        "heroTitle": "Total Knee Replacement Surgery in Hyderabad",
        "heroSubtitle": "Advanced computer-navigated knee replacement with 95%+ success rate. Get back to pain-free walking within weeks.",
        "overview": "Total Knee Replacement (TKR), also known as Total Knee Arthroplasty, is a surgical procedure that replaces damaged knee joint surfaces with metal and plastic components. Dr. B Harsha Vardhana Reddy performs over 300 knee replacements annually at Yashoda Hospital, Hyderabad, using the latest minimally invasive techniques and computer-assisted navigation for precise implant positioning.",
        "statistics": [
            {"label": "Success Rate", "value": "95%+", "description": "Long-term satisfaction"},
            {"label": "Implant Lifespan", "value": "20-25 yrs", "description": "With modern implants"},
            {"label": "Hospital Stay", "value": "2-3 days", "description": "Quick discharge"},
            {"label": "Walking", "value": "Day 1", "description": "With assistance"}
        ],
        "candidatesFor": [
            "Severe knee arthritis not responding to medications",
            "Significant knee pain affecting daily activities",
            "Difficulty walking, climbing stairs, or getting up from chairs",
            "Knee deformity (bow legs or knock knees)",
            "Failed previous knee surgeries",
            "Age typically 55-80 years (can vary based on condition)"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Pre-operative Planning", "description": "X-rays and CT scans for templating. Blood tests, cardiac clearance, and dental checkup.", "duration": "1-2 weeks before"},
            {"step": 2, "title": "Anesthesia", "description": "Spinal anesthesia (preferred) or general anesthesia. Nerve blocks for post-operative pain control.", "duration": "30-45 minutes"},
            {"step": 3, "title": "Surgical Approach", "description": "Minimally invasive incision (10-12 cm). Medial parapatellar approach preserves muscle.", "duration": "Part of surgery"},
            {"step": 4, "title": "Bone Preparation", "description": "Computer navigation guides precise bone cuts. Damaged cartilage and bone removed.", "duration": "45-60 minutes"},
            {"step": 5, "title": "Implant Placement", "description": "Trial implants tested for fit and alignment. Final cobalt-chrome and polyethylene components cemented.", "duration": "30-45 minutes"},
            {"step": 6, "title": "Closure & Recovery", "description": "Wound closure with absorbable sutures. Drain placement. Compression bandage applied.", "duration": "20-30 minutes"}
        ],
        "benefits": [
            {"title": "Pain Relief", "description": "90-95% of patients report significant pain reduction", "icon": "✓"},
            {"title": "Improved Mobility", "description": "Walk, climb stairs, and resume daily activities", "icon": "✓"},
            {"title": "Better Quality of Life", "description": "Return to golf, swimming, cycling, and travel", "icon": "✓"},
            {"title": "Long-lasting Results", "description": "95% of implants last 15-20 years or more", "icon": "✓"},
            {"title": "Corrects Deformity", "description": "Straightens bow legs or knock knees", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Day 1", "milestone": "Stand and take first steps with walker", "activities": "Ankle pumps, quadriceps sets"},
            {"phase": "Days 2-3", "milestone": "Walk in corridor, climb stairs", "activities": "Discharge home or to rehab"},
            {"phase": "Week 1-2", "milestone": "Walk with walker at home", "activities": "Home exercises, ice therapy"},
            {"phase": "Week 3-4", "milestone": "Transition to cane", "activities": "Increase walking distance"},
            {"phase": "Week 6", "milestone": "Drive (automatic car)", "activities": "Light daily activities"},
            {"phase": "Month 3", "milestone": "Walk independently", "activities": "Return to most activities"},
            {"phase": "Month 6", "milestone": "Full recovery", "activities": "Golf, swimming, travel"}
        ],
        "risks": [
            {"risk": "Infection", "percentage": "1-2%", "prevention": "Antibiotics, sterile technique"},
            {"risk": "Blood clots (DVT)", "percentage": "2-3%", "prevention": "Blood thinners, compression stockings"},
            {"risk": "Stiffness", "percentage": "5-10%", "prevention": "Early physiotherapy"},
            {"risk": "Implant loosening", "percentage": "<1% at 10 years", "prevention": "Proper cementing technique"}
        ],
        "preOpPreparation": [
            "Stop smoking 4-6 weeks before surgery",
            "Lose weight if BMI > 35",
            "Control diabetes (HbA1c < 8%)",
            "Treat any dental infections",
            "Arrange home help for 2-3 weeks",
            "Prepare home: remove rugs, install grab bars",
            "Stop blood thinners as advised"
        ],
        "postOpCare": [
            "Wound care: Keep dry for 2 weeks, watch for redness",
            "Ice therapy: 20 minutes, 3-4 times daily",
            "Exercises: As prescribed by physiotherapist",
            "Medications: Pain killers, blood thinners, antibiotics",
            "Follow-up: 2 weeks, 6 weeks, 3 months, 1 year",
            "Activity: Avoid kneeling, squatting, running"
        ],
        "faqs": [
            {"question": "How long does total knee replacement surgery take?", "answer": "The surgery typically takes 1.5 to 2 hours. With anesthesia preparation and recovery room time, expect to be in the operation theater area for about 3-4 hours total."},
            {"question": "What is the cost of knee replacement surgery in Hyderabad?", "answer": "The cost ranges from ₹2.5 to 4.5 lakhs depending on the implant type (standard vs premium), hospital room category, and any additional procedures needed."},
            {"question": "Can both knees be replaced at the same time?", "answer": "Yes, bilateral (both knees) replacement can be done in a single surgery for suitable candidates. This reduces overall recovery time and cost."},
            {"question": "How long will my knee replacement last?", "answer": "Modern knee implants typically last 20-25 years. With proper care and avoiding high-impact activities, many patients never need revision surgery."},
            {"question": "When can I drive after knee replacement?", "answer": "Most patients can drive an automatic car 4-6 weeks after surgery (left knee) or 6-8 weeks (right knee). You should be off narcotic pain medications."}
        ],
        "relatedConditions": ["knee-arthritis", "meniscus-tear", "acl-tear"],
        "relatedTreatments": ["knee-arthroscopy", "acl-reconstruction"]
    },
    "total-hip-replacement": {
        "name": "Total Hip Replacement (THR)",
        "category": "Joint Replacement",
        "icon": "🦴",
        "imageUrl": "https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=800",
        "heroTitle": "Total Hip Replacement Surgery in Hyderabad",
        "heroSubtitle": "Advanced anterior approach hip replacement for faster recovery and better outcomes.",
        "overview": "Total Hip Replacement (THR) is a surgical procedure where the damaged hip joint is replaced with artificial components. Dr. B Harsha Vardhana Reddy specializes in both anterior and posterior approach hip replacements, offering personalized surgical plans based on patient anatomy and activity goals. Hip replacement is one of the most successful orthopedic surgeries, with over 95% of patients experiencing dramatic pain relief.",
        "statistics": [
            {"label": "Success Rate", "value": "97%", "description": "Patient satisfaction"},
            {"label": "Implant Life", "value": "25+ yrs", "description": "With ceramic bearings"},
            {"label": "Hospital Stay", "value": "2-3 days", "description": "Early discharge"},
            {"label": "Walking", "value": "Same day", "description": "With rapid recovery protocol"}
        ],
        "candidatesFor": [
            "Hip arthritis (osteoarthritis or rheumatoid)",
            "Avascular necrosis (AVN) of femoral head",
            "Hip fractures in elderly patients",
            "Failed previous hip surgeries",
            "Developmental dysplasia of hip",
            "Post-traumatic arthritis"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Pre-operative Assessment", "description": "Hip X-rays, blood tests, cardiac evaluation. Template for implant sizing.", "duration": "1-2 weeks before"},
            {"step": 2, "title": "Anesthesia", "description": "Spinal or general anesthesia based on patient factors.", "duration": "30 minutes"},
            {"step": 3, "title": "Surgical Approach", "description": "Anterior (front) or posterior (back) approach based on patient anatomy.", "duration": "Part of surgery"},
            {"step": 4, "title": "Femoral Head Removal", "description": "Dislocate hip and remove damaged femoral head.", "duration": "20-30 minutes"},
            {"step": 5, "title": "Socket Preparation", "description": "Ream acetabulum and place cup with liner.", "duration": "30 minutes"},
            {"step": 6, "title": "Stem Insertion", "description": "Prepare femur and insert stem with ceramic head.", "duration": "30 minutes"}
        ],
        "benefits": [
            {"title": "Complete Pain Relief", "description": "95% patients pain-free", "icon": "✓"},
            {"title": "Restored Mobility", "description": "Walk, climb stairs, sit cross-legged", "icon": "✓"},
            {"title": "Equal Leg Length", "description": "Corrects limb length discrepancy", "icon": "✓"},
            {"title": "Durable Implants", "description": "Ceramic bearings last 25+ years", "icon": "✓"},
            {"title": "Anterior Approach", "description": "Faster recovery, lower dislocation risk", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Day 0", "milestone": "Stand and walk with support", "activities": "Rapid recovery protocol"},
            {"phase": "Days 2-3", "milestone": "Discharge home", "activities": "Walk with walker"},
            {"phase": "Week 2", "milestone": "Climb stairs", "activities": "Transition to cane"},
            {"phase": "Week 4", "milestone": "Walk without support", "activities": "Drive automatic car"},
            {"phase": "Week 6", "milestone": "Return to desk work", "activities": "Light activities"},
            {"phase": "Month 3", "milestone": "Full recovery", "activities": "Sports, travel"}
        ],
        "risks": [
            {"risk": "Dislocation", "percentage": "1-2%", "prevention": "Hip precautions, anterior approach"},
            {"risk": "Infection", "percentage": "1%", "prevention": "Antibiotics, laminar airflow OR"},
            {"risk": "Leg length inequality", "percentage": "2-3%", "prevention": "Intraoperative templating"},
            {"risk": "DVT/PE", "percentage": "1-2%", "prevention": "Blood thinners, early mobilization"}
        ],
        "preOpPreparation": [
            "Stop smoking 4-6 weeks before",
            "Optimize diabetes and blood pressure",
            "Dental clearance to prevent infection",
            "Lose weight if significantly overweight",
            "Arrange raised toilet seat and grab bars",
            "Plan for 2-3 weeks of home help"
        ],
        "postOpCare": [
            "Hip precautions for 6 weeks (posterior approach)",
            "Anterior approach: fewer restrictions",
            "Blood thinners for 4-6 weeks",
            "Physiotherapy exercises daily",
            "Avoid low chairs and crossing legs initially",
            "Sleep on back or non-operated side"
        ],
        "faqs": [
            {"question": "What is the difference between anterior and posterior hip replacement?", "answer": "Anterior approach goes through the front of hip between muscles (no muscle cutting), allowing faster recovery and lower dislocation risk. Posterior approach is more traditional."},
            {"question": "How much does hip replacement cost in Hyderabad?", "answer": "Hip replacement costs range from ₹3 to 5 lakhs depending on the type of implant, hospital room, and surgeon fees."},
            {"question": "How long does hip replacement surgery take?", "answer": "The surgery takes about 1.5-2 hours. Total time in the operating theater including anesthesia is about 3 hours."},
            {"question": "When can I walk after hip replacement?", "answer": "With modern rapid recovery protocols, most patients stand and walk with support on the same day of surgery."}
        ],
        "relatedConditions": ["hip-arthritis", "avascular-necrosis"],
        "relatedTreatments": ["hip-arthroscopy", "core-decompression"]
    },
    "acl-reconstruction": {
        "name": "ACL Reconstruction",
        "category": "Sports Surgery",
        "icon": "⚽",
        "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "heroTitle": "ACL Reconstruction Surgery in Hyderabad",
        "heroSubtitle": "Get back to sports with expert ACL reconstruction. 90%+ return to activity rate.",
        "overview": "ACL reconstruction is a surgical procedure to replace a torn anterior cruciate ligament (ACL). Dr. B Harsha Vardhana Reddy performs anatomic ACL reconstruction using arthroscopic techniques at Yashoda Hospital, Hyderabad. The surgery uses a tissue graft to reconstruct the torn ligament, restoring knee stability.",
        "statistics": [
            {"label": "Success Rate", "value": "90-95%", "description": "Return to sports"},
            {"label": "Surgery Time", "value": "1-1.5 hrs", "description": "Arthroscopic"},
            {"label": "Hospital Stay", "value": "1-2 days", "description": "Outpatient possible"},
            {"label": "Return to Sports", "value": "6-9 months", "description": "With proper rehab"}
        ],
        "candidatesFor": [
            "Active individuals with ACL tear",
            "Athletes wanting to return to pivoting sports",
            "Patients with knee instability episodes",
            "Combined ligament injuries",
            "Young patients with ACL tear"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Pre-operative Rehabilitation", "description": "Restore motion and strength before surgery. Reduce swelling.", "duration": "2-4 weeks before"},
            {"step": 2, "title": "Graft Harvest", "description": "Hamstring tendon, patellar tendon, or quadriceps tendon graft.", "duration": "15-20 minutes"},
            {"step": 3, "title": "Arthroscopic Inspection", "description": "Assess ACL tear and associated injuries (meniscus, cartilage).", "duration": "10 minutes"},
            {"step": 4, "title": "Tunnel Creation", "description": "Precise bone tunnels drilled in femur and tibia.", "duration": "20-30 minutes"},
            {"step": 5, "title": "Graft Passage", "description": "Thread graft through tunnels, tension appropriately.", "duration": "15-20 minutes"},
            {"step": 6, "title": "Graft Fixation", "description": "Secure graft with interference screws or suspensory devices.", "duration": "15 minutes"}
        ],
        "benefits": [
            {"title": "Restored Stability", "description": "Eliminate knee giving way episodes", "icon": "✓"},
            {"title": "Return to Sports", "description": "90%+ return to previous activity level", "icon": "✓"},
            {"title": "Prevent Further Damage", "description": "Protect meniscus and cartilage", "icon": "✓"},
            {"title": "Minimally Invasive", "description": "Small incisions, faster recovery", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Control pain and swelling, restore extension", "activities": "Crutches, brace locked in extension"},
            {"phase": "Week 2-6", "milestone": "Regain range of motion, begin strengthening", "activities": "Stationary bike, pool walking"},
            {"phase": "Month 2-3", "milestone": "Full ROM, progressive strengthening", "activities": "Leg press, squats, balance training"},
            {"phase": "Month 3-6", "milestone": "Running progression, agility training", "activities": "Sport-specific drills"},
            {"phase": "Month 6-9", "milestone": "Return to sport testing", "activities": "Full return if tests passed"}
        ],
        "risks": [
            {"risk": "Graft failure", "percentage": "5-10%", "prevention": "Proper graft selection, technique"},
            {"risk": "Stiffness", "percentage": "5-10%", "prevention": "Early range of motion"},
            {"risk": "Infection", "percentage": "<1%", "prevention": "Sterile technique, antibiotics"}
        ],
        "preOpPreparation": [
            "Pre-habilitation exercises to restore motion",
            "Reduce swelling before surgery",
            "Strengthen quadriceps and hamstrings",
            "Arrange for 2-4 weeks of limited activity",
            "Obtain crutches and knee brace"
        ],
        "postOpCare": [
            "Use crutches for 2-4 weeks",
            "Wear brace as directed",
            "Ice 20 minutes, 4-5 times daily",
            "Follow physical therapy protocol strictly",
            "Avoid pivoting activities until cleared"
        ],
        "faqs": [
            {"question": "Which graft is best for ACL reconstruction?", "answer": "The best graft depends on individual factors. Patellar tendon and hamstring are most common. Your surgeon will recommend based on your activity level and anatomy."},
            {"question": "Can I play sports after ACL reconstruction?", "answer": "Yes, 90%+ of patients return to their previous sport level after proper rehabilitation. Return to sports typically occurs 6-9 months after surgery."},
            {"question": "Is ACL surgery painful?", "answer": "Pain is well-controlled with nerve blocks and medications. Most patients rate pain as moderate in the first few days, improving significantly by week 2."},
            {"question": "What if I don't have ACL surgery?", "answer": "Without surgery, the knee may remain unstable, especially with pivoting activities. This can lead to further meniscus and cartilage damage over time."}
        ],
        "relatedConditions": ["acl-tear", "meniscus-tear", "pcl-injury"],
        "relatedTreatments": ["knee-arthroscopy", "physical-therapy"]
    },
    "knee-arthroscopy": {
        "name": "Knee Arthroscopy",
        "category": "Minimally Invasive",
        "icon": "🔬",
        "imageUrl": "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
        "heroTitle": "Knee Arthroscopy in Hyderabad",
        "heroSubtitle": "Minimally invasive knee surgery for faster recovery and better outcomes.",
        "overview": "Knee arthroscopy is a minimally invasive surgical procedure that uses a small camera (arthroscope) to diagnose and treat knee problems. Dr. B Harsha Vardhana Reddy performs advanced arthroscopic procedures at Yashoda Hospital, Hyderabad, including meniscus repair, ACL reconstruction, and cartilage restoration.",
        "statistics": [
            {"label": "Incisions", "value": "2-3", "description": "Small portals (5mm)"},
            {"label": "Surgery Time", "value": "30-90 min", "description": "Depending on procedure"},
            {"label": "Hospital Stay", "value": "Day care", "description": "Same-day discharge"},
            {"label": "Return to Work", "value": "1-2 weeks", "description": "Desk job"}
        ],
        "candidatesFor": [
            "Meniscus tears",
            "ACL and ligament injuries",
            "Loose bodies in the knee",
            "Cartilage damage",
            "Synovitis and inflammation",
            "Diagnostic uncertainty"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Anesthesia", "description": "Spinal or general anesthesia based on procedure.", "duration": "15-20 minutes"},
            {"step": 2, "title": "Portal Creation", "description": "2-3 small incisions (5mm) around knee.", "duration": "5 minutes"},
            {"step": 3, "title": "Joint Inspection", "description": "Camera inserted, systematic evaluation of all compartments.", "duration": "10 minutes"},
            {"step": 4, "title": "Treatment", "description": "Meniscus repair/trim, ACL reconstruction, loose body removal.", "duration": "20-60 minutes"},
            {"step": 5, "title": "Closure", "description": "Portal closure with sutures or steri-strips.", "duration": "5 minutes"}
        ],
        "benefits": [
            {"title": "Minimal Scarring", "description": "Tiny incisions heal quickly", "icon": "✓"},
            {"title": "Fast Recovery", "description": "Return to normal activities sooner", "icon": "✓"},
            {"title": "Less Pain", "description": "Compared to open surgery", "icon": "✓"},
            {"title": "Outpatient Procedure", "description": "Go home same day", "icon": "✓"},
            {"title": "Accurate Diagnosis", "description": "Direct visualization of joint", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Day 0", "milestone": "Go home same day", "activities": "Rest, ice, elevation"},
            {"phase": "Days 1-3", "milestone": "Walk with support", "activities": "Gentle exercises"},
            {"phase": "Week 1-2", "milestone": "Return to desk work", "activities": "Physical therapy starts"},
            {"phase": "Week 4-6", "milestone": "Return to driving", "activities": "Progressive strengthening"},
            {"phase": "Month 2-3", "milestone": "Return to sports (meniscectomy)", "activities": "Full activity"}
        ],
        "risks": [
            {"risk": "Infection", "percentage": "<0.5%", "prevention": "Sterile technique"},
            {"risk": "Blood clots", "percentage": "1%", "prevention": "Early mobilization"},
            {"risk": "Stiffness", "percentage": "2-5%", "prevention": "Early range of motion"}
        ],
        "faqs": [
            {"question": "Is knee arthroscopy painful?", "answer": "Discomfort is usually mild to moderate. Pain is well-controlled with medications. Most patients report significant improvement within a few days."},
            {"question": "How long does knee arthroscopy take?", "answer": "Simple procedures like meniscus trimming take 30-45 minutes. Complex procedures like ACL reconstruction take 60-90 minutes."},
            {"question": "When can I walk after knee arthroscopy?", "answer": "Most patients walk with support immediately after simple procedures. Weight bearing depends on the specific surgery performed."},
            {"question": "When can I return to work?", "answer": "Desk jobs: 1-2 weeks. Physical jobs: 4-6 weeks. Sports: 6 weeks (meniscectomy) to 6-9 months (ACL reconstruction)."}
        ],
        "relatedConditions": ["meniscus-tear", "acl-tear", "knee-arthritis"],
        "relatedTreatments": ["acl-reconstruction", "meniscus-repair"]
    },
    "shoulder-arthroscopy": {
        "name": "Shoulder Arthroscopy",
        "category": "Minimally Invasive",
        "icon": "💪",
        "imageUrl": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
        "heroTitle": "Shoulder Arthroscopy in Hyderabad",
        "heroSubtitle": "Advanced minimally invasive shoulder surgery for rotator cuff, instability, and more.",
        "overview": "Shoulder arthroscopy is a minimally invasive surgical technique that allows Dr. B Harsha Vardhana Reddy to diagnose and treat shoulder problems through small incisions. Common procedures include rotator cuff repair, labral repair, and treatment of frozen shoulder.",
        "statistics": [
            {"label": "Incisions", "value": "3-4", "description": "Small portals"},
            {"label": "Surgery Time", "value": "1-2 hrs", "description": "Depending on procedure"},
            {"label": "Hospital Stay", "value": "1 day", "description": "Overnight stay"},
            {"label": "Return to Work", "value": "2-6 weeks", "description": "Desk job"}
        ],
        "candidatesFor": [
            "Rotator cuff tears",
            "Shoulder instability/dislocations",
            "Labral tears (SLAP, Bankart)",
            "Frozen shoulder",
            "Impingement syndrome",
            "AC joint arthritis"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Anesthesia", "description": "General anesthesia with nerve block for pain control.", "duration": "30 minutes"},
            {"step": 2, "title": "Positioning", "description": "Beach chair or lateral decubitus position.", "duration": "10 minutes"},
            {"step": 3, "title": "Portal Placement", "description": "3-4 small incisions for camera and instruments.", "duration": "10 minutes"},
            {"step": 4, "title": "Joint Inspection", "description": "Evaluate rotator cuff, labrum, biceps, cartilage.", "duration": "10-15 minutes"},
            {"step": 5, "title": "Repair/Treatment", "description": "Suture anchors for repair, debridement, capsular release.", "duration": "45-90 minutes"}
        ],
        "benefits": [
            {"title": "Smaller Incisions", "description": "Better cosmesis, less scarring", "icon": "✓"},
            {"title": "Less Muscle Damage", "description": "Preserves surrounding tissue", "icon": "✓"},
            {"title": "Better Visualization", "description": "See entire joint clearly", "icon": "✓"},
            {"title": "Faster Recovery", "description": "Compared to open surgery", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Sling wear, pain control", "activities": "Passive motion, pendulums"},
            {"phase": "Week 2-6", "milestone": "Begin active motion", "activities": "Sling weaning, PT starts"},
            {"phase": "Month 2-3", "milestone": "Strengthening begins", "activities": "Resistance exercises"},
            {"phase": "Month 3-6", "milestone": "Return to activities", "activities": "Progressive sports"},
            {"phase": "Month 6-9", "milestone": "Full recovery", "activities": "Unrestricted activity"}
        ],
        "risks": [
            {"risk": "Stiffness", "percentage": "5-10%", "prevention": "Early controlled motion"},
            {"risk": "Re-tear (rotator cuff)", "percentage": "10-20%", "prevention": "Protected healing"},
            {"risk": "Infection", "percentage": "<1%", "prevention": "Sterile technique"}
        ],
        "faqs": [
            {"question": "How long do I wear a sling after shoulder arthroscopy?", "answer": "Sling wear varies: 2-4 weeks for simple procedures, 4-6 weeks for rotator cuff repair. Your surgeon will provide specific guidelines."},
            {"question": "When can I drive after shoulder surgery?", "answer": "Usually 4-6 weeks after surgery, once you can safely control the steering wheel. Earlier for left shoulder if you drive automatic."},
            {"question": "Will I regain full shoulder strength?", "answer": "Most patients regain 90-95% of strength after proper rehabilitation. Full recovery of strength takes 6-12 months."}
        ],
        "relatedConditions": ["rotator-cuff-tear", "frozen-shoulder", "shoulder-dislocation"],
        "relatedTreatments": ["rotator-cuff-repair", "bankart-repair"]
    }
}

@api_router.post("/admin/cms/enrich-detailed-content")
async def enrich_cms_with_detailed_content():
    """Enrich existing CMS pages with detailed treatment protocols and content"""
    try:
        updated_count = 0
        skipped_count = 0
        results = []
        
        # Update conditions with detailed data
        for slug, detailed_data in CONDITIONS_DETAILED_DATA.items():
            existing = await db.cms_pages.find_one({"slug": slug, "type": "condition"})
            
            if existing:
                # Merge detailed content into existing CMS content
                updated_content = existing.get("content", {})
                updated_content.update({
                    "name": detailed_data.get("name", updated_content.get("name")),
                    "category": detailed_data.get("category", updated_content.get("category")),
                    "icon": detailed_data.get("icon", updated_content.get("icon")),
                    "imageUrl": detailed_data.get("imageUrl"),
                    "overview": detailed_data.get("overview"),
                    "causes": detailed_data.get("causes", []),
                    "symptoms": detailed_data.get("symptoms", []),
                    "diagnosis": detailed_data.get("diagnosis", []),
                    "nonSurgicalTreatments": detailed_data.get("nonSurgicalTreatments", []),
                    "surgicalTreatments": detailed_data.get("surgicalTreatments", []),
                    "recoveryTimeline": detailed_data.get("recoveryTimeline", []),
                    "faqs": detailed_data.get("faqs", []),
                    "relatedConditions": detailed_data.get("relatedConditions", []),
                    "relatedTreatments": detailed_data.get("relatedTreatments", [])
                })
                
                await db.cms_pages.update_one(
                    {"_id": existing["_id"]},
                    {"$set": {
                        "content": updated_content,
                        "updated_at": datetime.now(timezone.utc).isoformat()
                    }}
                )
                results.append({"slug": slug, "type": "condition", "status": "enriched"})
                updated_count += 1
            else:
                # Create new page if doesn't exist
                page_doc = {
                    "id": str(uuid.uuid4()),
                    "slug": slug,
                    "type": "condition",
                    "title": f"{detailed_data['name']} Treatment in Hyderabad",
                    "meta_title": f"{detailed_data['name']} Treatment Hyderabad | Dr. Harsha Reddy",
                    "meta_description": f"Expert {detailed_data['name'].lower()} treatment in Hyderabad by Dr. B Harsha Vardhana Reddy at Yashoda Hospital.",
                    "keywords": [f"{detailed_data['name'].lower()} treatment", f"{detailed_data['name'].lower()} hyderabad"],
                    "content": detailed_data,
                    "status": "published",
                    "created_at": datetime.now(timezone.utc).isoformat(),
                    "updated_at": datetime.now(timezone.utc).isoformat(),
                    "published_at": datetime.now(timezone.utc).isoformat()
                }
                await db.cms_pages.insert_one(page_doc)
                results.append({"slug": slug, "type": "condition", "status": "created"})
                updated_count += 1
        
        # Update treatments with detailed data
        for slug, detailed_data in TREATMENTS_DETAILED_DATA.items():
            existing = await db.cms_pages.find_one({"slug": slug, "type": "treatment"})
            
            if existing:
                # Merge detailed content into existing CMS content
                updated_content = existing.get("content", {})
                updated_content.update({
                    "name": detailed_data.get("name", updated_content.get("name")),
                    "category": detailed_data.get("category", updated_content.get("category")),
                    "icon": detailed_data.get("icon", updated_content.get("icon")),
                    "imageUrl": detailed_data.get("imageUrl"),
                    "heroTitle": detailed_data.get("heroTitle"),
                    "heroSubtitle": detailed_data.get("heroSubtitle"),
                    "overview": detailed_data.get("overview"),
                    "statistics": detailed_data.get("statistics", []),
                    "candidatesFor": detailed_data.get("candidatesFor", []),
                    "procedureSteps": detailed_data.get("procedureSteps", []),
                    "benefits": detailed_data.get("benefits", []),
                    "recoveryTimeline": detailed_data.get("recoveryTimeline", []),
                    "risks": detailed_data.get("risks", []),
                    "preOpPreparation": detailed_data.get("preOpPreparation", []),
                    "postOpCare": detailed_data.get("postOpCare", []),
                    "faqs": detailed_data.get("faqs", []),
                    "relatedConditions": detailed_data.get("relatedConditions", []),
                    "relatedTreatments": detailed_data.get("relatedTreatments", [])
                })
                
                await db.cms_pages.update_one(
                    {"_id": existing["_id"]},
                    {"$set": {
                        "content": updated_content,
                        "updated_at": datetime.now(timezone.utc).isoformat()
                    }}
                )
                results.append({"slug": slug, "type": "treatment", "status": "enriched"})
                updated_count += 1
            else:
                # Create new page if doesn't exist
                page_doc = {
                    "id": str(uuid.uuid4()),
                    "slug": slug,
                    "type": "treatment",
                    "title": f"{detailed_data['name']} in Hyderabad",
                    "meta_title": f"{detailed_data['name']} Hyderabad | Dr. Harsha Reddy",
                    "meta_description": f"Expert {detailed_data['name'].lower()} in Hyderabad by Dr. B Harsha Vardhana Reddy at Yashoda Hospital.",
                    "keywords": [f"{detailed_data['name'].lower()}", f"{detailed_data['name'].lower()} hyderabad"],
                    "content": detailed_data,
                    "status": "published",
                    "created_at": datetime.now(timezone.utc).isoformat(),
                    "updated_at": datetime.now(timezone.utc).isoformat(),
                    "published_at": datetime.now(timezone.utc).isoformat()
                }
                await db.cms_pages.insert_one(page_doc)
                results.append({"slug": slug, "type": "treatment", "status": "created"})
                updated_count += 1
        
        return {
            "success": True,
            "message": f"CMS enrichment complete. Updated/Created: {updated_count}",
            "updated": updated_count,
            "skipped": skipped_count,
            "details": results
        }
    except Exception as e:
        logger.error(f"Error enriching CMS content: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to enrich content: {str(e)}")


# ============ AI Chat Agent ============

# Try to import emergentintegrations for AI chat
try:
    from emergentintegrations.llm.chat import LlmChat, UserMessage
    AI_CHAT_AVAILABLE = True
except ImportError:
    AI_CHAT_AVAILABLE = False
    print("Warning: emergentintegrations not installed - AI chat will be unavailable")

# AI Chat configuration
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

# Store for active chat sessions (in production, use Redis or similar)
chat_sessions = {}

# System prompt for the AI assistant
AI_SYSTEM_PROMPT = """You are Dr. Harsha's AI Assistant at CareConnect Orthopedic Center. You help patients with:

**About Dr. B Harsha Vardhana Reddy:**
- Senior Consultant Orthopedic Surgeon at Apollo Hospitals, Financial District, Hyderabad
- DNB Orthopedics with Fellowship in Joint Replacement Surgery
- MBA in Hospital Administration
- 15+ years of experience, 8,000+ successful surgeries
- Specializes in: Knee & Hip Replacement, Sports Medicine, Arthroscopy, Trauma Surgery

**Hospital Location:**
Apollo Hospitals, Financial District, Nanakramguda, Serilingampally, Hyderabad, Telangana, India
Contact: +91 99599 64567
Consultation Hours: Monday to Saturday, 9:00 AM - 5:00 PM

**Your Responsibilities:**
1. Answer orthopedic questions (knee pain, hip problems, sports injuries, arthritis, fractures)
2. Explain treatments (knee replacement, hip replacement, arthroscopy, ligament reconstruction)
3. Help with appointment booking inquiries
4. Provide general guidance on recovery, exercises, and post-surgery care

**Guidelines:**
- Be warm, professional, and empathetic
- For specific medical advice, always recommend consulting Dr. Harsha in person
- Provide accurate information about procedures and recovery times
- If asked about costs, give general ranges and suggest contacting the hospital for exact quotes
- Encourage booking appointments for detailed consultations
- Keep responses concise but helpful (2-3 paragraphs max)
- Use simple language patients can understand

**Appointment Booking:**
To book an appointment, patients can:
1. Book Online: https://www.apollo247.com/doctors/dr-b-harsha-vardhana-reddy-51807eec-1507-467c-91fb-4c6b2cb599ff
2. Call: +91 99599 64567
3. WhatsApp: +91 99599 64567"""

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(chat_message: ChatMessage):
    """Chat with AI assistant"""
    if not AI_CHAT_AVAILABLE:
        raise HTTPException(status_code=503, detail="AI chat service unavailable")
    
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=503, detail="AI chat not configured")
    
    try:
        # Generate or use existing session ID
        session_id = chat_message.session_id or str(uuid.uuid4())
        
        # Get or create chat instance for this session
        if session_id not in chat_sessions:
            chat_sessions[session_id] = LlmChat(
                api_key=EMERGENT_LLM_KEY,
                session_id=session_id,
                system_message=AI_SYSTEM_PROMPT
            ).with_model("openai", "gpt-4o")
        
        chat = chat_sessions[session_id]
        
        # Create user message and get response
        user_msg = UserMessage(text=chat_message.message)
        response = await chat.send_message(user_msg)
        
        # Store chat in database for history
        chat_doc = {
            "session_id": session_id,
            "user_message": chat_message.message,
            "ai_response": response,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await db.chat_history.insert_one(chat_doc)
        
        return ChatResponse(response=response, session_id=session_id)
    
    except Exception as e:
        logger.error(f"AI chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

@api_router.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    try:
        history = await db.chat_history.find(
            {"session_id": session_id},
            {"_id": 0}
        ).sort("timestamp", 1).to_list(100)
        return {"history": history}
    except Exception as e:
        logger.error(f"Error fetching chat history: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch chat history")


# ============ Analytics Endpoints ============

class PageViewCreate(BaseModel):
    page_path: str
    page_title: Optional[str] = None
    referrer: Optional[str] = None
    user_agent: Optional[str] = None
    session_id: Optional[str] = None

class PageView(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    page_path: str
    page_title: Optional[str] = None
    referrer: Optional[str] = None
    user_agent: Optional[str] = None
    session_id: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

@api_router.post("/analytics/pageview")
async def track_pageview(pageview_data: PageViewCreate):
    """Track a page view"""
    try:
        pageview = PageView(**pageview_data.model_dump())
        doc = pageview.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        await db.page_views.insert_one(doc)
        return {"success": True, "id": pageview.id}
    except Exception as e:
        logger.error(f"Error tracking pageview: {str(e)}")
        # Return success anyway to not block frontend
        return {"success": False}

@api_router.get("/admin/analytics")
async def get_analytics():
    """Get analytics data for admin dashboard"""
    try:
        from datetime import timedelta
        
        now = datetime.now(timezone.utc)
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        week_ago = now - timedelta(days=7)
        month_ago = now - timedelta(days=30)
        
        # Total page views
        total_views = await db.page_views.count_documents({})
        
        # Today's views
        today_views = await db.page_views.count_documents({
            "timestamp": {"$gte": today_start.isoformat()}
        })
        
        # This week's views
        week_views = await db.page_views.count_documents({
            "timestamp": {"$gte": week_ago.isoformat()}
        })
        
        # This month's views
        month_views = await db.page_views.count_documents({
            "timestamp": {"$gte": month_ago.isoformat()}
        })
        
        # Unique sessions this month
        unique_sessions_pipeline = [
            {"$match": {"timestamp": {"$gte": month_ago.isoformat()}}},
            {"$group": {"_id": "$session_id"}},
            {"$count": "count"}
        ]
        unique_sessions_result = await db.page_views.aggregate(unique_sessions_pipeline).to_list(1)
        unique_sessions = unique_sessions_result[0]["count"] if unique_sessions_result else 0
        
        # Top pages (last 30 days)
        top_pages_pipeline = [
            {"$match": {"timestamp": {"$gte": month_ago.isoformat()}}},
            {"$group": {"_id": "$page_path", "views": {"$sum": 1}}},
            {"$sort": {"views": -1}},
            {"$limit": 10}
        ]
        top_pages = await db.page_views.aggregate(top_pages_pipeline).to_list(10)
        
        # Daily views for last 7 days - optimized with single aggregation query
        daily_views = []
        for i in range(6, -1, -1):  # 6 to 0 for oldest first
            day = now - timedelta(days=i)
            day_start = day.replace(hour=0, minute=0, second=0, microsecond=0)
            daily_views.append({
                "date": day_start.strftime("%b %d"),
                "day_start": day_start.isoformat(),
                "day_end": (day_start + timedelta(days=1)).isoformat(),
                "views": 0
            })
        
        # Get counts in single query
        if daily_views:
            week_start = (now - timedelta(days=6)).replace(hour=0, minute=0, second=0, microsecond=0)
            daily_counts_pipeline = [
                {"$match": {"timestamp": {"$gte": week_start.isoformat()}}},
                {"$group": {
                    "_id": {"$substr": ["$timestamp", 0, 10]},  # Group by date part
                    "count": {"$sum": 1}
                }}
            ]
            daily_counts = await db.page_views.aggregate(daily_counts_pipeline).to_list(10)
            
            # Map counts to daily_views
            count_map = {d["_id"]: d["count"] for d in daily_counts}
            for dv in daily_views:
                date_key = dv["day_start"][:10]
                dv["views"] = count_map.get(date_key, 0)
        
        # Clean up internal fields
        daily_views = [{"date": d["date"], "views": d["views"]} for d in daily_views]
        
        # Top referrers
        referrers_pipeline = [
            {"$match": {"timestamp": {"$gte": month_ago.isoformat()}, "referrer": {"$nin": [None, ""], "$exists": True}}},
            {"$group": {"_id": "$referrer", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 5}
        ]
        top_referrers = await db.page_views.aggregate(referrers_pipeline).to_list(5)
        
        # Chat interactions
        total_chats = await db.chat_history.count_documents({})
        recent_chats = await db.chat_history.count_documents({
            "timestamp": {"$gte": week_ago.isoformat()}
        })
        
        # Appointments analytics
        total_appointments = await db.appointments.count_documents({})
        pending_appointments = await db.appointments.count_documents({"status": "pending"})
        confirmed_appointments = await db.appointments.count_documents({"status": "confirmed"})
        completed_appointments = await db.appointments.count_documents({"status": "completed"})
        recent_appointments = await db.appointments.count_documents({
            "created_at": {"$gte": week_ago.isoformat()}
        })
        
        # Content analytics - Popular conditions and treatments
        condition_views_pipeline = [
            {"$match": {"timestamp": {"$gte": month_ago.isoformat()}, "page_path": {"$regex": "^/conditions/"}}},
            {"$group": {"_id": "$page_path", "views": {"$sum": 1}}},
            {"$sort": {"views": -1}},
            {"$limit": 5}
        ]
        top_conditions = await db.page_views.aggregate(condition_views_pipeline).to_list(5)
        
        treatment_views_pipeline = [
            {"$match": {"timestamp": {"$gte": month_ago.isoformat()}, "page_path": {"$regex": "^/treatments/"}}},
            {"$group": {"_id": "$page_path", "views": {"$sum": 1}}},
            {"$sort": {"views": -1}},
            {"$limit": 5}
        ]
        top_treatments = await db.page_views.aggregate(treatment_views_pipeline).to_list(5)
        
        # CMS Stats
        total_cms_pages = await db.cms_pages.count_documents({})
        published_pages = await db.cms_pages.count_documents({"status": "published"})
        draft_pages = await db.cms_pages.count_documents({"status": "draft"})
        
        # Blog stats
        total_blogs = await db.blogs.count_documents({})
        
        # SEO suggestions stats
        total_seo_suggestions = await db.auto_seo_suggestions.count_documents({})
        approved_suggestions = await db.auto_seo_suggestions.count_documents({"status": "approved"})
        
        # Calculate conversion rate (appointments / unique visitors)
        conversion_rate = round((total_appointments / max(unique_sessions, 1)) * 100, 2)
        
        # Calculate average views per day this week
        avg_daily_views = round(week_views / 7, 1) if week_views else 0
        
        return {
            "overview": {
                "total_views": total_views,
                "today_views": today_views,
                "week_views": week_views,
                "month_views": month_views,
                "unique_visitors": unique_sessions,
                "avg_daily_views": avg_daily_views
            },
            "top_pages": [{"page": p["_id"], "views": p["views"]} for p in top_pages],
            "daily_views": daily_views,
            "top_referrers": [{"referrer": r["_id"], "count": r["count"]} for r in top_referrers],
            "engagement": {
                "total_chats": total_chats,
                "recent_chats": recent_chats,
                "conversion_rate": conversion_rate
            },
            "appointments": {
                "total": total_appointments,
                "pending": pending_appointments,
                "confirmed": confirmed_appointments,
                "completed": completed_appointments,
                "this_week": recent_appointments
            },
            "content_performance": {
                "top_conditions": [{"path": c["_id"], "views": c["views"]} for c in top_conditions],
                "top_treatments": [{"path": t["_id"], "views": t["views"]} for t in top_treatments]
            },
            "content_stats": {
                "total_cms_pages": total_cms_pages,
                "published_pages": published_pages,
                "draft_pages": draft_pages,
                "total_blogs": total_blogs,
                "seo_suggestions": total_seo_suggestions,
                "approved_seo": approved_suggestions
            }
        }
    except Exception as e:
        logger.error(f"Error fetching analytics: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch analytics")


# Include the router in the main app
# ============ Public CMS Content Endpoints ============

@api_router.get("/cms/conditions")
async def get_all_conditions():
    """Get all published conditions from CMS"""
    try:
        conditions = await db.cms_pages.find(
            {"type": "condition", "status": "published"},
            {"_id": 0}
        ).sort("title", 1).to_list(100)
        return conditions
    except Exception as e:
        logger.error(f"Error fetching conditions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch conditions")

@api_router.get("/cms/conditions/{slug}")
async def get_condition_by_slug(slug: str):
    """Get a single condition by slug"""
    try:
        condition = await db.cms_pages.find_one(
            {"slug": slug, "type": "condition", "status": "published"},
            {"_id": 0}
        )
        if not condition:
            raise HTTPException(status_code=404, detail="Condition not found")
        return condition
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching condition: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch condition")

@api_router.get("/cms/treatments")
async def get_all_treatments():
    """Get all published treatments from CMS"""
    try:
        treatments = await db.cms_pages.find(
            {"type": "treatment", "status": "published"},
            {"_id": 0}
        ).sort("title", 1).to_list(100)
        return treatments
    except Exception as e:
        logger.error(f"Error fetching treatments: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch treatments")

@api_router.get("/cms/treatments/{slug}")
async def get_treatment_by_slug(slug: str):
    """Get a single treatment by slug"""
    try:
        treatment = await db.cms_pages.find_one(
            {"slug": slug, "type": "treatment", "status": "published"},
            {"_id": 0}
        )
        if not treatment:
            raise HTTPException(status_code=404, detail="Treatment not found")
        return treatment
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching treatment: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch treatment")

@api_router.get("/cms/blogs")
async def get_all_cms_blogs():
    """Get all published blog posts from CMS"""
    try:
        blogs = await db.cms_pages.find(
            {"type": "blog", "status": "published"},
            {"_id": 0}
        ).sort("created_at", -1).to_list(100)
        return blogs
    except Exception as e:
        logger.error(f"Error fetching blogs: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blogs")

@api_router.get("/cms/blogs/{slug}")
async def get_blog_by_slug(slug: str):
    """Get a single blog post by slug"""
    try:
        blog = await db.cms_pages.find_one(
            {"slug": slug, "type": "blog", "status": "published"},
            {"_id": 0}
        )
        if not blog:
            raise HTTPException(status_code=404, detail="Blog post not found")
        return blog
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching blog: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog")

@api_router.get("/blogs/visible")
async def get_visible_blogs():
    """Get only visible blogs for main website (excludes hidden SEO pages)"""
    try:
        # Get blogs that are NOT hidden
        blogs = await db.cms_pages.find(
            {"type": "blog", "status": "published", "is_hidden": {"$ne": True}},
            {"_id": 0}
        ).sort("created_at", -1).to_list(100)
        return blogs
    except Exception as e:
        logger.error(f"Error fetching visible blogs: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blogs")

@api_router.put("/admin/cms/pages/{page_id}/visibility")
async def toggle_page_visibility(page_id: str, is_hidden: bool):
    """Toggle page visibility (hidden = SEO only, not shown on main site)"""
    try:
        result = await db.cms_pages.update_one(
            {"id": page_id},
            {"$set": {"is_hidden": is_hidden}}
        )
        return {"success": result.modified_count > 0}
    except Exception as e:
        logger.error(f"Error updating visibility: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ============ Keyword Research & Blog Suggestion Endpoints ============

# Orthopedic seed keywords for suggestions
ORTHO_SEED_KEYWORDS = [
    "knee replacement", "hip replacement", "ACL surgery", "arthroscopy",
    "knee pain", "hip pain", "shoulder pain", "back pain", "joint pain",
    "orthopedic surgeon", "bone doctor", "sports injury", "fracture treatment",
    "meniscus tear", "rotator cuff", "knee arthritis", "hip arthritis"
]

# Blog title templates
BLOG_TEMPLATES = [
    "{keyword} Cost in Hyderabad 2025: Complete Guide",
    "{keyword}: Symptoms, Causes, and Treatment Options",
    "How Long Does {keyword} Recovery Take? Timeline Guide",
    "{keyword} vs {alt_keyword}: Which is Right for You?",
    "Best {keyword} Doctor in Hyderabad: How to Choose",
    "{keyword} Age Limit: Am I Too Old or Young?",
    "Life After {keyword}: What to Expect",
    "{keyword} Success Rate: Facts and Statistics",
    "Preparing for {keyword}: Complete Checklist",
    "{keyword} Complications: Risks and How to Avoid Them"
]

@api_router.get("/admin/keywords/autocomplete/{seed_keyword}")
async def get_keyword_suggestions(seed_keyword: str):
    """Get keyword suggestions from Google Autocomplete"""
    try:
        suggestions = []
        
        # Google Autocomplete API (unofficial but free)
        async with httpx.AsyncClient() as client:
            # Get suggestions for the seed keyword
            url = f"http://suggestqueries.google.com/complete/search?client=firefox&q={seed_keyword}"
            response = await client.get(url, timeout=10.0)
            
            if response.status_code == 200:
                data = response.json()
                if len(data) > 1 and isinstance(data[1], list):
                    for kw in data[1][:20]:
                        suggestions.append({
                            "keyword": kw,
                            "search_volume": "Unknown",
                            "difficulty": "Medium",
                            "source": "google_autocomplete"
                        })
            
            # Also get suggestions with common modifiers
            modifiers = ["cost", "treatment", "surgery", "doctor", "hospital", "recovery", "best"]
            for mod in modifiers[:3]:  # Limit to avoid rate limiting
                mod_url = f"http://suggestqueries.google.com/complete/search?client=firefox&q={seed_keyword} {mod}"
                try:
                    mod_response = await client.get(mod_url, timeout=5.0)
                    if mod_response.status_code == 200:
                        mod_data = mod_response.json()
                        if len(mod_data) > 1 and isinstance(mod_data[1], list):
                            for kw in mod_data[1][:5]:
                                if kw not in [s["keyword"] for s in suggestions]:
                                    suggestions.append({
                                        "keyword": kw,
                                        "search_volume": "Unknown",
                                        "difficulty": "Medium",
                                        "source": "google_autocomplete"
                                    })
                except Exception:
                    pass
                await asyncio.sleep(0.2)  # Small delay to avoid rate limiting
        
        return {
            "seed_keyword": seed_keyword,
            "suggestions": suggestions[:30],
            "count": len(suggestions[:30])
        }
    except Exception as e:
        logger.error(f"Error fetching keyword suggestions: {str(e)}")
        return {
            "seed_keyword": seed_keyword,
            "suggestions": [],
            "count": 0,
            "error": str(e)
        }

@api_router.get("/admin/keywords/trending")
async def get_trending_orthopedic_keywords():
    """Get trending orthopedic keywords and topics"""
    try:
        trending = []
        
        # Fetch suggestions for each seed keyword
        async with httpx.AsyncClient() as client:
            for seed in ORTHO_SEED_KEYWORDS[:8]:  # Limit to avoid timeout
                url = f"http://suggestqueries.google.com/complete/search?client=firefox&q={seed} hyderabad"
                try:
                    response = await client.get(url, timeout=5.0)
                    if response.status_code == 200:
                        data = response.json()
                        if len(data) > 1 and isinstance(data[1], list):
                            for kw in data[1][:3]:
                                if kw not in [t["keyword"] for t in trending]:
                                    trending.append({
                                        "keyword": kw,
                                        "category": seed,
                                        "source": "google_autocomplete"
                                    })
                except Exception:
                    pass
                await asyncio.sleep(0.1)
        
        return {
            "trending_keywords": trending[:25],
            "count": len(trending[:25]),
            "last_updated": datetime.now(timezone.utc).isoformat()
        }
    except Exception as e:
        logger.error(f"Error fetching trending keywords: {str(e)}")
        return {"trending_keywords": [], "count": 0, "error": str(e)}

@api_router.post("/admin/keywords/generate-blog-topics")
async def generate_blog_topics(keywords: List[str]):
    """Generate blog topic suggestions from keywords"""
    try:
        topics = []
        
        for keyword in keywords[:10]:  # Limit to 10 keywords
            # Clean the keyword
            clean_kw = keyword.strip().title()
            
            # Generate topics using templates
            for template in BLOG_TEMPLATES[:5]:
                if "{alt_keyword}" in template:
                    # Skip comparison templates for now
                    continue
                
                title = template.format(keyword=clean_kw)
                slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
                
                # Generate meta description
                meta_desc = f"Complete guide to {clean_kw.lower()} in Hyderabad. Learn about costs, procedures, recovery time, and find the best treatment options with Dr. B Harsha Vardhana Reddy."
                
                # Generate outline
                outline = [
                    f"What is {clean_kw}?",
                    f"Who Needs {clean_kw}?",
                    f"{clean_kw} Procedure Explained",
                    "Recovery Timeline",
                    "Cost and Insurance",
                    "Why Choose Dr. Harsha?",
                    f"FAQs About {clean_kw}"
                ]
                
                topics.append({
                    "id": str(uuid.uuid4()),
                    "title": title,
                    "slug": slug,
                    "target_keyword": keyword,
                    "meta_description": meta_desc[:160],
                    "outline": outline,
                    "estimated_word_count": 1500,
                    "priority": "medium",
                    "status": "suggested"
                })
        
        return {
            "topics": topics,
            "count": len(topics)
        }
    except Exception as e:
        logger.error(f"Error generating blog topics: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ============ AUTOMATED SEO ENGINE ============

# High-value seed keywords for orthopedic practice
AUTO_SEO_SEEDS = [
    # Core treatments
    "knee replacement", "hip replacement", "ACL surgery", "meniscus surgery",
    "shoulder surgery", "arthroscopy", "joint replacement",
    # Pain conditions
    "knee pain", "hip pain", "back pain", "shoulder pain", "joint pain",
    # Local keywords
    "orthopedic surgeon hyderabad", "bone doctor hyderabad", "joint specialist hyderabad",
    # Long-tail
    "knee replacement cost", "knee replacement recovery", "best orthopedic doctor",
    "sports injury treatment", "fracture treatment"
]

# Priority scoring based on keyword patterns
PRIORITY_PATTERNS = {
    "high": ["cost", "price", "best", "top", "near me", "hyderabad", "2025", "how much"],
    "medium": ["recovery", "surgery", "treatment", "doctor", "hospital", "time"],
    "low": ["what is", "meaning", "define", "wikipedia"]
}

# Keywords to EXCLUDE (not relevant to human orthopedics)
EXCLUDED_KEYWORDS = [
    "dog", "dogs", "cat", "cats", "pet", "pets", "veterinary", "vet",
    "ortho k", "ortho-k", "contact lens", "eye", "eyes", "vision",
    "dental", "teeth", "tooth", "dentist",
    "car", "bike", "vehicle", "auto",
    "plant", "garden", "furniture",
    "iphone", "android", "laptop", "computer",
    "game", "gaming", "movie", "film",
    "recipe", "food", "cooking",
    "baby", "infant", "pregnancy",
    "pillow", "mattress", "bed", "chair", "seat", "cushion",  # Products not services
    "shoes", "insole", "brace", "belt", "support",  # Products
    "sindh", "pakistan", "karachi", "lahore",  # Wrong location
    "medicaid", "medicare",  # US insurance not relevant
    "salary", "jobs", "career", "vacancy"  # Job searches
]

# Keywords that MUST be present (at least one)
REQUIRED_KEYWORDS = [
    "knee", "hip", "shoulder", "joint", "bone", "orthopedic", "orthopaedic",
    "surgery", "surgeon", "doctor", "hospital", "replacement", "arthroscopy",
    "pain", "injury", "fracture", "acl", "meniscus", "rotator", "spine",
    "back", "neck", "ligament", "cartilage", "arthritis", "sports"
]

def is_relevant_keyword(keyword: str) -> bool:
    """Check if keyword is relevant to orthopedic practice"""
    keyword_lower = keyword.lower()
    
    # Check for excluded terms
    for excluded in EXCLUDED_KEYWORDS:
        if excluded in keyword_lower:
            return False
    
    # Check for at least one required term
    for required in REQUIRED_KEYWORDS:
        if required in keyword_lower:
            return True
    
    return False

async def calculate_keyword_priority(keyword: str) -> str:
    """Calculate priority based on keyword patterns"""
    keyword_lower = keyword.lower()
    for priority, patterns in PRIORITY_PATTERNS.items():
        for pattern in patterns:
            if pattern in keyword_lower:
                return priority
    return "medium"

async def fetch_autocomplete_suggestions(keyword: str) -> List[str]:
    """Fetch suggestions from Google Autocomplete"""
    suggestions = []
    try:
        async with httpx.AsyncClient() as client:
            url = f"http://suggestqueries.google.com/complete/search?client=firefox&q={keyword}"
            response = await client.get(url, timeout=10.0)
            if response.status_code == 200:
                data = response.json()
                if len(data) > 1 and isinstance(data[1], list):
                    suggestions = data[1][:15]
    except Exception as e:
        logger.error(f"Error fetching autocomplete: {e}")
    return suggestions

async def generate_auto_blog_topic(keyword: str, priority: str) -> dict:
    """Generate a blog topic from a keyword"""
    clean_kw = keyword.strip().title()
    
    # Determine best template based on keyword
    if "cost" in keyword.lower() or "price" in keyword.lower():
        title = f"{clean_kw} in Hyderabad 2025: Complete Price Guide"
        outline = [
            f"Overview of {clean_kw}",
            "Cost Breakdown by Hospital Type",
            "Factors Affecting Price",
            "Insurance Coverage Options",
            "EMI and Payment Plans",
            "Why Choose Dr. Harsha at Yashoda Hospital",
            "FAQs"
        ]
    elif "recovery" in keyword.lower() or "time" in keyword.lower():
        title = f"{clean_kw}: Day-by-Day Timeline & Tips"
        outline = [
            "What to Expect After Surgery",
            "Week 1: Initial Recovery",
            "Week 2-4: Building Strength",
            "Month 2-3: Returning to Normal",
            "Tips for Faster Recovery",
            "When to Call Your Doctor",
            "FAQs"
        ]
    elif "best" in keyword.lower() or "top" in keyword.lower():
        title = f"{clean_kw}: How to Choose the Right One"
        outline = [
            "Key Factors to Consider",
            "Qualifications to Look For",
            "Questions to Ask",
            "Red Flags to Avoid",
            "Why Patients Choose Dr. Harsha",
            "Patient Success Stories",
            "Book Your Consultation"
        ]
    elif "symptom" in keyword.lower() or "sign" in keyword.lower():
        title = f"{clean_kw}: When to See a Doctor"
        outline = [
            "Common Signs and Symptoms",
            "When It's Serious",
            "Self-Care Tips",
            "Treatment Options",
            "Prevention Strategies",
            "Expert Consultation"
        ]
    else:
        title = f"{clean_kw}: Complete Guide by Dr. Harsha"
        outline = [
            f"What is {clean_kw}?",
            "Causes and Risk Factors",
            "Symptoms to Watch For",
            "Diagnosis Process",
            "Treatment Options",
            "Recovery and Outcomes",
            "Why Choose Dr. Harsha",
            "FAQs"
        ]
    
    slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    meta_desc = f"Expert guide on {keyword.lower()} by Dr. B Harsha Vardhana Reddy, Hyderabad's leading orthopedic surgeon. Learn about treatment options, costs, and recovery."
    
    return {
        "id": str(uuid.uuid4()),
        "title": title,
        "slug": slug,
        "target_keyword": keyword,
        "meta_description": meta_desc[:160],
        "outline": outline,
        "estimated_word_count": 1500,
        "priority": priority,
        "status": "auto_suggested",
        "source": "automated_seo_engine",
        "created_at": datetime.now(timezone.utc).isoformat()
    }

@api_router.post("/admin/seo/auto-generate")
async def auto_generate_seo_suggestions():
    """
    AUTOMATED SEO ENGINE
    Automatically researches keywords and generates blog topic suggestions.
    No manual input needed!
    """
    try:
        all_keywords = set()
        generated_topics = []
        
        # Step 1: Fetch trending keywords from multiple seeds
        logger.info("🔍 Auto SEO: Starting keyword research...")
        for seed in AUTO_SEO_SEEDS[:10]:  # Limit to avoid timeout
            suggestions = await fetch_autocomplete_suggestions(seed)
            all_keywords.update(suggestions)
            await asyncio.sleep(0.2)  # Rate limiting
        
        # Step 2: Fetch with location modifiers
        location_modifiers = ["hyderabad", "near me", "cost in india"]
        for seed in ["knee replacement", "hip replacement", "orthopedic"]:
            for loc in location_modifiers:
                suggestions = await fetch_autocomplete_suggestions(f"{seed} {loc}")
                all_keywords.update(suggestions)
                await asyncio.sleep(0.2)
        
        logger.info(f"🔍 Auto SEO: Found {len(all_keywords)} unique keywords")
        
        # Step 3: Filter and prioritize keywords
        prioritized_keywords = []
        for kw in all_keywords:
            # Check length and relevance
            if len(kw) > 10 and len(kw) < 80 and is_relevant_keyword(kw):
                priority = await calculate_keyword_priority(kw)
                prioritized_keywords.append({"keyword": kw, "priority": priority})
        
        logger.info(f"🔍 Auto SEO: {len(prioritized_keywords)} relevant keywords after filtering")
        
        # Sort by priority
        priority_order = {"high": 0, "medium": 1, "low": 2}
        prioritized_keywords.sort(key=lambda x: priority_order.get(x["priority"], 1))
        
        # Step 4: Check which keywords we already have topics for (prevent duplicates)
        # Check auto_seo_suggestions
        existing_topics = await db.auto_seo_suggestions.find({}, {"target_keyword": 1}).to_list(500)
        existing_keywords = set(t.get("target_keyword", "").lower() for t in existing_topics)
        
        # Also check published blogs in CMS
        published_blogs = await db.cms_pages.find({"type": "blog"}, {"keywords": 1, "slug": 1}).to_list(500)
        for blog in published_blogs:
            if blog.get("keywords"):
                for kw in blog.get("keywords", []):
                    existing_keywords.add(kw.lower())
            if blog.get("slug"):
                existing_keywords.add(blog.get("slug", "").lower().replace("-", " "))
        
        logger.info(f"🔍 Auto SEO: {len(existing_keywords)} existing keywords to skip")
        
        # Step 5: Generate topics for new keywords only
        new_topics = []
        for item in prioritized_keywords[:30]:  # Generate top 30
            kw = item["keyword"]
            if kw.lower() not in existing_keywords:
                topic = await generate_auto_blog_topic(kw, item["priority"])
                topic["is_hidden"] = True  # Mark as hidden SEO page by default
                new_topics.append(topic)
                generated_topics.append(topic)
        
        # Step 6: Save to database
        if new_topics:
            await db.auto_seo_suggestions.insert_many(new_topics)
            logger.info(f"✅ Auto SEO: Generated {len(new_topics)} new topic suggestions")
        
        # Step 7: Update last run timestamp
        await db.seo_settings.update_one(
            {"type": "auto_seo"},
            {"$set": {
                "last_run": datetime.now(timezone.utc).isoformat(),
                "keywords_found": len(all_keywords),
                "topics_generated": len(new_topics)
            }},
            upsert=True
        )
        
        return {
            "success": True,
            "keywords_researched": len(all_keywords),
            "new_topics_generated": len(new_topics),
            "total_suggestions": len(generated_topics),
            "message": f"Auto SEO complete! Generated {len(new_topics)} new blog topic suggestions."
        }
    except Exception as e:
        logger.error(f"Auto SEO error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/admin/seo/suggestions")
async def get_auto_seo_suggestions(status: str = None, priority: str = None, limit: int = 50):
    """Get automated SEO suggestions with optional filters"""
    try:
        query = {}
        if status:
            query["status"] = status
        if priority:
            query["priority"] = priority
        
        suggestions = await db.auto_seo_suggestions.find(
            query, 
            {"_id": 0}
        ).sort([("priority", 1), ("created_at", -1)]).to_list(limit)
        
        # Get stats
        total = await db.auto_seo_suggestions.count_documents({})
        high_priority = await db.auto_seo_suggestions.count_documents({"priority": "high"})
        pending = await db.auto_seo_suggestions.count_documents({"status": "auto_suggested"})
        
        return {
            "suggestions": suggestions,
            "stats": {
                "total": total,
                "high_priority": high_priority,
                "pending": pending
            }
        }
    except Exception as e:
        logger.error(f"Error fetching suggestions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/admin/seo/suggestions/{suggestion_id}/status")
async def update_seo_suggestion_status(suggestion_id: str, status: str):
    """Update suggestion status (approved, rejected, published)"""
    try:
        update_data = {"status": status}
        if status == "published":
            update_data["published_at"] = datetime.now(timezone.utc).isoformat()
        
        result = await db.auto_seo_suggestions.update_one(
            {"id": suggestion_id},
            {"$set": update_data}
        )
        return {"success": result.modified_count > 0}
    except Exception as e:
        logger.error(f"Error updating suggestion: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/admin/seo/suggestions/{suggestion_id}")
async def delete_seo_suggestion(suggestion_id: str):
    """Delete a suggestion"""
    try:
        result = await db.auto_seo_suggestions.delete_one({"id": suggestion_id})
        return {"success": result.deleted_count > 0}
    except Exception as e:
        logger.error(f"Error deleting suggestion: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/admin/seo/suggestions-clear-all")
async def clear_all_seo_suggestions():
    """Clear all SEO suggestions to start fresh"""
    try:
        result = await db.auto_seo_suggestions.delete_many({})
        return {"success": True, "deleted_count": result.deleted_count}
    except Exception as e:
        logger.error(f"Error clearing suggestions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/admin/seo/dashboard")
async def get_seo_dashboard():
    """Get SEO dashboard with stats and recent suggestions"""
    try:
        # Get last run info
        settings = await db.seo_settings.find_one({"type": "auto_seo"}, {"_id": 0})
        
        # Get suggestion stats by priority
        high_count = await db.auto_seo_suggestions.count_documents({"priority": "high"})
        medium_count = await db.auto_seo_suggestions.count_documents({"priority": "medium"})
        low_count = await db.auto_seo_suggestions.count_documents({"priority": "low"})
        
        # Get status breakdown
        pending = await db.auto_seo_suggestions.count_documents({"status": "auto_suggested"})
        approved = await db.auto_seo_suggestions.count_documents({"status": "approved"})
        published = await db.auto_seo_suggestions.count_documents({"status": "published"})
        
        # Get top 5 high priority suggestions
        top_suggestions = await db.auto_seo_suggestions.find(
            {"priority": "high", "status": "auto_suggested"},
            {"_id": 0}
        ).sort("created_at", -1).to_list(5)
        
        return {
            "last_run": settings.get("last_run") if settings else None,
            "stats": {
                "by_priority": {
                    "high": high_count,
                    "medium": medium_count,
                    "low": low_count
                },
                "by_status": {
                    "pending": pending,
                    "approved": approved,
                    "published": published
                },
                "total": high_count + medium_count + low_count
            },
            "top_suggestions": top_suggestions
        }
    except Exception as e:
        logger.error(f"Error fetching SEO dashboard: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/admin/content-ideas")
async def save_content_idea(idea: ContentIdea):
    """Save a content idea for later"""
    try:
        idea_dict = idea.model_dump()
        idea_dict["created_at"] = datetime.now(timezone.utc).isoformat()
        await db.content_ideas.insert_one(idea_dict)
        return {"success": True, "id": idea.id}
    except Exception as e:
        logger.error(f"Error saving content idea: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/admin/content-ideas")
async def get_content_ideas():
    """Get all saved content ideas"""
    try:
        ideas = await db.content_ideas.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
        return ideas
    except Exception as e:
        logger.error(f"Error fetching content ideas: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/admin/content-ideas/{idea_id}")
async def update_content_idea(idea_id: str, status: str):
    """Update content idea status"""
    try:
        result = await db.content_ideas.update_one(
            {"id": idea_id},
            {"$set": {"status": status}}
        )
        return {"success": result.modified_count > 0}
    except Exception as e:
        logger.error(f"Error updating content idea: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/admin/content-ideas/{idea_id}")
async def delete_content_idea(idea_id: str):
    """Delete a content idea"""
    try:
        result = await db.content_ideas.delete_one({"id": idea_id})
        return {"success": result.deleted_count > 0}
    except Exception as e:
        logger.error(f"Error deleting content idea: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/admin/blog-topics/save")
async def save_blog_topic(topic: BlogTopicSuggestion):
    """Save a blog topic suggestion"""
    try:
        topic_dict = topic.model_dump()
        topic_dict["created_at"] = datetime.now(timezone.utc).isoformat()
        await db.blog_topics.insert_one(topic_dict)
        return {"success": True, "id": topic.id}
    except Exception as e:
        logger.error(f"Error saving blog topic: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/admin/blog-topics")
async def get_saved_blog_topics():
    """Get all saved blog topics"""
    try:
        topics = await db.blog_topics.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
        return topics
    except Exception as e:
        logger.error(f"Error fetching blog topics: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/admin/blog-topics/{topic_id}/status")
async def update_blog_topic_status(topic_id: str, status: str):
    """Update blog topic status"""
    try:
        update_data = {"status": status}
        if status == "published":
            update_data["published_at"] = datetime.now(timezone.utc).isoformat()
        
        result = await db.blog_topics.update_one(
            {"id": topic_id},
            {"$set": update_data}
        )
        return {"success": result.modified_count > 0}
    except Exception as e:
        logger.error(f"Error updating blog topic: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ============ COMPREHENSIVE CONTENT MIGRATION ============

# All conditions for migration
MIGRATION_CONDITIONS = [
    # Core conditions from conditions.js
    {"id": "knee-arthritis", "name": "Knee Arthritis & Osteoarthritis", "category": "Knee", "description": "Degenerative joint disease causing pain, stiffness, and reduced mobility in the knee.", "symptoms": ["Knee pain and stiffness", "Swelling and inflammation", "Difficulty walking or climbing stairs", "Grinding sensation", "Reduced range of motion"], "treatments": ["Total Knee Replacement", "Partial Knee Replacement", "Arthroscopy", "Injections", "Physical Therapy"], "icon": "🦵", "seoKeywords": "knee arthritis Hyderabad, osteoarthritis treatment, knee pain doctor"},
    {"id": "hip-arthritis", "name": "Hip Arthritis & AVN", "category": "Hip", "description": "Hip joint degeneration and avascular necrosis causing severe hip pain and limited mobility.", "symptoms": ["Hip pain", "Groin pain", "Limping", "Difficulty putting on shoes", "Pain at night"], "treatments": ["Total Hip Replacement", "Hip Resurfacing", "Core Decompression", "Injections"], "icon": "🦴", "seoKeywords": "hip arthritis Hyderabad, AVN treatment, hip replacement surgeon"},
    {"id": "acl-tear", "name": "ACL Tear & Knee Ligament Injuries", "category": "Sports Injury", "description": "Anterior cruciate ligament tear, common in athletes and active individuals.", "symptoms": ["Sudden knee pain", "Popping sensation", "Knee instability", "Swelling within hours", "Cannot bear weight"], "treatments": ["ACL Reconstruction", "Meniscus Repair", "Physical Therapy", "Bracing"], "icon": "⚽", "seoKeywords": "ACL tear treatment Hyderabad, ACL surgery, sports injury doctor"},
    {"id": "rotator-cuff", "name": "Rotator Cuff Tear", "category": "Shoulder", "description": "Tear in shoulder tendons causing pain and weakness.", "symptoms": ["Shoulder pain at night", "Weakness lifting arm", "Crackling sensation", "Limited range of motion", "Difficulty reaching behind back"], "treatments": ["Arthroscopic Rotator Cuff Repair", "Physical Therapy", "PRP Injections", "Shoulder Replacement"], "icon": "💪", "seoKeywords": "rotator cuff tear Hyderabad, shoulder arthroscopy, shoulder pain treatment"},
    {"id": "frozen-shoulder", "name": "Frozen Shoulder (Adhesive Capsulitis)", "category": "Shoulder", "description": "Stiffness and pain in shoulder joint, progressively limiting movement.", "symptoms": ["Gradual onset of stiffness", "Severe limitation of movement", "Pain at night", "Difficulty with daily activities"], "treatments": ["Physical Therapy", "Hydrodilatation", "Arthroscopic Capsular Release", "Manipulation Under Anesthesia"], "icon": "🥶", "seoKeywords": "frozen shoulder treatment Hyderabad, adhesive capsulitis, shoulder stiffness"},
    {"id": "meniscus-tear", "name": "Meniscus Tear", "category": "Knee", "description": "Tear in knee cartilage causing pain, swelling, and catching sensation.", "symptoms": ["Knee pain", "Swelling", "Catching or locking", "Difficulty straightening knee", "Popping sensation"], "treatments": ["Arthroscopic Meniscus Repair", "Partial Meniscectomy", "Physical Therapy"], "icon": "🦵", "seoKeywords": "meniscus tear Hyderabad, knee arthroscopy, cartilage repair"},
    {"id": "tennis-elbow", "name": "Tennis Elbow & Golfers Elbow", "category": "Elbow", "description": "Lateral and medial epicondylitis causing elbow pain from overuse.", "symptoms": ["Elbow pain", "Weak grip", "Pain when lifting objects", "Tenderness on outer/inner elbow"], "treatments": ["PRP Injections", "Physical Therapy", "Elbow Arthroscopy", "Lateral Epicondylar Release"], "icon": "🎾", "seoKeywords": "tennis elbow treatment Hyderabad, elbow pain doctor, lateral epicondylitis"},
    {"id": "spinal-fracture", "name": "Vertebral Compression Fractures", "category": "Spine", "description": "Spinal compression fractures from osteoporosis or trauma.", "symptoms": ["Sudden back pain", "Loss of height", "Stooped posture", "Limited mobility", "Difficulty walking"], "treatments": ["Vertebroplasty", "Kyphoplasty", "Bracing", "Pain Management"], "icon": "🏥", "seoKeywords": "spinal fracture treatment Hyderabad, vertebroplasty, back pain doctor"},
    {"id": "carpal-tunnel", "name": "Carpal Tunnel Syndrome", "category": "Hand & Wrist", "description": "Nerve compression in wrist causing numbness, tingling, and weakness.", "symptoms": ["Numbness in fingers", "Tingling sensation", "Hand weakness", "Difficulty gripping", "Night-time symptoms"], "treatments": ["Carpal Tunnel Release", "Wrist Splinting", "Nerve Gliding Exercises", "Corticosteroid Injections"], "icon": "✋", "seoKeywords": "carpal tunnel syndrome Hyderabad, wrist pain treatment, hand numbness"},
    {"id": "ankle-sprain", "name": "Chronic Ankle Instability", "category": "Foot & Ankle", "description": "Recurring ankle sprains and instability from ligament damage.", "symptoms": ["Repeated ankle sprains", "Feeling of giving way", "Chronic swelling", "Pain and tenderness", "Instability on uneven surfaces"], "treatments": ["Ankle Ligament Reconstruction", "Physical Therapy", "Bracing", "Proprioceptive Training"], "icon": "👣", "seoKeywords": "ankle instability Hyderabad, ankle ligament surgery, chronic ankle sprain"},
    {"id": "shoulder-dislocation", "name": "Recurrent Shoulder Dislocation", "category": "Shoulder", "description": "Repeated shoulder dislocations indicating joint instability.", "symptoms": ["Shoulder pops out", "Visible deformity", "Severe pain", "Arm numbness", "Fear of shoulder giving way"], "treatments": ["Arthroscopic Bankart Repair", "Latarjet Procedure", "Capsular Shift", "Physical Therapy"], "icon": "🤕", "seoKeywords": "shoulder dislocation Hyderabad, bankart repair, shoulder instability surgery"},
    {"id": "plantar-fasciitis", "name": "Plantar Fasciitis & Heel Pain", "category": "Foot & Ankle", "description": "Inflammation of tissue on bottom of foot causing heel pain.", "symptoms": ["Heel pain in morning", "Pain after standing", "Arch pain", "Difficulty climbing stairs", "Pain improves with activity"], "treatments": ["PRP Injections", "Shockwave Therapy", "Physical Therapy", "Plantar Fascia Release"], "icon": "🦶", "seoKeywords": "plantar fasciitis Hyderabad, heel pain treatment, foot pain doctor"},
    {"id": "pcl-injury", "name": "PCL Injury & Multi-Ligament Knee", "category": "Sports Injury", "description": "Posterior cruciate ligament injury, often from dashboard injury or sports trauma.", "symptoms": ["Knee instability", "Posterior knee pain", "Swelling", "Difficulty walking downstairs", "Feeling of knee giving way"], "treatments": ["PCL Reconstruction", "Multi-Ligament Reconstruction", "Physical Therapy"], "icon": "🏃", "seoKeywords": "PCL injury Hyderabad, knee ligament surgery, sports trauma"},
    {"id": "fracture-trauma", "name": "Complex Fractures & Trauma", "category": "Trauma", "description": "Severe bone fractures from accidents requiring surgical fixation.", "symptoms": ["Severe pain", "Deformity", "Inability to move", "Swelling and bruising", "Bone visible through skin"], "treatments": ["ORIF (Plate Fixation)", "Intramedullary Nailing", "External Fixation", "Minimally Invasive Surgery"], "icon": "🩹", "seoKeywords": "fracture surgery Hyderabad, trauma surgeon, complex fracture treatment"},
    {"id": "bursitis", "name": "Hip & Shoulder Bursitis", "category": "Hip", "description": "Inflammation of fluid-filled sacs around joints.", "symptoms": ["Joint pain", "Swelling", "Warmth", "Tenderness to touch", "Pain with movement"], "treatments": ["Corticosteroid Injections", "Physical Therapy", "Bursectomy", "Activity Modification"], "icon": "💊", "seoKeywords": "bursitis treatment Hyderabad, hip pain, shoulder pain doctor"},
    {"id": "patella-dislocation", "name": "Patellar Dislocation & Instability", "category": "Knee", "description": "Kneecap dislocation or repeated subluxation causing anterior knee pain.", "symptoms": ["Kneecap slides out of place", "Visible deformity", "Anterior knee pain", "Swelling", "Apprehension with activity"], "treatments": ["MPFL Reconstruction", "Tibial Tubercle Osteotomy", "Lateral Release", "Physical Therapy"], "icon": "🦵", "seoKeywords": "patellar dislocation Hyderabad, kneecap surgery, MPFL reconstruction"},
    # Additional detailed conditions
    {"id": "avascular-necrosis-avn", "name": "Avascular Necrosis (AVN)", "category": "Hip", "description": "Bone death due to loss of blood supply, commonly affecting the hip joint.", "symptoms": ["Groin pain that worsens with activity", "Pain in the buttock or thigh", "Limping or difficulty walking", "Stiffness in the hip joint", "Decreased range of motion"], "treatments": ["Core Decompression", "Bone Grafting", "Hip Resurfacing", "Total Hip Replacement"], "icon": "🦴", "seoKeywords": "AVN treatment hyderabad, avascular necrosis hip, osteonecrosis treatment"},
    {"id": "hip-labral-tear", "name": "Hip Labral Tear", "category": "Hip", "description": "Tear in the ring of cartilage surrounding the hip socket.", "symptoms": ["Deep groin pain or pain in front of hip", "Clicking, locking, or catching sensation", "Stiffness or limited range of motion", "Pain that worsens with prolonged sitting", "Pain during or after sports activities"], "treatments": ["Conservative Treatment", "Hip Arthroscopy", "Labral Reconstruction"], "icon": "🦴", "seoKeywords": "hip labral tear treatment, hip labrum surgery, hip arthroscopy hyderabad"},
    {"id": "hip-bursitis", "name": "Hip Bursitis (Trochanteric Bursitis)", "category": "Hip", "description": "Inflammation of the bursa on the outer side of the hip.", "symptoms": ["Pain on the outer hip and thigh", "Pain when lying on affected side", "Pain climbing stairs", "Tenderness when pressing on outer hip", "Pain that worsens with prolonged walking"], "treatments": ["Rest and Ice", "Physical Therapy", "Corticosteroid Injection", "PRP Injection", "Bursectomy"], "icon": "🦴", "seoKeywords": "hip bursitis treatment, trochanteric bursitis, lateral hip pain"},
    {"id": "shoulder-impingement", "name": "Shoulder Impingement Syndrome", "category": "Shoulder", "description": "Painful pinching of rotator cuff tendons when raising the arm overhead.", "symptoms": ["Pain when reaching overhead or behind back", "Pain at night", "Weakness when lifting or rotating arm", "Clicking or grinding sensation", "Pain radiating from front of shoulder to arm"], "treatments": ["Physical Therapy", "Corticosteroid Injection", "Arthroscopic Decompression"], "icon": "💪", "seoKeywords": "shoulder impingement hyderabad, subacromial impingement, rotator cuff impingement"},
    {"id": "shoulder-arthritis", "name": "Shoulder Arthritis", "category": "Shoulder", "description": "Degenerative wear of the shoulder joint causing pain and stiffness.", "symptoms": ["Deep, aching shoulder pain", "Pain worsening with activity", "Stiffness, especially in morning", "Grinding or clicking sensation", "Decreased range of motion", "Night pain affecting sleep"], "treatments": ["Activity Modification", "Physical Therapy", "Corticosteroid Injection", "Shoulder Replacement"], "icon": "💪", "seoKeywords": "shoulder arthritis treatment, glenohumeral arthritis, shoulder joint pain"},
    {"id": "slap-tear", "name": "SLAP Tear (Superior Labral Tear)", "category": "Shoulder", "description": "Tear in the top part of the shoulder labrum where the biceps tendon attaches.", "symptoms": ["Deep shoulder pain", "Pain with overhead activities", "Catching, locking, or popping", "Decreased throwing velocity", "Feeling of shoulder instability"], "treatments": ["Physical Therapy", "Arthroscopic SLAP Repair", "Biceps Tenodesis"], "icon": "💪", "seoKeywords": "SLAP tear treatment, superior labral tear, shoulder labrum tear"},
    {"id": "trigger-finger", "name": "Trigger Finger", "category": "Hand", "description": "Finger catches or locks when bent and straightens with a snap.", "symptoms": ["Finger stiffness, especially in morning", "Clicking or popping when moving finger", "Finger locks in bent position", "Painful snapping when straightening", "Tender nodule at base of finger"], "treatments": ["Rest and Splinting", "Steroid Injection", "Percutaneous Release", "Surgical Release"], "icon": "🖐️", "seoKeywords": "trigger finger treatment, stenosing tenosynovitis, finger locking"},
    {"id": "de-quervains-tenosynovitis", "name": "De Quervains Tenosynovitis", "category": "Hand", "description": "Painful condition affecting tendons on the thumb side of the wrist.", "symptoms": ["Pain near base of thumb", "Swelling near thumb side of wrist", "Difficulty gripping or pinching", "Pain when moving thumb"], "treatments": ["Rest and Splinting", "Corticosteroid Injection", "Surgical Release"], "icon": "🖐️", "seoKeywords": "de quervains tenosynovitis, wrist tendinitis, thumb pain, mommy thumb"},
    {"id": "ganglion-cyst", "name": "Ganglion Cyst", "category": "Hand", "description": "Fluid-filled lump near joints or tendons, most common on the wrist.", "symptoms": ["Visible lump, usually on wrist", "May be tender or painful", "May interfere with joint movement", "Size can fluctuate", "Numbness if pressing on nerve"], "treatments": ["Observation", "Aspiration", "Surgical Excision"], "icon": "🖐️", "seoKeywords": "ganglion cyst treatment, wrist cyst, hand lump"},
    {"id": "achilles-tendinitis", "name": "Achilles Tendinitis", "category": "Foot", "description": "Overuse injury causing pain in the heel cord at the back of the leg.", "symptoms": ["Pain above the heel, especially after activity", "Morning stiffness in the tendon", "Thickening of the tendon", "Pain climbing stairs or hills"], "treatments": ["RICE Protocol", "Eccentric Exercises", "Shockwave Therapy", "PRP Injection", "Surgery"], "icon": "🦶", "seoKeywords": "achilles tendinitis treatment, heel cord pain, achilles tendon pain"},
    {"id": "bunions", "name": "Bunions (Hallux Valgus)", "category": "Foot", "description": "Bony bump at the base of the big toe causing it to angle inward.", "symptoms": ["Visible bump on inside of foot at big toe", "Swelling, redness, or soreness", "Pain when wearing shoes", "Corns or calluses", "Restricted big toe movement"], "treatments": ["Supportive Shoes", "Bunion Pads", "Orthotics", "Chevron Osteotomy", "Minimally Invasive Surgery"], "icon": "🦶", "seoKeywords": "bunion surgery hyderabad, hallux valgus treatment, big toe deformity"},
    {"id": "ankle-arthritis", "name": "Ankle Arthritis", "category": "Foot", "description": "Degenerative wear of the ankle joint causing pain and stiffness.", "symptoms": ["Pain with walking, especially on uneven ground", "Swelling around the ankle", "Stiffness, especially in morning", "Decreased range of motion", "Difficulty walking or standing"], "treatments": ["Activity Modification", "Bracing", "Corticosteroid Injection", "Ankle Fusion", "Ankle Replacement"], "icon": "🦶", "seoKeywords": "ankle arthritis treatment, ankle replacement hyderabad, ankle fusion"},
    {"id": "flat-feet", "name": "Flat Feet (Pes Planus)", "category": "Foot", "description": "Condition where the arch of the foot collapses.", "symptoms": ["Visible flattening of the arch", "Foot pain, especially in arch or heel", "Pain that worsens with activity", "Swelling along the inside of ankle", "Knee, hip, or back pain"], "treatments": ["Arch Supports/Orthotics", "Physical Therapy", "Bracing", "Tendon Transfer", "Fusion"], "icon": "🦶", "seoKeywords": "flat feet treatment, fallen arches, pes planus"},
    {"id": "patellofemoral-syndrome", "name": "Patellofemoral Pain Syndrome", "category": "Knee", "description": "Pain around the kneecap, especially with stairs, squatting, or prolonged sitting.", "symptoms": ["Dull, aching pain around kneecap", "Pain worse with stairs", "Pain after prolonged sitting", "Pain with squatting or kneeling", "Grinding or popping sensation"], "treatments": ["Activity Modification", "Physical Therapy", "Patellar Taping/Bracing", "Orthotics", "Surgery"], "icon": "🦵", "seoKeywords": "patellofemoral syndrome, runners knee, anterior knee pain"},
    {"id": "bakers-cyst", "name": "Bakers Cyst (Popliteal Cyst)", "category": "Knee", "description": "Fluid-filled swelling behind the knee.", "symptoms": ["Visible bulge behind the knee", "Stiffness or tightness behind knee", "Pain behind knee with activity", "Difficulty fully bending knee", "Swelling that increases with activity"], "treatments": ["Observation", "Aspiration", "Treat Underlying Cause", "Surgical Excision"], "icon": "🦵", "seoKeywords": "bakers cyst treatment, popliteal cyst, knee swelling back"},
    {"id": "osgood-schlatter", "name": "Osgood-Schlatter Disease", "category": "Knee", "description": "Painful bump below the knee in growing adolescents.", "symptoms": ["Pain and swelling below the kneecap", "Painful bump on the shin bone", "Pain worsening with activity", "Pain with kneeling", "Limping after sports"], "treatments": ["Rest and Activity Modification", "Ice", "Stretching", "Patellar Strap", "Physical Therapy"], "icon": "🦵", "seoKeywords": "osgood schlatter treatment, knee pain children, adolescent knee pain"},
    {"id": "herniated-disc", "name": "Herniated Disc (Slipped Disc)", "category": "Spine", "description": "Disc material pushes out and presses on spinal nerves.", "symptoms": ["Lower back pain radiating to leg", "Neck pain radiating to arm", "Numbness or tingling in affected limb", "Muscle weakness", "Pain worse with sitting or bending"], "treatments": ["Activity Modification", "Physical Therapy", "Medications", "Epidural Steroid Injection", "Microdiscectomy"], "icon": "🔙", "seoKeywords": "herniated disc treatment, slipped disc hyderabad, sciatica treatment"},
    {"id": "spinal-stenosis", "name": "Spinal Stenosis", "category": "Spine", "description": "Narrowing of the spinal canal causing pressure on spinal cord and nerves.", "symptoms": ["Leg pain when walking", "Relief when sitting or bending forward", "Back pain", "Numbness or tingling in legs", "Weakness in legs"], "treatments": ["Physical Therapy", "Medications", "Epidural Steroid Injections", "Laminectomy", "Minimally Invasive Decompression"], "icon": "🔙", "seoKeywords": "spinal stenosis treatment, lumbar stenosis, narrowing spine"},
    {"id": "sciatica", "name": "Sciatica", "category": "Spine", "description": "Pain radiating along the sciatic nerve from the lower back down the leg.", "symptoms": ["Pain radiating from lower back to leg", "Pain worse with sitting", "Sharp, burning, or shooting pain", "Numbness or tingling in leg or foot", "Weakness in leg"], "treatments": ["Activity Modification", "Physical Therapy", "Medications", "Epidural Steroid Injection", "Surgery"], "icon": "🔙", "seoKeywords": "sciatica treatment hyderabad, leg pain back, sciatic nerve pain"},
    {"id": "golfers-elbow", "name": "Golfers Elbow (Medial Epicondylitis)", "category": "Elbow", "description": "Pain and inflammation on the inner side of the elbow.", "symptoms": ["Pain and tenderness on inner elbow", "Pain extending down the inner forearm", "Weakness in hands and wrists", "Stiffness in the elbow", "Pain when making a fist"], "treatments": ["Rest and Activity Modification", "Physical Therapy", "Bracing", "Corticosteroid Injection", "PRP Injection", "Surgery"], "icon": "💪", "seoKeywords": "golfers elbow treatment, medial epicondylitis, inner elbow pain"},
    {"id": "cubital-tunnel-syndrome", "name": "Cubital Tunnel Syndrome", "category": "Elbow", "description": "Compression of the ulnar nerve at the elbow.", "symptoms": ["Numbness and tingling in ring and little fingers", "Symptoms worse when elbow is bent", "Pain on inner side of elbow", "Weakness in grip strength", "Difficulty with fine motor tasks"], "treatments": ["Activity Modification", "Night Splinting", "Ulnar Nerve Decompression", "Ulnar Nerve Transposition"], "icon": "💪", "seoKeywords": "cubital tunnel syndrome, ulnar nerve entrapment, elbow numbness"},
]

# All treatments for migration
MIGRATION_TREATMENTS = [
    {"id": "total-knee-replacement", "name": "Total Knee Replacement (TKR)", "category": "Joint Replacement", "description": "Complete knee joint replacement surgery for severe arthritis.", "benefits": ["Pain-free mobility and improved quality of life", "Return to daily activities and low-impact sports", "Computer-navigated precision for accurate alignment", "Minimally invasive approach with smaller incisions", "95% survival rate at 15-20 years"], "procedure": ["Pre-operative planning with X-rays", "Spinal or general anesthesia", "Precise bone cuts guided by computer navigation", "Implant placement with cement fixation", "Immediate post-op physiotherapy"], "recovery": "4-6 weeks for walking independence, 3-6 months for full recovery", "hospitalStay": "2-3 days", "icon": "🦵", "seoKeywords": "total knee replacement Hyderabad, TKR surgery, best knee surgeon"},
    {"id": "total-hip-replacement", "name": "Total Hip Replacement (THR)", "category": "Joint Replacement", "description": "Hip joint replacement for severe arthritis or avascular necrosis.", "benefits": ["Complete pain relief from hip arthritis", "Restored hip function and walking ability", "Improved leg length equality", "Anterior approach for faster recovery", "Return to golf, cycling, swimming"], "recovery": "3-4 weeks for walking, 2-3 months for full activities", "hospitalStay": "2-3 days", "icon": "🦴", "seoKeywords": "hip replacement surgery Hyderabad, THR, AVN surgery"},
    {"id": "acl-reconstruction", "name": "ACL Reconstruction Surgery", "category": "Sports Medicine", "description": "Arthroscopic ACL ligament reconstruction.", "benefits": ["Knee stability restored for sports", "Prevention of future knee damage", "Return to competitive sports within 9-12 months", "Minimally invasive keyhole surgery", "Same-day discharge possible"], "recovery": "2-3 weeks for walking, 6 months for jogging, 9-12 months for sports", "hospitalStay": "Day care or 1 day", "icon": "⚽", "seoKeywords": "ACL reconstruction Hyderabad, ACL surgery, sports injury treatment"},
    {"id": "shoulder-arthroscopy", "name": "Shoulder Arthroscopy & Rotator Cuff Repair", "category": "Sports Medicine", "description": "Minimally invasive keyhole surgery for rotator cuff tears and shoulder problems.", "benefits": ["Minimal scarring with 3-4 small incisions", "Less post-operative pain", "Faster return to overhead activities", "High healing rate for cuff repairs", "Day-care surgery option"], "recovery": "6 weeks for sling, 3-4 months for daily activities, 6-9 months for sports", "hospitalStay": "Day care or 1 day", "icon": "💪", "seoKeywords": "shoulder arthroscopy Hyderabad, rotator cuff repair, keyhole surgery"},
    {"id": "knee-arthroscopy", "name": "Knee Arthroscopy & Meniscus Repair", "category": "Sports Medicine", "description": "Arthroscopic surgery for meniscus tears, cartilage damage, and loose bodies.", "benefits": ["Keyhole surgery with tiny scars", "Quick recovery - walk same day", "Meniscus preservation when possible", "Return to sports within 4-8 weeks", "Day-care procedure"], "recovery": "1-2 weeks for walking, 4-8 weeks for sports", "hospitalStay": "Day care", "icon": "🦵", "seoKeywords": "knee arthroscopy Hyderabad, meniscus tear surgery, cartilage repair"},
    {"id": "fracture-fixation", "name": "Fracture Fixation Surgery (ORIF)", "category": "Trauma Surgery", "description": "Surgical treatment of complex fractures using plates, screws, and nails.", "benefits": ["Precise anatomic reduction of fractures", "Stable fixation allowing early mobilization", "Reduced risk of malunion", "Minimally invasive techniques when possible", "Better functional outcomes"], "recovery": "6-12 weeks for bone healing", "hospitalStay": "2-5 days depending on injury", "icon": "🩹", "seoKeywords": "fracture surgery Hyderabad, ORIF, trauma surgery"},
    {"id": "hip-arthroscopy", "name": "Hip Arthroscopy", "category": "Sports Medicine", "description": "Minimally invasive hip surgery for labral tears and FAI.", "benefits": ["Small incisions with faster recovery", "Hip preservation in young patients", "Treatment of FAI before arthritis develops", "Return to high-level athletics", "Less blood loss and pain"], "recovery": "4-6 weeks crutches, 3-4 months for return to sports", "hospitalStay": "1-2 days", "icon": "🦴", "seoKeywords": "hip arthroscopy Hyderabad, labral tear surgery, FAI treatment"},
    {"id": "shoulder-replacement", "name": "Shoulder Replacement Surgery", "category": "Joint Replacement", "description": "Total or reverse shoulder replacement for severe arthritis.", "benefits": ["Complete pain relief from shoulder arthritis", "Restored overhead reach and function", "Improved quality of life", "Reverse design for cuff-deficient shoulders", "Return to daily activities and golf"], "recovery": "6 weeks sling, 3 months for daily activities, 6-12 months full recovery", "hospitalStay": "2-3 days", "icon": "💪", "seoKeywords": "shoulder replacement Hyderabad, reverse shoulder replacement"},
    {"id": "ankle-ligament-reconstruction", "name": "Ankle Ligament Reconstruction", "category": "Sports Medicine", "description": "Surgical repair or reconstruction of torn ankle ligaments.", "benefits": ["Restored ankle stability", "Prevention of recurrent sprains", "Return to sports and activities", "Prevention of ankle arthritis", "Minimally invasive option available"], "recovery": "6 weeks boot, 3 months for sports return", "hospitalStay": "Day care or 1 day", "icon": "👣", "seoKeywords": "ankle ligament surgery Hyderabad, ankle instability treatment"},
    {"id": "carpal-tunnel-release", "name": "Carpal Tunnel Release Surgery", "category": "Hand & Wrist", "description": "Surgical decompression of median nerve for carpal tunnel syndrome.", "benefits": ["Immediate relief of numbness and tingling", "Restored hand strength and grip", "Small scar with minimal pain", "Quick return to work (1-2 weeks)", "Day-care procedure"], "recovery": "1-2 weeks for light activities, 4-6 weeks for heavy work", "hospitalStay": "Day care", "icon": "✋", "seoKeywords": "carpal tunnel surgery Hyderabad, wrist pain treatment"},
    {"id": "bankart-repair", "name": "Arthroscopic Bankart Repair", "category": "Sports Medicine", "description": "Keyhole surgery for recurrent shoulder dislocation.", "benefits": ["Prevents recurrent shoulder dislocations", "Return to contact sports", "Minimally invasive keyhole surgery", "95% success rate", "Day-care surgery option"], "recovery": "6 weeks sling, 4 months for return to sports", "hospitalStay": "Day care or 1 day", "icon": "🤕", "seoKeywords": "bankart repair Hyderabad, shoulder dislocation surgery"},
    {"id": "spinal-decompression", "name": "Spinal Decompression Surgery", "category": "Spine Surgery", "description": "Surgical treatment for spinal stenosis and nerve compression.", "benefits": ["Relief from leg pain and numbness", "Improved walking distance", "Minimally invasive approach", "Faster recovery with smaller incision", "Same-day walking"], "recovery": "2-4 weeks for daily activities, 6-12 weeks for heavy work", "hospitalStay": "1-2 days", "icon": "🏥", "seoKeywords": "spinal decompression Hyderabad, back pain surgery, sciatica treatment"},
    {"id": "prp-therapy", "name": "PRP Therapy (Platelet-Rich Plasma)", "category": "Regenerative Medicine", "description": "Injection of concentrated platelets to promote healing.", "benefits": ["Natural healing with your own blood", "Minimal downtime", "Low risk - no allergic reaction", "Outpatient procedure in 30-45 minutes", "Alternative to surgery"], "recovery": "24-48 hours rest", "hospitalStay": "Outpatient", "icon": "💉", "seoKeywords": "PRP therapy hyderabad, platelet rich plasma injection, knee PRP"},
    {"id": "viscosupplementation", "name": "Viscosupplementation (Hyaluronic Acid)", "category": "Regenerative Medicine", "description": "Gel injections to lubricate and cushion knee joint in arthritis.", "benefits": ["Lubricates arthritic joints", "Reduces pain and improves function", "Non-surgical option", "Quick outpatient procedure", "Can delay need for surgery"], "recovery": "Immediate", "hospitalStay": "Outpatient", "icon": "💉", "seoKeywords": "viscosupplementation hyderabad, knee gel injection, joint lubrication"},
    {"id": "joint-injections", "name": "Joint Injections (Corticosteroid)", "category": "Conservative Treatment", "description": "Steroid injections into joints for pain relief.", "benefits": ["Rapid pain relief within days", "Precise ultrasound-guided delivery", "Quick office procedure", "Diagnostic value", "Outpatient procedure"], "recovery": "Immediate", "hospitalStay": "Outpatient", "icon": "💉", "seoKeywords": "joint injection hyderabad, steroid injection knee, cortisone shot"},
    {"id": "minimally-invasive-knee-replacement", "name": "Minimally Invasive Knee Replacement", "category": "Joint Replacement", "description": "Knee replacement through smaller incision with less tissue disruption.", "benefits": ["Smaller incision (8-10cm vs 20-25cm)", "Muscle sparing - quadriceps not cut", "Less blood loss", "Less pain after surgery", "Faster recovery - walking same day"], "recovery": "4-6 weeks to normal activities", "hospitalStay": "2-3 days", "icon": "🦵", "seoKeywords": "minimally invasive knee replacement, MIS TKR, rapid recovery"},
    {"id": "robotic-hip-replacement", "name": "Robotic/Computer-Navigated Hip Replacement", "category": "Joint Replacement", "description": "Hip replacement with robotic assistance for precise implant positioning.", "benefits": ["Precision placement within 1-2 degrees", "Reduced dislocation risk", "Better leg length accuracy", "Personalized surgery based on your anatomy"], "recovery": "4-6 weeks", "hospitalStay": "2-3 days", "icon": "🤖", "seoKeywords": "robotic hip replacement hyderabad, computer navigated THR"},
]

@api_router.post("/admin/cms/migrate-all-content")
async def migrate_all_content():
    """Comprehensive content migration - imports all conditions and treatments to CMS"""
    try:
        created_conditions = 0
        created_treatments = 0
        skipped = 0
        errors = []
        
        # Migrate conditions
        for condition in MIGRATION_CONDITIONS:
            try:
                # Check if already exists
                existing = await db.cms_pages.find_one({"slug": condition["id"]})
                if existing:
                    skipped += 1
                    continue
                
                # Transform to CMS format
                cms_page = {
                    "id": str(uuid.uuid4()),
                    "slug": condition["id"],
                    "type": "condition",
                    "title": f'{condition["name"]} Treatment in Hyderabad',
                    "meta_title": f'{condition["name"]} Treatment Hyderabad | Dr. Harsha Reddy',
                    "meta_description": f'Expert {condition["name"].lower()} treatment in Hyderabad by Dr. B Harsha Vardhana Reddy at Yashoda Hospital. {condition["description"][:100]}',
                    "keywords": condition.get("seoKeywords", "").split(", ") if condition.get("seoKeywords") else [],
                    "content": {
                        "name": condition["name"],
                        "category": condition["category"],
                        "description": condition["description"],
                        "symptoms": condition.get("symptoms", []),
                        "treatments": condition.get("treatments", []),
                        "icon": condition.get("icon", "🦴"),
                        "hero": {
                            "title": f'Expert {condition["name"]} Treatment',
                            "subtitle": f'Comprehensive care for {condition["name"].lower()} with advanced treatment options'
                        }
                    },
                    "status": "published",
                    "created_at": datetime.now(timezone.utc).isoformat(),
                    "updated_at": datetime.now(timezone.utc).isoformat(),
                    "published_at": datetime.now(timezone.utc).isoformat()
                }
                
                await db.cms_pages.insert_one(cms_page)
                created_conditions += 1
                
            except Exception as e:
                errors.append(f"Condition {condition['id']}: {str(e)}")
        
        # Migrate treatments
        for treatment in MIGRATION_TREATMENTS:
            try:
                # Check if already exists
                existing = await db.cms_pages.find_one({"slug": treatment["id"]})
                if existing:
                    skipped += 1
                    continue
                
                # Transform to CMS format
                cms_page = {
                    "id": str(uuid.uuid4()),
                    "slug": treatment["id"],
                    "type": "treatment",
                    "title": f'{treatment["name"]} in Hyderabad',
                    "meta_title": f'{treatment["name"]} Hyderabad | Dr. Harsha Reddy',
                    "meta_description": f'Expert {treatment["name"].lower()} in Hyderabad by Dr. B Harsha Vardhana Reddy. {treatment["description"][:100]}',
                    "keywords": treatment.get("seoKeywords", "").split(", ") if treatment.get("seoKeywords") else [],
                    "content": {
                        "name": treatment["name"],
                        "category": treatment["category"],
                        "description": treatment["description"],
                        "benefits": treatment.get("benefits", []),
                        "procedure": treatment.get("procedure", []),
                        "recovery": treatment.get("recovery", ""),
                        "hospitalStay": treatment.get("hospitalStay", ""),
                        "icon": treatment.get("icon", "🏥"),
                        "hero": {
                            "title": treatment["name"],
                            "subtitle": treatment["description"]
                        }
                    },
                    "status": "published",
                    "created_at": datetime.now(timezone.utc).isoformat(),
                    "updated_at": datetime.now(timezone.utc).isoformat(),
                    "published_at": datetime.now(timezone.utc).isoformat()
                }
                
                await db.cms_pages.insert_one(cms_page)
                created_treatments += 1
                
            except Exception as e:
                errors.append(f"Treatment {treatment['id']}: {str(e)}")
        
        # Get total counts
        total_conditions = await db.cms_pages.count_documents({"type": "condition"})
        total_treatments = await db.cms_pages.count_documents({"type": "treatment"})
        total_pages = await db.cms_pages.count_documents({})
        
        logger.info(f"Content migration complete: {created_conditions} conditions, {created_treatments} treatments created")
        
        return {
            "success": True,
            "message": "Content migration completed successfully",
            "created": {
                "conditions": created_conditions,
                "treatments": created_treatments,
                "total": created_conditions + created_treatments
            },
            "skipped": skipped,
            "totals": {
                "conditions": total_conditions,
                "treatments": total_treatments,
                "all_pages": total_pages
            },
            "errors": errors if errors else None
        }
        
    except Exception as e:
        logger.error(f"Content migration failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Migration failed: {str(e)}")

@api_router.get("/admin/cms/migration-status")
async def get_migration_status():
    """Get current status of CMS content migration"""
    try:
        total_pages = await db.cms_pages.count_documents({})
        conditions = await db.cms_pages.count_documents({"type": "condition"})
        treatments = await db.cms_pages.count_documents({"type": "treatment"})
        blogs = await db.cms_pages.count_documents({"type": "blog"})
        
        # Get list of migrated slugs
        condition_slugs = await db.cms_pages.find({"type": "condition"}, {"slug": 1, "_id": 0}).to_list(100)
        treatment_slugs = await db.cms_pages.find({"type": "treatment"}, {"slug": 1, "_id": 0}).to_list(100)
        
        return {
            "total_pages": total_pages,
            "by_type": {
                "conditions": conditions,
                "treatments": treatments,
                "blogs": blogs
            },
            "migrated_conditions": [c["slug"] for c in condition_slugs],
            "migrated_treatments": [t["slug"] for t in treatment_slugs],
            "target_conditions": len(MIGRATION_CONDITIONS),
            "target_treatments": len(MIGRATION_TREATMENTS),
            "migration_progress": {
                "conditions": f"{conditions}/{len(MIGRATION_CONDITIONS)}",
                "treatments": f"{treatments}/{len(MIGRATION_TREATMENTS)}"
            }
        }
    except Exception as e:
        logger.error(f"Error getting migration status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ============ INDEXNOW SEO INTEGRATION ============

async def submit_to_indexnow(urls: List[str]):
    """Submit URLs to IndexNow for instant search engine indexing"""
    if not INDEXNOW_ENABLED or not urls:
        return {"success": False, "reason": "IndexNow disabled or no URLs"}
    
    try:
        payload = {
            "host": SITE_HOST,
            "key": INDEXNOW_KEY,
            "keyLocation": f"https://{SITE_HOST}/{INDEXNOW_KEY}.txt",
            "urlList": urls
        }
        
        async with httpx.AsyncClient() as client:
            # Submit to IndexNow API (Bing, Yandex, etc.)
            response = await client.post(
                "https://api.indexnow.org/IndexNow",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10.0
            )
            
            if response.status_code in [200, 202]:
                logger.info(f"IndexNow: Successfully submitted {len(urls)} URLs")
                return {"success": True, "urls_submitted": len(urls), "status_code": response.status_code}
            else:
                logger.warning(f"IndexNow: Submission returned status {response.status_code}")
                return {"success": False, "status_code": response.status_code, "response": response.text}
                
    except Exception as e:
        logger.error(f"IndexNow submission error: {str(e)}")
        return {"success": False, "error": str(e)}

@api_router.post("/admin/seo/indexnow/submit")
async def submit_urls_to_indexnow(urls: List[str]):
    """Manually submit URLs to IndexNow for instant indexing"""
    if not urls:
        raise HTTPException(status_code=400, detail="No URLs provided")
    
    # Ensure all URLs are properly formatted
    formatted_urls = []
    for url in urls:
        if not url.startswith("http"):
            url = f"https://{SITE_HOST}{url if url.startswith('/') else '/' + url}"
        formatted_urls.append(url)
    
    result = await submit_to_indexnow(formatted_urls)
    
    # Log the submission
    await db.indexnow_submissions.insert_one({
        "urls": formatted_urls,
        "result": result,
        "submitted_at": datetime.now(timezone.utc).isoformat()
    })
    
    return result

@api_router.post("/admin/seo/indexnow/submit-all-pages")
async def submit_all_pages_to_indexnow():
    """Submit all published CMS pages to IndexNow"""
    try:
        # Get all published CMS pages
        pages = await db.cms_pages.find(
            {"status": "published"},
            {"slug": 1, "type": 1, "_id": 0}
        ).to_list(500)
        
        # Build URLs based on page type
        urls = []
        for page in pages:
            page_type = page.get("type", "")
            slug = page.get("slug", "")
            
            if page_type == "condition":
                urls.append(f"https://{SITE_HOST}/conditions/{slug}")
            elif page_type == "treatment":
                urls.append(f"https://{SITE_HOST}/treatments/{slug}")
            elif page_type == "blog":
                urls.append(f"https://{SITE_HOST}/blog/{slug}")
        
        # Add static pages
        static_pages = [
            f"https://{SITE_HOST}/",
            f"https://{SITE_HOST}/about",
            f"https://{SITE_HOST}/contact",
            f"https://{SITE_HOST}/conditions",
            f"https://{SITE_HOST}/treatments",
            f"https://{SITE_HOST}/blog"
        ]
        urls.extend(static_pages)
        
        # Submit in batches of 10,000 (IndexNow limit)
        batch_size = 10000
        results = []
        for i in range(0, len(urls), batch_size):
            batch = urls[i:i + batch_size]
            result = await submit_to_indexnow(batch)
            results.append(result)
        
        return {
            "success": True,
            "total_urls": len(urls),
            "batches": len(results),
            "results": results
        }
        
    except Exception as e:
        logger.error(f"Error submitting all pages: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/admin/seo/indexnow/status")
async def get_indexnow_status():
    """Get IndexNow integration status and recent submissions"""
    try:
        recent_submissions = await db.indexnow_submissions.find(
            {},
            {"_id": 0}
        ).sort("submitted_at", -1).to_list(10)
        
        total_submissions = await db.indexnow_submissions.count_documents({})
        
        return {
            "enabled": INDEXNOW_ENABLED,
            "key": INDEXNOW_KEY[:8] + "..." if INDEXNOW_KEY else None,
            "host": SITE_HOST,
            "key_file_url": f"https://{SITE_HOST}/{INDEXNOW_KEY}.txt",
            "total_submissions": total_submissions,
            "recent_submissions": recent_submissions
        }
    except Exception as e:
        logger.error(f"Error getting IndexNow status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
