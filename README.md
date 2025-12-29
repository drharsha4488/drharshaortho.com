# CareConnect - Dr. B Harsha Vardhana Reddy | Best Orthopedic Surgeon in Hyderabad

Professional orthopedic surgery website for Dr. B Harsha Vardhana Reddy - Associate Consultant at Yashoda Hospital, Hitec City, Hyderabad.

## 🏥 About

Dr. B Harsha Vardhana Reddy is a leading orthopedic surgeon with 15+ years of experience, specializing in:
- Joint Replacement Surgery (Knee & Hip)
- Sports Medicine & ACL Reconstruction
- Arthroscopic Surgery
- Trauma & Fracture Care
- Shoulder & Elbow Surgery

**Qualifications:**
- DNB Orthopedics
- D.Ortho (MUHS)
- MBA Hospital Administration (ICFAI Business School)
- Fellowship in Arthroplasty
- Fellowship in Arthroscopy

**Achievements:**
- 8,000+ Happy Patients
- 4,000+ Successful Surgeries
- Founder of AgileOrtho Healthcare

## 🌟 Features

### Comprehensive Content
- **16+ Orthopedic Conditions** - Detailed information with symptoms and treatments
- **12+ Surgical Procedures** - Complete procedure details, benefits, recovery timelines
- **Patient Testimonials** - Real success stories from satisfied patients
- **Medical Blog** - Expert articles on orthopedic health
- **Photo Gallery** - Facility and equipment showcase

### SEO Optimized
- ✅ Schema.org structured data for Physician, Medical Conditions, Treatments
- ✅ Open Graph and Twitter Cards
- ✅ Comprehensive meta tags and descriptions
- ✅ Geo-targeting for Hyderabad location
- ✅ 30+ high-value keywords integrated
- ✅ Mobile-responsive design
- ✅ Fast loading performance

### User Experience
- Professional medical-themed design (Teal, Gold, Charcoal colors)
- Smooth animations with Framer Motion
- Mobile-friendly responsive layout
- WhatsApp quick contact button
- Google Maps integration
- Easy appointment booking system

## 🚀 Tech Stack

### Frontend
- React 19
- Tailwind CSS
- Framer Motion (animations)
- React Router v6
- Axios (API calls)
- shadcn/ui components
- React Helmet Async (SEO)

### Backend
- FastAPI (Python)
- MongoDB
- Motor (Async MongoDB driver)
- Pydantic (data validation)

## 📂 Project Structure

```
/app/
├── backend/
│   ├── server.py              # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── home/         # Homepage sections
│   │   │   ├── layout/       # Header, Footer, Layout
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   ├── SEO.jsx       # SEO component
│   │   │   └── WhatsAppButton.jsx
│   │   ├── pages/
│   │   │   ├── Index.jsx     # Homepage
│   │   │   ├── About.jsx     # About Dr. Reddy
│   │   │   ├── Conditions.jsx # 16+ conditions
│   │   │   ├── Treatments.jsx # 12+ treatments
│   │   │   ├── Blog.jsx      # Medical blog
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Gallery.jsx
│   │   │   └── Contact.jsx   # Appointment booking
│   │   ├── data/
│   │   │   ├── conditions.js # Comprehensive conditions
│   │   │   └── treatments.js # Comprehensive treatments
│   │   ├── lib/
│   │   │   └── api.js        # API client
│   │   ├── utils/
│   │   │   └── seo.js        # SEO utilities
│   │   └── App.js            # Main app with routing
│   ├── public/
│   │   └── images/
│   │       └── dr-harsha-profile.png
│   ├── package.json
│   └── .env                   # Frontend env variables
└── README.md
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js 16+
- Python 3.9+
- MongoDB

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
# Backend runs on port 8001 (managed by supervisor)
```

### Frontend Setup
```bash
cd frontend
yarn install
# Frontend runs on port 3000 (managed by supervisor)
```

### Environment Variables

**Backend (.env)**
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
```

**Frontend (.env)**
```
REACT_APP_BACKEND_URL=https://your-backend-url
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

## 📊 API Endpoints

### Appointments
- `POST /api/appointments` - Create appointment request
- `GET /api/appointments` - List all appointments (admin)

### Testimonials
- `GET /api/testimonials` - Get approved testimonials
- `POST /api/testimonials` - Submit testimonial

### Blog
- `GET /api/blog` - List blog posts
- `GET /api/blog/{slug}` - Get single blog post

### Contact
- `POST /api/contact` - Submit contact form

## 🎯 SEO Features

### Primary Keywords
- best orthopedic surgeon Hyderabad
- knee replacement Hyderabad
- hip replacement surgery
- ACL surgery Hyderabad
- sports injury doctor
- arthroscopy Hyderabad

### Structured Data
- Physician schema with complete profile
- MedicalCondition schema for each condition
- MedicalProcedure schema for each treatment
- LocalBusiness with geo-coordinates
- AggregateRating with 4.9/5 stars

### Meta Tags
- Title, description, keywords for every page
- Open Graph tags for social sharing
- Twitter Cards
- Canonical URLs
- Robots meta tags

## 📱 Contact Information

**Dr. B Harsha Vardhana Reddy**
- **Location:** Yashoda Hospitals, Hi-Tech City, Madhapur, Hyderabad - 500081
- **Phone:** +91 99599 64567
- **Email:** drharsha4488@gmail.com
- **Hours:** Mon-Sat: 9:00 AM - 6:00 PM (Emergency: 24/7)

## 🏆 Key Highlights

- ✅ 15+ years of orthopedic surgery experience
- ✅ 8,000+ satisfied patients
- ✅ 4,000+ successful surgeries
- ✅ 95% surgery success rate
- ✅ Founder of AgileOrtho Healthcare
- ✅ Associate Consultant at Yashoda Hospital

## 📈 Performance

- Fast loading with optimized images
- Mobile-responsive design
- Smooth animations
- SEO score: 95+/100
- Accessibility compliant

## 🔐 Security

- CORS properly configured
- Input validation with Pydantic
- Email validation
- SQL injection prevention
- XSS protection

## 📞 Support

For technical support or inquiries about the website, please contact:
- Email: drharsha4488@gmail.com
- Phone: +91 99599 64567

## 📄 License

© 2025 Dr. B Harsha Vardhana Reddy. All rights reserved.

---

**Built with ❤️ for exceptional orthopedic care in Hyderabad**
