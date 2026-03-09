import React from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Award, GraduationCap, Stethoscope, Users, Heart, Brain,
  Shield, Target, ChevronRight, Calendar, Phone, BookOpen,
  Bone, Activity, Microscope
} from 'lucide-react';

const milestones = [
  { year: '2012', event: 'Completed MBBS from K.V.G Medical College, Bangalore' },
  { year: '2015', event: 'D.Ortho from Dr. G.S. Kulkarni Orthopedic Institute, Miraj' },
  { year: '2016', event: 'Fellowship in Arthroplasty at Continental Hospitals, Hyderabad' },
  { year: '2017', event: 'Fellowship in Arthroscopy at Continental Hospitals, Hyderabad' },
  { year: '2020', event: 'DNB Orthopedics from Continental Hospital, Hyderabad' },
  { year: '2020', event: 'MBA in Hospital Administration from ICFAI Business School' },
  { year: '2022', event: 'Founded AgileOrtho - Healthcare Startup' },
  { year: '2022', event: 'Consultant Orthopedic Surgeon at Himagiri Hospital, Gachibowli' },
  { year: '2025', event: 'Senior Consultant at Apollo Hospitals, Financial District' },
];

const memberships = [
  'Indian Orthopaedic Association (IOA)',
  'Telangana Orthopaedic Association',
  'Indian Arthroscopy Society',
];

const specializations = [
  {
    icon: Bone,
    title: 'Joint Replacement Surgery',
    desc: 'Total & partial knee replacement, hip replacement using computer-navigated and minimally invasive techniques with US FDA-approved implants.',
    stats: '2,000+ replacements'
  },
  {
    icon: Activity,
    title: 'Sports Medicine & Arthroscopy',
    desc: 'ACL/PCL reconstruction, meniscus repair, rotator cuff surgery, and shoulder arthroscopy for athletes and active individuals.',
    stats: '1,500+ arthroscopies'
  },
  {
    icon: Shield,
    title: 'Trauma & Fracture Care',
    desc: 'Complex fracture management, polytrauma care, pelvic and acetabular fractures with advanced internal fixation techniques.',
    stats: '3,000+ trauma cases'
  },
  {
    icon: Microscope,
    title: 'Regenerative Orthopedics',
    desc: 'PRP therapy, stem cell treatments, viscosupplementation, and cartilage restoration for joint preservation without surgery.',
    stats: '500+ procedures'
  },
];

const philosophyPoints = [
  {
    icon: Heart,
    title: 'Patient-First Approach',
    text: 'Every treatment plan begins with truly listening to the patient. Dr. Harsha spends time understanding not just the medical condition, but the patient\'s lifestyle, goals, and concerns to design a personalized recovery path.'
  },
  {
    icon: Target,
    title: 'Evidence-Based Medicine',
    text: 'Dr. Harsha stays current with the latest orthopedic research and clinical guidelines. He combines proven surgical techniques with emerging innovations, ensuring patients receive the most effective and safest treatments available.'
  },
  {
    icon: Brain,
    title: 'Conservative-First Philosophy',
    text: 'Surgery is recommended only when conservative treatments have been fully explored. Many orthopedic conditions can be effectively managed with physical therapy, medications, injections, and lifestyle modifications.'
  },
  {
    icon: Shield,
    title: 'Minimally Invasive Techniques',
    text: 'Whenever surgery is necessary, Dr. Harsha uses the latest minimally invasive and arthroscopic approaches. Smaller incisions mean less tissue damage, reduced pain, shorter hospital stays, and faster return to normal activities.'
  },
];

const aboutFAQs = [
  {
    "@type": "Question",
    "name": "What are Dr. Harsha's qualifications?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Dr. B Harsha Vardhana Reddy holds MBBS, D.Ortho, DNB Orthopedics, and MBA in Hospital Administration. He completed Fellowships in Arthroplasty (joint replacement) and Arthroscopy (sports medicine) from Continental Hospitals, Hyderabad."
    }
  },
  {
    "@type": "Question",
    "name": "Where does Dr. Harsha practice?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Dr. Harsha is a Senior Consultant Orthopedic Surgeon at Apollo Hospitals, Financial District, Nanakramguda, Hyderabad. He sees patients Monday to Saturday, 9 AM to 5 PM."
    }
  },
  {
    "@type": "Question",
    "name": "How many surgeries has Dr. Harsha performed?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Dr. Harsha has performed over 4,000 successful orthopedic surgeries including 2,000+ joint replacements, 1,500+ arthroscopic procedures, and 3,000+ trauma cases with a 95%+ success rate."
    }
  }
];

