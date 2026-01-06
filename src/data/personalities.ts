export interface PersonalityType {
  type: string;
  name: string;
  description: string;
  strengths: string[];
  growth: string[];
  tools: string[];
  color: string;
  aliases?: string[]; // Types that map to this one
}

// Type resolution: maps the 16 possible combinations to 10 distinct types
export const typeMapping: Record<string, string> = {
  // Detail + Automated types
  DASP: 'DASP', // Keep as-is
  DASR: 'DASR', // Keep as-is (absorbs DAIR)
  DAIP: 'DAIP', // Keep as-is
  DAIR: 'DASR', // → Maps to DASR
  
  // Detail + Manual types
  DMSP: 'DMSP', // Keep as-is (absorbs DMIP)
  DMSR: 'DMSR', // Keep as-is (absorbs DMIR)
  DMIP: 'DMSP', // → Maps to DMSP
  DMIR: 'DMSR', // → Maps to DMSR
  
  // Big-Picture + Automated types
  BASP: 'BASP', // Keep as-is (absorbs BAIP)
  BASR: 'BASR', // Keep as-is (absorbs BAIR)
  BAIP: 'BASP', // → Maps to BASP
  BAIR: 'BASR', // → Maps to BASR
  
  // Big-Picture + Manual types
  BMSP: 'BMSP', // Keep as-is
  BMSR: 'BMSR', // Keep as-is (absorbs BMIR)
  BMIP: 'BMIP', // Keep as-is
  BMIR: 'BMSR', // → Maps to BMSR
};

export const resolveType = (rawType: string): string => {
  return typeMapping[rawType] || rawType;
};

