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
