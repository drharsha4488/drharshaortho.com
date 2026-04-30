import Link from 'next/link';
import { MessageCircle, Award, BookOpen, Stethoscope, GraduationCap, Phone } from 'lucide-react';
import { whatsappUrl } from '@/lib/data';

export const metadata = {
  title: 'About Dr. B Harsha Vardhana Reddy | Orthopedic Surgeon Hyderabad',
  description: 'Learn about Dr. B Harsha Vardhana Reddy — MS Orthopedics, Apollo Hospitals Financial District. Expert in joint replacement, robotic surgery, sports medicine, 15+ years experience.',
  alternates: { canonical: 'https://drharshaortho.com/about' },
};

export default function AboutPage() {
  const quals = ['MS Orthopedics', 'DNB Orthopedics', 'Fellowship in Joint Replacement & Arthroplasty', 'Fellowship in Arthroscopy & Sports Medicine', 'MBA in Hospital Administration'];
  const exp = [
    { period: '2015 – Present', role: 'Senior Consultant Orthopedic Surgeon', org: 'Apollo Hospitals, Financial District, Hyderabad' },
    { period: '2012 – 2015', role: 'Consultant Orthopedic Surgeon', org: 'KIMS Hospital, Hyderabad' },
    { period: '2009 – 2012', role: 'Senior Registrar', org: 'Nizam\'s Institute of Medical Sciences (NIMS), Hyderabad' },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white pt-20 pb-20 md:pt-24 md:pb-24">
        <div className="container-medical">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">About</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold">About Dr. B Harsha Vardhana Reddy</h1>
          <p className="text-xl text-white/85 mt-4 max-w-3xl">Senior Orthopedic Surgeon · Apollo Hospitals, Financial District, Hyderabad</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-medical">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Dr. B Harsha Vardhana Reddy is a distinguished orthopedic surgeon with over 15 years of experience in joint replacement surgery, arthroscopy, and sports medicine. He currently practices as a Senior Consultant Orthopedic Surgeon at Apollo Hospitals, Financial District — one of India's premier healthcare institutions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Over the course of his career, Dr. Harsha has performed more than 3,500 successful orthopedic surgeries, helping patients regain mobility, reduce pain, and improve their quality of life. He is renowned for his precision in robotic-assisted knee and hip replacements, and his expertise in treating sports-related injuries in professional athletes.
              </p>
              <a href={whatsappUrl('Hello Dr. Harsha, I would like to book an appointment after reading about you.')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle className="w-5 h-5" /> Book Consultation on WhatsApp
              </a>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl" />
              <img
                src="/images/dr-harsha-profile-optimized.jpg"
                alt="Dr. B Harsha Vardhana Reddy — Orthopedic Surgeon"
                className="relative rounded-2xl w-full max-w-md mx-auto object-cover aspect-[4/5] shadow-2xl"
                width="400" height="500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-medical">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8">Qualifications & Credentials</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quals.map((q, i) => (
              <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-lg p-4">
                <GraduationCap className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-medical max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8">Career History</h2>
          <div className="space-y-6">
            {exp.map((e, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="text-sm text-primary font-medium mb-1">{e.period}</div>
                  <div className="font-semibold text-foreground">{e.role}</div>
                  <div className="text-sm text-muted-foreground">{e.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-white">
        <div className="container-medical text-center">
          <h2 className="text-2xl font-serif font-semibold mb-4">Consult Dr. Harsha</h2>
          <p className="text-white/85 mb-6">WhatsApp for appointments, second opinions, and queries.</p>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle className="w-5 h-5" /> WhatsApp Now
          </a>
        </div>
      </section>
    </>
  );
}
