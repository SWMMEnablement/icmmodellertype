export interface PersonalizedTip {
  title: string;
  tip: string;
  icon: string;
}

export interface TypeConsultation {
  detailedProfile: string;
  tips: PersonalizedTip[];
  keyInsight: string;
}

// Personalized tips and extended consultation content for each personality type
export const typeConsultations: Record<string, TypeConsultation> = {
  // Context-dependent types
  CONTEXT_MASTER: {
    detailedProfile: "Your ability to read project context is your superpower. Unlike specialists who apply the same approach everywhere, you calibrate your methods based on client expectations, budget constraints, data quality, and delivery timelines. This makes you exceptionally valuable for organizations handling diverse project portfolios—from quick feasibility studies to detailed design models.",
    keyInsight: "Your adaptability is rare—most modellers struggle to switch gears. Document your decision-making process to help others learn this valuable skill.",
    tips: [
      {
        title: "Create Decision Frameworks",
        tip: "Build a personal decision matrix that maps project characteristics (budget, timeline, client sophistication) to modeling approaches. This speeds up your context assessment and makes your expertise transferable.",
        icon: "📋"
      },
      {
        title: "Document Your Logic",
        tip: "Keep a brief log of why you chose specific approaches for each project. This builds institutional knowledge and helps juniors understand your contextual reasoning.",
        icon: "📝"
      },
      {
        title: "Set Clear Boundaries",
        tip: "While flexibility is your strength, know when to push back. Some clients may try to get premium quality at economy prices—your experience should help you spot these mismatches early.",
        icon: "🛡️"
      }
    ]
  },
  CONTEXT_NAVIGATOR: {
    detailedProfile: "You balance personal technical preferences with practical project realities. While you have go-to methods, you readily adjust based on client requirements and constraints. This pragmatic flexibility makes you effective across varied project types without sacrificing your core quality standards.",
    keyInsight: "Your blend of preference and flexibility puts you in an excellent position to mentor others—you can explain both 'best practice' and 'best fit'.",
    tips: [
      {
        title: "Strengthen Your Defaults",
        tip: "Identify your core technical preferences and document why they work. When you do deviate, you'll be making conscious trade-offs rather than ad-hoc decisions.",
        icon: "⚓"
      },
      {
        title: "Track Adaptation Triggers",
        tip: "Note which project factors most often cause you to deviate from your preferred approach. This self-awareness helps you predict adjustments earlier in projects.",
        icon: "🎯"
      },
      {
        title: "Build a Scope Library",
        tip: "Create template scopes for different project types that reflect appropriate quality-effort trade-offs. This saves time and sets correct expectations upfront.",
        icon: "📚"
      }
    ]
  },

  // Hybrid types
  HYBRID_INTEGRATOR: {
    detailedProfile: "You're the rare modeller who genuinely operates across all dimensions without strong preferences. Where others see methodological divides, you see a toolkit to draw from. This makes you invaluable for complex, multi-stakeholder projects where rigid approaches fail.",
    keyInsight: "Your integration ability is rare—most people have strong preferences. Consider leading methodology discussions to help teams blend diverse approaches.",
    tips: [
      {
        title: "Codify Your Switching Logic",
        tip: "Document when and why you switch between approaches. This transforms tacit knowledge into teachable frameworks that can elevate entire teams.",
        icon: "🔄"
      },
      {
        title: "Become the Bridge",
        tip: "Position yourself as the translator between specialists. Your ability to understand multiple perspectives makes you ideal for resolving methodological conflicts.",
        icon: "🌉"
      },
      {
        title: "Develop Signature Moves",
        tip: "While flexibility is your strength, consider developing one or two areas of deep expertise. This gives you anchoring points and builds reputation.",
        icon: "⚡"
      }
    ]
  },
  HYBRID_ADAPTIVE: {
    detailedProfile: "You combine specialist depth with contextual flexibility. While you have preferred approaches, you readily adjust based on project needs. Your ability to shift gears while maintaining quality makes you effective across diverse project types.",
    keyInsight: "Your blend of expertise and adaptability makes you an excellent project lead—you can both do the work and adjust the approach as needed.",
    tips: [
      {
        title: "Document Adaptation Patterns",
        tip: "Track which situations trigger you to deviate from your defaults. This self-awareness helps you onboard team members and set project expectations.",
        icon: "📊"
      },
      {
        title: "Build Adaptive Templates",
        tip: "Create model templates with built-in flexibility points—places where you know you typically adjust based on context. This speeds up project setup.",
        icon: "🧩"
      },
      {
        title: "Share Your Flexibility",
        tip: "Many modellers struggle with adaptation. Consider running knowledge-sharing sessions on how to adjust approaches without compromising quality.",
        icon: "🎓"
      }
    ]
  },
  HYBRID_FLEXIBLE: {
    detailedProfile: "You blend traditional approaches with adaptive thinking. While you have core preferences, you're comfortable adjusting when the situation demands it. This flexibility allows you to handle unexpected challenges and work effectively with diverse team members.",
    keyInsight: "Your willingness to flex while maintaining core standards makes you a reliable team player in mixed-methodology environments.",
    tips: [
      {
        title: "Strengthen Your Core",
        tip: "Identify 2-3 approaches you're exceptionally good at and double down on them. Flexibility works best when built on a foundation of deep competence.",
        icon: "💪"
      },
      {
        title: "Learn to Flex Faster",
        tip: "Practice rapid context assessment. The quicker you can read a situation and adjust, the more value your flexibility provides.",
        icon: "⚡"
      },
      {
        title: "Build Cross-Functional Skills",
        tip: "Your natural flexibility makes you well-suited for roles that bridge technical modeling and project management or client relations.",
        icon: "🔗"
      }
    ]
  },

  // Standard types
  DASP: {
    detailedProfile: "Your precision-first mindset produces models that clients can trust implicitly. Every parameter verified, every connection checked, every assumption documented. Your automated workflows ensure this quality is reproducible across projects and team members.",
    keyInsight: "Your attention to detail catches errors others miss—but ensure this superpower doesn't become a bottleneck on time-sensitive projects.",
    tips: [
      {
        title: "Create Tiered QA Protocols",
        tip: "Develop different validation intensities for different project phases. Full rigor for final deliverables, lighter checks for exploratory work. This prevents perfectionism from slowing early iterations.",
        icon: "📊"
      },
      {
        title: "Automate the Obvious",
        tip: "If you find yourself checking the same things repeatedly, script it. Your systematic nature makes you ideal for building team-wide quality automation.",
        icon: "🤖"
      },
      {
        title: "Trust Your Shortcuts",
        tip: "Build a library of validated simplifications for common situations. Your thorough testing of these shortcuts means you can use them with confidence.",
        icon: "⚡"
      }
    ]
  },
  DASR: {
    detailedProfile: "You've mastered the art of efficient quality. Your automated pipelines handle the heavy lifting while your experience tells you exactly where to focus attention. Clients get reliable deliverables without unnecessary gold-plating.",
    keyInsight: "Your efficiency is valuable—consider packaging your workflows as templates that less experienced modellers can use.",
    tips: [
      {
        title: "Document Your Intuition",
        tip: "When you make quick decisions that save time, note them down. These 'obvious' shortcuts aren't obvious to everyone and represent valuable institutional knowledge.",
        icon: "📝"
      },
      {
        title: "Build Contingency Buffers",
        tip: "Your efficiency can create expectations of always-fast delivery. Build in reasonable buffers for when projects hit unexpected complexity.",
        icon: "⏰"
      },
      {
        title: "Share Your Templates",
        tip: "Your efficient workflows could multiply across your team. Consider leading knowledge-sharing sessions on rapid-yet-reliable modeling.",
        icon: "🎁"
      }
    ]
  },
  DAIP: {
    detailedProfile: "You've automated quality into every workflow. Your scripts don't just save time—they enforce standards that catch errors before they propagate. When you deliver a model, it's been through battle-tested quality gates.",
    keyInsight: "Your automated QA approach could become a team standard—consider packaging your scripts for wider use.",
    tips: [
      {
        title: "Balance Automation with Judgment",
        tip: "Scripts catch known issues but can miss novel problems. Build in periodic manual reviews to catch what automation might miss.",
        icon: "⚖️"
      },
      {
        title: "Accept Exploratory Uncertainty",
        tip: "Early-stage modeling often involves deliberate simplifications. Create a 'draft mode' workflow that allows faster iteration without triggering perfectionist instincts.",
        icon: "🔬"
      },
      {
        title: "Train Others on Your Tools",
        tip: "Your automated QA scripts are institutional assets. Document them and train colleagues so the knowledge isn't siloed.",
        icon: "👥"
      }
    ]
  },
  DMSP: {
    detailedProfile: "You know your models inside out because you've touched every element personally. This deep familiarity means you can troubleshoot issues others can't even diagnose. Your hands-on approach builds unmatched model knowledge.",
    keyInsight: "Your deep model knowledge is invaluable for complex troubleshooting—position yourself as the go-to person for difficult diagnostic work.",
    tips: [
      {
        title: "Embrace Strategic Automation",
        tip: "Identify repetitive tasks that don't require your judgment and automate them. This frees up time for the detailed work that actually benefits from your attention.",
        icon: "🤖"
      },
      {
        title: "Document Your Process",
        tip: "Your personal QC protocols are refined by experience. Write them down so others can learn from your approach and so you can delegate more confidently.",
        icon: "📋"
      },
      {
        title: "Mentor Through Pairing",
        tip: "Your hands-on style makes you an excellent mentor. Work alongside juniors so they can absorb your attention to detail through observation.",
        icon: "👥"
      }
    ]
  },
  DMSR: {
    detailedProfile: "You're the backbone of project delivery—reliable, practical, and deadline-aware. You manually craft quality models while making smart trade-offs. Your experience guides efficient, defensible decisions that keep projects moving.",
    keyInsight: "Your reliability makes you the person teams depend on—ensure you're not overloaded and advocate for realistic timelines.",
    tips: [
      {
        title: "Protect Your Time",
        tip: "Your reliability can lead to overload. Practice saying no or negotiating scope when timelines are unrealistic—your judgment on what's achievable is valuable.",
        icon: "🛡️"
      },
      {
        title: "Standardize Your Methods",
        tip: "Your practical approaches work—document them as standard procedures so others can achieve similar efficiency and you can delegate more.",
        icon: "📝"
      },
      {
        title: "Explore Targeted Automation",
        tip: "Identify 2-3 routine tasks that eat significant time and explore automating just those. You don't need to become a scripter—just reduce friction on common workflows.",
        icon: "⚙️"
      }
    ]
  },
  BASP: {
    detailedProfile: "You see the forest, not just the trees. Your automated master plans deliver strategic insights while maintaining systematic rigor. You build frameworks others can build upon, and your pattern recognition catches system-level issues.",
    keyInsight: "Your strategic vision is valuable for project scoping and options appraisals—ensure your high-level views are grounded in validated assumptions.",
    tips: [
      {
        title: "Ground-Truth Your Assumptions",
        tip: "Strategic simplifications are powerful but risky if wrong. Build regular validation checkpoints to ensure your big-picture view reflects reality.",
        icon: "🎯"
      },
      {
        title: "Document Your Frameworks",
        tip: "Your systematic planning approaches are valuable IP. Document them so teams can apply your strategic thinking frameworks independently.",
        icon: "📊"
      },
      {
        title: "Dive Deep Occasionally",
        tip: "Periodically work on a detailed element of your models. This keeps you connected to ground-level realities and prevents strategic blind spots.",
        icon: "🔍"
      }
    ]
  },
  BASR: {
    detailedProfile: "You deliver big-picture insights on practical timelines. Your automated workflows serve strategic goals, and you know exactly what level of detail each project actually needs. Perfect for feasibility studies and quick-turnaround consulting.",
    keyInsight: "Your speed-to-insight ratio is exceptional—position yourself for time-sensitive strategic work where quick answers matter more than exhaustive detail.",
    tips: [
      {
        title: "Document Limitations",
        tip: "Fast strategic models involve simplifications. Be explicit about what your models can and cannot tell clients to prevent misuse of your outputs.",
        icon: "⚠️"
      },
      {
        title: "Build Validation Shortcuts",
        tip: "Develop quick sanity checks that validate your strategic conclusions without requiring detailed review. Speed with confidence is your value proposition.",
        icon: "✅"
      },
      {
        title: "Know When to Slow Down",
        tip: "Your speed is an asset, but some projects genuinely need more detail. Develop criteria for recognizing when fast isn't appropriate.",
        icon: "⏸️"
      }
    ]
  },
  BMSP: {
    detailedProfile: "You take a big-picture approach but refuse to compromise on quality. Every strategic simplification is systematically justified. Your master plans are both visionary and bulletproof. Documentation is your superpower.",
    keyInsight: "Your justified simplifications are gold—your documentation proves that strategic models can be both fast and defensible.",
    tips: [
      {
        title: "Template Your Justifications",
        tip: "You're excellent at documenting why simplifications work. Create templates that make this documentation faster without sacrificing rigor.",
        icon: "📋"
      },
      {
        title: "Trust Your Strategic Instincts",
        tip: "Your quality standards sometimes slow early-stage work. Practice making quick strategic calls with the confidence that you'll validate later.",
        icon: "🎯"
      },
      {
        title: "Automate Your Validation",
        tip: "You probably have systematic checks you apply repeatedly. Automating these would maintain your quality standards while improving speed.",
        icon: "🤖"
      }
    ]
  },
  BMSR: {
    detailedProfile: "You're the go-to modeller for strategic projects with real deadlines. Big-picture thinking with hands-on delivery means you answer the questions that matter without getting lost in details. Crisis response and tight turnarounds are your specialty.",
    keyInsight: "Your ability to deliver under pressure is rare—ensure you're not always the crisis responder and that you get to do thoughtful work too.",
    tips: [
      {
        title: "Build Quality Shortcuts",
        tip: "Your speed shouldn't sacrifice defensibility. Develop quick-check protocols that catch major issues without requiring full detailed review.",
        icon: "⚡"
      },
      {
        title: "Document Your Speed Methods",
        tip: "Your rapid-delivery approaches are valuable. Write them down so others can handle time-pressure situations and you're not always the emergency resource.",
        icon: "📝"
      },
      {
        title: "Schedule Reflection Time",
        tip: "Constant delivery mode can prevent skill development. Block time for learning and thoughtful work, not just project delivery.",
        icon: "🧘"
      }
    ]
  },
  BMIP: {
    detailedProfile: "Years of experience have given you strategic intuition backed by quality standards. You build big-picture models with systematic validation, guided by pattern recognition only experience brings. You're often the one mentoring the next generation.",
    keyInsight: "Your experiential wisdom is institutional gold—ensure you're actively transferring knowledge to the next generation of modellers.",
    tips: [
      {
        title: "Externalize Your Intuition",
        tip: "When you make experience-based calls, explain your reasoning out loud. This helps juniors learn and helps you identify patterns you might automate.",
        icon: "💡"
      },
      {
        title: "Create Pattern Libraries",
        tip: "Your pattern recognition catches issues others miss. Document these patterns as diagnostic guides that less experienced modellers can reference.",
        icon: "📚"
      },
      {
        title: "Embrace New Tools",
        tip: "Your experience is invaluable, but new tools may offer capabilities worth learning. Stay curious about innovations that could enhance your expertise.",
        icon: "🔧"
      }
    ]
  }
};

