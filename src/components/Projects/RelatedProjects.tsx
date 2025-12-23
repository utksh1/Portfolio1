"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { projectsData, colorAccents } from "@/lib/projects";
import { Project } from "@/lib/projects";

interface RelatedProjectsProps {
  currentProject: Project;
}

const RelatedProjects: React.FC<RelatedProjectsProps> = ({ currentProject }) => {
  // Find related projects based on technology overlap and category
  const getRelatedProjects = () => {
    const currentTechs = new Set(currentProject.technologies);
    const currentCategory = currentProject.category;
    
    return projectsData
      .filter(project => project.id !== currentProject.id)
      .map(project => {
        // Calculate technology overlap score
        const projectTechs = new Set(project.technologies);
        const techOverlap = [...currentTechs].filter(tech => projectTechs.has(tech)).length;
        const techScore = techOverlap / Math.max(currentTechs.size, projectTechs.size);
        
        // Category bonus
        const categoryBonus = project.category === currentCategory ? 0.2 : 0;
        
        // Spotlight bonus for featured projects
        const spotlightBonus = project.spotlight ? 0.3 : 0;
        
        const totalScore = techScore + categoryBonus + spotlightBonus;
        
        return { project, score: totalScore, techOverlap };
      })
      .filter(({ score }) => score > 0.1) // Only show somewhat related projects
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // Show top 3 related projects
  };

  const relatedProjects = getRelatedProjects();

  if (relatedProjects.length === 0) {
    return null;
  }

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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
    },
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              background: `linear-gradient(45deg, ${colorAccents[currentProject.colorAccent].primary}, ${colorAccents[currentProject.colorAccent].secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Related Projects
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore other projects that share similar technologies, approaches, or goals.
          </p>
        </motion.div>

        {/* Related Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {relatedProjects.map(({ project, score, techOverlap }, index) => {
            const accent = colorAccents[project.colorAccent];
            
            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Link href={`/projects/${project.id}`}>
                  <div 
                    className="group relative h-full p-6 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(0, 0, 0, 0.8) 0%, 
                        rgba(${accent.secondary.replace('#', '')}, 0.1) 100%)`,
                      border: `1px solid ${accent.primary}30`,
                      boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
                    }}
                  >
                    {/* Background Glow */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${accent.primary}10, transparent 70%)`,
                      }}
                    />

                    {/* Spotlight Badge */}
                    {project.spotlight && (
                      <motion.div
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
                          color: 'white',
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        ⭐ Spotlight
                      </motion.div>
                    )}

                    {/* Status Badge */}
                    <motion.div
                      className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: `${accent.border}`,
                        border: `1px solid ${accent.primary}50`,
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <span>
                        {project.status === 'completed' ? '✅' : 
                         project.status === 'in-development' ? '🚧' : '📋'}
                      </span>
                      <span className="text-gray-300 capitalize">
                        {project.status.replace('-', ' ')}
                      </span>
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10 pt-12">
                      {/* Project Title */}
                      <h3 
                        className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r"
                        style={{
                          backgroundImage: `linear-gradient(45deg, ${accent.primary}, ${accent.secondary})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {project.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {project.subtitle}
                      </p>

                      {/* Short Description */}
                      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                        {project.shortDescription}
                      </p>

                      {/* Tech Stack Preview */}
                      <div className="mb-6">
                        <h4 className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                          Tech Stack ({techOverlap} shared)
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech, techIndex) => {
                            const isShared = currentProject.technologies.includes(tech);
                            return (
                              <span
                                key={techIndex}
                                className={`px-2 py-1 rounded text-xs ${
                                  isShared 
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                                }`}
                              >
                                {tech}
                              </span>
                            );
                          })}
                          {project.technologies.length > 4 && (
                            <span className="px-2 py-1 rounded text-xs bg-gray-500/20 text-gray-400 border border-gray-500/30">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Related Score Indicator */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Related:</span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < Math.round(score * 5) ? 'opacity-100' : 'opacity-30'
                                }`}
                                style={{ backgroundColor: accent.primary }}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{project.year}</span>
                      </div>
                    </div>

                    {/* Hover Border Effect */}
                    <div 
                      className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                      style={{
                        borderColor: accent.primary,
                        boxShadow: `0 0 20px ${accent.primary}40`,
                      }}
                    />

                    {/* Hover Arrow */}
                    <motion.div
                      className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: accent.primary }}
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Back to Projects Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${colorAccents[currentProject.colorAccent].primary}20, ${colorAccents[currentProject.colorAccent].secondary}40)`,
              borderColor: `${colorAccents[currentProject.colorAccent].primary}50`,
              color: colorAccents[currentProject.colorAccent].primary,
            }}
          >
            <span>←</span>
            <span>Back to All Projects</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RelatedProjects;