// Sample projects data structure
export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  status: "completed" | "in-progress" | "planned";
  featured: boolean;
  github?: string;
  demo?: string;
  image?: string;
  category: "web" | "mobile" | "desktop" | "ai" | "blockchain" | "other";
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export const projectsData: Project[] = [
  {
    id: "1",
    title: "Portfolio OS",
    description: "A futuristic, cyberpunk-themed portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features interactive 3D elements, smooth animations, and a terminal-like interface.",
    shortDescription: "Futuristic portfolio with cyberpunk aesthetics",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React Three Fiber"],
    status: "in-progress",
    featured: true,
    category: "web",
    tags: ["portfolio", "cyberpunk", "futuristic", "nextjs"],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "AI Code Assistant",
    description: "An intelligent coding assistant that helps developers write better code using AI. Features syntax highlighting, code completion, and real-time debugging suggestions.",
    shortDescription: "AI-powered coding assistant",
    technologies: ["React", "Node.js", "OpenAI API", "Monaco Editor"],
    status: "planned",
    featured: true,
    category: "ai",
    tags: ["ai", "coding", "assistant", "openai"],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "3",
    title: "Blockchain Voting System",
    description: "A decentralized voting system built on Ethereum smart contracts. Ensures transparency, immutability, and security in democratic processes.",
    shortDescription: "Decentralized voting on Ethereum",
    technologies: ["Solidity", "React", "Web3.js", "Hardhat"],
    status: "planned",
    featured: false,
    category: "blockchain",
    tags: ["blockchain", "ethereum", "voting", "smart-contracts"],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
];

// Project categories
export const projectCategories = [
  { id: "all", name: "All Projects", icon: "🚀" },
  { id: "web", name: "Web Apps", icon: "🌐" },
  { id: "mobile", name: "Mobile Apps", icon: "📱" },
  { id: "desktop", name: "Desktop", icon: "💻" },
  { id: "ai", name: "AI/ML", icon: "🤖" },
  { id: "blockchain", name: "Blockchain", icon: "⛓️" },
  { id: "other", name: "Other", icon: "🔧" },
];

// Project status options
export const projectStatus = [
  { id: "completed", name: "Completed", color: "#00ff88" },
  { id: "in-progress", name: "In Progress", color: "#0084ff" },
  { id: "planned", name: "Planned", color: "#a855f7" },
];