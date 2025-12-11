import React from 'react';
import { Lock } from 'lucide-react';
import { SDG_DATA } from '../constants';
import { UserProgress } from '../types';

interface Props {
  progress: UserProgress;
}

export const KnowledgeGallery: React.FC<Props> = ({ progress }) => {
  const unlockedCount = progress.completedIslands.length;
  
  return (
    <div className="max-w-5xl mx-auto pb-24">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">知識圖鑑</h2>
        <div className="inline-block bg-white px-4 py-2 rounded-full border border-nature-mid shadow-sm">
            <p className="text-nature-dark font-bold text-sm">
                目前收集進度：<span className="text-lg">{unlockedCount}</span> / {SDG_DATA.length}
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SDG_DATA.map((island) => {
          const isUnlocked = progress.completedIslands.includes(island.id);

          return (
            <div 
                key={island.id}
                className={`flex rounded-[2rem] overflow-hidden border-4 transition-all duration-300 group
                    ${isUnlocked 
                        ? 'bg-white border-white shadow-lg hover:-translate-y-1' 
                        : 'bg-slate-50 border-slate-100 opacity-60'
                    }
                `}
            >
                <div className={`w-24 shrink-0 flex items-center justify-center relative
                    ${isUnlocked ? island.color : 'bg-slate-200'}
                `}>
                    {isUnlocked ? (
                        <span className="text-4xl drop-shadow-md">💡</span>
                    ) : (
                        <Lock className="text-slate-400" />
                    )}
                    
                    {/* Decorative dots if unlocked */}
                    {isUnlocked && (
                         <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full opacity-30"></div>
                    )}
                </div>
                
                <div className="p-5 flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-black text-lg ${isUnlocked ? 'text-slate-700' : 'text-slate-400'}`}>
                            {isUnlocked ? island.title : `SDG ${island.id} ???`}
                        </h4>
                    </div>
                    
                    {isUnlocked ? (
                        <p className="text-sm text-slate-600 font-medium leading-relaxed bg-emerald-50/50 p-2 rounded-xl">
                            {island.knowledge}
                        </p>
                    ) : (
                        <p className="text-xs text-slate-400 font-bold bg-slate-100 px-3 py-2 rounded-lg inline-block">
                            完成 {island.location_name} 解鎖
                        </p>
                    )}
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};