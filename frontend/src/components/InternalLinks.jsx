import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Stethoscope, Activity } from 'lucide-react';

/**
 * Enhanced Internal Linking Component for SEO
 * Displays related content to improve site structure and crawlability
 */
const InternalLinks = ({ 
  currentType, // 'condition', 'treatment', 'blog'
  currentSlug,
  relatedConditions = [],
  relatedTreatments = [],
  relatedBlogs = []
}) => {
  
  // Filter out current item
  const filteredConditions = relatedConditions.filter(c => c.slug !== currentSlug).slice(0, 4);
  const filteredTreatments = relatedTreatments.filter(t => t.id !== currentSlug).slice(0, 4);
  const filteredBlogs = relatedBlogs.filter(b => b.slug !== currentSlug).slice(0, 3);

  if (filteredConditions.length === 0 && filteredTreatments.length === 0 && filteredBlogs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-medical">
        <h2 className="text-2xl font-serif font-semibold mb-8 text-center">
          Related Information
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Related Conditions */}
          {filteredConditions.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Related Conditions</h3>
              </div>
              <ul className="space-y-3">
                {filteredConditions.map((condition, idx) => (
                  <li key={idx}>
                    <Link 
                      to={`/conditions/${condition.slug || condition.id}`}
                      className="flex items-center justify-between text-gray-700 hover:text-primary transition-colors group"
                    >
                      <span className="text-sm">{condition.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link 
                to="/conditions" 
                className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 hover:underline"
              >
                View All Conditions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Related Treatments */}
          {filteredTreatments.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Treatment Options</h3>
              </div>
              <ul className="space-y-3">
                {filteredTreatments.map((treatment, idx) => (
                  <li key={idx}>
                    <Link 
                      to={`/treatments/${treatment.id}`}
                      className="flex items-center justify-between text-gray-700 hover:text-primary transition-colors group"
                    >
                      <span className="text-sm">{treatment.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link 
                to="/treatments" 
                className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 hover:underline"
              >
                View All Treatments <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Related Blog Posts */}
          {filteredBlogs.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Related Articles</h3>
              </div>
              <ul className="space-y-3">
                {filteredBlogs.map((blog, idx) => (
                  <li key={idx}>
                    <Link 
                      to={`/blog/${blog.slug}`}
                      className="flex items-center justify-between text-gray-700 hover:text-primary transition-colors group"
                    >
                      <span className="text-sm line-clamp-1">{blog.title}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 hover:underline"
              >
                Read More Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Cross-promotion CTA */}
        <div className="mt-10 text-center bg-gradient-to-r from-primary/10 to-teal-100 rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-2">Need Expert Advice?</h3>
          <p className="text-gray-600 mb-4">
            Consult with Dr. B Harsha Vardhana Reddy for personalized treatment recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Book Appointment
            </Link>
            <a 
              href="tel:+919959964567" 
              className="border border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary/10 transition-colors"
            >
              Call: +91 99599 64567
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternalLinks;
