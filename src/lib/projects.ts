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
    tags: ["campus", "education", "multi-role", "authentication"]
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
    tags: ["hostel", "management", "education", "administration"]
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
    tags: ["ai", "ide", "code-editor", "development", "futuristic"]
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
    tags: ["monitoring", "analytics", "alerts", "reliability"]
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