const About = () => {
  return (
    <Layout>
      <SEO
        title="About Dr. B Harsha Vardhana Reddy - Best Orthopedic Surgeon Hyderabad | Apollo Hospitals"
        description="Dr. B Harsha Vardhana Reddy - DNB Orthopedics, MBA, 15+ years experience, 4000+ successful surgeries. Senior Consultant at Apollo Hospitals Financial District, Hyderabad. Founder of AgileOrtho Healthcare. Expert in joint replacement, sports medicine & trauma surgery."
        keywords="Dr Harsha Reddy orthopedic surgeon, best orthopedic doctor Hyderabad, joint replacement surgeon Apollo Hospitals, sports medicine doctor Hyderabad, AgileOrtho founder, DNB orthopedics Hyderabad, knee replacement expert, hip replacement surgeon"
      />
      <SchemaMarkup type="MedicalClinic" faqs={aboutFAQs} />

      {/* Breadcrumb */}
      <div className="bg-secondary py-3">
        <div className="container-medical">
          <Breadcrumbs items={[{ name: 'About Dr. Harsha', path: '/about' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-background to-teal-light" data-testid="about-hero">
        <div className="container-medical">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <SectionHeading
                badge="About"
                title="Dr. B Harsha Vardhana Reddy"
                subtitle="Senior Consultant Orthopedic Surgeon at Apollo Hospitals, Financial District. Over 15 years of experience in joint replacement, sports medicine, and trauma surgery. Founder of AgileOrtho Healthcare."
                centered={false}
              />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Dr. B Harsha Vardhana Reddy is one of Hyderabad&apos;s most trusted orthopedic surgeons and healthcare
                  entrepreneur, known for his patient-centric approach and surgical excellence. After completing
                  his D.Ortho from the prestigious Dr. G.S. Kulkarni Institute, Miraj, he pursued
                  advanced fellowship training in Arthroplasty and Arthroscopy at Continental Hospitals, Hyderabad.
                </p>
                <p>
                  Beyond his medical qualifications, Dr. Reddy holds an MBA in Hospital Administration from
                  ICFAI Business School (2020), combining clinical expertise with healthcare management excellence.
                  He is the founder and managing director of AgileOrtho, a successful healthcare startup specializing
                  in innovative orthopedic solutions and accessible patient care.
                </p>
                <p>
                  With a commitment to using the latest minimally invasive techniques and computer-navigated
                  surgical systems, Dr. Reddy ensures faster recovery times and better outcomes for his patients.
                  He has successfully performed over 4,000 surgeries, ranging from complex trauma cases
                  to precision joint replacements and sports injury reconstructions. His patients benefit from
                  his dual expertise in clinical orthopedics and hospital administration, receiving care that is
                  both medically excellent and efficiently delivered.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link to="/contact">
                  <Button className="gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Consultation
                  </Button>
                </Link>
                <a href="tel:+919959964567">
                  <Button variant="outline" className="gap-2">
                    <Phone className="w-4 h-4" />
                    Call +91 99599 64567
                  </Button>
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <img
                src="/images/dr-harsha-profile-optimized.jpg"
                alt="Dr. B Harsha Vardhana Reddy - Senior Consultant Orthopedic Surgeon at Apollo Hospitals Hyderabad"
                className="rounded-2xl shadow-xl w-full aspect-[4/5] object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials Stats Bar */}
      <section className="py-8 bg-primary text-white" data-testid="credentials-section">
        <div className="container-medical">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: 'DNB Orthopedics', desc: 'Continental Hospital, Hyderabad' },
              { icon: Award, title: 'MBA Healthcare', desc: 'ICFAI Business School' },
              { icon: Stethoscope, title: '15+ Years', desc: 'Clinical Experience' },
              { icon: Users, title: '8,000+', desc: 'Patients Treated' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
                data-testid={`credential-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <item.icon className="w-8 h-8 mx-auto mb-2 text-white/90" />
                <h3 className="font-serif font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-white/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="section-padding" data-testid="specializations-section">
        <div className="container-medical">
          <SectionHeading
            badge="Expertise"
            title="Areas of Specialization"
            subtitle="Dr. Harsha provides comprehensive orthopedic care across all major subspecialties, combining advanced surgical skills with a deep understanding of musculoskeletal health."
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {specializations.map((spec, i) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl p-6 shadow-md border border-border hover:border-primary/30 hover:shadow-lg transition-all"
                data-testid={`spec-${i}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <spec.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-foreground text-lg mb-1">{spec.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{spec.desc}</p>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {spec.stats}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Philosophy */}
      <section className="section-padding bg-secondary" data-testid="philosophy-section">
        <div className="container-medical">
          <SectionHeading
            badge="Philosophy"
            title="Treatment Approach & Patient Care Philosophy"
            subtitle="Dr. Harsha believes in combining clinical excellence with genuine compassion. His treatment philosophy prioritizes long-term patient well-being over quick fixes."
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {philosophyPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border border-border"
              >
                <point.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-serif font-semibold text-foreground mb-2">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" data-testid="timeline-section">
        <div className="container-medical max-w-3xl">
          <SectionHeading badge="Journey" title="Professional Milestones" />
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            {milestones.map((item, i) => (
              <motion.div
                key={`${item.year}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative pl-12 pb-8 last:pb-0"
                data-testid={`milestone-${item.year}-${i}`}
              >
                <div className="absolute left-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">{item.year.slice(-2)}</span>
                </div>
                <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
                  <p className="text-sm text-primary font-semibold">{item.year}</p>
                  <p className="text-foreground">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Surgical Excellence */}
      <section className="section-padding bg-charcoal" data-testid="surgical-excellence-section">
        <div className="container-medical">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80"
                alt="Advanced orthopedic surgery operation theater at Apollo Hospitals Hyderabad"
                className="rounded-2xl shadow-xl w-full aspect-video object-cover"
                loading="lazy"
              />
            </div>
            <div className="text-ivory">
              <h2 className="text-3xl font-serif font-semibold mb-6">Surgical Excellence & Advanced Technology</h2>
              <p className="text-ivory/80 mb-4">
                Dr. Reddy utilizes state-of-the-art surgical techniques and the latest medical equipment
                at Apollo Hospitals Financial District to ensure the best possible outcomes for every patient.
                His expertise covers the full spectrum of orthopedic surgery:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Computer-navigated joint replacement for precision alignment',
                  'Arthroscopic procedures for minimal scarring and faster recovery',
                  'Complex trauma and polytrauma fracture management',
                  'Sports injury reconstruction using latest graft techniques',
                  'Regenerative medicine including PRP and stem cell therapy',
                  'Revision joint replacement for failed previous surgeries',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                    <span className="text-ivory/90">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-ivory/70 text-sm">
                All surgeries are performed at Apollo Hospitals Financial District, a JCI-accredited
                multi-specialty hospital with state-of-the-art operation theaters, advanced imaging systems,
                and a dedicated orthopedic rehabilitation center.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="section-padding" data-testid="memberships-section">
        <div className="container-medical max-w-3xl">
          <SectionHeading badge="Affiliations" title="Professional Memberships" />
          <div className="flex flex-wrap justify-center gap-3">
            {memberships.map((membership) => (
              <span
                key={membership}
                className="px-4 py-2 bg-teal-light text-primary text-sm rounded-full font-medium"
                data-testid={`membership-${membership.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {membership}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary/80 text-white" data-testid="about-cta">
        <div className="container-medical text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
            Ready to Consult Dr. Harsha?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Take the first step towards a pain-free life. Whether you need a second opinion, a diagnosis,
            or are considering surgery, Dr. Harsha provides honest, expert guidance tailored to your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:brightness-110 text-accent-foreground gap-2">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Button>
            </Link>
            <a href="tel:+919959964567">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
