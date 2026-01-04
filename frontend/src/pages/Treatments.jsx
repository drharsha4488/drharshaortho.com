import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';
import { allTreatments, treatmentCategories } from '@/data/treatments';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Calendar, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// FAQ Schema for rich snippets
const treatmentsFAQs = [
  {
    "@type": "Question",
    "name": "What is the best treatment for knee arthritis?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Treatment for knee arthritis starts with conservative options like physical therapy, weight management, and medications. If these fail, injections (steroid, hyaluronic acid, PRP) may help. For severe arthritis, total knee replacement is the gold standard with 95%+ success rate and 15-20 year implant life."
    }
  },
  {
    "@type": "Question",
    "name": "How long does knee replacement surgery take?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Knee replacement surgery typically takes 1-2 hours. With Dr. Harsha's minimally invasive technique, patients walk within 24 hours and are discharged in 2-3 days. Full recovery takes 3-6 months."
    }
  },
  {
    "@type": "Question",
    "name": "Is knee replacement surgery painful?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Modern knee replacement uses advanced pain management techniques including nerve blocks and multi-modal analgesia. Most patients report manageable discomfort, not severe pain. By week 2-3, most patients need only mild pain medications."
    }
  }
];

const Treatments = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTreatments = selectedCategory === 'All' 
    ? allTreatments 
    : allTreatments.filter(t => t.category === selectedCategory);

  return (
    <Layout>
      <SEO 
        title="Orthopedic Surgery & Treatments in Hyderabad | Dr. B Harsha Vardhana Reddy"
        description="Expert knee replacement, hip replacement, ACL reconstruction, shoulder arthroscopy, and all orthopedic surgeries in Hyderabad. Minimally invasive techniques, 15+ years experience."
        keywords="knee replacement Hyderabad, hip replacement surgery, ACL reconstruction, arthroscopy Hyderabad, joint replacement surgeon, sports surgery, fracture treatment, orthopedic surgery Hyderabad"
      />
      <SchemaMarkup type="MedicalClinic" faqs={treatmentsFAQs} />
      
      {/* Breadcrumb with Schema */}
      <div className="bg-secondary py-3">
        <div className="container-medical">
          <Breadcrumbs items={[{ name: 'Treatments', path: '/treatments' }]} />
        </div>
      </div>
        </div>
      </div>
      
      <section className="section-padding bg-gradient-to-br from-background to-teal-light" data-testid="treatments-page">
        <div className="container-medical">
          <SectionHeading
            badge="Our Treatments"
            title="Advanced Orthopedic Surgery & Procedures in Hyderabad"
            subtitle="State-of-the-art surgical treatments using latest minimally invasive techniques. 4,000+ successful surgeries with excellent outcomes and faster recovery."
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {treatmentCategories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                className={selectedCategory === category ? 'bg-primary text-white' : ''}
                data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Treatments Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTreatments.map((treatment, i) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/treatments/${treatment.id}`}
                  className="block bg-card rounded-xl overflow-hidden shadow-md border border-border hover:border-primary hover:shadow-xl transition-all group h-full"
                  data-testid={`treatment-${treatment.id}`}
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={treatment.imageUrl} 
                      alt={treatment.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 text-primary text-xs font-medium rounded-full">
                      {treatment.category}
                    </span>
                    <div className="absolute bottom-3 left-3 text-4xl">{treatment.icon}</div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-5">
                    <h3 className="font-serif font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                      {treatment.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {treatment.description}
                    </p>
                    
                    {/* Quick Info */}
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{treatment.recovery}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{treatment.hospitalStay}</span>
                      </div>
                    </div>

                    {/* Key Benefits Preview */}
                    <div className="space-y-1.5 mb-4">
                      {treatment.benefits?.slice(0, 2).map((benefit, idx) => {
                        // Handle both string and object benefit formats
                        const benefitText = typeof benefit === 'string' ? benefit : benefit.title || benefit.description;
                        return (
                          <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{benefitText}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Learn More Link */}
                    <div className="flex items-center text-primary text-sm font-medium pt-2 border-t border-border/50">
                      View Details <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-charcoal rounded-2xl p-8 md:p-12 text-center text-ivory"
          >
            <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
              Why Choose Dr. B Harsha Vardhana Reddy?
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8 max-w-4xl mx-auto">
              <div>
                <div className="text-4xl font-serif font-bold text-gold mb-2">15+</div>
                <p className="text-sm">Years Experience</p>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-gold mb-2">4,000+</div>
                <p className="text-sm">Successful Surgeries</p>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-gold mb-2">95%</div>
                <p className="text-sm">Success Rate</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link to="/contact">
                <Button size="lg" className="bg-accent text-accent-foreground hover:brightness-110">
                  Schedule Consultation
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-ivory text-ivory hover:bg-ivory/10">
                  Meet Dr. Reddy
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Treatments;
