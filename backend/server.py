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
                <p style="color: white; margin: 5px 0 0 0; font-size: 12px;">Yashoda Hospital, Hi-Tech City, Hyderabad</p>
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
        email_response = await asyncio.to_thread(resend.Emails.send, params)
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
- Senior Consultant Orthopedic Surgeon at Yashoda Hospital, Hi-Tech City, Hyderabad
- DNB Orthopedics with Fellowship in Joint Replacement Surgery
- MBA in Hospital Administration
- 15+ years of experience, 8,000+ successful surgeries
- Specializes in: Knee & Hip Replacement, Sports Medicine, Arthroscopy, Trauma Surgery

**Hospital Location:**
Yashoda Hospital, Hi-Tech City, Hyderabad, Telangana, India
Contact: +91 99599 64567

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
1. Call: +91 99599 64567
2. Visit: /contact page on the website
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
        
        return {
            "overview": {
                "total_views": total_views,
                "today_views": today_views,
                "week_views": week_views,
                "month_views": month_views,
                "unique_visitors": unique_sessions
            },
            "top_pages": [{"page": p["_id"], "views": p["views"]} for p in top_pages],
            "daily_views": daily_views,
            "top_referrers": [{"referrer": r["_id"], "count": r["count"]} for r in top_referrers],
            "engagement": {
                "total_chats": total_chats,
                "recent_chats": recent_chats
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
