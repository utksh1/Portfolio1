"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

interface InfoPanelProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  delay?: number;
  glowColor?: "cyan" | "purple" | "blue";
  position?: "left" | "right" | "center";
}

export default function InfoPanel({
  title,
  children,
  icon,
  className = "",
  delay = 0,
  glowColor = "cyan",
  position = "center",
}: InfoPanelProps) {
  const { ref, inView } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  });

  const glowColors = {
    cyan: "border-glow-cyan shadow-[0_0_20px_rgba(0,255,136,0.3)]",
    purple: "border-glow-purple shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    blue: "border-glow-blue shadow-[0_0_20px_rgba(0,132,255,0.3)]",
  };

  const positionClasses = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: delay + 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`relative group ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      {/* Main Card */}
      <div
        className={`
          relative p-8 rounded-lg glass backdrop-blur-xl
          border-2 transition-all duration-500
          hover:scale-105 hover:-translate-y-2
          ${glowColors[glowColor]}
          ${positionClasses[position]}
        `}
      >
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-current to-transparent opacity-20 animate-pulse" />
        </div>

        {/* Glow Effect */}
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 blur-sm transition-all duration-500" />

        {/* Icon Section */}
        {icon && (
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 0.5, delay: delay + 0.3, type: "spring" }}
          >
            <div className={`
              p-4 rounded-full 
              ${glowColor === "cyan" ? "text-cyber-cyan bg-cyber-cyan/10" : ""}
              ${glowColor === "purple" ? "text-cyber-purple bg-cyber-purple/10" : ""}
              ${glowColor === "blue" ? "text-cyber-blue bg-cyber-blue/10" : ""}
            `}>
              {icon}
            </div>
          </motion.div>
        )}

        {/* Title */}
        <motion.h3
          className={`
            text-2xl font-bold mb-4 font-cyber
            ${glowColor === "cyan" ? "text-glow-cyan" : ""}
            ${glowColor === "purple" ? "text-glow-purple" : ""}
            ${glowColor === "blue" ? "text-glow-blue" : ""}
          `}
          variants={contentVariants}
        >
          {title}
        </motion.h3>

        {/* Content */}
        <motion.div
          className="space-y-4 text-gray-300 font-mono leading-relaxed"
          variants={contentVariants}
        >
          {children}
        </motion.div>

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-current opacity-50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-current opacity-50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-current opacity-50" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-current opacity-50" />

        {/* Scan Line Effect */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skewX(-20deg)" />
        </motion.div>
      </div>

      {/* Floating Particles */}
      {inView && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-current rounded-full opacity-20"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: 0,
              }}
              animate={{
                y: [null, "-20px", "20px"],
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: delay + i * 0.5,
                ease: "easeInOut",
              }}
              style={{
                color: glowColor === "cyan" ? "var(--cyber-cyan)" : 
                       glowColor === "purple" ? "var(--cyber-purple)" : "var(--cyber-blue)",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}