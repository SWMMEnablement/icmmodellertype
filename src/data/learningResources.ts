export interface LearningResource {
  title: string;
  description: string;
  url: string;
  type: "webinar" | "tutorial" | "documentation" | "course" | "video";
}

// Learning resources mapped by personality type
// These connect each modeller type to relevant InfoWorks ICM learning materials
export const learningResources: Record<string, LearningResource[]> = {
  // Context-Driven Types
  CONTEXT_MASTER: [
    {
      title: "Project Scoping Best Practices",
      description: "Learn how to assess project requirements and adapt your modelling approach",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-ICM-Overview",
      type: "documentation"
    },
    {
      title: "Client Communication for Modellers",
      description: "Strategies for managing stakeholder expectations across diverse projects",
      url: "https://boards.autodesk.com/icm",
      type: "course"
    },
    {
      title: "Flexible Model Configuration",
      description: "Configure models to meet varying project specifications",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Model-Configuration",
      type: "tutorial"
    }
  ],
  CONTEXT_NAVIGATOR: [
    {
      title: "Balancing Quality and Delivery",
      description: "Practical approaches to meeting deadlines without compromising results",
      url: "https://boards.autodesk.com/icm",
      type: "course"
    },
    {
      title: "Scope Management Techniques",
      description: "How to manage project scope effectively in hydraulic modelling",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-ICM-Overview",
      type: "documentation"
    }
  ],

  // Hybrid Types
  HYBRID_INTEGRATOR: [
    {
      title: "Advanced Workflow Integration",
      description: "Combine multiple modelling approaches for complex projects",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Workflows",
      type: "tutorial"
    },
    {
      title: "Multi-Stakeholder Project Management",
      description: "Coordinate diverse team members with different modelling styles",
      url: "https://boards.autodesk.com/icm",
      type: "course"
    }
  ],
  HYBRID_ADAPTIVE: [
    {
      title: "Adaptive Modelling Strategies",
      description: "Learn to flex your approach based on project needs",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Best-Practices",
      type: "documentation"
    },
    {
      title: "InfoWorks ICM Community Discussions",
      description: "Connect with other adaptive modellers and share techniques",
      url: "https://boards.autodesk.com/icm",
      type: "course"
    }
  ],
  HYBRID_FLEXIBLE: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Build a strong foundation across all modelling approaches",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Getting-Started",
      type: "tutorial"
    },
    {
      title: "Team Collaboration Best Practices",
      description: "Work effectively with colleagues who have different styles",
      url: "https://boards.autodesk.com/icm",
      type: "course"
    }
  ],

  // Detail + Automated Types
  DASP: [
    {
      title: "Ruby Scripting in InfoWorks ICM",
      description: "Master automation with Ruby scripts for validation and data processing",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Ruby-Scripting",
      type: "tutorial"
    },
    {
      title: "Model Validation Techniques",
      description: "Systematic approaches to comprehensive model validation",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Validation",
      type: "documentation"
    },
    {
      title: "Automated QA/QC Workflows",
      description: "Build reproducible quality assurance processes",
      url: "https://boards.autodesk.com/icm",
      type: "webinar"
    }
  ],
  DASR: [
    {
      title: "Open Data Import Centre (ODIC)",
      description: "Efficiently import and manage large datasets",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-ODIC",
      type: "tutorial"
    },
    {
      title: "Rapid Calibration Techniques",
      description: "Calibrate models quickly while maintaining accuracy",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Calibration",
      type: "documentation"
    },
    {
      title: "Batch Processing Workflows",
      description: "Automate repetitive tasks for faster delivery",
      url: "https://boards.autodesk.com/icm",
      type: "webinar"
    }
  ],
  DAIP: [
    {
      title: "Advanced Ruby Automation",
      description: "Create sophisticated scripts for quality enforcement",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Ruby-Advanced",
      type: "tutorial"
    },
    {
      title: "Pattern-Based Validation",
      description: "Use pattern recognition to identify model issues",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Patterns",
      type: "documentation"
    },
    {
      title: "Building Team Standards",
      description: "Establish and enforce modelling standards across your organisation",
      url: "https://boards.autodesk.com/icm",
      type: "course"
    }
  ],

  // Detail + Manual Types
  DMSP: [
    {
      title: "Detailed Network Building",
      description: "Best practices for building comprehensive network models",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Network-Building",
      type: "tutorial"
    },
    {
      title: "Manual Data Quality Checks",
      description: "Systematic approaches to hands-on data validation",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Data-Quality",
      type: "documentation"
    },
    {
      title: "Visual Model Inspection",
      description: "Techniques for thorough visual review of model components",
      url: "https://boards.autodesk.com/icm",
      type: "webinar"
    }
  ],
  DMSR: [
    {
      title: "Pragmatic Modelling Approaches",
      description: "Balance detail with delivery timelines effectively",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Pragmatic",
      type: "documentation"
    },
    {
      title: "Assumption Documentation",
      description: "How to document and justify modelling assumptions",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Assumptions",
      type: "tutorial"
    },
    {
      title: "Crisis Response Modelling",
      description: "Rapid model development for urgent situations",
      url: "https://boards.autodesk.com/icm",
      type: "webinar"
    }
  ],

  // Big-Picture + Automated Types
  BASP: [
    {
      title: "Master Planning with InfoWorks ICM",
      description: "Strategic modelling for large-scale infrastructure planning",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Master-Planning",
      type: "tutorial"
    },
    {
      title: "Scenario Management",
      description: "Efficiently manage and compare multiple scenarios",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Scenarios",
      type: "documentation"
    },
    {
      title: "Strategic Model Simplification",
      description: "When and how to simplify models for strategic analysis",
      url: "https://boards.autodesk.com/icm",
      type: "webinar"
    }
  ],
  BASR: [
    {
      title: "Feasibility Study Modelling",
      description: "Quick-turnaround modelling for options appraisals",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Feasibility",
      type: "tutorial"
    },
    {
      title: "Executive Reporting",
      description: "Create impactful reports for non-technical stakeholders",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Reporting",
      type: "documentation"
    },
    {
      title: "Rapid Scenario Analysis",
      description: "Fast scenario comparison techniques",
      url: "https://boards.autodesk.com/icm",
      type: "webinar"
    }
  ],

  // Big-Picture + Manual Types
  BMSP: [
    {
      title: "Strategic Documentation Standards",
      description: "Comprehensive documentation for strategic models",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Documentation",
      type: "documentation"
    },
    {
      title: "Justified Simplification Techniques",
      description: "Document and defend strategic model simplifications",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Simplification",
      type: "tutorial"
    },
    {
      title: "Systematic Quality for Strategic Models",
      description: "Maintain quality standards in big-picture modelling",
      url: "https://boards.autodesk.com/icm",
      type: "webinar"
    }
  ],
  BMSR: [
    {
      title: "Rapid Strategic Modelling",
      description: "Deliver strategic insights on tight timelines",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Rapid-Modelling",
      type: "tutorial"
    },
    {
      title: "Clear Communication of Results",
      description: "Present complex results in accessible formats",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Communication",
      type: "documentation"
    },
    {
      title: "Emergency Response Modelling",
      description: "Fast modelling for emergency and crisis situations",
      url: "https://boards.autodesk.com/icm",
      type: "webinar"
    }
  ],
  BMIP: [
    {
      title: "Experience-Based Modelling",
      description: "Leverage your expertise for efficient model development",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Expert-Modelling",
      type: "documentation"
    },
    {
      title: "Mentoring Junior Modellers",
      description: "Share your knowledge with the next generation",
      url: "https://boards.autodesk.com/icm",
      type: "course"
    },
    {
      title: "Pattern Recognition in Models",
      description: "Use experience to identify issues and opportunities",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Patterns",
      type: "tutorial"
    }
  ]
};

// Get resources for a personality type, with fallback to general resources
export const getResourcesForType = (typeCode: string): LearningResource[] => {
  // Direct match
  if (learningResources[typeCode]) {
    return learningResources[typeCode];
  }
  
  // Fallback general resources
  return [
    {
      title: "InfoWorks ICM Getting Started",
      description: "Comprehensive introduction to InfoWorks ICM",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Getting-Started",
      type: "tutorial"
    },
    {
      title: "InfoWorks ICM Community",
      description: "Connect with other modellers and share experiences",
      url: "https://boards.autodesk.com/icm",
      type: "course"
    },
    {
      title: "InfoWorks ICM Documentation",
      description: "Complete reference documentation",
      url: "https://help.autodesk.com/view/IWICMS/ENU/",
      type: "documentation"
    }
  ];
};

// Icon mapping for resource types
export const resourceTypeIcons = {
  webinar: "Video",
  tutorial: "BookOpen",
  documentation: "FileText",
  course: "GraduationCap",
  video: "Play"
} as const;
