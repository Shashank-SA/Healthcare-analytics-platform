import { Patient, Doctor, ClinicalVisit, DiagnosisData, MedicationData, VaccinationData, LabReport, SavedReport, ReportHistoryItem } from '../types';

export const mockPatients: Patient[] = [
  {
    id: 'pat-1',
    mrn: 'ZZ26000041',
    name: 'Meghana P',
    dob: 'Jul 9, 2026',
    age: 0,
    gender: 'female',
    phone: '+917411427947',
    email: 'meghana@zophysolutions.com',
    address: 'Bengaluru, Karnataka',
    registrationDate: '2026-07-09',
  },
  {
    id: 'pat-2',
    mrn: 'ZZ26000037',
    name: 'Praveen M',
    dob: 'Jul 6, 2026',
    age: 0,
    gender: 'male',
    phone: '+917411427947',
    email: 'praveen.m@zophysolutions.com',
    address: 'Bengaluru, Karnataka',
    registrationDate: '2026-07-06',
  },
  {
    id: 'pat-3',
    mrn: 'ZZ26000012',
    name: 'Adarsh Y',
    dob: 'Aug 14, 2000',
    age: 26,
    gender: 'male',
    phone: '+919886012345',
    email: 'adarsh.y@gmail.com',
    address: 'Indiranagar, Bengaluru',
    registrationDate: '2026-06-12',
  },
  {
    id: 'pat-4',
    mrn: 'ZZ26000085',
    name: 'Ananya Sharma',
    dob: 'Mar 24, 1985',
    age: 41,
    gender: 'female',
    phone: '+919900223344',
    email: 'ananya.sharma@hotmail.com',
    address: 'Koramangala, Bengaluru',
    registrationDate: '2026-01-15',
  },
  {
    id: 'pat-5',
    mrn: 'ZZ26000099',
    name: 'Ramachandra Rao',
    dob: 'May 10, 1958',
    age: 68,
    gender: 'male',
    phone: '+919448098765',
    email: 'ramachandra.rao@outlook.com',
    address: 'Jayanagar, Bengaluru',
    registrationDate: '2026-03-22',
  },
  {
    id: 'pat-6',
    mrn: 'ZZ26000102',
    name: 'Shreya Iyer',
    dob: 'Sep 12, 1993',
    age: 32,
    gender: 'female',
    phone: '+919731155667',
    email: 'shreya.iyer@gmail.com',
    address: 'Whitefield, Bengaluru',
    registrationDate: '2026-04-10',
  },
  {
    id: 'pat-7',
    mrn: 'ZZ26000143',
    name: 'Vikram Singh',
    dob: 'Nov 05, 1978',
    age: 47,
    gender: 'male',
    phone: '+918050123456',
    email: 'vikram.singh@yahoo.com',
    address: 'HSR Layout, Bengaluru',
    registrationDate: '2026-05-18',
  }
];

export const mockDoctors: Doctor[] = [
  { id: 'doc-1', name: 'Dr. Abhinav Kumar', specialty: 'General Practice / Internal Medicine', activeVisits: 14 },
  { id: 'doc-2', name: 'Dr. Shalini Hegde', specialty: 'Pediatrics', activeVisits: 18 },
  { id: 'doc-3', name: 'Dr. Rajesh Gowda', specialty: 'Cardiology', activeVisits: 8 },
  { id: 'doc-4', name: 'Dr. Priya Naidu', specialty: 'Dermatology', activeVisits: 12 }
];

