# Extended conditions and treatments detailed data for CMS enrichment
# This file contains comprehensive medical content for all orthopedic conditions and treatments

EXTENDED_CONDITIONS_DATA = {
    "rotator-cuff": {
        "name": "Rotator Cuff Tear",
        "category": "Shoulder",
        "icon": "💪",
        "imageUrl": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
        "overview": "The rotator cuff is a group of four muscles and tendons that stabilize the shoulder joint. Rotator cuff tears are common injuries that can occur from acute trauma or gradual degeneration. Dr. B Harsha Vardhana Reddy specializes in both arthroscopic repair and conservative management of rotator cuff injuries at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Acute injury from falling on an outstretched arm",
            "Lifting heavy objects with a jerking motion",
            "Age-related degeneration (most common in people over 40)",
            "Repetitive overhead activities (sports, occupational)",
            "Poor blood supply to the tendons",
            "Bone spurs causing impingement"
        ],
        "symptoms": [
            {"name": "Shoulder pain at rest and at night", "description": "Especially when lying on the affected side"},
            {"name": "Pain when lifting or lowering arm", "description": "Weakness with overhead activities"},
            {"name": "Crackling sensation", "description": "When moving shoulder in certain positions"},
            {"name": "Difficulty reaching behind back", "description": "Unable to tuck in shirt or fasten bra"},
            {"name": "Arm weakness", "description": "Difficulty lifting objects or rotating arm"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Specific tests including empty can test, drop arm test, lift-off test"},
            {"name": "X-rays", "description": "Show bone spurs and joint changes"},
            {"name": "MRI Scan", "description": "Gold standard - shows tear size, location, and muscle quality"},
            {"name": "Ultrasound", "description": "Dynamic assessment of tendon integrity"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Rest and Activity Modification",
                "description": "Avoid activities that aggravate symptoms",
                "details": [
                    "Avoid overhead activities and heavy lifting",
                    "Use arm in a comfortable range",
                    "Ice application for 20 minutes, 3-4 times daily",
                    "Over-the-counter pain medications as needed"
                ],
                "duration": "2-4 weeks initial rest",
                "evidenceLevel": "Standard of care"
            },
            {
                "name": "Physical Therapy",
                "description": "Strengthen surrounding muscles to compensate",
                "details": [
                    "Pendulum exercises for gentle range of motion",
                    "Isometric strengthening exercises",
                    "Scapular stabilization exercises",
                    "Progressive resistance training",
                    "Stretching for posterior capsule tightness"
                ],
                "duration": "6-12 weeks program",
                "evidenceLevel": "Strong evidence for partial tears"
            },
            {
                "name": "Corticosteroid Injections",
                "description": "Reduce inflammation and pain",
                "details": [
                    "Subacromial injection under ultrasound guidance",
                    "Provides 4-8 weeks of relief",
                    "Maximum 3-4 injections per year",
                    "May weaken tendon if overused"
                ],
                "evidenceLevel": "Moderate evidence for short-term relief"
            },
            {
                "name": "PRP Therapy",
                "link": "/treatments/prp-therapy",
                "description": "Platelet-rich plasma to promote healing",
                "details": [
                    "Blood drawn and processed to concentrate platelets",
                    "Injected into damaged tendon",
                    "May stimulate natural healing",
                    "2-3 injections typically required"
                ],
                "evidenceLevel": "Emerging evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Arthroscopic Rotator Cuff Repair",
                "link": "/treatments/shoulder-arthroscopy",
                "description": "Keyhole surgery to reattach torn tendon",
                "indications": "Full-thickness tears, failed conservative treatment, acute tears in young patients",
                "procedure": "Tendon reattached to bone using suture anchors through small incisions",
                "recovery": "Sling for 4-6 weeks, full recovery 4-6 months",
                "successRate": "85-95% for small to medium tears"
            },
            {
                "name": "Mini-Open Repair",
                "description": "Small incision repair for larger tears",
                "indications": "Large or massive tears, revision surgery",
                "procedure": "3-5 cm incision combined with arthroscopic techniques",
                "recovery": "Similar to arthroscopic repair",
                "successRate": "80-90% good outcomes"
            },
            {
                "name": "Tendon Transfer",
                "description": "Transfer nearby tendon to replace irreparable cuff",
                "indications": "Massive irreparable tears with good muscle function",
                "procedure": "Latissimus dorsi or lower trapezius transfer",
                "recovery": "6-9 months",
                "successRate": "Variable, 60-80% improvement"
            },
            {
                "name": "Reverse Shoulder Replacement",
                "link": "/treatments/shoulder-replacement",
                "description": "Joint replacement for cuff tear arthropathy",
                "indications": "Massive irreparable tear with arthritis",
                "procedure": "Special prosthesis that relies on deltoid muscle",
                "recovery": "3-6 months",
                "successRate": "90%+ pain relief"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Sling wear, gentle passive motion"},
            {"phase": "Week 3-6", "milestone": "Progress passive range of motion"},
            {"phase": "Week 6-12", "milestone": "Active motion, begin strengthening"},
            {"phase": "Month 3-4", "milestone": "Progressive strengthening"},
            {"phase": "Month 4-6", "milestone": "Return to activities"}
        ],
        "faqs": [
            {
                "question": "Can a rotator cuff tear heal on its own?",
                "answer": "Partial tears may improve with conservative treatment, but complete tears do not heal on their own. However, many people with tears can function well with physical therapy alone."
            },
            {
                "question": "How long is recovery after rotator cuff surgery?",
                "answer": "Full recovery typically takes 4-6 months. You'll wear a sling for 4-6 weeks and gradually progress through physical therapy. Return to sports may take 6-9 months."
            },
            {
                "question": "Is rotator cuff surgery worth it?",
                "answer": "For appropriate candidates, surgery has 85-95% success rates for pain relief and function. Surgery is most beneficial for active patients with full-thickness tears who have failed conservative treatment."
            }
        ],
        "relatedConditions": ["frozen-shoulder", "shoulder-impingement", "shoulder-arthritis"],
        "relatedTreatments": ["shoulder-arthroscopy", "shoulder-replacement", "prp-therapy"]
    },
    "shoulder-impingement": {
        "name": "Shoulder Impingement Syndrome",
        "category": "Shoulder",
        "icon": "🦴",
        "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "overview": "Shoulder impingement occurs when the rotator cuff tendons are pinched between the arm bone and the shoulder blade during arm elevation. This common condition causes pain with overhead activities. Dr. B Harsha Vardhana Reddy provides comprehensive treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Bone spurs on the acromion",
            "Thickened or inflamed bursa",
            "Rotator cuff tendinitis",
            "Poor posture (rounded shoulders)",
            "Repetitive overhead activities",
            "Weak rotator cuff muscles"
        ],
        "symptoms": [
            {"name": "Pain with overhead activities", "description": "Reaching, lifting, or throwing"},
            {"name": "Night pain", "description": "Difficulty sleeping on affected side"},
            {"name": "Weakness in shoulder", "description": "Especially with arm elevation"},
            {"name": "Pain in the front of shoulder", "description": "May radiate down the arm"},
            {"name": "Painful arc of motion", "description": "Pain between 60-120 degrees of elevation"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Neer test, Hawkins test, painful arc assessment"},
            {"name": "X-rays", "description": "Show bone spurs and acromion shape"},
            {"name": "MRI", "description": "Evaluate rotator cuff and bursa"},
            {"name": "Diagnostic Injection", "description": "Relief with subacromial injection confirms diagnosis"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Activity Modification",
                "description": "Avoid aggravating movements",
                "details": [
                    "Avoid overhead reaching and lifting",
                    "Modify work ergonomics",
                    "Sleep on unaffected side",
                    "Use ice for inflammation"
                ],
                "duration": "Ongoing lifestyle changes",
                "evidenceLevel": "Standard of care"
            },
            {
                "name": "Physical Therapy",
                "description": "Core treatment for impingement",
                "details": [
                    "Rotator cuff strengthening",
                    "Scapular stabilization exercises",
                    "Posterior capsule stretching",
                    "Postural correction",
                    "Core strengthening"
                ],
                "duration": "8-12 weeks",
                "evidenceLevel": "Strong evidence - first-line treatment"
            },
            {
                "name": "Corticosteroid Injection",
                "description": "Reduce inflammation in subacromial space",
                "details": [
                    "Injection into subacromial bursa",
                    "Provides temporary relief for PT",
                    "Not for long-term use",
                    "May be repeated 2-3 times"
                ],
                "evidenceLevel": "Moderate evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Arthroscopic Subacromial Decompression",
                "link": "/treatments/shoulder-arthroscopy",
                "description": "Remove bone spurs and create more space",
                "indications": "Failed 3-6 months of conservative treatment",
                "procedure": "Shave bone spur, remove inflamed bursa through keyhole incisions",
                "recovery": "2-4 weeks sling, 3-4 months full recovery",
                "successRate": "85-90% good to excellent results"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1", "milestone": "Sling for comfort, gentle pendulum exercises"},
            {"phase": "Week 2-4", "milestone": "Progress range of motion"},
            {"phase": "Month 2-3", "milestone": "Strengthening exercises"},
            {"phase": "Month 3-4", "milestone": "Return to activities"}
        ],
        "faqs": [
            {
                "question": "How long does shoulder impingement take to heal?",
                "answer": "With proper physical therapy, most patients improve within 6-12 weeks. Complete resolution may take 3-6 months. Surgery is rarely needed."
            },
            {
                "question": "Can I exercise with shoulder impingement?",
                "answer": "Yes, but avoid overhead exercises and heavy pressing. Focus on rotator cuff strengthening, rowing movements, and scapular exercises. Swimming (backstroke, not freestyle) can be helpful."
            }
        ],
        "relatedConditions": ["rotator-cuff", "frozen-shoulder", "bursitis"],
        "relatedTreatments": ["shoulder-arthroscopy", "prp-therapy"]
    },
    "shoulder-dislocation": {
        "name": "Shoulder Dislocation & Instability",
        "category": "Shoulder",
        "icon": "⚡",
        "imageUrl": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        "overview": "Shoulder dislocation occurs when the ball of the shoulder joint comes out of its socket. This can damage the labrum (cartilage rim) and capsule, leading to recurrent instability. Dr. B Harsha Vardhana Reddy specializes in arthroscopic stabilization procedures at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Sports injuries (contact sports, falls)",
            "Trauma (accidents, falls on outstretched arm)",
            "Hypermobility/loose ligaments",
            "Previous dislocations weakening the joint",
            "Seizures or electric shock"
        ],
        "symptoms": [
            {"name": "Severe pain after dislocation", "description": "Arm appears deformed, hanging at side"},
            {"name": "Apprehension with arm movement", "description": "Fear of dislocation with certain positions"},
            {"name": "Recurrent subluxation", "description": "Feeling of shoulder slipping out partially"},
            {"name": "Weakness and instability", "description": "Unable to trust shoulder with activities"},
            {"name": "Dead arm sensation", "description": "Momentary numbness or weakness with throwing"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Apprehension test, relocation test, sulcus sign"},
            {"name": "X-rays", "description": "Confirm dislocation and bone injuries (Bankart, Hill-Sachs)"},
            {"name": "MRI Arthrogram", "description": "Evaluate labral tear and capsular damage"},
            {"name": "CT Scan", "description": "Assess bone loss if significant"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Reduction",
                "description": "Put the shoulder back in place",
                "details": [
                    "Done in emergency room with sedation",
                    "Various techniques available",
                    "X-ray confirms successful reduction",
                    "Immediate pain relief after reduction"
                ],
                "duration": "Immediate procedure",
                "evidenceLevel": "Required emergency treatment"
            },
            {
                "name": "Immobilization",
                "description": "Sling wear after reduction",
                "details": [
                    "Sling for 2-4 weeks",
                    "Avoid external rotation",
                    "Ice for swelling",
                    "Pain medications as needed"
                ],
                "duration": "2-4 weeks",
                "evidenceLevel": "Standard post-reduction care"
            },
            {
                "name": "Physical Therapy",
                "description": "Strengthen to prevent recurrence",
                "details": [
                    "Rotator cuff strengthening",
                    "Scapular stabilization",
                    "Proprioception training",
                    "Sport-specific rehabilitation"
                ],
                "duration": "3-6 months",
                "evidenceLevel": "First-line for older patients"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Arthroscopic Bankart Repair",
                "link": "/treatments/bankart-repair",
                "description": "Repair torn labrum arthroscopically",
                "indications": "Young, active patients; recurrent dislocations; first-time in athletes",
                "procedure": "Reattach labrum to socket rim using suture anchors",
                "recovery": "Sling 4-6 weeks, sports at 4-6 months",
                "successRate": "85-95% prevention of recurrence"
            },
            {
                "name": "Latarjet Procedure",
                "description": "Bone block transfer for bone loss",
                "indications": "Significant bone loss, failed Bankart, contact athletes",
                "procedure": "Transfer coracoid bone to front of socket",
                "recovery": "Sling 4-6 weeks, sports at 4-6 months",
                "successRate": "95%+ success rate"
            },
            {
                "name": "Remplissage",
                "description": "Fill Hill-Sachs defect",
                "indications": "Engaging Hill-Sachs lesion with Bankart",
                "procedure": "Fill bone defect with rotator cuff tissue",
                "recovery": "Similar to Bankart repair",
                "successRate": "Combined with Bankart improves outcomes"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-4", "milestone": "Sling immobilization, gentle elbow and wrist exercises"},
            {"phase": "Week 4-8", "milestone": "Begin shoulder motion, sling weaning"},
            {"phase": "Month 2-4", "milestone": "Progressive strengthening"},
            {"phase": "Month 4-6", "milestone": "Sport-specific training, return to contact sports"}
        ],
        "faqs": [
            {
                "question": "Will my shoulder dislocate again?",
                "answer": "Without surgery, recurrence rates are high in young patients (80-90% under age 20, 50-60% ages 20-30). Surgery significantly reduces recurrence to less than 10%."
            },
            {
                "question": "When can I return to sports after shoulder stabilization?",
                "answer": "Contact sports typically at 4-6 months. Non-contact sports earlier at 3-4 months. Return depends on achieving strength and stability goals."
            }
        ],
        "relatedConditions": ["slap-tear", "rotator-cuff", "shoulder-arthritis"],
        "relatedTreatments": ["bankart-repair", "shoulder-arthroscopy"]
    },
    "tennis-elbow": {
        "name": "Tennis Elbow (Lateral Epicondylitis)",
        "category": "Elbow",
        "icon": "🎾",
        "imageUrl": "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
        "overview": "Tennis elbow is a painful condition caused by overuse of the forearm muscles and tendons. Despite its name, most cases occur in non-tennis players. Dr. B Harsha Vardhana Reddy provides comprehensive treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Repetitive gripping and wrist extension",
            "Computer mouse overuse",
            "Painting, carpentry, plumbing work",
            "Racket sports with poor technique",
            "Weightlifting (improper form)",
            "Age 30-50 most commonly affected"
        ],
        "symptoms": [
            {"name": "Pain on outer elbow", "description": "Over the lateral epicondyle"},
            {"name": "Weak grip strength", "description": "Difficulty holding objects"},
            {"name": "Pain with wrist extension", "description": "Lifting objects palm-down"},
            {"name": "Pain with twisting motions", "description": "Opening jars, turning doorknobs"},
            {"name": "Morning stiffness", "description": "Elbow feels tight in mornings"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Tenderness over lateral epicondyle, resisted wrist extension test"},
            {"name": "X-rays", "description": "Usually normal, rule out other conditions"},
            {"name": "Ultrasound", "description": "Shows tendon thickening and tears"},
            {"name": "MRI", "description": "If diagnosis unclear or surgical planning needed"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Rest and Activity Modification",
                "description": "Avoid aggravating activities",
                "details": [
                    "Avoid repetitive gripping",
                    "Use ergonomic tools",
                    "Take frequent breaks",
                    "Ice application for pain"
                ],
                "duration": "Ongoing",
                "evidenceLevel": "Essential first step"
            },
            {
                "name": "Bracing",
                "description": "Counterforce brace to reduce tendon strain",
                "details": [
                    "Forearm strap worn just below elbow",
                    "Reduces stress on damaged tendon",
                    "Wear during activities",
                    "Wrist splint at night may help"
                ],
                "duration": "Until symptoms resolve",
                "evidenceLevel": "Moderate evidence"
            },
            {
                "name": "Physical Therapy",
                "description": "Stretching and eccentric strengthening",
                "details": [
                    "Wrist extensor stretches",
                    "Eccentric strengthening exercises",
                    "Forearm muscle massage",
                    "Gradual return to activities"
                ],
                "duration": "6-12 weeks",
                "evidenceLevel": "Strong evidence for eccentric exercises"
            },
            {
                "name": "PRP Injection",
                "link": "/treatments/prp-therapy",
                "description": "Platelet-rich plasma to promote healing",
                "details": [
                    "More effective than steroid in long-term",
                    "Single or serial injections",
                    "May take 6-8 weeks to see benefit",
                    "Avoids steroid side effects"
                ],
                "evidenceLevel": "Growing evidence - preferred over steroids"
            },
            {
                "name": "Shockwave Therapy",
                "description": "Sound waves to stimulate healing",
                "details": [
                    "Non-invasive outpatient treatment",
                    "3-5 sessions typically",
                    "May be combined with PT"
                ],
                "evidenceLevel": "Moderate evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Arthroscopic Debridement",
                "description": "Remove damaged tissue arthroscopically",
                "indications": "Failed 6-12 months conservative treatment",
                "procedure": "Remove degenerative tissue, stimulate healing",
                "recovery": "2-4 weeks rest, 3-6 months full recovery",
                "successRate": "80-90% success"
            },
            {
                "name": "Open Release",
                "description": "Traditional surgery for severe cases",
                "indications": "Severe or recalcitrant cases",
                "procedure": "Release ECRB tendon origin, remove degenerated tissue",
                "recovery": "3-6 months",
                "successRate": "85-90% success"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Rest, ice, bracing"},
            {"phase": "Week 2-6", "milestone": "Begin PT, stretching"},
            {"phase": "Week 6-12", "milestone": "Eccentric strengthening"},
            {"phase": "Month 3-6", "milestone": "Gradual return to activities"}
        ],
        "faqs": [
            {
                "question": "How long does tennis elbow take to heal?",
                "answer": "Most cases resolve within 6-12 months with conservative treatment. However, some cases can be stubborn. PRP or surgery may be needed if symptoms persist."
            },
            {
                "question": "Should I get a cortisone injection for tennis elbow?",
                "answer": "Cortisone provides short-term relief but may actually slow long-term healing. PRP is now preferred for longer-lasting results without the risks of steroid."
            }
        ],
        "relatedConditions": ["golfers-elbow", "carpal-tunnel", "cubital-tunnel-syndrome"],
        "relatedTreatments": ["prp-therapy", "joint-injections"]
    },
    "golfers-elbow": {
        "name": "Golfer's Elbow (Medial Epicondylitis)",
        "category": "Elbow",
        "icon": "⛳",
        "imageUrl": "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",
        "overview": "Golfer's elbow affects the tendons on the inside of the elbow. Like tennis elbow, it's caused by repetitive motions and is not limited to golfers. Dr. B Harsha Vardhana Reddy provides expert treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Repetitive wrist flexion and forearm rotation",
            "Golf swing (especially improper technique)",
            "Throwing sports (baseball, javelin)",
            "Racket sports",
            "Weight training",
            "Occupations requiring repetitive gripping"
        ],
        "symptoms": [
            {"name": "Pain on inner elbow", "description": "Over the medial epicondyle"},
            {"name": "Weakness in wrist and hand", "description": "Difficulty gripping"},
            {"name": "Numbness or tingling", "description": "May radiate to ring and little fingers"},
            {"name": "Pain with gripping", "description": "Especially turning doorknobs"},
            {"name": "Stiffness in elbow", "description": "May have reduced range of motion"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Tenderness over medial epicondyle, resisted wrist flexion test"},
            {"name": "X-rays", "description": "Usually normal"},
            {"name": "Ultrasound/MRI", "description": "Evaluate tendon damage"},
            {"name": "Nerve Studies", "description": "If ulnar nerve symptoms present"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "RICE and Activity Modification",
                "description": "Rest, ice, and avoid aggravating activities",
                "details": [
                    "Avoid gripping activities",
                    "Ice 15-20 minutes several times daily",
                    "NSAIDs for pain and inflammation",
                    "Modify work activities"
                ],
                "duration": "Ongoing as needed",
                "evidenceLevel": "Standard first-line treatment"
            },
            {
                "name": "Physical Therapy",
                "description": "Stretching and strengthening program",
                "details": [
                    "Wrist flexor stretches",
                    "Eccentric strengthening exercises",
                    "Forearm massage and mobilization",
                    "Gradual return to activities"
                ],
                "duration": "6-12 weeks",
                "evidenceLevel": "Strong evidence"
            },
            {
                "name": "PRP Injection",
                "link": "/treatments/prp-therapy",
                "description": "Promote healing with growth factors",
                "details": [
                    "Better long-term outcomes than steroid",
                    "Ultrasound-guided for accuracy",
                    "May need 1-2 injections"
                ],
                "evidenceLevel": "Good evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Debridement and Release",
                "description": "Remove damaged tissue",
                "indications": "Failed 6-12 months of conservative treatment",
                "procedure": "Release of flexor-pronator origin, debridement of degenerated tissue",
                "recovery": "3-6 months",
                "successRate": "85% success rate"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-4", "milestone": "Rest, bracing, pain control"},
            {"phase": "Week 4-8", "milestone": "Begin stretching and gentle strengthening"},
            {"phase": "Month 2-4", "milestone": "Progressive strengthening"},
            {"phase": "Month 4-6", "milestone": "Return to activities and sports"}
        ],
        "faqs": [
            {
                "question": "Is golfer's elbow the same as tennis elbow?",
                "answer": "No, they affect different sides of the elbow. Golfer's elbow affects the inside (medial) while tennis elbow affects the outside (lateral). Treatment principles are similar."
            },
            {
                "question": "Can I still play golf with golfer's elbow?",
                "answer": "It's best to rest initially and work with a therapist to correct your swing mechanics. You can usually return to golf gradually as symptoms improve with treatment."
            }
        ],
        "relatedConditions": ["tennis-elbow", "cubital-tunnel-syndrome"],
        "relatedTreatments": ["prp-therapy", "joint-injections"]
    },
    "carpal-tunnel": {
        "name": "Carpal Tunnel Syndrome",
        "category": "Hand/Wrist",
        "icon": "✋",
        "imageUrl": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
        "overview": "Carpal tunnel syndrome occurs when the median nerve is compressed as it passes through the wrist. It causes numbness, tingling, and weakness in the hand. Dr. B Harsha Vardhana Reddy offers both conservative and surgical treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Repetitive hand motions (typing, assembly work)",
            "Wrist anatomy variations",
            "Pregnancy (fluid retention)",
            "Diabetes and thyroid disorders",
            "Rheumatoid arthritis",
            "Obesity",
            "Wrist fractures or dislocations"
        ],
        "symptoms": [
            {"name": "Numbness and tingling", "description": "In thumb, index, middle, and part of ring finger"},
            {"name": "Night symptoms", "description": "Waking up with hand numbness, need to shake hand"},
            {"name": "Weakness", "description": "Difficulty gripping, dropping objects"},
            {"name": "Pain radiating up arm", "description": "May extend to shoulder"},
            {"name": "Thenar muscle atrophy", "description": "Muscle wasting at base of thumb (advanced cases)"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Phalen's test, Tinel's sign, sensory testing"},
            {"name": "Nerve Conduction Study", "description": "Gold standard - measures nerve function"},
            {"name": "Ultrasound", "description": "Measures nerve size and compression"},
            {"name": "X-rays", "description": "Rule out arthritis or old fractures"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Wrist Splinting",
                "description": "Keep wrist neutral, especially at night",
                "details": [
                    "Night splint most important",
                    "Neutral wrist position reduces pressure",
                    "Wear for 4-6 weeks",
                    "May use during activities"
                ],
                "duration": "4-6 weeks trial",
                "evidenceLevel": "Strong evidence for mild-moderate cases"
            },
            {
                "name": "Activity Modification",
                "description": "Reduce repetitive strain",
                "details": [
                    "Ergonomic keyboard and mouse",
                    "Take frequent breaks",
                    "Avoid forceful gripping",
                    "Keep wrists neutral when typing"
                ],
                "duration": "Ongoing",
                "evidenceLevel": "Supportive measure"
            },
            {
                "name": "Corticosteroid Injection",
                "description": "Reduce inflammation around nerve",
                "details": [
                    "Injection into carpal tunnel",
                    "Temporary relief for 3-6 months",
                    "Helps predict surgical outcome",
                    "May be repeated once"
                ],
                "evidenceLevel": "Moderate evidence, good for temporary relief"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Carpal Tunnel Release",
                "link": "/treatments/carpal-tunnel-release",
                "description": "Cut the ligament to relieve pressure",
                "indications": "Failed conservative treatment, constant numbness, muscle wasting",
                "procedure": "Cut transverse carpal ligament (open or endoscopic)",
                "recovery": "Immediate nerve relief, full use in 2-6 weeks",
                "successRate": "90-95% excellent results"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Day 1", "milestone": "Numbness often improves immediately"},
            {"phase": "Week 1-2", "milestone": "Wound healing, light activities"},
            {"phase": "Week 2-4", "milestone": "Return to most activities"},
            {"phase": "Month 1-3", "milestone": "Full strength recovery"}
        ],
        "faqs": [
            {
                "question": "Is carpal tunnel surgery painful?",
                "answer": "The surgery is done under local anesthesia and takes about 15 minutes. There is mild discomfort for a few days, but most patients report immediate relief of their numbness and tingling."
            },
            {
                "question": "Can carpal tunnel come back after surgery?",
                "answer": "Recurrence is rare (less than 5%). Most patients have permanent relief after properly performed surgery."
            }
        ],
        "relatedConditions": ["cubital-tunnel-syndrome", "trigger-finger", "de-quervains-tenosynovitis"],
        "relatedTreatments": ["carpal-tunnel-release"]
    },
    "plantar-fasciitis": {
        "name": "Plantar Fasciitis",
        "category": "Foot/Ankle",
        "icon": "🦶",
        "imageUrl": "https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=800&q=80",
        "overview": "Plantar fasciitis is one of the most common causes of heel pain. It involves inflammation of the thick band of tissue that runs across the bottom of your foot. Dr. B Harsha Vardhana Reddy provides comprehensive foot and ankle care at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Tight calf muscles and Achilles tendon",
            "Obesity or sudden weight gain",
            "Long periods of standing or walking",
            "High-impact activities (running, jumping)",
            "Flat feet or high arches",
            "Improper footwear"
        ],
        "symptoms": [
            {"name": "Sharp heel pain", "description": "Especially with first steps in morning"},
            {"name": "Pain after prolonged standing", "description": "Increases after long periods on feet"},
            {"name": "Pain after exercise", "description": "Not usually during exercise"},
            {"name": "Tenderness on bottom of heel", "description": "At the origin of plantar fascia"},
            {"name": "Stiffness in the morning", "description": "Eases with walking"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Point tenderness at medial calcaneal tubercle"},
            {"name": "X-rays", "description": "May show heel spur (not the cause of pain)"},
            {"name": "Ultrasound", "description": "Shows thickened plantar fascia"},
            {"name": "MRI", "description": "If diagnosis uncertain or planning PRP injection"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Stretching Program",
                "description": "Key to recovery",
                "details": [
                    "Calf stretches (gastrocnemius and soleus)",
                    "Plantar fascia stretches",
                    "Before getting out of bed in morning",
                    "Multiple times daily"
                ],
                "duration": "6-12 weeks, then maintenance",
                "evidenceLevel": "Strong evidence - most effective treatment"
            },
            {
                "name": "Proper Footwear and Orthotics",
                "description": "Support the arch and cushion heel",
                "details": [
                    "Supportive shoes with good arch support",
                    "Over-the-counter or custom orthotics",
                    "Heel cups or cushions",
                    "Avoid walking barefoot"
                ],
                "duration": "Ongoing",
                "evidenceLevel": "Moderate evidence"
            },
            {
                "name": "Night Splints",
                "description": "Keep foot flexed while sleeping",
                "details": [
                    "Maintains stretch overnight",
                    "Reduces morning pain",
                    "Wear for 6-8 weeks",
                    "May be uncomfortable initially"
                ],
                "evidenceLevel": "Moderate evidence"
            },
            {
                "name": "Shockwave Therapy",
                "description": "Sound waves to stimulate healing",
                "details": [
                    "Non-invasive outpatient treatment",
                    "3-5 weekly sessions",
                    "For recalcitrant cases",
                    "May be uncomfortable during treatment"
                ],
                "evidenceLevel": "Moderate evidence for chronic cases"
            },
            {
                "name": "PRP Injection",
                "link": "/treatments/prp-therapy",
                "description": "Growth factors to promote healing",
                "details": [
                    "Ultrasound-guided injection",
                    "For chronic cases failing conservative treatment",
                    "Better long-term results than steroid"
                ],
                "evidenceLevel": "Growing evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Plantar Fascia Release",
                "description": "Partial release of tight fascia",
                "indications": "Failed 6-12 months of conservative treatment",
                "procedure": "Endoscopic or open partial release",
                "recovery": "Weight bearing in boot, 6-12 weeks recovery",
                "successRate": "75-85% success"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Begin stretching program, proper footwear"},
            {"phase": "Week 2-6", "milestone": "Continue stretching, add night splint if needed"},
            {"phase": "Month 2-3", "milestone": "Gradual return to activities"},
            {"phase": "Month 3-6", "milestone": "Most cases resolve"},
            {"phase": "Month 6-12", "milestone": "Consider advanced treatments if not improving"}
        ],
        "faqs": [
            {
                "question": "How long does plantar fasciitis last?",
                "answer": "Most cases resolve within 6-12 months with consistent stretching and proper footwear. However, some cases can be stubborn and take longer."
            },
            {
                "question": "Does the heel spur cause the pain?",
                "answer": "No, heel spurs are usually incidental findings. The pain comes from the inflamed plantar fascia, not the spur. Many people with spurs have no pain."
            }
        ],
        "relatedConditions": ["achilles-tendinitis", "ankle-arthritis", "flat-feet"],
        "relatedTreatments": ["prp-therapy", "joint-injections"]
    },
    "achilles-tendinitis": {
        "name": "Achilles Tendinitis",
        "category": "Foot/Ankle",
        "icon": "🦵",
        "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "overview": "Achilles tendinitis is an overuse injury of the Achilles tendon, the band of tissue connecting calf muscles to the heel bone. It's common in runners and middle-aged athletes. Dr. B Harsha Vardhana Reddy provides expert treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Sudden increase in activity level",
            "Tight calf muscles",
            "Running on hard surfaces",
            "Improper footwear",
            "Flat feet or excessive pronation",
            "Age (decreases blood supply to tendon)"
        ],
        "symptoms": [
            {"name": "Pain above the heel", "description": "Especially after running or climbing"},
            {"name": "Morning stiffness", "description": "In the Achilles tendon area"},
            {"name": "Swelling and thickening", "description": "Visible or palpable tendon enlargement"},
            {"name": "Pain with activity", "description": "That eases with rest"},
            {"name": "Tenderness to touch", "description": "Along the tendon or at insertion"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Palpation, Thompson test, range of motion"},
            {"name": "Ultrasound", "description": "Shows tendon thickening and tears"},
            {"name": "MRI", "description": "Detailed evaluation of tendon damage"},
            {"name": "X-rays", "description": "Show calcification in chronic cases"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Rest and Activity Modification",
                "description": "Reduce stress on tendon",
                "details": [
                    "Reduce running/jumping activities",
                    "Switch to low-impact exercise (swimming, cycling)",
                    "Avoid hills and stairs when possible",
                    "Ice after activity"
                ],
                "duration": "Until symptoms improve",
                "evidenceLevel": "Essential first step"
            },
            {
                "name": "Eccentric Strengthening",
                "description": "Specialized calf exercises",
                "details": [
                    "Heel drops off a step (Alfredson protocol)",
                    "2 sets of 15 repetitions, twice daily",
                    "May be painful initially (acceptable)",
                    "12-week program"
                ],
                "duration": "12 weeks minimum",
                "evidenceLevel": "Strong evidence - gold standard treatment"
            },
            {
                "name": "Heel Lifts",
                "description": "Reduce strain on tendon",
                "details": [
                    "Temporary heel lift in shoes",
                    "Reduces tendon stretch",
                    "Use bilaterally",
                    "Gradually wean off"
                ],
                "evidenceLevel": "Supportive measure"
            },
            {
                "name": "Shockwave Therapy",
                "description": "For chronic cases",
                "details": [
                    "Non-invasive treatment",
                    "Stimulates healing response",
                    "3-5 sessions typically"
                ],
                "evidenceLevel": "Moderate evidence for chronic tendinitis"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Debridement",
                "description": "Remove damaged tendon tissue",
                "indications": "Failed 6+ months conservative treatment",
                "procedure": "Remove degenerative tissue, may include tendon transfer",
                "recovery": "6-12 weeks in boot, 4-6 months return to sport",
                "successRate": "75-85% good results"
            },
            {
                "name": "Achilles Tendon Repair",
                "description": "For partial or complete tears",
                "indications": "Acute or chronic tears",
                "procedure": "Suture repair of torn tendon",
                "recovery": "6-12 weeks protected, 6-9 months full recovery",
                "successRate": "90% return to previous activity level"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Rest, ice, activity modification"},
            {"phase": "Week 2-12", "milestone": "Eccentric exercise program"},
            {"phase": "Month 3-4", "milestone": "Gradual return to activities"},
            {"phase": "Month 4-6", "milestone": "Return to sports with continued maintenance"}
        ],
        "faqs": [
            {
                "question": "Can I run with Achilles tendinitis?",
                "answer": "You should reduce or stop running initially. As symptoms improve with eccentric exercises, you can gradually return. Running through pain can lead to tendon rupture."
            },
            {
                "question": "Is stretching good for Achilles tendinitis?",
                "answer": "Gentle stretching can help, but eccentric strengthening (heel drops) is more effective. Aggressive stretching may actually worsen symptoms."
            }
        ],
        "relatedConditions": ["plantar-fasciitis", "ankle-sprain", "ankle-arthritis"],
        "relatedTreatments": ["prp-therapy", "sports-injury-treatment"]
    },
    "sciatica": {
        "name": "Sciatica",
        "category": "Spine",
        "icon": "🔴",
        "imageUrl": "https://images.pexels.com/photos/5473184/pexels-photo-5473184.jpeg?auto=compress&cs=tinysrgb&w=800",
        "overview": "Sciatica refers to pain that radiates along the path of the sciatic nerve, which runs from the lower back through the hips and down each leg. It usually affects only one side. Dr. B Harsha Vardhana Reddy provides comprehensive spine care at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Herniated or bulging disc (most common)",
            "Spinal stenosis",
            "Piriformis syndrome",
            "Spondylolisthesis",
            "Degenerative disc disease",
            "Spinal tumors (rare)"
        ],
        "symptoms": [
            {"name": "Radiating leg pain", "description": "From lower back through buttock down leg"},
            {"name": "Numbness or tingling", "description": "In leg or foot"},
            {"name": "Weakness in leg", "description": "Difficulty moving foot or toes"},
            {"name": "Pain worse with sitting", "description": "Or coughing, sneezing"},
            {"name": "One-sided symptoms", "description": "Usually affects one leg"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Straight leg raise test, neurological exam"},
            {"name": "MRI", "description": "Shows disc herniation and nerve compression"},
            {"name": "CT Scan", "description": "For bony abnormalities"},
            {"name": "EMG/Nerve Studies", "description": "Evaluate nerve damage"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Activity Modification",
                "description": "Avoid aggravating positions",
                "details": [
                    "Avoid prolonged sitting",
                    "Proper lifting technique",
                    "Bed rest limited to 1-2 days",
                    "Stay active within pain limits"
                ],
                "duration": "Acute phase",
                "evidenceLevel": "Standard care"
            },
            {
                "name": "Physical Therapy",
                "description": "Core strengthening and stretching",
                "details": [
                    "McKenzie exercises",
                    "Core stabilization",
                    "Nerve gliding exercises",
                    "Postural education"
                ],
                "duration": "6-12 weeks",
                "evidenceLevel": "Strong evidence"
            },
            {
                "name": "Medications",
                "description": "Pain and inflammation control",
                "details": [
                    "NSAIDs for mild-moderate pain",
                    "Muscle relaxants for spasm",
                    "Neuropathic pain medications",
                    "Short course oral steroids if severe"
                ],
                "evidenceLevel": "Moderate evidence"
            },
            {
                "name": "Epidural Steroid Injection",
                "description": "Direct anti-inflammatory at nerve root",
                "details": [
                    "Fluoroscopy-guided injection",
                    "Reduces inflammation around nerve",
                    "May provide weeks to months relief",
                    "Series of 2-3 injections if helpful"
                ],
                "evidenceLevel": "Moderate evidence for short-term relief"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Microdiscectomy",
                "description": "Remove herniated disc material",
                "indications": "Failed 6+ weeks conservative treatment, progressive weakness, cauda equina syndrome",
                "procedure": "Minimally invasive removal of disc fragment pressing on nerve",
                "recovery": "2-6 weeks, return to desk work in 2 weeks",
                "successRate": "90-95% pain relief"
            },
            {
                "name": "Spinal Decompression",
                "link": "/treatments/spinal-decompression",
                "description": "Relieve pressure on nerves",
                "indications": "Spinal stenosis causing sciatica",
                "procedure": "Remove bone and ligament compressing nerves",
                "recovery": "4-6 weeks, full recovery 3-6 months",
                "successRate": "80-90% improvement"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Pain management, limited activity"},
            {"phase": "Week 2-6", "milestone": "Physical therapy, gradual increase in activity"},
            {"phase": "Month 2-3", "milestone": "Most cases resolve"},
            {"phase": "Month 3-6", "milestone": "Consider intervention if not improving"}
        ],
        "faqs": [
            {
                "question": "How long does sciatica last?",
                "answer": "Most cases improve within 4-6 weeks with conservative treatment. However, some cases take longer or require intervention."
            },
            {
                "question": "Is walking good for sciatica?",
                "answer": "Yes, gentle walking is usually helpful and keeps you mobile. Avoid prolonged sitting which often worsens symptoms."
            }
        ],
        "relatedConditions": ["herniated-disc", "spinal-stenosis", "spondylolisthesis"],
        "relatedTreatments": ["spinal-decompression", "joint-injections"]
    },
    "herniated-disc": {
        "name": "Herniated Disc",
        "category": "Spine",
        "icon": "🔵",
        "imageUrl": "https://images.pexels.com/photos/4506109/pexels-photo-4506109.jpeg?auto=compress&cs=tinysrgb&w=800",
        "overview": "A herniated disc occurs when the soft inner portion of a spinal disc pushes through the outer layer, potentially pressing on nearby nerves. This can occur in the neck (cervical) or lower back (lumbar). Dr. B Harsha Vardhana Reddy provides comprehensive spine care at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Age-related disc degeneration",
            "Heavy lifting with poor technique",
            "Twisting while lifting",
            "Trauma or injury",
            "Repetitive strain",
            "Genetic predisposition"
        ],
        "symptoms": [
            {"name": "Back or neck pain", "description": "At the level of herniation"},
            {"name": "Radiating pain", "description": "Down arm (cervical) or leg (lumbar)"},
            {"name": "Numbness or tingling", "description": "In areas served by affected nerve"},
            {"name": "Weakness", "description": "In arm or leg muscles"},
            {"name": "Pain with movement", "description": "Bending, lifting, coughing"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Neurological exam, provocative tests"},
            {"name": "MRI", "description": "Gold standard - shows disc and nerve compression"},
            {"name": "CT Scan", "description": "Better for bony detail"},
            {"name": "EMG", "description": "Evaluate nerve function if chronic"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Medications",
                "description": "Pain and inflammation control",
                "details": [
                    "NSAIDs (ibuprofen, naproxen)",
                    "Muscle relaxants for spasm",
                    "Neuropathic medications (gabapentin)",
                    "Short course steroids if severe"
                ],
                "duration": "2-6 weeks typically",
                "evidenceLevel": "Moderate evidence"
            },
            {
                "name": "Physical Therapy",
                "description": "Core strengthening and posture",
                "details": [
                    "McKenzie method exercises",
                    "Core stabilization",
                    "Postural training",
                    "Manual therapy"
                ],
                "duration": "6-12 weeks",
                "evidenceLevel": "Strong evidence"
            },
            {
                "name": "Epidural Injection",
                "description": "Steroid injection near nerve",
                "details": [
                    "Fluoroscopy or CT-guided",
                    "Reduces inflammation",
                    "May provide lasting relief",
                    "Can be repeated if helpful"
                ],
                "evidenceLevel": "Moderate evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Microdiscectomy",
                "description": "Remove herniated portion of disc",
                "indications": "Failed conservative treatment, severe weakness, cauda equina syndrome",
                "procedure": "Small incision, remove disc fragment pressing on nerve",
                "recovery": "2-4 weeks to desk work, 6-12 weeks full recovery",
                "successRate": "90-95% leg pain relief"
            },
            {
                "name": "Endoscopic Discectomy",
                "description": "Minimally invasive through tiny incision",
                "indications": "Contained disc herniations",
                "procedure": "8mm incision, camera-guided disc removal",
                "recovery": "Faster than traditional surgery",
                "successRate": "85-90% success"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Rest, medications, gentle movement"},
            {"phase": "Week 2-6", "milestone": "Physical therapy, gradual activity increase"},
            {"phase": "Month 2-3", "milestone": "Most symptoms resolve"},
            {"phase": "Month 3-6", "milestone": "Full recovery, return to activities"}
        ],
        "faqs": [
            {
                "question": "Do herniated discs heal on their own?",
                "answer": "Yes, many herniated discs improve over 6-12 weeks with conservative treatment. The body can reabsorb disc material. Surgery is needed in about 10-20% of cases."
            },
            {
                "question": "Can I exercise with a herniated disc?",
                "answer": "Yes, but avoid exercises that aggravate symptoms. Walking, swimming, and specific core exercises are usually safe. Work with a physical therapist for guidance."
            }
        ],
        "relatedConditions": ["sciatica", "spinal-stenosis"],
        "relatedTreatments": ["spinal-decompression"]
    },
    "osteoarthritis": {
        "name": "Osteoarthritis (Degenerative Joint Disease)",
        "category": "Joint",
        "icon": "🦴",
        "imageUrl": "https://images.pexels.com/photos/7446985/pexels-photo-7446985.jpeg?auto=compress&cs=tinysrgb&w=800",
        "overview": "Osteoarthritis is the most common form of arthritis, caused by wear and tear of joint cartilage. It most commonly affects knees, hips, hands, and spine. Dr. B Harsha Vardhana Reddy provides comprehensive arthritis care at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Age (risk increases after 45)",
            "Previous joint injury",
            "Obesity (especially for knee OA)",
            "Genetic predisposition",
            "Repetitive joint stress",
            "Joint malalignment"
        ],
        "symptoms": [
            {"name": "Joint pain", "description": "Worse with activity, better with rest"},
            {"name": "Morning stiffness", "description": "Usually less than 30 minutes"},
            {"name": "Reduced range of motion", "description": "Difficulty bending joint fully"},
            {"name": "Joint swelling", "description": "May have effusion"},
            {"name": "Crepitus", "description": "Grinding or crackling sensation"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Joint tenderness, swelling, range of motion"},
            {"name": "X-rays", "description": "Show joint space narrowing, bone spurs, sclerosis"},
            {"name": "MRI", "description": "Shows cartilage damage if needed"},
            {"name": "Blood Tests", "description": "Rule out inflammatory arthritis"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Weight Management",
                "description": "Reduce stress on joints",
                "details": [
                    "Every 1 kg lost = 4 kg less knee load",
                    "Even 5-10% weight loss helps",
                    "Combine diet and exercise",
                    "Target BMI under 25"
                ],
                "duration": "Lifelong lifestyle change",
                "evidenceLevel": "Strong evidence"
            },
            {
                "name": "Exercise",
                "description": "Keep joints moving and strong",
                "details": [
                    "Low-impact aerobics (walking, swimming, cycling)",
                    "Muscle strengthening around joints",
                    "Range of motion exercises",
                    "Balance training"
                ],
                "duration": "Ongoing - 30 min most days",
                "evidenceLevel": "Strong evidence"
            },
            {
                "name": "Medications",
                "description": "Pain and inflammation control",
                "details": [
                    "Paracetamol for mild pain",
                    "NSAIDs for moderate pain",
                    "Topical NSAIDs for localized relief",
                    "Duloxetine for chronic pain"
                ],
                "evidenceLevel": "Strong evidence"
            },
            {
                "name": "Injections",
                "link": "/treatments/joint-injections",
                "description": "Intra-articular treatments",
                "details": [
                    "Corticosteroid for acute flares",
                    "Hyaluronic acid for lubrication",
                    "PRP for possible disease modification"
                ],
                "evidenceLevel": "Moderate evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Joint Replacement",
                "link": "/treatments/total-knee-replacement",
                "description": "Replace damaged joint surfaces",
                "indications": "Severe OA affecting quality of life, failed conservative treatment",
                "procedure": "Remove damaged cartilage and bone, replace with artificial joint",
                "recovery": "6-12 weeks to walking, 3-6 months full recovery",
                "successRate": "95% good to excellent results"
            },
            {
                "name": "Osteotomy",
                "description": "Realign bones to shift weight",
                "indications": "Younger patients with unicompartmental OA",
                "procedure": "Cut and realign bone to redistribute load",
                "recovery": "3-6 months",
                "successRate": "Good for 10-15 years typically"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Acute flare", "milestone": "Rest, ice, medications"},
            {"phase": "Ongoing", "milestone": "Exercise, weight management, PT"},
            {"phase": "Advanced OA", "milestone": "Consider injections or surgery"}
        ],
        "faqs": [
            {
                "question": "Can osteoarthritis be reversed?",
                "answer": "Cartilage damage cannot be reversed, but symptoms can be well managed and progression slowed with weight loss, exercise, and appropriate treatment."
            },
            {
                "question": "Is exercise good or bad for osteoarthritis?",
                "answer": "Exercise is one of the best treatments for OA. It strengthens muscles that support joints, improves flexibility, and can reduce pain. Low-impact activities are best."
            }
        ],
        "relatedConditions": ["knee-arthritis", "hip-arthritis", "shoulder-arthritis"],
        "relatedTreatments": ["total-knee-replacement", "total-hip-replacement", "joint-injections"]
    },
    "bursitis": {
        "name": "Bursitis",
        "category": "Joint",
        "icon": "🔴",
        "imageUrl": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
        "overview": "Bursitis is inflammation of the bursae, small fluid-filled sacs that cushion bones, tendons, and muscles near joints. Common locations include the shoulder, elbow, hip, and knee. Dr. B Harsha Vardhana Reddy provides expert treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Repetitive motions or prolonged pressure",
            "Injury or trauma",
            "Infection (septic bursitis)",
            "Gout or rheumatoid arthritis",
            "Age (tendons less tolerant of stress)",
            "Poor posture or body mechanics"
        ],
        "symptoms": [
            {"name": "Localized pain", "description": "At the site of the bursa"},
            {"name": "Swelling", "description": "Visible or palpable"},
            {"name": "Warmth and redness", "description": "Especially if infected"},
            {"name": "Pain with movement", "description": "Or pressure on the area"},
            {"name": "Stiffness", "description": "In the affected joint"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Localized tenderness and swelling"},
            {"name": "Ultrasound", "description": "Shows fluid in bursa"},
            {"name": "MRI", "description": "If diagnosis unclear"},
            {"name": "Aspiration", "description": "Fluid analysis if infection suspected"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Rest and Protection",
                "description": "Avoid aggravating activities",
                "details": [
                    "Avoid direct pressure on bursa",
                    "Use padding or cushioning",
                    "Modify activities that cause symptoms"
                ],
                "duration": "Until symptoms resolve",
                "evidenceLevel": "Standard first-line treatment"
            },
            {
                "name": "Ice and Compression",
                "description": "Reduce swelling and pain",
                "details": [
                    "Ice 15-20 minutes, 3-4 times daily",
                    "Compression wrap if appropriate",
                    "Elevate if possible"
                ],
                "evidenceLevel": "Supportive care"
            },
            {
                "name": "Medications",
                "description": "Anti-inflammatory treatment",
                "details": [
                    "NSAIDs (ibuprofen, naproxen)",
                    "Antibiotics if infected"
                ],
                "duration": "1-2 weeks typically",
                "evidenceLevel": "Moderate evidence"
            },
            {
                "name": "Corticosteroid Injection",
                "description": "Reduce inflammation directly",
                "details": [
                    "Injection into bursa",
                    "Quick pain relief",
                    "May be combined with aspiration"
                ],
                "evidenceLevel": "Strong evidence for non-septic bursitis"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Bursectomy",
                "description": "Surgical removal of bursa",
                "indications": "Chronic bursitis failing conservative treatment, recurrent septic bursitis",
                "procedure": "Remove inflamed bursa (arthroscopic or open)",
                "recovery": "2-4 weeks",
                "successRate": "90% resolution"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Rest, ice, medications"},
            {"phase": "Week 2-4", "milestone": "Gradual return to activities"},
            {"phase": "Month 1-2", "milestone": "Most cases resolve"}
        ],
        "faqs": [
            {
                "question": "How long does bursitis last?",
                "answer": "Acute bursitis usually resolves within 1-2 weeks with proper treatment. Chronic bursitis may take longer and require injections or rarely surgery."
            },
            {
                "question": "When should I see a doctor for bursitis?",
                "answer": "See a doctor if you have fever with joint swelling (may indicate infection), severe pain, inability to move the joint, or symptoms lasting more than 2 weeks."
            }
        ],
        "relatedConditions": ["shoulder-impingement", "hip-bursitis", "knee-arthritis"],
        "relatedTreatments": ["joint-injections"]
    },
    "trigger-finger": {
        "name": "Trigger Finger",
        "category": "Hand",
        "icon": "☝️",
        "imageUrl": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
        "overview": "Trigger finger occurs when the tendon sheath of a finger becomes inflamed, causing the finger to catch or lock when bent. Dr. B Harsha Vardhana Reddy provides expert treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Repetitive gripping activities",
            "Diabetes (higher risk)",
            "Rheumatoid arthritis",
            "Gout",
            "Carpal tunnel syndrome",
            "Age 40-60 most common"
        ],
        "symptoms": [
            {"name": "Finger stiffness", "description": "Especially in the morning"},
            {"name": "Clicking or popping", "description": "When moving finger"},
            {"name": "Tenderness at base of finger", "description": "Nodule may be palpable"},
            {"name": "Finger locking", "description": "Stuck in bent position"},
            {"name": "Pain with gripping", "description": "Or straightening finger"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Palpable nodule, triggering on exam"},
            {"name": "No imaging usually needed", "description": "Diagnosis is clinical"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Rest and Splinting",
                "description": "Reduce tendon irritation",
                "details": [
                    "Avoid repetitive gripping",
                    "Night splint to keep finger straight",
                    "May take several weeks"
                ],
                "duration": "4-6 weeks",
                "evidenceLevel": "Moderate evidence"
            },
            {
                "name": "Corticosteroid Injection",
                "description": "Reduce inflammation in tendon sheath",
                "details": [
                    "Highly effective first-line treatment",
                    "70-90% success with 1-2 injections",
                    "May be repeated once",
                    "Less effective in diabetics"
                ],
                "evidenceLevel": "Strong evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Trigger Finger Release",
                "description": "Cut the A1 pulley",
                "indications": "Failed injections, severe locking, diabetic patients",
                "procedure": "Small incision to release tight tendon sheath",
                "recovery": "Immediate use, full recovery 2-4 weeks",
                "successRate": "98% cure rate"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Post-injection", "milestone": "Relief within days to 2 weeks"},
            {"phase": "Post-surgery Day 1", "milestone": "Move finger immediately"},
            {"phase": "Week 1-2", "milestone": "Return to normal activities"},
            {"phase": "Week 2-4", "milestone": "Full recovery"}
        ],
        "faqs": [
            {
                "question": "Is trigger finger surgery painful?",
                "answer": "The surgery is done under local anesthesia and takes about 10 minutes. There is minimal discomfort, and you can move your finger immediately after."
            },
            {
                "question": "Can trigger finger come back?",
                "answer": "Recurrence after surgery is rare (less than 3%). After steroid injection, there is about a 30% chance of recurrence."
            }
        ],
        "relatedConditions": ["carpal-tunnel", "de-quervains-tenosynovitis"],
        "relatedTreatments": ["joint-injections"]
    },
    "ankle-sprain": {
        "name": "Ankle Sprain",
        "category": "Foot/Ankle",
        "icon": "🦶",
        "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "overview": "An ankle sprain occurs when the ligaments that support the ankle are stretched or torn. Most sprains affect the lateral (outside) ligaments. Dr. B Harsha Vardhana Reddy provides comprehensive ankle care at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Landing awkwardly from a jump",
            "Walking or running on uneven surfaces",
            "Sudden pivot or change in direction",
            "Sports injuries",
            "Wearing inappropriate footwear",
            "Previous ankle sprains"
        ],
        "symptoms": [
            {"name": "Pain and swelling", "description": "Immediate after injury"},
            {"name": "Bruising", "description": "May develop over hours to days"},
            {"name": "Difficulty walking", "description": "Due to pain and instability"},
            {"name": "Ankle instability", "description": "Feeling of giving way"},
            {"name": "Tenderness", "description": "Over the injured ligament"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Anterior drawer test, talar tilt test"},
            {"name": "X-rays", "description": "Rule out fracture"},
            {"name": "MRI", "description": "If chronic instability or complete tear suspected"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "RICE Protocol",
                "description": "Immediate first aid",
                "details": [
                    "Rest: Avoid weight bearing initially",
                    "Ice: 20 minutes every 2-3 hours",
                    "Compression: Elastic bandage",
                    "Elevation: Above heart level"
                ],
                "duration": "First 48-72 hours",
                "evidenceLevel": "Standard acute care"
            },
            {
                "name": "Bracing/Immobilization",
                "description": "Protect healing ligaments",
                "details": [
                    "Air stirrup or lace-up brace",
                    "Walking boot for severe sprains",
                    "Crutches as needed"
                ],
                "duration": "1-6 weeks depending on severity",
                "evidenceLevel": "Strong evidence"
            },
            {
                "name": "Physical Therapy",
                "description": "Restore strength and proprioception",
                "details": [
                    "Range of motion exercises",
                    "Peroneal strengthening",
                    "Balance and proprioception training",
                    "Sport-specific rehabilitation"
                ],
                "duration": "4-8 weeks",
                "evidenceLevel": "Strong evidence - prevents recurrence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Ankle Ligament Reconstruction",
                "link": "/treatments/ankle-ligament-reconstruction",
                "description": "Repair or reconstruct torn ligaments",
                "indications": "Chronic instability despite rehabilitation, high-level athletes",
                "procedure": "Broström repair or reconstruction with tendon graft",
                "recovery": "6-8 weeks in boot, 4-6 months return to sports",
                "successRate": "85-95% success"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Grade 1 (Mild)", "milestone": "1-3 weeks recovery"},
            {"phase": "Grade 2 (Moderate)", "milestone": "3-6 weeks recovery"},
            {"phase": "Grade 3 (Severe)", "milestone": "6-12 weeks recovery"},
            {"phase": "Return to sport", "milestone": "After passing functional tests"}
        ],
        "faqs": [
            {
                "question": "How do I know if my ankle is sprained or broken?",
                "answer": "You cannot reliably tell without an X-ray. If you cannot bear weight, have significant swelling, or have tenderness over bone, see a doctor for X-rays."
            },
            {
                "question": "Will my ankle be weak after a sprain?",
                "answer": "Without proper rehabilitation, yes. About 30-40% of people develop chronic ankle instability after a sprain. Physical therapy significantly reduces this risk."
            }
        ],
        "relatedConditions": ["ankle-arthritis", "achilles-tendinitis"],
        "relatedTreatments": ["ankle-ligament-reconstruction", "sports-injury-treatment"]
    },
    "pcl-injury": {
        "name": "PCL Injury (Posterior Cruciate Ligament)",
        "category": "Knee",
        "icon": "🦵",
        "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "overview": "The posterior cruciate ligament (PCL) is one of the four major ligaments of the knee. PCL injuries are less common than ACL injuries and often occur from dashboard injuries in car accidents or falls on a bent knee. Dr. B Harsha Vardhana Reddy provides expert PCL treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Dashboard injury (knee hitting dashboard)",
            "Fall on bent knee with foot pointed down",
            "Sports collision (football, soccer)",
            "Hyperextension injury",
            "Often associated with other ligament injuries"
        ],
        "symptoms": [
            {"name": "Knee pain and swelling", "description": "Often less dramatic than ACL injury"},
            {"name": "Instability", "description": "Knee feels unstable, especially going downstairs"},
            {"name": "Difficulty walking", "description": "Pain with knee flexion"},
            {"name": "Back of knee tenderness", "description": "At PCL insertion"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "Posterior drawer test, posterior sag sign"},
            {"name": "X-rays", "description": "May show avulsion fracture"},
            {"name": "MRI", "description": "Shows PCL tear and associated injuries"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Bracing",
                "description": "Support knee during healing",
                "details": [
                    "PCL brace pushes tibia forward",
                    "Worn during activities",
                    "May allow partial tears to heal"
                ],
                "duration": "3-6 months",
                "evidenceLevel": "Standard treatment for isolated partial tears"
            },
            {
                "name": "Physical Therapy",
                "description": "Quadriceps strengthening is key",
                "details": [
                    "Aggressive quadriceps strengthening",
                    "Hamstring stretching (not strengthening initially)",
                    "Proprioception training",
                    "Gradual return to activities"
                ],
                "duration": "3-6 months",
                "evidenceLevel": "Strong evidence for grades I-II"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "PCL Reconstruction",
                "description": "Replace torn ligament with graft",
                "indications": "Complete tear with instability, combined ligament injuries, high-level athletes",
                "procedure": "Arthroscopic reconstruction using hamstring or Achilles allograft",
                "recovery": "6-9 months for sports return",
                "successRate": "80-90% stability restoration"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-6", "milestone": "Bracing, protected weight bearing"},
            {"phase": "Month 2-4", "milestone": "Progressive strengthening"},
            {"phase": "Month 4-6", "milestone": "Return to activities"},
            {"phase": "Month 6-9", "milestone": "Return to sports (if surgery)"}
        ],
        "faqs": [
            {
                "question": "Is PCL surgery always needed?",
                "answer": "No, many isolated PCL injuries can be treated without surgery. The PCL has better healing capacity than the ACL. Surgery is mainly for complete tears with instability or combined injuries."
            },
            {
                "question": "Can I play sports with a PCL tear?",
                "answer": "Many patients with partial PCL tears can return to sports with proper rehabilitation and bracing. Complete tears may require surgery for high-level sports."
            }
        ],
        "relatedConditions": ["acl-tear", "meniscus-tear", "knee-dislocation"],
        "relatedTreatments": ["knee-arthroscopy", "acl-reconstruction"]
    },
    "slap-tear": {
        "name": "SLAP Tear (Labral Tear)",
        "category": "Shoulder",
        "icon": "💪",
        "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "overview": "A SLAP tear (Superior Labrum Anterior to Posterior) is an injury to the labrum of the shoulder, the ring of cartilage that surrounds the socket. It commonly occurs in overhead athletes and can cause pain and instability. Dr. B Harsha Vardhana Reddy specializes in shoulder arthroscopy at Apollo Hospitals, Financial District, Hyderabad.",
        "causes": [
            "Overhead throwing sports (baseball, tennis)",
            "Fall on outstretched arm",
            "Motor vehicle accidents",
            "Sudden pulling on the arm",
            "Repetitive overhead activities",
            "Age-related degeneration"
        ],
        "symptoms": [
            {"name": "Deep shoulder pain", "description": "Hard to pinpoint location"},
            {"name": "Clicking or popping", "description": "With shoulder movement"},
            {"name": "Pain with overhead activities", "description": "Especially throwing"},
            {"name": "Decreased shoulder strength", "description": "Particularly with lifting"},
            {"name": "Feeling of instability", "description": "Shoulder may feel loose"}
        ],
        "diagnosis": [
            {"name": "Physical Examination", "description": "O'Brien test, biceps load test, crank test"},
            {"name": "MRI Arthrogram", "description": "Gold standard - dye injected to see labrum"},
            {"name": "Diagnostic Arthroscopy", "description": "Sometimes needed for definitive diagnosis"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Activity Modification",
                "description": "Avoid aggravating movements",
                "details": [
                    "Rest from overhead sports",
                    "Avoid positions that cause symptoms",
                    "Anti-inflammatory medications"
                ],
                "duration": "4-6 weeks trial",
                "evidenceLevel": "First-line treatment"
            },
            {
                "name": "Physical Therapy",
                "description": "Strengthen and stabilize shoulder",
                "details": [
                    "Rotator cuff strengthening",
                    "Scapular stabilization",
                    "Core strengthening",
                    "Sport-specific rehabilitation"
                ],
                "duration": "8-12 weeks",
                "evidenceLevel": "Moderate evidence"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Arthroscopic SLAP Repair",
                "link": "/treatments/shoulder-arthroscopy",
                "description": "Reattach torn labrum to bone",
                "indications": "Failed conservative treatment, active athletes, unstable tears",
                "procedure": "Suture anchors to reattach labrum arthroscopically",
                "recovery": "Sling 4-6 weeks, sports return 4-6 months",
                "successRate": "80-90% in appropriate patients"
            },
            {
                "name": "Biceps Tenodesis",
                "description": "Alternative for older patients",
                "indications": "Older patients, degenerative tears, biceps pathology",
                "procedure": "Release labrum, secure biceps tendon to bone",
                "recovery": "Faster return to activity than repair",
                "successRate": "90%+ excellent outcomes"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-4", "milestone": "Sling, passive motion only"},
            {"phase": "Week 4-8", "milestone": "Active motion, no resistance"},
            {"phase": "Month 2-4", "milestone": "Strengthening begins"},
            {"phase": "Month 4-6", "milestone": "Return to throwing/sports"}
        ],
        "faqs": [
            {
                "question": "Can I pitch again after SLAP repair?",
                "answer": "Many athletes return to throwing after SLAP repair, though return rates to previous performance levels vary. Proper rehabilitation and mechanics correction are essential."
            },
            {
                "question": "Do all SLAP tears need surgery?",
                "answer": "No, many SLAP tears, especially degenerative ones in older patients, can be managed with physical therapy. Surgery is mainly for young, active patients with unstable tears."
            }
        ],
        "relatedConditions": ["rotator-cuff", "shoulder-dislocation", "shoulder-impingement"],
        "relatedTreatments": ["shoulder-arthroscopy", "bankart-repair"]
    },
    "fracture-trauma": {
        "name": "Fractures & Trauma",
        "category": "Trauma",
        "icon": "🩹",
        "imageUrl": "https://images.pexels.com/photos/7446985/pexels-photo-7446985.jpeg?auto=compress&cs=tinysrgb&w=800",
        "overview": "Orthopedic fractures range from simple broken bones to complex injuries involving joints and multiple fragments. Dr. B Harsha Vardhana Reddy provides 24/7 trauma care at Apollo Hospitals, Financial District, Hyderabad, using the latest fixation techniques for optimal healing.",
        "causes": [
            "Falls",
            "Motor vehicle accidents",
            "Sports injuries",
            "Direct trauma or blow",
            "Stress fractures from overuse",
            "Osteoporosis (fragility fractures)"
        ],
        "symptoms": [
            {"name": "Severe pain", "description": "At the site of injury"},
            {"name": "Swelling and bruising", "description": "Develops rapidly"},
            {"name": "Deformity", "description": "Limb may look bent or shortened"},
            {"name": "Inability to move", "description": "The injured area"},
            {"name": "Numbness or tingling", "description": "Below the injury (concerning)"}
        ],
        "diagnosis": [
            {"name": "X-rays", "description": "First-line imaging for most fractures"},
            {"name": "CT Scan", "description": "For complex or intra-articular fractures"},
            {"name": "MRI", "description": "For stress fractures or associated soft tissue injuries"}
        ],
        "nonSurgicalTreatments": [
            {
                "name": "Casting/Splinting",
                "description": "Immobilize stable fractures",
                "details": [
                    "Fiberglass or plaster cast",
                    "Regular X-rays to monitor healing",
                    "Duration varies by fracture type and location"
                ],
                "duration": "4-12 weeks typically",
                "evidenceLevel": "Standard treatment for stable fractures"
            },
            {
                "name": "Functional Bracing",
                "description": "Allow controlled motion",
                "details": [
                    "Removable brace",
                    "Used after initial immobilization",
                    "Allows hygiene and controlled exercise"
                ],
                "evidenceLevel": "Effective for certain fracture types"
            }
        ],
        "surgicalTreatments": [
            {
                "name": "Open Reduction Internal Fixation (ORIF)",
                "link": "/treatments/fracture-fixation",
                "description": "Plates and screws to fix fracture",
                "indications": "Displaced fractures, intra-articular fractures, unstable fractures",
                "procedure": "Open surgery to realign bones and fix with hardware",
                "recovery": "Varies by fracture, typically 6-12 weeks",
                "successRate": "90%+ union rates"
            },
            {
                "name": "Intramedullary Nailing",
                "description": "Rod inside the bone",
                "indications": "Long bone shaft fractures (femur, tibia)",
                "procedure": "Metal rod inserted down center of bone",
                "recovery": "Earlier weight bearing than plates",
                "successRate": "95%+ for shaft fractures"
            },
            {
                "name": "External Fixation",
                "description": "Pins and external frame",
                "indications": "Severe soft tissue injury, temporary stabilization",
                "procedure": "Pins through skin into bone, connected by external bars",
                "recovery": "Often converted to internal fixation later",
                "successRate": "Bridge to definitive treatment"
            }
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Swelling control, pain management"},
            {"phase": "Week 2-6", "milestone": "Early healing, protected motion"},
            {"phase": "Week 6-12", "milestone": "Progressive weight bearing"},
            {"phase": "Month 3-6", "milestone": "Return to activities, strengthening"}
        ],
        "faqs": [
            {
                "question": "How long does it take for a fracture to heal?",
                "answer": "Healing time varies by bone, age, and fracture severity. Simple fractures take 6-8 weeks, while complex fractures may take 3-6 months. Children heal faster than adults."
            },
            {
                "question": "Will I need surgery for my fracture?",
                "answer": "Not all fractures need surgery. Stable, well-aligned fractures often heal well with casting. Surgery is needed for displaced fractures or those involving joints."
            }
        ],
        "relatedConditions": ["osteoarthritis", "avascular-necrosis-avn"],
        "relatedTreatments": ["fracture-fixation"]
    }
}

# Extended treatments data
EXTENDED_TREATMENTS_DATA = {
    "prp-therapy": {
        "name": "PRP Therapy (Platelet-Rich Plasma)",
        "category": "Regenerative Medicine",
        "icon": "💉",
        "imageUrl": "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800",
        "heroTitle": "PRP Therapy in Hyderabad",
        "heroSubtitle": "Harness your body's natural healing power for faster recovery.",
        "overview": "PRP therapy uses concentrated platelets from your own blood to accelerate healing of injured tendons, ligaments, muscles, and joints. Dr. B Harsha Vardhana Reddy offers PRP injections at Apollo Hospitals, Financial District, Hyderabad for various orthopedic conditions.",
        "statistics": [
            {"label": "Procedure Time", "value": "30-45 min", "description": "Including blood draw"},
            {"label": "Recovery", "value": "Same day", "description": "Minimal downtime"},
            {"label": "Sessions", "value": "1-3", "description": "Typically needed"},
            {"label": "Results", "value": "6-12 weeks", "description": "To see improvement"}
        ],
        "candidatesFor": [
            "Chronic tendon injuries (tennis elbow, Achilles tendinitis)",
            "Plantar fasciitis",
            "Knee osteoarthritis (mild to moderate)",
            "Rotator cuff tendinopathy",
            "Ligament injuries",
            "Muscle injuries"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Blood Draw", "description": "About 30-60 ml of blood drawn from arm", "duration": "5 minutes"},
            {"step": 2, "title": "Centrifugation", "description": "Blood spun to concentrate platelets (3-10x normal)", "duration": "15 minutes"},
            {"step": 3, "title": "Injection Preparation", "description": "PRP separated and prepared for injection", "duration": "5 minutes"},
            {"step": 4, "title": "Ultrasound-Guided Injection", "description": "PRP precisely injected into injured tissue", "duration": "10-15 minutes"}
        ],
        "benefits": [
            {"title": "Natural Healing", "description": "Uses your own blood - no foreign substances", "icon": "✓"},
            {"title": "Minimal Risk", "description": "Very low infection or rejection risk", "icon": "✓"},
            {"title": "Outpatient Procedure", "description": "No anesthesia or hospital stay", "icon": "✓"},
            {"title": "Long-lasting Results", "description": "Better than steroid in many studies", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Day 1-3", "milestone": "Rest, mild soreness normal", "activities": "Avoid strenuous activity"},
            {"phase": "Week 1-2", "milestone": "Gradual return to activities", "activities": "Light stretching"},
            {"phase": "Week 4-6", "milestone": "Progressive strengthening", "activities": "Physical therapy"},
            {"phase": "Week 6-12", "milestone": "Optimal healing occurs", "activities": "Full activity return"}
        ],
        "risks": [
            {"risk": "Injection site pain", "percentage": "Common", "prevention": "Ice, rest"},
            {"risk": "Infection", "percentage": "<1%", "prevention": "Sterile technique"},
            {"risk": "No improvement", "percentage": "10-20%", "prevention": "Proper patient selection"}
        ],
        "preOpPreparation": [
            "Stop anti-inflammatory medications 1 week before",
            "Avoid aspirin for 2 weeks",
            "Stay well hydrated",
            "Eat normally before procedure"
        ],
        "postOpCare": [
            "Rest the treated area for 48-72 hours",
            "Ice for 20 minutes every few hours",
            "Avoid anti-inflammatories for 2 weeks",
            "Begin gentle stretching after 1 week",
            "Follow-up in 4-6 weeks"
        ],
        "faqs": [
            {"question": "Is PRP covered by insurance?", "answer": "Currently, most insurance plans do not cover PRP therapy as it is considered investigational. The cost is typically ₹8,000-15,000 per injection."},
            {"question": "How many PRP injections do I need?", "answer": "Most conditions require 1-3 injections, spaced 4-6 weeks apart. Some patients see benefit from a single injection."},
            {"question": "Is PRP better than cortisone?", "answer": "For chronic tendon problems, PRP has shown better long-term results than cortisone in several studies. Cortisone provides faster initial relief but may weaken tissue over time."}
        ],
        "relatedConditions": ["tennis-elbow", "plantar-fasciitis", "knee-arthritis", "achilles-tendinitis"],
        "relatedTreatments": ["joint-injections", "viscosupplementation"]
    },
    "joint-injections": {
        "name": "Joint Injections",
        "category": "Non-Surgical",
        "icon": "💉",
        "imageUrl": "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
        "heroTitle": "Joint Injections in Hyderabad",
        "heroSubtitle": "Targeted relief for joint pain and inflammation.",
        "overview": "Joint injections deliver medication directly into the affected joint for pain relief and reduced inflammation. Dr. B Harsha Vardhana Reddy performs ultrasound-guided injections for maximum accuracy at Apollo Hospitals, Financial District, Hyderabad.",
        "statistics": [
            {"label": "Procedure Time", "value": "10-15 min", "description": "Quick outpatient procedure"},
            {"label": "Pain Relief", "value": "Days", "description": "Relief within 1-3 days"},
            {"label": "Duration", "value": "Weeks-Months", "description": "Variable relief duration"},
            {"label": "Accuracy", "value": "95%+", "description": "With ultrasound guidance"}
        ],
        "candidatesFor": [
            "Osteoarthritis of knee, hip, or shoulder",
            "Inflammatory arthritis flares",
            "Bursitis",
            "Tendinitis",
            "Frozen shoulder",
            "Diagnostic purposes"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Preparation", "description": "Clean skin, position patient, ultrasound setup", "duration": "5 minutes"},
            {"step": 2, "title": "Local Anesthesia", "description": "Numb the skin with cold spray or local anesthetic", "duration": "1 minute"},
            {"step": 3, "title": "Ultrasound Guidance", "description": "Visualize joint and guide needle in real-time", "duration": "2-3 minutes"},
            {"step": 4, "title": "Injection", "description": "Deliver medication (steroid, hyaluronic acid, or PRP)", "duration": "1-2 minutes"}
        ],
        "benefits": [
            {"title": "Targeted Delivery", "description": "Medication goes directly to affected area", "icon": "✓"},
            {"title": "Minimal Side Effects", "description": "Avoids systemic medication effects", "icon": "✓"},
            {"title": "Quick Relief", "description": "Often feel better within days", "icon": "✓"},
            {"title": "Diagnostic Value", "description": "Confirms joint as pain source", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Day 1", "milestone": "Rest the joint", "activities": "Ice if sore"},
            {"phase": "Day 2-3", "milestone": "Relief usually begins", "activities": "Light activities"},
            {"phase": "Week 1-2", "milestone": "Maximum benefit", "activities": "Resume normal activities"}
        ],
        "risks": [
            {"risk": "Infection", "percentage": "1 in 10,000", "prevention": "Sterile technique"},
            {"risk": "Post-injection flare", "percentage": "2-5%", "prevention": "Ice, rest"},
            {"risk": "Tendon weakening (steroids)", "percentage": "Risk with repeated injections", "prevention": "Limit to 3-4 per year"}
        ],
        "faqs": [
            {"question": "How often can I get cortisone injections?", "answer": "Generally, cortisone injections should be limited to 3-4 times per year in the same joint to avoid potential tissue damage."},
            {"question": "Do joint injections hurt?", "answer": "There is brief discomfort during the injection, usually lasting only seconds. Local anesthetic or cold spray helps minimize pain."},
            {"question": "Which is better - cortisone or hyaluronic acid?", "answer": "Cortisone provides faster relief but shorter duration. Hyaluronic acid provides more gradual but potentially longer-lasting relief. The choice depends on your specific situation."}
        ],
        "relatedConditions": ["knee-arthritis", "hip-arthritis", "frozen-shoulder", "bursitis"],
        "relatedTreatments": ["prp-therapy", "viscosupplementation"]
    },
    "viscosupplementation": {
        "name": "Viscosupplementation",
        "category": "Non-Surgical",
        "icon": "💧",
        "imageUrl": "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
        "heroTitle": "Viscosupplementation (Gel Injections) in Hyderabad",
        "heroSubtitle": "Lubricate and cushion arthritic joints naturally.",
        "overview": "Viscosupplementation involves injecting hyaluronic acid (HA) into the joint to supplement the natural joint fluid. This can reduce pain and improve mobility in arthritic joints. Dr. B Harsha Vardhana Reddy offers this treatment at Apollo Hospitals, Financial District, Hyderabad.",
        "statistics": [
            {"label": "Relief Duration", "value": "6-12 months", "description": "Variable by patient"},
            {"label": "Sessions", "value": "1-5", "description": "Depending on product"},
            {"label": "Procedure Time", "value": "15 min", "description": "Per injection"},
            {"label": "Response Rate", "value": "60-70%", "description": "Experience benefit"}
        ],
        "candidatesFor": [
            "Mild to moderate knee osteoarthritis",
            "Patients who cannot take NSAIDs",
            "Those wanting to delay joint replacement",
            "Patients who have not responded to other treatments",
            "Active individuals with arthritis"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Joint Assessment", "description": "Examine knee and review X-rays", "duration": "5 minutes"},
            {"step": 2, "title": "Preparation", "description": "Clean skin, may aspirate excess fluid first", "duration": "5 minutes"},
            {"step": 3, "title": "Injection", "description": "Hyaluronic acid injected into joint space", "duration": "5 minutes"}
        ],
        "benefits": [
            {"title": "Natural Substance", "description": "HA is naturally present in joints", "icon": "✓"},
            {"title": "Long-lasting Relief", "description": "Can last 6-12 months", "icon": "✓"},
            {"title": "No Tissue Damage", "description": "Unlike repeated steroid injections", "icon": "✓"},
            {"title": "Repeatable", "description": "Can be repeated when benefits wear off", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "May have mild swelling", "activities": "Normal activities"},
            {"phase": "Week 2-4", "milestone": "Benefits begin to appear", "activities": "Gradually more active"},
            {"phase": "Month 1-3", "milestone": "Maximum benefit", "activities": "Full activity"},
            {"phase": "Month 6-12", "milestone": "May need repeat", "activities": "Reassess symptoms"}
        ],
        "risks": [
            {"risk": "Local reaction", "percentage": "2-5%", "prevention": "Ice, rest"},
            {"risk": "Allergic reaction", "percentage": "Rare", "prevention": "Screen for allergies"},
            {"risk": "Infection", "percentage": "<1%", "prevention": "Sterile technique"}
        ],
        "faqs": [
            {"question": "How long does viscosupplementation last?", "answer": "Benefits typically last 6-12 months, though this varies by individual. Some patients have longer-lasting relief, especially with newer single-injection products."},
            {"question": "Is viscosupplementation better than cortisone?", "answer": "They work differently. Cortisone reduces inflammation quickly but effects fade in weeks. Viscosupplementation lubricates the joint with more gradual but potentially longer-lasting benefits."},
            {"question": "Can I have viscosupplementation in my hip?", "answer": "Yes, though it's used less commonly in the hip than the knee. The hip injection requires ultrasound or X-ray guidance for accuracy."}
        ],
        "relatedConditions": ["knee-arthritis", "hip-arthritis", "osteoarthritis"],
        "relatedTreatments": ["joint-injections", "prp-therapy"]
    },
    "fracture-fixation": {
        "name": "Fracture Fixation",
        "category": "Trauma Surgery",
        "icon": "🔩",
        "imageUrl": "https://images.pexels.com/photos/7446985/pexels-photo-7446985.jpeg?auto=compress&cs=tinysrgb&w=800",
        "heroTitle": "Fracture Fixation Surgery in Hyderabad",
        "heroSubtitle": "Expert fracture care with advanced fixation techniques.",
        "overview": "Fracture fixation involves surgically stabilizing broken bones using plates, screws, rods, or external devices. Dr. B Harsha Vardhana Reddy provides 24/7 trauma care at Apollo Hospitals, Financial District, Hyderabad, using the latest techniques for optimal healing.",
        "statistics": [
            {"label": "Union Rate", "value": "95%+", "description": "With proper fixation"},
            {"label": "Techniques", "value": "ORIF/IM Nail", "description": "Customized approach"},
            {"label": "Return to Work", "value": "6-12 weeks", "description": "Varies by fracture"},
            {"label": "Emergency Care", "value": "24/7", "description": "Available"}
        ],
        "candidatesFor": [
            "Displaced fractures",
            "Intra-articular (joint) fractures",
            "Open (compound) fractures",
            "Multiple fractures",
            "Fractures that failed cast treatment",
            "Elderly patients needing early mobilization"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Evaluation", "description": "X-rays, CT if needed, plan surgery", "duration": "Variable"},
            {"step": 2, "title": "Anesthesia", "description": "General or regional anesthesia", "duration": "30 minutes"},
            {"step": 3, "title": "Reduction", "description": "Realign bone fragments to anatomic position", "duration": "15-30 minutes"},
            {"step": 4, "title": "Fixation", "description": "Apply plates/screws, nail, or external fixator", "duration": "1-3 hours"},
            {"step": 5, "title": "Closure", "description": "Close wound, apply dressing/splint", "duration": "15-30 minutes"}
        ],
        "benefits": [
            {"title": "Anatomic Alignment", "description": "Bones heal in correct position", "icon": "✓"},
            {"title": "Early Mobilization", "description": "Move joints sooner", "icon": "✓"},
            {"title": "Stable Fixation", "description": "Reduces malunion risk", "icon": "✓"},
            {"title": "Faster Recovery", "description": "Return to function sooner", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Wound healing, pain control", "activities": "Protected weight bearing"},
            {"phase": "Week 2-6", "milestone": "Early bone healing", "activities": "Gentle exercises"},
            {"phase": "Week 6-12", "milestone": "Progressive weight bearing", "activities": "Physical therapy"},
            {"phase": "Month 3-6", "milestone": "Bone union, return to activities", "activities": "Strengthening"}
        ],
        "risks": [
            {"risk": "Infection", "percentage": "1-2%", "prevention": "Antibiotics, sterile technique"},
            {"risk": "Non-union", "percentage": "2-5%", "prevention": "Proper technique, stop smoking"},
            {"risk": "Hardware problems", "percentage": "5-10%", "prevention": "May need removal later"}
        ],
        "faqs": [
            {"question": "Will I need the hardware removed?", "answer": "Not always. Many patients have no problems with hardware left in place. Removal is considered if there is irritation, infection, or in young patients with growth remaining."},
            {"question": "How long before I can walk after leg fracture surgery?", "answer": "This depends on the fracture location and fixation stability. Some allow immediate weight bearing; others require 6-12 weeks of protected weight bearing."},
            {"question": "What if the fracture doesn't heal?", "answer": "Non-union occurs in about 2-5% of fractures. Treatment may include bone grafting, revision fixation, or bone stimulator."}
        ],
        "relatedConditions": ["fracture-trauma"],
        "relatedTreatments": ["joint-replacement"]
    },
    "sports-injury-treatment": {
        "name": "Sports Injury Treatment",
        "category": "Sports Medicine",
        "icon": "⚽",
        "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "heroTitle": "Sports Injury Treatment in Hyderabad",
        "heroSubtitle": "Get back in the game with expert sports medicine care.",
        "overview": "Sports injuries require specialized care focused on returning athletes to their sport safely and quickly. Dr. B Harsha Vardhana Reddy provides comprehensive sports medicine services at Apollo Hospitals, Financial District, Hyderabad, treating amateur to professional athletes.",
        "statistics": [
            {"label": "Return to Sport", "value": "90%+", "description": "With proper treatment"},
            {"label": "Arthroscopic", "value": "Yes", "description": "Minimally invasive options"},
            {"label": "Rehab Programs", "value": "Customized", "description": "Sport-specific"},
            {"label": "Experience", "value": "15+ years", "description": "Sports injuries"}
        ],
        "candidatesFor": [
            "ACL, PCL, and other knee ligament injuries",
            "Meniscus tears",
            "Shoulder instability and labral tears",
            "Rotator cuff injuries",
            "Ankle sprains and instability",
            "Muscle strains and tears",
            "Overuse injuries (tendinitis)"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Evaluation", "description": "Detailed history, exam, and imaging", "duration": "30-45 minutes"},
            {"step": 2, "title": "Diagnosis", "description": "Determine exact injury and severity", "duration": "Same visit"},
            {"step": 3, "title": "Treatment Plan", "description": "Conservative vs surgical, timeline", "duration": "Discussion"},
            {"step": 4, "title": "Rehabilitation", "description": "Sport-specific rehab program", "duration": "Weeks to months"},
            {"step": 5, "title": "Return to Sport", "description": "Functional testing before clearance", "duration": "When ready"}
        ],
        "benefits": [
            {"title": "Expert Care", "description": "Specialized in athlete needs", "icon": "✓"},
            {"title": "Minimally Invasive", "description": "Arthroscopic techniques when possible", "icon": "✓"},
            {"title": "Sport-Specific Rehab", "description": "Tailored to your sport", "icon": "✓"},
            {"title": "Performance Focus", "description": "Goal is return to full performance", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Phase 1", "milestone": "Acute care, protect injury", "activities": "Rest, ice, protect"},
            {"phase": "Phase 2", "milestone": "Restore motion and strength", "activities": "Physical therapy"},
            {"phase": "Phase 3", "milestone": "Sport-specific training", "activities": "Drills, agility"},
            {"phase": "Phase 4", "milestone": "Return to competition", "activities": "Full clearance"}
        ],
        "risks": [
            {"risk": "Re-injury", "percentage": "Variable", "prevention": "Complete rehab before return"},
            {"risk": "Persistent symptoms", "percentage": "5-10%", "prevention": "Proper treatment and rehab"}
        ],
        "faqs": [
            {"question": "When can I return to my sport after ACL surgery?", "answer": "Most athletes return to cutting/pivoting sports at 9-12 months after ACL reconstruction, following successful completion of a return-to-sport testing protocol."},
            {"question": "Do all sports injuries need surgery?", "answer": "No, many sports injuries heal well with conservative treatment including rest, physical therapy, and gradual return to activity. Surgery is reserved for specific injuries that won't heal or will lead to long-term problems without it."},
            {"question": "How can I prevent sports injuries?", "answer": "Prevention strategies include proper warm-up, strength training, flexibility work, sport-specific training, appropriate equipment, and adequate rest between activities."}
        ],
        "relatedConditions": ["acl-tear", "meniscus-tear", "shoulder-dislocation", "ankle-sprain"],
        "relatedTreatments": ["acl-reconstruction", "knee-arthroscopy", "shoulder-arthroscopy"]
    },
    "bankart-repair": {
        "name": "Bankart Repair",
        "category": "Shoulder Surgery",
        "icon": "💪",
        "imageUrl": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
        "heroTitle": "Bankart Repair Surgery in Hyderabad",
        "heroSubtitle": "Stop recurrent shoulder dislocations with expert stabilization surgery.",
        "overview": "Bankart repair is an arthroscopic procedure to fix the torn labrum (cartilage rim) and capsule after shoulder dislocations. Dr. B Harsha Vardhana Reddy specializes in shoulder stabilization surgery at Apollo Hospitals, Financial District, Hyderabad.",
        "statistics": [
            {"label": "Success Rate", "value": "85-95%", "description": "Prevention of recurrence"},
            {"label": "Surgery Time", "value": "1-1.5 hrs", "description": "Arthroscopic"},
            {"label": "Hospital Stay", "value": "1 day", "description": "Usually overnight"},
            {"label": "Return to Sports", "value": "4-6 months", "description": "Contact sports"}
        ],
        "candidatesFor": [
            "Recurrent shoulder dislocations",
            "First-time dislocation in young athletes",
            "Shoulder instability affecting activities",
            "Bankart lesion on MRI",
            "Patients wanting to return to contact sports"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Anesthesia", "description": "General anesthesia with nerve block", "duration": "30 minutes"},
            {"step": 2, "title": "Arthroscopy Setup", "description": "Position patient, create portals", "duration": "15 minutes"},
            {"step": 3, "title": "Assessment", "description": "Evaluate labrum, capsule, bone", "duration": "10 minutes"},
            {"step": 4, "title": "Preparation", "description": "Prepare glenoid rim and labrum", "duration": "15 minutes"},
            {"step": 5, "title": "Anchor Placement", "description": "Place 3-4 suture anchors to reattach labrum", "duration": "30-45 minutes"},
            {"step": 6, "title": "Closure", "description": "Close portals, apply sling", "duration": "10 minutes"}
        ],
        "benefits": [
            {"title": "Minimally Invasive", "description": "Small incisions, less scarring", "icon": "✓"},
            {"title": "Anatomic Repair", "description": "Restores normal anatomy", "icon": "✓"},
            {"title": "High Success Rate", "description": "85-95% stable shoulders", "icon": "✓"},
            {"title": "Return to Sports", "description": "Most athletes return to full activity", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-4", "milestone": "Sling, passive motion only", "activities": "Elbow/wrist exercises ok"},
            {"phase": "Week 4-8", "milestone": "Begin active motion", "activities": "Wean from sling"},
            {"phase": "Month 2-4", "milestone": "Strengthening begins", "activities": "Rotator cuff exercises"},
            {"phase": "Month 4-6", "milestone": "Sport-specific training", "activities": "Return to contact sports"}
        ],
        "risks": [
            {"risk": "Recurrence", "percentage": "5-15%", "prevention": "Complete rehab, avoid early return"},
            {"risk": "Stiffness", "percentage": "5-10%", "prevention": "Proper early motion"},
            {"risk": "Nerve injury", "percentage": "<1%", "prevention": "Careful portal placement"}
        ],
        "faqs": [
            {"question": "What is the difference between Bankart repair and Latarjet?", "answer": "Bankart repair fixes the torn labrum back to the socket. Latarjet transfers bone to the front of the socket for cases with significant bone loss. Your surgeon will recommend the best option based on your imaging."},
            {"question": "Can I lift weights after Bankart repair?", "answer": "Yes, but weight training is gradually introduced starting around 3 months after surgery. Full heavy lifting typically allowed at 4-6 months."},
            {"question": "Will my shoulder feel normal after surgery?", "answer": "Most patients have excellent function after Bankart repair. Some may notice mild stiffness compared to the other shoulder, particularly with extreme external rotation, but this rarely affects activities."}
        ],
        "relatedConditions": ["shoulder-dislocation", "slap-tear"],
        "relatedTreatments": ["shoulder-arthroscopy"]
    },
    "ankle-ligament-reconstruction": {
        "name": "Ankle Ligament Reconstruction",
        "category": "Foot & Ankle Surgery",
        "icon": "🦶",
        "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "heroTitle": "Ankle Ligament Reconstruction in Hyderabad",
        "heroSubtitle": "Restore ankle stability and get back to active life.",
        "overview": "Ankle ligament reconstruction stabilizes chronically unstable ankles that have not responded to rehabilitation. Dr. B Harsha Vardhana Reddy performs both Broström repair and reconstruction procedures at Apollo Hospitals, Financial District, Hyderabad.",
        "statistics": [
            {"label": "Success Rate", "value": "85-95%", "description": "Stability restoration"},
            {"label": "Surgery Time", "value": "1-1.5 hrs", "description": "Depending on technique"},
            {"label": "Hospital Stay", "value": "Day care", "description": "Or overnight"},
            {"label": "Return to Sports", "value": "4-6 months", "description": "With full rehab"}
        ],
        "candidatesFor": [
            "Chronic ankle instability (repeated sprains)",
            "Ankle giving way during activities",
            "Failed 3-6 months of rehabilitation",
            "Athletes with high ankle demands",
            "Patients with persistent symptoms"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Anesthesia", "description": "Spinal or general anesthesia, ankle block", "duration": "30 minutes"},
            {"step": 2, "title": "Incision", "description": "Small incision over lateral ankle", "duration": "5 minutes"},
            {"step": 3, "title": "Ligament Assessment", "description": "Evaluate ATFL and CFL quality", "duration": "10 minutes"},
            {"step": 4, "title": "Broström Repair", "description": "Tighten and reattach native ligaments", "duration": "30-45 minutes"},
            {"step": 5, "title": "Augmentation (if needed)", "description": "Reinforce with tissue or tendon graft", "duration": "Additional 30 minutes"},
            {"step": 6, "title": "Closure", "description": "Close wound, apply splint", "duration": "15 minutes"}
        ],
        "benefits": [
            {"title": "Stable Ankle", "description": "Stops recurrent sprains", "icon": "✓"},
            {"title": "Preserves Motion", "description": "Maintains normal ankle movement", "icon": "✓"},
            {"title": "Protects Joint", "description": "Prevents future arthritis", "icon": "✓"},
            {"title": "Return to Activity", "description": "Most return to sports", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Week 1-2", "milestone": "Splint, non-weight bearing", "activities": "Elevate, ice"},
            {"phase": "Week 2-6", "milestone": "Walking boot, protected weight bearing", "activities": "Gentle exercises"},
            {"phase": "Week 6-12", "milestone": "Out of boot, physical therapy", "activities": "Strengthening, balance"},
            {"phase": "Month 3-6", "milestone": "Return to activities", "activities": "Sport-specific training"}
        ],
        "risks": [
            {"risk": "Stiffness", "percentage": "5-10%", "prevention": "Early motion after healing"},
            {"risk": "Recurrent instability", "percentage": "5-15%", "prevention": "Complete rehab"},
            {"risk": "Nerve injury", "percentage": "3-5%", "prevention": "Careful dissection"}
        ],
        "faqs": [
            {"question": "What is the Broström procedure?", "answer": "The Broström procedure tightens and repairs your own ligaments (ATFL and CFL). It's the most common surgery for ankle instability and has excellent results with minimal complications."},
            {"question": "When do I need a tendon graft for my ankle?", "answer": "Tendon graft reconstruction is used when the native ligaments are too damaged to repair, in revision cases, or in very heavy or hypermobile patients."},
            {"question": "Can I run after ankle ligament surgery?", "answer": "Yes, most patients return to running at 3-4 months and sports at 4-6 months. The ankle is typically stronger and more stable than before surgery."}
        ],
        "relatedConditions": ["ankle-sprain", "ankle-arthritis"],
        "relatedTreatments": ["sports-injury-treatment"]
    },
    "carpal-tunnel-release": {
        "name": "Carpal Tunnel Release",
        "category": "Hand Surgery",
        "icon": "✋",
        "imageUrl": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
        "heroTitle": "Carpal Tunnel Release Surgery in Hyderabad",
        "heroSubtitle": "Quick, effective relief for hand numbness and pain.",
        "overview": "Carpal tunnel release is a simple surgery that relieves pressure on the median nerve by cutting the ligament forming the roof of the carpal tunnel. Dr. B Harsha Vardhana Reddy performs this procedure at Apollo Hospitals, Financial District, Hyderabad.",
        "statistics": [
            {"label": "Surgery Time", "value": "15-20 min", "description": "Quick procedure"},
            {"label": "Anesthesia", "value": "Local", "description": "No general anesthesia needed"},
            {"label": "Success Rate", "value": "95%+", "description": "Symptom relief"},
            {"label": "Recovery", "value": "2-4 weeks", "description": "Return to normal activities"}
        ],
        "candidatesFor": [
            "Carpal tunnel syndrome not responding to splinting",
            "Constant numbness in fingers",
            "Muscle wasting at base of thumb",
            "Severe symptoms affecting sleep and function",
            "Positive nerve conduction studies"
        ],
        "procedureSteps": [
            {"step": 1, "title": "Local Anesthesia", "description": "Numb the palm with local anesthetic", "duration": "5 minutes"},
            {"step": 2, "title": "Incision", "description": "Small incision in palm (2-3 cm)", "duration": "1 minute"},
            {"step": 3, "title": "Release", "description": "Cut the transverse carpal ligament", "duration": "5-10 minutes"},
            {"step": 4, "title": "Closure", "description": "Close skin with sutures", "duration": "5 minutes"}
        ],
        "benefits": [
            {"title": "Immediate Relief", "description": "Numbness often improves right away", "icon": "✓"},
            {"title": "Quick Procedure", "description": "Done under local anesthesia", "icon": "✓"},
            {"title": "High Success Rate", "description": "95%+ patients improved", "icon": "✓"},
            {"title": "Permanent Solution", "description": "Recurrence is rare", "icon": "✓"}
        ],
        "recoveryTimeline": [
            {"phase": "Day 1", "milestone": "Numbness often immediately better", "activities": "Keep hand elevated"},
            {"phase": "Week 1", "milestone": "Wound healing", "activities": "Light use ok"},
            {"phase": "Week 2", "milestone": "Suture removal", "activities": "Increase activity"},
            {"phase": "Week 2-6", "milestone": "Full recovery", "activities": "Return to all activities"}
        ],
        "risks": [
            {"risk": "Pillar pain", "percentage": "10-20%", "prevention": "Usually temporary, resolves in weeks"},
            {"risk": "Scar tenderness", "percentage": "5-10%", "prevention": "Scar massage"},
            {"risk": "Incomplete relief", "percentage": "5%", "prevention": "May need revision or further workup"}
        ],
        "faqs": [
            {"question": "Is carpal tunnel surgery painful?", "answer": "The surgery is done under local anesthesia, so you don't feel pain during the procedure. After surgery, there is mild discomfort for a few days, easily managed with over-the-counter pain medication."},
            {"question": "Can I drive after carpal tunnel surgery?", "answer": "Most patients can drive within 1-2 weeks if they feel comfortable gripping the steering wheel. For manual transmission, wait until you have full grip strength."},
            {"question": "What's the difference between open and endoscopic carpal tunnel release?", "answer": "Both have similar success rates. Endoscopic has a smaller scar and may have slightly faster return to work. Open surgery allows better visualization and is often preferred."}
        ],
        "relatedConditions": ["carpal-tunnel", "trigger-finger"],
        "relatedTreatments": ["joint-injections"]
    }
}
