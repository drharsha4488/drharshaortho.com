// Additional Treatment Pages - Comprehensive Orthopedic Treatments
// Targeting competitor keywords and high-search-volume treatments

export const additionalTreatments = [
  // ============ REGENERATIVE MEDICINE ============
  {
    id: 'prp-therapy',
    slug: 'prp-therapy',
    name: 'PRP Therapy (Platelet-Rich Plasma)',
    category: 'Regenerative Medicine',
    icon: '💉',
    shortDescription: 'Injection of concentrated platelets to promote healing of tendons, ligaments, and joints.',
    imageUrl: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'PRP Therapy in Hyderabad | Platelet-Rich Plasma Treatment | Dr. Harsha',
    metaDescription: 'Advanced PRP therapy in Hyderabad for knee arthritis, tendinitis, sports injuries. Natural healing with your own blood platelets. Expert treatment.',
    keywords: 'PRP therapy hyderabad, platelet rich plasma injection, knee PRP, tennis elbow PRP, regenerative medicine',
    overview: `PRP (Platelet-Rich Plasma) therapy uses your body's own healing mechanisms to repair damaged tissues. Blood is drawn, processed to concentrate platelets (which contain growth factors), and injected into the injured area. This stimulates natural tissue regeneration and healing.`,
    recoveryTime: '24-48 hours rest',
    hospitalStay: 'Outpatient',
    successRate: '70-85%',
    applications: [
      { condition: 'Knee Osteoarthritis', effectiveness: '70-80% improvement', duration: '6-12 months relief' },
      { condition: 'Tennis Elbow', effectiveness: '75-85% success', duration: 'Often permanent' },
      { condition: "Golfer's Elbow", effectiveness: '75-85% success', duration: 'Often permanent' },
      { condition: 'Plantar Fasciitis', effectiveness: '75-80% improvement', duration: '6-12 months' },
      { condition: 'Rotator Cuff Tendinitis', effectiveness: '70-75% improvement', duration: 'Variable' },
      { condition: 'Achilles Tendinitis', effectiveness: '70-80% improvement', duration: '6-12 months' },
      { condition: 'Hip Labral Tears', effectiveness: '60-70% improvement', duration: 'Variable' }
    ],
    procedure: [
      { step: 1, title: 'Blood Draw', description: 'Similar to a routine blood test (15-30ml drawn)' },
      { step: 2, title: 'Centrifugation', description: 'Blood spun to separate and concentrate platelets (10-15 minutes)' },
      { step: 3, title: 'Preparation', description: 'PRP extracted and prepared for injection' },
      { step: 4, title: 'Injection', description: 'Ultrasound-guided injection into affected area' },
      { step: 5, title: 'Recovery', description: 'Brief rest, then gradual return to activities' }
    ],
    benefits: [
      { title: 'Natural Healing', description: 'Uses your own blood with no foreign substances' },
      { title: 'Minimal Downtime', description: '24-48 hours of rest, then normal activities' },
      { title: 'Low Risk', description: 'No risk of allergic reaction or disease transmission' },
      { title: 'Outpatient Procedure', description: 'Done in clinic in 30-45 minutes' },
      { title: 'Alternative to Surgery', description: 'May help avoid or delay surgical intervention' }
    ],
    faqs: [
      {
        question: 'How many PRP sessions are needed?',
        answer: 'Most conditions require 1-3 sessions, spaced 2-4 weeks apart. Knee arthritis may benefit from annual maintenance injections. The number depends on severity and response to initial treatment.'
      },
      {
        question: 'What is the cost of PRP therapy in Hyderabad?',
        answer: 'PRP therapy costs ₹8,000-15,000 per session depending on the preparation method and injection site. Multiple sessions may be required for optimal results.'
      },
      {
        question: 'Is PRP therapy painful?',
        answer: 'The injection may cause temporary discomfort similar to other injections. Local anesthetic is often used. Post-injection soreness for 2-3 days is common and actually indicates the healing process has begun.'
      },
      {
        question: 'How soon will I see results from PRP?',
        answer: 'Initial improvement is typically noticed at 3-4 weeks, with continued improvement over 2-3 months. Full benefits are usually seen at 3-6 months after the final injection.'
      }
    ]
  },
  {
    id: 'stem-cell-therapy',
    slug: 'stem-cell-therapy',
    name: 'Stem Cell Therapy',
    category: 'Regenerative Medicine',
    icon: '🧬',
    shortDescription: 'Using stem cells to promote healing and regeneration of damaged cartilage and tissues.',
    imageUrl: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Stem Cell Therapy Hyderabad | Orthopedic Regeneration | Dr. Harsha',
    metaDescription: 'Advanced stem cell therapy for orthopedic conditions in Hyderabad. Treatment for knee arthritis, cartilage damage. Expert regenerative medicine.',
    keywords: 'stem cell therapy hyderabad, orthopedic stem cells, cartilage regeneration, knee stem cell treatment, regenerative orthopedics',
    overview: `Stem cell therapy uses mesenchymal stem cells (MSCs) from your own body to promote healing and regeneration. These cells have the potential to develop into various tissue types and release healing factors. It's an emerging treatment option for cartilage damage and early arthritis.`,
    recoveryTime: '2-4 weeks limited activity',
    hospitalStay: 'Outpatient',
    successRate: '60-75%',
    sources: [
      { source: 'Bone Marrow (BMAC)', description: 'Harvested from hip bone under local anesthesia', pros: 'Higher stem cell concentration' },
      { source: 'Adipose Tissue (Fat)', description: 'Harvested from abdomen via mini-liposuction', pros: 'Less painful harvest' }
    ],
    applications: [
      { condition: 'Early Knee Arthritis', effectiveness: '60-70%' },
      { condition: 'Focal Cartilage Defects', effectiveness: '70-75%' },
      { condition: 'Avascular Necrosis (early)', effectiveness: '60-70%' },
      { condition: 'Tendon Injuries', effectiveness: '65-75%' }
    ],
    benefits: [
      { title: 'Regenerative Potential', description: 'May help regenerate damaged cartilage' },
      { title: 'Autologous', description: 'Uses your own cells - no rejection risk' },
      { title: 'Minimally Invasive', description: 'No major surgery required' },
      { title: 'Alternative to Replacement', description: 'May delay joint replacement in younger patients' }
    ],
    faqs: [
      {
        question: 'Is stem cell therapy proven for arthritis?',
        answer: 'Stem cell therapy shows promise for early arthritis and cartilage damage, but is still considered investigational. Results vary significantly. It works best in younger patients with early-stage disease and focal cartilage defects rather than widespread arthritis.'
      },
      {
        question: 'What is the cost of stem cell therapy?',
        answer: 'Stem cell therapy costs ₹1.5-3 lakhs depending on the source (bone marrow or fat), processing method, and whether combined with other procedures. It is not typically covered by insurance.'
      }
    ]
  },
  {
    id: 'viscosupplementation',
    slug: 'viscosupplementation',
    name: 'Viscosupplementation (Hyaluronic Acid)',
    category: 'Regenerative Medicine',
    icon: '💉',
    shortDescription: 'Gel injections to lubricate and cushion the knee joint in arthritis.',
    imageUrl: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Viscosupplementation Hyderabad | Knee Gel Injection | Dr. Harsha',
    metaDescription: 'Hyaluronic acid injections for knee arthritis in Hyderabad. Gel injection to lubricate joints and reduce pain. Non-surgical arthritis treatment.',
    keywords: 'viscosupplementation hyderabad, knee gel injection, hyaluronic acid knee, synvisc injection, joint lubrication',
    overview: `Viscosupplementation involves injecting hyaluronic acid (a natural joint lubricant) into arthritic joints, most commonly the knee. It helps lubricate and cushion the joint, potentially reducing pain and improving function. It's an option for those who haven't responded to simpler treatments.`,
    recoveryTime: 'Immediate',
    hospitalStay: 'Outpatient',
    successRate: '50-70%',
    procedure: [
      { step: 1, description: 'Joint may be aspirated if there is excess fluid' },
      { step: 2, description: 'Hyaluronic acid injected into joint space' },
      { step: 3, description: 'May be single injection or series of 3-5 weekly injections' }
    ],
    products: [
      { name: 'Synvisc-One', type: 'Single injection', duration: '6 months' },
      { name: 'Durolane', type: 'Single injection', duration: '6 months' },
      { name: 'Supartz', type: '5 weekly injections', duration: '6 months' },
      { name: 'Euflexxa', type: '3 weekly injections', duration: '6 months' }
    ],
    faqs: [
      {
        question: 'How long does viscosupplementation last?',
        answer: 'Relief typically lasts 6 months to 1 year. Some patients experience benefit for longer. Injections can be repeated, usually not more than once every 6 months. Results vary - about 50-70% of patients experience meaningful improvement.'
      },
      {
        question: 'Is viscosupplementation better than cortisone?',
        answer: 'Cortisone works faster (days) but effects wear off in weeks to months and repeated use may damage cartilage. Viscosupplementation takes longer to work (weeks) but effects last longer and may be safer for repeated use. They can be used together.'
      }
    ]
  },

  // ============ PHYSIOTHERAPY ============
  {
    id: 'physiotherapy-rehabilitation',
    slug: 'physiotherapy-rehabilitation',
    name: 'Physiotherapy & Rehabilitation',
    category: 'Conservative Treatment',
    icon: '🏃',
    shortDescription: 'Structured exercise programs for recovery from injury, surgery, or chronic conditions.',
    imageUrl: 'https://images.pexels.com/photos/5473186/pexels-photo-5473186.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Physiotherapy for Orthopedic Conditions Hyderabad | Dr. Harsha',
    metaDescription: 'Expert physiotherapy and rehabilitation in Hyderabad. Pre and post-surgery rehab, sports injury recovery, chronic pain management. Comprehensive programs.',
    keywords: 'physiotherapy hyderabad, orthopedic rehabilitation, post surgery physio, sports rehab, knee exercises',
    overview: `Physiotherapy is essential for recovery from orthopedic conditions and surgery. Our team provides comprehensive rehabilitation programs tailored to each patient's needs, whether recovering from joint replacement, sports injury, or managing chronic conditions like arthritis.`,
    programs: [
      { name: 'Post-Knee Replacement Rehab', duration: '12 weeks', goals: 'Full knee motion (0-120°), walking independence, stair climbing' },
      { name: 'Post-Hip Replacement Rehab', duration: '8-12 weeks', goals: 'Hip precautions, walking without aids, daily activities' },
      { name: 'ACL Reconstruction Rehab', duration: '9-12 months', goals: 'Knee stability, return to sports, neuromuscular control' },
      { name: 'Rotator Cuff Repair Rehab', duration: '4-6 months', goals: 'Shoulder motion, strength, overhead activities' },
      { name: 'Spine Rehabilitation', duration: '6-12 weeks', goals: 'Core strength, posture correction, pain management' },
      { name: 'Chronic Pain Management', duration: 'Ongoing', goals: 'Pain reduction, function improvement, lifestyle modification' }
    ],
    phases: [
      { phase: 'Phase 1: Protection', duration: '0-2 weeks', focus: 'Pain control, protect surgical repair, gentle motion' },
      { phase: 'Phase 2: Early Motion', duration: '2-6 weeks', focus: 'Restore range of motion, begin strengthening' },
      { phase: 'Phase 3: Strengthening', duration: '6-12 weeks', focus: 'Progressive resistance exercises, functional training' },
      { phase: 'Phase 4: Return to Activity', duration: '12+ weeks', focus: 'Sport-specific training, full activity clearance' }
    ],
    benefits: [
      { title: 'Faster Recovery', description: 'Structured programs accelerate healing' },
      { title: 'Prevent Complications', description: 'Reduce risk of stiffness, weakness, re-injury' },
      { title: 'Personalized Care', description: 'Programs tailored to your specific condition and goals' },
      { title: 'Education', description: 'Learn exercises to continue at home' }
    ]
  },

  // ============ INJECTION TREATMENTS ============
  {
    id: 'joint-injections',
    slug: 'joint-injections',
    name: 'Joint Injections (Corticosteroid)',
    category: 'Conservative Treatment',
    icon: '💉',
    shortDescription: 'Steroid injections into joints for pain relief and inflammation reduction.',
    imageUrl: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Joint Injections Hyderabad | Steroid Injection | Dr. Harsha',
    metaDescription: 'Ultrasound-guided joint injections in Hyderabad. Corticosteroid injections for knee, shoulder, hip pain. Quick relief from arthritis and inflammation.',
    keywords: 'joint injection hyderabad, steroid injection knee, cortisone shot, intra-articular injection, arthritis injection',
    overview: `Corticosteroid (steroid) injections deliver powerful anti-inflammatory medication directly into joints or around tendons. They provide rapid pain relief and can be diagnostic (confirming the source of pain) and therapeutic. Dr. Harsha uses ultrasound guidance for precise placement.`,
    applications: [
      { joint: 'Knee', conditions: 'Arthritis, meniscus tears, bursitis' },
      { joint: 'Shoulder', conditions: 'Rotator cuff tendinitis, bursitis, frozen shoulder' },
      { joint: 'Hip', conditions: 'Arthritis, bursitis, labral tears' },
      { joint: 'Ankle', conditions: 'Arthritis, tendinitis' },
      { joint: 'Elbow', conditions: 'Tennis elbow, golfer\'s elbow' },
      { joint: 'Spine', conditions: 'Epidural for disc herniation, facet joint pain' }
    ],
    benefits: [
      { title: 'Rapid Relief', description: 'Pain reduction within days' },
      { title: 'Precise Delivery', description: 'Ultrasound guidance ensures accurate placement' },
      { title: 'Outpatient', description: 'Quick office procedure' },
      { title: 'Diagnostic Value', description: 'Confirms source of pain' }
    ],
    limitations: [
      { issue: 'Temporary', description: 'Relief typically lasts weeks to months' },
      { issue: 'Repeat Limits', description: 'Generally no more than 3-4 per year per joint' },
      { issue: 'Side Effects', description: 'Possible cartilage damage with repeated use' }
    ],
    faqs: [
      {
        question: 'How long does a cortisone injection last?',
        answer: 'Effects vary widely - from a few weeks to several months. First injections tend to last longer. Some patients get excellent relief; others minimal benefit. If the first injection helps, subsequent ones often provide similar relief.'
      },
      {
        question: 'Are steroid injections safe?',
        answer: 'When used appropriately (limited frequency, proper technique), steroid injections are safe. Concerns include potential cartilage damage with repeated injections, temporary blood sugar elevation in diabetics, and rarely, infection. Dr. Harsha discusses risks and benefits for your specific situation.'
      }
    ]
  },

  // ============ TRAUMA TREATMENTS ============
  {
    id: 'fracture-management',
    slug: 'fracture-management',
    name: 'Fracture Management',
    category: 'Trauma',
    icon: '🦴',
    shortDescription: 'Comprehensive treatment of bone fractures from simple casts to complex surgical fixation.',
    imageUrl: 'https://images.pexels.com/photos/7089617/pexels-photo-7089617.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Fracture Treatment Hyderabad | Bone Fracture Surgery | Dr. Harsha',
    metaDescription: 'Expert fracture treatment in Hyderabad. From simple fractures to complex trauma. Surgical and non-surgical bone fracture management.',
    keywords: 'fracture treatment hyderabad, broken bone treatment, fracture surgery, bone fixation, trauma surgery',
    overview: `Dr. Harsha provides comprehensive fracture care, from simple fractures treated with casts to complex injuries requiring surgical fixation. Modern techniques including minimally invasive surgery, locking plates, and intramedullary nails help patients recover faster with better outcomes.`,
    types: [
      { type: 'Simple Fractures', treatment: 'Cast, splint, or brace', healing: '6-8 weeks' },
      { type: 'Displaced Fractures', treatment: 'Reduction and fixation (plates, screws)', healing: '8-12 weeks' },
      { type: 'Open Fractures', treatment: 'Emergency surgery, wound care, fixation', healing: '12+ weeks' },
      { type: 'Periarticular Fractures', treatment: 'Anatomic reduction, stable fixation', healing: '10-12 weeks' },
      { type: 'Pathological Fractures', treatment: 'Stabilization + treat underlying cause', healing: 'Variable' }
    ],
    techniques: [
      { name: 'Closed Reduction', description: 'Realigning bones without surgery' },
      { name: 'Open Reduction Internal Fixation (ORIF)', description: 'Surgery with plates and screws' },
      { name: 'Intramedullary Nailing', description: 'Rod inside the bone for long bone fractures' },
      { name: 'External Fixation', description: 'Frame outside the body for severe injuries' },
      { name: 'Minimally Invasive Plate Osteosynthesis (MIPO)', description: 'Small incisions, less tissue damage' }
    ],
    faqs: [
      {
        question: 'How long does a fracture take to heal?',
        answer: 'Healing time varies by location, severity, and patient factors. Simple fractures: 6-8 weeks. Complex fractures: 3-6 months. Factors affecting healing include age, nutrition, smoking, diabetes, and blood supply to the area.'
      },
      {
        question: 'Will I need surgery for my fracture?',
        answer: 'Not all fractures need surgery. Stable, well-aligned fractures often heal with immobilization. Surgery is recommended for displaced fractures, fractures near joints, open fractures, and when non-surgical treatment would result in poor function.'
      }
    ]
  },

  // ============ ELBOW SURGERY ============
  {
    id: 'elbow-arthroscopy',
    slug: 'elbow-arthroscopy',
    name: 'Elbow Arthroscopy',
    category: 'Arthroscopy',
    icon: '💪',
    shortDescription: 'Minimally invasive surgery for elbow problems including loose bodies, stiffness, and arthritis.',
    imageUrl: 'https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Elbow Arthroscopy Hyderabad | Minimally Invasive Elbow Surgery | Dr. Harsha',
    metaDescription: 'Expert elbow arthroscopy in Hyderabad. Keyhole surgery for loose bodies, elbow stiffness, tennis elbow. Faster recovery, smaller incisions.',
    keywords: 'elbow arthroscopy hyderabad, elbow keyhole surgery, elbow stiffness treatment, loose body removal, elbow surgery',
    overview: `Elbow arthroscopy is a minimally invasive surgical technique that allows Dr. Harsha to diagnose and treat problems inside the elbow joint through small incisions. A tiny camera and specialized instruments are used to remove loose bodies, release scar tissue, or address other elbow problems.`,
    recoveryTime: '2-6 weeks',
    hospitalStay: 'Day surgery',
    successRate: '85-95%',
    indications: [
      { condition: 'Loose Bodies', description: 'Fragments of bone or cartilage floating in joint', success: '95%' },
      { condition: 'Elbow Stiffness', description: 'Arthrofibrosis, post-traumatic stiffness', success: '85-90%' },
      { condition: 'Osteochondritis Dissecans', description: 'Cartilage and bone damage in young athletes', success: '85%' },
      { condition: 'Early Arthritis', description: 'Debridement and bone spur removal', success: '70-80%' },
      { condition: 'Tennis Elbow (Refractory)', description: 'Debridement of damaged tendon', success: '80-85%' }
    ],
    procedure: [
      { step: 1, title: 'Anesthesia', description: 'General or regional anesthesia' },
      { step: 2, title: 'Portal Creation', description: '2-4 small incisions (5mm each)' },
      { step: 3, title: 'Inspection', description: 'Camera examines entire joint' },
      { step: 4, title: 'Treatment', description: 'Remove loose bodies, release scar tissue, address pathology' },
      { step: 5, title: 'Closure', description: 'Small stitches, immediate motion often encouraged' }
    ],
    benefits: [
      { title: 'Small Incisions', description: '5mm incisions vs. large open incision' },
      { title: 'Less Pain', description: 'Minimal tissue disruption' },
      { title: 'Faster Recovery', description: 'Return to activities in weeks, not months' },
      { title: 'Better Visualization', description: 'Camera provides magnified view of joint' }
    ],
    faqs: [
      {
        question: 'How long is recovery from elbow arthroscopy?',
        answer: 'Simple procedures (loose body removal): 1-2 weeks. Stiffness release: 4-6 weeks of intensive therapy. Most patients return to desk work in 1-2 weeks, manual labor in 6-8 weeks.'
      }
    ]
  },

  // ============ FOOT & ANKLE SURGERY ============
  {
    id: 'ankle-arthroscopy',
    slug: 'ankle-arthroscopy',
    name: 'Ankle Arthroscopy',
    category: 'Arthroscopy',
    icon: '🦶',
    shortDescription: 'Minimally invasive surgery for ankle problems including cartilage damage and impingement.',
    imageUrl: 'https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Ankle Arthroscopy Hyderabad | Minimally Invasive Ankle Surgery | Dr. Harsha',
    metaDescription: 'Expert ankle arthroscopy in Hyderabad. Keyhole surgery for ankle impingement, cartilage damage, loose bodies. Faster recovery than open surgery.',
    keywords: 'ankle arthroscopy hyderabad, ankle keyhole surgery, ankle impingement treatment, ankle cartilage surgery, OCD ankle',
    overview: `Ankle arthroscopy is a minimally invasive technique to diagnose and treat problems inside the ankle joint. Through small incisions, a camera and specialized instruments address conditions like impingement, cartilage damage, and loose bodies with faster recovery than open surgery.`,
    recoveryTime: '2-8 weeks',
    hospitalStay: 'Day surgery',
    successRate: '85-90%',
    indications: [
      { condition: 'Anterior Impingement', description: 'Bone spurs causing front ankle pain', success: '90%' },
      { condition: 'Posterior Impingement', description: 'Pain at back of ankle, common in dancers', success: '85-90%' },
      { condition: 'Osteochondral Lesions', description: 'Cartilage damage on talus bone', success: '80-85%' },
      { condition: 'Loose Bodies', description: 'Floating fragments in joint', success: '95%' },
      { condition: 'Synovitis', description: 'Inflamed joint lining', success: '85%' }
    ],
    benefits: [
      { title: 'Small Incisions', description: 'Two 5mm incisions' },
      { title: 'Less Pain', description: 'Minimal soft tissue damage' },
      { title: 'Faster Recovery', description: 'Walking in days, sports in weeks' },
      { title: 'Outpatient', description: 'Go home same day' }
    ],
    faqs: [
      {
        question: 'Can I walk after ankle arthroscopy?',
        answer: 'For simple procedures like impingement surgery, protected walking is allowed immediately with crutches. Weight bearing depends on the procedure performed - some require 2-4 weeks of limited weight bearing for cartilage procedures.'
      }
    ]
  },

  // ============ MINIMALLY INVASIVE SURGERY ============
  {
    id: 'minimally-invasive-knee-replacement',
    slug: 'minimally-invasive-knee-replacement',
    name: 'Minimally Invasive Knee Replacement',
    category: 'Joint Replacement',
    icon: '🦵',
    shortDescription: 'Knee replacement through smaller incision with less tissue disruption and faster recovery.',
    imageUrl: 'https://images.pexels.com/photos/7089617/pexels-photo-7089617.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Minimally Invasive Knee Replacement Hyderabad | Dr. Harsha',
    metaDescription: 'Advanced minimally invasive knee replacement in Hyderabad. Smaller incision, less pain, faster recovery. Expert joint replacement surgery.',
    keywords: 'minimally invasive knee replacement, MIS TKR, small incision knee surgery, rapid recovery knee replacement, hyderabad',
    overview: `Minimally invasive knee replacement uses specialized techniques and instruments to perform the surgery through a smaller incision (8-10cm vs. 20-25cm). This approach spares the quadriceps muscle, resulting in less pain, faster recovery, and quicker return to function.`,
    recoveryTime: '4-6 weeks to normal activities',
    hospitalStay: '2-3 days',
    successRate: '95%+',
    comparison: {
      traditional: { incision: '20-25cm', hospital: '4-5 days', walking: '1-2 days', recovery: '8-12 weeks' },
      minimally_invasive: { incision: '8-10cm', hospital: '2-3 days', walking: 'Same day', recovery: '4-6 weeks' }
    },
    benefits: [
      { title: 'Smaller Incision', description: '8-10cm vs. 20-25cm traditional' },
      { title: 'Muscle Sparing', description: 'Quadriceps not cut, preserving strength' },
      { title: 'Less Blood Loss', description: 'Reduced need for transfusion' },
      { title: 'Less Pain', description: 'Less tissue trauma means less post-op pain' },
      { title: 'Faster Recovery', description: 'Walking same day, home in 2-3 days' },
      { title: 'Better Cosmesis', description: 'Smaller, less noticeable scar' }
    ],
    candidacy: [
      'BMI < 35 (non-obese patients)',
      'No severe deformity',
      'Good overall health',
      'Motivated for rapid recovery program'
    ],
    faqs: [
      {
        question: 'Is minimally invasive knee replacement right for me?',
        answer: 'MIS knee replacement works best for patients with BMI under 35, moderate arthritis, and no severe deformity. Dr. Harsha will assess your anatomy and health to determine if you\'re a candidate. Not all patients are suitable for this approach.'
      },
      {
        question: 'Is the implant the same as traditional knee replacement?',
        answer: 'Yes, the same proven implants are used. The difference is in how the surgery is performed - through a smaller incision with specialized instruments - not in the implant itself. Long-term outcomes are equivalent.'
      }
    ]
  },
  {
    id: 'robotic-hip-replacement',
    slug: 'robotic-hip-replacement',
    name: 'Robotic/Computer-Navigated Hip Replacement',
    category: 'Joint Replacement',
    icon: '🤖',
    shortDescription: 'Hip replacement with robotic assistance for precise implant positioning.',
    imageUrl: 'https://images.pexels.com/photos/7089617/pexels-photo-7089617.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Robotic Hip Replacement Hyderabad | Computer-Navigated THR | Dr. Harsha',
    metaDescription: 'Advanced robotic hip replacement in Hyderabad. Computer-navigated precision for optimal implant positioning. Better outcomes, reduced dislocation risk.',
    keywords: 'robotic hip replacement hyderabad, computer navigated THR, mako hip replacement, precision hip surgery',
    overview: `Robotic/computer-navigated hip replacement uses advanced technology to assist in precise placement of hip implants. A 3D model of your hip is created, and the computer guides the surgeon to position components optimally. This precision may reduce dislocation risk and improve longevity.`,
    recoveryTime: '4-6 weeks',
    hospitalStay: '2-3 days',
    successRate: '95%+',
    benefits: [
      { title: 'Precision Placement', description: 'Cup positioned within 1-2° of planned angle' },
      { title: 'Reduced Dislocation', description: 'Optimal positioning reduces dislocation risk' },
      { title: 'Leg Length Accuracy', description: 'Better control of leg length equality' },
      { title: 'Personalized Surgery', description: 'Based on your specific anatomy' }
    ],
    technology: [
      { name: 'CT-Based Navigation', description: 'Pre-operative CT creates 3D model for planning' },
      { name: 'Imageless Navigation', description: 'Intraoperative mapping without radiation' },
      { name: 'Robotic Arm Assistance', description: 'Robotic arm guides bone preparation' }
    ],
    faqs: [
      {
        question: 'Is robotic hip replacement better than traditional?',
        answer: 'Robotic assistance provides more consistent, precise implant positioning. Early studies show reduced dislocation rates and improved component alignment. Long-term studies are ongoing. The technology is most beneficial when combined with an experienced surgeon.'
      }
    ]
  },

  // ============ PEDIATRIC ============
  {
    id: 'pediatric-orthopedics',
    slug: 'pediatric-orthopedics',
    name: 'Pediatric Orthopedic Care',
    category: 'Pediatrics',
    icon: '👶',
    shortDescription: 'Specialized orthopedic care for children including fractures, developmental conditions, and sports injuries.',
    imageUrl: 'https://images.pexels.com/photos/7446990/pexels-photo-7446990.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Pediatric Orthopedics Hyderabad | Children Bone Doctor | Dr. Harsha',
    metaDescription: 'Expert pediatric orthopedic care in Hyderabad. Treatment for children\'s fractures, flat feet, limping, sports injuries. Child-friendly approach.',
    keywords: 'pediatric orthopedics hyderabad, children bone doctor, kids fracture treatment, child sports injury, limping child',
    overview: `Children have unique orthopedic needs because their bones are still growing. Dr. Harsha provides specialized care for pediatric conditions including fractures, developmental disorders, and sports injuries, with an understanding of how treatments affect growing bones.`,
    conditions: [
      { name: 'Pediatric Fractures', description: 'Special consideration for growth plates' },
      { name: 'Osgood-Schlatter Disease', description: 'Knee pain in growing adolescents' },
      { name: 'Sever\'s Disease', description: 'Heel pain in active children' },
      { name: 'Flat Feet in Children', description: 'Usually normal, sometimes needs treatment' },
      { name: 'In-toeing/Out-toeing', description: 'Abnormal foot position while walking' },
      { name: 'Limping Child', description: 'Various causes requiring evaluation' },
      { name: 'Developmental Dysplasia of Hip', description: 'Hip socket abnormality in infants' }
    ],
    approach: [
      { title: 'Growth Plate Protection', description: 'Treatments designed to not affect bone growth' },
      { title: 'Child-Friendly Environment', description: 'Comfortable setting for young patients' },
      { title: 'Family Education', description: 'Parents involved in understanding condition and treatment' },
      { title: 'Conservative First', description: 'Non-surgical approaches when appropriate' }
    ],
    faqs: [
      {
        question: 'When should I worry about my child\'s flat feet?',
        answer: 'Flat feet are normal in infants and toddlers. Most children develop arches by age 6. Consult if: feet are painful or stiff, arches don\'t develop by age 6, only one foot is flat, or your child has difficulty with activities.'
      },
      {
        question: 'My child is limping - should I be concerned?',
        answer: 'Any unexplained limp in a child deserves medical evaluation. Causes range from minor (muscle strain, growing pains) to serious (infection, hip problems). If limp persists more than a few days, is associated with fever, or causes significant pain, see a doctor promptly.'
      }
    ]
  }
];

export default additionalTreatments;
