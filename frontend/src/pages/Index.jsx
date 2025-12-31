import React from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

// FAQ data for schema markup (rich snippets in Google)
const homepageFAQs = [
  {
    "@type": "Question",
    "name": "What are the signs I need knee replacement surgery?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "You may need knee replacement if you have: severe knee pain that limits daily activities, pain not relieved by medications or injections, significant stiffness limiting movement, bone-on-bone arthritis on X-ray, failed conservative treatments for 6+ months, and difficulty sleeping due to knee pain."
    }
  },
  {
    "@type": "Question",
    "name": "How long does it take to recover from ACL surgery?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "ACL reconstruction recovery timeline: 2 weeks for walking normally, 6 weeks to return to gym, 4-6 months for jogging, 9-12 months for return to competitive sports. Full strength return takes 12-18 months."
    }
  },
  {
    "@type": "Question",
    "name": "What is the cost of robotic knee replacement in Hyderabad?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Robotic knee replacement at Yashoda Hospital costs 3.5-5 lakhs rupees, including pre-op tests, surgery, implants, hospital stay, and initial physiotherapy. Insurance typically covers 80-100%."
    }
  },
  {
    "@type": "Question",
    "name": "How long do joint replacements last?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Modern knee and hip replacements last 15-20 years on average, with 90% still functioning well at 15 years. We use only US FDA-approved implants from top manufacturers."
    }
  },
  {
    "@type": "Question",
    "name": "Do you accept insurance for orthopedic surgery?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes! Yashoda Hospital accepts cashless treatment from 30+ insurance companies including Star Health, ICICI Lombard, HDFC Ergo. We also accept all government schemes (CGHS, ESI)."
    }
  }
];

const Index = () => {
  return (
    <Layout>
      <SEO 
        title="Dr. B Harsha Vardhana Reddy - Best Orthopedic Surgeon in Hyderabad | Joint Replacement | Sports Medicine"
        description="Leading orthopedic surgeon in Hyderabad with 15+ years experience. Expert in knee replacement, hip replacement, ACL surgery, arthroscopy & sports injuries. Book appointment at Yashoda Hospital Hitec City."
        keywords="best orthopedic surgeon Hyderabad, knee replacement Hyderabad, hip replacement surgery, ACL surgery, sports injury doctor, joint replacement surgeon Hyderabad, arthroscopy Hyderabad, orthopedic doctor Hitec City"
        canonicalUrl="https://drharshaortho.com"
      />
      <SchemaMarkup faqs={homepageFAQs} />
      <HeroSection />
      <ServicesSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
