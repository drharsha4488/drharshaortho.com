import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  CheckCircle, 
  Clock,
  Calendar,
  Phone,
  ArrowRight,
  Building2,
  Award,
  Loader2
} from 'lucide-react';
import { treatments } from '@/data/treatments';
import { conditionsDetailed } from '@/data/conditionsDetailed';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

// Transform CMS treatment data to match static data format
const transformCmsTreatment = (cmsData) => {
  if (!cmsData || !cmsData.content) return null;
  const content = cmsData.content;
  
  return {
    id: cmsData.slug,
    slug: cmsData.slug,
    name: cmsData.title,
    category: content.category || 'General',
    icon: content.icon || '🏥',
    imageUrl: content.imageUrl || null,
    description: cmsData.meta_description,
    detailedDescription: content.detailedDescription || content.introduction || content.overview,
    benefits: content.benefits || [],
    procedure: content.procedure_steps?.map(s => typeof s === 'string' ? s : (s.description || s.title)) || content.procedure || [],
    recovery: content.recovery,
    hospitalStay: content.hospitalStay,
    seoKeywords: cmsData.keywords?.join(', ') || ''
  };
};

const TreatmentDetail = () => {
  const { slug } = useParams();
  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCms, setIsCms] = useState(false);

  useEffect(() => {
    const fetchTreatment = async () => {
      setLoading(true);
      try {
        // Try to fetch from CMS first
        const response = await fetch(`${API_URL}/api/cms/treatments/${slug}`);
        if (response.ok) {
          const cmsData = await response.json();
          const transformedData = transformCmsTreatment(cmsData);
          if (transformedData) {
            setTreatment(transformedData);
            setIsCms(true);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('CMS fetch failed, using static data:', err.message);
      }
      
      // Fallback to static data
      const staticTreatment = treatments.find(t => t.id === slug);
      setTreatment(staticTreatment);
      setIsCms(false);
      setLoading(false);
    };

    fetchTreatment();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }
  
  if (!treatment) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Treatment Not Found</h1>
            <Link to="/treatments">
              <Button>View All Treatments</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Find related conditions that list this treatment
  const relatedConditions = conditionsDetailed.filter(c => 
    c.relatedTreatments?.includes(treatment.id)
  ).slice(0, 3);

  return (
    <Layout>
      <SEO 
        title={`${treatment.name} in Hyderabad | Dr. B Harsha Vardhana Reddy`}
        description={`Expert ${treatment.name} at Yashoda Hospital Hyderabad. ${treatment.description} Book consultation with Dr. B Harsha Vardhana Reddy.`}
        keywords={treatment.seoKeywords}
      />
      <SchemaMarkup type="MedicalTherapy" data={{
        name: treatment.name,
        description: treatment.detailedDescription
      }} />

      {/* Breadcrumb */}
      <div className="bg-secondary py-3">
        <div className="container-medical">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/treatments" className="text-muted-foreground hover:text-primary">Treatments</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{treatment.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background to-teal-light">
        <div className="container-medical">
          <div className="max-w-4xl">
            <span className="text-4xl mb-4 block">{treatment.icon}</span>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-4">
              {treatment.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6">
              {treatment.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {treatment.detailedDescription}
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-card rounded-lg p-4 border border-border">
                <Clock className="w-6 h-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Hospital Stay</p>
                <p className="font-semibold text-foreground">{treatment.hospitalStay}</p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <Calendar className="w-6 h-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Recovery</p>
                <p className="font-semibold text-foreground">{treatment.recovery}</p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border col-span-2 md:col-span-1">
                <Award className="w-6 h-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Specialist</p>
                <p className="font-semibold text-foreground">Dr. Harsha Reddy</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:brightness-110 text-accent-foreground gap-2">
                  <Calendar className="w-5 h-5" />
                  Book Consultation
                </Button>
              </Link>
              <a href="tel:+919959964567">
                <Button size="lg" variant="outline" className="gap-2">
                  <Phone className="w-5 h-5" />
                  Call +91 99599 64567
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
              Benefits of {treatment.name}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {treatment.benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Procedure Section */}
      <section className="section-padding bg-secondary">
        <div className="container-medical">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
              The Procedure
            </h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30" />
              {treatment.procedure.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-12 pb-6 last:pb-0"
                >
                  <div className="absolute left-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-foreground">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Dr. Harsha */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
              Why Choose Dr. B Harsha Vardhana Reddy?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-charcoal text-ivory rounded-xl p-6">
                <Award className="w-10 h-10 text-gold mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Credentials</h3>
                <ul className="space-y-2 text-ivory/80">
                  <li>• DNB Orthopedics with Fellowship in Arthroplasty</li>
                  <li>• MBA in Hospital Administration</li>
                  <li>• 15+ years of surgical experience</li>
                  <li>• 8,000+ successful procedures</li>
                </ul>
              </div>
              <div className="bg-charcoal text-ivory rounded-xl p-6">
                <Building2 className="w-10 h-10 text-gold mb-4" />
                <h3 className="text-xl font-semibold mb-2">World-Class Facility</h3>
                <ul className="space-y-2 text-ivory/80">
                  <li>• Yashoda Hospital Hi-Tech City</li>
                  <li>• State-of-the-art operation theaters</li>
                  <li>• Advanced imaging & diagnostics</li>
                  <li>• Dedicated rehabilitation center</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Conditions */}
      {relatedConditions.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-medical">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
                Conditions Treated with {treatment.name}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedConditions.map((condition) => (
                  <Link
                    key={condition.id}
                    to={`/conditions/${condition.slug}`}
                    className="bg-card rounded-lg p-4 border border-border hover:border-primary hover:shadow-md transition-all group"
                  >
                    <span className="text-2xl mb-2 block">{condition.icon}</span>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {condition.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {condition.shortDescription}
                    </p>
                    <span className="text-primary text-sm font-medium mt-2 inline-flex items-center gap-1">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-charcoal text-ivory">
        <div className="container-medical text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
            Ready to Get Started with {treatment.name}?
          </h2>
          <p className="text-ivory/80 max-w-2xl mx-auto mb-8">
            Take the first step towards a pain-free life. Schedule your consultation with 
            Dr. B Harsha Vardhana Reddy at Yashoda Hospital, Hi-Tech City, Hyderabad.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:brightness-110 text-accent-foreground gap-2">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Button>
            </Link>
            <a href="tel:+919959964567">
              <Button size="lg" variant="outline" className="border-ivory text-ivory hover:bg-ivory/10 gap-2">
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

export default TreatmentDetail;
