import Link from 'next/link';
import {
  MessageCircle, Phone, Award, GraduationCap, Stethoscope, Users, Heart, Brain,
  Shield, Target, ChevronRight, Bone, Activity, Microscope, Building2, Briefcase,
} from 'lucide-react';
import { whatsappUrl } from '@/lib/data';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'About Dr. B Harsha Vardhana Reddy | Senior Orthopedic Surgeon, Apollo Hospitals Hyderabad',
  description: 'Dr. B Harsha Vardhana Reddy — DNB Orthopedics, MBA, Fellowships in Arthroplasty & Arthroscopy. Senior Consultant at Apollo Hospitals Financial District, Hyderabad. 4,000+ successful surgeries, 8,000+ patients treated, 15+ years experience.',
  alternates: { canonical: 'https://drharshaortho.com/about' },
};

const milestones = [
  { year: '2012', event: 'MBBS — K.V.G. Medical College, Bangalore' },
  { year: '2015', event: 'D.Ortho — Dr. G.S. Kulkarni Orthopedic Institute, Miraj' },
  { year: '2016', event: 'Fellowship in Arthroplasty — Continental Hospitals, Hyderabad' },
  { year: '2017', event: 'Fellowship in Arthroscopy — Continental Hospitals, Hyderabad' },
  { year: '2020', event: 'DNB Orthopedics — Continental Hospital, Hyderabad' },
  { year: '2020', event: 'MBA in Hospital Administration — ICFAI Business School' },
  { year: '2022', event: 'Consultant Orthopedic Surgeon — Himagiri Hospital, Gachibowli' },
  { year: '2025', event: 'Senior Consultant — Apollo Hospitals, Financial District' },
];

const credentials = [
  { icon: GraduationCap, title: 'DNB Orthopedics', desc: 'Continental Hospital, Hyderabad' },
  { icon: Award, title: 'MBA Healthcare', desc: 'ICFAI Business School' },
  { icon: Stethoscope, title: '15+ Years', desc: 'Clinical Experience' },
  { icon: Users, title: '8,000+', desc: 'Patients Treated' },
];

const specializations = [
  { icon: Bone, title: 'Joint Replacement Surgery', desc: 'Total & partial knee replacement, hip replacement using computer-navigated and minimally invasive techniques with US FDA-approved implants.', stats: '2,000+ replacements' },
  { icon: Activity, title: 'Sports Medicine & Arthroscopy', desc: 'ACL/PCL reconstruction, meniscus repair, rotator cuff surgery, and shoulder arthroscopy for athletes and active individuals.', stats: '1,500+ arthroscopies' },
  { icon: Shield, title: 'Trauma & Fracture Care', desc: 'Complex fracture management, polytrauma care, pelvic and acetabular fractures with advanced internal fixation techniques.', stats: '3,000+ trauma cases' },
  { icon: Microscope, title: 'Regenerative Orthopedics', desc: 'PRP therapy, stem cell treatments, viscosupplementation, and cartilage restoration for joint preservation without surgery.', stats: '500+ procedures' },
];

const philosophy = [
  { icon: Heart, title: 'Patient-First Approach', text: 'Every treatment plan begins with truly listening to the patient. Dr. Harsha spends time understanding the medical condition, lifestyle, goals, and concerns to design a personalized recovery path.' },
  { icon: Target, title: 'Evidence-Based Medicine', text: 'Dr. Harsha stays current with the latest orthopedic research and clinical guidelines, combining proven surgical techniques with emerging innovations for the safest, most effective treatments.' },
  { icon: Brain, title: 'Conservative-First Philosophy', text: 'Surgery is recommended only when conservative treatments have been fully explored. Many conditions can be managed with physical therapy, medications, injections, and lifestyle changes.' },
  { icon: Shield, title: 'Minimally Invasive Techniques', text: 'When surgery is necessary, Dr. Harsha uses the latest minimally invasive and arthroscopic approaches — smaller incisions, less tissue damage, shorter hospital stays, faster recovery.' },
];

