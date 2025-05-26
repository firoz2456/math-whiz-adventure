import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { generateProblem } from '../utils/mathUtils';
import { Problem, GameStats, Reward, Operation } from '../types';

interface AppContextType {
  currentProblem: Problem;
  generateNewProblem: (operation?: Operation) => void;
  checkAnswer: (answer: number) => boolean;
  stats: GameStats;
  rewards: Reward[];
  resetStats: () => void;
  sound: boolean;
  toggleSound: () => void;
}

const defaultStats: GameStats = {
  totalProblems: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  streakCount: 0,
  bestStreak: 0,
  lastPlayedAt: null,
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentProblem, setCurrentProblem] = useState<Problem>(generateProblem());
  const [stats, setStats] = useState<GameStats>(() => {
    const savedStats = localStorage.getItem('mathWhizStats');
    return savedStats ? JSON.parse(savedStats) : defaultStats;
  });
  const [rewards, setRewards] = useState<Reward[]>(() => {
    const savedRewards = localStorage.getItem('mathWhizRewards');
    return savedRewards ? JSON.parse(savedRewards) : [];
  });
  const [sound, setSound] = useState<boolean>(() => {
    const savedSound = localStorage.getItem('mathWhizSound');
    return savedSound ? JSON.parse(savedSound) : true;
  });

  useEffect(() => {
    localStorage.setItem('mathWhizStats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('mathWhizRewards', JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem('mathWhizSound', JSON.stringify(sound));
  }, [sound]);

  const generateNewProblem = (operation?: Operation) => {
    setCurrentProblem(generateProblem(operation));
  };

  const checkAnswer = (answer: number): boolean => {
    const isCorrect = answer === currentProblem.answer;
    
    setStats(prev => {
      const newStats = {
        ...prev,
        totalProblems: prev.totalProblems + 1,
        lastPlayedAt: new Date().toISOString(),
      };
      
      if (isCorrect) {
        const newStreakCount = prev.streakCount + 1;
        const newBestStreak = Math.max(newStreakCount, prev.bestStreak);
        
        // Add reward every 5 correct answers
        if (newStreakCount % 5 === 0) {
          const newReward: Reward = {
            id: Date.now().toString(),
            type: Math.random() > 0.5 ? 'sticker' : 'badge',
            name: `${newStreakCount} Streak!`,
            earnedAt: new Date().toISOString(),
          };
          setRewards(prev => [...prev, newReward]);
        }
        
        return {
          ...newStats,
          correctAnswers: prev.correctAnswers + 1,
          streakCount: newStreakCount,
          bestStreak: newBestStreak,
        };
      } else {
        return {
          ...newStats,
          incorrectAnswers: prev.incorrectAnswers + 1,
          streakCount: 0,
        };
      }
    });
    
    return isCorrect;
  };

  const resetStats = () => {
    setStats(defaultStats);
    setRewards([]);
  };

  const toggleSound = () => {
    setSound(prev => !prev);
  };

  return (
    <AppContext.Provider value={{
      currentProblem,
      generateNewProblem,
      checkAnswer,
      stats,
      rewards,
      resetStats,
      sound,
      toggleSound,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};