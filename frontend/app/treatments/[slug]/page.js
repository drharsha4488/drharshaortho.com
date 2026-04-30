import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, MessageCircle, CheckCircle, ChevronDown, Phone, ShieldCheck, AlertTriangle, BarChart3 } from 'lucide-react';
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

// Helper to safely render benefit-shaped or string item
function renderItem(item) {
  if (typeof item === 'string') return { title: item, description: null };
  return {
    title: item.title || item.name || item.benefit || item.label || '',
    description: item.description || item.detail || null,
  };
}

export default function TreatmentPage({ params }) {
  const treatment = getTreatmentBySlug(params.slug);
  if (!treatment) notFound();
  const c = treatment.content || {};
  const waMsg = `Hello Dr. Harsha, I would like to know more about ${treatment.title} and book a consultation.`;
  const steps = c.procedureSteps || c.procedure_steps || c.procedure;
  const faqs = c.faqs || c.faq;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white pt-20 pb-24 md:pt-24 md:pb-28">
        <div aria-hidden className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="container-medical relative">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/treatments" className="hover:text-white">Treatments</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/90">{treatment.title}</span>
          </nav>
          <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-semibold mb-5 leading-[1.05] tracking-tight max-w-4xl">
            {treatment.title}
          </h1>
          <p className="text-lg md:text-xl text-white/85 mb-8 max-w-3xl leading-relaxed">{treatment.meta_description}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={whatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base px-7 py-4" data-testid="treatment-whatsapp-btn">
              <MessageCircle className="w-5 h-5" /> Book on WhatsApp
            </a>
            <a href="tel:+919959964567" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold px-7 py-4 rounded-full backdrop-blur-sm transition-all duration-300">
              <Phone className="w-5 h-5" /> +91 99599 64567
            </a>
          </div>
        </div>
      </section>

      {/* Description */}
      {c.description && (
        <section className="section-padding">
          <div className="container-medical max-w-3xl">
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">{c.description}</p>
          </div>
        </section>
      )}

      {/* Statistics */}
      {c.statistics && c.statistics.length > 0 && (
        <section className="pb-12 md:pb-16">
          <div className="container-medical max-w-5xl">
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-8 relative overflow-hidden">
              <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent" />
              {c.statistics.map((s, i) => (
                <div key={i} className="relative text-center">
                  <div className="font-outfit text-4xl sm:text-5xl font-semibold bg-gradient-to-br from-sky-300 to-sky-500 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-2 font-medium tracking-wide uppercase">{s.label}</div>
                  {s.description && <p className="text-xs text-slate-500 mt-1.5">{s.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {c.benefits && c.benefits.length > 0 && (
        <section className="section-padding bg-slate-50">
          <div className="container-medical max-w-5xl">
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">Why choose this procedure</p>
              <h2 className="font-outfit text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
                Benefits of {treatment.title}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {c.benefits.map((b, i) => {
                const item = renderItem(b);
                return (
                  <div key={i} className="card-base p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 flex-shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-outfit font-semibold text-slate-900 mb-1">{item.title}</h3>
                      {item.description && <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Procedure Steps */}
      {steps && (Array.isArray(steps) ? steps.length > 0 : true) && (
        <section className="section-padding">
          <div className="container-medical max-w-4xl">
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">What to expect</p>
              <h2 className="font-outfit text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
                Procedure Steps
              </h2>
            </div>
            <ol className="space-y-4">
              {(Array.isArray(steps) ? steps : [steps]).map((step, i) => (
                <li key={i} className="card-base p-6 flex gap-5">
                  <div className="w-10 h-10 bg-sky-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                    {step.step || i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-outfit font-semibold text-slate-900 text-lg mb-1">
                      {step.title || step.name}
                    </h3>
                    {step.description && <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>}
                    {step.duration && (
                      <span className="inline-block mt-3 text-xs font-medium text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
                        {step.duration}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Recovery Timeline */}
      {c.recoveryTimeline && c.recoveryTimeline.length > 0 && (
        <section className="section-padding bg-slate-50">
          <div className="container-medical max-w-4xl">
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">Recovery</p>
              <h2 className="font-outfit text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
                Recovery Timeline
              </h2>
            </div>
            <div className="space-y-3">
              {c.recoveryTimeline.map((r, i) => (
                <div key={i} className="card-base p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <div className="font-outfit text-xl font-semibold text-sky-600 sm:w-32 flex-shrink-0">{r.phase}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{r.milestone}</h3>
                    {r.activities && <p className="text-sm text-slate-600 mt-1">{r.activities}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Risks */}
      {c.risks && c.risks.length > 0 && (
        <section className="section-padding">
          <div className="container-medical max-w-4xl">
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">Honest disclosure</p>
              <h2 className="font-outfit text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
                Risks &amp; mitigation
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {c.risks.map((r, i) => (
                <div key={i} className="card-base p-6">
                  <div className="flex items-start gap-3 mb-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-slate-900">{r.risk}</h3>
                  </div>
                  {r.percentage && (
                    <p className="text-xs font-medium text-amber-700 bg-amber-50 inline-block px-2.5 py-0.5 rounded-full mb-2">
                      Incidence: {r.percentage}
                    </p>
                  )}
                  {r.prevention && <p className="text-sm text-slate-600 leading-relaxed">{r.prevention}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs && faqs.length > 0 && (
        <section className="section-padding bg-slate-50">
          <div className="container-medical max-w-3xl">
            <div className="mb-10">
              <p className="eyebrow mb-3">FAQs</p>
              <h2 className="font-outfit text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
                Frequently asked questions
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="card-base overflow-hidden group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-slate-900 hover:bg-slate-50 transition-colors list-none">
                    <span className="flex-1 pr-4">{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-5 pb-5 pt-1 text-slate-600 leading-relaxed text-sm border-t border-slate-100">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } }))
            })}} />
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden p-10 sm:p-14 text-center shadow-elevated">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-sky-600/30 via-slate-900 to-emerald-900/20" />
            <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-3xl" />
            <div className="relative max-w-2xl mx-auto">
              <p className="eyebrow text-sky-400 mb-3">Take the next step</p>
              <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.1] mb-5">
                Ready for {treatment.title}?
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                Consult Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Hyderabad. Quick WhatsApp reply within 30 minutes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a href={whatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base px-7 py-4">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Dr. Harsha
                </a>
                <a href="tel:+919959964567" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold px-7 py-4 rounded-full backdrop-blur-sm transition-all duration-300">
                  <Phone className="w-5 h-5" /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
