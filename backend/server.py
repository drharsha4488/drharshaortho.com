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
                except:
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
                except:
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
                    f"Recovery Timeline",
                    f"Cost and Insurance",
                    f"Why Choose Dr. Harsha?",
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
