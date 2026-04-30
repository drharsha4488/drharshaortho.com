// Programmatic SEO Pages — combinatorial generator
// Generates 500+ unique long-tail keyword pages without duplicate content
// All pages share the /[slug] dynamic route renderer

// ============== TAXONOMY ==============

const PROCEDURES = [
  { slug: 'knee-replacement', name: 'Knee Replacement', plural: 'Knee Replacements', condition: 'severe knee arthritis', shortName: 'knee surgery', recovery: '6-8 weeks', costRangeINR: '2.5-4.5 lakhs', alsoKnownAs: 'total knee arthroplasty (TKA)' },
  { slug: 'robotic-knee-replacement', name: 'Robotic Knee Replacement', plural: 'Robotic Knee Replacements', condition: 'severe knee arthritis', shortName: 'robotic knee surgery', recovery: '4-6 weeks', costRangeINR: '3.5-5.5 lakhs', alsoKnownAs: 'computer-navigated knee arthroplasty' },
  { slug: 'partial-knee-replacement', name: 'Partial Knee Replacement', plural: 'Partial Knee Replacements', condition: 'unicompartmental knee arthritis', shortName: 'partial knee surgery', recovery: '4-6 weeks', costRangeINR: '2.0-3.5 lakhs', alsoKnownAs: 'unicompartmental knee arthroplasty (UKA)' },
  { slug: 'hip-replacement', name: 'Hip Replacement', plural: 'Hip Replacements', condition: 'hip arthritis or AVN', shortName: 'hip surgery', recovery: '6-12 weeks', costRangeINR: '3.0-5.0 lakhs', alsoKnownAs: 'total hip arthroplasty (THA)' },
  { slug: 'robotic-hip-replacement', name: 'Robotic Hip Replacement', plural: 'Robotic Hip Replacements', condition: 'hip arthritis', shortName: 'robotic hip surgery', recovery: '4-8 weeks', costRangeINR: '4.0-6.0 lakhs', alsoKnownAs: 'computer-navigated hip arthroplasty' },
  { slug: 'acl-reconstruction', name: 'ACL Reconstruction', plural: 'ACL Reconstructions', condition: 'ACL tear', shortName: 'ACL surgery', recovery: '6-9 months', costRangeINR: '1.5-2.5 lakhs', alsoKnownAs: 'anterior cruciate ligament repair' },
  { slug: 'pcl-reconstruction', name: 'PCL Reconstruction', plural: 'PCL Reconstructions', condition: 'PCL tear', shortName: 'PCL surgery', recovery: '6-9 months', costRangeINR: '1.5-2.5 lakhs', alsoKnownAs: 'posterior cruciate ligament repair' },
  { slug: 'meniscus-repair', name: 'Meniscus Repair', plural: 'Meniscus Repairs', condition: 'meniscus tear', shortName: 'meniscus surgery', recovery: '4-6 weeks', costRangeINR: '80,000-1.5 lakhs', alsoKnownAs: 'arthroscopic meniscectomy or repair' },
  { slug: 'knee-arthroscopy', name: 'Knee Arthroscopy', plural: 'Knee Arthroscopies', condition: 'internal knee derangement', shortName: 'knee arthroscopy', recovery: '4-6 weeks', costRangeINR: '70,000-1.5 lakhs', alsoKnownAs: 'arthroscopic knee surgery' },
  { slug: 'shoulder-arthroscopy', name: 'Shoulder Arthroscopy', plural: 'Shoulder Arthroscopies', condition: 'shoulder impingement, labral tear or rotator cuff problems', shortName: 'shoulder keyhole surgery', recovery: '4-6 weeks', costRangeINR: '1.0-2.0 lakhs', alsoKnownAs: 'keyhole shoulder surgery' },
  { slug: 'rotator-cuff-repair', name: 'Rotator Cuff Repair', plural: 'Rotator Cuff Repairs', condition: 'rotator cuff tear', shortName: 'rotator cuff surgery', recovery: '4-6 months', costRangeINR: '1.5-2.5 lakhs', alsoKnownAs: 'arthroscopic rotator cuff repair' },
  { slug: 'bankart-repair', name: 'Bankart Repair', plural: 'Bankart Repairs', condition: 'recurrent shoulder dislocation', shortName: 'shoulder stabilization surgery', recovery: '4-5 months', costRangeINR: '1.5-2.5 lakhs', alsoKnownAs: 'arthroscopic shoulder stabilization' },
  { slug: 'shoulder-replacement', name: 'Shoulder Replacement', plural: 'Shoulder Replacements', condition: 'shoulder arthritis', shortName: 'shoulder surgery', recovery: '3-4 months', costRangeINR: '3.5-5.0 lakhs', alsoKnownAs: 'total shoulder arthroplasty' },
  { slug: 'frozen-shoulder-treatment', name: 'Frozen Shoulder Treatment', plural: 'Frozen Shoulder Treatments', condition: 'adhesive capsulitis', shortName: 'frozen shoulder care', recovery: '6-12 weeks', costRangeINR: '50,000-1.5 lakhs', alsoKnownAs: 'adhesive capsulitis management' },
  { slug: 'ankle-arthroscopy', name: 'Ankle Arthroscopy', plural: 'Ankle Arthroscopies', condition: 'ankle impingement and ligament injuries', shortName: 'ankle keyhole surgery', recovery: '4-8 weeks', costRangeINR: '80,000-1.5 lakhs', alsoKnownAs: 'arthroscopic ankle surgery' },
  { slug: 'achilles-tendon-repair', name: 'Achilles Tendon Repair', plural: 'Achilles Tendon Repairs', condition: 'Achilles tendon rupture', shortName: 'Achilles surgery', recovery: '3-6 months', costRangeINR: '1.0-2.0 lakhs', alsoKnownAs: 'tendoachilles repair' },
  { slug: 'fracture-fixation', name: 'Fracture Fixation', plural: 'Fracture Fixations', condition: 'complex fractures', shortName: 'fracture surgery', recovery: '6-12 weeks', costRangeINR: 'depends on site', alsoKnownAs: 'open reduction internal fixation (ORIF)' },
  { slug: 'sports-injury-treatment', name: 'Sports Injury Treatment', plural: 'Sports Injury Treatments', condition: 'sports-related orthopedic injuries', shortName: 'sports injury care', recovery: 'varies', costRangeINR: 'varies', alsoKnownAs: 'sports medicine' },
  { slug: 'prp-injection', name: 'PRP Injection Therapy', plural: 'PRP Injections', condition: 'tendon and joint conditions', shortName: 'PRP therapy', recovery: 'no downtime', costRangeINR: '15,000-35,000 per session', alsoKnownAs: 'platelet-rich plasma therapy' },
  { slug: 'cartilage-restoration', name: 'Cartilage Restoration', plural: 'Cartilage Restoration Procedures', condition: 'focal cartilage defects', shortName: 'cartilage repair', recovery: '3-6 months', costRangeINR: '1.5-3.0 lakhs', alsoKnownAs: 'cartilage repair surgery' },
  { slug: 'minimally-invasive-surgery', name: 'Minimally Invasive Orthopedic Surgery', plural: 'Minimally Invasive Procedures', condition: 'multiple orthopedic conditions', shortName: 'MIS surgery', recovery: 'faster than open surgery', costRangeINR: 'varies', alsoKnownAs: 'keyhole orthopedic surgery' },
  { slug: 'trauma-surgery', name: 'Trauma & Fracture Surgery', plural: 'Trauma Surgeries', condition: 'high-energy fractures and dislocations', shortName: 'trauma care', recovery: 'varies', costRangeINR: 'varies', alsoKnownAs: 'orthopedic trauma management' },
  { slug: 'joint-preservation', name: 'Joint Preservation Surgery', plural: 'Joint Preservation Procedures', condition: 'early joint disease', shortName: 'joint preservation', recovery: 'varies', costRangeINR: 'varies', alsoKnownAs: 'osteotomy and cartilage repair' },
  { slug: 'high-tibial-osteotomy', name: 'High Tibial Osteotomy', plural: 'High Tibial Osteotomies', condition: 'medial knee arthritis with malalignment', shortName: 'HTO surgery', recovery: '3-6 months', costRangeINR: '1.5-2.5 lakhs', alsoKnownAs: 'HTO knee realignment' },
  { slug: 'revision-knee-replacement', name: 'Revision Knee Replacement', plural: 'Revision Knee Replacements', condition: 'failed primary knee replacement', shortName: 'redo knee surgery', recovery: '8-12 weeks', costRangeINR: '4.0-6.5 lakhs', alsoKnownAs: 'redo knee arthroplasty' },
];

