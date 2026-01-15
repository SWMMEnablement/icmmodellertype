export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export interface LearningResource {
  title: string;
  description: string;
  url: string;
  type: "webinar" | "tutorial" | "documentation" | "course" | "video";
  level: ExperienceLevel;
  order: number; // Recommended reading order within the level
}

// Learning resources mapped by personality type
// These connect each modeller type to relevant InfoWorks ICM learning materials
export const learningResources: Record<string, LearningResource[]> = {
  // Context-Driven Types
  CONTEXT_MASTER: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Curated tutorials for new users covering basic routines and navigation",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course",
      level: "beginner",
      order: 1
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Video guide to navigating InfoWorks ICM efficiently",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video",
      level: "beginner",
      order: 2
    },
    {
      title: "Water Talk: Modelling Basics",
      description: "50-minute walkthrough of importing data and setting up models from scratch",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar",
      level: "intermediate",
      order: 1
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Comprehensive course covering model building, version control, and troubleshooting",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course",
      level: "intermediate",
      order: 2
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Connect with other modellers to discuss project-specific challenges",
      url: "https://boards.autodesk.com/icm",
      type: "documentation",
      level: "advanced",
      order: 1
    },
    {
      title: "InfoWorks ICM & Civil 3D: Flood Modeller's Guide",
      description: "AU 2022 session on data exchange, scenarios, and cross-team collaboration",
      url: "https://www.autodesk.com/autodesk-university/class/InfoWorks-ICM-and-Civil3D-Flood-Modelers-guide-Project-Impacts-2022",
      type: "webinar",
      level: "advanced",
      order: 2
    }
  ],
  CONTEXT_NAVIGATOR: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Curated tutorials for new users covering basic routines and navigation",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course",
      level: "beginner",
      order: 1
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Video guide to navigating InfoWorks ICM efficiently",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video",
      level: "beginner",
      order: 2
    },
    {
      title: "Water Talk: Modelling Basics",
      description: "Learn flexible approaches to model setup and configuration",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar",
      level: "intermediate",
      order: 1
    },
    {
      title: "Running Simulations in InfoWorks ICM",
      description: "Bite-sized video tutorial on running and managing simulations",
      url: "https://www.youtube.com/watch?v=JiWfb0Ow8b4",
      type: "video",
      level: "intermediate",
      order: 2
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Discuss scope management and practical approaches with peers",
      url: "https://boards.autodesk.com/icm",
      type: "documentation",
      level: "advanced",
      order: 1
    },
    {
      title: "2D Flood Modelling in InfoWorks ICM",
      description: "Advanced techniques for integrating 1D and 2D modelling approaches",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-2D-Modelling",
      type: "tutorial",
      level: "advanced",
      order: 2
    }
  ],

  // Hybrid Types
  HYBRID_INTEGRATOR: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Build a strong foundation across all modelling approaches",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course",
      level: "beginner",
      order: 1
    },
    {
      title: "Water Talk: Modelling Basics",
      description: "Learn flexible approaches to model setup and configuration",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar",
      level: "beginner",
      order: 2
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Complete course covering multiple modelling approaches and workflows",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course",
      level: "intermediate",
      order: 1
    },
    {
      title: "2D Flood Modelling in InfoWorks ICM",
      description: "Learn to integrate 1D and 2D modelling approaches",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-2D-Modelling",
      type: "tutorial",
      level: "intermediate",
      order: 2
    },
    {
      title: "InfoWorks ICM & Civil 3D: Flood Modeller's Guide",
      description: "AU 2022 session on data exchange, scenarios, and cross-team collaboration (1hr 16min)",
      url: "https://www.autodesk.com/autodesk-university/class/InfoWorks-ICM-and-Civil3D-Flood-Modelers-guide-Project-Impacts-2022",
      type: "webinar",
      level: "advanced",
      order: 1
    },
    {
      title: "Ruby Scripting for InfoWorks ICM",
      description: "Advanced automation and integration capabilities",
      url: "https://gist.github.com/sancarn/00e44231eba3ac20123e10601f236175",
      type: "tutorial",
      level: "advanced",
      order: 2
    }
  ],
  HYBRID_ADAPTIVE: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Build a strong foundation across all modelling approaches",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course",
      level: "beginner",
      order: 1
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Video guide to navigating InfoWorks ICM efficiently",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video",
      level: "beginner",
      order: 2
    },
    {
      title: "Water Talk: Modelling Basics",
      description: "Learn flexible approaches to model setup and configuration",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar",
      level: "intermediate",
      order: 1
    },
    {
      title: "Running Simulations in InfoWorks ICM",
      description: "Learn efficient simulation workflows",
      url: "https://www.youtube.com/watch?v=JiWfb0Ow8b4",
      type: "video",
      level: "intermediate",
      order: 2
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Connect with other adaptive modellers and share techniques",
      url: "https://boards.autodesk.com/icm",
      type: "documentation",
      level: "advanced",
      order: 1
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Comprehensive course for mastering advanced workflows",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course",
      level: "advanced",
      order: 2
    }
  ],
  HYBRID_FLEXIBLE: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Curated tutorials covering basic routines and navigation",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course",
      level: "beginner",
      order: 1
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Video guide to navigating InfoWorks ICM efficiently",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video",
      level: "beginner",
      order: 2
    },
    {
      title: "Running Simulations in InfoWorks ICM",
      description: "Bite-sized video tutorial on running and managing simulations",
      url: "https://www.youtube.com/watch?v=JiWfb0Ow8b4",
      type: "video",
      level: "intermediate",
      order: 1
    },
    {
      title: "Water Talk: Modelling Basics",
      description: "Practical approaches to flexible modelling",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar",
      level: "intermediate",
      order: 2
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Learn from colleagues with different modelling styles",
      url: "https://boards.autodesk.com/icm",
      type: "documentation",
      level: "advanced",
      order: 1
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Master advanced techniques for flexible workflows",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course",
      level: "advanced",
      order: 2
    }
  ],

  // Detail + Automated Types
  DASP: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Build your foundation before automating",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course",
      level: "beginner",
      order: 1
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Understand the interface before scripting",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video",
      level: "beginner",
      order: 2
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Comprehensive course including validation and quality assurance workflows",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course",
      level: "intermediate",
      order: 1
    },
    {
      title: "InfoWorks ICM Exchange API Documentation",
      description: "Introduction to the Ruby scripting interface",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Ruby-API",
      type: "documentation",
      level: "intermediate",
      order: 2
    },
    {
      title: "Ruby Scripting for InfoWorks ICM",
      description: "Community guide to building custom GUIs and automating workflows with Ruby API",
      url: "https://gist.github.com/sancarn/00e44231eba3ac20123e10601f236175",
      type: "tutorial",
      level: "advanced",
      order: 1
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Share and discover advanced automation scripts",
      url: "https://boards.autodesk.com/icm",
      type: "documentation",
      level: "advanced",
      order: 2
    }
  ],
  DASR: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Learn the fundamentals quickly",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course",
      level: "beginner",
      order: 1
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Quick video intro to the interface",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video",
      level: "beginner",
      order: 2
    },
    {
      title: "Water Talk: Modelling Basics",
      description: "Practical walkthrough of model setup and calibration techniques",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar",
      level: "intermediate",
      order: 1
    },
    {
      title: "Running Simulations in InfoWorks ICM",
      description: "Quick video guide to running efficient batch simulations",
      url: "https://www.youtube.com/watch?v=JiWfb0Ow8b4",
      type: "video",
      level: "intermediate",
      order: 2
    },
    {
      title: "Open Data Import Centre (ODIC) Guide",
      description: "Master efficient data import and export workflows",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-ODIC",
      type: "documentation",
      level: "advanced",
      order: 1
    },
    {
      title: "Ruby Scripting for InfoWorks ICM",
      description: "Automate repetitive pragmatic tasks",
      url: "https://gist.github.com/sancarn/00e44231eba3ac20123e10601f236175",
      type: "tutorial",
      level: "advanced",
      order: 2
    }
  ],
  DAIP: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Establish your foundation",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course",
      level: "beginner",
      order: 1
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Quick visual introduction",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video",
      level: "beginner",
      order: 2
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Complete course covering automated QA/QC workflows",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course",
      level: "intermediate",
      order: 1
    },
    {
      title: "InfoWorks ICM Exchange API",
      description: "Learn pattern-based validation using the Ruby API",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Ruby-API",
      type: "documentation",
      level: "intermediate",
      order: 2
    },
    {
      title: "Ruby Scripting for InfoWorks ICM",
      description: "Advanced guide to building sophisticated automation scripts",
      url: "https://gist.github.com/sancarn/00e44231eba3ac20123e10601f236175",
      type: "tutorial",
      level: "advanced",
      order: 1
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Share advanced intuitive automation approaches",
      url: "https://boards.autodesk.com/icm",
      type: "documentation",
      level: "advanced",
      order: 2
    }
  ],

  // Detail + Manual Types
  DMSP: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Step-by-step tutorials for hands-on network building",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course",
      level: "beginner",
      order: 1
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Visual guide to navigating and inspecting model components",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video",
      level: "beginner",
      order: 2
    },
    {
      title: "Water Talk: Modelling Basics",
      description: "Detailed walkthrough of model building",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar",
      level: "intermediate",
      order: 1
    },
    {
      title: "Data Quality & Validation",
      description: "Documentation on manual data quality checks and validation",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Validation",
      type: "documentation",
      level: "intermediate",
      order: 2
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Complete course for mastering detailed workflows",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course",
      level: "advanced",
      order: 1
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Connect with other detail-focused modellers",
      url: "https://boards.autodesk.com/icm",
      type: "documentation",
      level: "advanced",
      order: 2
    }
  ],
  DMSR: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Learn pragmatic modelling techniques quickly",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course",
      level: "beginner",
      order: 1
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Quick visual introduction",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video",
      level: "beginner",
      order: 2
    },
    {
      title: "Water Talk: Modelling Basics",
      description: "Practical approaches to building models efficiently",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar",
      level: "intermediate",
      order: 1
    },
    {
      title: "Running Simulations in InfoWorks ICM",
      description: "Quick simulation techniques",
      url: "https://www.youtube.com/watch?v=JiWfb0Ow8b4",
      type: "video",
      level: "intermediate",
      order: 2
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Share practical tips and rapid modelling techniques",
      url: "https://boards.autodesk.com/icm",
      type: "documentation",
      level: "advanced",
      order: 1
    },
    {
      title: "Open Data Import Centre (ODIC) Guide",
      description: "Streamline your data workflows",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-ODIC",
      type: "documentation",
      level: "advanced",
      order: 2
    }
  ],

  // Big-Picture + Automated Types
  BASP: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Learn the fundamentals of strategic modelling",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course",
      level: "beginner",
      order: 1
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Quick intro to strategic model navigation",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video",
      level: "beginner",
      order: 2
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Learn scenario management and strategic model configuration",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course",
      level: "intermediate",
      order: 1
    },
    {
      title: "2D Flood Modelling Documentation",
      description: "Strategic approaches to 2D surface water modelling",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-2D-Modelling",
      type: "documentation",
      level: "intermediate",
      order: 2
    },
    {
      title: "InfoWorks ICM & Civil 3D: Flood Modeller's Guide",
      description: "Strategic modelling for infrastructure planning and flood analysis (AU 2022)",
      url: "https://www.autodesk.com/autodesk-university/class/InfoWorks-ICM-and-Civil3D-Flood-Modelers-guide-Project-Impacts-2022",
      type: "webinar",
      level: "advanced",
      order: 1
    },
    {
      title: "Ruby Scripting for InfoWorks ICM",
      description: "Automate strategic analysis workflows",
      url: "https://gist.github.com/sancarn/00e44231eba3ac20123e10601f236175",
      type: "tutorial",
      level: "advanced",
      order: 2
    }
  ],
  BASR: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Quickly learn strategic modelling basics",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course",
      level: "beginner",
      order: 1
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Quick intro to the interface",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video",
      level: "beginner",
      order: 2
    },
    {
      title: "Water Talk: Modelling Basics",
      description: "Rapid model development techniques for feasibility studies",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar",
      level: "intermediate",
      order: 1
    },
    {
      title: "Running Simulations in InfoWorks ICM",
      description: "Quick scenario comparison and results extraction",
      url: "https://www.youtube.com/watch?v=JiWfb0Ow8b4",
      type: "video",
      level: "intermediate",
      order: 2
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Fast-track your strategic modelling skills",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course",
      level: "advanced",
      order: 1
    },
    {
      title: "Ruby Scripting for InfoWorks ICM",
      description: "Automate rapid strategic workflows",
      url: "https://gist.github.com/sancarn/00e44231eba3ac20123e10601f236175",
      type: "tutorial",
      level: "advanced",
      order: 2
    }
  ],

  // Big-Picture + Manual Types
  BMSP: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Build a systematic foundation for strategic modelling",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course",
      level: "beginner",
      order: 1
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Visual introduction to strategic modelling",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video",
      level: "beginner",
      order: 2
    },
    {
      title: "Water Talk: Modelling Basics",
      description: "Foundational strategic modelling techniques",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar",
      level: "intermediate",
      order: 1
    },
    {
      title: "Model Documentation Best Practices",
      description: "Standards for documenting strategic model simplifications",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-Documentation",
      type: "documentation",
      level: "intermediate",
      order: 2
    },
    {
      title: "InfoWorks ICM & Civil 3D: Flood Modeller's Guide",
      description: "Comprehensive documentation and collaboration approaches (AU 2022)",
      url: "https://www.autodesk.com/autodesk-university/class/InfoWorks-ICM-and-Civil3D-Flood-Modelers-guide-Project-Impacts-2022",
      type: "webinar",
      level: "advanced",
      order: 1
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Share strategic modelling best practices",
      url: "https://boards.autodesk.com/icm",
      type: "documentation",
      level: "advanced",
      order: 2
    }
  ],
  BMSR: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Learn fast strategic modelling basics",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course",
      level: "beginner",
      order: 1
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Quick visual intro",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video",
      level: "beginner",
      order: 2
    },
    {
      title: "Water Talk: Modelling Basics",
      description: "Rapid strategic modelling for tight deadlines",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar",
      level: "intermediate",
      order: 1
    },
    {
      title: "Running Simulations in InfoWorks ICM",
      description: "Fast scenario runs and quick result extraction",
      url: "https://www.youtube.com/watch?v=JiWfb0Ow8b4",
      type: "video",
      level: "intermediate",
      order: 2
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Connect with modellers for rapid response techniques",
      url: "https://boards.autodesk.com/icm",
      type: "documentation",
      level: "advanced",
      order: 1
    },
    {
      title: "Open Data Import Centre (ODIC) Guide",
      description: "Speed up your data workflows",
      url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-ODIC",
      type: "documentation",
      level: "advanced",
      order: 2
    }
  ],
  BMIP: [
    {
      title: "Getting Started with InfoWorks ICM",
      description: "Refresh your foundational knowledge",
      url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
      type: "course",
      level: "beginner",
      order: 1
    },
    {
      title: "Water Talk: Getting Started & Navigation",
      description: "Quick visual refresher",
      url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
      type: "video",
      level: "beginner",
      order: 2
    },
    {
      title: "InfoWorks ICM On-Demand Learning",
      description: "Refresh your skills and discover new features",
      url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
      type: "course",
      level: "intermediate",
      order: 1
    },
    {
      title: "Water Talk: Modelling Basics",
      description: "Review intuitive modelling approaches",
      url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
      type: "webinar",
      level: "intermediate",
      order: 2
    },
    {
      title: "InfoWorks ICM & Civil 3D: Flood Modeller's Guide",
      description: "Leverage experience for strategic analysis (AU 2022 session)",
      url: "https://www.autodesk.com/autodesk-university/class/InfoWorks-ICM-and-Civil3D-Flood-Modelers-guide-Project-Impacts-2022",
      type: "webinar",
      level: "advanced",
      order: 1
    },
    {
      title: "InfoWorks ICM Community Forum",
      description: "Share expertise and mentor the next generation of modellers",
      url: "https://boards.autodesk.com/icm",
      type: "documentation",
      level: "advanced",
      order: 2
    }
  ]
};

