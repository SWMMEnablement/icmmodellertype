// Team dynamics data - how each personality type collaborates with others

export interface CollaborationInsight {
  type: string;
  compatibility: 'high' | 'medium' | 'complementary';
  description: string;
}

export interface TeamDynamicsData {
  worksWith: CollaborationInsight[];
  challengesWith: { type: string; challenge: string; tip: string }[];
  teamRole: string;
  idealPartners: string[];
}

// Collaboration insights for each personality type
export const teamDynamics: Record<string, TeamDynamicsData> = {
  // Context-Dependent Types
  CONTEXT_MASTER: {
    worksWith: [
      { type: "DASP", compatibility: "complementary", description: "Provides the detailed foundation you need to make informed contextual decisions." },
      { type: "BMSR", compatibility: "high", description: "Shares your pragmatic approach and deadline awareness—great for fast-moving projects." },
      { type: "BASR", compatibility: "high", description: "Matches your adaptability with strategic automation skills." },
    ],
    challengesWith: [
      { type: "DMSP", challenge: "May find your flexibility unsettling when they prefer consistent approaches.", tip: "Document your decision criteria to help them understand your logic." },
      { type: "DAIP", challenge: "Their fixed quality standards may conflict with your situational trade-offs.", tip: "Align early on quality thresholds for different project phases." },
    ],
    teamRole: "The Facilitator—you bridge different working styles and adapt team processes to project needs.",
    idealPartners: ["DASP", "BASR", "BMSR"],
  },
  CONTEXT_NAVIGATOR: {
    worksWith: [
      { type: "DMSR", compatibility: "high", description: "Both prioritize delivery while maintaining quality—natural project partners." },
      { type: "BASP", compatibility: "complementary", description: "Their strategic frameworks complement your adaptive execution." },
      { type: "DASR", compatibility: "high", description: "Efficient experts who appreciate your practical flexibility." },
    ],
    challengesWith: [
      { type: "DASP", challenge: "Their precision focus may clash with your pragmatic adjustments.", tip: "Define critical vs. flexible areas upfront to avoid friction." },
      { type: "BMIP", challenge: "Their experience-based intuition may conflict with your context-driven decisions.", tip: "Leverage their expertise while explaining your situational reasoning." },
    ],
    teamRole: "The Negotiator—you balance competing demands and keep projects on track.",
    idealPartners: ["DMSR", "BASR", "DASR"],
  },

  // Hybrid Types
  HYBRID_INTEGRATOR: {
    worksWith: [
      { type: "DASP", compatibility: "complementary", description: "Their precision grounds your adaptability—excellent for complex projects." },
      { type: "BASP", compatibility: "complementary", description: "Strategic vision meets flexible execution." },
      { type: "BMSR", compatibility: "high", description: "Both comfortable switching approaches as needed." },
    ],
    challengesWith: [
      { type: "DMSP", challenge: "Your flexibility may seem inconsistent to their methodical approach.", tip: "Establish clear checkpoints where you'll use their detailed review." },
      { type: "DAIP", challenge: "Your adaptive style may bypass their automated quality gates.", tip: "Integrate your flexibility within their automation framework." },
    ],
    teamRole: "The Bridge—you translate between different specialists and adapt team methods to project phases.",
    idealPartners: ["DASP", "BASP", "DMSR"],
  },
  HYBRID_ADAPTIVE: {
    worksWith: [
      { type: "DASR", compatibility: "high", description: "Shared efficiency mindset with complementary depth." },
      { type: "BASR", compatibility: "high", description: "Both agile and strategic—great for varied project portfolios." },
      { type: "DMSR", compatibility: "high", description: "Practical approach alignment makes collaboration smooth." },
    ],
    challengesWith: [
      { type: "DASP", challenge: "Their consistency expectations may conflict with your adaptive approach.", tip: "Be explicit about when and why you're adapting methods." },
      { type: "BMIP", challenge: "Experience-based judgment may clash with your contextual flexibility.", tip: "Frame your adaptations as building on their expertise." },
    ],
    teamRole: "The Flex Player—you fill gaps in the team and adjust your style to complement others.",
    idealPartners: ["DASR", "BASR", "BMSR"],
  },
  HYBRID_FLEXIBLE: {
    worksWith: [
      { type: "DMSR", compatibility: "high", description: "Shared pragmatism with complementary attention to detail." },
      { type: "BASR", compatibility: "high", description: "Both efficient and adaptable—great for consulting work." },
      { type: "DASR", compatibility: "high", description: "Efficiency focus aligns well with your flexible delivery." },
    ],
    challengesWith: [
      { type: "DASP", challenge: "Your flexibility may be seen as inconsistency.", tip: "Document your core approach while noting where you flex." },
      { type: "DMSP", challenge: "Their thorough methods may feel limiting.", tip: "Propose efficiency improvements that maintain their quality standards." },
    ],
    teamRole: "The Collaborator—you adapt to team needs and bridge different working styles.",
    idealPartners: ["DMSR", "BASR", "DASR"],
  },

  // Core Types
  DASP: {
    worksWith: [
      { type: "BASP", compatibility: "complementary", description: "Your detail focus + their strategic vision = comprehensive models." },
      { type: "DASR", compatibility: "high", description: "Shared automation skills with complementary quality/speed balance." },
      { type: "DMSP", compatibility: "high", description: "Both value precision—they bring hands-on expertise, you bring automation." },
    ],
    challengesWith: [
      { type: "BMSR", challenge: "Their speed priority may conflict with your quality standards.", tip: "Define minimum quality thresholds early and automate quick-checks." },
      { type: "BASR", challenge: "They may skip details you consider essential.", tip: "Identify which details are truly critical vs. nice-to-have." },
    ],
    teamRole: "The Quality Guardian—you establish standards and automated QA that the whole team relies on.",
    idealPartners: ["BASP", "DASR", "DMSP"],
  },
  DASR: {
    worksWith: [
      { type: "DASP", compatibility: "high", description: "You bring speed, they bring rigor—cover each other's gaps." },
      { type: "BASR", compatibility: "high", description: "Both efficient and automated—excellent for high-volume work." },
      { type: "BMSR", compatibility: "high", description: "Shared pragmatism makes collaboration smooth." },
    ],
    challengesWith: [
      { type: "DMSP", challenge: "They may want more manual verification than you prefer.", tip: "Use automation to generate evidence that satisfies their review needs." },
      { type: "DAIP", challenge: "Their perfectionism may slow down your efficient delivery.", tip: "Agree on quality tiers for different project phases." },
    ],
    teamRole: "The Accelerator—you speed up team delivery while maintaining sufficient quality.",
    idealPartners: ["DASP", "BASR", "BMSR"],
  },
  DAIP: {
    worksWith: [
      { type: "DASP", compatibility: "high", description: "Shared quality focus with complementary systematic/intuitive balance." },
      { type: "BASP", compatibility: "complementary", description: "Your quality automation + their strategic framework = robust solutions." },
      { type: "DMSP", compatibility: "high", description: "Both perfectionists—you bring automation, they bring hands-on expertise." },
    ],
    challengesWith: [
      { type: "BMSR", challenge: "Your quality standards may conflict with their speed priority.", tip: "Create fast-track QA paths for time-critical work." },
      { type: "BASR", challenge: "Their pragmatic shortcuts may bypass your automated checks.", tip: "Make your automation efficient enough that it doesn't slow them down." },
    ],
    teamRole: "The Standards Setter—you create automated quality frameworks the team builds upon.",
    idealPartners: ["DASP", "BASP", "DMSP"],
  },
  DMSP: {
    worksWith: [
      { type: "DASP", compatibility: "high", description: "Both detail-focused and perfectionist—you review, they automate." },
      { type: "DAIP", compatibility: "high", description: "Shared quality standards with complementary manual/automated approaches." },
      { type: "BMSP", compatibility: "high", description: "Both systematic perfectionists at different scales." },
    ],
    challengesWith: [
      { type: "BASR", challenge: "Their strategic shortcuts may feel insufficiently thorough.", tip: "Focus your detailed review on the areas that matter most." },
      { type: "BMSR", challenge: "Their speed may seem to compromise quality.", tip: "Establish minimum detail checkpoints for fast-track work." },
    ],
    teamRole: "The Detail Guardian—you catch issues others miss and ensure bulletproof quality.",
    idealPartners: ["DASP", "DAIP", "BMSP"],
  },
  DMSR: {
    worksWith: [
      { type: "DASR", compatibility: "high", description: "Both pragmatic and delivery-focused—great project partners." },
      { type: "BMSR", compatibility: "high", description: "Shared pragmatism at different scales—you handle detail, they handle strategy." },
      { type: "BASR", compatibility: "high", description: "Both efficient and client-focused." },
    ],
    challengesWith: [
      { type: "DASP", challenge: "Their precision may feel like perfectionism when deadlines loom.", tip: "Negotiate quality scope based on project criticality." },
      { type: "DAIP", challenge: "Their automated standards may be overkill for some projects.", tip: "Help them understand which quality gates are essential." },
    ],
    teamRole: "The Reliable Backbone—you consistently deliver quality work on deadline.",
    idealPartners: ["DASR", "BMSR", "BASR"],
  },
  BASP: {
    worksWith: [
      { type: "DASP", compatibility: "complementary", description: "Your strategy + their detail = comprehensive, robust models." },
      { type: "BASR", compatibility: "high", description: "Both strategic and automated—great for portfolio-level work." },
      { type: "DAIP", compatibility: "complementary", description: "Your frameworks + their quality automation = scalable excellence." },
    ],
    challengesWith: [
      { type: "DMSP", challenge: "They may want detail you've strategically omitted.", tip: "Document your simplification rationale for their review." },
      { type: "DMSR", challenge: "Their hands-on approach may not scale to your strategic scope.", tip: "Define clear handoff points between strategy and detail work." },
    ],
    teamRole: "The Architect—you design frameworks and strategic approaches the team implements.",
    idealPartners: ["DASP", "BASR", "DAIP"],
  },
  BASR: {
    worksWith: [
      { type: "DASR", compatibility: "high", description: "Both efficient and pragmatic—excellent for high-volume consulting." },
      { type: "BASP", compatibility: "high", description: "Shared strategic focus with complementary quality/speed balance." },
      { type: "BMSR", compatibility: "high", description: "Both fast and strategic at different automation levels." },
    ],
    challengesWith: [
      { type: "DASP", challenge: "Your speed may concern their quality focus.", tip: "Show how your efficient approach still captures critical elements." },
      { type: "DMSP", challenge: "Your strategic shortcuts may skip detail they consider essential.", tip: "Identify which details are critical to validate your strategic assumptions." },
    ],
    teamRole: "The Fast Strategist—you rapidly produce strategic insights that inform team decisions.",
    idealPartners: ["DASR", "BASP", "BMSR"],
  },
  BMSP: {
    worksWith: [
      { type: "DMSP", compatibility: "high", description: "Both perfectionists—you handle strategy, they handle detail." },
      { type: "BASP", compatibility: "high", description: "Both systematic and strategic—complementary automation approaches." },
      { type: "DASP", compatibility: "complementary", description: "Your justified simplifications + their precision = defensible models." },
    ],
    challengesWith: [
      { type: "BASR", challenge: "Their speed may feel like cutting corners.", tip: "Help them understand which strategic elements need thorough validation." },
      { type: "DASR", challenge: "Their efficiency may bypass documentation you consider essential.", tip: "Identify minimum documentation requirements for different work types." },
    ],
    teamRole: "The Strategic Perfectionist—you ensure strategic decisions are bulletproof.",
    idealPartners: ["DMSP", "BASP", "DASP"],
  },
  BMSR: {
    worksWith: [
      { type: "DMSR", compatibility: "high", description: "Both pragmatic—you handle big picture, they handle details." },
      { type: "BASR", compatibility: "high", description: "Both fast and strategic—great for crisis response." },
      { type: "DASR", compatibility: "high", description: "Shared efficiency with complementary scope focus." },
    ],
    challengesWith: [
      { type: "DASP", challenge: "Your speed may concern their quality focus.", tip: "Define quality minimums for time-critical work." },
      { type: "DMSP", challenge: "Your big-picture approach may lack detail they expect.", tip: "Partner with them for quality-critical project phases." },
    ],
    teamRole: "The Crisis Handler—you deliver strategic solutions when time is critical.",
    idealPartners: ["DMSR", "BASR", "DASR"],
  },
  BMIP: {
    worksWith: [
      { type: "BASP", compatibility: "high", description: "Shared strategic focus—your intuition + their systematic approach." },
      { type: "DMSP", compatibility: "complementary", description: "Your experience guides their detailed work—great mentorship dynamic." },
      { type: "BMSP", compatibility: "high", description: "Both strategic perfectionists with complementary intuitive/systematic styles." },
    ],
    challengesWith: [
      { type: "DASR", challenge: "Your experience-based approach may conflict with their automated efficiency.", tip: "Help them understand the 'why' behind your intuitive decisions." },
      { type: "BASR", challenge: "Your quality standards may conflict with their speed priority.", tip: "Define when speed is acceptable and when experience should guide." },
    ],
    teamRole: "The Mentor—you guide the team with experience-based insights and pattern recognition.",
    idealPartners: ["BASP", "DMSP", "BMSP"],
  },
};

