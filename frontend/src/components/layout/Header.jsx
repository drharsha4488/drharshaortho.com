import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Conditions', path: '/conditions' },
    { name: 'Treatments', path: '/treatments' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border" data-testid="header">
      <div className="container-medical">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" data-testid="logo-link">
            <picture>
              <source srcSet="/images/dr-harsha-logo.webp" type="image/webp" />
              <img 
                src="/images/dr-harsha-logo.png" 
                alt="Dr. Harsha Orthopedic Centre Logo"
                className="h-12 lg:h-14 w-auto"
                width="170"
                height="56"
                loading="eager"
              />
            </picture>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-testid={`nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+919959964567" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <Phone className="w-4 h-4" />
              <span>+91 99599 64567</span>
            </a>
            <Link to="/contact">
              <Button className="bg-accent hover:brightness-110 text-accent-foreground shadow-gold" data-testid="book-appointment-btn">
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
            data-testid="mobile-menu-button"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border" data-testid="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-teal-light transition-colors"
                onClick={() => setIsMenuOpen(false)}
                data-testid={`mobile-nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-4 py-2 mt-2 border-t border-border">
              <a href="tel:+919959964567" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-3">
                <Phone className="w-4 h-4" />
                <span>+91 99599 64567</span>
              </a>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-accent hover:brightness-110 text-accent-foreground" data-testid="mobile-book-appointment-btn">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
