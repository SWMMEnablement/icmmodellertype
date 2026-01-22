import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Lock, Sparkles, Calendar, TrendingUp, Users } from "lucide-react";
import { achievements, tierStyles, QuizHistory, getEarnedAchievements } from "@/data/achievements";

interface AchievementsSectionProps {
  history: QuizHistory;
  newAchievements: string[];
  onClearNew: () => void;
  accentBorderLight: string;
}

export const AchievementsSection = ({ 
  history, 
  newAchievements, 
  onClearNew,
  accentBorderLight 
}: AchievementsSectionProps) => {
  const earnedAchievements = getEarnedAchievements(history);
  const lockedAchievements = achievements.filter(a => !history.achievements.includes(a.id));
  
  // Sort earned to show newest first
  const sortedEarned = [...earnedAchievements].reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65 }}
      className={`bg-card rounded-2xl shadow-card border p-6 mb-8 ${accentBorderLight}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Your Achievements
            </h3>
            <p className="text-xs text-muted-foreground">
              {earnedAchievements.length} of {achievements.length} unlocked
            </p>
          </div>
        </div>

        {/* Stats badges */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              {history.totalQuizzes} quizzes
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full">
            <Users className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              {history.uniqueTypes.length} types
            </span>
          </div>
        </div>
      </div>

      {/* New achievements toast */}
      <AnimatePresence>
        {newAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="mb-4 p-4 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                <span className="font-semibold text-yellow-700 dark:text-yellow-400">
                  🎉 New Achievement{newAchievements.length > 1 ? 's' : ''} Unlocked!
                </span>
              </div>
              <button
                onClick={onClearNew}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Dismiss
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {newAchievements.map(id => {
                const achievement = achievements.find(a => a.id === id);
                if (!achievement) return null;
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-white/50 dark:bg-black/20 rounded-full text-sm"
                  >
                    <span>{achievement.icon}</span>
                    <span className="font-medium">{achievement.name}</span>
                  </span>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Earned achievements */}
      {earnedAchievements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Earned
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {sortedEarned.map((achievement, i) => {
              const styles = tierStyles[achievement.tier];
              const isNew = newAchievements.includes(achievement.id);
              
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative p-3 rounded-xl border ${styles.bg} ${styles.border} ${isNew ? 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-background' : ''}`}
                >
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <div className={`text-sm font-semibold ${styles.text}`}>
                    {achievement.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {achievement.description}
                  </div>
                  {/* Tier badge */}
                  <div className={`absolute top-2 right-2 text-[10px] font-bold uppercase ${styles.text}`}>
                    {achievement.tier}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Locked achievements - show only first few */}
      {lockedAchievements.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Locked ({lockedAchievements.length} remaining)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {lockedAchievements.slice(0, 4).map((achievement) => (
              <div
                key={achievement.id}
                className="p-3 rounded-xl border border-dashed border-muted-foreground/20 bg-muted/30 opacity-60"
              >
                <div className="text-2xl mb-1 grayscale opacity-50">{achievement.icon}</div>
                <div className="text-sm font-semibold text-muted-foreground">
                  {achievement.name}
                </div>
                <div className="text-xs text-muted-foreground/70 mt-0.5 line-clamp-2">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
          {lockedAchievements.length > 4 && (
            <p className="text-xs text-muted-foreground mt-3 text-center">
              + {lockedAchievements.length - 4} more achievements to unlock
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};
