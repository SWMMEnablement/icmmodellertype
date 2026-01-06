export interface PersonalityType {
  type: string;
  name: string;
  description: string;
  strengths: string[];
  growth: string[];
  famous: string[];
  color: string;
}

export const personalities: Record<string, PersonalityType> = {
  INTJ: {
    type: "INTJ",
    name: "The Architect",
    description: "Strategic, independent, and determined. INTJs are imaginative and decisive, with a unique ability to turn theories into solid plans of action.",
    strengths: ["Strategic thinking", "Independence", "Determination", "High standards"],
    growth: ["Be more open to others' emotions", "Accept imperfection", "Express appreciation more"],
    famous: ["Elon Musk", "Michelle Obama", "Christopher Nolan"],
    color: "from-slate-600 to-slate-800"
  },
  INTP: {
    type: "INTP",
    name: "The Logician",
    description: "Innovative, curious, and logical. INTPs are known for their brilliant ideas and unique perspectives on the world.",
    strengths: ["Analytical mind", "Objectivity", "Imagination", "Open-mindedness"],
    growth: ["Follow through on ideas", "Connect with emotions", "Be more decisive"],
    famous: ["Albert Einstein", "Bill Gates", "Tina Fey"],
    color: "from-indigo-500 to-indigo-700"
  },
  ENTJ: {
    type: "ENTJ",
    name: "The Commander",
    description: "Bold, imaginative, and strong-willed. ENTJs are natural leaders who find a way—or make one.",
    strengths: ["Leadership", "Efficiency", "Strategic vision", "Confidence"],
    growth: ["Practice patience", "Consider others' feelings", "Allow flexibility"],
    famous: ["Steve Jobs", "Margaret Thatcher", "Gordon Ramsay"],
    color: "from-red-600 to-red-800"
  },
  ENTP: {
    type: "ENTP",
    name: "The Debater",
    description: "Smart, curious, and outspoken. ENTPs thrive on challenging ideas and exploring possibilities.",
    strengths: ["Quick thinking", "Charisma", "Creativity", "Confidence"],
    growth: ["Focus on follow-through", "Be more sensitive", "Accept routine"],
    famous: ["Mark Twain", "Tom Hanks", "Celine Dion"],
    color: "from-orange-500 to-orange-700"
  },
  INFJ: {
    type: "INFJ",
    name: "The Advocate",
    description: "Quiet, mystical, and deeply insightful. INFJs have an inborn sense of idealism and purpose.",
    strengths: ["Empathy", "Creativity", "Insight", "Determination"],
    growth: ["Set boundaries", "Accept imperfection", "Take action sooner"],
    famous: ["Martin Luther King Jr.", "Nelson Mandela", "Lady Gaga"],
    color: "from-emerald-500 to-emerald-700"
  },
  INFP: {
    type: "INFP",
    name: "The Mediator",
    description: "Poetic, kind, and altruistic. INFPs are guided by their principles and seek to help others find their path.",
    strengths: ["Empathy", "Creativity", "Open-mindedness", "Passion"],
    growth: ["Be more practical", "Accept criticism", "Take decisive action"],
    famous: ["William Shakespeare", "Princess Diana", "Johnny Depp"],
    color: "from-teal-500 to-teal-700"
  },
  ENFJ: {
    type: "ENFJ",
    name: "The Protagonist",
    description: "Charismatic, inspiring, and natural leaders. ENFJs are passionate about helping others succeed.",
    strengths: ["Natural leadership", "Empathy", "Reliability", "Charisma"],
    growth: ["Set personal boundaries", "Accept conflict", "Focus on self-care"],
    famous: ["Barack Obama", "Oprah Winfrey", "Jennifer Lawrence"],
    color: "from-rose-500 to-rose-700"
  },
  ENFP: {
    type: "ENFP",
    name: "The Campaigner",
    description: "Enthusiastic, creative, and sociable. ENFPs are free spirits who embrace life with infectious energy.",
    strengths: ["Enthusiasm", "Creativity", "Empathy", "Flexibility"],
    growth: ["Follow through", "Focus on practical matters", "Handle details"],
    famous: ["Robin Williams", "Robert Downey Jr.", "Ellen DeGeneres"],
    color: "from-amber-500 to-amber-600"
  },
  ISTJ: {
    type: "ISTJ",
    name: "The Logistician",
    description: "Practical, fact-minded, and reliable. ISTJs are the backbone of any organization with their integrity and dedication.",
    strengths: ["Integrity", "Dedication", "Patience", "Practicality"],
    growth: ["Be more flexible", "Express emotions", "Embrace change"],
    famous: ["George Washington", "Queen Elizabeth II", "Natalie Portman"],
    color: "from-blue-600 to-blue-800"
  },
  ISFJ: {
    type: "ISFJ",
    name: "The Defender",
    description: "Dedicated, warm, and protective. ISFJs are committed to helping others and creating harmony.",
    strengths: ["Supportiveness", "Reliability", "Patience", "Observation"],
    growth: ["Say no when needed", "Accept change", "Voice your needs"],
    famous: ["Beyoncé", "Kate Middleton", "Dr. Dre"],
    color: "from-cyan-500 to-cyan-700"
  },
  ESTJ: {
    type: "ESTJ",
    name: "The Executive",
    description: "Organized, loyal, and hard-working. ESTJs are dedicated to maintaining order and structure.",
    strengths: ["Dedication", "Strong will", "Direct honesty", "Loyalty"],
    growth: ["Be more flexible", "Consider emotions", "Embrace new ideas"],
    famous: ["Judge Judy", "Sonia Sotomayor", "Frank Sinatra"],
    color: "from-sky-600 to-sky-800"
  },
  ESFJ: {
    type: "ESFJ",
    name: "The Consul",
    description: "Caring, social, and tradition-minded. ESFJs are always eager to help and bring people together.",
    strengths: ["Loyalty", "Sensitivity", "Warmth", "Practicality"],
    growth: ["Accept criticism", "Be less controlling", "Focus on yourself"],
    famous: ["Taylor Swift", "Jennifer Garner", "Ed Sheeran"],
    color: "from-pink-500 to-pink-700"
  },
  ISTP: {
    type: "ISTP",
    name: "The Virtuoso",
    description: "Bold, practical, and experimental. ISTPs love exploring with their hands and eyes, mastering tools and techniques.",
    strengths: ["Optimism", "Creativity", "Practicality", "Spontaneity"],
    growth: ["Express emotions", "Consider long-term", "Be more patient"],
    famous: ["Clint Eastwood", "Tom Cruise", "Kristen Stewart"],
    color: "from-zinc-600 to-zinc-800"
  },
  ISFP: {
    type: "ISFP",
    name: "The Adventurer",
    description: "Flexible, charming, and artistic. ISFPs are true artists, always pushing boundaries to explore life.",
    strengths: ["Charm", "Artistry", "Passion", "Curiosity"],
    growth: ["Plan ahead", "Handle criticism", "Be more assertive"],
    famous: ["Michael Jackson", "Marilyn Monroe", "David Bowie"],
    color: "from-violet-500 to-violet-700"
  },
  ESTP: {
    type: "ESTP",
    name: "The Entrepreneur",
    description: "Smart, energetic, and perceptive. ESTPs enjoy living on the edge and taking risks.",
    strengths: ["Bold", "Rational", "Original", "Perceptive"],
    growth: ["Think before acting", "Consider others' feelings", "Plan for future"],
    famous: ["Ernest Hemingway", "Madonna", "Eddie Murphy"],
    color: "from-yellow-500 to-yellow-600"
  },
  ESFP: {
    type: "ESFP",
    name: "The Entertainer",
    description: "Spontaneous, energetic, and enthusiastic. ESFPs love life and bring fun wherever they go.",
    strengths: ["Boldness", "Originality", "Aesthetics", "Showmanship"],
    growth: ["Think long-term", "Handle criticism", "Focus on priorities"],
    famous: ["Marilyn Monroe", "Jamie Foxx", "Adele"],
    color: "from-fuchsia-500 to-fuchsia-700"
  }
};
