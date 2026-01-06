import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Droplets, Clock, Sparkles, BookOpen } from "lucide-react";

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
          <Droplets className="w-10 h-10 text-primary-foreground" />
        </motion.div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
          What's Your
          <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ICM Modeller/Modeler Type?
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Discover your hydraulic modeling personality. Are you a detail-driven perfectionist 
          or a big-picture strategist? Do you automate everything or trust your hands-on instincts?
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">5 minutes</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sparkles className="w-5 h-5 text-secondary" />
            <span className="text-sm font-medium">20 questions</span>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-10 py-5 rounded-xl gradient-cool text-primary-foreground font-semibold text-lg shadow-glow hover:opacity-90 transition-opacity"
        >
          Start the Assessment
        </motion.button>

        {/* Separator */}
        <div className="mt-12 mb-8 flex items-center gap-4 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Documentation Link */}
        <Link
          to="/docs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>View Documentation & Personality Types</span>
        </Link>

        {/* Disclaimer */}
        <p className="mt-8 text-sm text-muted-foreground/70">
          For ICM InfoWorks users. Just for fun—embrace your modeling style!
        </p>
      </motion.div>
    </motion.div>
  );
};