const CONDITIONS_KW = [
  { slug: 'knee-arthritis', name: 'Knee Arthritis', symptom: 'persistent knee pain and stiffness' },
  { slug: 'hip-arthritis', name: 'Hip Arthritis', symptom: 'groin pain and limp' },
  { slug: 'acl-tear', name: 'ACL Tear', symptom: 'knee instability after twisting injury' },
  { slug: 'meniscus-tear', name: 'Meniscus Tear', symptom: 'knee locking and giving way' },
  { slug: 'rotator-cuff-tear', name: 'Rotator Cuff Tear', symptom: 'shoulder pain at night and weakness' },
  { slug: 'frozen-shoulder', name: 'Frozen Shoulder', symptom: 'stiff painful shoulder' },
  { slug: 'shoulder-dislocation', name: 'Shoulder Dislocation', symptom: 'recurrent shoulder coming out of socket' },
  { slug: 'lower-back-pain', name: 'Lower Back Pain', symptom: 'chronic lower back pain' },
  { slug: 'sciatica', name: 'Sciatica', symptom: 'radiating leg pain' },
  { slug: 'sports-injuries', name: 'Sports Injuries', symptom: 'sport-related joint or ligament injury' },
  { slug: 'plantar-fasciitis', name: 'Plantar Fasciitis', symptom: 'heel pain on first steps in morning' },
  { slug: 'tennis-elbow', name: 'Tennis Elbow', symptom: 'outer elbow pain with gripping' },
  { slug: 'trigger-finger', name: 'Trigger Finger', symptom: 'finger catching and locking' },
  { slug: 'avascular-necrosis', name: 'Avascular Necrosis (AVN)', symptom: 'progressive hip pain' },
  { slug: 'bursitis', name: 'Bursitis', symptom: 'localized joint swelling and tenderness' },
];

