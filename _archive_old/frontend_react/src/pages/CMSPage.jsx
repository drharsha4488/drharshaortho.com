import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  CheckCircle, 
  Phone,
  Calendar,
  ChevronDown,
  ChevronUp,
  ArrowLeft
} from 'lucide-react';
import { useCmsPage } from '@/hooks/useCms';

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

const CMSPage = () => {
  const { slug } = useParams();
  const { page, loading, error } = useCmsPage(slug);
  const [openFAQ, setOpenFAQ] = useState(0);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (!page) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const content = page.content || {};
  const hero = content.hero || {};
  const faqs = content.faqs || [];

  return (
    <Layout>
      <SEO 
        title={page.meta_title || page.title}
        description={page.meta_description}
        keywords={(page.keywords || []).join(', ')}
      />

      {/* Breadcrumb */}
      <div className="bg-secondary py-3">
        <div className="container-medical">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            {page.type === 'condition' && (
              <>
                <Link to="/conditions" className="text-muted-foreground hover:text-primary transition-colors">Conditions</Link>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </>
            )}
            {page.type === 'treatment' && (
              <>
                <Link to="/treatments" className="text-muted-foreground hover:text-primary transition-colors">Treatments</Link>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </>
            )}
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
              {hero.title || page.title}
            </motion.h1>
            {hero.subtitle && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-white/90 mb-8"
              >
                {hero.subtitle}
              </motion.p>
            )}
            
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
                  Call Now
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      {content.introduction && (
        <section className="section-padding">
          <div className="container-medical">
            <div className="max-w-4xl">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content.introduction}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Symptoms Section (for conditions) */}
      {content.symptoms && content.symptoms.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-medical">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8">
              Symptoms
            </h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
              {content.symptoms.map((symptom, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{symptom}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section (for treatments) */}
      {content.benefits && content.benefits.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-medical">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8">
              Benefits
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
              {content.benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Treatments Section (for conditions) */}
      {content.treatments && content.treatments.length > 0 && (
        <section className="section-padding">
          <div className="container-medical">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8">
              Treatment Options
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              {content.treatments.map((treatment, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold text-lg text-foreground mb-2">{treatment.name}</h3>
                  <p className="text-muted-foreground">{treatment.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Procedure Steps (for treatments) */}
      {content.procedure_steps && content.procedure_steps.length > 0 && (
        <section className="section-padding">
          <div className="container-medical">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8">
              Procedure Steps
            </h2>
            <div className="max-w-3xl space-y-4">
              {content.procedure_steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recovery Section */}
      {content.recovery && (
        <section className="section-padding bg-primary/5">
          <div className="container-medical">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
                Recovery
              </h2>
              <p className="text-lg text-muted-foreground">{content.recovery}</p>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="section-padding">
          <div className="container-medical">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
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
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-charcoal text-white">
        <div className="container-medical text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with Dr. Harsha to discuss your condition and treatment options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:brightness-110 text-accent-foreground">
                Book Appointment
              </Button>
            </Link>
            <a href="tel:+919959964567">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Call +91 99599 64567
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CMSPage;
