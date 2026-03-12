import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from '@studio-freight/react-lenis';
import { Canvas } from '@react-three/fiber';
import SpringbootLoader from './components/SpringbootLoader';
import BackgroundSystem from './components/BackgroundSystem';
import VSCodeTabs from './components/VSCodeTabs';
import StatusBar from './components/StatusBar';
import Terminal from './components/Terminal';
import MicroservicesDiagram from './components/MicroservicesDiagram';
import JSONViewer from './components/JSONViewer';
import SkillEditor from './components/SkillEditor';
import ProjectTerminalCard from './components/ProjectTerminalCard';
import ContactTerminal from './components/ContactTerminal';

import {
  Code2,
  Mail,
  Github,
  Linkedin,
  ChevronRight,
  Layout,
  Database,
  Terminal as TerminalIcon,
  Copy
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SKILLS_NEW = [
  {
    filename: "Backend.java",
    items: [
      { name: "Java", level: "advanced", version: "21", progress: 90 },
      { name: "SpringBoot", level: "advanced", version: "3.2", progress: 85 },
      { name: "Microservices", level: "intermediate", version: "v1", progress: 75 },
      { name: "Node.js", level: "intermediate", version: "20.x", progress: 70 },
      { name: "REST APIs", level: "advanced", version: "v2", progress: 85 },
    ]
  },
  {
    filename: "Data.sql",
    items: [
      { name: "PostgreSQL", level: "advanced", version: "16", progress: 80 },
      { name: "MySQL", level: "advanced", version: "8.x", progress: 85 },
      { name: "Supabase", level: "intermediate", version: "cloud", progress: 70 },
      { name: "SQL", level: "advanced", version: "ANSI", progress: 90 },
    ]
  },
  {
    filename: "Tools.sh",
    items: [
      { name: "Git", level: "advanced", version: "2.4x", progress: 85 },
      { name: "Docker", level: "learning", version: "latest", progress: 40 },
      { name: "Python", level: "intermediate", version: "3.12", progress: 65 },
      { name: "VS Code", level: "advanced", version: "2024", progress: 95 },
    ]
  }
];

const ABOUT_DATA = {
  "name": "Jestin Shaji",
  "role": "Backend Developer",  
  "education": "MCA @ AJCE, Kerala",
  "focus": ["Java", "Spring Boot", "Microservices", "Cloud", "AI"],
  "seeking": "Software Engineer roles — Internship / Junior Dev",
  "status": "open_to_work: true"
};

const TERMINAL_COMMANDS = [
  { input: "whoami", output: "Jestin Shaji — Backend Developer. Specializing in high-performance Java architectures." },
  { input: "java --version", output: "openjdk 21.0.2 2024-01-16 LTS" },
  { input: "git log --oneline --max-count=3", output: "a1b2c3d (HEAD -> main) feat: optimize microservices scaling\nb4c5d6e fix: database connection layering\nc7d8e9f chore: implement auth service security" },
  { input: "./run --passion", output: "Building scalable systems that matter. One microservice at a time." },
];

const PROJECTS = [
  {
    title: "College Lab Automation System",
    desc: "Barcode-based attendance and automatic system allocation for students across 46 lab systems with database tracking.",
    tags: ["React", "Node.js", "MySQL"]
  },
  {
    title: "Event Management System",
    desc: "Web-based platform to manage customers, workers, events, and complaints for an event firm operating globally.",
    tags: ["Full-Stack", "Express", "Database"]
  },
  {
    title: "Expense Tracker",
    desc: "Full-stack expense tracking app with authentication, built as a student project with Supabase backend integration.",
    tags: ["React", "Tailwind", "Supabase"]
  },
];

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

// Advanced Animation variants (Add these back if needed for specific entrance animations)



const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const containerRef = useRef(null);

  // Initialize GSAP Scroll triggers for cinematic entrances and Hero timeline
  useGSAP(() => {
    if (!isAppLoaded) return; // Wait for the loader to finish

    // Master Cinematic Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 }});
    
    // 1. Background meshes fade in first to establish depth
    tl.fromTo('.background-layer', { opacity: 0 }, { opacity: 1, duration: 2 }, 0)
    
    // 2. Navigation fades down
    .fromTo('header', { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.5)
    
    // 3. 3D Object smoothly scales/rotates in
    .fromTo('.hero-3d-wrapper', { scale: 0.8, opacity: 0, rotationY: 45 }, { scale: 1, opacity: 1, rotationY: 0, duration: 2 }, 0.5)

    // 4. Staggered text reveal
    .fromTo('.hero-badge', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 1)
    .fromTo('.hero-title-part', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, stagger: 0.15 }, 1.2)
    .fromTo('.hero-desc', { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, 1.6)
    .fromTo('.hero-buttons', { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, 1.8);

    // Section Scroll Parallax Animations
    const sections = gsap.utils.toArray('section:not(#home)');
    sections.forEach((section) => {
      // Create a parallax effect for section containers to simulate depth (Layer 3 & 4 Z-Space)
      gsap.fromTo(section, 
        { autoAlpha: 0, y: 120, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

  }, { scope: containerRef, dependencies: [isAppLoaded] });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressBar = document.getElementById("scroll-progress");
      if (progressBar) progressBar.style.width = scrolled + "%";
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    ['home', 'about', 'skills', 'projects', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);


  // Magnetic Button Logic
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(magneticX, springConfig);
  const springY = useSpring(magneticY, springConfig);

  const handleMagneticMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = e.currentTarget.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    magneticX.set(middleX * 0.3);
    magneticY.set(middleY * 0.3);
  };

  const handleMagneticLeave = () => {
    magneticX.set(0);
    magneticY.set(0);
  };


  const handleLoadingComplete = () => {
    // Add a slight delay to allow the GSAP particle timeline to cleanly finish returning before unmounting
    setTimeout(() => {
        setIsAppLoaded(true);
    }, 400); // the particle timeline holds for 500ms at the end
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div ref={containerRef} className="min-h-screen font-sans bg-brand-void text-slate-300 selection:bg-brand-warning/30 relative overflow-hidden cursor-none">
        
        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-[2px] z-[100]">
          <div id="scroll-progress" className="h-full bg-brand-primary shadow-[0_0_10px_rgba(0,255,136,0.8)] w-0 transition-all duration-100" />
        </div>

        {/* Custom Cursor */}
        <motion.div 
          className="fixed w-4 h-4 border border-brand-primary pointer-events-none z-[999] flex items-center justify-center"
          animate={{ x: cursorPos.x - 8, y: cursorPos.y - 8 }}
          transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        >
          <div className="w-[1px] h-full bg-brand-primary/50 absolute" />
          <div className="h-[1px] w-full bg-brand-primary/50 absolute" />
        </motion.div>
        
        {/* Loading Overlay */}
        {!isAppLoaded && <SpringbootLoader onLoadingComplete={handleLoadingComplete} />}

        {/* Cinematic Layer: Background System */}
        <BackgroundSystem />

      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-0' : 'py-2'}`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-2 font-mono text-brand-primary font-bold text-lg select-none">
              <span>{">"} jestin_shaji</span>
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2.5 h-5 bg-brand-primary inline-block"
              />
            </div>
            
            <div className="hidden md:block flex-1 max-w-2xl mx-12">
              <VSCodeTabs activeSection={activeSection} onTabClick={scrollToSection} />
            </div>

            <div className="flex items-center">
              <span className="status-dot pulsing-green w-2 h-2 rounded-full bg-brand-primary mr-2 shadow-[0_0_8px_rgba(0,255,136,1)]" />
              <span className="text-[10px] uppercase tracking-widest text-brand-primary font-mono hidden sm:inline">Available for Hire</span>
            </div>
          </div>
        </div>
      </header>

        {/* Hero Section */}
        <section id="home" className="relative flex flex-col items-center justify-center min-h-screen pt-20 px-4 max-w-7xl mx-auto overflow-hidden">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full relative z-10">
            {/* Left side — Terminal */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-[0.2em] text-brand-primary opacity-70 mb-2">
                  <span className="w-1 h-1 bg-brand-primary rounded-full animate-ping" />
                  <span>SYSTEM_READY: PORT_3000</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  Backend Engineer.<br />
                  <span className="italic text-brand-primary text-4xl md:text-5xl opacity-80">{"// Building systems"}</span><br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-warning to-brand-danger">that scale.</span>
                </h1>
              </div>

              <div className="h-[350px] w-full">
                <Terminal commands={TERMINAL_COMMANDS} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  style={{ x: springX, y: springY }}
                  onClick={() => {
                    navigator.clipboard.writeText("git clone https://github.com/jestin-16/portfolio.git");
                  }}
                  className="group relative flex items-center justify-center space-x-3 bg-brand-primary text-brand-void px-8 py-4 rounded font-mono font-bold hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] transition-all"
                >
                  <Copy className="w-4 h-4" />
                  <span>[ $ git clone jestin-shaji ]</span>
                </motion.button>
              </div>
            </div>

            {/* Right side — 3D Microservices Diagram */}
            <div className="hidden lg:block h-[600px] w-full relative">
              <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-[100px] opacity-20" />
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
                <MicroservicesDiagram />
              </Canvas>
            </div>
          </div>
        </section>

        {/* Global wrapper for scroll sections to limit width */}
        <div className="max-w-7xl mx-auto px-4 space-y-32 mb-32">
          {/* About Section */}
          <section id="about" className="pt-24 scroll-mt-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 text-brand-secondary font-mono text-sm">
                  <span>{"{"}</span>
                  <span className="w-4 h-[1px] bg-brand-secondary/30" />
                  <span>core_profile</span>
                  <span>{"}"}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white">System <span className="text-brand-secondary">Architecture</span></h2>
                <div className="space-y-4 text-slate-400 font-light leading-relaxed">
                  <p>
                    I am a Backend Developer and MCA student at AJCE, specializing in building the invisible engines that power the modern web.
                  </p>
                  <p>
                    My focus lies at the intersection of <span className="text-white">Java, Spring Boot, and Cloud Native Architectures</span>. I believe in writing code that isn't just functional, but resilient, scalable, and easy to monitor.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-brand-secondary/10 blur-2xl rounded-[2rem] opacity-30" />
                <JSONViewer data={ABOUT_DATA} />
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="scroll-mt-24">
            <div className="mb-12">
              <div className="inline-flex items-center space-x-3 text-brand-warning font-mono text-sm mb-4">
                <span>{"["}</span>
                <span className="w-4 h-[1px] bg-brand-warning/30" />
                <span>technical_stack</span>
                <span>{"]"}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">The <span className="text-brand-warning">Arsenal</span></h2>
            </div>
            <SkillEditor skills={SKILLS_NEW} />
          </section>

          {/* Projects Section */}
          <section id="projects" className="scroll-mt-24">
            <div className="mb-12">
              <div className="inline-flex items-center space-x-3 text-brand-primary font-mono text-sm mb-4">
                <span>{"("}</span>
                <span className="w-4 h-[1px] bg-brand-primary/30" />
                <span>recent_deployments</span>
                <span>{")"}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Selected <span className="text-brand-primary">Work</span></h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.map((project, i) => (
                <ProjectTerminalCard key={i} project={project} i={i} />
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="scroll-mt-24 pb-20">
            <ContactTerminal />
          </section>
        </div>

        {/* Global Footer / Status Bar */}
        <StatusBar />
      </div>
    </ReactLenis>
  );
};

export default App;
