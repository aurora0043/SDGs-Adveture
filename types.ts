export interface SDGIsland {
  id: number;
  title: string;
  location_name: string;
  tasks: string[];
  knowledge: string;
  color: string;
}

export interface UserProgress {
  unlockedIslands: number[]; // IDs of unlocked islands
  completedIslands: number[]; // IDs of fully completed islands
  completedTasks: Record<number, number[]>; // Map island ID to array of completed task indices
  unlockedBadges: number[]; // IDs of islands that gave a badge
  userName: string;
}

export type ViewState = 'LANDING' | 'MAP' | 'KNOWLEDGE' | 'PROFILE';

export interface GameStateContextType {
  progress: UserProgress;
  unlockIsland: (id: number) => void;
  completeTask: (islandId: number, taskIndex: number) => void;
  claimReward: (islandId: number) => void;
  resetProgress: () => void;
  level: number;
  progressPercentage: number;
}