import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import GenerateReport from './pages/GenerateReport';
import SavedReports from './pages/SavedReports';
import ReportHistory from './pages/ReportHistory';
import Settings from './pages/Settings';
import { AnalyticsReport } from './types';
import { mockApi } from './data/mockApi';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [activeReport, setActiveReport] = useState<AnalyticsReport | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Core callback to invoke the mock natural language compiler
  const handleGenerateReport = async (prompt: string) => {
    // Transition viewport into the dedicated live Report screen
    setCurrentTab('generate');
    setIsGenerating(true);
    setActiveReport(null);

    try {
      const generated = await mockApi.generateReport(prompt);
      setActiveReport(generated);
    } catch (err) {
      console.error("Clinical extraction error:", err);
      alert("Failed to parse EMR schema. Please check configuration connections.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Callback to append a saved report template
  const handleSaveReportTemplate = async (prompt: string, title: string) => {
    try {
      await mockApi.saveReport({
        prompt,
        title,
        description: `Custom medical cohort spreadsheet auditing: "${prompt}".`,
        frequency: 'Weekly',
        lastGenerated: new Date().toISOString().replace('T', ' ').substring(0, 16)
      });
    } catch (err) {
      console.error("Failed to append template registry:", err);
    }
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    // If navigating away, reset the active compiled report view
    if (tab !== 'generate') {
      setActiveReport(null);
    }
  };

  const renderActiveTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <Dashboard 
            onGenerateReport={handleGenerateReport} 
            isGenerating={isGenerating} 
          />
        );
      case 'generate':
        return (
          <GenerateReport
            report={activeReport}
            onBackToDashboard={() => handleTabChange('dashboard')}
            onGenerateReport={handleGenerateReport}
            isGenerating={isGenerating}
            onSaveReportTemplate={handleSaveReportTemplate}
          />
        );
      case 'saved':
        return (
          <SavedReports 
            onRunReport={handleGenerateReport} 
          />
        );
      case 'history':
        return (
          <ReportHistory 
            onOpenReport={handleGenerateReport} 
          />
        );
      case 'settings':
        return (
          <Settings />
        );
      default:
        return (
          <Dashboard 
            onGenerateReport={handleGenerateReport} 
            isGenerating={isGenerating} 
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f8fafc] font-sans antialiased text-slate-800">
      {/* 1. Left Sidebar Navigation Panel (exactly matches core EMR spacing) */}
      <Sidebar 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
      />

      {/* 2. Main Workstation View Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header Tray */}
        <Header 
          onSearchSubmit={handleGenerateReport} 
          onNotificationClick={() => alert('EMR Notifications: All clinical metrics sync safely inside target HIPAA frameworks.')}
          onProfileClick={() => handleTabChange('settings')}
        />

        {/* Scrollable Viewport Stage */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto">
            {renderActiveTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