// Default consultation for types not explicitly defined
export const defaultConsultation: TypeConsultation = {
  detailedProfile: "Your unique combination of modeling preferences shapes how you approach hydraulic modeling challenges. Understanding your style helps you leverage your natural strengths while being aware of potential blind spots.",
  keyInsight: "Every modeling style has its place—the key is matching your approach to the project's needs.",
  tips: [
    {
      title: "Know Your Strengths",
      tip: "Review your strengths above and look for projects where these naturally apply. Playing to your strengths increases both efficiency and job satisfaction.",
      icon: "💪"
    },
    {
      title: "Address Growth Areas",
      tip: "Pick one growth area to focus on this quarter. Small, consistent improvements compound over time into significant capability gains.",
      icon: "🌱"
    },
    {
      title: "Learn from Others",
      tip: "Seek out colleagues with different modeling styles. Understanding how others approach problems expands your toolkit and perspective.",
      icon: "🤝"
    }
  ]
};

// Helper function to get consultation for a type
export const getConsultation = (type: string): TypeConsultation => {
  // Map display types to data keys
  const typeMap: Record<string, string> = {
    'CONTEXT': 'CONTEXT_MASTER',
    'NAVIGATOR': 'CONTEXT_NAVIGATOR',
    'HYBRID': 'HYBRID_INTEGRATOR',
    'ADAPTIVE': 'HYBRID_ADAPTIVE',
    'FLEX': 'HYBRID_FLEXIBLE'
  };
  
  const key = typeMap[type] || type;
  return typeConsultations[key] || defaultConsultation;
};
