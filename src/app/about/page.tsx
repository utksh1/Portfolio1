"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { RevealText, NeonText } from "@/components/Effects/AnimatedText";
import CyberButton from "@/components/UI/CyberButton";
import InfoPanel from "@/components/About/InfoPanel";
import MetricsSection from "@/components/About/MetricsSection";
import MiniTimeline from "@/components/About/MiniTimeline";
import BackgroundEffect from "@/components/About/BackgroundEffect";
import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const { ref: heroRef, inView: heroInView } = useScrollAnimation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Metrics data
  const metrics = [
    {
      value: 2,
      label: "Years Coding",
      suffix: "+",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      value: 15,
      label: "Projects Built",
      suffix: "+",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      value: 12,
      label: "Technologies",
      suffix: "+",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
    },
    {
      value: "Full-Stack",
      label: "Current Focus",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  // Timeline data
  const timelineItems = [
    {
      title: "High School",
      description: "First encounter with programming through C++ and web development basics",
      year: "2020-2022",
      status: "completed" as const,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "University",
      description: "B.Tech in Computer Science, diving deep into algorithms, data structures, and software engineering",
      year: "2022-2026",
      status: "current" as const,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "Full-Stack Developer",
      description: "Building scalable web applications with modern technologies and best practices",
      year: "2024+",
      status: "upcoming" as const,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <BackgroundEffect>
      <div className="relative">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 relative">
          <div ref={heroRef} className="text-center space-y-8 max-w-4xl">
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <NeonText color="cyan" className="text-6xl md:text-8xl lg:text-9xl font-cyber font-bold tracking-wider">
                SYSTEM PROFILE
              </NeonText>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <RevealText className="text-2xl md:text-3xl text-cyber-blue font-mono">
                Utkarsh Singh - Full-Stack Developer & Software Engineering Student
              </RevealText>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-center space-x-2 text-cyber-cyan/80 font-mono">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>India</span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <RevealText className="text-xl md:text-2xl text-cyber-cyan font-mono lowercase">
                Engineering the future with code
              </RevealText>
            </motion.div>

            {/* Hero CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <CyberButton variant="primary" href="/projects" size="large">
                VIEW PROJECTS
              </CyberButton>
              <CyberButton variant="secondary" href="https://utkarsh.tech" size="large">
                DOWNLOAD RESUME
              </CyberButton>
              <CyberButton variant="tertiary" href="/stack" size="large">
                VIEW TECH STACK
              </CyberButton>
            </motion.div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-cyber font-bold text-glow-cyan mb-4">
                SYSTEM METRICS
              </h2>
              <p className="text-gray-400 font-mono text-lg">
                Real-time data on development progress and capabilities
              </p>
            </motion.div>
            
            <MetricsSection metrics={metrics} />
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <InfoPanel
              title="ABOUT THE SYSTEM"
              glowColor="cyan"
              delay={0.2}
            >
              <p className="text-lg leading-relaxed mb-4">
                A full-stack developer passionate about building intelligent systems that bridge the gap between complex problems and elegant solutions. Currently pursuing a B.Tech in Computer Science while actively contributing to real-world projects.
              </p>
              <p className="text-lg leading-relaxed">
                My journey in technology began with curiosity and has evolved into a deep commitment to creating software that not only functions flawlessly but also provides exceptional user experiences.
              </p>
            </InfoPanel>
          </div>
        </section>

        {/* Why Software Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <InfoPanel
              title="ORIGIN PROTOCOL"
              glowColor="purple"
              delay={0.2}
              className="mb-12"
            >
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  The journey began in high school when I first wrote "Hello World" in C++. That moment of seeing code transform into something functional sparked an obsession that hasn't dimmed since.
                </p>
                <p className="text-lg leading-relaxed">
                  What started as curiosity evolved into a passion for problem-solving through technology. Each line of code became a building block for creating solutions that could impact real lives.
                </p>
                <p className="text-lg leading-relaxed">
                  Software development isn't just a career choice for me—it's a creative medium where logic meets imagination, where every project is an opportunity to push boundaries and explore new possibilities.
                </p>
              </div>
            </InfoPanel>
          </div>
        </section>

        {/* Learning & Growth Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <InfoPanel
              title="LEARNING MATRIX"
              glowColor="blue"
              delay={0.2}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-cyber-blue mb-4">Current Focus Areas</h4>
                  <ul className="space-y-2 font-mono text-gray-300">
                    <li>• Advanced React patterns & Next.js optimization</li>
                    <li>• Cloud architecture & serverless computing</li>
                    <li>• AI/ML integration in web applications</li>
                    <li>• Database design & performance optimization</li>
                    <li>• DevOps & CI/CD pipeline implementation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-cyber-blue mb-4">Learning Philosophy</h4>
                  <p className="font-mono text-gray-300 leading-relaxed">
                    "The best way to learn is to build, break, and rebuild. Every bug is a teacher, every failure a stepping stone to mastery."
                  </p>
                  <div className="mt-6">
                    <h5 className="text-lg font-bold text-cyber-cyan mb-2">Technologies in Rotation</h5>
                    <div className="flex flex-wrap gap-2">
                      {["TypeScript", "Python", "AWS", "Docker", "GraphQL", "PostgreSQL"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-cyber-cyan/10 text-cyber-cyan rounded-full text-sm font-mono border border-cyber-cyan/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </InfoPanel>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <InfoPanel
              title="DEVELOPMENT PHILOSOPHY"
              glowColor="cyan"
              delay={0.2}
            >
              <div className="text-center space-y-8">
                <div className="relative">
                  <h3 className="text-3xl font-cyber font-bold text-glow-cyan mb-6">
                    "Code is art, engineering is science"
                  </h3>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent h-px w-full top-1/2 transform -translate-y-1/2" />
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 text-left">
                  <div>
                    <h4 className="text-xl font-bold text-cyber-purple mb-3">Clean Architecture</h4>
                    <p className="font-mono text-gray-300 text-sm leading-relaxed">
                      Writing code that not only works today but remains maintainable and scalable for future enhancements and team collaboration.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-cyber-purple mb-3">User-Centric Design</h4>
                    <p className="font-mono text-gray-300 text-sm leading-relaxed">
                      Every line of code serves a purpose - creating intuitive experiences that solve real problems for real people.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-cyber-purple mb-3">Continuous Evolution</h4>
                    <p className="font-mono text-gray-300 text-sm leading-relaxed">
                      Technology evolves rapidly, and so do I. Staying curious, learning continuously, and adapting to new challenges.
                    </p>
                  </div>
                </div>
              </div>
            </InfoPanel>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-cyber font-bold text-glow-purple mb-4">
                EVOLUTION TIMELINE
              </h2>
              <p className="text-gray-400 font-mono text-lg">
                Key milestones in the journey from curious student to full-stack developer
              </p>
            </motion.div>
            
            <MiniTimeline items={timelineItems} orientation="horizontal" />
          </div>
        </section>

        {/* Beyond Code Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <InfoPanel
              title="BEYOND THE CODE"
              glowColor="purple"
              delay={0.2}
            >
              <div className="space-y-8">
                <p className="text-lg leading-relaxed text-center">
                  Innovation doesn't happen in isolation. My perspective is shaped by diverse interests that fuel creative problem-solving.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-cyber-cyan mb-4">Interests & Hobbies</h4>
                    <ul className="space-y-2 font-mono text-gray-300">
                      <li>• Gaming & Game Design Analysis</li>
                      <li>• Science Fiction & Tech Literature</li>
                      <li>• Photography & Visual Storytelling</li>
                      <li>• Chess & Strategic Thinking</li>
                      <li>• Open Source Contribution</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-cyber-cyan mb-4">Innovation Drivers</h4>
                    <p className="font-mono text-gray-300 leading-relaxed mb-4">
                      These diverse interests provide unique perspectives that influence my approach to software development, from user experience design to system architecture.
                    </p>
                    <div className="glass-dark p-4 rounded-lg border border-cyber-cyan/30">
                      <p className="text-cyber-cyan font-mono text-sm italic">
                        "The best innovations often come from connecting dots across different domains."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </InfoPanel>
          </div>
        </section>

        {/* Vision Statement */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="glass-dark p-12 rounded-lg border border-cyber-cyan/30"
            >
              <h3 className="text-3xl md:text-4xl font-cyber font-bold text-glow-cyan mb-6">
                VISION 2030
              </h3>
              <p className="text-xl md:text-2xl font-mono text-gray-300 leading-relaxed mb-8">
                To contribute to building intelligent systems that enhance human capabilities and create positive impact at scale. Whether through AI-powered applications, scalable cloud architectures, or innovative user interfaces, the goal remains constant: engineering the future with code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CyberButton variant="primary" href="/projects">
                  EXPLORE MY WORK
                </CyberButton>
                <CyberButton variant="secondary" href="/contact">
                  LET'S CONNECT
                </CyberButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </BackgroundEffect>
  );
}