import React from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Building2, Award } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    title: 'Modern Hospital Building',
    imageUrl: 'https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?w=800&q=80',
    category: 'Hospital Building'
  },
  {
    id: 2,
    title: 'Advanced Operation Theater',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
    category: 'Surgical Facility'
  },
  {
    id: 3,
    title: 'Hospital Reception & Lobby',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    category: 'Reception'
  },
  {
    id: 4,
    title: 'Surgical Suite',
    imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
    category: 'Operating Theater'
  },
  {
    id: 5,
    title: 'Expert Surgical Team',
    imageUrl: 'https://images.unsplash.com/photo-1640876777002-badf6aee5bcc?w=800&q=80',
    category: 'Surgery'
  },
  {
    id: 6,
    title: 'MRI Diagnostics Center',
    imageUrl: 'https://images.pexels.com/photos/7089619/pexels-photo-7089619.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Diagnostics'
  },
  {
    id: 7,
    title: 'Modern Patient Room',
    imageUrl: 'https://images.unsplash.com/photo-1710074213379-2a9c2653046a?w=800&q=80',
    category: 'Patient Care'
  },
  {
    id: 8,
    title: 'Spacious Hospital Lobby',
    imageUrl: 'https://images.unsplash.com/photo-1586773860363-8ec8703e6aa5?w=800&q=80',
    category: 'Reception'
  },
  {
    id: 9,
    title: 'Hospital Exterior View',
    imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80',
    category: 'Hospital Building'
  },
  {
    id: 10,
    title: 'MRI Scan Analysis',
    imageUrl: 'https://images.pexels.com/photos/4226264/pexels-photo-4226264.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Diagnostics'
  },
  {
    id: 11,
    title: 'Patient Care Facilities',
    imageUrl: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Patient Care'
  },
  {
    id: 12,
    title: 'Reception Area',
    imageUrl: 'https://images.pexels.com/photos/7108325/pexels-photo-7108325.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Reception'
  },
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
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border aspect-video"
                data-testid={`gallery-item-${i}`}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold text-lg mb-1">{item.title}</p>
                  <span className="inline-block px-2 py-1 bg-primary/80 text-white text-xs rounded-full">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Hospital Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid md:grid-cols-4 gap-6"
          >
            <div className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-2">500+</div>
              <p className="text-sm text-muted-foreground">Successful Joint Replacements</p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-2">95%</div>
              <p className="text-sm text-muted-foreground">Surgery Success Rate</p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">Emergency Care Available</p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-2">15+</div>
              <p className="text-sm text-muted-foreground">Years of Experience</p>
            </div>
          </motion.div>

          {/* Why Choose Yashoda Hospital */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-card rounded-xl p-8 shadow-md border border-border"
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-6 text-center">
                Why Choose Yashoda Hospital Hi-Tech City?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">JCI Accredited</h4>
                    <p className="text-sm text-muted-foreground">International quality standards and patient safety protocols</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Advanced Technology</h4>
                    <p className="text-sm text-muted-foreground">Robotic surgery systems and latest medical equipment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Expert Surgeons</h4>
                    <p className="text-sm text-muted-foreground">Highly qualified orthopedic specialists with international training</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Comprehensive Care</h4>
                    <p className="text-sm text-muted-foreground">From diagnosis to recovery, complete orthopedic solutions</p>
                  </div>
                </div>
              </div>
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
              Yashoda Hospital Hi-Tech City, Hyderabad
            </h3>
            <p className="text-lg mb-6 text-ivory/90 max-w-2xl mx-auto">
              A premier multi-specialty hospital in Hyderabad with over 600 beds, advanced diagnostic facilities, 
              and a dedicated orthopedic department led by Dr. B Harsha Vardhana Reddy.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-gold mb-1">600+</div>
                <div className="text-sm">Hospital Beds</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-gold mb-1">30+</div>
                <div className="text-sm">Medical Specialties</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-gold mb-1">500+</div>
                <div className="text-sm">Expert Doctors</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/contact">
                <button className="px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:brightness-110 transition-all font-medium">
                  Visit Us
                </button>
              </a>
              <a href="tel:+919959964567">
                <button className="px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all font-medium border border-white/30">
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
