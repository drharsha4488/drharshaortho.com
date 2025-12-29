import React from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { ImageIcon } from 'lucide-react';

const Gallery = () => {
  // Placeholder images - in production, these would come from the backend
  const galleryItems = [
    { id: 1, title: 'Modern Surgical Facility', category: 'Facility' },
    { id: 2, title: 'Advanced Operating Room', category: 'Facility' },
    { id: 3, title: 'Patient Consultation Room', category: 'Facility' },
    { id: 4, title: 'Joint Replacement Surgery', category: 'Surgery' },
    { id: 5, title: 'Arthroscopic Procedure', category: 'Surgery' },
    { id: 6, title: 'Post-Surgery Recovery', category: 'Recovery' },
    { id: 7, title: 'Patient Rehabilitation', category: 'Recovery' },
    { id: 8, title: 'Medical Team', category: 'Team' },
    { id: 9, title: 'Consultation with Dr. Reddy', category: 'Team' },
  ];

  return (
    <Layout>
      <section className="section-padding bg-gradient-to-br from-background to-teal-light" data-testid="gallery-page">
        <div className="container-medical">
          <SectionHeading
            badge="Photo Gallery"
            title="Our Facilities & Procedures"
            subtitle="Take a visual tour of our state-of-the-art surgical facilities and see the advanced techniques we use."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border aspect-video"
                data-testid={`gallery-item-${i}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-light to-primary/20 flex flex-col items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-primary/40 mb-4" />
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <span className="mt-2 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-card rounded-xl p-8 shadow-md border border-border text-center"
          >
            <p className="text-muted-foreground">
              For more information about our facilities or to schedule a visit, please contact us.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
