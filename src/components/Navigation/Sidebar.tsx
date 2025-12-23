import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, User, Cpu, Briefcase, GitBranch, Mail, Terminal, 
  FlaskConical, Bot, FileText, Github, Linkedin, Twitter, X 
} from "lucide-react";
import { navigationRoutes, externalLinks, socialLinks } from "@/lib/constants";
import { clsx } from "clsx";

const iconMap: Record<string, any> = {
  Home, User, Cpu, Briefcase, GitBranch, Mail, Terminal, FlaskConical, Bot, FileText
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export default function Sidebar({ isOpen, onClose, currentPath }: SidebarProps) {
  
  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950/90 backdrop-blur-md border-r border-cyan-500/30 shadow-[0_0_15px_rgba(0,255,136,0.1)]">
      {/* Header / Logo */}
      <div className="p-6 border-b border-cyan-500/20">
         <Link href="/" onClick={onClose}>
           <h1 className="font-cyber text-2xl text-cyan-400 tracking-wider hover:text-cyan-300 transition-colors cursor-pointer drop-shadow-[0_0_5px_rgba(0,255,136,0.5)]">
             PORTFOLIO_OS
           </h1>
         </Link>
         <p className="text-xs text-purple-400 mt-1 font-mono">v2.0.24 SYSTEM ACTIVE</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 scrollbar-hide">
        {navigationRoutes.map((route) => {
          const Icon = iconMap[route.icon];
          const isActive = currentPath === route.path;
          
          return (
            <Link 
              key={route.path} 
              href={route.path}
              onClick={onClose}
              className={clsx(
                "group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative overflow-hidden",
                isActive 
                  ? "bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(0,255,136,0.2)]" 
                  : "text-slate-400 hover:text-cyan-300 hover:bg-cyan-900/20"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_10px_#00ff88]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              {Icon && (
                <Icon size={20} className={clsx("transition-transform duration-300 group-hover:scale-110", isActive && "text-cyan-400")} />
              )}
              <span className="font-mono text-sm tracking-wide relative z-10">
                {route.label}
              </span>
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Link>
          );
        })}

        {/* External Resume Link */}
        <a 
          href={externalLinks.resume.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-purple-300 hover:bg-purple-900/20 transition-all duration-300 mt-4 border border-purple-500/20 hover:border-purple-500/50"
        >
          <FileText size={20} className="group-hover:scale-110 transition-transform" />
          <span className="font-mono text-sm tracking-wide">{externalLinks.resume.label}</span>
        </a>
      </nav>

      {/* Footer / Socials */}
      <div className="p-6 border-t border-cyan-500/20 bg-slate-900/50">
        <div className="flex justify-center space-x-6">
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors hover:scale-110 transform">
            <Github size={20} />
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400 transition-colors hover:scale-110 transform">
            <Linkedin size={20} />
          </a>
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors hover:scale-110 transform">
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 bottom-0 w-64 z-40 bg-black">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-64 z-50 shadow-2xl h-full"
            >
              {/* Close Button positioned inside sidebar content or absolute */}
               {/* I'll wrap sidebarContent in a relative div to place close button */}
               <div className="relative h-full">
                  <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 text-slate-400 hover:text-white p-2 bg-black/20 rounded-full"
                    aria-label="Close Menu"
                  >
                    <X size={20} />
                  </button>
                  {sidebarContent}
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
