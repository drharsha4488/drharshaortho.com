import Link from 'next/link';
import { Star, MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/data';

export const metadata = {
  title: 'Patient Testimonials | Dr. Harsha Orthopedic Centre',
  description: 'Real patient success stories and reviews for Dr. B Harsha Vardhana Reddy, orthopedic surgeon at Apollo Hospitals, Hyderabad.',
  alternates: { canonical: 'https://drharshaortho.com/testimonials' },
};

const testimonials = [
  { name: 'Rajesh Kumar', location: 'Banjara Hills', surgery: 'Total Knee Replacement', rating: 5, text: 'Dr. Harsha performed my knee replacement surgery at Apollo Hospitals. The recovery was faster than expected and I can walk without pain now. Excellent care and attention to detail throughout the process.', date: 'Jan 2026' },
  { name: 'Priya Sharma', location: 'Kukatpally', surgery: 'ACL Reconstruction', rating: 5, text: 'Amazing doctor. ACL reconstruction done perfectly. I was back to playing badminton in 9 months. The entire team at Apollo is very professional and caring.', date: 'Dec 2025' },
  { name: 'Mohammed Salim', location: 'Secunderabad', surgery: 'Robotic Hip Replacement', rating: 5, text: 'Robotic hip replacement was seamless. Dr. Harsha explained every step of the procedure and recovery. I am now walking pain-free. Highly recommended!', date: 'Nov 2025' },
  { name: 'Sunitha Rao', location: 'Jubilee Hills', surgery: 'Shoulder Arthroscopy', rating: 5, text: 'Rotator cuff repair done by Dr. Harsha. Excellent result! My shoulder is as good as new. Dr. Harsha is patient, explains things clearly, and genuinely cares about recovery.', date: 'Oct 2025' },
  { name: 'Venkat Reddy', location: 'Gachibowli', surgery: 'Sports Injury Treatment', rating: 5, text: 'Meniscus tear treated without open surgery. Back to cricket in 4 months! Dr. Harsha is a true sports medicine expert.', date: 'Sep 2025' },
  { name: 'Anita Krishnan', location: 'Kondapur', surgery: 'Hip Replacement', rating: 5, text: 'Mother\'s bilateral hip replacement done at 74 years of age. Remarkable recovery. She is now walking independently after years of pain. Grateful to Dr. Harsha.', date: 'Aug 2025' },
  { name: 'Ravi Shankar', location: 'Madhapur', surgery: 'Knee Arthroscopy', rating: 5, text: 'Had a complex knee injury. Dr. Harsha\'s diagnosis was spot on. The arthroscopic procedure was minimally invasive and recovery was quick.', date: 'Jul 2025' },
  { name: 'Deepa Patel', location: 'Hyderabad', surgery: 'Fracture Treatment', rating: 5, text: 'Dr. Harsha treated my complex ankle fracture with expertise. The alignment was perfect and healing was smooth. Very professional service.', date: 'Jun 2025' },
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
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">Patient Success Stories</h1>
          <p className="text-xl text-white/85 max-w-3xl">Real patients, real results — see what our patients say about their experience with Dr. Harsha.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-medical">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-gold fill-gold" />)}
                  </div>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">{t.surgery}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.location}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-white">
        <div className="container-medical text-center">
          <h2 className="text-2xl font-serif font-semibold mb-4">Join Our Happy Patients</h2>
          <p className="text-white/85 mb-6">Book your consultation with Dr. Harsha today.</p>
          <a href={whatsappUrl('Hello Dr. Harsha, I would like to book a consultation after reading the patient testimonials.')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle className="w-5 h-5" /> Book on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