export const mockClinicalVisits: ClinicalVisit[] = [
  {
    id: 'VIS-2026-001',
    patientId: 'pat-1',
    patientName: 'Meghana P',
    patientAge: 0,
    patientGender: 'female',
    doctorId: 'doc-2',
    doctorName: 'Dr. Shalini Hegde',
    date: '2026-07-13',
    time: '16:45',
    status: 'Missed',
    type: 'Out Patient',
    reason: 'Newborn Wellness Follow-up',
    vitals: { bp: '0/0', hr: 0, temp: '98.4°F', rr: 0, spo2: 0 },
    diagnoses: ['Z01.89 | Encounter for other specified special examinations'],
    medications: [],
    notes: 'Patient did not arrive for the scheduled newborn progress examination.'
  },
  {
    id: 'VIS-2026-002',
    patientId: 'pat-2',
    patientName: 'Praveen M',
    patientAge: 0,
    patientGender: 'male',
    doctorId: 'doc-2',
    doctorName: 'Dr. Shalini Hegde',
    date: '2026-07-13',
    time: '15:30',
    status: 'Missed',
    type: 'Out Patient',
    reason: 'Immunization Check',
    vitals: { bp: '0/0', hr: 0, temp: '98.2°F', rr: 0, spo2: 0 },
    diagnoses: ['Z01.89 | Encounter for other specified special examinations'],
    medications: [],
    notes: 'Scheduled for BCG and Hepatitis B vaccine review. Missed appointment.'
  },
  {
    id: 'VIS-2026-003',
    patientId: 'pat-3',
    patientName: 'Adarsh Y',
    patientAge: 26,
    patientGender: 'male',
    doctorId: 'doc-1',
    doctorName: 'Dr. Abhinav Kumar',
    date: '2026-07-13',
    time: '14:15',
    status: 'Completed',
    type: 'Out Patient',
    reason: 'Progress Monitoring',
    vitals: { bp: '122/82', hr: 74, temp: '98.4°F', rr: 15, spo2: 100 },
    diagnoses: ['Z01.89 | Encounter for other specified special examinations'],
    medications: ['Cetirizine 10mg'],
    notes: 'Seeded General (Copy) followup visit history demonstrating generic data propagation.'
  },
  {
    id: 'VIS-2026-004',
    patientId: 'pat-4',
    patientName: 'Ananya Sharma',
    patientAge: 41,
    patientGender: 'female',
    doctorId: 'doc-1',
    doctorName: 'Dr. Abhinav Kumar',
    date: '2026-07-12',
    time: '11:00',
    status: 'Completed',
    type: 'Out Patient',
    reason: 'Acute Pharyngitis & Cough',
    vitals: { bp: '118/76', hr: 82, temp: '100.2°F', rr: 18, spo2: 98 },
    diagnoses: ['J02.9 | Acute Pharyngitis', 'R50.9 | Fever, Unspecified'],
    medications: ['Amoxicillin 500mg', 'Paracetamol 500mg'],
    notes: 'Patient presented with severe sore throat, difficulty swallowing, and low-grade fever. Pharynx is erythematous. Advised warm saline gargles and rest.'
  },
  {
    id: 'VIS-2026-005',
    patientId: 'pat-5',
    patientName: 'Ramachandra Rao',
    patientAge: 68,
    patientGender: 'male',
    doctorId: 'doc-3',
    doctorName: 'Dr. Rajesh Gowda',
    date: '2026-07-10',
    time: '09:30',
    status: 'Completed',
    type: 'Out Patient',
    reason: 'Hypertension Follow-up',
    vitals: { bp: '142/90', hr: 68, temp: '97.9°F', rr: 16, spo2: 96 },
    diagnoses: ['I10 | Essential (primary) hypertension'],
    medications: ['Lisinopril 10mg', 'Atorvastatin 20mg'],
    notes: 'Blood pressure remains slightly elevated. Patient compliant with daily exercise. Increased Lisinopril to 20mg and scheduled lipid panel.'
  },
  {
    id: 'VIS-2026-006',
    patientId: 'pat-6',
    patientName: 'Shreya Iyer',
    patientAge: 32,
    patientGender: 'female',
    doctorId: 'doc-4',
    doctorName: 'Dr. Priya Naidu',
    date: '2026-07-08',
    time: '14:00',
    status: 'Completed',
    type: 'Out Patient',
    reason: 'Allergic Dermatitis Flareup',
    vitals: { bp: '110/70', hr: 72, temp: '98.1°F', rr: 14, spo2: 99 },
    diagnoses: ['L30.9 | Dermatitis, Unspecified'],
    medications: ['Cetirizine 10mg', 'Hydrocortisone 1% Cream'],
    notes: 'Erythematous pruritic lesions on both forearms after gardening. Avoid environmental allergens. Apply topical steroid twice daily.'
  },
  {
    id: 'VIS-2026-007',
    patientId: 'pat-7',
    patientName: 'Vikram Singh',
    patientAge: 47,
    patientGender: 'male',
    doctorId: 'doc-1',
    doctorName: 'Dr. Abhinav Kumar',
    date: '2026-07-05',
    time: '10:30',
    status: 'Completed',
    type: 'Out Patient',
    reason: 'Acute Bronchitis',
    vitals: { bp: '128/84', hr: 80, temp: '99.5°F', rr: 20, spo2: 95 },
    diagnoses: ['J20.9 | Acute Bronchitis'],
    medications: ['Azithromycin 250mg', 'Ibuprofen 400mg'],
    notes: 'Productive cough for 5 days with chest tightness. Scattered wheezing on auscultation. Advised hydration and bronchodilator inhaler as needed.'
  }
];

