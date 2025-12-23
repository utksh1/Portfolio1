"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  z: number; // For parallax effect
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

interface Shape {
  id: number;
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  type: "box" | "circle" | "triangle";
  color: string;
}

interface BootSequenceBackgroundProps {
  isActive?: boolean;
}

export default function BootSequenceBackground({ isActive = true }: BootSequenceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isActive) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Detect device type for performance
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    
    // Set up particles and shapes based on device performance
    const particleCount = isMobile ? 30 : isTablet ? 80 : 150;
    const shapeCount = isMobile ? 5 : isTablet ? 8 : 12;
    
    // Initialize particles
    const initParticles = () => {
      const colors = ["#00ff88", "#a855f7", "#0084ff", "#00ffff"];
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 100, // For parallax
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
      setParticles(newParticles);
    };
    
    // Initialize geometric shapes
    const initShapes = () => {
      const types: ("box" | "circle" | "triangle")[] = ["box", "circle", "triangle"];
      const colors = ["#00ff88", "#a855f7", "#0084ff"];
      const newShapes: Shape[] = [];
      
      for (let i = 0; i < shapeCount; i++) {
        newShapes.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          scale: Math.random() * 2 + 0.5,
          type: types[Math.floor(Math.random() * types.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setShapes(newShapes);
    };
    
    // Initialize
    initParticles();
    initShapes();
    
    // Mouse tracking for parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };
    
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let frame = 0;
    const animate = () => {
      if (!isActive) return;
      
      frame++;
      
      // Clear canvas with subtle fade effect
      ctx.fillStyle = "rgba(10, 14, 39, 0.95)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw animated grid
      drawGrid(ctx, canvas);
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx + Math.sin(frame * 0.01 + particle.id) * 0.2;
        particle.y += particle.vy + Math.cos(frame * 0.01 + particle.id) * 0.1;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Mouse interaction
        const mouseX = mouseRef.current.x * canvas.width;
        const mouseY = mouseRef.current.y * canvas.height;
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.x -= (dx / distance) * force * 2;
          particle.y -= (dy / distance) * force * 2;
        }
        
        // Draw particle with glow effect
        drawParticle(ctx, particle);
      });
      
      // Update and draw shapes
      shapes.forEach((shape) => {
        shape.rotation += shape.rotationSpeed;
        shape.y += Math.sin(frame * 0.01 + shape.id) * 0.1;
        drawShape(ctx, shape);
      });
      
      // Draw connection lines between nearby particles
      drawConnections(ctx, particles);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      ctx.save();
      ctx.strokeStyle = "rgba(0, 255, 136, 0.05)";
      ctx.lineWidth = 0.5;
      
      const gridSize = 50;
      const perspective = 0.8;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height * perspective);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      ctx.restore();
    };
    
    const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      const time = Date.now() * 0.001;
      const glowSize = particle.size * (1 + Math.sin(time * 2 + particle.id) * 0.5);
      
      // Glow effect
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, glowSize * 3
      );
      gradient.addColorStop(0, particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(0.5, particle.color + Math.floor(particle.opacity * 0.5 * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(1, "transparent");
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, glowSize * 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Core
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    };
    
    const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.strokeStyle = shape.color + "80"; // Add alpha
      ctx.lineWidth = 2;
      
      const size = 20 * shape.scale;
      
      switch (shape.type) {
        case "box":
          ctx.strokeRect(-size / 2, -size / 2, size, size);
          break;
        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
          ctx.stroke();
          break;
        case "triangle":
          ctx.beginPath();
          ctx.moveTo(0, -size / 2);
          ctx.lineTo(-size / 2, size / 2);
          ctx.lineTo(size / 2, size / 2);
          ctx.closePath();
          ctx.stroke();
          break;
      }
      
      ctx.restore();
    };
    
    const drawConnections = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
      ctx.save();
      ctx.strokeStyle = "rgba(0, 255, 136, 0.1)";
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      ctx.restore();
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, particles.length]);
  
  return (
    <div className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          opacity: 0.8 
        }}
      />
      {/* Additional CSS overlay effects */}
      <div className="perspective-grid opacity-20 pointer-events-none"></div>
    </div>
  );
}