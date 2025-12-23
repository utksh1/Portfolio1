"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { buttonHover } from "@/lib/animations";

interface CyberButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

export default function CyberButton({ 
  children, 
  variant = "primary", 
  onClick, 
  href, 
  className = "", 
  disabled = false,
  size = "medium"
}: CyberButtonProps) {
  const baseClasses = "relative overflow-hidden font-mono uppercase tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyber-cyan";
  
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: `cyberpunk-button-primary ${variant === "primary" ? "" : ""}`,
    secondary: `cyberpunk-button-secondary ${variant === "secondary" ? "" : ""}`,
    tertiary: `cyberpunk-button-tertiary ${variant === "tertiary" ? "" : ""}`,
  };
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed hover:transform-none" : "cursor-pointer";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) return;

    // Ripple effect
    const button = e.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: currentColor;
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    // Add ripple keyframes if not exists
    if (!document.querySelector('#ripple-keyframes')) {
      const style = document.createElement('style');
      style.id = 'ripple-keyframes';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    onClick?.();
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`}
        variants={disabled ? undefined : buttonHover}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        whileFocus="hover"
        onClick={handleClick as any}
        disabled={disabled}
      >
        {/* Energy pulse effect */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at center, var(--cyber-cyan, #00ff88) 0%, transparent 70%)`,
            filter: `blur(20px)`,
          }}
        />
        
        {/* Scan line effect */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div 
            className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
            style={{ transform: "skewX(-20deg)" }}
          />
        </motion.div>
        
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 border-current" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 border-current" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 opacity-0 group-hover:opacity-100 border-current" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 border-current" />
        
        <span className="relative z-10">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`}
      variants={disabled ? undefined : buttonHover}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      whileFocus="hover"
      onClick={handleClick as any}
      disabled={disabled}
    >
      {/* Energy pulse effect */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at center, var(--cyber-cyan, #00ff88) 0%, transparent 70%)`,
          filter: `blur(20px)`,
        }}
      />
      
      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div 
          className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
          style={{ transform: "skewX(-20deg)" }}
        />
      </motion.div>
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 border-current" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 border-current" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 opacity-0 group-hover:opacity-100 border-current" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 border-current" />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}