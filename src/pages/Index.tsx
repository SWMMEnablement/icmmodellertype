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
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0,
  });

  const handleStart = useCallback(() => {
    setGameState("quiz");
    setCurrentQuestion(0);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  }, []);

  const handleAnswer = useCallback((trait: string) => {
    setScores(prev => ({
      ...prev,
      [trait]: prev[trait] + 1
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setGameState("result");
    }
  }, [currentQuestion]);

  const getPersonalityType = useCallback(() => {
    const type = [
      scores.E >= scores.I ? 'E' : 'I',
      scores.S >= scores.N ? 'S' : 'N',
      scores.T >= scores.F ? 'T' : 'F',
      scores.J >= scores.P ? 'J' : 'P',
    ].join('');
    return personalities[type] || personalities['INFJ'];
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
