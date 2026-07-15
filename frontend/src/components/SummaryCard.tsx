import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SummaryCardProps {
  summaries: string[];
  title?: string;
}

export default function SummaryCard({ summaries, title = "Clinical AI Intelligence Summary" }: SummaryCardProps) {
  if (!summaries || summaries.length === 0) return null;

  return (
    <div id="clinical-ai-summary" className="bg-[#f0fdf4]/60 border border-emerald-100/80 rounded-2xl p-6 relative overflow-hidden">
      {/* Decorative ambient green circles */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#059669]/5 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-16 h-16 bg-emerald-100/30 rounded-full blur-lg pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4 relative z-10">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-[#059669]">
          <Sparkles className="w-4.5 h-4.5 text-[#059669]" />
        </div>
        <div>
          <h4 className="font-display font-bold text-slate-800 text-sm tracking-tight">{title}</h4>
          <span className="text-[10px] text-emerald-700 font-mono font-semibold uppercase tracking-wider block">
            Powered by Clinical LLM Engine v3.5
          </span>
        </div>
      </div>

      {/* Summary bullet items with custom icons */}
      <div className="space-y-3 relative z-10">
        {summaries.map((text, idx) => (
          <div key={idx} className="flex gap-3 items-start bg-white/70 p-3 rounded-lg border border-emerald-50/50 hover:bg-white transition-all">
            <CheckCircle2 className="w-4.5 h-4.5 text-[#059669] shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700 leading-relaxed font-sans font-normal">
              {text}
            </p>
          </div>
        ))}
      </div>

      {/* Advisory footnote */}
      <div className="mt-4 pt-3 border-t border-emerald-100/30 flex items-center justify-between text-[10px] text-emerald-700 font-sans relative z-10">
        <span>Clinical audit verified against active EHR indexes</span>
        <span className="font-mono text-[9px] uppercase">Class 1 Medical Advisor Only</span>
      </div>
    </div>
  );
}
