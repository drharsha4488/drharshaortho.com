import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata = {
  metadataBase: new URL('https://drharshaortho.com'),
  title: {
    default: 'Dr. B Harsha Vardhana Reddy | Best Orthopedic Surgeon in Hyderabad',
    template: '%s | Dr. Harsha Orthopedic Centre',
  },
  description: 'Expert orthopedic surgeon in Hyderabad specializing in knee replacement, hip replacement, ACL surgery, and sports injuries. Apollo Hospitals, Financial District.',
  keywords: 'orthopedic surgeon hyderabad, knee replacement hyderabad, hip replacement hyderabad, sports injury doctor hyderabad',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://drharshaortho.com',
    siteName: 'Dr. Harsha Orthopedic Centre',
    title: 'Dr. B Harsha Vardhana Reddy | Best Orthopedic Surgeon in Hyderabad',
    description: 'Expert orthopedic surgeon in Hyderabad. Apollo Hospitals, Financial District.',
    images: [{ url: '/images/dr-harsha-profile-optimized.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://drharshaortho.com' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Physician',
              name: 'Dr. B Harsha Vardhana Reddy',
              description: 'Expert orthopedic surgeon with 15+ years of experience in joint replacement, sports medicine, and trauma surgery.',
              telephone: '+91-9959964567',
              url: 'https://drharshaortho.com',
              image: 'https://drharshaortho.com/images/dr-harsha-profile-optimized.jpg',
              medicalSpecialty: 'Orthopedic Surgery',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Apollo Hospitals, Financial District, Nanakramguda',
                addressLocality: 'Hyderabad',
                addressRegion: 'Telangana',
                postalCode: '500032',
                addressCountry: 'IN',
              },
              geo: { '@type': 'GeoCoordinates', latitude: 17.4167554, longitude: 78.3550579 },
              openingHours: 'Mo-Sa 09:00-17:00',
              sameAs: ['https://www.apollo247.com/doctors/dr-b-harsha-vardhana-reddy-51807eec-1507-467c-91fb-4c6b2cb599ff'],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 lg:pt-20">{children}</main>
        <Footer />
        <WhatsAppButton variant="float" />
      </body>
    </html>
  );
}
