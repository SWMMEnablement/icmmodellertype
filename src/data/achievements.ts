export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (history: QuizHistory) => boolean;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface QuizResult {
  type: string;
  name: string;
  scores: Record<string, number>;
  takenAt: string;
  mode: 'self' | 'manager';
}

export interface QuizHistory {
  results: QuizResult[];
  firstQuizAt?: string;
  totalQuizzes: number;
  uniqueTypes: string[];
  streakDays: number;
  lastQuizDate?: string;
  achievements: string[]; // Array of achievement IDs
}

// Achievement definitions
export const achievements: Achievement[] = [
  // First-time achievements
  {
    id: 'first_quiz',
    name: 'First Discovery',
    description: 'Completed your first ICM modeller type quiz',
    icon: '🎯',
    tier: 'bronze',
    condition: (h) => h.totalQuizzes >= 1
  },
  {
    id: 'self_awareness',
    name: 'Self Awareness',
    description: 'Discovered your own modeller type',
    icon: '🪞',
    tier: 'bronze',
    condition: (h) => h.results.some(r => r.mode === 'self')
  },
  {
    id: 'manager_insight',
    name: 'Manager Insight',
    description: 'Analyzed your manager\'s modeller type',
    icon: '👔',
    tier: 'bronze',
    condition: (h) => h.results.some(r => r.mode === 'manager')
  },

  // Repeat quiz achievements
  {
    id: 'reflector',
    name: 'The Reflector',
    description: 'Took the quiz 3 times to track your growth',
    icon: '🔄',
    tier: 'silver',
    condition: (h) => h.totalQuizzes >= 3
  },
  {
    id: 'dedicated_learner',
    name: 'Dedicated Learner',
    description: 'Took the quiz 5 times',
    icon: '📚',
    tier: 'silver',
    condition: (h) => h.totalQuizzes >= 5
  },
  {
    id: 'growth_mindset',
    name: 'Growth Mindset',
    description: 'Took the quiz 10 times over time',
    icon: '🌱',
    tier: 'gold',
    condition: (h) => h.totalQuizzes >= 10
  },

  // Type discovery achievements
  {
    id: 'explorer',
    name: 'Type Explorer',
    description: 'Discovered 3 different modeller types',
    icon: '🗺️',
    tier: 'silver',
    condition: (h) => h.uniqueTypes.length >= 3
  },
  {
    id: 'type_collector',
    name: 'Type Collector',
    description: 'Discovered 5 different modeller types',
    icon: '🏆',
    tier: 'gold',
    condition: (h) => h.uniqueTypes.length >= 5
  },
  {
    id: 'master_collector',
    name: 'Master Collector',
    description: 'Discovered 8+ different modeller types',
    icon: '👑',
    tier: 'platinum',
    condition: (h) => h.uniqueTypes.length >= 8
  },

  // Special type achievements
  {
    id: 'hybrid_thinker',
    name: 'Hybrid Thinker',
    description: 'Received a Hybrid personality type result',
    icon: '🔀',
    tier: 'silver',
    condition: (h) => h.results.some(r => ['HYBRID', 'ADAPTIVE', 'FLEX'].includes(r.type))
  },
  {
    id: 'context_master',
    name: 'Context Champion',
    description: 'Received a Context-Driven personality type result',
    icon: '🎛️',
    tier: 'silver',
    condition: (h) => h.results.some(r => ['CONTEXT', 'NAVIGATOR'].includes(r.type))
  },

  // Time-based achievements
  {
    id: 'anniversary',
    name: 'One Year Milestone',
    description: 'Retook the quiz after one year',
    icon: '🎂',
    tier: 'platinum',
    condition: (h) => {
      if (h.results.length < 2) return false;
      const first = new Date(h.results[0].takenAt);
      const latest = new Date(h.results[h.results.length - 1].takenAt);
      const diffDays = (latest.getTime() - first.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays >= 365;
    }
  },
  {
    id: 'quarterly_check',
    name: 'Quarterly Check-in',
    description: 'Retook the quiz after 3 months',
    icon: '📅',
    tier: 'gold',
    condition: (h) => {
      if (h.results.length < 2) return false;
      const first = new Date(h.results[0].takenAt);
      const latest = new Date(h.results[h.results.length - 1].takenAt);
      const diffDays = (latest.getTime() - first.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays >= 90;
    }
  },

  // Evolution achievement
  {
    id: 'evolved',
    name: 'The Evolved Modeller',
    description: 'Your type changed between quizzes - you\'re growing!',
    icon: '🦋',
    tier: 'gold',
    condition: (h) => {
      const selfResults = h.results.filter(r => r.mode === 'self');
      if (selfResults.length < 2) return false;
      return selfResults[0].type !== selfResults[selfResults.length - 1].type;
    }
  },

  // Consistency achievement
  {
    id: 'consistent',
    name: 'True to Type',
    description: 'Got the same result 3 times - you know who you are!',
    icon: '💎',
    tier: 'gold',
    condition: (h) => {
      const typeCounts: Record<string, number> = {};
      h.results.forEach(r => {
        typeCounts[r.type] = (typeCounts[r.type] || 0) + 1;
      });
      return Object.values(typeCounts).some(count => count >= 3);
    }
  }
];

// Tier colors and styling
export const tierStyles = {
  bronze: {
    bg: 'bg-amber-700/20',
    border: 'border-amber-700/40',
    text: 'text-amber-700 dark:text-amber-400',
    glow: 'shadow-amber-700/20'
  },
  silver: {
    bg: 'bg-slate-400/20',
    border: 'border-slate-400/40',
    text: 'text-slate-600 dark:text-slate-300',
    glow: 'shadow-slate-400/20'
  },
  gold: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/40',
    text: 'text-yellow-600 dark:text-yellow-400',
    glow: 'shadow-yellow-500/20'
  },
  platinum: {
    bg: 'bg-cyan-400/20',
    border: 'border-cyan-400/40',
    text: 'text-cyan-600 dark:text-cyan-300',
    glow: 'shadow-cyan-400/20'
  }
};

// Helper to get newly earned achievements
export const getNewAchievements = (history: QuizHistory): Achievement[] => {
  return achievements.filter(a => 
    a.condition(history) && !history.achievements.includes(a.id)
  );
};

// Helper to get all earned achievements
export const getEarnedAchievements = (history: QuizHistory): Achievement[] => {
  return achievements.filter(a => history.achievements.includes(a.id));
};
