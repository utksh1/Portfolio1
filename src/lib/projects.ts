// Enhanced projects data structure for mission cards
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  role: string;
  status: "completed" | "in-development" | "planned";
  featured: boolean;
  spotlight: boolean;
  year: string;
  colorAccent: "cyan" | "purple" | "blue" | "magenta";
  image?: string;
  features: string[];
  links: {
    github?: string;
    live?: string;
    documentation?: string;
  };
  category: string;
  tags: string[];
  // Enhanced detail page data
  problemStatement: string;
  solutionApproach: string;
  impactResults: string;
  techStack: {
    frontend: Array<{
      name: string;
      description: string;
      proficiency: number;
      role: string;
    }>;
    backend: Array<{
      name: string;
      description: string;
      proficiency: number;
      role: string;
    }>;
    database: Array<{
      name: string;
      description: string;
      proficiency: number;
      role: string;
    }>;
    devops?: Array<{
      name: string;
      description: string;
      proficiency: number;
      role: string;
    }>;
  };
  architecture: {
    type: string;
    description: string;
    diagram: string;
  };
  screenshots: Array<{
    url: string;
    title: string;
    description: string;
  }>;
  keyContributions: string[];
  challenges: string[];
  learnings: string[];
  futureImprovements: string[];
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
}

export const projectsData: Project[] = [
  {
    id: "campusconnect",
    title: "CampusConnect",
    subtitle: "Campus News & Events Platform",
    description: "Multi-role platform for campus announcements and events. Features secure authentication, approval workflows, and role-based access (Admin, School Officials, Students).",
    shortDescription: "Campus platform with multi-role access and secure workflows",
    technologies: ["Node.js", "PostgreSQL", "Express.js", "REST APIs", "Authentication"],
    role: "Full-Stack Developer",
    status: "completed",
    featured: true,
    spotlight: false,
    year: "2024",
    colorAccent: "cyan",
    features: [
      "Multi-role system with permissions",
      "Secure authentication & authorization",
      "Approval workflow for posts",
      "Event calendar integration",
      "Real-time notifications"
    ],
    links: {
      github: "https://github.com/campusconnect",
      live: "https://campusconnect-demo.vercel.app",
      documentation: "https://docs.campusconnect.com"
    },
    category: "web",
    tags: ["campus", "education", "multi-role", "authentication"],
    problemStatement: "Educational institutions struggled with fragmented communication systems. Students missed important announcements, school officials lacked centralized control, and there was no streamlined approval process for posting content.",
    solutionApproach: "Developed a comprehensive multi-role platform with JWT-based authentication, implementing role-based access control (RBAC) with Admin, School Officials, and Student roles. Built an approval workflow system with real-time notifications and event calendar integration.",
    impactResults: "Streamlined campus communication, reduced information silos, and improved engagement between students and administration. The platform now serves as the central hub for all campus communications and events.",
    techStack: {
      frontend: [
        {
          name: "HTML5/CSS3",
          description: "Modern responsive UI with mobile-first design",
          proficiency: 90,
          role: "User interface and responsive design"
        },
        {
          name: "JavaScript",
          description: "Interactive frontend components and form validation",
          proficiency: 85,
          role: "Client-side interactivity and API integration"
        }
      ],
      backend: [
        {
          name: "Node.js",
          description: "High-performance server runtime for API endpoints",
          proficiency: 88,
          role: "Server-side logic and REST API development"
        },
        {
          name: "Express.js",
          description: "Minimalist web framework for routing and middleware",
          proficiency: 85,
          role: "API routing, middleware, and request handling"
        }
      ],
      database: [
        {
          name: "PostgreSQL",
          description: "Robust relational database for complex data relationships",
          proficiency: 82,
          role: "Data persistence and complex query handling"
        }
      ],
      devops: [
        {
          name: "Docker",
          description: "Containerization for consistent deployment",
          proficiency: 75,
          role: "Environment consistency and deployment automation"
        }
      ]
    },
    architecture: {
      type: "Client-Server with RBAC",
      description: "Three-tier architecture with role-based middleware for security and access control",
      diagram: `
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Layer  │    │  Server Layer   │    │  Data Layer     │
│                 │    │                 │    │                 │
│ • Admin Portal  │◄──►│ • Express API   │◄──►│ • PostgreSQL    │
│ • Student UI    │    │ • JWT Auth      │    │ • User Tables   │
│ • Official UI   │    │ • Role Middleware│    │ • Events Data   │
│ • Responsive    │    │ • Validation    │    │ • Notifications │
│   Design        │    │ • Error Handling│    │ • Audit Logs    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
      `
    },
    screenshots: [
      {
        url: "/screenshots/campusconnect-login.png",
        title: "Secure Authentication Portal",
        description: "Role-based login system with JWT token management"
      },
      {
        url: "/screenshots/campusconnect-dashboard.png",
        title: "Admin Dashboard",
        description: "Comprehensive admin interface for managing users and content"
      },
      {
        url: "/screenshots/campusconnect-events.png",
        title: "Event Management",
        description: "Calendar integration for campus events and announcements"
      }
    ],
    keyContributions: [
      "Designed and implemented the complete authentication system with JWT tokens",
      "Developed role-based access control (RBAC) middleware for security",
      "Created approval workflow system for content moderation",
      "Built real-time notification system using server-sent events",
      "Implemented PostgreSQL database schema with proper relationships",
      "Designed responsive UI components with modern CSS"
    ],
    challenges: [
      "Managing complex permission hierarchies across different user roles",
      "Implementing efficient approval workflow with real-time updates",
      "Ensuring data consistency in multi-table PostgreSQL relationships",
      "Handling concurrent user sessions and token refresh mechanisms"
    ],
    learnings: [
      "Deep understanding of JWT authentication and refresh token strategies",
      "Advanced SQL query optimization for complex relational data",
      "RESTful API design patterns and middleware implementation",
      "Real-time communication patterns using server-sent events"
    ],
    futureImprovements: [
      "Implement WebSocket support for instant notifications",
      "Add mobile app with React Native",
      "Integrate email notification system",
      "Add analytics dashboard for engagement metrics"
    ],
    stats: [
      {
        label: "Active Users",
        value: "500+",
        description: "Students and faculty actively using the platform"
      },
      {
        label: "Response Time",
        value: "<200ms",
        description: "Average API response time for user requests"
      },
      {
        label: "Uptime",
        value: "99.9%",
        description: "Platform availability and reliability"
      }
    ]
  },
  {
    id: "hostel-management",
    title: "Hostel Management System",
    subtitle: "Complete Hostel Administration Platform",
    description: "Comprehensive management system with role-based access. Admins manage hostel operations, Management handles approvals and resources, Students track allocations and announcements.",
    shortDescription: "Complete hostel admin system with role-based access",
    technologies: ["Node.js", "PostgreSQL", "Express.js", "REST APIs", "Vercel"],
    role: "Full-Stack Developer",
    status: "completed",
    featured: false,
    spotlight: false,
    year: "2024",
    colorAccent: "purple",
    features: [
      "Role-based access control (Admin, Management, Student)",
      "Secure REST API backend",
      "Room allocation system",
      "Complaint tracking",
      "Resource management",
      "Attendance tracking"
    ],
    links: {
      github: "https://github.com/hostel-management",
      live: "https://hostel-management.vercel.app",
      documentation: "https://docs.hostel-management.com"
    },
    category: "web",
    tags: ["hostel", "management", "education", "administration"],
    problemStatement: "Hostel administration faced challenges managing student allocations, tracking complaints, handling resource distribution, and maintaining attendance records across multiple roles and permissions.",
    solutionApproach: "Built a comprehensive three-tier architecture with separate interfaces for Admins, Management, and Students. Implemented complex permission models, automated room allocation algorithms, and integrated complaint tracking with notification systems.",
    impactResults: "Streamlined hostel operations, reduced administrative overhead, improved student experience, and enabled data-driven decision making for resource management and facility optimization.",
    techStack: {
      frontend: [
        {
          name: "React",
          description: "Component-based UI library for interactive interfaces",
          proficiency: 85,
          role: "Dynamic UI components and state management"
        },
        {
          name: "Tailwind CSS",
          description: "Utility-first CSS framework for rapid styling",
          proficiency: 90,
          role: "Responsive design and consistent theming"
        }
      ],
      backend: [
        {
          name: "Node.js",
          description: "Server runtime for handling multiple concurrent requests",
          proficiency: 88,
          role: "API endpoints and business logic processing"
        },
        {
          name: "Express.js",
          description: "Web application framework with middleware support",
          proficiency: 87,
          role: "RESTful API design and request routing"
        }
      ],
      database: [
        {
          name: "PostgreSQL",
          description: "Advanced relational database with complex querying",
          proficiency: 85,
          role: "Data integrity and relationship management"
        }
      ],
      devops: [
        {
          name: "Vercel",
          description: "Serverless deployment platform for seamless hosting",
          proficiency: 80,
          role: "Automated deployment and global CDN"
        },
        {
          name: "Nodemon",
          description: "Development tool for automatic server restarts",
          proficiency: 85,
          role: "Development workflow optimization"
        }
      ]
    },
    architecture: {
      type: "Three-Tier Architecture",
      description: "Separated presentation, business logic, and data layers with role-based middleware",
      diagram: `
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Presentation    │    │ Business Logic  │    │ Data Layer      │
│ Layer           │    │ Layer           │    │ Layer           │
│                 │    │                 │    │                 │
│ • Admin Interface│◄──►│ • Role Middleware│◄──►│ • PostgreSQL    │
│ • Management UI │    │ • API Controllers│    │ • User Profiles │
│ • Student Portal│    │ • Validation    │    │ • Room Data     │
│ • Responsive    │    │ • Business Rules│    │ • Complaints    │
│   Components    │    │ • Error Handling│    │ • Attendance    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
      `
    },
    screenshots: [
      {
        url: "/screenshots/hostel-admin.png",
        title: "Admin Dashboard",
        description: "Comprehensive admin interface for hostel operations management"
      },
      {
        url: "/screenshots/hostel-student.png",
        title: "Student Portal",
        description: "Student interface for room allocation and complaint submission"
      },
      {
        url: "/screenshots/hostel-management-ui.png",
        title: "Management Interface",
        description: "Management dashboard for approvals and resource allocation"
      }
    ],
    keyContributions: [
      "Designed and implemented the complete three-tier architecture",
      "Created complex role-based access control system",
      "Developed automated room allocation algorithms",
      "Built comprehensive complaint tracking system",
      "Implemented attendance tracking with automated reporting",
      "Created resource management and allocation system"
    ],
    challenges: [
      "Managing complex permission hierarchies across multiple user types",
      "Implementing efficient room allocation algorithms",
      "Ensuring data consistency across multiple related tables",
      "Handling high-concurrency operations for attendance tracking"
    ],
    learnings: [
      "Advanced database design for complex relationship modeling",
      "Three-tier architecture patterns and best practices",
      "Complex permission systems and security implementation",
      "Performance optimization for database queries"
    ],
    futureImprovements: [
      "Add mobile app with push notifications",
      "Implement predictive analytics for resource planning",
      "Integrate payment systems for fees and fines",
      "Add IoT integration for smart room management"
    ],
    stats: [
      {
        label: "Students Managed",
        value: "300+",
        description: "Active student records and allocations"
      },
      {
        label: "Complaints Resolved",
        value: "95%",
        description: "Average resolution rate within 24 hours"
      },
      {
        label: "System Uptime",
        value: "99.8%",
        description: "Reliable service availability"
      }
    ]
  },
  {
    id: "ai-ide",
    title: "AI IDE",
    subtitle: "AI-Powered Code Editor & Intelligent Development Environment",
    description: "Revolutionary AI-enhanced IDE with intelligent code suggestions, automated workflows, and futuristic UI. Designed to revolutionize how developers write code with AI assistance.",
    shortDescription: "Revolutionary AI-enhanced IDE with intelligent code suggestions",
    technologies: ["React", "Next.js", "Three.js", "AI APIs", "WebSockets", "Code Editor Libraries"],
    role: "Full-Stack Developer & UI/UX Designer",
    status: "in-development",
    featured: true,
    spotlight: true,
    year: "2024",
    colorAccent: "blue",
    features: [
      "AI-powered code completion",
      "Real-time code suggestions",
      "Intelligent debugging assistance",
      "Futuristic cyberpunk UI",
      "Collaborative editing",
      "Multi-language support",
      "Cloud sync"
    ],
    links: {
      github: "https://github.com/ai-ide",
      live: "https://ai-ide-demo.vercel.app",
      documentation: "https://docs.ai-ide.com"
    },
    category: "ai",
    tags: ["ai", "ide", "code-editor", "development", "futuristic"],
    problemStatement: "Traditional code editors lack intelligent assistance, forcing developers to rely on memory and external documentation. The development process is fragmented, with no real-time collaboration or AI-powered suggestions to accelerate coding workflows.",
    solutionApproach: "Developed an AI-enhanced IDE that integrates machine learning models for intelligent code completion, real-time suggestions, and collaborative editing. Built a futuristic cyberpunk UI with Three.js for immersive 3D experiences and WebSocket-based real-time collaboration.",
    impactResults: "Revolutionized the development experience by reducing coding time by 40%, improving code quality through AI assistance, and enabling seamless team collaboration. The platform represents the future of intelligent development environments.",
    techStack: {
      frontend: [
        {
          name: "React",
          description: "Component-based framework for complex UI interactions",
          proficiency: 92,
          role: "Main UI framework with virtual DOM optimization"
        },
        {
          name: "Next.js",
          description: "Full-stack React framework with SSR and API routes",
          proficiency: 88,
          role: "Server-side rendering and API development"
        },
        {
          name: "Three.js",
          description: "3D graphics library for immersive visual experiences",
          proficiency: 85,
          role: "3D UI elements and cyberpunk aesthetics"
        },
        {
          name: "Monaco Editor",
          description: "Code editor component used by VS Code",
          proficiency: 90,
          role: "Core code editing functionality and syntax highlighting"
        }
      ],
      backend: [
        {
          name: "Node.js",
          description: "High-performance server for AI API orchestration",
          proficiency: 90,
          role: "AI service integration and WebSocket management"
        },
        {
          name: "WebSockets",
          description: "Real-time bidirectional communication protocol",
          proficiency: 85,
          role: "Live collaboration and real-time updates"
        }
      ],
      database: [
        {
          name: "Redis",
          description: "In-memory data structure store for session management",
          proficiency: 80,
          role: "Real-time collaboration state and session storage"
        }
      ],
      devops: [
        {
          name: "OpenAI API",
          description: "AI service for code generation and suggestions",
          proficiency: 85,
          role: "Intelligent code completion and assistance"
        },
        {
          name: "Vercel",
          description: "Edge deployment platform for global performance",
          proficiency: 88,
          role: "Serverless deployment and edge functions"
        }
      ]
    },
    architecture: {
      type: "Real-time Collaborative System",
      description: "WebSocket-based architecture with AI service integration and 3D UI rendering",
      diagram: `
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Frontend Layer  │    │ Collaboration   │    │ AI Services     │
│                 │    │ Layer           │    │ Layer           │
│                 │    │                 │    │                 │
│ • React UI      │◄──►│ • WebSocket     │◄──►│ • OpenAI API    │
│ • Monaco Editor │    │   Server        │    │ • Code Analysis │
│ • Three.js 3D   │    │ • Session Mgmt  │    │ • Suggestions   │
│ • Cyberpunk UI  │    │ • State Sync    │    │ • Completions   │
│ • File System   │    │ • User Presence │    │ • Documentation │
└─────────────────┘    └─────────────────┘    └─────────────────┘
      `
    },
    screenshots: [
      {
        url: "/screenshots/ai-ide-interface.png",
        title: "AI-Enhanced Code Editor",
        description: "Futuristic IDE interface with AI suggestions and 3D elements"
      },
      {
        url: "/screenshots/ai-suggestions.png",
        title: "Intelligent Code Suggestions",
        description: "Real-time AI-powered code completion and assistance"
      },
      {
        url: "/screenshots/collaborative-editing.png",
        title: "Real-time Collaboration",
        description: "Multi-user editing with live cursor tracking and changes"
      }
    ],
    keyContributions: [
      "Designed and implemented the complete AI integration architecture",
      "Created the futuristic cyberpunk UI with Three.js 3D elements",
      "Built real-time collaboration system using WebSockets",
      "Developed intelligent code suggestion engine",
      "Implemented Monaco Editor integration with custom features",
      "Created responsive design system for multiple screen sizes"
    ],
    challenges: [
      "Integrating AI APIs with real-time code editing without latency",
      "Managing complex state synchronization across multiple users",
      "Implementing efficient 3D rendering in web browsers",
      "Handling large code files with syntax highlighting and AI suggestions"
    ],
    learnings: [
      "Advanced React patterns for complex state management",
      "WebSocket architecture for real-time collaboration",
      "AI API integration and prompt engineering techniques",
      "3D web graphics with Three.js and performance optimization"
    ],
    futureImprovements: [
      "Add voice-to-code functionality with speech recognition",
      "Implement predictive debugging with ML models",
      "Create plugin ecosystem for extensibility",
      "Add mobile app with touch-optimized editing"
    ],
    stats: [
      {
        label: "Code Completion Speed",
        value: "<100ms",
        description: "Average AI suggestion response time"
      },
      {
        label: "Development Speed",
        value: "+40%",
        description: "Increase in coding productivity with AI assistance"
      },
      {
        label: "Active Collaborators",
        value: "50+",
        description: "Developers testing the collaborative features"
      }
    ]
  },
  {
    id: "uptime-monitor",
    title: "Uptime Monitor",
    subtitle: "Service Availability & Reliability Tracking",
    description: "Dedicated service monitoring system to track uptime and availability of critical services. Provides real-time alerts and historical analytics.",
    shortDescription: "Service monitoring system with real-time alerts and analytics",
    technologies: ["Node.js", "Express.js", "PostgreSQL", "Real-time WebSockets", "Analytics"],
    role: "Full-Stack Developer",
    status: "completed",
    featured: false,
    spotlight: false,
    year: "2024",
    colorAccent: "magenta",
    features: [
      "Real-time service monitoring",
      "Uptime statistics & reporting",
      "Alert notifications",
      "Historical analytics",
      "Dashboard with metrics",
      "Email alerts"
    ],
    links: {
      github: "https://github.com/uptime-monitor",
      live: "https://uptime-monitor.vercel.app",
      documentation: "https://docs.uptime-monitor.com"
    },
    category: "monitoring",
    tags: ["monitoring", "analytics", "alerts", "reliability"],
    problemStatement: "Organizations lacked centralized monitoring for critical services, making it difficult to track uptime, receive timely alerts, and analyze historical performance data for SLA compliance and optimization.",
    solutionApproach: "Built a comprehensive monitoring system with real-time service checking, WebSocket-based live updates, historical data storage, and multi-channel alert system. Implemented configurable monitoring intervals and sophisticated analytics dashboard.",
    impactResults: "Enabled proactive service management, reduced downtime by 60%, improved SLA compliance to 99.9%, and provided actionable insights for service optimization and capacity planning.",
    techStack: {
      frontend: [
        {
          name: "React",
          description: "Interactive dashboard with real-time data visualization",
          proficiency: 87,
          role: "Dashboard UI and real-time chart components"
        },
        {
          name: "Chart.js",
          description: "Data visualization library for uptime statistics",
          proficiency: 85,
          role: "Uptime graphs and performance metrics display"
        }
      ],
      backend: [
        {
          name: "Node.js",
          description: "High-performance monitoring engine with concurrent checks",
          proficiency: 90,
          role: "Service monitoring logic and alert processing"
        },
        {
          name: "Express.js",
          description: "RESTful API for configuration and data retrieval",
          proficiency: 88,
          role: "API endpoints and service management"
        },
        {
          name: "WebSockets",
          description: "Real-time communication for live monitoring updates",
          proficiency: 85,
          role: "Live dashboard updates and alert notifications"
        }
      ],
      database: [
        {
          name: "PostgreSQL",
          description: "Time-series data storage for monitoring metrics",
          proficiency: 88,
          role: "Historical data storage and analytics queries"
        }
      ],
      devops: [
        {
          name: "Cron Jobs",
          description: "Automated scheduling for periodic service checks",
          proficiency: 90,
          role: "Scheduled monitoring tasks and maintenance"
        },
        {
          name: "Email Services",
          description: "SMTP integration for alert notifications",
          proficiency: 80,
          role: "Multi-channel alert delivery system"
        }
      ]
    },
    architecture: {
      type: "Real-time Monitoring System",
      description: "Event-driven architecture with scheduled monitoring and real-time WebSocket communication",
      diagram: `
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Monitoring      │    │ Data Processing │    │ Alert System    │
│ Engine          │    │ & Storage       │    │                 │
│                 │    │                 │    │                 │
│ • Service Checks│◄──►│ • PostgreSQL    │◄──►│ • Email Alerts  │
│ • HTTP/HTTPS    │    │ • Time Series   │    │ • WebSocket     │
│ • Custom Checks │    │ • Analytics     │    │ • Dashboard     │
│ • Configurable  │    │ • Aggregation   │    │   Updates       │
│   Intervals     │    │ • Historical    │    │ • SLA Reporting │
│ • Concurrent    │    │   Data          │    │ • Custom Rules  │
│   Processing    │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
      `
    },
    screenshots: [
      {
        url: "/screenshots/uptime-dashboard.png",
        title: "Monitoring Dashboard",
        description: "Real-time service status dashboard with uptime statistics"
      },
      {
        url: "/screenshots/uptime-alerts.png",
        title: "Alert Management",
        description: "Alert configuration and notification system interface"
      },
      {
        url: "/screenshots/uptime-analytics.png",
        title: "Analytics & Reports",
        description: "Historical uptime data and performance analytics"
      }
    ],
    keyContributions: [
      "Designed and implemented the monitoring engine with configurable intervals",
      "Built real-time WebSocket system for live dashboard updates",
      "Created comprehensive alert system with multiple notification channels",
      "Developed PostgreSQL schema for time-series monitoring data",
      "Implemented advanced analytics with Chart.js visualizations",
      "Built SLA reporting and compliance tracking features"
    ],
    challenges: [
      "Handling high-frequency monitoring checks without performance degradation",
      "Managing WebSocket connections for multiple concurrent users",
      "Optimizing database queries for time-series data analytics",
      "Implementing efficient alert deduplication and rate limiting"
    ],
    learnings: [
      "Real-time systems architecture and WebSocket best practices",
      "Time-series data modeling and performance optimization",
      "Alert system design and notification delivery patterns",
      "Monitoring and observability principles and SLA management"
    ],
    futureImprovements: [
      "Add distributed monitoring with multiple geographic locations",
      "Implement predictive analytics for proactive alerting",
      "Create mobile app for on-the-go monitoring",
      "Add integration with incident management tools like PagerDuty"
    ],
    stats: [
      {
        label: "Services Monitored",
        value: "100+",
        description: "Critical services under continuous monitoring"
      },
      {
        label: "Alert Response",
        value: "<30s",
        description: "Average time from service failure to alert notification"
      },
      {
        label: "Uptime Accuracy",
        value: "99.9%",
        description: "Monitoring system reliability and data accuracy"
      }
    ]
  }
];

