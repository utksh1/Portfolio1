"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { colorAccents } from "@/lib/projects";
import { Project } from "@/lib/projects";

interface BreadcrumbProps {
  project?: Project;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ project }) => {
  const pathname = usePathname();
  const accent = project ? colorAccents[project.colorAccent] : colorAccents.cyan;

  const breadcrumbItems = [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "Projects", href: "/projects", icon: "🚀" },
    ...(project ? [{ name: project.title, href: pathname, icon: "⚡" }] : [])
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-600/50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item.href}>
              {index > 0 && (
                <motion.div
                  className="text-gray-500"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  →
                </motion.div>
              )}
              
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.1 }}
              >
                <span className="text-lg">{item.icon}</span>
                {index === breadcrumbItems.length - 1 ? (
                  <span 
                    className="font-medium"
                    style={{ 
                      color: accent.primary,
                      textShadow: `0 0 10px ${accent.primary}50` 
                    }}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            </React.Fragment>
          ))}
        </div>

        {/* Project Status Indicator (if project) */}
        {project && (
          <motion.div
            className="flex items-center gap-4 mt-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md"
                 style={{
                   backgroundColor: `${accent.border}`,
                   borderColor: accent.primary,
                 }}>
              <span className="text-sm">
                {project.status === 'completed' ? '✅' : 
                 project.status === 'in-development' ? '🚧' : '📋'}
              </span>
              <span className="text-xs text-gray-300 capitalize">
                {project.status.replace('-', ' ')}
              </span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-gray-600/50">
              <span className="text-sm">🎯</span>
              <span className="text-xs text-gray-300">{project.role}</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-gray-600/50">
              <span className="text-sm">📅</span>
              <span className="text-xs text-gray-300">{project.year}</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom glow effect */}
      <div 
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent.primary}, transparent)`,
        }}
      />
    </motion.nav>
  );
};

export default Breadcrumb;