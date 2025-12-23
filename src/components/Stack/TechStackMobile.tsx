'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ExternalLink, Calendar, Code, Briefcase } from 'lucide-react';
import { TechItem, techStack, categoryColors } from '@/lib/techStack';

interface TechStackMobileProps {
  selectedCategory?: string;
  searchQuery?: string;
  onCategoryChange?: (category: string) => void;
  onSearchChange?: (query: string) => void;
}

export default function TechStackMobile({ 
  selectedCategory, 
  searchQuery, 
  onCategoryChange, 
  onSearchChange 
}: TechStackMobileProps) {
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps'];

  // Filter technologies
  const filteredTechStack = useMemo(() => {
    return techStack.filter(tech => {
      const matchesCategory = !selectedCategory || selectedCategory === 'All' || tech.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Group by category for better organization
  const groupedTech = useMemo(() => {
    const groups: { [key: string]: TechItem[] } = {};
    filteredTechStack.forEach(tech => {
      if (!groups[tech.category]) {
        groups[tech.category] = [];
      }
      groups[tech.category].push(tech);
    });
    return groups;
  }, [filteredTechStack]);

  const proficiencyColors = {
    Beginner: 'bg-yellow-500',
    Intermediate: 'bg-orange-500', 
    Expert: 'bg-green-500'
  };

  const proficiencyWidths = {
    Beginner: 'w-1/3',
    Intermediate: 'w-2/3',
    Expert: 'w-full'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-cyan-900/20 p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white font-mono mb-2">
          Tech Stack
        </h1>
        <p className="text-cyan-400 text-sm">
          Mobile-optimized tech overview
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex space-x-2 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search technologies..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`px-4 py-3 rounded-lg border transition-colors ${
            isFilterOpen 
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' 
              : 'bg-black/40 border-cyan-500/30 text-gray-400 hover:border-cyan-400'
          }`}
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Category Filter */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4">
              <h3 className="text-white font-semibold mb-3">Filter by Category</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      onCategoryChange?.(category === 'All' ? '' : category);
                      setIsFilterOpen(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      (selectedCategory === category) || (selectedCategory === '' && category === 'All')
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400'
                        : 'bg-gray-800/50 text-gray-300 border border-gray-600 hover:border-cyan-400'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tech Grid */}
      <div className="space-y-8">
        {Object.entries(groupedTech).map(([category, techs]) => (
          <div key={category}>
            <h2 className="text-xl font-bold text-white font-mono mb-4 flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: categoryColors[category as keyof typeof categoryColors] }}
              />
              {category}
              <span className="ml-2 text-sm text-gray-400">({techs.length})</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {techs.map((tech, index) => (
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedTech(tech)}
                  className="bg-black/40 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4 hover:border-cyan-500/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: tech.color + '20', border: `2px solid ${tech.color}` }}
                    >
                      {tech.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold mb-1 group-hover:text-cyan-400 transition-colors">
                        {tech.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {tech.description}
                      </p>
                      
                      {/* Proficiency Bar */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">Proficiency</span>
                          <span className="text-xs text-gray-400">{tech.proficiency}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: proficiencyWidths[tech.proficiency] }}
                            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                            className={`h-1.5 rounded-full ${proficiencyColors[tech.proficiency]}`}
                          />
                        </div>
                      </div>

                      {tech.yearsExperience && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {tech.yearsExperience} year{tech.yearsExperience > 1 ? 's' : ''} experience
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tech Detail Modal */}
      <AnimatePresence>
        {selectedTech && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setSelectedTech(null)}
            />

            {/* Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-h-[80vh] bg-gradient-to-br from-slate-900 to-slate-800 border-t border-cyan-500/30 shadow-2xl z-50 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-sm border-b border-cyan-500/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                      style={{ backgroundColor: selectedTech.color + '20', border: `2px solid ${selectedTech.color}` }}
                    >
                      {selectedTech.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white font-mono">
                        {selectedTech.name}
                      </h2>
                      <span 
                        className="px-2 py-1 rounded text-xs font-medium text-white"
                        style={{ backgroundColor: selectedTech.color + '40', border: `1px solid ${selectedTech.color}` }}
                      >
                        {selectedTech.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTech(null)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-cyan-400" />
                    Description
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedTech.description}
                  </p>
                </div>

                {/* Proficiency */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-cyan-400" />
                    Proficiency Level
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">{selectedTech.proficiency}</span>
                      <span className="text-sm text-gray-400">
                        {selectedTech.proficiency === 'Expert' ? 'Advanced' : selectedTech.proficiency === 'Intermediate' ? 'Intermediate' : 'Learning'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: proficiencyWidths[selectedTech.proficiency] }}
                        transition={{ duration: 1 }}
                        className={`h-2 rounded-full ${proficiencyColors[selectedTech.proficiency]}`}
                        style={{ boxShadow: `0 0 10px ${selectedTech.color}` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Experience */}
                {selectedTech.yearsExperience && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-cyan-400" />
                      Experience
                    </h3>
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: selectedTech.color + '20' }}
                        >
                          <span className="text-sm font-bold text-white">
                            {selectedTech.yearsExperience}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {selectedTech.yearsExperience} year{selectedTech.yearsExperience > 1 ? 's' : ''}
                          </p>
                          <p className="text-sm text-gray-400">
                            of practical experience
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Related Projects */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <ExternalLink className="w-5 h-5 mr-2 text-cyan-400" />
                    Related Projects
                  </h3>
                  <div className="space-y-2">
                    {selectedTech.relatedProjects.map((project, index) => (
                      <div
                        key={index}
                        className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50"
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: selectedTech.color }}
                          />
                          <span className="text-gray-300">{project}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* No Results */}
      {filteredTechStack.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No technologies found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
          <button
            onClick={() => {
              onSearchChange?.('');
              onCategoryChange?.('');
            }}
            className="px-4 py-2 bg-cyan-500/20 border border-cyan-400 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}