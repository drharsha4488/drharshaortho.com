import Link from 'next/link';
import { ChevronRight, MessageCircle } from 'lucide-react';
import { getAllTreatments, whatsappUrl } from '@/lib/data';

export const metadata = {
  title: 'Orthopedic Treatments & Procedures in Hyderabad',
  description: 'Advanced orthopedic treatments by Dr. B Harsha Vardhana Reddy — knee/hip replacement, robotic surgery, ACL reconstruction, arthroscopy at Apollo Hospitals, Hyderabad.',
  alternates: { canonical: 'https://drharshaortho.com/treatments' },
};

export default function TreatmentsPage() {
  const treatments = getAllTreatments();
  return (
    <>
      <section className="bg-gradient-to-r from-charcoal to-charcoal/90 text-white py-16">
        <div className="container-medical">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Treatments</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">Treatments &amp; Procedures</h1>
          <p className="text-xl text-white/85 max-w-3xl">Advanced surgical and non-surgical orthopedic procedures at Apollo Hospitals, Hyderabad.</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-medical">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {treatments.map(t => (
              <Link key={t.slug} href={`/treatments/${t.slug}`}
                className="bg-card border border-border hover:border-primary hover:shadow-lg rounded-xl p-6 transition-all group"
                data-testid={`treatment-card-${t.slug}`}
              >
                <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{t.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-2">{t.content?.description || t.meta_description}</p>
                <span className="text-primary text-sm font-medium mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-primary text-white">
        <div className="container-medical text-center">
          <h2 className="text-2xl font-serif font-semibold mb-4">Want to know if you need surgery?</h2>
          <p className="text-white/85 mb-6">Chat with Dr. Harsha directly on WhatsApp for a quick assessment.</p>
          <a href={whatsappUrl('Hello Dr. Harsha, I want to know about my treatment options.')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle className="w-5 h-5" /> Ask on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