export const mockDiagnoses: DiagnosisData[] = [
  { code: 'Z01.89', description: 'Encounter for other specified special examinations', count: 124, category: 'Wellness' },
  { code: 'J02.9', description: 'Acute Pharyngitis (Sore Throat)', count: 85, category: 'Respiratory' },
  { code: 'I10', description: 'Essential (primary) hypertension', count: 98, category: 'Cardiovascular' },
  { code: 'L30.9', description: 'Dermatitis, Unspecified (Skin Allergy)', count: 54, category: 'Dermatology' },
  { code: 'J20.9', description: 'Acute Bronchitis', count: 42, category: 'Respiratory' },
  { code: 'E11.9', description: 'Type 2 Diabetes Mellitus without complications', count: 72, category: 'Endocrine' }
];

export const mockMedications: MedicationData[] = [
  { name: 'Cetirizine 10mg', dosage: '10mg', frequency: 'Once daily at bedtime', patientCount: 54, trend: 'stable' },
  { name: 'Amoxicillin 500mg', dosage: '500mg', frequency: 'Three times daily', patientCount: 42, trend: 'up' },
  { name: 'Paracetamol 500mg', dosage: '500mg', frequency: 'Every 6 hours as needed', patientCount: 112, trend: 'up' },
  { name: 'Lisinopril 10mg', dosage: '10mg', frequency: 'Once daily in the morning', patientCount: 88, trend: 'stable' },
  { name: 'Atorvastatin 20mg', dosage: '20mg', frequency: 'Once daily at night', patientCount: 76, trend: 'down' },
  { name: 'Metformin 500mg', dosage: '500mg', frequency: 'Twice daily with meals', patientCount: 65, trend: 'up' }
];

export const mockVaccinations: VaccinationData[] = [
  { name: 'BCG', dose: 'Dose 1 — At birth', dueDate: 'Jul 9, 2026', status: 'Overdue', patientName: 'Meghana P', mrn: 'ZZ26000041' },
  { name: 'Hepatitis B (HepB)', dose: 'Dose 1 — At birth', dueDate: 'Jul 9, 2026', status: 'Overdue', patientName: 'Meghana P', mrn: 'ZZ26000041' },
  { name: 'BCG', dose: 'Dose 1 — At birth', dueDate: 'Jul 6, 2026', status: 'Overdue', patientName: 'Praveen M', mrn: 'ZZ26000037' },
  { name: 'Rotavirus (RV)', dose: 'Dose 1', dueDate: 'Aug 20, 2026', status: 'Upcoming', patientName: 'Meghana P', mrn: 'ZZ26000041' },
  { name: 'DPT-HepB-Hib 1', dose: 'Pentavalent 1', dueDate: 'Aug 20, 2026', status: 'Due Soon', patientName: 'Praveen M', mrn: 'ZZ26000037' }
];

