import Link from 'next/link';
import { ChevronRight, MessageCircle, Calendar, Tag, User } from 'lucide-react';
import { getAllBlogs, whatsappUrl } from '@/lib/data';

export const metadata = {
  title: 'Orthopedic Health Blog | Expert Tips by Dr. Harsha',
  description: 'Read expert orthopedic health tips, treatment guides, and patient education articles by Dr. B Harsha Vardhana Reddy, Hyderabad.',
  alternates: { canonical: 'https://drharshaortho.com/blog' },
};

export default function BlogPage() {
  const blogs = getAllBlogs();
  return (
    <>
      <section className="bg-gradient-to-r from-charcoal to-charcoal/90 text-white py-16">
        <div className="container-medical">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Blog</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">Orthopedic Health Blog</h1>
          <p className="text-xl text-white/85 max-w-3xl">Expert insights on joint health, surgery, recovery, and orthopedic care.</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-medical">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(b => (
              <Link key={b.slug} href={`/blog/${b.slug}`}
                className="bg-card border border-border hover:border-primary hover:shadow-lg rounded-xl overflow-hidden transition-all group"
                data-testid={`blog-card-${b.slug}`}
              >
                {b.image_url && (
                  <div className="aspect-video overflow-hidden bg-secondary">
                    <img src={b.image_url} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                )}
                <div className="p-5">
                  {b.tags && b.tags.length > 0 && (
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {b.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  )}
                  <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">{b.title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{b.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{b.author}</span>
                    {b.published_date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(b.published_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
