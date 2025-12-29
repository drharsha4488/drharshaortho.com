import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Dr. B Harsha Vardhana Reddy - Best Orthopedic Surgeon in Hyderabad',
  description = 'Leading orthopedic surgeon in Hyderabad with 15+ years experience. Specializing in joint replacement, ACL surgery, arthroscopy, sports injuries & trauma. Book appointment at Yashoda Hospital.',
  keywords = 'orthopedic surgeon Hyderabad, knee replacement Hyderabad, hip replacement surgery, ACL surgery, sports injury doctor, joint replacement surgeon, best orthopedic doctor Hyderabad, arthroscopy Hyderabad, rotator cuff repair',
  canonicalUrl = 'https://ortho-caresite.preview.emergentagent.com',
  ogImage = 'https://ortho-caresite.preview.emergentagent.com/og-image.jpg',
  structuredData,
}) => {
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dr. B Harsha Vardhana Reddy',
    image: ogImage,
    '@id': canonicalUrl,
    url: canonicalUrl,
    telephone: '+919959964567',
    email: 'drharsha4488@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Yashoda Hospitals, Hi-Tech City, Madhapur',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500081',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 17.4477,
      longitude: 78.3873,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    medicalSpecialty: [
      'Orthopedics',
      'Sports Medicine',
      'Joint Replacement Surgery',
      'Arthroscopic Surgery',
      'Trauma Surgery',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'DNB Orthopedics',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Continental Hospital, Hyderabad',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'MBA Hospital Administration',
        recognizedBy: {
          '@type': 'Organization',
          name: 'ICFAI Business School',
        },
      },
    ],
    memberOf: [
      {
        '@type': 'Organization',
        name: 'Indian Orthopaedic Association',
      },
      {
        '@type': 'Organization',
        name: 'Telangana Orthopaedic Association',
      },
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'K.V.G Medical College, Bangalore',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Dr. B Harsha Vardhana Reddy - Orthopedic Surgeon" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional Meta Tags for SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="author" content="Dr. B Harsha Vardhana Reddy" />
      <meta name="geo.region" content="IN-TG" />
      <meta name="geo.placename" content="Hyderabad" />
      <meta name="geo.position" content="17.4477;78.3873" />
      <meta name="ICBM" content="17.4477, 78.3873" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
