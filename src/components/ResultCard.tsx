import { useState } from "react";
import { motion } from "framer-motion";
import { PersonalityType } from "@/data/personalities";
import { Sparkles, TrendingUp, Wrench, RotateCcw, Blend, Zap, Layers, Settings2, Compass, Share2, BookOpen, FileText, GraduationCap, Play, Video, ExternalLink } from "lucide-react";
import { ShareableResultCard } from "./ShareableResultCard";
import { getResourcesForType, LearningResource, ExperienceLevel, experienceLevels } from "@/data/learningResources";
import type { QuizMode } from "@/pages/Index";

interface ResultCardProps {
  personality: PersonalityType;
  scores: Record<string, number>;
  onRestart: () => void;
  quizMode?: QuizMode;
}

// Helper function to get the resource type code
const getResourceTypeCode = (type: string): string => {
  switch (type) {
    case "CONTEXT": return "CONTEXT_MASTER";
    case "NAVIGATOR": return "CONTEXT_NAVIGATOR";
    case "HYBRID": return "HYBRID_INTEGRATOR";
    case "ADAPTIVE": return "HYBRID_ADAPTIVE";
    case "FLEX": return "HYBRID_FLEXIBLE";
    default: return type;
  }
};

// Learning Resources Section Component
const LearningResourcesSection = ({ 
  personality, 
  isManagerMode,
  accentBorderLight 
}: { 
  personality: PersonalityType;
  isManagerMode: boolean;
  accentBorderLight: string;
}) => {
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel | null>(null);
  
  const typeCode = getResourceTypeCode(personality.type);
  const resources = getResourcesForType(typeCode, selectedLevel || undefined);
  
  // Group resources by level for display
  const groupedResources = selectedLevel 
    ? { [selectedLevel]: resources }
    : resources.reduce((acc, resource) => {
        if (!acc[resource.level]) acc[resource.level] = [];
        acc[resource.level].push(resource);
        return acc;
      }, {} as Record<ExperienceLevel, LearningResource[]>);

  const levelOrder: ExperienceLevel[] = ['beginner', 'intermediate', 'advanced'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.72 }}
      className={`bg-card rounded-2xl shadow-card border p-6 mb-8 ${accentBorderLight}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {isManagerMode ? "Resources for This Type" : "Recommended Learning Path"}
            </h3>
            <p className="text-xs text-muted-foreground">
              Select your experience level for personalized recommendations
            </p>
          </div>
        </div>
      </div>

      {/* Experience Level Selector */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setSelectedLevel(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            selectedLevel === null
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          All Levels
        </button>
        {levelOrder.map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
              selectedLevel === level
                ? level === 'beginner' 
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : level === 'intermediate'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-violet-500 text-white shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <span>{experienceLevels[level].icon}</span>
            <span>{experienceLevels[level].label}</span>
          </button>
        ))}
      </div>

      {/* Resources grouped by level */}
      <div className="space-y-4">
        {levelOrder
          .filter(level => groupedResources[level]?.length > 0)
          .map((level, levelIndex) => (
            <div key={level}>
              {!selectedLevel && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">{experienceLevels[level].icon}</span>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${
                    level === 'beginner' 
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : level === 'intermediate'
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-violet-600 dark:text-violet-400'
                  }`}>
                    {experienceLevels[level].label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    — {experienceLevels[level].description}
                  </span>
                </div>
              )}
              <div className="grid gap-2">
                {groupedResources[level].map((resource: LearningResource, i: number) => {
                  const IconComponent = resource.type === "webinar" ? Video 
                    : resource.type === "tutorial" ? BookOpen 
                    : resource.type === "documentation" ? FileText 
                    : resource.type === "course" ? GraduationCap 
                    : Play;
                  
                  return (
                    <a
                      key={`${level}-${i}`}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-border transition-all"
                    >
                      {/* Order number */}
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        level === 'beginner' 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : level === 'intermediate'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                            : 'bg-violet-500/10 text-violet-600 dark:text-violet-400'
                      }`}>
                        {selectedLevel ? i + 1 : resource.order}
                      </div>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                        resource.type === "webinar" ? "bg-red-500/10 text-red-500" 
                        : resource.type === "tutorial" ? "bg-blue-500/10 text-blue-500"
                        : resource.type === "documentation" ? "bg-amber-500/10 text-amber-500"
                        : resource.type === "course" ? "bg-purple-500/10 text-purple-500"
                        : "bg-green-500/10 text-green-500"
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                            {resource.title}
                          </span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {resource.description}
                        </p>
                      </div>
                      <span className={`flex-shrink-0 text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded ${
                        resource.type === "webinar" ? "bg-red-500/10 text-red-600 dark:text-red-400" 
                        : resource.type === "tutorial" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        : resource.type === "documentation" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : resource.type === "course" ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                        : "bg-green-500/10 text-green-600 dark:text-green-400"
                      }`}>
                        {resource.type}
                      </span>
                    </a>
                  );
                })}
              </div>
              {!selectedLevel && levelIndex < levelOrder.filter(l => groupedResources[l]?.length > 0).length - 1 && (
                <div className="border-t border-border/50 mt-4" />
              )}
            </div>
          ))}
      </div>
    </motion.div>
  );
};

export const ResultCard = ({ personality, scores, onRestart, quizMode = "self" }: ResultCardProps) => {
  const isManagerMode = quizMode === "manager";
  const isHybrid = personality.isHybrid && personality.type !== 'CONTEXT' && personality.type !== 'NAVIGATOR';
  const isContext = personality.type === 'CONTEXT' || personality.type === 'NAVIGATOR';
  const isSpecial = isHybrid || isContext;
  
  // Calculate hybrid score breakdown
  const hybridScores = {
    H: scores.H || 0,
    X: scores.X || 0,
    Y: scores.Y || 0,
    Z: scores.Z || 0,
  };
  const totalHybrid = hybridScores.H + hybridScores.X + hybridScores.Y + hybridScores.Z;
  const hybridPercentage = Math.round((totalHybrid / 20) * 100);

  // Calculate context score breakdown
  const contextScores = {
    MA_CTX: scores.MA_CTX || 0,
    WS_CTX: scores.WS_CTX || 0,
    PS_CTX: scores.PS_CTX || 0,
    DQ_CTX: scores.DQ_CTX || 0,
  };
  const totalContext = contextScores.MA_CTX + contextScores.WS_CTX + contextScores.PS_CTX + contextScores.DQ_CTX;
  const contextPercentage = Math.round((totalContext / 20) * 100);

  const dimensions = [
    { key: 'DB', labels: ['Detail-Focused', 'Big-Picture'], traits: ['D', 'B'], hybridTrait: 'H', contextTrait: 'MA_CTX', hybridLabel: 'Context-Adaptive', contextLabel: 'Project-Driven' },
    { key: 'AM', labels: ['Automated', 'Manual'], traits: ['A', 'M'], hybridTrait: 'X', contextTrait: 'WS_CTX', hybridLabel: 'Hybrid Workflow', contextLabel: 'Situational' },
    { key: 'SI', labels: ['Systematic', 'Intuitive'], traits: ['S', 'I'], hybridTrait: 'Y', contextTrait: 'PS_CTX', hybridLabel: 'Integrated', contextLabel: 'Flexible' },
    { key: 'PR', labels: ['Perfectionist', 'Pragmatic'], traits: ['P', 'R'], hybridTrait: 'Z', contextTrait: 'DQ_CTX', hybridLabel: 'Risk-Based', contextLabel: 'Responsive' },
  ];

  // Determine accent color classes
  const getAccentClasses = () => {
    if (isContext) return {
      border: 'border-amber-500/50',
      borderLight: 'border-amber-500/30',
      bg: 'from-amber-500/10 via-orange-500/10 to-amber-500/10',
      text: 'text-amber-500',
      textLight: 'text-amber-700 dark:text-amber-300',
      bgLight: 'bg-amber-500/10',
      gradient: 'gradient-context',
    };
    if (isHybrid) return {
      border: 'border-purple-500/50',
      borderLight: 'border-purple-500/30',
      bg: 'from-purple-500/10 via-violet-500/10 to-purple-500/10',
      text: 'text-purple-500',
      textLight: 'text-purple-700 dark:text-purple-300',
      bgLight: 'bg-purple-500/10',
      gradient: 'gradient-hybrid',
    };
    return {
      border: 'border-border',
      borderLight: 'border-border',
      bg: '',
      text: 'text-primary',
      textLight: 'text-muted-foreground',
      bgLight: 'bg-muted',
      gradient: 'gradient-cool',
    };
  };

  const accent = getAccentClasses();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Main Result Card */}
      <div className={`bg-card rounded-2xl shadow-card border overflow-hidden mb-8 ${accent.border}`}>
        {/* Header with gradient */}
        <div className={`relative bg-gradient-to-r ${personality.color} p-8 md:p-12 text-center overflow-hidden`}>
          {/* Special type decorative elements */}
          {isSpecial && (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
              <motion.div 
                className="absolute top-4 right-4 md:top-6 md:right-6"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  {isContext ? (
                    <>
                      <Settings2 className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-semibold">Context-Driven Type</span>
                    </>
                  ) : (
                    <>
                      <Blend className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-semibold">Hybrid Type</span>
                    </>
                  )}
                </div>
              </motion.div>
              {/* Floating icons */}
              <motion.div
                className="absolute top-1/4 left-8 opacity-20"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {isContext ? (
                  <Compass className="w-12 h-12 text-white" />
                ) : (
                  <Layers className="w-12 h-12 text-white" />
                )}
              </motion.div>
              <motion.div
                className="absolute bottom-1/4 right-12 opacity-20"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                {isContext ? (
                  <Settings2 className="w-10 h-10 text-white" />
                ) : (
                  <Zap className="w-10 h-10 text-white" />
                )}
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
              {isManagerMode 
                ? (isContext ? "Your Manager's Context-Driven Type" : isHybrid ? "Your Manager's Adaptive Type" : "Your Manager's InfoWorks ICM Modeller Type")
                : (isContext ? "Your Context-Driven InfoWorks ICM Modeller Type" : isHybrid ? "Your Adaptive InfoWorks ICM Modeller Type" : "Your InfoWorks ICM Modeller Type")
              }
            </span>
            {isManagerMode && (
              <div className="mb-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-xs">👔 Manager Mode</span>
              </div>
            )}
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-3">
              {personality.type}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              {personality.name}
            </p>
            {isSpecial && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <span className="text-white/90 text-sm">
                  {isContext ? `${contextPercentage}% context-dependent responses` : `${hybridPercentage}% adaptive responses`}
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

      {/* Context-Dependent Summary - Only shown for context types */}
      {isContext && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className={`bg-gradient-to-r ${accent.bg} rounded-2xl border ${accent.borderLight} p-6 mb-8`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-context flex items-center justify-center">
              <Settings2 className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">Your Context-Driven Profile</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            You adapt your approach based on project requirements, client needs, and available resources. Your decisions are driven by the specific context of each situation.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dimensions.map(({ contextTrait, contextLabel }) => {
              const contextCount = scores[contextTrait] || 0;
              return (
                <div key={contextTrait} className="bg-card/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-amber-500">{contextCount}</div>
                  <div className="text-xs text-muted-foreground">{contextLabel}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Hybrid Adaptability Summary - Only shown for hybrid types */}
      {isHybrid && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className={`bg-gradient-to-r ${accent.bg} rounded-2xl border ${accent.borderLight} p-6 mb-8`}
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
          {dimensions.map(({ key, labels, traits, hybridTrait, contextTrait, hybridLabel, contextLabel }) => {
            const first = traits[0];
            const second = traits[1];
            const firstScore = scores[first] || 0;
            const secondScore = scores[second] || 0;
            const hybridScore = scores[hybridTrait] || 0;
            const contextScore = scores[contextTrait] || 0;
            const total = firstScore + secondScore + hybridScore + contextScore;
            
            const firstPercent = total > 0 ? Math.round((firstScore / total) * 100) : 25;
            const secondPercent = total > 0 ? Math.round((secondScore / total) * 100) : 25;
            const hybridPercent = total > 0 ? Math.round((hybridScore / total) * 100) : 25;
            const contextPercent = total > 0 ? Math.round((contextScore / total) * 100) : 25;

            const maxPercent = Math.max(firstPercent, secondPercent, hybridPercent, contextPercent);

            return (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className={firstPercent === maxPercent ? 'text-primary' : 'text-muted-foreground'}>
                    {labels[0]}
                  </span>
                  <div className="flex gap-4">
                    {hybridPercent > 0 && (
                      <span className={hybridPercent === maxPercent ? 'text-purple-500' : 'text-muted-foreground'}>
                        {hybridLabel}
                      </span>
                    )}
                    {contextPercent > 0 && (
                      <span className={contextPercent === maxPercent ? 'text-amber-500' : 'text-muted-foreground'}>
                        {contextLabel}
                      </span>
                    )}
                  </div>
                  <span className={secondPercent === maxPercent ? 'text-secondary' : 'text-muted-foreground'}>
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
                    animate={{ width: `${contextPercent}%` }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="h-full gradient-context"
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
                  <div className="flex gap-4">
                    {hybridPercent > 0 && (
                      <span className="text-purple-500">{hybridPercent}%</span>
                    )}
                    {contextPercent > 0 && (
                      <span className="text-amber-500">{contextPercent}%</span>
                    )}
                  </div>
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
          className={`bg-card rounded-2xl shadow-card border p-6 ${accent.borderLight}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent.gradient}`}>
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">Your Strengths</h3>
          </div>
          <ul className="space-y-2">
            {personality.strengths.map((strength, i) => (
              <li key={i} className="flex items-center gap-2 text-muted-foreground">
                <span className={`w-1.5 h-1.5 rounded-full ${isContext ? 'bg-amber-500' : isHybrid ? 'bg-purple-500' : 'bg-primary'}`} />
                {strength}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className={`bg-card rounded-2xl shadow-card border p-6 ${accent.borderLight}`}
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
        className={`bg-card rounded-2xl shadow-card border p-6 mb-8 ${accent.borderLight}`}
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
                isContext
                  ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20'
                  : isHybrid 
                    ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20' 
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {tool}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Learning Resources */}
      <LearningResourcesSection 
        personality={personality}
        isManagerMode={isManagerMode}
        accentBorderLight={accent.borderLight}
      />

      {/* Share Your Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="bg-card rounded-2xl shadow-card border border-border p-6 mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-cool flex items-center justify-center">
            <Share2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {isManagerMode ? "Share Your Manager's Results" : "Share Your Results"}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {isManagerMode 
            ? "Share your manager's InfoWorks ICM modeller personality on social media!"
            : "Show off your InfoWorks ICM modeller personality! Download or share your result card on social media."
          }
        </p>
        <ShareableResultCard personality={personality} scores={scores} isManagerMode={isManagerMode} />
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
          className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-opacity ${accent.gradient}`}
        >
          <RotateCcw className="w-5 h-5" />
          Take the Test Again
        </button>
      </motion.div>
    </motion.div>
  );
};