export const personalities: Record<string, PersonalityType> = {
  DASP: {
    type: "DASP",
    name: "The Precision Engineer",
    description: "You build models like Swiss watches—every detail matters. Your automated workflows ensure consistency while your systematic approach catches errors others miss. Clients trust your deliverables implicitly because they know every parameter has been verified.",
    strengths: ["Exceptional accuracy", "Reproducible workflows", "Thorough validation", "Audit-trail excellence", "Quality automation"],
    growth: ["Balance detail with deadlines", "Trust simplifications when appropriate", "Delegate routine checks", "Accept 'good enough' for exploratory work"],
    tools: ["Ruby scripting", "Validation scripts", "Detailed QA checklists", "Automated testing"],
    color: "from-blue-600 to-blue-800"
  },
  DASR: {
    type: "DASR",
    name: "The Efficient Expert",
    description: "You combine technical precision with practical delivery. Your automated pipelines handle the heavy lifting while you focus on what matters most. Whether relying on metrics or intuition, you know when good enough is truly good enough and deliver consistently.",
    strengths: ["Efficient delivery", "Smart automation", "Balanced approach", "Client-focused solutions", "Rapid calibration", "Pattern recognition"],
    growth: ["Document your shortcuts", "Share automation templates", "Build in contingency time", "Quantify your intuitive decisions"],
    tools: ["ODIC templates", "Batch processing", "Quick validation checks", "Visual calibration"],
    color: "from-teal-500 to-teal-700",
    aliases: ["DAIR"]
  },
  DAIP: {
    type: "DAIP",
    name: "The Quality Automator",
    description: "You've automated quality into every workflow. Your scripts don't just save time—they enforce standards. When you deliver a model, it's been through your battle-tested quality gates. Your intuition guides what to automate next.",
    strengths: ["Automated QA/QC", "Zero-tolerance accuracy", "Innovative workflows", "Setting team standards", "Pattern-based validation"],
    growth: ["Accept uncertainty gracefully", "Move faster on exploratory work", "Balance intuition with documentation"],
    tools: ["Custom Ruby QA scripts", "Automated validation", "Standardized templates", "Pattern-based checks"],
    color: "from-indigo-500 to-indigo-700"
  },
  DMSP: {
    type: "DMSP",
    name: "The Meticulous Craftsman",
    description: "Every node, every link, every parameter—you've checked it personally. Your hands-on approach means you know your models inside out. Nothing leaves your desk without your thorough review. Whether systematic or intuitive, your personal investment in quality shows.",
    strengths: ["Deep model knowledge", "Bulletproof quality", "Personal accountability", "Exceptional attention", "Expert calibration"],
    growth: ["Embrace automation for repetitive tasks", "Scale your quality approach", "Document your process", "Share knowledge with juniors"],
    tools: ["Manual data review", "Step-by-step validation", "Personal QC protocols", "Visual calibration"],
    color: "from-slate-600 to-slate-800",
    aliases: ["DMIP"]
  },
  DMSR: {
    type: "DMSR",
    name: "The Pragmatic Modeler",
    description: "You're the backbone of project delivery. Detail-oriented but deadline-aware, you manually craft quality models while making practical trade-offs. Your experience guides efficient, defensible decisions. You know exactly where to focus your effort for maximum impact.",
    strengths: ["Reliable delivery", "Practical solutions", "Clear documentation", "Balanced judgment", "Fast turnaround", "Client rapport"],
    growth: ["Automate common workflows", "Push back on impossible deadlines", "Standardize your methods", "Document assumptions better"],
    tools: ["Manual workflows", "Clear assumptions logs", "Pragmatic QC", "Quick visual checks"],
    color: "from-amber-600 to-amber-700",
    aliases: ["DMIR"]
  },
  BASP: {
    type: "BASP",
    name: "The Strategic Architect",
    description: "You see the forest, not just the trees. Your automated master plans deliver strategic insights while maintaining systematic rigor. You build frameworks others can build upon, and your pattern recognition catches system-level issues others miss.",
    strengths: ["Strategic vision", "Scalable solutions", "Systematic planning", "Framework design", "Big-picture accuracy", "Pattern recognition"],
    growth: ["Dive into details when needed", "Ground-truth your assumptions", "Validate with field data", "Check edge cases"],
    tools: ["Model templates", "Automated scenario runs", "High-level validation", "Pattern-based validation"],
    color: "from-emerald-500 to-emerald-700",
    aliases: ["BAIP"]
  },
  BASR: {
    type: "BASR",
    name: "The Agile Strategist",
    description: "You deliver big-picture insights on practical timelines. Your automated workflows serve strategic goals, and you know exactly what level of detail each project actually needs. Perfect for feasibility studies, options appraisals, and quick-turnaround consulting.",
    strengths: ["Fast strategic delivery", "Right-sized models", "Client-focused", "Efficient scope management", "Rapid insights", "Quick turnaround"],
    growth: ["Validate simplified assumptions", "Document model limitations", "Build in detail checks", "Validate fast conclusions"],
    tools: ["Quick scenario automation", "Strategic templates", "Executive reporting", "Fast scenario runs"],
    color: "from-cyan-500 to-cyan-700",
    aliases: ["BAIR"]
  },
  BMSP: {
    type: "BMSP",
    name: "The Strategic Perfectionist",
    description: "You take a big-picture approach but refuse to compromise on quality. Every strategic simplification is systematically justified. Your master plans are both visionary and bulletproof. Documentation is your superpower.",
    strengths: ["Justified simplifications", "Strategic quality", "Systematic documentation", "Defensible models", "Thorough validation"],
    growth: ["Automate repetitive validation", "Trust your strategic instincts", "Move faster on options", "Accept uncertainty in early stages"],
    tools: ["Manual strategic modeling", "Systematic QC", "Detailed documentation", "Comprehensive assumption logs"],
    color: "from-pink-500 to-pink-700"
  },
  BMSR: {
    type: "BMSR",
    name: "The Practical Strategist",
    description: "You're the go-to modeler for strategic projects with real deadlines. Big-picture thinking with hands-on delivery means you answer the questions that matter without getting lost in details. Crisis response and tight turnarounds are your specialty.",
    strengths: ["Practical strategy", "Deadline delivery", "Scope management", "Clear communication", "Speed", "Crisis response"],
    growth: ["Automate routine tasks", "Document your simplifications", "Build quality checks", "Slow down for complex projects"],
    tools: ["Manual strategic modeling", "Practical QC", "Clear reporting", "Rapid reporting"],
    color: "from-lime-500 to-lime-700",
    aliases: ["BMIR"]
  },
  BMIP: {
    type: "BMIP",
    name: "The Master Modeler",
    description: "Years of experience have given you strategic intuition backed by quality standards. You build big-picture models with systematic validation, guided by pattern recognition only experience brings. You're often the one mentoring the next generation.",
    strengths: ["Expert judgment", "Strategic quality", "Pattern recognition", "Mentoring ability", "Experience-based insight"],
    growth: ["Transfer knowledge to automation", "Document your intuition", "Train the next generation", "Share your mental models"],
    tools: ["Expert manual modeling", "Experience-based QC", "Strategic validation", "Pattern recognition"],
    color: "from-red-500 to-red-700"
  }
};
