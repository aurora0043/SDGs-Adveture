import React from 'react';
import { Lock, BookOpen } from 'lucide-react';
import { SDG_DATA } from '../constants';
import { UserProgress } from '../types';

interface Props {
  progress: UserProgress;
}

export const KnowledgeGallery: React.FC<Props> = ({ progress }) => {
  const unlockedCount = progress.completedIslands.length;
  
  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">知識圖鑑</h2>
        <p className="text-slate-500">收集知識卡片，成為 SDGs 專家。目前進度：{unlockedCount} / {SDG_DATA.length}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SDG_DATA.map((island) => {
          const isUnlocked = progress.completedIslands.includes(island.id);

          return (
            <div 
                key={island.id}
                className={`flex rounded-2xl overflow-hidden border-2 transition-all
                    ${isUnlocked 
                        ? 'bg-white border-slate-100 shadow-sm' 
                        : 'bg-slate-50 border-dashed border-slate-200 opacity-70'
                    }
                `}
            >
                <div className={`w-24 shrink-0 flex items-center justify-center
                    ${isUnlocked ? island.color : 'bg-slate-200'}
                `}>
                    {isUnlocked ? (
                        <span className="text-3xl">💡</span>
                    ) : (
                        <Lock className="text-slate-400" />
                    )}
                </div>
                
                <div className="p-4 flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-bold ${isUnlocked ? 'text-slate-800' : 'text-slate-400'}`}>
                            {isUnlocked ? island.title : `SDG ${island.id} (???)`}
                        </h4>
                    </div>
                    
                    {isUnlocked ? (
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {island.knowledge}
                        </p>
                    ) : (
                        <p className="text-xs text-slate-400 italic bg-slate-100 p-2 rounded">
                            完成 {island.location_name} 的任務以解鎖此卡片
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