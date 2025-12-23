"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { colorAccents } from "@/lib/projects";
import { Project } from "@/lib/projects";

interface TimelineComponentProps {
  project: Project;
}

const TimelineComponent: React.FC<TimelineComponentProps> = ({ project }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const accent = colorAccents[project.colorAccent];

  // Combine all timeline data
  const timelineItems = [
    {
      type: 'contribution',
      title: 'Key Contributions',
      items: project.keyContributions,
      icon: '🚀',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      type: 'challenge',
      title: 'Challenges Overcome',
      items: project.challenges,
      icon: '⚡',
      color: 'from-orange-500 to-red-500'
    },
    {
      type: 'learning',
      title: 'Key Learnings',
      items: project.learnings,
      icon: '🎓',
      color: 'from-purple-500 to-pink-500'
    },
    {
      type: 'future',
      title: 'Future Improvements',
      items: project.futureImprovements,
      icon: '🔮',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              background: `linear-gradient(45deg, ${accent.primary}, ${accent.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Journey & Impact
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive look at the development journey, challenges faced, 
            key contributions, and valuable learnings from this project.
          </p>
        </motion.div>

        {/* Timeline Sections */}
        <motion.div
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {timelineItems.map((section, sectionIndex) => {
            if (section.items.length === 0) return null;

            return (
              <motion.div
                key={section.type}
                className="relative"
                variants={sectionVariants}
              >
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    className={`p-4 rounded-2xl bg-gradient-to-r ${section.color} shadow-lg`}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-2xl">{section.icon}</span>
                  </motion.div>
                  <div>
                    <h3 
                      className="text-3xl font-bold"
                      style={{
                        background: `linear-gradient(45deg, ${accent.primary}, ${accent.secondary})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {section.title}
                    </h3>
                    <p className="text-gray-400 mt-1">{section.items.length} items</p>
                  </div>
                </div>

                {/* Timeline Items */}
                <div className="relative">
                  {/* Central Line */}
                  <div 
                    className="absolute left-8 top-0 bottom-0 w-0.5"
                    style={{
                      background: `linear-gradient(180deg, ${accent.primary}, ${accent.secondary})`,
                    }}
                  />

                  <div className="space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        className="relative flex items-start gap-6"
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {/* Timeline Dot */}
                        <motion.div
                          className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
                            boxShadow: `0 0 20px ${accent.primary}50`,
                          }}
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : { scale: 0 }}
                          transition={{ 
                            delay: sectionIndex * 0.2 + itemIndex * 0.1 + 0.5,
                            type: "spring",
                            stiffness: 300 
                          }}
                          whileHover={{ 
                            scale: 1.1,
                            boxShadow: `0 0 30px ${accent.primary}70`,
                          }}
                        >
                          <span className="text-white font-bold text-sm">
                            {itemIndex + 1}
                          </span>
                        </motion.div>

                        {/* Content Card */}
                        <motion.div
                          className="flex-1 p-6 rounded-2xl backdrop-blur-md border border-gray-600/50 transition-all duration-300 hover:border-opacity-80"
                          style={{
                            background: `linear-gradient(135deg, 
                              rgba(0, 0, 0, 0.8) 0%, 
                              rgba(${accent.secondary.replace('#', '')}, 0.05) 100%)`,
                            borderColor: `${accent.primary}30`,
                          }}
                          whileHover={{ 
                            y: -3,
                            boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px ${accent.primary}20`,
                            transition: { duration: 0.3 }
                          }}
                        >
                          <p className="text-gray-300 leading-relaxed text-lg">
                            {item}
                          </p>
                          
                          {/* Hover Glow Effect */}
                          <div 
                            className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                              background: `radial-gradient(circle at center, ${accent.primary}10, transparent 70%)`,
                            }}
                          />
                        </motion.div>

                        {/* Connector Line to Next Item */}
                        {itemIndex < section.items.length - 1 && (
                          <div 
                            className="absolute left-8 top-16 w-0.5 h-6"
                            style={{
                              background: `linear-gradient(180deg, ${accent.primary}80, transparent)`,
                            }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Section Divider */}
                {sectionIndex < timelineItems.length - 1 && (
                  <motion.div
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: sectionIndex * 0.3 + 1 }}
                  >
                    <div 
                      className="w-16 h-1 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${accent.primary}, transparent)`,
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Summary */}
        <motion.div
          className="mt-16 text-center p-8 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${accent.primary}10, ${accent.secondary}20)`,
            border: `1px solid ${accent.primary}30`,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5 }}
        >
          <h4 className="text-xl font-semibold mb-4" style={{ color: accent.primary }}>
            Project Impact
          </h4>
          <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
            This project represents not just technical achievement, but continuous learning, 
            problem-solving, and innovation. Each challenge overcome and lesson learned 
            contributes to building better software solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineComponent;