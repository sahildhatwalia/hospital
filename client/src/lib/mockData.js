export const INITIAL_DEMO_USERS = {
  doctor: {
    id: 'd1',
    name: 'Dr. John Smith',
    role: 'DOCTOR',
    email: 'dr.smith@easpataal.com',
    department: 'Cardiology',
    avatar: 'JS',
    accentColor: '#2563EB',
  },
  admin: {
    id: 'a1',
    name: 'Sarah Jenkins',
    role: 'ADMIN',
    email: 'admin.sarah@easpataal.com',
    department: 'Hospital Operations',
    avatar: 'SJ',
    accentColor: '#9333EA',
  },
  receptionist: {
    id: 'r1',
    name: 'Michael Chang',
    role: 'RECEPTIONIST',
    email: 'frontdesk.m@easpataal.com',
    department: 'Front Desk & Admissions',
    avatar: 'MC',
    accentColor: '#0D9488',
  },
  pharmacist: {
    id: 'p1',
    name: 'Priya Sharma',
    role: 'PHARMACIST',
    email: 'pharmacy.priya@easpataal.com',
    department: 'Central Pharmacy',
    avatar: 'PS',
    accentColor: '#F59E0B',
  },
};

export const INITIAL_PATIENTS = [
  {
    id: 'P-1001',
    name: 'Eleanor Vance',
    age: 34,
    gender: 'Female',
    bloodGroup: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    contact: '+1 (555) 234-5678',
    emergencyContact: 'Thomas Vance (Spouse) - +1 (555) 987-6543',
    lastVisit: '2026-08-18',
    status: 'Critical', // Critical, Admitted, Discharged, Waiting
    condition: 'Acute Cardiac Arrhythmia',
    doctor: 'Dr. John Smith',
    roomNo: 'ICU-B04',
    vitals: {
      bp: '142/92',
      bpTrend: 'up',
      heartRate: '108 bpm',
      hrTrend: 'up',
      temp: '99.1 °F',
      tempTrend: 'stable',
      spO2: '94%',
      spO2Trend: 'down',
    },
    visitHistory: [
      { id: 'v1', date: '2026-08-18', diagnosis: 'Arrhythmia flare-up', doctor: 'Dr. John Smith', department: 'Cardiology', notes: 'Admitted for telemetry monitoring.' },
      { id: 'v2', date: '2026-05-12', diagnosis: 'Mild Hypertension Routine Checkup', doctor: 'Dr. John Smith', department: 'Cardiology', notes: 'Prescription adjusted.' }
    ],
    prescriptions: [
      { id: 'RX-901', date: '2026-08-18', medicines: [{ name: 'Metoprolol Tartrate', dosage: '50mg', frequency: 'Twice daily', duration: '14 days' }], status: 'Dispensed' }
    ]
  },
  {
    id: 'P-1002',
    name: 'Marcus Brody',
    age: 58,
    gender: 'Male',
    bloodGroup: 'A+',
    allergies: ['Sulfa Drugs'],
    contact: '+1 (555) 345-6789',
    emergencyContact: 'Linda Brody (Wife) - +1 (555) 876-5432',
    lastVisit: '2026-08-19',
    status: 'Admitted',
    condition: 'Post-Op Knee Replacement',
    doctor: 'Dr. John Smith',
    roomNo: 'Ward 302',
    vitals: {
      bp: '124/80',
      bpTrend: 'stable',
      heartRate: '72 bpm',
      hrTrend: 'stable',
      temp: '98.6 °F',
      tempTrend: 'stable',
      spO2: '98%',
      spO2Trend: 'stable',
    },
    visitHistory: [
      { id: 'v3', date: '2026-08-19', diagnosis: 'Post-operative Recovery', doctor: 'Dr. John Smith', department: 'Orthopedics', notes: 'Physiotherapy initiated.' }
    ],
    prescriptions: [
      { id: 'RX-902', date: '2026-08-19', medicines: [{ name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days' }, { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed for pain', duration: '5 days' }], status: 'Pending' }
    ]
  },
  {
    id: 'P-1003',
    name: 'Sophia Martinez',
    age: 26,
    gender: 'Female',
    bloodGroup: 'B-',
    allergies: ['None'],
    contact: '+1 (555) 456-7890',
    emergencyContact: 'Carlos Martinez (Father) - +1 (555) 765-4321',
    lastVisit: '2026-08-19',
    status: 'Waiting',
    condition: 'Persistent Migraine & Nausea',
    doctor: 'Dr. John Smith',
    roomNo: 'OPD Desk 2',
    vitals: {
      bp: '118/76',
      bpTrend: 'stable',
      heartRate: '68 bpm',
      hrTrend: 'down',
      temp: '98.4 °F',
      tempTrend: 'stable',
      spO2: '99%',
      spO2Trend: 'stable',
    },
    visitHistory: [
      { id: 'v4', date: '2026-08-19', diagnosis: 'Consultation pending', doctor: 'Dr. John Smith', department: 'Neurology', notes: 'Awaiting doctor review in OPD queue.' }
    ],
    prescriptions: []
  },
  {
    id: 'P-1004',
    name: 'David Kim',
    age: 45,
    gender: 'Male',
    bloodGroup: 'AB+',
    allergies: ['Aspirin'],
    contact: '+1 (555) 567-8901',
    emergencyContact: 'Hannah Kim (Sister) - +1 (555) 654-3210',
    lastVisit: '2026-08-15',
    status: 'Discharged',
    condition: 'Bronchitis - Fully Recovered',
    doctor: 'Dr. John Smith',
    roomNo: 'Outpatient',
    vitals: {
      bp: '120/78',
      bpTrend: 'stable',
      heartRate: '70 bpm',
      hrTrend: 'stable',
      temp: '98.6 °F',
      tempTrend: 'stable',
      spO2: '99%',
      spO2Trend: 'up',
    },
    visitHistory: [
      { id: 'v5', date: '2026-08-15', diagnosis: 'Bronchitis Discharge Evaluation', doctor: 'Dr. John Smith', department: 'Pulmonology', notes: 'Discharged with inhaler prescription.' }
    ],
    prescriptions: [
      { id: 'RX-880', date: '2026-08-15', medicines: [{ name: 'Albuterol Inhaler', dosage: '2 puffs', frequency: 'Every 6 hours', duration: '10 days' }], status: 'Dispensed' }
    ]
  },
  {
    id: 'P-1005',
    name: 'Amina Al-Mansoor',
    age: 62,
    gender: 'Female',
    bloodGroup: 'O-',
    allergies: ['Latex'],
    contact: '+1 (555) 678-9012',
    emergencyContact: 'Tariq Al-Mansoor (Son) - +1 (555) 543-2109',
    lastVisit: '2026-08-19',
    status: 'Admitted',
    condition: 'Type 2 Diabetes Glycemic Control',
    doctor: 'Dr. John Smith',
    roomNo: 'Ward 210',
    vitals: {
      bp: '135/85',
      bpTrend: 'up',
      heartRate: '76 bpm',
      hrTrend: 'stable',
      temp: '98.7 °F',
      tempTrend: 'stable',
      spO2: '97%',
      spO2Trend: 'stable',
    },
    visitHistory: [
      { id: 'v6', date: '2026-08-19', diagnosis: 'Hyperglycemia monitoring', doctor: 'Dr. John Smith', department: 'Endocrinology', notes: 'Insulin sliding scale started.' }
    ],
    prescriptions: [
      { id: 'RX-905', date: '2026-08-19', medicines: [{ name: 'Insulin Glargine', dosage: '15 units', frequency: 'At bedtime', duration: 'Ongoing' }], status: 'Pending' }
    ]
  }
];

export const INITIAL_QUEUE = [
  {
    id: 'Q-101',
    tokenNumber: 101,
    patientId: 'P-1003',
    patientName: 'Sophia Martinez',
    age: 26,
    gender: 'Female',
    waitTime: '12 mins',
    arrivalTime: '09:15 AM',
    reason: 'Migraine & Nausea',
    status: 'Waiting', // Waiting, In Progress, Completed
    doctorName: 'Dr. John Smith'
  },
  {
    id: 'Q-102',
    tokenNumber: 102,
    patientId: 'P-1002',
    patientName: 'Marcus Brody',
    age: 58,
    gender: 'Male',
    waitTime: '25 mins',
    arrivalTime: '09:02 AM',
    reason: 'Post-Op Knee Checkup',
    status: 'In Progress',
    doctorName: 'Dr. John Smith'
  },
  {
    id: 'Q-103',
    tokenNumber: 103,
    patientId: 'P-1006',
    patientName: 'Robert Vance',
    age: 49,
    gender: 'Male',
    waitTime: '35 mins',
    arrivalTime: '08:50 AM',
    reason: 'Hypertension Followup',
    status: 'Waiting',
    doctorName: 'Dr. John Smith'
  },
  {
    id: 'Q-104',
    tokenNumber: 104,
    patientId: 'P-1007',
    patientName: 'Clara Oswald',
    age: 29,
    gender: 'Female',
    waitTime: '0 mins',
    arrivalTime: '08:30 AM',
    reason: 'Routine ECG Review',
    status: 'Completed',
    doctorName: 'Dr. John Smith'
  }
];

