'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TechOrbitScene from '@/components/Stack/TechOrbitScene';
import TechStackMobile from '@/components/Stack/TechStackMobile';

export default function Stack() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  // Detect mobile device and low-end device
  useEffect(() => {
    const checkDeviceCapabilities = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768;

      // Check for low-end device indicators
      const isLowEnd = isMobileDevice || 
        navigator.hardwareConcurrency < 4 || 
        (navigator as any).deviceMemory < 4 ||
        /iPhone|iPad|iPod|Android.*(?=.*\b(One|Moto|Redmi|Xiaomi|Pixel|Samsung).*\b)|(?=.*\b(SM-|SM-)[A-Z0-9]{6,}\b)/i.test(navigator.userAgent);

      setIsMobile(isMobileDevice);
      setIsLowEndDevice(isLowEnd);
    };

    checkDeviceCapabilities();
    
    // Re-check on resize
    window.addEventListener('resize', checkDeviceCapabilities);
    return () => window.removeEventListener('resize', checkDeviceCapabilities);
  }, []);

  // Show 3D scene for desktop and high-end devices
  const show3DScene = !isMobile && !isLowEndDevice;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        {/* Cyber Grid Background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-cyan-900/10"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(0, 255, 136, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {show3DScene ? (
          // 3D Interactive Scene
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-screen"
          >
            <TechOrbitScene
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          </motion.div>
        ) : (
          // Mobile/2D Fallback
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen"
          >
            <TechStackMobile
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onCategoryChange={setSelectedCategory}
              onSearchChange={setSearchQuery}
            />
          </motion.div>
        )}
      </div>

      {/* Performance Warning for Low-End Devices */}
      {isLowEndDevice && !isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-orange-500/20 border border-orange-400 rounded-lg p-4 backdrop-blur-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <p className="text-orange-400 text-sm font-medium">
              Using 2D view for optimal performance on your device
            </p>
            <button
              onClick={() => setIsLowEndDevice(false)}
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}

      {/* Category Filter Overlay (3D Scene Only) */}
      {show3DScene && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-6 left-6 z-20"
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4">
            <h3 className="text-white font-semibold mb-3">Filter Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {['All', 'Frontend', 'Backend', 'Database', 'DevOps'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
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

      {/* Search Overlay (3D Scene Only) */}
      {show3DScene && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="fixed bottom-6 right-6 z-20"
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4">
            <h3 className="text-white font-semibold mb-3">Search Technologies</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 bg-black/60 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}