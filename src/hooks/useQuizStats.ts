import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TypeStats {
  totalQuizzes: number;
  typeCounts: Record<string, number>;
  typePercentage: (type: string) => number;
  isLoading: boolean;
}

export const useQuizStats = (): TypeStats => {
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [typeCounts, setTypeCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('quiz_results')
          .select('personality_type');

        if (error) {
          console.error('Failed to fetch quiz stats:', error);
          return;
        }

        const counts: Record<string, number> = {};
        (data || []).forEach(row => {
          counts[row.personality_type] = (counts[row.personality_type] || 0) + 1;
        });

        setTypeCounts(counts);
        setTotalQuizzes(data?.length || 0);
      } catch (err) {
        console.error('Failed to fetch quiz stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const typePercentage = useCallback((type: string) => {
    if (totalQuizzes === 0) return 0;
    return Math.round(((typeCounts[type] || 0) / totalQuizzes) * 100);
  }, [totalQuizzes, typeCounts]);

  return { totalQuizzes, typeCounts, typePercentage, isLoading };
};

export const recordQuizToDb = async (personalityType: string, mode: string) => {
  try {
    await supabase
      .from('quiz_results')
      .insert({ personality_type: personalityType, quiz_mode: mode });
  } catch (err) {
    console.error('Failed to record quiz result:', err);
  }
};
