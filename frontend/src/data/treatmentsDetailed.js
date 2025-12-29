// Comprehensive orthopedic treatments with detailed SEO-optimized content
// Designed for Google ranking with FAQ schema, internal linking, and keyword optimization

export const treatmentsDetailed = [
  {
    id: 'total-knee-replacement',
    name: 'Total Knee Replacement (TKR)',
    slug: 'total-knee-replacement',
    category: 'Joint Replacement',
    icon: '🦵',
    imageUrl: 'https://images.pexels.com/photos/263337/pexels-photo-263337.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Complete knee joint replacement surgery for severe arthritis with excellent outcomes.',
    
    // Hero section content
    heroTitle: 'Total Knee Replacement Surgery in Hyderabad',
    heroSubtitle: 'Advanced computer-navigated knee replacement with 95%+ success rate. Get back to pain-free walking within weeks.',
    
    overview: `Total Knee Replacement (TKR), also known as Total Knee Arthroplasty, is a surgical procedure that replaces damaged knee joint surfaces with metal and plastic components. Dr. B Harsha Vardhana Reddy performs over 300 knee replacements annually at Yashoda Hospital, Hyderabad, using the latest minimally invasive techniques and computer-assisted navigation for precise implant positioning.

This gold-standard treatment is recommended for patients with end-stage knee arthritis who have exhausted non-surgical options. With advancements in implant design and surgical techniques, most patients can expect 20-25 years of implant longevity and significant improvement in quality of life.`,

    // Key statistics for credibility
    statistics: [
      { label: 'Success Rate', value: '95%+', description: 'Long-term satisfaction' },
      { label: 'Implant Lifespan', value: '20-25 yrs', description: 'With modern implants' },
      { label: 'Hospital Stay', value: '2-3 days', description: 'Quick discharge' },
      { label: 'Walking', value: 'Day 1', description: 'With assistance' }
    ],

    // Who needs this surgery
    candidatesFor: [
      'Severe knee arthritis not responding to medications',
      'Significant knee pain affecting daily activities',
      'Difficulty walking, climbing stairs, or getting up from chairs',
      'Knee deformity (bow legs or knock knees)',
      'Failed previous knee surgeries',
      'Age typically 55-80 years (can vary based on condition)'
    ],

    // Detailed procedure steps
    procedureSteps: [
      {
        step: 1,
        title: 'Pre-operative Planning',
        description: 'X-rays and CT scans for templating. Blood tests, cardiac clearance, and dental checkup. Stop blood thinners 5-7 days before surgery.',
        duration: '1-2 weeks before'
      },
      {
        step: 2,
        title: 'Anesthesia',
        description: 'Spinal anesthesia (preferred) or general anesthesia. Nerve blocks for post-operative pain control.',
        duration: '30-45 minutes'
      },
      {
        step: 3,
        title: 'Surgical Approach',
        description: 'Minimally invasive incision (10-12 cm). Medial parapatellar approach preserves muscle.',
        duration: 'Part of surgery'
      },
      {
        step: 4,
        title: 'Bone Preparation',
        description: 'Computer navigation guides precise bone cuts. Damaged cartilage and bone removed.',
        duration: '45-60 minutes'
      },
      {
        step: 5,
        title: 'Implant Placement',
        description: 'Trial implants tested for fit and alignment. Final cobalt-chrome and polyethylene components cemented.',
        duration: '30-45 minutes'
      },
      {
        step: 6,
        title: 'Closure & Recovery',
        description: 'Wound closure with absorbable sutures. Drain placement. Compression bandage applied.',
        duration: '20-30 minutes'
      }
    ],

    // Benefits with evidence
    benefits: [
      { title: 'Pain Relief', description: '90-95% of patients report significant pain reduction', icon: '✓' },
      { title: 'Improved Mobility', description: 'Walk, climb stairs, and resume daily activities', icon: '✓' },
      { title: 'Better Quality of Life', description: 'Return to golf, swimming, cycling, and travel', icon: '✓' },
      { title: 'Long-lasting Results', description: '95% of implants last 15-20 years or more', icon: '✓' },
      { title: 'Corrects Deformity', description: 'Straightens bow legs or knock knees', icon: '✓' },
      { title: 'Minimally Invasive', description: 'Smaller incision, less tissue damage, faster recovery', icon: '✓' }
    ],

    // Recovery timeline
    recoveryTimeline: [
      { phase: 'Day 1', milestone: 'Stand and take first steps with walker', activities: 'Ankle pumps, quadriceps sets' },
      { phase: 'Days 2-3', milestone: 'Walk in corridor, climb stairs', activities: 'Discharge home or to rehab' },
      { phase: 'Week 1-2', milestone: 'Walk with walker at home', activities: 'Home exercises, ice therapy' },
      { phase: 'Week 3-4', milestone: 'Transition to cane', activities: 'Increase walking distance' },
      { phase: 'Week 6', milestone: 'Drive (automatic car)', activities: 'Light daily activities' },
      { phase: 'Month 3', milestone: 'Walk independently', activities: 'Return to most activities' },
      { phase: 'Month 6', milestone: 'Full recovery', activities: 'Golf, swimming, travel' }
    ],

    // Risks and complications
    risks: [
      { risk: 'Infection', percentage: '1-2%', prevention: 'Antibiotics, sterile technique' },
      { risk: 'Blood clots (DVT)', percentage: '2-3%', prevention: 'Blood thinners, compression stockings' },
      { risk: 'Stiffness', percentage: '5-10%', prevention: 'Early physiotherapy' },
      { risk: 'Implant loosening', percentage: '<1% at 10 years', prevention: 'Proper cementing technique' },
      { risk: 'Nerve/vessel injury', percentage: '<0.5%', prevention: 'Experienced surgeon' }
    ],

    // Pre-surgery preparation
    preOpPreparation: [
      'Stop smoking 4-6 weeks before surgery',
      'Lose weight if BMI > 35',
      'Control diabetes (HbA1c < 8%)',
      'Treat any dental infections',
      'Arrange home help for 2-3 weeks',
      'Prepare home: remove rugs, install grab bars',
      'Stop blood thinners as advised'
    ],

    // Post-surgery care
    postOpCare: [
      'Wound care: Keep dry for 2 weeks, watch for redness',
      'Ice therapy: 20 minutes, 3-4 times daily',
      'Exercises: As prescribed by physiotherapist',
      'Medications: Pain killers, blood thinners, antibiotics',
      'Follow-up: 2 weeks, 6 weeks, 3 months, 1 year',
      'Activity: Avoid kneeling, squatting, running'
    ],

    // FAQs for schema markup
    faqs: [
      {
        question: 'How long does total knee replacement surgery take?',
        answer: 'The surgery typically takes 1.5 to 2 hours. With anesthesia preparation and recovery room time, expect to be in the operation theater area for about 3-4 hours total.'
      },
      {
        question: 'What is the cost of knee replacement surgery in Hyderabad?',
        answer: 'The cost ranges from ₹2.5 to 4.5 lakhs depending on the implant type (standard vs premium), hospital room category, and any additional procedures needed. Dr. Harsha offers various implant options to suit different budgets.'
      },
      {
        question: 'Can both knees be replaced at the same time?',
        answer: 'Yes, bilateral (both knees) replacement can be done in a single surgery for suitable candidates. This reduces overall recovery time and cost. However, it requires good overall health and cardiac fitness.'
      },
      {
        question: 'How long will my knee replacement last?',
        answer: 'Modern knee implants typically last 20-25 years. With proper care and avoiding high-impact activities, many patients never need revision surgery.'
      },
      {
        question: 'When can I drive after knee replacement?',
        answer: 'Most patients can drive an automatic car 4-6 weeks after surgery (left knee) or 6-8 weeks (right knee). You should be off narcotic pain medications and able to brake quickly.'
      },
      {
        question: 'Will I set off metal detectors after surgery?',
        answer: 'Yes, knee implants may trigger metal detectors at airports. Carry your hospital card or implant documentation when traveling.'
      },
      {
        question: 'Can I kneel after knee replacement?',
        answer: 'While medically safe, many patients find kneeling uncomfortable due to numbness around the incision. Using a cushion or avoiding prolonged kneeling is recommended.'
      },
      {
        question: 'What activities should I avoid after TKR?',
        answer: 'Avoid high-impact activities like running, jumping, contact sports, and heavy lifting. Golf, swimming, cycling, walking, and doubles tennis are generally safe.'
      }
    ],

    // Related conditions for internal linking
    relatedConditions: ['knee-arthritis', 'meniscus-tear', 'acl-tear'],
    
    // Related treatments for internal linking
    relatedTreatments: ['knee-arthroscopy', 'acl-reconstruction'],

    // SEO metadata
    seoTitle: 'Total Knee Replacement Surgery in Hyderabad | Dr. Harsha Reddy',
    seoDescription: 'Expert total knee replacement (TKR) surgery at Yashoda Hospital Hyderabad. Computer-navigated, minimally invasive technique. 95%+ success rate. Book consultation.',
    seoKeywords: 'total knee replacement Hyderabad, TKR surgery cost, best knee surgeon Hyderabad, knee replacement hospital, robotic knee surgery, computer navigated knee replacement'
  },

  {
    id: 'total-hip-replacement',
    name: 'Total Hip Replacement (THR)',
    slug: 'total-hip-replacement',
    category: 'Joint Replacement',
    icon: '🦴',
    imageUrl: 'https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Hip joint replacement for severe arthritis or AVN. Restores pain-free hip function.',
    
    heroTitle: 'Total Hip Replacement Surgery in Hyderabad',
    heroSubtitle: 'Advanced anterior approach hip replacement for faster recovery and better outcomes.',
    
    overview: `Total Hip Replacement (THR) is a surgical procedure where the damaged hip joint is replaced with artificial components. Dr. B Harsha Vardhana Reddy specializes in both anterior and posterior approach hip replacements, offering personalized surgical plans based on patient anatomy and activity goals.

Hip replacement is one of the most successful orthopedic surgeries, with over 95% of patients experiencing dramatic pain relief and improved function. Modern ceramic-on-ceramic and ceramic-on-polyethylene bearings provide excellent durability with minimal wear.`,

    statistics: [
      { label: 'Success Rate', value: '97%', description: 'Patient satisfaction' },
      { label: 'Implant Life', value: '25+ yrs', description: 'With ceramic bearings' },
      { label: 'Hospital Stay', value: '2-3 days', description: 'Early discharge' },
      { label: 'Walking', value: 'Same day', description: 'With rapid recovery protocol' }
    ],

    candidatesFor: [
      'Hip arthritis (osteoarthritis or rheumatoid)',
      'Avascular necrosis (AVN) of femoral head',
      'Hip fractures in elderly patients',
      'Failed previous hip surgeries',
      'Developmental dysplasia of hip',
      'Post-traumatic arthritis'
    ],

    procedureSteps: [
      {
        step: 1,
        title: 'Pre-operative Assessment',
        description: 'Hip X-rays, blood tests, cardiac evaluation. Template for implant sizing.',
        duration: '1-2 weeks before'
      },
      {
        step: 2,
        title: 'Anesthesia',
        description: 'Spinal or general anesthesia based on patient factors.',
        duration: '30 minutes'
      },
      {
        step: 3,
        title: 'Surgical Approach',
        description: 'Anterior (front) or posterior (back) approach based on patient anatomy.',
        duration: 'Part of surgery'
      },
      {
        step: 4,
        title: 'Femoral Head Removal',
        description: 'Dislocate hip and remove damaged femoral head.',
        duration: '20-30 minutes'
      },
      {
        step: 5,
        title: 'Socket Preparation',
        description: 'Ream acetabulum and place cup with liner.',
        duration: '30 minutes'
      },
      {
        step: 6,
        title: 'Stem Insertion',
        description: 'Prepare femur and insert stem with ceramic head.',
        duration: '30 minutes'
      }
    ],

    benefits: [
      { title: 'Complete Pain Relief', description: '95% patients pain-free', icon: '✓' },
      { title: 'Restored Mobility', description: 'Walk, climb stairs, sit cross-legged', icon: '✓' },
      { title: 'Equal Leg Length', description: 'Corrects limb length discrepancy', icon: '✓' },
      { title: 'Durable Implants', description: 'Ceramic bearings last 25+ years', icon: '✓' },
      { title: 'Anterior Approach', description: 'Faster recovery, lower dislocation risk', icon: '✓' },
      { title: 'Return to Activities', description: 'Golf, cycling, swimming possible', icon: '✓' }
    ],

    recoveryTimeline: [
      { phase: 'Day 0', milestone: 'Stand and walk with support', activities: 'Rapid recovery protocol' },
      { phase: 'Days 2-3', milestone: 'Discharge home', activities: 'Walk with walker' },
      { phase: 'Week 2', milestone: 'Climb stairs', activities: 'Transition to cane' },
      { phase: 'Week 4', milestone: 'Walk without support', activities: 'Drive automatic car' },
      { phase: 'Week 6', milestone: 'Return to desk work', activities: 'Light activities' },
      { phase: 'Month 3', milestone: 'Full recovery', activities: 'Sports, travel' }
    ],

    risks: [
      { risk: 'Dislocation', percentage: '1-2%', prevention: 'Hip precautions, anterior approach' },
      { risk: 'Infection', percentage: '1%', prevention: 'Antibiotics, laminar airflow OR' },
      { risk: 'Leg length inequality', percentage: '2-3%', prevention: 'Intraoperative templating' },
      { risk: 'DVT/PE', percentage: '1-2%', prevention: 'Blood thinners, early mobilization' },
      { risk: 'Loosening', percentage: '<1% at 10 years', prevention: 'Proper technique' }
    ],

    preOpPreparation: [
      'Stop smoking 4-6 weeks before',
      'Optimize diabetes and blood pressure',
      'Dental clearance to prevent infection',
      'Lose weight if significantly overweight',
      'Arrange raised toilet seat and grab bars',
      'Plan for 2-3 weeks of home help'
    ],

    postOpCare: [
      'Hip precautions for 6 weeks (posterior approach)',
      'Anterior approach: fewer restrictions',
      'Blood thinners for 4-6 weeks',
      'Physiotherapy exercises daily',
      'Avoid low chairs and crossing legs initially',
      'Sleep on back or non-operated side'
    ],

    faqs: [
      {
        question: 'What is the difference between anterior and posterior hip replacement?',
        answer: 'Anterior approach goes through the front of hip between muscles (no muscle cutting), allowing faster recovery and lower dislocation risk. Posterior approach is more traditional, going through the back. Dr. Harsha performs both and recommends based on patient anatomy.'
      },
      {
        question: 'How much does hip replacement cost in Hyderabad?',
        answer: 'Hip replacement surgery costs ₹3-5 lakhs depending on implant choice (ceramic vs metal), hospital room category, and surgical approach. Premium ceramic-on-ceramic bearings cost more but last longer.'
      },
      {
        question: 'Can I sit cross-legged (Indian toilet) after hip replacement?',
        answer: 'Yes, most patients can sit cross-legged after 3 months, especially with anterior approach. Indian toilet use may require a raised seat initially but is usually possible after full recovery.'
      },
      {
        question: 'What is AVN and why does it need hip replacement?',
        answer: 'Avascular Necrosis (AVN) is death of bone tissue due to poor blood supply, commonly affecting the hip. It causes the femoral head to collapse, leading to severe pain and arthritis. Hip replacement is the definitive treatment for advanced AVN.'
      },
      {
        question: 'How soon can I travel after hip replacement?',
        answer: 'Short car rides are possible within 2-3 weeks. Air travel is generally safe after 4-6 weeks. During flights, walk every hour and wear compression stockings to prevent blood clots.'
      },
      {
        question: 'Will I need the other hip replaced too?',
        answer: 'If you have arthritis in both hips, the second hip may eventually need replacement. However, many patients find their second hip improves after the first replacement due to better gait and reduced strain.'
      }
    ],

    relatedConditions: ['hip-arthritis', 'avascular-necrosis'],
    relatedTreatments: ['hip-arthroscopy'],

    seoTitle: 'Total Hip Replacement Surgery in Hyderabad | Anterior Approach | Dr. Harsha',
    seoDescription: 'Expert hip replacement surgery at Yashoda Hospital Hyderabad. Anterior approach, ceramic implants, rapid recovery. AVN and arthritis treatment. Book consultation.',
    seoKeywords: 'hip replacement Hyderabad, THR surgery cost, anterior hip replacement, AVN treatment, best hip surgeon Hyderabad, ceramic hip implant'
  },

  {
    id: 'acl-reconstruction',
    name: 'ACL Reconstruction Surgery',
    slug: 'acl-reconstruction',
    category: 'Sports Medicine',
    icon: '⚽',
    imageUrl: 'https://images.pexels.com/photos/4506160/pexels-photo-4506160.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Arthroscopic ACL ligament reconstruction for athletes and active individuals.',
    
    heroTitle: 'ACL Reconstruction Surgery in Hyderabad',
    heroSubtitle: 'Return to sports with anatomic ACL reconstruction. Trusted by professional athletes.',
    
    overview: `ACL (Anterior Cruciate Ligament) reconstruction is an arthroscopic surgery to rebuild the torn ACL using a tendon graft. Dr. B Harsha Vardhana Reddy performs anatomic ACL reconstruction using hamstring or patellar tendon grafts, helping athletes return to competitive sports.

The ACL is crucial for knee stability during cutting, pivoting, and jumping movements. A torn ACL doesn't heal on its own and typically requires surgical reconstruction for active individuals who want to return to sports or have an unstable knee.`,

    statistics: [
      { label: 'Success Rate', value: '90-95%', description: 'Return to sports' },
      { label: 'Surgery Time', value: '60-90 min', description: 'Arthroscopic' },
      { label: 'Hospital Stay', value: '1 day', description: 'Day care available' },
      { label: 'Sports Return', value: '9-12 months', description: 'Full contact sports' }
    ],

    candidatesFor: [
      'Athletes wanting to return to cutting/pivoting sports',
      'Young, active individuals with ACL tear',
      'Knee giving way during daily activities',
      'Combined ACL and meniscus injuries',
      'Failed conservative treatment',
      'Occupations requiring knee stability'
    ],

    procedureSteps: [
      {
        step: 1,
        title: 'Graft Harvesting',
        description: 'Hamstring tendons (semitendinosus/gracilis) or patellar tendon harvested through small incision.',
        duration: '15-20 minutes'
      },
      {
        step: 2,
        title: 'Diagnostic Arthroscopy',
        description: 'Camera inserted to assess meniscus, cartilage, and confirm ACL tear.',
        duration: '10 minutes'
      },
      {
        step: 3,
        title: 'Tunnel Creation',
        description: 'Anatomic tunnels drilled in femur and tibia for graft placement.',
        duration: '20-30 minutes'
      },
      {
        step: 4,
        title: 'Graft Passage',
        description: 'Prepared graft passed through tunnels in anatomic ACL position.',
        duration: '10-15 minutes'
      },
      {
        step: 5,
        title: 'Graft Fixation',
        description: 'Graft secured with interference screws or suspensory fixation.',
        duration: '15-20 minutes'
      },
      {
        step: 6,
        title: 'Meniscus Treatment',
        description: 'Repair or trim meniscus tears if present.',
        duration: '15-30 minutes if needed'
      }
    ],

    benefits: [
      { title: 'Restored Stability', description: 'Eliminates knee giving way', icon: '✓' },
      { title: 'Return to Sports', description: '90%+ return to pre-injury level', icon: '✓' },
      { title: 'Prevent Arthritis', description: 'Protects meniscus and cartilage', icon: '✓' },
      { title: 'Minimally Invasive', description: 'Keyhole surgery, small scars', icon: '✓' },
      { title: 'Day Care Surgery', description: 'Go home same day', icon: '✓' },
      { title: 'Anatomic Technique', description: 'Restores natural ACL position', icon: '✓' }
    ],

    recoveryTimeline: [
      { phase: 'Week 0-2', milestone: 'Reduce swelling, regain motion', activities: 'Brace, crutches, ice, CPM' },
      { phase: 'Week 2-6', milestone: 'Full extension, 90° flexion', activities: 'Stationary bike, pool exercises' },
      { phase: 'Month 2-3', milestone: 'Walk without crutches', activities: 'Strength training begins' },
      { phase: 'Month 4-6', milestone: 'Jogging progression', activities: 'Running, agility drills' },
      { phase: 'Month 6-9', milestone: 'Sport-specific training', activities: 'Cutting, jumping, pivoting' },
      { phase: 'Month 9-12', milestone: 'Return to full sports', activities: 'Competitive play' }
    ],

    risks: [
      { risk: 'Graft failure/re-tear', percentage: '5-10%', prevention: 'Proper rehab, gradual return' },
      { risk: 'Stiffness', percentage: '5%', prevention: 'Early ROM exercises' },
      { risk: 'Anterior knee pain', percentage: '10-20%', prevention: 'Hamstring graft preferred' },
      { risk: 'Infection', percentage: '<1%', prevention: 'Sterile technique, antibiotics' },
      { risk: 'DVT', percentage: '<1%', prevention: 'Early mobilization' }
    ],

    preOpPreparation: [
      'Pre-hab exercises to strengthen quadriceps',
      'Reduce swelling before surgery',
      'MRI to assess meniscus and cartilage',
      'Stop NSAIDs 1 week before',
      'Arrange crutches and knee brace',
      'Plan for 2-4 weeks off work/school'
    ],

    postOpCare: [
      'Crutches for 2-4 weeks',
      'Knee brace locked in extension initially',
      'Ice and elevation to reduce swelling',
      'Start physiotherapy within 1 week',
      'Avoid twisting movements for 6 months',
      'Compliance with rehab protocol is crucial'
    ],

    faqs: [
      {
        question: 'Can ACL tears heal without surgery?',
        answer: 'The ACL has poor blood supply and rarely heals on its own. While some low-demand patients can manage without surgery using a brace and physiotherapy, active individuals and athletes typically need reconstruction to restore knee stability.'
      },
      {
        question: 'Which graft is better - hamstring or patellar tendon?',
        answer: 'Both grafts have excellent outcomes. Hamstring grafts cause less anterior knee pain and kneeling discomfort. Patellar tendon grafts may have slightly faster incorporation. Dr. Harsha recommends based on patient activity level and preference.'
      },
      {
        question: 'When can I play football/cricket after ACL surgery?',
        answer: 'Return to contact sports typically takes 9-12 months. This allows complete graft healing and neuromuscular retraining. Returning too early significantly increases re-tear risk.'
      },
      {
        question: 'What is the cost of ACL surgery in Hyderabad?',
        answer: 'ACL reconstruction costs ₹1.5-2.5 lakhs depending on the graft choice, implants used, and whether meniscus repair is needed. This includes surgery, hospital stay, and implants.'
      },
      {
        question: 'Can I do gym/weight training after ACL reconstruction?',
        answer: 'Yes! Strength training is crucial for recovery. You can start supervised gym work at 6-8 weeks, progressing gradually. Avoid deep squats and leg press with heavy weights for 6 months.'
      },
      {
        question: 'What happens if I dont get ACL surgery?',
        answer: 'Without ACL reconstruction, the knee remains unstable, especially during pivoting activities. This instability can lead to repeated giving-way episodes, meniscus tears, and accelerated arthritis over time.'
      }
    ],

    relatedConditions: ['acl-tear', 'meniscus-tear'],
    relatedTreatments: ['knee-arthroscopy'],

    seoTitle: 'ACL Reconstruction Surgery in Hyderabad | Sports Injury Treatment | Dr. Harsha',
    seoDescription: 'Expert ACL reconstruction surgery for athletes at Yashoda Hospital Hyderabad. Arthroscopic technique, hamstring/patellar graft. Return to sports. Book consultation.',
    seoKeywords: 'ACL reconstruction Hyderabad, ACL surgery cost, sports injury doctor, knee ligament surgery, ACL tear treatment, best sports surgeon Hyderabad'
  },

  {
    id: 'shoulder-arthroscopy',
    name: 'Shoulder Arthroscopy & Rotator Cuff Repair',
    slug: 'shoulder-arthroscopy',
    category: 'Sports Medicine',
    icon: '💪',
    imageUrl: 'https://images.pexels.com/photos/6076136/pexels-photo-6076136.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Minimally invasive keyhole surgery for rotator cuff tears and shoulder problems.',
    
    heroTitle: 'Shoulder Arthroscopy in Hyderabad',
    heroSubtitle: 'Advanced keyhole surgery for rotator cuff repair, impingement, and labral tears.',
    
    overview: `Shoulder arthroscopy is a minimally invasive surgical technique using a small camera and instruments through tiny incisions to treat various shoulder conditions. Dr. B Harsha Vardhana Reddy performs hundreds of shoulder arthroscopies annually, including rotator cuff repairs, labral repairs, and decompression procedures.

This keyhole approach offers significant advantages over open surgery: smaller incisions, less pain, faster recovery, and better visualization of the joint. Most patients go home the same day or the next morning.`,

    statistics: [
      { label: 'Success Rate', value: '85-95%', description: 'Depending on tear size' },
      { label: 'Incisions', value: '3-4', description: 'Each 5-8mm only' },
      { label: 'Hospital Stay', value: 'Day care', description: 'Or 1 night' },
      { label: 'Sling Duration', value: '4-6 weeks', description: 'For healing' }
    ],

    candidatesFor: [
      'Rotator cuff tears (partial or complete)',
      'Shoulder impingement syndrome',
      'Frozen shoulder (adhesive capsulitis)',
      'Labral tears (SLAP lesions)',
      'Recurrent shoulder dislocations',
      'Biceps tendon problems',
      'Shoulder arthritis (for debridement)'
    ],

    procedureSteps: [
      {
        step: 1,
        title: 'Patient Positioning',
        description: 'Beach chair or lateral decubitus position under general anesthesia.',
        duration: '15 minutes'
      },
      {
        step: 2,
        title: 'Portal Creation',
        description: '3-4 small incisions (5-8mm) for camera and instruments.',
        duration: '10 minutes'
      },
      {
        step: 3,
        title: 'Diagnostic Arthroscopy',
        description: 'Complete inspection of rotator cuff, labrum, biceps, and cartilage.',
        duration: '15 minutes'
      },
      {
        step: 4,
        title: 'Subacromial Decompression',
        description: 'Remove bone spur and inflamed bursa if impingement present.',
        duration: '15-20 minutes'
      },
      {
        step: 5,
        title: 'Rotator Cuff Repair',
        description: 'Reattach torn tendon to bone using suture anchors.',
        duration: '45-60 minutes'
      },
      {
        step: 6,
        title: 'Additional Procedures',
        description: 'Biceps tenodesis, labral repair, or capsular release as needed.',
        duration: 'Variable'
      }
    ],

    benefits: [
      { title: 'Minimal Scarring', description: 'Only 3-4 tiny incisions', icon: '✓' },
      { title: 'Less Pain', description: 'Compared to open surgery', icon: '✓' },
      { title: 'Better Visualization', description: 'Camera magnifies joint', icon: '✓' },
      { title: 'Same-Day Surgery', description: 'Go home same day', icon: '✓' },
      { title: 'Faster Recovery', description: 'Early return to activities', icon: '✓' },
      { title: 'High Success Rate', description: '85-95% for cuff repairs', icon: '✓' }
    ],

    recoveryTimeline: [
      { phase: 'Week 0-6', milestone: 'Sling immobilization', activities: 'Pendulum exercises, elbow/wrist motion' },
      { phase: 'Week 6-12', milestone: 'Active motion begins', activities: 'Remove sling, gentle stretching' },
      { phase: 'Month 3-4', milestone: 'Strengthening starts', activities: 'Resistance band exercises' },
      { phase: 'Month 4-6', milestone: 'Progressive loading', activities: 'Light weights, functional activities' },
      { phase: 'Month 6-9', milestone: 'Full recovery', activities: 'Return to sports/overhead work' }
    ],

    risks: [
      { risk: 'Re-tear', percentage: '10-20%', prevention: 'Proper rehab, avoid heavy lifting early' },
      { risk: 'Stiffness', percentage: '5-10%', prevention: 'Physiotherapy compliance' },
      { risk: 'Infection', percentage: '<1%', prevention: 'Sterile technique' },
      { risk: 'Nerve injury', percentage: '<0.5%', prevention: 'Experienced surgeon' },
      { risk: 'Anchor failure', percentage: '<2%', prevention: 'Quality implants' }
    ],

    preOpPreparation: [
      'MRI to assess tear size and quality',
      'Stop smoking for better healing',
      'Arrange help at home for 4-6 weeks',
      'Practice putting on clothes one-handed',
      'Set up sleeping area (reclined position)',
      'Organize loose-fitting, front-button shirts'
    ],

    postOpCare: [
      'Wear sling 24/7 for 4-6 weeks (except exercises)',
      'Ice shoulder 20 minutes, 4-5 times daily',
      'Sleep in reclined position or recliner',
      'Do prescribed pendulum exercises 3x daily',
      'Avoid lifting anything >1 kg for 6 weeks',
      'No driving for 6 weeks (need both hands)'
    ],

    faqs: [
      {
        question: 'How long does rotator cuff surgery take?',
        answer: 'Arthroscopic rotator cuff repair typically takes 1-2 hours depending on tear size. A simple debridement may take 30-45 minutes, while a large tear repair with biceps tenodesis may take up to 2.5 hours.'
      },
      {
        question: 'What is the success rate of rotator cuff repair?',
        answer: 'Small to medium tears have 85-95% healing rate. Large and massive tears have 60-80% healing rate. Even with incomplete healing, most patients experience significant pain relief and improved function.'
      },
      {
        question: 'Can rotator cuff tears heal without surgery?',
        answer: 'Small partial tears may improve with physiotherapy. However, complete tears typically dont heal on their own and may enlarge over time. Early repair generally has better outcomes than delayed surgery.'
      },
      {
        question: 'Why is recovery from shoulder surgery so long?',
        answer: 'Rotator cuff tendons have poor blood supply and heal slowly. The repair needs protection for 6 weeks to form initial attachment, then gradual loading over 3-4 months for strong healing. Rushing recovery risks re-tear.'
      },
      {
        question: 'Can I do push-ups after rotator cuff repair?',
        answer: 'Push-ups place significant stress on the rotator cuff. Wall push-ups may be started at 4-5 months. Floor push-ups are typically allowed at 6-9 months after confirming good healing.'
      },
      {
        question: 'What is the cost of shoulder arthroscopy in Hyderabad?',
        answer: 'Simple diagnostic arthroscopy costs ₹60,000-80,000. Rotator cuff repair costs ₹1.2-2 lakhs depending on tear size and number of anchors needed. Bankart repair for dislocation costs ₹1-1.5 lakhs.'
      }
    ],

    relatedConditions: ['rotator-cuff-tear', 'frozen-shoulder', 'shoulder-dislocation'],
    relatedTreatments: ['shoulder-replacement', 'bankart-repair'],

    seoTitle: 'Shoulder Arthroscopy & Rotator Cuff Repair Hyderabad | Dr. Harsha Reddy',
    seoDescription: 'Expert shoulder arthroscopy for rotator cuff tears, impingement, labral tears at Yashoda Hospital Hyderabad. Keyhole surgery, day care procedure. Book consultation.',
    seoKeywords: 'shoulder arthroscopy Hyderabad, rotator cuff repair cost, shoulder surgery, keyhole shoulder surgery, SLAP repair, shoulder impingement treatment'
  },

  {
    id: 'knee-arthroscopy',
    name: 'Knee Arthroscopy & Meniscus Surgery',
    slug: 'knee-arthroscopy',
    category: 'Sports Medicine',
    icon: '🦵',
    imageUrl: 'https://images.pexels.com/photos/30964506/pexels-photo-30964506.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Keyhole surgery for meniscus tears, cartilage damage, and loose bodies.',
    
    heroTitle: 'Knee Arthroscopy in Hyderabad',
    heroSubtitle: 'Minimally invasive surgery for meniscus tears with same-day discharge.',
    
    overview: `Knee arthroscopy is a minimally invasive surgical procedure using a tiny camera to diagnose and treat knee problems through small incisions. Dr. B Harsha Vardhana Reddy prioritizes meniscus preservation over removal whenever possible, as preserving meniscus tissue protects against future arthritis.

Common procedures include meniscus repair, partial meniscectomy, cartilage treatment, and removal of loose bodies. Most patients walk the same day and return to normal activities within 2-4 weeks.`,

    statistics: [
      { label: 'Procedure Time', value: '30-60 min', description: 'Quick surgery' },
      { label: 'Incisions', value: '2-3', description: '5mm each' },
      { label: 'Hospital Stay', value: 'Day care', description: 'Same-day discharge' },
      { label: 'Recovery', value: '2-6 weeks', description: 'Depending on procedure' }
    ],

    candidatesFor: [
      'Meniscus tears (traumatic or degenerative)',
      'Cartilage damage or defects',
      'Loose bodies in the knee',
      'Synovitis (joint lining inflammation)',
      'Diagnostic evaluation of knee pain',
      'Plica syndrome',
      'Early arthritis debridement'
    ],

    procedureSteps: [
      {
        step: 1,
        title: 'Anesthesia',
        description: 'Spinal or general anesthesia with tourniquet on thigh.',
        duration: '15 minutes'
      },
      {
        step: 2,
        title: 'Portal Creation',
        description: 'Two small incisions (5mm) on either side of patellar tendon.',
        duration: '5 minutes'
      },
      {
        step: 3,
        title: 'Joint Inspection',
        description: 'Camera inserted to examine meniscus, cartilage, ligaments.',
        duration: '10 minutes'
      },
      {
        step: 4,
        title: 'Meniscus Treatment',
        description: 'Repair with sutures or trim damaged portion (partial meniscectomy).',
        duration: '20-40 minutes'
      },
      {
        step: 5,
        title: 'Additional Procedures',
        description: 'Cartilage smoothening, loose body removal, or microfracture.',
        duration: 'Variable'
      },
      {
        step: 6,
        title: 'Closure',
        description: 'Stitch or tape small incisions. Compression bandage applied.',
        duration: '10 minutes'
      }
    ],

    benefits: [
      { title: 'Minimal Invasion', description: 'Only 2 tiny incisions', icon: '✓' },
      { title: 'Quick Recovery', description: 'Walk same day', icon: '✓' },
      { title: 'Day Care Surgery', description: 'No overnight stay', icon: '✓' },
      { title: 'Accurate Diagnosis', description: 'Direct visualization', icon: '✓' },
      { title: 'Meniscus Preservation', description: 'Repair preferred over removal', icon: '✓' },
      { title: 'Less Pain', description: 'Compared to open surgery', icon: '✓' }
    ],

    recoveryTimeline: [
      { phase: 'Day 0', milestone: 'Walk with support', activities: 'Crutches for comfort' },
      { phase: 'Week 1', milestone: 'Walk without crutches', activities: 'Gentle exercises' },
      { phase: 'Week 2-3', milestone: 'Return to desk work', activities: 'Driving possible' },
      { phase: 'Week 4-6', milestone: 'Full daily activities', activities: 'Light exercise' },
      { phase: 'Week 6-12', milestone: 'Return to sports', activities: 'If meniscus trimmed' },
      { phase: 'Month 4-6', milestone: 'Full sports', activities: 'If meniscus repaired' }
    ],

    risks: [
      { risk: 'Infection', percentage: '<0.5%', prevention: 'Sterile technique' },
      { risk: 'Stiffness', percentage: '1-2%', prevention: 'Early motion' },
      { risk: 'Re-tear (repair)', percentage: '10-20%', prevention: 'Proper rehabilitation' },
      { risk: 'Continued pain', percentage: '5-10%', prevention: 'Appropriate expectations' },
      { risk: 'Nerve injury', percentage: '<0.5%', prevention: 'Careful portal placement' }
    ],

    preOpPreparation: [
      'MRI to confirm diagnosis',
      'Stop blood thinners as advised',
      'Arrange ride home (no driving same day)',
      'Wear loose shorts or pants',
      'Plan 1-2 weeks off work for desk job',
      'Organize ice packs at home'
    ],

    postOpCare: [
      'Ice 20 minutes every 2-3 hours for 48 hours',
      'Keep leg elevated when sitting',
      'Simple exercises: quad sets, ankle pumps',
      'Wound care: keep dry for 5-7 days',
      'Crutches as needed for comfort',
      'Follow-up at 1 week for wound check'
    ],

    faqs: [
      {
        question: 'Is knee arthroscopy painful?',
        answer: 'The surgery is done under anesthesia, so you wont feel anything during the procedure. Afterwards, most patients describe mild to moderate discomfort for 2-3 days, well-controlled with oral painkillers.'
      },
      {
        question: 'Should meniscus be repaired or removed?',
        answer: 'Repair is always preferred when possible as it preserves the meniscus shock-absorbing function and protects against arthritis. However, repair is only possible for certain tear types and locations. Degenerative tears often require trimming.'
      },
      {
        question: 'How long is recovery from knee arthroscopy?',
        answer: 'For meniscus trimming: 2-4 weeks to normal activities, 6-8 weeks to sports. For meniscus repair: 6-8 weeks for daily activities, 4-6 months for sports. Repair takes longer because the meniscus needs time to heal.'
      },
      {
        question: 'What is the cost of knee arthroscopy in Hyderabad?',
        answer: 'Simple diagnostic arthroscopy costs ₹40,000-60,000. Meniscus trimming costs ₹60,000-80,000. Meniscus repair costs ₹80,000-1.2 lakhs depending on the number of sutures/anchors needed.'
      },
      {
        question: 'Can I walk immediately after knee arthroscopy?',
        answer: 'Yes, for meniscus trimming you can bear weight immediately with crutches for comfort. For meniscus repair, you may need to limit weight bearing for 4-6 weeks to allow healing.'
      },
      {
        question: 'Will I develop arthritis after meniscus removal?',
        answer: 'Removing meniscus tissue increases long-term arthritis risk, which is why preservation is preferred. However, a partial meniscectomy removing only damaged tissue has lower risk than total removal. Maintaining healthy weight and muscle strength helps protect the knee.'
      }
    ],

    relatedConditions: ['meniscus-tear', 'knee-arthritis'],
    relatedTreatments: ['acl-reconstruction', 'total-knee-replacement'],

    seoTitle: 'Knee Arthroscopy & Meniscus Surgery Hyderabad | Dr. Harsha Reddy',
    seoDescription: 'Expert knee arthroscopy for meniscus tears at Yashoda Hospital Hyderabad. Day care surgery, same-day discharge. Meniscus repair preferred. Book consultation.',
    seoKeywords: 'knee arthroscopy Hyderabad, meniscus surgery cost, cartilage repair, knee keyhole surgery, meniscus tear treatment, sports injury Hyderabad'
  },

  {
    id: 'fracture-fixation',
    name: 'Fracture Fixation Surgery (ORIF)',
    slug: 'fracture-fixation',
    category: 'Trauma Surgery',
    icon: '🩹',
    imageUrl: 'https://images.pexels.com/photos/30798553/pexels-photo-30798553.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Surgical treatment of complex fractures using plates, screws, and nails.',
    
    heroTitle: 'Fracture Surgery in Hyderabad',
    heroSubtitle: 'Expert fracture fixation for faster healing and better outcomes.',
    
    overview: `Fracture fixation surgery, also known as Open Reduction and Internal Fixation (ORIF), involves surgically aligning broken bone fragments and securing them with metal implants. Dr. B Harsha Vardhana Reddy has extensive experience in treating all types of fractures, from simple breaks to complex multi-fragmentary injuries.

Modern fracture surgery emphasizes minimally invasive techniques, anatomic reduction, and stable fixation to allow early mobilization. This approach leads to faster healing, less stiffness, and better functional outcomes.`,

    statistics: [
      { label: 'Success Rate', value: '95%+', description: 'Bone union rate' },
      { label: 'Techniques', value: 'Multiple', description: 'Plates, nails, screws' },
      { label: 'Hospital Stay', value: '2-5 days', description: 'Depends on injury' },
      { label: 'Healing Time', value: '6-12 weeks', description: 'Varies by bone' }
    ],

    candidatesFor: [
      'Displaced fractures requiring alignment',
      'Joint fractures (intra-articular)',
      'Open (compound) fractures',
      'Fractures not healing in cast',
      'Multiple fractures (polytrauma)',
      'Fractures in elderly with osteoporosis'
    ],

    procedureSteps: [
      {
        step: 1,
        title: 'Imaging & Planning',
        description: 'X-rays and CT scans to understand fracture pattern and plan surgery.',
        duration: 'Pre-operative'
      },
      {
        step: 2,
        title: 'Anesthesia',
        description: 'General or regional anesthesia based on fracture location.',
        duration: '20-30 minutes'
      },
      {
        step: 3,
        title: 'Open Reduction',
        description: 'Incision to expose fracture site and realign bone fragments.',
        duration: '30-60 minutes'
      },
      {
        step: 4,
        title: 'Internal Fixation',
        description: 'Apply plates, screws, or intramedullary nail to hold bone.',
        duration: '30-90 minutes'
      },
      {
        step: 5,
        title: 'Fluoroscopy Check',
        description: 'X-ray to confirm proper alignment and implant position.',
        duration: '10 minutes'
      },
      {
        step: 6,
        title: 'Wound Closure',
        description: 'Layered closure with drain if needed. Splint or cast applied.',
        duration: '20-30 minutes'
      }
    ],

    benefits: [
      { title: 'Anatomic Alignment', description: 'Restores bone shape precisely', icon: '✓' },
      { title: 'Stable Fixation', description: 'Allows early movement', icon: '✓' },
      { title: 'Faster Healing', description: 'Better blood supply to fracture', icon: '✓' },
      { title: 'Early Mobilization', description: 'Prevents stiffness', icon: '✓' },
      { title: 'Better Outcomes', description: 'Especially for joint fractures', icon: '✓' },
      { title: 'Minimally Invasive', description: 'When possible, smaller incisions', icon: '✓' }
    ],

    recoveryTimeline: [
      { phase: 'Day 1-3', milestone: 'Pain control, wound care', activities: 'Hospital stay' },
      { phase: 'Week 1-2', milestone: 'Swelling reduces', activities: 'Gentle ROM exercises' },
      { phase: 'Week 4-6', milestone: 'Partial weight bearing', activities: 'Physiotherapy begins' },
      { phase: 'Week 8-12', milestone: 'Full weight bearing', activities: 'Bone healing on X-ray' },
      { phase: 'Month 3-6', milestone: 'Return to activities', activities: 'Strength recovery' },
      { phase: 'Month 12-18', milestone: 'Optional implant removal', activities: 'If causing symptoms' }
    ],

    risks: [
      { risk: 'Infection', percentage: '1-5%', prevention: 'Antibiotics, sterile technique' },
      { risk: 'Non-union', percentage: '2-5%', prevention: 'Proper fixation, bone grafting' },
      { risk: 'Malunion', percentage: '2-3%', prevention: 'Anatomic reduction' },
      { risk: 'Implant failure', percentage: '1-2%', prevention: 'Quality implants' },
      { risk: 'Stiffness', percentage: '5-10%', prevention: 'Early physiotherapy' }
    ],

    preOpPreparation: [
      'Blood tests and pre-anesthetic check',
      'Control diabetes and blood pressure',
      'Temporary splint or traction for alignment',
      'Tetanus prophylaxis if open fracture',
      'Keep wound clean if open injury',
      'NPO (fasting) before surgery'
    ],

    postOpCare: [
      'Wound care and dressing changes',
      'Antibiotics for 3-5 days',
      'Limb elevation to reduce swelling',
      'Weight bearing as advised by surgeon',
      'Physiotherapy for ROM and strength',
      'Regular follow-up X-rays'
    ],

    faqs: [
      {
        question: 'Do fracture plates need to be removed?',
        answer: 'Not always. Implants can stay permanently if not causing symptoms. Removal may be considered if the implant is prominent, causing pain, or in young patients. Removal is typically done 12-18 months after surgery when bone is fully healed.'
      },
      {
        question: 'How long does it take for a fracture to heal after surgery?',
        answer: 'Most fractures show healing at 6-8 weeks on X-ray. Complete bone remodeling takes 3-6 months. Factors affecting healing include age, nutrition, smoking, diabetes, and fracture severity.'
      },
      {
        question: 'Can I walk after fracture surgery?',
        answer: 'Depends on the fracture location and fixation strength. Upper limb fractures allow walking immediately. Lower limb fractures may require crutches with limited weight bearing for 4-8 weeks.'
      },
      {
        question: 'What is the cost of fracture surgery in Hyderabad?',
        answer: 'Simple fracture fixation costs ₹50,000-1 lakh. Complex fractures with multiple implants cost ₹1-2 lakhs. Joint fractures requiring special plates may cost ₹1.5-3 lakhs.'
      },
      {
        question: 'Will I set off metal detectors with plates in my body?',
        answer: 'Modern titanium implants are non-magnetic and usually dont trigger metal detectors. Stainless steel implants may occasionally trigger sensitive detectors. Carry hospital documentation when traveling.'
      },
      {
        question: 'What is the difference between plate and nail fixation?',
        answer: 'Plates are applied on the bone surface, good for joint fractures and short bones. Intramedullary nails go inside the bone canal, ideal for long bone shaft fractures (femur, tibia). The surgeon chooses based on fracture pattern.'
      }
    ],

    relatedConditions: ['complex-fractures'],
    relatedTreatments: [],

    seoTitle: 'Fracture Surgery in Hyderabad | ORIF | Trauma Specialist | Dr. Harsha',
    seoDescription: 'Expert fracture fixation surgery at Yashoda Hospital Hyderabad. Plates, screws, nails for all fractures. 24/7 trauma care. Minimally invasive techniques.',
    seoKeywords: 'fracture surgery Hyderabad, ORIF surgery, trauma surgeon, broken bone treatment, fracture specialist, orthopedic trauma'
  }
];

