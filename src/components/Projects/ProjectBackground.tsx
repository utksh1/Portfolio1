"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface ProjectBackgroundProps {
  className?: string;
}

const ProjectBackground: React.FC<ProjectBackgroundProps> = ({ className = "" }) => {
  // Generate particles with memoization for performance
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  // Generate floating orbs
  const orbs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      color: ["cyan", "blue", "purple", "magenta"][i % 4],
    }));
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "cyan":
        return "bg-cyan-400/5";
      case "blue":
        return "bg-blue-400/5";
      case "purple":
        return "bg-purple-400/5";
      case "magenta":
        return "bg-pink-400/5";
      default:
        return "bg-cyan-400/5";
    }
  };

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          className={`absolute rounded-full blur-3xl ${getColorClasses(orb.color)}`}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
          }}
          animate={{
            x: [0, 50, 0, -30, 0],
            y: [0, -40, 0, 20, 0],
            scale: [1, 1.2, 1, 0.8, 1],
            opacity: [0.3, 0.6, 0.3, 0.5, 0.3],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full bg-cyan-400/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -200, -400, -600, -800],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 1, 0.5, 0],
            scale: [0, 1, 1.5, 0.5, 0],
          }}
          transition={{
            duration: particle.duration * 4,
            repeat: Infinity,
            ease: "easeOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Scan lines effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            transparent 0%,
            rgba(0, 255, 255, 0.02) 50%,
            transparent 100%
          )`,
          backgroundSize: "100% 4px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "0px 100px"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Corner glow effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-cyan-400/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-purple-400/10 to-transparent blur-3xl" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
    </div>
  );
};

export default ProjectBackground;