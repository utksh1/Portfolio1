"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

interface Metric {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  suffix?: string;
}

interface MetricsSectionProps {
  metrics: Metric[];
  className?: string;
}

export default function MetricsSection({ metrics, className = "" }: MetricsSectionProps) {
  const { ref, inView } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  });

  const [animatedValues, setAnimatedValues] = useState<number[]>(
    new Array(metrics.length).fill(0)
  );

  // Function to animate counter from 0 to target value
  const animateCounter = (
    target: number,
    index: number,
    duration: number = 2000
  ) => {
    const startTime = Date.now();
    const startValue = 0;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (target * easeOutQuart));
      
      setAnimatedValues(prev => {
        const newValues = [...prev];
        newValues[index] = currentValue;
        return newValues;
      });

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  // Trigger animations when in view
  useEffect(() => {
    if (inView) {
      metrics.forEach((metric, index) => {
        const numericValue = typeof metric.value === "number" 
          ? metric.value 
          : parseInt(metric.value.toString().replace(/\D/g, "")) || 0;
        
        if (numericValue > 0) {
          // Stagger the animations
          setTimeout(() => {
            animateCounter(numericValue, index, 2000 + index * 200);
          }, index * 150);
        } else {
          // For non-numeric values, just set the final value
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[index] = 0;
            return newValues;
          });
        }
      });
    }
  }, [inView, metrics]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {metrics.map((metric, index) => {
        const numericValue = animatedValues[index];
        const displayValue = typeof metric.value === "number" 
          ? numericValue.toLocaleString()
          : metric.value.toString();

        return (
          <motion.div
            key={index}
            className="relative group"
            variants={itemVariants}
            transition={{
              duration: 0.6,
              type: "spring" as const,
              stiffness: 100,
              damping: 15,
            }}
          >
            {/* Card Background */}
            <div className="relative p-6 text-center glass-dark border border-cyber-cyan/30 rounded-lg hover:border-cyber-cyan/60 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              {metric.icon && (
                <motion.div
                  className="flex justify-center mb-4 text-cyber-cyan"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  <div className="p-3 bg-cyber-cyan/10 rounded-full">
                    {metric.icon}
                  </div>
                </motion.div>
              )}

              {/* Value */}
              <motion.div
                className="text-3xl md:text-4xl font-bold font-cyber text-glow-cyan mb-2"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1 + 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {displayValue}
                {metric.suffix && (
                  <span className="text-lg text-cyber-cyan/80">
                    {metric.suffix}
                  </span>
                )}
              </motion.div>

              {/* Label */}
              <motion.div
                className="text-sm font-mono text-gray-400 uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
              >
                {metric.label}
              </motion.div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyber-cyan via-transparent to-cyber-cyan opacity-20 animate-pulse" />
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyber-cyan/50 opacity-50" />
              <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan/50 opacity-50" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-cyber-cyan/50 opacity-50" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-cyber-cyan/50 opacity-50" />

              {/* Scan Line Effect */}
              <motion.div
                className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skewX(-20deg)" />
              </motion.div>
            </div>

            {/* Floating Particles */}
            {inView && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 h-0.5 bg-cyber-cyan rounded-full opacity-60"
                    initial={{
                      x: Math.random() * 100 + "%",
                      y: Math.random() * 100 + "%",
                      scale: 0,
                    }}
                    animate={{
                      y: [null, "-15px", "15px"],
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      delay: index * 0.2 + i * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}