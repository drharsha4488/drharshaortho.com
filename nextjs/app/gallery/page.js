import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/data';

export const metadata = {
  title: 'Gallery | Dr. Harsha Orthopedic Centre',
  description: 'Photos from the orthopedic centre at Apollo Hospitals, Hyderabad — surgical theatre, patient care, and facilities.',
  alternates: { canonical: 'https://drharshaortho.com/gallery' },
};

export default function GalleryPage() {
  const images = [
    { src: '/images/dr-harsha-profile-optimized.jpg', alt: 'Dr. B Harsha Vardhana Reddy', caption: 'Dr. B Harsha Vardhana Reddy, Senior Orthopedic Surgeon' },
    { src: '/images/dr-harsha-profile-optimized.jpg', alt: 'Apollo Hospitals', caption: 'Apollo Hospitals, Financial District, Hyderabad' },
    { src: '/images/dr-harsha-profile-optimized.jpg', alt: 'Orthopedic Surgery', caption: 'State-of-the-art surgical theatre' },
    { src: '/images/dr-harsha-profile-optimized.jpg', alt: 'Patient Care', caption: 'Personalized patient care' },
    { src: '/images/dr-harsha-profile-optimized.jpg', alt: 'Robotic Surgery', caption: 'Advanced robotic surgery system' },
    { src: '/images/dr-harsha-profile-optimized.jpg', alt: 'Recovery', caption: 'Post-operative recovery suite' },
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-charcoal to-charcoal/90 text-white py-16">
        <div className="container-medical">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">Gallery</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">Gallery</h1>
          <p className="text-xl text-white/85 max-w-3xl">A glimpse into our world-class orthopedic centre at Apollo Hospitals, Hyderabad.</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-medical">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video overflow-hidden">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-foreground">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-primary text-white">
        <div className="container-medical text-center">
          <h2 className="text-2xl font-serif font-semibold mb-4">Visit Our Centre</h2>
          <p className="text-white/85 mb-6">Apollo Hospitals, Financial District, Hyderabad.</p>
          <a href={whatsappUrl('Hello Dr. Harsha, I would like to visit the centre and book a consultation.')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle className="w-5 h-5" /> Book on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
