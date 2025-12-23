"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

interface BackgroundEffectProps {
  children: ReactNode;
  className?: string;
}

export default function BackgroundEffect({ children, className = "" }: BackgroundEffectProps) {
  const { ref, inView } = useScrollAnimation({
    threshold: 0.1,
  });

  // Tech symbols for subtle background
  const techSymbols = ["{}", "[]", "//", "/*", "*/", "<>", "$$", "##", "%%", "@@", "<div>", "class", "const", "let"];

  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Animated Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 via-transparent to-purple-500/5" />
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 border border-cyber-cyan/20"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              clipPath: i % 3 === 0 ? "polygon(50% 0%, 0% 100%, 100% 100%)" : 
                       i % 3 === 1 ? "circle(50%)" : "rect(0, 0, 100%, 100%)",
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Tech Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyber-cyan/10 text-lg font-mono font-bold"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.05, 0.15, 0.05],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          >
            {techSymbols[i % techSymbols.length]}
          </motion.div>
        ))}
      </div>

      {/* Particle System (Simplified for About Page) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyber-cyan/30 rounded-full"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div ref={ref} className="relative z-10">
        {children}
      </div>

      {/* Subtle Scan Lines */}
      <div className="absolute inset-0 scanlines-overlay opacity-5 pointer-events-none" />
    </div>
  );
}