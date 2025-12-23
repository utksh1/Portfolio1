"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { colorAccents } from "@/lib/projects";
import { Project } from "@/lib/projects";

interface TechStackSectionProps {
  project: Project;
}

const TechStackSection: React.FC<TechStackSectionProps> = ({ project }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const accent = colorAccents[project.colorAccent];

  const getTechIcon = (techName: string) => {
    const name = techName.toLowerCase();
    
    // Frontend Technologies
    if (name.includes('react')) return "⚛️";
    if (name.includes('next.js') || name.includes('nextjs')) return "▲";
    if (name.includes('three.js') || name.includes('threejs')) return "🌐";
    if (name.includes('html')) return "🌐";
    if (name.includes('css')) return "🎨";
    if (name.includes('javascript') || name.includes('js')) return "🟨";
    if (name.includes('tailwind')) return "💨";
    if (name.includes('monaco')) return "🖥️";
    if (name.includes('tailwind css')) return "💨";
    
    // Backend Technologies
    if (name.includes('node.js') || name.includes('nodejs')) return "🟢";
    if (name.includes('express')) return "🚂";
    if (name.includes('websocket')) return "⚡";
    if (name.includes('openai')) return "🤖";
    
    // Database Technologies
    if (name.includes('postgresql') || name.includes('postgres')) return "🐘";
    if (name.includes('redis')) return "❤️";
    
    // DevOps & Tools
    if (name.includes('docker')) return "🐳";
    if (name.includes('vercel')) return "▲";
    if (name.includes('cron')) return "⏰";
    if (name.includes('chart.js')) return "📊";
    if (name.includes('email')) return "📧";
    if (name.includes('nodemon')) return "👁️";
    
    return "⚡"; // Default icon
  };

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return "text-green-400";
    if (proficiency >= 80) return "text-blue-400";
    if (proficiency >= 70) return "text-yellow-400";
    return "text-orange-400";
  };

  const getProficiencyWidth = (proficiency: number) => {
    return `${proficiency}%`;
  };

  const categories = [
    { key: 'frontend', title: 'Frontend', icon: '🎨' },
    { key: 'backend', title: 'Backend', icon: '⚙️' },
    { key: 'database', title: 'Database', icon: '🗄️' },
    ...(project.techStack.devops ? [{ key: 'devops', title: 'DevOps & Tools', icon: '🛠️' }] : [])
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const techCardVariants = {
    hidden: { opacity: 0, x: -20 },
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
            Technology Stack Deep-Dive
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive breakdown of the technologies and tools that power this project, 
            along with my proficiency levels and the specific roles each technology plays.
          </p>
        </motion.div>

        {/* Tech Stack Categories */}
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {categories.map((category, categoryIndex) => {
            const techs = project.techStack[category.key as keyof typeof project.techStack];
            
            if (!techs || techs.length === 0) return null;

            return (
              <motion.div
                key={category.key}
                className="relative"
                variants={categoryVariants}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div 
                    className="text-4xl p-4 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${accent.primary}20, ${accent.secondary}40)`,
                      border: `1px solid ${accent.primary}30`,
                    }}
                  >
                    {category.icon}
                  </div>
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
                      {category.title}
                    </h3>
                    <p className="text-gray-400 mt-1">{techs.length} technologies</p>
                  </div>
                </div>

                {/* Tech Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {techs.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      className="group relative p-6 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, 
                          rgba(0, 0, 0, 0.8) 0%, 
                          rgba(${accent.secondary.replace('#', '')}, 0.1) 100%)`,
                        border: `1px solid ${accent.primary}30`,
                        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
                      }}
                      variants={techCardVariants}
                      whileHover={{ 
                        y: -5,
                        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px ${accent.primary}20`,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {/* Background Glow */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at center, ${accent.primary}10, transparent 70%)`,
                        }}
                      />

                      {/* Tech Header */}
                      <div className="relative z-10 mb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-2xl">{getTechIcon(tech.name)}</div>
                          <h4 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r"
                              style={{
                                backgroundImage: `linear-gradient(45deg, ${accent.primary}, ${accent.secondary})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                              }}>
                            {tech.name}
                          </h4>
                        </div>

                        {/* Proficiency Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Proficiency</span>
                            <span className={`text-sm font-medium ${getProficiencyColor(tech.proficiency)}`}>
                              {tech.proficiency}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${accent.primary}, ${accent.secondary})`,
                                boxShadow: `0 0 10px ${accent.primary}50`,
                              }}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: getProficiencyWidth(tech.proficiency) } : {}}
                              transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Tech Description */}
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        {tech.description}
                      </p>

                      {/* Role in Project */}
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-400 mb-2">Key Role:</h5>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {tech.role}
                        </p>
                      </div>

                      {/* Hover Border Effect */}
                      <div 
                        className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                        style={{
                          borderColor: accent.primary,
                          boxShadow: `0 0 20px ${accent.primary}40`,
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Connection Line to Next Category */}
                {categoryIndex < categories.length - 1 && (
                  <motion.div
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1 + categoryIndex * 0.2 }}
                  >
                    <div 
                      className="w-1 h-16 rounded-full"
                      style={{
                        background: `linear-gradient(180deg, ${accent.primary}, ${accent.secondary}60)`,
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
            Technology Excellence
          </h4>
          <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Each technology has been carefully selected and mastered to deliver optimal performance, 
            scalability, and user experience. This diverse stack represents cutting-edge tools 
            working together seamlessly to create exceptional software solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;