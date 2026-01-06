import { useState } from "react";
import { motion } from "framer-motion";
import { Question } from "@/data/questions";
import { ArrowRight } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  onAnswer: (traitA: string, traitB: string, intensity: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

const sliderLabels = [
  { value: -2, label: "Strongly" },
  { value: -1, label: "Slightly" },
  { value: 0, label: "Neutral" },
  { value: 1, label: "Slightly" },
  { value: 2, label: "Strongly" },
];

export const QuestionCard = ({ question, onAnswer, questionNumber, totalQuestions }: QuestionCardProps) => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSubmit = () => {
    onAnswer(question.optionA.trait, question.optionB.trait, sliderValue);
    setSliderValue(0);
  };

  const getSliderBackground = () => {
    const percentage = ((sliderValue + 2) / 4) * 100;
    return `linear-gradient(to right, hsl(175 45% 30%) 0%, hsl(175 45% 30%) ${percentage}%, hsl(35 80% 55%) ${percentage}%, hsl(35 80% 55%) 100%)`;
  };

  const getIntensityLabel = () => {
    if (sliderValue === 0) return "No preference";
    const intensity = Math.abs(sliderValue) === 2 ? "Strongly" : "Slightly";
    const direction = sliderValue < 0 ? "A" : "B";
    return `${intensity} ${direction}`;
  };

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

      {/* Option Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <motion.div
          animate={{ 
            scale: sliderValue < 0 ? 1.02 : 1,
            borderColor: sliderValue < 0 ? "hsl(175 45% 30%)" : "hsl(var(--border))"
          }}
          className="p-5 rounded-xl bg-card shadow-soft border-2 transition-all"
        >
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-full gradient-cool flex items-center justify-center text-primary-foreground font-semibold text-sm shrink-0">
              A
            </span>
            <p className="text-foreground font-medium text-sm leading-relaxed">
              {question.optionA.text}
            </p>
          </div>
        </motion.div>

        <motion.div
          animate={{ 
            scale: sliderValue > 0 ? 1.02 : 1,
            borderColor: sliderValue > 0 ? "hsl(35 80% 55%)" : "hsl(var(--border))"
          }}
          className="p-5 rounded-xl bg-card shadow-soft border-2 transition-all"
        >
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-full gradient-warm flex items-center justify-center text-primary-foreground font-semibold text-sm shrink-0">
              B
            </span>
            <p className="text-foreground font-medium text-sm leading-relaxed">
              {question.optionB.text}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Slider Section */}
      <div className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8 mb-6">
        <p className="text-center text-muted-foreground text-sm mb-6">
          Move the slider toward the option that resonates with you
        </p>

        {/* Labels */}
        <div className="flex justify-between mb-3 px-1">
          <span className="text-xs font-medium text-primary">Strongly A</span>
          <span className="text-xs font-medium text-muted-foreground">Neutral</span>
          <span className="text-xs font-medium text-secondary">Strongly B</span>
        </div>

        {/* Custom Slider */}
        <div className="relative mb-6">
          <input
            type="range"
            min="-2"
            max="2"
            step="1"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer slider-thumb"
            style={{ background: getSliderBackground() }}
          />
          
          {/* Tick marks */}
          <div className="absolute top-full mt-2 w-full flex justify-between px-[2px]">
            {sliderLabels.map((item) => (
              <div
                key={item.value}
                className={`w-2 h-2 rounded-full transition-all ${
                  sliderValue === item.value 
                    ? 'bg-foreground scale-125' 
                    : 'bg-muted-foreground/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current Selection */}
        <motion.div
          key={sliderValue}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8"
        >
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
            sliderValue === 0 
              ? 'bg-muted text-muted-foreground' 
              : sliderValue < 0 
                ? 'gradient-cool text-primary-foreground' 
                : 'gradient-warm text-primary-foreground'
          }`}>
            {getIntensityLabel()}
          </span>
        </motion.div>
      </div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        className="w-full py-4 rounded-xl gradient-cool text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        Continue
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 3px solid hsl(var(--foreground));
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: transform 0.2s;
        }
        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 3px solid hsl(var(--foreground));
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
      `}</style>
    </motion.div>
  );
};