const LOCATIONS = [
  { slug: 'hyderabad', name: 'Hyderabad' },
  { slug: 'financial-district', name: 'Financial District' },
  { slug: 'gachibowli', name: 'Gachibowli' },
  { slug: 'madhapur', name: 'Madhapur' },
  { slug: 'hitech-city', name: 'Hitech City' },
  { slug: 'kondapur', name: 'Kondapur' },
  { slug: 'jubilee-hills', name: 'Jubilee Hills' },
  { slug: 'banjara-hills', name: 'Banjara Hills' },
  { slug: 'kukatpally', name: 'Kukatpally' },
  { slug: 'secunderabad', name: 'Secunderabad' },
  { slug: 'manikonda', name: 'Manikonda' },
  { slug: 'tellapur', name: 'Tellapur' },
  { slug: 'kokapet', name: 'Kokapet' },
  { slug: 'nanakramguda', name: 'Nanakramguda' },
  { slug: 'khajaguda', name: 'Khajaguda' },
];

// ============== INTRO TEMPLATE BANK (variant by hash) ==============

const INTRO_TEMPLATES = [
  ({ proc, loc }) => `Looking for ${proc.name.toLowerCase()} in ${loc.name}? Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District is one of the most experienced orthopedic surgeons in the city for ${proc.alsoKnownAs}. With 4,000+ surgeries and 15+ years of clinical experience, Dr. Harsha brings precision, evidence-based decision-making, and a patient-first approach to every case. Many patients from ${loc.name} consult Dr. Harsha for ${proc.condition}; the typical procedure takes a focused day, with most people back to light routine work in 7-14 days.`,
  ({ proc, loc }) => `${proc.name} performed at Apollo Hospitals — Financial District is a short, well-connected drive from ${loc.name}. Dr. B Harsha Vardhana Reddy specializes in ${proc.shortName} using minimally invasive techniques, US FDA-approved implants, and computer-navigated planning where applicable. Cost typically ranges ₹${proc.costRangeINR} (insurance-covered for most policies). Recovery: ${proc.recovery}.`,
  ({ proc, loc }) => `Patients across ${loc.name} choose Dr. B Harsha Vardhana Reddy at Apollo Hospitals for ${proc.name.toLowerCase()} because of three things: a transparent diagnostic workup, surgery only when conservative care fails, and a structured rehab program that gets people back to their lives. ${proc.name} (${proc.alsoKnownAs}) is offered at the ${loc.name === 'Financial District' ? 'main Apollo' : 'Apollo Financial District'} centre with cashless insurance support.`,
  ({ proc, loc }) => `If you're searching for the best ${proc.name.toLowerCase()} surgeon near ${loc.name}, Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District has performed thousands of orthopedic procedures with a 95%+ success rate. He combines DNB Orthopedics, fellowships in Arthroplasty and Arthroscopy, and an MBA in Healthcare Administration to deliver care that's both medically rigorous and patient-friendly.`,
];

