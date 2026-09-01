// Programmatic SEO Pages — combinatorial generator
// Generates 1,000+ unique long-tail keyword pages without duplicate content.
// Two tiers of locations:
//   • metro    → Hyderabad micro-localities (short-drive framing)
//   • regional → major Telangana + Andhra Pradesh cities (travel / teleconsult framing)
// All pages share the /[slug] dynamic route renderer.

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

// ── metro: Hyderabad localities (short-drive framing) ──
const METRO_LOCATIONS = [
  { slug: 'hyderabad', name: 'Hyderabad', tier: 'metro' },
  { slug: 'financial-district', name: 'Financial District', tier: 'metro' },
  { slug: 'gachibowli', name: 'Gachibowli', tier: 'metro' },
  { slug: 'madhapur', name: 'Madhapur', tier: 'metro' },
  { slug: 'hitech-city', name: 'Hitech City', tier: 'metro' },
  { slug: 'kondapur', name: 'Kondapur', tier: 'metro' },
  { slug: 'jubilee-hills', name: 'Jubilee Hills', tier: 'metro' },
  { slug: 'banjara-hills', name: 'Banjara Hills', tier: 'metro' },
  { slug: 'kukatpally', name: 'Kukatpally', tier: 'metro' },
  { slug: 'secunderabad', name: 'Secunderabad', tier: 'metro' },
  { slug: 'manikonda', name: 'Manikonda', tier: 'metro' },
  { slug: 'tellapur', name: 'Tellapur', tier: 'metro' },
  { slug: 'kokapet', name: 'Kokapet', tier: 'metro' },
  { slug: 'nanakramguda', name: 'Nanakramguda', tier: 'metro' },
  { slug: 'khajaguda', name: 'Khajaguda', tier: 'metro' },
];

// ── regional: major Telangana + AP cities (travel / teleconsult framing) ──
const REGIONAL_LOCATIONS = [
  // Telangana
  { slug: 'warangal', name: 'Warangal', tier: 'regional', state: 'Telangana', distance: '150 km (about 3 hours by road)' },
  { slug: 'nizamabad', name: 'Nizamabad', tier: 'regional', state: 'Telangana', distance: '175 km (about 3.5 hours by road)' },
  { slug: 'karimnagar', name: 'Karimnagar', tier: 'regional', state: 'Telangana', distance: '165 km (about 3 hours by road)' },
  { slug: 'khammam', name: 'Khammam', tier: 'regional', state: 'Telangana', distance: '195 km (about 3.5 hours by road)' },
  { slug: 'mahbubnagar', name: 'Mahbubnagar', tier: 'regional', state: 'Telangana', distance: '100 km (about 2 hours by road)' },
  { slug: 'nalgonda', name: 'Nalgonda', tier: 'regional', state: 'Telangana', distance: '100 km (about 2 hours by road)' },
  { slug: 'siddipet', name: 'Siddipet', tier: 'regional', state: 'Telangana', distance: '115 km (about 2 hours by road)' },
  { slug: 'suryapet', name: 'Suryapet', tier: 'regional', state: 'Telangana', distance: '140 km (about 2.5 hours by road)' },
  { slug: 'adilabad', name: 'Adilabad', tier: 'regional', state: 'Telangana', distance: '290 km (about 5 hours by road)' },
  // Andhra Pradesh
  { slug: 'vijayawada', name: 'Vijayawada', tier: 'regional', state: 'Andhra Pradesh', distance: '270 km (about 4.5 hours by road, or a short flight)' },
  { slug: 'visakhapatnam', name: 'Visakhapatnam', tier: 'regional', state: 'Andhra Pradesh', distance: '620 km (a 1-hour flight to Hyderabad)' },
  { slug: 'guntur', name: 'Guntur', tier: 'regional', state: 'Andhra Pradesh', distance: '300 km (about 5 hours by road)' },
  { slug: 'nellore', name: 'Nellore', tier: 'regional', state: 'Andhra Pradesh', distance: '440 km (by road or train)' },
  { slug: 'kurnool', name: 'Kurnool', tier: 'regional', state: 'Andhra Pradesh', distance: '210 km (about 3.5 hours by road)' },
  { slug: 'rajahmundry', name: 'Rajahmundry', tier: 'regional', state: 'Andhra Pradesh', distance: '440 km (by road, train or a short flight)' },
  { slug: 'kakinada', name: 'Kakinada', tier: 'regional', state: 'Andhra Pradesh', distance: '490 km (by road, train or flight)' },
  { slug: 'tirupati', name: 'Tirupati', tier: 'regional', state: 'Andhra Pradesh', distance: '560 km (by train or a short flight)' },
  { slug: 'anantapur', name: 'Anantapur', tier: 'regional', state: 'Andhra Pradesh', distance: '350 km (about 6 hours by road)' },
  { slug: 'kadapa', name: 'Kadapa', tier: 'regional', state: 'Andhra Pradesh', distance: '410 km (by road, train or flight)' },
  { slug: 'ongole', name: 'Ongole', tier: 'regional', state: 'Andhra Pradesh', distance: '340 km (by road or train)' },
];

