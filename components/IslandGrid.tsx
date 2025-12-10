import React from 'react';
import { Lock, Check, MapPin } from 'lucide-react';
import { SDG_DATA } from '../constants';
import { UserProgress, SDGIsland } from '../types';

interface IslandGridProps {
  progress: UserProgress;
  onSelectIsland: (island: SDGIsland) => void;
}

export const IslandGrid: React.FC<IslandGridProps> = ({ progress, onSelectIsland }) => {
  return (
    <div className="w-full max-w-6xl mx-auto pb-20">
      <div className="mb-6 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">冒險地圖</h2>
        <p className="text-slate-500">選擇一座島嶼開始你的永續發展任務。</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {SDG_DATA.map((island) => {
          const isUnlocked = progress.unlockedIslands.includes(island.id);
          const isCompleted = progress.completedIslands.includes(island.id);
          const inProgress = isUnlocked && !isCompleted;

          return (
            <button
              key={island.id}
              disabled={!isUnlocked}
              onClick={() => onSelectIsland(island)}
              className={`
                relative group flex flex-col aspect-[4/5] rounded-3xl overflow-hidden shadow-lg transition-all duration-300
                ${isUnlocked 
                  ? 'hover:scale-105 hover:shadow-2xl cursor-pointer ring-4 ring-white' 
                  : 'opacity-60 cursor-not-allowed grayscale filter ring-0'
                }
              `}
            >
              {/* Card Background */}
              <div className={`flex-1 w-full ${island.color} flex items-center justify-center p-4 relative`}>
                 {/* Status Icons */}
                 <div className="absolute top-3 right-3 z-10">
                    {isCompleted && (
                        <div className="bg-white text-green-600 rounded-full p-1.5 shadow-sm">
                            <Check size={18} strokeWidth={3} />
                        </div>
                    )}
                    {!isUnlocked && (
                        <div className="bg-black/20 text-white rounded-full p-1.5">
                            <Lock size={18} />
                        </div>
                    )}
                 </div>

                 {/* Island Number */}
                 <span className="text-9xl font-black text-white/20 absolute -bottom-10 -left-6 select-none">
                     {island.id}
                 </span>
                 
                 {/* Main Icon/Illustration Placeholder */}
                 <div className="text-white text-center z-10">
                     <div className="bg-white/20 backdrop-blur-sm rounded-2xl w-16 h-16 mx-auto mb-2 flex items-center justify-center text-2xl">
                        🏝️
                     </div>
                 </div>
              </div>

              {/* Card Footer */}
              <div className="h-1/3 w-full bg-white p-4 flex flex-col justify-between text-left relative z-20">
                  <div>
                    <h3 className="font-bold text-slate-800 leading-tight mb-1 line-clamp-2">
                        {island.title}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        <MapPin size={12} />
                        {island.location_name}
                    </p>
                  </div>
                  
                  {inProgress && (
                      <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div className="bg-yellow-400 h-full w-1/2 animate-pulse"></div>
                      </div>
                  )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};