import React from 'react';
import { Loader2, FolderOpen, AlertCircle, RefreshCw } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
}

export function LoadingScreen({ message = "Compiling clinical intelligence...", subMessage = "Aggregating ambulatory charts and calculating diagnostic statistics..." }: LoadingScreenProps) {
  return (
    <div id="analytics-loader" className="flex flex-col items-center justify-center p-16 bg-white border border-slate-100 rounded-2xl shadow-sm text-center">
      <div className="relative flex items-center justify-center w-16 h-16 mb-4">
        <Loader2 className="w-12 h-12 text-[#059669] animate-spin" />
        <div className="absolute w-6 h-6 rounded-full bg-emerald-100/50 flex items-center justify-center">
          <RefreshCw className="w-3.5 h-3.5 text-[#059669] animate-reverse-spin" />
        </div>
      </div>
      <h3 className="font-display font-semibold text-slate-800 text-lg mb-1">{message}</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto">{subMessage}</p>
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title = "No reports found", description = "Create a custom clinical extract by typing in the search bar above.", actionLabel, onAction }: EmptyStateProps) {
  return (
    <div id="analytics-empty-state" className="flex flex-col items-center justify-center p-12 bg-white border border-slate-100 rounded-2xl shadow-sm text-center">
      <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4">
        <FolderOpen className="w-6 h-6" />
      </div>
      <h3 className="font-display font-semibold text-slate-800 text-base mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-4">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-[#059669] hover:bg-[#047857] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({ title = "Clinical extraction failed", description = "There was an error compiling data fields. Please verify EMR server logs or review API key configurations.", onRetry }: ErrorStateProps) {
  return (
    <div id="analytics-error-state" className="flex flex-col items-center justify-center p-12 bg-rose-50/50 border border-rose-100 rounded-2xl shadow-sm text-center">
      <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="font-display font-semibold text-slate-800 text-base mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-4">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          Retry Search
        </button>
      )}
    </div>
  );
}
