import React, { useState } from 'react';
import { Eye, EyeOff, Save, Key, Database, FileText, Palette, Sliders, ShieldCheck } from 'lucide-react';

export default function Settings() {
  const [apiKey, setApiKey] = useState('••••••••••••••••••••••••••••••••••••••••');
  const [showKey, setShowKey] = useState(false);
  const [emrHost, setEmrHost] = useState('https://bengaluru-main-emr.practicecloud.local/api/v1');
  const [dbStatus, setDbStatus] = useState('Connected');
  const [isSaving, setIsSaving] = useState(false);

  // Preference switches
  const [autoSave, setAutoSave] = useState(true);
  const [enableCache, setEnableCache] = useState(true);
  const [exportComplianceHeader, setExportComplianceHeader] = useState(true);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    alert('System settings persisted and cached on local workstation safely.');
  };

  return (
    <div id="analytics-settings-page" className="space-y-6 max-w-3xl animate-fade-in pb-12">
      <div>
        <h1 className="font-display font-bold text-slate-800 text-2xl tracking-tight">Analytics Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure security, EMR database links, and custom clinical audit presets.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: AI Model Settings */}
        <div className="bg-white border border-slate-100 p-5 rounded-xl shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
            <Key className="w-5 h-5 text-blue-600" />
            <h3 className="font-display font-bold text-slate-800 text-sm">Google Gemini AI Connection</h3>
          </div>
          
          <div className="space-y-3">
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Provide your clinical-grade Gemini API key. AI Studio automatically injects standard runtime secrets, but you can override connection variables for specific cloud workloads.
            </p>
            
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter Gemini API Key (GEMINI_API_KEY)"
                className="w-full bg-[#f8fafc] border border-slate-200 focus:border-blue-500 focus:outline-none rounded-lg p-2.5 pl-3 pr-10 text-xs font-mono text-slate-700"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="flex items-center gap-1.5 text-[10px] text-blue-700 font-mono bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 self-start w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Key managed server-side. No browser leaks.</span>
            </div>
          </div>
        </div>

        {/* Section 2: EMR Core Connection */}
        <div className="bg-white border border-slate-100 p-5 rounded-xl shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
            <Database className="w-5 h-5 text-blue-500" />
            <h3 className="font-display font-bold text-slate-800 text-sm">EMR Server Integration</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                EMR Server REST Host URL
              </label>
              <input
                type="text"
                value={emrHost}
                onChange={(e) => setEmrHost(e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-200 focus:border-blue-500 focus:outline-none rounded-lg p-2.5 text-xs text-slate-700 font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Security Sync Status
              </label>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-lg h-[38px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-600 font-mono">Synced ({dbStatus})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Export & Compliance Configuration */}
        <div className="bg-white border border-slate-100 p-5 rounded-xl shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
            <FileText className="w-5 h-5 text-orange-500" />
            <h3 className="font-display font-bold text-slate-800 text-sm">Export & Print Settings</h3>
          </div>
          
          <div className="space-y-3.5">
            <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <div>
                <span className="text-xs font-semibold text-slate-800 block">Inject HIPPA / NABH Compliance Footers</span>
                <span className="text-[10px] text-slate-400">Append institutional data confidentiality codes automatically.</span>
              </div>
              <input
                type="checkbox"
                checked={exportComplianceHeader}
                onChange={(e) => setExportComplianceHeader(e.target.checked)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <div>
                <span className="text-xs font-semibold text-slate-800 block">Auto-Save Generated Report Layouts</span>
                <span className="text-[10px] text-slate-400">Record all natural language prompt creations automatically into histories.</span>
              </div>
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <div>
                <span className="text-xs font-semibold text-slate-800 block">Enable Cache Optimization Pools</span>
                <span className="text-[10px] text-slate-400">Accelerate routine daily reports using local cache layers.</span>
              </div>
              <input
                type="checkbox"
                checked={enableCache}
                onChange={(e) => setEnableCache(e.target.checked)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Visual Preferences */}
        <div className="bg-white border border-slate-100 p-5 rounded-xl shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
            <Palette className="w-5 h-5 text-violet-500" />
            <h3 className="font-display font-bold text-slate-800 text-sm">Visual Preferences & Layout</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Default Audit Dashboard Theme
              </label>
              <select className="w-full bg-[#f8fafc] border border-slate-200 focus:border-blue-500 focus:outline-none rounded-lg p-2 text-xs text-slate-600">
                <option value="light">Practice Cloud Light Theme (Standard)</option>
                <option value="dark">Practice Cloud Dark Mode (Eye-safe)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Report Font Sizing Family
              </label>
              <select className="w-full bg-[#f8fafc] border border-slate-200 focus:border-blue-500 focus:outline-none rounded-lg p-2 text-xs text-slate-600">
                <option value="inter">Inter Sans & JetBrains Mono (Modern)</option>
                <option value="outfit">Outfit Display (Tech Editorial)</option>
                <option value="serif">Playfair Clinical Serif</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Bottom Tray */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer flex items-center gap-2 transition-colors shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Persisting settings...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
