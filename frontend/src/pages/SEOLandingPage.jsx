import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  CheckCircle, 
  Phone,
  Calendar,
  ArrowRight,
  MapPin,
  Clock,
  Award,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  Building2
} from 'lucide-react';
import { seoLandingPages } from '@/data/seoPages';
import { useState } from 'react';

// FAQ Accordion Component
const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-border rounded-lg overflow-hidden">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 text-left bg-card hover:bg-secondary/50 transition-colors"
    >
      <span className="font-medium text-foreground pr-4">{question}</span>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
      ) : (
        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      )}
    </button>
    {isOpen && (
      <div className="p-4 bg-secondary/30 border-t border-border">
        <p className="text-muted-foreground">{answer}</p>
      </div>
    )}
  </div>
);

const SEOLandingPage = () => {
  const location = useLocation();
  const [openFAQ, setOpenFAQ] = useState(0);
  
  // Get slug from current path (remove leading slash)
  const slug = location.pathname.substring(1);
  
  const page = seoLandingPages.find(p => p.slug === slug);
  
  if (!page) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const content = page.content;

  // FAQ Schema
  const faqSchema = content.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <Layout>
      <SEO 
        title={page.metaTitle}
        description={page.metaDescription}
        keywords={page.keywords}
      />
      <SchemaMarkup type="MedicalBusiness" data={{
        name: "Dr. B Harsha Vardhana Reddy - Orthopedic Surgeon",
        description: page.metaDescription
      }} />
      
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {/* Breadcrumb */}
      <div className="bg-secondary py-3">
        <div className="container-medical">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{page.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-charcoal to-charcoal/90 text-white py-16 md:py-20">
        <div className="container-medical">
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-4"
            >
              {page.heroTitle}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-white/90 mb-8"
            >
              {page.heroSubtitle}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:brightness-110 text-accent-foreground gap-2">
                  <Calendar className="w-5 h-5" />
                  Book Consultation
                </Button>
              </Link>
              <a href="tel:+919959964567">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 gap-2">
                  <Phone className="w-5 h-5" />
                  Call +91 99599 64567
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      {content.stats && (
        <section className="bg-primary text-white py-8">
          <div className="container-medical">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {content.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Introduction */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="max-w-4xl">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.introduction}
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose / Benefits */}
      {content.whyChoose && (
        <section className="section-padding bg-secondary">
          <div className="container-medical">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8 text-center">
              Why Choose Dr. Harsha?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.whyChoose.map((item, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <CheckCircle className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits (for robotic surgery page) */}
      {content.benefits && !content.whyChoose && (
        <section className="section-padding bg-secondary">
          <div className="container-medical">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8 text-center">
              Benefits of {page.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.benefits.map((item, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border">
                  <CheckCircle className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specializations */}
      {content.specializations && (
        <section className="section-padding">
          <div className="container-medical">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8 text-center">
              Our Specializations
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {content.specializations.map((spec, i) => (
                <Link 
                  key={i} 
                  to={spec.link}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary hover:shadow-lg transition-all group"
                >
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {spec.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{spec.description}</p>
                  <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Price Range (for cost pages) */}
      {content.priceRange && (
        <section className="section-padding">
          <div className="container-medical">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8 text-center">
              Cost Packages
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {Object.values(content.priceRange).map((pkg, i) => (
                <div key={i} className={`bg-card rounded-xl p-6 border-2 ${i === 1 ? 'border-primary' : 'border-border'}`}>
                  {i === 1 && (
                    <span className="bg-primary text-white text-xs px-3 py-1 rounded-full mb-4 inline-block">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-semibold text-foreground mb-2">{pkg.label}</h3>
                  <div className="text-2xl font-bold text-primary mb-4">
                    ₹{(pkg.min / 100000).toFixed(1)}-{(pkg.max / 100000).toFixed(1)} Lakhs
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Common Injuries (for sports page) */}
      {content.commonInjuries && (
        <section className="section-padding bg-secondary">
          <div className="container-medical">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8 text-center">
              Common Sports Injuries We Treat
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.commonInjuries.map((injury, i) => (
                <Link 
                  key={i}
                  to={injury.link}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-all"
                >
                  <h3 className="font-semibold text-foreground mb-2">{injury.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{injury.description}</p>
                  <div className="text-xs space-y-1">
                    <p><span className="font-medium">Treatment:</span> {injury.treatment}</p>
                    <p><span className="font-medium">Recovery:</span> {injury.recovery}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location Info (for near me page) */}
      {content.location && (
        <section className="section-padding">
          <div className="container-medical">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8 text-center">
              Our Location
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl text-foreground mb-2">
                      {content.location.hospital}, {content.location.area}
                    </h3>
                    <p className="text-muted-foreground">{content.location.city}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Landmarks:</strong> {content.location.landmarks}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Parking:</strong> {content.location.parking}
                    </p>
                  </div>
                </div>
              </div>
              
              {content.nearbyAreas && (
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-4">Distance from Major Areas</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {content.nearbyAreas.map((area, i) => (
                      <div key={i} className="bg-secondary rounded-lg p-4 text-center">
                        <div className="font-medium text-foreground">{area.area}</div>
                        <div className="text-sm text-muted-foreground">{area.distance}</div>
                        <div className="text-xs text-primary">{area.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {content.faqs && (
        <section className="section-padding bg-secondary">
          <div className="container-medical">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {content.faqs.map((faq, i) => (
                  <FAQItem
                    key={i}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQ === i}
                    onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container-medical text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
            Ready to Get Expert Orthopedic Care?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Schedule your consultation with Dr. B Harsha Vardhana Reddy at Yashoda Hospital, Hi-Tech City, Hyderabad.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-accent hover:brightness-110 text-accent-foreground gap-2">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Button>
            </Link>
            <a href="tel:+919959964567">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SEOLandingPage;
