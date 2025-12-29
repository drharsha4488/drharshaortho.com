from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
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

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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
        
        # Get recent appointments
        recent = await db.appointments.find({}, {"_id": 0}).sort("created_at", -1).to_list(5)
        
        return {
            "total": total_appointments,
            "pending": pending_appointments,
            "confirmed": confirmed_appointments,
            "completed": completed_appointments,
            "recent": recent
        }
    except Exception as e:
        logger.error(f"Error fetching stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch statistics")


# Include the router in the main app
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
