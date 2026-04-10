import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from '@studio-freight/react-lenis';
import HeroReveal from './components/HeroReveal';
import CustomCursor from './components/CustomCursor';
import Magnetic from './components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Lab Automation",
    category: "Full Stack / Java",
    year: "2024",
    link: "#"
  },
  {
    title: "Event Harmony",
    category: "Express / Systems",
    year: "2023",
    link: "#"
  },
  {
    title: "Stash Track",
    category: "Supabase / React",
    year: "2024",
    link: "#"
  },
];

const SKILLS = [
  "Java", "Spring Boot", "Microservices", "PostgreSQL", "Node.js", "Docker", "Git", "REST APIs"
];

const App = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Select all sections EXCEPT the home which has its own entry animation
    const sections = gsap.utils.toArray('section:not(#home)');
    
    sections.forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Refresh ScrollTrigger after a small delay to ensure all markers and triggers are correct
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, { scope: containerRef });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="noise-overlay" />
      <CustomCursor />

      <div ref={containerRef} className="min-h-screen bg-brand-void text-brand-primary selection:bg-brand-primary selection:text-brand-void">

        {/* Navigation */}
        <header className="fixed top-0 left-0 w-full z-50 px-8 py-10 flex justify-between items-center mix-blend-difference">
          <Magnetic>
            <div
              className="text-xl font-serif font-black italic tracking-tighter cursor-pointer p-2"
              onClick={() => scrollToSection('home')}
            >
              JESTIN_S
            </div>
          </Magnetic>

          <nav className="flex space-x-12">
            {['home', 'about', 'projects', 'contact'].map((id) => (
              <Magnetic key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className="text-[10px] uppercase font-mono tracking-[0.4em] hover:text-brand-muted transition-colors interactive p-2"
                  data-cursor-text="view"
                >
                  {id}
                </button>
              </Magnetic>
            ))}
          </nav>
        </header>


        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center px-8 md:px-24">
          <HeroReveal />
        </section>

        {/* About Section - Super Minimal */}
        <section id="about" className="py-64 px-8 md:px-24 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-32">
            <div className="space-y-12">
              <h2 className="text-6xl md:text-8xl leading-none">
                Logic <br /> <span className="text-outline italic">Over</span> <br /> Hype.
              </h2>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-[1px] bg-brand-primary" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-brand-muted">EST 1999 // IN</span>
              </div>
            </div>
            <div className="flex flex-col justify-end space-y-12">
              <p className="text-2xl md:text-3xl font-medium leading-tight text-brand-muted">
                Architecting resilient <span className="text-brand-primary">backend engines</span> with a focus on scalability and clean structure. Specialist in Java Ecosystem and Cloud Resilience.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-12 border-t border-brand-border">
                {SKILLS.map((skill, i) => (
                  <div key={i} className="text-[10px] font-mono tracking-widest uppercase interactive" data-cursor-text="skill">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section - Typography-Led Cards */}
        <section id="projects" className="py-64 px-8 md:px-24">
          <div className="max-w-7xl mx-auto space-y-32">
            <div className="flex justify-between items-end">
              <h2 className="text-6xl md:text-9xl tracking-tighter italic">Selected_ <br /> <span className="ml-24">Works.</span></h2>
              <span className="font-mono text-[10px] mb-4 text-brand-muted uppercase tracking-[0.5em]">[03]</span>
            </div>

            <div className="divide-y divide-brand-border border-t border-b border-brand-border">
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={i}
                  className="group relative py-12 flex flex-col md:flex-row justify-between items-baseline interactive"
                  data-cursor-text="explore"
                  whileHover={{ x: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="flex flex-col md:flex-row items-baseline gap-8">
                    <span className="font-mono text-xs text-brand-muted">0{i + 1}</span>
                    <h3 className="text-4xl md:text-7xl group-hover:italic transition-all duration-300">{project.title}</h3>
                  </div>
                  <div className="flex items-center gap-12 mt-4 md:mt-0">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">{project.category}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest">{project.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-64 px-8 md:px-24">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <h2 className="text-6xl md:text-9xl leading-[0.8]">Let's <br /> <span className="text-outline">Sync.</span></h2>
            <div className="flex flex-col items-center space-y-8">
              <a
                href="mailto:hello@jestin.me"
                className="text-2xl md:text-5xl font-serif font-black italic hover:text-brand-muted transition-colors interactive underline decoration-brand-border underline-offset-12"
                data-cursor-text="mail"
              >
                hello@jestin.me
              </a>
              <div className="flex space-x-12 pt-12">
                {['LinkedIn', 'GitHub', 'Twitter'].map(link => (
                  <button key={link} className="font-mono text-[10px] uppercase tracking-[0.5em] hover:text-brand-muted transition-colors interactive">
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-10 border-t border-brand-border flex justify-between items-center font-mono text-[9px] uppercase tracking-widest text-brand-muted">
          <div>© 2024 J_SHAJI // ARCHITECT</div>
          <div>BASED_IN_INDIA</div>
        </footer>

      </div>
    </ReactLenis>
  );
};

export default App;