export const mockLabReports: LabReport[] = [
  { id: 'LAB-101', patientName: 'Ramachandra Rao', mrn: 'ZZ26000099', testName: 'HbA1c (Glycated Hemoglobin)', date: '2026-07-10', result: '7.4', unit: '%', referenceRange: '4.0 - 5.6 %', status: 'Abnormal' },
  { id: 'LAB-102', patientName: 'Ramachandra Rao', mrn: 'ZZ26000099', testName: 'Serum Creatinine', date: '2026-07-10', result: '1.1', unit: 'mg/dL', referenceRange: '0.7 - 1.3 mg/dL', status: 'Normal' },
  { id: 'LAB-103', patientName: 'Ananya Sharma', mrn: 'ZZ26000085', testName: 'Complete Blood Count (WBC)', date: '2026-07-12', result: '11.8', unit: '10^3/uL', referenceRange: '4.0 - 11.0 10^3/uL', status: 'Abnormal' },
  { id: 'LAB-104', patientName: 'Vikram Singh', mrn: 'ZZ26000143', testName: 'Thyroid Stimulating Hormone (TSH)', date: '2026-07-05', result: '5.2', unit: 'uIU/mL', referenceRange: '0.4 - 4.0 uIU/mL', status: 'Abnormal' },
  { id: 'LAB-105', patientName: 'Adarsh Y', mrn: 'ZZ26000012', testName: 'Lipid Profile (Total Cholesterol)', date: '2026-07-01', result: '195', unit: 'mg/dL', referenceRange: '< 200 mg/dL', status: 'Normal' }
];

export const mockSavedReports: SavedReport[] = [
  { id: 'SAVED-1', prompt: 'Show patient visits today', title: 'Weekly patient visit summary', description: 'Rolling 7-day view of scheduled, completed and missed visits.', frequency: 'Weekly', lastGenerated: '2026-07-10' },
  { id: 'SAVED-2', prompt: 'Top diagnoses this month', title: 'Top 10 diagnoses this month', description: 'ICD-ranked view with month-over-month delta.', frequency: 'Monthly', lastGenerated: '2026-07-01' },
  { id: 'SAVED-3', prompt: 'Vaccination due report', title: 'Vaccination due report — pediatric', description: 'Overdue + due-soon vaccines for patients under 12.', frequency: 'Weekly', lastGenerated: '2026-07-08' },
  { id: 'SAVED-4', prompt: 'Blood pressure trends', title: 'Blood pressure trends — hypertensive cohort', description: 'Systolic/diastolic averages across follow-up visits.', frequency: 'Monthly', lastGenerated: '2026-06-30' },
  { id: 'SAVED-5', prompt: 'Most active doctors', title: 'Most active providers', description: 'Ranked by completed encounters and average note length.', frequency: 'On-Demand', lastGenerated: '2026-07-11' }
];

export const mockReportHistory: ReportHistoryItem[] = [
  { id: 'HIST-1', prompt: 'Show patient visits today', title: 'Daily Patient Census', date: '2026-07-13 08:00', status: 'Success', reportId: 'REP-visits-today' },
  { id: 'HIST-2', prompt: 'Top diagnoses this month', title: 'Monthly Epidemiological Trends', date: '2026-07-12 15:45', status: 'Success', reportId: 'REP-top-diagnoses' },
  { id: 'HIST-3', prompt: 'Medication usage trends', title: 'Medication Formulary Audit', date: '2026-07-11 11:30', status: 'Success', reportId: 'REP-medication-trends' },
  { id: 'HIST-4', prompt: 'Vaccination due report', title: 'Pediatric Vaccine Compliance List', date: '2026-07-10 12:00', status: 'Success', reportId: 'REP-vaccinations-due' },
  { id: 'HIST-5', prompt: 'Show pediatric patient load with critical lab statuses', title: 'Pediatric Critical Lab Alerts', date: '2026-07-09 10:14', status: 'Error' }
];
