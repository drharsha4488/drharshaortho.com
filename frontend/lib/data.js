// Static data — all content lives here, no database needed
// Add new conditions/treatments by editing the JSON files in /lib/
// Add new blogs by adding entries to _blogs_data.json

import conditionsRaw from './_conditions_data.json';
import treatmentsRaw from './_treatments_data.json';
import blogsRaw from './_blogs_data.json';

// ── Conditions ──────────────────────────────────────────────────────────────
export function getAllConditions() {
  return conditionsRaw.map(c => ({
    slug: c.slug,
    title: c.title,
    meta_title: c.meta_title || c.title,
    meta_description: c.meta_description || '',
    keywords: c.keywords || '',
    content: c.content || {},
  }));
}

export function getConditionBySlug(slug) {
  return getAllConditions().find(c => c.slug === slug) || null;
}

export function getAllConditionSlugs() {
  return getAllConditions().map(c => ({ slug: c.slug }));
}

// ── Treatments ──────────────────────────────────────────────────────────────
export function getAllTreatments() {
  return treatmentsRaw.map(t => ({
    slug: t.slug,
    title: t.title,
    meta_title: t.meta_title || t.title,
    meta_description: t.meta_description || '',
    keywords: t.keywords || '',
    content: t.content || {},
  }));
}

export function getTreatmentBySlug(slug) {
  return getAllTreatments().find(t => t.slug === slug) || null;
}

export function getAllTreatmentSlugs() {
  return getAllTreatments().map(t => ({ slug: t.slug }));
}

// ── Blog Posts ───────────────────────────────────────────────────────────────
export function getAllBlogs() {
  return blogsRaw
    .map(b => ({
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt || '',
      content: b.content || '',
      tags: b.tags || [],
      image_url: b.image_url || '',
      published_date: b.published_date || '',
      author: b.author || 'Dr. B Harsha Vardhana Reddy',
    }))
    .sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
}

export function getBlogBySlug(slug) {
  return getAllBlogs().find(b => b.slug === slug) || null;
}

export function getAllBlogSlugs() {
  return getAllBlogs().map(b => ({ slug: b.slug }));
}

// ── WhatsApp helpers ─────────────────────────────────────────────────────────
export const WHATSAPP_NUMBER = '919959964567';

export function whatsappUrl(message = 'Hello Dr. Harsha, I would like to book an appointment for orthopedic consultation.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