const LOCATIONS = [...METRO_LOCATIONS, ...REGIONAL_LOCATIONS];

// ============== INTRO TEMPLATE BANKS (variant by hash) ==============

// metro procedure intros
const INTRO_TEMPLATES = [
  ({ proc, loc }) => `Looking for ${proc.name.toLowerCase()} in ${loc.name}? Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District is one of the most experienced orthopedic surgeons in the city for ${proc.alsoKnownAs}. With 4,000+ surgeries and 15+ years of clinical experience, Dr. Harsha brings precision, evidence-based decision-making, and a patient-first approach to every case. Many patients from ${loc.name} consult Dr. Harsha for ${proc.condition}; the typical procedure takes a focused day, with most people back to light routine work in 7-14 days.`,
  ({ proc, loc }) => `${proc.name} performed at Apollo Hospitals — Financial District is a short, well-connected drive from ${loc.name}. Dr. B Harsha Vardhana Reddy specializes in ${proc.shortName} using minimally invasive techniques, US FDA-approved implants, and computer-navigated planning where applicable. Cost typically ranges ₹${proc.costRangeINR} (insurance-covered for most policies). Recovery: ${proc.recovery}.`,
  ({ proc, loc }) => `Patients across ${loc.name} choose Dr. B Harsha Vardhana Reddy at Apollo Hospitals for ${proc.name.toLowerCase()} because of three things: a transparent diagnostic workup, surgery only when conservative care fails, and a structured rehab program that gets people back to their lives. ${proc.name} (${proc.alsoKnownAs}) is offered at the ${loc.name === 'Financial District' ? 'main Apollo' : 'Apollo Financial District'} centre with cashless insurance support.`,
  ({ proc, loc }) => `If you're searching for the best ${proc.name.toLowerCase()} surgeon near ${loc.name}, Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District has performed thousands of orthopedic procedures with a 95%+ success rate. He combines DNB Orthopedics, fellowships in Arthroplasty and Arthroscopy, and an MBA in Healthcare Administration to deliver care that's both medically rigorous and patient-friendly.`,
];

// regional procedure intros (travel / teleconsult framing)
const REGIONAL_INTRO_TEMPLATES = [
  ({ proc, loc }) => `Patients from ${loc.name}, ${loc.state} regularly travel to Hyderabad for ${proc.name.toLowerCase()} (${proc.alsoKnownAs}) with Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District. Before you make the ${loc.distance} journey, the smartest first step is to WhatsApp your X-rays, MRI, and prescriptions — Dr. Harsha's team will review them and tell you honestly whether ${proc.shortName} is even needed. With 4,000+ surgeries, 15+ years of experience, and a 95%+ success rate, Dr. Harsha is a trusted choice for ${loc.name} families seeking specialist orthopedic care they can't get locally.`,
  ({ proc, loc }) => `Getting ${proc.name.toLowerCase()} done in Hyderabad is a common choice for patients in ${loc.name} and across ${loc.state}, where advanced ${proc.shortName} and robotic/navigated options may not be available locally. Dr. B Harsha Vardhana Reddy at Apollo Hospitals plans everything for a single trip from ${loc.name} (${loc.distance}): consultation, on-site MRI/X-ray, pre-anaesthetic checks, and — if surgery is confirmed — a clear date. Cost typically ranges ₹${proc.costRangeINR}, cashless for most insurers. Recovery: ${proc.recovery}.`,
  ({ proc, loc }) => `If you're in ${loc.name} and have been advised ${proc.name.toLowerCase()}, a second opinion from a fellowship-trained specialist is worth the trip. Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District, Hyderabad treats patients from all over ${loc.state} for ${proc.condition}. Share your reports on WhatsApp first for an initial opinion, then plan a single visit from ${loc.name} (${loc.distance}). Dr. Harsha's conservative-first approach means surgery is recommended only when it's genuinely the right call.`,
];

