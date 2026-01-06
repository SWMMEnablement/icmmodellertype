import { useState } from "react";
import { motion } from "framer-motion";
import { Question } from "@/data/questions";
import { ArrowRight, Check } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedTrait: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard = ({ question, onAnswer, questionNumber, totalQuestions }: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | null>(null);

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    const trait = selectedOption === 'A' 
      ? question.optionA.trait 
      : selectedOption === 'B' 
        ? question.optionB.trait 
        : question.optionC.trait;
    
    onAnswer(trait);
    setSelectedOption(null);
  };

  const options = [
    { key: 'A' as const, data: question.optionA, gradient: 'gradient-cool', color: 'hsl(175 45% 30%)' },
    { key: 'B' as const, data: question.optionB, gradient: 'gradient-warm', color: 'hsl(35 80% 55%)' },
    { key: 'C' as const, data: question.optionC, gradient: 'gradient-hybrid', color: 'hsl(270 50% 50%)' },
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
      <div className="mb-8 text-center">
        <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>

      <h2 className="font-display text-2xl md:text-3xl text-center mb-10 text-foreground leading-relaxed">
        {question.text}
      </h2>

      {/* Option Cards */}
      <div className="flex flex-col gap-4 mb-8">
        {options.map((option) => (
          <motion.button
            key={option.key}
            onClick={() => setSelectedOption(option.key)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`relative p-5 rounded-xl bg-card shadow-soft border-2 transition-all text-left ${
              selectedOption === option.key 
                ? option.key === 'A' 
                  ? 'border-primary ring-2 ring-primary/30' 
                  : option.key === 'B'
                    ? 'border-secondary ring-2 ring-secondary/30'
                    : 'border-purple-500 ring-2 ring-purple-500/30'
                : 'border-border hover:border-muted-foreground/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <span className={`w-10 h-10 rounded-full ${option.gradient} flex items-center justify-center text-primary-foreground font-semibold text-sm shrink-0`}>
                {selectedOption === option.key ? <Check className="w-5 h-5" /> : option.key}
              </span>
              <p className="text-foreground font-medium text-sm leading-relaxed pt-2">
                {option.data.text}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Selection indicator */}
      <div className="text-center mb-6">
        <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
          selectedOption === null
            ? 'bg-muted text-muted-foreground' 
            : selectedOption === 'A'
              ? 'gradient-cool text-primary-foreground'
              : selectedOption === 'B'
                ? 'gradient-warm text-primary-foreground'
                : 'gradient-hybrid text-primary-foreground'
        }`}>
          {selectedOption === null ? 'Select an option' : `Option ${selectedOption} selected`}
        </span>
      </div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: selectedOption ? 1.02 : 1 }}
        whileTap={{ scale: selectedOption ? 0.98 : 1 }}
        onClick={handleSubmit}
        disabled={!selectedOption}
        className={`w-full py-4 rounded-xl font-semibold shadow-glow flex items-center justify-center gap-2 transition-all ${
          selectedOption 
            ? 'gradient-cool text-primary-foreground hover:opacity-90 cursor-pointer' 
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
      >
        Continue
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};
