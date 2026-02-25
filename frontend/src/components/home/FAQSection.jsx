import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What are the signs I need knee replacement surgery?',
    answer: 'You may need knee replacement if you have: severe knee pain that limits daily activities, pain not relieved by medications or injections, significant stiffness limiting movement, bone-on-bone arthritis on X-ray, failed conservative treatments for 6+ months, and difficulty sleeping due to knee pain. Dr. Reddy can evaluate your specific case.',
  },
  {
    question: 'How long does it take to recover from ACL surgery?',
    answer: 'ACL reconstruction recovery timeline: 2 weeks for walking normally, 6 weeks to return to gym, 4-6 months for jogging, 9-12 months for return to competitive sports. Full strength return takes 12-18 months. Following physiotherapy religiously is crucial for best outcomes.',
  },
  {
    question: 'What is the cost of robotic knee replacement in Hyderabad?',
    answer: 'Robotic knee replacement at Apollo Hospitals costs 3.5-5 lakhs rupees, including pre-op tests, surgery, implants, hospital stay, and initial physiotherapy. Insurance typically covers 80-100%. The precision of robotic surgery leads to better outcomes and longer implant life, making it worth the investment.',
  },
  {
    question: 'Can I avoid surgery for my rotator cuff tear?',
    answer: 'Many partial rotator cuff tears can be treated non-surgically with physiotherapy, PRP injections, and activity modification. However, complete tears in active patients usually require surgery for best outcomes. Small tears in older, less active patients may not need surgery. Dr. Reddy can determine the best approach for your specific tear.',
  },
  {
    question: 'How do I know if my knee pain is serious?',
    answer: 'Seek immediate medical attention if you have: knee locking or inability to straighten, severe swelling within 2 hours of injury, inability to bear weight, visible deformity, or popping sound with immediate severe pain. For gradual onset pain lasting more than 3 weeks, book a consultation to prevent worsening.',
  },
  {
    question: 'What is the youngest age for knee replacement?',
    answer: 'While traditionally done at 60+, we perform knee replacements on younger patients (40s-50s) if they have severe arthritis limiting quality of life. Modern implants last 20+ years. Younger patients benefit from activity-based counseling and may need revision surgery later in life. Each case is evaluated individually.',
  },
  {
    question: 'Is arthroscopy better than open surgery?',
    answer: 'Arthroscopic (keyhole) surgery offers many advantages: smaller incisions (3-4mm), less pain, faster recovery, same-day discharge often possible, lower infection risk, and better cosmetic results. However, not all conditions can be treated arthroscopically. Dr. Reddy uses the minimally invasive approach whenever appropriate.',
  },
  {
    question: 'How long do joint replacements last?',
    answer: 'Modern knee and hip replacements last 15-20 years on average, with 90% still functioning well at 15 years. Factors affecting longevity: your age at surgery, activity level, weight, bone quality, and quality of implants used. We use only US FDA-approved implants from top manufacturers for best outcomes.',
  },
  {
    question: 'Do you accept insurance for orthopedic surgery?',
    answer: 'Yes! Apollo Hospitals accepts cashless treatment from 30+ insurance companies including Star Health, ICICI Lombard, HDFC Ergo, New India Assurance. We also accept all government schemes (CGHS, ESI). Pre-authorization is required 3-5 days before surgery. Our team assists with insurance documentation.',
  },
  {
    question: 'What makes Dr. Harsha Reddy different from other orthopedic surgeons?',
    answer: 'Dr. Reddy combines 15+ years clinical experience with MBA in Hospital Administration, offering both surgical excellence and comprehensive patient care. He is AgileOrtho founder, has performed 4,000+ surgeries, uses latest robotic and minimally invasive techniques, provides 24/7 post-surgery support, and maintains 98% patient satisfaction rate.',
  },
  {
    question: 'How do I book an appointment with Dr. Harsha?',
    answer: 'You can book an appointment by: 1) Calling +91-99599-64567, 2) WhatsApp message to the same number, 3) Booking online at apollo247.com, or 4) Walking in to Apollo Hospitals Financial District (OPD timings: Mon-Sat, 9AM-5PM). Emergency consultations available 24/7.',
  },
  {
    question: 'What should I bring for my first consultation?',
    answer: 'Please bring: Previous medical records and X-rays/MRI scans if any, list of current medications, insurance card (if applicable), and a family member or friend for support. Wear comfortable clothes that allow easy examination of the affected joint.',
  },
  {
    question: 'Is physiotherapy included in treatment?',
    answer: 'Yes, physiotherapy is an integral part of our treatment approach. Apollo Hospitals has an in-house physiotherapy department. For surgical patients, rehabilitation starts from day 1 post-surgery. We provide personalized exercise programs and follow-up physio sessions as needed.',
  },
  {
    question: 'What is the success rate of joint replacement surgery?',
    answer: 'Dr. Harsha has a 98% success rate in joint replacement surgeries. Modern implants typically last 20+ years. Success depends on factors like patient health, implant quality, surgical technique, and post-operative rehabilitation. We use only US FDA-approved implants from top manufacturers.',
  },
  {
    question: 'Do you treat sports injuries in children?',
    answer: 'Yes, we treat pediatric sports injuries with special care. Children\'s bones are still growing, so treatment approaches differ from adults. Common pediatric sports injuries we treat include growth plate injuries, ligament sprains, and overuse injuries. We focus on safe return to sports.',
  },
  {
    question: 'What are the hospital visiting hours?',
    answer: 'Apollo Hospitals visiting hours: Morning 10AM-12PM, Evening 5PM-8PM. ICU has restricted visiting with specific timings. Post-surgery patients can have one attendant stay overnight. OPD consultation: Mon-Sat, 9AM-5PM. Emergency services available 24/7.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section-padding bg-secondary" data-testid="faq-section">
      <div className="container-medical">
        <SectionHeading
          badge="FAQs"
          title="Frequently Asked Questions"
          subtitle="Get answers to common questions about orthopedic surgery, recovery, costs, and treatments."
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-lg border border-border overflow-hidden"
              data-testid={`faq-${index}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                ) : (
                  <Plus className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="tel:+919959964567"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:brightness-110 transition-all font-medium"
            data-testid="call-faq-btn"
          >
            Call +91 99599 64567
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
