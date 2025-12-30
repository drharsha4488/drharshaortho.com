import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import ScrollToTop from '@/components/ScrollToTop';
import './App.css';

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Lazy load pages for better performance
const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Conditions = lazy(() => import('./pages/Conditions'));
const ConditionDetail = lazy(() => import('./pages/ConditionDetail'));
const Treatments = lazy(() => import('./pages/Treatments'));
const TreatmentDetail = lazy(() => import('./pages/TreatmentDetailEnhanced'));
const Admin = lazy(() => import('./pages/Admin'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const SEOLandingPage = lazy(() => import('./pages/SEOLandingPage'));
const CMSPage = lazy(() => import('./pages/CMSPage'));

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <ScrollToTop />
          <Toaster />
          <Sonner />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/conditions" element={<Conditions />} />
              <Route path="/conditions/:slug" element={<ConditionDetail />} />
              <Route path="/treatments" element={<Treatments />} />
              <Route path="/treatments/:slug" element={<TreatmentDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              
              {/* SEO Landing Pages - High Volume Keywords */}
              <Route path="/best-orthopedic-surgeon-hyderabad" element={<SEOLandingPage />} />
              <Route path="/robotic-knee-replacement-hyderabad" element={<SEOLandingPage />} />
              <Route path="/knee-replacement-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/hip-replacement-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/sports-injury-treatment-hyderabad" element={<SEOLandingPage />} />
              <Route path="/orthopedic-doctor-near-me-hyderabad" element={<SEOLandingPage />} />
              
              {/* Location-Based SEO Pages */}
              <Route path="/knee-replacement-surgeon-madhapur" element={<SEOLandingPage />} />
              <Route path="/orthopedic-doctor-gachibowli" element={<SEOLandingPage />} />
              <Route path="/hip-replacement-surgeon-kondapur" element={<SEOLandingPage />} />
              <Route path="/sports-injury-doctor-kukatpally" element={<SEOLandingPage />} />
              <Route path="/joint-replacement-jubilee-hills" element={<SEOLandingPage />} />
              <Route path="/knee-pain-treatment-secunderabad" element={<SEOLandingPage />} />
              <Route path="/shoulder-specialist-begumpet" element={<SEOLandingPage />} />
              <Route path="/arthritis-treatment-miyapur" element={<SEOLandingPage />} />
              <Route path="/fracture-treatment-ameerpet" element={<SEOLandingPage />} />
              <Route path="/acl-surgery-sr-nagar" element={<SEOLandingPage />} />
              
              {/* Procedure Cost Pages */}
              <Route path="/partial-knee-replacement-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/acl-surgery-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/shoulder-arthroscopy-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/knee-arthroscopy-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/hip-arthroscopy-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/spine-surgery-cost-hyderabad" element={<SEOLandingPage />} />
              
              {/* Condition-Specific SEO Pages */}
              <Route path="/knee-pain-treatment-hyderabad" element={<SEOLandingPage />} />
              <Route path="/back-pain-treatment-hyderabad" element={<SEOLandingPage />} />
              <Route path="/shoulder-pain-treatment-hyderabad" element={<SEOLandingPage />} />
              <Route path="/hip-pain-treatment-hyderabad" element={<SEOLandingPage />} />
              <Route path="/ligament-injury-treatment-hyderabad" element={<SEOLandingPage />} />
              <Route path="/meniscus-tear-treatment-hyderabad" element={<SEOLandingPage />} />
              <Route path="/rotator-cuff-tear-treatment-hyderabad" element={<SEOLandingPage />} />
              <Route path="/cartilage-injury-treatment-hyderabad" element={<SEOLandingPage />} />
              
              {/* Extended Location-Based SEO Pages */}
              <Route path="/orthopedic-surgeon-banjara-hills" element={<SEOLandingPage />} />
              <Route path="/knee-doctor-somajiguda" element={<SEOLandingPage />} />
              <Route path="/hip-surgery-ameerpet" element={<SEOLandingPage />} />
              <Route path="/sports-injury-treatment-punjagutta" element={<SEOLandingPage />} />
              <Route path="/knee-replacement-kompally" element={<SEOLandingPage />} />
              <Route path="/orthopedic-doctor-bowenpally" element={<SEOLandingPage />} />
              <Route path="/joint-pain-malkajgiri" element={<SEOLandingPage />} />
              <Route path="/orthopedic-surgeon-uppal" element={<SEOLandingPage />} />
              <Route path="/knee-pain-lb-nagar" element={<SEOLandingPage />} />
              <Route path="/hip-replacement-dilsukhnagar" element={<SEOLandingPage />} />
              <Route path="/orthopedic-doctor-mehdipatnam" element={<SEOLandingPage />} />
              <Route path="/knee-surgery-tolichowki" element={<SEOLandingPage />} />
              <Route path="/sports-medicine-attapur" element={<SEOLandingPage />} />
              <Route path="/joint-replacement-shamshabad" element={<SEOLandingPage />} />
              <Route path="/orthopedic-surgeon-charminar" element={<SEOLandingPage />} />
              <Route path="/knee-doctor-nampally" element={<SEOLandingPage />} />
              
              {/* Additional Procedure Cost Pages */}
              <Route path="/revision-knee-replacement-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/bilateral-knee-replacement-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/unicompartmental-knee-replacement-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/meniscus-surgery-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/rotator-cuff-surgery-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/bankart-repair-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/pcl-reconstruction-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/total-shoulder-replacement-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/ankle-arthroscopy-cost-hyderabad" element={<SEOLandingPage />} />
              <Route path="/cartilage-restoration-cost-hyderabad" element={<SEOLandingPage />} />
              
              {/* Sports-Specific Injury Pages */}
              <Route path="/cricket-injuries-treatment-hyderabad" element={<SEOLandingPage />} />
              <Route path="/football-injuries-treatment-hyderabad" element={<SEOLandingPage />} />
              <Route path="/badminton-injuries-treatment-hyderabad" element={<SEOLandingPage />} />
              <Route path="/tennis-injuries-treatment-hyderabad" element={<SEOLandingPage />} />
              <Route path="/running-injuries-treatment-hyderabad" element={<SEOLandingPage />} />
              <Route path="/gym-injuries-treatment-hyderabad" element={<SEOLandingPage />} />
              
              {/* Age-Specific Orthopedic Pages */}
              <Route path="/pediatric-orthopedic-hyderabad" element={<SEOLandingPage />} />
              <Route path="/young-athlete-orthopedic-hyderabad" element={<SEOLandingPage />} />
              <Route path="/senior-citizen-orthopedic-hyderabad" element={<SEOLandingPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