const COND_INTRO_TEMPLATES = [
  ({ cond, loc }) => `Suffering from ${cond.name.toLowerCase()}? You're not alone — ${cond.symptom} is one of the most common reasons people in ${loc.name} consult an orthopedic surgeon. Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District has treated over 8,000 patients across 15+ years and uses an evidence-based, conservative-first approach: physical therapy and medications are tried before surgery is even discussed. When surgery is needed, it's done with minimally invasive techniques to speed recovery.`,
  ({ cond, loc }) => `${cond.name} treatment in ${loc.name} starts with the right diagnosis. At Apollo Hospitals — a short drive from ${loc.name} — Dr. B Harsha Vardhana Reddy combines a detailed clinical exam, imaging (X-ray, MRI as needed), and a clear treatment roadmap. Most cases improve without surgery; the ones that need surgery get minimally invasive options, US FDA-approved implants, and a structured rehab program.`,
  ({ cond, loc }) => `Dr. B Harsha Vardhana Reddy provides comprehensive ${cond.name.toLowerCase()} care for patients in ${loc.name} and across Hyderabad. With Senior Consultant credentials at Apollo Hospitals Financial District, fellowship training in Arthroscopy and Arthroplasty, and 4,000+ orthopedic surgeries performed, Dr. Harsha brings world-class expertise to every consultation.`,
];

// ============== WHY-CHOOSE & FAQ BANKS ==============

const WHY_CHOOSE_BASE = [
  { title: 'Apollo Hospitals — JCI Accredited', description: 'Dr. Harsha operates exclusively at Apollo Hospitals Financial District — one of India\'s few JCI-accredited tertiary-care centres.' },
  { title: '15+ Years of Clinical Experience', description: '4,000+ surgeries spanning joint replacement, sports medicine, trauma, and regenerative orthopedics.' },
  { title: 'DNB Orthopedics + MBA Healthcare', description: 'Medical excellence combined with healthcare management training — care delivered the way it should be.' },
  { title: 'Fellowship-Trained', description: 'Continental Hospitals fellowships in Arthroplasty (2016) and Arthroscopy (2017) — both gold-standard subspecialty programs.' },
  { title: 'Cashless Insurance Accepted', description: 'Apollo accepts 30+ insurers including Star Health, ICICI Lombard, HDFC Ergo, Bajaj Allianz, and TPA networks.' },
  { title: 'Evidence-Based, Conservative-First', description: 'Surgery is recommended only when physical therapy, medications, and injections have been fully explored.' },
  { title: 'Minimally Invasive Techniques', description: 'Smaller incisions, less tissue damage, shorter hospital stays, faster return to your everyday life.' },
  { title: 'Direct WhatsApp Access', description: 'Skip the phone tag. Message Dr. Harsha\'s team on WhatsApp and typically get a reply within 30 minutes.' },
];

function pickWhyChoose(seed) {
  // Pick 6 deterministically by seed for variety per page
  const shuffled = [...WHY_CHOOSE_BASE];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 6);
}

