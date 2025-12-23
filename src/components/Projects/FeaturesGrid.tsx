"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { colorAccents } from "@/lib/projects";
import { Project } from "@/lib/projects";

interface FeaturesGridProps {
  project: Project;
}

const FeaturesGrid: React.FC<FeaturesGridProps> = ({ project }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const accent = colorAccents[project.colorAccent];

  // Generate icons for features based on keywords
  const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    
    if (lowerFeature.includes('auth') || lowerFeature.includes('login') || lowerFeature.includes('permission')) {
      return "🔐";
    }
    if (lowerFeature.includes('notification') || lowerFeature.includes('alert')) {
      return "🔔";
    }
    if (lowerFeature.includes('real-time') || lowerFeature.includes('live') || lowerFeature.includes('websocket')) {
      return "⚡";
    }
    if (lowerFeature.includes('dashboard') || lowerFeature.includes('analytics') || lowerFeature.includes('monitoring')) {
      return "📊";
    }
    if (lowerFeature.includes('ai') || lowerFeature.includes('intelligent') || lowerFeature.includes('smart')) {
      return "🤖";
    }
    if (lowerFeature.includes('collaboration') || lowerFeature.includes('team') || lowerFeature.includes('shared')) {
      return "👥";
    }
    if (lowerFeature.includes('security') || lowerFeature.includes('secure') || lowerFeature.includes('encryption')) {
      return "🛡️";
    }
    if (lowerFeature.includes('automation') || lowerFeature.includes('auto') || lowerFeature.includes('workflow')) {
      return "⚙️";
    }
    if (lowerFeature.includes('mobile') || lowerFeature.includes('responsive') || lowerFeature.includes('device')) {
      return "📱";
    }
    if (lowerFeature.includes('database') || lowerFeature.includes('storage') || lowerFeature.includes('data')) {
      return "💾";
    }
    if (lowerFeature.includes('api') || lowerFeature.includes('integration') || lowerFeature.includes('service')) {
      return "🔌";
    }
    if (lowerFeature.includes('performance') || lowerFeature.includes('speed') || lowerFeature.includes('optimization')) {
      return "🚀";
    }
    if (lowerFeature.includes('ui') || lowerFeature.includes('design') || lowerFeature.includes('interface')) {
      return "🎨";
    }
    if (lowerFeature.includes('report') || lowerFeature.includes('statistics') || lowerFeature.includes('metrics')) {
      return "📈";
    }
    
    return "⚡"; // Default
  };

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
            Key Features & Capabilities
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Each feature has been carefully designed and implemented to solve real-world problems 
            and enhance user experience through innovative solutions and cutting-edge technology.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {project.features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative p-6 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(0, 0, 0, 0.8) 0%, 
                  rgba(${accent.secondary.replace('#', '')}, 0.1) 100%)`,
                border: `1px solid ${accent.primary}30`,
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
              }}
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px ${accent.primary}20`,
                transition: { duration: 0.3 }
              }}
            >
              {/* Background Glow Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${accent.primary}10, transparent 70%)`,
                }}
              />

              {/* Corner Accent */}
              <div 
                className="absolute top-0 right-0 w-20 h-20 opacity-20"
                style={{
                  background: `conic-gradient(from 0deg, ${accent.primary}, transparent)`,
                  clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {getFeatureIcon(feature)}
                </div>

                {/* Feature Title */}
                <h3 
                  className="text-xl font-semibold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(45deg, ${accent.primary}, ${accent.secondary})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {feature}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {getFeatureDescription(feature, project.category)}
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
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          className="mt-16 h-1 w-32 mx-auto rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent.primary}, transparent)`,
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: 128, opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </div>
    </section>
  );
};

// Helper function to generate feature descriptions
const getFeatureDescription = (feature: string, category: string): string => {
  const lowerFeature = feature.toLowerCase();
  
  if (lowerFeature.includes('multi-role') || lowerFeature.includes('role-based')) {
    return "Advanced permission system supporting multiple user roles with granular access control and security.";
  }
  if (lowerFeature.includes('auth') || lowerFeature.includes('authentication')) {
    return "Secure JWT-based authentication with refresh tokens and session management for maximum security.";
  }
  if (lowerFeature.includes('approval') || lowerFeature.includes('workflow')) {
    return "Streamlined approval processes with automated notifications and audit trails for governance.";
  }
  if (lowerFeature.includes('notification') || lowerFeature.includes('alert')) {
    return "Real-time notification system with multi-channel delivery and customizable alert preferences.";
  }
  if (lowerFeature.includes('ai') || lowerFeature.includes('intelligent')) {
    return "AI-powered features providing intelligent suggestions and automated assistance for enhanced productivity.";
  }
  if (lowerFeature.includes('real-time') || lowerFeature.includes('live')) {
    return "Live updates and synchronization across all connected users using WebSocket technology.";
  }
  if (lowerFeature.includes('dashboard') || lowerFeature.includes('analytics')) {
    return "Comprehensive analytics dashboard with real-time metrics and historical data visualization.";
  }
  if (lowerFeature.includes('collaboration') || lowerFeature.includes('team')) {
    return "Seamless collaborative features enabling teams to work together efficiently and effectively.";
  }
  if (lowerFeature.includes('responsive') || lowerFeature.includes('mobile')) {
    return "Fully responsive design optimized for all devices with touch-friendly interfaces.";
  }
  if (lowerFeature.includes('performance') || lowerFeature.includes('optimization')) {
    return "Optimized performance with efficient algorithms and caching strategies for maximum speed.";
  }
  if (lowerFeature.includes('security') || lowerFeature.includes('secure')) {
    return "Enterprise-grade security with encryption, secure APIs, and comprehensive data protection.";
  }
  if (lowerFeature.includes('automation') || lowerFeature.includes('workflow')) {
    return "Automated workflows reducing manual tasks and improving operational efficiency.";
  }
  
  return "Innovative feature designed to enhance user experience and solve complex technical challenges.";
};

export default FeaturesGrid;