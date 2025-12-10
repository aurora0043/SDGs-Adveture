import React from 'react';
import { Award, User, Star, Trash2 } from 'lucide-react';
import { UserProgress } from '../types';
import { SDG_DATA, TOTAL_ISLANDS } from '../constants';

interface ProfileProps {
  progress: UserProgress;
  level: number;
  resetGame: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ progress, level, resetGame }) => {
  const isEarthGuardian = progress.completedIslands.length === TOTAL_ISLANDS;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 mb-8 border border-slate-100">
        <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-4xl text-white font-bold shadow-xl border-4 border-white">
                {progress.userName.charAt(0)}
            </div>
            <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-black text-slate-800 mb-1">{progress.userName}</h2>
                <p className="text-slate-500 mb-4">加入時間：2024</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                        Level {level}
                    </span>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                        {progress.completedIslands.length} 徽章
                    </span>
                    {isEarthGuardian && (
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-sm">
                            <Award size={14} /> 地球守護者
                        </span>
                    )}
                </div>
            </div>
            
            <button 
                onClick={resetGame}
                className="flex items-center gap-2 text-slate-400 hover:text-red-500 text-sm font-medium px-4 py-2 hover:bg-red-50 rounded-lg transition-colors mt-4 md:mt-0"
            >
                <Trash2 size={16} /> 重置進度
            </button>
        </div>
      </div>

      {/* Earth Guardian Achievement */}
      {isEarthGuardian && (
          <div className="mb-8 p-1 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 rounded-2xl animate-pulse-slow">
              <div className="bg-white rounded-xl p-6 text-center">
                  <Award className="mx-auto text-yellow-500 mb-2 w-16 h-16" />
                  <h3 className="text-2xl font-black text-slate-800 mb-2">傳說成就：地球守護者</h3>
                  <p className="text-slate-600">恭喜！你已經完成了所有 17 個永續發展目標任務！</p>
              </div>
          </div>
      )}

      {/* Badges Cabinet */}
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Award className="text-yellow-500" /> 徽章收藏櫃
      </h3>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-8">
        {SDG_DATA.map((island) => {
            const hasBadge = progress.unlockedBadges.includes(island.id);
            return (
                <div key={island.id} className="aspect-square flex flex-col items-center justify-center">
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-sm border-2 transition-all
                        ${hasBadge 
                            ? `${island.color} border-white ring-2 ring-slate-100 scale-100` 
                            : 'bg-slate-100 border-slate-200 grayscale opacity-40 scale-90'
                        }
                    `}>
                        {hasBadge ? (
                            <span className="text-2xl md:text-3xl drop-shadow-md">🏅</span>
                        ) : (
                            <span className="text-slate-300">?</span>
                        )}
                    </div>
                    <span className="text-[10px] md:text-xs text-center mt-2 font-bold text-slate-500 truncate w-full px-1">
                        {hasBadge ? `SDG ${island.id}` : '未獲得'}
                    </span>
                </div>
            );
        })}
      </div>

      {/* Recent Activity (Mocked from progress) */}
      <h3 className="text-xl font-bold text-slate-800 mb-4">冒險日誌</h3>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
          {progress.completedIslands.length === 0 ? (
              <p className="text-slate-400 text-center py-4">尚未開始任何冒險...</p>
          ) : (
              progress.completedIslands.slice().reverse().map((id) => {
                  const island = SDG_DATA.find(i => i.id === id);
                  return (
                      <div key={id} className="flex items-center gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                          <div className={`w-10 h-10 rounded-full ${island?.color} flex items-center justify-center text-white font-bold text-xs`}>
                              {id}
                          </div>
                          <div>
                              <p className="text-slate-800 font-bold">完成了 {island?.title} 的所有任務</p>
                              <p className="text-xs text-slate-400">獲得了 {island?.location_name} 的守護徽章</p>
                          </div>
                      </div>
                  );
              })
          )}
      </div>
    </div>
  );
};