function buildFAQs({ proc = null, cond = null, loc, modifier = '' }) {
  const subject = proc?.name || cond?.name || 'orthopedic care';
  const faqs = [];
  if (proc) {
    faqs.push({ question: `How much does ${proc.name.toLowerCase()} cost ${loc ? `in ${loc.name}` : ''} at Apollo Hospitals?`, answer: `${proc.name} cost typically ranges ₹${proc.costRangeINR} at Apollo Hospitals Financial District, depending on implant choice, insurance, and complexity. Most major insurers cover the procedure cashless. WhatsApp Dr. Harsha's team for a personalized estimate.` });
    faqs.push({ question: `What is the recovery time after ${proc.name.toLowerCase()}?`, answer: `Most patients recover in ${proc.recovery}. You'll be guided through structured physiotherapy from day 1. Light routine activities resume in 1-2 weeks; full activity (driving, heavier work) timelines depend on your individual case.` });
    faqs.push({ question: `Is Dr. Harsha experienced in ${proc.name.toLowerCase()}?`, answer: `Yes — Dr. B Harsha Vardhana Reddy is a Senior Consultant Orthopedic Surgeon at Apollo Hospitals with 15+ years and 4,000+ surgeries. He is fellowship-trained at Continental Hospitals in ${proc.slug.includes('arthros') ? 'Arthroscopy' : proc.slug.includes('replacement') ? 'Arthroplasty' : 'both Arthroplasty and Arthroscopy'}.` });
  }
  if (cond) {
    faqs.push({ question: `What are the early signs of ${cond.name.toLowerCase()}?`, answer: `Most patients first notice ${cond.symptom}. Early consultation gives you the most non-surgical options. Dr. Harsha's clinic at Apollo Financial District offers same-week consultation slots — WhatsApp the team to book.` });
    faqs.push({ question: `Can ${cond.name.toLowerCase()} be treated without surgery?`, answer: `In many cases, yes. Dr. Harsha's first line is conservative care: targeted physical therapy, activity modification, anti-inflammatory medications, and image-guided injections (PRP, viscosupplementation, or steroid). Surgery is only recommended when these have been genuinely tried and failed.` });
    faqs.push({ question: `What investigations are needed before consultation?`, answer: `Bring any X-rays, MRI, or previous prescriptions you have. If you don't have imaging, that's fine — Dr. Harsha will recommend what's needed based on the clinical exam. Apollo has on-site imaging so everything can be done in one visit.` });
  }
  faqs.push({ question: `How do I book an appointment with Dr. Harsha?`, answer: `The fastest way is WhatsApp at +91 99599 64567 — typical reply within 30 minutes. You can also call directly. Apollo Hospitals is at Financial District, Nanakramguda — about 15-20 minutes from most parts of Hyderabad.` });
  faqs.push({ question: `Is Dr. Harsha available for second opinions?`, answer: `Absolutely. Many patients come for a second opinion before deciding on surgery elsewhere. Bring your existing reports — Dr. Harsha will give you a transparent, conservative-first opinion. No pressure to switch your primary doctor.` });
  return faqs;
}

// ============== PAGE BUILDERS ==============

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function buildProcedureLocationPage(proc, loc, modifier) {
  const seed = hash(`${proc.slug}-${loc.slug}-${modifier}`);
  const slug = `${modifier}${proc.slug}-${modifier === 'cost-of-' ? 'in-' : modifier ? 'in-' : 'in-'}${loc.slug}`.replace(/--/g, '-').replace(/^-/, '');

  let title, h1, metaDesc;
  if (modifier === 'best-') {
    title = `Best ${proc.name} Surgeon in ${loc.name} — Dr. B Harsha Vardhana Reddy`;
    h1 = `Best ${proc.name} Surgeon in ${loc.name}`;
    metaDesc = `Looking for the best ${proc.name.toLowerCase()} surgeon in ${loc.name}? Dr. B Harsha Vardhana Reddy at Apollo Hospitals — 4,000+ surgeries, 15+ years, 95%+ success. WhatsApp for appointment.`;
  } else if (modifier === 'cost-of-') {
    title = `${proc.name} Cost in ${loc.name} — Apollo Hospitals Hyderabad`;
    h1 = `${proc.name} Cost in ${loc.name}`;
    metaDesc = `${proc.name} cost in ${loc.name}: typically ₹${proc.costRangeINR} at Apollo Hospitals Financial District. Cashless insurance accepted. Get a transparent estimate from Dr. Harsha.`;
  } else if (modifier === 'top-') {
    title = `Top ${proc.name} Doctor in ${loc.name} | Dr. Harsha — Apollo Hospitals`;
    h1 = `Top ${proc.name} Doctor in ${loc.name}`;
    metaDesc = `Top-rated ${proc.name.toLowerCase()} specialist serving ${loc.name}. Dr. B Harsha Vardhana Reddy — Senior Consultant at Apollo Hospitals, DNB Orthopedics, fellowship-trained.`;
  } else {
    title = `${proc.name} in ${loc.name} | Dr. B Harsha Vardhana Reddy — Apollo Hospitals`;
    h1 = `${proc.name} in ${loc.name}`;
    metaDesc = `${proc.name} (${proc.alsoKnownAs}) for patients in ${loc.name}. Dr. B Harsha Vardhana Reddy at Apollo Hospitals — minimally invasive, US FDA implants, cashless insurance.`;
  }

  const introTpl = INTRO_TEMPLATES[seed % INTRO_TEMPLATES.length];

  return {
    slug,
    title,
    metaTitle: title,
    metaDescription: metaDesc,
    keywords: [`${proc.name.toLowerCase()} ${loc.name.toLowerCase()}`, `${proc.shortName} ${loc.name.toLowerCase()}`, `orthopedic surgeon ${loc.name.toLowerCase()}`, `${proc.name.toLowerCase()} cost`].join(', '),
    heroTitle: h1,
    heroSubtitle: `Senior Consultant Orthopedic Surgeon · Apollo Hospitals, Financial District`,
    location: loc.name,
    content: {
      introduction: introTpl({ proc, loc }),
      whyChoose: pickWhyChoose(seed),
      stats: [
        { value: '4,000+', label: 'Surgeries' },
        { value: '15+', label: 'Years' },
        { value: '8,000+', label: 'Patients' },
        { value: '95%+', label: 'Success Rate' },
      ],
      faqs: buildFAQs({ proc, loc }),
    },
  };
}

