export interface PersonalityType {
  type: string;
  name: string;
  description: string;
  strengths: string[];
  growth: string[];
  tools: string[];
  color: string;
}

export const personalities: Record<string, PersonalityType> = {
  DASP: {
    type: "DASP",
    name: "The Precision Engineer",
    description: "You build models like Swiss watches—every detail matters. Your automated workflows ensure consistency while your systematic approach catches errors others miss. Clients trust your deliverables implicitly.",
    strengths: ["Exceptional accuracy", "Reproducible workflows", "Thorough validation", "Audit-trail excellence"],
    growth: ["Balance detail with deadlines", "Trust simplifications when appropriate", "Delegate routine checks"],
    tools: ["Ruby scripting", "Validation scripts", "Detailed QA checklists"],
    color: "from-blue-600 to-blue-800"
  },
  DASR: {
    type: "DASR",
    name: "The Efficient Expert",
    description: "You combine technical precision with practical delivery. Your automated pipelines handle the heavy lifting while you focus on what matters most. You know when good enough is truly good enough.",
    strengths: ["Efficient delivery", "Smart automation", "Balanced approach", "Client-focused solutions"],
    growth: ["Document your shortcuts", "Share automation templates", "Build in contingency time"],
    tools: ["ODIC templates", "Batch processing", "Quick validation checks"],
    color: "from-teal-500 to-teal-700"
  },
  DAIP: {
    type: "DAIP",
    name: "The Quality Automator",
    description: "You've automated quality into every workflow. Your scripts don't just save time—they enforce standards. When you deliver a model, it's been through your battle-tested quality gates.",
    strengths: ["Automated QA/QC", "Zero-tolerance accuracy", "Innovative workflows", "Setting team standards"],
    growth: ["Accept uncertainty gracefully", "Move faster on exploratory work", "Trust your calibration eye"],
    tools: ["Custom Ruby QA scripts", "Automated validation", "Standardized templates"],
    color: "from-indigo-500 to-indigo-700"
  },
  DAIR: {
    type: "DAIR",
    name: "The Intuitive Developer",
    description: "You combine deep attention to detail with a sixth sense for model behavior. Your automation handles the tedious work while your intuition guides calibration. You just know when something's off.",
    strengths: ["Rapid calibration", "Instinctive debugging", "Efficient detailed work", "Pattern recognition"],
    growth: ["Document your intuitive decisions", "Quantify your 'gut feel' metrics", "Build standardized checks"],
    tools: ["Quick Ruby fixes", "Visual calibration", "Experienced judgment"],
    color: "from-violet-500 to-violet-700"
  },
  DMSP: {
    type: "DMSP",
    name: "The Meticulous Craftsman",
    description: "Every node, every link, every parameter—you've checked it personally. Your hands-on approach means you know your models inside out. Nothing leaves your desk without your thorough review.",
    strengths: ["Deep model knowledge", "Bulletproof quality", "Personal accountability", "Exceptional attention"],
    growth: ["Embrace automation for repetitive tasks", "Scale your quality approach", "Document your process"],
    tools: ["Manual data review", "Step-by-step validation", "Personal QC protocols"],
    color: "from-slate-600 to-slate-800"
  },
  DMSR: {
    type: "DMSR",
    name: "The Pragmatic Modeler",
    description: "You're the backbone of project delivery. Detail-oriented but deadline-aware, you manually craft quality models while making practical trade-offs. Your experience guides efficient, defensible decisions.",
    strengths: ["Reliable delivery", "Practical solutions", "Clear documentation", "Balanced judgment"],
    growth: ["Automate common workflows", "Push back on impossible deadlines", "Standardize your methods"],
    tools: ["Manual workflows", "Clear assumptions logs", "Pragmatic QC"],
    color: "from-amber-600 to-amber-700"
  },
  DMIP: {
    type: "DMIP",
    name: "The Perfectionist Purist",
    description: "You trust your hands and eyes over scripts. Every model you build has been personally inspected, calibrated with intuition honed over years, and validated to exacting standards. Your work speaks for itself.",
    strengths: ["Unmatched thoroughness", "Expert calibration", "Personal investment", "No shortcuts on quality"],
    growth: ["Consider automation for scale", "Accept good enough sometimes", "Share knowledge with juniors"],
    tools: ["Hands-on modeling", "Visual calibration", "Manual QC"],
    color: "from-rose-600 to-rose-800"
  },
  DMIR: {
    type: "DMIR",
    name: "The Intuitive Artisan",
    description: "Modeling is your craft. You work hands-on, guided by intuition developed over countless projects. Your practical approach delivers results, and you know exactly where to focus your effort.",
    strengths: ["Fast turnaround", "Practical accuracy", "Client rapport", "Flexible approach"],
    growth: ["Standardize your intuition into checklists", "Document assumptions better", "Try automation"],
    tools: ["Manual modeling", "Quick visual checks", "Experience-driven QC"],
    color: "from-orange-500 to-orange-700"
  },
  BASP: {
    type: "BASP",
    name: "The Strategic Architect",
    description: "You see the forest, not just the trees. Your automated master plans deliver strategic insights while maintaining systematic rigor. You build frameworks others can build upon.",
    strengths: ["Strategic vision", "Scalable solutions", "Systematic planning", "Framework design"],
    growth: ["Dive into details when needed", "Ground-truth your assumptions", "Validate with field data"],
    tools: ["Model templates", "Automated scenario runs", "High-level validation"],
    color: "from-emerald-500 to-emerald-700"
  },
  BASR: {
    type: "BASR",
    name: "The Agile Strategist",
    description: "You deliver big-picture insights on practical timelines. Your automated workflows serve strategic goals, and you know exactly what level of detail each project actually needs.",
    strengths: ["Fast strategic delivery", "Right-sized models", "Client-focused", "Efficient scope management"],
    growth: ["Validate simplified assumptions", "Document model limitations", "Build in detail checks"],
    tools: ["Quick scenario automation", "Strategic templates", "Executive reporting"],
    color: "from-cyan-500 to-cyan-700"
  },
  BAIP: {
    type: "BAIP",
    name: "The Visionary Engineer",
    description: "You combine strategic thinking with quality automation. Your models may be simplified, but they're systematically built and validated. You see patterns in system behavior that others miss.",
    strengths: ["Pattern recognition", "Quality at scale", "Innovative approaches", "Big-picture accuracy"],
    growth: ["Validate with detailed models", "Check edge cases", "Ground intuition in data"],
    tools: ["Automated strategic models", "Pattern-based validation", "System-level QC"],
    color: "from-sky-500 to-sky-700"
  },
  BAIR: {
    type: "BAIR",
    name: "The Fast-Track Consultant",
    description: "You deliver insights at speed. Your intuition for system behavior, combined with efficient automation, means you can answer the big questions quickly. Perfect for feasibility and options appraisal.",
    strengths: ["Rapid insights", "Strategic efficiency", "Client communication", "Quick turnaround"],
    growth: ["Validate fast conclusions", "Document limitations clearly", "Build in review points"],
    tools: ["Quick automation", "Intuitive modeling", "Fast scenario runs"],
    color: "from-yellow-500 to-yellow-600"
  },
  BMSP: {
    type: "BMSP",
    name: "The Strategic Perfectionist",
    description: "You take a big-picture approach but refuse to compromise on quality. Every strategic simplification is systematically justified. Your master plans are both visionary and bulletproof.",
    strengths: ["Justified simplifications", "Strategic quality", "Systematic documentation", "Defensible models"],
    growth: ["Automate repetitive validation", "Trust your strategic instincts", "Move faster on options"],
    tools: ["Manual strategic modeling", "Systematic QC", "Detailed documentation"],
    color: "from-pink-500 to-pink-700"
  },
  BMSR: {
    type: "BMSR",
    name: "The Practical Strategist",
    description: "You're the go-to modeler for strategic projects with real deadlines. Big-picture thinking with hands-on delivery means you answer the questions that matter without getting lost in details.",
    strengths: ["Practical strategy", "Deadline delivery", "Scope management", "Clear communication"],
    growth: ["Automate routine tasks", "Document your simplifications", "Build quality checks"],
    tools: ["Manual strategic modeling", "Practical QC", "Clear reporting"],
    color: "from-lime-500 to-lime-700"
  },
  BMIP: {
    type: "BMIP",
    name: "The Master Modeler",
    description: "Years of experience have given you strategic intuition backed by quality standards. You build big-picture models with systematic validation, guided by pattern recognition only experience brings.",
    strengths: ["Expert judgment", "Strategic quality", "Pattern recognition", "Mentoring ability"],
    growth: ["Transfer knowledge to automation", "Document your intuition", "Train the next generation"],
    tools: ["Expert manual modeling", "Experience-based QC", "Strategic validation"],
    color: "from-red-500 to-red-700"
  },
  BMIR: {
    type: "BMIR",
    name: "The Rapid Responder",
    description: "You're the one they call for fast answers. Strategic thinking, practical approach, and intuition honed by experience means you can model anything quickly. Perfect for emergencies and tight turnarounds.",
    strengths: ["Speed", "Practical solutions", "Crisis response", "Quick insights"],
    growth: ["Build in validation time", "Document limitations", "Slow down for complex projects"],
    tools: ["Fast manual modeling", "Quick checks", "Rapid reporting"],
    color: "from-fuchsia-500 to-fuchsia-700"
  }
};
