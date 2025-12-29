// Comprehensive orthopedic conditions with detailed scientific treatment protocols
// SEO-optimized for Google ranking with internal linking structure

// Condition images - high quality medical stock photos
const conditionImages = {
  'knee-arthritis': 'https://images.pexels.com/photos/8436924/pexels-photo-8436924.jpeg?auto=compress&cs=tinysrgb&w=800',
  'rotator-cuff': 'https://images.pexels.com/photos/8093240/pexels-photo-8093240.jpeg?auto=compress&cs=tinysrgb&w=800',
  'acl-tear': 'https://images.pexels.com/photos/9623436/pexels-photo-9623436.jpeg?auto=compress&cs=tinysrgb&w=800',
  'hip-arthritis': 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800',
  'frozen-shoulder': 'https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=800',
  'meniscus-tear': 'https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg?auto=compress&cs=tinysrgb&w=800',
  'tennis-elbow': 'https://images.pexels.com/photos/5473215/pexels-photo-5473215.jpeg?auto=compress&cs=tinysrgb&w=800',
  'shoulder-dislocation': 'https://images.pexels.com/photos/7298902/pexels-photo-7298902.jpeg?auto=compress&cs=tinysrgb&w=800',
  'carpal-tunnel': 'https://images.pexels.com/photos/5723885/pexels-photo-5723885.jpeg?auto=compress&cs=tinysrgb&w=800',
  'ankle-sprain': 'https://images.pexels.com/photos/7298878/pexels-photo-7298878.jpeg?auto=compress&cs=tinysrgb&w=800',
  'plantar-fasciitis': 'https://images.pexels.com/photos/5473177/pexels-photo-5473177.jpeg?auto=compress&cs=tinysrgb&w=800',
  'spinal-fracture': 'https://images.pexels.com/photos/2678059/pexels-photo-2678059.jpeg?auto=compress&cs=tinysrgb&w=800',
  'pcl-injury': 'https://images.pexels.com/photos/6111609/pexels-photo-6111609.jpeg?auto=compress&cs=tinysrgb&w=800',
  'fracture-trauma': 'https://images.pexels.com/photos/207496/pexels-photo-207496.jpeg?auto=compress&cs=tinysrgb&w=800',
  'bursitis': 'https://images.pexels.com/photos/5473186/pexels-photo-5473186.jpeg?auto=compress&cs=tinysrgb&w=800',
  'patella-dislocation': 'https://images.pexels.com/photos/6111616/pexels-photo-6111616.jpeg?auto=compress&cs=tinysrgb&w=800'
};

