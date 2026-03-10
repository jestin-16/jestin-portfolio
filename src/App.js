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

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
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
    <div className="min-h-screen font-sans bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

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
              ? 'bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] max-w-4xl'
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
          <div className="max-w-3xl space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block px-6 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md text-indigo-300 text-sm font-semibold tracking-wide mb-6 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
            >
              ✨ MCA Student & Aspirant
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              Hi, I'm{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
                  Jestin
                </span>
                <motion.span
                  className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 blur-2xl flex"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mx-auto text-lg leading-relaxed text-slate-400 md:text-xl"
            >
              I turn complex problems into elegant, robust web solutions.
              Focused on full‑stack development, database architecture, and automation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center gap-6 pt-8 sm:flex-row"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-all rounded-full bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              >
                View My Work
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold transition-all border rounded-full text-slate-300 border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:text-white"
              >
                Contact Me
              </button>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative p-8 md:p-12 bg-white/[0.03] border border-white/10 rounded-[2.5rem] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5" />
            <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Code2 className="w-5 h-5" />
                  <span className="text-sm font-semibold tracking-wider uppercase">About Me</span>
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
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 rounded-2xl blur-2xl" />
                <div className="relative aspect-square md:aspect-[4/3] rounded-2xl border border-white/10 bg-slate-900/50 p-6 flex flex-col justify-center items-center text-center">
                  <Terminal className="w-16 h-16 mb-4 text-indigo-400" />
                  <p className="text-sm font-mono text-slate-400">
                    <span className="text-pink-400">const</span> <span className="text-blue-400">developer</span> = {'{'}
                    <br />
                    <span className="ml-4">name: <span className="text-green-400">"Jestin Shaji"</span>,</span>
                    <br />
                    <span className="ml-4">location: <span className="text-green-400">"Kerala, India"</span>,</span>
                    <br />
                    <span className="ml-4">passion: <span className="text-green-400">"Full-Stack Web"</span></span>
                    <br />
                    {'}'};
                  </p>
                </div>
              </div>
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
                className="group relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-white/10 transition-all hover:bg-slate-800/50 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${skillGroup.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`absolute inset-0 bg-gradient-to-br ${skillGroup.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="flex items-center mb-6 space-x-4">
                    <div className={`p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-white shadow-lg`}>
                      <skillGroup.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
                      {skillGroup.category}
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {skillGroup.items.map((item, j) => (
                      <li key={j} className="flex items-center text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                        <ChevronRight className="w-4 h-4 mr-2 text-indigo-400/70 group-hover:text-indigo-400 transition-colors duration-300" />
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
                whileHover={{ y: -8 }}
                className="flex flex-col h-full bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-all duration-300"
              >
                <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl z-0" />
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <h4 className="mb-4 text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">{project.title}</h4>
                  <p className="flex-1 text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors duration-300">{project.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium text-indigo-300 bg-indigo-500/10 rounded-full border border-indigo-500/20">
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
        <section id="contact" className="py-24 pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative p-12 text-center md:p-20 overflow-hidden bg-gradient-to-b from-indigo-900/20 to-slate-900/40 border border-white/10 rounded-[3rem]"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h3 className="text-4xl font-bold text-white md:text-5xl">Let's Build Something Great</h3>
              <p className="text-xl text-slate-400">
                I'm actively seeking internships and junior developer roles where I can contribute and grow.
              </p>

              <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                <a
                  href="mailto:jestinshaji777@gmail.com"
                  className="inline-flex items-center justify-center px-8 py-4 font-semibold text-slate-900 bg-white rounded-full hover:bg-slate-200 transition-colors gap-2"
                >
                  <Mail className="w-5 h-5" /> Say Hello
                </a>
              </div>

              <div className="flex items-center justify-center pt-8 space-x-6 text-slate-400">
                <a href="https://github.com/jestin-16" target="_blank" rel="noreferrer" className="p-3 transition-colors border rounded-full border-slate-700 bg-slate-800/50 hover:text-white hover:border-white/30 hover:bg-slate-700">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/jestin-shaji" target="_blank" rel="noreferrer" className="p-3 transition-colors border rounded-full border-slate-700 bg-slate-800/50 hover:text-white hover:border-white/30 hover:bg-slate-700">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-8 text-center border-t text-slate-500 border-white/5 bg-slate-950">
        <p>© {new Date().getFullYear()} Jestin Shaji. Designed with Purpose.</p>
      </footer>
    </div>
  );
};

export default App;
