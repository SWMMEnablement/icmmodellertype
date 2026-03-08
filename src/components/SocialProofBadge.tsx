import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useQuizStats } from "@/hooks/useQuizStats";

interface SocialProofBadgeProps {
  personalityType: string;
  personalityName: string;
}

export const SocialProofBadge = ({ personalityType, personalityName }: SocialProofBadgeProps) => {
  const { totalQuizzes, typePercentage, isLoading } = useQuizStats();
  
  if (isLoading || totalQuizzes < 5) return null; // Don't show until we have meaningful data

  const percentage = typePercentage(personalityType);
  const count = Math.round((percentage / 100) * totalQuizzes);
  
  const getRarityLabel = (pct: number) => {
    if (pct <= 5) return { label: "Ultra Rare", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" };
    if (pct <= 10) return { label: "Rare", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30" };
    if (pct <= 20) return { label: "Uncommon", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" };
    return { label: "Common", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" };
  };

  const rarity = getRarityLabel(percentage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className={`flex items-center justify-center gap-3 rounded-xl border p-4 mb-8 ${rarity.bg}`}
    >
      <Users className={`w-5 h-5 ${rarity.color}`} />
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          <span className={`font-bold ${rarity.color}`}>{percentage}%</span> of ICM modellers who've taken this quiz are{" "}
          <span className="font-semibold text-foreground">{personalityName}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          <span className={`font-medium ${rarity.color}`}>{rarity.label}</span> · {count.toLocaleString()} of {totalQuizzes.toLocaleString()} modellers
        </p>
      </div>
    </motion.div>
  );
};
