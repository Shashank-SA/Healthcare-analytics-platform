import React, { useState, useEffect } from 'react';
import { mockApi } from '../data/mockApi';
import { SavedReport } from '../types';
import { Bookmark, Play, Trash2, Calendar, Clock, RefreshCcw } from 'lucide-react';
import { LoadingScreen, EmptyState } from '../components/States';

interface SavedReportsProps {
  onRunReport: (prompt: string) => void;
}

export default function SavedReports({ onRunReport }: SavedReportsProps) {
  const [reports, setReports] = useState<SavedReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReports = async () => {
    setIsLoading(true);
    const data = await mockApi.getSavedReports();
    setReports(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this saved clinical template?')) {
      const success = await mockApi.deleteSavedReport(id);
      if (success) {
        setReports(prev => prev.filter(r => r.id !== id));
        alert('Saved template removed from database indexes successfully.');
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen message="Accessing saved EMR report layouts..." />;
  }

  return (
    <div id="analytics-saved-reports-page" className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-slate-800 text-2xl tracking-tight">Saved Reports</h1>
          <p className="text-sm text-slate-500 mt-1">
            Prompts you've pinned or scheduled — run them on demand.
          </p>
        </div>

        <button 
          onClick={fetchReports}
          className="p-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          title="Reload registry"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {reports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc]/80 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Saved Prompt</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Frequency</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Last Generated</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((report) => {
                  // Style for frequency pills matching Image 5
                  let freqStyle = "bg-[#f1f5f9] text-[#475569] border border-slate-200/50";
                  if (report.frequency.toLowerCase() === 'weekly') {
                    freqStyle = "bg-[#ecfdf5] text-[#047857] border border-emerald-200/50";
                  } else if (report.frequency.toLowerCase() === 'monthly') {
                    freqStyle = "bg-[#f3e8ff] text-[#6d28d9] border border-purple-200/50";
                  }

                  return (
                    <tr key={report.id} className="hover:bg-slate-50/50 transition-all">
                      {/* Saved Prompt */}
                      <td className="px-6 py-4 max-w-sm">
                        <div className="space-y-0.5">
                          <span className="font-sans font-bold text-slate-800 text-sm block tracking-tight">
                            {report.title}
                          </span>
                          <span className="font-mono text-[11px] text-slate-400 italic block">
                            "{report.prompt}"
                          </span>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="px-6 py-4 text-xs text-slate-500 font-sans leading-relaxed max-w-xs">
                        {report.description}
                      </td>

                      {/* Frequency */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-sans ${freqStyle}`}>
                          {report.frequency}
                        </span>
                      </td>

                      {/* Last Generated */}
                      <td className="px-6 py-4 text-xs text-slate-400 font-sans">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{report.lastGenerated}</span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onRunReport(report.prompt)}
                            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all hover:border-slate-300"
                          >
                            <Play className="w-3 h-3 fill-slate-700 stroke-none" />
                            <span>Run Again</span>
                          </button>
                          
                          <button
                            onClick={() => handleDelete(report.id)}
                            className="p-1.5 border border-slate-100 hover:border-rose-100 rounded-lg hover:bg-rose-50/20 text-slate-400 hover:text-rose-600 cursor-pointer transition-colors"
                            title="Delete template"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState 
            title="No saved report templates" 
            description="Click 'Save Report Layout' when viewing a generated clinical extract to append items here."
          />
        )}
      </div>
    </div>
  );
}
