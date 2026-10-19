import { DiagnosticPackage, CustomAddon, IndividualTest, LabBranch, PatientReview } from '../types';

export const DIAGNOSTIC_PACKAGES: DiagnosticPackage[] = [
  {
    id: 'pkg-01',
    code: '01',
    name: '01 Regular Health Profile',
    category: 'Full Body',
    mrp: 1999,
    finalPrice: 999,
    savings: 1000,
    fastingRequired: true,
    fastingHours: 10,
    reportTimeHours: 8,
    popular: true,
    testCountLabel: '80+',
    badgeTitle: 'NO. OF TESTS',
    description: 'Essential preventive checkup covering vital organ functions, sugar status, and lipid balance.',
    testsIncluded: [
      'Complete Blood Count (CBC + ESR) – 24 parameters',
      'Fasting Blood Sugar (FBS) – 1 parameter',
      'Glycated Hemoglobin (HbA1c & Estimated Average Glucose) – 2 parameters',
      'Lipid Profile Comprehensive (Cholesterol, HDL, LDL, VLDL, Triglycerides, Non-HDL, Ratios) – 8 parameters',
      'Liver Function Test (LFT Complete: Bilirubin T/D/I, SGOT, SGPT, ALP, Protein, Albumin, Globulin, A/G Ratio) – 12 parameters',
      'Kidney Function Test (KFT Complete: Blood Urea, Creatinine, Uric Acid, BUN, eGFR, Calcium, Phosphorus) – 9 parameters',
      'Thyroid Profile (TSH Ultrasensitive & Thyroid Screening) – 3 parameters',
      'Electrolytes & Vital Minerals (Serum Calcium & Minerals) – 2 parameters',
      'Urine Routine & Microscopic Examination (Physical, Chemical & Microscopic Analysis) – 19 parameters'
    ]
  },
  {
    id: 'pkg-02',
    code: '02',
    name: '02 Full Body + CRP',
    category: 'Full Body',
    mrp: 3500,
    finalPrice: 1199,
    savings: 2301,
    fastingRequired: true,
    fastingHours: 10,
    reportTimeHours: 12,
    popular: true,
    testCountLabel: '80+',
    badgeTitle: 'TOTAL TESTS',
    description: 'Comprehensive full body screening with systemic inflammatory marker (C-Reactive Protein) and essential vitamins.',
    testsIncluded: [
      'CBC + ESR (Erythrocyte Sedimentation Rate) – 24 parameters',
      'FBS + HbA1c (Average 3-Month Glucose) – 3 parameters',
      'Lipid Profile (Complete Lipid Panel) – 8 parameters',
      'Liver Function Test (LFT Complete) – 11 parameters',
      'Kidney Function Test (KFT + eGFR Glomerular Rate) – 9 parameters',
      'Thyroid Trio (T3, T4, TSH) – 3 parameters',
      'Vitamin D (25-OH) & Vitamin B12 – 2 parameters',
      'C-Reactive Protein (CRP Quantitative) – 1 parameter',
      'Urine Routine & Microscopic (R&M) – 19 parameters'
    ]
  },
  {
    id: 'pkg-03',
    code: '03',
    name: '03 Old Age / Senior Citizen Profile',
    category: 'Senior Citizen',
    mrp: 5499,
    finalPrice: 1499,
    savings: 4000,
    fastingRequired: true,
    fastingHours: 10,
    reportTimeHours: 12,
    popular: true,
    testCountLabel: '70+',
    badgeTitle: 'NO. OF TESTS',
    description: 'Specialized gerontology panel tailored for elders focusing on joint health, bone density, renal preservation, and cardiovascular wellness.',
    testsIncluded: [
      'CBC + ESR',
      'FBS + HbA1c (Glycemic Stability)',
      'Complete Lipid Profile',
      'Liver Function Test (LFT)',
      'Kidney Function Test + eGFR',
      'TSH (Thyroid Function)',
      'Vitamin B12 & Vitamin D (25-OH)',
      'Serum Calcium',
      'Serum Uric Acid (Gout / Arthritis)',
      'Urine Routine + Microalbumin (Early Renal Protection)'
    ]
  },
  {
    id: 'pkg-04',
    code: '04',
    name: '04 Lady Health Profile',
    category: 'Women',
    mrp: 4499,
    finalPrice: 999,
    savings: 3500,
    fastingRequired: true,
    fastingHours: 10,
    reportTimeHours: 8,
    popular: true,
    testCountLabel: '70+',
    badgeTitle: 'NO. OF TESTS',
    description: 'Tailored specifically for women of all age brackets, addressing anemia, bone health, hormonal balance, and metabolic vitality.',
    testsIncluded: [
      'Complete Blood Count (CBC)',
      'Iron Profile (Serum Iron, TIBC, UIBC, Ferritin)',
      'FBS + HbA1c',
      'Lipid Profile Complete',
      'Liver Function Test (LFT)',
      'Kidney Function Test (KFT)',
      'TSH (Hormonal Balance)',
      'Vitamin D & Vitamin B12',
      'Urine Routine & Microscopy',
      'Serum Calcium'
    ]
  },
  {
    id: 'pkg-05',
    code: '05',
    name: '05 Pregnancy / Antenatal Profile',
    category: 'Women',
    mrp: 4200,
    finalPrice: 1599,
    savings: 2601,
    fastingRequired: false,
    reportTimeHours: 8,
    popular: true,
    testCountLabel: '40+',
    badgeTitle: 'NO. OF TESTS',
    description: 'Standard antenatal care screening recommended during pregnancy for maternal and fetal safety and viral screening.',
    testsIncluded: [
      'CBC (Complete Hemogram)',
      'Blood Group + Rh Factor',
      'Fasting Blood Sugar (FBS)',
      'Urine Routine & Microscopic (R&M)',
      'TSH (Thyroid Check)',
      'HIV 1 & 2 (Screening)',
      'HBsAg (Hepatitis B Antigen)',
      'VDRL (Syphilis Screening)',
      'HCV (Hepatitis C - if advised by Obstetrician)'
    ]
  },
  {
    id: 'pkg-06',
    code: '06',
    name: '06 Thyroid Profile',
    category: 'Thyroid',
    mrp: 699,
    finalPrice: 299,
    savings: 400,
    fastingRequired: false,
    reportTimeHours: 6,
    popular: true,
    description: 'Essential diagnostic assessment of triiodothyronine (T3), thyroxine (T4), and thyroid stimulating hormone (TSH).',
    testsIncluded: [
      'Total Triiodothyronine (Total T3)',
      'Total Thyroxine (Total T4)',
      'Thyroid Stimulating Hormone (TSH Ultrasensitive)'
    ]
  },
  {
    id: 'pkg-07',
    code: '07',
    name: '07 Child Health Profile',
    category: 'Children',
    mrp: 10499,
    finalPrice: 1699,
    savings: 8800,
    fastingRequired: false,
    reportTimeHours: 12,
    popular: true,
    testCountLabel: '60+',
    badgeTitle: 'NO. OF TESTS',
    description: 'Pediatric screening designed for growing infants, toddlers and young school-goers to assess nutrition, immunity, and growth factors.',
    testsIncluded: [
      'CBC (Complete Blood Count)',
      'Fasting Blood Sugar (FBS)',
      'Ferritin & Iron Screening',
      'Vitamin D & Vitamin B12',
      'TSH (Thyroid Growth Hormone)',
      'Serum Calcium',
      'Urine Routine & Microscopy',
      'Liver Function Test (LFT Basic)',
      'Kidney Function Test (KFT Basic)'
    ]
  },
  {
    id: 'pkg-08',
    code: '08',
    name: '08 School / College / Student Package',
    category: 'Student',
    mrp: 3549,
    finalPrice: 499,
    savings: 3050,
    fastingRequired: false,
    reportTimeHours: 6,
    popular: true,
    testCountLabel: '45+',
    badgeTitle: 'NO. OF TESTS',
    description: 'Affordable routine health checkup for students enrolling in school, college, hostel, or competitive athletic programs.',
    testsIncluded: [
      'Complete Blood Count (CBC)',
      'Fasting Blood Sugar (FBS)',
      'TSH (Thyroid Screening)',
      'Vitamin D (25-OH)',
      'Urine Routine & Microscopy',
      'Blood Pressure & BMI Recording (Physical Measurement)'
    ]
  },
  {
    id: 'pkg-09-m',
    code: '09-M',
    name: '09 Cancer Screening Profile — Male',
    category: 'Cancer Screening',
    mrp: 7500,
    finalPrice: 1999,
    savings: 5501,
    fastingRequired: true,
    fastingHours: 10,
    reportTimeHours: 24,
    popular: true,
    testCountLabel: '60+',
    badgeTitle: 'NO. OF TESTS',
    description: 'Targeted tumor marker evaluation for men over 35 to screen for prostate, liver, gastrointestinal, and testicular abnormalities.',
    testsIncluded: [
      'CBC + ESR',
      'Liver Function Test (LFT)',
      'Kidney Function Test (KFT)',
      'Urine Routine & Microscopy',
      'Alpha-Fetoprotein (AFP - Liver/Testicular)',
      'Beta HCG (βHCG Marker)',
      'Carcinoembryonic Antigen (CEA - Colorectal)',
      'Prostate Specific Antigen - Free (PSA-Free)',
      'Prostate Specific Antigen - Total (PSA-Total)',
      'CA 19-9 (Pancreatic / GI Marker)',
      'MD Pathologist Doctor Review'
    ]
  },
  {
    id: 'pkg-09-f',
    code: '09-F',
    name: '09 Cancer Screening Profile — Female',
    category: 'Cancer Screening',
    mrp: 10900,
    finalPrice: 2199,
    savings: 8701,
    fastingRequired: true,
    fastingHours: 10,
    reportTimeHours: 24,
    popular: true,
    testCountLabel: '60+',
    badgeTitle: 'NO. OF TESTS',
    description: 'Comprehensive female tumor marker panel detecting ovarian, breast, gastrointestinal, and cervical indicators.',
    testsIncluded: [
      'CBC + ESR',
      'Liver Function Test (LFT)',
      'Kidney Function Test (KFT)',
      'Urine Routine & Microscopy',
      'Alpha-Fetoprotein (AFP)',
      'Beta HCG (βHCG)',
      'CA-125 (Ovarian Cancer Marker)',
      'CA 15.3 (Breast Marker)',
      'CA 19.9 (Gastrointestinal Marker)',
      'Carcinoembryonic Antigen (CEA)',
      'MD Pathologist Doctor Review'
    ]
  },
  {
    id: 'pkg-10',
    code: '10',
    name: '10 TB Screening Profile',
    category: 'Full Body',
    mrp: 15000,
    finalPrice: 4999,
    savings: 10001,
    fastingRequired: false,
    reportTimeHours: 24,
    popular: true,
    testCountLabel: '45+',
    badgeTitle: 'NO. OF TESTS',
    description: 'Diagnostic workup for pulmonary and extra-pulmonary tuberculosis symptoms, persistent cough, and unexplained weight loss.',
    testsIncluded: [
      'Complete Blood Count (CBC)',
      'Erythrocyte Sedimentation Rate (ESR)',
      'C-Reactive Protein (CRP Quantitative)',
      'Sputum AFB Smear (Up to 3 Samples for Acid-Fast Bacilli)',
      'Chest X-Ray PA View (Digital Diagnostic)',
      'Doctor Referral & Clinical Review'
    ]
  },
  {
    id: 'pkg-11',
    code: '11',
    name: '11 Radiology + Cardiology Profile',
    category: 'Cardiology',
    mrp: 8500,
    finalPrice: 2999,
    savings: 5501,
    fastingRequired: true,
    fastingHours: 12,
    reportTimeHours: 12,
    popular: true,
    testCountLabel: '45+',
    badgeTitle: 'NO. OF TESTS',
    description: 'Comprehensive cardiac assessment with ECG, 2D Echo, chest X-ray, blood investigations, and cardiovascular risk markers.',
    testsIncluded: [
      '12-Lead Electrocardiogram (ECG)',
      '2D Echocardiography with Doppler',
      'Chest X-Ray PA View',
      'Blood Pressure & Hemodynamic Evaluation',
      'Fasting Blood Sugar (FBS)',
      'Comprehensive Lipid Profile',
      'Complete Blood Count (CBC)',
      'CPK-MB (Cardiac Muscle Isoenzyme)',
      'Serum Creatinine',
      'Electrolyte Panel (Sodium, Potassium, Chloride)',
      'Serum Homocysteine',
      'Lactate Dehydrogenase (LDH)',
      'NT-proBNP',
      'SGOT / AST',
      'SGPT / ALT',
      'High-Sensitivity CRP (hs-CRP)'
    ]
  },
  {
    id: 'pkg-12',
    code: '12',
    name: '12 Fitness Certificate Package',
    category: 'Fitness',
    mrp: 6999,
    finalPrice: 1999,
    savings: 5000,
    fastingRequired: true,
    fastingHours: 10,
    reportTimeHours: 12,
    testCountLabel: '75+',
    badgeTitle: 'NO. OF TESTS',
    description: 'Comprehensive health assessment for fitness certification, including blood investigations, sugar and thyroid screening, liver and kidney function, lipid profile, vision screening, and basic clinical measurements.',
    testsIncluded: [
      'Complete Blood Count (CBC)',
      'Fasting Blood Sugar (FBS)',
      'Urine Routine & Microscopy',
      'Blood Pressure & BMI Recording',
      'Snellen Chart Vision Screening',
      'Thyroid Profile (TSH)',
      'Liver Function Profile',
      'Renal Profile (Mini KFT)',
      'Serum Iron',
      'Glycated Hemoglobin (HbA1c)',
      'Vitamin D & Vitamin B12',
      'Rheumatoid Factor (RA Test)',
      'C-Reactive Protein (CRP)',
      'Lipid Profile Complete',
      'Doctor Physical Examination & Certificate Signature'
    ]
  }
];

