import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { questions } from "@/data/questions";
import { personalities } from "@/data/personalities";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ProgressBar";
import { ResultCard } from "@/components/ResultCard";

type GameState = "welcome" | "quiz" | "result";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    D: 0, B: 0, // Detail vs Big-picture
    A: 0, M: 0, // Automated vs Manual
    S: 0, I: 0, // Systematic vs Intuitive
    P: 0, R: 0, // Perfectionist vs Pragmatic
  });

  const handleStart = useCallback(() => {
    setGameState("quiz");
    setCurrentQuestion(0);
    setScores({ D: 0, B: 0, A: 0, M: 0, S: 0, I: 0, P: 0, R: 0 });
  }, []);

  const handleAnswer = useCallback((traitA: string, traitB: string, intensity: number) => {
    // intensity: -2 (strongly A), -1 (slightly A), 0 (neutral), 1 (slightly B), 2 (strongly B)
    setScores(prev => {
      const newScores = { ...prev };
      
      if (intensity < 0) {
        newScores[traitA] += Math.abs(intensity);
      } else if (intensity > 0) {
        newScores[traitB] += intensity;
      } else {
        newScores[traitA] += 0.5;
        newScores[traitB] += 0.5;
      }
      
      return newScores;
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setGameState("result");
    }
  }, [currentQuestion]);

  const getPersonalityType = useCallback(() => {
    const type = [
      scores.D >= scores.B ? 'D' : 'B',
      scores.A >= scores.M ? 'A' : 'M',
      scores.S >= scores.I ? 'S' : 'I',
      scores.P >= scores.R ? 'P' : 'R',
    ].join('');
    return personalities[type] || personalities['DASP'];
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
                onAnswer={handleAnswer}
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
