"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pageEnterAnimation, contentStagger } from "@/lib/animations";
import HeroSection from "@/components/Projects/HeroSection";
import ProjectsGrid from "@/components/Projects/ProjectsGrid";
import ProjectBackground from "@/components/Projects/ProjectBackground";

export default function ProjectsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Effects */}
      <ProjectBackground />
      
      {/* Main Content */}
      <motion.div
        className="relative z-10"
        variants={pageEnterAnimation}
        initial="initial"
        animate="animate"
      >
        {/* Hero Section */}
        <HeroSection />
        
        {/* Projects Grid Section */}
        <section className="container mx-auto px-6 py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key="projects-grid"
              variants={contentStagger}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-12"
            >
              {/* Section Header */}
              <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Project Missions
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  Each mission represents a unique challenge, innovative solution, 
                  and commitment to excellence in software development.
                </p>
                
                {/* Decorative line */}
                <motion.div
                  className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 96, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.div>

              {/* Responsive Grid */}
              <motion.div
                className="transition-all duration-500"
                style={{
                  perspective: isMobile ? "none" : "1200px",
                  transformStyle: isMobile ? "flat" : "preserve-3d",
                }}
              >
                <ProjectsGrid />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Performance Warning for Mobile */}
        <AnimatePresence>
          {isMobile && (
            <motion.div
              className="fixed bottom-4 left-4 right-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-sm text-yellow-300 backdrop-blur-md z-50"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚡</span>
                <span>
                  For the best experience, rotate your device to landscape mode 
                  or visit on a desktop for full 3D effects.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard Navigation Help */}
        <motion.div
          className="fixed bottom-4 right-4 bg-black/40 backdrop-blur-md border border-gray-600/50 rounded-xl p-4 text-xs text-gray-400 z-40"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="space-y-1">
            <div><kbd className="px-2 py-1 bg-gray-700 rounded text-xs">↑↓</kbd> Scroll to navigate</div>
            <div><kbd className="px-2 py-1 bg-gray-700 rounded text-xs">↻</kbd> Hover cards for details</div>
            <div><kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Click</kbd> View project details</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Performance optimization for low-end devices */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .mission-card-container * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        @media (max-width: 768px) {
          .mission-card-container {
            perspective: none;
            transform-style: flat;
          }
        }
      `}</style>
    </div>
  );
}