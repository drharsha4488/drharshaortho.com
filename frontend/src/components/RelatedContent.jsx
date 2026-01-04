import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Stethoscope, Syringe } from 'lucide-react';

// Related content suggestions for internal linking
const relatedContentMap = {
  // Knee related
  'knee-osteoarthritis': {
    conditions: ['meniscus-tear', 'acl-injury', 'patellofemoral-syndrome'],
    treatments: ['total-knee-replacement', 'arthroscopy', 'prp-therapy'],
    blogs: ['best-exercises-for-knee-pain-relief', 'how-to-avoid-knee-replacement-surgery']
  },
  'acl-injury': {
    conditions: ['meniscus-tear', 'knee-osteoarthritis', 'pcl-injury'],
    treatments: ['acl-reconstruction', 'arthroscopy', 'sports-injury-treatment'],
    blogs: ['can-acl-tear-heal-without-surgery']
  },
  'meniscus-tear': {
    conditions: ['acl-injury', 'knee-osteoarthritis'],
    treatments: ['arthroscopy', 'prp-therapy'],
    blogs: ['best-exercises-for-knee-pain-relief']
  },
  
  // Hip related
  'hip-arthritis': {
    conditions: ['avascular-necrosis', 'hip-bursitis'],
    treatments: ['total-hip-replacement', 'hip-resurfacing'],
    blogs: ['knee-replacement-age-limit-when-too-young-too-old']
  },
  
  // Shoulder related
  'rotator-cuff-tear': {
    conditions: ['frozen-shoulder', 'shoulder-impingement'],
    treatments: ['shoulder-surgery', 'arthroscopy', 'prp-therapy'],
    blogs: []
  },
  'frozen-shoulder': {
    conditions: ['rotator-cuff-tear', 'shoulder-impingement'],
    treatments: ['shoulder-surgery', 'physiotherapy'],
    blogs: []
  },
  
  // Treatment related
  'total-knee-replacement': {
    conditions: ['knee-osteoarthritis', 'rheumatoid-arthritis'],
    treatments: ['arthroscopy', 'prp-therapy'],
    blogs: ['knee-replacement-age-limit-when-too-young-too-old', 'robotic-knee-replacement-benefits-cost-hyderabad', 'how-to-avoid-knee-replacement-surgery']
  },
  'total-hip-replacement': {
    conditions: ['hip-arthritis', 'avascular-necrosis'],
    treatments: ['hip-resurfacing'],
    blogs: ['knee-replacement-age-limit-when-too-young-too-old']
  },
  'acl-reconstruction': {
    conditions: ['acl-injury', 'meniscus-tear'],
    treatments: ['arthroscopy', 'sports-injury-treatment'],
    blogs: ['can-acl-tear-heal-without-surgery']
  },
  'arthroscopy': {
    conditions: ['meniscus-tear', 'acl-injury', 'rotator-cuff-tear'],
    treatments: ['acl-reconstruction', 'shoulder-surgery'],
    blogs: []
  },
  'sports-injury-treatment': {
    conditions: ['acl-injury', 'meniscus-tear', 'tennis-elbow'],
    treatments: ['acl-reconstruction', 'arthroscopy', 'prp-therapy'],
    blogs: ['can-acl-tear-heal-without-surgery', 'best-exercises-for-knee-pain-relief']
  }
};

const conditionNames = {
  'knee-osteoarthritis': 'Knee Osteoarthritis',
  'acl-injury': 'ACL Injury',
  'meniscus-tear': 'Meniscus Tear',
  'hip-arthritis': 'Hip Arthritis',
  'rotator-cuff-tear': 'Rotator Cuff Tear',
  'frozen-shoulder': 'Frozen Shoulder',
  'tennis-elbow': 'Tennis Elbow',
  'avascular-necrosis': 'Avascular Necrosis',
  'pcl-injury': 'PCL Injury',
  'patellofemoral-syndrome': 'Patellofemoral Syndrome',
  'shoulder-impingement': 'Shoulder Impingement',
  'hip-bursitis': 'Hip Bursitis',
  'rheumatoid-arthritis': 'Rheumatoid Arthritis'
};

const treatmentNames = {
  'total-knee-replacement': 'Total Knee Replacement',
  'total-hip-replacement': 'Total Hip Replacement',
  'acl-reconstruction': 'ACL Reconstruction',
  'arthroscopy': 'Arthroscopy',
  'shoulder-surgery': 'Shoulder Surgery',
  'sports-injury-treatment': 'Sports Injury Treatment',
  'prp-therapy': 'PRP Therapy',
  'fracture-care': 'Fracture Care',
  'hip-resurfacing': 'Hip Resurfacing',
  'physiotherapy': 'Physiotherapy'
};

const blogNames = {
  'knee-replacement-age-limit-when-too-young-too-old': 'Knee Replacement Age Limit',
  'can-acl-tear-heal-without-surgery': 'Can ACL Tear Heal Without Surgery?',
  'best-exercises-for-knee-pain-relief': 'Best Exercises for Knee Pain',
  'robotic-knee-replacement-benefits-cost-hyderabad': 'Robotic Knee Replacement Guide',
  'how-to-avoid-knee-replacement-surgery': 'How to Avoid Knee Replacement'
};

const RelatedContent = ({ currentSlug, type = 'condition' }) => {
  const related = relatedContentMap[currentSlug];
  
  if (!related) return null;

  const hasContent = related.conditions?.length > 0 || related.treatments?.length > 0 || related.blogs?.length > 0;
  
  if (!hasContent) return null;

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 md:p-8 border border-primary/10">
      <h3 className="text-xl font-semibold text-foreground mb-6">Related Information</h3>
      
      <div className="space-y-6">
        {/* Related Conditions */}
        {related.conditions?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Stethoscope className="w-5 h-5 text-primary" />
              <h4 className="font-medium text-foreground">Related Conditions</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {related.conditions.map(slug => (
                <Link
                  key={slug}
                  to={`/conditions/${slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white rounded-full text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors border border-border"
                >
                  {conditionNames[slug] || slug}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Treatments */}
        {related.treatments?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Syringe className="w-5 h-5 text-primary" />
              <h4 className="font-medium text-foreground">Treatment Options</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {related.treatments.map(slug => (
                <Link
                  key={slug}
                  to={`/treatments/${slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white rounded-full text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors border border-border"
                >
                  {treatmentNames[slug] || slug}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Blog Posts */}
        {related.blogs?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-primary" />
              <h4 className="font-medium text-foreground">Helpful Articles</h4>
            </div>
            <div className="space-y-2">
              {related.blogs.map(slug => (
                <Link
                  key={slug}
                  to={`/blog/${slug}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  {blogNames[slug] || slug}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground mb-3">Need expert advice on your condition?</p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          Book Consultation
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default RelatedContent;
