import React from 'react';
import { Map, Book, User, Menu, Compass } from 'lucide-react';
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
  const navItems = [
    { id: 'MAP', label: '世界地圖', icon: Map },
    { id: 'KNOWLEDGE', label: '知識圖鑑', icon: Book },
    { id: 'PROFILE', label: '會員中心', icon: User },
  ];

  return (
    <div className="flex h-screen w-screen bg-sky-50 overflow-hidden">
      {/* Sidebar (Desktop) / Bottom Nav (Mobile) */}
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-full shadow-lg z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Compass size={28} />
          </div>
          <h1 className="font-black text-xl text-slate-800 tracking-tight">SDG 冒險島</h1>
        </div>

        {/* User Stats Widget */}
        <div className="mx-4 p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
              {progress.userName.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-slate-700">{progress.userName}</p>
              <p className="text-xs text-slate-500 font-bold bg-yellow-200 px-2 py-0.5 rounded-full inline-block text-yellow-800">
                Lv. {level}
              </p>
            </div>
          </div>
          <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-indigo-100">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-right text-xs text-slate-400 mt-1">{percentage}% 完成</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewState)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all
                ${currentView === item.id 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                  : 'text-slate-500 hover:bg-slate-100'
                }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 text-center">
            <p className="text-xs text-slate-400">© 2024 SDG Adventure</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-hidden relative flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-20 shadow-sm">
           <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <Compass size={20} />
              </div>
              <span className="font-black text-lg text-slate-800">SDG Adventure</span>
           </div>
           <div className="flex items-center gap-2">
               <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Lv.{level}</span>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 relative">
           {children}
        </div>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden bg-white border-t border-slate-200 flex justify-around p-2 pb-safe z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
           {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewState)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg flex-1 transition-colors
                ${currentView === item.id 
                  ? 'text-indigo-600' 
                  : 'text-slate-400'
                }`}
            >
              <item.icon size={24} strokeWidth={currentView === item.id ? 2.5 : 2} />
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};