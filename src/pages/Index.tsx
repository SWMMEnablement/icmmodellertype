import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { questions } from "@/data/questions";
import { personalities, resolveType, getHybridType } from "@/data/personalities";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ProgressBar";
import { ResultCard } from "@/components/ResultCard";
import { ICMChatbot } from "@/components/ICMChatbot";
import { useQuizHistory } from "@/hooks/useQuizHistory";
import { recordQuizToDb } from "@/hooks/useQuizStats";
type GameState = "welcome" | "quiz" | "result";
export type QuizMode = "self" | "manager";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [quizMode, setQuizMode] = useState<QuizMode>("self");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<string[]>([]);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({
    D: 0, B: 0, H: 0, // Detail vs Big-picture vs Hybrid
    A: 0, M: 0, X: 0, // Automated vs Manual vs Hybrid
    S: 0, I: 0, Y: 0, // Systematic vs Intuitive vs Hybrid
    P: 0, R: 0, Z: 0, // Perfectionist vs Pragmatic vs Hybrid
    MA_CTX: 0, WS_CTX: 0, PS_CTX: 0, DQ_CTX: 0, // Context-dependent
  });
  
  const { 
    history, 
    hasHistory, 
    newAchievements, 
    recordQuizResult, 
    clearNewAchievements 
  } = useQuizHistory();
  const handleStart = useCallback((mode: QuizMode = "self") => {
    setQuizMode(mode);
    setGameState("quiz");
    setCurrentQuestion(0);
    setAnswerHistory([]);
    setHasRecorded(false);
    setScores({ D: 0, B: 0, H: 0, A: 0, M: 0, X: 0, S: 0, I: 0, Y: 0, P: 0, R: 0, Z: 0, MA_CTX: 0, WS_CTX: 0, PS_CTX: 0, DQ_CTX: 0 });
  }, []);

  const handleAnswer = useCallback((selectedTrait: string) => {
    // Store the answer for this question (so we can undo it)
    setAnswerHistory(prev => [...prev.slice(0, currentQuestion), selectedTrait]);
    
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

  const handleGoBack = useCallback(() => {
    if (currentQuestion > 0) {
      const previousAnswer = answerHistory[currentQuestion - 1];
      if (previousAnswer) {
        // Remove the score from the previous answer
        setScores(prev => ({
          ...prev,
          [previousAnswer]: prev[previousAnswer] - 1
        }));
      }
      setCurrentQuestion(prev => prev - 1);
      setAnswerHistory(prev => prev.slice(0, -1));
    }
  }, [currentQuestion, answerHistory]);

  const handleJumpToQuestion = useCallback((targetIndex: number) => {
    if (targetIndex < currentQuestion && targetIndex >= 0) {
      // Remove scores for all questions from target to current
      const answersToRemove = answerHistory.slice(targetIndex);
      const newScores = { ...scores };
      answersToRemove.forEach(answer => {
        if (answer) {
          newScores[answer] = (newScores[answer] || 1) - 1;
        }
      });
      setScores(newScores);
      setCurrentQuestion(targetIndex);
      setAnswerHistory(prev => prev.slice(0, targetIndex));
    }
  }, [currentQuestion, answerHistory, scores]);

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

  // Record quiz result when entering result state
  useEffect(() => {
    if (gameState === "result" && !hasRecorded) {
      const personality = getPersonalityType();
      recordQuizResult({
        type: personality.type,
        name: personality.name,
        scores: { ...scores },
        mode: quizMode
      });
      // Also record to database for social proof stats
      recordQuizToDb(personality.type, quizMode);
      setHasRecorded(true);
    }
  }, [gameState, hasRecorded, getPersonalityType, recordQuizResult, scores, quizMode]);

  // Generate shareable URL for current result
  const getShareableUrl = () => {
    if (gameState !== "result") return "";
    const personality = getPersonalityType();
    const scoreKeys = ['D', 'B', 'H', 'A', 'M', 'X', 'S', 'I', 'Y', 'P', 'R', 'Z', 'MA_CTX', 'WS_CTX', 'PS_CTX', 'DQ_CTX'];
    const scoreValues = scoreKeys.map(k => scores[k] || 0).join(',');
    return `${window.location.origin}/results/${personality.type}?s=${scoreValues}&mode=${quizMode}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <ICMChatbot />
      <AnimatePresence mode="wait">
        {gameState === "welcome" && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}

        {gameState === "quiz" && (
          <div key="quiz" className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
            {quizMode === "manager" && (
              <div className="mb-4 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full">
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                  👔 Manager Mode — Answer as your manager would
                </span>
              </div>
            )}
            <ProgressBar 
              current={currentQuestion + 1} 
              total={questions.length} 
              answeredQuestions={answerHistory.map((_, i) => i)}
              onJumpToQuestion={handleJumpToQuestion}
            />
            <AnimatePresence mode="wait">
              <QuestionCard
                key={currentQuestion}
                question={questions[currentQuestion]}
                onAnswer={(trait) => handleAnswer(trait)}
                onGoBack={handleGoBack}
                questionNumber={currentQuestion + 1}
                totalQuestions={questions.length}
                canGoBack={currentQuestion > 0}
              />
            </AnimatePresence>
          </div>
        )}

        {gameState === "result" && (
          <div key="result" className="min-h-screen px-6 py-12">
            <ResultCard
              personality={getPersonalityType()}
              scores={scores}
              onRestart={() => handleStart("self")}
              quizMode={quizMode}
              history={history}
              newAchievements={newAchievements}
              onClearNewAchievements={clearNewAchievements}
              shareableUrl={getShareableUrl()}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
