import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, MessageCircle, CheckCircle, ChevronDown } from 'lucide-react';
import { getAllConditions, getConditionBySlug, getAllConditionSlugs, whatsappUrl } from '@/lib/data';

export async function generateStaticParams() {
  return getAllConditionSlugs();
}

export async function generateMetadata({ params }) {
  const condition = getConditionBySlug(params.slug);
  if (!condition) return { title: 'Condition Not Found' };
  return {
    title: condition.meta_title || `${condition.title} Treatment in Hyderabad`,
    description: condition.meta_description,
    keywords: condition.keywords,
    alternates: { canonical: `https://drharshaortho.com/conditions/${params.slug}` },
  };
}

export default function ConditionPage({ params }) {
  const condition = getConditionBySlug(params.slug);
  if (!condition) notFound();

  const c = condition.content || {};
  const waMsg = `Hello Dr. Harsha, I am suffering from ${condition.title} and would like to consult you for treatment options.`;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white pt-20 pb-24 md:pt-24 md:pb-28">
        <div className="container-medical">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/conditions" className="hover:text-white">Conditions</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{condition.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">{condition.title}</h1>
          <p className="text-xl text-white/85 mb-8 max-w-3xl">{condition.meta_description}</p>
          <a href={whatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-lg px-8 py-4" data-testid="condition-whatsapp-btn">
            <MessageCircle className="w-6 h-6" /> Book Consultation on WhatsApp
          </a>
        </div>
      </section>

      {/* Overview */}
      {c.overview && (
        <section className="section-padding">
          <div className="container-medical max-w-4xl">
            <p className="text-lg text-muted-foreground leading-relaxed">{c.overview}</p>
          </div>
        </section>
      )}

      {/* Symptoms */}
      {c.symptoms && c.symptoms.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-medical max-w-4xl">
            <h2 className="text-2xl font-serif font-semibold mb-6">Symptoms of {condition.title}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {(Array.isArray(c.symptoms) ? c.symptoms : [c.symptoms]).map((s, i) => (
                <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{typeof s === 'string' ? s : s.name || s.symptom || JSON.stringify(s)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Causes */}
      {c.causes && c.causes.length > 0 && (
        <section className="section-padding">
          <div className="container-medical max-w-4xl">
            <h2 className="text-2xl font-serif font-semibold mb-6">Causes of {condition.title}</h2>
            <div className="space-y-4">
              {(Array.isArray(c.causes) ? c.causes : [c.causes]).map((cause, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4">
                  {typeof cause === 'string' ? (
                    <p className="text-sm text-foreground">{cause}</p>
                  ) : (
                    <>
                      <h3 className="font-semibold text-foreground mb-1">{cause.name || cause.cause}</h3>
                      {cause.description && <p className="text-sm text-muted-foreground">{cause.description}</p>}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Diagnosis */}
      {c.diagnosis && c.diagnosis.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-medical max-w-4xl">
            <h2 className="text-2xl font-serif font-semibold mb-6">Diagnosis Methods</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {(Array.isArray(c.diagnosis) ? c.diagnosis : [c.diagnosis]).map((d, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4">
                  {typeof d === 'string' ? (
                    <p className="text-sm">{d}</p>
                  ) : (
                    <>
                      <h3 className="font-semibold text-foreground text-sm">{d.name}</h3>
                      {d.description && <p className="text-xs text-muted-foreground mt-1">{d.description}</p>}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {c.faqs && c.faqs.length > 0 && (
        <section className="section-padding">
          <div className="container-medical max-w-4xl">
            <h2 className="text-2xl font-serif font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {c.faqs.map((faq, i) => (
                <details key={i} className="border border-border rounded-lg overflow-hidden group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer bg-card hover:bg-secondary/50 transition-colors font-medium">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="p-4 bg-secondary/30 border-t border-border text-muted-foreground text-sm">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: c.faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } }))
            })}} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container-medical text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">Get Expert Treatment for {condition.title}</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">Consult Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District, Hyderabad.</p>
          <a href={whatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-lg px-8 py-4">
            <MessageCircle className="w-6 h-6" /> WhatsApp for Appointment
          </a>
        </div>
      </section>
    </>
  );
}
