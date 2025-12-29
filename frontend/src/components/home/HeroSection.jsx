import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Calendar, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  const stats = [
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Users, value: '8,000+', label: 'Happy Patients' },
    { icon: Calendar, value: '4,000+', label: 'Surgeries' },
  ];

  const credentials = [
    'DNB Orthopedics',
    'MBA Hospital Administration',
    'Fellowship in Arthroplasty',
    'Fellowship in Arthroscopy',
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background via-background to-teal-light overflow-hidden" data-testid="hero-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="container-medical section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-light text-primary text-sm font-medium rounded-full mb-6" data-testid="accepting-patients-badge">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Accepting New Patients
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground leading-tight mb-6">
              Expert Orthopedic Care,{' '}
              <span className="text-primary">Personalized</span> for You
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Dr. B Harsha Vardhana Reddy brings over 15 years of expertise in joint
              replacement, sports medicine, and trauma surgery. Currently Associate Consultant
              at Yashoda Hospital Hi-Tech City, Hyderabad, and Founder of AgileOrtho Healthcare.
            </p>

            {/* Credentials */}
            <div className="flex flex-wrap gap-3 mb-8">
              {credentials.map((cred) => (
                <span
                  key={cred}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <CheckCircle className="w-4 h-4 text-primary" />
                  {cred}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:brightness-110 text-accent-foreground shadow-gold gap-2 group" data-testid="book-appointment-hero-btn">
                  Book Appointment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-teal-light" data-testid="know-more-btn">
                  Know More About Dr. Reddy
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center lg:text-left"
                  data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <stat.icon className="w-5 h-5 text-primary mb-2 mx-auto lg:mx-0" />
                  <p className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Doctor Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/dr-harsha-profile.png"
                alt="Dr. B Harsha Vardhana Reddy - Best Orthopedic Surgeon in Hyderabad"
                className="w-full aspect-[4/5] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border max-w-[200px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-light rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Top Rated</p>
                  <p className="text-xs text-muted-foreground">Orthopedic Surgeon</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
