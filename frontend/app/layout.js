import './globals.css';
import Script from 'next/script';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700'],
});

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
    <html lang="en" className={`${outfit.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Physician',
              name: 'Dr. B Harsha Vardhana Reddy',
              description: 'Senior Consultant Orthopedic Surgeon at Apollo Hospitals, Financial District, Hyderabad. DNB Orthopedics with fellowships in Arthroplasty and Arthroscopy. 15+ years of experience and 4,000+ successful surgeries spanning joint replacement, sports medicine, trauma, and regenerative orthopedics.',
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

        {/* Google Analytics — GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3P71PLBL85"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3P71PLBL85');
          `}
        </Script>
      </body>
    </html>
  );
}
