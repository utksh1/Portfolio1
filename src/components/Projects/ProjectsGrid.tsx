"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, projectsData, projectCategories, projectStatus } from "@/lib/projects";
import MissionCard from "./MissionCard";
import { contentStagger, techCardSlideIn } from "@/lib/animations";

interface ProjectsGridProps {
  className?: string;
}

interface FilterState {
  category: string;
  status: string;
  sortBy: "recent" | "featured" | "alpha";
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ className = "" }) => {
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    status: "all",
    sortBy: "featured",
  });

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projectsData.filter((project) => {
      // Category filter
      if (filters.category !== "all") {
        if (filters.category === "featured") {
          return project.featured;
        }
        return project.category === filters.category;
      }
      
      // Status filter
      if (filters.status !== "all") {
        return project.status === filters.status;
      }
      
      return true;
    });

    // Sort projects
    switch (filters.sortBy) {
      case "recent":
        return filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));
      case "alpha":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case "featured":
      default:
        return filtered.sort((a, b) => {
          // Featured projects first, then by spotlight, then by year
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.spotlight && !b.spotlight) return -1;
          if (!a.spotlight && b.spotlight) return 1;
          return parseInt(b.year) - parseInt(a.year);
        });
    }
  }, [filters]);

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const hasActiveFilters = filters.category !== "all" || filters.status !== "all" || filters.sortBy !== "featured";

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Filter Controls */}
      <motion.div
        className="bg-black/20 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => handleFilterChange("category", category.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  filters.category === category.id
                    ? "bg-cyan-500/20 text-cyan-400 border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                    : "bg-white/5 text-gray-300 border border-gray-600 hover:border-cyan-500/30 hover:text-cyan-400"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="px-4 py-2 rounded-xl bg-black/30 border border-gray-600 text-white font-medium focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              {projectStatus.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value as FilterState["sortBy"])}
              className="px-4 py-2 rounded-xl bg-black/30 border border-gray-600 text-white font-medium focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              <option value="featured">Featured First</option>
              <option value="recent">Most Recent</option>
              <option value="alpha">A-Z</option>
            </select>
          </div>
        </div>

        {/* Active Filter Indicators */}
        {hasActiveFilters && (
          <motion.div
            className="mt-4 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm text-gray-400">Active filters:</span>
            {filters.category !== "all" && (
              <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
                Category: {projectCategories.find(c => c.id === filters.category)?.name}
              </span>
            )}
            {filters.status !== "all" && (
              <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                Status: {projectStatus.find(s => s.id === filters.status)?.name}
              </span>
            )}
            {filters.sortBy !== "featured" && (
              <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                Sort: {filters.sortBy}
              </span>
            )}
            <motion.button
              onClick={() => setFilters({ category: "all", status: "all", sortBy: "featured" })}
              className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded-full border border-red-500/30 hover:bg-red-500/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear All
            </motion.button>
          </motion.div>
        )}

        {/* Results count */}
        <motion.div
          className="mt-4 text-sm text-gray-400"
          key={filteredProjects.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
        </motion.div>
      </motion.div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${filters.category}-${filters.status}-${filters.sortBy}`}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center"
          variants={contentStagger}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={techCardSlideIn}
              custom={index}
              layout
            >
              <MissionCard
                project={project}
                index={index}
                className={project.spotlight ? "col-span-full xl:col-span-1" : ""}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* No results state */}
      {filteredProjects.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-400 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your filters to see more results.
          </p>
          <motion.button
            onClick={() => setFilters({ category: "all", status: "all", sortBy: "featured" })}
            className="px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/50 hover:bg-cyan-500/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear All Filters
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectsGrid;