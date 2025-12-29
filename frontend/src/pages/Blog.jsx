import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Calendar, User } from 'lucide-react';
import { getBlogPosts } from '@/lib/api';

import blogPosts from '@/data/blogPosts';

const fallbackBlogPosts = blogPosts.slice(0, 3);

const Blog = () => {
  const [posts, setPosts] = useState(fallbackBlogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts();
        if (data && data.length > 0) {
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Layout>
      <SEO 
        title="Orthopedic Health Blog - Expert Tips & Advice | Dr. B Harsha Vardhana Reddy"
        description="Read expert articles on knee health, hip replacement recovery, ACL injury prevention, sports medicine, and orthopedic care by Dr. B Harsha Vardhana Reddy, Hyderabad leading orthopedic surgeon."
        keywords="orthopedic blog, knee pain tips, hip replacement recovery, ACL injury prevention, sports medicine articles, bone health, joint care tips, orthopedic health Hyderabad"
      />
      <section className="section-padding bg-gradient-to-br from-background to-teal-light" data-testid="blog-page">
        <div className="container-medical">
          <SectionHeading
            badge="Medical Blog"
            title="Orthopedic Health Insights"
            subtitle="Stay informed with the latest articles on orthopedic health, treatments, and recovery tips from Dr. B Harsha Vardhana Reddy."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border"
                data-testid={`blog-post-${i}`}
              >
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags && post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-teal-light text-primary text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-serif font-semibold text-xl text-foreground mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.published_date)}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {posts.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
