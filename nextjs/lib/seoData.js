// All static SEO landing page slugs — for Next.js generateStaticParams
// These are pre-rendered at build time for instant Google indexing

export { seoLandingPages } from './seoPages.js';
export { locationLandingPages } from './locationPages.js';
export { locationLandingPages as locationLandingPages2 } from './locationPages2.js';
export { locationLandingPages as locationLandingPages3 } from './locationPages3.js';
export { extendedSEOPages } from './extendedSEOPages.js';
export { moreSEOPages } from './moreSEOPages.js';

// Gather ALL static page slugs for generateStaticParams
export function getAllSEOPageSlugs() {
  const { seoLandingPages } = require('./seoPages.js');
  const { locationLandingPages } = require('./locationPages.js');
  const { locationLandingPages: lp2 } = require('./locationPages2.js');
  const { locationLandingPages: lp3 } = require('./locationPages3.js');
  const { extendedSEOPages } = require('./extendedSEOPages.js');
  const { moreSEOPages } = require('./moreSEOPages.js');

  const all = [
    ...(seoLandingPages || []),
    ...(locationLandingPages || []),
    ...(lp2 || []),
    ...(lp3 || []),
    ...(extendedSEOPages || []),
    ...(moreSEOPages || []),
  ];
  return all.map(p => ({ slug: p.slug || p.id })).filter(p => p.slug);
}

export function getSEOPageBySlug(slug) {
  const { seoLandingPages } = require('./seoPages.js');
  const { locationLandingPages } = require('./locationPages.js');
  const { locationLandingPages: lp2 } = require('./locationPages2.js');
  const { locationLandingPages: lp3 } = require('./locationPages3.js');
  const { extendedSEOPages } = require('./extendedSEOPages.js');
  const { moreSEOPages } = require('./moreSEOPages.js');

  const all = [
    ...(seoLandingPages || []),
    ...(locationLandingPages || []),
    ...(lp2 || []),
    ...(lp3 || []),
    ...(extendedSEOPages || []),
    ...(moreSEOPages || []),
  ];
  return all.find(p => (p.slug || p.id) === slug) || null;
}
