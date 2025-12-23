"use client";

import { ReactNode } from "react";
import { useNavigation } from "@/hooks/useNavigation";
import Sidebar from "@/components/Navigation/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { pageEnterAnimation } from "@/lib/animations";
import { Menu } from "lucide-react";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { currentPath, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useNavigation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-mono selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(rgba(0,255,136,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-slate-950/80" />

      {/* Mobile Header / Hamburger */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/20 z-40 flex items-center justify-between px-4">
        <span className="font-cyber text-lg text-cyan-400 tracking-wider shadow-cyan-500/50 drop-shadow-sm">PORTFOLIO_OS</span>
        <button 
          onClick={toggleMobileMenu}
          className="p-2 text-cyan-400 hover:bg-cyan-900/20 rounded-lg transition-colors border border-cyan-500/30"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
      </header>

      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu} 
        currentPath={currentPath} 
      />

      {/* Main Content Area */}
      <div className="md:pl-64 min-h-screen transition-all duration-300 relative z-10">
        <AnimatePresence mode="wait">
          <motion.main
            key={currentPath}
            variants={pageEnterAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className="pt-20 md:pt-8 px-4 md:px-8 lg:px-12 pb-12 max-w-7xl mx-auto min-h-[calc(100vh-2rem)]"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
