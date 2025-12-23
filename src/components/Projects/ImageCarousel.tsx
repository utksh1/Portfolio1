"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colorAccents } from "@/lib/projects";
import { Project } from "@/lib/projects";

interface ImageCarouselProps {
  project: Project;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ project }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const accent = colorAccents[project.colorAccent];
  const screenshots = project.screenshots;

  // Auto-advance carousel
  useEffect(() => {
    if (screenshots.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [screenshots.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isModalOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentIndex(prev => prev === 0 ? screenshots.length - 1 : prev - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setCurrentIndex(prev => prev === screenshots.length - 1 ? 0 : prev + 1);
          break;
        case ' ':
          e.preventDefault();
          setModalImageIndex(currentIndex);
          setIsModalOpen(true);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, screenshots.length, isModalOpen]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? screenshots.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev === screenshots.length - 1 ? 0 : prev + 1);
  };

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (screenshots.length === 0) {
    return (
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center p-12 rounded-2xl bg-black/40 backdrop-blur-md border border-gray-600/50">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: accent.primary }}>
              Screenshots Coming Soon
            </h3>
            <p className="text-gray-400">
              Visual documentation of this project is currently being prepared. 
              Check back later for comprehensive screenshots and demos.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 relative" ref={carouselRef}>
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
                background: `linear-gradient(45deg, ${accent.primary}, ${accent.secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Project Visuals
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore the user interface and key features through these screenshots. 
              Click any image to view in full detail.
            </p>
          </motion.div>

          {/* Main Carousel */}
          <div className="relative max-w-5xl mx-auto">
            {/* Main Image Display */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md border border-gray-600/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  className="absolute inset-0 cursor-pointer group"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => openModal(currentIndex)}
                >
                  {/* Placeholder for actual images - using div with gradient background */}
                  <div 
                    className="w-full h-full flex items-center justify-center relative"
                    style={{
                      background: `linear-gradient(135deg, ${accent.primary}20, ${accent.secondary}40)`,
                    }}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">📱</div>
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {screenshots[currentIndex].title}
                      </h3>
                      <p className="text-gray-300 max-w-md mx-auto">
                        {screenshots[currentIndex].description}
                      </p>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-4xl mb-2">🔍</div>
                        <p className="text-sm">Click to view full size</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  {screenshots.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToPrevious();
                        }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 backdrop-blur-md"
                      >
                        ←
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToNext();
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 backdrop-blur-md"
                      >
                        →
                      </button>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            {screenshots.length > 1 && (
              <div className="flex justify-center mt-6 space-x-3">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'scale-125' : 'opacity-50'
                    }`}
                    style={{
                      backgroundColor: index === currentIndex ? accent.primary : '#6b7280',
                      boxShadow: index === currentIndex ? `0 0 20px ${accent.primary}50` : 'none',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Image Counter */}
            <div className="text-center mt-4">
              <span className="text-sm text-gray-400">
                {currentIndex + 1} of {screenshots.length}
              </span>
            </div>

            {/* Keyboard Hints */}
            <div className="text-center mt-6 text-xs text-gray-500">
              <span className="inline-flex items-center gap-4">
                <span>← → Arrow keys to navigate</span>
                <span>•</span>
                <span>Space to view full size</span>
              </span>
            </div>
          </div>

          {/* Thumbnail Grid (Optional) */}
          {screenshots.length > 1 && (
            <motion.div
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {screenshots.map((screenshot, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentIndex ? 'scale-105' : 'hover:scale-102'
                  }`}
                  style={{
                    borderColor: index === currentIndex ? accent.primary : 'rgba(255, 255, 255, 0.2)',
                    boxShadow: index === currentIndex ? `0 0 20px ${accent.primary}40` : 'none',
                  }}
                  whileHover={{ y: -2 }}
                >
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${accent.primary}30, ${accent.secondary}50)`,
                    }}
                  >
                    <div className="text-center p-2">
                      <div className="text-lg mb-1">📱</div>
                      <div className="text-xs text-gray-300 leading-tight">
                        {screenshot.title}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal for Full-Size Images */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 backdrop-blur-md"
              >
                ✕
              </button>

              {/* Navigation Arrows in Modal */}
              {screenshots.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      setModalImageIndex(prev => prev === 0 ? screenshots.length - 1 : prev - 1);
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 backdrop-blur-md z-10"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => {
                      setModalImageIndex(prev => prev === screenshots.length - 1 ? 0 : prev + 1);
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 backdrop-blur-md z-10"
                  >
                    →
                  </button>
                </>
              )}

              {/* Modal Image */}
              <div className="relative max-w-full max-h-full">
                <div 
                  className="w-full h-full flex items-center justify-center relative"
                  style={{
                    background: `linear-gradient(135deg, ${accent.primary}20, ${accent.secondary}40)`,
                  }}
                >
                  <div className="text-center">
                    <div className="text-8xl mb-4">📱</div>
                    <h3 className="text-2xl font-semibold mb-2 text-white">
                      {screenshots[modalImageIndex].title}
                    </h3>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                      {screenshots[modalImageIndex].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-2 rounded-full bg-black/50 text-white text-sm backdrop-blur-md">
                  {modalImageIndex + 1} of {screenshots.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageCarousel;