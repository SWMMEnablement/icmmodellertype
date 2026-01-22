import { useState, useEffect, useCallback } from 'react';
import { QuizHistory, QuizResult, achievements, getNewAchievements } from '@/data/achievements';

const STORAGE_KEY = 'icm-quiz-history';

const defaultHistory: QuizHistory = {
  results: [],
  totalQuizzes: 0,
  uniqueTypes: [],
  streakDays: 0,
  achievements: []
};

export const useQuizHistory = () => {
  const [history, setHistory] = useState<QuizHistory>(defaultHistory);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      }
    } catch (error) {
      console.error('Failed to load quiz history:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && history !== defaultHistory) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      } catch (error) {
        console.error('Failed to save quiz history:', error);
      }
    }
  }, [history, isLoaded]);

  // Record a new quiz result
  const recordQuizResult = useCallback((result: Omit<QuizResult, 'takenAt'>) => {
    const newResult: QuizResult = {
      ...result,
      takenAt: new Date().toISOString()
    };

    setHistory(prev => {
      // Calculate updated history
      const results = [...prev.results, newResult];
      const uniqueTypes = [...new Set(results.map(r => r.type))];
      
      // Calculate streak
      const today = new Date().toDateString();
      const lastDate = prev.lastQuizDate;
      let streakDays = prev.streakDays;
      
      if (lastDate) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastDate === yesterday.toDateString()) {
          streakDays += 1;
        } else if (lastDate !== today) {
          streakDays = 1; // Reset streak
        }
      } else {
        streakDays = 1;
      }

      const updatedHistory: QuizHistory = {
        results,
        firstQuizAt: prev.firstQuizAt || newResult.takenAt,
        totalQuizzes: prev.totalQuizzes + 1,
        uniqueTypes,
        streakDays,
        lastQuizDate: today,
        achievements: prev.achievements
      };

      // Check for new achievements
      const newlyEarned = getNewAchievements(updatedHistory);
      if (newlyEarned.length > 0) {
        updatedHistory.achievements = [
          ...updatedHistory.achievements,
          ...newlyEarned.map(a => a.id)
        ];
        setNewAchievements(newlyEarned.map(a => a.id));
      }

      return updatedHistory;
    });
  }, []);

  // Clear new achievements notification
  const clearNewAchievements = useCallback(() => {
    setNewAchievements([]);
  }, []);

  // Get the latest result for a specific mode
  const getLatestResult = useCallback((mode?: 'self' | 'manager') => {
    const filtered = mode 
      ? history.results.filter(r => r.mode === mode)
      : history.results;
    return filtered[filtered.length - 1] || null;
  }, [history.results]);

  // Check if user has taken quiz before
  const hasHistory = history.totalQuizzes > 0;

  // Get previous result of same type (for comparison)
  const getPreviousResultOfType = useCallback((type: string, mode: 'self' | 'manager') => {
    const sameTypeResults = history.results.filter(r => r.type === type && r.mode === mode);
    return sameTypeResults.length > 1 ? sameTypeResults[sameTypeResults.length - 2] : null;
  }, [history.results]);

  // Get time since first quiz
  const getTimeSinceFirstQuiz = useCallback(() => {
    if (!history.firstQuizAt) return null;
    const first = new Date(history.firstQuizAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - first.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [history.firstQuizAt]);

  return {
    history,
    hasHistory,
    newAchievements,
    isLoaded,
    recordQuizResult,
    clearNewAchievements,
    getLatestResult,
    getPreviousResultOfType,
    getTimeSinceFirstQuiz
  };
};
