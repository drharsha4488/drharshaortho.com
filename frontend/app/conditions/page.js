import Link from 'next/link';
import { ChevronRight, MessageCircle, Search } from 'lucide-react';
import { getAllConditions, whatsappUrl } from '@/lib/data';

export const metadata = {
  title: 'Orthopedic Conditions Treated in Hyderabad',
  description: 'Complete list of orthopedic conditions treated by Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Hyderabad — knee, hip, shoulder, spine, sports injuries.',
  alternates: { canonical: 'https://drharshaortho.com/conditions' },
};

export default function ConditionsPage() {
  const conditions = getAllConditions();
  const categories = [...new Set(conditions.map(c => c.content?.category || 'General'))];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white pt-20 pb-20 md:pt-24 md:pb-24">
        <div className="container-medical">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Conditions</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">Orthopedic Conditions We Treat</h1>
          <p className="text-xl text-white/85 max-w-3xl">
            Comprehensive treatment for all bone, joint, and musculoskeletal conditions at Apollo Hospitals, Hyderabad.
          </p>
        </div>
      </section>

      {/* Conditions Grid */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {conditions.map(c => (
              <Link
                key={c.slug}
                href={`/conditions/${c.slug}`}
                className="bg-card border border-border hover:border-primary hover:shadow-md rounded-xl p-5 transition-all group"
                data-testid={`condition-card-${c.slug}`}
              >
                <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm mb-2">{c.title}</h2>
                <p className="text-xs text-muted-foreground line-clamp-2">{c.content?.overview || c.meta_description}</p>
                <span className="text-primary text-xs font-medium mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-white">
        <div className="container-medical text-center">
          <h2 className="text-2xl font-serif font-semibold mb-4">Not sure about your condition?</h2>
          <p className="text-white/85 mb-6">WhatsApp Dr. Harsha directly for a quick assessment.</p>
          <a href={whatsappUrl('Hello Dr. Harsha, I need help understanding my orthopedic condition.')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle className="w-5 h-5" /> Ask on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
