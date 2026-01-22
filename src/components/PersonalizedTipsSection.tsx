import { motion } from "framer-motion";
import { Lightbulb, Quote, ArrowRight } from "lucide-react";
import { PersonalityType } from "@/data/personalities";
import { getConsultation } from "@/data/personalizedTips";

interface PersonalizedTipsSectionProps {
  personality: PersonalityType;
  isManagerMode: boolean;
  accentBorderLight: string;
}

export const PersonalizedTipsSection = ({ 
  personality, 
  isManagerMode,
  accentBorderLight 
}: PersonalizedTipsSectionProps) => {
  const consultation = getConsultation(personality.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.42 }}
      className={`bg-card rounded-2xl shadow-card border p-6 mb-8 ${accentBorderLight}`}
    >
      {/* Key Insight - Highlighted quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45 }}
        className="mb-6 p-4 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl border border-primary/20"
      >
        <div className="flex items-start gap-3">
          <Quote className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-foreground font-medium italic">
              "{consultation.keyInsight}"
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {isManagerMode ? "Key insight about this manager type" : "Key insight about your type"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Detailed Profile */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48 }}
        className="mb-6"
      >
        <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-lg">🔍</span>
          </div>
          {isManagerMode ? "Understanding This Type" : "Deep Dive into Your Style"}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {consultation.detailedProfile}
        </p>
      </motion.div>

      {/* Actionable Tips */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {isManagerMode ? "Tips for Working with This Type" : "Personalized Action Tips"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isManagerMode 
                ? "How to collaborate effectively with this modeller type" 
                : "Specific advice to improve your ICM workflow"
              }
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {consultation.tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="group p-4 rounded-xl bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-border transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center text-xl">
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tip.title}
                    </h4>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {tip.tip}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