export const CUSTOM_ADDONS: CustomAddon[] = [
  {
    id: 'addon-bone',
    name: 'Bone Profile',
    finalPrice: 2499,
    category: 'Custom Profiles',
    testsIncluded: ['Serum Calcium', 'Serum Phosphorus', 'Alkaline Phosphatase (ALP)', 'Vitamin D3 (25-OH)', 'Uric Acid']
  },
  {
    id: 'addon-vitamin',
    name: 'Vitamin Profile',
    finalPrice: 5500,
    category: 'Custom Profiles',
    testsIncluded: ['Vitamin D Total (25-OH)', 'Vitamin B12 Cyanocobalamin', 'Folic Acid / Folate', 'Serum Iron', 'Ferritin']
  },
  {
    id: 'addon-pcod-ext',
    name: 'PCOD Extended Profile',
    finalPrice: 7000,
    category: 'Custom Profiles',
    testsIncluded: ['Anti-Mullerian Hormone (AMH)', 'FSH', 'LH', 'Prolactin', 'Total Testosterone', 'DHEA-S', 'Fasting Insulin', 'TSH']
  },
  {
    id: 'addon-pcod-mini',
    name: 'PCOD Mini Profile',
    finalPrice: 1749,
    category: 'Custom Profiles',
    testsIncluded: ['LH (Luteinizing Hormone)', 'FSH (Follicle Stimulating Hormone)', 'Prolactin', 'TSH']
  },
  {
    id: 'addon-hairfall',
    name: 'Hair Fall Profile',
    finalPrice: 3700,
    category: 'Custom Profiles',
    testsIncluded: ['Complete Blood Count (CBC)', 'Serum Ferritin & Iron', 'Thyroid Profile (TSH)', 'Zinc Level', 'Vitamin D', 'Vitamin B12']
  }
];

