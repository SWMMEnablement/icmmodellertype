export type Dimension = 'MA' | 'WS' | 'PS' | 'DQ';

// MA = Modeling Approach (Detail vs BigPicture vs Hybrid vs Context-Dependent)
// WS = Workflow Style (Automated vs Manual vs Hybrid vs Context-Dependent)
// PS = Problem Solving (Systematic vs Intuitive vs Hybrid vs Context-Dependent)
// DQ = Data Quality (Perfectionist vs Pragmatic vs Hybrid vs Context-Dependent)

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  optionA: {
    text: string;
    trait: string;
  };
  optionB: {
    text: string;
    trait: string;
  };
  optionC: {
    text: string;
    trait: string;
  };
  optionD: {
    text: string;
    trait: string;
  };
}

export const questions: Question[] = [
  // MA - Modeling Approach (5 questions)
  {
    id: 1,
    text: "When starting a new network model, you first...",
    dimension: 'MA',
    optionA: {
      text: "Focus on getting every pipe, manhole, and connection exactly right from the start",
      trait: 'D'
    },
    optionB: {
      text: "Build a simplified skeleton model to understand system behavior first",
      trait: 'B'
    },
    optionC: {
      text: "Start with key assets at full detail, then add strategic simplifications elsewhere",
      trait: 'H'
    },
    optionD: {
      text: "It depends on the project scope, client requirements, and available data",
      trait: 'MA_CTX'
    }
  },
  {
    id: 2,
    text: "Your typical model includes...",
    dimension: 'MA',
    optionA: {
      text: "Every lateral, gully, and minor connection in the network",
      trait: 'D'
    },
    optionB: {
      text: "Strategic simplifications—aggregate subcatchments, key trunk sewers only",
      trait: 'B'
    },
    optionC: {
      text: "Full detail in critical areas, aggregated elsewhere based on sensitivity analysis",
      trait: 'H'
    },
    optionD: {
      text: "Whatever the project specification and budget allow for",
      trait: 'MA_CTX'
    }
  },
  {
    id: 3,
    text: "When reviewing someone else's model, you...",
    dimension: 'MA',
    optionA: {
      text: "Check individual node and link properties systematically",
      trait: 'D'
    },
    optionB: {
      text: "Run scenarios and analyze overall system response patterns",
      trait: 'B'
    },
    optionC: {
      text: "Spot-check critical assets in detail, then verify overall system behavior",
      trait: 'H'
    },
    optionD: {
      text: "Depends on the purpose of review and time available",
      trait: 'MA_CTX'
    }
  },
  {
    id: 4,
    text: "Your approach to subcatchment delineation is...",
    dimension: 'MA',
    optionA: {
      text: "One subcatchment per manhole with precise contributing areas",
      trait: 'D'
    },
    optionB: {
      text: "Larger aggregated catchments that capture key runoff behavior",
      trait: 'B'
    },
    optionC: {
      text: "Detailed delineation in sensitive areas, aggregated in stable zones",
      trait: 'H'
    },
    optionD: {
      text: "Determined by catchment size, data quality, and model objectives",
      trait: 'MA_CTX'
    }
  },
  {
    id: 5,
    text: "When modeling storage, you prefer...",
    dimension: 'MA',
    optionA: {
      text: "Detailed stage-storage curves from survey data for each asset",
      trait: 'D'
    },
    optionB: {
      text: "Simplified storage representations that match overall system response",
      trait: 'B'
    },
    optionC: {
      text: "Full detail for critical storage assets, simplified for minor ones",
      trait: 'H'
    },
    optionD: {
      text: "Based on available survey data and the storage's significance to results",
      trait: 'MA_CTX'
    }
  },

  // WS - Workflow Style (5 questions)
  {
    id: 6,
    text: "For repetitive modeling tasks, you prefer to...",
    dimension: 'WS',
    optionA: {
      text: "Write Ruby scripts or use Open Data Import/Export Centre",
      trait: 'A'
    },
    optionB: {
      text: "Do it manually—you know exactly what's happening at each step",
      trait: 'M'
    },
    optionC: {
      text: "Use automation for bulk tasks but manually review outputs before applying",
      trait: 'X'
    },
    optionD: {
      text: "Depends on task complexity, frequency, and team capabilities",
      trait: 'WS_CTX'
    }
  },
  {
    id: 7,
    text: "When setting up multiple scenarios, you...",
    dimension: 'WS',
    optionA: {
      text: "Create templates and batch processes to generate them efficiently",
      trait: 'A'
    },
    optionB: {
      text: "Build each scenario individually to maintain full control",
      trait: 'M'
    },
    optionC: {
      text: "Template the common elements but manually configure unique aspects",
      trait: 'X'
    },
    optionD: {
      text: "Based on the number of scenarios and how similar they are",
      trait: 'WS_CTX'
    }
  },
  {
    id: 8,
    text: "Your approach to data import is...",
    dimension: 'WS',
    optionA: {
      text: "Scripted pipelines with automated field mapping and validation",
      trait: 'A'
    },
    optionB: {
      text: "Manual import with hands-on review of each data field",
      trait: 'M'
    },
    optionC: {
      text: "Automated import with manual spot-checks and exception handling",
      trait: 'X'
    },
    optionD: {
      text: "Depends on data source quality and format consistency",
      trait: 'WS_CTX'
    }
  },
  {
    id: 9,
    text: "When updating models for new survey data, you...",
    dimension: 'WS',
    optionA: {
      text: "Run automated comparison scripts to identify and merge changes",
      trait: 'A'
    },
    optionB: {
      text: "Manually compare and update each affected asset",
      trait: 'M'
    },
    optionC: {
      text: "Use scripts to flag changes, then manually verify critical updates",
      trait: 'X'
    },
    optionD: {
      text: "Based on the extent of changes and their impact on existing work",
      trait: 'WS_CTX'
    }
  },
  {
    id: 10,
    text: "Your results extraction process is...",
    dimension: 'WS',
    optionA: {
      text: "Automated reporting with templated outputs and batch exports",
      trait: 'A'
    },
    optionB: {
      text: "Manual extraction with custom analysis for each deliverable",
      trait: 'M'
    },
    optionC: {
      text: "Templated extraction with manual customization for client-specific needs",
      trait: 'X'
    },
    optionD: {
      text: "Tailored to client expectations and reporting requirements",
      trait: 'WS_CTX'
    }
  },

  // PS - Problem Solving (5 questions)
  {
    id: 11,
    text: "When your model won't converge, you...",
    dimension: 'PS',
    optionA: {
      text: "Systematically isolate sections and check parameters methodically",
      trait: 'S'
    },
    optionB: {
      text: "Trust your instincts—you often know where the problem is",
      trait: 'I'
    },
    optionC: {
      text: "Start with your best guess, then systematically verify or rule it out",
      trait: 'Y'
    },
    optionD: {
      text: "Depends on the type of instability and my familiarity with the model",
      trait: 'PS_CTX'
    }
  },
  {
    id: 12,
    text: "During calibration, you rely more on...",
    dimension: 'PS',
    optionA: {
      text: "Statistical metrics (NSE, RMSE, peak error percentages)",
      trait: 'S'
    },
    optionB: {
      text: "Visual comparison and your experience with similar catchments",
      trait: 'I'
    },
    optionC: {
      text: "Statistical targets validated by visual checks and engineering judgment",
      trait: 'Y'
    },
    optionD: {
      text: "Depends on data quality and what the client needs to see",
      trait: 'PS_CTX'
    }
  },
  {
    id: 13,
    text: "When choosing rainfall parameters, you...",
    dimension: 'PS',
    optionA: {
      text: "Follow established guidelines and documented methodologies",
      trait: 'S'
    },
    optionB: {
      text: "Adjust based on what you know works for this type of catchment",
      trait: 'I'
    },
    optionC: {
      text: "Use guidelines as a starting point, adjusted by local experience",
      trait: 'Y'
    },
    optionD: {
      text: "Based on regulatory requirements and available rainfall data",
      trait: 'PS_CTX'
    }
  },
  {
    id: 14,
    text: "Your approach to debugging flooding issues is...",
    dimension: 'PS',
    optionA: {
      text: "Check upstream to downstream systematically with calculated checks",
      trait: 'S'
    },
    optionB: {
      text: "Jump to the likely culprit based on experience and model behavior",
      trait: 'I'
    },
    optionC: {
      text: "Check your hunches first, then systematically verify the full flow path",
      trait: 'Y'
    },
    optionD: {
      text: "Depends on how well I know this network and the nature of the flooding",
      trait: 'PS_CTX'
    }
  },
  {
    id: 15,
    text: "When explaining model results to clients, you...",
    dimension: 'PS',
    optionA: {
      text: "Present statistical evidence and quantified uncertainties",
      trait: 'S'
    },
    optionB: {
      text: "Tell the story of what's happening and why it makes sense",
      trait: 'I'
    },
    optionC: {
      text: "Lead with the narrative, backed by key statistics and evidence",
      trait: 'Y'
    },
    optionD: {
      text: "Tailored to the client's technical background and preferences",
      trait: 'PS_CTX'
    }
  },

  // DQ - Data Quality Approach (5 questions)
  {
    id: 16,
    text: "When you receive survey data with gaps, you...",
    dimension: 'DQ',
    optionA: {
      text: "Request resurvey or use GIS interpolation methods",
      trait: 'P'
    },
    optionB: {
      text: "Make reasonable assumptions and note them—the model needs to progress",
      trait: 'R'
    },
    optionC: {
      text: "Fill critical gaps rigorously, use justified assumptions for minor ones",
      trait: 'Z'
    },
    optionD: {
      text: "Depends on gap location, budget for resurvey, and project timeline",
      trait: 'DQ_CTX'
    }
  },
  {
    id: 17,
    text: "Your validation flags in the model are typically...",
    dimension: 'DQ',
    optionA: {
      text: "All resolved—zero warnings or errors before delivery",
      trait: 'P'
    },
    optionB: {
      text: "Reviewed and justified—some flags are acceptable in context",
      trait: 'R'
    },
    optionC: {
      text: "Critical flags resolved, minor flags documented with justification",
      trait: 'Z'
    },
    optionD: {
      text: "Based on client expectations and model purpose",
      trait: 'DQ_CTX'
    }
  },
  {
    id: 18,
    text: "When project deadlines are tight, you...",
    dimension: 'DQ',
    optionA: {
      text: "Push back to ensure data quality isn't compromised",
      trait: 'P'
    },
    optionB: {
      text: "Deliver what's achievable with clear caveats and limitations",
      trait: 'R'
    },
    optionC: {
      text: "Protect quality on critical elements while accepting pragmatic shortcuts elsewhere",
      trait: 'Z'
    },
    optionD: {
      text: "Depends on the project's risk profile and what's truly essential",
      trait: 'DQ_CTX'
    }
  },
  {
    id: 19,
    text: "Your documentation of model assumptions is...",
    dimension: 'DQ',
    optionA: {
      text: "Comprehensive with full justification for every decision",
      trait: 'P'
    },
    optionB: {
      text: "Focused on key assumptions that actually affect results",
      trait: 'R'
    },
    optionC: {
      text: "Thorough for significant assumptions, summarized for minor ones",
      trait: 'Z'
    },
    optionD: {
      text: "Matched to client requirements and project handover needs",
      trait: 'DQ_CTX'
    }
  },
  {
    id: 20,
    text: "When inheriting a model from another modeller, you...",
    dimension: 'DQ',
    optionA: {
      text: "Rebuild or fully audit it to your standards before use",
      trait: 'P'
    },
    optionB: {
      text: "Spot-check critical areas and use it if it seems reasonable",
      trait: 'R'
    },
    optionC: {
      text: "Audit high-risk areas thoroughly, accept lower-risk areas with spot-checks",
      trait: 'Z'
    },
    optionD: {
      text: "Depends on the original modeller's reputation and available time",
      trait: 'DQ_CTX'
    }
  }
];