function buildConditionLocationPage(cond, loc) {
  const seed = hash(`${cond.slug}-${loc.slug}`);
  const slug = `${cond.slug}-treatment-in-${loc.slug}`;
  const title = `${cond.name} Treatment in ${loc.name} | Dr. B Harsha — Apollo Hospitals`;
  const metaDesc = `Expert ${cond.name.toLowerCase()} treatment for patients in ${loc.name}. Dr. B Harsha Vardhana Reddy at Apollo Hospitals Financial District — conservative-first, minimally invasive, evidence-based.`;
  const introTpl = COND_INTRO_TEMPLATES[seed % COND_INTRO_TEMPLATES.length];

  return {
    slug,
    title,
    metaTitle: title,
    metaDescription: metaDesc,
    keywords: [`${cond.name.toLowerCase()} treatment ${loc.name.toLowerCase()}`, `${cond.name.toLowerCase()} doctor ${loc.name.toLowerCase()}`, `orthopedic ${loc.name.toLowerCase()}`].join(', '),
    heroTitle: `${cond.name} Treatment in ${loc.name}`,
    heroSubtitle: `Senior Consultant Orthopedic Surgeon · Apollo Hospitals, Financial District`,
    location: loc.name,
    content: {
      introduction: introTpl({ cond, loc }),
      whyChoose: pickWhyChoose(seed),
      stats: [
        { value: '4,000+', label: 'Surgeries' },
        { value: '15+', label: 'Years' },
        { value: '8,000+', label: 'Patients' },
        { value: '95%+', label: 'Success Rate' },
      ],
      faqs: buildFAQs({ cond, loc }),
    },
  };
}

// ============== GENERATE ==============

function generate() {
  const pages = [];
  const seenSlugs = new Set();

  // Procedure × Location with 4 modifiers (best, cost, top, plain)
  // Cap to top 12 procedures × 12 locations × 4 modifiers = 576 pages
  const topProcs = PROCEDURES.slice(0, 14);
  const topLocs = LOCATIONS.slice(0, 12);
  const modifiers = ['best-', 'cost-of-', 'top-', ''];

  for (const proc of topProcs) {
    for (const loc of topLocs) {
      for (const mod of modifiers) {
        const page = buildProcedureLocationPage(proc, loc, mod);
        if (!seenSlugs.has(page.slug)) {
          seenSlugs.add(page.slug);
          pages.push(page);
        }
      }
    }
  }

  // Condition × Location (top 10 conditions × 12 locations = 120 pages)
  const topConds = CONDITIONS_KW.slice(0, 12);
  for (const cond of topConds) {
    for (const loc of topLocs) {
      const page = buildConditionLocationPage(cond, loc);
      if (!seenSlugs.has(page.slug)) {
        seenSlugs.add(page.slug);
        pages.push(page);
      }
    }
  }

  return pages;
}

export const programmaticSEOPages = generate();
