import { getAllConditions, getAllTreatments, getAllBlogs } from '@/lib/data';
import { getAllSEOPageSlugs } from '@/lib/seoData';

const BASE_URL = 'https://drharshaortho.com';

export default function sitemap() {
  const conditions = getAllConditions().map(c => ({
    url: `${BASE_URL}/conditions/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const treatments = getAllTreatments().map(t => ({
    url: `${BASE_URL}/treatments/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogs = getAllBlogs().map(b => ({
    url: `${BASE_URL}/blog/${b.slug}`,
    lastModified: b.published_date ? new Date(b.published_date) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const seoPages = getAllSEOPageSlugs().map(({ slug }) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/conditions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/treatments`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/testimonials`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  return [...staticPages, ...conditions, ...treatments, ...blogs, ...seoPages];
}