export const INITIAL_PRESCRIPTIONS = [
  {
    id: 'RX-902',
    patientId: 'P-1002',
    patientName: 'Marcus Brody',
    age: 58,
    doctorName: 'Dr. John Smith',
    date: '2026-08-19',
    diagnosis: 'Post-operative wound healing & discomfort',
    advice: 'Elevate knee while resting. Avoid heavy lifting for 2 weeks.',
    medicines: [
      { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days', notes: 'Take after food' },
      { name: 'Ibuprofen', dosage: '400mg', frequency: 'Twice daily', duration: '5 days', notes: 'As needed for inflammation' }
    ],
    status: 'Pending' // Pending, Dispensed
  },
  {
    id: 'RX-905',
    patientId: 'P-1005',
    patientName: 'Amina Al-Mansoor',
    age: 62,
    doctorName: 'Dr. John Smith',
    date: '2026-08-19',
    diagnosis: 'Type 2 Diabetes Glycemic Control',
    advice: 'Follow diabetic meal plan carefully. Log blood sugar levels 4x daily.',
    medicines: [
      { name: 'Insulin Glargine', dosage: '15 units', frequency: 'At bedtime', duration: '30 days', notes: 'Inject subcutaneously' },
      { name: 'Metformin', dosage: '850mg', frequency: 'Twice daily with meals', duration: '30 days', notes: 'Do not skip meals' }
    ],
    status: 'Pending'
  },
  {
    id: 'RX-901',
    patientId: 'P-1001',
    patientName: 'Eleanor Vance',
    age: 34,
    doctorName: 'Dr. John Smith',
    date: '2026-08-18',
    diagnosis: 'Acute Cardiac Arrhythmia',
    advice: 'Restrict caffeine and sodium intake.',
    medicines: [
      { name: 'Metoprolol Tartrate', dosage: '50mg', frequency: 'Twice daily', duration: '14 days', notes: 'Monitor pulse rate' }
    ],
    status: 'Dispensed'
  }
];

export const INITIAL_INVENTORY = [
  { id: 'INV-101', drugName: 'Amoxicillin 500mg', category: 'Antibiotics', stock: 450, minLevel: 100, unit: 'Tablets', status: 'Optimal' },
  { id: 'INV-102', drugName: 'Ibuprofen 400mg', category: 'Analgesics', stock: 85, minLevel: 150, unit: 'Tablets', status: 'Low Stock' },
  { id: 'INV-103', drugName: 'Metoprolol 50mg', category: 'Cardiovascular', stock: 240, minLevel: 80, unit: 'Tablets', status: 'Optimal' },
  { id: 'INV-104', drugName: 'Insulin Glargine 100U', category: 'Endocrinology', stock: 12, minLevel: 30, unit: 'Vials', status: 'Low Stock' },
  { id: 'INV-105', drugName: 'Albuterol Inhaler 90mcg', category: 'Respiratory', stock: 0, minLevel: 25, unit: 'Canisters', status: 'Out of Stock' },
  { id: 'INV-106', drugName: 'Paracetamol 650mg', category: 'Analgesics', stock: 1200, minLevel: 200, unit: 'Tablets', status: 'Optimal' },
  { id: 'INV-107', drugName: 'Omeprazole 20mg', category: 'Gastroenterology', stock: 68, minLevel: 100, unit: 'Capsules', status: 'Low Stock' }
];

export const INITIAL_STAFF = [
  { id: 'ST-01', name: 'Dr. John Smith', role: 'Doctor', department: 'Cardiology', email: 'dr.smith@easpataal.com', phone: '+1 (555) 111-2222', status: 'Active', shifts: 'Morning (8 AM - 4 PM)' },
  { id: 'ST-02', name: 'Sarah Jenkins', role: 'Admin', department: 'Hospital Operations', email: 'admin.sarah@easpataal.com', phone: '+1 (555) 222-3333', status: 'Active', shifts: 'Full-time' },
  { id: 'ST-03', name: 'Michael Chang', role: 'Receptionist', department: 'Front Desk', email: 'frontdesk.m@easpataal.com', phone: '+1 (555) 333-4444', status: 'Active', shifts: 'Morning (7 AM - 3 PM)' },
  { id: 'ST-04', name: 'Priya Sharma', role: 'Pharmacist', department: 'Pharmacy', email: 'pharmacy.priya@easpataal.com', phone: '+1 (555) 444-5555', status: 'Active', shifts: 'Day (9 AM - 5 PM)' },
  { id: 'ST-05', name: 'Dr. Amanda Chen', role: 'Doctor', department: 'Neurology', email: 'dr.chen@easpataal.com', phone: '+1 (555) 555-6666', status: 'On Leave', shifts: 'Evening (2 PM - 10 PM)' },
  { id: 'ST-06', name: 'David Miller', role: 'Receptionist', department: 'Emergency Admissions', email: 'd.miller@easpataal.com', phone: '+1 (555) 666-7777', status: 'Active', shifts: 'Night (11 PM - 7 AM)' }
];

export const INITIAL_NOTIFICATIONS = [
  { id: 'n1', title: 'Low Stock Warning', message: 'Albuterol Inhaler is OUT OF STOCK. Reorder immediately.', time: '10 mins ago', type: 'critical', unread: true },
  { id: 'n2', title: 'Critical Vitals Alert', message: 'Eleanor Vance (P-1001) SpO2 dropped to 94% in ICU-B04.', time: '25 mins ago', type: 'warning', unread: true },
  { id: 'n3', title: 'Pharmacy Update', message: 'Prescription RX-901 dispensed by Priya Sharma.', time: '1 hour ago', type: 'info', unread: false }
];

export const WEEKLY_PATIENT_DATA = [
  { day: 'Mon', Inpatients: 32, Outpatients: 68, Emergency: 14 },
  { day: 'Tue', Inpatients: 40, Outpatients: 82, Emergency: 19 },
  { day: 'Wed', Inpatients: 45, Outpatients: 94, Emergency: 22 },
  { day: 'Thu', Inpatients: 38, Outpatients: 76, Emergency: 15 },
  { day: 'Fri', Inpatients: 52, Outpatients: 110, Emergency: 28 },
  { day: 'Sat', Inpatients: 29, Outpatients: 54, Emergency: 18 },
  { day: 'Sun', Inpatients: 25, Outpatients: 42, Emergency: 12 },
];

export const DEPARTMENT_STATS = [
  { name: 'Cardiology', count: 42, color: '#2563EB' },
  { name: 'Neurology', count: 28, color: '#9333EA' },
  { name: 'Orthopedics', count: 35, color: '#0D9488' },
  { name: 'Pediatrics', count: 24, color: '#F59E0B' },
  { name: 'Emergency', count: 50, color: '#DC2626' },
];
