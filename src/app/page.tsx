"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootSequenceBackground from "@/components/Effects/BootSequenceBackground";
import HeroSection from "@/components/Home/HeroSection";
import { scrollHint } from "@/lib/animations";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [hideScrollHint, setHideScrollHint] = useState(false);

  const handleBootComplete = () => {
    setBootComplete(true);
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setHideScrollHint(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects - Always active for continuous animation */}
      <BootSequenceBackground isActive={true} />
      
      {/* Scanlines Overlay */}
      <div className="scanlines-overlay"></div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection bootComplete={handleBootComplete} />
      </div>

      {/* Scroll Hint */}
      <AnimatePresence>
        {bootComplete && !hideScrollHint && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex justify-center pb-8"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={scrollHint}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-cyber-cyan text-sm font-mono uppercase tracking-wider">
                SCROLL TO EXPLORE
              </span>
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-cyber-cyan"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <polyline points="6,9 12,15 18,9" strokeWidth="2" />
              </motion.svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}