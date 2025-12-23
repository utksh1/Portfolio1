"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterText, RevealText, NeonText } from "@/components/Effects/AnimatedText";
import CyberButton from "@/components/UI/CyberButton";
import { bootPhase1, bootPhase2, bootPhase3, bootPhase4 } from "@/lib/animations";

interface HeroSectionProps {
  bootComplete?: () => void;
}

export default function HeroSection({ bootComplete }: HeroSectionProps) {
  const [bootPhase, setBootPhase] = useState<1 | 2 | 3 | 4>(1);
  const [showName, setShowName] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Phase 1: System Initialization (0-1s)
    const phase1Timer = setTimeout(() => setBootPhase(2), 1000);
    
    // Phase 2: Background Environment (1-2s)
    const phase2Timer = setTimeout(() => setBootPhase(3), 2000);
    
    // Phase 3: Hero Content Reveal (2-3.5s)
    const nameTimer = setTimeout(() => setShowName(true), 2000);
    const roleTimer = setTimeout(() => setShowRole(true), 2500);
    const taglineTimer = setTimeout(() => setShowTagline(true), 3000);
    
    // Phase 4: Interactive Elements (3.5-4s)
    const buttonsTimer = setTimeout(() => {
      setBootPhase(4);
      setShowButtons(true);
      bootComplete?.();
    }, 3500);
    
    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
      clearTimeout(nameTimer);
      clearTimeout(roleTimer);
      clearTimeout(taglineTimer);
      clearTimeout(buttonsTimer);
    };
  }, [bootComplete]);

  // Tech symbols for phase 1
  const techSymbols = ["{}", "[]", "//", "/*", "*/", "<>", "$$", "##", "%%", "@@"];
  
  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Phase 1: System Initialization */}
      <AnimatePresence>
        {bootPhase === 1 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={bootPhase1}
          >
            <div className="text-center space-y-8">
              {/* Loading Bars */}
              <div className="space-y-3">
                <div className="boot-loading-bar w-48 mx-auto"></div>
                <div className="text-cyber-cyan text-sm font-mono uppercase tracking-wider">
                  Initializing Systems
                </div>
              </div>
              
              {/* Tech Symbols */}
              <div className="flex flex-wrap justify-center gap-4 max-w-md mx-auto">
                {techSymbols.slice(0, 6).map((symbol, index) => (
                  <motion.div
                    key={symbol}
                    className="tech-symbol text-cyber-cyan text-lg font-mono"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0.3, 1, 0.3], 
                      scale: [0.8, 1.2, 0.8] 
                    }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {symbol}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2-4: Hero Content */}
      {(bootPhase >= 2) && (
        <div className="text-center space-y-8 px-4">
          {/* Name */}
          <AnimatePresence>
            {showName && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 1.05 }}
                transition={{
                  duration: 1.5,
                  ease: [0.4, 0, 0.2, 1],
                  scale: { type: "spring", stiffness: 100, damping: 10 },
                }}
              >
                <NeonText color="cyan" className="text-6xl md:text-8xl font-cyber font-bold tracking-wider">
                  UTKARSH SINGH
                </NeonText>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Role */}
          <AnimatePresence>
            {showRole && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <RevealText className="text-2xl md:text-3xl text-cyber-blue font-mono">
                  Full-Stack Developer & Software Engineering Student
                </RevealText>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tagline */}
          <AnimatePresence>
            {showTagline && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <RevealText className="text-xl md:text-2xl text-cyber-cyan font-mono lowercase">
                  Engineering the future with code
                </RevealText>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Buttons */}
          <AnimatePresence>
            {showButtons && (
              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              >
                <CyberButton
                  variant="primary"
                  href="/projects"
                  size="large"
                >
                  EXPLORE PROJECTS
                </CyberButton>
                
                <CyberButton
                  variant="secondary"
                  href="/stack"
                  size="large"
                >
                  VIEW STACK
                </CyberButton>
                
                <CyberButton
                  variant="tertiary"
                  href="/terminal"
                  size="large"
                >
                  START MISSION
                </CyberButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}