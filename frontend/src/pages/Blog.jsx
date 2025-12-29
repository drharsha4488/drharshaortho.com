import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Calendar, User, Clock, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import staticBlogPosts from '@/data/blogPosts';

const Blog = () => {
  const [expandedPost, setExpandedPost] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blog`);
        if (response.ok) {
          const data = await response.json();
          // Merge API data with static data for comprehensive content
          const apiPostIds = data.map(p => p.id);
          const uniqueStaticPosts = staticBlogPosts.filter(p => !apiPostIds.includes(p.id));
          setBlogPosts([...data, ...uniqueStaticPosts]);
        } else {
          // Fallback to static posts
          setBlogPosts(staticBlogPosts);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        // Fallback to static posts on error
        setBlogPosts(staticBlogPosts);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPosts();
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
            title="Orthopedic Health Insights & Expert Advice"
            subtitle="Stay informed with the latest articles on orthopedic health, treatments, recovery tips, and trending surgical techniques from Dr. B Harsha Vardhana Reddy."
          />

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading articles...</span>
            </div>
          ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl overflow-hidden shadow-md border border-border"
                data-testid={`blog-post-${i}`}
              >
                {/* Post Header */}
                <div className="p-6 md:p-8">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags && post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-teal-light text-primary text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="font-serif font-semibold text-2xl md:text-3xl text-foreground mb-4 leading-tight">
                    {post.title}
                  </h2>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.published_date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>8 min read</span>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Read More Button */}
                  <Button
                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    variant="outline"
                    className="gap-2"
                    data-testid={`expand-blog-${i}`}
                  >
                    {expandedPost === post.id ? (
                      <>
                        Show Less
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Read Full Article
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Expanded Content */}
                {expandedPost === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-border bg-secondary/30"
                  >
                    <div className="p-6 md:p-8 prose prose-slate max-w-none">
                      {/* Full Article Content */}
                      <div className="space-y-6">
                        <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                          Complete Guide
                        </h3>
                        
                        {/* Key Points */}
                        <div className="bg-teal-light rounded-lg p-6 my-6">
                          <h4 className="font-semibold text-lg text-foreground mb-3">Key Takeaways:</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>✅ Latest {post.tags[0]} techniques in 2025</li>
                            <li>✅ Evidence-based treatment approaches</li>
                            <li>✅ Recovery timelines and expectations</li>
                            <li>✅ Cost breakdown and insurance coverage</li>
                            <li>✅ Expert recommendations from 15+ years experience</li>
                          </ul>
                        </div>

                        {/* Article Body Preview */}
                        <div className="text-muted-foreground leading-relaxed space-y-4">
                          <p>
                            This comprehensive guide covers everything you need to know about {post.title.toLowerCase()}. 
                            Dr. B Harsha Vardhana Reddy, with over 15 years of experience and 4,000+ successful surgeries, 
                            shares his expert insights on this topic.
                          </p>
                          
                          <p>
                            At Yashoda Hospital Hitec City, we use the latest techniques and technology to ensure the best 
                            outcomes for our patients. This article is based on current medical evidence and real patient 
                            experiences from our practice.
                          </p>

                          {post.id === '1' && (
                            <div className="space-y-4">
                              <h4 className="font-semibold text-lg text-foreground mt-6">What is Robotic Knee Replacement?</h4>
                              <p>
                                Robotic-assisted total knee arthroplasty uses advanced computer technology and robotic arms 
                                to help surgeons achieve unprecedented precision during surgery. The system creates a 3D model 
                                of your knee from CT scans, allowing for personalized surgical planning.
                              </p>
                              
                              <h4 className="font-semibold text-lg text-foreground mt-6">Key Benefits:</h4>
                              <ul className="list-disc pl-6 space-y-2">
                                <li>95% better precision in bone cuts (accuracy to 0.5mm)</li>
                                <li>Longer implant lifespan - 20+ years vs 15 years traditional</li>
                                <li>Faster recovery - walk on day 1, stairs by day 2</li>
                                <li>Less pain due to minimal tissue damage</li>
                                <li>Better knee alignment leading to natural movement</li>
                              </ul>

                              <h4 className="font-semibold text-lg text-foreground mt-6">Cost in Hyderabad (2025):</h4>
                              <p>
                                Robotic knee replacement costs ₹3.5-5 lakhs at Yashoda Hospital, including all pre-operative 
                                assessments, surgery, high-quality US FDA approved implants, 3 days hospital stay, and initial 
                                physiotherapy. Most insurance companies cover 80-100% of the cost.
                              </p>

                              <h4 className="font-semibold text-lg text-foreground mt-6">Recovery Timeline:</h4>
                              <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Day 1:</strong> Stand and walk with walker</li>
                                <li><strong>Week 1:</strong> Climb stairs, reduce pain medications</li>
                                <li><strong>Week 2-4:</strong> Return to desk work, light activities</li>
                                <li><strong>Month 2-3:</strong> Resume normal daily activities</li>
                                <li><strong>Month 4-6:</strong> Return to low-impact sports</li>
                              </ul>
                            </div>
                          )}

                          {post.id === '2' && (
                            <div className="space-y-4">
                              <h4 className="font-semibold text-lg text-foreground mt-6">ACL Surgery Cost Breakdown:</h4>
                              <p>
                                At Yashoda Hospital with Dr. Harsha Reddy, ACL reconstruction costs ₹1.8-2.5 lakhs for standard 
                                procedure and ₹2.2-3 lakhs for comprehensive package including extended physiotherapy.
                              </p>

                              <h4 className="font-semibold text-lg text-foreground mt-6">What Affects the Cost?</h4>
                              <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Graft Type:</strong> Hamstring (₹1.8-2.2L), Patellar tendon (₹2-2.5L), Allograft (₹2.5-3L)</li>
                                <li><strong>Additional Injuries:</strong> Meniscus repair adds ₹40,000, Cartilage repair ₹50,000</li>
                                <li><strong>Implants:</strong> Bioabsorbable screws add ₹30,000, Imported implants ₹50,000</li>
                              </ul>

                              <h4 className="font-semibold text-lg text-foreground mt-6">Insurance Coverage:</h4>
                              <p>
                                Most health insurance policies cover ACL surgery with 80-100% coverage. Yashoda Hospital has 
                                cashless facility with 30+ insurance companies including Star Health, ICICI Lombard, HDFC Ergo. 
                                Pre-authorization required 3-5 days before surgery.
                              </p>
                            </div>
                          )}

                          {post.id === '3' && (
                            <div className="space-y-4">
                              <h4 className="font-semibold text-lg text-foreground mt-6">7 Common Causes of Knee Pain on Stairs:</h4>
                              <ol className="list-decimal pl-6 space-y-3">
                                <li><strong>Patellofemoral Pain Syndrome:</strong> Pain in front of knee, worse with stairs and squatting</li>
                                <li><strong>Meniscus Tear:</strong> Sharp pain, clicking, locking sensation</li>
                                <li><strong>Early Knee Arthritis:</strong> Gradual onset, morning stiffness</li>
                                <li><strong>Patellar Tendinitis:</strong> Pain below kneecap, common in athletes</li>
                                <li><strong>IT Band Syndrome:</strong> Outer knee pain, worse going downstairs</li>
                                <li><strong>Chondromalacia Patella:</strong> Grinding sensation with movement</li>
                                <li><strong>Ligament Injury:</strong> Instability, knee giving way</li>
                              </ol>

                              <h4 className="font-semibold text-lg text-foreground mt-6">When to See a Doctor:</h4>
                              <p className="text-red-600 font-semibold">Urgent - Within 24 hours if:</p>
                              <ul className="list-disc pl-6 space-y-2">
                                <li>Knee locking or inability to straighten</li>
                                <li>Severe swelling within 2 hours of injury</li>
                                <li>Inability to bear weight</li>
                                <li>Visible deformity</li>
                                <li>Pain after injury/fall</li>
                              </ul>
                            </div>
                          )}

                          {post.id === '4' && (
                            <div className="space-y-4">
                              <h4 className="font-semibold text-lg text-foreground mt-6">Week-by-Week Hip Replacement Recovery:</h4>
                              
                              <div className="bg-white rounded-lg p-4 my-4">
                                <p className="font-semibold text-primary mb-2">Days 1-3 (Hospital):</p>
                                <ul className="list-disc pl-6 space-y-1 text-sm">
                                  <li>Stand and walk with walker on day 1</li>
                                  <li>Climb 2-3 stairs with supervision</li>
                                  <li>Pain controlled with medications</li>
                                  <li>Learn hip precautions</li>
                                </ul>
                              </div>

                              <div className="bg-white rounded-lg p-4 my-4">
                                <p className="font-semibold text-primary mb-2">Week 1 at Home:</p>
                                <ul className="list-disc pl-6 space-y-1 text-sm">
                                  <li>Walk 200-300 feet daily</li>
                                  <li>Gentle exercises 3 times per day</li>
                                  <li>Use elevated toilet seat</li>
                                  <li>Keep pillow between legs when sleeping</li>
                                </ul>
                              </div>

                              <div className="bg-white rounded-lg p-4 my-4">
                                <p className="font-semibold text-primary mb-2">Weeks 2-4:</p>
                                <ul className="list-disc pl-6 space-y-1 text-sm">
                                  <li>Graduate from walker to cane</li>
                                  <li>Walk 15-20 minutes continuously</li>
                                  <li>Return to desk work</li>
                                  <li>Drive automatic car (with approval)</li>
                                </ul>
                              </div>

                              <div className="bg-white rounded-lg p-4 my-4">
                                <p className="font-semibold text-primary mb-2">Months 2-3:</p>
                                <ul className="list-disc pl-6 space-y-1 text-sm">
                                  <li>No assistive devices needed</li>
                                  <li>Return to most normal activities</li>
                                  <li>Swimming and low-impact sports</li>
                                  <li>90% daily function restored</li>
                                </ul>
                              </div>
                            </div>
                          )}

                          {post.id === '5' && (
                            <div className="space-y-4">
                              <h4 className="font-semibold text-lg text-foreground mt-6">8 Causes of Nighttime Shoulder Pain:</h4>
                              <ol className="list-decimal pl-6 space-y-3">
                                <li><strong>Rotator Cuff Tear:</strong> Most common cause, worse when lying down</li>
                                <li><strong>Frozen Shoulder:</strong> Severe stiffness, progressive worsening</li>
                                <li><strong>Shoulder Bursitis:</strong> Pain on outer shoulder</li>
                                <li><strong>Shoulder Arthritis:</strong> Deep ache, grinding sensation</li>
                                <li><strong>Cervical Radiculopathy:</strong> Neck problem radiating to shoulder</li>
                                <li><strong>Biceps Tendinitis:</strong> Front shoulder pain</li>
                                <li><strong>Shoulder Impingement:</strong> Pain with overhead activities</li>
                                <li><strong>Referred Pain:</strong> Heart or gallbladder (EMERGENCY!)</li>
                              </ol>

                              <h4 className="font-semibold text-lg text-foreground mt-6">Best Sleeping Positions:</h4>
                              <ul className="list-disc pl-6 space-y-2">
                                <li>Sleep on non-painful side with pillow hugged to chest</li>
                                <li>Back sleeping with pillow under injured arm</li>
                                <li>Recliner chair (semi-upright) - best for rotator cuff tears</li>
                              </ul>

                              <h4 className="font-semibold text-lg text-foreground mt-6">Immediate Relief Tonight:</h4>
                              <ul className="list-disc pl-6 space-y-2">
                                <li>Ice shoulder for 15 minutes before bed</li>
                                <li>Take anti-inflammatory (if no contraindications)</li>
                                <li>Use pillow support when sleeping</li>
                                <li>Gentle pendulum exercises</li>
                                <li>Sleep in recliner or with wedge pillow</li>
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* CTA Section */}
                        <div className="mt-8 bg-primary rounded-xl p-6 text-white">
                          <h4 className="font-semibold text-xl mb-3">Need Expert Consultation?</h4>
                          <p className="mb-4">
                            Book an appointment with Dr. B Harsha Vardhana Reddy at Yashoda Hospital, Hitec City, Hyderabad.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <a href="/contact">
                              <Button className="bg-white text-primary hover:bg-gray-100">
                                Book Appointment
                              </Button>
                            </a>
                            <a href="tel:+919959964567">
                              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                                Call +91 99599 64567
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.article>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Want to learn more about a specific orthopedic topic?
            </p>
            <a href="/contact">
              <Button size="lg" className="bg-primary text-white">
                Request a Topic
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
