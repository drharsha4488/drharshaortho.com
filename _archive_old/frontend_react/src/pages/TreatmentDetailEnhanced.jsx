import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
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
  AlertTriangle,
  Users,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Heart,
  Activity,
  Loader2
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

// Helper to format slug as title
const slugToTitle = (slug) => 
  slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

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

const TreatmentDetailEnhanced = () => {
  const { slug } = useParams();
  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFAQ, setOpenFAQ] = useState(0);

  useEffect(() => {
    const fetchTreatment = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/cms/treatments/${slug}`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.content) {
            const content = data.content || {};
            const recoveryVal = typeof content.recovery === 'object' ? content.recovery?.timeline || '' : (content.recovery || '');
            setTreatment({
              ...content,
              recovery: recoveryVal,
              slug: data.slug,
              seoTitle: data.title || content.name,
              seoDescription: data.meta_description || content.description,
              seoKeywords: data.keywords?.join(', ') || '',
            });
          } else {
            setTreatment(null);
          }
        } else {
          setTreatment(null);
        }
      } catch (err) {
        console.error('Failed to fetch treatment:', err);
        setTreatment(null);
      }
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

  const hasDetailedContent = !!(treatment.procedureSteps?.length || treatment.faqs?.length);

  // FAQ Schema for SEO
  const faqSchema = treatment.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": treatment.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  } : null;

  return (
    <Layout>
      <SEO 
        title={treatment.seoTitle}
        description={treatment.seoDescription}
        keywords={treatment.seoKeywords}
      />
      <SchemaMarkup type="MedicalTherapy" data={{
        name: treatment.name,
        description: treatment.overview || treatment.description
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
            <Link to="/treatments" className="text-muted-foreground hover:text-primary">Treatments</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{treatment.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section with Image */}
      <section className="relative">
        <div className="absolute inset-0 min-h-[450px] md:h-[400px]">
          <img 
            src={treatment.imageUrl || 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800'} 
            alt={treatment.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 to-charcoal/70" />
        </div>
        <div className="relative container-medical py-12 md:py-24 min-h-[450px] md:min-h-0">
          <div className="max-w-3xl text-white">
            <span className="text-4xl md:text-5xl mb-3 md:mb-4 block">{treatment.icon || '🏥'}</span>
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm rounded-full mb-3 md:mb-4">
              {treatment.category}
            </span>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-semibold mb-3 md:mb-4">
              {treatment.heroTitle || treatment.name}
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8">
              {treatment.heroSubtitle || treatment.overview || treatment.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:brightness-110 text-accent-foreground gap-2">
                  <Calendar className="w-5 h-5" />
                  Book Consultation
                </Button>
              </Link>
              <a href="tel:+919959964567" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 gap-2">
                  <Phone className="w-5 h-5" />
                  Call +91 99599 64567
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      {treatment.statistics?.length > 0 && (
        <section className="bg-primary text-white py-6">
          <div className="container-medical">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {treatment.statistics.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Overview Section */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-6">
              About {treatment.name}
            </h2>
            <div className="prose prose-lg text-muted-foreground">
              {(treatment.overview || treatment.description)?.split('\n\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </div>
            
            {/* Quick Info */}
            {(treatment.hospitalStay || treatment.recovery) && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {treatment.hospitalStay && (
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <Clock className="w-6 h-6 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Hospital Stay</p>
                    <p className="font-semibold text-foreground">{treatment.hospitalStay}</p>
                  </div>
                )}
                {treatment.recovery && (
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <Activity className="w-6 h-6 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Recovery</p>
                    <p className="font-semibold text-foreground">{treatment.recovery}</p>
                  </div>
                )}
                <div className="bg-card rounded-lg p-4 border border-border">
                  <Award className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Specialist</p>
                  <p className="font-semibold text-foreground">Dr. Harsha Reddy</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Who Needs This */}
      {treatment.candidatesFor?.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-medical">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-serif font-semibold text-foreground">
                  Who Needs {treatment.name}?
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {treatment.candidatesFor.map((candidate, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{candidate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Procedure Steps */}
      {(treatment.procedureSteps?.length > 0) && (
        <section className="section-padding">
          <div className="container-medical">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <Stethoscope className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-serif font-semibold text-foreground">
                  The Procedure: Step by Step
                </h2>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30" />
                {treatment.procedureSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-12 pb-6 last:pb-0"
                  >
                    <div className="absolute left-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {step.step || i + 1}
                    </div>
                    <div className="bg-card rounded-lg p-4 border border-border">
                      {step.title && <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>}
                      <p className="text-muted-foreground">{step.description}</p>
                      {step.duration && (
                        <p className="text-sm text-primary mt-2 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {step.duration}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {treatment.benefits?.length > 0 && (
        <section className="section-padding bg-gradient-to-br from-teal-light/30 to-background">
          <div className="container-medical">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-serif font-semibold text-foreground">
                  Benefits of {treatment.name}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {treatment.benefits.map((benefit, i) => {
                  const title = typeof benefit === 'string' ? benefit : benefit.title;
                  const desc = typeof benefit === 'string' ? '' : benefit.description;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground">{title}</span>
                        {desc && <p className="text-sm text-muted-foreground mt-1">{desc}</p>}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recovery Timeline */}
      {treatment.recoveryTimeline?.length > 0 && (
        <section className="section-padding">
          <div className="container-medical">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-serif font-semibold text-foreground">
                  Recovery Timeline
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="text-left p-4 font-semibold text-foreground">Phase</th>
                      <th className="text-left p-4 font-semibold text-foreground">Milestone</th>
                      <th className="text-left p-4 font-semibold text-foreground">Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    {treatment.recoveryTimeline.map((phase, i) => (
                      <tr key={i} className="border-b border-border">
                        <td className="p-4 font-medium text-primary">{phase.phase}</td>
                        <td className="p-4 text-foreground">{phase.milestone}</td>
                        <td className="p-4 text-muted-foreground">{phase.activities}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Risks Section */}
      {treatment.risks?.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-medical">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-amber-500" />
                <h2 className="text-2xl font-serif font-semibold text-foreground">
                  Risks & How We Minimize Them
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                All surgeries carry some risks. Dr. Harsha takes extensive precautions to minimize complications:
              </p>
              <div className="space-y-4">
                {treatment.risks.map((risk, i) => (
                  <div key={i} className="bg-card p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{risk.risk}</span>
                      {risk.percentage && (
                        <span className="text-sm px-2 py-1 bg-amber-100 text-amber-700 rounded">{risk.percentage}</span>
                      )}
                    </div>
                    {risk.prevention && (
                      <p className="text-sm text-muted-foreground">
                        <span className="text-green-600 font-medium">Prevention: </span>
                        {risk.prevention}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {treatment.faqs?.length > 0 && (
        <section className="section-padding">
          <div className="container-medical">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {treatment.faqs.map((faq, i) => (
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

      {/* Why Choose Dr. Harsha */}
      <section className="section-padding bg-charcoal text-white">
        <div className="container-medical">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8 text-center">
              Why Choose Dr. B Harsha Vardhana Reddy?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-xl p-6">
                <Award className="w-10 h-10 text-gold mb-4" />
                <h3 className="text-xl font-semibold mb-3">Expert Credentials</h3>
                <ul className="space-y-2 text-white/80">
                  <li>• DNB Orthopedics with Fellowship in Arthroplasty</li>
                  <li>• MBA in Hospital Administration</li>
                  <li>• 15+ years of surgical experience</li>
                  <li>• 8,000+ successful procedures</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <Building2 className="w-10 h-10 text-gold mb-4" />
                <h3 className="text-xl font-semibold mb-3">World-Class Facility</h3>
                <ul className="space-y-2 text-white/80">
                  <li>• Apollo Hospitals Financial District</li>
                  <li>• State-of-the-art operation theaters</li>
                  <li>• Advanced imaging &amp; diagnostics</li>
                  <li>• Dedicated rehabilitation center</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Conditions */}
      {treatment.relatedConditions?.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-medical">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
                Related Conditions
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {treatment.relatedConditions.map((condSlug) => (
                  <Link
                    key={condSlug}
                    to={`/conditions/${condSlug}`}
                    className="bg-card rounded-lg p-4 border border-border hover:border-primary hover:shadow-md transition-all group"
                  >
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                      {slugToTitle(condSlug)}
                    </h3>
                    <span className="text-primary text-xs font-medium mt-2 inline-flex items-center gap-1">
                      Learn more <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
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
            Ready for {treatment.name}?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Take the first step towards a pain-free life. Schedule your consultation with 
            Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District, Hyderabad.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:brightness-110 text-accent-foreground gap-2">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Button>
            </Link>
            <a href="tel:+919959964567">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
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

export default TreatmentDetailEnhanced;
