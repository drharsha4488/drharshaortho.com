import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, MessageCircle, CheckCircle, ChevronDown } from 'lucide-react';
import { getTreatmentBySlug, getAllTreatmentSlugs, whatsappUrl } from '@/lib/data';

export async function generateStaticParams() {
  return getAllTreatmentSlugs();
}

export async function generateMetadata({ params }) {
  const treatment = getTreatmentBySlug(params.slug);
  if (!treatment) return { title: 'Treatment Not Found' };
  return {
    title: treatment.meta_title || `${treatment.title} in Hyderabad`,
    description: treatment.meta_description,
    alternates: { canonical: `https://drharshaortho.com/treatments/${params.slug}` },
  };
}

export default function TreatmentPage({ params }) {
  const treatment = getTreatmentBySlug(params.slug);
  if (!treatment) notFound();
  const c = treatment.content || {};
  const waMsg = `Hello Dr. Harsha, I would like to know more about ${treatment.title} and book a consultation.`;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white pt-20 pb-24 md:pt-24 md:pb-28">
        <div className="container-medical">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/treatments" className="hover:text-white">Treatments</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{treatment.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">{treatment.title}</h1>
          <p className="text-xl text-white/85 mb-8 max-w-3xl">{treatment.meta_description}</p>
          <a href={whatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-lg px-8 py-4" data-testid="treatment-whatsapp-btn">
            <MessageCircle className="w-6 h-6" /> Book Consultation on WhatsApp
          </a>
        </div>
      </section>

      {c.description && (
        <section className="section-padding"><div className="container-medical max-w-4xl">
          <p className="text-lg text-muted-foreground leading-relaxed">{c.description}</p>
        </div></section>
      )}

      {c.benefits && c.benefits.length > 0 && (
        <section className="section-padding bg-secondary"><div className="container-medical max-w-4xl">
          <h2 className="text-2xl font-serif font-semibold mb-6">Benefits of {treatment.title}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {(Array.isArray(c.benefits) ? c.benefits : [c.benefits]).map((b, i) => (
              <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{typeof b === 'string' ? b : b.benefit || b.name || JSON.stringify(b)}</span>
              </div>
            ))}
          </div>
        </div></section>
      )}

      {(c.procedureSteps || c.procedure_steps || c.procedure) && (() => {
        const steps = c.procedureSteps || c.procedure_steps || c.procedure;
        if (!steps || (Array.isArray(steps) && steps.length === 0)) return null;
        return (
          <section className="section-padding"><div className="container-medical max-w-4xl">
            <h2 className="text-2xl font-serif font-semibold mb-6">Procedure Steps</h2>
            <div className="space-y-4">
              {(Array.isArray(steps) ? steps : [steps]).map((step, i) => (
                <div key={i} className="flex gap-4 bg-card border border-border rounded-lg p-4">
                  <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">{step.step || i + 1}</span>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{step.title || step.name}</h3>
                    {step.description && <p className="text-xs text-muted-foreground mt-1">{step.description}</p>}
                    {step.duration && <span className="text-xs text-primary font-medium mt-1 block">{step.duration}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div></section>
        );
      })()}

      {c.faqs && c.faqs.length > 0 && (
        <section className="section-padding bg-secondary"><div className="container-medical max-w-4xl">
          <h2 className="text-2xl font-serif font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {c.faqs.map((faq, i) => (
              <details key={i} className="border border-border rounded-lg overflow-hidden group">
                <summary className="flex items-center justify-between p-4 cursor-pointer bg-card hover:bg-secondary/50 transition-colors font-medium">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="p-4 bg-secondary/30 border-t border-border text-muted-foreground text-sm">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div></section>
      )}

      <section className="section-padding bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container-medical text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">Ready for {treatment.title}?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">Consult Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Hyderabad.</p>
          <a href={whatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-lg px-8 py-4">
            <MessageCircle className="w-6 h-6" /> WhatsApp for Appointment
          </a>
        </div>
      </section>
    </>
  );
}
