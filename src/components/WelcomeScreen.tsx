import { motion } from "framer-motion";
import { Brain, Clock, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-8 rounded-2xl gradient-cool shadow-glow flex items-center justify-center"
        >
          <Brain className="w-10 h-10 text-primary-foreground" />
        </motion.div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
          Discover Your
          <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Personality Type
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Take our quick 10-question assessment to uncover your Myers-Briggs personality type 
          and gain insights into your unique strengths and tendencies.
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">2 minutes</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sparkles className="w-5 h-5 text-secondary" />
            <span className="text-sm font-medium">10 questions</span>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-10 py-5 rounded-xl gradient-cool text-primary-foreground font-semibold text-lg shadow-glow hover:opacity-90 transition-opacity"
        >
          Start the Test
        </motion.button>

        {/* Disclaimer */}
        <p className="mt-8 text-sm text-muted-foreground/70">
          This is a simplified assessment for self-reflection, not a clinical diagnosis.
        </p>
      </motion.div>
    </motion.div>
  );
};
