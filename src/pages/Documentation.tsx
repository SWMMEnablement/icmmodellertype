import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Droplets, Brain, Code2, ChevronDown, ChevronUp, GitCompare, Check, X, ArrowLeftRight } from "lucide-react";
import { personalities, PersonalityType } from "@/data/personalities";

type TabType = "icm" | "mbti" | "methodology" | "compare";

const mbtiTypes = [
  { type: "INTJ", name: "The Architect", desc: "Strategic, independent, and determined. Imaginative thinkers who turn theories into action." },
  { type: "INTP", name: "The Logician", desc: "Innovative, curious, and logical. Known for brilliant ideas and unique perspectives." },
  { type: "ENTJ", name: "The Commander", desc: "Bold, imaginative, strong-willed. Natural leaders who find a way—or make one." },
  { type: "ENTP", name: "The Debater", desc: "Smart, curious, outspoken. Thrive on challenging ideas and exploring possibilities." },
  { type: "INFJ", name: "The Advocate", desc: "Quiet, mystical, insightful. Have an inborn sense of idealism and purpose." },
  { type: "INFP", name: "The Mediator", desc: "Poetic, kind, altruistic. Guided by principles, seeking to help others." },
  { type: "ENFJ", name: "The Protagonist", desc: "Charismatic, inspiring leaders. Passionate about helping others succeed." },
  { type: "ENFP", name: "The Campaigner", desc: "Enthusiastic, creative, sociable. Free spirits with infectious energy." },
  { type: "ISTJ", name: "The Logistician", desc: "Practical, fact-minded, reliable. The backbone of any organization." },
  { type: "ISFJ", name: "The Defender", desc: "Dedicated, warm, protective. Committed to helping others and creating harmony." },
  { type: "ESTJ", name: "The Executive", desc: "Organized, loyal, hard-working. Dedicated to maintaining order and structure." },
  { type: "ESFJ", name: "The Consul", desc: "Caring, social, tradition-minded. Eager to help and bring people together." },
  { type: "ISTP", name: "The Virtuoso", desc: "Bold, practical, experimental. Love exploring with hands and mastering tools." },
  { type: "ISFP", name: "The Adventurer", desc: "Flexible, charming, artistic. True artists pushing boundaries." },
  { type: "ESTP", name: "The Entrepreneur", desc: "Smart, energetic, perceptive. Enjoy living on the edge and taking risks." },
  { type: "ESFP", name: "The Entertainer", desc: "Spontaneous, energetic, enthusiastic. Love life and bring fun everywhere." },
];

const dimensionLabels: Record<number, { name: string; options: [string, string] }> = {
  0: { name: "Approach", options: ["Detail-Focused", "Big-Picture"] },
  1: { name: "Workflow", options: ["Automated", "Manual"] },
  2: { name: "Problem Solving", options: ["Systematic", "Intuitive"] },
  3: { name: "Quality", options: ["Perfectionist", "Pragmatic"] },
};

