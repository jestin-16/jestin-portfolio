import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from '@studio-freight/react-lenis';

import Background3D from './components/Background3D';
import Hero3DObject from './components/Hero3DObject';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);
import {
  Code2,
  Mail,
  Github,
  Linkedin,
  ChevronRight,
  Layout,
  Database,
  Terminal
} from 'lucide-react';

const SKILLS = [
  {
    category: "Frontend",
    icon: Layout,
    items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    color: "from-brand-primary to-brand-secondary"
  },
  {
    category: "Backend",
    icon: Database,
    items: ["Node.js", "Express.js", "Supabase", "SQL", "REST APIs"],
    color: "from-brand-secondary to-brand-accent"
  },
  {
    category: "Tools & Others",
    icon: Terminal,
    items: ["Python", "Java", "Git/GitHub", "VS Code", "PostgreSQL"],
    color: "from-brand-accent to-brand-primary"
  },
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

// Advanced Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};



const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);

  // Initialize GSAP Scroll triggers for cinematic entrances
  useGSAP(() => {
    // Hero Animations
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 }});
    tl.to('.hero-badge', { y: 0, opacity: 1, duration: 1 }, 0.2)
      .to('.hero-title-part', { y: 0, opacity: 1, stagger: 0.15 }, 0.4)
      .to('.hero-desc', { y: 0, opacity: 1 }, 0.8)
      .to('.hero-buttons', { y: 0, opacity: 1 }, 1);

    // Section Scroll Animations
    const sections = gsap.utils.toArray('section:not(#home)');
    sections.forEach((section) => {
      // Create a parallax effect for section content
      const content = section.querySelector('.section-content');
      
      gsap.fromTo(section, 
        { autoAlpha: 0, y: 100 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

  }, { scope: containerRef });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const NavLink = ({ id, label }) => (
    <li className="relative">
      <motion.button
        onClick={() => scrollToSection(id)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        className={`px-4 py-2 text-sm font-medium transition-colors ${activeSection === id ? 'text-white' : 'text-slate-400 hover:text-white'
          }`}
      >
        {label}
      </motion.button>
      {activeSection === id && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 z-[-1] rounded-full bg-brand-primary/20 border border-brand-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        />
      )}
    </li>
  );

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div ref={containerRef} className="min-h-screen font-sans bg-brand-dark text-slate-200 selection:bg-brand-primary/30 relative overflow-hidden">
        
        {/* Cinematic Layer 1 & 2: 3D Background System */}
        <Background3D />

      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'
          }`}
      >
        <div className="px-6 mx-auto max-w-7xl">
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`flex items-center justify-between mx-auto transition-all duration-500 rounded-full px-6 py-3 ${scrolled
              ? 'glass-panel max-w-4xl'
              : 'bg-transparent max-w-7xl'
              }`}
          >
            <div className="text-2xl font-black tracking-tighter text-white">
              <span className="text-gradient">
                Jestin
              </span>
              .dev
            </div>
            <ul className="hidden space-x-1 md:flex">
              <NavLink id="home" label="Home" />
              <NavLink id="about" label="About" />
              <NavLink id="skills" label="Skills" />
              <NavLink id="projects" label="Projects" />
              <NavLink id="contact" label="Contact" />
            </ul>
          </motion.nav>
        </div>
      </header>

        {/* Hero Section */}
        <section id="home" className="relative flex items-center justify-between min-h-screen pt-20 px-4 max-w-7xl mx-auto overflow-hidden">
          
          {/* Text Content */}
          <div className="relative z-20 max-w-3xl space-y-8 flex-1">
            <div className="hero-badge translate-y-8 opacity-0 inline-block px-6 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 backdrop-blur-md text-brand-light font-semibold tracking-wide shadow-[0_0_20px_rgba(139,92,246,0.2)] animate-pulse-slow">
              ✨ MCA Student & Creative Developer
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1.1]">
              <div className="overflow-hidden">
                <span className="hero-title-part translate-y-full opacity-0 inline-block">Crafting</span>
              </div>
              <div className="overflow-hidden">
                <span className="hero-title-part translate-y-full opacity-0 inline-block text-gradient pr-4">Cinematic</span>
              </div>
              <div className="overflow-hidden">
                <span className="hero-title-part translate-y-full opacity-0 inline-block">Experiences.</span>
              </div>
            </h1>

            <p className="hero-desc translate-y-8 opacity-0 max-w-xl text-xl leading-relaxed text-slate-300 font-light">
              I'm Jestin. I turn complex problems into elegant, robust web solutions.
              Focused on full‑stack development and <span className="text-white font-medium">high-end WebGL UI/UX</span>.
            </p>

            <div className="hero-buttons translate-y-8 opacity-0 flex flex-col sm:flex-row gap-6 pt-6">
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 font-bold text-white transition-all rounded-full bg-gradient-to-r from-brand-primary to-brand-accent hover:from-brand-accent hover:to-brand-primary shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] animate-glow overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
              </button>
            </div>
          </div>

          {/* 3D Visual focal point */}
          <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] z-10 pointer-events-none hidden lg:block">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
              <ambientLight intensity={1} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
              <Hero3DObject />
              <Environment preset="city">
                <Lightformer form="rect" intensity={4} position={[-5, 5, -5]} scale={[10, 10, 1]} target={[0, 0, 0]} />
              </Environment>
            </Canvas>
          </div>
        </section>

        {/* Global wrapper for scroll sections to limit width */}
        <div className="max-w-7xl mx-auto px-4">
        {/* About Section */}
        <section id="about" className="py-24 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative p-8 md:p-12 glass-panel rounded-[2.5rem] overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-brand-dark/50 to-brand-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary">
                  <Code2 className="w-5 h-5" />
                  <span className="text-sm font-semibold tracking-wider uppercase">About Me</span>
                </div>
                <h3 className="text-3xl font-bold text-white md:text-4xl">Building Software with <span className="text-gradient">Purpose</span></h3>
                <div className="space-y-4 text-lg text-slate-400 font-light">
                  <p>
                    Currently pursuing my Master of Computer Applications (MCA) in Kerala, I am deeply passionate about
                    system design and scalable engineering solutions.
                  </p>
                  <p>
                    Beyond theory, I love diving into real‑world problems. Whether it's managing a lab of 46 systems or structuring large datasets for global events, I strive to write clean, maintainable code.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/30 to-brand-secondary/30 rounded-2xl blur-3xl group-hover:blur-2xl transition-all duration-700 opacity-50" />
                <div className="relative aspect-square md:aspect-[4/3] rounded-2xl border border-white/5 bg-brand-dark/80 p-6 flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transform group-hover:scale-[1.02] transition-transform duration-500">
                  <Terminal className="w-16 h-16 mb-4 text-brand-primary drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
                  <p className="text-sm font-mono text-slate-400">
                    <span className="text-pink-500">const</span> <span className="text-brand-secondary">developer</span> = {'{'}
                    <br />
                    <span className="ml-4">name: <span className="text-emerald-400">"Jestin Shaji"</span>,</span>
                    <br />
                    <span className="ml-4">location: <span className="text-emerald-400">"Kerala, India"</span>,</span>
                    <br />
                    <span className="ml-4">passion: <span className="text-emerald-400">"Full-Stack Web"</span></span>
                    <br />
                    {'}'};
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col items-center mb-16 space-y-4 text-center"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-light text-sm font-medium shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              Technical Arsenal
            </div>
            <h3 className="text-4xl font-bold text-white md:text-5xl">My <span className="text-gradient">Expertise</span></h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-3"
          >
            {SKILLS.map((skillGroup, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative p-8 rounded-3xl glass-panel hover:bg-white/[0.04] transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(139,92,246,0.15)]"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${skillGroup.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_currentColor]`} />
                <div className={`absolute inset-0 bg-gradient-to-br ${skillGroup.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-center mb-6 space-x-4">
                    <div className={`p-3 rounded-2xl bg-brand-dark/80 border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300`}>
                      <skillGroup.icon className="w-6 h-6 text-brand-light group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-light transition-all duration-300">
                      {skillGroup.category}
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {skillGroup.items.map((item, j) => (
                      <li key={j} className="flex items-center text-slate-400 group-hover:text-slate-200 transition-colors duration-300 font-light">
                        <ChevronRight className="w-4 h-4 mr-2 text-brand-primary/50 group-hover:text-brand-primary transition-colors duration-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 space-y-4"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-light text-sm font-medium shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              Recent Work
            </div>
            <h3 className="text-4xl font-bold text-white md:text-5xl">Featured <span className="text-gradient">Projects</span></h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {PROJECTS.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group flex flex-col h-full glass-panel rounded-2xl overflow-hidden hover:border-brand-primary/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_50px_rgba(139,92,246,0.2)] transition-all duration-500"
              >
                <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-brand-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl z-0" />
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <h4 className="mb-4 text-2xl font-bold text-white group-hover:text-brand-light transition-colors duration-300">{project.title}</h4>
                  <p className="flex-1 text-slate-400 font-light leading-relaxed mb-6 group-hover:text-slate-300 transition-colors duration-300">{project.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-semibold text-brand-light bg-brand-primary/20 rounded-full border border-brand-primary/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 pb-32 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative p-12 text-center md:p-20 overflow-hidden glass-panel border border-brand-primary/20 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
          >
            <div className="absolute inset-0 bg-noise mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h3 className="text-4xl font-bold text-white md:text-5xl">Let's Build Something <span className="text-gradient">Great</span></h3>
              <p className="text-xl text-slate-400 font-light">
                I'm actively seeking internships and junior developer roles where I can contribute and grow.
              </p>

              <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                <a
                  href="mailto:jestinshaji777@gmail.com"
                  className="inline-flex items-center justify-center px-10 py-5 font-bold text-brand-dark bg-brand-light rounded-full hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all gap-2 transform hover:-translate-y-1"
                >
                  <Mail className="w-5 h-5" /> Say Hello
                </a>
              </div>

              <div className="flex items-center justify-center pt-8 space-x-6 text-slate-400">
                <a href="https://github.com/jestin-16" target="_blank" rel="noreferrer" className="p-3 transition-colors border rounded-full border-white/10 bg-brand-dark/50 hover:text-white hover:border-brand-primary/50 hover:bg-brand-primary/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/jestin-shaji" target="_blank" rel="noreferrer" className="p-3 transition-colors border rounded-full border-white/10 bg-brand-dark/50 hover:text-white hover:border-brand-secondary/50 hover:bg-brand-secondary/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>
        </div>
      </div>
    </ReactLenis>
  );
};

export default App;
