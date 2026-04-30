'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronRight, MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/data';

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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/98 backdrop-blur-md shadow-lg border-b border-border/50'
                   : 'bg-white/95 backdrop-blur-sm border-b border-border'
      }`}
      data-testid="header"
    >
      <div className="container-medical">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" data-testid="logo-link">
            <picture>
              <source srcSet="/images/dr-harsha-logo.webp" type="image/webp" />
              <img
                src="/images/dr-harsha-logo.png"
                alt="Dr. Harsha Orthopedic Centre Logo"
                className="h-12 lg:h-14 w-auto"
                width="170" height="56"
                loading="eager"
              />
            </picture>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+919959964567" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>+91 99599 64567</span>
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 shadow-md"
              data-testid="book-appointment-btn"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
            data-testid="mobile-menu-button"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden border-t border-border py-4" data-testid="mobile-menu">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive ? 'text-primary bg-primary/5 border-l-2 border-primary' : 'text-foreground hover:bg-teal-light hover:pl-6'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="px-4 py-3 mt-2 border-t border-border flex flex-col gap-3">
              <a href="tel:+919959964567" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                <Phone className="w-4 h-4" /> +91 99599 64567
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 text-white font-semibold px-4 py-3 rounded-full"
                data-testid="mobile-book-appointment-btn"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
