import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { personalities, resolveType } from "@/data/personalities";
import { ResultCard } from "@/components/ResultCard";
import { ICMChatbot } from "@/components/ICMChatbot";
import type { QuizMode } from "@/pages/Index";

const Results = () => {
  const { type } = useParams<{ type: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const mode = (searchParams.get("mode") || "self") as QuizMode;

  // Resolve the personality type
  const resolvedType = type ? resolveType(type.toUpperCase()) : null;
  
  // Find personality - check both resolved type and direct key lookup
  const personality = resolvedType 
    ? personalities[resolvedType] || Object.values(personalities).find(p => p.type === resolvedType)
    : null;

  if (!personality) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Type Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The personality type "{type}" doesn't exist in our system.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Take the Quiz
          </button>
        </div>
      </div>
    );
  }

  // Parse scores from URL params
  const scores: Record<string, number> = {};
  const scoreParam = searchParams.get("s");
  if (scoreParam) {
    const scoreKeys = ['D', 'B', 'H', 'A', 'M', 'X', 'S', 'I', 'Y', 'P', 'R', 'Z', 'MA_CTX', 'WS_CTX', 'PS_CTX', 'DQ_CTX'];
    const values = scoreParam.split(',').map(Number);
    scoreKeys.forEach((key, i) => {
      scores[key] = values[i] || 0;
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <ICMChatbot />
      <div className="min-h-screen px-6 py-12">
        <ResultCard
          personality={personality}
          scores={scores}
          onRestart={() => navigate("/")}
          quizMode={mode}
        />
      </div>
    </div>
  );
};

export default Results;
