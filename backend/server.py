from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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

@api_router.get("/")
async def root():
    return {"message": "CareConnect API - Dr. B Harsha Vardhana Reddy"}


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
        ).sort("created_at", -1).to_list(100)
        
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
        posts = await db.blog_posts.find({}, {"_id": 0}).sort("published_date", -1).to_list(100)
        
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
