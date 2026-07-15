import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface PromptBoxProps {
  onSubmit: (prompt: string) => void;
  isGenerating: boolean;
  initialPrompt?: string;
}

export default function PromptBox({ onSubmit, isGenerating, initialPrompt = '' }: PromptBoxProps) {
  const [prompt, setPrompt] = useState(initialPrompt);

  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onSubmit(prompt.trim());
    }
  };

  const suggestions = [
    'Show patient visits today',
    'Top diagnoses this month',
    'Medication usage trends',
    'Vaccination due report',
    'Monthly clinical summary',
    'Blood pressure trends',
    'Most active doctors'
  ];

  return (
    <div className="space-y-6">
      {/* Main card */}
      <div id="clinical-prompt-box" className="bg-white rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-center gap-2 px-6 pt-5 pb-3">
            <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center text-[#059669]">
              <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
            </div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest font-sans">
              Natural Language Prompt
            </span>
          </div>

          {/* Text Area */}
          <div className="px-6 pb-2">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
              placeholder="Ask anything about your clinical data..."
              rows={3}
              className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-slate-700 placeholder-slate-400 font-sans text-sm sm:text-base leading-relaxed resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Bottom Bar */}
          <div className="px-6 py-4 flex items-center justify-between bg-white">
            <span className="text-xs text-slate-400 font-sans">
              Powered by AI · patient data stays inside your EMR
            </span>
            
            <button
              type="submit"
              disabled={isGenerating}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                prompt.trim() && !isGenerating
                  ? 'bg-[#059669] hover:bg-[#047857] text-white shadow-xs'
                  : 'bg-[#a7f3d0] text-white cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <ArrowRight className="w-4.5 h-4.5" />
                  <span>Generate Report</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Preset Suggestions Row (Outside of Card) */}
      <div className="space-y-3">
        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest block font-sans">
          TRY ONE OF THESE
        </span>
        <div className="flex flex-wrap gap-2.5">
          {suggestions.map((text, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!isGenerating) {
                  setPrompt(text);
                  onSubmit(text);
                }
              }}
              disabled={isGenerating}
              className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 transition-all cursor-pointer hover:border-slate-300"
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