// Helper function to get team dynamics for a personality type
export const getTeamDynamics = (typeCode: string): TeamDynamicsData | null => {
  // Handle special type mappings
  const typeMap: Record<string, string> = {
    "CONTEXT": "CONTEXT_MASTER",
    "NAVIGATOR": "CONTEXT_NAVIGATOR",
    "HYBRID": "HYBRID_INTEGRATOR",
    "ADAPTIVE": "HYBRID_ADAPTIVE",
    "FLEX": "HYBRID_FLEXIBLE",
  };
  
  const mappedType = typeMap[typeCode] || typeCode;
  return teamDynamics[mappedType] || null;
};

// Get the display name for a type code
export const getTypeDisplayName = (typeCode: string): string => {
  const names: Record<string, string> = {
    CONTEXT_MASTER: "Context Master",
    CONTEXT_NAVIGATOR: "Context Navigator",
    HYBRID_INTEGRATOR: "Integrator",
    HYBRID_ADAPTIVE: "Adaptive Specialist",
    HYBRID_FLEXIBLE: "Flexible Practitioner",
    DASP: "Precision Engineer",
    DASR: "Efficient Expert",
    DAIP: "Quality Automator",
    DMSP: "Meticulous Craftsman",
    DMSR: "Pragmatic Modeller",
    BASP: "Strategic Architect",
    BASR: "Agile Strategist",
    BMSP: "Strategic Perfectionist",
    BMSR: "Practical Strategist",
    BMIP: "Master Modeller",
  };
  return names[typeCode] || typeCode;
};