// metro condition intros
const COND_INTRO_TEMPLATES = [
  ({ cond, loc }) => `Suffering from ${cond.name.toLowerCase()}? You're not alone — ${cond.symptom} is one of the most common reasons people in ${loc.name} consult an orthopedic surgeon. Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District has treated over 8,000 patients across 15+ years and uses an evidence-based, conservative-first approach: physical therapy and medications are tried before surgery is even discussed. When surgery is needed, it's done with minimally invasive techniques to speed recovery.`,
  ({ cond, loc }) => `${cond.name} treatment in ${loc.name} starts with the right diagnosis. At Apollo Hospitals — a short drive from ${loc.name} — Dr. B Harsha Vardhana Reddy combines a detailed clinical exam, imaging (X-ray, MRI as needed), and a clear treatment roadmap. Most cases improve without surgery; the ones that need surgery get minimally invasive options, US FDA-approved implants, and a structured rehab program.`,
  ({ cond, loc }) => `Dr. B Harsha Vardhana Reddy provides comprehensive ${cond.name.toLowerCase()} care for patients in ${loc.name} and across Hyderabad. With Senior Consultant credentials at Apollo Hospitals Financial District, fellowship training in Arthroscopy and Arthroplasty, and 4,000+ orthopedic surgeries performed, Dr. Harsha brings world-class expertise to every consultation.`,
];

