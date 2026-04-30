import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowUpRight } from 'lucide-react';
import { whatsappUrl } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { to: '/about', label: 'About Dr. Reddy' },
    { to: '/conditions', label: 'Conditions Treated' },
    { to: '/treatments', label: 'Treatments Offered' },
    { to: '/testimonials', label: 'Patient Testimonials' },
    { to: '/blog', label: 'Medical Blog' },
    { to: '/gallery', label: 'Gallery' },
  ];
  const specializations = [
    'Robotic Knee Replacement',
    'Hip Replacement',
    'ACL Reconstruction',
    'Sports Medicine',
    'Arthroscopic Surgery',
    'Trauma & Fracture Care',
  ];

  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden" data-testid="footer">
      {/* Decorative gradient blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-3xl"
      />

      {/* CTA strip */}
      <div className="relative border-b border-white/10">
        <div className="container-medical py-12 lg:py-16">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <p className="eyebrow text-sky-400 mb-3">Book Your Consultation</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                Take the first step toward<br className="hidden sm:block" /> pain-free movement.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-stretch">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold px-6 py-3.5 rounded-full shadow-[0_12px_28px_-8px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                data-testid="footer-whatsapp-btn"
              >
                <MessageCircle className="w-5 h-5" /> Message on WhatsApp
              </a>
              <a
                href="tel:+919959964567"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/15 font-semibold px-6 py-3.5 rounded-full transition-all duration-300"
              >
                <Phone className="w-5 h-5" /> +91 99599 64567
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-medical py-14 lg:py-16 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* About */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center mb-5">
              <span className="text-2xl font-semibold text-white tracking-tight">Dr. Harsha</span>
              <span className="ml-2 text-xs font-medium text-sky-400 uppercase tracking-[0.2em]">Ortho</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              Senior Orthopedic Surgeon at Apollo Hospitals, Financial District, Hyderabad. 15+ years of experience. 3500+ successful surgeries.
            </p>
            <a
              href="https://maps.app.goo.gl/8nE3J5ajgmtizEyTA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-sky-400 transition-colors group"
            >
              View on Google Maps
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="eyebrow text-slate-400 mb-5">Explore</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations */}
          <div className="lg:col-span-3">
            <h3 className="eyebrow text-slate-400 mb-5">Specializations</h3>
            <ul className="space-y-3">
              {specializations.map((spec) => (
                <li key={spec} className="text-sm text-slate-400">{spec}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="eyebrow text-slate-400 mb-5">Visit</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-sky-400 flex-shrink-0" />
                <span className="text-sm text-slate-400 leading-relaxed">
                  Apollo Hospitals,<br /> Financial District,<br /> Nanakramguda, Hyderabad
                </span>
              </li>
              <li>
                <a href="mailto:drharsha4488@gmail.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" /> drharsha4488@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4 text-sky-400 flex-shrink-0" /> Mon–Sat · 9 AM – 5 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {currentYear} Dr. B Harsha Vardhana Reddy · All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            For medical emergencies, dial <a href="tel:108" className="underline hover:text-white">108</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
