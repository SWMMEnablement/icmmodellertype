import { motion } from "framer-motion";
import { PersonalityType } from "@/data/personalities";
import { Sparkles, TrendingUp, Wrench, RotateCcw, Blend, Zap, Layers } from "lucide-react";

interface ResultCardProps {
  personality: PersonalityType;
  scores: Record<string, number>;
  onRestart: () => void;
}

export const ResultCard = ({ personality, scores, onRestart }: ResultCardProps) => {
  const isHybrid = personality.isHybrid;
  
  // Calculate hybrid score breakdown
  const hybridScores = {
    H: scores.H || 0,
    X: scores.X || 0,
    Y: scores.Y || 0,
    Z: scores.Z || 0,
  };
  const totalHybrid = hybridScores.H + hybridScores.X + hybridScores.Y + hybridScores.Z;
  const hybridPercentage = Math.round((totalHybrid / 20) * 100);

  const dimensions = [
    { key: 'DB', labels: ['Detail-Focused', 'Big-Picture'], traits: ['D', 'B'], hybridTrait: 'H', hybridLabel: 'Context-Adaptive' },
    { key: 'AM', labels: ['Automated', 'Manual'], traits: ['A', 'M'], hybridTrait: 'X', hybridLabel: 'Hybrid Workflow' },
    { key: 'SI', labels: ['Systematic', 'Intuitive'], traits: ['S', 'I'], hybridTrait: 'Y', hybridLabel: 'Integrated' },
    { key: 'PR', labels: ['Perfectionist', 'Pragmatic'], traits: ['P', 'R'], hybridTrait: 'Z', hybridLabel: 'Risk-Based' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Main Result Card */}
      <div className={`bg-card rounded-2xl shadow-card border overflow-hidden mb-8 ${isHybrid ? 'border-purple-500/50' : 'border-border'}`}>
        {/* Header with gradient */}
        <div className={`relative bg-gradient-to-r ${personality.color} p-8 md:p-12 text-center overflow-hidden`}>
          {/* Hybrid decorative elements */}
          {isHybrid && (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
              <motion.div 
                className="absolute top-4 right-4 md:top-6 md:right-6"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Blend className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">Hybrid Type</span>
                </div>
              </motion.div>
              {/* Floating blend icons */}
              <motion.div
                className="absolute top-1/4 left-8 opacity-20"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Layers className="w-12 h-12 text-white" />
              </motion.div>
              <motion.div
                className="absolute bottom-1/4 right-12 opacity-20"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                <Zap className="w-10 h-10 text-white" />
              </motion.div>
            </>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <span className="text-white/80 text-sm font-medium tracking-widest uppercase mb-2 block">
              {isHybrid ? 'Your Adaptive ICM Modeller Type' : 'Your ICM Modeller Type'}
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-3">
              {personality.type}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              {personality.name}
            </p>
            {isHybrid && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <span className="text-white/90 text-sm">
                  {hybridPercentage}% adaptive responses
                </span>
              </motion.div>
            )}
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

      {/* Hybrid Adaptability Summary - Only shown for hybrid types */}
      {isHybrid && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-purple-500/10 rounded-2xl border border-purple-500/30 p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-hybrid flex items-center justify-center">
              <Blend className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">Your Adaptive Profile</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            You chose context-sensitive approaches across multiple dimensions, showing exceptional flexibility in your modelling style.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dimensions.map(({ hybridTrait, hybridLabel }) => {
              const hybridCount = scores[hybridTrait] || 0;
              return (
                <div key={hybridTrait} className="bg-card/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-purple-500">{hybridCount}</div>
                  <div className="text-xs text-muted-foreground">{hybridLabel}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

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
          {dimensions.map(({ key, labels, traits, hybridTrait, hybridLabel }) => {
            const first = traits[0];
            const second = traits[1];
            const firstScore = scores[first] || 0;
            const secondScore = scores[second] || 0;
            const hybridScore = scores[hybridTrait] || 0;
            const total = firstScore + secondScore + hybridScore;
            
            const firstPercent = total > 0 ? Math.round((firstScore / total) * 100) : 33;
            const secondPercent = total > 0 ? Math.round((secondScore / total) * 100) : 33;
            const hybridPercent = total > 0 ? Math.round((hybridScore / total) * 100) : 34;

            return (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className={firstPercent >= secondPercent && firstPercent >= hybridPercent ? 'text-primary' : 'text-muted-foreground'}>
                    {labels[0]}
                  </span>
                  <span className={hybridPercent >= firstPercent && hybridPercent >= secondPercent ? 'text-purple-500' : 'text-muted-foreground'}>
                    {hybridLabel}
                  </span>
                  <span className={secondPercent > firstPercent && secondPercent > hybridPercent ? 'text-secondary' : 'text-muted-foreground'}>
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
                    animate={{ width: `${hybridPercent}%` }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="h-full gradient-hybrid"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${secondPercent}%` }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="h-full gradient-warm"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{firstPercent}%</span>
                  {hybridPercent > 0 && (
                    <span className="text-purple-500">{hybridPercent}%</span>
                  )}
                  <span>{secondPercent}%</span>
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
          className={`bg-card rounded-2xl shadow-card border p-6 ${isHybrid ? 'border-purple-500/30' : 'border-border'}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isHybrid ? 'gradient-hybrid' : 'gradient-cool'}`}>
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">Your Strengths</h3>
          </div>
          <ul className="space-y-2">
            {personality.strengths.map((strength, i) => (
              <li key={i} className="flex items-center gap-2 text-muted-foreground">
                <span className={`w-1.5 h-1.5 rounded-full ${isHybrid ? 'bg-purple-500' : 'bg-primary'}`} />
                {strength}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className={`bg-card rounded-2xl shadow-card border p-6 ${isHybrid ? 'border-purple-500/30' : 'border-border'}`}
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
        className={`bg-card rounded-2xl shadow-card border p-6 mb-8 ${isHybrid ? 'border-purple-500/30' : 'border-border'}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Wrench className="w-5 h-5 text-foreground" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">Your Go-To Tools & Approaches</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {personality.tools.map((tool, i) => (
            <span 
              key={i} 
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isHybrid 
                  ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
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
          className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-opacity ${
            isHybrid ? 'gradient-hybrid' : 'gradient-cool'
          }`}
        >
          <RotateCcw className="w-5 h-5" />
          Take the Test Again
        </button>
      </motion.div>
    </motion.div>
  );
};
