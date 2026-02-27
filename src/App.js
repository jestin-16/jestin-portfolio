import React, { useState, useEffect } from 'react';

// Inline Icons
const CodeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);

const MailIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
);

const GitHubIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.75c3.8-.4 7.7-1.9 7.7-8.2s-2.1-4.8-4.7-5.5c.3-1.04.5-2.08-.2-2.92-1-1.04-3.1-1.12-4.5.34-1.2-.33-2.6-.5-4-.5s-2.8.17-4 .5c-1.4-1.46-3.5-1.38-4.5-.34-.7.84-.5 1.88-.2 2.92-2.6.7-4.7 2.3-4.7 5.5s3.9 7.8 7.7 8.2c-.6.5-1 1.4-1 2.4v4"></path></svg>
);

const LinkedInIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 0-6 6v7h-4v-7a6 6 0 0 1 6-6 6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

// Updated Skills based on your profile
const SKILLS = [
  { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express.js", "Supabase", "SQL", "REST APIs"] },
  { category: "Programming & Tools", items: ["Python", "Java", "Git/GitHub", "VS Code", "PostgreSQL"] },
];

const PROJECTS = [
  {
    title: "College Lab Automation System",
    desc: "Barcode-based attendance and automatic system allocation for students across 46 lab systems with database tracking.",
  },
  {
    title: "Event Management System (Global Events)",
    desc: "Web-based platform to manage customers, workers, events, and complaints for an event firm.",
  },
  {
    title: "Expense Tracker (Student Project)",
    desc: "Full‑stack expense tracking app with authentication and Supabase backend integration.",
  },
];

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: 'smooth' });
};

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    ['home', 'about', 'skills', 'projects', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const NavLink = ({ id, label }) => (
    <li
      className={`cursor-pointer px-3 py-1 rounded-full ${activeSection === id ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-indigo-400'}`}
      onClick={() => scrollToSection(id)}
    >
      {label}
    </li>
  );

  return (
    <div className="min-h-screen font-sans bg-slate-900 text-slate-200">
      {/* Header */}
      <header className="sticky top-0 border-b bg-slate-900/95 border-slate-800">
        <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
          <div className="text-2xl font-bold text-indigo-400">Jestin.dev</div>
          <ul className="flex space-x-4 text-sm">
            <NavLink id="home" label="Home" />
            <NavLink id="about" label="About" />
            <NavLink id="skills" label="Skills" />
            <NavLink id="projects" label="Projects" />
            <NavLink id="contact" label="Contact" />
          </ul>
        </div>
      </header>

      <main className="mx-auto max-w-7xl">
        {/* Hero */}
        <section id="home" className="flex items-center justify-center min-h-screen px-4 text-center">
          <div className="space-y-6">
            <p className="text-xl text-indigo-400">Hello, I'm</p>
            <h1 className="text-6xl font-extrabold text-white">Jestin Shaji</h1>
            <h2 className="text-3xl text-slate-400">MCA Student & Aspiring Software Developer</h2>
            <p className="max-w-2xl mx-auto text-slate-400">
              I’m an MCA student from Kerala focused on full‑stack web development. I build practical software projects involving databases, automation systems, and modern web technologies.
            </p>
            <button onClick={() => scrollToSection('projects')} className="px-6 py-3 bg-indigo-600 rounded-lg">
              View Projects
            </button>
          </div>
        </section>

        {/* About */}
        <section id="about" className="px-4 py-20 border-t border-slate-800">
          <h3 className="mb-10 text-4xl text-center text-indigo-400">About Me</h3>
          <div className="max-w-3xl mx-auto space-y-4 text-lg text-slate-300">
            <p>
              I am currently pursuing Master of Computer Applications (MCA) and actively building skills in software development and system design.
            </p>
            <p>
              My interests include full‑stack development, database systems, and automation solutions. I enjoy turning real‑world problems into working software products.
            </p>
            <p>
              I’m continuously learning React, backend development, and cloud‑based tools while developing academic and personal projects.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="px-4 py-20 border-t border-slate-800">
          <h3 className="mb-12 text-4xl text-center text-indigo-400">Skills</h3>
          <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-3">
            {SKILLS.map((g, i) => (
              <div key={i} className="p-6 border bg-slate-800 rounded-xl border-slate-700">
                <div className="flex items-center mb-4 space-x-2">
                  <CodeIcon className="text-indigo-400" />
                  <h4 className="text-xl font-semibold text-white">{g.category}</h4>
                </div>
                <ul className="space-y-2 text-slate-400">
                  {g.items.map((it, j) => <li key={j}>• {it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="px-4 py-20 border-t border-slate-800">
          <h3 className="mb-12 text-4xl text-center text-indigo-400">Projects</h3>
          <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <div key={i} className="p-6 border bg-slate-800 rounded-xl border-slate-700">
                <h4 className="mb-2 text-xl font-semibold text-white">{p.title}</h4>
                <p className="text-slate-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-4 py-20 text-center border-t border-slate-800">
          <h3 className="mb-6 text-4xl text-indigo-400">Contact</h3>
          <p className="mb-8 text-slate-400">Open to internships and junior developer opportunities.</p>
          <a href="mailto:jestinshaji777@gmail.com" className="inline-flex items-center px-6 py-3 bg-indigo-600 rounded-lg">
            <MailIcon className="mr-2" /> Email Me
          </a>
          <div className="flex justify-center mt-8 space-x-6">
            <a href="https://github.com/jestin-16" target="_blank" rel="noreferrer"><GitHubIcon /></a>
            <a href="https://www.linkedin.com/in/jestin-shaji" target="_blank" rel="noreferrer"><LinkedInIcon /></a>
          </div>
        </section>
      </main>

      <footer className="py-6 text-center border-t text-slate-500 border-slate-800">
        © {new Date().getFullYear()} Jestin Shaji
      </footer>
    </div>
  );
};

export default App;
