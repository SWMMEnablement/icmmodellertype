export interface ScenarioOption {
  label: string;
  description: string;
  /** Which dimension trait(s) this aligns with */
  traits: string[];
  /** Human-readable type alignment label */
  alignment: string;
}

export interface Scenario {
  id: string;
  title: string;
  situation: string;
  dimension: "MA" | "WS" | "PS" | "DQ";
  dimensionLabel: string;
  options: ScenarioOption[];
}

export const scenarios: Scenario[] = [
  {
    id: "convergence-friday",
    title: "The Friday Afternoon Crisis",
    situation:
      "A client calls at 4pm Friday saying the model won't converge and the planning submission is Monday morning. The 2D mesh has 15,000 triangles and the timestep is at 0.5 seconds. You've never seen this model before.",
    dimension: "PS",
    dimensionLabel: "Problem Solving",
    options: [
      {
        label: "Systematic Diagnosis",
        description:
          "Open the convergence log, isolate the problem nodes, check Courant numbers zone by zone, and work through a documented troubleshooting checklist.",
        traits: ["S"],
        alignment: "Systematic",
      },
      {
        label: "Experience-Led Triage",
        description:
          "Based on similar models, jump straight to the likely culprits — check the 2D/1D connections and any steep gradient areas. Your gut says it's a mesh issue near a culvert.",
        traits: ["I"],
        alignment: "Intuitive",
      },
      {
        label: "Hybrid Approach",
        description:
          "Start with your best hypothesis (probably a mesh issue), then systematically validate by isolating sections. Use intuition to prioritise, then rigour to confirm.",
        traits: ["Y"],
        alignment: "Integrated",
      },
      {
        label: "It Depends",
        description:
          "First assess: how critical is perfect convergence for this submission? If the instabilities are in non-critical areas, a pragmatic timestep adjustment might be enough for Monday.",
        traits: ["PS_CTX"],
        alignment: "Context-Dependent",
      },
    ],
  },
  {
    id: "inherited-model",
    title: "The Inherited Model",
    situation:
      "You inherit a model from another consultancy. The audit trail is incomplete — some manholes have suspiciously round invert levels, the subcatchment areas don't match the GIS, and the calibration report references data you can't find. The client wants you to extend the model for a new development.",
    dimension: "DQ",
    dimensionLabel: "Data Quality",
    options: [
      {
        label: "Full Rebuild",
        description:
          "Request original survey data and rebuild from scratch. Every invert, every pipe diameter verified against the source. You won't put your name on someone else's assumptions.",
        traits: ["P"],
        alignment: "Perfectionist",
      },
      {
        label: "Targeted Validation",
        description:
          "Spot-check the critical flow paths for the new development area. If the existing model produces reasonable results in the areas that matter, extend it and move on.",
        traits: ["R"],
        alignment: "Pragmatic",
      },
      {
        label: "Risk-Based Audit",
        description:
          "Audit high-risk areas thoroughly (near the development, key CSO/overflow points) while accepting the existing data in low-sensitivity zones with spot-checks.",
        traits: ["Z"],
        alignment: "Risk-Based Quality",
      },
      {
        label: "Client-Led Decision",
        description:
          "Present the data quality issues to the client with cost/risk implications of each approach. Let them decide the appropriate level of validation for their budget.",
        traits: ["DQ_CTX"],
        alignment: "Context-Dependent",
      },
    ],
  },
  {
    id: "mesh-instability",
    title: "The Unstable Mesh",
    situation:
      "The 2D mesh is producing instabilities near a culvert where the terrain drops 3 metres over 20 metres. The long section looks reasonable, but the 2D results show velocities of 15 m/s and oscillating water levels. The rest of the model runs cleanly.",
    dimension: "MA",
    dimensionLabel: "Modeling Approach",
    options: [
      {
        label: "Refine the Detail",
        description:
          "Create a locally refined mesh around the culvert with 1-2m triangles, add breaklines along the channel banks, and ensure the terrain accurately represents the drop. Get the physics right.",
        traits: ["D"],
        alignment: "Detail-Focused",
      },
      {
        label: "Simplify Strategically",
        description:
          "Replace the problematic 2D zone with a 1D conduit representation. The culvert behaviour is essentially 1D anyway — a detailed 2D mesh here adds complexity without improving accuracy.",
        traits: ["B"],
        alignment: "Big-Picture",
      },
      {
        label: "Adaptive Resolution",
        description:
          "Refine the mesh locally but also check if the instability actually affects results downstream. Apply detail where the physics demands it, simplify where it doesn't matter.",
        traits: ["H"],
        alignment: "Context-Adaptive",
      },
      {
        label: "Depends on Purpose",
        description:
          "What's this model for? If it's a strategic assessment, a 1D simplification is fine. If it's a detailed design for works near the culvert, you need the refined 2D mesh.",
        traits: ["MA_CTX"],
        alignment: "Context-Dependent",
      },
    ],
  },
  {
    id: "batch-simulations",
    title: "The 200-Run Sensitivity Test",
    situation:
      "Your project requires running 200 simulations with different rainfall profiles, roughness values, and growth scenarios. Each run takes 45 minutes. The results need to be compiled into a matrix showing flood risk under each combination. You have two weeks.",
    dimension: "WS",
    dimensionLabel: "Workflow Style",
    options: [
      {
        label: "Script Everything",
        description:
          "Write a Ruby/Python script to generate all run configurations, submit them as batch runs, and automatically extract and compile results into your matrix. Total setup: one day. Total runtime: managed overnight.",
        traits: ["A"],
        alignment: "Automated",
      },
      {
        label: "Manual Control",
        description:
          "Set up each run manually, adjusting parameters by hand. It takes longer, but you can review each result as it comes in and catch issues immediately. You know exactly what every run contains.",
        traits: ["M"],
        alignment: "Manual",
      },
      {
        label: "Automated with Checkpoints",
        description:
          "Script the batch generation and result extraction, but manually review a sample of runs at key parameter boundaries. Automate the bulk, verify the edges.",
        traits: ["X"],
        alignment: "Hybrid Workflow",
      },
      {
        label: "Team & Tools Dependent",
        description:
          "If the team knows scripting, automate it. If not, split the runs across team members manually. The best approach depends on who's available and what tools they're comfortable with.",
        traits: ["WS_CTX"],
        alignment: "Context-Dependent",
      },
    ],
  },
  {
    id: "calibration-disagreement",
    title: "The Calibration Standoff",
    situation:
      "Your calibration is hitting NSE of 0.82 on the main trunk sewer, but the branch sewers are showing poor correlation. You've spent a week adjusting roughness values and runoff parameters. Your project manager says the main trunk calibration is 'good enough' and wants you to move to design scenarios. You're not convinced.",
    dimension: "DQ",
    dimensionLabel: "Data Quality",
    options: [
      {
        label: "Push for Better",
        description:
          "Explain that poor branch calibration undermines confidence in the whole model. Request more time — the branch flows feed the trunk, so if they're wrong, the trunk calibration might be right for the wrong reasons.",
        traits: ["P"],
        alignment: "Perfectionist",
      },
      {
        label: "Accept and Document",
        description:
          "The trunk is what matters for the design scenarios. Document the branch limitations, note the uncertainty in the report, and move on. Perfect calibration isn't possible with imperfect data.",
        traits: ["R"],
        alignment: "Pragmatic",
      },
      {
        label: "Risk-Assess the Impact",
        description:
          "Check whether the poorly-calibrated branches affect the design scenario locations. If the development is on the trunk, accept the calibration. If it's on a branch, push back on those specific branches only.",
        traits: ["Z"],
        alignment: "Risk-Based Quality",
      },
      {
        label: "Follow the Brief",
        description:
          "Review the project scope and client requirements. Some projects require full network calibration for regulatory submission; others only need trunk calibration for planning. Match effort to requirements.",
        traits: ["DQ_CTX"],
        alignment: "Context-Dependent",
      },
    ],
  },
  {
    id: "new-data-format",
    title: "The Data Migration Challenge",
    situation:
      "Your water company client has switched asset management systems. The new export format is completely different — field names have changed, coordinate systems are mixed (BNG and WGS84), and pipe material codes use a new classification. You need to import 12,000 pipes, 8,000 manholes, and 3,000 subcatchments into ICM.",
    dimension: "WS",
    dimensionLabel: "Workflow Style",
    options: [
      {
        label: "Build a Pipeline",
        description:
          "Write a comprehensive data transformation script — coordinate conversion, field mapping, material code translation, validation checks — that can be reused whenever the client sends updated data.",
        traits: ["A"],
        alignment: "Automated",
      },
      {
        label: "Manual in Stages",
        description:
          "Use the Open Data Import Centre with manual field mapping. Work through pipes, then manholes, then subcatchments. Slower, but you can visually verify each import step and catch issues in real time.",
        traits: ["M"],
        alignment: "Manual",
      },
      {
        label: "Script Core, Manual Edge Cases",
        description:
          "Automate the straightforward mappings (coordinates, standard fields) but manually handle the edge cases — mixed coordinate systems, ambiguous material codes, missing data — where human judgment is needed.",
        traits: ["X"],
        alignment: "Hybrid Workflow",
      },
      {
        label: "Assess First",
        description:
          "Before deciding an approach, assess data quality and consistency. If the export is clean, a script makes sense. If it's messy with lots of exceptions, manual handling may actually be faster.",
        traits: ["WS_CTX"],
        alignment: "Context-Dependent",
      },
    ],
  },
  {
    id: "client-presentation",
    title: "The Board Presentation",
    situation:
      "You're presenting flood risk results to a water company board. Your model shows three properties at risk in a 1-in-30 year storm, but the uncertainty analysis suggests this could be anywhere from 0 to 8 depending on rainfall profile and antecedent conditions. The board wants a single definitive number.",
    dimension: "PS",
    dimensionLabel: "Problem Solving",
    options: [
      {
        label: "Present the Full Picture",
        description:
          "Show the statistical distribution: median, confidence intervals, sensitivity to key parameters. Use charts showing the range. The board needs to understand that a single number is misleading.",
        traits: ["S"],
        alignment: "Systematic",
      },
      {
        label: "Lead with the Story",
        description:
          "Give them the headline number (3 properties) but frame it with context: 'In the worst credible scenario, this rises to 8.' Use your experience of what boards actually need to make decisions.",
        traits: ["I"],
        alignment: "Intuitive",
      },
      {
        label: "Structured Narrative",
        description:
          "Present the systematic analysis but lead with the key insight: '3 properties at most-likely risk, with 8 in extreme conditions.' Back up the narrative with the data, combining rigour with clarity.",
        traits: ["Y"],
        alignment: "Integrated",
      },
      {
        label: "Know Your Audience",
        description:
          "Tailor to the audience: technical committee gets the full uncertainty analysis; board gets the decision-relevant summary. Prepare both versions and choose based on who's in the room.",
        traits: ["PS_CTX"],
        alignment: "Context-Dependent",
      },
    ],
  },
];