// regional condition intros
const REGIONAL_COND_INTRO_TEMPLATES = [
  ({ cond, loc }) => `Living with ${cond.name.toLowerCase()} in ${loc.name}? ${cond.symptom.charAt(0).toUpperCase() + cond.symptom.slice(1)} deserves a specialist opinion. Many patients from ${loc.name}, ${loc.state} consult Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District, Hyderabad — often after local treatment hasn't helped. Before travelling the ${loc.distance}, WhatsApp your reports for an initial review. Dr. Harsha's conservative-first approach (physiotherapy, medication, and injections before surgery) means many ${loc.name} patients avoid an operation altogether.`,
  ({ cond, loc }) => `${cond.name} treatment for patients from ${loc.name} and across ${loc.state} is one of the reasons families choose Apollo Hospitals, Hyderabad. Dr. B Harsha Vardhana Reddy — a Senior Consultant with 8,000+ patients treated — offers a clear diagnostic workup and honest advice on whether ${cond.name.toLowerCase()} needs surgery. Send your X-rays and MRI on WhatsApp first, then plan a single, efficient trip from ${loc.name} (${loc.distance}) for consultation, imaging, and treatment.`,
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

const WHY_CHOOSE_REGIONAL = [
  { title: 'Free WhatsApp Pre-Consultation', description: 'Send your X-rays and MRI before travelling. Dr. Harsha\'s team reviews them and advises whether the trip is even needed.' },
  { title: 'Everything in a Single Trip', description: 'Consultation, on-site MRI/X-ray, pre-anaesthetic checks, and a clear surgery date — planned so outstation patients don\'t make repeat journeys.' },
  { title: 'Outstation Patient Support', description: 'Guidance on nearby budget-to-premium accommodation and help with cashless insurance paperwork for families travelling in.' },
];

function pickWhyChoose(seed, extra = []) {
  const shuffled = [...WHY_CHOOSE_BASE];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const base = shuffled.slice(0, extra.length ? 3 : 6);
  return [...extra, ...base];
}

function buildFAQs({ proc = null, cond = null, loc }) {
  const isRegional = loc && loc.tier === 'regional';
  const faqs = [];
  if (proc) {
    faqs.push({ question: `How much does ${proc.name.toLowerCase()} cost ${loc ? `for patients from ${loc.name}` : ''} at Apollo Hospitals?`, answer: `${proc.name} cost typically ranges ₹${proc.costRangeINR} at Apollo Hospitals Financial District, depending on implant choice, insurance, and complexity. Most major insurers cover the procedure cashless. WhatsApp Dr. Harsha's team for a personalized estimate.` });
    faqs.push({ question: `What is the recovery time after ${proc.name.toLowerCase()}?`, answer: `Most patients recover in ${proc.recovery}. You'll be guided through structured physiotherapy from day 1. Light routine activities resume in 1-2 weeks; full activity (driving, heavier work) timelines depend on your individual case.` });
    faqs.push({ question: `Is Dr. Harsha experienced in ${proc.name.toLowerCase()}?`, answer: `Yes — Dr. B Harsha Vardhana Reddy is a Senior Consultant Orthopedic Surgeon at Apollo Hospitals with 15+ years and 4,000+ surgeries. He is fellowship-trained at Continental Hospitals in ${proc.slug.includes('arthros') ? 'Arthroscopy' : proc.slug.includes('replacement') ? 'Arthroplasty' : 'both Arthroplasty and Arthroscopy'}.` });
  }
  if (cond) {
    faqs.push({ question: `What are the early signs of ${cond.name.toLowerCase()}?`, answer: `Most patients first notice ${cond.symptom}. Early consultation gives you the most non-surgical options. Dr. Harsha's clinic at Apollo Financial District offers same-week consultation slots — WhatsApp the team to book.` });
    faqs.push({ question: `Can ${cond.name.toLowerCase()} be treated without surgery?`, answer: `In many cases, yes. Dr. Harsha's first line is conservative care: targeted physical therapy, activity modification, anti-inflammatory medications, and image-guided injections (PRP, viscosupplementation, or steroid). Surgery is only recommended when these have been genuinely tried and failed.` });
    faqs.push({ question: `What investigations are needed before consultation?`, answer: `Bring any X-rays, MRI, or previous prescriptions you have. If you don't have imaging, that's fine — Dr. Harsha will recommend what's needed based on the clinical exam. Apollo has on-site imaging so everything can be done in one visit.` });
  }
  if (isRegional) {
    faqs.push({ question: `I'm coming from ${loc.name} — can I consult Dr. Harsha before I travel?`, answer: `Yes. WhatsApp your X-rays, MRI, and prescriptions to +91 99599 64567 for an initial opinion. Dr. Harsha's team will tell you whether surgery is likely needed and what to bring, so your trip from ${loc.name} (${loc.distance}) is worth it.` });
    faqs.push({ question: `Do you help outstation patients from ${loc.state} with travel and stay?`, answer: `Yes. The team helps ${loc.name} and ${loc.state} families plan a single efficient visit — coordinating consultation, imaging, and surgery dates — and can suggest nearby accommodation and assist with cashless insurance paperwork.` });
  } else {
    faqs.push({ question: `How do I book an appointment with Dr. Harsha?`, answer: `The fastest way is WhatsApp at +91 99599 64567 — typical reply within 30 minutes. You can also call directly. Apollo Hospitals is at Financial District, Nanakramguda — about 15-20 minutes from most parts of Hyderabad.` });
  }
  faqs.push({ question: `Is Dr. Harsha available for second opinions?`, answer: `Absolutely. Many patients come for a second opinion before deciding on surgery elsewhere. Bring your existing reports — Dr. Harsha will give you a transparent, conservative-first opinion. No pressure to switch your primary doctor.` });
  return faqs;
}

// Rich extra body paragraph (anti-thin-content) — tier aware
function buildLocalContext({ proc = null, cond = null, loc }) {
  const subject = proc ? proc.name.toLowerCase() : cond ? cond.name.toLowerCase() : 'orthopedic care';
  if (loc.tier === 'regional') {
    return `Every week, patients travel from ${loc.name} and across ${loc.state} to Apollo Hospitals, Financial District for specialist orthopedic care that isn't always available closer to home. If you're planning the journey from ${loc.name} — roughly ${loc.distance} — the smartest first step is to WhatsApp your X-rays, MRI, and prescriptions to Dr. Harsha's team. You'll get an honest initial opinion on whether ${subject} actually needs surgery before you spend a day travelling. When you do come, everything is arranged for a single trip: consultation, on-site imaging, pre-anaesthetic checks, and a clear surgery date if one is needed. The team can also guide outstation families on nearby accommodation and handle cashless insurance paperwork with 30+ insurers, so ${loc.name} patients focus on getting better, not on logistics.`;
  }
  return `Apollo Hospitals — Financial District is one of Hyderabad's most accessible tertiary-care destinations for ${loc.name} residents, easily reached via the Outer Ring Road. Whether you're coming from ${loc.name} for a first consultation, a second opinion, or planned surgery for ${subject}, the clinic offers same-week appointment slots, on-site MRI and X-ray so your workup is completed in a single visit, and dedicated cashless insurance desks for 30+ insurers. Dr. Harsha's team is reachable on WhatsApp for quick questions about the procedure, expected costs, and recovery — usually with a reply inside 30 minutes.`;
}

function buildLocationBlurb(loc) {
  if (loc.tier === 'regional') {
    return `Many patients travel from ${loc.name}, ${loc.state} to consult Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District, Hyderabad — about ${loc.distance}. Send your reports on WhatsApp first so the team can guide you before you travel.`;
  }
  return `Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Financial District is a short, well-connected drive from ${loc.name} — easily reached via the Outer Ring Road.`;
}

// ============== PAGE BUILDERS ==============

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function buildProcedureLocationPage(proc, loc, modifier) {
  const seed = hash(`${proc.slug}-${loc.slug}-${modifier}`);
  const slug = `${modifier}${proc.slug}-in-${loc.slug}`.replace(/--/g, '-').replace(/^-/, '');
  const isRegional = loc.tier === 'regional';

  let title, h1, metaDesc;
  if (modifier === 'best-') {
    title = `Best ${proc.name} Surgeon in ${loc.name} — Dr. B Harsha Vardhana Reddy`;
    h1 = `Best ${proc.name} Surgeon for ${loc.name} Patients`;
    metaDesc = `Looking for the best ${proc.name.toLowerCase()} surgeon for ${loc.name}? Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Hyderabad — 4,000+ surgeries, 15+ years, 95%+ success. WhatsApp for appointment.`;
  } else if (modifier === 'cost-of-') {
    title = `${proc.name} Cost in ${loc.name} — Apollo Hospitals Hyderabad`;
    h1 = `${proc.name} Cost for ${loc.name} Patients`;
    metaDesc = `${proc.name} cost for patients from ${loc.name}: typically ₹${proc.costRangeINR} at Apollo Hospitals, Hyderabad. Cashless insurance accepted. Get a transparent estimate from Dr. Harsha.`;
  } else if (modifier === 'top-') {
    title = `Top ${proc.name} Doctor in ${loc.name} | Dr. Harsha — Apollo Hospitals`;
    h1 = `Top ${proc.name} Doctor for ${loc.name}`;
    metaDesc = `Top-rated ${proc.name.toLowerCase()} specialist serving ${loc.name}. Dr. B Harsha Vardhana Reddy — Senior Consultant at Apollo Hospitals, DNB Orthopedics, fellowship-trained.`;
  } else {
    title = `${proc.name} in ${loc.name} | Dr. B Harsha Vardhana Reddy — Apollo Hospitals`;
    h1 = isRegional ? `${proc.name} for ${loc.name} Patients` : `${proc.name} in ${loc.name}`;
    metaDesc = `${proc.name} (${proc.alsoKnownAs}) for patients from ${loc.name}. Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Hyderabad — minimally invasive, US FDA implants, cashless insurance.`;
  }

  const bank = isRegional ? REGIONAL_INTRO_TEMPLATES : INTRO_TEMPLATES;
  const introTpl = bank[seed % bank.length];

  return {
    slug,
    title,
    metaTitle: title,
    metaDescription: metaDesc,
    keywords: [`${proc.name.toLowerCase()} ${loc.name.toLowerCase()}`, `${proc.shortName} ${loc.name.toLowerCase()}`, `orthopedic surgeon ${loc.name.toLowerCase()}`, `${proc.name.toLowerCase()} cost`, isRegional ? `${proc.name.toLowerCase()} ${loc.state.toLowerCase()}` : `${proc.name.toLowerCase()} hyderabad`].join(', '),
    heroTitle: h1,
    heroSubtitle: `Senior Consultant Orthopedic Surgeon · Apollo Hospitals, Financial District, Hyderabad`,
    location: loc.name,
    locationSlug: loc.slug,
    locationTier: loc.tier,
    locationState: loc.state || 'Telangana',
    locationBlurb: buildLocationBlurb(loc),
    procedureSlug: proc.slug,
    procedureName: proc.name,
    pageType: 'procedure-location',
    modifier: modifier.replace(/-$/, '') || 'in',
    content: {
      introduction: introTpl({ proc, loc }),
      localContext: buildLocalContext({ proc, loc }),
      whyChoose: pickWhyChoose(seed, isRegional ? WHY_CHOOSE_REGIONAL : []),
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
  const isRegional = loc.tier === 'regional';
  const title = `${cond.name} Treatment in ${loc.name} | Dr. B Harsha — Apollo Hospitals`;
  const metaDesc = `Expert ${cond.name.toLowerCase()} treatment for patients from ${loc.name}. Dr. B Harsha Vardhana Reddy at Apollo Hospitals, Hyderabad — conservative-first, minimally invasive, evidence-based.`;
  const bank = isRegional ? REGIONAL_COND_INTRO_TEMPLATES : COND_INTRO_TEMPLATES;
  const introTpl = bank[seed % bank.length];

  return {
    slug,
    title,
    metaTitle: title,
    metaDescription: metaDesc,
    keywords: [`${cond.name.toLowerCase()} treatment ${loc.name.toLowerCase()}`, `${cond.name.toLowerCase()} doctor ${loc.name.toLowerCase()}`, `orthopedic ${loc.name.toLowerCase()}`].join(', '),
    heroTitle: isRegional ? `${cond.name} Treatment for ${loc.name} Patients` : `${cond.name} Treatment in ${loc.name}`,
    heroSubtitle: `Senior Consultant Orthopedic Surgeon · Apollo Hospitals, Financial District, Hyderabad`,
    location: loc.name,
    locationSlug: loc.slug,
    locationTier: loc.tier,
    locationState: loc.state || 'Telangana',
    locationBlurb: buildLocationBlurb(loc),
    conditionSlug: cond.slug,
    conditionName: cond.name,
    pageType: 'condition-location',
    content: {
      introduction: introTpl({ cond, loc }),
      localContext: buildLocalContext({ cond, loc }),
      whyChoose: pickWhyChoose(seed, isRegional ? WHY_CHOOSE_REGIONAL : []),
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

  const push = (page) => {
    if (!seenSlugs.has(page.slug)) {
      seenSlugs.add(page.slug);
      pages.push(page);
    }
  };

  // ── METRO tier — full combinatorial (unchanged slugs, preserves indexed URLs) ──
  const metroProcs = PROCEDURES.slice(0, 14);
  const metroLocs = METRO_LOCATIONS.slice(0, 12);
  const metroModifiers = ['best-', 'cost-of-', 'top-', ''];
  for (const proc of metroProcs) {
    for (const loc of metroLocs) {
      for (const mod of metroModifiers) {
        push(buildProcedureLocationPage(proc, loc, mod));
      }
    }
  }
  const metroConds = CONDITIONS_KW.slice(0, 12);
  for (const cond of metroConds) {
    for (const loc of metroLocs) {
      push(buildConditionLocationPage(cond, loc));
    }
  }

  // ── REGIONAL tier — Telangana + AP cities, high-intent modifiers only ──
  const regionalProcs = PROCEDURES.slice(0, 14);
  const regionalModifiers = ['best-', 'cost-of-', '']; // highest commercial intent
  for (const proc of regionalProcs) {
    for (const loc of REGIONAL_LOCATIONS) {
      for (const mod of regionalModifiers) {
        push(buildProcedureLocationPage(proc, loc, mod));
      }
    }
  }
  const regionalConds = CONDITIONS_KW.slice(0, 12);
  for (const cond of regionalConds) {
    for (const loc of REGIONAL_LOCATIONS) {
      push(buildConditionLocationPage(cond, loc));
    }
  }

  return pages;
}

export const programmaticSEOPages = generate();

// Exposed for schema / directory pages
export const SEO_LOCATIONS = LOCATIONS;
export const SEO_REGIONAL_LOCATIONS = REGIONAL_LOCATIONS;