// Shorter entries for remaining treatments (will be expanded)
export const treatmentsShort = [
  {
    id: 'hip-arthroscopy',
    name: 'Hip Arthroscopy',
    slug: 'hip-arthroscopy',
    category: 'Sports Medicine',
    icon: '🦴',
    imageUrl: 'https://images.pexels.com/photos/5793694/pexels-photo-5793694.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Minimally invasive hip surgery for labral tears and FAI.',
    hasDetailedContent: false
  },
  {
    id: 'shoulder-replacement',
    name: 'Shoulder Replacement Surgery',
    slug: 'shoulder-replacement',
    category: 'Joint Replacement',
    icon: '💪',
    imageUrl: 'https://images.pexels.com/photos/263337/pexels-photo-263337.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Total or reverse shoulder replacement for severe arthritis.',
    hasDetailedContent: false
  },
  {
    id: 'ankle-ligament-reconstruction',
    name: 'Ankle Ligament Reconstruction',
    slug: 'ankle-ligament-reconstruction',
    category: 'Sports Medicine',
    icon: '👣',
    imageUrl: 'https://images.pexels.com/photos/4506160/pexels-photo-4506160.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Surgical repair for chronic ankle instability.',
    hasDetailedContent: false
  },
  {
    id: 'carpal-tunnel-release',
    name: 'Carpal Tunnel Release Surgery',
    slug: 'carpal-tunnel-release',
    category: 'Hand & Wrist',
    icon: '✋',
    imageUrl: 'https://images.pexels.com/photos/6153067/pexels-photo-6153067.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Surgical decompression for carpal tunnel syndrome.',
    hasDetailedContent: false
  },
  {
    id: 'bankart-repair',
    name: 'Arthroscopic Bankart Repair',
    slug: 'bankart-repair',
    category: 'Sports Medicine',
    icon: '🤕',
    imageUrl: 'https://images.pexels.com/photos/6076136/pexels-photo-6076136.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Keyhole surgery for recurrent shoulder dislocation.',
    hasDetailedContent: false
  },
  {
    id: 'spinal-decompression',
    name: 'Spinal Decompression Surgery',
    slug: 'spinal-decompression',
    category: 'Spine Surgery',
    icon: '🏥',
    imageUrl: 'https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Surgical treatment for spinal stenosis and nerve compression.',
    hasDetailedContent: false
  }
];

// Helper to get all treatments (detailed + short)
export const getAllTreatments = () => {
  return [...treatmentsDetailed, ...treatmentsShort];
};

// Helper to get treatment by ID
export const getTreatmentById = (id) => {
  return treatmentsDetailed.find(t => t.id === id) || treatmentsShort.find(t => t.id === id);
};
