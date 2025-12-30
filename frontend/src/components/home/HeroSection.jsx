import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Calendar, CheckCircle, Star, Phone } from 'lucide-react';

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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-2xl" 
        />
      </div>

      <div className="container-medical section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-semibold text-sm rounded-full mb-6 border border-primary/20" 
              data-testid="accepting-patients-badge"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Accepting New Patients
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground leading-tight mb-6"
            >
              Expert Orthopedic Care,{' '}
              <span className="relative">
                <span className="text-primary">Personalized</span>
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-2 left-0 h-3 bg-accent/30 -z-10"
                />
              </span>{' '}
              for You
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl"
            >
              Dr. B Harsha Vardhana Reddy brings over 15 years of expertise in joint
              replacement, sports medicine, and trauma surgery. Currently Associate Consultant
              at Yashoda Hospital Hi-Tech City, Hyderabad, and Founder of AgileOrtho Healthcare.
            </motion.p>

            {/* Credentials */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {credentials.map((cred, i) => (
                <motion.span
                  key={cred}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full hover:bg-secondary transition-colors"
                >
                  <CheckCircle className="w-4 h-4 text-primary" />
                  {cred}
                </motion.span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:brightness-110 text-accent-foreground shadow-lg shadow-accent/25 gap-2 group btn-morph" data-testid="book-appointment-hero-btn">
                  Book Appointment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="tel:+919959964567">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-teal-light gap-2 group">
                  <Phone className="w-4 h-4" />
                  Call +91 99599 64567
                </Button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-6"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="text-center lg:text-left p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <stat.icon className="w-5 h-5 text-primary mb-2 mx-auto lg:mx-0" />
                  <p className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Doctor Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-24 h-24 border-4 border-dashed border-primary/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-dashed border-accent/20 rounded-full"
            />
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/images/dr-harsha-profile-optimized.jpg"
                alt="Dr. B Harsha Vardhana Reddy - Best Orthopedic Surgeon in Hyderabad"
                className="w-full aspect-[4/5] object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              
              {/* Rating Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">4.9/5 (500+ reviews)</p>
              </motion.div>
            </div>

            {/* Floating Card - Top Rated */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-xl border border-border max-w-[220px] backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Top Rated</p>
                  <p className="text-xs text-muted-foreground">Orthopedic Surgeon</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card - Hospital */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="absolute -top-4 -left-4 bg-card p-3 rounded-xl shadow-xl border border-border backdrop-blur-sm"
            >
              <p className="text-xs font-semibold text-primary">Yashoda Hospital</p>
              <p className="text-xs text-muted-foreground">Hi-Tech City, Hyderabad</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
