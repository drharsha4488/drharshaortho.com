// Custom hook for fetching CMS content with fallback to static data
import { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

/**
 * Fetch CMS content with fallback to static data
 * @param {string} type - Content type: 'condition', 'treatment', 'blog'
 * @param {string} slug - Content slug (optional, for single item)
 * @param {any} staticData - Fallback static data
 */
export const useCmsContent = (type, slug = null, staticData = null) => {
  const [data, setData] = useState(staticData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCms, setIsCms] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // Build the API endpoint
        let endpoint;
        if (slug) {
          endpoint = `${API_URL}/api/cms/${type}s/${slug}`;
        } else {
          endpoint = `${API_URL}/api/cms/${type}s`;
        }
        
        const response = await fetch(endpoint);
        
        if (response.ok) {
          const cmsData = await response.json();
          if (cmsData && (Array.isArray(cmsData) ? cmsData.length > 0 : Object.keys(cmsData).length > 0)) {
            setData(cmsData);
            setIsCms(true);
          } else {
            // Fall back to static data
            setData(staticData);
            setIsCms(false);
          }
        } else if (response.status === 404) {
          // Not found in CMS, use static data
          setData(staticData);
          setIsCms(false);
        } else {
          throw new Error('Failed to fetch CMS content');
        }
      } catch (err) {
        console.warn(`CMS fetch failed for ${type}/${slug || 'all'}, using static data:`, err.message);
        setData(staticData);
        setIsCms(false);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [type, slug, staticData]);

  return { data, loading, error, isCms };
};

/**
 * Transform CMS condition data to match static data format
 */
export const transformCmsCondition = (cmsData) => {
  if (!cmsData || !cmsData.content) return null;
  
  const content = cmsData.content;
  
  return {
    id: cmsData.slug,
    slug: cmsData.slug,
    name: cmsData.title,
    category: content.category || 'General',
    icon: content.icon || '🏥',
    imageUrl: content.imageUrl || null,
    shortDescription: cmsData.meta_description,
    overview: content.overview || content.introduction,
    causes: content.causes || [],
    symptoms: content.symptoms || [],
    diagnosis: content.diagnosis || [],
    nonSurgicalTreatments: content.nonSurgicalTreatments || content.treatments?.filter(t => !t.surgical) || [],
    surgicalTreatments: content.surgicalTreatments || content.treatments?.filter(t => t.surgical) || [],
    recoveryTimeline: content.recoveryTimeline || [],
    faqs: content.faqs || [],
    relatedConditions: content.relatedConditions || [],
    relatedTreatments: content.relatedTreatments || [],
    seoKeywords: cmsData.keywords?.join(', ') || '',
    metaDescription: cmsData.meta_description
  };
};

/**
 * Transform CMS treatment data to match static data format
 */
export const transformCmsTreatment = (cmsData) => {
  if (!cmsData || !cmsData.content) return null;
  
  const content = cmsData.content;
  
  return {
    id: cmsData.slug,
    slug: cmsData.slug,
    name: cmsData.title,
    category: content.category || 'General',
    icon: content.icon || '🏥',
    imageUrl: content.imageUrl || null,
    description: cmsData.meta_description,
    detailedDescription: content.detailedDescription || content.overview,
    benefits: content.benefits || [],
    procedure: content.procedure_steps?.map(s => s.description || s) || content.procedure || [],
    recovery: content.recovery,
    hospitalStay: content.hospitalStay,
    seoKeywords: cmsData.keywords?.join(', ') || ''
  };
};

/**
 * Transform CMS blog data to match static data format
 */
export const transformCmsBlog = (cmsData) => {
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

export default useCmsContent;
