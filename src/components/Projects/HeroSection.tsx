"use client";

import React from "react";
import { motion } from "framer-motion";
import { pageEnterAnimation, neonGlow, glitchAnimation } from "@/lib/animations";

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = "" }) => {
  return (
    <section className={`relative py-20 overflow-hidden ${className}`}>
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid background overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 text-center space-y-8">
        {/* Main title */}
        <motion.div
          variants={pageEnterAnimation}
          initial="initial"
          animate="animate"
          className="space-y-4"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-cyber font-bold tracking-wider"
            variants={neonGlow}
            animate="animate"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              MISSION
            </span>
            <br />
            <span className="text-white">ARCHIVE</span>
          </motion.h1>
          
          <motion.div
            className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 128, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          <p className="text-xl md:text-2xl text-cyan-300 font-mono tracking-wide">
            Featured Projects & Experiments
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Explore a collection of innovative development work, from full-stack applications 
            to AI-powered tools and comprehensive management systems.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex justify-center gap-8 md:gap-16 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-cyan-400 font-mono">4</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 font-mono">3</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-400 font-mono">2024</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Active Year</div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-cyan-400/60"
            animate={{
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-sm font-mono uppercase tracking-wider">Scroll to Explore</span>
            <div className="w-6 h-10 border-2 border-cyan-400/30 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-400/10 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  );
};

export default HeroSection;