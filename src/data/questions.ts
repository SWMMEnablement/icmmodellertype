export type Dimension = 'MA' | 'WS' | 'PS' | 'DQ';

// MA = Modeling Approach (Detail vs BigPicture)
// WS = Workflow Style (Automated vs Manual)
// PS = Problem Solving (Systematic vs Intuitive)
// DQ = Data Quality (Perfectionist vs Pragmatic)

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
    }
  },
  {
    id: 20,
    text: "When inheriting a model from another modeler, you...",
    dimension: 'DQ',
    optionA: {
      text: "Rebuild or fully audit it to your standards before use",
      trait: 'P'
    },
    optionB: {
      text: "Spot-check critical areas and use it if it seems reasonable",
      trait: 'R'
    }
  }
];
