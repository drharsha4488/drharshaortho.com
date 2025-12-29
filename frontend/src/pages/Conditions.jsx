import React from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Activity } from 'lucide-react';

const conditions = [
  {
    name: 'Osteoarthritis',
    description: 'Degenerative joint disease causing pain and stiffness in knees, hips, and other joints.',
    icon: '🦴',
  },
  {
    name: 'Sports Injuries',
    description: 'ACL tears, meniscus damage, rotator cuff tears, and other athletic injuries.',
    icon: '🏃',
  },
  {
    name: 'Fractures & Trauma',
    description: 'Complex fractures, dislocations, and traumatic orthopedic injuries.',
    icon: '🪼',
  },
  {
    name: 'Shoulder Problems',
    description: 'Frozen shoulder, impingement syndrome, rotator cuff injuries.',
    icon: '💪',
  },
  {
    name: 'Hip Disorders',
    description: 'Hip arthritis, labral tears, femoroacetabular impingement (FAI).',
    icon: '🤴',
  },
  {
    name: 'Knee Pain',
    description: 'Meniscal tears, ligament injuries, patellofemoral syndrome.',
    icon: '🦵',
  },
  {
    name: 'Back & Spine',
    description: 'Disc herniation, spinal stenosis, vertebral fractures.',
    icon: '👍',
  },
  {
    name: 'Pediatric Orthopedics',
    description: 'Growth plate injuries, congenital deformities, developmental disorders.',
    icon: '👶',
  },
];

const Conditions = () => {
  return (
    <Layout>
      <section className="section-padding bg-gradient-to-br from-background to-teal-light" data-testid="conditions-page">
        <div className="container-medical">
          <SectionHeading
            badge="Conditions We Treat"
            title="Comprehensive Orthopedic Conditions"
            subtitle="Dr. B Harsha Vardhana Reddy specializes in treating a wide range of orthopedic conditions with advanced surgical and non-surgical methods."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {conditions.map((condition, i) => (
              <motion.div
                key={condition.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border"
                data-testid={`condition-${condition.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="text-4xl mb-4">{condition.icon}</div>
                <h3 className="font-serif font-semibold text-lg text-foreground mb-2">
                  {condition.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {condition.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-card rounded-xl p-8 shadow-md border border-border text-center"
          >
            <Activity className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
              Don't See Your Condition Listed?
            </h3>
            <p className="text-muted-foreground mb-6">
              Dr. Reddy treats many other orthopedic conditions. Contact us to discuss your specific needs.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all"
              data-testid="contact-us-btn"
            >
              Contact Us for More Information
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Conditions;
