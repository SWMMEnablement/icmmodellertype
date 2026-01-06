import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { questions } from "@/data/questions";
import { personalities, resolveType, getHybridType } from "@/data/personalities";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ProgressBar";
import { ResultCard } from "@/components/ResultCard";

type GameState = "welcome" | "quiz" | "result";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    D: 0, B: 0, H: 0, // Detail vs Big-picture vs Hybrid
    A: 0, M: 0, X: 0, // Automated vs Manual vs Hybrid
    S: 0, I: 0, Y: 0, // Systematic vs Intuitive vs Hybrid
    P: 0, R: 0, Z: 0, // Perfectionist vs Pragmatic vs Hybrid
  });

  const handleStart = useCallback(() => {
    setGameState("quiz");
    setCurrentQuestion(0);
    setScores({ D: 0, B: 0, H: 0, A: 0, M: 0, X: 0, S: 0, I: 0, Y: 0, P: 0, R: 0, Z: 0 });
  }, []);

  const handleAnswer = useCallback((selectedTrait: string) => {
    setScores(prev => ({
      ...prev,
      [selectedTrait]: prev[selectedTrait] + 1
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setGameState("result");
    }
  }, [currentQuestion]);

  const getPersonalityType = useCallback(() => {
    // First check if the user is hybrid-dominant
    const hybridType = getHybridType(scores);
    if (hybridType) {
      return personalities[hybridType];
    }

    // For each dimension, find the winning trait (D/B/H, A/M/X, S/I/Y, P/R/Z)
    const getDimensionWinner = (traits: [string, string, string]) => {
      const [a, b, c] = traits;
      const scoreA = scores[a] || 0;
      const scoreB = scores[b] || 0;
      const scoreC = scores[c] || 0;
      
      // If hybrid (C) wins, map to the stronger of A/B
      const max = Math.max(scoreA, scoreB, scoreC);
      if (scoreC === max && scoreC > 0) {
        return scoreA >= scoreB ? a : b;
      }
      // Otherwise, winner between A and B (A wins ties)
      return scoreA >= scoreB ? a : b;
    };

    const rawType = [
      getDimensionWinner(['D', 'B', 'H']),
      getDimensionWinner(['A', 'M', 'X']),
      getDimensionWinner(['S', 'I', 'Y']),
      getDimensionWinner(['P', 'R', 'Z']),
    ].join('');
    
    const resolvedType = resolveType(rawType);
    return personalities[resolvedType] || personalities['DASP'];
  }, [scores]);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {gameState === "welcome" && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}

        {gameState === "quiz" && (
          <div key="quiz" className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
            <ProgressBar current={currentQuestion + 1} total={questions.length} />
            <AnimatePresence mode="wait">
              <QuestionCard
                key={currentQuestion}
                question={questions[currentQuestion]}
                onAnswer={(trait) => handleAnswer(trait)}
                questionNumber={currentQuestion + 1}
                totalQuestions={questions.length}
              />
            </AnimatePresence>
          </div>
        )}

        {gameState === "result" && (
          <div key="result" className="min-h-screen px-6 py-12">
            <ResultCard
              personality={getPersonalityType()}
              scores={scores}
              onRestart={handleStart}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
