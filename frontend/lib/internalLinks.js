// Internal linking helpers — surface related programmatic SEO pages
// so Google sees the site as a connected hub, not orphan pages.

import { programmaticSEOPages } from './programmaticSEOPages.js';

// Programmatic procedure-slug → canonical /treatments slug map
// (used to bridge "best-knee-replacement-in-X" → "/treatments/total-knee-replacement")
export const PROC_TO_TREATMENT_SLUG = {
  'knee-replacement': 'total-knee-replacement',
  'robotic-knee-replacement': 'total-knee-replacement',
  'partial-knee-replacement': 'total-knee-replacement',
  'hip-replacement': 'total-hip-replacement',
  'robotic-hip-replacement': 'total-hip-replacement',
  'acl-reconstruction': 'acl-reconstruction',
  'pcl-reconstruction': 'acl-reconstruction',
  'meniscus-repair': 'meniscus-repair',
  'knee-arthroscopy': 'knee-arthroscopy',
  'shoulder-arthroscopy': 'shoulder-arthroscopy',
  'rotator-cuff-repair': 'rotator-cuff-repair',
  'bankart-repair': 'bankart-repair',
  'shoulder-replacement': 'shoulder-replacement',
  'frozen-shoulder-treatment': 'frozen-shoulder-release',
  'ankle-arthroscopy': 'ankle-ligament-reconstruction',
  'achilles-tendon-repair': 'achilles-tendon-repair',
  'sports-injury-treatment': 'acl-reconstruction',
};

// Programmatic condition-slug → canonical /conditions slug map
export const COND_TO_CONDITION_SLUG = {
  'knee-arthritis': 'osteoarthritis-knee',
  'hip-arthritis': 'hip-arthritis',
  'acl-tear': 'acl-tear',
  'meniscus-tear': 'meniscus-tear',
  'rotator-cuff-tear': 'rotator-cuff-tear',
  'frozen-shoulder': 'frozen-shoulder',
  'shoulder-dislocation': 'shoulder-dislocation',
  'lower-back-pain': 'lower-back-pain',
  'sports-injuries': 'sports-injuries',
};

/**
 * Get all programmatic SEO pages for a given canonical procedure
 * Returns sibling location pages so we can render "Available across Hyderabad" lists.
 * Deduplicates so each (procedure, location) appears at most once — preferring the
 * "best-" modifier (highest commercial intent) when multiple variants exist.
 */
export function getRelatedLocationPagesForProcedure(procedureSlug, currentSlug = null, max = 12) {
  const programmaticProcs = Object.keys(PROC_TO_TREATMENT_SLUG).filter(
    p => PROC_TO_TREATMENT_SLUG[p] === procedureSlug || p === procedureSlug
  );
  const matches = programmaticSEOPages.filter(
    p => p.pageType === 'procedure-location' &&
         programmaticProcs.includes(p.procedureSlug) &&
         p.slug !== currentSlug
  );
  // Dedupe by (procedureSlug + locationSlug), preferring "best-" then "in"
  const priority = { 'best': 0, 'in': 1, 'top': 2, 'cost-of': 3 };
  const byKey = new Map();
  for (const p of matches) {
    const key = `${p.procedureSlug}__${p.locationSlug}`;
    const existing = byKey.get(key);
    if (!existing || (priority[p.modifier] ?? 99) < (priority[existing.modifier] ?? 99)) {
      byKey.set(key, p);
    }
  }
  return Array.from(byKey.values()).slice(0, max);
}

/**
 * Get all programmatic SEO pages for a given condition
 */
export function getRelatedLocationPagesForCondition(conditionSlug, currentSlug = null, max = 12) {
  const programmaticConds = Object.keys(COND_TO_CONDITION_SLUG).filter(
    c => COND_TO_CONDITION_SLUG[c] === conditionSlug || c === conditionSlug
  );
  const matches = programmaticSEOPages.filter(
    p => p.pageType === 'condition-location' &&
         programmaticConds.includes(p.conditionSlug) &&
         p.slug !== currentSlug
  );
  return matches.slice(0, max);
}

/**
 * Sibling cross-link — given a programmatic page, return
 * - other locations for the same procedure (for hub linking)
 * - other procedures in the same location (for spoke linking)
 */
export function getSiblingsForProgrammaticPage(page, max = 8) {
  const priority = { 'best': 0, 'in': 1, 'top': 2, 'cost-of': 3 };
  const dedupe = (pages, keyFn) => {
    const byKey = new Map();
    for (const p of pages) {
      const k = keyFn(p);
      const existing = byKey.get(k);
      if (!existing || (priority[p.modifier] ?? 99) < (priority[existing.modifier] ?? 99)) {
        byKey.set(k, p);
      }
    }
    return Array.from(byKey.values());
  };

  if (page.pageType === 'procedure-location') {
    const otherLocs = programmaticSEOPages.filter(
      p => p.pageType === 'procedure-location' &&
           p.procedureSlug === page.procedureSlug &&
           p.slug !== page.slug
    );
    const otherProcs = programmaticSEOPages.filter(
      p => p.pageType === 'procedure-location' &&
           p.locationSlug === page.locationSlug &&
           p.procedureSlug !== page.procedureSlug
    );
    return {
      otherLocations: dedupe(otherLocs, p => `${p.procedureSlug}__${p.locationSlug}`).slice(0, max),
      otherProcsSameLocation: dedupe(otherProcs, p => `${p.procedureSlug}__${p.locationSlug}`).slice(0, max),
    };
  }
  if (page.pageType === 'condition-location') {
    const otherLocs = programmaticSEOPages.filter(
      p => p.pageType === 'condition-location' &&
           p.conditionSlug === page.conditionSlug &&
           p.slug !== page.slug
    );
    const otherConds = programmaticSEOPages.filter(
      p => p.pageType === 'condition-location' &&
           p.locationSlug === page.locationSlug &&
           p.conditionSlug !== page.conditionSlug
    );
    return {
      otherLocations: dedupe(otherLocs, p => `${p.conditionSlug}__${p.locationSlug}`).slice(0, max),
      otherCondsSameLocation: dedupe(otherConds, p => `${p.conditionSlug}__${p.locationSlug}`).slice(0, max),
    };
  }
  return { otherLocations: [], otherProcsSameLocation: [], otherCondsSameLocation: [] };
}

/**
 * Map a canonical /conditions/[slug] back to its matching programmatic condition slug
 */
export function getProgrammaticCondSlug(canonicalCondSlug) {
  for (const [k, v] of Object.entries(COND_TO_CONDITION_SLUG)) {
    if (v === canonicalCondSlug) return k;
  }
  return null;
}

export function getProgrammaticProcSlugs(canonicalTreatmentSlug) {
  return Object.keys(PROC_TO_TREATMENT_SLUG).filter(
    k => PROC_TO_TREATMENT_SLUG[k] === canonicalTreatmentSlug
  );
}
