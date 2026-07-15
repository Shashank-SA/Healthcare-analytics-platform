export interface Patient {
  id: string;
  mrn: string;
  name: string;
  dob: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  address: string;
  registrationDate: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  activeVisits: number;
}

export interface Vitals {
  bp: string;
  hr: number;
  temp: string;
  rr: number;
  spo2: number;
}

export interface ClinicalVisit {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: 'male' | 'female' | 'other';
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Missed' | 'Incomplete';
  type: string;
  reason: string;
  vitals: Vitals;
  diagnoses: string[];
  medications: string[];
  notes: string;
}

export interface DiagnosisData {
  code: string;
  description: string;
  count: number;
  category: string;
}

export interface MedicationData {
  name: string;
  dosage: string;
  frequency: string;
  patientCount: number;
  trend: 'up' | 'down' | 'stable';
}

export interface VaccinationData {
  name: string;
  dose: string;
  dueDate: string;
  status: 'Overdue' | 'Due Soon' | 'Upcoming' | 'Completed';
  patientName: string;
  mrn: string;
}

export interface LabReport {
  id: string;
  patientName: string;
  mrn: string;
  testName: string;
  date: string;
  result: string;
  unit: string;
  referenceRange: string;
  status: 'Normal' | 'Abnormal' | 'Critical';
}

export interface ReportKPI {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  type: 'neutral' | 'up' | 'down';
}

export interface AnalyticsReport {
  id: string;
  prompt: string;
  title: string;
  date: string;
  status: 'Success' | 'Processing' | 'Error';
  summary: string[];
  kpis: ReportKPI[];
  charts: {
    type: 'bar' | 'line' | 'pie' | 'area';
    data: any[];
    keys: string[];
    xAxisKey: string;
  }[];
  tableData: {
    headers: string[];
    rows: any[];
  };
  queryTimeMs: number;
}

export interface SavedReport {
  id: string;
  prompt: string;
  title: string;
  description: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'On-Demand';
  lastGenerated: string;
}

export interface ReportHistoryItem {
  id: string;
  prompt: string;
  title: string;
  date: string;
  status: 'Success' | 'Processing' | 'Error';
  reportId?: string;
}