/** Map a trait code to a user-friendly type description */
export const traitToTypeMap: Record<string, { dimension: string; label: string; types: string[] }> = {
  D: { dimension: "Modeling Approach", label: "Detail-Focused", types: ["DASP", "Dasp", "DMSP", "DISP"] },
  B: { dimension: "Modeling Approach", label: "Big-Picture", types: ["BASP", "BAIR", "BMSP", "BISP"] },
  H: { dimension: "Modeling Approach", label: "Context-Adaptive", types: ["HYBRID"] },
  A: { dimension: "Workflow Style", label: "Automated", types: ["DASP", "BASP", "DAIR", "BAIR"] },
  M: { dimension: "Workflow Style", label: "Manual", types: ["DMSP", "BMSP", "DMIR", "BMIR"] },
  X: { dimension: "Workflow Style", label: "Hybrid Workflow", types: ["HYBRID"] },
  S: { dimension: "Problem Solving", label: "Systematic", types: ["DASP", "BASP", "DMSP", "BMSP"] },
  I: { dimension: "Problem Solving", label: "Intuitive", types: ["DAIR", "BAIR", "DMIR", "BMIR"] },
  Y: { dimension: "Problem Solving", label: "Integrated", types: ["HYBRID"] },
  P: { dimension: "Data Quality", label: "Perfectionist", types: ["DASP", "BASP", "DISP", "BISP"] },
  R: { dimension: "Data Quality", label: "Pragmatic", types: ["DAIR", "BAIR", "DMIR", "BMIR"] },
  Z: { dimension: "Data Quality", label: "Risk-Based Quality", types: ["HYBRID"] },
  MA_CTX: { dimension: "Modeling Approach", label: "Context-Dependent", types: ["CONTEXT"] },
  WS_CTX: { dimension: "Workflow Style", label: "Context-Dependent", types: ["CONTEXT"] },
  PS_CTX: { dimension: "Problem Solving", label: "Context-Dependent", types: ["CONTEXT"] },
  DQ_CTX: { dimension: "Data Quality", label: "Context-Dependent", types: ["CONTEXT"] },
};
