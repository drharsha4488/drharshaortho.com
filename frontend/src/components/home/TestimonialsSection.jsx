import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Star } from 'lucide-react';
import { getTestimonials } from '@/lib/api';

// Fallback testimonials if API returns empty
const fallbackTestimonials = [
  {
    id: '1',
    patient_name: 'Rajesh Kumar',
    condition: 'Knee Pain',
    treatment: 'Total Knee Replacement',
    rating: 5,
    testimonial_text: 'Dr. Reddy performed my knee replacement surgery, and I am extremely satisfied with the results. His expertise and care during the recovery process were exceptional.',
  },
  {
    id: '2',
    patient_name: 'Priya Sharma',
    condition: 'Sports Injury',
    treatment: 'ACL Reconstruction',
    rating: 5,
    testimonial_text: 'As an athlete, I was worried about my career after my ACL injury. Dr. Reddy\'s surgical skills and post-op guidance helped me return to sports stronger than before.',
  },
  {
    id: '3',
    patient_name: 'Venkat Rao',
    condition: 'Hip Arthritis',
    treatment: 'Hip Replacement',
    rating: 5,
    testimonial_text: 'I suffered from severe hip pain for years. Dr. Reddy\'s expertise in hip replacement surgery changed my life. I can now walk pain-free and enjoy daily activities.',
  },
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        if (data && data.length > 0) {
          setTestimonials(data.slice(0, 3));
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
    <section className="section-padding bg-gradient-to-br from-background to-teal-light" data-testid="testimonials-section">
      <div className="container-medical">
        <SectionHeading
          badge="Patient Stories"
          title="What Our Patients Say"
          subtitle="Real experiences from patients who have received exceptional orthopedic care."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-md border border-border"
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
                <p className="text-xs text-muted-foreground">{testimonial.treatment}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