export const COLLECTION_TIME_SLOTS = [
  '6:30 AM – 8:30 AM',
  '8:30 AM – 10:30 AM',
  '10:30 AM – 12:30 PM',
  '12:30 PM – 2:30 PM',
  '2:30 PM – 4:30 PM',
  '4:30 PM – 6:30 PM',
  '6:30 PM – 9:00 PM'
];

export const SERVICE_AREAS = [
  'Mumbai South (Colaba, Nariman Point, Marine Lines, Byculla)',
  'Mumbai Central (Dadar, Parel, Worli, Prabhadevi)',
  'Western Suburbs (Bandra, Andheri, Juhu, Goregaon, Borivali)',
  'Eastern Suburbs (Ghatkopar, Kurla, Chembur, Mulund, Bhandup)',
  'Navi Mumbai (Vashi, Nerul, Belapur, Kharghar, Panvel)',
  'Thane & Mira-Bhayandar'
];

export const CONTACT_INFO = {
  brand: 'J SQUARE LAB & DIAGNOSTIC CENTRE',
  tagline: 'Trusted Diagnostic Care for You & Your Family',
  websiteUrl: 'https://jsquarelabdiagnostic.com/',
  receptionPhone: '+91 86910 27116',
  receptionPhoneRaw: '+918691027116',
  receptionPhoneSecondary: '+91 75065 27116',
  receptionPhoneSecondaryRaw: '+917506527116',
  saeedaPhone: '+91 88501 72102',
  saeedaPhoneRaw: '+918850172102',
  whatsappPhone: '+91 86910 27116',
  whatsappPhoneRaw: '+918691027116',
  whatsappNumber: '8691027116',
  whatsappUrl: 'https://wa.me/918691027116',
  upiNumber: '8850172102',
  upiId: '8850172102@ybl',
  targetNotificationEmail: 'jsquaredignosticelab@gmail.com',
  email: 'jsquaredignosticelab@gmail.com',
  officialEmail: 'info.jsquarelab@gmail.com',
  location: 'Mumbai & Navi Mumbai',
  hours: '6:30 AM – 9:00 PM (All 7 Days)',
  doctor: 'Dr. Medicine Pathology – Patil Mohit Ashok',
  doctorShort: 'Dr. Patil Mohit Ashok, MD Pathology',
  technician: 'Saeeda (Chief Lab Technician)'
};

