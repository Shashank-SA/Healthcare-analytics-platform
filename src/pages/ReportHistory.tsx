import React, { useState, useEffect } from 'react';
import { mockApi } from '../data/mockApi';
import { ReportHistoryItem } from '../types';
import { History, Eye, Trash2, Download, AlertCircle, CheckCircle, RefreshCcw, Clock } from 'lucide-react';
import { LoadingScreen, EmptyState } from '../components/States';

interface ReportHistoryProps {
  onOpenReport: (prompt: string) => void;
}

export default function ReportHistory({ onOpenReport }: ReportHistoryProps) {
  const [history, setHistory] = useState<ReportHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = async () => {
    setIsLoading(true);
    const data = await mockApi.getReportHistory();
    setHistory(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this report from the audit history logs?')) {
      const success = await mockApi.deleteReportHistory(id);
      if (success) {
        setHistory(prev => prev.filter(item => item.id !== id));
        alert('Report history record purged successfully.');
      }
    }
  };

  const handleDownload = (title: string) => {
    alert(`EMR Download Triggered:\nFile: "${title.replace(/\s+/g, '_')}_Archive.pdf" compiles and starts downloading.`);
  };

  if (isLoading) {
    return <LoadingScreen message="Accessing EMR compilation archives..." />;
  }

  return (
    <div id="analytics-history-page" className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-slate-800 text-2xl tracking-tight">Report History Logs</h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse and download historical analytical logs executed by clinicians.
          </p>
        </div>

        <button 
          onClick={fetchHistory}
          className="p-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          title="Reload history logs"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>

      {history.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc]/80 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Report Metadata</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Prompt Prompted</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Generated On</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Title */}
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                      <div className="flex items-center gap-2">
                        <History className="w-4 h-4 text-slate-400" />
                        <span>{item.title}</span>
                      </div>
                    </td>

                    {/* Prompt */}
                    <td className="px-6 py-4 text-xs font-mono text-blue-600 max-w-xs truncate">
                      "{item.prompt}"
                    </td>

                    {/* Generated Date */}
                    <td className="px-6 py-4 text-xs text-slate-400 font-sans">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {item.status === 'Success' ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold uppercase inline-flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-blue-600" />
                          Success
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100 text-[10px] font-bold uppercase inline-flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-rose-600" />
                          Failed
                        </span>
                      )}
                    </td>

                    {/* Action buttons */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {item.status === 'Success' && (
                          <>
                            <button
                              onClick={() => onOpenReport(item.prompt)}
                              className="p-1.5 border border-slate-100 hover:border-blue-200 rounded-lg hover:bg-blue-50/20 text-slate-500 hover:text-blue-600 cursor-pointer transition-colors"
                              title="Open Report layout"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDownload(item.title)}
                              className="p-1.5 border border-slate-100 hover:border-blue-200 rounded-lg hover:bg-blue-50/20 text-slate-500 hover:text-blue-600 cursor-pointer transition-colors"
                              title="Download Report PDF"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 border border-slate-100 hover:border-rose-100 rounded-lg hover:bg-rose-50/20 text-slate-400 hover:text-rose-600 cursor-pointer transition-colors"
                          title="Purge record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState 
          title="No history logs recorded" 
          description="Type and run natural language queries in the Dashboard to begin recording compilations."
        />
      )}
    </div>
  );
}
