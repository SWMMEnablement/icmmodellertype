export interface PersonalityType {
  type: string;
  name: string;
  description: string;
  scenario: string; // Concrete ICM scenario description
  strengths: string[];
  growth: string[];
  tools: string[];
  color: string;
  aliases?: string[]; // Types that map to this one
  isHybrid?: boolean; // True for hybrid personality types
}

// Dimension descriptions for Option C (hybrid) and Option D (context-dependent) choices
export const dimensionDescriptions = {
  MA: {
    name: "Modeling Approach",
    optionA: { trait: 'D', label: "Detail-Focused", description: "You model every component with precision, ensuring nothing is overlooked." },
    optionB: { trait: 'B', label: "Big-Picture", description: "You focus on system behavior and strategic simplifications." },
    optionC: { trait: 'H', label: "Context-Adaptive", description: "You apply full detail where it matters most (critical assets, sensitive areas) while using strategic simplifications elsewhere. Your approach adapts to the specific requirements of each project zone." },
    optionD: { trait: 'MA_CTX', label: "Context-Dependent", description: "Your modeling approach is driven by project requirements—scope, budget, data availability, and client needs determine whether you go detailed or simplified." }
  },
  WS: {
    name: "Workflow Style", 
    optionA: { trait: 'A', label: "Automated", description: "You leverage scripts and batch processes for efficiency and consistency." },
    optionB: { trait: 'M', label: "Manual", description: "You prefer hands-on control at every step of the process." },
    optionC: { trait: 'X', label: "Hybrid Workflow", description: "You use automation for bulk operations and repetitive tasks, but maintain manual oversight and review at critical checkpoints. This gives you efficiency without sacrificing control over quality-critical decisions." },
    optionD: { trait: 'WS_CTX', label: "Context-Dependent", description: "Your choice between automation and manual work depends on task complexity, team capabilities, and project constraints." }
  },
  PS: {
    name: "Problem Solving",
    optionA: { trait: 'S', label: "Systematic", description: "You follow methodical approaches with documented procedures." },
    optionB: { trait: 'I', label: "Intuitive", description: "You trust experience and pattern recognition to guide decisions." },
    optionC: { trait: 'Y', label: "Integrated Approach", description: "You combine intuition with systematic verification—starting with your best hypothesis based on experience, then methodically validating or refining it. This dual approach catches both obvious issues and subtle problems." },
    optionD: { trait: 'PS_CTX', label: "Context-Dependent", description: "How you solve problems depends on your familiarity with the system, time pressure, and the nature of the issue." }
  },
  DQ: {
    name: "Data Quality",
    optionA: { trait: 'P', label: "Perfectionist", description: "You maintain the highest standards with zero tolerance for gaps or errors." },
    optionB: { trait: 'R', label: "Pragmatic", description: "You make practical trade-offs to keep projects moving forward." },
    optionC: { trait: 'Z', label: "Risk-Based Quality", description: "You apply rigorous standards where data quality critically impacts results, while accepting pragmatic assumptions in lower-risk areas. Your effort is prioritized based on sensitivity and consequence." },
    optionD: { trait: 'DQ_CTX', label: "Context-Dependent", description: "Your quality standards flex based on project risk, client expectations, timeline, and the consequences of potential errors." }
  }
};

// Type resolution: maps combinations to personality types
// Now includes detection for hybrid-dominant modellers
export const typeMapping: Record<string, string> = {
  // Detail + Automated types
  DASP: 'DASP',
  DASR: 'DASR',
  DAIP: 'DAIP',
  DAIR: 'DASR',
  
  // Detail + Manual types
  DMSP: 'DMSP',
  DMSR: 'DMSR',
  DMIP: 'DMSP',
  DMIR: 'DMSR',
  
  // Big-Picture + Automated types
  BASP: 'BASP',
  BASR: 'BASR',
  BAIP: 'BASP',
  BAIR: 'BASR',
  
  // Big-Picture + Manual types
  BMSP: 'BMSP',
  BMSR: 'BMSR',
  BMIP: 'BMIP',
  BMIR: 'BMSR',
};

export const resolveType = (rawType: string): string => {
  return typeMapping[rawType] || rawType;
};

