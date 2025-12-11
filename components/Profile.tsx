import React from 'react';
import { Award, Trash2, Sprout } from 'lucide-react';
import { UserProgress } from '../types';
import { SDG_DATA, TOTAL_ISLANDS } from '../constants';
import { getSDGIcon } from './IslandGrid';

interface ProfileProps {
  progress: UserProgress;
  level: number;
  resetGame: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ progress, level, resetGame }) => {
  const isEarthGuardian = progress.completedIslands.length === TOTAL_ISLANDS;

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Profile Header */}
      <div className="bg-white/80 backdrop-blur rounded-[2.5rem] shadow-sm p-6 md:p-10 mb-8 border-2 border-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-nature-light rounded-bl-full opacity-50"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="w-24 h-24 rounded-full bg-nature-light border-4 border-nature-mid flex items-center justify-center text-4xl text-nature-dark font-black shadow-lg">
                {progress.userName.charAt(0)}
            </div>
            <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-black text-slate-800 mb-1 flex items-center justify-center md:justify-start gap-2">
                    {progress.userName}
                    <Sprout className="text-nature-mid" size={24} />
                </h2>
                <p className="text-slate-500 font-bold mb-4">加入時間：2024 冒險年</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-black border border-emerald-200">
                        Level {level}
                    </span>
                    <span className="bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-black border border-yellow-200">
                        {progress.completedIslands.length} 徽章
                    </span>
                </div>
            </div>
            
            <button 
                onClick={resetGame}
                className="flex items-center gap-2 text-slate-400 hover:text-red-500 text-sm font-bold px-4 py-2 hover:bg-red-50 rounded-xl transition-colors mt-4 md:mt-0"
            >
                <Trash2 size={16} /> 重置進度
            </button>
        </div>
      </div>

      {/* Earth Guardian Achievement */}
      {isEarthGuardian && (
          <div className="mb-8 p-1 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 rounded-[2rem] animate-pulse-slow">
              <div className="bg-white rounded-[1.8rem] p-6 text-center border-4 border-transparent bg-clip-padding">
                  <Award className="mx-auto text-yellow-500 mb-2 w-16 h-16" fill="currentColor" />
                  <h3 className="text-2xl font-black text-slate-800 mb-2">傳說成就：地球守護者</h3>
                  <p className="text-slate-600 font-bold">恭喜！你已經完成了所有 17 個永續發展目標任務！</p>
              </div>
          </div>
      )}

      {/* Badges Cabinet */}
      <h3 className="text-xl font-black text-slate-700 mb-4 flex items-center gap-2 px-2">
          <Award className="text-yellow-500" fill="currentColor" /> 徽章收藏櫃
      </h3>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-8 bg-white/50 p-6 rounded-[2rem]">
        {SDG_DATA.map((island) => {
            const hasBadge = progress.unlockedBadges.includes(island.id);
            return (
                <div key={island.id} className="aspect-square flex flex-col items-center justify-center p-2">
                    <div className={`
                        w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-md transition-all duration-500 relative
                        ${hasBadge 
                            ? 'bg-white border-4 border-emerald-500 ring-2 ring-yellow-200 scale-100 rotate-0' 
                            : 'bg-slate-200 border-4 border-slate-300 grayscale opacity-40 scale-90 rotate-6'
                        }
                    `}>
                        {hasBadge ? (
                            <div className="text-emerald-500">
                                {getSDGIcon(island.id, 32)}
                                <div className="absolute -bottom-2 right-[-8px] bg-yellow-400 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                                    {island.id}
                                </div>
                            </div>
                        ) : (
                            <span className="text-slate-400 font-black text-xl">?</span>
                        )}
                    </div>
                </div>
            );
        })}
      </div>

      {/* Recent Activity */}
      <h3 className="text-xl font-black text-slate-700 mb-4 px-2">冒險日誌</h3>
      <div className="bg-white rounded-[2rem] shadow-sm border border-emerald-100 p-6 space-y-4">
          {progress.completedIslands.length === 0 ? (
              <p className="text-slate-400 font-bold text-center py-8 bg-slate-50 rounded-2xl">尚未開始任何冒險...</p>
          ) : (
              progress.completedIslands.slice().reverse().map((id) => {
                  const island = SDG_DATA.find(i => i.id === id);
                  return (
                      <div key={id} className="flex items-center gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                          <div className={`w-12 h-12 rounded-2xl ${island?.color} flex items-center justify-center text-white font-black text-sm shadow-md`}>
                              {id}
                          </div>
                          <div>
                              <p className="text-slate-700 font-bold text-sm md:text-base">完成了 {island?.title} 的所有任務</p>
                              <p className="text-xs text-slate-400 font-bold mt-0.5">獲得了 {island?.location_name} 的守護徽章</p>
                          </div>
                      </div>
                  );
              })
          )}
      </div>
    </div>
  );
};