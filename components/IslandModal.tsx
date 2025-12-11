import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Upload, Send, Star, Trophy, MapPin, ArrowRight, BookOpen } from 'lucide-react';
import { SDGIsland, UserProgress } from '../types';

interface IslandModalProps {
  island: SDGIsland;
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onCompleteTask: (islandId: number, taskIndex: number) => void;
  onClaimReward: (islandId: number) => void;
}

type ModalView = 'STORY' | 'TASKS' | 'COMPLETED';

export const IslandModal: React.FC<IslandModalProps> = ({
  island,
  isOpen,
  onClose,
  progress,
  onCompleteTask,
  onClaimReward,
}) => {
  const [viewMode, setViewMode] = useState<ModalView>('STORY');
  const [loadingTask, setLoadingTask] = useState<number | null>(null);
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);

  const completedTaskIndices = progress.completedTasks[island.id] || [];
  const isIslandCompleted = progress.completedIslands.includes(island.id);
  const allTasksFinished = island.tasks.length === completedTaskIndices.length;

  // Determine initial view based on status
  useEffect(() => {
    if (isOpen) {
        if (isIslandCompleted) {
            setViewMode('COMPLETED');
        } else if (allTasksFinished) {
            // Pending claim
            setViewMode('TASKS');
        } else {
            // New or in progress
            setViewMode('STORY');
        }
    }
  }, [isOpen, isIslandCompleted, allTasksFinished]);

  // Handle Auto-Claim when tasks finish
  useEffect(() => {
    if (viewMode === 'TASKS' && allTasksFinished && !isIslandCompleted) {
       const timer = setTimeout(() => {
           onClaimReward(island.id);
           setShowRewardAnimation(true);
           // After animation, switch to COMPLETED view to show knowledge
           setTimeout(() => setViewMode('COMPLETED'), 1500);
       }, 500);
       return () => clearTimeout(timer);
    }
  }, [viewMode, allTasksFinished, isIslandCompleted, island.id, onClaimReward]);

  if (!isOpen) return null;

  const handleTaskClick = (index: number) => {
    if (completedTaskIndices.includes(index)) return;

    setLoadingTask(index);
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
    <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop"
        onClick={onClose} // Click outside to close
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border-4 border-white"
        onClick={e => e.stopPropagation()} // Prevent close when clicking inside
      >
        
        {/* Header - Solid Color, No Waves */}
        <div className={`h-32 ${island.color} relative flex items-center justify-center flex-shrink-0`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors backdrop-blur-sm z-20"
          >
            <X size={28} strokeWidth={3} />
          </button>
          
          <div className="text-center text-white z-10 mt-2 px-4">
             <div className="bg-white/20 inline-block px-4 py-1 rounded-full text-xs md:text-sm font-black mb-1 backdrop-blur-sm">
                SDG {island.id}
             </div>
             <h2 className="text-2xl md:text-3xl font-black tracking-wide drop-shadow-md">{island.title}</h2>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="p-6 pt-2 overflow-y-auto flex-1">
            
            {/* Location Tag - Fixed spacing, removed negative margin */}
            <div className="flex justify-center mt-2 mb-6 relative z-10">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-md border-2 border-slate-100 flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <MapPin size={16} fill="currentColor" />
                    {island.location_name}
                </div>
            </div>

            {/* VIEW 1: STORY MODE */}
            {viewMode === 'STORY' && (
                <div className="animate-pop">
                    <h3 className="font-black text-xl text-slate-700 mb-4 text-center">冒險故事</h3>
                    <div className="bg-white p-5 rounded-3xl border-2 border-slate-100 shadow-sm leading-relaxed text-slate-600 text-justify mb-6 font-medium">
                        {island.story}
                    </div>
                    <button 
                        onClick={() => setViewMode('TASKS')}
                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        接受挑戰 <ArrowRight strokeWidth={3} />
                    </button>
                </div>
            )}

            {/* VIEW 2: TASK MODE */}
            {viewMode === 'TASKS' && (
                <div className="animate-pop">
                    <h3 className="font-black text-lg text-slate-700 mb-3 flex items-center gap-2 px-2">
                        <span className="text-xl">📋</span> 今日任務
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                        {island.tasks.map((task, idx) => {
                            const isCompleted = completedTaskIndices.includes(idx);
                            const isLoading = loadingTask === idx;

                            return (
                                <button
                                    key={idx}
                                    disabled={isCompleted || isLoading || isIslandCompleted}
                                    onClick={() => handleTaskClick(idx)}
                                    className={`w-full text-left p-4 rounded-2xl border-b-4 transition-all duration-300 flex items-center gap-4 group relative overflow-hidden
                                        ${isCompleted 
                                            ? 'border-emerald-200 bg-emerald-100 text-emerald-800' 
                                            : 'border-slate-200 bg-white hover:bg-emerald-50 hover:border-emerald-300'
                                        }
                                    `}
                                >
                                    <div className={`min-w-[32px] h-8 rounded-full flex items-center justify-center border-2 transition-colors z-10
                                        ${isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 bg-slate-50 group-hover:border-emerald-400'}
                                    `}>
                                        {isLoading ? (
                                            <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            isCompleted ? <CheckCircle2 size={18} strokeWidth={3} /> : getTaskIcon(task)
                                        )}
                                    </div>
                                    <span className={`text-sm font-bold z-10 ${isCompleted ? 'line-through opacity-70' : 'text-slate-700'}`}>
                                        {task}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    {/* Back to story button */}
                    <button 
                        onClick={() => setViewMode('STORY')}
                        className="w-full py-3 text-slate-400 hover:text-slate-600 font-bold text-sm"
                    >
                        回顧故事
                    </button>
                </div>
            )}

            {/* VIEW 3: COMPLETED / KNOWLEDGE MODE */}
            {viewMode === 'COMPLETED' && (
                <div className="animate-pop text-center">
                    <div className="inline-block bg-yellow-100 p-4 rounded-full mb-4 shadow-sm border-2 border-yellow-200">
                         <Trophy className="text-yellow-500" size={40} fill="currentColor" />
                    </div>
                    <h3 className="font-black text-2xl text-slate-800 mb-2">任務完成！</h3>
                    <p className="text-slate-500 font-bold mb-6">你獲得了新的知識碎片</p>

                    <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <BookOpen size={100} />
                        </div>
                        <h4 className="font-black text-emerald-700 mb-2 flex items-center gap-2">
                            SDG {island.id} 知識卡
                        </h4>
                        <p className="text-slate-700 leading-relaxed font-medium relative z-10">
                            {island.knowledge}
                        </p>
                    </div>

                    <div className="mt-8 flex gap-3">
                        <button onClick={() => setViewMode('STORY')} className="flex-1 py-3 bg-slate-100 rounded-xl text-slate-500 font-bold hover:bg-slate-200 transition-colors">
                            重看故事
                        </button>
                        <button onClick={onClose} className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-colors">
                            太棒了！
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* Reward Animation Overlay */}
        {showRewardAnimation && (
             <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50 overflow-hidden rounded-[2.5rem] bg-white/90 backdrop-blur-sm">
                 <Star className="absolute text-yellow-400 animate-bounce-slow top-1/4 left-1/4 drop-shadow-lg" size={60} fill="currentColor" />
                 <Star className="absolute text-emerald-400 animate-bounce-slow top-1/3 right-1/4 drop-shadow-lg" size={40} fill="currentColor" style={{animationDelay: '0.5s'}} />
                 <div className="bg-white px-10 py-8 rounded-3xl shadow-2xl z-50 animate-pop border-4 border-yellow-200 text-center transform rotate-3">
                     <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                         Level Up!
                     </span>
                     <p className="text-slate-400 font-bold mt-2">徽章入手</p>
                 </div>
             </div>
        )}
      </div>
    </div>
  );
};