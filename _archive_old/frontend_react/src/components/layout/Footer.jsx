import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const quickLinks = [
    { to: '/about', label: 'About Dr. Reddy' },
    { to: '/conditions', label: 'Conditions Treated' },
    { to: '/treatments', label: 'Treatments Offered' },
    { to: '/testimonials', label: 'Patient Testimonials' },
    { to: '/blog', label: 'Medical Blog' },
  ];

  const specializations = [
    'Joint Replacement Surgery',
    'Sports Medicine',
    'Arthroscopic Surgery',
    'Trauma & Fracture Care',
    'Hip & Knee Replacement',
    'Shoulder Surgery',
  ];

  return (
    <footer className="bg-gradient-to-b from-charcoal to-charcoal/95 text-ivory relative overflow-hidden" data-testid="footer">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      
      <motion.div 
        className="container-medical py-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif font-semibold text-lg mb-4 text-white">Dr. B Harsha Vardhana Reddy</h3>
            <p className="text-sm text-ivory/70 mb-5 leading-relaxed">
              Expert orthopedic surgeon with 15+ years of experience in joint replacement, sports medicine, and trauma surgery. 
              MBA in Hospital Administration. Founder of AgileOrtho Healthcare.
            </p>
            <motion.div 
              className="flex items-center gap-3 group"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
                <span className="text-white font-bold">H</span>
              </div>
              <span className="text-sm text-ivory/80 group-hover:text-white transition-colors">Excellence in Orthopedic Care</span>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="group flex items-center gap-2 text-sm text-ivory/70 hover:text-gold transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full group-hover:bg-gold transition-colors" />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif font-semibold text-lg mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <motion.a 
                  href="https://maps.app.goo.gl/8nE3J5ajgmtizEyTA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                  whileHover={{ x: 3 }}
                >
                  <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm text-ivory/70 group-hover:text-ivory transition-colors">Apollo Hospitals, Financial District, Nanakramguda, Hyderabad</span>
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="tel:+919959964567" 
                  className="flex items-center gap-3 group"
                  whileHover={{ x: 3 }}
                >
                  <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Phone className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm text-ivory/70 group-hover:text-gold transition-colors">+91 99599 64567</span>
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="mailto:drharsha4488@gmail.com" 
                  className="flex items-center gap-3 group"
                  whileHover={{ x: 3 }}
                >
                  <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Mail className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm text-ivory/70 group-hover:text-gold transition-colors">drharsha4488@gmail.com</span>
                </motion.a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-gold" />
                </div>
                <span className="text-sm text-ivory/70">Mon - Sat: 9:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </motion.div>

          {/* Specializations */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif font-semibold text-lg mb-4 text-white">Specializations</h3>
            <ul className="space-y-2.5">
              {specializations.map((spec, index) => (
                <motion.li 
                  key={spec}
                  className="flex items-center gap-2 text-sm text-ivory/70"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <span className="w-1.5 h-1.5 bg-accent/60 rounded-full" />
                  {spec}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-12 pt-8 border-t border-ivory/10"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-ivory/50 flex items-center gap-1.5">
              © {currentYear} Dr. B Harsha Vardhana Reddy. All rights reserved.
            </p>
            <p className="text-sm text-ivory/50 flex items-center gap-1.5">
              Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for better healthcare
            </p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
