import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Joint Replacement',
    description: 'Total and partial knee, hip, and shoulder replacement with minimally invasive techniques.',
    icon: '🦴',
  },
  {
    title: 'Sports Medicine',
    description: 'ACL reconstruction, rotator cuff repair, and sports injury rehabilitation.',
    icon: '🏃',
  },
  {
    title: 'Trauma Care',
    description: 'Expert treatment for fractures, dislocations, and complex orthopedic injuries.',
    icon: '🏥',
  },
  {
    title: 'Arthroscopy',
    description: 'Minimally invasive keyhole surgery for joint problems with faster recovery.',
    icon: '🔬',
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-secondary" data-testid="services-section">
      <div className="container-medical">
        <SectionHeading
          badge="What We Offer"
          title="Comprehensive Orthopedic Care"
          subtitle="From diagnosis to recovery, we provide complete orthopedic solutions using the latest techniques and technologies."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/30"
              data-testid={`service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="font-serif font-semibold text-lg text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {service.description}
              </p>
              <Link
                to="/treatments"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all"
                aria-label={`Learn more about ${service.title} treatment options`}
              >
                View {service.title} details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
