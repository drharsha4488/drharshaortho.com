import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, MessageCircle, CheckCircle, ChevronDown, Phone, MapPin, Stethoscope } from 'lucide-react';
import { getAllSEOPageSlugs, getSEOPageBySlug } from '@/lib/seoData';
import { whatsappUrl } from '@/lib/data';
import { getSiblingsForProgrammaticPage, PROC_TO_TREATMENT_SLUG, COND_TO_CONDITION_SLUG } from '@/lib/internalLinks';
import RelatedLinks from '@/components/RelatedLinks';

const RESERVED_ROUTES = ['about', 'contact', 'conditions', 'treatments', 'blog', 'testimonials', 'gallery', 'admin'];

export async function generateStaticParams() {
  const all = getAllSEOPageSlugs();
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

  // Internal hub linking — siblings of this programmatic page
  const siblings = (page.pageType === 'procedure-location' || page.pageType === 'condition-location')
    ? getSiblingsForProgrammaticPage(page, 8)
    : { otherLocations: [], otherProcsSameLocation: [], otherCondsSameLocation: [] };

  // Bridge link back to canonical condition/treatment page
  const canonicalTreatment = page.procedureSlug ? PROC_TO_TREATMENT_SLUG[page.procedureSlug] : null;
  const canonicalCondition = page.conditionSlug ? COND_TO_CONDITION_SLUG[page.conditionSlug] : null;

  const isRegional = page.locationTier === 'regional';

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white pt-20 pb-24 md:pt-24 md:pb-28">
        <div aria-hidden className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="container-medical relative">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/90 truncate max-w-[60ch]">{page.title}</span>
          </nav>
          <div className="max-w-4xl">
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-semibold mb-5 leading-[1.05] tracking-tight">
              {page.heroTitle || page.title}
            </h1>
            {page.heroSubtitle && (
              <p className="text-lg sm:text-xl text-white/85 mb-4">{page.heroSubtitle}</p>
            )}
            {page.metaDescription && (
              <p className="text-white/70 mb-8 max-w-3xl leading-relaxed">{page.metaDescription}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={whatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base px-7 py-4" data-testid="seo-page-whatsapp-btn">
                <MessageCircle className="w-5 h-5" /> Book on WhatsApp
              </a>
              <a href="tel:+919959964567" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold px-7 py-4 rounded-full backdrop-blur-sm transition-all duration-300">
                <Phone className="w-5 h-5" /> +91 99599 64567
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip — overlap hero */}
      {c.stats && c.stats.length > 0 && (
        <section className="relative -mt-12 z-10">
          <div className="container-medical">
            <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-elevated relative overflow-hidden">
              <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent" />
              <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-2 lg:divide-x lg:divide-white/10">
                {c.stats.map((s, i) => (
                  <div key={i} className="text-center lg:px-6">
                    <div className="font-outfit text-4xl sm:text-5xl font-semibold tracking-tight">
                      <span className="bg-gradient-to-br from-sky-300 to-sky-500 bg-clip-text text-transparent">{s.value}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400 mt-2 font-medium tracking-wide uppercase">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Introduction */}
      {c.introduction && (
        <section className="section-padding">
          <div className="container-medical max-w-3xl">
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed whitespace-pre-line">{c.introduction}</p>
          </div>
        </section>
      )}

      {/* Local / travel context — extra editorial body copy */}
      {c.localContext && (
        <section className="section-padding pt-0">
          <div className="container-medical max-w-3xl">
            <div className={`card-base p-6 sm:p-8 ${isRegional ? 'bg-emerald-50/60 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
              <p className="eyebrow mb-3">{isRegional ? `Travelling from ${page.location}?` : `Serving ${page.location}`}</p>
              <p className="text-slate-700 leading-relaxed">{c.localContext}</p>
              {isRegional && (
                <a href={whatsappUrl(`Hello Dr. Harsha, I am from ${page.location}. I would like to send my reports for an opinion before travelling to Hyderabad.`)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6" data-testid="regional-whatsapp-btn">
                  <MessageCircle className="w-5 h-5" /> Send reports on WhatsApp before you travel
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose */}
      {c.whyChoose && c.whyChoose.length > 0 && (
        <section className="section-padding bg-slate-50">
          <div className="container-medical">
            <div className="max-w-2xl mb-12">
              <p className="eyebrow mb-3">Why patients choose us</p>
              <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
                Specialist care at Apollo
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.whyChoose.map((item, i) => (
                <div key={i} className="card-base card-hover p-7">
                  <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 mb-4">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h3 className="font-outfit font-semibold text-base text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specializations (only on the older curated SEO pages) */}
      {c.specializations && c.specializations.length > 0 && (
        <section className="section-padding">
          <div className="container-medical">
            <div className="max-w-2xl mb-12">
              <p className="eyebrow mb-3">Specializations</p>
              <h2 className="font-outfit text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
                Expert care across all major orthopedic conditions
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.specializations.map((spec, i) => (
                <Link key={i} href={spec.link || '#'} className="card-base card-hover p-6 group">
                  <h3 className="font-outfit font-semibold text-slate-900 group-hover:text-sky-700 mb-2 transition-colors">{spec.name || spec.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{spec.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location info */}
      {page.location && (
        <section className="section-padding">
          <div className="container-medical max-w-3xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 mx-auto mb-5">
              <MapPin className="w-7 h-7" />
            </div>
            <h2 className="font-outfit text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mb-3">
              Serving Patients {isRegional ? `from ${page.location}` : `in ${page.location}`}
            </h2>
            <p className="text-slate-600 mb-6 max-w-xl mx-auto leading-relaxed">
              {page.locationBlurb || `Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District is a short, well-connected drive from ${page.location} — easily reached via the Outer Ring Road.`}
            </p>
            <a href="https://maps.app.goo.gl/8nE3J5ajgmtizEyTA" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <MapPin className="w-4 h-4" /> Get Directions
            </a>
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
                  <div className="px-5 pb-5 pt-1 text-slate-600 leading-relaxed text-sm border-t border-slate-100">{faq.answer}</div>
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

      {/* INTERNAL LINK HUB — siblings & canonical bridge */}
      {siblings.otherLocations && siblings.otherLocations.length > 0 && (
        <RelatedLinks
          subtitle={isRegional ? 'Across Telangana & Andhra Pradesh' : 'Available across Hyderabad'}
          title={isRegional
            ? `${page.procedureName || page.conditionName || 'Care'} for patients in other cities`
            : `${page.procedureName || page.conditionName || 'Care'} in other parts of the city`}
          pages={siblings.otherLocations}
          icon={MapPin}
        />
      )}

      {(siblings.otherProcsSameLocation?.length > 0 || siblings.otherCondsSameLocation?.length > 0) && (
        <RelatedLinks
          subtitle={`Other treatments in ${page.location}`}
          title="Explore related orthopedic care"
          pages={siblings.otherProcsSameLocation || siblings.otherCondsSameLocation || []}
          icon={Stethoscope}
          variant="compact"
        />
      )}

      {/* Bridge to canonical procedure/condition page for topical authority */}
      {(canonicalTreatment || canonicalCondition) && (
        <section className="section-padding pt-0">
          <div className="container-medical max-w-3xl">
            <div className="card-base p-6 sm:p-8 bg-sky-50/50 border-sky-100">
              <p className="eyebrow mb-2">Learn more</p>
              <h2 className="font-outfit text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
                Detailed information about {page.procedureName || page.conditionName}
              </h2>
              <p className="text-slate-600 mb-5 text-sm leading-relaxed">
                Read about the procedure steps, recovery timeline, risks, costs, and FAQs on our dedicated guide.
              </p>
              <Link
                href={canonicalTreatment ? `/treatments/${canonicalTreatment}` : `/conditions/${canonicalCondition}`}
                className="btn-outline"
              >
                Read the full guide <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden p-10 sm:p-14 lg:p-20 text-center shadow-elevated">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-sky-600/30 via-slate-900 to-emerald-900/20" />
            <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-3xl" />
            <div className="relative max-w-2xl mx-auto">
              <p className="eyebrow text-sky-400 mb-3">Take the next step</p>
              <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.1] mb-5">
                Book your appointment with Dr. Harsha
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
                WhatsApp Dr. Harsha's team for appointments, second opinions, or to discuss your orthopedic condition. Typical reply within 30 minutes.
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
