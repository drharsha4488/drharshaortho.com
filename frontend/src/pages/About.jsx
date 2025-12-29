import React from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Award, GraduationCap, Stethoscope, Users } from 'lucide-react';

const milestones = [
  { year: '2012', event: 'Completed MBBS from K.V.G Medical College, Bangalore' },
  { year: '2015', event: 'D.Ortho from Dr. G.S. Kulkarni Orthopedic Institute, Miraj' },
  { year: '2017', event: 'Fellowship in Arthroplasty at Continental Hospitals, Hyderabad' },
  { year: '2018', event: 'Fellowship in Arthroscopy at Continental Hospitals, Hyderabad' },
  { year: '2020', event: 'DNB Orthopedics from Continental Hospital, Hyderabad' },
  { year: '2022', event: 'Consultant Orthopedic Surgeon at Himagiri Hospital, Gachibowli' },
  { year: '2024', event: 'Associate Consultant at Yashoda Hospital, Hi-Tech City' },
];

const memberships = [
  'Indian Orthopaedic Association (IOA)',
  'Telangana Orthopaedic Association',
  'Indian Arthroscopy Society',
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-background to-teal-light" data-testid="about-hero">
        <div className="container-medical">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <SectionHeading
                badge="About"
                title="Dr. B Harsha Vardhana Reddy"
                subtitle="Associate Consultant Orthopedic Surgeon at Yashoda Hospital Hi-Tech City with over 13 years of experience in joint replacement, sports medicine, and trauma surgery."
                centered={false}
              />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Dr. B Harsha Vardhana Reddy is one of Hyderabad's trusted orthopedic surgeons,
                  known for his patient-centric approach and surgical excellence. After completing
                  his D.Ortho from the prestigious Dr. G.S. Kulkarni Institute, Miraj, he pursued
                  advanced fellowship training in Arthroplasty and Arthroscopy at Continental Hospitals, Hyderabad.
                </p>
                <p>
                  With a commitment to using the latest minimally invasive techniques, Dr. Reddy
                  ensures faster recovery times and better outcomes for his patients. He has
                  successfully performed thousands of surgeries, ranging from complex trauma cases
                  to precision joint replacements and sports injury reconstructions.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="rounded-2xl shadow-xl w-full aspect-[4/5] bg-teal-light flex items-center justify-center">
                <div className="text-center p-8">
                  <Award className="w-24 h-24 text-primary mx-auto mb-4" />
                  <p className="text-xl font-serif font-semibold text-foreground">Dr. B Harsha Vardhana Reddy</p>
                  <p className="text-sm text-muted-foreground mt-2">Orthopedic Surgeon</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-padding bg-secondary" data-testid="credentials-section">
        <div className="container-medical">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: 'DNB Orthopedics', desc: 'Continental Hospital' },
              { icon: Award, title: 'D.Ortho', desc: 'MUHS, Maharashtra' },
              { icon: Stethoscope, title: '13+ Years', desc: 'Clinical Experience' },
              { icon: Users, title: '8,000+', desc: 'Patients Treated' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 text-center shadow-md border border-border"
                data-testid={`credential-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <item.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-serif font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" data-testid="timeline-section">
        <div className="container-medical max-w-3xl">
          <SectionHeading
            badge="Journey"
            title="Professional Milestones"
          />
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            {milestones.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-12 pb-8 last:pb-0"
                data-testid={`milestone-${item.year}`}
              >
                <div className="absolute left-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">
                    {item.year.slice(-2)}
                  </span>
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
            <div className="bg-teal-light rounded-2xl shadow-xl w-full aspect-video flex items-center justify-center">
              <Stethoscope className="w-32 h-32 text-primary" />
            </div>
            <div className="text-ivory">
              <h2 className="text-3xl font-serif font-semibold mb-6">
                Surgical Excellence
              </h2>
              <p className="text-ivory/80 mb-6">
                Dr. Reddy utilizes state-of-the-art surgical techniques and equipment
                to ensure the best possible outcomes. His expertise spans across:
              </p>
              <ul className="space-y-3">
                {[
                  'Computer-navigated joint replacement surgery',
                  'Arthroscopic procedures for minimal scarring',
                  'Complex trauma and fracture management',
                  'Sports injury reconstruction',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gold rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="section-padding" data-testid="memberships-section">
        <div className="container-medical max-w-3xl">
          <SectionHeading
            badge="Affiliations"
            title="Professional Memberships"
          />
          <div className="flex flex-wrap justify-center gap-3">
            {memberships.map((membership) => (
              <span
                key={membership}
                className="px-4 py-2 bg-teal-light text-primary text-sm rounded-full"
                data-testid={`membership-${membership.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {membership}
              </span>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
