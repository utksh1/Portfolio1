"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { glitchAnimation, typewriterText, neonGlow, staggerChildren } from "@/lib/animations";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  onComplete?: () => void;
}

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

interface NeonTextProps {
  children: ReactNode;
  className?: string;
  color?: "cyan" | "purple" | "blue";
}

export const GlitchText: React.FC<GlitchTextProps> = ({ children, className = "", delay = 0 }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className={`glitch-text ${className}`}
          initial="initial"
          animate="animate"
          exit="initial"
          variants={{
            ...glitchAnimation,
            animate: {
              ...glitchAnimation.animate,
              transition: {
                delay,
              },
            },
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  className = "", 
  delay = 0, 
  onComplete 
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let charDelay = 50; // ms per character

    const timer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(prev => prev + text[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsComplete(true);
          onComplete?.();
        }
      }, charDelay);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [text, delay, onComplete]);

  return (
    <div className={className}>
      {displayText}
      {!isComplete && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-block bg-cyber-cyan w-0.5 h-5 ml-1 align-text-bottom"
        />
      )}
    </div>
  );
};

export const RevealText: React.FC<RevealTextProps> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        scale: 0.8,
        rotateX: -45,
        y: 30,
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotateX: 0,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut",
        transform: {
          type: "spring",
          stiffness: 100,
          damping: 10,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const NeonText: React.FC<NeonTextProps> = ({ children, className = "", color = "cyan" }) => {
  const colorMap = {
    cyan: "var(--cyber-cyan)",
    purple: "var(--cyber-purple)",
    blue: "var(--cyber-blue)",
  };

  const glowMap = {
    cyan: "var(--glow-cyan)",
    purple: "var(--glow-purple)",
    blue: "var(--glow-blue)",
  };

  const colorVar = colorMap[color];
  const glowVar = glowMap[color];

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={{
        ...neonGlow,
        initial: {
          ...neonGlow.initial,
          color: colorVar,
          textShadow: `0 0 5px ${colorVar}, 0 0 10px ${colorVar}, 0 0 15px ${colorVar}`,
        },
        animate: {
          ...neonGlow.animate,
          color: colorVar,
          textShadow: [
            `0 0 10px ${colorVar}, 0 0 20px ${colorVar}, 0 0 30px ${colorVar}, 0 0 40px ${colorVar}`,
            `0 0 5px ${colorVar}, 0 0 10px ${colorVar}, 0 0 15px ${colorVar}, 0 0 20px ${colorVar}`,
            `0 0 10px ${colorVar}, 0 0 20px ${colorVar}, 0 0 30px ${colorVar}, 0 0 40px ${colorVar}`,
          ],
        },
      }}
    >
      {children}
    </motion.div>
  );
};