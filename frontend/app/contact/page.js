import Link from 'next/link';
import { MessageCircle, Phone, MapPin, Clock, Mail } from 'lucide-react';
import { whatsappUrl } from '@/lib/data';

export const metadata = {
  title: 'Contact Dr. Harsha | Apollo Hospitals Hyderabad',
  description: 'Contact Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District, Hyderabad. WhatsApp for appointments, phone, email, or visit us.',
  alternates: { canonical: 'https://drharshaortho.com/contact' },
};

export default function ContactPage() {
  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+91 99599 64567', href: 'tel:+919959964567' },
    { icon: MessageCircle, label: 'WhatsApp', value: 'Chat on WhatsApp', href: whatsappUrl() },
    { icon: Mail, label: 'Email', value: 'drharsha4488@gmail.com', href: 'mailto:drharsha4488@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Apollo Hospitals, Financial District, Nanakramguda, Hyderabad 500032', href: 'https://maps.app.goo.gl/8nE3J5ajgmtizEyTA' },
    { icon: Clock, label: 'Timings', value: 'Mon – Sat: 9:00 AM – 5:00 PM', href: null },
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-charcoal to-charcoal/90 text-white py-16">
        <div className="container-medical">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">Contact</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">Contact Us</h1>
          <p className="text-xl text-white/85 max-w-2xl">Get in touch with Dr. Harsha for appointments, queries, and second opinions.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-medical">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-8">Reach Us</h2>
              <div className="space-y-5">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground font-medium mb-0.5">{label}</div>
                      {href ? (
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                          className="text-foreground hover:text-primary transition-colors font-medium">{value}</a>
                      ) : (
                        <span className="text-foreground font-medium">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="mt-10 rounded-xl overflow-hidden border border-border shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4476837745905!2d78.35282837597758!3d17.41675568361661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9368d4a4d497%3A0x46d7e11db7da7490!2sApollo%20Hospitals!5e0!3m2!1sen!2sin!4v1704067200000!5m2!1sen!2sin"
                  width="100%" height="280" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Apollo Hospitals Financial District Hyderabad"
                />
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-8">Book an Appointment</h2>
              <div className="bg-gradient-to-br from-green-50 to-teal-light rounded-2xl p-8 border border-green-200 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-3">WhatsApp Dr. Harsha</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  The fastest way to book an appointment. Send a WhatsApp message and our team will respond within minutes.
                </p>
                <a
                  href={whatsappUrl('Hello Dr. Harsha, I would like to book an appointment.')}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-whatsapp text-lg px-8 py-4 w-full justify-center"
                  data-testid="contact-whatsapp-btn"
                >
                  <MessageCircle className="w-6 h-6" />
                  Start WhatsApp Chat
                </a>
                <p className="text-xs text-muted-foreground mt-4">Typically responds within 30 minutes · Mon–Sat 9AM–5PM</p>
              </div>

              {/* Quick Message Templates */}
              <div className="mt-6">
                <p className="text-sm font-medium text-muted-foreground mb-3">Quick Messages:</p>
                <div className="space-y-2">
                  {[
                    'I need knee pain consultation',
                    'I want to know about knee replacement cost',
                    'I have a sports injury',
                    'I need a second opinion',
                  ].map((msg) => (
                    <a
                      key={msg}
                      href={whatsappUrl(`Hello Dr. Harsha, ${msg}.`)}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg px-4 py-2.5 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 flex-shrink-0" />
                      {msg}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
