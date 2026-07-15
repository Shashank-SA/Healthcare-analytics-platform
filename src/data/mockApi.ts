import { 
  mockPatients, 
  mockDoctors, 
  mockClinicalVisits, 
  mockDiagnoses, 
  mockMedications, 
  mockVaccinations, 
  mockLabReports, 
  mockSavedReports, 
  mockReportHistory 
} from './mockData';
import { AnalyticsReport, SavedReport, ReportHistoryItem, Patient, Doctor, ClinicalVisit } from '../types';

// Helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // 1. Core Metadata Lists for Lookup & Custom Analytics
  getPatients: async (): Promise<Patient[]> => {
    await delay(300);
    return [...mockPatients];
  },

  getDoctors: async (): Promise<Doctor[]> => {
    await delay(200);
    return [...mockDoctors];
  },

  getClinicalVisits: async (): Promise<ClinicalVisit[]> => {
    await delay(300);
    return [...mockClinicalVisits];
  },

  // 2. Saved Reports Endpoints
  getSavedReports: async (): Promise<SavedReport[]> => {
    await delay(400);
    return [...mockSavedReports];
  },

  saveReport: async (report: Omit<SavedReport, 'id'>): Promise<SavedReport> => {
    await delay(500);
    const newReport: SavedReport = {
      ...report,
      id: `SAVED-${Date.now()}`
    };
    mockSavedReports.unshift(newReport);
    return newReport;
  },

  deleteSavedReport: async (id: string): Promise<boolean> => {
    await delay(300);
    const index = mockSavedReports.findIndex(r => r.id === id);
    if (index !== -1) {
      mockSavedReports.splice(index, 1);
      return true;
    }
    return false;
  },

  // 3. Report History Endpoints
  getReportHistory: async (): Promise<ReportHistoryItem[]> => {
    await delay(300);
    return [...mockReportHistory];
  },

  deleteReportHistory: async (id: string): Promise<boolean> => {
    await delay(250);
    const index = mockReportHistory.findIndex(r => r.id === id);
    if (index !== -1) {
      mockReportHistory.splice(index, 1);
      return true;
    }
    return false;
  },

  // 4. Dynamic "Natural Language" Report Generator
  generateReport: async (prompt: string): Promise<AnalyticsReport> => {
    const startTime = performance.now();
    await delay(1200); // Simulate analytical compute/LLM processing
    const lowerPrompt = prompt.toLowerCase().trim();

    let title = "Clinical Insight Extract";
    let summary: string[] = [];
    let kpis: any[] = [];
    let charts: any[] = [];
    let tableData: any = { headers: [], rows: [] };

    // A. "Show patient visits today" OR "visits"
    if (lowerPrompt.includes('visit') && (lowerPrompt.includes('today') || lowerPrompt.includes('show'))) {
      title = "Daily Clinical Visit Ledger";
      kpis = [
        { label: 'Scheduled Encounters', value: 5, change: '+2 vs yesterday', isPositive: true, type: 'up' },
        { label: 'Completed Visits', value: 3, change: '100% vital logs', isPositive: true, type: 'neutral' },
        { label: 'Missed Appointments', value: 2, change: 'Requires outreach', isPositive: false, type: 'down' },
        { label: 'Adambulatory Load', value: '82%', change: '+4% vs mean', isPositive: true, type: 'up' }
      ];
      charts = [
        {
          type: 'bar',
          xAxisKey: 'hour',
          keys: ['Scheduled', 'Completed'],
          data: [
            { hour: '09:00 AM', Scheduled: 1, Completed: 1 },
            { hour: '11:00 AM', Scheduled: 1, Completed: 1 },
            { hour: '02:00 PM', Scheduled: 1, Completed: 1 },
            { hour: '03:00 PM', Scheduled: 1, Completed: 0 },
            { hour: '04:00 PM', Scheduled: 1, Completed: 0 }
          ]
        }
      ];
      tableData = {
        headers: ['Visit ID', 'Patient Name', 'Age', 'Time', 'Doctor', 'Status', 'Clinical Reason'],
        rows: mockClinicalVisits.map(v => [
          v.id,
          v.patientName,
          `${v.patientAge} yrs`,
          v.time,
          v.doctorName,
          v.status,
          v.reason
        ])
      };
      summary = [
        "A total of 5 pediatric and adult clinical encounters are scheduled for today, July 13, 2026.",
        "A 40% missed appointment rate has been identified (Meghana P and Praveen M). These instances are linked to pediatric developmental wellness markers and BCG vaccination compliance schedules.",
        "All completed follow-ups show 100% adherence to vital logging, with mean respiratory rates resting at 15.6 breaths per minute."
      ];
    }
    // B. "Top diagnoses this month" OR "diagnoses"
    else if (lowerPrompt.includes('diagnos') || lowerPrompt.includes('icd')) {
      title = "Epidemiological Diagnosis Distribution";
      kpis = [
        { label: 'Total Diagnostic Index', value: 528, change: '+14% vs last month', isPositive: true, type: 'up' },
        { label: 'Primary Code Peak', value: 'Z01.89 (Wellness)', change: '124 incidents', isPositive: true, type: 'neutral' },
        { label: 'Acute Respiratory Strain', value: '24%', change: '+5% seasonal rise', isPositive: false, type: 'up' },
        { label: 'ICD Code Diversity', value: 24, change: 'Healthy patient mix', isPositive: true, type: 'neutral' }
      ];
      charts = [
        {
          type: 'bar',
          xAxisKey: 'code',
          keys: ['Cases'],
          data: mockDiagnoses.map(d => ({ code: d.code, Cases: d.count, description: d.description }))
        }
      ];
      tableData = {
        headers: ['ICD-10 Code', 'Clinical Description', 'Category Group', 'Patient Count', 'Monthly Trend'],
        rows: mockDiagnoses.map(d => [
          d.code,
          d.description,
          d.category,
          d.count,
          d.count > 70 ? 'Trending Up ↗' : 'Stable →'
        ])
      };
      summary = [
        "Diagnostic activity logs this month are led by wellness and general follow-up codes (Z01.89, representing 124 incidents).",
        "Respiratory system diagnoses, specifically Acute Pharyngitis (J02.9) and Acute Bronchitis (J20.9), represent 24% of the active case files.",
        "We recommend clinical advisory alerts for seasonal influenza and respiratory viral protocols to handle the elevated pharyngitis caseload in the ambulatory clinic."
      ];
    }
    // C. "Medication usage trends" OR "medication"
    else if (lowerPrompt.includes('medication') || lowerPrompt.includes('usage') || lowerPrompt.includes('prescrib')) {
      title = "Medication Formulary Audit";
      kpis = [
        { label: 'Active Prescriptions', value: 437, change: '+8% vs last month', isPositive: true, type: 'up' },
        { label: 'Formulary Adherence', value: '96.4%', change: 'Excellent consistency', isPositive: true, type: 'neutral' },
        { label: 'Most Distributed', value: 'Paracetamol 500mg', change: '112 patients', isPositive: true, type: 'neutral' },
        { label: 'Antimicrobial Volume', value: '42 cases', change: '-2% reduction', isPositive: true, type: 'down' }
      ];
      charts = [
        {
          type: 'bar',
          xAxisKey: 'name',
          keys: ['Patients'],
          data: mockMedications.map(m => ({ name: m.name.split(' ')[0], Patients: m.patientCount }))
        }
      ];
      tableData = {
        headers: ['Medication Name', 'Strength/Dosage', 'Indicated Frequency', 'Active Patient Count', 'Distribution Trend'],
        rows: mockMedications.map(m => [
          m.name,
          m.dosage,
          m.frequency,
          m.patientCount,
          m.trend === 'up' ? 'Increase ↗' : m.trend === 'down' ? 'Decrease ↘' : 'Stable →'
        ])
      };
      summary = [
        "Antipyretics and analgesics (Paracetamol) are the highest volume medications dispensed (112 patients), corresponding directly with the rise in acute pharyngitis cases.",
        "Metformin usage shows a stable upward trajectory (+5%), validating robust compliance with long-term type 2 diabetes management policies.",
        "Broad-spectrum antibiotic distribution (Amoxicillin and Azithromycin) remains controlled under active antimicrobial stewardship guidelines."
      ];
    }
    // D. "Vaccination due report" OR "vaccination" OR "vaccine"
    else if (lowerPrompt.includes('vaccin') || lowerPrompt.includes('immuniz')) {
      title = "Pediatric Immunization Compliance List";
      kpis = [
        { label: 'Pending Vaccinations', value: 5, change: 'Pediatric outreach pending', isPositive: false, type: 'neutral' },
        { label: 'Overdue BCG Milestones', value: 3, change: 'Immediate follow-up required', isPositive: false, type: 'down' },
        { label: 'Due in 30 Days', value: 2, change: 'Notification scheduled', isPositive: true, type: 'up' },
        { label: 'Clinic Compliance Rate', value: '60%', change: '-10% drop vs mean', isPositive: false, type: 'down' }
      ];
      charts = [
        {
          type: 'pie',
          xAxisKey: 'name',
          keys: ['value'],
          data: [
            { name: 'Overdue', value: 3, fill: '#f43f5e' },
            { name: 'Due Soon', value: 1, fill: '#f97316' },
            { name: 'Upcoming', value: 1, fill: '#3b82f6' }
          ]
        }
      ];
      tableData = {
        headers: ['Patient Name', 'Medical Record Number (MRN)', 'Vaccine Milestone', 'Dose Details', 'Due Date', 'Compliance Status'],
        rows: mockVaccinations.map(v => [
          v.patientName,
          v.mrn,
          v.name,
          v.dose,
          v.dueDate,
          v.status
        ])
      };
      summary = [
        "Current reports indicate a pediatric immunization compliance deficit of 10% in newborn cohorts.",
        "Two high-risk infants (Meghana P, ZZ26000041 and Praveen M, ZZ26000037) have overdue BCG and Hepatitis B vaccinations. These milestones should have been administered at birth.",
        "Outreach representatives have been auto-assigned via the pediatric care module to schedule home visits or urgent ambulatory appointments."
      ];
    }
    // E. "Monthly clinical summary" OR "clinical summary" OR "summary"
    else if (lowerPrompt.includes('summary') || lowerPrompt.includes('executive') || lowerPrompt.includes('monthly')) {
      title = "Executive Clinical Summary";
      kpis = [
        { label: 'Active Clinic Roster', value: 1450, change: '+45 new enrollments', isPositive: true, type: 'up' },
        { label: 'Completed Visits', value: 820, change: '94% compliance', isPositive: true, type: 'neutral' },
        { label: 'Normal Lab Rate', value: '82%', change: '-3% abnormality increase', isPositive: false, type: 'down' },
        { label: 'Staff Efficiency Index', value: '92%', change: '+2% post-scribe', isPositive: true, type: 'up' }
      ];
      charts = [
        {
          type: 'line',
          xAxisKey: 'week',
          keys: ['Visits', 'Admissions'],
          data: [
            { week: 'Week 1', Visits: 180, Admissions: 12 },
            { week: 'Week 2', Visits: 210, Admissions: 15 },
            { week: 'Week 3', Visits: 240, Admissions: 9 },
            { week: 'Week 4', Visits: 190, Admissions: 11 }
          ]
        }
      ];
      tableData = {
        headers: ['Metric Category', 'Key Performance Indicator', 'Baseline Target', 'Current Month Observed', 'Clinical Status'],
        rows: [
          ['Ambulatory Access', 'Vitals Logging Adherence', '95%', '98.2%', 'Goal Exceeded ✓'],
          ['Quality of Care', 'HbA1c Mean control (<7.5%)', '75%', '72.4%', 'Room for Improvement ⚠'],
          ['Operational Speed', 'Discharge Note Documentation', '2.0 hrs', '1.4 hrs', 'Goal Exceeded ✓'],
          ['Immunization', 'BCG Infant Vaccination', '98%', '88.0%', 'Attention Required ✖']
        ]
      };
      summary = [
        "Ambulatory and clinical patient visits remain high across the initial July weeks, peaking at 240 visits in Week 3.",
        "Average HbA1c control metrics indicate subtle clinical drift. The mean diabetic HbA1c reading of 7.4% calls for closer medication audit reviews.",
        "Scribe implementation has successfully reduced standard physician documentation lead time by 36 minutes per encounter, boosting operational satisfaction."
      ];
    }
    // F. "Blood pressure trends" OR "blood pressure" OR "vitals"
    else if (lowerPrompt.includes('blood pressure') || lowerPrompt.includes('bp') || lowerPrompt.includes('vitals')) {
      title = "Cardiovascular Vitals Monitoring Audit";
      kpis = [
        { label: 'Cohort Checked', value: 410, change: '100% of hypertensive cohort', isPositive: true, type: 'neutral' },
        { label: 'BP Under Control (<130/80)', value: '72%', change: '+4% improvement', isPositive: true, type: 'up' },
        { label: 'Critical Readings (>140/90)', value: '18%', change: 'Requiring medication change', isPositive: false, type: 'down' },
        { label: 'Mean Cohort Pulse Pressure', value: '44 mmHg', change: 'Normal cardiovascular stiffening', isPositive: true, type: 'neutral' }
      ];
      charts = [
        {
          type: 'line',
          xAxisKey: 'date',
          keys: ['Systolic', 'Diastolic'],
          data: [
            { date: 'Jun 24', Systolic: 122, Diastolic: 82 },
            { date: 'Jun 28', Systolic: 130, Diastolic: 85 },
            { date: 'Jul 01', Systolic: 125, Diastolic: 80 },
            { date: 'Jul 05', Systolic: 128, Diastolic: 84 },
            { date: 'Jul 10', Systolic: 142, Diastolic: 90 },
            { date: 'Jul 13', Systolic: 122, Diastolic: 82 }
          ]
        }
      ];
      tableData = {
        headers: ['Patient Name', 'Age', 'Most Recent Reading', 'Recorded Heart Rate', 'Provider', 'Classification Group'],
        rows: [
          ['Ramachandra Rao', '68 yrs', '142/90 mmHg', '68 bpm', 'Dr. Rajesh Gowda', 'Hypertension Stage 2'],
          ['Vikram Singh', '47 yrs', '128/84 mmHg', '80 bpm', 'Dr. Abhinav Kumar', 'Pre-hypertension'],
          ['Adarsh Y', '26 yrs', '122/82 mmHg', '74 bpm', 'Dr. Abhinav Kumar', 'Pre-hypertension'],
          ['Ananya Sharma', '41 yrs', '118/76 mmHg', '82 bpm', 'Dr. Abhinav Kumar', 'Normal Range'],
          ['Shreya Iyer', '32 yrs', '110/70 mmHg', '72 bpm', 'Dr. Priya Naidu', 'Normal Range']
        ]
      };
      summary = [
        "Systolic and diastolic blood pressure readings remain stable across most regular follow-up visits, averaging 128/84 mmHg.",
        "An exception is noted in patient Ramachandra Rao (ZZ26000099) with an elevated reading of 142/90 on July 10. His Lisinopril dosage was successfully increased to 20mg.",
        "Recommendation: Implement micro-reminders for weekly home blood pressure logging for geriatric patients with essential hypertension codes (I10)."
      ];
    }
    // G. "Most active doctors" OR "doctors"
    else if (lowerPrompt.includes('doctor') || lowerPrompt.includes('physician') || lowerPrompt.includes('active')) {
      title = "Physician Clinical Engagement Report";
      kpis = [
        { label: 'Active Staff On-Duty', value: 4, change: '100% capacity', isPositive: true, type: 'neutral' },
        { label: 'Encounters Handled', value: 245, change: '+12% caseload density', isPositive: true, type: 'up' },
        { label: 'Avg Documentation Time', value: '4.8 mins', change: '-12% reduction', isPositive: true, type: 'up' },
        { label: 'Primary Load Peak', value: 'Pediatrics', change: '18 active follow-ups', isPositive: true, type: 'neutral' }
      ];
      charts = [
        {
          type: 'bar',
          xAxisKey: 'doctor',
          keys: ['ActiveVisits'],
          data: mockDoctors.map(d => ({ doctor: d.name.split('. ')[1], ActiveVisits: d.activeVisits }))
        }
      ];
      tableData = {
        headers: ['Physician Name', 'Clinical Specialty Group', 'Active Encounters', 'Chart Complete Rate', 'Patient Care Rating'],
        rows: mockDoctors.map(d => [
          d.name,
          d.specialty,
          d.activeVisits,
          '98.4%',
          '4.9 / 5.0'
        ])
      };
      summary = [
        "Dr. Shalini Hegde (Pediatrics) is managing the highest relative outpatient workload with 18 active follow-ups this week.",
        "Clinical Documentation completeness is maintained at an exceptional 98.4% average across all practitioners.",
        "The overall physician clinical workload remains well within enterprise quality of care thresholds, ensuring safe and unhurried patient consults."
      ];
    }
    // H. Default Fallback Parser (Laboratory results and general insights)
    else {
      title = `EMR Clinical Extract: "${prompt}"`;
      kpis = [
        { label: 'Patients Correlated', value: mockPatients.length, change: 'Matched in registry', isPositive: true, type: 'neutral' },
        { label: 'Visits Audited', value: mockClinicalVisits.length, change: 'Parsed historical logs', isPositive: true, type: 'neutral' },
        { label: 'Diagnostic Indicators', value: 6, change: 'ICD codes scanned', isPositive: true, type: 'neutral' },
        { label: 'Lab Reports Scanned', value: mockLabReports.length, change: '100% accurate results', isPositive: true, type: 'neutral' }
      ];
      charts = [
        {
          type: 'bar',
          xAxisKey: 'name',
          keys: ['Age'],
          data: mockPatients.map(p => ({ name: p.name, Age: p.age || 1 }))
        }
      ];
      tableData = {
        headers: ['Patient Name', 'MRN', 'Clinical Test', 'Result Observed', 'Reference Range', 'Clinical Status'],
        rows: mockLabReports.map(l => [
          l.patientName,
          l.mrn,
          l.testName,
          `${l.result} ${l.unit}`,
          l.referenceRange,
          l.status
        ])
      };
      summary = [
        `This is a custom clinical intelligence extract compiled in response to: "${prompt}".`,
        "The diagnostic and laboratory engines scanned 7 patient files, 7 active outpatient visits, and 5 lab reports.",
        "Anomalous findings are concentrated in glycated hemoglobin (HbA1c) readings for geriatric patients, requiring secondary clinical reviews.",
        "All data fields correspond to active EMR tables and are designed to load production clinical feeds seamlessly."
      ];
    }

    const queryTimeMs = Math.round(performance.now() - startTime);

    // Create ReportHistoryItem in history
    const newHistoryItem: ReportHistoryItem = {
      id: `HIST-${Date.now()}`,
      prompt,
      title,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Success',
      reportId: `REP-${Date.now()}`
    };
    mockReportHistory.unshift(newHistoryItem);

    const report: AnalyticsReport = {
      id: newHistoryItem.reportId!,
      prompt,
      title,
      date: newHistoryItem.date,
      status: 'Success',
      summary,
      kpis,
      charts,
      tableData,
      queryTimeMs
    };

    return report;
  }
};
