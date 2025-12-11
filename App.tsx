import React, { useState, useEffect } from 'react';
import { ArrowRight, Leaf, Trees, Globe, Sparkles } from 'lucide-react';
import { useGamePersistence } from './hooks/useGamePersistence';
import { Layout } from './components/Layout';
import { IslandGrid } from './components/IslandGrid';
import { IslandModal } from './components/IslandModal';
import { KnowledgeGallery } from './components/KnowledgeGallery';
import { Profile } from './components/Profile';
import { SDGIsland, ViewState } from './types';
import { TOTAL_ISLANDS } from './constants';

function App() {
  const { 
    progress, 
    unlockIsland, 
    completeTask, 
    claimReward, 
    resetProgress,
    level,
    progressPercentage,
    isLoaded
  } = useGamePersistence();
  
  const [currentView, setCurrentView] = useState<ViewState>('LANDING');
  const [selectedIsland, setSelectedIsland] = useState<SDGIsland | null>(null);
  const [showFinalAnimation, setShowFinalAnimation] = useState(false);

  // Check for game completion
  useEffect(() => {
     if (isLoaded && progress.completedIslands.length === TOTAL_ISLANDS) {
         // Check if we haven't shown it this session, or check a flag. 
         // For now, let's just show it if they just completed the last one.
         // In a real app we'd store 'hasViewedEnding' in persistence.
         const justFinished = progress.completedIslands.length === TOTAL_ISLANDS;
         if (justFinished) {
             // Delay slightly to let the modal close
             setTimeout(() => setShowFinalAnimation(true), 2000);
         }
     }
  }, [progress.completedIslands.length, isLoaded]);

  if (!isLoaded) {
      return <div className="h-screen w-screen flex items-center justify-center bg-nature-light text-nature-dark font-bold text-xl">Loading...</div>;
  }

  const handleStartAdventure = () => {
    setCurrentView('MAP');
  };

  const handleIslandSelect = (island: SDGIsland) => {
    setSelectedIsland(island);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'MAP':
        return <IslandGrid progress={progress} onSelectIsland={handleIslandSelect} />;
      case 'KNOWLEDGE':
        return <KnowledgeGallery progress={progress} />;
      case 'PROFILE':
        return <Profile progress={progress} level={level} resetGame={resetProgress} />;
      default:
        return null;
    }
  };

  if (currentView === 'LANDING') {
    return (
      <div className="min-h-screen bg-[#ecfccb] relative overflow-hidden flex items-center justify-center p-4">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>

        <div className="bg-white/80 backdrop-blur-md rounded-[3rem] p-8 md:p-12 max-w-2xl w-full shadow-[0_20px_50px_rgba(8,112,24,0.15)] text-center relative z-10 border-4 border-white">
          
          <div className="relative inline-block mb-6">
             <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-25"></div>
             <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-5 rounded-full text-white shadow-lg animate-bounce-slow relative z-10">
                <Trees size={48} />
             </div>
          </div>
            
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
            SDG <span className="text-emerald-500">Adventure</span>
          </h1>
            
          <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto font-bold leading-relaxed">
            嗨！歡迎來到這片神奇的群島。<br/>
            這裡有 17 座綠色小島等著你去探索，<br/>
            讓我們一起完成任務，守護地球！
          </p>

          <div className="bg-green-50 p-6 rounded-3xl mb-8 border-2 border-green-100">
              <h3 className="font-bold text-emerald-700 mb-2 flex items-center justify-center gap-2">
                <Leaf size={18} />
                我們的任務
              </h3>
              <p className="text-sm text-emerald-800/70 font-medium">
                透過生活中的小行動，實踐聯合國 17 項永續發展目標，讓世界變得更可愛、更美好。
              </p>
          </div>

          <button 
            onClick={handleStartAdventure}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-slate-800 text-white rounded-full text-xl font-bold hover:bg-emerald-500 hover:scale-105 transition-all shadow-xl hover:shadow-emerald-200"
          >
            出發去冒險
            <ArrowRight className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
          </button>
            
          {progress.completedIslands.length > 0 && (
              <p className="mt-6 text-xs text-slate-400 font-bold bg-white px-4 py-2 rounded-full inline-block shadow-sm">
                  歡迎回來，{progress.userName}！ (Lv.{level})
              </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <Layout 
        currentView={currentView} 
        setView={setCurrentView} 
        progress={progress}
        level={level}
        percentage={progressPercentage}
    >
      {renderContent()}

      {selectedIsland && (
        <IslandModal 
          island={selectedIsland}
          isOpen={!!selectedIsland}
          onClose={() => setSelectedIsland(null)}
          progress={progress}
          onCompleteTask={completeTask}
          onClaimReward={claimReward}
        />
      )}

      {/* FINAL ACHIEVEMENT ANIMATION */}
      {showFinalAnimation && (
        <div className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-800 via-emerald-950 to-black flex flex-col items-center justify-center text-white p-4 animate-[fadeIn_2s_ease-out]">
            <div className="relative w-full h-full max-w-lg max-h-[800px] flex flex-col items-center justify-center">
                
                {/* Earth Animation */}
                <div className="relative mb-12">
                     <div className="absolute inset-0 bg-emerald-500 rounded-full blur-[100px] animate-pulse"></div>
                     <Globe size={200} className="text-emerald-400 animate-[spin_10s_linear_infinite]" strokeWidth={1} />
                     <Sparkles size={80} className="absolute top-0 right-0 text-yellow-300 animate-bounce" />
                     <Sparkles size={60} className="absolute bottom-10 left-0 text-white animate-bounce-slow" />
                </div>

                <div className="text-center space-y-6 relative z-10 animate-[slideUp_1s_ease-out_1s_both]">
                    <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200 drop-shadow-lg">
                        地球公民<br/>覺醒
                    </h2>
                    <div className="h-1 w-32 bg-emerald-500 mx-auto rounded-full"></div>
                    <p className="text-xl md:text-2xl font-bold text-slate-300 max-w-md mx-auto leading-relaxed">
                        恭喜你！你已從一名冒險者，<br/>覺醒為真正的地球守護者！
                    </p>
                    <p className="text-emerald-400 font-medium">未來的路，讓我們繼續同行。</p>
                </div>

                <button 
                    onClick={() => setShowFinalAnimation(false)}
                    className="mt-12 px-10 py-4 bg-white text-emerald-900 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                    繼續旅程
                </button>
            </div>
        </div>
      )}
    </Layout>
  );
}

export default App;