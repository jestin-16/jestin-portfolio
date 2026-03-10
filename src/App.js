import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    color: "from-blue-400 to-cyan-400"
  },
  {
    category: "Backend",
    icon: Database,
    items: ["Node.js", "Express.js", "Supabase", "SQL", "REST APIs"],
    color: "from-purple-400 to-pink-400"
  },
  {
    category: "Tools & Others",
    icon: Terminal,
    items: ["Python", "Java", "Git/GitHub", "VS Code", "PostgreSQL"],
    color: "from-emerald-400 to-teal-400"
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

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const floatOrb = {
  initial: { opacity: 0, scale: 0.9, y: 40 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut"
    }
  }
};

const floatSlow = {
  animate: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 18,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

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
          className="absolute inset-0 z-[-1] rounded-full bg-indigo-500/20 border border-indigo-500/30"
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        />
      )}
    </li>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen font-sans bg-slate-950 text-slate-200 selection:bg-indigo-500/30"
    >
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={floatOrb}
          initial="initial"
          animate="animate"
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]"
        />
        <motion.div
          variants={floatOrb}
          initial="initial"
          animate="animate"
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px]"
        />
        <motion.div
          {...floatSlow}
          className="absolute left-1/2 top-1/2 w-[26rem] h-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[110px]"
        />
      </div>

      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
          }`}
      >
        <div className="px-6 mx-auto max-w-7xl">
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex items-center justify-between mx-auto transition-all duration-300 rounded-full px-6 py-3 ${scrolled
              ? 'bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-lg max-w-4xl'
              : 'bg-transparent max-w-7xl'
              }`}
          >
            <div className="text-xl font-bold tracking-tight text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
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

      <main className="relative z-10 px-4 mx-auto max-w-7xl">
        {/* Hero Section */}
        <section id="home" className="flex items-center justify-center min-h-screen pt-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-4"
            >
              MCA Student & Aspirant
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
                Jestin
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-2xl mx-auto text-lg leading-relaxed text-slate-400 md:text-xl"
            >
              I turn complex problems into elegant, robust web solutions.
              Focused on full‑stack development, database architecture, and automation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col justify-center gap-4 pt-4 sm:flex-row"
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-all rounded-full bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_0_24px_rgba(99,102,241,0.6)]"
              >
                View My Work
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold transition-all border rounded-full text-slate-300 border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:text-white"
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="p-8 border md:p-12 bg-white/[0.02] border-white/10 rounded-3xl backdrop-blur-sm"
          >
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-cyan-400">
                  <Code2 className="w-6 h-6" />
                  <span className="font-semibold tracking-wider uppercase">About Me</span>
                </div>
                <h3 className="text-3xl font-bold text-white md:text-4xl">Building Software with Purpose</h3>
                <div className="space-y-4 text-lg text-slate-400">
                  <p>
                    Currently pursuing my Master of Computer Applications (MCA) in Kerala, I am deeply passionate about
                    system design and scalable engineering solutions.
                  </p>
                  <p>
                    Beyond theory, I love diving into real‑world problems. Whether it's managing a lab of 46 systems or structuring large datasets for global events, I strive to write clean, maintainable code.
                  </p>
                </div>
              </div>
              <motion.div
                className="relative"
                whileHover={{ y: -6, rotate: -1.5 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/25 to-cyan-500/25 rounded-2xl blur-2xl" />
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative aspect-square md:aspect-[4/3] rounded-2xl border border-white/10 bg-slate-900/60 p-6 flex flex-col justify-center items-center text-center shadow-[0_18px_60px_rgba(15,23,42,0.9)]"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Terminal className="w-16 h-16 mb-4 text-indigo-400" />
                  </motion.div>
                  <p className="text-sm font-mono text-slate-400">
                    <span className="text-pink-400">const</span> <span className="text-blue-400">developer</span> = {'{'}
                    <br />
                    &nbsp;&nbsp;name: <span className="text-green-400">"Jestin Shaji"</span>,
                    <br />
                    &nbsp;&nbsp;location: <span className="text-green-400">"Kerala, India"</span>,
                    <br />
                    &nbsp;&nbsp;passion: <span className="text-green-400">"Full-Stack Web"</span>
                    <br />
                    {'}'};
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col items-center mb-16 space-y-4 text-center"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-sm font-medium">
              Technical Arsenal
            </div>
            <h3 className="text-4xl font-bold text-white md:text-5xl">My Expertise</h3>
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
                whileHover={{ y: -8, scale: 1.02, rotate: -0.5 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-white/15 transition-all hover:bg-slate-800/60 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${skillGroup.color}`} />
                <div className="flex items-center mb-6 space-x-4">
                  <div className={`p-3 rounded-xl bg-slate-800 text-white`}>
                    <skillGroup.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white">{skillGroup.category}</h4>
                </div>
                <ul className="space-y-3">
                  {skillGroup.items.map((item, j) => (
                    <li key={j} className="flex items-center text-slate-400">
                      <ChevronRight className="w-4 h-4 mr-2 text-indigo-400/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 space-y-4"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium">
              Recent Work
            </div>
            <h3 className="text-4xl font-bold text-white md:text-5xl">Featured Projects</h3>
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
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                className="flex flex-col h-full bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/60 hover:shadow-[0_18px_60px_rgba(15,23,42,0.9)] transition-all duration-300"
              >
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="mb-4 text-2xl font-bold text-white">{project.title}</h4>
                  <p className="flex-1 text-slate-400 leading-relaxed mb-6">{project.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1 text-xs font-medium text-indigo-300 bg-indigo-500/10 rounded-full border border-indigo-500/20"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="relative p-12 text-center md:p-20 overflow-hidden bg-gradient-to-b from-indigo-900/25 to-slate-900/50 border border-white/10 rounded-[3rem]"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h3 className="text-4xl font-bold text-white md:text-5xl">Let's Build Something Great</h3>
              <p className="text-xl text-slate-400">
                I'm actively seeking internships and junior developer roles where I can contribute and grow.
              </p>

              <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                <motion.a
                  href="mailto:jestinshaji777@gmail.com"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center px-8 py-4 font-semibold text-slate-900 bg-white rounded-full hover:bg-slate-200 transition-colors gap-2 shadow-[0_14px_40px_rgba(15,23,42,0.5)]"
                >
                  <Mail className="w-5 h-5" /> Say Hello
                </motion.a>
              </div>

              <div className="flex items-center justify-center pt-8 space-x-6 text-slate-400">
                <motion.a
                  href="https://github.com/jestin-16"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.06, rotate: -3 }}
                  className="p-3 transition-colors border rounded-full border-slate-700 bg-slate-800/50 hover:text-white hover:border-white/40 hover:bg-slate-700"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/jestin-shaji"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.06, rotate: 3 }}
                  className="p-3 transition-colors border rounded-full border-slate-700 bg-slate-800/50 hover:text-white hover:border-white/40 hover:bg-slate-700"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-8 text-center border-t text-slate-500 border-white/5 bg-slate-950">
        <p>© {new Date().getFullYear()} Jestin Shaji. Designed with Purpose.</p>
      </footer>
    </motion.div>
  );
};

export default App;
