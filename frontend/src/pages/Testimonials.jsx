import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Star, Users, Award, Heart, Calendar, Phone, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTestimonials } from '@/lib/api';

const fallbackTestimonials = [
  {
    id: '1',
    patient_name: 'Rajesh Kumar',
    age: 62,
    condition: 'Severe Knee Arthritis',
    treatment: 'Total Knee Replacement',
    rating: 5,
    testimonial_text: 'After years of struggling with severe knee pain that made even walking to the kitchen difficult, I consulted Dr. Harsha at Apollo Hospitals. He patiently explained that I needed a total knee replacement and walked me through every step. The surgery went perfectly, and within 3 weeks I was walking without a walker. Today, 6 months later, I climb stairs, go for morning walks, and enjoy playing with my grandchildren. Dr. Harsha truly gave me my life back.',
  },
  {
    id: '2',
    patient_name: 'Priya Sharma',
    age: 28,
    condition: 'ACL Tear (Sports Injury)',
    treatment: 'ACL Reconstruction',
    rating: 5,
    testimonial_text: 'As a competitive badminton player, my ACL tear felt like the end of my career. Dr. Harsha not only reconstructed my ACL arthroscopically but designed a rehabilitation plan specifically for my sport. His understanding of sports medicine is exceptional. I returned to competitive play in 9 months and recently won a state-level tournament. His team was supportive throughout my recovery journey.',
  },
  {
    id: '3',
    patient_name: 'Venkat Rao',
    age: 68,
    condition: 'Hip Arthritis',
    treatment: 'Total Hip Replacement',
    rating: 5,
    testimonial_text: 'I suffered from severe hip pain for 4 years and could barely walk 100 meters. Multiple doctors recommended hip replacement but I was afraid of surgery at my age. Dr. Harsha\'s calm and honest approach gave me confidence. He performed the surgery using a minimally invasive technique, and I was walking the very next day. The pain relief was immediate and dramatic. I now walk 3 km daily!',
  },
  {
    id: '4',
    patient_name: 'Lakshmi Devi',
    age: 55,
    condition: 'Rotator Cuff Tear',
    treatment: 'Arthroscopic Rotator Cuff Repair',
    rating: 5,
    testimonial_text: 'I couldn\'t raise my right arm above shoulder level for months, which made daily activities a nightmare. Dr. Harsha diagnosed a complete rotator cuff tear and performed arthroscopic surgery with just 3 tiny incisions. The recovery was remarkably smooth. Within 3 months I had full range of motion back. What impressed me most was how Dr. Harsha followed up personally after the surgery.',
  },
  {
    id: '5',
    patient_name: 'Arun Reddy',
    age: 35,
    condition: 'Complex Femur Fracture',
    treatment: 'Fracture Fixation (ORIF)',
    rating: 5,
    testimonial_text: 'After a serious bike accident, I had a complex femur fracture that other hospitals said would take 6+ months to heal. Dr. Harsha performed emergency surgery with advanced fixation techniques and I was weight-bearing in just 6 weeks. His surgical precision and post-operative care were outstanding. I\'m now back to my active lifestyle with no limitations whatsoever.',
  },
  {
    id: '6',
    patient_name: 'Sneha Patel',
    age: 32,
    condition: 'Meniscus Tear',
    treatment: 'Arthroscopic Meniscus Repair',
    rating: 5,
    testimonial_text: 'The minimally invasive arthroscopic surgery performed by Dr. Harsha for my meniscus tear was remarkable. I went home the same day, had minimal discomfort, and was back at work within a week. The two tiny scars are barely visible now. Dr. Harsha explained everything before surgery using diagrams, which really eased my anxiety. Highly recommend him for any knee problem!',
  },
  {
    id: '7',
    patient_name: 'Suresh Babu',
    age: 70,
    condition: 'Both Knees Arthritis',
    treatment: 'Bilateral Knee Replacement',
    rating: 5,
    testimonial_text: 'Dr. Harsha replaced both my knees in a single surgery, which saved me from going through the process twice. At 70, I was nervous, but his team\'s preparation was thorough. I was walking with support within 48 hours. Three months post-surgery, I performed my daily prayers sitting cross-legged for the first time in years. My family and I are extremely grateful.',
  },
  {
    id: '8',
    patient_name: 'Kavitha Naidu',
    age: 45,
    condition: 'Frozen Shoulder',
    treatment: 'Shoulder Arthroscopy',
    rating: 5,
    testimonial_text: 'My frozen shoulder made sleeping impossible and I couldn\'t even dress myself. After failed physiotherapy elsewhere, Dr. Harsha performed an arthroscopic capsular release. The improvement was immediate — I could move my shoulder freely the very next day. He also addressed the underlying cause to prevent recurrence. His approach is truly comprehensive.',
  },
  {
    id: '9',
    patient_name: 'Mohammed Farooq',
    age: 42,
    condition: 'Recurring Shoulder Dislocation',
    treatment: 'Bankart Repair (Arthroscopic)',
    rating: 5,
    testimonial_text: 'My shoulder had dislocated 5 times in 2 years, and I lived in constant fear of it happening again. Dr. Harsha performed an arthroscopic Bankart repair that was minimally invasive with just a few hours in the hospital. It\'s been over a year now with zero dislocations. I\'ve returned to swimming and cricket with full confidence. Best decision I ever made.',
  },
  {
    id: '10',
    patient_name: 'Anitha Krishnan',
    age: 58,
    condition: 'Avascular Necrosis (Hip)',
    treatment: 'Total Hip Replacement',
    rating: 5,
    testimonial_text: 'I was diagnosed with avascular necrosis of the hip and was told I\'d need a hip replacement. Dr. Harsha used the latest implant technology and anterior approach, which meant faster recovery. I was discharged in 3 days and driving within 4 weeks. The level of care at Apollo Hospitals under Dr. Harsha\'s team was world-class. I recommend him without any hesitation.',
  },
  {
    id: '11',
    patient_name: 'Ravi Teja',
    age: 25,
    condition: 'Knee Ligament Injury (Sports)',
    treatment: 'Multi-Ligament Knee Reconstruction',
    rating: 5,
    testimonial_text: 'As a football player, I tore my ACL and MCL simultaneously during a match. Dr. Harsha performed a complex multi-ligament reconstruction and carefully guided my rehab. His sports medicine expertise made all the difference — he understood exactly what an athlete needs. I\'m now back on the field and playing at my previous level. Truly grateful for his skill.',
  },
  {
    id: '12',
    patient_name: 'Padma Rao',
    age: 72,
    condition: 'Osteoporotic Spine Fracture',
    treatment: 'Vertebroplasty & Medical Management',
    rating: 5,
    testimonial_text: 'At 72, I had a severe back pain due to an osteoporotic compression fracture. Dr. Harsha managed my case with a combination of a minimally invasive vertebroplasty procedure and a comprehensive osteoporosis treatment plan. The back pain resolved within days. He also started me on bone-strengthening treatment to prevent future fractures. Very thorough and caring doctor.',
  },
];

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. B Harsha Vardhana Reddy",
  "image": "/images/dr-harsha-profile-optimized.jpg",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "450",
    "reviewCount": "380"
  }
};

