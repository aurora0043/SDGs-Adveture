import React, { useState } from 'react';
import { Map, Book, User, Leaf, Menu, X } from 'lucide-react';
import { ViewState, UserProgress } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  progress: UserProgress;
  level: number;
  percentage: number;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  setView, 
  progress, 
  level,
  percentage
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'MAP', label: '冒險地圖', icon: Map },
    { id: 'KNOWLEDGE', label: '知識圖鑑', icon: Book },
    { id: 'PROFILE', label: '冒險護照', icon: User },
  ];

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen w-screen bg-ocean-bg overflow-hidden font-sans">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (Desktop Fixed / Mobile Drawer) */}
      <aside className={`
          fixed md:static inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl border-r-4 border-nature-light h-full shadow-2xl md:shadow-xl rounded-r-[3rem] md:my-4 md:ml-4 md:h-[calc(100vh-2rem)] transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2.5 rounded-2xl text-white shadow-lg shadow-emerald-200 transform -rotate-6">
                <Leaf size={28} fill="currentColor" />
            </div>
            <h1 className="font-black text-2xl text-slate-700 tracking-tight">
                SDG <span className="text-emerald-500">島嶼</span>
            </h1>
          </div>
          {/* Close button for mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Stats Widget */}
        <div className="mx-6 p-5 bg-nature-light rounded-3xl border-2 border-dashed border-nature-mid mb-6 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 bg-yellow-200 w-16 h-16 rounded-full opacity-50"></div>
          
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <div className="w-12 h-12 rounded-full bg-white border-4 border-nature-mid flex items-center justify-center text-nature-dark font-black text-lg shadow-sm">
              {progress.userName.charAt(0)}
            </div>
            <div>
              <p className="font-black text-slate-700 text-lg">{progress.userName}</p>
              <p className="text-xs text-white font-bold bg-nature-mid px-2 py-0.5 rounded-full inline-block shadow-sm">
                等級 {level}
              </p>
            </div>
          </div>
          <div className="w-full bg-white h-4 rounded-full overflow-hidden border-2 border-white shadow-inner relative z-10">
            <div 
              className="bg-gradient-to-r from-lime-400 to-green-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-right text-xs text-nature-dark/70 font-bold mt-2">世界修復度 {percentage}%</p>
        </div>

        <nav className="flex-1 px-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id as ViewState)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 group
                ${currentView === item.id 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-105' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-emerald-500'
                }`}
            >
              <item.icon size={22} strokeWidth={2.5} className={`transition-transform duration-300 ${currentView === item.id ? 'animate-bounce' : 'group-hover:scale-110'}`} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 text-center">
             <div className="inline-block p-2 bg-slate-100 rounded-xl">
                <p className="text-[10px] text-slate-400 font-bold">SDG Adventure v1.0</p>
             </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-hidden relative flex flex-col bg-ocean-pattern">
        
        {/* Mobile Header */}
        <header className="md:hidden h-20 bg-white/80 backdrop-blur border-b border-emerald-100 flex items-center justify-between px-6 z-20 shadow-sm rounded-b-[2rem] flex-shrink-0">
           <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
              >
                <Menu size={28} strokeWidth={2.5} />
              </button>
              <span className="font-black text-xl text-slate-700">冒險島</span>
           </div>
           <div className="flex items-center gap-2">
               <span className="text-xs font-black bg-nature-light text-nature-dark px-3 py-1.5 rounded-full border border-nature-mid">Lv.{level}</span>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 relative">
           {children}
        </div>
      </main>
    </div>
  );
};