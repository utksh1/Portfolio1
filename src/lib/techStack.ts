export interface TechItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps';
  description: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Expert';
  yearsExperience?: number;
  relatedProjects: string[];
  color: string;
  icon: string;
}

export const techStack: TechItem[] = [
  // Frontend Technologies - Orbit 1 (closest to core)
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    description: 'Component-based JavaScript library for building interactive user interfaces with virtual DOM.',
    proficiency: 'Expert',
    yearsExperience: 4,
    relatedProjects: ['Portfolio OS', 'E-commerce Platform', 'Dashboard Analytics'],
    color: '#00ff88',
    icon: '⚛️'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    description: 'Full-stack React framework with server-side rendering, static generation, and API routes.',
    proficiency: 'Expert',
    yearsExperience: 3,
    relatedProjects: ['Portfolio OS', 'E-commerce Platform', 'Blog Platform'],
    color: '#00ff88',
    icon: '▲'
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'Frontend',
    description: 'Utility-first CSS framework for rapid UI development with responsive design capabilities.',
    proficiency: 'Expert',
    yearsExperience: 3,
    relatedProjects: ['Portfolio OS', 'E-commerce Platform', 'Dashboard Analytics'],
    color: '#00ff88',
    icon: '🎨'
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'Frontend',
    description: 'Production-ready motion library for React with declarative animations and gestures.',
    proficiency: 'Intermediate',
    yearsExperience: 2,
    relatedProjects: ['Portfolio OS', 'Landing Pages', 'Interactive Components'],
    color: '#00ff88',
    icon: '🎭'
  },

  // Backend Technologies - Orbit 2 (middle)
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    description: 'JavaScript runtime built on Chrome V8 engine for server-side development and APIs.',
    proficiency: 'Intermediate',
    yearsExperience: 3,
    relatedProjects: ['E-commerce API', 'Real-time Chat', 'File Management System'],
    color: '#a855f7',
    icon: '🟢'
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend',
    description: 'Minimalist web framework for Node.js with middleware support and routing capabilities.',
    proficiency: 'Intermediate',
    yearsExperience: 3,
    relatedProjects: ['E-commerce API', 'Authentication Service', 'Microservices'],
    color: '#a855f7',
    icon: '🚂'
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Frontend',
    description: 'Modern markup language with semantic elements, forms, and multimedia support.',
    proficiency: 'Expert',
    yearsExperience: 5,
    relatedProjects: ['All Projects', 'Accessibility-First Design', 'SEO Optimization'],
    color: '#00ff88',
    icon: '📄'
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'Frontend',
    description: 'Latest CSS version with animations, transitions, flexbox, and grid layouts.',
    proficiency: 'Expert',
    yearsExperience: 5,
    relatedProjects: ['Portfolio OS', 'Responsive Design', 'Animation Libraries'],
    color: '#00ff88',
    icon: '🎨'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    description: 'Dynamic programming language for web development with ES6+ features and async patterns.',
    proficiency: 'Expert',
    yearsExperience: 5,
    relatedProjects: ['Portfolio OS', 'Interactive Games', 'Data Visualization'],
    color: '#00ff88',
    icon: '🟨'
  },

  // Database Technologies - Orbit 3 (outer)
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Database',
    description: 'Advanced open-source relational database with JSON support and complex queries.',
    proficiency: 'Intermediate',
    yearsExperience: 3,
    relatedProjects: ['E-commerce Platform', 'Data Analytics', 'User Management'],
    color: '#0084ff',
    icon: '🐘'
  },

  // DevOps & Tools - Orbit 3 (outer)
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'DevOps',
    description: 'Cloud platform for frontend frameworks with automatic deployments and edge functions.',
    proficiency: 'Expert',
    yearsExperience: 2,
    relatedProjects: ['Portfolio OS', 'Next.js Applications', 'Static Sites'],
    color: '#ff0080',
    icon: '▲'
  },
  {
    id: 'git',
    name: 'Git',
    category: 'DevOps',
    description: 'Distributed version control system for tracking changes and collaborative development.',
    proficiency: 'Expert',
    yearsExperience: 5,
    relatedProjects: ['All Projects', 'Open Source Contributions', 'Team Collaboration'],
    color: '#ff0080',
    icon: '📝'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'DevOps',
    description: 'Git hosting platform with pull requests, code reviews, and continuous integration.',
    proficiency: 'Expert',
    yearsExperience: 4,
    relatedProjects: ['Open Source', 'Team Projects', 'Portfolio Hosting'],
    color: '#ff0080',
    icon: '🐱'
  },
  {
    id: 'nodemon',
    name: 'Nodemon',
    category: 'DevOps',
    description: 'Development tool that automatically restarts Node.js applications on file changes.',
    proficiency: 'Intermediate',
    yearsExperience: 3,
    relatedProjects: ['API Development', 'Local Development', 'Hot Reloading'],
    color: '#ff0080',
    icon: '🔄'
  },
  {
    id: 'cors',
    name: 'CORS',
    category: 'DevOps',
    description: 'Cross-Origin Resource Sharing middleware for handling cross-origin requests securely.',
    proficiency: 'Intermediate',
    yearsExperience: 2,
    relatedProjects: ['API Security', 'Frontend-Backend Integration', 'Web Applications'],
    color: '#ff0080',
    icon: '🔒'
  },
  {
    id: 'helmet',
    name: 'Helmet',
    category: 'DevOps',
    description: 'Security middleware for Express.js that sets various HTTP headers to protect apps.',
    proficiency: 'Beginner',
    yearsExperience: 1,
    relatedProjects: ['API Security', 'Production Deployments', 'Security Hardening'],
    color: '#ff0080',
    icon: '🛡️'
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'DevOps',
    description: 'API development and testing platform for designing, documenting, and testing APIs.',
    proficiency: 'Intermediate',
    yearsExperience: 3,
    relatedProjects: ['API Testing', 'Integration Testing', 'Documentation'],
    color: '#ff0080',
    icon: '📮'
  }
];

export const categoryColors = {
  Frontend: '#00ff88',
  Backend: '#a855f7',
  Database: '#0084ff',
  DevOps: '#ff0080'
};

export const orbitDistances = {
  Orbit1: 4, // Frontend (closest to core)
  Orbit2: 6, // Backend and core languages
  Orbit3: 8  // Database and DevOps (furthest from core)
};

export const orbitSpeeds = {
  Orbit1: 0.01, // Fastest
  Orbit2: 0.007, // Medium
  Orbit3: 0.005  // Slowest
};