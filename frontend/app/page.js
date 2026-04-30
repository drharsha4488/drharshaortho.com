import Link from 'next/link';
import { CheckCircle, Phone, Star, Award, Users, Clock, ChevronRight, MessageCircle } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getAllConditions, getAllTreatments, whatsappUrl } from '@/lib/data';

export const metadata = {
  title: 'Best Orthopedic Surgeon in Hyderabad | Dr. B Harsha Vardhana Reddy',
  description: 'Dr. B Harsha Vardhana Reddy — top orthopedic surgeon at Apollo Hospitals, Hyderabad. Specializes in knee/hip replacement, ACL surgery, robotic surgery, and sports injuries.',
  alternates: { canonical: 'https://drharshaortho.com' },
};

const stats = [
  { value: '3500+', label: 'Successful Surgeries' },
  { value: '15+', label: 'Years Experience' },
  { value: '99%', label: 'Patient Satisfaction' },
  { value: '200+', label: 'ACL Reconstructions' },
];

const whyChoose = [
  { title: 'Robotic Surgery Expert', desc: 'Advanced robotic-assisted knee & hip replacements with precision navigation systems.' },
  { title: 'Apollo Hospitals, Hyderabad', desc: 'State-of-the-art infrastructure at one of India\'s top-ranked hospitals.' },
  { title: '15+ Years Experience', desc: '3500+ successful orthopedic surgeries across all age groups.' },
  { title: 'US FDA-Approved Implants', desc: 'Only the latest certified implants from leading global manufacturers.' },
  { title: 'Cashless Insurance', desc: 'Accepts 30+ insurance companies including Star Health, ICICI Lombard.' },
  { title: 'Sports Medicine Expert', desc: 'Trusted by professional athletes for ACL, meniscus, and shoulder surgery.' },
];

const testimonials = [
  { name: 'Rajesh Kumar', location: 'Banjara Hills', text: 'Dr. Harsha performed my knee replacement surgery. The recovery was faster than expected and I can walk without pain now.', rating: 5 },
  { name: 'Priya Sharma', location: 'Kukatpally', text: 'Amazing doctor. ACL reconstruction done perfectly. I was back to playing badminton in 9 months.', rating: 5 },
  { name: 'Mohammed Salim', location: 'Secunderabad', text: 'Robotic hip replacement at Apollo was seamless. Dr. Harsha explained every step. Highly recommended.', rating: 5 },
];

export default async function HomePage() {
  const conditions = getAllConditions().slice(0, 8);
  const treatments = getAllTreatments().slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/90 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/dr-harsha-profile-optimized.jpg')] bg-right bg-contain bg-no-repeat opacity-10" />
        <div className="container-medical relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground text-sm px-4 py-2 rounded-full mb-6 border border-primary/30">
              <Star className="w-4 h-4 text-gold fill-gold" />
              Apollo Hospitals, Financial District, Hyderabad
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 leading-tight">
              Best Orthopedic Surgeon<br />
              <span className="text-accent">in Hyderabad</span>
            </h1>
            <p className="text-xl text-white/85 mb-8 leading-relaxed">
              Dr. B Harsha Vardhana Reddy — Expert in Joint Replacement, Robotic Surgery &amp; Sports Injuries. 3500+ successful surgeries. Book your consultation on WhatsApp today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl('Hello Dr. Harsha, I would like to book an appointment for orthopedic consultation.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-lg px-8 py-4"
                data-testid="hero-whatsapp-btn"
              >
                <MessageCircle className="w-6 h-6" />
                Book on WhatsApp
              </a>
              <a href="tel:+919959964567" className="btn-outline border-white text-white hover:bg-white hover:text-charcoal text-lg px-8 py-4">
                <Phone className="w-5 h-5" />
                +91 99599 64567
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-white py-10">
        <div className="container-medical">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold text-accent">{s.value}</div>
                <div className="text-sm text-white/80 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Doctor */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Meet Your Surgeon</span>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mt-2 mb-6">
                Dr. B Harsha Vardhana Reddy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Senior Orthopedic Surgeon at Apollo Hospitals, Financial District, Hyderabad. With over 15 years of specialized experience, Dr. Harsha is one of Telangana's most sought-after orthopedic surgeons.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Trained in advanced robotic surgery techniques, he has performed 3500+ successful joint replacements and arthroscopic procedures. His expertise spans knee replacement, hip replacement, ACL reconstruction, shoulder surgery, and complex trauma cases.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['MS Orthopaedics', 'Robotic Surgery', 'Sports Medicine', 'Joint Replacement', 'Apollo Hospitals'].map(tag => (
                  <span key={tag} className="bg-secondary text-primary text-sm px-3 py-1 rounded-full border border-primary/20">{tag}</span>
                ))}
              </div>
              <a
                href={whatsappUrl('Hello Dr. Harsha, I would like to consult about my orthopedic condition.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="w-5 h-5" />
                Consult on WhatsApp
              </a>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl" />
              <img
                src="/images/dr-harsha-profile-optimized.jpg"
                alt="Dr. B Harsha Vardhana Reddy — Orthopedic Surgeon, Apollo Hospitals Hyderabad"
                className="relative rounded-2xl w-full max-w-md mx-auto object-cover aspect-[4/5] shadow-2xl"
                width="400" height="500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-padding bg-secondary">
        <div className="container-medical">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">Why Choose Dr. Harsha?</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Hyderabad's most trusted orthopedic surgeon at Apollo Hospitals</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border hover:border-primary hover:shadow-lg transition-all">
                <CheckCircle className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-serif font-semibold text-foreground">Conditions We Treat</h2>
              <p className="text-muted-foreground mt-2">Comprehensive orthopedic care for all joint and bone conditions</p>
            </div>
            <Link href="/conditions" className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {conditions.map(c => (
              <Link
                key={c.slug}
                href={`/conditions/${c.slug}`}
                className="bg-card border border-border hover:border-primary hover:shadow-md rounded-xl p-4 transition-all group"
              >
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">{c.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.content?.overview || c.meta_description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/conditions" className="btn-outline">View All 39 Conditions <ChevronRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="section-padding bg-secondary">
        <div className="container-medical">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-semibold text-foreground">Treatments &amp; Procedures</h2>
            <p className="text-muted-foreground mt-2">Advanced surgical and non-surgical orthopedic treatments</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {treatments.map(t => (
              <Link
                key={t.slug}
                href={`/treatments/${t.slug}`}
                className="bg-card border border-border hover:border-primary hover:shadow-lg rounded-xl p-6 transition-all group"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{t.content?.description || t.meta_description}</p>
                <span className="text-primary text-sm font-medium mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/treatments" className="btn-outline">View All Treatments <ChevronRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-medical">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-semibold text-foreground">Patient Success Stories</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container-medical text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Ready for Pain-Free Living?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            Book your consultation with Dr. Harsha at Apollo Hospitals, Financial District, Hyderabad. Get expert orthopedic care today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={whatsappUrl('Hello Dr. Harsha, I would like to book an appointment.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-lg px-8 py-4"
              data-testid="cta-whatsapp-btn"
            >
              <MessageCircle className="w-6 h-6" />
              Book on WhatsApp
            </a>
            <a href="tel:+919959964567" className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 rounded-full transition-all">
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
