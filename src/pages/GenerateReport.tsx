import React, { useState } from 'react';
import PromptBox from '../components/PromptBox';
import KPICard from '../components/KPICard';
import { 
  ArrowLeft, 
  Clock, 
  Download, 
  Sparkles, 
  Save, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { AnalyticsReport } from '../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

interface GenerateReportProps {
  report: AnalyticsReport | null;
  onBackToDashboard: () => void;
  onGenerateReport: (prompt: string) => void;
  isGenerating: boolean;
  onSaveReportTemplate: (prompt: string, title: string) => void;
}

export default function GenerateReport({
  report,
  onBackToDashboard,
  onGenerateReport,
  isGenerating,
  onSaveReportTemplate
}: GenerateReportProps) {
  const [saveTitle, setSaveTitle] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Patient Visits Chart Dataset (Line)
  const patientVisitsData = [
    { name: 'Jan', value: 165 },
    { name: 'Feb', value: 195 },
    { name: 'Mar', value: 185 },
    { name: 'Apr', value: 215 },
    { name: 'May', value: 235 },
    { name: 'Jun', value: 210 },
    { name: 'Jul', value: 245 },
    { name: 'Aug', value: 285 },
    { name: 'Sep', value: 305 },
    { name: 'Oct', value: 290 },
    { name: 'Nov', value: 280 },
    { name: 'Dec', value: 275 }
  ];

  // 2. Diagnosis Distribution Dataset (Donut)
  const diagnosisDistributionData = [
    { name: 'Upper Respiratory Infection', value: 124, fill: '#0d9488' },
    { name: 'Acute Bronchitis', value: 98, fill: '#2563eb' },
    { name: 'Acute Pharyngitis', value: 85, fill: '#eab308' },
    { name: 'Fever, Unspecified', value: 72, fill: '#dc2626' },
    { name: 'Dermatitis, Unspecified', value: 54, fill: '#8b5cf6' },
    { name: 'Type 2 Diabetes', value: 42, fill: '#ec4899' }
  ];

  // 3. Medication Trends Dataset (Bar with unique colors)
  const medicationTrendsData = [
    { name: 'Amoxicillin', value: 320, fill: '#0d9488' },
    { name: 'Ibuprofen', value: 240, fill: '#2563eb' },
    { name: 'Paracetamol', value: 190, fill: '#f97316' },
    { name: 'Cetirizine', value: 150, fill: '#ef4444' },
    { name: 'Azithromycin', value: 110, fill: '#8b5cf6' },
    { name: 'Metformin', value: 85, fill: '#ec4899' }
  ];

  // 4. Age Distribution Dataset (Bar)
  const ageDistributionData = [
    { name: '0-12', value: 4800 },
    { name: '13-25', value: 3200 },
    { name: '26-40', value: 5400 },
    { name: '41-60', value: 4100 },
    { name: '61-80', value: 2800 },
    { name: '80+', value: 1200 }
  ];

  // Table cohort details dataset matching Image 7 100% exactly
  const cohortTableData = [
    { patient: 'Meghana P', mrn: 'ZZ26000041', ageGender: '6 • F', diagnosis: 'J06.9 • Upper Respiratory Infection', diagnosisStyle: 'bg-teal-50 text-teal-700 border-teal-100', medication: 'Amoxicillin 500mg', date: '2026-07-01', provider: 'Dr. Abhinav Kumar' },
    { patient: 'Praveen Sharma', mrn: 'ZZ26000042', ageGender: '13 • M', diagnosis: 'J20.9 • Acute Bronchitis', diagnosisStyle: 'bg-blue-50 text-blue-700 border-blue-100', medication: 'Paracetamol 500mg', date: '2026-07-02', provider: 'Dr. Rhea Menon' },
    { patient: 'Adarsh Iyer', mrn: 'ZZ26000043', ageGender: '20 • F', diagnosis: 'J02.9 • Acute Pharyngitis', diagnosisStyle: 'bg-yellow-50 text-yellow-800 border-yellow-100', medication: 'Azithromycin 250mg', date: '2026-07-03', provider: 'Dr. Sameer Joshi' },
    { patient: 'Ananya Gupta', mrn: 'ZZ26000044', ageGender: '27 • M', diagnosis: 'R50.9 • Fever, Unspecified', diagnosisStyle: 'bg-rose-50 text-rose-700 border-rose-100', medication: 'Amlodipine 5mg', date: '2026-07-04', provider: 'Dr. Kavya Rao' },
    { patient: 'Rahul Y', mrn: 'ZZ26000045', ageGender: '34 • F', diagnosis: 'L30.9 • Dermatitis, Unspecified', diagnosisStyle: 'bg-purple-50 text-purple-700 border-purple-100', medication: 'Ibuprofen 400mg', date: '2026-07-05', provider: 'Dr. Naveen Shetty' },
    { patient: 'Priya Reddy', mrn: 'ZZ26000046', ageGender: '41 • M', diagnosis: 'E11.9 • Type 2 Diabetes', diagnosisStyle: 'bg-pink-50 text-pink-700 border-pink-100', medication: 'Cetirizine 10mg', date: '2026-07-06', provider: 'Dr. Abhinav Kumar' },
    { patient: 'Vikram Rao', mrn: 'ZZ26000047', ageGender: '48 • F', diagnosis: 'I10 • Essential Hypertension', diagnosisStyle: 'bg-blue-50 text-blue-700 border-blue-100', medication: 'Metformin 500mg', date: '2026-07-07', provider: 'Dr. Rhea Menon' },
    { patient: 'Divya M', mrn: 'ZZ26000048', ageGender: '55 • M', diagnosis: 'Z01.89 • Encounter for other special examinations', diagnosisStyle: 'bg-slate-50 text-slate-700 border-slate-200', medication: 'Amoxicillin 500mg', date: '2026-07-08', provider: 'Dr. Sameer Joshi' },
    { patient: 'Karthik Kumar', mrn: 'ZZ26000049', ageGender: '62 • F', diagnosis: 'J06.9 • Upper Respiratory Infection', diagnosisStyle: 'bg-teal-50 text-teal-700 border-teal-100', medication: 'Paracetamol 500mg', date: '2026-07-09', provider: 'Dr. Kavya Rao' },
    { patient: 'Sneha Nair', mrn: 'ZZ26000050', ageGender: '69 • M', diagnosis: 'J20.9 • Acute Bronchitis', diagnosisStyle: 'bg-blue-50 text-blue-700 border-blue-100', medication: 'Azithromycin 250mg', date: '2026-07-10', provider: 'Dr. Naveen Shetty' }
  ];

  const handleSaveLayout = () => {
    if (!report) return;
    setSaveTitle(report.title || 'Vaccination Due Report');
    setShowSaveModal(true);
  };

  const handleConfirmSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    onSaveReportTemplate(report?.prompt || 'Vaccination due report', saveTitle);
    setIsSaving(false);
    setShowSaveModal(false);
    alert(`Clinical Template Saved successfully!\n"${saveTitle}" has been appended to Saved Reports.`);
  };

  // If there's no report yet or we are loading the compilation, show a clean loader
  if (isGenerating) {
    return (
      <div className="p-16 flex flex-col items-center justify-center bg-white border border-slate-200/80 rounded-2xl text-center shadow-xs animate-pulse">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
        <h3 className="font-sans font-extrabold text-slate-800 text-lg">Assembling Analytics Dashboard...</h3>
        <p className="text-sm text-slate-400 max-w-sm mt-1">
          Structured EMR indexing, clinical correlation models, and dynamic chart assembly...
        </p>
      </div>
    );
  }

  // Active compiled report screen (Image 6 & 7)
  return (
    <div id="analytics-generate-report-page" className="space-y-6 animate-fade-in pb-12 select-none">
      
      {/* 1. Header Toolbar row matching Image 6 */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider font-mono">
            RPT-447692
          </span>
          
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Completed
          </span>
          
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-300" />
            <span>7/15/2026, 10:44:09 AM</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveLayout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-slate-800 rounded-lg text-xs font-bold cursor-pointer transition-all hover:border-slate-300"
          >
            <Save className="w-3.5 h-3.5 text-emerald-600" />
            <span>Save Template</span>
          </button>
          
          <button
            onClick={() => alert("Report Export: Dynamic XLS spreadsheet and high-contrast printable PDF are queued.")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-slate-800 rounded-lg text-xs font-bold cursor-pointer transition-all hover:border-slate-300"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Embedded query prompt box so user can re-prompt or fine-tune */}
      <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl">
        <div className="text-[10px] font-extrabold text-slate-400 mb-2.5 uppercase tracking-widest block font-sans">
          Re-compile Clinical Audit Prompt:
        </div>
        <PromptBox 
          onSubmit={onGenerateReport} 
          isGenerating={isGenerating} 
          initialPrompt={report?.prompt || 'Vaccination due report'} 
        />
      </div>

      {/* 2. Page Title & Prompt Recall */}
      <div>
        <h2 className="font-sans font-extrabold text-slate-800 text-2xl tracking-tight leading-none mb-1">
          {report?.title || "Vaccination Due Report"}
        </h2>
        <p className="text-xs font-medium text-slate-400 italic font-sans">
          "{report?.prompt || "Vaccination due report"}"
        </p>
      </div>

      {/* 3. 4 KPI Cards (Exactly as shown in Image 6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Patients" value="12,480" change="+4.2% vs last month" type="up" colorTheme="blue" />
        <KPICard label="Clinical Visits" value="3,218" change="+8.6% vs last month" type="up" colorTheme="orange" />
        <KPICard label="Diagnoses" value="5,471" change="-1.3% vs last month" type="down" colorTheme="purple" />
        <KPICard label="Medications" value="4,102" change="+3.1% vs last month" type="up" colorTheme="green" />
      </div>

      {/* 4. AI Summary (Image 6) */}
      <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-3xs space-y-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <h4 className="font-sans font-extrabold text-slate-800 text-sm tracking-tight leading-none">AI Summary</h4>
        </div>
        <div className="text-[10px] font-extrabold text-[#059669] uppercase tracking-wider block font-sans">
          GENERATED INSIGHT
        </div>
        <p className="text-xs text-slate-600 font-sans leading-relaxed">
          Outpatient visits grew 8.6% versus the previous 30 days, driven primarily by respiratory presentations (J06.9, J20.9). Medication dispensing for Amoxicillin and Azithromycin remained the highest across the panel. No critical lab anomalies were flagged in the current period.
        </p>
      </div>

      {/* 5. 4 Charts Grid (Line, Donut, Bar, Bar - Image 6 & 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Patient Visits (Line) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col shadow-3xs">
          <div className="mb-4">
            <h4 className="font-sans font-extrabold text-slate-800 text-sm tracking-tight leading-none mb-1">Patient Visits</h4>
            <p className="text-[11px] font-semibold text-slate-400">Monthly encounters</p>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={patientVisitsData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '700' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '700' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px', fontWeight: 'bold' }} />
                <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={3} dot={{ r: 4.5, strokeWidth: 1.5, fill: '#fff', stroke: '#059669' }} activeDot={{ r: 6 }} name="Encounters" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Diagnosis Distribution (Donut) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col shadow-3xs">
          <div className="mb-4">
            <h4 className="font-sans font-extrabold text-slate-800 text-sm tracking-tight leading-none mb-1">Diagnosis Distribution</h4>
            <p className="text-[11px] font-semibold text-slate-400">Top ICD categories</p>
          </div>
          <div className="h-60 w-full flex flex-col justify-between">
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={diagnosisDistributionData} cx="50%" cy="50%" innerRadius={44} outerRadius={62} paddingAngle={3} dataKey="value">
                    {diagnosisDistributionData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px', fontWeight: 'bold' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] font-bold text-slate-400 font-sans uppercase">
              {diagnosisDistributionData.map((entry, idx) => (
                <span key={idx} className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.fill }} />
                  <span className="truncate text-slate-500">{entry.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 3: Medication Trends (Bar columns) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col shadow-3xs">
          <div className="mb-4">
            <h4 className="font-sans font-extrabold text-slate-800 text-sm tracking-tight leading-none mb-1">Medication Trends</h4>
            <p className="text-[11px] font-semibold text-slate-400">Dispensed volume</p>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={medicationTrendsData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '700' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '700' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px', fontWeight: 'bold' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={30}>
                  {medicationTrendsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Age Distribution (Bar) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col shadow-3xs">
          <div className="mb-4">
            <h4 className="font-sans font-extrabold text-slate-800 text-sm tracking-tight leading-none mb-1">Age Distribution</h4>
            <p className="text-[11px] font-semibold text-slate-400">Patient panel by band</p>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageDistributionData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '700' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '700' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px', fontWeight: 'bold' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 6. Cohort details Table Section matching Image 7 100% exactly */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-2">
          <h3 className="font-sans font-extrabold text-slate-800 text-base tracking-tight leading-none">
            Cohort details
          </h3>
          <span className="bg-[#f1f5f9] text-[#475569] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-slate-200/50">
            10 rows
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-3xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc]/80 border-b border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-widest select-none">
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">MRN</th>
                  <th className="px-6 py-4">Age / Gender</th>
                  <th className="px-6 py-4">Diagnosis</th>
                  <th className="px-6 py-4">Medication</th>
                  <th className="px-6 py-4">Visit Date</th>
                  <th className="px-6 py-4">Provider</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-xs font-semibold font-sans">
                {cohortTableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-slate-800 font-extrabold">{row.patient}</td>
                    <td className="px-6 py-3.5 font-mono text-[11px] text-slate-400">{row.mrn}</td>
                    <td className="px-6 py-3.5 text-slate-500">{row.ageGender}</td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border tracking-wide leading-normal ${row.diagnosisStyle}`}>
                        {row.diagnosis}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-600">{row.medication}</td>
                    <td className="px-6 py-3.5 text-slate-400 font-mono text-[11px]">{row.date}</td>
                    <td className="px-6 py-3.5 text-slate-500">{row.provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Save Template Modal UI (EMR styled popup overlay) */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-100 max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#ecfdf5] text-[#059669] border border-emerald-100 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-sans font-extrabold text-slate-800 text-sm">Save Clinical Query Template</h4>
            </div>
            
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Save this natural language query and configuration setup. This permits doctors to run instant, real-time re-audits with a single click in the EMR panel.
            </p>

            <div className="space-y-3.5">
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Template Title</label>
                <input
                  type="text"
                  value={saveTitle}
                  onChange={(e) => setSaveTitle(e.target.value)}
                  placeholder="e.g., Weekly Pediatric Immunization Roster"
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-emerald-500 focus:outline-none rounded-lg p-2.5 text-xs font-semibold text-slate-800 font-sans"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-3.5 py-2 border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                disabled={isSaving}
                className="bg-[#059669] hover:bg-[#047857] text-white px-3.5 py-2 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1.5"
              >
                {isSaving ? 'Saving...' : 'Confirm Save'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
