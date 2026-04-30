# Part 2 - Additional conditions and treatments for CMS enrichment

ADDITIONAL_CONDITIONS_DATA = {
    "acl-injury": {
        "name": "ACL Injury",
        "category": "Knee",
        "icon": "⚽",
        "imageUrl": "https://images.unsplash.com/photo-1649751361457-01d3a696c7e6?w=800&q=80",
        "overview": "ACL (Anterior Cruciate Ligament) injury is one of the most common knee injuries, especially in athletes who play sports involving sudden stops and direction changes. Dr. B Harsha Vardhana Reddy provides expert ACL treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Sudden stops or changes in direction",
            "Landing awkwardly from a jump",
            "Direct collision or contact",
            "Pivoting with foot firmly planted",
            "Sports: football, basketball, soccer, skiing"
        ],
        "symptoms": [
            {"name": "Loud pop at injury", "description": "Often heard or felt at the moment of injury"},
            {"name": "Rapid swelling", "description": "Within hours of injury"},
            {"name": "Severe pain", "description": "Unable to continue activity"},
            {"name": "Loss of range of motion", "description": "Difficulty straightening knee"},
            {"name": "Instability", "description": "Knee gives way when bearing weight"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Lachman test, anterior drawer test"},
            {"name": "MRI Scan", "description": "Confirms diagnosis and shows associated injuries"},
            {"name": "X-rays", "description": "Rule out fractures"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "RICE Protocol",
                "description": "Rest, Ice, Compression, Elevation",
                "details": ["Immediate first aid", "Crutches for walking", "Ice 20 min every 2-3 hours"],
                "duration": "First 1-2 weeks",
                "evidenceLevel": "Standard acute care"
            },
            {
                "name": "Physical Therapy",
                "description": "For lower-demand patients",
                "details": ["Strengthen quadriceps and hamstrings", "Improve stability", "Brace for activities"],
                "duration": "3-6 months",
                "evidenceLevel": "Option for older, less active patients"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "ACL Reconstruction",
                "link": "/treatments/acl-reconstruction",
                "description": "Replace torn ligament with graft",
                "indications": "Active patients, athletes, recurrent instability",
                "procedure": "Arthroscopic surgery using hamstring or patellar tendon graft",
                "recovery": "6-9 months for sports return",
                "successRate": "90-95% success rate"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Control swelling, restore extension"},
            {"phase": "Week 2-6", "milestone": "Begin strengthening"},
            {"phase": "Month 2-4", "milestone": "Progress exercises"},
            {"phase": "Month 4-6", "milestone": "Running, agility"},
            {"phase": "Month 6-9", "milestone": "Return to sports"}
        ],
        "faqs": [
            {"question": "Can I walk with a torn ACL?", "answer": "Yes, many people can walk once initial swelling subsides, but the knee may feel unstable with pivoting movements."},
            {"question": "Do I need surgery for ACL tear?", "answer": "Not always. Surgery is recommended for active individuals and athletes. Older, less active patients may do well without surgery."}
        ],
        "relatedConditions": ["meniscus-tear", "pcl-injury"],
        "relatedTreatments": ["acl-reconstruction", "knee-arthroscopy"]
    },
    "ankle-arthritis": {
        "name": "Ankle Arthritis",
        "category": "Foot/Ankle",
        "icon": "🦶",
        "imageUrl": "https://images.pexels.com/photos/7446985/pexels-photo-7446985.jpeg?auto=compress&cs=tinysrgb&w=800",
        "overview": "Ankle arthritis causes pain and stiffness in the ankle joint due to cartilage wear. Unlike hip and knee arthritis, ankle arthritis is usually caused by previous injury. Dr. B Harsha Vardhana Reddy provides comprehensive ankle care at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Previous ankle fracture (post-traumatic)",
            "Recurrent ankle sprains",
            "Rheumatoid arthritis",
            "Age-related wear",
            "Infection (rare)"
        ],
        "symptoms": [
            {"name": "Ankle pain", "description": "Worse with activity, improves with rest"},
            {"name": "Stiffness", "description": "Especially in the morning"},
            {"name": "Swelling", "description": "Around the ankle joint"},
            {"name": "Difficulty walking", "description": "Especially on uneven surfaces"},
            {"name": "Reduced motion", "description": "Limited ankle movement"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Range of motion, tenderness"},
            {"name": "Weight-bearing X-rays", "description": "Show joint space narrowing"},
            {"name": "CT Scan", "description": "Detail of bone changes"},
            {"name": "MRI", "description": "Evaluate cartilage and soft tissues"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Activity Modification",
                "description": "Reduce impact on ankle",
                "details": ["Avoid running and jumping", "Use supportive shoes", "Walking aids if needed"],
                "duration": "Ongoing",
                "evidenceLevel": "First-line treatment"
            },
            {
                "name": "Bracing",
                "description": "Support and immobilize ankle",
                "details": ["Lace-up ankle brace", "Arizona brace for more support", "Reduces painful motion"],
                "duration": "As needed for activities",
                "evidenceLevel": "Moderate evidence"
            },
            {
                "name": "Injections",
                "description": "Pain relief",
                "details": ["Cortisone for acute flares", "Hyaluronic acid may help"],
                "evidenceLevel": "Moderate short-term evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Ankle Fusion (Arthrodesis)",
                "description": "Fuse ankle bones together",
                "indications": "End-stage arthritis, high-demand patients",
                "procedure": "Remove cartilage, fix bones with screws/plates",
                "recovery": "Non-weight bearing 6-8 weeks, full recovery 4-6 months",
                "successRate": "90%+ fusion and pain relief"
            },
            {
                "name": "Ankle Replacement",
                "description": "Artificial joint replacement",
                "indications": "Lower-demand patients, good bone quality",
                "procedure": "Replace joint surfaces with metal and plastic",
                "recovery": "Earlier motion than fusion",
                "successRate": "80-90% at 10 years"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Conservative", "milestone": "Ongoing symptom management"},
            {"phase": "Post-fusion Week 1-8", "milestone": "Non-weight bearing"},
            {"phase": "Post-fusion Week 8-12", "milestone": "Progressive weight bearing"},
            {"phase": "Post-fusion Month 4-6", "milestone": "Return to activities"}
        ],
        "faqs": [
            {"question": "Is ankle fusion or replacement better?", "answer": "Ankle fusion is more durable and better for active patients. Replacement preserves motion and may be better for lower-demand patients with good bone quality."},
            {"question": "Can I walk after ankle fusion?", "answer": "Yes, most patients walk well after ankle fusion. You'll adapt by using more motion from surrounding joints."}
        ],
        "relatedConditions": ["ankle-sprain", "achilles-tendinitis"],
        "relatedTreatments": ["joint-injections"]
    },
    "avascular-necrosis-avn": {
        "name": "Avascular Necrosis (AVN)",
        "category": "Hip",
        "icon": "🦴",
        "imageUrl": "https://images.pexels.com/photos/7446985/pexels-photo-7446985.jpeg?auto=compress&cs=tinysrgb&w=800",
        "overview": "Avascular necrosis (AVN) occurs when blood supply to bone is disrupted, causing bone death. Most commonly affects the hip. Dr. B Harsha Vardhana Reddy specializes in AVN treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Long-term steroid use",
            "Excessive alcohol consumption",
            "Hip injury or fracture",
            "Blood disorders (sickle cell)",
            "Radiation therapy",
            "Unknown (idiopathic)"
        ],
        "symptoms": [
            {"name": "Groin pain", "description": "Progressive, may radiate to knee"},
            {"name": "Pain with activity", "description": "Initially, then at rest"},
            {"name": "Limping", "description": "As condition progresses"},
            {"name": "Reduced range of motion", "description": "Especially internal rotation"},
            {"name": "Bilateral symptoms", "description": "Both hips often affected"}
        ],
        "diagnosis": [
            {"name": "MRI", "description": "Gold standard - detects early AVN"},
            {"name": "X-rays", "description": "Show later stages"},
            {"name": "CT Scan", "description": "Evaluate collapse"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Protected Weight Bearing",
                "description": "Reduce stress on affected hip",
                "details": ["Crutches or walker", "Limit high-impact activities"],
                "duration": "3-6 months",
                "evidenceLevel": "May slow progression in early stages"
            },
            {
                "name": "Medications",
                "description": "Address underlying causes",
                "details": ["Stop steroids if possible", "Bisphosphonates may help", "Pain management"],
                "evidenceLevel": "Limited evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Core Decompression",
                "description": "Relieve pressure and stimulate healing",
                "indications": "Early-stage AVN before collapse",
                "procedure": "Drill into femoral head to relieve pressure",
                "recovery": "Protected weight bearing 6-8 weeks",
                "successRate": "60-80% in early stages"
            },
            {
                "name": "Total Hip Replacement",
                "link": "/treatments/total-hip-replacement",
                "description": "Replace damaged joint",
                "indications": "Collapsed femoral head, end-stage AVN",
                "procedure": "Replace hip with artificial joint",
                "recovery": "Walking same day, full recovery 3-6 months",
                "successRate": "95%+ excellent results"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Early AVN", "milestone": "Core decompression consideration"},
            {"phase": "Progressive AVN", "milestone": "Close monitoring"},
            {"phase": "Collapsed AVN", "milestone": "Hip replacement"},
            {"phase": "Post-replacement", "milestone": "Same-day walking, 3-6 months full recovery"}
        ],
        "faqs": [
            {"question": "Can AVN be cured without surgery?", "answer": "Early AVN may stabilize with conservative treatment, but most cases eventually need surgery. Core decompression may delay or prevent the need for hip replacement."},
            {"question": "What causes AVN in young people?", "answer": "Steroid use (even for asthma or autoimmune conditions), excessive alcohol, and trauma are common causes in young people."}
        ],
        "relatedConditions": ["hip-arthritis"],
        "relatedTreatments": ["total-hip-replacement"]
    },
    "spinal-stenosis": {
        "name": "Spinal Stenosis",
        "category": "Spine",
        "icon": "🔵",
        "imageUrl": "https://images.pexels.com/photos/5473184/pexels-photo-5473184.jpeg?auto=compress&cs=tinysrgb&w=800",
        "overview": "Spinal stenosis is narrowing of the spinal canal that puts pressure on the spinal cord and nerves. It most commonly affects the lower back and neck. Dr. B Harsha Vardhana Reddy provides spine care at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Age-related degenerative changes",
            "Bone spurs from arthritis",
            "Thickened ligaments",
            "Herniated discs",
            "Previous spine injury or surgery",
            "Congenital narrow canal"
        ],
        "symptoms": [
            {"name": "Neurogenic claudication", "description": "Leg pain and weakness with walking"},
            {"name": "Relief with bending forward", "description": "Shopping cart sign"},
            {"name": "Back pain", "description": "May be present"},
            {"name": "Numbness in legs", "description": "When walking or standing"},
            {"name": "Difficulty walking distances", "description": "Need to stop and rest"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Gait analysis, neurological exam"},
            {"name": "MRI", "description": "Shows stenosis and nerve compression"},
            {"name": "CT Scan", "description": "Better for bony detail"},
            {"name": "X-rays", "description": "Show alignment and bone spurs"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Physical Therapy",
                "description": "Core strengthening and flexibility",
                "details": ["Flexion-based exercises", "Core stabilization", "Stationary cycling"],
                "duration": "6-12 weeks",
                "evidenceLevel": "Moderate evidence"
            },
            {
                "name": "Epidural Injections",
                "description": "Reduce inflammation around nerves",
                "details": ["Steroid injection into epidural space", "May provide months of relief", "Series of 2-3 injections"],
                "evidenceLevel": "Moderate evidence for temporary relief"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Laminectomy",
                "link": "/treatments/spinal-decompression",
                "description": "Remove bone to create more space",
                "indications": "Progressive neurological symptoms, failed conservative treatment",
                "procedure": "Remove lamina and ligamentum flavum",
                "recovery": "Walking same day, 6-12 weeks full recovery",
                "successRate": "80-90% improvement in leg symptoms"
            },
            {
                "name": "Laminectomy with Fusion",
                "description": "Decompress and stabilize",
                "indications": "Stenosis with instability or spondylolisthesis",
                "procedure": "Remove bone, then fuse with screws and bone graft",
                "recovery": "Longer than laminectomy alone",
                "successRate": "80-85% good outcomes"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1", "milestone": "Walking with assistance"},
            {"phase": "Week 2-6", "milestone": "Gradual increase in activity"},
            {"phase": "Week 6-12", "milestone": "Return to most activities"},
            {"phase": "Month 3-6", "milestone": "Full recovery"}
        ],
        "faqs": [
            {"question": "Does spinal stenosis get worse over time?", "answer": "Stenosis often progresses slowly. Some people remain stable for years, while others have progressive symptoms requiring treatment."},
            {"question": "Is walking good for spinal stenosis?", "answer": "Walking is good exercise but may be limited by symptoms. Using a walker or shopping cart (which allows forward bending) can help. Stationary cycling is often easier."}
        ],
        "relatedConditions": ["sciatica", "herniated-disc"],
        "relatedTreatments": ["spinal-decompression"]
    },
    "shoulder-arthritis": {
        "name": "Shoulder Arthritis",
        "category": "Shoulder",
        "icon": "💪",
        "imageUrl": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
        "overview": "Shoulder arthritis causes progressive pain and stiffness from cartilage wear. It can be from osteoarthritis, rheumatoid arthritis, or previous injury. Dr. B Harsha Vardhana Reddy provides comprehensive shoulder care at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Osteoarthritis (wear and tear)",
            "Rheumatoid arthritis",
            "Post-traumatic arthritis",
            "Rotator cuff tear arthropathy",
            "Avascular necrosis",
            "Previous infection"
        ],
        "symptoms": [
            {"name": "Shoulder pain", "description": "Deep aching, worse with activity"},
            {"name": "Limited range of motion", "description": "Difficulty reaching overhead"},
            {"name": "Grinding sensation", "description": "Crepitus with movement"},
            {"name": "Night pain", "description": "Difficulty sleeping"},
            {"name": "Weakness", "description": "Due to pain inhibition"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Range of motion, crepitus"},
            {"name": "X-rays", "description": "Show joint space narrowing, bone spurs"},
            {"name": "CT Scan", "description": "Evaluate bone stock for surgery"},
            {"name": "MRI", "description": "Evaluate rotator cuff"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Activity Modification",
                "description": "Avoid aggravating movements",
                "details": ["Limit overhead activities", "Use arm at comfortable level"],
                "duration": "Ongoing",
                "evidenceLevel": "Supportive measure"
            },
            {
                "name": "Physical Therapy",
                "description": "Maintain motion and strength",
                "details": ["Gentle stretching", "Rotator cuff strengthening", "Scapular exercises"],
                "duration": "6-12 weeks",
                "evidenceLevel": "Moderate evidence"
            },
            {
                "name": "Corticosteroid Injection",
                "description": "Reduce inflammation",
                "details": ["Injection into shoulder joint", "Provides temporary relief"],
                "evidenceLevel": "Moderate short-term evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Total Shoulder Replacement",
                "link": "/treatments/shoulder-replacement",
                "description": "Replace joint surfaces",
                "indications": "Severe arthritis with intact rotator cuff",
                "procedure": "Replace ball and socket with prosthesis",
                "recovery": "Sling 4-6 weeks, 3-6 months full recovery",
                "successRate": "90%+ pain relief"
            },
            {
                "name": "Reverse Shoulder Replacement",
                "description": "For cuff tear arthropathy",
                "indications": "Arthritis with rotator cuff tear",
                "procedure": "Ball and socket positions reversed",
                "recovery": "Similar to standard replacement",
                "successRate": "90%+ excellent outcomes"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-4", "milestone": "Sling, passive motion"},
            {"phase": "Week 4-8", "milestone": "Active motion"},
            {"phase": "Month 2-4", "milestone": "Strengthening"},
            {"phase": "Month 4-6", "milestone": "Full activity"}
        ],
        "faqs": [
            {"question": "How long does a shoulder replacement last?", "answer": "Modern shoulder replacements can last 15-20 years or more. About 90% are still functioning well at 10 years."},
            {"question": "Can I lift weights after shoulder replacement?", "answer": "Light weights are usually fine after recovery. Heavy lifting and overhead pressing may be limited to protect the replacement."}
        ],
        "relatedConditions": ["rotator-cuff", "frozen-shoulder"],
        "relatedTreatments": ["shoulder-replacement", "joint-injections"]
    },
    "hip-labral-tear": {
        "name": "Hip Labral Tear",
        "category": "Hip",
        "icon": "🦴",
        "imageUrl": "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800",
        "overview": "The hip labrum is a ring of cartilage that surrounds the hip socket. Tears cause pain and may lead to early arthritis. Dr. B Harsha Vardhana Reddy specializes in hip preservation at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Femoroacetabular impingement (FAI)",
            "Sports with pivoting/twisting",
            "Hip dysplasia",
            "Trauma",
            "Degenerative wear"
        ],
        "symptoms": [
            {"name": "Groin pain", "description": "Deep, often hard to localize"},
            {"name": "Clicking or catching", "description": "With hip movement"},
            {"name": "Stiffness", "description": "Limited hip flexion and rotation"},
            {"name": "Pain with sitting", "description": "Especially for long periods"},
            {"name": "Night pain", "description": "May disturb sleep"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "FADIR and FABER tests"},
            {"name": "MRI Arthrogram", "description": "Gold standard - dye shows tear"},
            {"name": "X-rays", "description": "Show FAI or dysplasia"},
            {"name": "Diagnostic Injection", "description": "Pain relief confirms hip source"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Activity Modification",
                "description": "Avoid aggravating positions",
                "details": ["Avoid deep squatting", "Limit hip flexion activities"],
                "duration": "Trial for 3-6 months",
                "evidenceLevel": "First-line treatment"
            },
            {
                "name": "Physical Therapy",
                "description": "Strengthen hip stabilizers",
                "details": ["Hip strengthening", "Core stability", "Movement retraining"],
                "duration": "6-12 weeks",
                "evidenceLevel": "Moderate evidence"
            },
            {
                "name": "Hip Injection",
                "description": "Diagnostic and therapeutic",
                "details": ["Confirms hip as pain source", "Provides temporary relief"],
                "evidenceLevel": "Diagnostic value"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Hip Arthroscopy",
                "link": "/treatments/hip-arthroscopy",
                "description": "Repair labrum and address FAI",
                "indications": "Failed conservative treatment, symptomatic tear",
                "procedure": "Repair labrum, shave bone spurs",
                "recovery": "Crutches 2-4 weeks, full recovery 4-6 months",
                "successRate": "80-90% good outcomes"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Protected weight bearing"},
            {"phase": "Week 2-6", "milestone": "Progressive exercises"},
            {"phase": "Month 2-4", "milestone": "Strengthening"},
            {"phase": "Month 4-6", "milestone": "Return to activities"}
        ],
        "faqs": [
            {"question": "Can a hip labral tear heal on its own?", "answer": "Labral tears generally don't heal on their own, but symptoms may improve with conservative treatment. Not all tears need surgery."},
            {"question": "Is hip arthroscopy successful?", "answer": "Hip arthroscopy is successful in 80-90% of properly selected patients, with significant improvement in pain and function."}
        ],
        "relatedConditions": ["hip-arthritis"],
        "relatedTreatments": ["hip-arthroscopy"]
    },
    "patellofemoral-syndrome": {
        "name": "Patellofemoral Pain Syndrome",
        "category": "Knee",
        "icon": "🦵",
        "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "overview": "Patellofemoral pain syndrome (PFPS) causes pain around the kneecap, commonly called 'runner's knee.' It's one of the most common causes of knee pain. Dr. B Harsha Vardhana Reddy provides comprehensive knee care at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Overuse from running or jumping",
            "Muscle imbalances",
            "Poor patellar tracking",
            "Flat feet or foot pronation",
            "Weak hip muscles",
            "Tight hamstrings or IT band"
        ],
        "symptoms": [
            {"name": "Anterior knee pain", "description": "Around or behind kneecap"},
            {"name": "Pain with stairs", "description": "Especially going down"},
            {"name": "Pain with prolonged sitting", "description": "Movie theater sign"},
            {"name": "Grinding sensation", "description": "With knee bending"},
            {"name": "Pain with squatting", "description": "Or kneeling"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Patellar tracking, Q-angle, strength testing"},
            {"name": "X-rays", "description": "Usually normal, rule out arthritis"},
            {"name": "MRI", "description": "If diagnosis uncertain"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Physical Therapy",
                "description": "Key treatment for PFPS",
                "details": ["Quadriceps strengthening (especially VMO)", "Hip strengthening", "IT band and hamstring stretching", "Patellar taping"],
                "duration": "6-12 weeks",
                "evidenceLevel": "Strong evidence - primary treatment"
            },
            {
                "name": "Activity Modification",
                "description": "Reduce aggravating activities",
                "details": ["Reduce running mileage", "Avoid deep squats and lunges", "Gradual return to activity"],
                "duration": "Until symptoms improve",
                "evidenceLevel": "Supportive measure"
            },
            {
                "name": "Orthotics",
                "description": "For foot/alignment issues",
                "details": ["Address flat feet or pronation", "Over-the-counter or custom"],
                "evidenceLevel": "Moderate evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Arthroscopic Surgery",
                "description": "Rarely needed",
                "indications": "Failed extensive conservative treatment",
                "procedure": "Lateral release or chondroplasty",
                "recovery": "2-4 weeks",
                "successRate": "Variable - conservative treatment preferred"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-4", "milestone": "Begin PT, reduce aggravating activities"},
            {"phase": "Week 4-8", "milestone": "Progress strengthening"},
            {"phase": "Week 8-12", "milestone": "Gradual return to activities"},
            {"phase": "Month 3-6", "milestone": "Full recovery with ongoing maintenance"}
        ],
        "faqs": [
            {"question": "Can I run with patellofemoral pain?", "answer": "You may need to reduce mileage initially. Focus on strengthening exercises, then gradually return to running. Many runners fully recover."},
            {"question": "Is surgery needed for runner's knee?", "answer": "Rarely. Over 90% of patients improve with physical therapy alone. Surgery is only considered after extensive conservative treatment fails."}
        ],
        "relatedConditions": ["knee-arthritis", "meniscus-tear"],
        "relatedTreatments": ["knee-arthroscopy"]
    },
    "patella-dislocation": {
        "name": "Patellar Dislocation",
        "category": "Knee",
        "icon": "🦵",
        "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "overview": "Patellar dislocation occurs when the kneecap slips out of its groove. It most commonly affects young, active individuals. Dr. B Harsha Vardhana Reddy provides expert treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Twisting injury with foot planted",
            "Direct blow to knee",
            "Weak quadriceps (VMO)",
            "Shallow groove (trochlear dysplasia)",
            "Loose ligaments (hypermobility)",
            "Previous dislocation"
        ],
        "symptoms": [
            {"name": "Kneecap visibly out of place", "description": "May reduce spontaneously"},
            {"name": "Severe pain", "description": "At time of dislocation"},
            {"name": "Rapid swelling", "description": "From hemarthrosis"},
            {"name": "Inability to straighten knee", "description": "If still dislocated"},
            {"name": "Apprehension", "description": "Fear of kneecap slipping"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Apprehension test, assess tracking"},
            {"name": "X-rays", "description": "Check for fractures, patellar position"},
            {"name": "MRI", "description": "Evaluate MPFL, cartilage injury"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Reduction",
                "description": "Put kneecap back in place",
                "details": ["Usually reduces spontaneously or with gentle extension", "X-ray before and after"],
                "evidenceLevel": "Essential emergency treatment"
            },
            {
                "name": "Bracing",
                "description": "Immobilize after reduction",
                "details": ["Knee immobilizer or brace", "Crutches for 2-4 weeks"],
                "duration": "4-6 weeks",
                "evidenceLevel": "Standard care"
            },
            {
                "name": "Physical Therapy",
                "description": "Strengthen to prevent recurrence",
                "details": ["VMO strengthening", "Hip strengthening", "Proprioception"],
                "duration": "8-12 weeks",
                "evidenceLevel": "Essential for all patients"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "MPFL Reconstruction",
                "description": "Reconstruct ligament that holds patella",
                "indications": "Recurrent dislocations, high-risk anatomy",
                "procedure": "Graft to reconstruct medial patellofemoral ligament",
                "recovery": "Brace 4-6 weeks, sports 4-6 months",
                "successRate": "90%+ prevention of recurrence"
            },
            {
                "name": "Tibial Tubercle Osteotomy",
                "description": "Realign the kneecap",
                "indications": "Significant malalignment",
                "procedure": "Move the attachment of patellar tendon",
                "recovery": "Protected weight bearing 6 weeks",
                "successRate": "85-90% good outcomes"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Reduce swelling, protect knee"},
            {"phase": "Week 2-6", "milestone": "Range of motion, begin strengthening"},
            {"phase": "Week 6-12", "milestone": "Progressive strengthening"},
            {"phase": "Month 3-6", "milestone": "Return to activities"}
        ],
        "faqs": [
            {"question": "Will my kneecap dislocate again?", "answer": "After first dislocation, recurrence rates are 15-40% with conservative treatment. Young patients and those with certain anatomy have higher risk. Surgery significantly reduces recurrence."},
            {"question": "Do I need surgery after first dislocation?", "answer": "Not always. First-time dislocations are often treated conservatively. Surgery is considered for recurrent dislocations or high-risk anatomy."}
        ],
        "relatedConditions": ["patellofemoral-syndrome"],
        "relatedTreatments": ["knee-arthroscopy"]
    },
    "de-quervains-tenosynovitis": {
        "name": "De Quervain's Tenosynovitis",
        "category": "Hand/Wrist",
        "icon": "✋",
        "imageUrl": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
        "overview": "De Quervain's tenosynovitis causes pain on the thumb side of the wrist. It's caused by irritation of the tendons that extend and abduct the thumb. Dr. B Harsha Vardhana Reddy provides expert treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Repetitive hand motions",
            "New mothers (lifting baby)",
            "Texting/smartphone overuse",
            "Sports (golf, racquet sports)",
            "Rheumatoid arthritis",
            "Pregnancy and hormonal changes"
        ],
        "symptoms": [
            {"name": "Pain at base of thumb", "description": "Thumb side of wrist"},
            {"name": "Swelling", "description": "Over the first dorsal compartment"},
            {"name": "Pain with gripping", "description": "Or pinching"},
            {"name": "Difficulty moving thumb", "description": "Pain with thumb motion"},
            {"name": "Squeaking sensation", "description": "From tendon catching"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Finkelstein test (positive)"},
            {"name": "Ultrasound", "description": "Shows tendon thickening"},
            {"name": "X-rays", "description": "Rule out arthritis"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Splinting",
                "description": "Immobilize thumb and wrist",
                "details": ["Thumb spica splint", "Wear day and night initially"],
                "duration": "4-6 weeks",
                "evidenceLevel": "First-line treatment"
            },
            {
                "name": "Corticosteroid Injection",
                "description": "Reduce inflammation in tendon sheath",
                "details": ["Injection into first dorsal compartment", "70-80% success rate", "May repeat once"],
                "evidenceLevel": "Strong evidence"
            },
            {
                "name": "Activity Modification",
                "description": "Avoid aggravating activities",
                "details": ["Reduce repetitive motions", "Ergonomic changes"],
                "duration": "Ongoing",
                "evidenceLevel": "Supportive measure"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Release Surgery",
                "description": "Open the tendon sheath",
                "indications": "Failed 2-3 injections",
                "procedure": "Small incision, release first dorsal compartment",
                "recovery": "2-4 weeks, immediate use",
                "successRate": "90-95% cure rate"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Post-injection", "milestone": "Relief within 1-2 weeks"},
            {"phase": "Post-surgery Day 1", "milestone": "Use hand immediately"},
            {"phase": "Week 1-2", "milestone": "Return to most activities"},
            {"phase": "Week 2-4", "milestone": "Full recovery"}
        ],
        "faqs": [
            {"question": "How long does de Quervain's last?", "answer": "With treatment (splinting and/or injection), most cases resolve within 4-6 weeks. Without treatment, symptoms may persist for months."},
            {"question": "Is surgery always needed?", "answer": "No, about 70-80% of patients improve with injection and splinting. Surgery is reserved for those who fail conservative treatment."}
        ],
        "relatedConditions": ["trigger-finger", "carpal-tunnel"],
        "relatedTreatments": ["joint-injections"]
    },
    "cubital-tunnel-syndrome": {
        "name": "Cubital Tunnel Syndrome",
        "category": "Elbow",
        "icon": "💪",
        "imageUrl": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
        "overview": "Cubital tunnel syndrome occurs when the ulnar nerve is compressed at the elbow. It causes numbness in the ring and little fingers. Dr. B Harsha Vardhana Reddy provides expert treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Prolonged elbow bending (sleeping, phone use)",
            "Leaning on elbow",
            "Previous elbow injury",
            "Bone spurs or arthritis",
            "Repeated elbow flexion",
            "Anatomical variations"
        ],
        "symptoms": [
            {"name": "Numbness in ring and little fingers", "description": "Often worse at night"},
            {"name": "Elbow pain", "description": "Aching on inside of elbow"},
            {"name": "Weak grip", "description": "Difficulty with fine motor tasks"},
            {"name": "Hand clumsiness", "description": "Dropping things"},
            {"name": "Muscle wasting", "description": "In severe cases, hand muscles atrophy"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Tinel's test at elbow, elbow flexion test"},
            {"name": "Nerve Conduction Studies", "description": "Measure nerve function"},
            {"name": "X-rays", "description": "Check for bone spurs"},
            {"name": "Ultrasound/MRI", "description": "Evaluate nerve and surrounding structures"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Activity Modification",
                "description": "Reduce pressure on nerve",
                "details": ["Avoid prolonged elbow bending", "Don't lean on elbow", "Use headset for phone"],
                "duration": "Ongoing",
                "evidenceLevel": "First-line treatment"
            },
            {
                "name": "Night Splinting",
                "description": "Keep elbow straight while sleeping",
                "details": ["Elbow pad or splint", "Prevents bending at night"],
                "duration": "4-6 weeks trial",
                "evidenceLevel": "Moderate evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Cubital Tunnel Release",
                "description": "Decompress the ulnar nerve",
                "indications": "Constant numbness, weakness, muscle wasting, failed conservative treatment",
                "procedure": "Release ligament over nerve, may move nerve anteriorly",
                "recovery": "2-4 weeks light use, 6-12 weeks full recovery",
                "successRate": "80-90% improvement"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Light activities, wound healing"},
            {"phase": "Week 2-6", "milestone": "Gradual return to activities"},
            {"phase": "Month 2-6", "milestone": "Nerve regeneration continues"},
            {"phase": "Month 6-12", "milestone": "Full recovery (nerve heals slowly)"}
        ],
        "faqs": [
            {"question": "Will my numbness go away after surgery?", "answer": "In most cases, numbness improves after surgery, though recovery can take months as nerves heal slowly. The longer symptoms were present, the longer recovery may take."},
            {"question": "Is cubital tunnel syndrome serious?", "answer": "If untreated, it can progress to permanent nerve damage with hand weakness and muscle wasting. Early treatment prevents irreversible damage."}
        ],
        "relatedConditions": ["carpal-tunnel", "tennis-elbow"],
        "relatedTreatments": ["joint-injections"]
    },
    "flat-feet": {
        "name": "Flat Feet (Pes Planus)",
        "category": "Foot/Ankle",
        "icon": "🦶",
        "imageUrl": "https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=800&q=80",
        "overview": "Flat feet occurs when the arches of the feet collapse. It can be present from birth or develop with age. Dr. B Harsha Vardhana Reddy provides comprehensive foot care at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Genetic (born with flat feet)",
            "Posterior tibial tendon dysfunction",
            "Injury to foot or ankle",
            "Arthritis (rheumatoid)",
            "Obesity",
            "Aging"
        ],
        "symptoms": [
            {"name": "Foot pain", "description": "Especially arch and heel"},
            {"name": "Swelling along inside of ankle", "description": "If PTT dysfunction"},
            {"name": "Difficulty standing on toes", "description": "Single heel rise test"},
            {"name": "Tired feet", "description": "After prolonged standing"},
            {"name": "Knee or hip pain", "description": "Due to altered mechanics"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Observe standing arch, single heel rise"},
            {"name": "X-rays", "description": "Weight-bearing views show alignment"},
            {"name": "MRI/Ultrasound", "description": "Evaluate posterior tibial tendon"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Orthotics",
                "description": "Support the arch",
                "details": ["Over-the-counter inserts", "Custom orthotics for severe cases"],
                "duration": "Long-term use",
                "evidenceLevel": "First-line treatment"
            },
            {
                "name": "Supportive Footwear",
                "description": "Shoes with good arch support",
                "details": ["Motion control shoes", "Avoid flat, unsupportive shoes"],
                "evidenceLevel": "Essential supportive measure"
            },
            {
                "name": "Physical Therapy",
                "description": "Strengthen supporting muscles",
                "details": ["Calf stretches", "Intrinsic foot strengthening", "Posterior tibial exercises"],
                "duration": "6-12 weeks",
                "evidenceLevel": "Moderate evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Reconstructive Surgery",
                "description": "Multiple procedures to restore arch",
                "indications": "Painful progressive flat foot, failed conservative treatment",
                "procedure": "Tendon transfer, bone cuts (osteotomies), fusion as needed",
                "recovery": "Non-weight bearing 6-8 weeks, full recovery 6-12 months",
                "successRate": "80-90% good outcomes"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Conservative", "milestone": "Ongoing management with orthotics"},
            {"phase": "Post-surgery Week 1-8", "milestone": "Non-weight bearing in cast"},
            {"phase": "Week 8-12", "milestone": "Protected weight bearing"},
            {"phase": "Month 3-6", "milestone": "Progressive activities"},
            {"phase": "Month 6-12", "milestone": "Full recovery"}
        ],
        "faqs": [
            {"question": "Do flat feet cause problems?", "answer": "Many people with flat feet have no symptoms. Problems occur when the arch progressively collapses, causing pain and difficulty walking."},
            {"question": "Can flat feet be corrected?", "answer": "Orthotics and strengthening can support the arch and reduce symptoms. Surgery can reconstruct the arch in severe cases but is rarely needed."}
        ],
        "relatedConditions": ["plantar-fasciitis", "ankle-arthritis"],
        "relatedTreatments": ["joint-injections"]
    },
    "hip-bursitis": {
        "name": "Hip Bursitis (Trochanteric Bursitis)",
        "category": "Hip",
        "icon": "🦴",
        "imageUrl": "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800",
        "overview": "Hip bursitis, also called greater trochanteric pain syndrome, causes pain on the outer hip. It's one of the most common causes of hip pain. Dr. B Harsha Vardhana Reddy provides expert treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Repetitive activities (running, climbing)",
            "Hip injury from fall",
            "Spine or leg problems altering gait",
            "Unequal leg length",
            "Previous hip surgery",
            "Gluteal tendon weakness"
        ],
        "symptoms": [
            {"name": "Pain on outer hip", "description": "Over the greater trochanter"},
            {"name": "Pain lying on affected side", "description": "Disturbs sleep"},
            {"name": "Pain with activities", "description": "Climbing stairs, walking"},
            {"name": "Tenderness to touch", "description": "Point tenderness over hip"},
            {"name": "Pain radiating down thigh", "description": "May mimic sciatica"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Point tenderness over trochanter"},
            {"name": "X-rays", "description": "Rule out arthritis or fracture"},
            {"name": "MRI/Ultrasound", "description": "Show bursitis and gluteal tendon issues"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Activity Modification",
                "description": "Avoid aggravating activities",
                "details": ["Reduce repetitive hip loading", "Avoid lying on affected side", "Use pillow between legs"],
                "duration": "Until symptoms improve",
                "evidenceLevel": "First-line treatment"
            },
            {
                "name": "Physical Therapy",
                "description": "Strengthen hip abductors",
                "details": ["Gluteus medius strengthening", "IT band stretching", "Core stability"],
                "duration": "6-12 weeks",
                "evidenceLevel": "Strong evidence"
            },
            {
                "name": "Corticosteroid Injection",
                "description": "Reduce inflammation",
                "details": ["Injection into trochanteric bursa", "Provides relief for weeks to months"],
                "evidenceLevel": "Moderate evidence, often combined with PT"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Arthroscopic Bursectomy",
                "description": "Remove inflamed bursa",
                "indications": "Failed extensive conservative treatment",
                "procedure": "Arthroscopic or open removal of bursa",
                "recovery": "2-4 weeks",
                "successRate": "Variable - conservative treatment usually sufficient"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Rest, ice, anti-inflammatories"},
            {"phase": "Week 2-6", "milestone": "Begin PT"},
            {"phase": "Week 6-12", "milestone": "Progress strengthening"},
            {"phase": "Month 3", "milestone": "Most cases resolved"}
        ],
        "faqs": [
            {"question": "Does hip bursitis go away on its own?", "answer": "Some cases improve with rest, but most need physical therapy for lasting relief. Without addressing the underlying cause, symptoms often recur."},
            {"question": "Is walking good for hip bursitis?", "answer": "Gentle walking is usually okay, but excessive walking may aggravate symptoms. Focus on strengthening exercises first."}
        ],
        "relatedConditions": ["hip-arthritis", "bursitis"],
        "relatedTreatments": ["joint-injections"]
    },
    "bunions": {
        "name": "Bunions (Hallux Valgus)",
        "category": "Foot",
        "icon": "🦶",
        "imageUrl": "https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=800&q=80",
        "overview": "A bunion is a bony bump at the base of the big toe caused by misalignment. It can cause pain and difficulty with footwear. Dr. B Harsha Vardhana Reddy provides comprehensive foot care at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Hereditary foot structure",
            "Tight, narrow shoes",
            "High heels",
            "Flat feet",
            "Rheumatoid arthritis",
            "Hypermobility"
        ],
        "symptoms": [
            {"name": "Visible bump", "description": "At base of big toe"},
            {"name": "Pain at the bunion", "description": "Especially with shoes"},
            {"name": "Redness and swelling", "description": "Over the bump"},
            {"name": "Big toe deviation", "description": "Points toward other toes"},
            {"name": "Difficulty fitting shoes", "description": "Need wider sizes"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Visible deformity, assess severity"},
            {"name": "Weight-bearing X-rays", "description": "Measure angles, plan surgery"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Proper Footwear",
                "description": "Wide toe box shoes",
                "details": ["Avoid high heels", "Avoid narrow pointed shoes", "Consider stretching shoes"],
                "duration": "Ongoing",
                "evidenceLevel": "Essential for all patients"
            },
            {
                "name": "Padding and Taping",
                "description": "Reduce pressure",
                "details": ["Bunion pads over prominence", "Toe spacers", "Taping to correct alignment temporarily"],
                "evidenceLevel": "Symptomatic relief"
            },
            {
                "name": "Orthotics",
                "description": "Support foot mechanics",
                "details": ["May slow progression", "Especially if flat footed"],
                "evidenceLevel": "Moderate evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Bunionectomy",
                "description": "Surgical correction of bunion",
                "indications": "Painful bunion not responding to conservative measures",
                "procedure": "Bone cuts (osteotomies) to realign toe, many techniques available",
                "recovery": "Weight bearing in special shoe 4-6 weeks, full recovery 3-6 months",
                "successRate": "85-90% good outcomes"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Elevate, rest, wound healing"},
            {"phase": "Week 2-6", "milestone": "Weight bearing in surgical shoe"},
            {"phase": "Week 6-12", "milestone": "Transition to regular shoes"},
            {"phase": "Month 3-6", "milestone": "Full recovery, swelling resolves"}
        ],
        "faqs": [
            {"question": "Can bunions be corrected without surgery?", "answer": "Bunion deformity cannot be reversed without surgery. Conservative treatment can relieve symptoms but won't change the bone alignment."},
            {"question": "Do bunions come back after surgery?", "answer": "Recurrence is possible (5-10%) but uncommon with modern techniques. Following post-operative instructions and wearing appropriate shoes reduces risk."}
        ],
        "relatedConditions": ["flat-feet", "osteoarthritis"],
        "relatedTreatments": ["joint-injections"]
    },
    "ganglion-cyst": {
        "name": "Ganglion Cyst",
        "category": "Hand/Wrist",
        "icon": "✋",
        "imageUrl": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
        "overview": "A ganglion cyst is a fluid-filled sac that forms near joints or tendons, most commonly on the wrist. Dr. B Harsha Vardhana Reddy provides expert treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Unknown (may follow injury)",
            "Joint or tendon irritation",
            "Repetitive stress",
            "Common in women 20-40 years old"
        ],
        "symptoms": [
            {"name": "Visible lump", "description": "Usually on back of wrist"},
            {"name": "Pain with activity", "description": "May be painless"},
            {"name": "Size changes", "description": "May enlarge with use, shrink with rest"},
            {"name": "Numbness", "description": "If pressing on nerve"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Transillumination (light shines through)"},
            {"name": "Ultrasound", "description": "Confirms cystic nature"},
            {"name": "MRI", "description": "If diagnosis uncertain"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Observation",
                "description": "Many resolve spontaneously",
                "details": ["Watch and wait if painless", "Up to 50% resolve on their own"],
                "duration": "6-12 months",
                "evidenceLevel": "Reasonable first option"
            },
            {
                "name": "Aspiration",
                "description": "Drain the cyst with needle",
                "details": ["Simple office procedure", "Recurrence rate 50-70%", "May need repeated"],
                "evidenceLevel": "Moderate success rate"
            },
            {
                "name": "Splinting",
                "description": "Immobilize to reduce irritation",
                "details": ["May help cyst shrink", "Use during activities"],
                "evidenceLevel": "Supportive measure"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Ganglion Excision",
                "description": "Surgically remove cyst",
                "indications": "Persistent, painful, or recurrent after aspiration",
                "procedure": "Small incision, remove cyst and stalk",
                "recovery": "2-4 weeks for wound healing",
                "successRate": "85-95% (lower recurrence than aspiration)"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Post-aspiration", "milestone": "Immediate return to activities"},
            {"phase": "Post-surgery Week 1-2", "milestone": "Wound healing, light use"},
            {"phase": "Week 2-4", "milestone": "Return to normal activities"}
        ],
        "faqs": [
            {"question": "Can I pop a ganglion cyst myself?", "answer": "Do not try to 'pop' the cyst yourself (the 'Bible method'). This can cause injury and infection. See a doctor for proper treatment."},
            {"question": "Do ganglion cysts go away?", "answer": "Yes, about 50% of ganglion cysts resolve on their own over time. However, persistent or symptomatic cysts may need treatment."}
        ],
        "relatedConditions": ["carpal-tunnel", "de-quervains-tenosynovitis"],
        "relatedTreatments": ["joint-injections"]
    },
    "bakers-cyst": {
        "name": "Baker's Cyst",
        "category": "Knee",
        "icon": "🦵",
        "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "overview": "A Baker's cyst is a fluid-filled swelling behind the knee. It's usually associated with knee problems like arthritis or meniscus tears. Dr. B Harsha Vardhana Reddy provides comprehensive knee care at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Knee arthritis",
            "Meniscus tears",
            "ACL injuries",
            "Rheumatoid arthritis",
            "Other conditions causing excess joint fluid"
        ],
        "symptoms": [
            {"name": "Swelling behind knee", "description": "Visible or palpable lump"},
            {"name": "Knee stiffness", "description": "Difficulty fully bending knee"},
            {"name": "Aching pain", "description": "Behind the knee"},
            {"name": "Symptoms worse with activity", "description": "Or prolonged standing"},
            {"name": "Ruptured cyst symptoms", "description": "Sudden calf pain and swelling"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Palpable cyst behind knee"},
            {"name": "Ultrasound", "description": "Confirms cyst and size"},
            {"name": "MRI", "description": "Shows cyst and underlying knee pathology"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Treat Underlying Cause",
                "description": "Address knee arthritis or meniscus tear",
                "details": ["Cyst is secondary to knee problem", "Treating cause often resolves cyst"],
                "evidenceLevel": "Most important approach"
            },
            {
                "name": "Observation",
                "description": "Many cysts resolve when knee improves",
                "details": ["Watch and wait", "Ice and elevation for comfort"],
                "evidenceLevel": "Reasonable if asymptomatic"
            },
            {
                "name": "Aspiration and Injection",
                "description": "Drain cyst fluid",
                "details": ["Ultrasound-guided aspiration", "Often combined with steroid injection", "Recurrence common without treating cause"],
                "evidenceLevel": "Provides temporary relief"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Arthroscopic Treatment",
                "description": "Address underlying knee problem",
                "indications": "Meniscus tear or other pathology causing cyst",
                "procedure": "Treat the cause (meniscus repair/removal), cyst often resolves",
                "recovery": "Depends on procedure",
                "successRate": "80%+ cyst resolution"
            },
            {
                "name": "Cyst Excision",
                "description": "Direct removal (rarely needed)",
                "indications": "Persistent symptomatic cyst despite treatment",
                "procedure": "Open surgical removal",
                "recovery": "2-4 weeks",
                "successRate": "High but recurrence possible if cause not addressed"
            }
        ],
        "recoveryTimeline": [
            {"phase": "After treating cause", "milestone": "Cyst often resolves over weeks to months"},
            {"phase": "Post-aspiration", "milestone": "Immediate but often recurs"},
            {"phase": "Post-surgery", "milestone": "Depends on underlying procedure"}
        ],
        "faqs": [
            {"question": "Is a Baker's cyst dangerous?", "answer": "Baker's cysts are not dangerous, but they can rupture causing sudden calf pain and swelling. This needs to be differentiated from a blood clot (DVT)."},
            {"question": "Do Baker's cysts go away?", "answer": "Many resolve when the underlying knee problem is treated. If the cause persists, the cyst often recurs even after drainage."}
        ],
        "relatedConditions": ["knee-arthritis", "meniscus-tear"],
        "relatedTreatments": ["knee-arthroscopy"]
    },
    "osgood-schlatter": {
        "name": "Osgood-Schlatter Disease",
        "category": "Knee",
        "icon": "🦵",
        "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "overview": "Osgood-Schlatter disease causes knee pain in growing adolescents, especially those active in sports. It affects the bump below the kneecap where the patellar tendon attaches. Dr. B Harsha Vardhana Reddy provides expert pediatric orthopedic care at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Growth spurt combined with athletic activity",
            "Repetitive stress on tibial tubercle",
            "Sports involving running and jumping",
            "Ages 10-15 (during growth spurts)",
            "More common in boys"
        ],
        "symptoms": [
            {"name": "Pain below kneecap", "description": "At the tibial tubercle"},
            {"name": "Swelling at tibial tubercle", "description": "Visible bump may enlarge"},
            {"name": "Pain with activity", "description": "Running, jumping, kneeling"},
            {"name": "Pain with kneeling", "description": "Direct pressure on bump"},
            {"name": "Tight quadriceps", "description": "Common finding"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Tender, enlarged tibial tubercle"},
            {"name": "X-rays", "description": "May show fragmentation of tubercle"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Activity Modification",
                "description": "Reduce sports if needed",
                "details": ["Continue sports if tolerable", "Rest from aggravating activities if severe"],
                "duration": "Until symptoms improve",
                "evidenceLevel": "Primary treatment"
            },
            {
                "name": "Ice",
                "description": "After activity",
                "details": ["Ice 15-20 minutes", "After sports activities"],
                "evidenceLevel": "Supportive care"
            },
            {
                "name": "Stretching",
                "description": "Quadriceps and hamstring stretches",
                "details": ["Daily stretching program", "Reduces stress on tubercle"],
                "duration": "Ongoing",
                "evidenceLevel": "Helpful for most patients"
            },
            {
                "name": "Patellar Strap",
                "description": "Reduce pull on tibial tubercle",
                "details": ["Worn during activity", "May reduce symptoms"],
                "evidenceLevel": "Some patients find helpful"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Ossicle Excision",
                "description": "Remove painful bone fragment",
                "indications": "Persistent pain after growth completed, painful ossicle",
                "procedure": "Remove loose bone fragment (rare)",
                "recovery": "4-6 weeks",
                "successRate": "Good for selected cases"
            }
        ],
        "recoveryTimeline": [
            {"phase": "During growth", "milestone": "Manage symptoms, stay active as able"},
            {"phase": "Growth completion", "milestone": "Symptoms typically resolve"},
            {"phase": "Full resolution", "milestone": "Usually by age 16-18"}
        ],
        "faqs": [
            {"question": "Will my child outgrow Osgood-Schlatter?", "answer": "Yes, symptoms almost always resolve once growth is complete, usually by age 16-18. The bump may remain but becomes painless."},
            {"question": "Should my child stop sports?", "answer": "Not necessarily. Many children can continue playing with activity modification. Only complete rest is needed in severe cases."}
        ],
        "relatedConditions": ["patellofemoral-syndrome"],
        "relatedTreatments": []
    },
    "spinal-fracture": {
        "name": "Spinal Fracture",
        "category": "Spine",
        "icon": "🔴",
        "imageUrl": "https://images.pexels.com/photos/5473184/pexels-photo-5473184.jpeg?auto=compress&cs=tinysrgb&w=800",
        "overview": "Spinal fractures range from minor compression fractures to severe injuries affecting the spinal cord. Dr. B Harsha Vardhana Reddy provides 24/7 trauma care at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "High-energy trauma (accidents, falls from height)",
            "Osteoporotic compression fractures",
            "Sports injuries",
            "Pathological fractures (tumors)"
        ],
        "symptoms": [
            {"name": "Back pain", "description": "At level of fracture"},
            {"name": "Neurological symptoms", "description": "Numbness, weakness if cord involved"},
            {"name": "Deformity", "description": "Kyphosis in compression fractures"},
            {"name": "Difficulty walking", "description": "If severe"},
            {"name": "Bowel/bladder dysfunction", "description": "Emergency - cord compression"}
        ],
        "diagnosis": [
            {"name": "X-rays", "description": "Show fracture and alignment"},
            {"name": "CT Scan", "description": "Detail of bony injury"},
            {"name": "MRI", "description": "Evaluate spinal cord and soft tissues"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Bracing",
                "description": "For stable fractures",
                "details": ["TLSO brace for thoracolumbar fractures", "Cervical collar for neck fractures"],
                "duration": "8-12 weeks",
                "evidenceLevel": "Standard treatment for stable fractures"
            },
            {
                "name": "Pain Management",
                "description": "Medications and rest",
                "details": ["Pain medications", "Activity modification", "Gradual return to activity"],
                "evidenceLevel": "Supportive care"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Vertebroplasty/Kyphoplasty",
                "description": "Cement injection for compression fractures",
                "indications": "Painful osteoporotic compression fractures",
                "procedure": "Inject bone cement into fractured vertebra",
                "recovery": "Quick pain relief, same-day procedure",
                "successRate": "80-90% pain relief"
            },
            {
                "name": "Spinal Fusion",
                "description": "Stabilize unstable fractures",
                "indications": "Unstable fractures, neurological compromise",
                "procedure": "Screws and rods to stabilize, decompress if needed",
                "recovery": "Hospital 3-5 days, full recovery 3-6 months",
                "successRate": "90%+ stability"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Pain control, begin mobilization"},
            {"phase": "Week 2-8", "milestone": "Brace wear, gradual activity"},
            {"phase": "Month 2-3", "milestone": "Fracture healing"},
            {"phase": "Month 3-6", "milestone": "Return to activities"}
        ],
        "faqs": [
            {"question": "Do spinal fractures heal on their own?", "answer": "Most stable compression fractures heal with bracing. Unstable fractures or those with neurological compromise often need surgery."},
            {"question": "Can I walk with a spinal fracture?", "answer": "Many patients can walk with stable fractures while wearing a brace. Your doctor will determine if it's safe based on the fracture type."}
        ],
        "relatedConditions": ["osteoarthritis", "spinal-stenosis"],
        "relatedTreatments": ["spinal-decompression", "fracture-fixation"]
    }
}

ADDITIONAL_TREATMENTS_DATA = {
    "hip-arthroscopy": {
        "name": "Hip Arthroscopy",
        "category": "Minimally Invasive",
        "icon": "🔬",
        "imageUrl": "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
        "heroTitle": "Hip Arthroscopy in Hyderabad",
        "heroSubtitle": "Minimally invasive hip surgery for faster recovery.",
        "overview": "Hip arthroscopy uses small incisions and a camera to diagnose and treat hip problems. Dr. B Harsha Vardhana Reddy performs advanced hip arthroscopy at Apollo Hospitals, Financial District, Hyderabad.",
        "statistics": [
            {"label": "Incisions", "value": "2-3", "description": "Small portals"},
            {"label": "Surgery Time", "value": "1-2 hrs", "description": "Depending on procedure"},
            {"label": "Hospital Stay", "value": "Day care", "description": "Same-day discharge"},
            {"label": "Return to Sports", "value": "4-6 months", "description": "With full rehab"}
        ],
        "candidatesFor": [
            "Hip labral tears",
            "Femoroacetabular impingement (FAI)",
            "Loose bodies",
            "Snapping hip",
            "Early hip arthritis",
            "Diagnostic uncertainty"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Anesthesia", "description": "General or spinal anesthesia", "duration": "30 minutes"},
            {"step": 2, "title": "Positioning", "description": "Special hip distractor to create space", "duration": "15 minutes"},
            {"step": 3, "title": "Portal Placement", "description": "2-3 small incisions for camera and instruments", "duration": "10 minutes"},
            {"step": 4, "title": "Joint Inspection", "description": "Evaluate labrum, cartilage, bone", "duration": "15 minutes"},
            {"step": 5, "title": "Treatment", "description": "Labral repair, bone shaving, loose body removal", "duration": "45-90 minutes"}
        ],
        "benefits": [
            {"title": "Minimally Invasive", "description": "Small incisions, less scarring", "icon": "✓"},
            {"title": "Hip Preservation", "description": "Delays or prevents hip replacement", "icon": "✓"},
            {"title": "Faster Recovery", "description": "Compared to open surgery", "icon": "✓"},
            {"title": "Outpatient", "description": "Go home same day", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Crutches, limited weight bearing", "activities": "Gentle ROM exercises"},
            {"phase": "Week 2-6", "milestone": "Progress weight bearing", "activities": "Physical therapy"},
            {"phase": "Month 2-4", "milestone": "Strengthening", "activities": "Progressive exercises"},
            {"phase": "Month 4-6", "milestone": "Return to activities", "activities": "Sport-specific training"}
        ],
        "risks": [
            {"risk": "Nerve injury", "percentage": "1-2%", "prevention": "Careful portal placement"},
            {"risk": "Heterotopic ossification", "percentage": "1-5%", "prevention": "NSAIDs post-op"},
            {"risk": "Persistent pain", "percentage": "5-10%", "prevention": "Proper patient selection"}
        ],
        "faqs": [
            {"question": "How long do I need crutches after hip arthroscopy?", "answer": "Typically 2-4 weeks, depending on the procedure. Labral repair may require longer protected weight bearing."},
            {"question": "When can I drive after hip arthroscopy?", "answer": "Usually 2-4 weeks, when you're off crutches and have good muscle control. Earlier for left hip if you drive automatic."}
        ],
        "relatedConditions": ["hip-labral-tear", "hip-arthritis"],
        "relatedTreatments": ["total-hip-replacement"]
    },
    "shoulder-replacement": {
        "name": "Shoulder Replacement",
        "category": "Joint Replacement",
        "icon": "💪",
        "imageUrl": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
        "heroTitle": "Shoulder Replacement Surgery in Hyderabad",
        "heroSubtitle": "Advanced shoulder replacement for pain-free movement.",
        "overview": "Shoulder replacement replaces damaged joint surfaces with artificial components. Dr. B Harsha Vardhana Reddy performs anatomic and reverse shoulder replacements at Apollo Hospitals, Financial District, Hyderabad.",
        "statistics": [
            {"label": "Success Rate", "value": "90%+", "description": "Pain relief"},
            {"label": "Implant Life", "value": "15-20 yrs", "description": "Modern implants"},
            {"label": "Hospital Stay", "value": "1-2 days", "description": "Quick discharge"},
            {"label": "Recovery", "value": "3-6 months", "description": "Full function"}
        ],
        "candidatesFor": [
            "Severe shoulder arthritis",
            "Rotator cuff tear arthropathy",
            "Failed previous shoulder surgery",
            "Complex shoulder fractures",
            "Avascular necrosis"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Anesthesia", "description": "General with nerve block", "duration": "30 minutes"},
            {"step": 2, "title": "Incision", "description": "Front of shoulder (deltopectoral)", "duration": "10 minutes"},
            {"step": 3, "title": "Expose Joint", "description": "Access ball and socket", "duration": "20 minutes"},
            {"step": 4, "title": "Prepare Bone", "description": "Remove damaged surfaces", "duration": "30 minutes"},
            {"step": 5, "title": "Place Implants", "description": "Insert ball and socket components", "duration": "30 minutes"},
            {"step": 6, "title": "Closure", "description": "Repair tissues, close wound", "duration": "30 minutes"}
        ],
        "benefits": [
            {"title": "Pain Relief", "description": "90%+ excellent pain relief", "icon": "✓"},
            {"title": "Improved Function", "description": "Reach, lift, dress independently", "icon": "✓"},
            {"title": "Better Sleep", "description": "No more night pain", "icon": "✓"},
            {"title": "Long-lasting", "description": "15-20 year implant life", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-4", "milestone": "Sling, passive motion", "activities": "Pendulum exercises"},
            {"phase": "Week 4-8", "milestone": "Active motion begins", "activities": "PT progression"},
            {"phase": "Month 2-4", "milestone": "Strengthening", "activities": "Progressive exercises"},
            {"phase": "Month 4-6", "milestone": "Full recovery", "activities": "Most activities allowed"}
        ],
        "risks": [
            {"risk": "Infection", "percentage": "1%", "prevention": "Antibiotics, sterile technique"},
            {"risk": "Dislocation", "percentage": "1-3%", "prevention": "Activity precautions"},
            {"risk": "Loosening", "percentage": "5% at 10 years", "prevention": "Proper technique, avoid overuse"}
        ],
        "faqs": [
            {"question": "What is the difference between anatomic and reverse shoulder replacement?", "answer": "Anatomic replacement is for arthritis with intact rotator cuff. Reverse replacement is for arthritis with rotator cuff tear - it uses deltoid muscle instead of cuff."},
            {"question": "How long do I wear a sling after shoulder replacement?", "answer": "Typically 4-6 weeks. The sling protects healing tissues while you begin gentle motion exercises."}
        ],
        "relatedConditions": ["shoulder-arthritis", "rotator-cuff"],
        "relatedTreatments": ["shoulder-arthroscopy"]
    },
    "spinal-decompression": {
        "name": "Spinal Decompression Surgery",
        "category": "Spine Surgery",
        "icon": "🔵",
        "imageUrl": "https://images.pexels.com/photos/5473184/pexels-photo-5473184.jpeg?auto=compress&cs=tinysrgb&w=800",
        "heroTitle": "Spinal Decompression Surgery in Hyderabad",
        "heroSubtitle": "Relieve nerve pressure and restore quality of life.",
        "overview": "Spinal decompression surgery removes bone and tissue compressing spinal nerves. Dr. B Harsha Vardhana Reddy performs minimally invasive spine procedures at Apollo Hospitals, Financial District, Hyderabad.",
        "statistics": [
            {"label": "Success Rate", "value": "80-90%", "description": "Symptom relief"},
            {"label": "Surgery Time", "value": "1-3 hrs", "description": "Varies by extent"},
            {"label": "Hospital Stay", "value": "1-3 days", "description": "Depends on procedure"},
            {"label": "Return to Work", "value": "4-8 weeks", "description": "Desk job"}
        ],
        "candidatesFor": [
            "Spinal stenosis with neurogenic claudication",
            "Herniated disc with radiculopathy",
            "Failed conservative treatment",
            "Progressive neurological symptoms",
            "Significant quality of life impairment"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Anesthesia", "description": "General anesthesia", "duration": "30 minutes"},
            {"step": 2, "title": "Incision", "description": "Midline back incision over affected levels", "duration": "10 minutes"},
            {"step": 3, "title": "Expose Spine", "description": "Retract muscles, expose lamina", "duration": "20 minutes"},
            {"step": 4, "title": "Decompress", "description": "Remove lamina, ligament, disc as needed", "duration": "60-90 minutes"},
            {"step": 5, "title": "Closure", "description": "Layered closure", "duration": "20 minutes"}
        ],
        "benefits": [
            {"title": "Leg Pain Relief", "description": "90% improvement in radicular symptoms", "icon": "✓"},
            {"title": "Walk Further", "description": "Relieves neurogenic claudication", "icon": "✓"},
            {"title": "Minimally Invasive Options", "description": "Smaller incisions available", "icon": "✓"},
            {"title": "Same-day Walking", "description": "Early mobilization", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Day 1", "milestone": "Walk with assistance", "activities": "Hospital recovery"},
            {"phase": "Week 1-2", "milestone": "Increase activity", "activities": "Walking, basic tasks"},
            {"phase": "Week 2-6", "milestone": "Return to light activities", "activities": "Desk work"},
            {"phase": "Week 6-12", "milestone": "Progressive activity", "activities": "Most activities"},
            {"phase": "Month 3-6", "milestone": "Full recovery", "activities": "All activities"}
        ],
        "risks": [
            {"risk": "Dural tear (CSF leak)", "percentage": "2-5%", "prevention": "Careful technique"},
            {"risk": "Infection", "percentage": "1-2%", "prevention": "Antibiotics"},
            {"risk": "Instability requiring fusion", "percentage": "5-10%", "prevention": "Preserve facets"}
        ],
        "faqs": [
            {"question": "Will I need fusion with my decompression?", "answer": "Not always. Fusion is added when there is instability or spondylolisthesis. Many decompressions are done without fusion."},
            {"question": "How long is hospital stay after laminectomy?", "answer": "Usually 1-2 days. Some minimally invasive procedures allow same-day discharge."}
        ],
        "relatedConditions": ["spinal-stenosis", "herniated-disc", "sciatica"],
        "relatedTreatments": ["fracture-fixation"]
    },
    "hip-replacement": {
        "name": "Hip Replacement (General)",
        "category": "Joint Replacement",
        "icon": "🦴",
        "imageUrl": "https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=800",
        "heroTitle": "Hip Replacement Surgery in Hyderabad",
        "heroSubtitle": "Restore mobility with advanced hip replacement techniques.",
        "overview": "Hip replacement surgery replaces damaged hip joint surfaces with artificial components. Dr. B Harsha Vardhana Reddy performs both anterior and posterior approach hip replacements at Apollo Hospitals, Financial District, Hyderabad.",
        "statistics": [
            {"label": "Success Rate", "value": "95%+", "description": "Patient satisfaction"},
            {"label": "Implant Life", "value": "25+ yrs", "description": "Modern implants"},
            {"label": "Hospital Stay", "value": "1-3 days", "description": "Quick discharge"},
            {"label": "Walking", "value": "Same day", "description": "With rapid recovery"}
        ],
        "candidatesFor": [
            "Hip osteoarthritis",
            "Avascular necrosis (AVN)",
            "Hip fractures in elderly",
            "Rheumatoid arthritis",
            "Failed previous hip surgery"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Anesthesia", "description": "Spinal or general anesthesia", "duration": "30 minutes"},
            {"step": 2, "title": "Approach", "description": "Anterior or posterior incision", "duration": "15 minutes"},
            {"step": 3, "title": "Remove Damaged Joint", "description": "Remove femoral head and prepare socket", "duration": "30 minutes"},
            {"step": 4, "title": "Place Implants", "description": "Insert cup, liner, stem, and head", "duration": "30 minutes"},
            {"step": 5, "title": "Test and Close", "description": "Check stability, close wound", "duration": "30 minutes"}
        ],
        "benefits": [
            {"title": "Pain Relief", "description": "95%+ significant pain relief", "icon": "✓"},
            {"title": "Restored Mobility", "description": "Walk, climb stairs, travel", "icon": "✓"},
            {"title": "Quick Recovery", "description": "Same-day walking with rapid protocols", "icon": "✓"},
            {"title": "Long-lasting", "description": "Modern implants last 25+ years", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Day 0-1", "milestone": "Walk with walker", "activities": "Hospital recovery"},
            {"phase": "Week 1-2", "milestone": "Walk with support", "activities": "Home exercises"},
            {"phase": "Week 2-6", "milestone": "Transition to cane", "activities": "PT progression"},
            {"phase": "Week 6-12", "milestone": "Walk independently", "activities": "Most activities"},
            {"phase": "Month 3-6", "milestone": "Full recovery", "activities": "Golf, travel, cycling"}
        ],
        "risks": [
            {"risk": "Dislocation", "percentage": "1-2%", "prevention": "Hip precautions, anterior approach"},
            {"risk": "Infection", "percentage": "1%", "prevention": "Antibiotics, laminar flow OR"},
            {"risk": "Blood clot", "percentage": "1-2%", "prevention": "Blood thinners, early walking"}
        ],
        "faqs": [
            {"question": "How long does a hip replacement last?", "answer": "Modern hip replacements can last 25+ years. With ceramic bearings and proper care, many patients never need revision."},
            {"question": "Which approach is better - anterior or posterior?", "answer": "Both have excellent results. Anterior may have faster early recovery. Posterior is more versatile for complex cases. Your surgeon will recommend the best option."}
        ],
        "relatedConditions": ["hip-arthritis", "avascular-necrosis-avn"],
        "relatedTreatments": ["hip-arthroscopy"]
    },
    "minimally-invasive-knee-replacement": {
        "name": "Minimally Invasive Knee Replacement",
        "category": "Joint Replacement",
        "icon": "🦵",
        "imageUrl": "https://images.pexels.com/photos/263337/pexels-photo-263337.jpeg?auto=compress&cs=tinysrgb&w=800",
        "heroTitle": "Minimally Invasive Knee Replacement in Hyderabad",
        "heroSubtitle": "Faster recovery with smaller incisions.",
        "overview": "Minimally invasive knee replacement uses smaller incisions and muscle-sparing techniques for faster recovery. Dr. B Harsha Vardhana Reddy performs advanced knee replacement at Apollo Hospitals, Financial District, Hyderabad.",
        "statistics": [
            {"label": "Incision Size", "value": "8-10 cm", "description": "Vs 15-20 cm traditional"},
            {"label": "Hospital Stay", "value": "1-2 days", "description": "Shorter recovery"},
            {"label": "Success Rate", "value": "95%+", "description": "Same as traditional"},
            {"label": "Walking", "value": "Day 1", "description": "Early mobilization"}
        ],
        "candidatesFor": [
            "Primary knee arthritis",
            "Body weight and size within limits",
            "Good bone quality",
            "No previous major knee surgery",
            "Motivated patients"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Anesthesia", "description": "Spinal with nerve blocks", "duration": "30 minutes"},
            {"step": 2, "title": "Small Incision", "description": "8-10 cm midline incision", "duration": "5 minutes"},
            {"step": 3, "title": "Muscle-Sparing Approach", "description": "Work between muscles", "duration": "20 minutes"},
            {"step": 4, "title": "Bone Preparation", "description": "Precise cuts with specialized instruments", "duration": "45 minutes"},
            {"step": 5, "title": "Implant Placement", "description": "Place components through small incision", "duration": "30 minutes"},
            {"step": 6, "title": "Closure", "description": "Close wound", "duration": "15 minutes"}
        ],
        "benefits": [
            {"title": "Smaller Incision", "description": "Better cosmetic result", "icon": "✓"},
            {"title": "Less Pain", "description": "Muscle-sparing technique", "icon": "✓"},
            {"title": "Faster Recovery", "description": "Earlier return to activities", "icon": "✓"},
            {"title": "Same Long-Term Results", "description": "Equal to traditional approach", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Day 1", "milestone": "Walk with walker", "activities": "Begin PT"},
            {"phase": "Day 2-3", "milestone": "Discharge home", "activities": "Home exercises"},
            {"phase": "Week 2", "milestone": "Climb stairs", "activities": "Increasing activity"},
            {"phase": "Week 4-6", "milestone": "Drive, desk work", "activities": "Most activities"},
            {"phase": "Month 3", "milestone": "Full recovery", "activities": "Golf, travel"}
        ],
        "risks": [
            {"risk": "Infection", "percentage": "1%", "prevention": "Antibiotics, sterile technique"},
            {"risk": "Blood clots", "percentage": "1-2%", "prevention": "Blood thinners, early walking"},
            {"risk": "Stiffness", "percentage": "5%", "prevention": "Early motion PT"}
        ],
        "faqs": [
            {"question": "Is minimally invasive knee replacement better?", "answer": "It offers faster early recovery and smaller scars. Long-term results are the same as traditional surgery. Not all patients are candidates."},
            {"question": "Who is NOT a candidate for minimally invasive TKR?", "answer": "Very obese patients, those with previous knee surgery, severe deformity, or poor bone quality may not be candidates."}
        ],
        "relatedConditions": ["knee-arthritis"],
        "relatedTreatments": ["total-knee-replacement"]
    },
    "robotic-hip-replacement": {
        "name": "Robotic Hip Replacement",
        "category": "Joint Replacement",
        "icon": "🤖",
        "imageUrl": "https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=800",
        "heroTitle": "Robotic Hip Replacement in Hyderabad",
        "heroSubtitle": "Precision surgery with robotic assistance.",
        "overview": "Robotic-assisted hip replacement uses advanced technology for precise implant positioning. Dr. B Harsha Vardhana Reddy performs robotic hip surgery at Apollo Hospitals, Financial District, Hyderabad.",
        "statistics": [
            {"label": "Precision", "value": "1mm", "description": "Accuracy in placement"},
            {"label": "Success Rate", "value": "97%+", "description": "Excellent outcomes"},
            {"label": "Hospital Stay", "value": "1-2 days", "description": "Same as traditional"},
            {"label": "Recovery", "value": "Enhanced", "description": "May be faster"}
        ],
        "candidatesFor": [
            "Primary hip arthritis",
            "AVN with minimal deformity",
            "Patients seeking precision",
            "Revision cases (selective)"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Pre-op CT Scan", "description": "Create 3D model of hip", "duration": "Weeks before surgery"},
            {"step": 2, "title": "Surgical Planning", "description": "Surgeon plans optimal implant position", "duration": "Before surgery"},
            {"step": 3, "title": "Registration", "description": "Map patient's anatomy to plan", "duration": "15 minutes"},
            {"step": 4, "title": "Robotic-Assisted Bone Preparation", "description": "Robot guides surgeon's cuts", "duration": "45 minutes"},
            {"step": 5, "title": "Implant Placement", "description": "Precisely positioned components", "duration": "30 minutes"}
        ],
        "benefits": [
            {"title": "Precision", "description": "Accurate implant positioning", "icon": "✓"},
            {"title": "Customized", "description": "Plan based on your anatomy", "icon": "✓"},
            {"title": "Surgeon Control", "description": "Robot assists, surgeon operates", "icon": "✓"},
            {"title": "Optimal Alignment", "description": "May reduce wear and loosening", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Day 0-1", "milestone": "Walk with support", "activities": "Hospital recovery"},
            {"phase": "Week 1-2", "milestone": "Home exercises", "activities": "PT begins"},
            {"phase": "Week 2-6", "milestone": "Transition to cane", "activities": "Increasing activity"},
            {"phase": "Week 6-12", "milestone": "Walk independently", "activities": "Most activities"},
            {"phase": "Month 3-6", "milestone": "Full recovery", "activities": "All activities"}
        ],
        "risks": [
            {"risk": "Same as traditional hip replacement", "percentage": "1-2%", "prevention": "Standard precautions"}
        ],
        "faqs": [
            {"question": "Is robotic hip replacement better than traditional?", "answer": "Robotic surgery offers more precise implant positioning. Early results are excellent, but long-term studies are ongoing."},
            {"question": "Does the robot do the surgery?", "answer": "No, the surgeon performs the surgery with robotic assistance for precision. The robot cannot act on its own."}
        ],
        "relatedConditions": ["hip-arthritis", "avascular-necrosis-avn"],
        "relatedTreatments": ["total-hip-replacement"]
    },
    "arthroscopic-surgery": {
        "name": "Arthroscopic Surgery",
        "category": "Minimally Invasive",
        "icon": "🔬",
        "imageUrl": "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
        "heroTitle": "Arthroscopic Surgery in Hyderabad",
        "heroSubtitle": "Minimally invasive joint surgery for faster recovery.",
        "overview": "Arthroscopy uses a tiny camera and small instruments to diagnose and treat joint problems through small incisions. Dr. B Harsha Vardhana Reddy performs arthroscopic procedures on knee, shoulder, hip, ankle, and wrist at Apollo Hospitals, Financial District, Hyderabad.",
        "statistics": [
            {"label": "Incision Size", "value": "5mm", "description": "Keyhole surgery"},
            {"label": "Hospital Stay", "value": "Day care", "description": "Go home same day"},
            {"label": "Recovery", "value": "Faster", "description": "Than open surgery"},
            {"label": "Joints", "value": "All", "description": "Knee, shoulder, hip, ankle, wrist"}
        ],
        "candidatesFor": [
            "Meniscus tears",
            "ACL and ligament injuries",
            "Rotator cuff tears",
            "Labral tears (shoulder/hip)",
            "Loose bodies",
            "Cartilage damage",
            "Diagnostic purposes"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Anesthesia", "description": "Regional or general anesthesia", "duration": "20 minutes"},
            {"step": 2, "title": "Portal Creation", "description": "2-3 small incisions (5mm)", "duration": "5 minutes"},
            {"step": 3, "title": "Joint Inspection", "description": "Camera inserted, evaluate joint", "duration": "10 minutes"},
            {"step": 4, "title": "Treatment", "description": "Repair, remove, or trim as needed", "duration": "20-90 minutes"},
            {"step": 5, "title": "Closure", "description": "Small stitches or steri-strips", "duration": "5 minutes"}
        ],
        "benefits": [
            {"title": "Small Incisions", "description": "Minimal scarring", "icon": "✓"},
            {"title": "Less Pain", "description": "Compared to open surgery", "icon": "✓"},
            {"title": "Faster Recovery", "description": "Return to activities sooner", "icon": "✓"},
            {"title": "Outpatient", "description": "Go home same day", "icon": "✓"},
            {"title": "Accurate Diagnosis", "description": "Direct visualization of joint", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Day 0", "milestone": "Go home same day", "activities": "Rest, ice, elevate"},
            {"phase": "Week 1-2", "milestone": "Light activities", "activities": "Gentle exercises"},
            {"phase": "Week 2-6", "milestone": "Progressive activity", "activities": "PT as prescribed"},
            {"phase": "Week 6-12", "milestone": "Return to activities", "activities": "Sport-specific"}
        ],
        "risks": [
            {"risk": "Infection", "percentage": "<1%", "prevention": "Sterile technique"},
            {"risk": "Stiffness", "percentage": "2-5%", "prevention": "Early motion"},
            {"risk": "Blood clots", "percentage": "1%", "prevention": "Early mobilization"}
        ],
        "faqs": [
            {"question": "How long does arthroscopic surgery take?", "answer": "Simple procedures take 30-45 minutes. Complex procedures like ACL reconstruction or rotator cuff repair take 60-90 minutes."},
            {"question": "Is arthroscopic surgery painful?", "answer": "There is some discomfort, but it's usually less than open surgery. Pain is well controlled with medications and improves quickly."}
        ],
        "relatedConditions": ["meniscus-tear", "acl-tear", "rotator-cuff"],
        "relatedTreatments": ["knee-arthroscopy", "shoulder-arthroscopy", "hip-arthroscopy"]
    }
}
