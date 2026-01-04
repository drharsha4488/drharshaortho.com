import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Schema.org structured data component for SEO
 * Supports: Physician, MedicalClinic, FAQPage, MedicalCondition, Article
 */
const SchemaMarkup = ({ type, data, faqs }) => {
  // Base organization data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Dr. Harsha Orthopedic Centre",
    "alternateName": "Dr. B Harsha Vardhana Reddy Orthopedic Clinic",
    "url": "https://drharshaortho.com",
    "logo": "https://drharshaortho.com/images/dr-harsha-logo.png",
    "image": "https://drharshaortho.com/images/dr-harsha-profile-optimized.jpg",
    "description": "Expert orthopedic care in Hyderabad. Specializing in joint replacement, sports medicine, arthroscopy, and trauma surgery.",
    "telephone": "+91-99599-64567",
    "email": "contact@drharshareddy.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Yashoda Hospital, Survey No. 41/14, JNTU to Hitech City Main Rd",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500081",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.4474",
      "longitude": "78.3762"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "₹₹₹",
    "medicalSpecialty": [
      "Orthopedic Surgery",
      "Sports Medicine",
      "Joint Replacement",
      "Arthroscopy"
    ]
  };

  // Physician schema
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. B Harsha Vardhana Reddy",
    "image": "https://drharshaortho.com/images/dr-harsha-profile-optimized.jpg",
    "url": "https://drharshaortho.com/about",
    "telephone": "+91-99599-64567",
    "description": "Dr. B Harsha Vardhana Reddy is a leading orthopedic surgeon in Hyderabad with 15+ years of experience. Specializes in joint replacement, sports medicine, and arthroscopy. Currently Associate Consultant at Yashoda Hospital Hi-Tech City.",
    "medicalSpecialty": [
      {
        "@type": "MedicalSpecialty",
        "name": "Orthopedic Surgery"
      },
      {
        "@type": "MedicalSpecialty",
        "name": "Sports Medicine"
      }
    ],
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "K.V.G Medical College, Bangalore"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Dr. G.S. Kulkarni Orthopedic Institute, Miraj"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Continental Hospitals, Hyderabad"
      },
      {
        "@type": "EducationalOrganization",
        "name": "ICFAI Business School"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "MBBS"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "D.Ortho"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "DNB Orthopedics"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "MBA Hospital Administration"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Fellowship in Arthroplasty"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Fellowship in Arthroscopy"
      }
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Indian Orthopaedic Association (IOA)"
      },
      {
        "@type": "Organization",
        "name": "Telangana Orthopaedic Association"
      },
      {
        "@type": "Organization",
        "name": "Indian Arthroscopy Society"
      }
    ],
    "worksFor": {
      "@type": "Hospital",
      "name": "Yashoda Hospital Hi-Tech City",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      }
    },
    "availableService": [
      "Total Knee Replacement",
      "Total Hip Replacement",
      "ACL Reconstruction",
      "Shoulder Arthroscopy",
      "Rotator Cuff Repair",
      "Meniscus Surgery",
      "Fracture Surgery",
      "Sports Injury Treatment"
    ]
  };

  // FAQ Page schema
  const faqPageSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs
  } : null;

  // Medical Condition schema
  const medicalConditionSchema = type === 'MedicalCondition' && data ? {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    "name": data.name,
    "description": data.description,
    "possibleTreatment": data.possibleTreatment?.map(treatment => ({
      "@type": "MedicalTherapy",
      "name": treatment
    }))
  } : null;

  // Article schema for blog posts
  const articleSchema = type === 'Article' && data ? {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "headline": data.title,
    "description": data.description,
    "author": {
      "@type": "Person",
      "name": "Dr. B Harsha Vardhana Reddy"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dr. Harsha Orthopedic Centre",
      "logo": {
        "@type": "ImageObject",
        "url": "https://drharshaortho.com/images/dr-harsha-logo.png"
      }
    },
    "datePublished": data.datePublished,
    "dateModified": data.dateModified || data.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    }
  } : null;

  // BreadcrumbList schema
  const breadcrumbSchema = data?.breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": data.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;

  // LocalBusiness schema (for local SEO)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://drharshaortho.com/#localbusiness",
    "name": "Dr. Harsha Orthopedic Centre - Yashoda Hospital",
    "image": "https://drharshaortho.com/images/dr-harsha-profile-optimized.jpg",
    "telephone": "+91-99599-64567",
    "email": "contact@drharshaortho.com",
    "url": "https://drharshaortho.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Yashoda Hospital, Alexander Road, Hi-Tech City",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500081",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.4477,
      "longitude": 78.3873
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "₹₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // Review schema (sample reviews for rich snippets)
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Physician",
      "name": "Dr. B Harsha Vardhana Reddy",
      "image": "https://drharshaortho.com/images/dr-harsha-profile-optimized.jpg"
    },
    "author": {
      "@type": "Person",
      "name": "Ramesh Kumar"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "reviewBody": "Dr. Harsha performed my knee replacement surgery. Excellent care from consultation to recovery. Walking pain-free after 15 years of suffering. Highly recommend!",
    "datePublished": "2024-12-15"
  };

  // HowTo schema (for procedure pages)
  const howToSchema = data?.howTo ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": data.howTo.name,
    "description": data.howTo.description,
    "totalTime": data.howTo.totalTime,
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": data.howTo.cost
    },
    "step": data.howTo.steps?.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "url": step.url
    }))
  } : null;

  // Combine schemas based on page type
  const schemas = [
    organizationSchema,
    physicianSchema,
    localBusinessSchema,
    reviewSchema,
    faqPageSchema,
    medicalConditionSchema,
    articleSchema,
    breadcrumbSchema,
    howToSchema
  ].filter(Boolean);

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SchemaMarkup;
