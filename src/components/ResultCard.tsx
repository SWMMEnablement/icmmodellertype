import { motion } from "framer-motion";
import { PersonalityType } from "@/data/personalities";
import { Sparkles, TrendingUp, Wrench, RotateCcw } from "lucide-react";

interface ResultCardProps {
  personality: PersonalityType;
  scores: Record<string, number>;
  onRestart: () => void;
}

export const ResultCard = ({ personality, scores, onRestart }: ResultCardProps) => {
  const dimensions = [
    { key: 'DB', labels: ['Detail-Focused', 'Big-Picture'], traits: ['D', 'B'] },
    { key: 'AM', labels: ['Automated', 'Manual'], traits: ['A', 'M'] },
    { key: 'SI', labels: ['Systematic', 'Intuitive'], traits: ['S', 'I'] },
    { key: 'PR', labels: ['Perfectionist', 'Pragmatic'], traits: ['P', 'R'] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Main Result Card */}
      <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden mb-8">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${personality.color} p-8 md:p-12 text-center`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-white/80 text-sm font-medium tracking-widest uppercase mb-2 block">
              Your ICM Modeller Type
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-3">
              {personality.type}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              {personality.name}
            </p>
          </motion.div>
        </div>

        {/* Description */}
        <div className="p-8 md:p-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground leading-relaxed text-center"
          >
            {personality.description}
          </motion.p>
        </div>
      </div>

      {/* Dimension Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl shadow-card border border-border p-8 mb-8"
      >
        <h3 className="font-display text-xl font-semibold text-foreground mb-6 text-center">
          Your Modeling Style Breakdown
        </h3>
        <div className="space-y-6">
          {dimensions.map(({ key, labels, traits }) => {
            const first = traits[0];
            const second = traits[1];
            const firstScore = scores[first] || 0;
            const secondScore = scores[second] || 0;
            const total = firstScore + secondScore;
            const firstPercent = total > 0 ? Math.round((firstScore / total) * 100) : 50;

            return (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className={firstPercent > 50 ? 'text-primary' : 'text-muted-foreground'}>
                    {labels[0]}
                  </span>
                  <span className={firstPercent < 50 ? 'text-primary' : 'text-muted-foreground'}>
                    {labels[1]}
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${firstPercent}%` }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="h-full gradient-cool"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${100 - firstPercent}%` }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="h-full gradient-warm"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{firstPercent}%</span>
                  <span>{100 - firstPercent}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Strengths & Growth */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl shadow-card border border-border p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-cool flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">Your Strengths</h3>
          </div>
          <ul className="space-y-2">
            {personality.strengths.map((strength, i) => (
              <li key={i} className="flex items-center gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {strength}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl shadow-card border border-border p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">Growth Areas</h3>
          </div>
          <ul className="space-y-2">
            {personality.growth.map((area, i) => (
              <li key={i} className="flex items-center gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                {area}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Recommended Tools */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-card rounded-2xl shadow-card border border-border p-6 mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Wrench className="w-5 h-5 text-foreground" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">Your Go-To Tools & Approaches</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {personality.tools.map((tool, i) => (
            <span key={i} className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium">
              {tool}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Restart Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-cool text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-opacity"
        >
          <RotateCcw className="w-5 h-5" />
          Take the Test Again
        </button>
      </motion.div>
    </motion.div>
  );
};
