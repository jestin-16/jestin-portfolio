import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
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

import { Copy } from 'lucide-react';

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
  };  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div ref={containerRef} className="min-h-screen font-sans bg-brand-void text-brand-primary selection:bg-brand-accent selection:text-white relative overflow-hidden">
        
        {/* Scroll Progress Bar - Editorial Red */}
        <div className="fixed top-0 left-0 w-full h-[2px] z-[100]">
          <div id="scroll-progress" className="h-full bg-brand-accent w-0 transition-all duration-100" />
        </div>

        {/* Loading Overlay */}
        {!isAppLoaded && <SpringbootLoader onLoadingComplete={handleLoadingComplete} />}

      {/* Navigation - Editorial Minimalist */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/90 backdrop-blur-md border-b border-brand-border ${scrolled ? 'h-14' : 'h-20'}`}
      >
        <div className="max-w-[1400px] mx-auto px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <div 
              className="font-serif font-black text-2xl tracking-tighter cursor-pointer group flex items-center"
              onClick={() => scrollToSection('home')}
            >
              <span className="text-brand-accent group-hover:rotate-12 transition-transform mr-1">.</span>
              <span>jestin</span>
              <span className="text-brand-accent font-light italic ml-1">shaji</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-12">
              {['home', 'about', 'skills', 'projects', 'contact'].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-[10px] uppercase font-mono tracking-[0.3em] relative py-2 group ${activeSection === id ? 'text-brand-accent' : 'text-brand-muted hover:text-brand-primary'}`}
                >
                  {id}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-left ${activeSection === id ? 'scale-x-100' : ''}`} />
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <span className="w-10 h-[1px] bg-brand-accent hidden sm:block" />
              <span className="text-[9px] uppercase tracking-[0.4em] font-mono font-bold text-brand-primary">LATEST_V1.0</span>
            </div>
          </div>
        </div>
      </header>

        {/* Hero Section - Asymmetric Editorial Layout */}
        <section id="home" className="relative flex items-center min-h-screen pt-20 px-8 max-w-[1400px] mx-auto overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-12 w-full pt-12">
            
            {/* Main Heading Area (Col 1-8) */}
            <div className="lg:col-span-8 space-y-12">
              <div className="hero-badge inline-flex items-center space-x-4">
                <span className="w-8 h-[2px] bg-brand-accent" />
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-brand-accent">Software Architect</span>
              </div>

              <h1 className="text-7xl md:text-[8.5rem] lg:text-[10rem] font-serif font-black leading-[0.85] tracking-[-0.04em] text-brand-primary">
                Developing <br />
                <span className="italic font-light text-brand-muted ml-0 lg:ml-20">Systems.</span> <br />
                <span className="text-brand-accent relative">
                  Architecture.
                  <span className="absolute -right-12 top-10 w-8 h-8 rounded-full border-[6px] border-brand-accent hidden md:block" />
                </span>
              </h1>

              <div className="hero-desc max-w-xl border-l-[4px] border-brand-accent pl-12 py-4">
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-brand-muted italic">
                  Crafting high-performance <span className="text-brand-primary font-bold">Java ecosystems</span> with editorial precision and architected resilience.
                </p>
              </div>
            </div>

            {/* CTA and Summary Area (Col 9-12) */}
            <div className="lg:col-span-4 flex flex-col justify-end space-y-12 pb-20">
              <div className="space-y-6">
                <p className="font-mono text-[11px] leading-relaxed text-brand-muted uppercase tracking-widest">
                  {"// Based in Kerala, India"} <br />
                  {"// Specializing in Spring Boot"} <br />
                  {"// MCA Graduate Candidate"}
                </p>
                <div className="flex gap-4">
                  <button 
                     onClick={() => scrollToSection('contact')}
                     className="bg-brand-primary text-white px-10 py-5 rounded-full font-mono text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent transition-colors duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(227,0,15,0.3)]"
                  >
                    Establish_Connection
                  </button>
                </div>
              </div>

              <div className="lg:hidden h-[300px] w-full relative">
                <Terminal commands={TERMINAL_COMMANDS} theme="editorial" />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Layout */}
        <div className="max-w-[1400px] mx-auto px-8 space-y-64 mb-64">
          
          {/* About Section - Editorial Spread */}
          <section id="about" className="scroll-mt-24">
            <div className="grid lg:grid-cols-12 gap-20">
              <div className="lg:col-span-1 hidden lg:block">
                <div className="sticky top-40 flex flex-col items-center">
                  <span className="text-[10px] font-mono font-black vertical-text uppercase tracking-[1em] text-brand-accent">01. PROFILE</span>
                  <div className="w-[1px] h-32 bg-brand-accent mt-8" />
                </div>
              </div>
              
              <div className="lg:col-span-6 space-y-12">
                <h2 className="text-6xl md:text-8xl font-serif font-black tracking-tight leading-none italic">
                  Philosophy <br />
                  <span className="text-brand-accent ml-20">& Logic.</span>
                </h2>
                <div className="space-y-8 text-xl text-brand-muted leading-relaxed font-medium">
                  <p>
                    I architect the <span className="text-brand-primary font-bold">invisible engines</span> that power the modern web. My focus lies at the intersection of enterprise-grade Java and cloud-native resilience.
                  </p>
                  <p>
                    I believe in code that isn't just functional, but <span className="italic font-light">beautifully structured</span>—designed to scale, monitored to survive, and documented to last.
                  </p>
                </div>
                
                <div className="pt-8">
                  <div className="inline-grid grid-cols-2 gap-x-20 gap-y-8 p-10 bg-brand-surface border border-brand-border rounded-4xl">
                    <div className="space-y-1">
                      <span className="text-brand-accent text-[8px] font-black uppercase tracking-widest">Education</span>
                      <p className="font-serif font-black text-xl italic uppercase">MCA @ AJCE</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-brand-accent text-[8px] font-black uppercase tracking-widest">Location</span>
                      <p className="font-serif font-black text-xl italic uppercase">Kerala, IN</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-brand-accent text-[8px] font-black uppercase tracking-widest">Focus</span>
                      <p className="font-serif font-black text-xl italic uppercase">Spring Boot</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-brand-accent text-[8px] font-black uppercase tracking-widest">Status</span>
                      <p className="font-serif font-black text-xl italic uppercase font-blue">Open to Work</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex items-center">
                <div className="w-full h-full min-h-[400px] p-1 bg-white border border-brand-border rounded-xl shadow-2xl">
                    <JSONViewer data={ABOUT_DATA} theme="editorial" />
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section - The Grid */}
          <section id="skills" className="scroll-mt-24">
            <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-brand-accent">02. CAPABILITIES</span>
                <h2 className="text-6xl md:text-8xl font-serif font-black tracking-tighter uppercase italic leading-[0.8]">
                  Technical <br /> <span className="text-brand-accent">Spec_Sheet</span>
                </h2>
              </div>
              <div className="max-w-md text-right border-r-[4px] border-brand-accent pr-8 py-2">
                <p className="text-brand-muted font-medium italic underline decoration-brand-accent/20 underline-offset-8">
                  Core competencies across the full backend stack—from database design to microservices orchestration.
                </p>
              </div>
            </div>
            <SkillEditor skills={SKILLS_NEW} theme="editorial" />
          </section>

          {/* Projects Section - Editorial Cards */}
          <section id="projects" className="scroll-mt-24">
            <div className="mb-24 flex items-center space-x-12">
               <h2 className="text-6xl md:text-8xl font-serif font-black tracking-tight uppercase italic leading-none shrink-0">
                Production <br /> <span className="text-brand-accent ml-20">History</span>
              </h2>
              <div className="w-full h-[2px] bg-brand-border relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute top-0 left-0 w-1/4 h-full bg-brand-accent" 
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {PROJECTS.map((project, i) => (
                <ProjectTerminalCard key={i} project={project} i={i} theme="editorial" />
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="scroll-mt-24 pb-32">
             <div className="max-w-4xl mx-auto">
                <div className="text-center space-y-8 mb-20">
                  <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-brand-accent">04. HANDSHAKE</span>
                  <h2 className="text-6xl md:text-[7rem] font-serif font-black tracking-tighter leading-none italic uppercase">
                    Launch <br /> <span className="text-brand-accent">Connection_</span>
                  </h2>
                </div>
                <ContactTerminal theme="editorial" />
             </div>
          </section>
        </div>

        {/* Global Footer / Status Bar - Inverted Editorial */}
        <footer className="bg-brand-primary py-2 text-white">
           <StatusBar theme="editorial" />
        </footer>
      </div>
    </ReactLenis>
  );
};

export default App;