export const INDIVIDUAL_TESTS: IndividualTest[] = [
  {
    id: 'test-cbc',
    name: 'Complete Blood Count (CBC / Hemogram)',
    category: 'Hematology',
    price: 249,
    mrp: 450,
    sampleType: 'EDTA Whole Blood (2 ml)',
    reportTimeHours: 6,
    description: 'Measures Hb, TLC, RBC, Platelets, PCV, MCV, MCH, MCHC, Neutrophils, Lymphocytes & Differential Counts for anemia and infections.',
    parametersCount: 24,
    popular: true
  },
  {
    id: 'test-fbs',
    name: 'Fasting Blood Sugar (FBS)',
    category: 'Diabetes',
    price: 99,
    mrp: 180,
    sampleType: 'Fluoride Plasma',
    fastingHours: 10,
    reportTimeHours: 4,
    description: 'Standard plasma glucose screening following an overnight fast of 8–10 hours to diagnose diabetes and prediabetes.',
    parametersCount: 1,
    popular: true
  },
  {
    id: 'test-hba1c',
    name: 'HbA1c (Glycated Hemoglobin) + eAG',
    category: 'Diabetes',
    price: 399,
    mrp: 650,
    sampleType: 'EDTA Whole Blood',
    reportTimeHours: 6,
    description: 'Gold-standard HPLC test reflecting average 3-month blood glucose control and estimated average glucose (eAG).',
    parametersCount: 2,
    popular: true
  },
  {
    id: 'test-lipid',
    name: 'Lipid Profile Comprehensive',
    category: 'Cardiology',
    price: 499,
    mrp: 900,
    sampleType: 'Serum (Gold Top Gel)',
    fastingHours: 12,
    reportTimeHours: 6,
    description: 'Total Cholesterol, HDL, LDL, VLDL, Triglycerides, Total/HDL ratio and cardiovascular risk assessment.',
    parametersCount: 8,
    popular: true
  },
  {
    id: 'test-lft',
    name: 'Liver Function Test (LFT Complete)',
    category: 'Liver',
    price: 499,
    mrp: 950,
    sampleType: 'Serum',
    fastingHours: 8,
    reportTimeHours: 6,
    description: 'Bilirubin Total/Direct/Indirect, SGOT (AST), SGPT (ALT), Alkaline Phosphatase, Total Protein, Albumin, Globulin & A/G Ratio.',
    parametersCount: 11,
    popular: true
  },
  {
    id: 'test-kft',
    name: 'Kidney Function Test (KFT / RFT) + eGFR',
    category: 'Kidney',
    price: 499,
    mrp: 950,
    sampleType: 'Serum',
    fastingHours: 8,
    reportTimeHours: 6,
    description: 'Serum Creatinine, Blood Urea, BUN, Uric Acid, Calcium, Electrolytes & Glomerular Filtration Rate (eGFR).',
    parametersCount: 9,
    popular: true
  },
  {
    id: 'test-tsh',
    name: 'Thyroid Stimulating Hormone (TSH Ultrasensitive)',
    category: 'Thyroid',
    price: 199,
    mrp: 350,
    sampleType: 'Serum',
    reportTimeHours: 6,
    description: 'Highly sensitive chemiluminescence assay for primary screening of hypothyroidism and hyperthyroidism.',
    parametersCount: 1,
    popular: true
  },
  {
    id: 'test-vitd',
    name: 'Vitamin D3 (25-Hydroxy Cholecalciferol)',
    category: 'Vitamins',
    price: 699,
    mrp: 1500,
    sampleType: 'Serum (Light Protected)',
    reportTimeHours: 12,
    description: 'CLIA quantitative evaluation of 25-OH Vitamin D for bone density, chronic fatigue, muscle weakness, and immunity.',
    parametersCount: 1,
    popular: true
  },
  {
    id: 'test-vitb12',
    name: 'Vitamin B12 (Cyanocobalamin)',
    category: 'Vitamins',
    price: 599,
    mrp: 1200,
    sampleType: 'Serum',
    reportTimeHours: 12,
    description: 'Essential neurological and hematological vitamin assay for nerve health, memory, and megaloblastic anemia.',
    parametersCount: 1,
    popular: true
  },
  {
    id: 'test-crp',
    name: 'C-Reactive Protein (CRP Quantitative)',
    category: 'Immunity & Inflammation',
    price: 349,
    mrp: 600,
    sampleType: 'Serum',
    reportTimeHours: 6,
    description: 'High precision acute-phase reactant quantifying systemic inflammation, bacterial infection, and cardiovascular risk.',
    parametersCount: 1,
    popular: true
  },
  {
    id: 'test-urine',
    name: 'Urine Routine & Microscopic (R&M)',
    category: 'Routine',
    price: 149,
    mrp: 250,
    sampleType: 'Midstream Clean Catch Urine (30 ml)',
    reportTimeHours: 4,
    description: 'Physical, chemical (sugar, albumin, bile salts) and automated microscopic analysis for pus cells, RBCs, crystals, and bacteria.',
    parametersCount: 18,
    popular: true
  },
  {
    id: 'test-ferritin',
    name: 'Serum Ferritin (Iron Storage)',
    category: 'Hematology',
    price: 450,
    mrp: 850,
    sampleType: 'Serum',
    reportTimeHours: 8,
    description: 'Primary clinical indicator of iron deficiency, chronic anemia, hair fall, and inflammatory ferritin response.',
    parametersCount: 1
  },
  {
    id: 'test-uric-acid',
    name: 'Serum Uric Acid',
    category: 'Kidney',
    price: 180,
    mrp: 300,
    sampleType: 'Serum',
    reportTimeHours: 4,
    description: 'Crucial for evaluating joint pain, arthritis, gout crystals, and metabolic renal excretion.',
    parametersCount: 1
  },
  {
    id: 'test-calcium',
    name: 'Serum Calcium (Total)',
    category: 'Bone & Minerals',
    price: 180,
    mrp: 300,
    sampleType: 'Serum',
    reportTimeHours: 4,
    description: 'Assesses bone metabolism, parathyroid function, muscle cramps, and dental strength.',
    parametersCount: 1
  },
  {
    id: 'test-dengue',
    name: 'Dengue NS1 Antigen + IgM/IgG Duo',
    category: 'Fever & Infection',
    price: 699,
    mrp: 1200,
    sampleType: 'Serum',
    reportTimeHours: 4,
    description: 'Early 24-hr detection of Dengue viral infection with NS1 antigen and paired IgM/IgG immune response.',
    parametersCount: 3,
    popular: true
  },
  {
    id: 'test-widal',
    name: 'Widal Slide / Tube Agglutination (Typhoid)',
    category: 'Fever & Infection',
    price: 249,
    mrp: 400,
    sampleType: 'Serum',
    reportTimeHours: 4,
    description: 'Rapid agglutination screening for Salmonella Typhi (O & H) and Paratyphi antibodies during fever spikes.',
    parametersCount: 4
  },
  {
    id: 'test-psa',
    name: 'PSA Total (Prostate Specific Antigen)',
    category: 'Men & Oncology',
    price: 599,
    mrp: 1100,
    sampleType: 'Serum',
    reportTimeHours: 8,
    description: 'Preventive tumor biomarker for prostate enlargement, benign prostatic hyperplasia (BPH), and prostate screening in men 40+.',
    parametersCount: 1
  },
  {
    id: 'test-beta-hcg',
    name: 'Beta HCG Quantitative (Pregnancy Confirmation)',
    category: 'Women & Maternity',
    price: 499,
    mrp: 900,
    sampleType: 'Serum',
    reportTimeHours: 6,
    description: 'High-accuracy quantitative serum test for early pregnancy confirmation, gestational tracking, and ectopic pregnancy evaluation.',
    parametersCount: 1
  }
];

