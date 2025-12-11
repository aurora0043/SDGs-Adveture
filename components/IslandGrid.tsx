import React from 'react';
import { 
  Lock, Check, HandCoins, Utensils, Heart, BookOpen, Scale, Droplets, 
  Zap, Briefcase, Lightbulb, Equal, Building2, Recycle, Thermometer, 
  Fish, TreePine, Gavel, Handshake
} from 'lucide-react';
import { SDG_DATA } from '../constants';
import { UserProgress, SDGIsland } from '../types';

interface IslandGridProps {
  progress: UserProgress;
  onSelectIsland: (island: SDGIsland) => void;
}

// Helper to get icon for specific SDG ID
export const getSDGIcon = (id: number, size: number = 24, className: string = "") => {
  const props = { size, className, strokeWidth: 2.5 };
  switch(id) {
    case 1: return <HandCoins {...props} />;
    case 2: return <Utensils {...props} />;
    case 3: return <Heart {...props} />;
    case 4: return <BookOpen {...props} />;
    case 5: return <Scale {...props} />;
    case 6: return <Droplets {...props} />;
    case 7: return <Zap {...props} />;
    case 8: return <Briefcase {...props} />;
    case 9: return <Lightbulb {...props} />;
    case 10: return <Equal {...props} />;
    case 11: return <Building2 {...props} />;
    case 12: return <Recycle {...props} />;
    case 13: return <Thermometer {...props} />;
    case 14: return <Fish {...props} />;
    case 15: return <TreePine {...props} />;
    case 16: return <Gavel {...props} />;
    case 17: return <Handshake {...props} />;
    default: return <Lock {...props} />;
  }
};

export const IslandGrid: React.FC<IslandGridProps> = ({ progress, onSelectIsland }) => {
  return (
    <div className="w-full max-w-7xl mx-auto pb-24">
      <div className="mb-8 md:mb-12 text-center">
        {/* Darkened Title */}
        <h2 className="text-3xl md:text-4xl font-black text-emerald-950 mb-2 drop-shadow-sm">
            世界群島地圖
        </h2>
        {/* Darkened Subtitle */}
        <p className="text-emerald-800 font-bold bg-white/60 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
            點擊綠色小島開始你的探索旅程
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 md:gap-12 px-2">
        {SDG_DATA.map((island, index) => {
          const isUnlocked = progress.unlockedIslands.includes(island.id);
          const isCompleted = progress.completedIslands.includes(island.id);
          const inProgress = isUnlocked && !isCompleted;

          // Random float animation delay for organic feel
          const animDelay = `${index * 0.2}s`;
          
          return (
            <button
              key={island.id}
              disabled={!isUnlocked}
              onClick={() => onSelectIsland(island)}
              style={{ animationDelay: animDelay }}
              className={`
                relative group flex flex-col w-[160px] md:w-[200px] aspect-[4/5] transition-all duration-300 animate-float
                ${isUnlocked 
                  ? 'hover:scale-110 cursor-pointer z-10 hover:z-20' 
                  : 'opacity-70 cursor-not-allowed filter grayscale z-0'
                }
              `}
            >
              {/* The Green Island Body */}
              <div className="flex-1 w-full relative">
                  {/* Island Base (Grass) */}
                  <div className={`
                      absolute bottom-0 w-full h-[80%] rounded-[2.5rem] bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-[0_10px_0_rgba(6,95,70,0.2)]
                      ${isUnlocked ? 'border-4 border-emerald-200' : 'border-4 border-slate-300 bg-slate-400'}
                  `}>
                      {/* Decorative Grass Tufts */}
                      {isUnlocked && (
                          <>
                            <div className="absolute top-4 left-4 w-3 h-3 bg-emerald-300 rounded-full opacity-50"></div>
                            <div className="absolute top-8 right-6 w-2 h-2 bg-emerald-300 rounded-full opacity-50"></div>
                            <div className="absolute bottom-6 left-8 w-4 h-4 bg-emerald-300 rounded-full opacity-50"></div>
                          </>
                      )}
                  </div>

                  {/* Island Top Features */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-full flex flex-col items-center z-10">
                      
                      {/* Completion Star */}
                      {isCompleted && (
                        <div className="absolute -top-6 animate-bounce text-yellow-400 drop-shadow-md z-30">
                            <Check className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full p-1 border-4 border-yellow-200" strokeWidth={4} />
                        </div>
                      )}

                      {/* Lock Icon */}
                      {!isUnlocked && (
                        <div className="absolute top-10 text-slate-200">
                             <Lock className="w-12 h-12" />
                        </div>
                      )}

                      {/* SDG Center Icon - Big and Centered */}
                      {isUnlocked && (
                          <div className="flex flex-col items-center group-hover:-translate-y-2 transition-transform duration-300 relative top-6">
                              <div className={`
                                  w-16 h-16 md:w-20 md:h-20 bg-white rounded-3xl shadow-lg border-4 border-emerald-100 flex items-center justify-center
                                  text-emerald-600 group-hover:text-emerald-500 group-hover:scale-105 transition-all
                              `}>
                                   {getSDGIcon(island.id, 40, "drop-shadow-sm")}
                              </div>
                              
                              {/* SDG Number Badge */}
                              <div className={`
                                  absolute -bottom-3 bg-amber-500 text-white text-xs font-black px-3 py-1 rounded-full border-2 border-white shadow-sm
                              `}>
                                  SDG {island.id}
                              </div>
                          </div>
                      )}
                  </div>
              </div>

              {/* Island Label (Below water line) */}
              <div className="mt-6 text-center z-20">
                  <div className={`inline-block px-3 py-1 rounded-xl border-2 shadow-sm backdrop-blur-sm transition-colors
                     ${isUnlocked ? 'bg-white/90 border-white text-emerald-950' : 'bg-slate-200/80 border-slate-300 text-slate-600'}
                  `}>
                    <h3 className="font-bold text-sm leading-tight">
                        {island.title.split(' ')[2] || island.title}
                    </h3>
                  </div>
                  {inProgress && (
                      <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-2 overflow-hidden border border-white">
                          <div className="bg-yellow-400 h-full w-1/2 animate-pulse"></div>
                      </div>
                  )}
              </div>
              
              {/* Water Ripple Effect */}
              {isUnlocked && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/20 rounded-[100%] blur-md -z-10 animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};