const testimonialsFAQs = [
  {
    "@type": "Question",
    "name": "What do patients say about Dr. Harsha Reddy?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Dr. Harsha Reddy has a 4.9/5 patient rating based on 450+ reviews. Patients consistently praise his surgical expertise, patient-centric approach, clear communication, and excellent post-operative care."
    }
  },
  {
    "@type": "Question",
    "name": "What is Dr. Harsha's success rate for knee replacement surgery?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Dr. Harsha has a 95%+ success rate for knee replacement surgery with over 2,000 joint replacements performed. Patients report significant pain relief and improved mobility within weeks of surgery."
    }
  }
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 6);

  return (
    <Layout>
      <SEO
        title="Patient Reviews & Success Stories | Dr. B Harsha Vardhana Reddy - Hyderabad"
        description="Read 450+ patient reviews and success stories. Dr. B Harsha Vardhana Reddy has 4.9/5 rating with 8000+ happy patients. Real stories of knee replacement, hip replacement, ACL surgery, and sports injury recovery in Hyderabad."
        keywords="orthopedic surgeon reviews Hyderabad, patient testimonials, knee replacement success stories, ACL surgery reviews, hip replacement patient experience, best doctor reviews Hyderabad, Dr Harsha Reddy reviews"
      />
      <SchemaMarkup type="MedicalClinic" faqs={testimonialsFAQs} />

      {/* Review Schema */}
      <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>

      {/* Breadcrumb */}
      <div className="bg-secondary py-3">
        <div className="container-medical">
          <Breadcrumbs items={[{ name: 'Patient Reviews', path: '/testimonials' }]} />
        </div>
      </div>

      {/* Stats Hero */}
      <section className="py-10 bg-charcoal text-white" data-testid="testimonials-stats">
        <div className="container-medical">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3">Patient Reviews & Success Stories</h1>
            <p className="text-white/80 max-w-2xl mx-auto">Real experiences from real patients who trusted Dr. B Harsha Vardhana Reddy with their orthopedic care.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Star, value: '4.9/5', label: 'Patient Rating' },
              { icon: Users, value: '8,000+', label: 'Patients Treated' },
              { icon: Award, value: '95%', label: 'Success Rate' },
              { icon: Heart, value: '450+', label: 'Google Reviews' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-7 h-7 mx-auto mb-2 text-gold" />
                <p className="text-2xl md:text-3xl font-serif font-bold text-gold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-gradient-to-br from-background to-teal-light" data-testid="testimonials-page">
        <div className="container-medical">
          <SectionHeading
            badge="Patient Testimonials"
            title="Success Stories from Our Patients"
            subtitle="Every testimonial represents a real journey from pain to recovery. These are the stories that motivate Dr. Harsha every day."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border flex flex-col"
                data-testid={`testimonial-${i}`}
              >
                <Quote className="w-8 h-8 text-primary/20 mb-3" />
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star key={index} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-grow">
                  {testimonial.testimonial_text}
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">
                    {testimonial.patient_name}
                    {testimonial.age && <span className="text-xs text-muted-foreground font-normal ml-2">Age {testimonial.age}</span>}
                  </p>
                  <p className="text-xs text-primary mt-1 font-medium">{testimonial.treatment}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.condition}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show More / Less */}
          {testimonials.length > 6 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                data-testid="toggle-testimonials-btn"
              >
                {showAll ? 'Show Less' : `Show All ${testimonials.length} Reviews`}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary/80 text-white" data-testid="testimonials-cta">
        <div className="container-medical text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
            Join 8,000+ Happy Patients
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Whether you need a knee replacement, sports injury treatment, or a second opinion,
            Dr. Harsha provides honest, expert care that puts your well-being first.
            Book your consultation today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:brightness-110 text-accent-foreground gap-2">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Button>
            </Link>
            <a href="tel:+919959964567">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                <Phone className="w-5 h-5" />
                Call +91 99599 64567
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
