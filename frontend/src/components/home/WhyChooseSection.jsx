import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Award, Heart, Star, Users } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Experienced Surgeon',
    description: '13+ years of specialized experience in orthopedic surgery with advanced fellowship training.',
  },
  {
    icon: Heart,
    title: 'Patient-Centric Care',
    description: 'Personalized treatment plans tailored to each patient\'s unique needs and recovery goals.',
  },
  {
    icon: Star,
    title: 'Advanced Techniques',
    description: 'Latest minimally invasive surgical methods for faster recovery and better outcomes.',
  },
  {
    icon: Users,
    title: '8,000+ Happy Patients',
    description: 'Trusted by thousands of patients across Hyderabad for quality orthopedic care.',
  },
];

const WhyChooseSection = () => {
  return (
    <section className="section-padding" data-testid="why-choose-section">
      <div className="container-medical">
        <SectionHeading
          badge="Why Choose Us"
          title="Excellence in Orthopedic Care"
          subtitle="Combining expertise, compassion, and cutting-edge technology to deliver the best possible outcomes."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
              data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="w-16 h-16 bg-teal-light rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
