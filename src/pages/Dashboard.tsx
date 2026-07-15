import React, { useState } from 'react';
import PromptBox from '../components/PromptBox';
import KPICard from '../components/KPICard';
import { 
  Sparkles, 
  Calendar, 
  Building2, 
  Stethoscope, 
  Activity, 
  User, 
  RotateCcw 
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface DashboardProps {
  onGenerateReport: (prompt: string) => void;
  isGenerating: boolean;
}

export default function Dashboard({ onGenerateReport, isGenerating }: DashboardProps) {
  // Filter states matching Image 8
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [department, setDepartment] = useState('All Departments');
  const [provider, setProvider] = useState('All Providers');
  const [visitType, setVisitType] = useState('All Visit Types');
  const [patientType, setPatientType] = useState('All');

  const handleResetFilters = () => {
    setDateRange('Last 30 days');
    setDepartment('All Departments');
    setProvider('All Providers');
    setVisitType('All Visit Types');
    setPatientType('All');
  };

  // 1. Patient Visits Chart Dataset (Jan - Dec)
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

  // 3. Medication Trends Dataset (Bar columns with unique colors)
  const medicationTrendsData = [
    { name: 'Amoxicillin', value: 320, fill: '#0d9488' },
    { name: 'Ibuprofen', value: 240, fill: '#2563eb' },
    { name: 'Paracetamol', value: 190, fill: '#f97316' },
    { name: 'Cetirizine', value: 150, fill: '#ef4444' },
    { name: 'Azithromycin', value: 110, fill: '#8b5cf6' },
    { name: 'Metformin', value: 85, fill: '#ec4899' }
  ];

  // 4. Vaccination Status Dataset (Donut)
  const vaccinationStatusData = [
    { name: 'Completed', value: 620, fill: '#10b981' },
    { name: 'Due Soon', value: 140, fill: '#f97316' },
    { name: 'Overdue', value: 90, fill: '#ef4444' },
    { name: 'Upcoming', value: 210, fill: '#3b82f6' }
  ];

  // 5. Age Distribution Dataset (Bar)
  const ageDistributionData = [
    { name: '0-12', value: 4800 },
    { name: '13-25', value: 3200 },
    { name: '26-40', value: 5400 },
    { name: '41-60', value: 4100 },
    { name: '61-80', value: 2800 },
    { name: '80+', value: 1200 }
  ];

  // 6. Gender Ratio Dataset (Donut)
  const genderDistributionData = [
    { name: 'Female', value: 742, fill: '#ec4899' },
    { name: 'Male', value: 688, fill: '#3b82f6' },
    { name: 'Other', value: 20, fill: '#8b5cf6' }
  ];

  // 7. Visit Trends Dataset (Area Chart, 12 months)
  const visitTrendsData = [
    { name: 'Jan', outpatient: 120, inpatient: 45, followup: 35 },
    { name: 'Feb', outpatient: 145, inpatient: 50, followup: 40 },
    { name: 'Mar', outpatient: 160, inpatient: 40, followup: 45 },
    { name: 'Apr', outpatient: 155, inpatient: 55, followup: 50 },
    { name: 'May', outpatient: 180, inpatient: 60, followup: 65 },
    { name: 'Jun', outpatient: 170, inpatient: 50, followup: 55 },
    { name: 'Jul', outpatient: 195, inpatient: 65, followup: 70 },
    { name: 'Aug', outpatient: 220, inpatient: 70, followup: 80 },
    { name: 'Sep', outpatient: 240, inpatient: 80, followup: 95 },
    { name: 'Oct', outpatient: 215, inpatient: 75, followup: 85 },
    { name: 'Nov', outpatient: 205, inpatient: 70, followup: 75 },
    { name: 'Dec', outpatient: 190, inpatient: 65, followup: 70 }
  ];

  return (
    <div id="analytics-dashboard-page" className="space-y-8 animate-fade-in pb-12 select-none">
      
      {/* Welcome Title Grid */}
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#059669] shrink-0 shadow-2xs">
          <Sparkles className="w-6 h-6 stroke-[2]" />
        </div>
        <div>
          <h1 className="font-sans font-extrabold text-slate-800 text-2xl tracking-tight leading-none mb-1">
            Healthcare Analytics Platform
          </h1>
          <p className="text-xs font-semibold text-slate-400 font-sans tracking-wide">
            Generate clinical insights using natural language prompts.
          </p>
        </div>
      </div>

      {/* Primary Prompt Console */}
      <PromptBox 
        onSubmit={onGenerateReport} 
        isGenerating={isGenerating} 
      />

      {/* Filter Toolbar Section (Exactly as seen in Image 8) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-3xs flex flex-wrap items-center gap-3">
        {/* Date Range Filter */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#f8fafc] rounded-xl border border-slate-100 text-xs font-bold text-slate-500 cursor-pointer hover:bg-slate-100/50 transition-colors">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>DATE RANGE:</span>
          <span className="text-slate-800 font-extrabold">{dateRange}</span>
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#f8fafc] rounded-xl border border-slate-100 text-xs font-bold text-slate-500 cursor-pointer hover:bg-slate-100/50 transition-colors">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          <span>DEPARTMENT:</span>
          <span className="text-slate-800 font-extrabold">{department}</span>
        </div>

        {/* Provider Filter */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#f8fafc] rounded-xl border border-slate-100 text-xs font-bold text-slate-500 cursor-pointer hover:bg-slate-100/50 transition-colors">
          <Stethoscope className="w-3.5 h-3.5 text-slate-400" />
          <span>PROVIDER:</span>
          <span className="text-slate-800 font-extrabold">{provider}</span>
        </div>

        {/* Visit Type Filter */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#f8fafc] rounded-xl border border-slate-100 text-xs font-bold text-slate-500 cursor-pointer hover:bg-slate-100/50 transition-colors">
          <Activity className="w-3.5 h-3.5 text-slate-400" />
          <span>VISIT TYPE:</span>
          <span className="text-slate-800 font-extrabold">{visitType}</span>
        </div>

        {/* Patient Type Filter */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#f8fafc] rounded-xl border border-slate-100 text-xs font-bold text-slate-500 cursor-pointer hover:bg-slate-100/50 transition-colors">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span>PATIENT TYPE:</span>
          <span className="text-slate-800 font-extrabold">{patientType}</span>
        </div>

        {/* Reset Action */}
        <button 
          onClick={handleResetFilters}
          className="ml-auto flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 rounded-xl text-xs font-bold cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Overview Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-800 font-sans tracking-tight leading-none">
          Overview
        </h2>
        
        {/* KPI Stats Grid (Precisely matching Image 8) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <KPICard label="Total Patients" value="12,480" change="+4.2% vs last month" type="up" colorTheme="blue" />
          <KPICard label="Clinical Visits" value="3,218" change="+8.6% vs last month" type="up" colorTheme="orange" />
          <KPICard label="Diagnoses" value="5,471" change="-1.3% vs last month" type="down" colorTheme="purple" />
          <KPICard label="Medications" value="4,102" change="+3.1% vs last month" type="up" colorTheme="green" />
          <KPICard label="Vaccinations" value="1,876" change="+12.4% vs last month" type="up" colorTheme="pink" />
          <KPICard label="Lab Reports" value="2,340" change="+5.7% vs last month" type="up" colorTheme="slate" />
        </div>

        {/* Color Legends */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 px-1 text-xs font-extrabold text-slate-400/90 font-sans tracking-wide uppercase">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Patients</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Visits</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Diagnoses</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Medications</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-pink-500" /> Vaccinations</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Lab Reports</span>
        </div>
      </div>

      {/* Cohort Epidemiology & Operations Section */}
      <div className="space-y-4">
        <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block font-sans">
          Cohort Epidemiology & Operations
        </h2>
        
        {/* Bento Grid of first 6 Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chart 1: Patient Visits */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/85 flex flex-col shadow-3xs hover:border-slate-300 transition-colors">
            <div className="mb-4">
              <h4 className="font-sans font-extrabold text-slate-800 text-sm tracking-tight leading-none mb-1">Patient Visits</h4>
              <p className="text-[11px] font-semibold text-slate-400">Monthly encounters</p>
            </div>
            <div className="h-64 w-full">
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
          <div className="bg-white p-5 rounded-2xl border border-slate-200/85 flex flex-col shadow-3xs hover:border-slate-300 transition-colors">
            <div className="mb-4">
              <h4 className="font-sans font-extrabold text-slate-800 text-sm tracking-tight leading-none mb-1">Diagnosis Distribution</h4>
              <p className="text-[11px] font-semibold text-slate-400">Top ICD categories</p>
            </div>
            <div className="h-64 w-full flex flex-col justify-between">
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={diagnosisDistributionData} cx="50%" cy="50%" innerRadius={48} outerRadius={68} paddingAngle={3} dataKey="value">
                      {diagnosisDistributionData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px', fontWeight: 'bold' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Custom micro-legend with neat rows */}
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

          {/* Chart 3: Medication Trends (Bar with individual colors) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/85 flex flex-col shadow-3xs hover:border-slate-300 transition-colors">
            <div className="mb-4">
              <h4 className="font-sans font-extrabold text-slate-800 text-sm tracking-tight leading-none mb-1">Medication Trends</h4>
              <p className="text-[11px] font-semibold text-slate-400">Dispensed volume</p>
            </div>
            <div className="h-64 w-full">
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

          {/* Chart 4: Vaccination Status (Donut) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/85 flex flex-col shadow-3xs hover:border-slate-300 transition-colors">
            <div className="mb-4">
              <h4 className="font-sans font-extrabold text-slate-800 text-sm tracking-tight leading-none mb-1">Vaccination Status</h4>
              <p className="text-[11px] font-semibold text-slate-400">Compliance mix</p>
            </div>
            <div className="h-64 w-full flex flex-col justify-between">
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={vaccinationStatusData} cx="50%" cy="50%" innerRadius={48} outerRadius={68} paddingAngle={3} dataKey="value">
                      {vaccinationStatusData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px', fontWeight: 'bold' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] font-bold text-slate-400 font-sans uppercase">
                {vaccinationStatusData.map((entry, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.fill }} />
                    <span className="truncate text-slate-500">{entry.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Chart 5: Age Distribution (Bar) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/85 flex flex-col shadow-3xs hover:border-slate-300 transition-colors">
            <div className="mb-4">
              <h4 className="font-sans font-extrabold text-slate-800 text-sm tracking-tight leading-none mb-1">Age Distribution</h4>
              <p className="text-[11px] font-semibold text-slate-400">Patient panel by band</p>
            </div>
            <div className="h-64 w-full">
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

          {/* Chart 6: Gender Ratio (Donut) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/85 flex flex-col shadow-3xs hover:border-slate-300 transition-colors">
            <div className="mb-4">
              <h4 className="font-sans font-extrabold text-slate-800 text-sm tracking-tight leading-none mb-1">Gender Distribution</h4>
              <p className="text-[11px] font-semibold text-slate-400">Panel breakdown</p>
            </div>
            <div className="h-64 w-full flex flex-col justify-between">
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={genderDistributionData} cx="50%" cy="50%" innerRadius={48} outerRadius={68} paddingAngle={3} dataKey="value">
                      {genderDistributionData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px', fontWeight: 'bold' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-[9px] font-bold text-slate-400 font-sans uppercase">
                {genderDistributionData.map((entry, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.fill }} />
                    <span className="truncate text-slate-500">{entry.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Chart 7: Visit Trends Area (Full Width at Bottom) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/85 flex flex-col shadow-3xs hover:border-slate-300 transition-colors w-full mt-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="font-sans font-extrabold text-slate-800 text-sm tracking-tight leading-none mb-1">Visit Trends</h4>
              <p className="text-[11px] font-semibold text-slate-400">Outpatient • Inpatient • Follow-up</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitTrendsData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="gradOutpatient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gradInpatient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gradFollowUp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '700' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '700' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px', fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="outpatient" stroke="#10b981" fillOpacity={1} fill="url(#gradOutpatient)" strokeWidth={2.5} name="Outpatient" />
                <Area type="monotone" dataKey="inpatient" stroke="#3b82f6" fillOpacity={1} fill="url(#gradInpatient)" strokeWidth={2.5} name="Inpatient" />
                <Area type="monotone" dataKey="followup" stroke="#8b5cf6" fillOpacity={1} fill="url(#gradFollowUp)" strokeWidth={2.5} name="Follow-up" />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: '#64748b', paddingTop: '15px' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
