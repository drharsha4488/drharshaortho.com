// All static SEO landing page slugs — for Next.js generateStaticParams
// These are pre-rendered at build time for instant Google indexing

export { seoLandingPages } from './seoPages.js';
export { locationLandingPages } from './locationPages.js';
export { extendedLocationPages2 } from './locationPages2.js';
export { additionalLocationPages } from './locationPages3.js';
export {
  extendedLocationPages,
  additionalCostPages,
  sportsInjuryPages,
  ageSpecificPages,
} from './extendedSEOPages.js';
export {
  locationSEOPages as moreLocationPages,
  procedureSEOPages as moreProcedurePages,
  conditionSEOPages as moreConditionPages,
} from './moreSEOPages.js';

function collectAll() {
  const { seoLandingPages } = require('./seoPages.js');
  const { locationLandingPages } = require('./locationPages.js');
  const { extendedLocationPages2 } = require('./locationPages2.js');
  const { additionalLocationPages } = require('./locationPages3.js');
  const {
    extendedLocationPages,
    additionalCostPages,
    sportsInjuryPages,
    ageSpecificPages,
  } = require('./extendedSEOPages.js');
  const {
    locationSEOPages: mLoc,
    procedureSEOPages: mProc,
    conditionSEOPages: mCond,
  } = require('./moreSEOPages.js');

  return [
    ...(seoLandingPages || []),
    ...(locationLandingPages || []),
    ...(extendedLocationPages2 || []),
    ...(additionalLocationPages || []),
    ...(extendedLocationPages || []),
    ...(additionalCostPages || []),
    ...(sportsInjuryPages || []),
    ...(ageSpecificPages || []),
    ...(mLoc || []),
    ...(mProc || []),
    ...(mCond || []),
  ];
}

// Gather ALL static page slugs for generateStaticParams
export function getAllSEOPageSlugs() {
  return collectAll()
    .map((p) => ({ slug: p.slug || p.id }))
    .filter((p) => p.slug);
}

export function getSEOPageBySlug(slug) {
  return collectAll().find((p) => (p.slug || p.id) === slug) || null;
}
