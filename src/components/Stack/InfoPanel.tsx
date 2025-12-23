'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Code, Briefcase } from 'lucide-react';
import { TechItem } from '@/lib/techStack';

interface InfoPanelProps {
  tech: TechItem | null;
  isOpen: boolean;
  onClose: () => void;
}

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

export default function InfoPanel({ tech, isOpen, onClose }: InfoPanelProps) {
  if (!tech) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border-l border-cyan-500/30 shadow-2xl z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-sm border-b border-cyan-500/30 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ backgroundColor: tech.color + '20', border: `2px solid ${tech.color}` }}
                  >
                    {tech.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white font-mono">
                      {tech.name}
                    </h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: tech.color + '40', border: `1px solid ${tech.color}` }}
                      >
                        {tech.category}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-cyan-400" />
                  Description
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {tech.description}
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
                    <span className="text-gray-300">{tech.proficiency}</span>
                    <span className="text-sm text-gray-400">
                      {tech.proficiency === 'Expert' ? 'Advanced' : tech.proficiency === 'Intermediate' ? 'Intermediate' : 'Learning'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: proficiencyWidths[tech.proficiency] }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-2 rounded-full ${proficiencyColors[tech.proficiency]}`}
                      style={{ boxShadow: `0 0 10px ${tech.color}` }}
                    />
                  </div>
                </div>
              </div>

              {/* Experience */}
              {tech.yearsExperience && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-cyan-400" />
                    Experience
                  </h3>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: tech.color + '20' }}
                      >
                        <span className="text-sm font-bold text-white">
                          {tech.yearsExperience}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {tech.yearsExperience} year{tech.yearsExperience > 1 ? 's' : ''}
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
                  {tech.relatedProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50 hover:border-cyan-500/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: tech.color }}
                        />
                        <span className="text-gray-300">{project}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technical Details */}
              <div className="bg-gradient-to-r from-cyan-900/10 to-purple-900/10 rounded-lg p-4 border border-cyan-500/20">
                <h4 className="text-sm font-semibold text-cyan-400 mb-2">TECHNICAL DETAILS</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Category</p>
                    <p className="text-white font-medium">{tech.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">ID</p>
                    <p className="text-white font-mono">{tech.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}