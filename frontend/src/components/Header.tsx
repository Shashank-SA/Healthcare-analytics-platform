import React from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Languages, 
  Sun, 
  Menu,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  onSearchSubmit?: (query: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

export default function Header({ onSearchSubmit, onNotificationClick, onProfileClick }: HeaderProps) {
  const [searchVal, setSearchVal] = React.useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearchSubmit) {
      onSearchSubmit(searchVal);
    }
  };

  return (
    <header id="emr-header" className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40 shrink-0 select-none">
      {/* Left section: Hamburger & EMR Cloud Brand */}
      <div className="flex items-center gap-3">
        <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5 bg-emerald-50 text-[#059669] px-2.5 py-1.5 rounded-lg text-xs font-bold border border-emerald-100/60 shadow-2xs">
          <span className="text-sm font-black leading-none">+</span>
          <span className="font-sans font-extrabold tracking-tight">Cloud</span>
        </div>
      </div>

      {/* Middle section: Global EMR Search Bar */}
      <div className="flex-1 max-w-lg mx-6">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-[#f8fafc] hover:bg-slate-100/50 border border-slate-200 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] focus:outline-none rounded-full py-1.5 pl-10 pr-12 text-sm text-slate-800 placeholder-slate-400 font-sans transition-all"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
              ⌘ K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right section: System Status & Action Badges */}
      <div className="flex items-center gap-3">
        {/* Notifications Icon (with live indicator red dot) */}
        <button 
          onClick={onNotificationClick}
          className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
        >
          <Bell className="w-5 h-5 text-orange-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
        </button>

        {/* Support Icon */}
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer">
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Language Switch */}
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer">
          <Languages className="w-5 h-5" />
        </button>

        {/* Theme Settings */}
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer">
          <Sun className="w-5 h-5 text-amber-500" />
        </button>

        {/* User initials bubble ("SA" in a green circle) */}
        <button 
          onClick={onProfileClick}
          className="ml-2 w-9 h-9 rounded-full bg-[#e6f7f2] hover:bg-[#d0f2e8] border border-[#a7f3d0] text-[#047857] font-display font-bold text-sm flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#059669]"
        >
          SA
        </button>
      </div>
    </header>
  );
}

