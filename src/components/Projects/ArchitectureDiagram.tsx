"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { colorAccents } from "@/lib/projects";
import { Project } from "@/lib/projects";

interface ArchitectureDiagramProps {
  project: Project;
}

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ project }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const accent = colorAccents[project.colorAccent];

  // Parse ASCII diagram into structured components
  const parseDiagram = (diagram: string) => {
    const lines = diagram.trim().split('\n');
    const components: Array<{ lines: string[], type: string }> = [];
    let currentComponent: string[] = [];
    let componentType = 'unknown';

    lines.forEach(line => {
      if (line.includes('┌')) {
        if (currentComponent.length > 0) {
          components.push({ lines: [...currentComponent], type: componentType });
        }
        currentComponent = [line];
        componentType = 'layer';
      } else if (line.includes('│') || line.includes('◄') || line.includes('─') || line.includes('┐') || line.includes('┘')) {
        currentComponent.push(line);
      } else if (line.trim() === '' || line.includes('◄──►')) {
        if (currentComponent.length > 0) {
          components.push({ lines: [...currentComponent], type: componentType });
          currentComponent = [];
        }
      }
    });

    if (currentComponent.length > 0) {
      components.push({ lines: currentComponent, type: componentType });
    }

    return components.filter(comp => comp.lines.length > 2);
  };

  const components = parseDiagram(project.architecture.diagram);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const componentVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.02,
      },
    },
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
            System Architecture
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-lg text-gray-400 leading-relaxed">
              <span className="font-semibold" style={{ color: accent.primary }}>
                {project.architecture.type}:
              </span> {project.architecture.description}
            </p>
          </div>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Main Diagram Container */}
          <div className="relative">
            {/* Background Grid */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Diagram Content */}
            <div className="relative bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-gray-600/50 overflow-x-auto">
              <motion.div
                className="font-mono text-sm md:text-base leading-relaxed whitespace-pre"
                variants={textVariants}
              >
                {/* Render each line with character-by-character animation */}
                {project.architecture.diagram.split('\n').map((line, lineIndex) => (
                  <motion.span
                    key={lineIndex}
                    className="inline-block"
                    variants={textVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: lineIndex * 0.01 }}
                    style={{
                      color: getLineColor(line),
                    }}
                  >
                    {line.split('').map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        className="inline-block"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ 
                          delay: lineIndex * 0.01 + charIndex * 0.005,
                          duration: 0.3 
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    {'\n'}
                  </motion.span>
                ))}
              </motion.div>

              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${accent.primary}20, ${accent.secondary}10, transparent)`,
                  boxShadow: `0 0 50px ${accent.primary}30`,
                }}
              />
            </div>

            {/* Floating Connection Dots */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="w-3 h-3 rounded-full"
                style={{ 
                  background: accent.primary,
                  boxShadow: `0 0 20px ${accent.primary}`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          {/* Architecture Explanation */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
          >
            <div className="p-6 rounded-xl bg-black/40 backdrop-blur-md border border-gray-600/50">
              <div className="text-2xl mb-3">🏗️</div>
              <h4 className="text-lg font-semibold mb-3" style={{ color: accent.primary }}>
                Layer Separation
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Clear separation of concerns with distinct layers for presentation, 
                business logic, and data management.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-black/40 backdrop-blur-md border border-gray-600/50">
              <div className="text-2xl mb-3">⚡</div>
              <h4 className="text-lg font-semibold mb-3" style={{ color: accent.primary }}>
                Real-time Communication
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Bi-directional data flow with WebSocket connections for 
                instant updates and collaborative features.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-black/40 backdrop-blur-md border border-gray-600/50">
              <div className="text-2xl mb-3">🔒</div>
              <h4 className="text-lg font-semibold mb-3" style={{ color: accent.primary }}>
                Security & Performance
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Secure authentication, efficient caching, and optimized 
                database queries ensure both safety and speed.
              </p>
            </div>
          </motion.div>

          {/* Architecture Benefits */}
          <motion.div
            className="mt-12 text-center p-8 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${accent.primary}10, ${accent.secondary}20)`,
              border: `1px solid ${accent.primary}30`,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: accent.primary }}>
              Architecture Benefits
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="text-left">
                <h5 className="font-medium text-white mb-2">✅ Scalability</h5>
                <p className="text-gray-400 text-sm">
                  Modular design allows for easy scaling and component reuse
                </p>
              </div>
              <div className="text-left">
                <h5 className="font-medium text-white mb-2">✅ Maintainability</h5>
                <p className="text-gray-400 text-sm">
                  Clear separation makes code easy to understand and modify
                </p>
              </div>
              <div className="text-left">
                <h5 className="font-medium text-white mb-2">✅ Performance</h5>
                <p className="text-gray-400 text-sm">
                  Optimized data flow and efficient resource utilization
                </p>
              </div>
              <div className="text-left">
                <h5 className="font-medium text-white mb-2">✅ Security</h5>
                <p className="text-gray-400 text-sm">
                  Built-in security patterns and authentication mechanisms
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Helper function to color different parts of the architecture diagram
const getLineColor = (line: string): string => {
  if (line.includes('┌') || line.includes('┐') || line.includes('┘') || line.includes('└')) {
    return '#00ffff'; // Cyan for borders
  }
  if (line.includes('│')) {
    return '#ffffff'; // White for content
  }
  if (line.includes('◄──►')) {
    return '#8b5cf6'; // Purple for connections
  }
  if (line.includes('•')) {
    return '#00ff88'; // Green for bullet points
  }
  if (line.includes('Layer') || line.includes('API') || line.includes('Database')) {
    return '#3b82f6'; // Blue for layer names
  }
  return '#e5e7eb'; // Light gray for other text
};

export default ArchitectureDiagram;