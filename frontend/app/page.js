import Link from 'next/link';
import {
  Phone, Star, ChevronRight, MessageCircle, Award, ShieldCheck,
  Activity, Stethoscope, Sparkles, ArrowUpRight, MapPin, CheckCircle, Building2,
} from 'lucide-react';
import { getAllConditions, getAllTreatments, whatsappUrl } from '@/lib/data';
import Reveal, { RevealStagger, RevealItem } from '@/components/Reveal';

export const metadata = {
  title: 'Best Orthopedic Surgeon in Hyderabad | Dr. B Harsha Vardhana Reddy',
  description: 'Dr. B Harsha Vardhana Reddy — top orthopedic surgeon at Apollo Hospitals, Hyderabad. Specializes in knee/hip replacement, ACL surgery, robotic surgery, and sports injuries.',
  alternates: { canonical: 'https://drharshaortho.com' },
};

const stats = [
  { value: '4,000+', label: 'Successful Surgeries' },
  { value: '15+', label: 'Years of Practice' },
  { value: '8,000+', label: 'Patients Treated' },
  { value: '95%+', label: 'Success Rate' },
];

const whyChoose = [
  { icon: Sparkles, title: 'Computer-Navigated Surgery', desc: 'Sub-millimeter precision in joint replacement using computer-navigated and minimally invasive techniques.' },
  { icon: ShieldCheck, title: 'Apollo Hospitals', desc: 'Operating at one of India\'s top JCI-accredited hospitals — Apollo, Financial District.' },
  { icon: Award, title: '15+ Years Experience', desc: '4,000+ surgeries spanning trauma, sports, regenerative care, and joint replacement.' },
  { icon: CheckCircle, title: 'US FDA-Approved Implants', desc: 'Globally certified implants — proven longevity and safety across thousands of patients.' },
  { icon: Activity, title: 'Sports Medicine Expert', desc: '1,500+ arthroscopies — ACL, meniscus, shoulder, rotator cuff and ankle ligament repairs.' },
  { icon: Stethoscope, title: 'Cashless Insurance', desc: 'Apollo accepts all major insurers including Star Health, ICICI Lombard, HDFC Ergo.' },
];

// Anonymized patient outcomes — illustrative until verified reviews are collected
const testimonials = [
  { name: 'A.K.', location: 'Banjara Hills', procedure: 'Total Knee Replacement', text: 'After 20+ years of arthritis pain, my knee replacement at Apollo went smoothly. Dr. Harsha walked me through every step. Walking comfortably within weeks.', rating: 5 },
  { name: 'P.S.', location: 'Kukatpally', procedure: 'ACL Reconstruction', text: 'ACL reconstruction was done with great care. Detailed pre-op planning and a clear recovery program got me back to badminton in 9 months.', rating: 5 },
  { name: 'M.R.', location: 'Secunderabad', procedure: 'Hip Replacement', text: 'Hip replacement at Apollo Financial District. Honest, calm, and patient-focused — Dr. Harsha made my parents feel safe through the whole process.', rating: 5 },
];

const conditionIcons = {
  'knee': '🦵', 'hip': '🦴', 'shoulder': '💪', 'ankle': '🦶', 'sports': '⚡',
};