// Check if a modeller is hybrid-dominant (chose hybrid options frequently)
export const getHybridType = (scores: Record<string, number>): string | null => {
  const hybridScores = {
    H: scores.H || 0, // MA hybrid
    X: scores.X || 0, // WS hybrid
    Y: scores.Y || 0, // PS hybrid
    Z: scores.Z || 0, // DQ hybrid
  };
  
  const contextScores = {
    MA_CTX: scores.MA_CTX || 0,
    WS_CTX: scores.WS_CTX || 0,
    PS_CTX: scores.PS_CTX || 0,
    DQ_CTX: scores.DQ_CTX || 0,
  };
  
  const totalHybrid = hybridScores.H + hybridScores.X + hybridScores.Y + hybridScores.Z;
  const totalContext = contextScores.MA_CTX + contextScores.WS_CTX + contextScores.PS_CTX + contextScores.DQ_CTX;
  
  // If 10+ context-dependent answers (50%+), they're a strong contextual type
  if (totalContext >= 10) {
    return 'CONTEXT_MASTER';
  }
  
  // If 6-9 context-dependent answers, they're moderately contextual
  if (totalContext >= 6) {
    return 'CONTEXT_NAVIGATOR';
  }
  
  // If 12+ hybrid answers (60%+), they're a strong hybrid type
  if (totalHybrid >= 12) {
    return 'HYBRID_INTEGRATOR';
  }
  
  // If 8-11 hybrid answers (40-55%), they're a moderate hybrid type
  if (totalHybrid >= 8) {
    return 'HYBRID_ADAPTIVE';
  }
  
  // If 5-7 hybrid answers (25-35%), they're a flexible hybrid
  if (totalHybrid >= 5) {
    return 'HYBRID_FLEXIBLE';
  }
  
  return null; // Not hybrid-dominant or context-dominant
};

