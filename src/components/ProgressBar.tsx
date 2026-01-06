import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  answeredQuestions: number[];
  onJumpToQuestion?: (questionIndex: number) => void;
}

export const ProgressBar = ({ current, total, answeredQuestions, onJumpToQuestion }: ProgressBarProps) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Question dots */}
      <div className="flex items-center justify-center gap-1.5 mb-4 flex-wrap">
        {Array.from({ length: total }, (_, i) => {
          const questionNumber = i + 1;
          const isAnswered = answeredQuestions.includes(i);
          const isCurrent = current === questionNumber;
          const canJump = i < current; // Can only jump to current or previous questions

          return (
            <motion.button
              key={i}
              onClick={() => canJump && onJumpToQuestion?.(i)}
              disabled={!canJump}
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200",
                isCurrent && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                isAnswered && !isCurrent && "bg-primary text-primary-foreground",
                !isAnswered && !isCurrent && "bg-muted text-muted-foreground",
                isCurrent && !isAnswered && "bg-primary/20 text-primary border border-primary",
                isCurrent && isAnswered && "bg-primary text-primary-foreground",
                canJump && !isCurrent && "hover:scale-110 cursor-pointer hover:ring-2 hover:ring-primary/50 hover:ring-offset-1 hover:ring-offset-background",
                !canJump && "cursor-default opacity-60"
              )}
              whileHover={canJump && !isCurrent ? { scale: 1.1 } : {}}
              whileTap={canJump && !isCurrent ? { scale: 0.95 } : {}}
              title={canJump ? `Jump to question ${questionNumber}` : `Question ${questionNumber}`}
            >
              {isAnswered && !isCurrent ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                questionNumber
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full gradient-cool"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Progress text */}
      <p className="text-center text-sm text-muted-foreground mt-2">
        Question {current} of {total}
      </p>
    </div>
  );
};
