import { useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { scenarios, traitToTypeMap, type ScenarioOption } from "@/data/scenarios";
import { ArrowLeft, ArrowRight, CheckCircle2, Target, Zap, RotateCcw, Home } from "lucide-react";
import { ICMChatbot } from "@/components/ICMChatbot";

interface ScenarioAnswer {
  scenarioId: string;
  selectedOption: number;
  traits: string[];
  alignment: string;
}

const dimensionColors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  MA: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-600 dark:text-blue-400", icon: "text-blue-500" },
  WS: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-600 dark:text-emerald-400", icon: "text-emerald-500" },
  PS: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-600 dark:text-amber-400", icon: "text-amber-500" },
  DQ: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-600 dark:text-purple-400", icon: "text-purple-500" },
};

const Scenarios = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userType = searchParams.get("type") || null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<ScenarioAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const scenario = scenarios[currentIndex];
  const colors = dimensionColors[scenario.dimension];

  const handleSelect = useCallback((optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowResult(true);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedOption === null) return;

    const option = scenario.options[selectedOption];
    const newAnswer: ScenarioAnswer = {
      scenarioId: scenario.id,
      selectedOption,
      traits: option.traits,
      alignment: option.alignment,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setSelectedOption(null);
    setShowResult(false);

    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  }, [selectedOption, scenario, answers, currentIndex]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
    setIsComplete(false);
  }, []);

  // Compute alignment summary
  const getAlignmentSummary = () => {
    const dimensionAnswers: Record<string, string[]> = { MA: [], WS: [], PS: [], DQ: [] };
    answers.forEach(a => {
      const s = scenarios.find(sc => sc.id === a.scenarioId);
      if (s) {
        a.traits.forEach(t => dimensionAnswers[s.dimension].push(t));
      }
    });

    // Count trait frequencies
    const traitCounts: Record<string, number> = {};
    answers.forEach(a => {
      a.traits.forEach(t => {
        traitCounts[t] = (traitCounts[t] || 0) + 1;
      });
    });

    return { dimensionAnswers, traitCounts };
  };

  const getUserTypeTraits = (): string[] => {
    if (!userType) return [];
    // Map DASP -> [D, A, S, P]
    const traitMap: Record<number, string[]> = {
      0: ["D", "B", "H"],
      1: ["A", "M", "X"],
      2: ["S", "I", "Y"],
      3: ["P", "R", "Z"],
    };
    return userType.split("").map((char, i) => {
      const possible = traitMap[i];
      return possible?.find(t => t === char) || char;
    });
  };

  if (isComplete) {
    const { traitCounts } = getAlignmentSummary();
    const userTraits = getUserTypeTraits();
    const totalScenarios = answers.length;

    // Count how many answers aligned with user's quiz type
    let alignedCount = 0;
    answers.forEach(a => {
      const s = scenarios.find(sc => sc.id === a.scenarioId);
      if (!s) return;
      const dimIndex = { MA: 0, WS: 1, PS: 2, DQ: 3 }[s.dimension];
      if (dimIndex !== undefined && userTraits[dimIndex]) {
        if (a.traits.includes(userTraits[dimIndex])) alignedCount++;
      }
    });

    const alignmentPct = userType ? Math.round((alignedCount / totalScenarios) * 100) : null;

    // Sort traits by frequency
    const sortedTraits = Object.entries(traitCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4);

    return (
      <div className="min-h-screen bg-background">
        <ICMChatbot />
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full"
          >
            <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
              {/* Header */}
              <div className="gradient-cool p-8 text-center">
                <Target className="w-12 h-12 text-primary-foreground mx-auto mb-3 opacity-80" />
                <h2 className="font-display text-2xl font-bold text-primary-foreground mb-2">
                  Scenario Analysis Complete
                </h2>
                <p className="text-primary-foreground/80 text-sm">
                  {totalScenarios} scenarios answered
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Alignment with quiz type */}
                {userType && alignmentPct !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-xl border border-border p-5 text-center"
                  >
                    <div className="text-4xl font-display font-bold text-primary mb-1">
                      {alignmentPct}%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      of your scenario choices aligned with your quiz type{" "}
                      <span className="font-semibold text-foreground">{userType}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {alignmentPct >= 70
                        ? "Your scenario instincts strongly match your quiz profile — you know yourself well."
                        : alignmentPct >= 40
                        ? "Interesting mix — you adapt your approach based on the situation more than your quiz type suggests."
                        : "Your real-world instincts differ significantly from your quiz answers — context changes everything for you."}
                    </p>
                  </motion.div>
                )}

                {/* Trait breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    Your Scenario Tendencies
                  </h3>
                  <div className="space-y-3">
                    {sortedTraits.map(([trait, count]) => {
                      const info = traitToTypeMap[trait];
                      if (!info) return null;
                      const pct = Math.round((count / totalScenarios) * 100);
                      return (
                        <div key={trait} className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium text-foreground">{info.label}</span>
                              <span className="text-muted-foreground">{pct}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="h-full rounded-full bg-primary"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Per-scenario review */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    Your Choices
                  </h3>
                  <div className="space-y-2">
                    {answers.map((a, i) => {
                      const s = scenarios.find(sc => sc.id === a.scenarioId)!;
                      const dimColors = dimensionColors[s.dimension];
                      const dimIndex = { MA: 0, WS: 1, PS: 2, DQ: 3 }[s.dimension];
                      const aligned = userType && dimIndex !== undefined && userTraits[dimIndex]
                        ? a.traits.includes(userTraits[dimIndex])
                        : null;

                      return (
                        <div
                          key={a.scenarioId}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${dimColors.bg} ${dimColors.border}`}
                        >
                          <span className={`text-xs font-mono font-bold ${dimColors.text}`}>
                            {i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {s.title}
                            </p>
                            <p className={`text-xs ${dimColors.text}`}>{a.alignment}</p>
                          </div>
                          {aligned !== null && (
                            <span className={`text-xs font-medium ${aligned ? "text-emerald-600" : "text-amber-600"}`}>
                              {aligned ? "✓ Matches" : "≠ Different"}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleRestart}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-foreground font-medium hover:bg-muted transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl gradient-cool text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                  >
                    <Home className="w-4 h-4" />
                    Back to Quiz
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ICMChatbot />
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
        {/* Progress */}
        <div className="w-full max-w-2xl mb-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <span>
              Scenario {currentIndex + 1} of {scenarios.length}
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + (showResult ? 1 : 0)) / scenarios.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Scenario Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
              {/* Scenario Header */}
              <div className={`p-5 border-b ${colors.bg} ${colors.border}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-mono font-bold uppercase ${colors.text}`}>
                    {scenario.dimensionLabel}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-foreground mb-2">
                  {scenario.title}
                </h2>
              </div>

              {/* Situation */}
              <div className="p-5 border-b border-border">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {scenario.situation}
                </p>
              </div>

              {/* Options */}
              <div className="p-5 space-y-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                  What would you do?
                </p>
                {scenario.options.map((option, i) => {
                  const isSelected = selectedOption === i;
                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => !showResult && handleSelect(i)}
                      disabled={showResult}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        showResult && isSelected
                          ? `${colors.bg} ${colors.border} ring-2 ring-primary/30`
                          : showResult
                          ? "border-border opacity-50"
                          : isSelected
                          ? `${colors.bg} ${colors.border}`
                          : "border-border hover:border-primary/30 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">
                            {option.label}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {option.description}
                          </p>
                        </div>
                      </div>

                      {/* Show alignment after selection */}
                      {showResult && isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3 pt-3 border-t border-border/50"
                        >
                          <div className="flex items-center gap-2">
                            <Zap className={`w-4 h-4 ${colors.icon}`} />
                            <span className={`text-xs font-medium ${colors.text}`}>
                              This is a <strong>{option.alignment}</strong> approach
                            </span>
                          </div>
                          {userType && (() => {
                            const dimIndex = { MA: 0, WS: 1, PS: 2, DQ: 3 }[scenario.dimension];
                            const userTraitForDim = dimIndex !== undefined ? getUserTypeTraits()[dimIndex] : null;
                            const aligned = userTraitForDim ? option.traits.includes(userTraitForDim) : false;
                            return (
                              <p className={`text-xs mt-1 ${aligned ? "text-emerald-600" : "text-amber-600"}`}>
                                {aligned
                                  ? `✓ Matches your ${userType} quiz profile for this dimension`
                                  : `≠ Different from your ${userType} quiz profile — your scenario instincts may differ from your general preference`}
                              </p>
                            );
                          })()}
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Next button */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-5 pb-5"
                >
                  <button
                    onClick={handleNext}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-cool text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                  >
                    {currentIndex < scenarios.length - 1 ? (
                      <>
                        Next Scenario
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        See Results
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scenarios;
