import { motion } from "framer-motion";
import { Users, Handshake, AlertTriangle, Lightbulb, Trophy, UserCheck } from "lucide-react";
import { getTeamDynamics, getTypeDisplayName, TeamDynamicsData } from "@/data/teamDynamics";

interface TeamDynamicsSectionProps {
  personalityType: string;
  isManagerMode: boolean;
  accentBorderLight: string;
}

const CompatibilityBadge = ({ compatibility }: { compatibility: 'high' | 'medium' | 'complementary' }) => {
  const styles = {
    high: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    medium: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    complementary: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  };
  
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${styles[compatibility]}`}>
      {compatibility}
    </span>
  );
};

export const TeamDynamicsSection = ({ personalityType, isManagerMode, accentBorderLight }: TeamDynamicsSectionProps) => {
  const dynamics = getTeamDynamics(personalityType);
  
  if (!dynamics) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.68 }}
      className={`bg-card rounded-2xl shadow-card border p-6 mb-8 ${accentBorderLight}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {isManagerMode ? "How This Type Collaborates" : "Your Team Dynamics"}
          </h3>
          <p className="text-xs text-muted-foreground">
            Discover how {isManagerMode ? "this type works" : "you work"} best with other modelling styles
          </p>
        </div>
      </div>

      {/* Team Role */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/10">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-1 block">
              {isManagerMode ? "Their Team Role" : "Your Team Role"}
            </span>
            <p className="text-sm text-foreground font-medium">{dynamics.teamRole}</p>
          </div>
        </div>
      </div>

      {/* Ideal Partners */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <UserCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-semibold text-foreground">Ideal Partners</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {dynamics.idealPartners.map((partner) => (
            <span
              key={partner}
              className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-sm font-medium border border-emerald-500/20"
            >
              {partner} — {getTypeDisplayName(partner)}
            </span>
          ))}
        </div>
      </div>

      {/* Works Well With */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Handshake className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold text-foreground">
            {isManagerMode ? "Works Well With" : "You Work Well With"}
          </span>
        </div>
        <div className="space-y-3">
          {dynamics.worksWith.map((collab, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-muted/30 border border-transparent hover:border-border transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm text-foreground">{collab.type}</span>
                <span className="text-muted-foreground text-sm">—</span>
                <span className="text-sm text-muted-foreground">{getTypeDisplayName(collab.type)}</span>
                <CompatibilityBadge compatibility={collab.compatibility} />
              </div>
              <p className="text-sm text-muted-foreground">{collab.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Challenges With */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-semibold text-foreground">Potential Friction Points</span>
        </div>
        <div className="space-y-3">
          {dynamics.challengesWith.map((challenge, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm text-foreground">{challenge.type}</span>
                <span className="text-muted-foreground text-sm">—</span>
                <span className="text-sm text-muted-foreground">{getTypeDisplayName(challenge.type)}</span>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">{challenge.challenge}</p>
              <div className="flex items-start gap-2 pt-2 border-t border-amber-500/10">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">{challenge.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
