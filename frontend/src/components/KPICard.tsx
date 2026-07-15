import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  change?: string;
  type?: 'up' | 'down' | 'neutral';
  colorTheme?: 'blue' | 'orange' | 'green' | 'pink' | 'purple' | 'slate';
  emrStyle?: boolean; // If true, matches EMR colored left-border + solid circle right node
}

export default function KPICard({ 
  label, 
  value, 
  change, 
  type = 'neutral', 
  colorTheme = 'slate',
  emrStyle = false
}: KPICardProps) {
  // Theme styling dictionaries
  const borderStyles = {
    blue: 'border-l-4 border-l-blue-500',
    orange: 'border-l-4 border-l-orange-500',
    green: 'border-l-4 border-l-emerald-500',
    pink: 'border-l-4 border-l-rose-500',
    purple: 'border-l-4 border-l-violet-500',
    slate: 'border-l-4 border-l-slate-400'
  };

  const circleStyles = {
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    green: 'bg-emerald-500',
    pink: 'bg-rose-500',
    purple: 'bg-violet-500',
    slate: 'bg-slate-400'
  };

  // Custom trend badge for clean visualization
  const getTrendBadge = () => {
    if (!change) return null;
    
    switch (type) {
      case 'up':
        return (
          <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span>{change}</span>
          </span>
        );
      case 'down':
        return (
          <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-100/50 px-2 py-0.5 rounded-full">
            <TrendingDown className="w-3 h-3 text-rose-600" />
            <span>{change}</span>
          </span>
        );
      case 'neutral':
      default:
        return (
          <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200/50 px-2 py-0.5 rounded-full">
            <Minus className="w-3 h-3 text-slate-400" />
            <span>{change}</span>
          </span>
        );
    }
  };

  return (
    <div 
      className={`bg-white p-5 rounded-2xl border border-slate-200/80 flex items-center justify-between shadow-xs transition-all hover:border-slate-300 ${borderStyles[colorTheme] || 'border-l-4 border-l-slate-400'}`}
    >
      <div className="space-y-1.5">
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-sans">
          {label}
        </span>
        <span className="text-2xl font-sans font-extrabold text-slate-800 tracking-tight block">
          {value}
        </span>
        {change && (
          <div className="pt-0.5 block">
            {getTrendBadge()}
          </div>
        )}
      </div>
      
      {/* Solid colored circle node matching EMR screenshot style */}
      <div className={`w-8 h-8 rounded-full flex-shrink-0 opacity-80 ${circleStyles[colorTheme]}`} />
    </div>
  );
}