export const personalities: Record<string, PersonalityType> = {
  // === CONTEXT-DEPENDENT PERSONALITY TYPES ===
  CONTEXT_MASTER: {
    type: "CONTEXT",
    name: "The Context Master",
    description: "You're the ultimate project-driven modeller. Rather than having fixed preferences, you read each situation and adapt your approach accordingly. Project scope, client needs, data quality, timeline, and budget all factor into your decisions. Your flexibility makes you invaluable for diverse project portfolios.",
    scenario: "A water company asks for three different flood assessments — one for planning, one for insurance, and one for emergency response. While most modellers would apply the same methodology to all three, you immediately recognise each needs a different approach: the planning model needs regulatory precision, the insurance model needs broad coverage with defensible assumptions, and the emergency model needs speed above all. You deliver three fit-for-purpose models where others would have delivered one over-engineered one.",
    strengths: ["Exceptional situational awareness", "Client-focused delivery", "Resource optimization", "Risk-based prioritization", "Stakeholder management", "Portfolio versatility"],
    growth: ["Develop strong default preferences for faster decisions", "Document your decision criteria", "Help juniors understand your contextual logic", "Build reusable frameworks for common situations"],
    tools: ["Project assessment frameworks", "Decision matrices", "Scalable templates", "Stakeholder analysis tools"],
    color: "from-amber-500 to-orange-600",
    isHybrid: true
  },
  CONTEXT_NAVIGATOR: {
    type: "NAVIGATOR",
    name: "The Context Navigator",
    description: "You balance personal preferences with project realities. While you have your go-to approaches, you readily adjust based on client requirements, budget constraints, and project scope. Your ability to navigate competing demands makes you effective across varied project types.",
    scenario: "Midway through a strategic drainage assessment, the client halves the budget. Instead of panicking, you quickly re-scope: you switch from a full 2D mesh to 1D with targeted 2D zones, swap detailed rain gauge analysis for FEH grid data, and streamline your QA to focus on the critical flood hotspots. The client still gets actionable results, and your team hits the deadline. You've done this before — reading the room is your superpower.",
    strengths: ["Adaptive planning", "Budget awareness", "Client responsiveness", "Scope management", "Practical flexibility", "Delivery focus"],
    growth: ["Strengthen core technical preferences", "Push back when context compromises quality", "Build clearer decision boundaries", "Develop signature approaches for key situations"],
    tools: ["Scope assessment tools", "Budget-quality tradeoff matrices", "Client requirement templates", "Flexible QA processes"],
    color: "from-orange-500 to-amber-600",
    isHybrid: true
  },

  // === HYBRID PERSONALITY TYPES ===
  HYBRID_INTEGRATOR: {
    type: "HYBRID",
    name: "The Integrator",
    description: "You're the rare modeller who naturally adapts your approach to each situation. You seamlessly blend detail and big-picture thinking, automation and manual control, systematic rigor and intuitive insight. Your flexibility makes you invaluable for complex, multi-stakeholder projects where one-size-fits-all approaches fail.",
    scenario: "You're leading a complex integrated catchment model with multiple stakeholders — the water company wants sewer capacity analysis, the council wants surface water flood mapping, and the EA wants climate change impacts. You build the core 1D network with automated scripts for the repetitive sewer data, manually craft the critical 2D mesh around key flood risk areas, use systematic checks for regulatory compliance, and apply intuitive judgment to resolve conflicting stakeholder requirements. Nobody else on the team could hold all these threads together.",
    strengths: ["Exceptional adaptability", "Multi-perspective thinking", "Balanced trade-offs", "Stakeholder management", "Context-sensitive quality", "Bridge between specialists"],
    growth: ["Develop deeper expertise in specific approaches", "Document your decision frameworks", "Help others understand your adaptive logic", "Build templates for common contexts"],
    tools: ["Adaptive workflows", "Context assessment checklists", "Flexible QA frameworks", "Multi-approach templates"],
    color: "from-purple-500 to-violet-700",
    isHybrid: true
  },
  HYBRID_ADAPTIVE: {
    type: "ADAPTIVE",
    name: "The Adaptive Specialist",
    description: "You combine specialist depth with contextual flexibility. While you have preferred approaches, you readily adjust your methods based on project needs, client requirements, and data quality. Your ability to shift gears makes you effective across diverse project types.",
    strengths: ["Contextual awareness", "Flexible methodology", "Client responsiveness", "Practical adaptability", "Balanced delivery", "Risk-aware quality"],
    growth: ["Codify your adaptation triggers", "Share context-reading skills", "Balance flexibility with consistency", "Build adaptive team capabilities"],
    tools: ["Situational assessment tools", "Scalable QA processes", "Flexible templates", "Context-based checklists"],
    color: "from-violet-500 to-purple-700",
    isHybrid: true
  },
  HYBRID_FLEXIBLE: {
    type: "FLEX",
    name: "The Flexible Practitioner",
    description: "You blend traditional approaches with adaptive thinking. While you have core preferences, you're comfortable adjusting your style when the situation demands it. This flexibility allows you to handle unexpected challenges and work effectively with diverse team members.",
    strengths: ["Practical flexibility", "Team collaboration", "Situational awareness", "Adaptable standards", "Effective communication", "Cross-functional skills"],
    growth: ["Strengthen your core specialties", "Develop systematic adaptation criteria", "Document successful adaptations", "Mentor others in flexibility"],
    tools: ["Hybrid workflows", "Adaptive checklists", "Flexible reporting", "Collaborative tools"],
    color: "from-fuchsia-500 to-purple-600",
    isHybrid: true
  },

  // === ORIGINAL PERSONALITY TYPES ===
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
    name: "The Pragmatic Modeller",
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
    description: "You're the go-to modeller for strategic projects with real deadlines. Big-picture thinking with hands-on delivery means you answer the questions that matter without getting lost in details. Crisis response and tight turnarounds are your specialty.",
    strengths: ["Practical strategy", "Deadline delivery", "Scope management", "Clear communication", "Speed", "Crisis response"],
    growth: ["Automate routine tasks", "Document your simplifications", "Build quality checks", "Slow down for complex projects"],
    tools: ["Manual strategic modeling", "Practical QC", "Clear reporting", "Rapid reporting"],
    color: "from-lime-500 to-lime-700",
    aliases: ["BMIR"]
  },
  BMIP: {
    type: "BMIP",
    name: "The Master Modeller",
    description: "Years of experience have given you strategic intuition backed by quality standards. You build big-picture models with systematic validation, guided by pattern recognition only experience brings. You're often the one mentoring the next generation.",
    strengths: ["Expert judgment", "Strategic quality", "Pattern recognition", "Mentoring ability", "Experience-based insight"],
    growth: ["Transfer knowledge to automation", "Document your intuition", "Train the next generation", "Share your mental models"],
    tools: ["Expert manual modeling", "Experience-based QC", "Strategic validation", "Pattern recognition"],
    color: "from-red-500 to-red-700"
  }
};
