import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  User, 
  Clock, 
  Loader2, 
  ArrowRight,
  Search,
  Filter,
  BookOpen,
  TrendingUp,
  Star
} from 'lucide-react';
import staticBlogPosts from '@/data/blogPosts';
import { seoBlogPosts } from '@/data/seoBlogPosts';
import newBlogPosts from '@/data/newBlogPosts';

// Blog categories for filtering
const BLOG_CATEGORIES = [
  { id: 'all', label: 'All Articles', icon: BookOpen },
  { id: 'knee', label: 'Knee', icon: null },
  { id: 'hip', label: 'Hip', icon: null },
  { id: 'shoulder', label: 'Shoulder', icon: null },
  { id: 'sports', label: 'Sports Injury', icon: null },
  { id: 'recovery', label: 'Recovery', icon: null },
];

// Curated visible blogs for the main website
const VISIBLE_BLOG_LIMIT = 12;

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/visible`);
        if (response.ok) {
          const apiBlogs = await response.json();
          const apiPostIds = apiBlogs.map(p => p.id || p.slug);
          const uniqueNewPosts = newBlogPosts.filter(p => !apiPostIds.includes(p.id) && !apiPostIds.includes(p.slug));
          const uniqueSEOPosts = seoBlogPosts.filter(p => !apiPostIds.includes(p.id) && !apiPostIds.includes(p.slug)).slice(0, 6);
          const uniqueStaticPosts = staticBlogPosts.filter(p => !apiPostIds.includes(p.id));
          
          const allVisibleBlogs = [...apiBlogs, ...uniqueNewPosts, ...uniqueSEOPosts, ...uniqueStaticPosts];
          setBlogPosts(allVisibleBlogs.slice(0, VISIBLE_BLOG_LIMIT));
          setFilteredPosts(allVisibleBlogs.slice(0, VISIBLE_BLOG_LIMIT));
        } else {
          const curatedPosts = [...newBlogPosts, ...seoBlogPosts.slice(0, 6), ...staticBlogPosts];
          setBlogPosts(curatedPosts.slice(0, VISIBLE_BLOG_LIMIT));
          setFilteredPosts(curatedPosts.slice(0, VISIBLE_BLOG_LIMIT));
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        const curatedPosts = [...newBlogPosts, ...seoBlogPosts.slice(0, 6), ...staticBlogPosts];
        setBlogPosts(curatedPosts.slice(0, VISIBLE_BLOG_LIMIT));
        setFilteredPosts(curatedPosts.slice(0, VISIBLE_BLOG_LIMIT));
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPosts();
  }, []);

  // Filter posts by category and search
  useEffect(() => {
    let filtered = blogPosts;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(post => {
        const postTags = (post.tags || []).map(t => t.toLowerCase());
        const postTitle = (post.title || '').toLowerCase();
        const category = activeCategory.toLowerCase();
        return postTags.some(tag => tag.includes(category)) || postTitle.includes(category);
      });
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        (post.tags || []).some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredPosts(filtered);
  }, [activeCategory, searchQuery, blogPosts]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getReadTime = (post) => {
    return post.readTime || '5 min read';
  };

  // Get featured post (first one)
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <Layout>
      <SEO 
        title="Orthopedic Health Blog | Expert Tips & Medical Advice | Dr. Harsha Reddy"
        description="Read expert articles on knee replacement, hip surgery, ACL injury, sports medicine, and orthopedic care. Evidence-based health tips from Dr. B Harsha Vardhana Reddy, Hyderabad's leading orthopedic surgeon."
        keywords="orthopedic blog, knee pain tips, hip replacement recovery, ACL injury prevention, sports medicine articles, bone health, joint care tips, orthopedic health Hyderabad"
      />
      <SchemaMarkup type="Blog" data={{ name: 'Dr. Harsha Orthopedic Blog' }} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="container-medical section-padding relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary-foreground rounded-full mb-6"
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium text-white">Medical Knowledge Hub</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-white mb-6"
            >
              Orthopedic Health Blog
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-300 mb-8"
            >
              Expert insights, treatment guides, and recovery tips from Dr. B Harsha Vardhana Reddy 
              with 15+ years of experience and 4,000+ successful surgeries.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-md mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-16 lg:top-20 z-40 bg-white border-b border-border shadow-sm">
        <div className="container-medical">
          <div className="flex overflow-x-auto gap-2 py-4 -mx-4 px-4 scrollbar-hide">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                {cat.icon && <cat.icon className="w-4 h-4" />}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section-padding bg-gradient-to-b from-background to-secondary/30">
        <div className="container-medical">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <span className="ml-4 text-lg text-muted-foreground">Loading articles...</span>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
              <Button onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}>
                View All Articles
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Star className="w-5 h-5 text-accent" />
                    <span className="text-sm font-semibold text-accent">Featured Article</span>
                  </div>
                  
                  <Link to={featuredPost.slug ? `/blog/${featuredPost.slug}` : '#'}>
                    <article className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300">
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Image */}
                        <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                          <img
                            src={featuredPost.imageUrl || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80'}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r" />
                          <div className="absolute bottom-4 left-4 md:hidden">
                            <span className="inline-block px-3 py-1 bg-primary text-white text-xs rounded-full">
                              {featuredPost.tags?.[0] || 'Orthopedics'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 md:p-8 flex flex-col justify-center">
                          <div className="hidden md:flex flex-wrap gap-2 mb-4">
                            {(featuredPost.tags || []).slice(0, 3).map((tag) => (
                              <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                            {featuredPost.title}
                          </h2>
                          
                          <p className="text-muted-foreground mb-6 line-clamp-3">
                            {featuredPost.excerpt}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{featuredPost.author || 'Dr. Harsha Reddy'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(featuredPost.published_date || featuredPost.publishedDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{getReadTime(featuredPost)}</span>
                            </div>
                          </div>
                          
                          <Button className="w-fit gap-2 group-hover:gap-3 transition-all">
                            Read Full Article
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              )}

              {/* Posts Grid */}
              {remainingPosts.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Latest Articles</span>
                    <span className="text-sm text-muted-foreground">({remainingPosts.length} articles)</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {remainingPosts.map((post, i) => (
                      <motion.article
                        key={post.id || i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link to={post.slug ? `/blog/${post.slug}` : '#'} className="group block h-full">
                          <div className="bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={post.imageUrl || `https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&sig=${i}`}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-3 left-3">
                                <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-medium rounded-full">
                                  {post.tags?.[0] || 'Orthopedics'}
                                </span>
                              </div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-5 flex flex-col flex-1">
                              <h3 className="font-serif font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                              
                              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                                {post.excerpt}
                              </p>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{formatDate(post.published_date || post.publishedDate)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{getReadTime(post)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary/90">
        <div className="container-medical">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
              Stay Updated with Health Tips
            </h2>
            <p className="text-white/80 mb-8">
              Have questions about orthopedic health? Book a consultation with Dr. Harsha Reddy 
              for personalized advice and treatment options.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:brightness-110 text-accent-foreground gap-2">
                  Book Consultation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="tel:+919959964567">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Call +91 99599 64567
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