const Documentation = () => {
  const [activeTab, setActiveTab] = useState<TabType>("icm");
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [compareType1, setCompareType1] = useState<string>("DASP");
  const [compareType2, setCompareType2] = useState<string>("BMIR");

  const tabs = [
    { id: "icm" as TabType, label: "ICM Modeler Types", icon: Droplets },
    { id: "compare" as TabType, label: "Compare Types", icon: GitCompare },
    { id: "mbti" as TabType, label: "Myers-Briggs Types", icon: Brain },
    { id: "methodology" as TabType, label: "Methodology & Code", icon: Code2 },
  ];

  const getSharedTraits = (type1: string, type2: string) => {
    const shared: number[] = [];
    const different: number[] = [];
    for (let i = 0; i < 4; i++) {
      if (type1[i] === type2[i]) {
        shared.push(i);
      } else {
        different.push(i);
      }
    }
    return { shared, different };
  };

  const getTraitLabel = (type: string, index: number): string => {
    const char = type[index];
    const labels: Record<string, string> = {
      D: "Detail-Focused",
      B: "Big-Picture",
      A: "Automated",
      M: "Manual",
      S: "Systematic",
      I: "Intuitive",
      P: "Perfectionist",
      R: "Pragmatic",
    };
    return labels[char] || char;
  };

  const type1 = personalities[compareType1];
  const type2 = personalities[compareType2];
  const comparison = getSharedTraits(compareType1, compareType2);

  const TypeSelector = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-xl bg-card border border-border text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {Object.entries(personalities).map(([code, type]) => (
          <option key={code} value={code}>
            {code} — {type.name}
          </option>
        ))}
      </select>
    </div>
  );

  const TypeCard = ({ type, code, side }: { type: PersonalityType; code: string; side: "left" | "right" }) => (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className={`bg-gradient-to-r ${type.color} p-6 text-center`}>
        <h3 className="font-mono text-3xl font-bold text-white mb-1">{code}</h3>
        <p className="text-white/90 font-medium">{type.name}</p>
      </div>
      <div className="p-5 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
        
        <div>
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Strengths</h4>
          <div className="flex flex-wrap gap-1.5">
            {type.strengths.map((s, i) => (
              <span key={i} className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Growth Areas</h4>
          <div className="flex flex-wrap gap-1.5">
            {type.growth.map((g, i) => (
              <span key={i} className="px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs">
                {g}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Go-To Tools</h4>
          <div className="flex flex-wrap gap-1.5">
            {type.tools.map((t, i) => (
              <span key={i} className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Quiz</span>
          </Link>
          <h1 className="font-display text-xl font-semibold text-foreground">Documentation</h1>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-border bg-card/30">
        <div className="max-w-5xl mx-auto px-6">
          <nav className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {activeTab === "icm" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="prose prose-slate max-w-none">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">ICM Modeler Personality Types</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Based on four dimensions of modeling workflow preferences, there are 16 distinct ICM modeler types. 
                Each represents a unique combination of approaches to hydraulic modeling in InfoWorks ICM.
              </p>
            </div>

            {/* Dimensions Explanation */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                { code: "D/B", title: "Detail vs Big-Picture", desc: "How granular is your model? Do you include every lateral or build strategic skeleton models?" },
                { code: "A/M", title: "Automated vs Manual", desc: "Do you write Ruby scripts and use ODIC, or prefer hands-on control at every step?" },
                { code: "S/I", title: "Systematic vs Intuitive", desc: "Do you rely on statistical metrics or trust your calibration instincts?" },
                { code: "P/R", title: "Perfectionist vs Pragmatic", desc: "Zero warnings before delivery, or justified caveats with clear limitations?" },
              ].map((dim) => (
                <div key={dim.code} className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-mono font-bold">{dim.code}</span>
                    <h4 className="font-semibold text-foreground">{dim.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{dim.desc}</p>
                </div>
              ))}
            </div>

            {/* All 16 Types */}
            <div className="space-y-3">
              {Object.entries(personalities).map(([code, type]) => (
                <div key={code} className="bg-card rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setExpandedType(expandedType === code ? null : code)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1.5 rounded-lg text-white font-mono font-bold text-sm bg-gradient-to-r ${type.color}`}>
                        {code}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground">{type.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{type.description.slice(0, 80)}...</p>
                      </div>
                    </div>
                    {expandedType === code ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  
                  {expandedType === code && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="border-t border-border p-4 bg-muted/20"
                    >
                      <p className="text-muted-foreground mb-4">{type.description}</p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Strengths</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {type.strengths.map((s, i) => <li key={i}>• {s}</li>)}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Growth Areas</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {type.growth.map((g, i) => <li key={i}>• {g}</li>)}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Go-To Tools</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {type.tools.map((t, i) => <li key={i}>• {t}</li>)}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "compare" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="prose prose-slate max-w-none">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Compare Modeler Types</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Select two ICM modeler types to see how they compare. Discover shared strengths and key differences.
              </p>
            </div>

            {/* Selectors */}
            <div className="grid md:grid-cols-2 gap-6">
              <TypeSelector value={compareType1} onChange={setCompareType1} label="First Type" />
              <TypeSelector value={compareType2} onChange={setCompareType2} label="Second Type" />
            </div>

            {/* Similarity Summary */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className={`px-4 py-2 rounded-xl text-white font-mono font-bold bg-gradient-to-r ${type1.color}`}>
                  {compareType1}
                </span>
                <ArrowLeftRight className="w-6 h-6 text-muted-foreground" />
                <span className={`px-4 py-2 rounded-xl text-white font-mono font-bold bg-gradient-to-r ${type2.color}`}>
                  {compareType2}
                </span>
              </div>

              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-foreground mb-1">
                  {Math.round((comparison.shared.length / 4) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Similarity</div>
              </div>

              {/* Dimension Comparison */}
              <div className="space-y-3">
                {[0, 1, 2, 3].map((i) => {
                  const isShared = comparison.shared.includes(i);
                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-4 rounded-xl ${
                        isShared ? "bg-primary/10" : "bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isShared ? (
                          <Check className="w-5 h-5 text-primary" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground" />
                        )}
                        <span className="font-medium text-foreground">{dimensionLabels[i].name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className={isShared ? "text-primary font-medium" : "text-muted-foreground"}>
                          {getTraitLabel(compareType1, i)}
                        </span>
                        {!isShared && (
                          <>
                            <span className="text-muted-foreground/50">vs</span>
                            <span className="text-muted-foreground">
                              {getTraitLabel(compareType2, i)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Side by Side Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <TypeCard type={type1} code={compareType1} side="left" />
              <TypeCard type={type2} code={compareType2} side="right" />
            </div>

            {/* Collaboration Insights */}
            <div className="bg-muted/50 rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Working Together</h3>
              {comparison.shared.length === 4 ? (
                <p className="text-muted-foreground">
                  These types are identical! Great for consistency, but consider bringing in diverse perspectives 
                  for challenging projects.
                </p>
              ) : comparison.shared.length >= 3 ? (
                <p className="text-muted-foreground">
                  High compatibility! These modelers will likely collaborate smoothly with shared approaches. 
                  The one difference in <strong>{dimensionLabels[comparison.different[0]].name.toLowerCase()}</strong> can 
                  provide valuable balance.
                </p>
              ) : comparison.shared.length === 2 ? (
                <p className="text-muted-foreground">
                  Balanced pairing with meaningful differences. These types can complement each other well—one 
                  brings {getTraitLabel(compareType1, comparison.different[0]).toLowerCase()} while the other 
                  brings {getTraitLabel(compareType2, comparison.different[0]).toLowerCase()} perspectives.
                </p>
              ) : comparison.shared.length === 1 ? (
                <p className="text-muted-foreground">
                  Diverse pairing! These modelers approach work very differently. This can create powerful 
                  collaboration if both respect each other&apos;s styles, but may require clear communication 
                  about workflows and expectations.
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Opposite types! Maximum diversity in approach. This pairing can either be highly complementary 
                  (covering all bases) or challenging (different priorities). Success depends on mutual respect 
                  and clear role definition.
                </p>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "mbti" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="prose prose-slate max-w-none">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Myers-Briggs Type Indicator (MBTI)</h2>
              <p className="text-muted-foreground text-lg mb-8">
                The MBTI is a personality framework based on Carl Jung&apos;s theory of psychological types. 
                It measures preferences across four dimensions, creating 16 distinct personality types.
              </p>
            </div>

            {/* MBTI Dimensions */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                { code: "E/I", title: "Extraversion vs Introversion", desc: "Where you direct and receive energy—outward to people and activity, or inward to ideas and reflection." },
                { code: "S/N", title: "Sensing vs Intuition", desc: "How you take in information—through concrete facts and details, or patterns and possibilities." },
                { code: "T/F", title: "Thinking vs Feeling", desc: "How you make decisions—through logic and objective analysis, or values and impact on people." },
                { code: "J/P", title: "Judging vs Perceiving", desc: "How you orient to the outer world—preferring structure and decisions, or flexibility and options." },
              ].map((dim) => (
                <div key={dim.code} className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs font-mono font-bold">{dim.code}</span>
                    <h4 className="font-semibold text-foreground">{dim.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{dim.desc}</p>
                </div>
              ))}
            </div>

            {/* All 16 MBTI Types */}
            <div className="grid md:grid-cols-2 gap-4">
              {mbtiTypes.map((type) => (
                <div key={type.type} className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded gradient-cool text-primary-foreground text-xs font-mono font-bold">
                      {type.type}
                    </span>
                    <h3 className="font-semibold text-foreground">{type.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{type.desc}</p>
                </div>
              ))}
            </div>

            {/* MBTI to ICM Mapping Table */}
            <div className="bg-card rounded-xl border border-border overflow-hidden mt-8">
              <div className="px-6 py-4 border-b border-border bg-muted/30">
                <h3 className="font-display text-lg font-semibold text-foreground">MBTI ↔ ICM Conceptual Parallels</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  While the frameworks are independent, some dimensions share conceptual overlap.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="px-6 py-3 text-left font-semibold text-foreground">ICM Dimension</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground">MBTI Parallel</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground">Similarity</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground">Key Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-mono font-bold">S/I</span>
                        <span className="ml-2 text-foreground">Systematic vs Intuitive</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs font-mono font-bold">S/N</span>
                        <span className="ml-2 text-foreground">Sensing vs iNtuition</span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <span className="text-primary font-medium">Strong</span> — Both contrast data-driven vs. pattern-based thinking
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        ICM focuses on calibration approach; MBTI is about information processing
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-mono font-bold">P/R</span>
                        <span className="ml-2 text-foreground">Perfectionist vs Pragmatic</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs font-mono font-bold">J/P</span>
                        <span className="ml-2 text-foreground">Judging vs Perceiving</span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <span className="text-yellow-600 font-medium">Moderate</span> — Both involve structure vs. flexibility
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        ICM is about deliverable standards; MBTI is about lifestyle orientation
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-mono font-bold">D/B</span>
                        <span className="ml-2 text-foreground">Detail vs Big-Picture</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs font-mono font-bold">S/N</span>
                        <span className="ml-2 text-foreground">Sensing vs iNtuition</span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <span className="text-yellow-600 font-medium">Moderate</span> — Sensors often prefer details, Intuitives see patterns
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        ICM is about model granularity; MBTI is about perception style
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-mono font-bold">A/M</span>
                        <span className="ml-2 text-foreground">Automated vs Manual</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-muted-foreground italic">No direct parallel</span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <span className="text-muted-foreground font-medium">Weak</span> — This is domain-specific to modeling workflows
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        MBTI doesn&apos;t measure tool/automation preferences
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* MBTI to ICM Predictions */}
            <div className="bg-card rounded-xl border border-border overflow-hidden mt-6">
              <div className="px-6 py-4 border-b border-border bg-muted/30">
                <h3 className="font-display text-lg font-semibold text-foreground">Predicting ICM Type from MBTI</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Probabilistic tendencies based on conceptual overlap. These are patterns, not deterministic mappings.
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs font-mono font-bold">INTJ / ISTJ</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Tend toward:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">Systematic (S)</span>
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">Perfectionist (P)</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Strong preference for structure and thoroughness</p>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs font-mono font-bold">ENTP / ENFP</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Tend toward:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">Intuitive (I)</span>
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">Big-Picture (B)</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Prefer exploration and strategic modeling</p>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs font-mono font-bold">ISTP / ESTP</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Tend toward:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">Pragmatic (R)</span>
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">Manual (M)</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Hands-on, results-focused approach</p>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs font-mono font-bold">INTP / ENTJ</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Tend toward:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">Automated (A)</span>
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">Systematic (S)</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Efficiency-driven, system builders</p>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mt-4">
                  <div className="flex gap-3">
                    <div className="text-yellow-600 text-lg">⚠️</div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">Important Caveat</h4>
                      <p className="text-sm text-muted-foreground">
                        Your MBTI type does <strong>not determine</strong> your ICM type. These correlations are observational tendencies, 
                        not rules. An INTJ could absolutely be a Big-Picture Pragmatist (BMIR) based on their specific 
                        modeling experience, training, and project contexts. Always take the quiz for accurate results!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-6 mt-8">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">About MBTI Accuracy</h3>
              <p className="text-sm text-muted-foreground">
                The MBTI is widely used for self-reflection and team dynamics, but it&apos;s not a clinical diagnostic tool. 
                Research shows test-retest reliability varies, and personality exists on spectrums rather than binary categories. 
                Use it as a starting point for self-awareness, not a definitive label.
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === "methodology" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="prose prose-slate max-w-none">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Methodology & Scoring</h2>
              <p className="text-muted-foreground text-lg mb-8">
                This quiz uses a weighted scoring system with intensity sliders to capture nuanced preferences 
                rather than forcing binary choices.
              </p>
            </div>

            {/* Scoring Explanation */}
            <div className="bg-card rounded-xl border border-border p-6 mb-6">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">How Scoring Works</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>Each question presents two options (A and B) representing opposite ends of a dimension. 
                   The slider allows you to indicate preference intensity:</p>
                <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                  <div className="grid grid-cols-5 gap-2 text-center">
                    <div className="p-2 rounded bg-primary/20">
                      <div className="font-bold text-primary">-2</div>
                      <div className="text-xs">Strongly A</div>
                    </div>
                    <div className="p-2 rounded bg-primary/10">
                      <div className="font-bold text-primary/70">-1</div>
                      <div className="text-xs">Slightly A</div>
                    </div>
                    <div className="p-2 rounded bg-muted">
                      <div className="font-bold">0</div>
                      <div className="text-xs">Neutral</div>
                    </div>
                    <div className="p-2 rounded bg-secondary/10">
                      <div className="font-bold text-secondary/70">+1</div>
                      <div className="text-xs">Slightly B</div>
                    </div>
                    <div className="p-2 rounded bg-secondary/20">
                      <div className="font-bold text-secondary">+2</div>
                      <div className="text-xs">Strongly B</div>
                    </div>
                  </div>
                </div>
                <p>Points are added to the respective trait based on intensity. Neutral responses add 0.5 points to each side.</p>
              </div>
            </div>

            {/* Code Examples */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-muted/30">
                <h3 className="font-display text-lg font-semibold text-foreground">Scoring Logic</h3>
              </div>
              <pre className="p-6 overflow-x-auto text-sm">
                <code className="text-muted-foreground">{`const handleAnswer = (traitA: string, traitB: string, intensity: number) => {
  setScores(prev => {
    const newScores = { ...prev };
    
    if (intensity < 0) {
      // Favors option A (e.g., Detail-focused)
      newScores[traitA] += Math.abs(intensity);
    } else if (intensity > 0) {
      // Favors option B (e.g., Big-picture)
      newScores[traitB] += intensity;
    } else {
      // Neutral - split evenly
      newScores[traitA] += 0.5;
      newScores[traitB] += 0.5;
    }
    
    return newScores;
  });
};`}</code>
              </pre>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-muted/30">
                <h3 className="font-display text-lg font-semibold text-foreground">Type Determination</h3>
              </div>
              <pre className="p-6 overflow-x-auto text-sm">
                <code className="text-muted-foreground">{`const getPersonalityType = () => {
  // Compare scores for each dimension
  const type = [
    scores.D >= scores.B ? 'D' : 'B',  // Detail vs Big-picture
    scores.A >= scores.M ? 'A' : 'M',  // Automated vs Manual
    scores.S >= scores.I ? 'S' : 'I',  // Systematic vs Intuitive
    scores.P >= scores.R ? 'P' : 'R',  // Perfectionist vs Pragmatic
  ].join('');
  
  return personalities[type]; // e.g., "DASP" -> The Precision Engineer
};`}</code>
              </pre>
            </div>

            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">Limitations</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• <strong>10 questions is limited</strong> — A full assessment would have 40+ questions for statistical reliability</li>
                <li>• <strong>Self-reporting bias</strong> — People may answer aspirationally rather than accurately</li>
                <li>• <strong>Context matters</strong> — Your modeling style may vary by project type, client, or deadline pressure</li>
                <li>• <strong>For fun, not hiring</strong> — This is a self-reflection tool, not a performance predictor</li>
              </ul>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Documentation;