export const conditionsDetailed = [
  {
    id: 'knee-arthritis',
    name: 'Knee Arthritis & Osteoarthritis',
    slug: 'knee-arthritis',
    category: 'Knee',
    icon: '🦵',
    imageUrl: conditionImages['knee-arthritis'],
    shortDescription: 'Degenerative joint disease causing pain, stiffness, and reduced mobility in the knee.',
    
    // Detailed content for individual page
    overview: `Knee osteoarthritis (OA) is the most common form of arthritis affecting millions worldwide. It occurs when the protective cartilage cushioning the knee joint gradually wears down, leading to bone-on-bone contact, inflammation, and pain. Dr. B Harsha Vardhana Reddy specializes in comprehensive knee arthritis management at Yashoda Hospital, Hyderabad.`,
    
    causes: [
      'Age-related wear and tear (most common in adults over 50)',
      'Previous knee injuries (ACL tears, meniscus injuries, fractures)',
      'Obesity and excess body weight',
      'Genetic predisposition',
      'Repetitive stress from occupational activities',
      'Malalignment (bow legs or knock knees)',
      'Inflammatory conditions like rheumatoid arthritis'
    ],
    
    symptoms: [
      { name: 'Knee pain and stiffness', description: 'Especially after prolonged sitting or in the morning' },
      { name: 'Swelling and inflammation', description: 'Joint appears puffy, warm to touch' },
      { name: 'Difficulty walking or climbing stairs', description: 'Pain worsens with activity' },
      { name: 'Grinding sensation (crepitus)', description: 'Feeling or hearing crackling during movement' },
      { name: 'Reduced range of motion', description: 'Difficulty fully bending or straightening the knee' },
      { name: 'Joint instability', description: 'Feeling of knee giving way' }
    ],
    
    diagnosis: [
      { name: 'Physical Examination', description: 'Assessment of range of motion, swelling, tenderness, and alignment' },
      { name: 'X-rays', description: 'Standing weight-bearing views to assess joint space narrowing' },
      { name: 'MRI Scan', description: 'Detailed imaging of cartilage, meniscus, and soft tissues' },
      { name: 'Blood Tests', description: 'To rule out inflammatory arthritis conditions' }
    ],
    
    // Treatment sections with detailed protocols
    nonSurgicalTreatments: [
      {
        name: 'Physical Therapy Protocol',
        link: '/treatments/physical-therapy',
        description: 'Structured exercise program to strengthen muscles and improve joint function',
        details: [
          'Quadriceps strengthening: Straight leg raises (3 sets x 15 reps, daily)',
          'Hamstring curls: Seated or standing (3 sets x 12 reps)',
          'Range of motion exercises: Heel slides, knee bends',
          'Low-impact aerobics: Swimming, cycling (30 min, 3-5 times/week)',
          'Balance training: Single leg stands, wobble board exercises',
          'Stretching: IT band, calf, quadriceps stretches'
        ],
        duration: '6-12 weeks initial program, ongoing maintenance',
        evidenceLevel: 'Strong evidence (Level A) - Cochrane Review 2022'
      },
      {
        name: 'Weight Management',
        description: 'Every 1 kg of weight loss reduces knee joint load by 4 kg',
        details: [
          'Target: BMI < 25 for optimal joint health',
          'Caloric deficit of 500-750 calories/day for gradual weight loss',
          'Anti-inflammatory diet: Mediterranean diet recommended',
          'Avoid processed foods, excess sugar, and red meat'
        ],
        evidenceLevel: 'Strong evidence (Level A)'
      },
      {
        name: 'Medications',
        description: 'Pain relief and inflammation control',
        details: [
          'Paracetamol (Acetaminophen): First-line, up to 3g/day',
          'NSAIDs (Ibuprofen, Diclofenac): Short-term use for flare-ups',
          'Topical NSAIDs: Diclofenac gel applied 3-4 times daily',
          'Glucosamine & Chondroitin: 1500mg/1200mg daily (moderate evidence)',
          'Duloxetine: For chronic pain with central sensitization'
        ],
        evidenceLevel: 'Moderate evidence (Level B)'
      },
      {
        name: 'Intra-articular Injections',
        link: '/treatments/prp-injections',
        description: 'Direct injection into the knee joint',
        details: [
          'Corticosteroid injections: Quick relief, lasts 4-12 weeks (max 3-4/year)',
          'Hyaluronic acid (Viscosupplementation): Lubricates joint, may last 6 months',
          'PRP (Platelet-Rich Plasma): Uses body\'s healing factors',
          'Stem cell therapy: Emerging treatment for cartilage regeneration'
        ],
        evidenceLevel: 'Moderate evidence for steroids/HA, emerging for PRP'
      }
    ],
    
    surgicalTreatments: [
      {
        name: 'Arthroscopic Debridement',
        link: '/treatments/knee-arthroscopy',
        description: 'Keyhole surgery to clean up the joint',
        indications: 'Mechanical symptoms (catching, locking) with loose bodies',
        procedure: 'Removal of loose cartilage fragments, smoothening of rough surfaces',
        recovery: '2-4 weeks',
        successRate: 'Limited for pure OA, better for mechanical symptoms'
      },
      {
        name: 'High Tibial Osteotomy (HTO)',
        link: '/treatments/osteotomy',
        description: 'Bone realignment surgery for younger patients',
        indications: 'Unicompartmental OA with malalignment, age < 60',
        procedure: 'Cutting and realigning the tibia to shift weight to healthy cartilage',
        recovery: '3-6 months',
        successRate: '80-90% good results at 10 years'
      },
      {
        name: 'Partial Knee Replacement (UKR)',
        link: '/treatments/partial-knee-replacement',
        description: 'Replacing only the damaged compartment',
        indications: 'Single compartment OA with intact ligaments',
        procedure: 'Resurfacing of medial or lateral compartment only',
        recovery: '4-6 weeks',
        successRate: '90% survival at 15 years'
      },
      {
        name: 'Total Knee Replacement (TKR)',
        link: '/treatments/total-knee-replacement',
        description: 'Gold standard for end-stage knee arthritis',
        indications: 'Severe OA affecting multiple compartments, failed conservative treatment',
        procedure: 'Replacing all three compartments with metal and plastic implants',
        recovery: '6-12 weeks for walking independence, 3-6 months full recovery',
        successRate: '95% survival at 15-20 years'
      }
    ],
    
    recoveryTimeline: [
      { phase: 'Week 1-2', milestone: 'Pain management, gentle range of motion exercises' },
      { phase: 'Week 3-6', milestone: 'Progressive strengthening, walking with assistance' },
      { phase: 'Week 7-12', milestone: 'Independent walking, stair climbing' },
      { phase: 'Month 3-6', milestone: 'Return to normal daily activities' },
      { phase: 'Month 6-12', milestone: 'Full recovery, return to recreational activities' }
    ],
    
    faqs: [
      {
        question: 'Can knee arthritis be cured without surgery?',
        answer: 'While knee arthritis cannot be completely reversed, many patients achieve significant pain relief and improved function through non-surgical treatments including physical therapy, weight loss, medications, and injections. Surgery is only considered when conservative treatments fail.'
      },
      {
        question: 'How long does a knee replacement last?',
        answer: 'Modern knee replacements have excellent durability with 95% of implants lasting 15-20 years. With proper care and activity modification, many patients enjoy pain-free function for their lifetime.'
      },
      {
        question: 'What is the best exercise for knee arthritis?',
        answer: 'Low-impact exercises are best: swimming, cycling, walking on flat surfaces, and specific strengthening exercises for quadriceps and hamstrings. High-impact activities like running and jumping should be avoided.'
      },
      {
        question: 'When should I consider knee replacement surgery?',
        answer: 'Consider surgery when pain significantly affects your quality of life, sleep, and daily activities despite trying conservative treatments for 3-6 months. X-rays showing severe joint damage and failure of medications/injections are additional indicators.'
      }
    ],
    
    relatedConditions: ['meniscus-tear', 'acl-tear', 'patella-dislocation'],
    relatedTreatments: ['total-knee-replacement', 'knee-arthroscopy', 'prp-injections'],
    
    seoKeywords: 'knee arthritis treatment Hyderabad, osteoarthritis specialist, knee pain doctor, best knee surgeon Hyderabad, knee replacement surgeon',
    metaDescription: 'Expert knee arthritis treatment in Hyderabad by Dr. B Harsha Vardhana Reddy. Comprehensive care from physical therapy to total knee replacement. Book appointment at Yashoda Hospital.'
  },
  
  {
    id: 'rotator-cuff',
    name: 'Rotator Cuff Tear',
    slug: 'rotator-cuff-tear',
    category: 'Shoulder',
    icon: '💪',
    shortDescription: 'Tear in shoulder tendons causing pain and weakness. Can occur from injury or age-related degeneration.',
    
    overview: `A rotator cuff tear is a common cause of shoulder pain and disability. The rotator cuff consists of four muscles (supraspinatus, infraspinatus, teres minor, subscapularis) that stabilize and move the shoulder. Tears can be partial or full-thickness, and may result from acute injury or chronic degeneration. Dr. B Harsha Vardhana Reddy provides advanced arthroscopic rotator cuff repair at Yashoda Hospital, Hyderabad.`,
    
    causes: [
      'Acute injury: Fall on outstretched arm, lifting heavy objects',
      'Age-related degeneration: Most common in adults over 40',
      'Repetitive overhead activities: Swimming, tennis, painting',
      'Poor blood supply to tendons with aging',
      'Bone spurs (acromial spurs) causing impingement',
      'Genetics: Family history of rotator cuff problems'
    ],
    
    symptoms: [
      { name: 'Shoulder pain at night', description: 'Difficulty sleeping on affected side' },
      { name: 'Weakness lifting arm', description: 'Especially with overhead activities' },
      { name: 'Crackling sensation', description: 'Crepitus during shoulder movement' },
      { name: 'Limited range of motion', description: 'Difficulty reaching overhead or behind back' },
      { name: 'Pain with specific movements', description: 'Reaching, lifting, or rotating arm' },
      { name: 'Muscle atrophy', description: 'Visible wasting of shoulder muscles in chronic tears' }
    ],
    
    diagnosis: [
      { name: 'Physical Examination', description: 'Specific tests: Empty can test, external rotation lag sign, belly press test' },
      { name: 'X-rays', description: 'To assess bone spurs and joint arthritis' },
      { name: 'Ultrasound', description: 'Dynamic imaging to visualize tendon tears' },
      { name: 'MRI Scan', description: 'Gold standard for assessing tear size, retraction, and muscle quality' }
    ],
    
    nonSurgicalTreatments: [
      {
        name: 'Physical Therapy Protocol',
        link: '/treatments/physical-therapy',
        description: 'Structured rehabilitation program',
        details: [
          'Phase 1 (Weeks 1-4): Pain control, gentle ROM exercises',
          '- Pendulum exercises: 2-3 minutes, 3 times daily',
          '- Passive ROM: External rotation with stick, flexion in supine',
          '- Scapular squeezes and retractions',
          'Phase 2 (Weeks 4-8): Active assisted range of motion',
          '- Wall walks, pulley exercises',
          '- Isometric strengthening (no movement)',
          'Phase 3 (Weeks 8-12): Progressive strengthening',
          '- Resistance band exercises: External/internal rotation',
          '- Prone rows, prone horizontal abduction',
          '- Scapular stabilization exercises'
        ],
        duration: '3-6 months',
        evidenceLevel: 'Strong evidence for partial tears and post-surgical rehabilitation'
      },
      {
        name: 'Corticosteroid Injections',
        description: 'Subacromial injection for pain relief',
        details: [
          'Provides temporary pain relief (4-12 weeks)',
          'Useful for diagnostic purposes and physical therapy window',
          'Maximum 3 injections per year recommended',
          'May weaken tendon tissue with repeated use'
        ],
        evidenceLevel: 'Moderate short-term evidence'
      },
      {
        name: 'PRP Injections',
        link: '/treatments/prp-injections',
        description: 'Platelet-rich plasma to promote healing',
        details: [
          'Concentrated growth factors from patient\'s own blood',
          'May help partial tears heal',
          'Typically 1-3 injections, 2-4 weeks apart',
          'Best for partial tears in younger patients'
        ],
        evidenceLevel: 'Emerging evidence, promising results'
      }
    ],
    
    surgicalTreatments: [
      {
        name: 'Arthroscopic Rotator Cuff Repair',
        link: '/treatments/shoulder-arthroscopy',
        description: 'Keyhole surgery to reattach torn tendon',
        indications: 'Full-thickness tears, failed conservative treatment, acute traumatic tears',
        procedure: [
          '3-4 small incisions (portals) around shoulder',
          'Visualization of tear with camera',
          'Bone surface preparation for healing',
          'Suture anchor placement into bone',
          'Tendon repair with strong sutures',
          'Biceps tenodesis if needed'
        ],
        recovery: '6 weeks sling, 3-4 months daily activities, 6-9 months return to sports',
        successRate: '85-95% good to excellent results'
      },
      {
        name: 'Mini-Open Rotator Cuff Repair',
        description: 'Small incision repair for larger tears',
        indications: 'Large tears, revision surgery',
        procedure: 'Combination of arthroscopy and small open incision',
        recovery: 'Similar to arthroscopic repair',
        successRate: '80-90% good results'
      },
      {
        name: 'Superior Capsular Reconstruction (SCR)',
        description: 'For irreparable massive tears',
        indications: 'Massive tears with poor tissue quality, not suitable for direct repair',
        procedure: 'Using dermal allograft to recreate superior capsule',
        recovery: '3-6 months',
        successRate: '70-80% improvement in function'
      },
      {
        name: 'Reverse Shoulder Replacement',
        link: '/treatments/shoulder-replacement',
        description: 'Joint replacement for massive irreparable tears with arthritis',
        indications: 'Rotator cuff arthropathy, massive tears in elderly',
        procedure: 'Reverses ball-and-socket configuration',
        recovery: '3-6 months',
        successRate: '90%+ pain relief'
      }
    ],
    
    postSurgicalRehabilitation: [
      { phase: 'Week 0-6', milestone: 'Sling immobilization, passive ROM only, pendulum exercises' },
      { phase: 'Week 6-12', milestone: 'Active assisted ROM, progress to active ROM' },
      { phase: 'Week 12-16', milestone: 'Begin strengthening with resistance bands' },
      { phase: 'Month 4-6', milestone: 'Progressive strengthening, return to daily activities' },
      { phase: 'Month 6-9', milestone: 'Sport-specific training, return to overhead sports' }
    ],
    
    faqs: [
      {
        question: 'Can a rotator cuff tear heal on its own?',
        answer: 'Partial tears may heal with rest and physical therapy, but full-thickness tears typically do not heal spontaneously. However, many people with full-thickness tears can function well without surgery through physical therapy and activity modification.'
      },
      {
        question: 'How do I know if I need surgery for my rotator cuff tear?',
        answer: 'Surgery is typically recommended for: acute traumatic tears in active patients, full-thickness tears causing significant weakness, failure to improve after 3-6 months of physical therapy, or tears larger than 3cm that may retract further.'
      },
      {
        question: 'What happens if I don\'t repair a rotator cuff tear?',
        answer: 'Untreated tears may enlarge over time, the muscle may develop fatty infiltration (irreversible), and shoulder arthritis may develop (cuff tear arthropathy). Early treatment generally has better outcomes.'
      },
      {
        question: 'Can I lift weights after rotator cuff surgery?',
        answer: 'Yes, but typically not until 4-6 months after surgery. Start with light weights and gradually progress. Avoid heavy overhead lifting and certain exercises (upright rows, behind-neck press) permanently.'
      }
    ],
    
    relatedConditions: ['frozen-shoulder', 'shoulder-dislocation', 'bursitis'],
    relatedTreatments: ['shoulder-arthroscopy', 'shoulder-replacement', 'prp-injections'],
    
    seoKeywords: 'rotator cuff tear treatment Hyderabad, shoulder arthroscopy, rotator cuff surgery, shoulder pain specialist, best shoulder surgeon Hyderabad',
    metaDescription: 'Expert rotator cuff tear treatment in Hyderabad. Dr. B Harsha Vardhana Reddy offers advanced arthroscopic repair. Complete guide to symptoms, diagnosis, and recovery.'
  },
  
  {
    id: 'acl-tear',
    name: 'ACL Tear & Knee Ligament Injuries',
    slug: 'acl-tear',
    category: 'Sports Injury',
    icon: '⚽',
    shortDescription: 'Anterior cruciate ligament tear causing knee instability. Common in athletes and active individuals.',
    
    overview: `The anterior cruciate ligament (ACL) is one of four major ligaments that stabilize the knee joint. ACL tears are common sports injuries, particularly in activities involving pivoting, cutting, and sudden direction changes. Dr. B Harsha Vardhana Reddy specializes in anatomic ACL reconstruction to restore knee stability and return athletes to their sport.`,
    
    causes: [
      'Non-contact pivoting or cutting movements',
      'Landing awkwardly from a jump',
      'Sudden deceleration or stopping',
      'Direct blow to the knee',
      'Hyperextension of the knee',
      'Sports: Football, basketball, soccer, skiing'
    ],
    
    symptoms: [
      { name: 'Sudden knee pain', description: 'Often with audible "pop" sound' },
      { name: 'Rapid swelling', description: 'Within 2-6 hours of injury' },
      { name: 'Knee instability', description: 'Feeling of knee "giving way"' },
      { name: 'Loss of range of motion', description: 'Unable to fully straighten knee' },
      { name: 'Difficulty weight bearing', description: 'Pain when walking' }
    ],
    
    diagnosis: [
      { name: 'Physical Examination', description: 'Lachman test, Anterior drawer test, Pivot shift test' },
      { name: 'MRI Scan', description: 'Confirms ACL tear, shows associated injuries (meniscus, cartilage)' },
      { name: 'X-rays', description: 'To rule out fractures, assess bone bruising patterns' }
    ],
    
    nonSurgicalTreatments: [
      {
        name: 'ACL Rehabilitation Protocol (Non-operative)',
        description: 'For partial tears or low-demand patients',
        details: [
          'Phase 1 (Weeks 0-2): RICE, crutches, ROM exercises',
          'Phase 2 (Weeks 2-6): Full ROM, quadriceps strengthening',
          'Phase 3 (Weeks 6-12): Progressive strengthening, balance training',
          'Phase 4 (Months 3-6): Sport-specific training, bracing for activity',
          'Functional bracing for return to activities'
        ],
        indications: 'Partial tears, elderly/sedentary patients, low-demand lifestyle',
        evidenceLevel: 'Moderate evidence for selected patients'
      }
    ],
    
    surgicalTreatments: [
      {
        name: 'ACL Reconstruction Surgery',
        link: '/treatments/acl-reconstruction',
        description: 'Arthroscopic surgery to reconstruct the torn ligament',
        indications: 'Active individuals, athletes, knee instability affecting daily life',
        graftOptions: [
          'Hamstring tendon autograft: Most common, less anterior knee pain',
          'Patellar tendon autograft: Strong fixation, gold standard for athletes',
          'Quadriceps tendon autograft: Emerging option, good strength',
          'Allograft (donor tendon): Faster recovery, slightly higher failure rate'
        ],
        procedure: [
          'Arthroscopic inspection and treatment of associated injuries',
          'Graft harvest (if autograft)',
          'Creation of femoral and tibial tunnels',
          'Graft passage through tunnels',
          'Fixation with interference screws or cortical buttons',
          'Assessment of graft tension and knee stability'
        ],
        recovery: '9-12 months return to sport',
        successRate: '90-95% return to sport, 85-90% at same level'
      },
      {
        name: 'ACL Repair with Internal Bracing',
        description: 'Newer technique for proximal avulsion tears',
        indications: 'Acute proximal tears (< 3 weeks), good tissue quality',
        procedure: 'Primary repair of ligament with suture tape augmentation',
        recovery: '6-9 months',
        successRate: 'Emerging data, 85-90% in selected patients'
      }
    ],
    
    rehabilitationProtocol: [
      { phase: 'Week 0-2', milestone: 'Pain/swelling control, ROM 0-90°, quad activation' },
      { phase: 'Week 2-6', milestone: 'Full ROM, progress to full weight bearing, stationary bike' },
      { phase: 'Week 6-12', milestone: 'Strengthening, proprioception, pool jogging' },
      { phase: 'Month 3-6', milestone: 'Running progression, agility drills begin at 4-5 months' },
      { phase: 'Month 6-9', milestone: 'Sport-specific training, cutting, pivoting' },
      { phase: 'Month 9-12', milestone: 'Return to sport testing, gradual return to competition' }
    ],
    
    faqs: [
      {
        question: 'Can I play sports without ACL surgery?',
        answer: 'Some people with ACL tears can return to straight-line activities (running, cycling) without surgery. However, pivoting sports (football, basketball, soccer) usually require ACL reconstruction to prevent recurrent instability and further knee damage.'
      },
      {
        question: 'How long until I can return to sports after ACL surgery?',
        answer: 'Most athletes return to sport between 9-12 months after surgery. Return is based on meeting specific strength, stability, and functional criteria rather than time alone.'
      },
      {
        question: 'Which graft is best for ACL reconstruction?',
        answer: 'There is no single "best" graft. Patellar tendon is often preferred for high-level athletes due to bone-to-bone healing. Hamstring grafts are popular due to less anterior knee pain. The choice depends on your activity level, sport, and surgeon preference.'
      },
      {
        question: 'What is the re-tear rate after ACL surgery?',
        answer: 'Re-tear rate is approximately 5-10% overall. Younger athletes (< 20 years) have higher re-tear rates (15-20%). Proper rehabilitation and meeting return-to-sport criteria reduce re-tear risk.'
      }
    ],
    
    relatedConditions: ['meniscus-tear', 'pcl-injury', 'knee-arthritis'],
    relatedTreatments: ['acl-reconstruction', 'knee-arthroscopy', 'physical-therapy'],
    
    seoKeywords: 'ACL tear treatment Hyderabad, ACL reconstruction surgery, knee ligament injury, sports injury doctor, best ACL surgeon Hyderabad',
    metaDescription: 'Expert ACL tear treatment in Hyderabad by Dr. B Harsha Vardhana Reddy. Advanced arthroscopic ACL reconstruction for athletes. Complete guide to surgery and recovery.'
  },
  
  {
    id: 'hip-arthritis',
    name: 'Hip Arthritis & AVN',
    slug: 'hip-arthritis',
    category: 'Hip',
    icon: '🦴',
    shortDescription: 'Hip joint degeneration and avascular necrosis causing severe hip pain and limited mobility.',
    
    overview: `Hip arthritis and avascular necrosis (AVN) are leading causes of hip pain and disability. In osteoarthritis, the cartilage wears away causing bone-on-bone contact. In AVN, blood supply to the femoral head is disrupted, causing bone death. Dr. B Harsha Vardhana Reddy offers comprehensive hip care from early intervention to total hip replacement.`,
    
    causes: [
      'Osteoarthritis: Age-related wear, genetics, obesity',
      'AVN causes: Long-term steroid use, excessive alcohol, trauma',
      'Inflammatory arthritis: Rheumatoid arthritis, ankylosing spondylitis',
      'Developmental dysplasia of hip (DDH)',
      'Post-traumatic: Previous hip fracture or dislocation',
      'Femoroacetabular impingement (FAI)'
    ],
    
    symptoms: [
      { name: 'Groin pain', description: 'Deep aching pain in front of hip' },
      { name: 'Buttock or thigh pain', description: 'Can radiate to knee' },
      { name: 'Limping', description: 'Antalgic gait to protect painful hip' },
      { name: 'Stiffness', description: 'Difficulty putting on shoes/socks' },
      { name: 'Limited range of motion', description: 'Cannot cross legs or squat' },
      { name: 'Night pain', description: 'Pain disturbing sleep' }
    ],
    
    diagnosis: [
      { name: 'Physical Examination', description: 'Gait analysis, ROM assessment, impingement tests' },
      { name: 'X-rays', description: 'Weight-bearing views showing joint space, bone quality' },
      { name: 'MRI Scan', description: 'Essential for AVN diagnosis, shows early changes' },
      { name: 'CT Scan', description: 'For surgical planning and bone stock assessment' }
    ],
    
    nonSurgicalTreatments: [
      {
        name: 'Physical Therapy',
        link: '/treatments/physical-therapy',
        details: [
          'Hip flexor stretching: Thomas stretch, kneeling hip flexor stretch',
          'Gluteal strengthening: Bridges, clamshells, side-lying abduction',
          'Core stability: Planks, dead bugs',
          'Aquatic therapy: Pool walking, swimming',
          'Gait training with assistive devices if needed'
        ],
        duration: '6-12 weeks',
        evidenceLevel: 'Moderate evidence'
      },
      {
        name: 'Medications',
        details: [
          'NSAIDs: Ibuprofen, Naproxen for pain and inflammation',
          'Paracetamol: First-line, fewer GI side effects',
          'Topical treatments: Limited effectiveness for deep hip joint'
        ]
      },
      {
        name: 'Intra-articular Injections',
        details: [
          'Corticosteroid injections: Fluoroscopy-guided for accuracy',
          'Hyaluronic acid: May provide 3-6 months relief',
          'PRP: Emerging treatment for early arthritis'
        ]
      }
    ],
    
    surgicalTreatments: [
      {
        name: 'Hip Arthroscopy',
        link: '/treatments/hip-arthroscopy',
        indications: 'FAI, labral tears, early arthritis, loose bodies',
        procedure: 'Keyhole surgery to treat impingement and labral tears',
        recovery: '4-6 weeks crutches, 3-4 months return to activity',
        successRate: '80-85% good results for appropriate indications'
      },
      {
        name: 'Core Decompression',
        indications: 'Early-stage AVN (Ficat Stage I-II)',
        procedure: 'Drilling into femoral head to relieve pressure and promote healing',
        recovery: '6-12 weeks protected weight bearing',
        successRate: '65-85% success in early stages'
      },
      {
        name: 'Total Hip Replacement (THR)',
        link: '/treatments/total-hip-replacement',
        indications: 'End-stage arthritis, advanced AVN',
        procedure: [
          'Anterior or posterior surgical approach',
          'Removal of damaged femoral head',
          'Acetabular cup placement',
          'Femoral stem and head implantation',
          'Modern ceramic-on-ceramic or cross-linked polyethylene bearings'
        ],
        recovery: '3-4 weeks walking, 6-12 weeks return to activities',
        successRate: '95%+ survival at 20 years'
      },
      {
        name: 'Hip Resurfacing',
        indications: 'Young, active males with good bone quality',
        procedure: 'Preserves more bone than THR, metal-on-metal bearing',
        recovery: 'Similar to THR',
        successRate: '90% at 15 years in selected patients'
      }
    ],
    
    faqs: [
      {
        question: 'What is the difference between hip arthritis and AVN?',
        answer: 'Hip arthritis is gradual cartilage wear affecting the joint surface. AVN (avascular necrosis) is death of bone in the femoral head due to disrupted blood supply. Both can lead to hip replacement if severe, but AVN can affect younger patients and progress more rapidly.'
      },
      {
        question: 'How long does a hip replacement last?',
        answer: 'Modern hip replacements last 20-25+ years in most patients. Studies show 95% of implants are still functioning well at 20 years. With advances in bearing surfaces and surgical techniques, longevity continues to improve.'
      },
      {
        question: 'Can I run or play sports after hip replacement?',
        answer: 'Low-impact activities like swimming, cycling, golf, and doubles tennis are encouraged. High-impact activities (running, basketball) are generally discouraged as they may accelerate wear. Many patients return to hiking and recreational activities.'
      }
    ],
    
    relatedConditions: ['knee-arthritis', 'bursitis'],
    relatedTreatments: ['total-hip-replacement', 'hip-arthroscopy', 'core-decompression'],
    
    seoKeywords: 'hip arthritis treatment Hyderabad, AVN treatment, hip replacement surgery, hip pain doctor, best hip surgeon Hyderabad',
    metaDescription: 'Expert hip arthritis and AVN treatment in Hyderabad. Dr. B Harsha Vardhana Reddy offers hip arthroscopy to total hip replacement. Book consultation at Yashoda Hospital.'
  },
  
  {
    id: 'frozen-shoulder',
    name: 'Frozen Shoulder (Adhesive Capsulitis)',
    slug: 'frozen-shoulder',
    category: 'Shoulder',
    icon: '🥶',
    shortDescription: 'Stiffness and pain in shoulder joint, progressively limiting movement. Common in diabetics.',
    
    overview: `Frozen shoulder (adhesive capsulitis) is characterized by progressive stiffness and pain in the shoulder joint. The capsule surrounding the joint thickens and contracts, severely restricting movement. It typically affects people aged 40-60 and is more common in diabetics. Dr. B Harsha Vardhana Reddy provides comprehensive treatment from physical therapy to arthroscopic release.`,
    
    causes: [
      'Idiopathic (most common): Unknown cause',
      'Diabetes mellitus: 10-20% of diabetics affected',
      'Thyroid disorders: Hypothyroidism, hyperthyroidism',
      'Post-injury or surgery: Prolonged immobilization',
      'Stroke or heart disease: Shoulder immobility',
      'Autoimmune conditions'
    ],
    
    symptoms: [
      { name: 'Gradual onset of stiffness', description: 'Develops over weeks to months' },
      { name: 'Severe pain', description: 'Initially severe, may improve as stiffness worsens' },
      { name: 'Night pain', description: 'Often disturbs sleep' },
      { name: 'Loss of external rotation', description: 'Cannot rotate arm outward' },
      { name: 'Difficulty with daily activities', description: 'Dressing, reaching, grooming' }
    ],
    
    stages: [
      { stage: 'Freezing (2-9 months)', description: 'Pain is primary symptom, stiffness begins' },
      { stage: 'Frozen (4-12 months)', description: 'Pain may decrease but stiffness peaks' },
      { stage: 'Thawing (12-42 months)', description: 'Gradual improvement in movement' }
    ],
    
    diagnosis: [
      { name: 'Physical Examination', description: 'Loss of passive and active ROM, especially external rotation' },
      { name: 'X-rays', description: 'Usually normal, rules out arthritis' },
      { name: 'MRI', description: 'Shows thickened capsule, rules out rotator cuff tear' }
    ],
    
    nonSurgicalTreatments: [
      {
        name: 'Physical Therapy Protocol',
        link: '/treatments/physical-therapy',
        details: [
          'Phase 1 - Pain Management:',
          '- Heat/ice application before exercises',
          '- Pendulum exercises: 3 times daily, 5 minutes',
          '- Gentle passive ROM within pain tolerance',
          'Phase 2 - Stretching Program:',
          '- Passive external rotation with stick',
          '- Cross-body stretch',
          '- Towel stretch for internal rotation',
          '- Wall walks (finger climbing)',
          '- Hold stretches 30 seconds, repeat 3-5 times, 3 times daily',
          'Phase 3 - Active ROM and Strengthening:',
          '- Active assisted exercises progressing to active',
          '- Resistance band exercises when ROM improves',
          '- Scapular stabilization exercises'
        ],
        duration: '6-18 months',
        evidenceLevel: 'Strong evidence as first-line treatment'
      },
      {
        name: 'Corticosteroid Injections',
        details: [
          'Intra-articular injection: Provides significant pain relief',
          'Most effective in freezing stage',
          'Combined with physical therapy for best results',
          'May shorten duration of condition'
        ],
        evidenceLevel: 'Strong evidence for short-term relief'
      },
      {
        name: 'Hydrodilatation (Distension Arthrography)',
        details: [
          'Injection of saline and steroid to stretch capsule',
          'Performed under fluoroscopy or ultrasound',
          'Can provide rapid improvement in ROM',
          'Combined with immediate physiotherapy'
        ],
        evidenceLevel: 'Moderate evidence'
      }
    ],
    
    surgicalTreatments: [
      {
        name: 'Manipulation Under Anesthesia (MUA)',
        indications: 'Failed conservative treatment after 6+ months',
        procedure: 'Gentle manipulation to break adhesions while asleep',
        recovery: 'Immediate intensive physiotherapy required',
        successRate: '70-90% improvement'
      },
      {
        name: 'Arthroscopic Capsular Release',
        link: '/treatments/shoulder-arthroscopy',
        indications: 'Failed MUA, diabetic patients, severe stiffness',
        procedure: [
          'Keyhole surgery to cut contracted capsule',
          'Release of all capsular quadrants',
          'Manipulation to restore full ROM',
          'Often combined with MUA'
        ],
        recovery: '6-12 weeks intensive physiotherapy',
        successRate: '85-95% improvement'
      }
    ],
    
    faqs: [
      {
        question: 'Will frozen shoulder heal on its own?',
        answer: 'Yes, frozen shoulder is typically self-limiting and resolves in 1-3 years without treatment. However, treatment can significantly shorten this duration and prevent prolonged disability. Some patients may have residual stiffness.'
      },
      {
        question: 'What exercises should I avoid with frozen shoulder?',
        answer: 'Avoid forcing movements that cause significant pain. Do not do aggressive stretching or strengthening exercises in the painful "freezing" stage. Exercises should be gentle and progressive, guided by a physiotherapist.'
      },
      {
        question: 'Is frozen shoulder more severe in diabetics?',
        answer: 'Yes, diabetics tend to have more severe frozen shoulder, longer duration, and may respond less well to non-surgical treatment. They are also at higher risk for bilateral frozen shoulder. Aggressive management including early surgical intervention may be needed.'
      }
    ],
    
    relatedConditions: ['rotator-cuff', 'shoulder-dislocation', 'bursitis'],
    relatedTreatments: ['shoulder-arthroscopy', 'physical-therapy', 'hydrodilatation'],
    
    seoKeywords: 'frozen shoulder treatment Hyderabad, adhesive capsulitis, shoulder stiffness, shoulder pain doctor, best shoulder surgeon Hyderabad',
    metaDescription: 'Expert frozen shoulder treatment in Hyderabad. Dr. B Harsha Vardhana Reddy offers physical therapy to arthroscopic release. Complete guide to symptoms and recovery.'
  },
  
  {
    id: 'meniscus-tear',
    name: 'Meniscus Tear',
    slug: 'meniscus-tear',
    category: 'Knee',
    icon: '🦵',
    shortDescription: 'Tear in knee cartilage causing pain, swelling, and catching sensation.',
    
    overview: `The meniscus is C-shaped cartilage that cushions and stabilizes the knee joint. Meniscus tears are common injuries that can occur from sports, twisting movements, or degenerative changes with age. Dr. B Harsha Vardhana Reddy specializes in arthroscopic meniscus surgery, prioritizing repair over removal when possible.`,
    
    causes: [
      'Sports injuries: Pivoting, twisting with foot planted',
      'Degenerative tears: Age-related wear (common after 40)',
      'Squatting or kneeling activities',
      'Combined injuries: Often with ACL tears',
      'Obesity: Increased load on meniscus'
    ],
    
    symptoms: [
      { name: 'Knee pain', description: 'Along joint line, medial or lateral' },
      { name: 'Swelling', description: 'May develop over 24-48 hours' },
      { name: 'Catching or locking', description: 'Knee gets stuck during movement' },
      { name: 'Popping sensation', description: 'Feeling or hearing clicks' },
      { name: 'Difficulty straightening knee', description: 'Mechanical block from displaced tear' },
      { name: 'Instability', description: 'Knee feels like it might give way' }
    ],
    
    tearTypes: [
      { type: 'Radial tear', description: 'Perpendicular to meniscus, disrupts structure' },
      { type: 'Horizontal tear', description: 'Splits meniscus into upper and lower portions' },
      { type: 'Bucket handle tear', description: 'Large vertical tear that can flip into joint' },
      { type: 'Flap tear', description: 'Loose piece that can catch' },
      { type: 'Complex/Degenerative', description: 'Multiple tear patterns, usually age-related' }
    ],
    
    diagnosis: [
      { name: 'Physical Examination', description: 'McMurray test, Thessaly test, joint line tenderness' },
      { name: 'MRI Scan', description: 'Gold standard for meniscus visualization, 95% accurate' },
      { name: 'X-rays', description: 'Rules out arthritis, fractures' }
    ],
    
    nonSurgicalTreatments: [
      {
        name: 'RICE Protocol',
        details: [
          'Rest: Avoid aggravating activities',
          'Ice: 20 minutes, 3-4 times daily',
          'Compression: Elastic bandage',
          'Elevation: Above heart level when resting'
        ]
      },
      {
        name: 'Physical Therapy',
        link: '/treatments/physical-therapy',
        details: [
          'Quadriceps strengthening: Straight leg raises, mini squats',
          'Hamstring strengthening: Heel slides, bridges',
          'Range of motion: Heel slides, stationary bike',
          'Proprioception: Balance board training',
          'Low-impact cardio: Swimming, elliptical'
        ],
        duration: '6-12 weeks',
        indications: 'Small stable tears, degenerative tears, low-demand patients'
      },
      {
        name: 'PRP Injections',
        link: '/treatments/prp-injections',
        details: [
          'May help healing in vascular zone tears',
          'Combined with physical therapy',
          'Emerging evidence for degenerative tears'
        ]
      }
    ],
    
    surgicalTreatments: [
      {
        name: 'Arthroscopic Meniscus Repair',
        link: '/treatments/knee-arthroscopy',
        indications: 'Young patients, peripheral tears (red zone), acute injuries',
        procedure: [
          'Two small incisions (portals)',
          'Visualization of tear pattern',
          'Preparation of tear edges',
          'Suture repair with all-inside devices',
          'Testing of repair stability'
        ],
        recovery: '6 weeks protected weight bearing, 3-4 months return to sport',
        successRate: '85-90% healing rate'
      },
      {
        name: 'Partial Meniscectomy',
        link: '/treatments/knee-arthroscopy',
        indications: 'Complex tears, white zone tears, failed repair',
        procedure: 'Removal of torn portion while preserving maximum meniscus',
        recovery: '2-4 weeks, quick return to activity',
        successRate: 'Good short-term results, long-term arthritis risk'
      },
      {
        name: 'Meniscal Transplant',
        indications: 'Previous total meniscectomy with pain, young patients',
        procedure: 'Donor meniscus transplantation',
        recovery: '6-12 months',
        successRate: '70-80% good results at 10 years'
      }
    ],
    
    faqs: [
      {
        question: 'Can a meniscus tear heal without surgery?',
        answer: 'Some meniscus tears can heal or become asymptomatic without surgery, particularly small, stable tears in the outer vascular zone. Degenerative tears often improve with physical therapy. Surgery is needed for mechanical symptoms (locking, catching) or tears that don\'t respond to conservative treatment.'
      },
      {
        question: 'Is meniscus repair better than removal?',
        answer: 'Yes, when possible. Preserving the meniscus protects against future arthritis. Repair is preferred for tears in young patients, peripheral tears with good blood supply, and acute injuries. Removal is reserved for tears that cannot be repaired.'
      },
      {
        question: 'How long after meniscus surgery can I play sports?',
        answer: 'After partial meniscectomy: 4-6 weeks. After meniscus repair: 4-6 months for sports involving pivoting. Return depends on the type of surgery, sport, and meeting strength/functional criteria.'
      }
    ],
    
    relatedConditions: ['knee-arthritis', 'acl-tear', 'patella-dislocation'],
    relatedTreatments: ['knee-arthroscopy', 'acl-reconstruction', 'physical-therapy'],
    
    seoKeywords: 'meniscus tear treatment Hyderabad, knee arthroscopy, cartilage repair, knee pain doctor, best knee surgeon Hyderabad',
    metaDescription: 'Expert meniscus tear treatment in Hyderabad. Dr. B Harsha Vardhana Reddy offers arthroscopic repair and surgery. Complete guide to symptoms, diagnosis, and recovery.'
  },
  
  {
    id: 'tennis-elbow',
    name: 'Tennis Elbow & Golfers Elbow',
    slug: 'tennis-elbow',
    category: 'Elbow',
    icon: '🎾',
    shortDescription: 'Lateral and medial epicondylitis causing elbow pain from overuse.',
    
    overview: `Tennis elbow (lateral epicondylitis) and golfer's elbow (medial epicondylitis) are overuse injuries affecting the tendons that attach to the elbow. Despite the names, these conditions commonly affect non-athletes who perform repetitive gripping activities. Dr. B Harsha Vardhana Reddy offers comprehensive treatment from conservative care to minimally invasive surgery.`,
    
    causes: [
      'Repetitive gripping and wrist extension (tennis elbow)',
      'Repetitive wrist flexion (golfer\'s elbow)',
      'Racquet sports with improper technique',
      'Occupational: Computer use, plumbing, painting, carpentry',
      'Poor equipment: Wrong grip size, heavy tools'
    ],
    
    symptoms: [
      { name: 'Elbow pain', description: 'Outer elbow (tennis) or inner elbow (golfer\'s)' },
      { name: 'Weak grip', description: 'Difficulty holding objects' },
      { name: 'Pain with wrist movements', description: 'Especially lifting or gripping' },
      { name: 'Tenderness', description: 'Point tenderness over epicondyle' },
      { name: 'Morning stiffness', description: 'Improves with activity initially' }
    ],
    
    diagnosis: [
      { name: 'Physical Examination', description: 'Cozen\'s test, Mill\'s test, resisted wrist extension' },
      { name: 'X-rays', description: 'Usually normal, may show calcification' },
      { name: 'Ultrasound', description: 'Shows tendon thickening, tears' },
      { name: 'MRI', description: 'For recalcitrant cases, shows extent of damage' }
    ],
    
    nonSurgicalTreatments: [
      {
        name: 'Activity Modification',
        details: [
          'Identify and modify aggravating activities',
          'Ergonomic assessment of workstation',
          'Proper technique in sports',
          'Equipment changes: Larger grip, lighter racquet'
        ]
      },
      {
        name: 'Physical Therapy Protocol',
        link: '/treatments/physical-therapy',
        details: [
          'Phase 1 - Acute (Weeks 1-2):',
          '- Ice massage: 10 minutes, 3 times daily',
          '- Rest from aggravating activities',
          '- Counterforce brace wear',
          'Phase 2 - Subacute (Weeks 2-6):',
          '- Stretching: Wrist flexor/extensor stretches, hold 30 seconds',
          '- Eccentric strengthening: Key component',
          '- Eccentric wrist extension: 3 sets x 15 reps, 2 times daily',
          'Phase 3 - Strengthening (Weeks 6-12):',
          '- Progressive resistance exercises',
          '- Grip strengthening',
          '- Gradual return to activity'
        ],
        duration: '6-12 weeks',
        evidenceLevel: 'Strong evidence, especially eccentric exercises'
      },
      {
        name: 'PRP Injections',
        link: '/treatments/prp-injections',
        details: [
          'Platelet-rich plasma to stimulate healing',
          'Single or series of injections',
          'Better long-term outcomes than steroid injections',
          'Combined with rehabilitation program'
        ],
        evidenceLevel: 'Moderate to strong evidence'
      },
      {
        name: 'Corticosteroid Injections',
        details: [
          'Short-term pain relief (2-6 weeks)',
          'May have poorer long-term outcomes',
          'Useful for severe pain limiting rehabilitation',
          'Maximum 2-3 injections'
        ],
        evidenceLevel: 'Short-term benefit, concerns about long-term outcomes'
      },
      {
        name: 'Shockwave Therapy (ESWT)',
        details: [
          'Acoustic waves to stimulate healing',
          'Typically 3-5 sessions',
          'May be effective for chronic cases'
        ],
        evidenceLevel: 'Moderate evidence'
      }
    ],
    
    surgicalTreatments: [
      {
        name: 'Arthroscopic Lateral Epicondylar Release',
        indications: 'Failed 6-12 months of conservative treatment',
        procedure: [
          'Small incision or arthroscopic technique',
          'Release of ECRB tendon origin',
          'Debridement of degenerative tissue',
          'Decortication to promote healing'
        ],
        recovery: '6-12 weeks, gradual return to activity',
        successRate: '85-90% good to excellent results'
      },
      {
        name: 'Open Surgical Release',
        indications: 'Severe cases, failed arthroscopic treatment',
        procedure: 'Open release with direct visualization',
        recovery: '3-6 months',
        successRate: '80-85% improvement'
      }
    ],
    
    faqs: [
      {
        question: 'How long does tennis elbow take to heal?',
        answer: 'Most cases resolve with conservative treatment within 6-12 months. 80-90% of patients improve without surgery. Eccentric exercises are key to recovery. Chronic cases may take longer or require intervention.'
      },
      {
        question: 'Should I wear a brace for tennis elbow?',
        answer: 'A counterforce brace (worn below the elbow) can help reduce strain on the affected tendon during activities. It\'s useful during the healing phase but shouldn\'t replace rehabilitation exercises.'
      },
      {
        question: 'Can I continue playing tennis with tennis elbow?',
        answer: 'During acute phase, rest is recommended. As symptoms improve, gradual return with proper technique, appropriate equipment, and adequate warm-up is possible. Technique correction is crucial to prevent recurrence.'
      }
    ],
    
    relatedConditions: ['carpal-tunnel', 'shoulder-dislocation'],
    relatedTreatments: ['prp-injections', 'physical-therapy', 'elbow-arthroscopy'],
    
    seoKeywords: 'tennis elbow treatment Hyderabad, lateral epicondylitis, elbow pain doctor, golfers elbow, best elbow surgeon Hyderabad',
    metaDescription: 'Expert tennis elbow and golfer\'s elbow treatment in Hyderabad. Dr. B Harsha Vardhana Reddy offers PRP injections and surgery. Complete guide to symptoms and recovery.'
  },
  
  {
    id: 'shoulder-dislocation',
    name: 'Recurrent Shoulder Dislocation',
    slug: 'shoulder-dislocation',
    category: 'Shoulder',
    icon: '🤕',
    shortDescription: 'Repeated shoulder dislocations indicating joint instability. Common in young athletes.',
    
    overview: `Shoulder dislocation occurs when the ball of the upper arm bone comes out of the shoulder socket. Young athletes who dislocate their shoulder have a high risk of recurrence. Dr. B Harsha Vardhana Reddy specializes in arthroscopic stabilization procedures to restore shoulder stability and return patients to sports.`,
    
    causes: [
      'Traumatic dislocation: Fall, sports collision, accident',
      'Hyperlaxity: Naturally loose ligaments',
      'Bankart lesion: Torn labrum from first dislocation',
      'Hill-Sachs lesion: Bone defect from dislocation',
      'Young age: Highest risk of recurrence under 20 years'
    ],
    
    symptoms: [
      { name: 'Shoulder pops out', description: 'Visible deformity during dislocation' },
      { name: 'Severe pain', description: 'During and after dislocation' },
      { name: 'Apprehension', description: 'Fear of shoulder slipping with arm in certain positions' },
      { name: 'Instability', description: 'Feeling of looseness or subluxation' },
      { name: 'Numbness', description: 'Temporary numbness in arm during dislocation' }
    ],
    
    diagnosis: [
      { name: 'Physical Examination', description: 'Apprehension test, relocation test, load-and-shift test' },
      { name: 'X-rays', description: 'Shows bone defects, confirms dislocation direction' },
      { name: 'MRI Arthrogram', description: 'Gold standard for labral tears and ligament damage' },
      { name: 'CT Scan', description: 'Assesses bone loss (glenoid and humeral head)' }
    ],
    
    nonSurgicalTreatments: [
      {
        name: 'Initial Management',
        details: [
          'Closed reduction by trained professional',
          'Sling immobilization: 2-3 weeks',
          'Ice and pain management'
        ]
      },
      {
        name: 'Rehabilitation Protocol',
        link: '/treatments/physical-therapy',
        details: [
          'Phase 1 (Weeks 0-3): Sling, gentle ROM',
          'Phase 2 (Weeks 3-6): Progressive ROM, rotator cuff activation',
          'Phase 3 (Weeks 6-12): Strengthening, proprioception',
          'Phase 4 (Months 3-6): Sport-specific training',
          'Key exercises:',
          '- Rotator cuff strengthening: Internal/external rotation',
          '- Scapular stabilization: Rows, serratus punches',
          '- Proprioception: Balance exercises with arm movements'
        ],
        indications: 'First dislocation in older (>35) or low-demand patients'
      }
    ],
    
    surgicalTreatments: [
      {
        name: 'Arthroscopic Bankart Repair',
        link: '/treatments/bankart-repair',
        indications: 'Recurrent dislocations, young active patients, first dislocation in athletes',
        procedure: [
          'Keyhole surgery (3-4 small incisions)',
          'Reattachment of torn labrum to glenoid rim',
          '3-5 suture anchors placed',
          'Capsular tightening if needed'
        ],
        recovery: '6 weeks sling, 4-6 months return to sport',
        successRate: '90-95% prevention of recurrence'
      },
      {
        name: 'Latarjet Procedure',
        indications: 'Significant bone loss (>20-25%), failed Bankart, high-risk sports',
        procedure: [
          'Transfer of coracoid bone block to glenoid',
          'Provides bony augmentation and dynamic sling effect',
          'Open or arthroscopic technique'
        ],
        recovery: '3-6 months return to sport',
        successRate: '95-98% prevention of recurrence'
      },
      {
        name: 'Remplissage Procedure',
        indications: 'Hill-Sachs lesion engaging with arm in throwing position',
        procedure: 'Filling Hill-Sachs defect with infraspinatus tendon',
        recovery: 'Combined with Bankart repair',
        successRate: 'Reduces recurrence when combined with Bankart'
      }
    ],
    
    faqs: [
      {
        question: 'Do I need surgery after my first shoulder dislocation?',
        answer: 'It depends on your age and activity level. Young athletes (<25) have 70-90% recurrence rate without surgery. Early surgical stabilization may be recommended for athletes in contact sports. Older, less active patients may do well with rehabilitation alone.'
      },
      {
        question: 'Can I return to contact sports after shoulder stabilization?',
        answer: 'Yes, most athletes return to their sport after proper rehabilitation. Return typically takes 4-6 months after arthroscopic Bankart repair. The success rate for remaining stable during sports is over 90%.'
      },
      {
        question: 'What happens if I keep dislocating my shoulder?',
        answer: 'Repeated dislocations cause progressive damage to cartilage and bone, leading to bone loss and eventually shoulder arthritis. Each dislocation increases the risk of further recurrence. Early stabilization prevents this cumulative damage.'
      }
    ],
    
    relatedConditions: ['rotator-cuff', 'frozen-shoulder'],
    relatedTreatments: ['bankart-repair', 'shoulder-arthroscopy', 'latarjet-procedure'],
    
    seoKeywords: 'shoulder dislocation treatment Hyderabad, Bankart repair, shoulder instability, shoulder surgery, best shoulder surgeon Hyderabad',
    metaDescription: 'Expert treatment for recurrent shoulder dislocation in Hyderabad. Dr. B Harsha Vardhana Reddy offers arthroscopic Bankart repair. Complete guide to symptoms and surgery.'
  },
  
  {
    id: 'carpal-tunnel',
    name: 'Carpal Tunnel Syndrome',
    slug: 'carpal-tunnel-syndrome',
    category: 'Hand & Wrist',
    icon: '✋',
    shortDescription: 'Nerve compression in wrist causing numbness, tingling, and weakness in hand.',
    
    overview: `Carpal tunnel syndrome (CTS) occurs when the median nerve is compressed as it passes through the carpal tunnel in the wrist. It's one of the most common causes of hand numbness and weakness. Dr. B Harsha Vardhana Reddy offers both conservative and surgical treatment for carpal tunnel syndrome.`,
    
    causes: [
      'Repetitive hand movements: Typing, assembly work',
      'Pregnancy: Fluid retention compresses nerve',
      'Diabetes: Increased nerve sensitivity',
      'Thyroid disorders: Tissue swelling',
      'Rheumatoid arthritis: Joint inflammation',
      'Wrist fractures: Narrowed carpal tunnel'
    ],
    
    symptoms: [
      { name: 'Numbness and tingling', description: 'In thumb, index, middle, and half of ring finger' },
      { name: 'Night-time symptoms', description: 'Waking up with numb hands' },
      { name: 'Hand weakness', description: 'Dropping objects, difficulty with buttons' },
      { name: 'Pain radiating up arm', description: 'Can extend to elbow or shoulder' },
      { name: 'Thenar atrophy', description: 'Wasting of thumb muscles in advanced cases' }
    ],
    
    diagnosis: [
      { name: 'Physical Examination', description: 'Tinel\'s test, Phalen\'s test, sensory testing' },
      { name: 'Nerve Conduction Studies', description: 'Confirms diagnosis and severity' },
      { name: 'Ultrasound', description: 'Shows nerve swelling, identifies causes' },
      { name: 'X-rays', description: 'If arthritis or fracture suspected' }
    ],
    
    nonSurgicalTreatments: [
      {
        name: 'Wrist Splinting',
        details: [
          'Neutral position splint worn at night',
          'Keeps wrist straight to reduce pressure on nerve',
          'Wear for 4-6 weeks initially',
          'Can continue long-term for symptom control'
        ],
        evidenceLevel: 'Strong evidence for mild to moderate CTS'
      },
      {
        name: 'Activity Modification',
        details: [
          'Ergonomic keyboard and mouse setup',
          'Regular breaks during repetitive tasks',
          'Avoid extreme wrist positions',
          'Stretching exercises throughout day'
        ]
      },
      {
        name: 'Nerve Gliding Exercises',
        link: '/treatments/physical-therapy',
        details: [
          'Tendon gliding exercises:',
          '- Make a fist, then open to straight fingers',
          '- Hook fist, then straight fist, then full fist',
          '- Repeat 10 times, 3 times daily',
          'Nerve gliding exercises:',
          '- Wrist extension with fingers extended',
          '- Progress through 6 positions',
          '- Hold each 5 seconds, repeat 5 times'
        ],
        evidenceLevel: 'Moderate evidence as adjunct treatment'
      },
      {
        name: 'Corticosteroid Injections',
        details: [
          'Injection into carpal tunnel',
          'Provides relief for 2-3 months',
          'Useful for diagnosis (if injection helps, confirms CTS)',
          'May delay surgery but doesn\'t replace it long-term'
        ],
        evidenceLevel: 'Strong evidence for short-term relief'
      }
    ],
    
    surgicalTreatments: [
      {
        name: 'Open Carpal Tunnel Release',
        link: '/treatments/carpal-tunnel-release',
        indications: 'Failed conservative treatment, muscle wasting, severe symptoms',
        procedure: [
          'Local anesthesia with sedation',
          '2-3 cm incision in palm',
          'Division of transverse carpal ligament',
          'Nerve inspection',
          'Skin closure'
        ],
        recovery: '1-2 weeks for light activities, 4-6 weeks for heavy work',
        successRate: '90-95% symptom relief'
      },
      {
        name: 'Endoscopic Carpal Tunnel Release',
        indications: 'Same as open release, surgeon preference',
        procedure: [
          '1-2 small incisions',
          'Camera-guided release of ligament',
          'Faster return to work for some patients'
        ],
        recovery: 'Potentially faster than open release',
        successRate: 'Similar to open release (90-95%)'
      }
    ],
    
    faqs: [
      {
        question: 'Will carpal tunnel go away on its own?',
        answer: 'Mild carpal tunnel may improve with rest and splinting. However, most cases are progressive and symptoms worsen over time without treatment. Early treatment prevents permanent nerve damage.'
      },
      {
        question: 'How long is recovery after carpal tunnel surgery?',
        answer: 'Light activities: 1-2 weeks. Driving: 1-2 weeks. Office work: 1-2 weeks. Heavy manual work: 4-6 weeks. Pillar pain (tenderness near incision) may take 2-3 months to fully resolve.'
      },
      {
        question: 'Can carpal tunnel come back after surgery?',
        answer: 'Recurrence after properly performed surgery is rare (less than 5%). Symptoms that persist or return may be due to incomplete release, scar tissue, or nerve damage from prolonged compression before surgery.'
      }
    ],
    
    relatedConditions: ['tennis-elbow', 'trigger-finger'],
    relatedTreatments: ['carpal-tunnel-release', 'physical-therapy'],
    
    seoKeywords: 'carpal tunnel syndrome treatment Hyderabad, wrist pain, hand numbness, carpal tunnel surgery, best hand surgeon Hyderabad',
    metaDescription: 'Expert carpal tunnel syndrome treatment in Hyderabad. Dr. B Harsha Vardhana Reddy offers splinting to surgical release. Complete guide to symptoms and recovery.'
  },
  
  {
    id: 'ankle-sprain',
    name: 'Chronic Ankle Instability',
    slug: 'ankle-instability',
    category: 'Foot & Ankle',
    icon: '👣',
    shortDescription: 'Recurring ankle sprains and instability from ligament damage.',
    
    overview: `Chronic ankle instability develops after repeated ankle sprains that don't heal properly. The lateral ligaments become stretched or torn, leading to a feeling of the ankle "giving way." Dr. B Harsha Vardhana Reddy offers comprehensive treatment from rehabilitation to ligament reconstruction.`,
    
    causes: [
      'Repeated ankle sprains',
      'Inadequate rehabilitation after initial sprain',
      'Ligament laxity',
      'Weak peroneal muscles',
      'Proprioceptive deficit'
    ],
    
    symptoms: [
      { name: 'Repeated ankle sprains', description: 'Multiple sprains with minor trauma' },
      { name: 'Giving way sensation', description: 'Ankle rolls during activity or walking' },
      { name: 'Chronic swelling', description: 'Persistent ankle puffiness' },
      { name: 'Pain and tenderness', description: 'Along outer ankle' },
      { name: 'Instability on uneven surfaces', description: 'Difficulty with terrain changes' }
    ],
    
    diagnosis: [
      { name: 'Physical Examination', description: 'Anterior drawer test, talar tilt test' },
      { name: 'Stress X-rays', description: 'Shows abnormal tilting of ankle joint' },
      { name: 'MRI', description: 'Assesses ligament integrity, cartilage damage' }
    ],
    
    nonSurgicalTreatments: [
      {
        name: 'Physical Therapy Protocol',
        link: '/treatments/physical-therapy',
        details: [
          'Phase 1: Acute management, RICE protocol',
          'Phase 2: Range of motion and flexibility',
          '- Ankle alphabet exercises',
          '- Calf stretching (gastrocnemius, soleus)',
          'Phase 3: Strengthening',
          '- Resistance band exercises: Dorsiflexion, plantarflexion',
          '- Eversion strengthening (peroneal muscles)',
          '- Heel raises: Double leg progressing to single leg',
          'Phase 4: Proprioception and balance',
          '- Single leg standing: Eyes open to eyes closed',
          '- Wobble board training',
          '- BAPS board exercises',
          'Phase 5: Sport-specific training',
          '- Agility drills, cutting, jumping'
        ],
        duration: '6-12 weeks minimum',
        evidenceLevel: 'Strong evidence as first-line treatment'
      },
      {
        name: 'Ankle Bracing',
        details: [
          'Lace-up braces for activity',
          'Semi-rigid braces for higher support',
          'Taping techniques for athletes'
        ]
      }
    ],
    
    surgicalTreatments: [
      {
        name: 'Modified Brostrom Procedure',
        link: '/treatments/ankle-ligament-reconstruction',
        indications: 'Failed conservative treatment after 3-6 months',
        procedure: [
          'Lateral ankle incision',
          'Repair of ATFL and CFL ligaments',
          'Reinforcement with inferior extensor retinaculum',
          'Internal brace augmentation optional'
        ],
        recovery: '6 weeks in boot, 3-4 months return to sport',
        successRate: '85-95% good to excellent results'
      },
      {
        name: 'Anatomic Ligament Reconstruction',
        indications: 'Failed Brostrom, severe laxity, high-demand athletes',
        procedure: 'Using hamstring or peroneus brevis tendon graft',
        recovery: '6 weeks boot, 4-6 months return to sport',
        successRate: '85-90% good results'
      }
    ],
    
    faqs: [
      {
        question: 'Can chronic ankle instability be cured without surgery?',
        answer: 'Many patients improve significantly with a structured rehabilitation program focusing on strengthening and balance training. Surgery is reserved for those who fail 3-6 months of physical therapy or have significant ligament damage.'
      },
      {
        question: 'How long does ankle ligament surgery recovery take?',
        answer: 'After Brostrom repair: Walking boot for 6 weeks, return to sport at 3-4 months. Full recovery and confidence typically takes 6-9 months.'
      }
    ],
    
    relatedConditions: ['plantar-fasciitis'],
    relatedTreatments: ['ankle-ligament-reconstruction', 'physical-therapy'],
    
    seoKeywords: 'ankle instability treatment Hyderabad, ankle ligament surgery, chronic ankle sprain, ankle reconstruction, best foot ankle surgeon Hyderabad',
    metaDescription: 'Expert chronic ankle instability treatment in Hyderabad. Dr. B Harsha Vardhana Reddy offers rehabilitation to ligament reconstruction. Complete guide to symptoms and surgery.'
  },
  
  {
    id: 'plantar-fasciitis',
    name: 'Plantar Fasciitis & Heel Pain',
    slug: 'plantar-fasciitis',
    category: 'Foot & Ankle',
    icon: '🦶',
    shortDescription: 'Inflammation of tissue on bottom of foot causing heel pain.',
    
    overview: `Plantar fasciitis is the most common cause of heel pain, affecting the thick band of tissue (plantar fascia) that runs along the bottom of the foot. It causes stabbing pain that typically occurs with your first steps in the morning. Dr. B Harsha Vardhana Reddy offers comprehensive treatment from conservative care to advanced interventions.`,
    
    causes: [
      'Overuse: Running, prolonged standing',
      'Obesity: Increased load on foot',
      'Tight calf muscles',
      'High arches or flat feet',
      'Poor footwear',
      'Age: Most common in 40-60 year olds'
    ],
    
    symptoms: [
      { name: 'Heel pain in morning', description: 'First steps are most painful' },
      { name: 'Pain after standing', description: 'After prolonged sitting or rest' },
      { name: 'Arch pain', description: 'Along the plantar fascia' },
      { name: 'Pain improves with activity', description: 'Warms up but worsens later' }
    ],
    
    diagnosis: [
      { name: 'Physical Examination', description: 'Point tenderness at medial heel, tight Achilles' },
      { name: 'X-rays', description: 'May show heel spur (not the cause of pain)' },
      { name: 'Ultrasound', description: 'Shows thickened plantar fascia' },
      { name: 'MRI', description: 'For recalcitrant cases, rules out other causes' }
    ],
    
    nonSurgicalTreatments: [
      {
        name: 'Stretching Program',
        link: '/treatments/physical-therapy',
        details: [
          'Plantar fascia stretch:',
          '- Cross affected leg over opposite knee',
          '- Pull toes back toward shin',
          '- Hold 30 seconds, repeat 10 times',
          '- Perform before first step in morning',
          'Calf stretches:',
          '- Wall calf stretch (knee straight): 30 seconds, 3 times',
          '- Soleus stretch (knee bent): 30 seconds, 3 times',
          '- Perform 3 times daily',
          'Towel stretch in morning',
          'Rolling foot on frozen water bottle'
        ],
        duration: '6-12 weeks',
        evidenceLevel: 'Strong evidence'
      },
      {
        name: 'Orthotics and Footwear',
        details: [
          'Supportive shoes with cushioned heel',
          'Over-the-counter arch supports',
          'Custom orthotics for severe cases',
          'Night splints to maintain stretch'
        ]
      },
      {
        name: 'Corticosteroid Injections',
        details: [
          'Ultrasound-guided injection',
          'Short-term relief (1-3 months)',
          'Maximum 3 injections',
          'Risk of fat pad atrophy and fascia rupture'
        ]
      },
      {
        name: 'PRP Injections',
        link: '/treatments/prp-injections',
        details: [
          'Growth factors to promote healing',
          'Better long-term results than steroids',
          'Single or multiple injections'
        ],
        evidenceLevel: 'Moderate to strong evidence'
      },
      {
        name: 'Extracorporeal Shockwave Therapy (ESWT)',
        details: [
          'Acoustic waves to stimulate healing',
          '3-5 sessions typically',
          'Useful for chronic recalcitrant cases'
        ],
        evidenceLevel: 'Moderate evidence'
      }
    ],
    
    surgicalTreatments: [
      {
        name: 'Plantar Fascia Release',
        indications: 'Failed 6-12 months of conservative treatment',
        procedure: [
          'Endoscopic or open technique',
          'Partial release of plantar fascia',
          'Sometimes combined with gastrocnemius release'
        ],
        recovery: '6-12 weeks',
        successRate: '70-90% improvement'
      },
      {
        name: 'Gastrocnemius Recession',
        indications: 'Tight calf muscles contributing to problem',
        procedure: 'Lengthening of gastrocnemius muscle',
        recovery: '6 weeks',
        successRate: 'Improves outcomes when combined with fascia treatment'
      }
    ],
    
    faqs: [
      {
        question: 'How long does plantar fasciitis take to heal?',
        answer: 'Most cases resolve within 6-12 months with conservative treatment. 90% of patients improve without surgery. Consistent stretching is key to recovery. Chronic cases (>12 months) may need advanced treatments.'
      },
      {
        question: 'Are heel spurs the cause of my pain?',
        answer: 'No, heel spurs are usually incidental findings and not the source of pain. The pain comes from the inflamed plantar fascia where it attaches to the heel bone. Many people have heel spurs without any pain.'
      },
      {
        question: 'What shoes are best for plantar fasciitis?',
        answer: 'Supportive shoes with cushioned heel, good arch support, and slightly elevated heel (not flat). Avoid walking barefoot. Brands like Brooks, ASICS, and New Balance often have good options. Replace worn-out shoes regularly.'
      }
    ],
    
    relatedConditions: ['ankle-sprain'],
    relatedTreatments: ['prp-injections', 'physical-therapy', 'shockwave-therapy'],
    
    seoKeywords: 'plantar fasciitis treatment Hyderabad, heel pain, foot pain doctor, plantar fascia release, best foot surgeon Hyderabad',
    metaDescription: 'Expert plantar fasciitis treatment in Hyderabad. Dr. B Harsha Vardhana Reddy offers stretching programs to PRP injections. Complete guide to heel pain relief.'
  },
  
  {
    id: 'spinal-fracture',
    name: 'Vertebral Compression Fractures',
    slug: 'spinal-fracture',
    category: 'Spine',
    icon: '🏥',
    shortDescription: 'Spinal compression fractures from osteoporosis or trauma causing back pain.',
    
    overview: `Vertebral compression fractures occur when the vertebral body collapses, most commonly due to osteoporosis. They cause sudden back pain and can lead to height loss and kyphosis (hunched posture). Dr. B Harsha Vardhana Reddy offers minimally invasive treatments including vertebroplasty and kyphoplasty.`,
    
    causes: [
      'Osteoporosis: Most common cause',
      'Trauma: Falls, accidents',
      'Cancer: Metastatic disease to spine',
      'Multiple myeloma',
      'Long-term steroid use'
    ],
    
    symptoms: [
      { name: 'Sudden back pain', description: 'Often after minor activity or fall' },
      { name: 'Height loss', description: 'Measurable decrease in height' },
      { name: 'Kyphosis', description: 'Progressive hunching of upper back' },
      { name: 'Limited mobility', description: 'Pain with movement' }
    ],
    
    nonSurgicalTreatments: [
      {
        name: 'Pain Management',
        details: [
          'Analgesics: Paracetamol, NSAIDs',
          'Short-term opioids for severe pain',
          'Calcitonin nasal spray (may reduce pain)'
        ]
      },
      {
        name: 'Bracing',
        details: [
          'Thoracolumbar orthosis (TLSO)',
          'Reduces spinal loading',
          'Worn for 6-12 weeks'
        ]
      },
      {
        name: 'Osteoporosis Treatment',
        details: [
          'Bisphosphonates: Alendronate, Zoledronic acid',
          'Calcium and Vitamin D supplementation',
          'Denosumab for high-risk patients',
          'Teriparatide for severe osteoporosis'
        ]
      }
    ],
    
    surgicalTreatments: [
      {
        name: 'Vertebroplasty',
        indications: 'Painful fractures not responding to conservative treatment',
        procedure: [
          'Needle inserted into fractured vertebra',
          'Bone cement injected to stabilize fracture',
          'Performed under fluoroscopy guidance',
          'Local anesthesia with sedation'
        ],
        recovery: 'Same day or next day discharge, immediate pain relief',
        successRate: '80-90% significant pain relief'
      },
      {
        name: 'Kyphoplasty',
        indications: 'Same as vertebroplasty, may restore vertebral height',
        procedure: [
          'Balloon inserted to create cavity and restore height',
          'Cavity filled with bone cement',
          'May reduce kyphosis'
        ],
        recovery: 'Same as vertebroplasty',
        successRate: '80-90% pain relief'
      }
    ],
    
    faqs: [
      {
        question: 'Will my compression fracture heal on its own?',
        answer: 'Most compression fractures heal within 8-12 weeks with conservative treatment. However, they may heal in a compressed position, leading to permanent height loss and kyphosis. Vertebroplasty/kyphoplasty can provide faster pain relief and may prevent further collapse.'
      },
      {
        question: 'How can I prevent future compression fractures?',
        answer: 'Treat underlying osteoporosis with medication, calcium, and vitamin D. Weight-bearing exercise strengthens bones. Fall prevention strategies are crucial. Regular bone density monitoring helps track treatment effectiveness.'
      }
    ],
    
    relatedConditions: [],
    relatedTreatments: ['vertebroplasty', 'kyphoplasty', 'spinal-decompression'],
    
    seoKeywords: 'vertebral compression fracture treatment Hyderabad, vertebroplasty, kyphoplasty, osteoporosis fracture, spine doctor Hyderabad',
    metaDescription: 'Expert vertebral compression fracture treatment in Hyderabad. Dr. B Harsha Vardhana Reddy offers vertebroplasty and kyphoplasty. Complete guide to spinal fracture care.'
  },
  
  {
    id: 'pcl-injury',
    name: 'PCL Injury & Multi-Ligament Knee',
    slug: 'pcl-injury',
    category: 'Sports Injury',
    icon: '🏃',
    shortDescription: 'Posterior cruciate ligament injury, often from dashboard injury or sports trauma.',
    
    overview: `The posterior cruciate ligament (PCL) is the strongest ligament in the knee. PCL injuries are less common than ACL tears but can be devastating, especially in multi-ligament injuries. Dr. B Harsha Vardhana Reddy specializes in complex knee ligament reconstruction.`,
    
    causes: [
      'Dashboard injury: Knee hitting dashboard in car accident',
      'Fall on bent knee with foot pointed down',
      'Sports collision to front of knee',
      'Hyperflexion injury'
    ],
    
    symptoms: [
      { name: 'Knee instability', description: 'Feeling of knee giving way, especially going downstairs' },
      { name: 'Posterior knee pain', description: 'Pain behind the knee' },
      { name: 'Swelling', description: 'May be less dramatic than ACL tears' },
      { name: 'Difficulty with deceleration', description: 'Pain when slowing down' }
    ],
    
    diagnosis: [
      { name: 'Physical Examination', description: 'Posterior drawer test, quadriceps active test, dial test' },
      { name: 'MRI Scan', description: 'Confirms PCL tear, shows associated injuries' },
      { name: 'Stress X-rays', description: 'Quantifies posterior tibial translation' }
    ],
    
    nonSurgicalTreatments: [
      {
        name: 'Rehabilitation Protocol',
        link: '/treatments/physical-therapy',
        details: [
          'Isolated PCL tears may be treated conservatively',
          'Focus on quadriceps strengthening (prevents posterior sag)',
          'Avoid hamstring exercises initially (pulls tibia backward)',
          'Progressive weight bearing',
          'Functional bracing for activities'
        ],
        indications: 'Isolated Grade I-II PCL tears, low-demand patients'
      }
    ],
    
    surgicalTreatments: [
      {
        name: 'PCL Reconstruction',
        link: '/treatments/pcl-reconstruction',
        indications: 'Grade III tears, combined injuries, symptomatic instability',
        procedure: [
          'Arthroscopic or open technique',
          'Achilles tendon allograft commonly used',
          'Single or double bundle reconstruction',
          'Tibial inlay technique for better graft healing'
        ],
        recovery: '9-12 months return to sport',
        successRate: '80-90% good to excellent results'
      },
      {
        name: 'Multi-Ligament Reconstruction',
        indications: 'Knee dislocation with multiple ligament tears',
        procedure: 'Staged or single-stage reconstruction of all damaged ligaments',
        recovery: '12-18 months',
        successRate: '70-80% return to pre-injury activity'
      }
    ],
    
    faqs: [
      {
        question: 'Can a PCL tear heal without surgery?',
        answer: 'Unlike ACL tears, isolated PCL tears have some healing potential with conservative treatment. Grade I-II tears in low-demand patients often do well with rehabilitation. Surgery is usually needed for Grade III tears, combined injuries, or persistent instability.'
      },
      {
        question: 'How does PCL injury differ from ACL injury?',
        answer: 'PCL tears cause posterior instability (knee sags backward) while ACL tears cause anterior instability. PCL injuries often occur from direct trauma, while ACL tears usually occur with pivoting. PCL rehabilitation focuses on quadriceps, ACL on hamstrings.'
      }
    ],
    
    relatedConditions: ['acl-tear', 'meniscus-tear'],
    relatedTreatments: ['pcl-reconstruction', 'multi-ligament-reconstruction'],
    
    seoKeywords: 'PCL injury treatment Hyderabad, PCL reconstruction, knee ligament surgery, multi-ligament knee injury, best knee surgeon Hyderabad',
    metaDescription: 'Expert PCL injury treatment in Hyderabad. Dr. B Harsha Vardhana Reddy offers PCL reconstruction surgery. Complete guide to diagnosis and recovery.'
  },
  
  {
    id: 'fracture-trauma',
    name: 'Complex Fractures & Trauma',
    slug: 'complex-fractures',
    category: 'Trauma',
    icon: '🩹',
    shortDescription: 'Severe bone fractures from accidents requiring surgical fixation.',
    
    overview: `Complex fractures require specialized surgical treatment to restore bone alignment and function. Dr. B Harsha Vardhana Reddy has extensive experience in trauma surgery, using modern techniques including minimally invasive fixation, intramedullary nailing, and external fixation for complex injuries.`,
    
    causes: [
      'Road traffic accidents',
      'Falls from height',
      'Sports injuries',
      'Industrial accidents',
      'Osteoporotic fractures'
    ],
    
    symptoms: [
      { name: 'Severe pain', description: 'Intense pain at fracture site' },
      { name: 'Deformity', description: 'Visible angulation or shortening' },
      { name: 'Swelling and bruising', description: 'Rapid onset' },
      { name: 'Inability to move', description: 'Cannot use affected limb' },
      { name: 'Open wound', description: 'Bone visible in open fractures' }
    ],
    
    surgicalTreatments: [
      {
        name: 'ORIF (Open Reduction Internal Fixation)',
        link: '/treatments/fracture-fixation',
        indications: 'Displaced fractures requiring anatomic reduction',
        procedure: [
          'Open approach to fracture site',
          'Reduction of bone fragments',
          'Fixation with plates and screws',
          'Fluoroscopy guidance'
        ],
        recovery: '6-12 weeks for bone healing',
        successRate: 'Dependent on fracture type'
      },
      {
        name: 'Intramedullary Nailing',
        indications: 'Long bone fractures (femur, tibia)',
        procedure: [
          'Nail inserted through bone canal',
          'Minimal soft tissue disruption',
          'Locking screws for stability'
        ],
        recovery: '6-12 weeks, early weight bearing possible',
        successRate: '90-95% union rates'
      },
      {
        name: 'External Fixation',
        indications: 'Open fractures, damage control, severe soft tissue injury',
        procedure: 'Pins and external frame to stabilize bone',
        recovery: 'Variable, often converted to internal fixation later'
      }
    ],
    
    faqs: [
      {
        question: 'How long does a fracture take to heal?',
        answer: 'Most fractures heal in 6-12 weeks. Factors affecting healing include fracture location and type, age, smoking, diabetes, and adequacy of fixation. Some complex fractures may take longer.'
      },
      {
        question: 'Will I need to remove the metal plates and screws?',
        answer: 'Routine removal is not necessary unless implants cause symptoms (pain, prominence) or in young patients for future surgery access. Intramedullary nails are usually left in place permanently.'
      }
    ],
    
    relatedConditions: ['spinal-fracture'],
    relatedTreatments: ['fracture-fixation', 'external-fixation'],
    
    seoKeywords: 'fracture surgery Hyderabad, trauma surgeon, complex fracture treatment, ORIF surgery, best orthopedic trauma surgeon Hyderabad',
    metaDescription: 'Expert fracture and trauma surgery in Hyderabad. Dr. B Harsha Vardhana Reddy offers ORIF, nailing, and complex fracture care. Complete guide to fracture treatment.'
  },
  
  {
    id: 'bursitis',
    name: 'Hip & Shoulder Bursitis',
    slug: 'bursitis',
    category: 'Hip',
    icon: '💊',
    shortDescription: 'Inflammation of fluid-filled sacs (bursae) around joints.',
    
    overview: `Bursitis is inflammation of the bursae - small fluid-filled sacs that cushion bones, tendons, and muscles near joints. It commonly affects the hip (trochanteric bursitis) and shoulder (subacromial bursitis). Dr. B Harsha Vardhana Reddy offers comprehensive treatment from conservative care to surgical intervention.`,
    
    causes: [
      'Repetitive movements or positions',
      'Prolonged pressure: Sitting, leaning on elbow',
      'Injury or trauma',
      'Underlying conditions: Arthritis, gout',
      'Muscle weakness or imbalance',
      'Leg length discrepancy (hip bursitis)'
    ],
    
    symptoms: [
      { name: 'Joint pain', description: 'Aching or stiffness at affected area' },
      { name: 'Swelling', description: 'Visible swelling in some locations' },
      { name: 'Tenderness', description: 'Pain when pressing on bursa' },
      { name: 'Pain with movement', description: 'Especially specific activities' },
      { name: 'Night pain', description: 'Lying on affected hip' }
    ],
    
    nonSurgicalTreatments: [
      {
        name: 'Rest and Activity Modification',
        details: [
          'Avoid aggravating activities',
          'Use cushioning when sitting',
          'Sleep on opposite side with pillow between knees'
        ]
      },
      {
        name: 'Physical Therapy',
        link: '/treatments/physical-therapy',
        details: [
          'Hip bursitis:',
          '- IT band stretching',
          '- Gluteal strengthening (bridges, clamshells)',
          '- Core stability exercises',
          'Shoulder bursitis:',
          '- Rotator cuff strengthening',
          '- Scapular stabilization',
          '- Posture correction'
        ]
      },
      {
        name: 'Corticosteroid Injections',
        details: [
          'Ultrasound-guided injection into bursa',
          'Provides significant relief',
          'May be repeated if necessary'
        ]
      }
    ],
    
    surgicalTreatments: [
      {
        name: 'Arthroscopic Bursectomy',
        indications: 'Failed conservative treatment after 6-12 months',
        procedure: 'Keyhole removal of inflamed bursa',
        recovery: '2-6 weeks',
        successRate: '80-90% improvement'
      }
    ],
    
    faqs: [
      {
        question: 'How long does bursitis take to heal?',
        answer: 'Acute bursitis often improves within 2-3 weeks with rest and treatment. Chronic bursitis may take longer and require more comprehensive treatment including physical therapy and injections.'
      },
      {
        question: 'Will bursitis come back?',
        answer: 'Bursitis can recur if underlying causes (muscle weakness, poor posture, repetitive activities) are not addressed. Physical therapy to strengthen surrounding muscles and correct biomechanics helps prevent recurrence.'
      }
    ],
    
    relatedConditions: ['hip-arthritis', 'rotator-cuff'],
    relatedTreatments: ['physical-therapy', 'corticosteroid-injections'],
    
    seoKeywords: 'bursitis treatment Hyderabad, hip bursitis, trochanteric bursitis, shoulder bursitis, hip pain doctor Hyderabad',
    metaDescription: 'Expert bursitis treatment in Hyderabad. Dr. B Harsha Vardhana Reddy offers injections and physical therapy for hip and shoulder bursitis.'
  },
  
  {
    id: 'patella-dislocation',
    name: 'Patellar Dislocation & Instability',
    slug: 'patellar-dislocation',
    category: 'Knee',
    icon: '🦵',
    shortDescription: 'Kneecap dislocation or repeated subluxation causing anterior knee pain.',
    
    overview: `Patellar dislocation occurs when the kneecap slips out of its groove on the thighbone. It most commonly affects young active individuals. Recurrent dislocations can damage cartilage and lead to patellofemoral arthritis. Dr. B Harsha Vardhana Reddy specializes in patellar stabilization surgery including MPFL reconstruction.`,
    
    causes: [
      'Acute injury: Twisting, direct blow',
      'Anatomy: Shallow trochlear groove, high-riding patella',
      'Ligament laxity: Loose MPFL ligament',
      'Malalignment: Increased Q-angle, femoral anteversion',
      'Muscle imbalance: Weak VMO muscle'
    ],
    
    symptoms: [
      { name: 'Kneecap slips out', description: 'Visible dislocation, usually to outer side' },
      { name: 'Severe pain', description: 'During and after dislocation' },
      { name: 'Swelling', description: 'Rapid joint effusion' },
      { name: 'Apprehension', description: 'Fear of kneecap slipping during activity' },
      { name: 'Anterior knee pain', description: 'Pain around kneecap' }
    ],
    
    diagnosis: [
      { name: 'Physical Examination', description: 'Apprehension test, J-sign, patellar tracking' },
      { name: 'X-rays', description: 'Merchant view shows patellar alignment' },
      { name: 'MRI', description: 'Shows MPFL injury, cartilage damage, bone bruising' },
      { name: 'CT Scan', description: 'Measures TT-TG distance, trochlear morphology' }
    ],
    
    nonSurgicalTreatments: [
      {
        name: 'Initial Management',
        details: [
          'Reduction if still dislocated',
          'Immobilization in extension brace: 2-4 weeks',
          'Ice and compression',
          'Protected weight bearing'
        ]
      },
      {
        name: 'Rehabilitation Protocol',
        link: '/treatments/physical-therapy',
        details: [
          'Phase 1: ROM, quadriceps activation (especially VMO)',
          'Phase 2: Progressive strengthening',
          '- VMO strengthening: Terminal knee extension, mini squats',
          '- Hip abductor and external rotator strengthening',
          '- Core stability',
          'Phase 3: Proprioception and sport-specific training',
          'Patellar taping or bracing for activity'
        ]
      }
    ],
    
    surgicalTreatments: [
      {
        name: 'MPFL Reconstruction',
        link: '/treatments/mpfl-reconstruction',
        indications: 'Recurrent dislocations, failed conservative treatment',
        procedure: [
          'Reconstruction of medial patellofemoral ligament',
          'Using hamstring tendon graft',
          'Anatomic attachment to patella and femur'
        ],
        recovery: '4-6 months return to sport',
        successRate: '90-95% prevention of recurrence'
      },
      {
        name: 'Tibial Tubercle Osteotomy',
        indications: 'Increased TT-TG distance, patellar malalignment',
        procedure: 'Moving tibial tubercle to improve patellar tracking',
        recovery: '4-6 months',
        successRate: '85-90% good results'
      },
      {
        name: 'Trochleoplasty',
        indications: 'Severe trochlear dysplasia (flat groove)',
        procedure: 'Deepening of trochlear groove',
        recovery: '6-9 months',
        successRate: '80-90% in selected patients'
      }
    ],
    
    faqs: [
      {
        question: 'Will my kneecap keep dislocating?',
        answer: 'After a first dislocation, the recurrence risk is 15-40%, higher in younger patients with anatomic risk factors. If you have two or more dislocations, recurrence risk is very high (>50%) without surgery.'
      },
      {
        question: 'Do I need surgery after my first patellar dislocation?',
        answer: 'Most first-time dislocations are treated conservatively with bracing and physical therapy. Surgery may be considered for first-time dislocators with significant cartilage injury, loose bodies, or high-risk anatomy.'
      }
    ],
    
    relatedConditions: ['knee-arthritis', 'meniscus-tear'],
    relatedTreatments: ['mpfl-reconstruction', 'tibial-tubercle-osteotomy', 'physical-therapy'],
    
    seoKeywords: 'patellar dislocation treatment Hyderabad, MPFL reconstruction, kneecap instability, patellar tracking disorder, best knee surgeon Hyderabad',
    metaDescription: 'Expert patellar dislocation treatment in Hyderabad. Dr. B Harsha Vardhana Reddy offers MPFL reconstruction surgery. Complete guide to kneecap instability.'
  }
];

// Export categories for filtering
export const conditionCategories = [
  'All',
  'Knee',
  'Hip',
  'Shoulder',
  'Elbow',
  'Hand & Wrist',
  'Foot & Ankle',
  'Sports Injury',
  'Trauma',
  'Spine'
];

// Helper function to get condition by slug
export const getConditionBySlug = (slug) => {
  return conditionsDetailed.find(c => c.slug === slug || c.id === slug);
};

// Helper function to get related conditions
export const getRelatedConditions = (conditionId) => {
  const condition = conditionsDetailed.find(c => c.id === conditionId);
  if (!condition) return [];
  return condition.relatedConditions.map(id => conditionsDetailed.find(c => c.id === id)).filter(Boolean);
};
