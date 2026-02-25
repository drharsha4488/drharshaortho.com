// SEO utilities and keyword helpers

export const primaryKeywords = [
  'best orthopedic surgeon Hyderabad',
  'orthopedic surgeon Hyderabad',
  'joint replacement surgeon Hyderabad',
  'knee replacement Hyderabad',
  'hip replacement surgery Hyderabad',
  'ACL surgery Hyderabad',
  'sports injury doctor Hyderabad',
  'arthroscopy Hyderabad',
  'orthopedic doctor Hitec City',
  'best knee surgeon Hyderabad',
];

export const secondaryKeywords = [
  'rotator cuff repair Hyderabad',
  'shoulder arthroscopy Hyderabad',
  'meniscus tear surgery Hyderabad',
  'fracture surgery Hyderabad',
  'trauma surgeon Hyderabad',
  'carpal tunnel surgery Hyderabad',
  'ankle ligament surgery Hyderabad',
  'sports medicine Hyderabad',
  'orthopedic specialist Apollo Hospitals',
  'joint replacement doctor Hyderabad',
];

export const longTailKeywords = [
  'best orthopedic surgeon in Hyderabad 2025',
  'robotic knee replacement Hyderabad',
  'minimally invasive hip surgery Hyderabad',
  'ACL reconstruction surgeon Hyderabad',
  'best joint replacement surgeon Financial District',
  'sports injury treatment Hyderabad',
  'arthroscopic knee surgery Hyderabad',
  'shoulder dislocation surgery Hyderabad',
  'complex fracture treatment Hyderabad',
  'best trauma surgeon Hyderabad',
];

export const locationKeywords = [
  'Hyderabad',
  'Financial District',
  'Nanakramguda',
  'Gachibowli',
  'Banjara Hills',
  'Jubilee Hills',
  'Kondapur',
  'Kukatpally',
  'Secunderabad',
  'Telangana',
];

export const generatePageTitle = (baseTi, location = 'Hyderabad') => {
  return `${baseTitle} | ${location} | Dr. B Harsha Vardhana Reddy`;
};

export const generateMetaDescription = (service, location = 'Hyderabad') => {
  return `Expert ${service} in ${location} by Dr. B Harsha Vardhana Reddy. 15+ years experience, 8000+ successful surgeries. Book appointment at Apollo Hospitals. Call +91 99599 64567`;
};

export const getConditionSchema = (condition) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name: condition.name,
    description: condition.description,
    possibleTreatment: condition.treatments.map((t) => ({
      '@type': 'MedicalTherapy',
      name: t,
    })),
    signOrSymptom: condition.symptoms?.map((s) => ({
      '@type': 'MedicalSignOrSymptom',
      name: s,
    })),
  };
};

export const getTreatmentSchema = (treatment) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: treatment.name,
    description: treatment.description,
    procedureType: treatment.category,
    followup: treatment.recovery,
    preparation: treatment.hospitalStay,
  };
};

export const getBreadcrumbSchema = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const getFAQSchema = (faqs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};