export const LAB_BRANCHES: LabBranch[] = [
  {
    id: 'branch-vashi',
    name: 'Vashi Central Reference Laboratory',
    type: 'Main Reference Lab',
    address: 'Shop No. 12 & 14, Ground Floor, Sea Breeze Commercial Complex, Sector 17, Vashi (Near Shivaji Chowk)',
    area: 'Sector 17, Vashi',
    city: 'Navi Mumbai',
    pincode: '400703',
    timings: '6:30 AM – 9:00 PM (All 7 Days)',
    phone: '+91 86910 27116',
    phoneRaw: '+918691027116',
    googleMapsUrl: 'https://maps.google.com/?q=Sector+17+Vashi+Navi+Mumbai',
    features: ['Main Automated Laboratory', '2D Echo & ECG Suite', 'Doctor Consultation', 'Express 4-Hour Counter']
  },
  {
    id: 'branch-nerul',
    name: 'Nerul West Diagnostic & Collection Centre',
    type: 'Diagnostic & Collection Hub',
    address: 'Plot 48, Shop 3, Sector 21, Nerul West (Opp. Railway Station Western Exit)',
    area: 'Sector 21, Nerul',
    city: 'Navi Mumbai',
    pincode: '400706',
    timings: '6:30 AM – 8:30 PM (Mon–Sun)',
    phone: '+91 75065 27116',
    phoneRaw: '+917506527116',
    googleMapsUrl: 'https://maps.google.com/?q=Sector+21+Nerul+Navi+Mumbai',
    features: ['Cold-Chain Phlebotomy', 'Pediatric Blood Draws', 'Elderly Wheelchair Ramp']
  },
  {
    id: 'branch-belapur',
    name: 'CBD Belapur Branch',
    type: 'Diagnostic & Collection Hub',
    address: 'Shop 7, Sai Arcade, Sector 11, CBD Belapur (Near Belapur Court & Station)',
    area: 'Sector 11, CBD Belapur',
    city: 'Navi Mumbai',
    pincode: '400614',
    timings: '7:00 AM – 8:00 PM (Mon–Sun)',
    phone: '+91 88501 72102',
    phoneRaw: '+918850172102',
    googleMapsUrl: 'https://maps.google.com/?q=CBD+Belapur+Sector+11+Navi+Mumbai',
    features: ['Corporate Fitness Exams', 'Digital ECG', 'Fasting Tea & Biscuits Lounge']
  },
  {
    id: 'branch-dadar',
    name: 'Dadar Central Collection Centre',
    type: 'Diagnostic & Collection Hub',
    address: 'Ground Floor, Pearl Mansion, Gokhale Road North, Dadar West (Near Portuguese Church)',
    area: 'Dadar West',
    city: 'Mumbai',
    pincode: '400028',
    timings: '6:30 AM – 8:30 PM (All 7 Days)',
    phone: '+91 86910 27116',
    phoneRaw: '+918691027116',
    googleMapsUrl: 'https://maps.google.com/?q=Portuguese+Church+Dadar+West+Mumbai',
    features: ['Express Courier to Central Lab', 'Senior Priority Desk', 'Home Collection Base']
  },
  {
    id: 'branch-andheri',
    name: 'Andheri West Diagnostic Centre',
    type: 'Diagnostic & Collection Hub',
    address: 'Shop 4, Crystal Plaza Link, Off New Link Road, Andheri West (Near Azad Nagar Metro)',
    area: 'Andheri West',
    city: 'Mumbai',
    pincode: '400053',
    timings: '6:30 AM – 8:30 PM (All 7 Days)',
    phone: '+91 75065 27116',
    phoneRaw: '+917506527116',
    googleMapsUrl: 'https://maps.google.com/?q=Azad+Nagar+Metro+Andheri+West+Mumbai',
    features: ['Western Suburbs Phlebotomy Hub', 'Pre-Marital Screenings', 'PCOD Specialized Tests']
  },
  {
    id: 'branch-ghatkopar',
    name: 'Ghatkopar East & Central Hub',
    type: 'Diagnostic & Collection Hub',
    address: 'Shop 2, Shreeji Chambers, Tilak Road, Ghatkopar East (Near Station)',
    area: 'Ghatkopar East',
    city: 'Mumbai',
    pincode: '400077',
    timings: '7:00 AM – 8:00 PM (All 7 Days)',
    phone: '+91 88501 72102',
    phoneRaw: '+918850172102',
    googleMapsUrl: 'https://maps.google.com/?q=Tilak+Road+Ghatkopar+East+Mumbai',
    features: ['Eastern Suburbs Network', 'Home Collection Dispatch', 'Instant WhatsApp Reports']
  }
];

