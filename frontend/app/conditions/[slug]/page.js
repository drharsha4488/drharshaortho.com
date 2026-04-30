import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, MessageCircle, CheckCircle, ChevronDown, Phone, Stethoscope, AlertCircle, MapPin } from 'lucide-react';
import { getConditionBySlug, getAllConditionSlugs, whatsappUrl } from '@/lib/data';
import { getRelatedLocationPagesForCondition } from '@/lib/internalLinks';
import RelatedLinks from '@/components/RelatedLinks';

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

function renderItem(item) {
  if (typeof item === 'string') return { title: item, description: null };
  return {
    title: item.name || item.title || item.symptom || item.cause || item.label || '',
    description: item.description || item.detail || null,
  };
}

export default function ConditionPage({ params }) {
  const condition = getConditionBySlug(params.slug);
  if (!condition) notFound();

  const c = condition.content || {};
  const waMsg = `Hello Dr. Harsha, I am suffering from ${condition.title} and would like to consult you for treatment options.`;
  const relatedLocationPages = getRelatedLocationPagesForCondition(params.slug, null, 12);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white pt-20 pb-24 md:pt-24 md:pb-28">
        <div aria-hidden className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="container-medical relative">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/conditions" className="hover:text-white">Conditions</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/90">{condition.title}</span>
          </nav>
          <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-semibold mb-5 leading-[1.05] tracking-tight max-w-4xl">
            {condition.title}
          </h1>
          <p className="text-lg md:text-xl text-white/85 mb-8 max-w-3xl leading-relaxed">{condition.meta_description}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={whatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base px-7 py-4" data-testid="condition-whatsapp-btn">
              <MessageCircle className="w-5 h-5" /> Book on WhatsApp
            </a>
            <a href="tel:+919959964567" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold px-7 py-4 rounded-full backdrop-blur-sm transition-all duration-300">
              <Phone className="w-5 h-5" /> +91 99599 64567
            </a>
          </div>
        </div>
      </section>

      {/* Overview */}
      {c.overview && (
        <section className="section-padding">
          <div className="container-medical max-w-3xl">
            <p className="eyebrow mb-4">Overview</p>
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">{c.overview}</p>
          </div>
        </section>
      )}

      {/* Symptoms */}
      {c.symptoms && c.symptoms.length > 0 && (
        <section className="section-padding bg-slate-50">
          <div className="container-medical max-w-5xl">
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">Common signs</p>
              <h2 className="font-outfit text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
                Symptoms of {condition.title}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {(Array.isArray(c.symptoms) ? c.symptoms : [c.symptoms]).map((s, i) => {
                const item = renderItem(s);
                return (
                  <div key={i} className="card-base p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                      <AlertCircle className="w-5 h-5" />
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

      {/* Causes */}
      {c.causes && c.causes.length > 0 && (
        <section className="section-padding">
          <div className="container-medical max-w-5xl">
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">Why it happens</p>
              <h2 className="font-outfit text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
                Causes of {condition.title}
              </h2>
            </div>
            <div className="space-y-3">
              {(Array.isArray(c.causes) ? c.causes : [c.causes]).map((cause, i) => {
                const item = renderItem(cause);
                return (
                  <div key={i} className="card-base p-6">
                    <h3 className="font-outfit font-semibold text-slate-900 mb-1">{item.title}</h3>
                    {item.description && <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Diagnosis */}
      {c.diagnosis && c.diagnosis.length > 0 && (
        <section className="section-padding bg-slate-50">
          <div className="container-medical max-w-5xl">
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">How we diagnose</p>
              <h2 className="font-outfit text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
                Diagnosis methods
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {(Array.isArray(c.diagnosis) ? c.diagnosis : [c.diagnosis]).map((d, i) => {
                const item = renderItem(d);
                return (
                  <div key={i} className="card-base p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 flex-shrink-0">
                      <Stethoscope className="w-5 h-5" />
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

      {/* Treatment Options */}
      {c.treatment_options && c.treatment_options.length > 0 && (
        <section className="section-padding">
          <div className="container-medical max-w-5xl">
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">Treatment paths</p>
              <h2 className="font-outfit text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
                How we treat {condition.title}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {(Array.isArray(c.treatment_options) ? c.treatment_options : [c.treatment_options]).map((t, i) => {
                const item = renderItem(t);
                return (
                  <div key={i} className="card-base p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
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

      {/* FAQs */}
      {c.faqs && c.faqs.length > 0 && (
        <section className="section-padding bg-slate-50">
          <div className="container-medical max-w-3xl">
            <div className="mb-10">
              <p className="eyebrow mb-3">FAQs</p>
              <h2 className="font-outfit text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
                Frequently asked questions
              </h2>
            </div>
            <div className="space-y-3">
              {c.faqs.map((faq, i) => (
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
              mainEntity: c.faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } }))
            })}} />
          </div>
        </section>
      )}

      {/* INTERNAL LINK HUB — location-specific care for this condition */}
      {relatedLocationPages.length > 0 && (
        <RelatedLinks
          subtitle="Find care near you"
          title={`${condition.title.replace(/\s*in\s+Hyderabad\s*$/i, '')} treatment across Hyderabad`}
          pages={relatedLocationPages}
          icon={MapPin}
        />
      )}

      {/* Final CTA */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden p-10 sm:p-14 text-center shadow-elevated">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-sky-600/30 via-slate-900 to-emerald-900/20" />
            <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-3xl" />
            <div className="relative max-w-2xl mx-auto">
              <p className="eyebrow text-sky-400 mb-3">Get expert care</p>
              <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.1] mb-5">
                Don't let {condition.title} slow you down.
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
