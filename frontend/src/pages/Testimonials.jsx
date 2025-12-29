import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Star } from 'lucide-react';
import { getTestimonials } from '@/lib/api';

const fallbackTestimonials = [
  {
    id: '1',
    patient_name: 'Rajesh Kumar',
    condition: 'Knee Pain',
    treatment: 'Total Knee Replacement',
    rating: 5,
    testimonial_text: 'Dr. Reddy performed my knee replacement surgery, and I am extremely satisfied with the results. His expertise and care during the recovery process were exceptional. I can now walk without pain and enjoy my daily activities.',
  },
  {
    id: '2',
    patient_name: 'Priya Sharma',
    condition: 'Sports Injury',
    treatment: 'ACL Reconstruction',
    rating: 5,
    testimonial_text: 'As an athlete, I was worried about my career after my ACL injury. Dr. Reddy\'s surgical skills and post-op guidance helped me return to sports stronger than before. His patient-centric approach made all the difference.',
  },
  {
    id: '3',
    patient_name: 'Venkat Rao',
    condition: 'Hip Arthritis',
    treatment: 'Hip Replacement',
    rating: 5,
    testimonial_text: 'I suffered from severe hip pain for years. Dr. Reddy\'s expertise in hip replacement surgery changed my life. I can now walk pain-free and enjoy daily activities. Highly recommended!',
  },
  {
    id: '4',
    patient_name: 'Lakshmi Devi',
    condition: 'Shoulder Pain',
    treatment: 'Rotator Cuff Repair',
    rating: 5,
    testimonial_text: 'Dr. Reddy is an exceptional surgeon. My shoulder surgery was a complete success, and the recovery was much faster than I expected. His team provided excellent care throughout.',
  },
  {
    id: '5',
    patient_name: 'Arun Reddy',
    condition: 'Fracture',
    treatment: 'Fracture Fixation',
    rating: 5,
    testimonial_text: 'After a serious accident, Dr. Reddy performed complex fracture fixation surgery. His skill and attention to detail ensured perfect healing. I am grateful for his expertise.',
  },
  {
    id: '6',
    patient_name: 'Sneha Patel',
    condition: 'Meniscus Tear',
    treatment: 'Arthroscopic Surgery',
    rating: 5,
    testimonial_text: 'The minimally invasive arthroscopic surgery performed by Dr. Reddy was remarkable. Minimal scarring, quick recovery, and excellent results. Thank you, Doctor!',
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [loading, setLoading] = useState(true);

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

  return (
    <Layout>
      <SEO 
        title="Patient Testimonials - Success Stories | Dr. B Harsha Vardhana Reddy"
        description="Read real patient success stories and reviews. See how Dr. B Harsha Vardhana Reddy has helped 8,000+ patients recover from knee pain, hip problems, ACL tears, and sports injuries in Hyderabad."
        keywords="orthopedic surgeon reviews Hyderabad, patient testimonials, knee replacement success stories, ACL surgery reviews, hip replacement patient experience, best doctor reviews"
      />
      <section className="section-padding bg-gradient-to-br from-background to-teal-light" data-testid="testimonials-page">
        <div className="container-medical">
          <SectionHeading
            badge="Patient Testimonials"
            title="Success Stories from Our Patients"
            subtitle="Read real experiences from patients who have received exceptional orthopedic care from Dr. B Harsha Vardhana Reddy."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border"
                data-testid={`testimonial-${i}`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star key={index} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">
                  "{testimonial.testimonial_text}"
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{testimonial.patient_name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {testimonial.treatment} • {testimonial.condition}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
