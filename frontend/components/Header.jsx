'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_0_rgba(15,23,42,0.04)]'
          : 'bg-white/70 backdrop-blur-md border-b border-transparent'
      }`}
      data-testid="header"
    >
      <div className="container-medical">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" data-testid="logo-link">
            <picture>
              <source srcSet="/images/dr-harsha-logo.webp" type="image/webp" />
              <img
                src="/images/dr-harsha-logo.png"
                alt="Dr. Harsha Orthopedic Centre"
                className="h-10 lg:h-12 w-auto"
                width="170" height="48"
                loading="eager"
              />
            </picture>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    isActive ? 'text-sky-700 bg-sky-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="tel:+919959964567"
              className="hidden xl:inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors px-3 py-2 rounded-full"
              data-testid="header-tel-btn"
            >
              <Phone className="w-4 h-4" />
              <span>+91 99599 64567</span>
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold pl-4 pr-5 py-2.5 rounded-full shadow-[0_8px_24px_-8px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 transition-all duration-300"
              data-testid="whatsapp-inline-btn"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 -mr-2 text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
            data-testid="mobile-menu-button"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav
            className="lg:hidden absolute inset-x-0 top-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-elevated"
            data-testid="mobile-menu"
          >
            <div className="container-medical py-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`flex items-center justify-between px-4 py-3.5 text-[15px] font-medium rounded-xl transition-all duration-200 ${
                      isActive ? 'text-sky-700 bg-sky-50' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                    <span className="text-slate-300">→</span>
                  </Link>
                );
              })}
              <div className="mt-3 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                <a
                  href="tel:+919959964567"
                  className="flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-full font-semibold text-sm"
                >
                  <Phone className="w-4 h-4" /> Call
                </a>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full font-semibold text-sm"
                  data-testid="mobile-whatsapp-inline-btn"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
