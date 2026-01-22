import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Users, Handshake, AlertTriangle, Lightbulb, Star, ChevronDown, X } from "lucide-react";
import { PersonalityType, personalities } from "@/data/personalities";
import { teamDynamics, getTeamDynamics, getTypeDisplayName } from "@/data/teamDynamics";
import { Button } from "@/components/ui/button";

interface QuickCompareSectionProps {
  personality: PersonalityType;
  accentBorderLight: string;
}

// Get all available types for comparison
const getCompareableTypes = () => {
  const types = Object.entries(personalities).map(([key, value]) => ({
    code: key,
    displayCode: value.type,
    name: value.name,
  }));
  return types;
};

export const QuickCompareSection = ({ personality, accentBorderLight }: QuickCompareSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const availableTypes = getCompareableTypes().filter(t => t.displayCode !== personality.type);
  
  // Get the internal key for the user's type
  const getUserTypeKey = () => {
    const typeMap: Record<string, string> = {
      "CONTEXT": "CONTEXT_MASTER",
      "NAVIGATOR": "CONTEXT_NAVIGATOR",
      "HYBRID": "HYBRID_INTEGRATOR",
      "ADAPTIVE": "HYBRID_ADAPTIVE",
      "FLEX": "HYBRID_FLEXIBLE",
    };
    return typeMap[personality.type] || personality.type;
  };

  const userTypeKey = getUserTypeKey();
  const userDynamics = getTeamDynamics(userTypeKey);
  const selectedDynamics = selectedType ? getTeamDynamics(selectedType) : null;
  const selectedPersonality = selectedType ? personalities[selectedType] : null;

  // Find collaboration insights between the two types
  const getCollaborationInsights = () => {
    if (!userDynamics || !selectedType) return null;

    // Check if selected type is in worksWith
    const worksWith = userDynamics.worksWith.find(w => w.type === selectedType);
    
    // Check if selected type is in challengesWith
    const challengesWith = userDynamics.challengesWith.find(c => c.type === selectedType);

    // Get reverse insights (how they see you)
    const reverseWorksWith = selectedDynamics?.worksWith.find(w => w.type === userTypeKey);
    const reverseChallenges = selectedDynamics?.challengesWith.find(c => c.type === userTypeKey);

    return {
      worksWith,
      challengesWith,
      reverseWorksWith,
      reverseChallenges,
      userRole: userDynamics.teamRole,
      partnerRole: selectedDynamics?.teamRole,
    };
  };

  const insights = getCollaborationInsights();

  const getCompatibilityBadge = (compatibility: 'high' | 'medium' | 'complementary') => {
    switch (compatibility) {
      case 'high':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">High Synergy</span>;
      case 'complementary':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-600 dark:text-blue-400">Complementary</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-600 dark:text-amber-400">Moderate</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.58 }}
      className={`bg-card rounded-2xl shadow-card border p-6 mb-8 ${accentBorderLight}`}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Quick Compare
            </h3>
            <p className="text-xs text-muted-foreground">
              See how you collaborate with any other type
            </p>
          </div>
        </div>
        
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Scale className="w-4 h-4" />
            Compare Types
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {/* Type Selector */}
            <div className="mb-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
                  <span className="text-sm font-medium text-muted-foreground">You:</span>
                  <span className="font-semibold text-primary">{personality.type}</span>
                  <span className="text-xs text-muted-foreground">({personality.name})</span>
                </div>
                
                <span className="text-muted-foreground">vs</span>
                
                {/* Custom Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted border border-border hover:bg-muted/80 transition-colors min-w-[200px] justify-between"
                  >
                    {selectedType ? (
                      <>
                        <span className="font-semibold">{personalities[selectedType]?.type}</span>
                        <span className="text-xs text-muted-foreground truncate">({personalities[selectedType]?.name})</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">Select a type...</span>
                    )}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 top-full mt-1 w-[280px] max-h-[300px] overflow-y-auto bg-popover border border-border rounded-lg shadow-lg"
                      >
                        {availableTypes.map((type) => (
                          <button
                            key={type.code}
                            onClick={() => {
                              setSelectedType(type.code);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-muted transition-colors text-left ${
                              selectedType === type.code ? 'bg-muted' : ''
                            }`}
                          >
                            <span className="font-semibold text-sm">{type.displayCode}</span>
                            <span className="text-xs text-muted-foreground truncate">{type.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedType(null);
                  }}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Comparison Results */}
            {selectedType && selectedPersonality && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Team Roles */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Role</span>
                    </div>
                    <p className="text-sm text-foreground">{insights?.userRole || "Team contributor with unique strengths"}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Their Role</span>
                    </div>
                    <p className="text-sm text-foreground">{insights?.partnerRole || "Team contributor with unique strengths"}</p>
                  </div>
                </div>

                {/* Synergies */}
                {(insights?.worksWith || insights?.reverseWorksWith) && (
                  <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Handshake className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <h4 className="font-semibold text-foreground">Synergies</h4>
                    </div>
                    <div className="space-y-3">
                      {insights?.worksWith && (
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">How you see them:</span>
                              {getCompatibilityBadge(insights.worksWith.compatibility)}
                            </div>
                            <p className="text-sm text-muted-foreground">{insights.worksWith.description}</p>
                          </div>
                        </div>
                      )}
                      {insights?.reverseWorksWith && (
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">How they see you:</span>
                              {getCompatibilityBadge(insights.reverseWorksWith.compatibility)}
                            </div>
                            <p className="text-sm text-muted-foreground">{insights.reverseWorksWith.description}</p>
                          </div>
                        </div>
                      )}
                      {!insights?.worksWith && !insights?.reverseWorksWith && (
                        <p className="text-sm text-muted-foreground">Both types bring complementary perspectives to the team.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Friction Points */}
                {(insights?.challengesWith || insights?.reverseChallenges) && (
                  <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <h4 className="font-semibold text-foreground">Potential Friction</h4>
                    </div>
                    <div className="space-y-4">
                      {insights?.challengesWith && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">{insights.challengesWith.challenge}</p>
                          <div className="flex items-start gap-2 p-2 rounded-md bg-background/50">
                            <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-muted-foreground"><span className="font-medium">Tip:</span> {insights.challengesWith.tip}</p>
                          </div>
                        </div>
                      )}
                      {insights?.reverseChallenges && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">From their perspective: {insights.reverseChallenges.challenge}</p>
                          <div className="flex items-start gap-2 p-2 rounded-md bg-background/50">
                            <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-muted-foreground"><span className="font-medium">Their tip:</span> {insights.reverseChallenges.tip}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* No direct relationship found */}
                {!insights?.worksWith && !insights?.challengesWith && !insights?.reverseWorksWith && !insights?.reverseChallenges && (
                  <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
                    <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      These types don't have documented friction points—which often means smooth collaboration! 
                      Focus on leveraging each other's strengths.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {!selectedType && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="text-sm">Select a type above to see collaboration dynamics</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
