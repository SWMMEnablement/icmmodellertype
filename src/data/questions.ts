export type Dimension = 'MA' | 'WS' | 'PS' | 'DQ';

// MA = Modeling Approach (Detail vs BigPicture)
// WS = Workflow Style (Automated vs Manual)
// PS = Problem Solving (Methodical vs Intuitive)
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
  // MA - Modeling Approach (3 questions)
  {
    id: 1,
    text: "When starting a new network model, you first...",
    dimension: 'MA',
    optionA: {
      text: "Focus on getting every pipe, manhole, and connection exactly right from the start",
      trait: 'D' // Detail
    },
    optionB: {
      text: "Build a simplified skeleton model to understand system behavior first",
      trait: 'B' // BigPicture
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
  // WS - Workflow Style (3 questions)
  {
    id: 4,
    text: "For repetitive modeling tasks, you prefer to...",
    dimension: 'WS',
    optionA: {
      text: "Write Ruby scripts or use Open Data Import/Export Centre",
      trait: 'A' // Automated
    },
    optionB: {
      text: "Do it manually—you know exactly what's happening at each step",
      trait: 'M' // Manual
    }
  },
  {
    id: 5,
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
  // PS - Problem Solving (2 questions)
  {
    id: 6,
    text: "When your model won't converge, you...",
    dimension: 'PS',
    optionA: {
      text: "Systematically isolate sections and check parameters methodically",
      trait: 'S' // Systematic
    },
    optionB: {
      text: "Trust your instincts—you often know where the problem is",
      trait: 'I' // Intuitive
    }
  },
  {
    id: 7,
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
  // DQ - Data Quality Approach (3 questions)
  {
    id: 8,
    text: "When you receive survey data with gaps, you...",
    dimension: 'DQ',
    optionA: {
      text: "Request resurvey or use GIS interpolation methods",
      trait: 'P' // Perfectionist
    },
    optionB: {
      text: "Make reasonable assumptions and note them—the model needs to progress",
      trait: 'R' // Pragmatic
    }
  },
  {
    id: 9,
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
    id: 10,
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
  }
];
