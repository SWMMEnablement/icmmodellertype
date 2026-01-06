import { motion } from "framer-motion";
import { Question } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
  onAnswer: (trait: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard = ({ question, onAnswer, questionNumber, totalQuestions }: QuestionCardProps) => {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="mb-8 text-center">
        <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>

      <h2 className="font-display text-2xl md:text-3xl text-center mb-12 text-foreground leading-relaxed">
        {question.text}
      </h2>

      <div className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAnswer(question.optionA.trait)}
          className="w-full p-6 rounded-xl bg-card shadow-card border border-border hover:border-primary/30 hover:shadow-glow transition-all duration-300 text-left group"
        >
          <div className="flex items-center gap-4">
            <span className="w-10 h-10 rounded-full gradient-cool flex items-center justify-center text-primary-foreground font-semibold text-sm shrink-0">
              A
            </span>
            <p className="text-foreground font-medium group-hover:text-primary transition-colors">
              {question.optionA.text}
            </p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAnswer(question.optionB.trait)}
          className="w-full p-6 rounded-xl bg-card shadow-card border border-border hover:border-secondary/30 hover:shadow-soft transition-all duration-300 text-left group"
        >
          <div className="flex items-center gap-4">
            <span className="w-10 h-10 rounded-full gradient-warm flex items-center justify-center text-primary-foreground font-semibold text-sm shrink-0">
              B
            </span>
            <p className="text-foreground font-medium group-hover:text-secondary transition-colors">
              {question.optionB.text}
            </p>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};
