import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown, Search } from 'lucide-react';

interface ReportTableProps {
  headers: string[];
  rows: any[][];
  title?: string;
  maxRowsPerPage?: number;
}

export default function ReportTable({ 
  headers, 
  rows, 
  title = "Clinical Records Ledger", 
  maxRowsPerPage = 5 
}: ReportTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ keyIndex: number; direction: 'asc' | 'desc' } | null>(null);

  if (!headers || headers.length === 0) return null;

  // Filter rows based on search query across any cell value
  const filteredRows = rows.filter(row => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return row.some(cell => {
      if (cell === null || cell === undefined) return false;
      return String(cell).toLowerCase().includes(lowerQuery);
    });
  });

  // Sort rows if sortConfig is active
  const sortedRows = [...filteredRows];
  if (sortConfig !== null) {
    sortedRows.sort((a, b) => {
      const aVal = a[sortConfig.keyIndex];
      const bVal = b[sortConfig.keyIndex];
      
      if (aVal === bVal) return 0;
      
      const multiplier = sortConfig.direction === 'asc' ? 1 : -1;
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * multiplier;
      }
      return String(aVal).localeCompare(String(bVal)) * multiplier;
    });
  }

  // Calculate Pagination bounds
  const totalRows = sortedRows.length;
  const totalPages = Math.ceil(totalRows / maxRowsPerPage) || 1;
  const startIndex = (currentPage - 1) * maxRowsPerPage;
  const paginatedRows = sortedRows.slice(startIndex, startIndex + maxRowsPerPage);

  const handleSort = (index: number) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.keyIndex === index && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ keyIndex: index, direction });
    setCurrentPage(1);
  };

  const getStatusBadge = (value: string) => {
    const val = String(value).trim().toLowerCase();
    const commonClasses = "px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center border";

    if (val === 'completed' || val === 'normal' || val.includes('goal exceeded')) {
      return <span className={`${commonClasses} bg-emerald-50 text-emerald-700 border-emerald-100`}>{value}</span>;
    }
    if (val === 'scheduled' || val === 'upcoming' || val.includes('stable')) {
      return <span className={`${commonClasses} bg-blue-50 text-blue-700 border-blue-100`}>{value}</span>;
    }
    if (val === 'in progress' || val === 'due soon' || val.includes('improvement')) {
      return <span className={`${commonClasses} bg-orange-50 text-orange-700 border-orange-100`}>{value}</span>;
    }
    if (val === 'missed' || val === 'overdue' || val === 'critical' || val.includes('attention') || val === 'abnormal') {
      return <span className={`${commonClasses} bg-rose-50 text-rose-700 border-rose-100`}>{value}</span>;
    }
    return <span>{value}</span>;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      {/* Table Action Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="font-display font-bold text-slate-800 text-sm tracking-tight">{title}</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Showing {startIndex + 1}–{Math.min(startIndex + maxRowsPerPage, totalRows)} of {totalRows} records</p>
        </div>

        {/* Quick table filter search */}
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            placeholder="Filter table records..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-[#f8fafc] hover:bg-slate-50 border border-slate-200 focus:border-blue-500 focus:outline-none rounded-lg py-1.5 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 transition-colors"
          />
        </div>
      </div>

      {/* Main Table Interface */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8fafc]/80 border-b border-slate-100">
              {headers.map((header, idx) => (
                <th 
                  key={idx} 
                  onClick={() => handleSort(idx)}
                  className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100/55 transition-colors select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{header}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors">
                  {row.map((cell, cIdx) => {
                    const cellStr = String(cell);
                    const isStatus = cellStr.toLowerCase() === 'completed' || 
                                     cellStr.toLowerCase() === 'scheduled' || 
                                     cellStr.toLowerCase() === 'in progress' || 
                                     cellStr.toLowerCase() === 'missed' ||
                                     cellStr.toLowerCase() === 'overdue' ||
                                     cellStr.toLowerCase() === 'due soon' ||
                                     cellStr.toLowerCase() === 'upcoming' ||
                                     cellStr.toLowerCase() === 'normal' ||
                                     cellStr.toLowerCase() === 'abnormal' ||
                                     cellStr.toLowerCase() === 'critical' ||
                                     cellStr.includes('✓') ||
                                     cellStr.includes('✖') ||
                                     cellStr.includes('⚠');

                    return (
                      <td key={cIdx} className="px-6 py-3.5 text-sm font-medium text-slate-700 font-sans">
                        {isStatus ? getStatusBadge(cellStr) : cell}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="px-6 py-12 text-center text-sm text-slate-400 font-sans">
                  No matching clinical rows found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="p-4 border-t border-slate-100 bg-[#f8fafc]/30 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-sans">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="p-1.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="p-1.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
