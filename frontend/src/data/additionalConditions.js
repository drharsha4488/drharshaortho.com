// Additional SEO Condition Pages - Comprehensive Orthopedic Conditions
// Targeting high-search-volume and long-tail keywords

export const additionalConditions = [
  // ============ HIP CONDITIONS ============
  {
    id: 'avascular-necrosis-avn',
    slug: 'avascular-necrosis-avn',
    name: 'Avascular Necrosis (AVN)',
    category: 'Hip',
    icon: '🦴',
    shortDescription: 'Bone death due to loss of blood supply, commonly affecting the hip joint.',
    imageUrl: 'https://images.pexels.com/photos/7446990/pexels-photo-7446990.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'AVN Treatment in Hyderabad | Avascular Necrosis Hip | Dr. Harsha Reddy',
    metaDescription: 'Expert AVN (avascular necrosis) treatment in Hyderabad. Dr. Harsha offers core decompression, hip replacement for AVN. Early diagnosis for best outcomes.',
    keywords: 'AVN treatment hyderabad, avascular necrosis hip, bone death treatment, AVN hip replacement, osteonecrosis treatment',
    overview: `Avascular necrosis (AVN), also called osteonecrosis, occurs when bone tissue dies due to lack of blood supply. The hip is most commonly affected. Without treatment, AVN leads to joint collapse and severe arthritis. Early diagnosis and treatment are crucial for the best outcomes.`,
    causes: [
      'Steroid use (most common cause in India)',
      'Excessive alcohol consumption',
      'Hip trauma or fracture',
      'Blood disorders (sickle cell disease)',
      'Radiation therapy',
      'Autoimmune conditions',
      'Idiopathic (no known cause)'
    ],
    symptoms: [
      'Groin pain that worsens with activity',
      'Pain in the buttock or thigh',
      'Limping or difficulty walking',
      'Stiffness in the hip joint',
      'Pain that progresses over weeks to months',
      'Decreased range of motion'
    ],
    stages: [
      { stage: 'Stage 1', description: 'Normal X-ray, MRI shows changes', treatment: 'Core decompression, medications, restricted weight bearing' },
      { stage: 'Stage 2', description: 'Sclerosis visible on X-ray, no collapse', treatment: 'Core decompression with bone grafting' },
      { stage: 'Stage 3', description: 'Crescent sign, early femoral head collapse', treatment: 'Hip resurfacing or replacement consideration' },
      { stage: 'Stage 4', description: 'Femoral head collapsed, secondary arthritis', treatment: 'Total hip replacement' }
    ],
    treatments: [
      { name: 'Core Decompression', description: 'Drilling into bone to reduce pressure and stimulate new blood vessel growth', forStages: 'Stage 1-2', success: '70-80% in early stages' },
      { name: 'Bone Grafting', description: 'Transplanting healthy bone to support the affected area', forStages: 'Stage 2', success: '60-70%' },
      { name: 'Hip Resurfacing', description: 'Preserving femoral head while replacing damaged surfaces', forStages: 'Stage 2-3 in young patients', success: '85-90%' },
      { name: 'Total Hip Replacement', description: 'Replacing the entire hip joint with a prosthesis', forStages: 'Stage 3-4', success: '95%+' }
    ],
    faqs: [
      {
        question: 'Can AVN be cured without surgery?',
        answer: 'In very early stages (Stage 1), AVN may be managed with medications, activity modification, and close monitoring. However, most cases eventually require surgical intervention. Early surgery (core decompression) can prevent progression to collapse.'
      },
      {
        question: 'What causes AVN in young people in India?',
        answer: 'In India, steroid use is the leading cause of AVN in young people. Steroids are often prescribed for respiratory conditions, skin problems, or joint pain, and sometimes taken without prescription. Excessive alcohol consumption is the second most common cause.'
      },
      {
        question: 'How long can I delay hip replacement for AVN?',
        answer: 'This depends on your AVN stage and symptoms. Early stages (1-2) may be managed with joint-preserving surgeries. Once significant collapse occurs (Stage 3-4), hip replacement becomes necessary. Delaying too long can make surgery more complex and recovery longer.'
      },
      {
        question: 'Is AVN hereditary?',
        answer: 'AVN itself is not directly hereditary, but some underlying conditions that increase AVN risk (like sickle cell disease or clotting disorders) can be inherited. If you have family history of AVN, discuss risk factors with your doctor.'
      }
    ],
    relatedConditions: ['hip-arthritis'],
    relatedTreatments: ['total-hip-replacement', 'hip-arthroscopy']
  },
  {
    id: 'hip-labral-tear',
    slug: 'hip-labral-tear',
    name: 'Hip Labral Tear',
    category: 'Hip',
    icon: '🦴',
    shortDescription: 'Tear in the ring of cartilage (labrum) surrounding the hip socket.',
    imageUrl: 'https://images.pexels.com/photos/7446990/pexels-photo-7446990.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Hip Labral Tear Treatment Hyderabad | Dr. Harsha Reddy',
    metaDescription: 'Expert hip labral tear treatment in Hyderabad. Arthroscopic labral repair by Dr. Harsha. Minimally invasive surgery for hip pain and clicking.',
    keywords: 'hip labral tear treatment, hip labrum surgery, hip arthroscopy hyderabad, FAI treatment, hip clicking pain',
    overview: `A hip labral tear involves damage to the ring of cartilage (labrum) that follows the outside rim of the hip socket. The labrum helps hold the ball of the thighbone securely within the hip socket and provides stability. Tears can cause pain, stiffness, and a locking or clicking sensation.`,
    causes: [
      'Femoroacetabular impingement (FAI)',
      'Hip dysplasia (shallow hip socket)',
      'Traumatic injury or dislocation',
      'Repetitive motions (athletes, dancers)',
      'Degenerative changes with aging',
      'Structural abnormalities'
    ],
    symptoms: [
      'Deep groin pain or pain in front of hip',
      'Clicking, locking, or catching sensation',
      'Stiffness or limited range of motion',
      'Pain that worsens with prolonged sitting',
      'Pain during or after sports activities',
      'Feeling of hip instability'
    ],
    treatments: [
      { name: 'Conservative Treatment', description: 'Physical therapy, activity modification, anti-inflammatory medications', success: '40-50% for small tears' },
      { name: 'Hip Arthroscopy', description: 'Minimally invasive surgery to repair or debride the labrum', success: '85-90%' },
      { name: 'Labral Reconstruction', description: 'Using graft tissue to reconstruct severely damaged labrum', success: '80-85%' }
    ],
    faqs: [
      {
        question: 'Can a hip labral tear heal on its own?',
        answer: 'Small labral tears may become asymptomatic with rest and physical therapy, but the tissue itself has limited blood supply and rarely heals completely. Many people manage symptoms without surgery, but larger tears typically require arthroscopic repair.'
      },
      {
        question: 'How long is recovery from hip labral repair?',
        answer: 'Most patients use crutches for 2-4 weeks, begin physical therapy immediately, and return to normal activities in 3-4 months. Return to sports takes 4-6 months depending on the sport and extent of repair.'
      }
    ],
    relatedConditions: ['hip-arthritis'],
    relatedTreatments: ['hip-arthroscopy', 'total-hip-replacement']
  },
  {
    id: 'hip-bursitis',
    slug: 'hip-bursitis',
    name: 'Hip Bursitis (Trochanteric Bursitis)',
    category: 'Hip',
    icon: '🦴',
    shortDescription: 'Inflammation of the bursa on the outer side of the hip causing lateral hip pain.',
    imageUrl: 'https://images.pexels.com/photos/7446990/pexels-photo-7446990.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Hip Bursitis Treatment Hyderabad | Trochanteric Bursitis | Dr. Harsha',
    metaDescription: 'Expert hip bursitis treatment in Hyderabad. Non-surgical and injection options for lateral hip pain. Quick relief from trochanteric bursitis.',
    keywords: 'hip bursitis treatment, trochanteric bursitis, lateral hip pain, hip injection, greater trochanter pain',
    overview: `Hip bursitis, also known as trochanteric bursitis, is inflammation of the bursa located near the greater trochanter (bony prominence on the outer hip). It causes pain on the outside of the hip that may radiate down the thigh. It's common in middle-aged women and runners.`,
    causes: [
      'Repetitive stress or overuse',
      'Hip injury or trauma',
      'Spine problems (scoliosis, arthritis)',
      'Leg length inequality',
      'Previous hip surgery',
      'Rheumatoid arthritis',
      'Bone spurs or calcium deposits'
    ],
    symptoms: [
      'Pain on the outer hip and thigh',
      'Pain when lying on affected side',
      'Pain climbing stairs or getting up from chair',
      'Tenderness when pressing on outer hip',
      'Pain that worsens with prolonged walking',
      'Swelling over the hip (less common)'
    ],
    treatments: [
      { name: 'Rest and Ice', description: 'Activity modification and cryotherapy', success: '50-60%' },
      { name: 'Physical Therapy', description: 'Hip strengthening and stretching exercises', success: '70-80%' },
      { name: 'Corticosteroid Injection', description: 'Ultrasound-guided steroid injection into bursa', success: '80-90% short-term relief' },
      { name: 'PRP Injection', description: 'Platelet-rich plasma for chronic cases', success: '70-75%' },
      { name: 'Bursectomy', description: 'Surgical removal of the bursa (rare)', success: '90%+', indication: 'Failed conservative treatment' }
    ],
    faqs: [
      {
        question: 'How long does hip bursitis last?',
        answer: 'With proper treatment, most cases improve within 6-8 weeks. However, without addressing underlying causes, bursitis can become chronic and recur. Physical therapy to correct muscle imbalances is key for long-term relief.'
      },
      {
        question: 'Is walking good for hip bursitis?',
        answer: 'Gentle walking on flat surfaces is usually fine and can help maintain mobility. However, avoid prolonged walking, hiking, or stair climbing during the acute phase. Once pain improves, gradually increase activity with your therapist\'s guidance.'
      }
    ],
    relatedConditions: ['hip-arthritis'],
    relatedTreatments: ['hip-arthroscopy', 'prp-therapy']
  },

  // ============ SHOULDER CONDITIONS ============
  {
    id: 'shoulder-impingement',
    slug: 'shoulder-impingement',
    name: 'Shoulder Impingement Syndrome',
    category: 'Shoulder',
    icon: '💪',
    shortDescription: 'Painful pinching of rotator cuff tendons when raising the arm overhead.',
    imageUrl: 'https://images.pexels.com/photos/7298879/pexels-photo-7298879.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Shoulder Impingement Treatment Hyderabad | Subacromial Impingement | Dr. Harsha',
    metaDescription: 'Expert shoulder impingement treatment in Hyderabad. Non-surgical and arthroscopic options for shoulder pain when lifting arm. Book consultation today.',
    keywords: 'shoulder impingement hyderabad, subacromial impingement, shoulder pain lifting arm, shoulder bursitis treatment, rotator cuff impingement',
    overview: `Shoulder impingement syndrome occurs when the rotator cuff tendons get pinched between the arm bone (humerus) and the shoulder blade (acromion). This causes pain when raising the arm, especially overhead. It's common in people who do repetitive overhead activities like painting, swimming, or tennis.`,
    causes: [
      'Repetitive overhead activities',
      'Bone spurs on the acromion',
      'Thickened bursa (bursitis)',
      'Rotator cuff weakness or tears',
      'Poor posture (rounded shoulders)',
      'Age-related changes',
      'Shoulder instability'
    ],
    symptoms: [
      'Pain when reaching overhead or behind back',
      'Pain at night, especially lying on affected side',
      'Weakness when lifting or rotating arm',
      'Clicking or grinding sensation',
      'Progressive loss of motion if untreated',
      'Pain radiating from front of shoulder to arm'
    ],
    treatments: [
      { name: 'Physical Therapy', description: 'Stretching, strengthening, and posture correction', success: '60-70%', timeline: '6-12 weeks' },
      { name: 'Corticosteroid Injection', description: 'Injection into subacromial space to reduce inflammation', success: '70-80% temporary relief' },
      { name: 'Arthroscopic Decompression', description: 'Keyhole surgery to remove bone spur and create more space', success: '85-90%', timeline: '3-6 months recovery' }
    ],
    faqs: [
      {
        question: 'How do I know if I have shoulder impingement?',
        answer: 'Key signs include pain when raising arm overhead, pain at night, and the "painful arc" - pain between 60-120 degrees of arm elevation. Your doctor can confirm with clinical tests (Neer test, Hawkins test) and imaging.'
      },
      {
        question: 'Can shoulder impingement heal without surgery?',
        answer: 'Yes, 60-70% of patients improve with conservative treatment including physical therapy, activity modification, and possibly injections. Surgery is considered after 3-6 months of failed conservative care.'
      }
    ],
    relatedConditions: ['rotator-cuff-tear', 'frozen-shoulder'],
    relatedTreatments: ['shoulder-arthroscopy', 'rotator-cuff-repair']
  },
  {
    id: 'shoulder-arthritis',
    slug: 'shoulder-arthritis',
    name: 'Shoulder Arthritis',
    category: 'Shoulder',
    icon: '💪',
    shortDescription: 'Degenerative wear of the shoulder joint causing pain and stiffness.',
    imageUrl: 'https://images.pexels.com/photos/7298879/pexels-photo-7298879.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Shoulder Arthritis Treatment Hyderabad | Glenohumeral Arthritis | Dr. Harsha',
    metaDescription: 'Expert shoulder arthritis treatment in Hyderabad. From injections to shoulder replacement. Comprehensive care for shoulder joint pain and stiffness.',
    keywords: 'shoulder arthritis treatment, glenohumeral arthritis, shoulder joint pain, shoulder replacement hyderabad, shoulder osteoarthritis',
    overview: `Shoulder arthritis refers to degenerative changes in the glenohumeral (ball-and-socket) joint of the shoulder. As cartilage wears away, bone rubs on bone causing pain, stiffness, and grinding. While less common than knee or hip arthritis, it can significantly impact daily activities.`,
    causes: [
      'Osteoarthritis (wear and tear)',
      'Rheumatoid arthritis',
      'Post-traumatic arthritis (after fracture)',
      'Rotator cuff tear arthropathy',
      'Avascular necrosis',
      'Previous shoulder surgery'
    ],
    symptoms: [
      'Deep, aching shoulder pain',
      'Pain worsening with activity',
      'Stiffness, especially in morning',
      'Grinding or clicking sensation',
      'Decreased range of motion',
      'Night pain affecting sleep',
      'Difficulty reaching overhead or behind back'
    ],
    treatments: [
      { name: 'Activity Modification', description: 'Avoiding aggravating activities' },
      { name: 'Physical Therapy', description: 'Strengthening and range of motion exercises' },
      { name: 'Medications', description: 'NSAIDs, acetaminophen for pain relief' },
      { name: 'Corticosteroid Injection', description: 'Intra-articular steroid for temporary relief', frequency: 'Every 3-4 months max' },
      { name: 'Viscosupplementation', description: 'Hyaluronic acid injection', success: '50-60%' },
      { name: 'Shoulder Replacement', description: 'Anatomic or reverse total shoulder replacement', success: '90-95%', indication: 'Failed conservative treatment' }
    ],
    faqs: [
      {
        question: 'What type of shoulder replacement do I need?',
        answer: 'Anatomic shoulder replacement is used when the rotator cuff is intact. Reverse shoulder replacement is preferred when the rotator cuff is torn or deficient, as it relies on the deltoid muscle for arm movement. Dr. Harsha will recommend the best option based on your specific condition.'
      }
    ],
    relatedConditions: ['rotator-cuff-tear', 'frozen-shoulder'],
    relatedTreatments: ['shoulder-replacement', 'shoulder-arthroscopy']
  },
  {
    id: 'slap-tear',
    slug: 'slap-tear',
    name: 'SLAP Tear (Superior Labral Tear)',
    category: 'Shoulder',
    icon: '💪',
    shortDescription: 'Tear in the top part of the shoulder labrum where the biceps tendon attaches.',
    imageUrl: 'https://images.pexels.com/photos/7298879/pexels-photo-7298879.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'SLAP Tear Treatment Hyderabad | Superior Labral Tear | Dr. Harsha',
    metaDescription: 'Expert SLAP tear treatment in Hyderabad. Arthroscopic SLAP repair for shoulder pain and instability. Specialized care for throwing athletes.',
    keywords: 'SLAP tear treatment, superior labral tear, shoulder labrum tear, SLAP repair hyderabad, throwing shoulder injury',
    overview: `A SLAP (Superior Labrum Anterior to Posterior) tear is an injury to the top of the shoulder labrum, where the biceps tendon attaches. Common in throwing athletes, these tears can cause shoulder pain, weakness, and a catching sensation. Treatment depends on tear type, age, and activity level.`,
    causes: [
      'Repetitive overhead motions (throwing, swimming)',
      'Fall onto outstretched arm',
      'Sudden pulling on the arm',
      'Motor vehicle accident',
      'Wear and degeneration (older patients)',
      'Heavy lifting'
    ],
    symptoms: [
      'Deep shoulder pain, hard to pinpoint',
      'Pain with overhead activities',
      'Catching, locking, or popping',
      'Decreased throwing velocity or accuracy',
      'Feeling of shoulder instability',
      'Pain when lifting objects'
    ],
    types: [
      { type: 'Type I', description: 'Fraying of superior labrum, biceps anchor intact', treatment: 'Debridement' },
      { type: 'Type II', description: 'Labrum and biceps tendon detached from glenoid', treatment: 'SLAP repair' },
      { type: 'Type III', description: 'Bucket-handle tear of labrum, biceps intact', treatment: 'Debridement' },
      { type: 'Type IV', description: 'Bucket-handle tear extending into biceps tendon', treatment: 'Repair or biceps tenodesis' }
    ],
    treatments: [
      { name: 'Physical Therapy', description: 'Rotator cuff and scapular strengthening', success: '50-60% for Type I' },
      { name: 'Arthroscopic SLAP Repair', description: 'Reattaching labrum to bone with anchors', success: '80-85% in young athletes' },
      { name: 'Biceps Tenodesis', description: 'Moving biceps attachment from labrum to humerus', success: '90%+', indication: 'Older patients or failed repair' }
    ],
    faqs: [
      {
        question: 'Can I return to throwing sports after SLAP repair?',
        answer: 'Yes, but it requires 9-12 months of rehabilitation. Return-to-throw programs are gradual and sport-specific. Success rates for returning to pre-injury level vary from 70-85% depending on sport and tear type.'
      }
    ],
    relatedConditions: ['rotator-cuff-tear', 'shoulder-dislocation'],
    relatedTreatments: ['shoulder-arthroscopy', 'bankart-repair']
  },

  // ============ ELBOW CONDITIONS ============
  {
    id: 'golfers-elbow',
    slug: 'golfers-elbow',
    name: "Golfer's Elbow (Medial Epicondylitis)",
    category: 'Elbow',
    icon: '💪',
    shortDescription: 'Pain and inflammation on the inner side of the elbow from overuse.',
    imageUrl: 'https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: "Golfer's Elbow Treatment Hyderabad | Medial Epicondylitis | Dr. Harsha",
    metaDescription: "Expert golfer's elbow treatment in Hyderabad. PRP injection, shockwave therapy for inner elbow pain. Return to golf and sports faster.",
    keywords: 'golfers elbow treatment, medial epicondylitis, inner elbow pain, elbow tendinitis, golf injury treatment',
    overview: `Golfer's elbow (medial epicondylitis) causes pain and inflammation on the inner side of the elbow, where the forearm flexor tendons attach. Despite its name, it affects more than just golfers - any repetitive wrist flexing or gripping activity can cause it.`,
    causes: [
      'Golf swing (improper technique)',
      'Throwing sports (baseball, javelin)',
      'Racket sports (forehand strokes)',
      'Weight training (curls, pull-ups)',
      'Repetitive occupational activities',
      'Typing or computer mouse use'
    ],
    symptoms: [
      'Pain and tenderness on inner elbow',
      'Pain extending down the inner forearm',
      'Weakness in hands and wrists',
      'Stiffness in the elbow',
      'Pain when making a fist',
      'Numbness or tingling in fingers (ring and little finger)'
    ],
    treatments: [
      { name: 'Rest and Activity Modification', description: 'Avoiding aggravating activities', timeline: '2-4 weeks' },
      { name: 'Physical Therapy', description: 'Eccentric exercises and stretching', success: '80-90%', timeline: '6-12 weeks' },
      { name: 'Bracing', description: 'Forearm counterforce strap' },
      { name: 'Corticosteroid Injection', description: 'Steroid injection for short-term relief', success: '70-80% short-term' },
      { name: 'PRP Injection', description: 'Platelet-rich plasma for chronic cases', success: '70-75%' },
      { name: 'Surgery', description: 'Debridement of damaged tendon', success: '85-90%', indication: '6+ months failed conservative treatment' }
    ],
    faqs: [
      {
        question: "What's the difference between golfer's elbow and tennis elbow?",
        answer: "Location of pain is the key difference. Golfer's elbow causes pain on the INNER side of the elbow (medial epicondyle), while tennis elbow causes pain on the OUTER side (lateral epicondyle). Treatment approaches are similar."
      }
    ],
    relatedConditions: ['tennis-elbow', 'carpal-tunnel-syndrome'],
    relatedTreatments: ['prp-therapy']
  },
  {
    id: 'cubital-tunnel-syndrome',
    slug: 'cubital-tunnel-syndrome',
    name: 'Cubital Tunnel Syndrome',
    category: 'Elbow',
    icon: '💪',
    shortDescription: 'Compression of the ulnar nerve at the elbow causing numbness in the ring and little fingers.',
    imageUrl: 'https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Cubital Tunnel Syndrome Treatment Hyderabad | Ulnar Nerve | Dr. Harsha',
    metaDescription: 'Expert cubital tunnel syndrome treatment in Hyderabad. Ulnar nerve decompression surgery for elbow numbness and hand weakness.',
    keywords: 'cubital tunnel syndrome, ulnar nerve entrapment, elbow numbness, ulnar nerve surgery, hand weakness elbow',
    overview: `Cubital tunnel syndrome is compression of the ulnar nerve as it passes behind the elbow. It's the second most common nerve compression syndrome after carpal tunnel. It causes numbness in the ring and little fingers, and can lead to hand weakness if untreated.`,
    causes: [
      'Prolonged elbow flexion (sleeping, phone use)',
      'Leaning on elbow repeatedly',
      'Previous elbow fracture or dislocation',
      'Arthritis with bone spurs',
      'Cysts or tumors',
      'Anatomical variations'
    ],
    symptoms: [
      'Numbness and tingling in ring and little fingers',
      'Symptoms worse when elbow is bent',
      'Pain on inner side of elbow',
      'Weakness in grip strength',
      'Difficulty with fine motor tasks',
      'Muscle wasting in severe cases'
    ],
    treatments: [
      { name: 'Activity Modification', description: 'Avoiding prolonged elbow flexion, padding elbow' },
      { name: 'Night Splinting', description: 'Elbow pad or splint to keep elbow straight at night', success: '50-60% mild cases' },
      { name: 'Ulnar Nerve Decompression', description: 'Releasing the nerve from tight structures', success: '85-90%' },
      { name: 'Ulnar Nerve Transposition', description: 'Moving the nerve to front of elbow', success: '85-90%', indication: 'Subluxing nerve or failed decompression' }
    ],
    faqs: [
      {
        question: 'How do I know if I have cubital tunnel or carpal tunnel?',
        answer: 'The affected fingers are different: Cubital tunnel affects the ring and little fingers, while carpal tunnel affects the thumb, index, and middle fingers. Cubital tunnel symptoms worsen with elbow bending; carpal tunnel worsens with wrist flexion.'
      }
    ],
    relatedConditions: ['carpal-tunnel-syndrome', 'tennis-elbow'],
    relatedTreatments: ['carpal-tunnel-release']
  },

  // ============ HAND & WRIST CONDITIONS ============
  {
    id: 'trigger-finger',
    slug: 'trigger-finger',
    name: 'Trigger Finger',
    category: 'Hand',
    icon: '🖐️',
    shortDescription: 'Finger catches or locks when bent and straightens with a snap.',
    imageUrl: 'https://images.pexels.com/photos/4506109/pexels-photo-4506109.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Trigger Finger Treatment Hyderabad | Stenosing Tenosynovitis | Dr. Harsha',
    metaDescription: 'Quick trigger finger treatment in Hyderabad. Injection or minor surgery for finger locking and clicking. Same-day procedure available.',
    keywords: 'trigger finger treatment, stenosing tenosynovitis, finger locking, trigger thumb, finger clicking treatment',
    overview: `Trigger finger (stenosing tenosynovitis) causes a finger to catch, lock, or click when bent. The finger may get stuck in a bent position and suddenly pop straight. It occurs when the tendon sheath becomes inflamed and narrowed. It's common in diabetics and people who do repetitive gripping.`,
    causes: [
      'Repetitive gripping activities',
      'Diabetes mellitus',
      'Rheumatoid arthritis',
      'Gout',
      'Hypothyroidism',
      'More common in women aged 40-60'
    ],
    symptoms: [
      'Finger stiffness, especially in morning',
      'Clicking or popping when moving finger',
      'Finger locks in bent position',
      'Painful snapping when straightening',
      'Tender nodule at base of finger',
      'Multiple fingers may be affected'
    ],
    treatments: [
      { name: 'Rest and Splinting', description: 'Night splint to rest the tendon', success: '50-60% mild cases' },
      { name: 'Steroid Injection', description: 'Corticosteroid injection into tendon sheath', success: '70-80%', note: 'May need 1-2 injections' },
      { name: 'Percutaneous Release', description: 'Needle release of tight pulley in clinic', success: '90%', procedure: 'Office procedure' },
      { name: 'Surgical Release', description: 'Small incision to cut A1 pulley', success: '95-99%', procedure: '15-minute surgery' }
    ],
    faqs: [
      {
        question: 'Is trigger finger surgery painful?',
        answer: 'Trigger finger release is done under local anesthesia. You may feel pressure during the procedure but not pain. Post-operative discomfort is mild and managed with over-the-counter pain relievers. Most patients use their hand for light activities immediately.'
      },
      {
        question: 'Will trigger finger come back after treatment?',
        answer: 'Steroid injections have a 20-30% recurrence rate. Surgical release has less than 3% recurrence and is considered definitive treatment. If you have diabetes, recurrence rates are higher with any treatment.'
      }
    ],
    relatedConditions: ['carpal-tunnel-syndrome'],
    relatedTreatments: ['carpal-tunnel-release']
  },
  {
    id: 'de-quervains-tenosynovitis',
    slug: 'de-quervains-tenosynovitis',
    name: "De Quervain's Tenosynovitis",
    category: 'Hand',
    icon: '🖐️',
    shortDescription: 'Painful condition affecting tendons on the thumb side of the wrist.',
    imageUrl: 'https://images.pexels.com/photos/4506109/pexels-photo-4506109.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: "De Quervain's Tenosynovitis Treatment Hyderabad | Wrist Pain | Dr. Harsha",
    metaDescription: "Expert De Quervain's tenosynovitis treatment in Hyderabad. Injection and surgery for thumb-side wrist pain. Relief for new mothers and texters.",
    keywords: 'de quervains tenosynovitis, wrist tendinitis, thumb pain, mommy thumb, texting thumb',
    overview: `De Quervain's tenosynovitis is a painful condition affecting the tendons on the thumb side of the wrist. It causes pain when turning the wrist, grasping objects, or making a fist. It's common in new mothers (from lifting babies) and people who text frequently.`,
    causes: [
      'Repetitive hand and wrist movements',
      'Lifting babies with thumbs out (new mothers)',
      'Texting and gaming (texting thumb)',
      'Racket sports',
      'Direct trauma to the area',
      'Rheumatoid arthritis'
    ],
    symptoms: [
      'Pain near base of thumb',
      'Swelling near thumb side of wrist',
      'Difficulty gripping or pinching',
      'Pain when moving thumb',
      'Positive Finkelstein test',
      'Catching or snapping sensation'
    ],
    treatments: [
      { name: 'Rest and Splinting', description: 'Thumb spica splint to immobilize', timeline: '4-6 weeks' },
      { name: 'Corticosteroid Injection', description: 'Injection into the first dorsal compartment', success: '80-90%' },
      { name: 'Surgical Release', description: 'Opening the tendon sheath to relieve pressure', success: '95%+', indication: 'Failed conservative treatment' }
    ],
    faqs: [
      {
        question: "How long does De Quervain's take to heal?",
        answer: "With proper treatment, most cases improve within 4-6 weeks. Steroid injection provides relief within days. If symptoms persist beyond 6-8 weeks of conservative treatment, surgery may be recommended."
      }
    ],
    relatedConditions: ['carpal-tunnel-syndrome', 'trigger-finger'],
    relatedTreatments: ['carpal-tunnel-release']
  },
  {
    id: 'ganglion-cyst',
    slug: 'ganglion-cyst',
    name: 'Ganglion Cyst',
    category: 'Hand',
    icon: '🖐️',
    shortDescription: 'Fluid-filled lump near joints or tendons, most common on the wrist.',
    imageUrl: 'https://images.pexels.com/photos/4506109/pexels-photo-4506109.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Ganglion Cyst Treatment Hyderabad | Wrist Lump | Dr. Harsha',
    metaDescription: 'Expert ganglion cyst treatment in Hyderabad. Aspiration or surgical removal for wrist and hand lumps. Quick, effective treatment options.',
    keywords: 'ganglion cyst treatment, wrist lump, hand cyst removal, bible cyst, wrist ganglion',
    overview: `A ganglion cyst is a noncancerous, fluid-filled lump that commonly develops along tendons or joints of the wrist or hand. These cysts can vary in size and may shrink or grow over time. While often painless, they can cause discomfort if they press on nearby nerves.`,
    causes: [
      'Joint or tendon irritation',
      'Repetitive stress on wrist',
      'Previous joint or tendon injury',
      'Osteoarthritis (mucous cysts)',
      'Often idiopathic (unknown cause)',
      'More common in women aged 20-40'
    ],
    symptoms: [
      'Visible lump on wrist or hand',
      'Lump may change size over time',
      'Dull ache or pain if pressing on nerve',
      'Weakness in affected area',
      'Tingling or numbness if near nerve',
      'Usually soft and immobile'
    ],
    treatments: [
      { name: 'Observation', description: 'Watching and waiting if not symptomatic', note: '50% resolve spontaneously' },
      { name: 'Aspiration', description: 'Needle drainage of cyst fluid', success: '50-70%', recurrence: '30-50%' },
      { name: 'Surgical Excision', description: 'Complete removal of cyst and stalk', success: '95%+', recurrence: '5-10%' },
      { name: 'Arthroscopic Excision', description: 'Keyhole removal for volar wrist ganglia', success: '90%+' }
    ],
    faqs: [
      {
        question: 'Should I hit my ganglion cyst with a book?',
        answer: "No! The old 'Bible bump' treatment of hitting the cyst is NOT recommended. It can cause injury to surrounding structures, doesn't remove the cyst root, and has high recurrence. See a doctor for proper treatment."
      }
    ],
    relatedConditions: ['carpal-tunnel-syndrome'],
    relatedTreatments: ['carpal-tunnel-release']
  },

  // ============ FOOT & ANKLE CONDITIONS ============
  {
    id: 'plantar-fasciitis',
    slug: 'plantar-fasciitis',
    name: 'Plantar Fasciitis',
    category: 'Foot',
    icon: '🦶',
    shortDescription: 'Heel pain from inflammation of the tissue connecting heel to toes.',
    imageUrl: 'https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Plantar Fasciitis Treatment Hyderabad | Heel Pain | Dr. Harsha',
    metaDescription: 'Expert plantar fasciitis treatment in Hyderabad. Shockwave therapy, PRP injection for chronic heel pain. Walk pain-free again.',
    keywords: 'plantar fasciitis treatment, heel pain hyderabad, morning heel pain, heel spur treatment, foot pain walking',
    overview: `Plantar fasciitis is the most common cause of heel pain. It involves inflammation of the plantar fascia, a thick band of tissue running across the bottom of the foot connecting the heel to the toes. Pain is typically worst with the first steps in the morning.`,
    causes: [
      'Flat feet or high arches',
      'Tight calf muscles and Achilles tendon',
      'Obesity or sudden weight gain',
      'Prolonged standing (teachers, factory workers)',
      'Sudden increase in activity',
      'Unsupportive footwear',
      'Age 40-60 years'
    ],
    symptoms: [
      'Stabbing heel pain with first morning steps',
      'Pain after prolonged sitting or standing',
      'Pain improves with movement, worsens after',
      'Pain worse after (not during) exercise',
      'Tenderness at heel bottom',
      'Stiffness in the heel'
    ],
    treatments: [
      { name: 'Stretching Exercises', description: 'Calf and plantar fascia stretches', success: '70-80%', timeline: '6-12 weeks' },
      { name: 'Night Splints', description: 'Keep foot stretched while sleeping', success: '70% improvement' },
      { name: 'Orthotics', description: 'Custom or OTC arch supports', timeline: 'Long-term management' },
      { name: 'Corticosteroid Injection', description: 'Ultrasound-guided steroid injection', success: '70% short-term', note: 'Risk of fat pad atrophy' },
      { name: 'Shockwave Therapy (ESWT)', description: 'Sound waves to stimulate healing', success: '70-80%', sessions: '3-5 sessions' },
      { name: 'PRP Injection', description: 'Platelet-rich plasma for chronic cases', success: '75-85%' },
      { name: 'Plantar Fascia Release', description: 'Partial release surgery', success: '90%', indication: '6-12 months failed conservative treatment' }
    ],
    faqs: [
      {
        question: 'Is a heel spur causing my pain?',
        answer: 'Heel spurs are often blamed, but they are usually not the cause of pain. Many people have heel spurs without any symptoms, and many with plantar fasciitis pain have no spur. The pain comes from inflammation of the fascia, not the bone spur.'
      },
      {
        question: 'How long does plantar fasciitis last?',
        answer: 'Most cases resolve within 6-12 months with conservative treatment. About 90% of patients improve with non-surgical treatment. Chronic cases (lasting over a year) may benefit from advanced treatments like shockwave therapy or surgery.'
      }
    ],
    relatedConditions: ['achilles-tendinitis'],
    relatedTreatments: ['prp-therapy']
  },
  {
    id: 'achilles-tendinitis',
    slug: 'achilles-tendinitis',
    name: 'Achilles Tendinitis',
    category: 'Foot',
    icon: '🦶',
    shortDescription: 'Overuse injury causing pain in the heel cord at the back of the leg.',
    imageUrl: 'https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Achilles Tendinitis Treatment Hyderabad | Heel Cord Pain | Dr. Harsha',
    metaDescription: 'Expert Achilles tendinitis treatment in Hyderabad. PRP therapy, shockwave, and surgery for chronic Achilles pain. Get back to running.',
    keywords: 'achilles tendinitis treatment, heel cord pain, achilles tendon pain, calf pain running, achilles injury',
    overview: `Achilles tendinitis is an overuse injury of the Achilles tendon, connecting the calf muscles to the heel bone. It commonly occurs in runners who suddenly increase training intensity and in middle-aged "weekend warriors." It can become chronic if not treated properly.`,
    types: [
      { type: 'Insertional', location: 'Where tendon attaches to heel bone', common: 'Any activity level, bone spurs common' },
      { type: 'Non-insertional', location: 'Middle portion of tendon (2-6cm above heel)', common: 'Younger, active individuals' }
    ],
    causes: [
      'Sudden increase in activity intensity',
      'Tight calf muscles',
      'Flat feet or high arches',
      'Running on hills or uneven surfaces',
      'Worn-out shoes',
      'Training errors',
      'Certain antibiotics (fluoroquinolones)'
    ],
    symptoms: [
      'Pain above the heel, especially after activity',
      'Morning stiffness in the tendon',
      'Thickening of the tendon',
      'Tenderness when squeezing tendon',
      'Pain climbing stairs or hills',
      'Pain after prolonged sitting'
    ],
    treatments: [
      { name: 'RICE Protocol', description: 'Rest, Ice, Compression, Elevation', timeline: 'Initial treatment' },
      { name: 'Eccentric Exercises', description: 'Heel drops to strengthen tendon', success: '60-70%', timeline: '12 weeks' },
      { name: 'Shockwave Therapy', description: 'ESWT to promote healing', success: '75-80%' },
      { name: 'PRP Injection', description: 'Platelet-rich plasma injection', success: '70-80%' },
      { name: 'Surgery', description: 'Debridement or repair of damaged tendon', indication: 'Failed 6+ months conservative treatment' }
    ],
    faqs: [
      {
        question: 'Can I run with Achilles tendinitis?',
        answer: 'During the acute phase, rest from running is recommended. As pain improves, gradual return to running is possible with a modified program. Continue eccentric exercises, use proper footwear, and increase mileage slowly (no more than 10% per week).'
      },
      {
        question: 'What is the difference between Achilles tendinitis and rupture?',
        answer: 'Tendinitis is inflammation/degeneration with gradual onset pain. Rupture is a sudden tear, often felt as a "pop" with immediate inability to push off or stand on toes. Rupture requires urgent evaluation for possible surgery.'
      }
    ],
    relatedConditions: ['plantar-fasciitis', 'ankle-instability'],
    relatedTreatments: ['ankle-ligament-reconstruction', 'prp-therapy']
  },
  {
    id: 'bunions',
    slug: 'bunions',
    name: 'Bunions (Hallux Valgus)',
    category: 'Foot',
    icon: '🦶',
    shortDescription: 'Bony bump at the base of the big toe causing it to angle inward.',
    imageUrl: 'https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Bunion Surgery Hyderabad | Hallux Valgus Correction | Dr. Harsha',
    metaDescription: 'Expert bunion surgery in Hyderabad. Minimally invasive hallux valgus correction. Walk comfortably in normal shoes again.',
    keywords: 'bunion surgery hyderabad, hallux valgus treatment, big toe deformity, bunion correction, toe surgery',
    overview: `A bunion is a bony bump that forms at the base of the big toe. The big toe pushes against the next toe, causing the joint to stick out. Bunions develop slowly over years and can cause significant pain and difficulty wearing shoes. Surgery is the only way to correct the deformity.`,
    causes: [
      'Hereditary foot structure',
      'Tight, narrow, or high-heeled shoes',
      'Flat feet or low arches',
      'Rheumatoid arthritis',
      'Hypermobility',
      'Neuromuscular conditions'
    ],
    symptoms: [
      'Visible bump on inside of foot at big toe',
      'Swelling, redness, or soreness',
      'Pain when wearing shoes',
      'Corns or calluses',
      'Restricted big toe movement',
      'Difficulty finding comfortable shoes'
    ],
    severity: [
      { level: 'Mild', angle: '<20°', treatment: 'Conservative measures, spacers' },
      { level: 'Moderate', angle: '20-40°', treatment: 'Distal or shaft osteotomy' },
      { level: 'Severe', angle: '>40°', treatment: 'Lapidus or base osteotomy' }
    ],
    treatments: [
      { name: 'Supportive Shoes', description: 'Wide toe box, good arch support' },
      { name: 'Bunion Pads', description: 'Cushioning to reduce friction' },
      { name: 'Orthotics', description: 'Custom inserts to redistribute pressure' },
      { name: 'Chevron Osteotomy', description: 'Bone cut and realignment for mild-moderate', recovery: '6-8 weeks in surgical shoe' },
      { name: 'Scarf Osteotomy', description: 'Z-shaped cut for moderate bunions', recovery: '6-8 weeks' },
      { name: 'Minimally Invasive Surgery', description: 'Small incisions for bone correction', recovery: '4-6 weeks' }
    ],
    faqs: [
      {
        question: 'Can bunions be fixed without surgery?',
        answer: 'No. Once a bunion forms, only surgery can correct the bone deformity. Conservative measures (pads, wider shoes, orthotics) can manage symptoms but cannot reverse the bunion. Surgery is recommended when pain interferes with daily activities.'
      },
      {
        question: 'How long is recovery from bunion surgery?',
        answer: 'Most patients wear a surgical boot for 6-8 weeks. Swelling may persist for 6-12 months. Return to regular shoes: 8-12 weeks. Return to sports: 3-4 months. Full recovery: 6-12 months.'
      }
    ],
    relatedConditions: ['plantar-fasciitis'],
    relatedTreatments: []
  },
  {
    id: 'ankle-arthritis',
    slug: 'ankle-arthritis',
    name: 'Ankle Arthritis',
    category: 'Foot',
    icon: '🦶',
    shortDescription: 'Degenerative wear of the ankle joint causing pain and stiffness.',
    imageUrl: 'https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Ankle Arthritis Treatment Hyderabad | Ankle Replacement | Dr. Harsha',
    metaDescription: 'Expert ankle arthritis treatment in Hyderabad. Ankle fusion and replacement options. Walk pain-free with modern surgical techniques.',
    keywords: 'ankle arthritis treatment, ankle replacement hyderabad, ankle fusion, post-traumatic ankle arthritis, ankle joint pain',
    overview: `Ankle arthritis is damage to the cartilage of the ankle joint, most commonly from previous injury (post-traumatic). Unlike hip and knee arthritis which is often from wear-and-tear, 90% of ankle arthritis results from previous fractures or sprains. It causes pain, swelling, and stiffness.`,
    causes: [
      'Previous ankle fracture (most common)',
      'Recurrent ankle sprains',
      'Rheumatoid arthritis',
      'Osteoarthritis (less common)',
      'Hemochromatosis',
      'Gout'
    ],
    symptoms: [
      'Pain with walking, especially on uneven ground',
      'Swelling around the ankle',
      'Stiffness, especially in morning',
      'Decreased range of motion',
      'Deformity (ankle tilting)',
      'Difficulty walking or standing'
    ],
    treatments: [
      { name: 'Activity Modification', description: 'Low-impact activities, avoiding uneven surfaces' },
      { name: 'Bracing', description: 'Ankle-foot orthosis (AFO) or lace-up brace' },
      { name: 'Corticosteroid Injection', description: 'Ultrasound-guided injection for temporary relief' },
      { name: 'Ankle Fusion', description: 'Fusing the joint bones together', success: '90%+', note: 'Eliminates joint pain, limits motion' },
      { name: 'Ankle Replacement', description: 'Total ankle arthroplasty', success: '85-90%', note: 'Preserves motion but less durable than fusion' }
    ],
    faqs: [
      {
        question: 'Ankle fusion vs. ankle replacement - which is better?',
        answer: 'Both are excellent options. Ankle fusion is more durable and reliable, but eliminates ankle motion (compensated by other foot joints). Ankle replacement preserves motion but may need revision surgery. Younger, active patients often do better with fusion; older, less active patients may prefer replacement.'
      }
    ],
    relatedConditions: ['ankle-instability'],
    relatedTreatments: ['ankle-ligament-reconstruction']
  },
  {
    id: 'flat-feet',
    slug: 'flat-feet',
    name: 'Flat Feet (Pes Planus)',
    category: 'Foot',
    icon: '🦶',
    shortDescription: 'Condition where the arch of the foot collapses, causing the entire sole to touch the ground.',
    imageUrl: 'https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Flat Feet Treatment Hyderabad | Fallen Arches | Dr. Harsha',
    metaDescription: 'Expert flat feet treatment in Hyderabad. Custom orthotics and surgery for painful flat feet. Comprehensive assessment and treatment.',
    keywords: 'flat feet treatment, fallen arches, pes planus, flat foot surgery, arch support',
    overview: `Flat feet (pes planus) is a condition where the arch of the foot is collapsed or underdeveloped. While many people with flat feet have no symptoms, others may experience foot pain, leg pain, and difficulty with activities. Treatment ranges from orthotics to surgical reconstruction.`,
    types: [
      { type: 'Flexible Flat Foot', description: 'Arch appears when not bearing weight', treatment: 'Often needs no treatment, orthotics if symptomatic' },
      { type: 'Rigid Flat Foot', description: 'No arch even when not bearing weight', treatment: 'May require surgical correction' },
      { type: 'Adult-Acquired Flat Foot', description: 'Develops in adulthood from tendon dysfunction', treatment: 'Often requires surgery if conservative fails' }
    ],
    causes: [
      'Hereditary (runs in families)',
      'Posterior tibial tendon dysfunction',
      'Injury or trauma',
      'Rheumatoid arthritis',
      'Diabetes (Charcot foot)',
      'Obesity',
      'Aging'
    ],
    symptoms: [
      'Visible flattening of the arch',
      'Foot pain, especially in arch or heel',
      'Pain that worsens with activity',
      'Swelling along the inside of ankle',
      'Knee, hip, or back pain',
      'Difficulty standing on tiptoes'
    ],
    treatments: [
      { name: 'Arch Supports/Orthotics', description: 'Custom or OTC arch supports', indication: 'First-line for symptomatic flat feet' },
      { name: 'Physical Therapy', description: 'Strengthening exercises for posterior tibial tendon' },
      { name: 'Bracing', description: 'Ankle-foot orthosis for severe cases' },
      { name: 'Tendon Transfer', description: 'Using another tendon to support the arch', indication: 'Posterior tibial tendon dysfunction' },
      { name: 'Osteotomy', description: 'Bone realignment to recreate arch' },
      { name: 'Fusion', description: 'Fusing bones to stabilize the arch', indication: 'Severe, rigid flat foot' }
    ],
    faqs: [
      {
        question: 'Do flat feet need to be treated?',
        answer: 'Not always. Many people with flat feet have no symptoms and require no treatment. Treatment is recommended when flat feet cause pain, difficulty walking, or contribute to problems in the ankles, knees, hips, or back.'
      }
    ],
    relatedConditions: ['plantar-fasciitis', 'ankle-arthritis'],
    relatedTreatments: []
  },

  // ============ KNEE CONDITIONS ============
  {
    id: 'patellofemoral-syndrome',
    slug: 'patellofemoral-syndrome',
    name: 'Patellofemoral Pain Syndrome',
    category: 'Knee',
    icon: '🦵',
    shortDescription: 'Pain around the kneecap, especially with stairs, squatting, or prolonged sitting.',
    imageUrl: 'https://images.pexels.com/photos/7446990/pexels-photo-7446990.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Patellofemoral Syndrome Treatment Hyderabad | Runner\'s Knee | Dr. Harsha',
    metaDescription: 'Expert patellofemoral pain treatment in Hyderabad. Physical therapy and rehabilitation for anterior knee pain. Get back to running.',
    keywords: 'patellofemoral syndrome, runners knee, anterior knee pain, kneecap pain, chondromalacia patella',
    overview: `Patellofemoral pain syndrome (PFPS), often called "runner's knee," causes pain around and behind the kneecap. It's one of the most common causes of knee pain in young, active individuals. The condition results from problems with how the kneecap tracks in the femoral groove.`,
    causes: [
      'Overuse (running, jumping, squatting)',
      'Muscle imbalance (weak quadriceps, tight hamstrings)',
      'Poor alignment (knocked knees, flat feet)',
      'Direct trauma to kneecap',
      'Sudden increase in activity',
      'Improper training technique'
    ],
    symptoms: [
      'Dull, aching pain around kneecap',
      'Pain worse with stairs (especially going down)',
      'Pain after prolonged sitting (theater sign)',
      'Pain with squatting or kneeling',
      'Grinding or popping sensation',
      'Pain worse with running or jumping'
    ],
    treatments: [
      { name: 'Activity Modification', description: 'Reduce high-impact activities temporarily' },
      { name: 'Physical Therapy', description: 'VMO strengthening, hip strengthening, flexibility', success: '80-90%', timeline: '6-12 weeks' },
      { name: 'Patellar Taping/Bracing', description: 'Improve patellar tracking during activity' },
      { name: 'Orthotics', description: 'For those with flat feet or alignment issues' },
      { name: 'Surgery', description: 'Lateral release or tibial tubercle transfer', indication: 'Rare, only after failed extensive PT' }
    ],
    faqs: [
      {
        question: 'Can I still run with patellofemoral syndrome?',
        answer: 'Initially, you may need to reduce running while addressing the underlying causes. Once pain improves with physical therapy, gradual return to running is possible. Focus on strengthening, proper shoes, and avoiding sudden increases in mileage.'
      }
    ],
    relatedConditions: ['knee-arthritis', 'meniscus-tear', 'patellar-dislocation'],
    relatedTreatments: ['knee-arthroscopy']
  },
  {
    id: 'bakers-cyst',
    slug: 'bakers-cyst',
    name: "Baker's Cyst (Popliteal Cyst)",
    category: 'Knee',
    icon: '🦵',
    shortDescription: 'Fluid-filled swelling behind the knee, often associated with underlying knee problems.',
    imageUrl: 'https://images.pexels.com/photos/7446990/pexels-photo-7446990.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: "Baker's Cyst Treatment Hyderabad | Popliteal Cyst | Dr. Harsha",
    metaDescription: "Expert Baker's cyst treatment in Hyderabad. Addresses underlying cause for lasting relief. Aspiration and arthroscopy options available.",
    keywords: 'bakers cyst treatment, popliteal cyst, knee swelling back, cyst behind knee, knee fluid',
    overview: `A Baker's cyst is a fluid-filled swelling that develops behind the knee. It typically forms when excess synovial fluid bulges through a weakness in the joint capsule. While the cyst itself isn't harmful, it often indicates an underlying knee problem that needs attention.`,
    causes: [
      'Knee arthritis',
      'Meniscus tear',
      'Rheumatoid arthritis',
      'Gout',
      'Overuse or injury',
      'Any condition causing knee effusion'
    ],
    symptoms: [
      'Visible bulge behind the knee',
      'Stiffness or tightness behind knee',
      'Pain behind knee, especially with activity',
      'Difficulty fully bending knee',
      'Swelling that increases with activity',
      'If ruptured: sudden calf pain and swelling'
    ],
    treatments: [
      { name: 'Observation', description: 'Many resolve when underlying cause is treated' },
      { name: 'Aspiration', description: 'Draining fluid with a needle', note: 'High recurrence if underlying cause not addressed' },
      { name: 'Treat Underlying Cause', description: 'Arthroscopy for meniscus tear, medications for arthritis', success: 'Most effective approach' },
      { name: 'Surgical Excision', description: 'Removing the cyst', indication: 'Rare, only if very large or symptomatic after treating underlying cause' }
    ],
    faqs: [
      {
        question: "Will a Baker's cyst go away on its own?",
        answer: "Baker's cysts often resolve once the underlying knee problem is treated. If arthritis or a meniscus tear is causing excess fluid production, treating that condition usually shrinks the cyst. Simple aspiration without addressing the cause has high recurrence."
      },
      {
        question: "What happens if a Baker's cyst ruptures?",
        answer: 'A ruptured cyst can cause sudden, severe calf pain and swelling, mimicking a blood clot (DVT). While not dangerous, it can be very painful. See a doctor to rule out DVT. The fluid is gradually absorbed by the body over days to weeks.'
      }
    ],
    relatedConditions: ['knee-arthritis', 'meniscus-tear'],
    relatedTreatments: ['knee-arthroscopy', 'total-knee-replacement']
  },
  {
    id: 'osgood-schlatter',
    slug: 'osgood-schlatter',
    name: 'Osgood-Schlatter Disease',
    category: 'Knee',
    icon: '🦵',
    shortDescription: 'Painful bump below the knee in growing adolescents, especially athletes.',
    imageUrl: 'https://images.pexels.com/photos/7446990/pexels-photo-7446990.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Osgood-Schlatter Treatment Hyderabad | Knee Pain in Children | Dr. Harsha',
    metaDescription: 'Expert Osgood-Schlatter disease treatment in Hyderabad. Helping young athletes recover from tibial tubercle pain. Pediatric orthopedic care.',
    keywords: 'osgood schlatter treatment, knee pain children, tibial tubercle pain, adolescent knee pain, growing pains knee',
    overview: `Osgood-Schlatter disease is a common cause of knee pain in growing adolescents. It occurs when the patellar tendon pulls on the growth plate (tibial tubercle) below the knee, causing pain and swelling. It's particularly common in sports involving running, jumping, and quick direction changes.`,
    causes: [
      'Growth spurts (ages 10-15)',
      'Sports with running and jumping',
      'Tight quadriceps muscles',
      'Sudden increase in activity',
      'More common in boys (but gap narrowing)'
    ],
    symptoms: [
      'Pain and swelling below the kneecap',
      'Painful bump on the shin bone',
      'Pain worsening with activity',
      'Pain with kneeling',
      'Limping after sports',
      'Tight quadriceps'
    ],
    treatments: [
      { name: 'Rest and Activity Modification', description: 'Reduce painful activities until symptoms improve' },
      { name: 'Ice', description: 'Apply after activities that cause pain' },
      { name: 'Stretching', description: 'Quadriceps and hamstring stretches' },
      { name: 'Patellar Strap', description: 'Takes pressure off the tibial tubercle' },
      { name: 'Physical Therapy', description: 'Strengthening and flexibility program' }
    ],
    faqs: [
      {
        question: 'Does Osgood-Schlatter go away?',
        answer: 'Yes! Osgood-Schlatter almost always resolves once the child stops growing (typically by age 14-16 for girls, 16-18 for boys). Some may be left with a permanent, painless bump below the knee. Very rarely, surgical removal of bone fragments is needed.'
      },
      {
        question: 'Can my child still play sports with Osgood-Schlatter?',
        answer: 'Often yes, but activity may need to be modified based on pain levels. Complete rest is usually not necessary. Focus on stretching, icing after activity, and reducing training intensity during flare-ups. Work with a sports medicine specialist for guidance.'
      }
    ],
    relatedConditions: ['patellofemoral-syndrome', 'patellar-dislocation'],
    relatedTreatments: []
  },

  // ============ SPINE CONDITIONS ============
  {
    id: 'herniated-disc',
    slug: 'herniated-disc',
    name: 'Herniated Disc (Slipped Disc)',
    category: 'Spine',
    icon: '🔙',
    shortDescription: 'Disc material pushes out and presses on spinal nerves, causing back and leg pain.',
    imageUrl: 'https://images.pexels.com/photos/5473184/pexels-photo-5473184.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Herniated Disc Treatment Hyderabad | Slipped Disc | Dr. Harsha',
    metaDescription: 'Expert herniated disc treatment in Hyderabad. Non-surgical and minimally invasive options for slipped disc. Relief from back and leg pain.',
    keywords: 'herniated disc treatment, slipped disc hyderabad, disc bulge treatment, sciatica treatment, back pain leg pain',
    overview: `A herniated disc (also called slipped or ruptured disc) occurs when the soft inner portion of a spinal disc pushes through a tear in the outer layer. This can irritate nearby nerves, causing pain, numbness, or weakness in the back, leg (sciatica), or arm.`,
    causes: [
      'Age-related disc degeneration',
      'Improper lifting technique',
      'Trauma or injury',
      'Repetitive strain',
      'Excess body weight',
      'Genetic predisposition',
      'Sedentary lifestyle'
    ],
    symptoms: [
      'Lower back pain radiating to leg (sciatica)',
      'Neck pain radiating to arm',
      'Numbness or tingling in affected limb',
      'Muscle weakness',
      'Pain worse with sitting, bending, or coughing',
      'Difficulty walking in severe cases'
    ],
    treatments: [
      { name: 'Activity Modification', description: 'Avoid aggravating activities, maintain gentle movement' },
      { name: 'Physical Therapy', description: 'Core strengthening, McKenzie exercises', success: '80-90% improve without surgery' },
      { name: 'Medications', description: 'NSAIDs, muscle relaxants, nerve pain medications' },
      { name: 'Epidural Steroid Injection', description: 'Corticosteroid injection near the nerve', success: '50-75% temporary relief' },
      { name: 'Microdiscectomy', description: 'Minimally invasive surgery to remove disc fragment', success: '90-95%', indication: 'Severe symptoms or failed conservative care' }
    ],
    faqs: [
      {
        question: 'Will a herniated disc heal on its own?',
        answer: 'Many herniated discs improve significantly with conservative treatment. Studies show that 80-90% of patients improve without surgery. The body can reabsorb disc material over time. Surgery is reserved for severe cases or those not improving after 6-12 weeks.'
      },
      {
        question: 'Can I exercise with a herniated disc?',
        answer: 'Yes, but choose exercises carefully. Walking, swimming, and specific physical therapy exercises are beneficial. Avoid heavy lifting, high-impact activities, and exercises that flex the spine forward. Your physical therapist can design a safe program.'
      }
    ],
    relatedConditions: ['spinal-stenosis', 'sciatica'],
    relatedTreatments: ['spinal-decompression']
  },
  {
    id: 'spinal-stenosis',
    slug: 'spinal-stenosis',
    name: 'Spinal Stenosis',
    category: 'Spine',
    icon: '🔙',
    shortDescription: 'Narrowing of the spinal canal causing pressure on the spinal cord and nerves.',
    imageUrl: 'https://images.pexels.com/photos/5473184/pexels-photo-5473184.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Spinal Stenosis Treatment Hyderabad | Back Pain | Dr. Harsha',
    metaDescription: 'Expert spinal stenosis treatment in Hyderabad. Minimally invasive decompression surgery for relief from leg pain and difficulty walking.',
    keywords: 'spinal stenosis treatment, lumbar stenosis, cervical stenosis, narrowing spine, difficulty walking',
    overview: `Spinal stenosis is narrowing of the spinal canal that puts pressure on the spinal cord and nerves. It's most common in the lower back (lumbar) and neck (cervical). Age-related changes are the primary cause. Symptoms typically develop gradually and worsen over time.`,
    types: [
      { type: 'Lumbar Stenosis', location: 'Lower back', symptoms: 'Leg pain when walking, relieved by sitting or bending forward' },
      { type: 'Cervical Stenosis', location: 'Neck', symptoms: 'Neck pain, arm weakness, balance problems, hand clumsiness' }
    ],
    causes: [
      'Osteoarthritis (bone spurs)',
      'Thickened ligaments',
      'Bulging or herniated discs',
      'Congenital narrowing',
      'Spinal tumors (rare)',
      'Paget\'s disease'
    ],
    symptoms: [
      'Leg pain when walking (neurogenic claudication)',
      'Relief when sitting or bending forward',
      'Back pain',
      'Numbness or tingling in legs',
      'Weakness in legs',
      'In severe cases: bladder or bowel dysfunction'
    ],
    treatments: [
      { name: 'Physical Therapy', description: 'Flexion-based exercises, core strengthening' },
      { name: 'Medications', description: 'NSAIDs, nerve pain medications (gabapentin)' },
      { name: 'Epidural Steroid Injections', description: 'Reduce inflammation and pain temporarily' },
      { name: 'Laminectomy', description: 'Surgical removal of bone to create more space', success: '70-80%' },
      { name: 'Minimally Invasive Decompression', description: 'Smaller incisions, faster recovery', success: '75-85%' }
    ],
    faqs: [
      {
        question: 'How do I know if I have spinal stenosis?',
        answer: 'Classic signs include leg pain when walking that improves with sitting or leaning on a shopping cart. You may be able to ride a bike (flexed position) without pain but struggle to walk. MRI confirms the diagnosis by showing spinal canal narrowing.'
      }
    ],
    relatedConditions: ['herniated-disc', 'sciatica'],
    relatedTreatments: ['spinal-decompression']
  },
  {
    id: 'sciatica',
    slug: 'sciatica',
    name: 'Sciatica',
    category: 'Spine',
    icon: '🔙',
    shortDescription: 'Pain radiating along the sciatic nerve from the lower back down the leg.',
    imageUrl: 'https://images.pexels.com/photos/5473184/pexels-photo-5473184.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTitle: 'Sciatica Treatment Hyderabad | Leg Pain | Dr. Harsha',
    metaDescription: 'Expert sciatica treatment in Hyderabad. Non-surgical and surgical options for radiating leg pain. Comprehensive spine care.',
    keywords: 'sciatica treatment hyderabad, leg pain back, sciatic nerve pain, radiating leg pain, lumbar radiculopathy',
    overview: `Sciatica refers to pain that radiates along the path of the sciatic nerve, from the lower back through the hip and buttock and down each leg. It typically affects only one side of the body. Sciatica is a symptom of an underlying problem, not a diagnosis itself.`,
    causes: [
      'Herniated lumbar disc (most common)',
      'Lumbar spinal stenosis',
      'Degenerative disc disease',
      'Spondylolisthesis',
      'Piriformis syndrome',
      'Rarely: tumors, infections'
    ],
    symptoms: [
      'Pain radiating from lower back to leg',
      'Pain worse with sitting',
      'Sharp, burning, or shooting pain',
      'Numbness or tingling in leg or foot',
      'Weakness in leg',
      'Pain on one side (usually)'
    ],
    treatments: [
      { name: 'Activity Modification', description: 'Avoid prolonged sitting, maintain gentle activity' },
      { name: 'Physical Therapy', description: 'Core exercises, nerve gliding, posture correction', success: '80-90% improve' },
      { name: 'Medications', description: 'NSAIDs, muscle relaxants, gabapentin/pregabalin' },
      { name: 'Epidural Steroid Injection', description: 'Reduce nerve inflammation' },
      { name: 'Surgery', description: 'Microdiscectomy or decompression', indication: 'Severe or persistent symptoms' }
    ],
    faqs: [
      {
        question: 'How long does sciatica last?',
        answer: 'Acute sciatica usually improves within 4-6 weeks with conservative treatment. About 80-90% of people recover without surgery. If symptoms persist beyond 6-12 weeks or include progressive weakness or bladder/bowel problems, see a specialist urgently.'
      }
    ],
    relatedConditions: ['herniated-disc', 'spinal-stenosis'],
    relatedTreatments: ['spinal-decompression']
  }
];

export default additionalConditions;
