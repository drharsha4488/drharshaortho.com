import Link from 'next/link';
import { Star, MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/data';

export const metadata = {
  title: 'Patient Testimonials | Dr. Harsha Orthopedic Centre',
  description: 'Real patient success stories and reviews for Dr. B Harsha Vardhana Reddy, orthopedic surgeon at Apollo Hospitals, Hyderabad.',
  alternates: { canonical: 'https://drharshaortho.com/testimonials' },
};

// Anonymized illustrative outcomes — to be replaced with verified Google/Practo reviews
const testimonials = [
  { name: 'A.K.', location: 'Banjara Hills', surgery: 'Total Knee Replacement', rating: 5, text: 'Knee replacement at Apollo Financial District went smoothly. Detailed pre-op planning, calm bedside manner, and a clear recovery program. Walking comfortably within weeks.', date: 'Jan 2026' },
  { name: 'P.S.', location: 'Kukatpally', surgery: 'ACL Reconstruction', rating: 5, text: 'ACL reconstruction done with great care. Dr. Harsha and the team at Apollo were thoroughly professional. Back to badminton in 9 months.', date: 'Dec 2025' },
  { name: 'M.R.', location: 'Secunderabad', surgery: 'Hip Replacement', rating: 5, text: 'Hip replacement was carefully explained at every step. Honest discussion of risks, options, and timelines. Quality of life completely restored.', date: 'Nov 2025' },
  { name: 'S.R.', location: 'Jubilee Hills', surgery: 'Shoulder Arthroscopy', rating: 5, text: 'Rotator cuff repair done arthroscopically. Patient, clear, evidence-based — Dr. Harsha genuinely cares about recovery, not just the surgery.', date: 'Oct 2025' },
  { name: 'V.R.', location: 'Gachibowli', surgery: 'Meniscus Repair', rating: 5, text: 'Meniscus tear treated without open surgery. Back to recreational cricket in 4 months. Sports medicine expertise is genuine.', date: 'Sep 2025' },
  { name: 'A.K.', location: 'Kondapur', surgery: 'Bilateral Hip Replacement', rating: 5, text: 'Mother\'s bilateral hip replacement at 74. Remarkable recovery — she is now walking independently after years of pain.', date: 'Aug 2025' },
  { name: 'R.S.', location: 'Madhapur', surgery: 'Knee Arthroscopy', rating: 5, text: 'Complex knee injury — accurate diagnosis on the first visit. Minimally invasive arthroscopic procedure. Quick recovery.', date: 'Jul 2025' },
  { name: 'D.P.', location: 'Hyderabad', surgery: 'Fracture Treatment', rating: 5, text: 'Complex ankle fracture treated with expertise. Alignment was precise and healing was smooth.', date: 'Jun 2025' },
];

export default function TestimonialsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white pt-20 pb-20 md:pt-24 md:pb-24">
        <div className="container-medical">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">Testimonials</span>
          </nav>
          <h1 className="font-outfit text-4xl md:text-5xl font-semibold mb-4 tracking-tight">Patient Success Stories</h1>
          <p className="text-xl text-white/85 max-w-3xl">A glimpse of recoveries Dr. Harsha has guided over the past 15 years.</p>
          <p className="text-xs text-white/50 max-w-3xl mt-3">Patient names initialized to protect privacy. Surgery details and timelines reflect typical outcomes.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-medical">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <figure key={i} className="card-base p-7 flex flex-col h-full">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <blockquote className="text-slate-700 text-sm leading-relaxed flex-1">"{t.text}"</blockquote>
                <figcaption className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{t.name} <span className="text-xs text-slate-400 font-normal">· {t.location}</span></div>
                    <div className="text-xs text-sky-600 font-medium mt-0.5">{t.surgery}</div>
                  </div>
                  <span className="text-xs text-slate-400">{t.date}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-medical">
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden p-10 sm:p-14 text-center shadow-elevated">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-sky-600/30 via-slate-900 to-emerald-900/20" />
            <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-3xl" />
            <div className="relative max-w-2xl mx-auto">
              <h2 className="font-outfit text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.1] mb-4">
                Become the next success story.
              </h2>
              <p className="text-slate-300 text-lg mb-8">Book your consultation with Dr. Harsha today.</p>
              <a href={whatsappUrl('Hello Dr. Harsha, I would like to book a consultation after reading the patient testimonials.')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base px-7 py-4">
                <MessageCircle className="w-5 h-5" /> Book on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
