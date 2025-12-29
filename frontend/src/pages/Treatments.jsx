import React from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { CheckCircle } from 'lucide-react';

const treatments = [
  {
    name: 'Total Knee Replacement',
    description: 'Complete knee joint replacement surgery for severe arthritis with advanced computer-navigated techniques.',
    benefits: [
      'Pain-free mobility',
      'Improved quality of life',
      'Minimally invasive approach',
      'Faster recovery time',
    ],
    icon: '🦵',
  },
  {
    name: 'Hip Replacement Surgery',
    description: 'Total or partial hip replacement to restore function and eliminate pain from hip arthritis.',
    benefits: [
      'Restored hip function',
      'Long-lasting results',
      'Reduced pain',
      'Enhanced mobility',
    ],
    icon: '🤴',
  },
  {
    name: 'ACL Reconstruction',
    description: 'Surgical repair of torn anterior cruciate ligament using advanced arthroscopic techniques.',
    benefits: [
      'Knee stability restored',
      'Return to sports',
      'Minimal scarring',
      'Quick rehabilitation',
    ],
    icon: '🏃',
  },
  {
    name: 'Shoulder Arthroscopy',
    description: 'Minimally invasive surgery for rotator cuff tears, labral tears, and shoulder impingement.',
    benefits: [
      'Small incisions',
      'Less post-op pain',
      'Faster healing',
      'Better outcomes',
    ],
    icon: '💪',
  },
  {
    name: 'Fracture Fixation',
    description: 'Expert treatment of complex fractures using plates, screws, and intramedullary nails.',
    benefits: [
      'Precise alignment',
      'Strong fixation',
      'Early mobilization',
      'Reduced complications',
    ],
    icon: '🪼',
  },
  {
    name: 'Sports Injury Treatment',
    description: 'Comprehensive care for athletic injuries including ligament repairs and cartilage restoration.',
    benefits: [
      'Sport-specific rehab',
      'Performance optimization',
      'Injury prevention',
      'Quick return to play',
    ],
    icon: '⚽',
  },
];

const Treatments = () => {
  return (
    <Layout>
      <section className="section-padding bg-gradient-to-br from-background to-teal-light" data-testid="treatments-page">
        <div className="container-medical">
          <SectionHeading
            badge="Our Treatments"
            title="Advanced Surgical Procedures"
            subtitle="State-of-the-art orthopedic treatments using the latest minimally invasive techniques for optimal outcomes."
          />

          <div className="grid lg:grid-cols-2 gap-8">
            {treatments.map((treatment, i) => (
              <motion.div
                key={treatment.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-md border border-border"
                data-testid={`treatment-${treatment.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{treatment.icon}</div>
                  <div>
                    <h3 className="font-serif font-semibold text-xl text-foreground mb-2">
                      {treatment.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {treatment.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-3">Key Benefits:</p>
                  <ul className="space-y-2">
                    {treatment.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Treatments;
