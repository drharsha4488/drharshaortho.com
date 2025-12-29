import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-ivory" data-testid="footer">
      <div className="container-medical py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Dr. B Harsha Vardhana Reddy</h3>
            <p className="text-sm text-ivory/80 mb-4">
              Expert orthopedic surgeon with 15+ years of experience in joint replacement, sports medicine, and trauma surgery. 
              MBA in Hospital Administration. Founder of AgileOrtho Healthcare.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <span className="text-sm">Excellence in Orthopedic Care</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-ivory/80 hover:text-gold transition-colors">About Dr. Reddy</Link></li>
              <li><Link to="/conditions" className="text-sm text-ivory/80 hover:text-gold transition-colors">Conditions Treated</Link></li>
              <li><Link to="/treatments" className="text-sm text-ivory/80 hover:text-gold transition-colors">Treatments Offered</Link></li>
              <li><Link to="/testimonials" className="text-sm text-ivory/80 hover:text-gold transition-colors">Patient Testimonials</Link></li>
              <li><Link to="/blog" className="text-sm text-ivory/80 hover:text-gold transition-colors">Medical Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                <span className="text-sm text-ivory/80">Yashoda Hospitals, Hi-Tech City, Madhapur, Hyderabad</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                <a href="tel:+919959964567" className="text-sm text-ivory/80 hover:text-gold">+91 99599 64567</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <a href="mailto:drharsha4488@gmail.com" className="text-sm text-ivory/80 hover:text-gold">drharsha4488@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                <span className="text-sm text-ivory/80">Mon - Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Clinic Hours */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Specializations</h3>
            <ul className="space-y-2 text-sm text-ivory/80">
              <li>• Joint Replacement Surgery</li>
              <li>• Sports Medicine</li>
              <li>• Arthroscopic Surgery</li>
              <li>• Trauma & Fracture Care</li>
              <li>• Hip & Knee Replacement</li>
              <li>• Shoulder Surgery</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-ivory/20 text-center">
          <p className="text-sm text-ivory/60">
            © {currentYear} Dr. B Harsha Vardhana Reddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
