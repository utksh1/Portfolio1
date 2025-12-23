import { Variants } from "framer-motion";

export const pageEnterAnimation: Variants = {
  initial: {
    opacity: 0,
    x: 20,
    scale: 0.98,
    filter: "blur(5px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1], // easeInOut
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    scale: 0.98,
    filter: "blur(5px)",
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 1, 1], // easeIn
    },
  },
};

export const contentStagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const glowPulse: Variants = {
  initial: { opacity: 0.5, scale: 1 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const floatAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const sidebarAnimation: Variants = {
  initial: { x: -300, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    x: -300, 
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Boot sequence animations
export const bootPhase1: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export const bootPhase2: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 1,
    },
  },
};

export const bootPhase3: Variants = {
  initial: { opacity: 0, scale: 0.9, y: 30 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: [0.4, 0, 0.2, 1],
      delay: 2,
    },
  },
};

export const bootPhase4: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 3.5,
    },
  },
};

export const glitchAnimation: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: [0, 10, -5, 5, -2, 0],
    transition: {
      duration: 0.3,
      ease: "easeOut",
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
};

export const typewriterText: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: number) => ({
    opacity: 1,
    transition: {
      duration: 0.05,
      delay: custom * 0.05,
    },
  }),
};

export const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

export const neonGlow: Variants = {
  initial: { 
    textShadow: 
      "0 0 5px var(--cyber-cyan, #00ff88), 0 0 10px var(--cyber-cyan, #00ff88), 0 0 15px var(--cyber-cyan, #00ff88)",
    opacity: 0.7,
  },
  animate: {
    textShadow: [
      "0 0 5px var(--cyber-cyan, #00ff88), 0 0 10px var(--cyber-cyan, #00ff88), 0 0 15px var(--cyber-cyan, #00ff88), 0 0 20px var(--cyber-cyan, #00ff88)",
      "0 0 10px var(--cyber-cyan, #00ff88), 0 0 20px var(--cyber-cyan, #00ff88), 0 0 30px var(--cyber-cyan, #00ff88), 0 0 40px var(--cyber-cyan, #00ff88)",
      "0 0 5px var(--cyber-cyan, #00ff88), 0 0 10px var(--cyber-cyan, #00ff88), 0 0 15px var(--cyber-cyan, #00ff88), 0 0 20px var(--cyber-cyan, #00ff88)",
    ],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const buttonHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
};

export const scrollHint: Variants = {
  initial: { y: 0, opacity: 0.7 },
  animate: {
    y: [0, -10, 0],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

// Tech Stack 3D Animations
export const nodeScaleUp: Variants = {
  initial: { scale: 1, opacity: 0.8 },
  hover: {
    scale: 1.3,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  active: {
    scale: 1.2,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const infoPanelSlide: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
      duration: 0.5,
    },
  },
  exit: { 
    x: '100%', 
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export const orbitRotation: Variants = {
  initial: { rotateZ: 0 },
  animate: {
    rotateZ: 360,
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const labelFade: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: { 
    opacity: 0, 
    y: 10, 
    scale: 0.8,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

export const techCardSlideIn: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const orbitGlow: Variants = {
  initial: { opacity: 0.1 },
  animate: {
    opacity: [0.1, 0.3, 0.1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Mission Card Animations
export const missionCardFloat: Variants = {
  initial: { y: 0, rotateX: 0, rotateY: 0 },
  animate: {
    y: [0, -8, 0],
    rotateX: [0, 2, 0],
    rotateY: [0, -1, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const missionCardHover: Variants = {
  initial: { scale: 1, boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" },
  hover: {
    scale: 1.05,
    y: -10,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    rotateX: 5,
    rotateY: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const missionCardGlow: Variants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

export const missionCardContent: Variants = {
  initial: { opacity: 0.8 },
  hover: {
    opacity: 1,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const missionCardButton: Variants = {
  initial: { opacity: 0, y: 20 },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.1,
      ease: "easeOut",
    },
  },
};

export const spotlightBadge: Variants = {
  initial: { opacity: 0, scale: 0, rotate: -180 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.3,
    },
  },
};

export const techStackTag: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export const filterButton: Variants = {
  initial: { scale: 1, opacity: 0.8 },
  hover: {
    scale: 1.05,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
};