const memberships = [
  'Indian Orthopaedic Association (IOA)',
  'Telangana Orthopaedic Association',
  'Indian Arthroscopy Society',
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white pt-20 pb-24 md:pt-24 md:pb-28">
        <div aria-hidden className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="container-medical relative">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/90">About</span>
          </nav>
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-sky-400 mb-4">Meet Your Surgeon</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight mb-5">
                  Dr. B Harsha Vardhana Reddy
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="text-lg md:text-xl text-white/85 mb-3 max-w-3xl leading-relaxed">
                  Senior Consultant Orthopedic Surgeon at Apollo Hospitals, Financial District, Hyderabad.
                </p>
                <p className="text-base md:text-lg text-white/65 mb-8 max-w-3xl leading-relaxed">
                  15+ years of clinical experience. 4,000+ successful surgeries.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={whatsappUrl('Hello Dr. Harsha, I would like to book a consultation after reading your bio.')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base px-7 py-4">
                    <MessageCircle className="w-5 h-5" /> Book Consultation
                  </a>
                  <a href="tel:+919959964567" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold px-7 py-4 rounded-full backdrop-blur-sm transition-all duration-300">
                    <Phone className="w-5 h-5" /> +91 99599 64567
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1} y={32} className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-sky-500/30 via-transparent to-emerald-500/20 rounded-[2.5rem] blur-2xl" />
                <div className="relative rounded-[2rem] overflow-hidden bg-slate-100 aspect-[4/5] shadow-elevated ring-1 ring-white/10">
                  <img
                    src="/images/dr-harsha-profile-optimized.jpg"
                    alt="Dr. B Harsha Vardhana Reddy — Senior Consultant Orthopedic Surgeon at Apollo Hospitals Hyderabad"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Credentials Strip */}
      <section className="relative -mt-12 z-10">
        <div className="container-medical">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-elevated relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-2 lg:divide-x lg:divide-white/10">
              {credentials.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08} y={16} className="lg:px-6 text-center">
                  <c.icon className="w-7 h-7 mx-auto mb-3 text-sky-400" />
                  <h3 className="font-outfit text-lg font-semibold text-white">{c.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{c.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-medical max-w-4xl">
          <div className="prose-medical">
            <p className="text-lg sm:text-xl leading-relaxed">
              Dr. B Harsha Vardhana Reddy is one of Hyderabad's most trusted orthopedic surgeons and a healthcare entrepreneur, known for his patient-centric approach and surgical excellence. After completing his D.Ortho from the prestigious Dr. G.S. Kulkarni Institute, Miraj, he pursued advanced fellowship training in <strong>Arthroplasty</strong> and <strong>Arthroscopy</strong> at Continental Hospitals, Hyderabad.
            </p>
            <p>
              Beyond his medical qualifications, Dr. Reddy holds an <strong>MBA in Hospital Administration</strong> from ICFAI Business School (2020), combining clinical expertise with healthcare management excellence to deliver care that's both medically rigorous and patient-friendly.
            </p>
            <p>
              With a commitment to using the latest minimally invasive techniques and computer-navigated surgical systems, Dr. Reddy ensures faster recovery times and better outcomes for his patients. He has successfully performed over <strong>4,000 surgeries</strong> ranging from complex trauma cases to precision joint replacements and sports injury reconstructions.
            </p>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="section-padding bg-slate-50">
        <div className="container-medical">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-3">Expertise</p>
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
              Areas of specialization
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {specializations.map((spec, i) => (
              <Reveal key={spec.title} delay={(i % 2) * 0.08} className="h-full">
                <div className="card-base card-hover p-7 h-full">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 flex-shrink-0">
                      <spec.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-outfit font-semibold text-lg text-slate-900 mb-2">{spec.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">{spec.desc}</p>
                      <span className="inline-block px-3 py-1 bg-sky-50 text-sky-700 text-xs font-semibold rounded-full border border-sky-100">
                        {spec.stats}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-3">Philosophy</p>
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
              Patient-first. Evidence-based. Honest.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {philosophy.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.08} className="h-full">
                <div className="card-base p-7 h-full">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 mb-4">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-outfit font-semibold text-lg text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-slate-50">
        <div className="container-medical max-w-3xl">
          <div className="mb-12">
            <p className="eyebrow mb-3">Journey</p>
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
              Professional milestones
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 sm:left-5 top-2 bottom-2 w-px bg-slate-300" aria-hidden />
            <ol className="space-y-5">
              {milestones.map((m, i) => (
                <Reveal key={`${m.year}-${i}`} delay={i * 0.04} y={16} as="li" className="relative pl-12 sm:pl-16">
                  <div className="absolute left-0 top-1 w-9 h-9 sm:w-10 sm:h-10 bg-sky-600 text-white rounded-full flex items-center justify-center shadow-md ring-4 ring-slate-50">
                    <span className="text-[11px] font-bold">'{m.year.slice(-2)}</span>
                  </div>
                  <div className="card-base p-5">
                    <div className="text-sm font-semibold text-sky-600 mb-1">{m.year}</div>
                    <p className="text-slate-700">{m.event}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="section-padding">
        <div className="container-medical max-w-3xl text-center">
          <p className="eyebrow mb-3">Affiliations</p>
          <h2 className="font-outfit text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-[1.1] mb-8">
            Professional memberships
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {memberships.map((m) => (
              <span key={m} className="px-5 py-2.5 bg-sky-50 text-sky-700 text-sm font-medium rounded-full border border-sky-100">
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden p-10 sm:p-14 lg:p-20 text-center shadow-elevated">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-sky-600/30 via-slate-900 to-emerald-900/20" />
            <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-3xl" />
            <div className="relative max-w-2xl mx-auto">
              <p className="eyebrow text-sky-400 mb-3">Consult Dr. Harsha</p>
              <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.1] mb-5">
                Ready for a second opinion or expert consultation?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
                WhatsApp Dr. Harsha for appointments, second opinions, or to discuss your orthopedic condition. Typical reply within 30 minutes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base px-7 py-4">
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
