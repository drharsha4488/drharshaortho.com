import React from 'react';
import { Award, Shield, Users, Star, CheckCircle, Building2 } from 'lucide-react';

/**
 * Trust Signals Component - Builds credibility and improves conversions
 * Displays certifications, experience, patient count, and affiliations
 */
const TrustSignals = ({ variant = 'full' }) => {
  const credentials = [
    { icon: Award, label: 'MBBS, D.Ortho, DNB', sublabel: 'Board Certified' },
    { icon: Shield, label: 'Fellowship Trained', sublabel: 'Arthroplasty & Arthroscopy' },
    { icon: Users, label: '15,000+', sublabel: 'Patients Treated' },
    { icon: Star, label: '4.9/5 Rating', sublabel: '1250+ Reviews' },
  ];

  const affiliations = [
    { name: 'Apollo Hospitals', logo: '/images/apollo-logo.png', type: 'Primary Practice' },
    { name: 'Indian Orthopaedic Association', logo: null, type: 'Member' },
    { name: 'Telangana Orthopaedic Association', logo: null, type: 'Member' },
    { name: 'Indian Arthroscopy Society', logo: null, type: 'Member' },
  ];

  const certifications = [
    'Fellowship in Arthroplasty - Continental Hospitals',
    'Fellowship in Arthroscopy & Sports Medicine',
    'MBA in Hospital Administration - ICFAI',
    'Certified in Computer-Navigated Joint Replacement',
  ];

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-primary/5 to-teal-50 py-4 border-y border-primary/10">
        <div className="container-medical">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {credentials.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <item.icon className="w-5 h-5 text-primary" />
                <div>
                  <span className="font-semibold text-gray-900">{item.label}</span>
                  <span className="text-gray-500 ml-1 hidden sm:inline">• {item.sublabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-medical">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-semibold mb-4">
            Why Choose Dr. B Harsha Vardhana Reddy?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            15+ years of experience in orthopedic surgery with a focus on patient-centered care and evidence-based treatments.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {credentials.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="font-bold text-xl text-gray-900">{item.label}</div>
              <div className="text-sm text-gray-500">{item.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Certifications & Affiliations */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Certifications */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Certifications & Training
            </h3>
            <ul className="space-y-3">
              {certifications.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Affiliations */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Hospital & Professional Affiliations
            </h3>
            <ul className="space-y-3">
              {affiliations.map((aff, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{aff.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">{aff.type}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm">
            <Shield className="w-4 h-4" />
            <span>Verified Medical Professional • Licensed by Telangana Medical Council</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