export const PATIENT_REVIEWS: PatientReview[] = [
  {
    id: 'rev-01',
    name: 'Mrs. Sunita Deshmukh',
    location: 'Vashi, Sector 14',
    rating: 5,
    comment: 'The phlebotomist arrived right at 7:15 AM as booked. He wore sterile gloves, opened new sealed vacutainers right before me, and my elderly mother didn’t feel any pain at all. Doctor-signed report was on WhatsApp by 3:00 PM!',
    date: '2 days ago',
    verified: true,
    packageOrTest: '03 Senior Citizens Profile'
  },
  {
    id: 'rev-02',
    name: 'Rajesh K. Mehta',
    location: 'Dadar West, Mumbai',
    rating: 5,
    comment: 'Booked the Regular Health Profile for ₹999. Remarkable value! 80+ parameters including HbA1c, full lipid, liver, and kidneys. Dr. Patil Mohit Ashok was even kind enough to clarify my slightly elevated cholesterol over a quick call.',
    date: '1 week ago',
    verified: true,
    packageOrTest: '01 Regular Health Profile'
  },
  {
    id: 'rev-03',
    name: 'Priyanka Verma',
    location: 'Andheri West, Mumbai',
    rating: 5,
    comment: 'Needed urgent pregnancy antenatal panel with blood group and thyroid. Other labs quoted ₹4,000+. J Square Lab completed the entire battery at ₹1,599 with free home visit. Genuine, caring staff and accurate reports.',
    date: '2 weeks ago',
    verified: true,
    packageOrTest: '05 Pregnancy / Antenatal Profile'
  },
  {
    id: 'rev-04',
    name: 'Amitabh Sen',
    location: 'Kharghar, Navi Mumbai',
    rating: 5,
    comment: 'Ordered Full Body + CRP. Very impressed by their cold-chain vacuum transport box with temperature monitor. You can immediately tell they maintain high medical standards. 10/10 recommend!',
    date: '3 weeks ago',
    verified: true,
    packageOrTest: '02 Full Body + CRP'
  }
];

