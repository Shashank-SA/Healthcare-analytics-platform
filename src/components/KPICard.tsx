import React from 'react';
import { 
  Users, 
  Stethoscope, 
  Activity, 
  Pill, 
  Syringe, 
  FlaskConical,
  Minus 
} from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  change?: string;
  type?: 'up' | 'down' | 'neutral';
  colorTheme?: 'blue' | 'orange' | 'green' | 'pink' | 'purple' | 'slate';
  emrStyle?: boolean; // Kept for backward compatibility
}

export default function KPICard({ 
  label, 
  value, 
  change, 
  type = 'neutral', 
  colorTheme = 'slate',
  emrStyle = false
}: KPICardProps) {
  // Theme styling mapping for vertical left borders
  const borderStyles = {
    blue: 'border-l-4 border-l-teal-500',
    orange: 'border-l-4 border-l-blue-500',
    purple: 'border-l-4 border-l-indigo-500',
    green: 'border-l-4 border-l-pink-500',
    pink: 'border-l-4 border-l-emerald-500',
    slate: 'border-l-4 border-l-amber-500'
  };

  // Soft circle container styling mapping
  const circleStyles = {
    blue: 'bg-teal-50 text-teal-600 border border-teal-100',
    orange: 'bg-blue-50 text-blue-600 border border-blue-100',
    purple: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    green: 'bg-pink-50 text-pink-600 border border-pink-100',
    pink: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    slate: 'bg-amber-50 text-amber-600 border border-amber-100'
  };

  // Map theme to appropriate icon
  const getIcon = () => {
    switch (colorTheme) {
      case 'blue':
        return <Users className="w-5 h-5 text-teal-500" />;
      case 'orange':
        return <Stethoscope className="w-5 h-5 text-blue-500" />;
      case 'purple':
        return <Activity className="w-5 h-5 text-indigo-500" />;
      case 'green':
        return <Pill className="w-5 h-5 text-pink-500" />;
      case 'pink':
        return <Syringe className="w-5 h-5 text-emerald-500" />;
      case 'slate':
        return <FlaskConical className="w-5 h-5 text-amber-500" />;
      default:
        return <Activity className="w-5 h-5 text-slate-500" />;
    }
  };

  const getTrendIndicator = () => {
    if (!change) return null;
    
    // Split on " vs " to isolate percentage
    const parts = change.split(' vs ');
    const percentPart = parts[0].replace('+', '').replace('-', '');
    const suffixPart = parts[1] ? `vs ${parts[1]}` : 'vs last month';
    
    const isUp = type === 'up';
    const isDown = type === 'down';
    
    const sign = isUp ? '+' : isDown ? '-' : '';
    const colorClass = isUp 
      ? 'text-emerald-500 font-bold' 
      : isDown 
      ? 'text-rose-500 font-bold' 
      : 'text-slate-500 font-medium';
      
    return (
      <div className="text-[11px] font-sans flex items-center gap-1 select-none">
        <span className={colorClass}>
          ~ {sign}{percentPart}
        </span>
        <span className="text-slate-400 font-medium">
          {suffixPart}
        </span>
      </div>
    );
  };

  return (
    <div 
      className={`bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between shadow-2xs hover:shadow-xs transition-all hover:border-slate-300/90 ${borderStyles[colorTheme] || 'border-l-4 border-l-slate-400'}`}
    >
      <div className="space-y-1">
        <span className="text-[11px] font-medium text-slate-500 font-sans block select-none">
          {label}
        </span>
        <span className="text-2xl font-sans font-bold text-slate-800 tracking-tight block select-none">
          {value}
        </span>
        {change && (
          <div className="pt-0.5 block">
            {getTrendIndicator()}
          </div>
        )}
      </div>
      
      {/* Soft colored circle with high-fidelity EMR icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${circleStyles[colorTheme] || 'bg-slate-50 text-slate-500 border border-slate-200'}`}>
        {getIcon()}
      </div>
    </div>
  );
}