// Experience level labels and descriptions
export const experienceLevels: Record<ExperienceLevel, { label: string; description: string; icon: string }> = {
  beginner: {
    label: "Beginner",
    description: "New to InfoWorks ICM",
    icon: "🌱"
  },
  intermediate: {
    label: "Intermediate",
    description: "Some experience with ICM",
    icon: "🌿"
  },
  advanced: {
    label: "Advanced",
    description: "Experienced ICM user",
    icon: "🌳"
  }
};

// Get resources for a personality type, filtered and sorted by experience level
export const getResourcesForType = (typeCode: string, level?: ExperienceLevel): LearningResource[] => {
  let resources: LearningResource[];
  
  // Direct match
  if (learningResources[typeCode]) {
    resources = learningResources[typeCode];
  } else {
    // Fallback general resources
    resources = [
      {
        title: "Getting Started with InfoWorks ICM",
        description: "Curated tutorials for building your modelling foundation",
        url: "https://app.learn-one.autodesk.com/learn/ondemand/curated/getting-started-with-infoworks-icm",
        type: "course",
        level: "beginner",
        order: 1
      },
      {
        title: "Water Talk: Getting Started & Navigation",
        description: "Video guide to navigating InfoWorks ICM",
        url: "https://www.youtube.com/watch?v=blCEg7HWBhY",
        type: "video",
        level: "beginner",
        order: 2
      },
      {
        title: "InfoWorks ICM On-Demand Learning",
        description: "Comprehensive course covering all aspects of InfoWorks ICM",
        url: "https://www.autodesk.com/learn/ondemand/course/infoworks-icm",
        type: "course",
        level: "intermediate",
        order: 1
      },
      {
        title: "Water Talk: Modelling Basics",
        description: "Practical modelling walkthrough",
        url: "https://www.autodesk.com/blogs/water/2022/05/23/water-talk-modeling-basics-in-infoworks-icm/",
        type: "webinar",
        level: "intermediate",
        order: 2
      },
      {
        title: "InfoWorks ICM Community Forum",
        description: "Connect with other modellers and share experiences",
        url: "https://boards.autodesk.com/icm",
        type: "documentation",
        level: "advanced",
        order: 1
      },
      {
        title: "Ruby Scripting for InfoWorks ICM",
        description: "Advanced automation techniques",
        url: "https://gist.github.com/sancarn/00e44231eba3ac20123e10601f236175",
        type: "tutorial",
        level: "advanced",
        order: 2
      }
    ];
  }

  // Filter by level if specified
  if (level) {
    resources = resources.filter(r => r.level === level);
  }

  // Sort by level priority (beginner -> intermediate -> advanced), then by order
  const levelOrder: Record<ExperienceLevel, number> = {
    beginner: 1,
    intermediate: 2,
    advanced: 3
  };

  return resources.sort((a, b) => {
    const levelDiff = levelOrder[a.level] - levelOrder[b.level];
    if (levelDiff !== 0) return levelDiff;
    return a.order - b.order;
  });
};

// Icon mapping for resource types
export const resourceTypeIcons = {
  webinar: "Video",
  tutorial: "BookOpen",
  documentation: "FileText",
  course: "GraduationCap",
  video: "Play"
} as const;