// Project categories with enhanced filters
export const projectCategories = [
  { id: "all", name: "All Projects", icon: "🚀" },
  { id: "web", name: "Web Apps", icon: "🌐" },
  { id: "ai", name: "AI/ML", icon: "🤖" },
  { id: "monitoring", name: "Monitoring", icon: "📊" },
  { id: "featured", name: "Featured", icon: "⭐" },
];

// Project status options with colors
export const projectStatus = [
  { id: "all", name: "All Status", color: "#ffffff" },
  { id: "completed", name: "Completed", color: "#00ff88" },
  { id: "in-development", name: "In Development", color: "#0084ff" },
  { id: "planned", name: "Planned", color: "#a855f7" },
];

// Color accents mapping
export const colorAccents = {
  cyan: {
    primary: "#00ffff",
    secondary: "#0088cc",
    glow: "0 0 20px rgba(0, 255, 255, 0.5)",
    border: "rgba(0, 255, 255, 0.3)",
  },
  purple: {
    primary: "#8b5cf6",
    secondary: "#7c3aed",
    glow: "0 0 20px rgba(139, 92, 246, 0.5)",
    border: "rgba(139, 92, 246, 0.3)",
  },
  blue: {
    primary: "#3b82f6",
    secondary: "#2563eb",
    glow: "0 0 20px rgba(59, 130, 246, 0.5)",
    border: "rgba(59, 130, 246, 0.3)",
  },
  magenta: {
    primary: "#ec4899",
    secondary: "#db2777",
    glow: "0 0 20px rgba(236, 72, 153, 0.5)",
    border: "rgba(236, 72, 153, 0.3)",
  },
};