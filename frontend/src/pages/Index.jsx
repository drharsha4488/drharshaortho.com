import React from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <SEO 
        title="Dr. B Harsha Vardhana Reddy - Best Orthopedic Surgeon in Hyderabad | Joint Replacement | Sports Medicine"
        description="Leading orthopedic surgeon in Hyderabad with 15+ years experience. Expert in knee replacement, hip replacement, ACL surgery, arthroscopy & sports injuries. Book appointment at Yashoda Hospital Hitec City."
        keywords="best orthopedic surgeon Hyderabad, knee replacement Hyderabad, hip replacement surgery, ACL surgery, sports injury doctor, joint replacement surgeon Hyderabad, arthroscopy Hyderabad, orthopedic doctor Hitec City"
      />
      <HeroSection />
      <ServicesSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
