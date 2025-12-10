import { useState, useEffect, useCallback } from 'react';
import { UserProgress } from '../types';
import { TOTAL_ISLANDS } from '../constants';

const STORAGE_KEY = 'sdg_adventure_v1';

const INITIAL_STATE: UserProgress = {
  unlockedIslands: [1], // Start with Island 1
  completedIslands: [],
  completedTasks: {},
  unlockedBadges: [],
  userName: '冒險家',
};

export const useGamePersistence = () => {
  const [progress, setProgress] = useState<UserProgress>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load save", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  const unlockIsland = useCallback((id: number) => {
    setProgress((prev) => {
      if (prev.unlockedIslands.includes(id)) return prev;
      return { ...prev, unlockedIslands: [...prev.unlockedIslands, id] };
    });
  }, []);

  const completeTask = useCallback((islandId: number, taskIndex: number) => {
    setProgress((prev) => {
      const currentTasks = prev.completedTasks[islandId] || [];
      if (currentTasks.includes(taskIndex)) return prev;
      return {
        ...prev,
        completedTasks: {
          ...prev.completedTasks,
          [islandId]: [...currentTasks, taskIndex],
        },
      };
    });
  }, []);

  const claimReward = useCallback((islandId: number) => {
    setProgress((prev) => {
      // Mark island as completed
      const newCompletedIslands = prev.completedIslands.includes(islandId)
        ? prev.completedIslands
        : [...prev.completedIslands, islandId];

      // Unlock Badge
      const newBadges = prev.unlockedBadges.includes(islandId)
        ? prev.unlockedBadges
        : [...prev.unlockedBadges, islandId];

      // Logic to unlock the NEXT island automatically
      const nextId = islandId + 1;
      const newUnlockedIslands = prev.unlockedIslands;
      if (nextId <= TOTAL_ISLANDS && !newUnlockedIslands.includes(nextId)) {
        newUnlockedIslands.push(nextId);
      }

      return {
        ...prev,
        completedIslands: newCompletedIslands,
        unlockedBadges: newBadges,
        unlockedIslands: [...newUnlockedIslands],
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    if(confirm("確定要重置所有進度嗎？這將無法復原。")) {
        setProgress(INITIAL_STATE);
        window.location.reload();
    }
  }, []);

  const level = Math.floor(progress.completedIslands.length / 3) + 1;
  const progressPercentage = Math.round((progress.completedIslands.length / TOTAL_ISLANDS) * 100);

  return {
    progress,
    unlockIsland,
    completeTask,
    claimReward,
    resetProgress,
    level,
    progressPercentage,
    isLoaded
  };
};