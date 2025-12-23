// Site Configuration
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Utkarsh Singh",
  role: process.env.NEXT_PUBLIC_SITE_ROLE || "Full-Stack Developer & Software Engineering Student",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description: "Futuristic portfolio showcasing cutting-edge development skills, projects, and journey through the world of software engineering.",
};

// Social Links
export const socialLinks = {
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/utksh1",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/utksh1",
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/utksh1",
  email: process.env.NEXT_PUBLIC_EMAIL || "utkarshsingh60101@gmail.com",
  resume: process.env.NEXT_PUBLIC_RESUME_URL || "https://utkarsh.tech",
};

// Cyberpunk Color Palette
export const cyberColors = {
  cyan: "#00ff88",
  purple: "#a855f7",
  blue: "#0084ff",
  electricCyan: "#00ffff",
  neonPink: "#ff0080",
  spaceNavy: "#0a0e27",
  spaceDark: "#0f1729",
};

// Animation Durations
export const animationConfig = {
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    slower: "1000ms",
  },
  easing: {
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

// Theme Configuration
export const themeConfig = {
  darkMode: "class",
  fonts: {
    mono: "JetBrains Mono, Courier New, monospace",
    cyber: "Orbitron, monospace",
  },
};