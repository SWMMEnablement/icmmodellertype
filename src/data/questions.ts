export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';

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
  // E/I Dimension (3 questions)
  {
    id: 1,
    text: "At a party, you typically...",
    dimension: 'EI',
    optionA: {
      text: "Talk to many people, including strangers",
      trait: 'E'
    },
    optionB: {
      text: "Talk deeply with a few people you know",
      trait: 'I'
    }
  },
  {
    id: 2,
    text: "After a long week, you recharge by...",
    dimension: 'EI',
    optionA: {
      text: "Going out with friends or to social events",
      trait: 'E'
    },
    optionB: {
      text: "Spending quiet time alone or with one close person",
      trait: 'I'
    }
  },
  {
    id: 3,
    text: "When solving problems, you prefer to...",
    dimension: 'EI',
    optionA: {
      text: "Think out loud and discuss with others",
      trait: 'E'
    },
    optionB: {
      text: "Reflect internally before sharing your thoughts",
      trait: 'I'
    }
  },
  // S/N Dimension (2 questions)
  {
    id: 4,
    text: "You are more drawn to...",
    dimension: 'SN',
    optionA: {
      text: "Facts, details, and what's real right now",
      trait: 'S'
    },
    optionB: {
      text: "Ideas, possibilities, and what could be",
      trait: 'N'
    }
  },
  {
    id: 5,
    text: "When learning something new, you prefer...",
    dimension: 'SN',
    optionA: {
      text: "Step-by-step instructions and practical examples",
      trait: 'S'
    },
    optionB: {
      text: "Understanding the big picture and underlying concepts",
      trait: 'N'
    }
  },
  // T/F Dimension (3 questions)
  {
    id: 6,
    text: "When making decisions, you prioritize...",
    dimension: 'TF',
    optionA: {
      text: "Logic, fairness, and objective analysis",
      trait: 'T'
    },
    optionB: {
      text: "Harmony, empathy, and how others will feel",
      trait: 'F'
    }
  },
  {
    id: 7,
    text: "In a disagreement, you tend to...",
    dimension: 'TF',
    optionA: {
      text: "Focus on what's correct and finding the truth",
      trait: 'T'
    },
    optionB: {
      text: "Focus on maintaining the relationship",
      trait: 'F'
    }
  },
  // J/P Dimension (2 questions)
  {
    id: 8,
    text: "Your workspace and schedule are usually...",
    dimension: 'JP',
    optionA: {
      text: "Organized with plans and to-do lists",
      trait: 'J'
    },
    optionB: {
      text: "Flexible and adapted as things come up",
      trait: 'P'
    }
  },
  {
    id: 9,
    text: "When starting a project, you...",
    dimension: 'JP',
    optionA: {
      text: "Plan thoroughly before beginning",
      trait: 'J'
    },
    optionB: {
      text: "Dive in and figure it out as you go",
      trait: 'P'
    }
  },
  {
    id: 10,
    text: "Deadlines make you feel...",
    dimension: 'JP',
    optionA: {
      text: "Motivated—you finish well ahead of time",
      trait: 'J'
    },
    optionB: {
      text: "Energized—you do your best work last minute",
      trait: 'P'
    }
  }
];
