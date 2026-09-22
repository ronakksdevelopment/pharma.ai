/**
 * AI Empowered Pharmacy, Educational Content Data
 * ---------------------------------------------------
 * All in-app educational copy lives here: explore categories, medicine
 * cards, research topics and quiz questions. General knowledge only -
 * no personalized dosage, diagnosis or prescription content.
 */

const APP_DATA = {
  // ---- Explore categories -------------------------------------------------
  categories: [
    { id: "basics", label: "Pharmacy Basics", icon: "fa-mortar-pestle" },
    { id: "science", label: "Pharmaceutical Science", icon: "fa-dna" },
    { id: "delivery", label: "Drug Delivery", icon: "fa-capsules" },
    { id: "nano", label: "Nanotechnology", icon: "fa-atom" },
    { id: "ai", label: "AI in Healthcare", icon: "fa-brain" },
    { id: "forms", label: "Dosage Forms", icon: "fa-pills" },
    { id: "safety", label: "Medication Safety", icon: "fa-shield-heart" },
  ],

  // ---- Explore educational cards ------------------------------------------
  exploreCards: [
    {
      id: "what-is-pharmacy",
      category: "basics",
      title: "What Is Pharmacy?",
      summary:
        "Pharmacy is the science and practice of discovering, preparing, dispensing and reviewing medicines safely and effectively.",
      body:
        "Pharmacy sits at the intersection of chemistry, biology and patient care. Pharmacists study how drugs are formulated, how they act in the body, and how to counsel people on safe, effective use. This app explores those ideas conceptually, it does not replace professional pharmacy advice.",
      tags: ["Foundations", "Education"],
    },
    {
      id: "pharmacology-basics",
      category: "science",
      title: "Pharmacology Fundamentals",
      summary:
        "Pharmacology studies how drugs interact with biological systems, from absorption to elimination.",
      body:
        "Two core ideas anchor pharmacology: pharmacokinetics (what the body does to a drug, absorption, distribution, metabolism, excretion) and pharmacodynamics (what a drug does to the body, its mechanism and effect). Understanding both helps explain why timing, formulation and dose form matter.",
      tags: ["ADME", "Mechanism"],
    },
    {
      id: "drug-delivery-systems",
      category: "delivery",
      title: "Drug Delivery Systems",
      summary:
        "Drug delivery technology controls where, when and how fast a medicine is released in the body.",
      body:
        "Modern delivery systems go beyond a simple tablet. Extended-release coatings, transdermal patches, inhalers and injectable depots are all engineered to shape a drug's release profile, improving effectiveness and reducing how often a dose is needed.",
      tags: ["Formulation", "Release profile"],
    },
    {
      id: "nanoparticle-concepts",
      category: "nano",
      title: "Nanoparticles in Medicine",
      summary:
        "Nanotechnology enables tiny engineered carriers that can transport drugs with more precision.",
      body:
        "Nanoparticle carriers, lipid nanoparticles, polymeric nanoparticles and similar structures, are designed at the scale of billionths of a meter. Conceptually, they can help protect a drug until it reaches its target site, a major research direction in modern pharmaceutical science.",
      tags: ["Nanomedicine", "Research"],
    },
    {
      id: "ai-in-pharmacy",
      category: "ai",
      title: "AI in Healthcare & Pharmacy",
      summary:
        "Artificial intelligence is increasingly used to support research, education and workflow, not to replace clinicians.",
      body:
        "AI techniques can help researchers analyze molecular data, support educational tools like this app, and assist administrative workflows. In real healthcare settings, AI supports licensed professionals; it does not diagnose or prescribe on its own.",
      tags: ["AI", "Technology"],
    },
    {
      id: "dosage-forms-overview",
      category: "forms",
      title: "Common Dosage Forms",
      summary:
        "Tablets, capsules, liquids, topicals and injectables each suit different clinical needs.",
      body:
        "A dosage form is the physical form a medicine takes, solid, liquid, semi-solid or gas. The choice affects how quickly a drug acts, how it's stored, and how easy it is to take. This app explains forms conceptually, without recommending any specific product for any condition.",
      tags: ["Formulation", "Basics"],
    },
    {
      id: "medication-safety-overview",
      category: "safety",
      title: "Principles of Medication Safety",
      summary:
        "Safety in pharmacy is built on accurate information, clear labeling and careful verification.",
      body:
        "Core safety principles include checking for interactions, verifying correct identity and strength, and clear patient communication. This app teaches the concepts behind safety practices; it is not a substitute for a pharmacist or doctor's guidance.",
      tags: ["Safety", "Best practice"],
    },
    {
      id: "compounding-basics",
      category: "basics",
      title: "What Is Compounding?",
      summary:
        "Compounding is the practice of preparing customized medications for specific educational or clinical scenarios.",
      body:
        "Historically, pharmacists prepared medicines by hand. Today compounding pharmacies still prepare customized formulations under regulation, for example adjusting a form for a patient who cannot swallow tablets. This is a conceptual overview only.",
      tags: ["History", "Practice"],
    },
    {
      id: "receptor-theory",
      category: "science",
      title: "Receptor Theory Basics",
      summary:
        "Many drugs act by binding to specific receptors, like a key fitting a lock.",
      body:
        "Receptor theory describes how drug molecules bind to protein receptors on or inside cells, triggering or blocking a biological response. Selectivity, how precisely a drug binds its intended target, is central to both effectiveness and side-effect profile.",
      tags: ["Mechanism", "Theory"],
    },
  ],

  // ---- Medicine education cards --------------------------------------------
  medicines: [
    {
      id: "paracetamol",
      name: "Paracetamol (Acetaminophen)",
      classLabel: "Analgesic / Antipyretic",
      icon: "fa-tablets",
      summary:
        "A widely used over-the-counter medicine for reducing fever and relieving mild to moderate pain.",
      facts: [
        "Belongs to the analgesic (pain-relieving) and antipyretic (fever-reducing) drug classes.",
        "Believed to act primarily within the central nervous system.",
        "One of the most commonly used medicines worldwide for general education purposes.",
        "Available in multiple dosage forms, including tablets, capsules and liquid suspensions.",
      ],
      note: "Educational overview only, not a dosing guide. Always follow product labeling and professional guidance.",
    },
    {
      id: "amoxicillin",
      name: "Amoxicillin",
      classLabel: "Antibiotic (Penicillin class)",
      icon: "fa-capsules",
      summary:
        "A penicillin-type antibiotic used conceptually to illustrate how antibacterial medicines work.",
      facts: [
        "Belongs to the penicillin family of antibiotics.",
        "Works by interfering with bacterial cell wall formation, conceptually speaking.",
        "Used in educational contexts to explain antibiotic classes and bacterial resistance concepts.",
        "Antibiotics only work against bacteria, not viruses.",
      ],
      note: "Educational overview only. Antibiotic use should always be guided by a licensed prescriber.",
    },
    {
      id: "ibuprofen",
      name: "Ibuprofen",
      classLabel: "NSAID (Anti-inflammatory)",
      icon: "fa-pills",
      summary:
        "A nonsteroidal anti-inflammatory drug (NSAID) commonly referenced to teach inflammation and pain pathways.",
      facts: [
        "Belongs to the NSAID (nonsteroidal anti-inflammatory drug) class.",
        "Conceptually works by inhibiting enzymes involved in the inflammatory response.",
        "Used in pharmacy education to illustrate anti-inflammatory mechanisms.",
        "Available in tablet, liquid and topical gel forms in many markets.",
      ],
      note: "Educational overview only, not a dosing guide. Always follow product labeling and professional guidance.",
    },
    {
      id: "nanoparticle-delivery",
      name: "Nanoparticle Drug Delivery",
      classLabel: "Conceptual Delivery Technology",
      icon: "fa-atom",
      summary:
        "A conceptual illustration of how nanoscale carriers are researched to improve how drugs reach target sites.",
      facts: [
        "A research concept, not a specific approved medicine.",
        "Nanoparticles are engineered at scales of roughly 1–100 nanometers.",
        "Research explores using nanoparticles to help protect a drug and guide it toward a target tissue.",
        "This card represents general pharmaceutical science concepts explored by researchers worldwide.",
      ],
      note: "Purely conceptual and educational, represents general nanomedicine research themes, not a specific product or clinical claim.",
    },
  ],

  // ---- Research topics -----------------------------------------------------
  research: [
    {
      id: "chitosan",
      title: "Chitosan in Nanoparticle Research",
      icon: "fa-flask-vial",
      badge: "Research Material",
      summary:
        "Chitosan is a natural biopolymer widely studied for its role in nanoparticle-based drug delivery research.",
      body:
        "Chitosan is a naturally derived biopolymer, produced from chitin found in crustacean shells and fungal cell walls, that researchers study for its biocompatibility, biodegradability and ability to form nanoparticles. It's discussed here as a real example of the kind of nanotechnology research relevant to modern pharmaceutical science, particularly for targeted and controlled drug delivery.",
    },
    {
      id: "nanotech-research",
      title: "Nanoparticle Research Directions",
      icon: "fa-atom",
      badge: "Research Theme",
      summary:
        "Explores how nanoscale engineering is studied as a way to improve drug targeting and stability.",
      body:
        "Across the pharmaceutical field, researchers study nanoscale carriers, including lipid and polymer-based particles, for their potential to protect sensitive drug molecules and influence how they distribute through the body. This is an active and evolving area of scientific research.",
    },
    {
      id: "ai-assisted-education",
      title: "AI-Assisted Pharmacy Education",
      icon: "fa-brain",
      badge: "Technology",
      summary:
        "How AI-inspired tools like this app can support interactive learning about pharmaceutical concepts.",
      body:
        "AI-inspired educational tools can present complex pharmaceutical science in interactive, digestible formats, quizzes, visual explainers and structured cards. This app demonstrates that concept; it does not use live AI models to generate medical advice.",
    },
    {
      id: "scientific-visualization",
      title: "Scientific Visualization in Pharma",
      icon: "fa-chart-line",
      badge: "Visualization",
      summary:
        "Visual models help communicate molecular structures and delivery mechanisms to learners.",
      body:
        "Illustrations of molecules, DNA structures and cellular targets, like those used throughout this app, help make abstract pharmaceutical science concepts easier to understand for students and the general public.",
    },
    {
      id: "drug-delivery-research",
      title: "Advances in Drug Delivery",
      icon: "fa-capsules",
      badge: "Research Theme",
      summary:
        "Ongoing research explores new ways to control the timing and location of drug release.",
      body:
        "From extended-release tablets to targeted delivery research, the field continues to explore how formulation technology can make medicines more effective and convenient. This card summarizes general, publicly understood themes in the field.",
    },
  ],

  // ---- Quiz questions --------------------------------------------------------
  quiz: [
    {
      id: "q1",
      question: "What does the term 'pharmacokinetics' describe?",
      options: [
        "What the body does to a drug (absorption, distribution, metabolism, excretion)",
        "What a drug does to the body",
        "The chemical name of a drug",
        "The price of a medicine",
      ],
      correctIndex: 0,
      explanation:
        "Pharmacokinetics covers ADME, absorption, distribution, metabolism and excretion, describing how the body processes a drug over time.",
    },
    {
      id: "q2",
      question: "What does 'pharmacodynamics' study?",
      options: [
        "Drug pricing models",
        "What a drug does to the body and its mechanism of action",
        "Drug packaging design",
        "Pharmacy store locations",
      ],
      correctIndex: 1,
      explanation:
        "Pharmacodynamics focuses on a drug's effects and mechanism of action within the body.",
    },
    {
      id: "q3",
      question: "Which drug class does amoxicillin belong to?",
      options: ["NSAID", "Antihistamine", "Penicillin-type antibiotic", "Antipyretic only"],
      correctIndex: 2,
      explanation:
        "Amoxicillin is part of the penicillin family of antibiotics, used to treat certain bacterial infections.",
    },
    {
      id: "q4",
      question: "NSAID stands for which of the following?",
      options: [
        "Nonsteroidal Anti-Inflammatory Drug",
        "New Synthetic Antibiotic Ingredient",
        "Natural Steroid Analgesic Ingredient",
        "None of the above",
      ],
      correctIndex: 0,
      explanation:
        "NSAID stands for Nonsteroidal Anti-Inflammatory Drug, a class that includes ibuprofen.",
    },
    {
      id: "q5",
      question: "Roughly what size scale do nanoparticles operate at?",
      options: ["1–100 millimeters", "1–100 micrometers", "1–100 nanometers", "1–100 meters"],
      correctIndex: 2,
      explanation:
        "Nanoparticles are typically engineered at the scale of roughly 1 to 100 nanometers.",
    },
    {
      id: "q6",
      question: "What is a 'dosage form' in pharmacy?",
      options: [
        "The price of a medicine",
        "The physical form a medicine takes, like tablet or liquid",
        "The brand name of a drug",
        "A type of pharmacy license",
      ],
      correctIndex: 1,
      explanation:
        "A dosage form refers to the physical form of a medicine, solid, liquid, semi-solid or gas, which affects how it's used and absorbed.",
    },
    {
      id: "q7",
      question: "Antibiotics like amoxicillin are effective against which of the following?",
      options: ["Viruses only", "Bacteria", "Fungi only", "All infections"],
      correctIndex: 1,
      explanation:
        "Antibiotics target bacteria. They are not effective against viral infections.",
    },
    {
      id: "q8",
      question: "What best describes receptor theory in pharmacology?",
      options: [
        "Drugs are stored in receptors before use",
        "Drug molecules bind to specific protein receptors to trigger or block a response",
        "Receptors determine drug pricing",
        "Receptors are only found in the liver",
      ],
      correctIndex: 1,
      explanation:
        "Receptor theory explains how drugs bind selectively to receptors, like a key fitting a lock, to produce a biological effect.",
    },
    {
      id: "q9",
      question: "What is the main educational purpose of AI in this app's context?",
      options: [
        "To diagnose medical conditions",
        "To prescribe medication",
        "To support interactive learning about pharmacy concepts",
        "To replace pharmacists",
      ],
      correctIndex: 2,
      explanation:
        "This app uses AI-inspired concepts purely to support interactive education, never diagnosis or prescribing.",
    },
    {
      id: "q10",
      question: "Which of these is an example of a drug delivery technology?",
      options: ["Transdermal patch", "Pharmacy signage", "Prescription pad", "Insurance card"],
      correctIndex: 0,
      explanation:
        "A transdermal patch is a delivery technology designed to release a drug through the skin over time.",
    },
    {
      id: "q11",
      question: "What is 'Chitosan' as discussed in this app?",
      options: [
        "A synthetic plastic with no biological origin",
        "A natural biopolymer studied for nanoparticle drug delivery",
        "A government health agency",
        "A type of antibiotic",
      ],
      correctIndex: 1,
      explanation:
        "Chitosan is a naturally derived biopolymer (from chitin) that researchers study for its biocompatibility and biodegradability in nanoparticle-based drug delivery systems.",
    },
    {
      id: "q12",
      question: "Why is medication safety education important?",
      options: [
        "It has no real-world importance",
        "It helps people understand concepts like verification and clear labeling",
        "It only matters for pharmacists, not patients",
        "It replaces the need for doctors",
      ],
      correctIndex: 1,
      explanation:
        "Understanding medication safety principles, like verification and clear communication, helps build safer healthcare habits for everyone.",
    },
    {
      id: "q13",
      question: "What does 'compounding' refer to in pharmacy?",
      options: [
        "Combining pharmacies into one company",
        "Preparing customized medication formulations under regulation",
        "A type of drug packaging machine",
        "A pharmacy loyalty program",
      ],
      correctIndex: 1,
      explanation:
        "Compounding is the regulated practice of preparing customized medication formulations for specific needs.",
    },
  ],
};
