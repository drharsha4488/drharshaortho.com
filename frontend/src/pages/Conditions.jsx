import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import SEO from '@/components/SEO';
import { conditions, conditionCategories } from '@/data/conditions';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Conditions = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedCondition, setExpandedCondition] = useState(null);

  const filteredConditions = selectedCategory === 'All' 
    ? conditions 
    : conditions.filter(c => c.category === selectedCategory);

  return (
    <Layout>
      <SEO 
        title="Orthopedic Conditions We Treat in Hyderabad | Dr. B Harsha Vardhana Reddy"
        description="Expert treatment for knee arthritis, hip AVN, ACL tears, rotator cuff injuries, meniscus tears, shoulder pain, and all orthopedic conditions in Hyderabad. 15+ years experience."
        keywords="orthopedic conditions Hyderabad, knee arthritis treatment, hip pain doctor, ACL tear Hyderabad, shoulder pain treatment, sports injury doctor, joint pain specialist Hyderabad"
      />
      
      <section className="section-padding bg-gradient-to-br from-background to-teal-light" data-testid="conditions-page">
        <div className="container-medical">
          <SectionHeading
            badge="Conditions We Treat"
            title="Comprehensive Orthopedic Conditions Treatment in Hyderabad"
            subtitle="Dr. B Harsha Vardhana Reddy specializes in treating 16+ orthopedic conditions with advanced surgical and non-surgical methods. 15+ years of experience treating 8,000+ patients successfully."
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {conditionCategories.map((category) => (
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

          {/* Conditions Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConditions.map((condition, i) => (
              <motion.div
                key={condition.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border cursor-pointer"
                onClick={() => setExpandedCondition(expandedCondition === condition.id ? null : condition.id)}
                data-testid={`condition-${condition.id}`}
              >
                <div className="text-4xl mb-4">{condition.icon}</div>
                <h3 className="font-serif font-semibold text-xl text-foreground mb-2">
                  {condition.name}
                </h3>
                <p className="text-sm text-primary mb-2">{condition.category}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {condition.description}
                </p>

                {expandedCondition === condition.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <div className="mb-3">
                      <p className="font-semibold text-sm text-foreground mb-2">Common Symptoms:</p>
                      <ul className="space-y-1">
                        {condition.symptoms?.map((symptom, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground mb-2">Treatment Options:</p>
                      <div className="flex flex-wrap gap-1">
                        {condition.treatments?.map((treatment, idx) => (
                          <span key={idx} className="text-xs bg-teal-light text-primary px-2 py-1 rounded-full">
                            {treatment}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-primary rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
              Don't See Your Condition Listed?
            </h3>
            <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
              Dr. Reddy treats many other orthopedic conditions including complex trauma, pediatric orthopedics, and rare joint disorders. Contact us for expert consultation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100" data-testid="book-consultation-btn">
                  Book Consultation Now
                </Button>
              </Link>
              <a href="tel:+919959964567">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Call +91 99599 64567
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Conditions;
