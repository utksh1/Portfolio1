'use client';

import { Suspense, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { TechItem, techStack, orbitDistances, orbitSpeeds } from '@/lib/techStack';
import CoreHub from './CoreHub';
import TechNode from './TechNode';
import InfoPanel from './InfoPanel';

interface TechOrbitSceneProps {
  selectedCategory?: string;
  searchQuery?: string;
}

export default function TechOrbitScene({ selectedCategory, searchQuery }: TechOrbitSceneProps) {
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);

  // Filter technologies based on category and search
  const filteredTechStack = useMemo(() => {
    return techStack.filter(tech => {
      const matchesCategory = !selectedCategory || tech.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Group technologies by orbit
  const techByOrbit = useMemo(() => {
    const orbit1: TechItem[] = []; // Frontend - closest
    const orbit2: TechItem[] = []; // Backend & Core languages - middle  
    const orbit3: TechItem[] = []; // Database & DevOps - outer

    filteredTechStack.forEach(tech => {
      if (tech.category === 'Frontend') {
        orbit1.push(tech);
      } else if (tech.category === 'Backend') {
        orbit2.push(tech);
      } else {
        orbit3.push(tech);
      }
    });

    return { orbit1, orbit2, orbit3 };
  }, [filteredTechStack]);

  const handleNodeClick = (tech: TechItem) => {
    setSelectedTech(tech);
    setIsInfoPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsInfoPanelOpen(false);
    setSelectedTech(null);
  };

  const handleCoreClick = () => {
    // Reset view or show overview
    setIsInfoPanelOpen(false);
    setSelectedTech(null);
  };

  // Create tech nodes for each orbit
  const createOrbitNodes = (techs: TechItem[], orbitNumber: number) => {
    if (techs.length === 0) return null;

    const orbitRadius = orbitDistances[`Orbit${orbitNumber}` as keyof typeof orbitDistances];
    const orbitSpeed = orbitSpeeds[`Orbit${orbitNumber}` as keyof typeof orbitSpeeds];
    
    return techs.map((tech, index) => {
      const angle = (index / techs.length) * Math.PI * 2;
      const isActive = selectedTech?.id === tech.id;
      const isVisible = true;

      return (
        <TechNode
          key={tech.id}
          tech={tech}
          orbitRadius={orbitRadius}
          orbitSpeed={orbitSpeed}
          initialAngle={angle}
          onNodeClick={handleNodeClick}
          isActive={isActive}
          isVisible={isVisible}
        />
      );
    });
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-cyan-900/20">
      {/* 3D Scene */}
      <Canvas
        camera={{ 
          position: [0, 8, 12], 
          fov: 60,
          near: 0.1,
          far: 100
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.2} color="#404040" />
          <pointLight position={[0, 0, 0]} intensity={1} color="#00ff88" distance={20} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={0.3} 
            color="#ffffff"
            castShadow
          />
          <directionalLight 
            position={[-5, -3, -5]} 
            intensity={0.1} 
            color="#a855f7"
          />

          {/* Background Stars */}
          <Stars 
            radius={50} 
            depth={20} 
            count={2000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0.5}
          />

          {/* Core Hub */}
          <CoreHub 
            onClick={handleCoreClick}
            isActive={!isInfoPanelOpen && !selectedTech}
          />

          {/* Orbit Rings (Visual Guide) */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[orbitDistances.Orbit1 - 0.1, orbitDistances.Orbit1 + 0.1, 64]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.1} side={2} />
          </mesh>
          
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[orbitDistances.Orbit2 - 0.1, orbitDistances.Orbit2 + 0.1, 64]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.1} side={2} />
          </mesh>
          
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[orbitDistances.Orbit3 - 0.1, orbitDistances.Orbit3 + 0.1, 64]} />
            <meshBasicMaterial color="#0084ff" transparent opacity={0.1} side={2} />
          </mesh>

          {/* Technology Nodes */}
          {createOrbitNodes(techByOrbit.orbit1, 1)}
          {createOrbitNodes(techByOrbit.orbit2, 2)}
          {createOrbitNodes(techByOrbit.orbit3, 3)}

          {/* Camera Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={!selectedTech}
            autoRotateSpeed={0.5}
            minDistance={8}
            maxDistance={20}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 1.5}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>

      {/* Information Panel */}
      <InfoPanel
        tech={selectedTech}
        isOpen={isInfoPanelOpen}
        onClose={handleClosePanel}
      />

      {/* UI Overlay */}
      <div className="absolute top-6 left-6 z-10">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4">
          <h1 className="text-2xl font-bold text-white font-mono mb-2">
            Tech Stack
          </h1>
          <p className="text-cyan-400 text-sm">
            Click nodes to explore • Drag to rotate • Scroll to zoom
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-6 right-6 z-10">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4">
          <h3 className="text-white font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <span className="text-gray-300 text-sm">Frontend</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-gray-300 text-sm">Backend</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-300 text-sm">Database</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-pink-500"></div>
              <span className="text-gray-300 text-sm">DevOps</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      <Suspense 
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-cyan-400 font-mono">Loading 3D Tech Stack...</p>
            </div>
          </div>
        }
      >
        {/* This will be rendered when Canvas is ready */}
      </Suspense>
    </div>
  );
}