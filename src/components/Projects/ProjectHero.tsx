"use client";

import React from "react";
import { motion } from "framer-motion";
import { pageEnterAnimation } from "@/lib/animations";
import { Project } from "@/lib/projects";
import { colorAccents } from "@/lib/projects";
import Link from "next/link";

interface ProjectHeroProps {
  project: Project;
}

const ProjectHero: React.FC<ProjectHeroProps> = ({ project }) => {
  const accent = colorAccents[project.colorAccent];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "in-development":
        return "text-blue-400";
      case "planned":
        return "text-purple-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✅";
      case "in-development":
        return "🚧";
      case "planned":
        return "📋";
      default:
        return "⏳";
    }
  };

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          rgba(0, 0, 0, 0.9) 0%, 
          rgba(${accent.secondary.replace('#', '')}, 0.1) 50%, 
          rgba(0, 0, 0, 0.9) 100%)`,
      }}
      variants={pageEnterAnimation}
      initial="initial"
      animate="animate"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: accent.primary,
              boxShadow: `0 0 10px ${accent.primary}`,
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, -100, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Status Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md"
            style={{
              backgroundColor: `${accent.border}`,
              borderColor: accent.primary,
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-lg">{getStatusIcon(project.status)}</span>
            <span className={`font-medium ${getStatusColor(project.status)}`}>
              {project.status.replace('-', ' ').toUpperCase()}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">{project.year}</span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              style={{
                background: `linear-gradient(45deg, ${accent.primary}, ${accent.secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: `0 0 30px ${accent.primary}40`,
              }}
            >
              {project.title}
            </h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-300 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {project.subtitle}
            </motion.p>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="p-4 rounded-xl backdrop-blur-md border border-gray-600/50">
              <div className="text-2xl font-bold text-cyan-400">{project.role}</div>
              <div className="text-sm text-gray-400">My Role</div>
            </div>
            <div className="p-4 rounded-xl backdrop-blur-md border border-gray-600/50">
              <div className="text-2xl font-bold text-purple-400">{project.year}</div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="p-4 rounded-xl backdrop-blur-md border border-gray-600/50">
              <div className="text-2xl font-bold text-green-400">{project.technologies.length}</div>
              <div className="text-sm text-gray-400">Technologies</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {project.links.github && (
              <Link
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-3 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${accent.primary}20, ${accent.secondary}40)`,
                  border: `1px solid ${accent.primary}50`,
                }}
              >
                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-lg">🔗</span>
                  <span className="font-medium" style={{ color: accent.primary }}>
                    GitHub
                  </span>
                </div>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${accent.primary}40, ${accent.secondary}60)`,
                  }}
                />
              </Link>
            )}

            {project.links.live && (
              <Link
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-3 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${accent.primary}20, ${accent.secondary}40)`,
                  border: `1px solid ${accent.primary}50`,
                }}
              >
                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-lg">🚀</span>
                  <span className="font-medium" style={{ color: accent.primary }}>
                    Live Demo
                  </span>
                </div>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${accent.primary}40, ${accent.secondary}60)`,
                  }}
                />
              </Link>
            )}

            {project.links.documentation && (
              <Link
                href={project.links.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-3 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${accent.primary}20, ${accent.secondary}40)`,
                  border: `1px solid ${accent.primary}50`,
                }}
              >
                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-lg">📚</span>
                  <span className="font-medium" style={{ color: accent.primary }}>
                    Docs
                  </span>
                </div>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${accent.primary}40, ${accent.secondary}60)`,
                  }}
                />
              </Link>
            )}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              className="w-6 h-10 border-2 rounded-full mx-auto flex justify-center"
              style={{ borderColor: accent.primary }}
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 rounded-full mt-2"
                style={{ background: accent.primary }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Custom CSS for grid animation */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </motion.section>
  );
};

export default ProjectHero;