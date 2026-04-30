import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="section-padding bg-primary text-white" data-testid="cta-section">
      <div className="container-medical">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <Calendar className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Book your consultation today and take the first step towards better orthopedic health.
            Dr. Reddy and his team are here to help you recover and get back to doing what you love.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-accent hover:brightness-110 text-accent-foreground shadow-gold gap-2 group"
                data-testid="cta-book-appointment-btn"
              >
                Book Appointment Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="tel:+919959964567">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-primary hover:bg-white/90 border-white"
                data-testid="cta-call-btn"
              >
                Call +91 99599 64567
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
