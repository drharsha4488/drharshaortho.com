import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import SEO from '@/components/SEO';
import { treatments, treatmentCategories } from '@/data/treatments';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Treatments = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedTreatment, setExpandedTreatment] = useState(null);

  const filteredTreatments = selectedCategory === 'All' 
    ? treatments 
    : treatments.filter(t => t.category === selectedCategory);

  return (
    <Layout>
      <SEO 
        title="Orthopedic Surgery & Treatments in Hyderabad | Dr. B Harsha Vardhana Reddy"
        description="Expert knee replacement, hip replacement, ACL reconstruction, shoulder arthroscopy, and all orthopedic surgeries in Hyderabad. Minimally invasive techniques, 15+ years experience."
        keywords="knee replacement Hyderabad, hip replacement surgery, ACL reconstruction, arthroscopy Hyderabad, joint replacement surgeon, sports surgery, fracture treatment, orthopedic surgery Hyderabad"
      />
      
      <section className="section-padding bg-gradient-to-br from-background to-teal-light" data-testid="treatments-page">
        <div className="container-medical">
          <SectionHeading
            badge="Our Treatments"
            title="Advanced Orthopedic Surgery & Procedures in Hyderabad"
            subtitle="State-of-the-art surgical treatments using latest minimally invasive techniques. 4,000+ successful surgeries with excellent outcomes and faster recovery."
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {treatmentCategories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={selectedCategory === category ? 'bg-primary text-white' : ''}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Treatments List */}
          <div className="space-y-6">
            {filteredTreatments.map((treatment, i) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl p-6 md:p-8 shadow-md border border-border"
                data-testid={`treatment-${treatment.id}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl flex-shrink-0">{treatment.icon}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-serif font-semibold text-2xl text-foreground">
                        {treatment.name}
                      </h3>
                      <span className="px-3 py-1 bg-teal-light text-primary text-xs rounded-full">
                        {treatment.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {treatment.description}
                    </p>
                    
                    {/* Quick Info */}
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Recovery: {treatment.recovery}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>Hospital: {treatment.hospitalStay}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setExpandedTreatment(expandedTreatment === treatment.id ? null : treatment.id)}
                      data-testid={`expand-${treatment.id}`}
                    >
                      {expandedTreatment === treatment.id ? 'Show Less' : 'Learn More'}
                    </Button>
                  </div>
                </div>

                {expandedTreatment === treatment.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-border space-y-6"
                  >
                    {/* Detailed Description */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">About the Procedure:</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {treatment.detailedDescription}
                      </p>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Key Benefits:</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {treatment.benefits?.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Procedure Steps */}
                    {treatment.procedure && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Procedure Overview:</h4>
                        <ol className="space-y-2">
                          {treatment.procedure.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold">
                                {idx + 1}
                              </span>
                              <span className="pt-0.5">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="bg-teal-light rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-foreground">Interested in this treatment?</p>
                        <p className="text-sm text-muted-foreground">Book a consultation with Dr. Reddy</p>
                      </div>
                      <Link to="/contact">
                        <Button className="bg-primary text-white">
                          Book Appointment
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
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
