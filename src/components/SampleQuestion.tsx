import { motion } from "framer-motion";
import { useState } from "react";
import { MessageCircle, ChevronRight } from "lucide-react";

interface SampleQuestionProps {
  onStart: () => void;
}

export const SampleQuestion = ({ onStart }: SampleQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const sampleQuestion = {
    text: "When your model won't converge, you...",
    options: [
      {
        key: 'A',
        text: "Systematically isolate sections and check parameters methodically",
        feedback: "Classic Systematic approach! You trust the process.",
        color: "from-primary to-primary/80",
      },
      {
        key: 'B',
        text: "Trust your instincts—you often know where the problem is",
        feedback: "Intuitive modeller detected! Experience guides you.",
        color: "from-secondary to-secondary/80",
      },
      {
        key: 'C',
        text: "Start with your best guess, then systematically verify",
        feedback: "Hybrid approach! Best of both worlds.",
        color: "from-purple-500 to-violet-600",
      },
      {
        key: 'D',
        text: "Depends on my familiarity with this model",
        feedback: "Context-driven! Flexibility is your strength.",
        color: "from-amber-500 to-orange-600",
      },
    ],
  };

  const handleSelect = (key: string) => {
    setSelectedOption(key);
    setShowFeedback(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Sample Question</span>
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {sampleQuestion.text}
        </h3>

        {/* Options */}
        <div className="space-y-2">
          {sampleQuestion.options.map((option) => (
            <motion.button
              key={option.key}
              onClick={() => handleSelect(option.key)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedOption === option.key
                  ? `bg-gradient-to-r ${option.color} text-white border-transparent`
                  : 'bg-muted/30 border-border/50 hover:border-border hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  selectedOption === option.key
                    ? 'bg-white/20 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {option.key}
                </span>
                <span className="text-sm">{option.text}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && selectedOption && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-border/50"
          >
            <p className="text-sm text-muted-foreground mb-3">
              {sampleQuestion.options.find(o => o.key === selectedOption)?.feedback}
            </p>
            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg gradient-cool text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2"
            >
              Take the Full Quiz
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
