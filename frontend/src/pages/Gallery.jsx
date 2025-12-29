import React from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Hospital, Stethoscope, Activity, Users, Award, Building2 } from 'lucide-react';

const galleryItems = [
  { id: 1, title: 'Advanced Operation Theater', icon: Hospital, color: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 2, title: 'Robotic Surgery System', icon: Activity, color: 'bg-purple-100', iconColor: 'text-purple-600' },
  { id: 3, title: 'Patient Consultation Room', icon: Users, color: 'bg-green-100', iconColor: 'text-green-600' },
  { id: 4, title: 'Arthroscopy Equipment', icon: Stethoscope, color: 'bg-teal-100', iconColor: 'text-teal-600' },
  { id: 5, title: 'Recovery & Physiotherapy', icon: Activity, color: 'bg-orange-100', iconColor: 'text-orange-600' },
  { id: 6, title: 'Modern Diagnostic Center', icon: Hospital, color: 'bg-red-100', iconColor: 'text-red-600' },
  { id: 7, title: 'Yashoda Hospital Facade', icon: Building2, color: 'bg-indigo-100', iconColor: 'text-indigo-600' },
  { id: 8, title: 'Award Winning Care', icon: Award, color: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  { id: 9, title: 'Medical Team', icon: Users, color: 'bg-pink-100', iconColor: 'text-pink-600' },
];

const Gallery = () => {
  return (
    <Layout>
      <SEO 
        title="Orthopedic Surgery Facilities - State-of-the-Art Equipment | Dr. B Harsha Vardhana Reddy"
        description="View our state-of-the-art orthopedic surgery facilities at Yashoda Hospital Hitec City. Advanced robotic systems, modern operation theaters, and patient care facilities in Hyderabad."
        keywords="orthopedic surgery facilities, Yashoda Hospital Hitec City, robotic surgery equipment, modern operation theater, orthopedic equipment Hyderabad, surgical facilities"
      />
      
      <section className="section-padding bg-gradient-to-br from-background to-teal-light" data-testid="gallery-page">
        <div className="container-medical">
          <SectionHeading
            badge="Our Facilities"
            title="State-of-the-Art Orthopedic Surgery Center"
            subtitle="Experience world-class orthopedic care at Yashoda Hospital Hitec City. Our advanced facilities include robotic surgery systems, modern operation theaters, and comprehensive patient care amenities."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, i) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`group relative ${item.color} rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border aspect-video flex flex-col items-center justify-center p-6`}
                  data-testid={`gallery-item-${i}`}
                >
                  <IconComponent className={`w-16 h-16 ${item.iconColor} mb-4`} />
                  <p className="text-center font-semibold text-foreground">{item.title}</p>
                  <div className="mt-2 px-3 py-1 bg-white/80 rounded-full">
                    <span className="text-xs text-muted-foreground">Yashoda Hospital</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Hospital Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            <div className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
              <Hospital className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-xl text-foreground mb-2">
                Advanced Infrastructure
              </h3>
              <p className="text-sm text-muted-foreground">
                Modern operation theaters equipped with latest technology for minimally invasive surgeries
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
              <Activity className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-xl text-foreground mb-2">
                Robotic Surgery
              </h3>
              <p className="text-sm text-muted-foreground">
                State-of-the-art robotic systems for precision knee and hip replacements with better outcomes
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-xl text-foreground mb-2">
                Expert Team
              </h3>
              <p className="text-sm text-muted-foreground">
                Experienced medical professionals dedicated to providing exceptional orthopedic care
              </p>
            </div>
          </motion.div>

          {/* Yashoda Hospital Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-charcoal rounded-2xl p-8 md:p-12 text-center text-ivory"
          >
            <Building2 className="w-16 h-16 mx-auto mb-4 text-gold" />
            <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
              Yashoda Hospital Hi-Tech City
            </h3>
            <p className="text-lg mb-6 text-ivory/90 max-w-2xl mx-auto">
              A premier multi-specialty hospital in Hyderabad with over 600 beds, advanced diagnostic facilities, 
              and a dedicated orthopedic department led by Dr. B Harsha Vardhana Reddy.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/contact">
                <button className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:brightness-110 transition-all font-medium">
                  Visit Us
                </button>
              </a>
              <a href="tel:+919959964567">
                <button className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all font-medium border border-white/30">
                  Call +91 99599 64567
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
