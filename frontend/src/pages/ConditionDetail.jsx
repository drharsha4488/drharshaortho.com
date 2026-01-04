import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  Stethoscope, 
  Syringe,
  Activity,
  Clock,
  ArrowRight,
  Phone,
  Calendar
} from 'lucide-react';
import { getConditionBySlug, getRelatedConditions, allConditionsDetailed } from '@/data/conditionsDetailed';
import { treatments, allTreatments } from '@/data/treatments';

const ConditionDetail = () => {
  const { slug } = useParams();
  const condition = getConditionBySlug(slug);
  
  if (!condition) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Condition Not Found</h1>
            <Link to="/conditions">
              <Button>View All Conditions</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const relatedConditions = getRelatedConditions(condition.id);
  const relatedTreatmentsList = condition.relatedTreatments
    .map(id => treatments.find(t => t.id === id))
    .filter(Boolean);

  // Schema.org FAQ data
  const faqSchema = condition.faqs?.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }));

  return (
    <Layout>
      <SEO 
        title={`${condition.name} Treatment in Hyderabad | Dr. B Harsha Vardhana Reddy`}
        description={condition.metaDescription}
        keywords={condition.seoKeywords}
      />
      <SchemaMarkup 
        type="MedicalCondition"
        data={{
          name: condition.name,
          description: condition.overview,
          possibleTreatment: condition.surgicalTreatments?.map(t => t.name)
        }}
        faqs={faqSchema}
      />

      {/* Breadcrumb */}
      <div className="bg-secondary py-3">
        <div className="container-medical">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/conditions" className="text-muted-foreground hover:text-primary">Conditions</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{condition.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        {/* Hero Image Background */}
        {condition.imageUrl && (
          <div className="absolute inset-0 h-80 overflow-hidden">
            <img 
              src={condition.imageUrl} 
              alt={`${condition.name} Treatment by Dr. Harsha in Hyderabad`}
              className="w-full h-full object-cover"
              loading="eager"
              width="1920"
              height="320"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-background" />
          </div>
        )}
        
        <div className={`section-padding relative ${condition.imageUrl ? 'pt-20' : 'bg-gradient-to-br from-background to-teal-light'}`}>
          <div className="container-medical">
            <div className="max-w-4xl">
              <div className={`flex items-center gap-3 mb-4 ${condition.imageUrl ? 'text-white' : ''}`}>
                <span className="text-4xl">{condition.icon}</span>
                <span className={`inline-block px-3 py-1 ${condition.imageUrl ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'} text-sm rounded-full`}>
                  {condition.category}
                </span>
              </div>
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-6 ${condition.imageUrl ? 'text-white' : 'text-foreground'}`}>
                {condition.name}
              </h1>
              <p className={`text-lg mb-8 ${condition.imageUrl ? 'text-white/90' : 'text-muted-foreground'}`}>
                {condition.overview}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-accent hover:brightness-110 text-accent-foreground gap-2 shadow-lg">
                    <Calendar className="w-5 h-5" />
                    Book Consultation
                  </Button>
                </Link>
                <a href="tel:+919959964567">
                  <Button size="lg" variant="outline" className={`gap-2 ${condition.imageUrl ? 'border-white text-white hover:bg-white/10' : ''}`}>
                    <Phone className="w-5 h-5" />
                    Call +91 99599 64567
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="sticky top-16 lg:top-20 z-40 bg-white border-b border-border shadow-sm">
        <div className="container-medical">
          <nav className="flex overflow-x-auto gap-1 py-2 -mx-4 px-4 scrollbar-hide">
            {['Symptoms', 'Diagnosis', 'Non-Surgical', 'Surgical', 'FAQs'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace('-', '')}`}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary whitespace-nowrap hover:bg-teal-light rounded-lg transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Causes Section */}
      {condition.causes && (
        <section className="section-padding">
          <div className="container-medical">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
                Causes & Risk Factors
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {condition.causes.map((cause, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{cause}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Symptoms Section */}
      <section id="symptoms" className="section-padding bg-secondary">
        <div className="container-medical">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
              Signs & Symptoms
            </h2>
            <div className="space-y-4">
              {condition.symptoms && condition.symptoms.map((symptom, i) => {
                // Handle both string and object symptom formats
                const isString = typeof symptom === 'string';
                const symptomName = isString ? symptom : symptom.name;
                const symptomDesc = isString ? null : symptom.description;
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border"
                  >
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">{symptomName}</h3>
                      {symptomDesc && <p className="text-sm text-muted-foreground">{symptomDesc}</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section id="diagnosis" className="section-padding">
        <div className="container-medical">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
              How We Diagnose
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {condition.diagnosis?.map((item, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border">
                  <Stethoscope className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Non-Surgical Treatments */}
      <section id="nonsurgical" className="section-padding bg-gradient-to-br from-teal-light to-background">
        <div className="container-medical">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">
              Non-Surgical Treatment Options
            </h2>
            <p className="text-muted-foreground mb-8">
              Conservative treatments are often the first line of management. Dr. Reddy emphasizes evidence-based approaches.
            </p>
            
            <div className="space-y-6">
              {condition.nonSurgicalTreatments?.map((treatment, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-6 border border-border shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{treatment.name}</h3>
                      <p className="text-muted-foreground mt-1">{treatment.description}</p>
                    </div>
                    {treatment.link && (
                      <Link to={treatment.link}>
                        <Button variant="outline" size="sm" className="gap-1">
                          Learn More <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                  
                  {treatment.details && (
                    <div className="bg-secondary rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-sm text-foreground mb-2">Protocol Details:</h4>
                      <ul className="space-y-1">
                        {treatment.details.map((detail, j) => (
                          <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    {treatment.duration && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Duration: {treatment.duration}</span>
                      </div>
                    )}
                    {treatment.evidenceLevel && (
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-600" />
                        <span className="text-green-700 font-medium">{treatment.evidenceLevel}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Surgical Treatments */}
      <section id="surgical" className="section-padding">
        <div className="container-medical">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">
              Surgical Treatment Options
            </h2>
            <p className="text-muted-foreground mb-8">
              When conservative treatment fails, surgical intervention may be recommended. Dr. Reddy specializes in minimally invasive techniques.
            </p>
            
            <div className="space-y-6">
              {condition.surgicalTreatments?.map((treatment, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl overflow-hidden border border-border shadow-sm"
                >
                  <div className="bg-charcoal text-ivory p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{treatment.name}</h3>
                        <p className="text-ivory/80 text-sm mt-1">{treatment.description}</p>
                      </div>
                      <Syringe className="w-8 h-8 text-gold flex-shrink-0" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {treatment.indications && (
                      <div className="mb-4">
                        <h4 className="font-medium text-foreground mb-1">When Recommended:</h4>
                        <p className="text-sm text-muted-foreground">{treatment.indications}</p>
                      </div>
                    )}
                    
                    {treatment.procedure && (
                      <div className="mb-4">
                        <h4 className="font-medium text-foreground mb-2">Procedure Steps:</h4>
                        {Array.isArray(treatment.procedure) ? (
                          <ol className="space-y-1 list-decimal list-inside">
                            {treatment.procedure.map((step, j) => (
                              <li key={j} className="text-sm text-muted-foreground">{step}</li>
                            ))}
                          </ol>
                        ) : (
                          <p className="text-sm text-muted-foreground">{treatment.procedure}</p>
                        )}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                      {treatment.recovery && (
                        <div>
                          <span className="text-xs text-muted-foreground">Recovery Time</span>
                          <p className="font-medium text-foreground">{treatment.recovery}</p>
                        </div>
                      )}
                      {treatment.successRate && (
                        <div>
                          <span className="text-xs text-muted-foreground">Success Rate</span>
                          <p className="font-medium text-green-600">{treatment.successRate}</p>
                        </div>
                      )}
                    </div>
                    
                    {treatment.link && (
                      <Link to={treatment.link} className="block mt-4">
                        <Button variant="outline" className="w-full gap-2">
                          Learn More About This Procedure
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Timeline */}
      {condition.recoveryTimeline && (
        <section className="section-padding bg-secondary">
          <div className="container-medical">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
                Recovery Timeline
              </h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30" />
                {condition.recoveryTimeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-12 pb-6 last:pb-0"
                  >
                    <div className="absolute left-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {i + 1}
                    </div>
                    <div className="bg-card rounded-lg p-4 border border-border">
                      <span className="text-sm font-semibold text-primary">{item.phase}</span>
                      <p className="text-foreground mt-1">{item.milestone}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {condition.faqs && condition.faqs.length > 0 && (
        <section id="faqs" className="section-padding">
          <div className="container-medical">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {condition.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group bg-card rounded-lg border border-border overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-secondary transition-colors">
                      <span className="font-medium text-foreground pr-4">{faq.question}</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-4 pb-4 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Content */}
      <section className="section-padding bg-secondary">
        <div className="container-medical">
          <div className="max-w-4xl">
            {/* Related Treatments */}
            {relatedTreatmentsList.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
                  Related Treatments
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedTreatmentsList.map((treatment) => (
                    <Link
                      key={treatment.id}
                      to={`/treatments/${treatment.id}`}
                      className="bg-card rounded-lg p-4 border border-border hover:border-primary hover:shadow-md transition-all group"
                    >
                      <span className="text-2xl mb-2 block">{treatment.icon}</span>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {treatment.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {treatment.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Conditions */}
            {relatedConditions.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
                  Related Conditions
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedConditions.map((cond) => (
                    <Link
                      key={cond.id}
                      to={`/conditions/${cond.slug}`}
                      className="bg-card rounded-lg p-4 border border-border hover:border-primary hover:shadow-md transition-all group"
                    >
                      <span className="text-2xl mb-2 block">{cond.icon}</span>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {cond.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {cond.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-charcoal text-ivory">
        <div className="container-medical text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
            Get Expert Treatment for {condition.name}
          </h2>
          <p className="text-ivory/80 max-w-2xl mx-auto mb-8">
            Dr. B Harsha Vardhana Reddy provides comprehensive care from diagnosis to recovery. 
            Book your consultation at Yashoda Hospital, Hi-Tech City, Hyderabad.
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

export default ConditionDetail;
