import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, MessageCircle, Calendar, User, Tag } from 'lucide-react';
import { getBlogBySlug, getAllBlogSlugs, whatsappUrl } from '@/lib/data';

export async function generateStaticParams() {
  return getAllBlogSlugs();
}

export async function generateMetadata({ params }) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) return { title: 'Article Not Found' };
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: { title: blog.title, description: blog.excerpt, images: blog.image_url ? [{ url: blog.image_url }] : [] },
    alternates: { canonical: `https://drharshaortho.com/blog/${params.slug}` },
  };
}

export default function BlogPostPage({ params }) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) notFound();
  const waMsg = `Hello Dr. Harsha, I read your article "${blog.title}" and would like to consult you.`;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white pt-20 pb-20 md:pt-24 md:pb-24">
        <div className="container-medical max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white truncate max-w-xs">{blog.title}</span>
          </nav>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex gap-2 mb-4">
              {blog.tags.map(tag => (
                <span key={tag} className="text-xs bg-white/10 text-white/80 px-3 py-1 rounded-full border border-white/20">{tag}</span>
              ))}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-6 leading-tight">{blog.title}</h1>
          <div className="flex items-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-2"><User className="w-4 h-4" />{blog.author}</span>
            {blog.published_date && <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{new Date(blog.published_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
          </div>
        </div>
      </section>

      {blog.image_url && (
        <div className="container-medical max-w-4xl -mt-8 px-4">
          <img src={blog.image_url} alt={blog.title} className="w-full aspect-video object-cover rounded-xl shadow-xl" loading="eager" />
        </div>
      )}

      <article className="section-padding">
        <div className="container-medical max-w-4xl">
          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* WhatsApp CTA after article */}
          <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-teal-light rounded-2xl border border-green-200">
            <h3 className="text-xl font-serif font-semibold text-foreground mb-2">Have Questions?</h3>
            <p className="text-muted-foreground mb-4 text-sm">Dr. Harsha is available on WhatsApp for consultations and appointment bookings.</p>
            <a href={whatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp" data-testid="blog-whatsapp-btn">
              <MessageCircle className="w-5 h-5" /> Ask Dr. Harsha on WhatsApp
            </a>
          </div>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.excerpt,
        image: blog.image_url,
        datePublished: blog.published_date,
        author: { '@type': 'Person', name: blog.author },
        publisher: { '@type': 'Organization', name: 'Dr. Harsha Orthopedic Centre', logo: { '@type': 'ImageObject', url: 'https://drharshaortho.com/images/dr-harsha-logo.png' } },
      })}} />
    </>
  );
}