export const DIAGNOSTIC_FAQS = [
  {
    question: 'How do I prepare for fasting blood tests (Sugar / Lipid Profile)?',
    answer: 'For fasting blood tests such as Fasting Blood Sugar (FBS), Lipid Profile, or Full Body Health checkups, an overnight fast of 10 to 12 hours is recommended. You may drink plain water to stay hydrated. Avoid tea, coffee, milk, breakfast, or smoking before the morning sample is drawn.'
  },
  {
    question: 'Is doorstep home sample collection truly 100% free?',
    answer: 'Yes! Doorstep home collection is completely FREE with zero convenience charges across Mumbai, Navi Mumbai, and Thane for all health packages and bookings. Our certified phlebotomist arrives at your preferred morning or evening time slot.'
  },
  {
    question: 'How and when will I receive my diagnostic lab reports?',
    answer: 'Routine blood tests and standard health packages are reported within 6 to 12 hours on the same day. As soon as Consultant Pathologist Dr. Patil Mohit Ashok signs and authorizes your report, you will receive an instant PDF via WhatsApp and Email, and you can also download it directly on this website using your Booking ID or Mobile Number.'
  },
  {
    question: 'Are J Square Lab reports accepted by hospitals and consulting doctors?',
    answer: 'Absolutely. All tests at J Square Lab are analyzed on calibrated, high-precision automated systems (Roche, Sysmex, Beckman) following strict quality control. Reports are verified and signed by MD Pathologist Dr. Patil Mohit Ashok and are 100% recognized by physicians, specialists, and hospitals nationwide.'
  },
  {
    question: 'Can I book a test by just uploading my doctor’s prescription?',
    answer: 'Yes! If you have a doctor’s prescription and are unsure which specific packages or tests are needed, simply use our "Doctor Prescription" feature or WhatsApp us. Our senior lab executive will review the prescription and schedule your sample collection within 15 minutes.'
  },
  {
    question: 'What safety and hygiene precautions are followed during home collection?',
    answer: 'Our phlebotomists follow hospital-grade infection control: sterile disposable gloves, single-use vacuum BD vacutainer needles opened directly in front of the patient, alcohol swab disinfection, barcoded labels on sample tubes, and cold-chain gel pack transport boxes.'
  }
];
