"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Project, colorAccents } from "@/lib/projects";
import { floatAnimation, nodeScaleUp } from "@/lib/animations";
import Link from "next/link";

interface MissionCardProps {
  project: Project;
  index: number;
  className?: string;
}

const MissionCard: React.FC<MissionCardProps> = ({ project, index, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Parallax/mouse tracking values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animations for mouse tracking
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), {
    stiffness: 150,
    damping: 15,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const colors = colorAccents[project.colorAccent];
  const isSpotlight = project.spotlight;

  return (
    <motion.div
      ref={cardRef}
      className={`mission-card-container ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut",
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover="hover"
      variants={floatAnimation}
    >
      <motion.div
        className={`relative w-full h-80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
          isSpotlight ? "xl:w-96 xl:h-96" : ""
        }`}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        variants={nodeScaleUp}
      >
        {/* Glassmorphism background */}
        <div 
          className="absolute inset-0 backdrop-blur-md border border-opacity-30 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, 
              rgba(255, 255, 255, 0.1) 0%, 
              rgba(255, 255, 255, 0.05) 50%, 
              rgba(255, 255, 255, 0.02) 100%)`,
            borderColor: colors.border,
            boxShadow: isHovered 
              ? `${colors.glow}, 0 8px 32px rgba(0, 0, 0, 0.3)` 
              : "0 4px 16px rgba(0, 0, 0, 0.1)",
          }}
        />
        
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0"
          style={{
            background: `linear-gradient(45deg, 
              transparent 30%, 
              ${colors.primary}40, 
              transparent 70%)`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? ["-100%", "100%"] : "-100%",
          }}
          transition={{
            opacity: { duration: 0.3 },
            x: { duration: 0.8, ease: "easeInOut" },
          }}
        />

        {/* Spotlight badge */}
        {isSpotlight && (
          <motion.div
            className="absolute top-4 right-4 z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { delay: 0.5 + index * 0.1 }
            }}
          >
            <div 
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                color: "white",
                boxShadow: colors.glow,
              }}
            >
              ⭐ FLAGSHIP
            </div>
          </motion.div>
        )}

        {/* Content container */}
        <div className="relative h-full p-6 flex flex-col justify-between z-10">
          {/* Header */}
          <div>
            <motion.h3 
              className="text-xl font-bold mb-2 line-clamp-2"
              style={{
                color: colors.primary,
                textShadow: isHovered ? `0 0 10px ${colors.primary}80` : "none",
              }}
              animate={{
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
            
            <motion.p 
              className="text-sm font-medium mb-3 opacity-80"
              style={{ color: colors.secondary }}
              animate={{
                opacity: isHovered ? 1 : 0.8,
              }}
            >
              {project.subtitle}
            </motion.p>

            {/* Status badge */}
            <div className="flex items-center gap-2 mb-4">
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: colors.primary }}
              />
              <span 
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: colors.primary }}
              >
                {project.status === "in-development" ? "In Development" : project.status}
              </span>
              <span className="text-xs text-gray-400">• {project.year}</span>
            </div>
          </div>

          {/* Description */}
          <motion.div
            className="flex-1"
            animate={{
              opacity: isHovered ? 1 : 0.9,
            }}
          >
            <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
              {project.shortDescription}
            </p>
          </motion.div>

          {/* Technologies */}
          <motion.div
            className="mt-4"
            animate={{
              scale: isHovered ? 1.02 : 1,
            }}
          >
            <div className="flex flex-wrap gap-1 mb-4">
              {project.technologies.slice(0, isHovered ? 5 : 3).map((tech, techIndex) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-full border"
                  style={{
                    borderColor: `${colors.primary}40`,
                    color: `${colors.primary}CC`,
                    background: `${colors.primary}10`,
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > (isHovered ? 5 : 3) && (
                <span className="px-2 py-1 text-xs rounded-full border text-gray-400 border-gray-600">
                  +{project.technologies.length - (isHovered ? 5 : 3)}
                </span>
              )}
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Link href={`/projects/${project.id}`}>
              <motion.button
                className="w-full py-3 px-4 rounded-xl font-medium uppercase tracking-wider text-sm border-2 transition-all duration-300"
                style={{
                  borderColor: colors.primary,
                  color: colors.primary,
                  background: isHovered 
                    ? `${colors.primary}15` 
                    : "transparent",
                  boxShadow: isHovered 
                    ? `0 0 20px ${colors.primary}30` 
                    : "none",
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 0 25px ${colors.primary}50`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                VIEW MISSION
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, 
              ${colors.primary}15 0%, 
              transparent 70%)`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default MissionCard;