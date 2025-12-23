"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { colorAccents } from "@/lib/projects";
import { Project } from "@/lib/projects";
import ProjectHero from "@/components/Projects/ProjectHero";
import FeaturesGrid from "@/components/Projects/FeaturesGrid";
import TechStackSection from "@/components/Projects/TechStackSection";
import ArchitectureDiagram from "@/components/Projects/ArchitectureDiagram";
import ImageCarousel from "@/components/Projects/ImageCarousel";
import TimelineComponent from "@/components/Projects/TimelineComponent";
import RelatedProjects from "@/components/Projects/RelatedProjects";
import Breadcrumb from "@/components/Projects/Breadcrumb";

interface ClientProjectPageProps {
  project: Project | undefined;
  slug: string;
}

const ClientProjectPage: React.FC<ClientProjectPageProps> = ({ project, slug }) => {
  const overviewRef = useRef(null);
  const isOverviewInView = useInView(overviewRef, { once: true, margin: "-100px" });

  // If project not found, show 404
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl">🚀</div>
          <h1 className="text-4xl font-bold text-white">Project Not Found</h1>
          <p className="text-gray-400 max-w-md">
            The project you're looking for doesn't exist or may have been moved.
          </p>
          <a
            href="/projects"
            className="inline-block px-6 py-3 rounded-xl border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition-colors duration-200"
          >
            ← Back to Projects
          </a>
        </motion.div>
      </div>
    );
  }

  const accent = colorAccents[project.colorAccent];

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      {/* Fixed Navigation */}
      <Breadcrumb project={project} />
      
      {/* Hero Section */}
      <ProjectHero project={project} />

      {/* Main Content */}
      <div className="relative">
        {/* Project Overview Section */}
        <section className="py-20 relative" ref={overviewRef}>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={isOverviewInView ? { opacity: 1, y: 0 } : {}}
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
                  Project Overview
                </h2>
              </motion.div>

              {/* Overview Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Problem Statement */}
                <motion.div
                  className="p-8 rounded-2xl backdrop-blur-md border border-gray-600/50"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(0, 0, 0, 0.8) 0%, 
                      rgba(${accent.secondary.replace('#', '')}, 0.05) 100%)`,
                  }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isOverviewInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="text-3xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: accent.primary }}>
                    Problem Statement
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.problemStatement}
                  </p>
                </motion.div>

                {/* Solution Approach */}
                <motion.div
                  className="p-8 rounded-2xl backdrop-blur-md border border-gray-600/50"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(0, 0, 0, 0.8) 0%, 
                      rgba(${accent.secondary.replace('#', '')}, 0.1) 100%)`,
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isOverviewInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="text-3xl mb-4">💡</div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: accent.primary }}>
                    Solution Approach
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.solutionApproach}
                  </p>
                </motion.div>

                {/* Impact Results */}
                <motion.div
                  className="p-8 rounded-2xl backdrop-blur-md border border-gray-600/50"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(0, 0, 0, 0.8) 0%, 
                      rgba(${accent.secondary.replace('#', '')}, 0.15) 100%)`,
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isOverviewInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <div className="text-3xl mb-4">📈</div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: accent.primary }}>
                    Impact & Results
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.impactResults}
                  </p>
                </motion.div>
              </div>

              {/* Stats Section */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isOverviewInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {project.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 rounded-xl backdrop-blur-md border border-gray-600/50"
                    style={{
                      background: `linear-gradient(135deg, ${accent.primary}10, ${accent.secondary}20)`,
                      borderColor: `${accent.primary}30`,
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px ${accent.primary}20`,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div 
                      className="text-3xl font-bold mb-2"
                      style={{ color: accent.primary }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-white font-medium mb-1">{stat.label}</div>
                    <div className="text-gray-400 text-sm">{stat.description}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeaturesGrid project={project} />

        {/* Tech Stack Section */}
        <TechStackSection project={project} />

        {/* Architecture Diagram Section */}
        <ArchitectureDiagram project={project} />

        {/* Screenshots Section */}
        <ImageCarousel project={project} />

        {/* Timeline/Journey Section */}
        <TimelineComponent project={project} />

        {/* Related Projects Section */}
        <RelatedProjects currentProject={project} />

        {/* Get In Touch CTA */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-4xl mx-auto text-center p-12 rounded-3xl"
              style={{
                background: `linear-gradient(135deg, ${accent.primary}10, ${accent.secondary}30)`,
                border: `2px solid ${accent.primary}40`,
                boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 40px ${accent.primary}20`,
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-6xl mb-6">🚀</div>
              <h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{
                  background: `linear-gradient(45deg, ${accent.primary}, ${accent.secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Let's Collaborate
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Interested in working together or learning more about this project? 
                I'd love to discuss potential collaborations, answer questions, 
                or explore how we can build something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
                    color: 'white',
                    boxShadow: `0 10px 30px ${accent.primary}40`,
                  }}
                >
                  <span>📧</span>
                  <span>Get In Touch</span>
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: `${accent.primary}50`,
                    color: accent.primary,
                    backgroundColor: `${accent.primary}10`,
                  }}
                >
                  <span>🚀</span>
                  <span>View All Projects</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full opacity-5"
              style={{
                background: `radial-gradient(circle, ${accent.primary}, transparent)`,
                filter: 'blur(40px)',
              }}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              }}
              animate={{
                x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)],
                y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-gray-600/50 flex items-center justify-center">
          <motion.div
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: accent.primary }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ClientProjectPage;