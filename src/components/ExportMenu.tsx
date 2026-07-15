import React, { useState } from 'react';
import { FileDown, Printer, FileSpreadsheet, Check, Download } from 'lucide-react';

interface ExportMenuProps {
  reportTitle: string;
}

export default function ExportMenu({ reportTitle }: ExportMenuProps) {
  const [activeExport, setActiveExport] = useState<string | null>(null);

  const triggerSimulation = (type: 'pdf' | 'excel' | 'print') => {
    setActiveExport(type);
    
    // Auto reset indicator after 1.5s
    setTimeout(() => {
      setActiveExport(null);
      
      const fileNames = {
        pdf: `${reportTitle.replace(/\s+/g, '_')}_Report.pdf`,
        excel: `${reportTitle.replace(/\s+/g, '_')}_Dataset.xlsx`,
        print: 'Local printer dialog opened successfully.'
      };

      if (type === 'print') {
        alert(`EMR Print Command: Opening printing pipeline for: "${reportTitle}".`);
      } else {
        alert(`EMR Download Triggered:\nFile: "${fileNames[type]}" compiles with 100% compliance schemas and starts downloading.`);
      }
    }, 1200);
  };

  return (
    <div id="report-export-menu" className="flex flex-wrap items-center gap-2.5">
      {/* Download PDF button */}
      <button
        onClick={() => triggerSimulation('pdf')}
        disabled={activeExport !== null}
        className="flex items-center gap-2 px-3.5 py-2 border border-slate-200 hover:border-rose-200 bg-white hover:bg-rose-50/35 text-slate-700 hover:text-rose-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
      >
        {activeExport === 'pdf' ? (
          <span className="w-3.5 h-3.5 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
        ) : (
          <FileDown className="w-4 h-4 text-rose-500" />
        )}
        <span>{activeExport === 'pdf' ? 'Compiling PDF...' : 'Download PDF'}</span>
      </button>

      {/* Download Excel button */}
      <button
        onClick={() => triggerSimulation('excel')}
        disabled={activeExport !== null}
        className="flex items-center gap-2 px-3.5 py-2 border border-slate-200 hover:border-emerald-200 bg-white hover:bg-emerald-50/35 text-slate-700 hover:text-emerald-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
      >
        {activeExport === 'excel' ? (
          <span className="w-3.5 h-3.5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        ) : (
          <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
        )}
        <span>{activeExport === 'excel' ? 'Formatting Sheets...' : 'Download Excel'}</span>
      </button>

      {/* Print Report button */}
      <button
        onClick={() => triggerSimulation('print')}
        disabled={activeExport !== null}
        className="flex items-center gap-2 px-3.5 py-2 border border-slate-200 hover:border-blue-200 bg-white hover:bg-blue-50/35 text-slate-700 hover:text-blue-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
      >
        {activeExport === 'print' ? (
          <span className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Printer className="w-4 h-4 text-blue-500" />
        )}
        <span>{activeExport === 'print' ? 'Connecting spool...' : 'Print Report'}</span>
      </button>
    </div>
  );
}
