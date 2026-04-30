import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, MessageCircle, CheckCircle, ChevronDown, Phone, Star, MapPin } from 'lucide-react';
import { getAllSEOPageSlugs, getSEOPageBySlug } from '@/lib/seoData';
import { whatsappUrl } from '@/lib/data';

// These are the non-dynamic routes already defined — the slug catchall handles all SEO/location pages
const RESERVED_ROUTES = ['about', 'contact', 'conditions', 'treatments', 'blog', 'testimonials', 'gallery', 'admin'];

export async function generateStaticParams() {
  const all = getAllSEOPageSlugs();
  // Filter out reserved routes
  return all.filter(p => !RESERVED_ROUTES.includes(p.slug));
}

export async function generateMetadata({ params }) {
  const page = getSEOPageBySlug(params.slug);
  if (!page) return { title: 'Page Not Found' };
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription,
    keywords: Array.isArray(page.keywords) ? page.keywords.join(', ') : page.keywords,
    alternates: { canonical: `https://drharshaortho.com/${params.slug}` },
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription,
    },
  };
}

export default function SEOLandingPage({ params }) {
  const page = getSEOPageBySlug(params.slug);
  if (!page) notFound();

  const c = page.content || {};
  const waMsg = `Hello Dr. Harsha, I found you via "${page.title}". I would like to book an orthopedic consultation.`;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/90 text-white py-16 md:py-20">
        <div className="container-medical">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{page.title}</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 leading-tight">
              {page.heroTitle || page.title}
            </h1>
            {page.heroSubtitle && (
              <p className="text-xl text-white/85 mb-4">{page.heroSubtitle}</p>
            )}
            {page.metaDescription && (
              <p className="text-white/75 mb-8 leading-relaxed">{page.metaDescription}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-lg px-8 py-4" data-testid="seo-page-whatsapp-btn">
                <MessageCircle className="w-6 h-6" /> Book on WhatsApp
              </a>
              <a href="tel:+919959964567" className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-charcoal font-semibold px-6 py-3 rounded-full transition-all">
                <Phone className="w-5 h-5" /> +91 99599 64567
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      {c.stats && c.stats.length > 0 && (
        <section className="bg-primary text-white py-8">
          <div className="container-medical">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {c.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-accent">{s.value}</div>
                  <div className="text-sm text-white/80 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Introduction */}
      {c.introduction && (
        <section className="section-padding">
          <div className="container-medical max-w-4xl">
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{c.introduction}</p>
          </div>
        </section>
      )}

      {/* Why Choose */}
      {c.whyChoose && c.whyChoose.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-medical">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-10">Why Choose Dr. Harsha?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {c.whyChoose.map((item, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border hover:border-primary hover:shadow-lg transition-all">
                  <CheckCircle className="w-7 h-7 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specializations */}
      {c.specializations && c.specializations.length > 0 && (
        <section className="section-padding">
          <div className="container-medical">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-10">Specializations</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {c.specializations.map((spec, i) => (
                <Link key={i} href={spec.link || '#'} className="bg-card border border-border hover:border-primary hover:shadow-lg rounded-xl p-5 transition-all group">
                  <h3 className="font-semibold text-foreground group-hover:text-primary mb-2">{spec.name || spec.title}</h3>
                  <p className="text-sm text-muted-foreground">{spec.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location info */}
      {page.location && (
        <section className="section-padding bg-secondary">
          <div className="container-medical max-w-3xl text-center">
            <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-semibold mb-4">Serving Patients in {page.location}</h2>
            {page.distance && <p className="text-muted-foreground mb-2">Distance from Apollo Hospitals: <strong>{page.distance}</strong></p>}
            <p className="text-muted-foreground mb-6">Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District is easily accessible from {page.location}.</p>
            <a href="https://maps.app.goo.gl/8nE3J5ajgmtizEyTA" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <MapPin className="w-4 h-4" /> Get Directions
            </a>
          </div>
        </section>
      )}

      {/* FAQs */}
      {c.faqs && c.faqs.length > 0 && (
        <section className="section-padding">
          <div className="container-medical max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {c.faqs.map((faq, i) => (
                <details key={i} className="border border-border rounded-lg overflow-hidden group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer bg-card hover:bg-secondary/50 font-medium">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-4 bg-secondary/30 border-t border-border text-muted-foreground text-sm">{faq.answer}</div>
                </details>
              ))}
            </div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: c.faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
            })}} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container-medical text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">Book Your Appointment Today</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">Chat with Dr. Harsha on WhatsApp for a quick response.</p>
          <a href={whatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-lg px-8 py-4">
            <MessageCircle className="w-6 h-6" /> WhatsApp Dr. Harsha
          </a>
        </div>
      </section>
    </>
  );
}
