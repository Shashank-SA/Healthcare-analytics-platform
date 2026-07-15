import React from 'react';
import { 
  LayoutDashboard,
  Sparkles, 
  Bookmark, 
  History, 
  Settings as SettingsIcon,
  Plus
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ currentTab, onTabChange }: SidebarProps) {
  const analyticsItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'generate', label: 'Generate Report', icon: Sparkles },
    { id: 'saved', label: 'Saved Reports', icon: Bookmark },
    { id: 'history', label: 'Report History', icon: History },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside id="emr-sidebar" className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header: "+ Practice" */}
      <div className="h-16 px-6 border-b border-slate-100 flex items-center">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-[#059669] font-sans font-extrabold text-sm border border-emerald-100/60 shadow-2xs">
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Practice</span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        <div className="space-y-1.5">
          <div className="px-3 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
            <span>Healthcare Analytics</span>
          </div>
          
          <div className="space-y-1">
            {analyticsItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`sidebar-tab-${item.id}`}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#ecfdf5] text-[#047857]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#059669]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}


