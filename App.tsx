import React, { useState } from 'react';
import { ArrowRight, Globe } from 'lucide-react';
import { useGamePersistence } from './hooks/useGamePersistence';
import { Layout } from './components/Layout';
import { IslandGrid } from './components/IslandGrid';
import { IslandModal } from './components/IslandModal';
import { KnowledgeGallery } from './components/KnowledgeGallery';
import { Profile } from './components/Profile';
import { SDGIsland, ViewState } from './types';

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

  if (!isLoaded) {
      return <div className="h-screen w-screen flex items-center justify-center bg-sky-50 text-indigo-500">Loading...</div>;
  }

  // Determine if we should show landing page (if no progress) or auto-switch
  // If user has progress (level > 1 or completed tasks), we might skip landing, 
  // but for UX let's keep landing until they click Start if they are on LANDING view.
  
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 max-w-2xl w-full shadow-2xl text-center relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-yellow-400 via-red-400 to-blue-400"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative z-10">
            <div className="inline-block p-4 rounded-full bg-indigo-50 mb-6 animate-bounce-slow">
              <Globe className="text-indigo-600 w-16 h-16" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-4 tracking-tight">
              SDG <span className="text-indigo-600">Adventure</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-8 max-w-lg mx-auto leading-relaxed">
              開啟改變世界的旅程！探索 17 座神祕島嶼，完成永續挑戰，成為守護地球的英雄。
            </p>

            <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
               <h3 className="font-bold text-slate-700 mb-2">什麼是 SDGs？</h3>
               <p className="text-sm text-slate-500">
                 聯合國制定的 17 項永續發展目標，旨在消除貧窮、保護地球，確保所有人在 2030 年前享有和平與繁榮。
               </p>
            </div>

            <button 
              onClick={handleStartAdventure}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full text-xl font-bold hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-300 hover:-translate-y-1"
            >
              開始冒險
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            {progress.completedIslands.length > 0 && (
                <p className="mt-6 text-sm text-slate-400 font-medium">
                    歡迎回來，{progress.userName}！ (Lv.{level})
                </p>
            )}
          </div>
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
    </Layout>
  );
}

export default App;