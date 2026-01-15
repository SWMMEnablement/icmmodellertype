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
      title: "InfoWorks ICM On-Demand Learning",
      description: "Comprehensive course covering model building, version control, and troubleshooting",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course"
    },
    {
      title: "Water Talk: Modelling Basics",
      description: "50-minute walkthrough of importing data and setting up models from scratch",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar"
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Connect with other modellers to discuss project-specific challenges",
      url: "https://boards.autodesk.com/icm",
      type: "documentation"
    }
  ],
  CONTEXT_NAVIGATOR: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Curated tutorials for new users covering basic routines and navigation",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course"
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Video guide to navigating InfoWorks ICM efficiently",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video"
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Discuss scope management and practical approaches with peers",
      url: "https://boards.autodesk.com/icm",
      type: "documentation"
    }
  ],

  // Hybrid Types
  HYBRID_INTEGRATOR: [
    {
      title: "InfoWorks ICM & Civil 3D: Flood Modeller's Guide",
      description: "AU 2022 session on data exchange, scenarios, and cross-team collaboration (1hr 16min)",
      url: "https://www.autodesk.com/autodesk-university/class/InfoWorks-ICM-and-Civil3D-Flood-Modelers-guide-Project-Impacts-2022",
      type: "webinar"
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Complete course covering multiple modelling approaches and workflows",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course"
    },
    {
      title: "2D Flood Modelling in InfoWorks ICM",
      description: "Learn to integrate 1D and 2D modelling approaches",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-2D-Modelling",
      type: "tutorial"
    }
  ],
  HYBRID_ADAPTIVE: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Build a strong foundation across all modelling approaches",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course"
    },
    {
      title: "Water Talk: Modelling Basics",
      description: "Learn flexible approaches to model setup and configuration",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar"
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Connect with other adaptive modellers and share techniques",
      url: "https://boards.autodesk.com/icm",
      type: "documentation"
    }
  ],
  HYBRID_FLEXIBLE: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Curated tutorials covering basic routines and navigation",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course"
    },
    {
      title: "Running Simulations in InfoWorks ICM",
      description: "Bite-sized video tutorial on running and managing simulations",
      url: "https://www.youtube.com/watch?v=JiWfb0Ow8b4",
      type: "video"
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Learn from colleagues with different modelling styles",
      url: "https://boards.autodesk.com/icm",
      type: "documentation"
    }
  ],

  // Detail + Automated Types
  DASP: [
    {
      title: "Ruby Scripting for InfoWorks ICM",
      description: "Community guide to building custom GUIs and automating workflows with Ruby API",
      url: "https://gist.github.com/sancarn/00e44231eba3ac20123e10601f236175",
      type: "tutorial"
    },
    {
      title: "InfoWorks ICM Exchange API Documentation",
      description: "Official documentation for the Ruby scripting interface",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Ruby-API",
      type: "documentation"
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Comprehensive course including validation and quality assurance workflows",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course"
    }
  ],
  DASR: [
    {
      title: "Open Data Import Centre (ODIC) Guide",
      description: "Master efficient data import and export workflows",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-ODIC",
      type: "documentation"
    },
    {
      title: "Water Talk: Modelling Basics",
      description: "Practical walkthrough of model setup and calibration techniques",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar"
    },
    {
      title: "Running Simulations in InfoWorks ICM",
      description: "Quick video guide to running efficient batch simulations",
      url: "https://www.youtube.com/watch?v=JiWfb0Ow8b4",
      type: "video"
    }
  ],
  DAIP: [
    {
      title: "Ruby Scripting for InfoWorks ICM",
      description: "Advanced guide to building sophisticated automation scripts",
      url: "https://gist.github.com/sancarn/00e44231eba3ac20123e10601f236175",
      type: "tutorial"
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Complete course covering automated QA/QC workflows",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course"
    },
    {
      title: "InfoWorks ICM Exchange API",
      description: "Build pattern-based validation using the Ruby API",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Ruby-API",
      type: "documentation"
    }
  ],

  // Detail + Manual Types
  DMSP: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Step-by-step tutorials for hands-on network building",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course"
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Visual guide to navigating and inspecting model components",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video"
    },
    {
      title: "Data Quality & Validation",
      description: "Documentation on manual data quality checks and validation",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Validation",
      type: "documentation"
    }
  ],
  DMSR: [
    {
      title: "Water Talk: Modelling Basics",
      description: "Practical approaches to building models efficiently",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar"
    },
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Learn pragmatic modelling techniques quickly",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course"
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Share practical tips and rapid modelling techniques",
      url: "https://boards.autodesk.com/icm",
      type: "documentation"
    }
  ],

  // Big-Picture + Automated Types
  BASP: [
    {
      title: "InfoWorks ICM & Civil 3D: Flood Modeller's Guide",
      description: "Strategic modelling for infrastructure planning and flood analysis (AU 2022)",
      url: "https://www.autodesk.com/autodesk-university/class/InfoWorks-ICM-and-Civil3D-Flood-Modelers-guide-Project-Impacts-2022",
      type: "webinar"
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Learn scenario management and strategic model configuration",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course"
    },
    {
      title: "2D Flood Modelling Documentation",
      description: "Strategic approaches to 2D surface water modelling",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-2D-Modelling",
      type: "documentation"
    }
  ],
  BASR: [
    {
      title: "Water Talk: Modelling Basics",
      description: "Rapid model development techniques for feasibility studies",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar"
    },
    {
      title: "Running Simulations in InfoWorks ICM",
      description: "Quick scenario comparison and results extraction",
      url: "https://www.youtube.com/watch?v=JiWfb0Ow8b4",
      type: "video"
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Fast-track your strategic modelling skills",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course"
    }
  ],

  // Big-Picture + Manual Types
  BMSP: [
    {
      title: "InfoWorks ICM & Civil 3D: Flood Modeller's Guide",
      description: "Comprehensive documentation and collaboration approaches (AU 2022)",
      url: "https://www.autodesk.com/autodesk-university/class/InfoWorks-ICM-and-Civil3D-Flood-Modelers-guide-Project-Impacts-2022",
      type: "webinar"
    },
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Build a systematic foundation for strategic modelling",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course"
    },
    {
      title: "Model Documentation Best Practices",
      description: "Standards for documenting strategic model simplifications",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Documentation",
      type: "documentation"
    }
  ],
  BMSR: [
    {
      title: "Water Talk: Modelling Basics",
      description: "Rapid strategic modelling for tight deadlines",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar"
    },
    {
      title: "Running Simulations in InfoWorks ICM",
      description: "Fast scenario runs and quick result extraction",
      url: "https://www.youtube.com/watch?v=JiWfb0Ow8b4",
      type: "video"
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Connect with modellers for rapid response techniques",
      url: "https://boards.autodesk.com/icm",
      type: "documentation"
    }
  ],
  BMIP: [
    {
      title: "InfoWorks ICM & Civil 3D: Flood Modeller's Guide",
      description: "Leverage experience for strategic analysis (AU 2022 session)",
      url: "https://www.autodesk.com/autodesk-university/class/InfoWorks-ICM-and-Civil3D-Flood-Modelers-guide-Project-Impacts-2022",
      type: "webinar"
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Share expertise and mentor the next generation of modellers",
      url: "https://boards.autodesk.com/icm",
      type: "documentation"
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Refresh your skills and discover new features",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course"
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
      title: "InfoWorks ICM On-Demand Learning",
      description: "Comprehensive course covering all aspects of InfoWorks ICM",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course"
    },
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Curated tutorials for building your modelling foundation",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "tutorial"
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Connect with other modellers and share experiences",
      url: "https://boards.autodesk.com/icm",
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
