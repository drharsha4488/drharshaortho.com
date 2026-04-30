import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

const AboutDoctorSection = () => {
  const specializations = [
    'Total Knee Replacement Surgery',
    'Total Hip Replacement Surgery',
    'ACL Reconstruction & Sports Injuries',
    'Shoulder Arthroscopy & Rotator Cuff Repair',
    'Trauma & Complex Fracture Management',
    'Joint Preservation & Regenerative Medicine'
  ];

  return (
    <section className="section-padding bg-secondary" data-testid="about-doctor-section">
      <div className="container-medical">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              About Dr. Harsha Reddy
            </span>
            
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">
              Leading Orthopedic Surgeon in Hyderabad with 15+ Years Experience
            </h2>
            
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                Dr. B Harsha Vardhana Reddy is one of the most trusted orthopedic surgeons in Hyderabad, 
                currently serving as Senior Consultant at Apollo Hospitals, Financial District. With over 
                15 years of specialized experience in orthopedic surgery, he has successfully performed 
                more than 4,000 surgeries including complex joint replacements, sports injury treatments, 
                and trauma cases.
              </p>
              <p>
                His expertise spans across knee replacement surgery, hip replacement surgery, ACL reconstruction, 
                shoulder arthroscopy, and minimally invasive orthopedic procedures. Dr. Harsha completed his 
                advanced fellowship training in Joint Replacement and Arthroscopy from premier institutions, 
                bringing international best practices to patient care in Hyderabad.
              </p>
              <p>
                As the Founder of AgileOrtho Healthcare, Dr. Harsha is committed to making world-class 
                orthopedic care accessible to all patients. He combines cutting-edge surgical techniques 
                with a patient-centric approach, ensuring personalized treatment plans for optimal recovery 
                and long-term joint health.
              </p>
            </div>

            {/* Specializations */}
            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-4">Areas of Expertise:</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {specializations.map((spec, i) => (
                  <motion.div
                    key={spec}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{spec}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <Link to="/about">
              <Button className="gap-2 group">
                Learn More About Dr. Harsha
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Image/Stats Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 text-center shadow-sm">
                  <p className="text-4xl font-serif font-bold text-primary mb-2">15+</p>
                  <p className="text-sm text-muted-foreground">Years of Experience</p>
                </div>
                <div className="bg-card rounded-xl p-6 text-center shadow-sm">
                  <p className="text-4xl font-serif font-bold text-primary mb-2">4,000+</p>
                  <p className="text-sm text-muted-foreground">Successful Surgeries</p>
                </div>
                <div className="bg-card rounded-xl p-6 text-center shadow-sm">
                  <p className="text-4xl font-serif font-bold text-primary mb-2">8,000+</p>
                  <p className="text-sm text-muted-foreground">Happy Patients</p>
                </div>
                <div className="bg-card rounded-xl p-6 text-center shadow-sm">
                  <p className="text-4xl font-serif font-bold text-primary mb-2">4.9</p>
                  <p className="text-sm text-muted-foreground">Patient Rating</p>
                </div>
              </div>
              
              <div className="mt-6 bg-card rounded-xl p-6 shadow-sm">
                <h4 className="font-semibold text-foreground mb-3">Qualifications & Training</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• MBBS from prestigious medical college</li>
                  <li>• DNB Orthopedics - National Board of Examinations</li>
                  <li>• MBA in Hospital Administration</li>
                  <li>• Fellowship in Joint Replacement (Arthroplasty)</li>
                  <li>• Fellowship in Arthroscopy & Sports Medicine</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutDoctorSection;
