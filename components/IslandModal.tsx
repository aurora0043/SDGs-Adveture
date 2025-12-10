import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Upload, Send, Lock, Star, Trophy } from 'lucide-react';
import { SDGIsland, UserProgress } from '../types';

interface IslandModalProps {
  island: SDGIsland;
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onCompleteTask: (islandId: number, taskIndex: number) => void;
  onClaimReward: (islandId: number) => void;
}

export const IslandModal: React.FC<IslandModalProps> = ({
  island,
  isOpen,
  onClose,
  progress,
  onCompleteTask,
  onClaimReward,
}) => {
  const [loadingTask, setLoadingTask] = useState<number | null>(null);
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);

  const completedTaskIndices = progress.completedTasks[island.id] || [];
  const isIslandCompleted = progress.completedIslands.includes(island.id);
  const allTasksFinished = island.tasks.length === completedTaskIndices.length;

  useEffect(() => {
    if (isOpen && allTasksFinished && !isIslandCompleted) {
       // Trigger reward flow if tasks are done but reward not claimed
       const timer = setTimeout(() => {
           onClaimReward(island.id);
           setShowRewardAnimation(true);
       }, 500);
       return () => clearTimeout(timer);
    }
  }, [allTasksFinished, isIslandCompleted, isOpen, island.id, onClaimReward]);

  if (!isOpen) return null;

  const handleTaskClick = (index: number) => {
    if (completedTaskIndices.includes(index)) return;

    setLoadingTask(index);
    // Simulate API/Upload delay
    setTimeout(() => {
      onCompleteTask(island.id, index);
      setLoadingTask(null);
    }, 1000);
  };

  const getTaskIcon = (taskText: string) => {
    if (taskText.includes('拍') || taskText.includes('照片')) return <Upload size={18} />;
    if (taskText.includes('寫') || taskText.includes('輸入')) return <Send size={18} />;
    return <CheckCircle2 size={18} />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className={`h-32 ${island.color} relative flex items-center justify-center`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
          <div className="text-center text-white">
            <h2 className="text-3xl font-black tracking-wider drop-shadow-md">SDG {island.id}</h2>
            <p className="text-white/90 font-medium text-lg">{island.title}</p>
          </div>
          {/* Decorative shapes */}
          <div className="absolute bottom-0 left-0 w-full h-8 bg-white rounded-t-3xl"></div>
        </div>

        {/* Content */}
        <div className="p-6 pt-2 overflow-y-auto flex-1">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm font-bold uppercase tracking-wide">
                    <span className="bg-slate-100 px-2 py-1 rounded">Location</span>
                    {island.location_name}
                </div>
                <p className="text-slate-600 leading-relaxed text-sm bg-blue-50 p-3 rounded-xl border border-blue-100">
                    {island.knowledge.split('：')[0]}... <span className="text-xs text-slate-400 block mt-1">(完成任務解鎖完整知識)</span>
                </p>
            </div>

            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span>📋</span> 冒險任務
            </h3>
            
            <div className="space-y-3">
                {island.tasks.map((task, idx) => {
                    const isCompleted = completedTaskIndices.includes(idx);
                    const isLoading = loadingTask === idx;

                    return (
                        <button
                            key={idx}
                            disabled={isCompleted || isLoading || isIslandCompleted}
                            onClick={() => handleTaskClick(idx)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-start gap-3 group
                                ${isCompleted 
                                    ? 'border-green-500 bg-green-50 text-green-700' 
                                    : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50 bg-white'
                                }
                            `}
                        >
                            <div className={`mt-0.5 min-w-[24px] h-6 rounded-full flex items-center justify-center border transition-colors
                                ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 group-hover:border-blue-400'}
                            `}>
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                ) : (
                                    isCompleted ? <CheckCircle2 size={16} /> : getTaskIcon(task)
                                )}
                            </div>
                            <span className={`text-sm font-medium ${isCompleted ? 'line-through opacity-70' : ''}`}>
                                {task}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Reward State */}
            {isIslandCompleted && (
                <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-5 text-center animate-pop">
                    <div className="flex justify-center mb-2">
                        <Trophy className="text-yellow-500" size={40} />
                    </div>
                    <h4 className="font-bold text-yellow-800 text-lg">島嶼征服！</h4>
                    <p className="text-yellow-700 text-sm mb-3">你獲得了「{island.title}」徽章與知識卡</p>
                    <div className="p-3 bg-white rounded-lg text-left text-sm text-slate-600 border border-yellow-100 shadow-sm">
                        <strong className="block text-yellow-600 mb-1">💡 冷知識解鎖：</strong>
                        {island.knowledge}
                    </div>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
            <button onClick={onClose} className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold transition-colors">
                {isIslandCompleted ? '關閉' : '稍後再說'}
            </button>
        </div>

        {/* Confetti Overlay (CSS simulated) */}
        {showRewardAnimation && (
             <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
                 <div className="absolute inset-0 bg-yellow-400/20 animate-pulse"></div>
                 <Star className="absolute text-yellow-400 animate-bounce-slow top-1/4 left-1/4" size={40} />
                 <Star className="absolute text-blue-400 animate-bounce-slow top-1/3 right-1/4" size={30} style={{animationDelay: '0.5s'}} />
                 <Star className="absolute text-red-400 animate-bounce-slow bottom-1/3 left-1/3" size={50} style={{animationDelay: '1s'}} />
                 <div className="bg-white px-8 py-4 rounded-full shadow-xl z-50 animate-pop">
                     <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">
                         Level Up!
                     </span>
                 </div>
             </div>
        )}
      </div>
    </div>
  );
};