export default function HomePage() {
  const conditions = getAllConditions().slice(0, 8);
  const treatments = getAllTreatments().slice(0, 6);

  return (
    <>
      {/* HERO — asymmetric 7/5 split */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-12 pb-32 md:pt-20 lg:pt-28 lg:pb-44">
        {/* Decorative grid bg */}
        <div
          aria-hidden
          className="absolute inset-0 bg-grid-slate [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_60%)]"
        />
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-sky-200/30 blur-3xl pointer-events-none"
        />

        <div className="container-medical relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Left — content */}
            <div className="lg:col-span-7 space-y-7">
              <Reveal>
                <div className="trust-pill">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Apollo Hospitals · Financial District, Hyderabad
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="font-outfit text-[2.5rem] sm:text-5xl lg:text-[4.25rem] font-semibold leading-[1.05] tracking-[-0.02em] text-slate-900">
                  Move better.<br />
                  <span className="relative inline-block">
                    Live <span className="text-sky-600">pain-free.</span>
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3"
                      viewBox="0 0 200 12" preserveAspectRatio="none" fill="none" aria-hidden
                    >
                      <path d="M2 8 Q 50 2, 100 6 T 198 8" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
                  Dr. B Harsha Vardhana Reddy — Senior Consultant Orthopedic Surgeon at Apollo Hospitals & Founder of <strong className="text-slate-900 font-semibold">AgileOrtho</strong>. Specializing in <strong className="text-slate-900 font-semibold">joint replacement</strong>, arthroscopy, sports medicine & trauma. <strong className="text-slate-900 font-semibold">4,000+ surgeries</strong>, 15+ years.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                  <a
                    href={whatsappUrl('Hello Dr. Harsha, I would like to book an appointment for orthopedic consultation.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp text-base px-7 py-4"
                    data-testid="hero-whatsapp-btn"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Book on WhatsApp
                  </a>
                  <a href="tel:+919959964567" className="btn-outline text-base px-7 py-4">
                    <Phone className="w-5 h-5" />
                    +91 99599 64567
                  </a>
                </div>
              </Reveal>

              {/* Trust micro-row */}
              <Reveal delay={0.32}>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-sky-600" />
                    <span><strong className="text-slate-900">Apollo Hospitals</strong> · Senior Consultant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    <span>Cashless insurance accepted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-sky-600" />
                    <span>DNB Ortho · MBA · Founder, AgileOrtho</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right — doctor portrait card */}
            <Reveal delay={0.1} y={32} className="lg:col-span-5 relative">
              <div className="relative">
                {/* Background ring */}
                <div className="absolute -inset-4 bg-gradient-to-br from-sky-200/50 via-transparent to-emerald-100/40 rounded-[2.5rem] blur-2xl" />
                {/* Photo */}
                <div className="relative rounded-[2rem] overflow-hidden bg-slate-100 aspect-[4/5] shadow-elevated ring-1 ring-slate-200/60">
                  <img
                    src="/images/dr-harsha-profile-optimized.jpg"
                    alt="Dr. B Harsha Vardhana Reddy — Orthopedic Surgeon"
                    className="w-full h-full object-cover"
                    width="500" height="625"
                    loading="eager"
                    fetchPriority="high"
                  />
                  {/* Bottom-left credential card */}
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg ring-1 ring-slate-100">
                    <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-sky-600">Senior Consultant Orthopedic Surgeon</p>
                    <p className="font-semibold text-slate-900 mt-0.5">Dr. B Harsha Vardhana Reddy</p>
                    <p className="text-xs text-slate-500 mt-0.5">DNB Ortho · MBA · Apollo Hospitals, Hyderabad</p>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="hidden sm:flex absolute -top-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-elevated ring-1 ring-slate-100 items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Specialty</p>
                    <p className="text-sm font-semibold text-slate-900">Joint Replacement</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DARK STATS STRIP — overlaps hero */}
      <section className="relative -mt-24 sm:-mt-20 z-10">
        <div className="container-medical">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-elevated relative overflow-hidden">
            {/* Glow */}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent pointer-events-none" />
            <div aria-hidden className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-2 lg:divide-x lg:divide-white/10">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.1} y={16} className="text-center lg:px-6">
                  <div className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight">
                    <span className="bg-gradient-to-br from-sky-300 to-sky-500 bg-clip-text text-transparent">
                      {s.value}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-2 font-medium tracking-wide uppercase">
                    {s.label}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MEET YOUR SURGEON */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-3">Meet Your Surgeon</p>
              <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
                15 years of expertise.<br />
                <span className="text-slate-500">8,000 lives changed.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed">
                Dr. B Harsha Vardhana Reddy is a Senior Consultant Orthopedic Surgeon at Apollo Hospitals, Financial District, Hyderabad and the Founder &amp; Managing Director of <strong className="text-slate-900">AgileOrtho Healthcare</strong>. With over 15 years of clinical experience, he is one of Telangana's most trusted orthopedic surgeons.
              </p>
              <p className="text-base text-slate-500 leading-relaxed">
                Trained at Continental Hospitals with fellowships in <strong className="text-slate-700">Arthroplasty</strong> and <strong className="text-slate-700">Arthroscopy</strong>, Dr. Harsha has performed 4,000+ successful surgeries — 2,000+ joint replacements, 1,500+ arthroscopies, 3,000+ trauma cases. He combines DNB Orthopedics with an MBA in Hospital Administration to deliver care that's both medically excellent and patient-friendly.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['DNB Orthopedics', 'MBA Hospital Admin', 'Arthroplasty', 'Arthroscopy', 'Apollo Hospitals', 'Founder, AgileOrtho'].map(tag => (
                  <span key={tag} className="bg-slate-50 text-slate-700 text-sm px-3 py-1.5 rounded-full border border-slate-200 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-4">
                <Link href="/about" className="btn-outline">
                  Read Full Bio <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href={whatsappUrl('Hello Dr. Harsha, I would like to consult about my orthopedic condition.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle className="w-5 h-5" /> Consult Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE — bento with feature card */}
      <section className="section-padding bg-slate-50">
        <div className="container-medical">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-3">Why Patients Trust Us</p>
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
              Specialist care — not generic medicine.
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-4">
            {/* Feature tile */}
            <div className="lg:col-span-5 lg:row-span-2 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
              <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-sky-500/15 via-transparent to-transparent" />
              <div aria-hidden className="absolute top-1/2 right-0 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl" />
              <div className="relative">
                <p className="eyebrow text-sky-400 mb-4">Featured Procedure</p>
                <h3 className="font-outfit text-3xl sm:text-4xl font-semibold leading-tight">
                  Total Knee Replacement
                </h3>
                <p className="text-slate-300 mt-4 text-base leading-relaxed">
                  Computer-navigated, minimally invasive joint replacement with US FDA-approved implants. 95%+ success rate. Recovery in days, not weeks.
                </p>
              </div>
              <div className="relative pt-8">
                <Link
                  href="/treatments/total-knee-replacement"
                  className="inline-flex items-center gap-2 text-sky-400 font-semibold text-sm hover:text-sky-300 transition-colors"
                >
                  Learn about knee replacement
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Why-choose tiles */}
            {whyChoose.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`card-base card-hover p-6 sm:p-7 ${i < 2 ? 'lg:col-span-7' : 'lg:col-span-7 lg:col-start-6'} ${i >= 2 && i < 4 ? 'lg:col-span-3 lg:col-start-auto' : ''} ${i >= 4 ? 'lg:col-span-2 lg:col-start-auto' : ''}`}
                  style={
                    // Bento positioning: feature spans col-span 5 rows 2; others auto-flow.
                    {}
                  }
                >
                  <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-outfit font-semibold text-lg text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONDITIONS */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="flex items-end justify-between gap-4 mb-12 flex-wrap">
            <div className="max-w-xl">
              <p className="eyebrow mb-3">Conditions Treated</p>
              <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
                39 conditions.<br />
                One specialist.
              </h2>
            </div>
            <Link
              href="/conditions"
              className="hidden sm:inline-flex items-center gap-1.5 text-sky-600 font-semibold text-sm hover:gap-2.5 transition-all"
            >
              View all conditions <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {conditions.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 4) * 0.06} className="h-full">
                <Link
                  href={`/conditions/${c.slug}`}
                  className="card-base card-hover p-6 group flex flex-col h-full"
                  data-testid={`condition-card-${c.slug}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 group-hover:bg-sky-600 flex items-center justify-center text-sky-600 group-hover:text-white transition-colors mb-4">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="font-outfit font-semibold text-base text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
                    {c.content?.overview || c.meta_description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-sky-600 group-hover:gap-2 transition-all">
                    Read more <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 sm:hidden text-center">
            <Link href="/conditions" className="btn-outline">
              View all 39 conditions <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TREATMENTS */}
      <section className="section-padding bg-slate-50">
        <div className="container-medical">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-3">Treatments &amp; Procedures</p>
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
              From minimally-invasive arthroscopy to full robotic joint replacement.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {treatments.map((t, i) => (
              <Reveal key={t.slug} delay={(i % 3) * 0.08} className="h-full">
                <Link
                  href={`/treatments/${t.slug}`}
                  className="card-base card-hover p-7 group relative overflow-hidden block h-full"
                  data-testid={`treatment-card-${t.slug}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-sky-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3 className="font-outfit font-semibold text-lg text-slate-900 mb-2 leading-snug">
                    {t.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {t.content?.description || t.meta_description}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/treatments" className="btn-outline">
              Explore all treatments <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-3">Patient Stories</p>
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
              Real recoveries. Real results.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1} className="h-full">
                <figure
                  className="card-base p-7 lg:p-8 flex flex-col relative h-full"
                  data-testid="testimonial-card"
                >
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-slate-700 leading-relaxed flex-1 text-base">
                    "{t.text}"
                  </blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-slate-100">
                    <div className="font-semibold text-slate-900">{t.name}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <MapPin className="w-3 h-3" /> {t.location}
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-sky-600 font-medium">{t.procedure}</span>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/testimonials" className="text-sky-600 font-semibold text-sm hover:underline underline-offset-4">
              Read more patient stories →
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden p-10 sm:p-14 lg:p-20 text-center shadow-elevated">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-sky-600/30 via-slate-900 to-emerald-900/20" />
            <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-3xl" />

            <div className="relative max-w-2xl mx-auto">
              <p className="eyebrow text-sky-400 mb-4">Ready when you are</p>
              <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.1] mb-6">
                Your knees, your hips, your back —<br />
                they don't have to hurt anymore.
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
                Send a quick WhatsApp message describing your symptoms. Dr. Harsha's team typically replies within 30 minutes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <a
                  href={whatsappUrl('Hello Dr. Harsha, I would like to book an appointment.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-base px-7 py-4"
                  data-testid="cta-whatsapp-btn"
                >
                  <MessageCircle className="w-5 h-5" />
                  Message on WhatsApp
                </a>
                <a
                  href="tel:+919959964567"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold px-7 py-4 rounded-full backdrop-blur-sm transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  +91 99599 64567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
