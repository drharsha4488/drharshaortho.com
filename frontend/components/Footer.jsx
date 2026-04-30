import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Heart, MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { to: '/about', label: 'About Dr. Reddy' },
    { to: '/conditions', label: 'Conditions Treated' },
    { to: '/treatments', label: 'Treatments Offered' },
    { to: '/testimonials', label: 'Patient Testimonials' },
    { to: '/blog', label: 'Medical Blog' },
  ];
  const specializations = [
    'Joint Replacement Surgery', 'Sports Medicine', 'Arthroscopic Surgery',
    'Trauma & Fracture Care', 'Hip & Knee Replacement', 'Shoulder Surgery',
  ];

  return (
    <footer className="bg-gradient-to-b from-charcoal to-charcoal/95 text-ivory relative overflow-hidden" data-testid="footer">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container-medical py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* About */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4 text-white">Dr. B Harsha Vardhana Reddy</h3>
            <p className="text-sm text-ivory/70 mb-5 leading-relaxed">
              Expert orthopedic surgeon with 15+ years of experience in joint replacement, sports medicine, and trauma surgery.
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all"
              data-testid="footer-whatsapp-btn"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Consultation
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link href={link.to} className="text-sm text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://maps.app.goo.gl/8nE3J5ajgmtizEyTA" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm text-ivory/70 group-hover:text-ivory transition-colors">Apollo Hospitals, Financial District, Nanakramguda, Hyderabad</span>
                </a>
              </li>
              <li>
                <a href="tel:+919959964567" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Phone className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm text-ivory/70 group-hover:text-gold transition-colors">+91 99599 64567</span>
                </a>
              </li>
              <li>
                <a href="mailto:drharsha4488@gmail.com" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Mail className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm text-ivory/70 group-hover:text-gold transition-colors">drharsha4488@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-gold" />
                </div>
                <span className="text-sm text-ivory/70">Mon - Sat: 9:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Specializations */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4 text-white">Specializations</h3>
            <ul className="space-y-2.5">
              {specializations.map((spec) => (
                <li key={spec} className="flex items-center gap-2 text-sm text-ivory/70">
                  <span className="w-1.5 h-1.5 bg-accent/60 rounded-full" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ivory/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ivory/50">© {currentYear} Dr. B Harsha Vardhana Reddy. All rights reserved.</p>
          <p className="text-sm text-ivory/50 flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for better healthcare
          </p>
        </div>
      </div>
    </footer>
  );
}
