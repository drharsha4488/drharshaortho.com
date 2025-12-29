import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import { conditionsDetailed, conditionCategories } from '@/data/conditionsDetailed';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

const Conditions = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredConditions = selectedCategory === 'All' 
    ? conditionsDetailed 
    : conditionsDetailed.filter(c => c.category === selectedCategory);

  return (
    <Layout>
      <SEO 
        title="Orthopedic Conditions We Treat in Hyderabad | Dr. B Harsha Vardhana Reddy"
        description="Expert treatment for knee arthritis, hip AVN, ACL tears, rotator cuff injuries, meniscus tears, shoulder pain, and all orthopedic conditions in Hyderabad. 15+ years experience."
        keywords="orthopedic conditions Hyderabad, knee arthritis treatment, hip pain doctor, ACL tear Hyderabad, shoulder pain treatment, sports injury doctor, joint pain specialist Hyderabad"
      />
      <SchemaMarkup type="MedicalClinic" />
      
      {/* Breadcrumb */}
      <div className="bg-secondary py-3">
        <div className="container-medical">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Conditions</span>
          </nav>
        </div>
      </div>
      
      <section className="section-padding bg-gradient-to-br from-background to-teal-light" data-testid="conditions-page">
        <div className="container-medical">
          <SectionHeading
            badge="Conditions We Treat"
            title="Comprehensive Orthopedic Conditions Treatment in Hyderabad"
            subtitle="Dr. B Harsha Vardhana Reddy specializes in treating 16+ orthopedic conditions with advanced surgical and non-surgical methods. 15+ years of experience treating 8,000+ patients successfully."
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {conditionCategories.map((category) => (
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

          {/* Conditions Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConditions.map((condition, i) => (
              <motion.div
                key={condition.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/conditions/${condition.slug}`}
                  className="block bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border hover:border-primary group h-full"
                  data-testid={`condition-${condition.id}`}
                >
                  {/* Condition Image */}
                  {condition.imageUrl && (
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={condition.imageUrl} 
                        alt={condition.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-3 left-3 px-2 py-1 bg-white/90 text-primary text-xs font-medium rounded">
                        {condition.category}
                      </span>
                    </div>
                  )}
                  
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{condition.icon}</span>
                      <h3 className="font-serif font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {condition.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {condition.shortDescription}
                    </p>

                    {/* Treatment tags */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {condition.surgicalTreatments?.slice(0, 2).map((treatment, idx) => (
                          <span key={idx} className="text-xs bg-teal-light text-primary px-2 py-0.5 rounded-full">
                            {treatment.name.length > 20 ? treatment.name.substring(0, 20) + '...' : treatment.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Read more link */}
                    <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
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
