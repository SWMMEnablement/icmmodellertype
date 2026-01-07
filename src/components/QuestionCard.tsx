import { motion } from "framer-motion";
import { Question } from "@/data/questions";
import { dimensionDescriptions } from "@/data/personalities";
import { ArrowLeft, Blend, Settings2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedTrait: string) => void;
  onGoBack?: () => void;
  questionNumber: number;
  totalQuestions: number;
  canGoBack: boolean;
}

export const QuestionCard = ({ question, onAnswer, onGoBack, questionNumber, totalQuestions, canGoBack }: QuestionCardProps) => {
  const handleOptionClick = (optionKey: 'A' | 'B' | 'C' | 'D') => {
    const trait = optionKey === 'A' 
      ? question.optionA.trait 
      : optionKey === 'B' 
        ? question.optionB.trait 
        : optionKey === 'C'
          ? question.optionC.trait
          : question.optionD.trait;
    
    onAnswer(trait);
  };

  // Get dimension info for Option C and D tooltips
  const dimensionInfo = dimensionDescriptions[question.dimension];

  const options = [
    { key: 'A' as const, data: question.optionA, gradient: 'gradient-cool', label: dimensionInfo.optionA.label, description: dimensionInfo.optionA.description, colorClass: 'text-primary' },
    { key: 'B' as const, data: question.optionB, gradient: 'gradient-warm', label: dimensionInfo.optionB.label, description: dimensionInfo.optionB.description, colorClass: 'text-secondary' },
    { key: 'C' as const, data: question.optionC, gradient: 'gradient-hybrid', label: dimensionInfo.optionC.label, description: dimensionInfo.optionC.description, isHybrid: true, colorClass: 'text-purple-400' },
    { key: 'D' as const, data: question.optionD, gradient: 'gradient-context', label: dimensionInfo.optionD.label, description: dimensionInfo.optionD.description, isContext: true, colorClass: 'text-amber-400' },
  ];

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Header with question number and back button */}
      <div className="flex items-center justify-between mb-8">
        {canGoBack ? (
          <motion.button
            onClick={onGoBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Go Back</span>
          </motion.button>
        ) : (
          <div />
        )}
        <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="w-20" /> {/* Spacer for centering */}
      </div>

      <h2 className="font-display text-2xl md:text-3xl text-center mb-10 text-foreground leading-relaxed">
        {question.text}
      </h2>

      {/* Option Cards - Click to answer and proceed */}
      <TooltipProvider>
        <div className="flex flex-col gap-4">
          {options.map((option) => (
            <Tooltip key={option.key}>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={() => handleOptionClick(option.key)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative p-5 rounded-xl bg-card shadow-soft border-2 border-border hover:border-muted-foreground/50 transition-all text-left group"
                >
                  <div className="flex items-start gap-4">
                    <span className={`w-10 h-10 rounded-full ${option.gradient} flex items-center justify-center text-primary-foreground font-semibold text-sm shrink-0 group-hover:scale-110 transition-transform`}>
                      {option.key}
                    </span>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          {option.label}
                        </span>
                        {option.isHybrid && (
                          <Blend className="w-3 h-3 text-purple-500" />
                        )}
                        {option.isContext && (
                          <Settings2 className="w-3 h-3 text-amber-500" />
                        )}
                      </div>
                      <p className="text-foreground font-medium text-sm leading-relaxed">
                        {option.data.text}
                      </p>
                    </div>
                  </div>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs">
                <p className="text-sm">
                  <strong className={option.colorClass}>{option.label}:</strong>{" "}
                  {option.description}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      {/* Hint text */}
      <p className="text-center text-muted-foreground text-sm mt-6">
        Click an option to continue
      </p>
    </motion.div>
  );
};
