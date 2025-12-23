"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

interface TimelineItem {
  title: string;
  description: string;
  year: string;
  icon?: ReactNode;
  status: "completed" | "current" | "upcoming";
}

interface MiniTimelineProps {
  items: TimelineItem[];
  className?: string;
  orientation?: "vertical" | "horizontal";
}

export default function MiniTimeline({ 
  items, 
  className = "",
  orientation = "horizontal"
}: MiniTimelineProps) {
  const { ref, inView } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  });

  const getStatusColors = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-cyber-cyan/20",
          border: "border-cyber-cyan",
          glow: "shadow-[0_0_20px_rgba(0,255,136,0.4)]",
          text: "text-cyber-cyan",
        };
      case "current":
        return {
          bg: "bg-purple-500/20",
          border: "border-purple-500",
          glow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
          text: "text-purple-400",
        };
      case "upcoming":
        return {
          bg: "bg-cyber-blue/20",
          border: "border-cyber-blue",
          glow: "shadow-[0_0_20px_rgba(0,132,255,0.4)]",
          text: "text-cyber-blue",
        };
    }
  };

  const getStatusIcon = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return "✓";
      case "current":
        return "◉";
      case "upcoming":
        return "○";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: orientation === "horizontal" ? -50 : 0,
      y: orientation === "vertical" ? 50 : 0,
      scale: 0.8,
    }),
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.4, 0, 0.2, 1],
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    }),
  };

  const connectorVariants = {
    hidden: { 
      scaleX: 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (orientation === "vertical") {
    return (
      <motion.div
        ref={ref}
        className={`relative ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Vertical Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-cyan via-purple-500 to-cyber-blue opacity-50" />
        
        <div className="space-y-8">
          {items.map((item, index) => {
            const colors = getStatusColors(item.status);
            
            return (
              <motion.div
                key={index}
                className="relative flex items-start space-x-6"
                variants={itemVariants}
                custom={index}
              >
                {/* Timeline Node */}
                <motion.div
                  className={`
                    relative z-10 flex items-center justify-center w-16 h-16 
                    rounded-full border-2 ${colors.bg} backdrop-blur-xl
                    ${colors.border} ${colors.glow}
                    hover:scale-110 transition-all duration-300
                  `}
                  whileHover={{ scale: 1.1 }}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.2 + 0.3,
                    type: "spring" as const,
                    stiffness: 200,
                  }}
                >
                  {/* Status Icon */}
                  <span className={`text-xl ${colors.text} font-bold`}>
                    {getStatusIcon(item.status)}
                  </span>
                  
                  {/* Icon */}
                  {item.icon && (
                    <div className={`absolute inset-0 flex items-center justify-center ${colors.text}`}>
                      {item.icon}
                    </div>
                  )}

                  {/* Pulse Effect */}
                  {item.status === "current" && (
                    <motion.div
                      className={`absolute inset-0 rounded-full border-2 ${colors.border} opacity-60`}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>

                {/* Content */}
                <motion.div
                  className="flex-1 pb-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                >
                  <div className="glass-dark p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-bold font-cyber ${colors.text}`}>
                        {item.title}
                      </h3>
                      <span className="text-sm font-mono text-gray-400">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-gray-300 font-mono text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // Horizontal layout (default)
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-x-auto ${className}`}
      variants={timelineVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Horizontal Timeline Line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyber-cyan via-purple-500 to-cyber-blue opacity-50 transform -translate-y-1/2" />
      
      <div className="relative flex items-center justify-between min-w-max px-8 py-8">
        {items.map((item, index) => {
          const colors = getStatusColors(item.status);
          
          return (
            <motion.div
              key={index}
              className="relative flex flex-col items-center"
              variants={itemVariants}
              custom={index}
            >
              {/* Timeline Node */}
              <motion.div
                className={`
                  relative z-10 flex items-center justify-center w-16 h-16 
                  rounded-full border-2 ${colors.bg} backdrop-blur-xl
                  ${colors.border} ${colors.glow}
                  hover:scale-110 transition-all duration-300
                `}
                whileHover={{ scale: 1.1 }}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 + 0.3,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {/* Status Icon */}
                <span className={`text-xl ${colors.text} font-bold`}>
                  {getStatusIcon(item.status)}
                </span>
                
                {/* Icon */}
                {item.icon && (
                  <div className={`absolute inset-0 flex items-center justify-center ${colors.text}`}>
                    {item.icon}
                  </div>
                )}

                {/* Pulse Effect */}
                {item.status === "current" && (
                  <motion.div
                    className={`absolute inset-0 rounded-full border-2 ${colors.border} opacity-60`}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>

              {/* Content */}
              <motion.div
                className="absolute top-20 text-center w-48"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
              >
                <div className="glass-dark p-4 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="mb-2">
                    <h3 className={`text-sm font-bold font-cyber ${colors.text}`}>
                      {item.title}
                    </h3>
                    <span className="text-xs font-mono text-gray-400">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-gray-300 font-mono text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>

              {/* Connector Line */}
              {index < items.length - 1 && (
                <motion.div
                  className="absolute top-1/2 left-full w-16 h-0.5 bg-gradient-to-r from-cyber-cyan to-purple-500 opacity-60 transform -translate-y-1/2"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Animated Particles */}
      {inView && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyber-cyan rounded-full opacity-40"
              initial={{
                x: Math.random() * 100 + "%",
                y: "50%",
              }}
              animate={{
                x: [null, Math.random() * 100 + "%"],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}