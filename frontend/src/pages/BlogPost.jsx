import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Phone,
  Share2,
  Tag,
  Loader2
} from 'lucide-react';
import { seoBlogPosts } from '@/data/seoBlogPosts';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

// Transform CMS blog data to match static data format
const transformCmsBlog = (cmsData) => {
  if (!cmsData || !cmsData.content) return null;
  const content = cmsData.content;
  
  return {
    id: cmsData.slug,
    slug: cmsData.slug,
    title: cmsData.title,
    metaTitle: cmsData.meta_title,
    metaDescription: cmsData.meta_description,
    keywords: cmsData.keywords?.join(', '),
    author: content.author || 'Dr. B Harsha Vardhana Reddy',
    publishedDate: cmsData.published_at || cmsData.created_at,
    category: content.category || 'General',
    readTime: content.readTime || '5 min',
    imageUrl: content.imageUrl,
    excerpt: content.excerpt,
    content: content.body || content.content,
    tags: cmsData.keywords || []
  };
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCms, setIsCms] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        // Try to fetch from CMS first
        const response = await fetch(`${API_URL}/api/cms/blogs/${slug}`);
        if (response.ok) {
          const cmsData = await response.json();
          const transformedData = transformCmsBlog(cmsData);
          if (transformedData) {
            setPost(transformedData);
            setIsCms(true);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('CMS fetch failed, using static data:', err.message);
      }
      
      // Fallback to static data
      const staticPost = seoBlogPosts.find(p => p.slug === slug);
      setPost(staticPost);
      setIsCms(false);
      setLoading(false);
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }
  
  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Article Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": "Orthopedic Surgeon",
      "affiliation": "Yashoda Hospital, Hyderabad"
    },
    "datePublished": post.publishedDate,
    "image": post.imageUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Dr. B Harsha Vardhana Reddy",
      "logo": "https://drharshaortho.com/images/dr-harsha-logo.png"
    }
  };

  return (
    <Layout>
      <SEO 
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.keywords}
      />
      
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>

      {/* Breadcrumb with Schema */}
      <div className="bg-secondary py-3">
        <div className="container-medical">
          <Breadcrumbs 
            items={[
              { name: 'Blog', path: '/blog' },
              { name: post.title, path: `/blog/${slug}` }
            ]}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 h-[300px] md:h-[400px]">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        </div>
        <div className="relative container-medical pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 mb-4"
            >
              <span className="inline-block px-3 py-1 bg-primary text-white text-xs rounded-full">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1 text-white/80 text-sm">
                <Clock className="w-4 h-4" />
                {post.readTime} read
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-white mb-4"
            >
              {post.title}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 text-white/80 text-sm"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedDate).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding -mt-16">
        <div className="container-medical">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl shadow-lg p-6 md:p-10">
              {/* Article Body */}
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:font-serif prose-headings:text-foreground
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-li:text-muted-foreground
                  prose-strong:text-foreground
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-table:border-collapse prose-table:w-full
                  prose-th:bg-secondary prose-th:p-3 prose-th:text-left prose-th:border prose-th:border-border
                  prose-td:p-3 prose-td:border prose-td:border-border"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>').replace(/## /g, '</p><h2>').replace(/### /g, '</p><h3>').replace(/<h2>/g, '</h3><h2>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-border">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-secondary text-muted-foreground px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Box */}
              <div className="mt-10 p-6 bg-secondary rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{post.author}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Senior Consultant Orthopedic Surgeon, Yashoda Hospital, Hyderabad
                    </p>
                    <p className="text-sm text-muted-foreground">
                      DNB Orthopedics | Fellowship in Joint Replacement | 15+ Years Experience
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-white text-center">
              <h3 className="text-xl md:text-2xl font-serif font-semibold mb-3">
                Have Questions? Get Expert Answers
              </h3>
              <p className="text-white/90 mb-6">
                Schedule a consultation with Dr. Harsha for personalized advice
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact">
                  <Button size="lg" className="w-full sm:w-auto bg-accent hover:brightness-110 text-accent-foreground">
                    Book Consultation
                  </Button>
                </Link>
                <a href="tel:+919959964567">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-8 text-center">
              <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline">
                <ArrowLeft className="w-4 h-4" />
                Back to All Articles
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
