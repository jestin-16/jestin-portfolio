import React, { useState, useEffect } from 'react';


// Inline Icons (lucide-react equivalents using simple SVG for guaranteed functionality)

// Icon for the Skills section - Code
const CodeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);

// Icon for the Projects section - Folder
const FolderIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2z"></path></svg>
);

// Icon for the Contact section - Mail
const MailIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
);

// Icon for social links - GitHub
const GitHubIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.75c3.8-.4 7.7-1.9 7.7-8.2s-2.1-4.8-4.7-5.5c.3-1.04.5-2.08-.2-2.92-1-1.04-3.1-1.12-4.5.34-1.2-.33-2.6-.5-4-.5s-2.8.17-4 .5c-1.4-1.46-3.5-1.38-4.5-.34-.7.84-.5 1.88-.2 2.92-2.6.7-4.7 2.3-4.7 5.5s3.9 7.8 7.7 8.2c-.6.5-1 1.4-1 2.4v4"></path></svg>
);

// Icon for social links - LinkedIn
const LinkedInIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 0-6 6v7h-4v-7a6 6 0 0 1 6-6 6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);


// --- Mock Data ---
const SKILLS = [
  { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Redux", "HTML5", "CSS3"] },
  { category: "Backend", items: ["Node.js", "Express", "Python", "SQL (PostgreSQL)", "MongoDB", "REST APIs"] },
  { category: "DevOps & Tools", items: ["Git/GitHub", "Docker", "AWS (S3, EC2)", "Jira", "CI/CD", "VS Code"] },
];

// --- Utility Functions ---

// Smooth scrolling function
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};


// --- Main Component ---

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Simple intersection observer to update active link on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.5 }
    );

    ['home', 'about', 'skills', 'cv', 'contact'].forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Navigation Links Component
  const NavLink = ({ id, label }) => (
    <li
      className={`cursor-pointer transition duration-300 px-3 py-1 rounded-full ${
        activeSection === id
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'text-slate-300 hover:text-indigo-400 hover:bg-slate-800'
      }`}
      onClick={() => scrollToSection(id)}
    >
      {label}
    </li>
  );

  return (
    <div className="min-h-screen font-sans bg-slate-900 text-slate-200">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b shadow-xl backdrop-blur-sm bg-slate-900/95 border-slate-800">
        <div className="flex justify-between items-center px-4 mx-auto max-w-7xl h-16 sm:px-6 lg:px-8">
          <div className="text-2xl font-extrabold tracking-wider text-indigo-400 transition-colors cursor-pointer hover:text-indigo-300">
            JESTIN.dev
          </div>
          <nav>
            <ul className="flex space-x-2 text-sm font-medium sm:space-x-4">
              <NavLink id="home" label="Home" />
              <NavLink id="about" label="About" />
              <NavLink id="skills" label="Skills" />
              <NavLink id="cv" label="CV" />
              <NavLink id="contact" label="Contact" />
            </ul>
          </nav>
        </div>
      </header>
      
      {/* MAIN CONTENT SECTIONS */}
      <main className="mx-auto max-w-7xl">
        
        {/* 1. HERO SECTION */}
        <section id="home" className="pt-24 pb-32 min-h-[calc(100vh-64px)] flex items-center justify-center text-center px-4">
          <div className="space-y-6">
            <p className="text-xl font-medium text-indigo-400 animate-fadeIn">Hello, my name is</p>
            <h1 className="text-6xl font-extrabold leading-tight text-white sm:text-7xl lg:text-8xl">
              Jestin.
            </h1>
            <h2 className="mx-auto max-w-4xl text-3xl font-bold sm:text-4xl lg:text-5xl text-slate-400">
              I build robust and scalable web applications.
            </h2>
            <p className="pt-4 mx-auto max-w-3xl text-lg text-slate-400">
              I'm a **Software Developer** currently under development (learning and growing!). Thanks for checking out my portfolio. I focus on creating high-performance, user-friendly digital experiences.
            </p>
            <button
              onClick={() => scrollToSection('cv')}
              className="mt-8 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-xl hover:bg-indigo-700 transform hover:scale-[1.02] transition duration-300 ease-in-out border border-transparent hover:border-indigo-400"
            >
              View My Work
            </button>
          </div>
        </section>
        
        {/* 2. ABOUT ME SECTION */}
        <section id="about" className="px-4 py-20 border-t border-slate-800">
          <h3 className="mb-12 text-4xl font-bold text-center text-indigo-400">About Me</h3>
          <div className="grid gap-10 items-start mx-auto max-w-4xl md:grid-cols-3">
            
            {/* Image Placeholder - Use a clear image or avatar later */}
            <div className="flex justify-center md:col-span-1">
              <div className="flex overflow-hidden justify-center items-center w-48 h-48 text-2xl font-bold rounded-full border-4 border-indigo-500 bg-slate-700 text-slate-300">
                J.D.
              </div>
            </div>
            
            <div className="space-y-6 text-lg md:col-span-2 text-slate-300">
              <p>
                My journey as a software developer is driven by a passion for **problem-solving and continuous learning**. I specialize in creating clean, maintainable codebases for modern web applications.
              </p>
              <p>
                Currently, my primary stack revolves around **React, TypeScript, and Tailwind CSS** for building dynamic user interfaces. On the backend, I leverage **Node.js** to construct robust and efficient APIs.
              </p>
              <p>
                When I'm not coding, I enjoy staying updated with the latest technologies and contributing to open-source projects. I believe in the power of collaboration to build truly exceptional software.
              </p>
            </div>
          </div>
        </section>
        
        {/* 3. SKILLS SECTION */}
        <section id="skills" className="px-4 py-20 border-t border-slate-800">
          <h3 className="mb-12 text-4xl font-bold text-center text-indigo-400">Technical Skills</h3>
          
          <div className="grid gap-8 mx-auto max-w-6xl md:grid-cols-3">
            {SKILLS.map((skillGroup, index) => (
              <div
                key={index}
                className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-indigo-500/20 transition duration-300 border border-slate-700 hover:border-indigo-500 transform hover:scale-[1.01]"
              >
                <div className="flex items-center mb-4 space-x-3">
                  <CodeIcon className="w-6 h-6 text-indigo-400" />
                  <h4 className="text-2xl font-semibold text-white">{skillGroup.category}</h4>
                </div>
                <ul className="space-y-2 text-slate-400">
                  {skillGroup.items.map((item, i) => (
                    <li key={i} className="flex items-center text-base">
                      <span className="mr-2 text-indigo-500">&bull;</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        
        {/* 4. CV SECTION */}
        <section id="cv" className="px-4 py-20 border-t border-slate-800">
          <h3 className="mb-12 text-4xl font-bold text-center text-indigo-400">Curriculum Vitae</h3>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-8 text-lg text-slate-400">
              Download my CV to view my experience, education, and skills in detail.
            </p>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center px-8 py-3 font-semibold text-white bg-indigo-600 rounded-lg border border-transparent shadow-xl transition duration-300 ease-in-out hover:bg-indigo-700 hover:border-indigo-400"
            >
              <FolderIcon className="mr-2 w-5 h-5" /> Download CV
            </a>
          </div>
        </section>

        {/* 5. CONTACT SECTION */}
        <section id="contact" className="px-4 py-20 border-t border-slate-800">
          <h3 className="mb-8 text-4xl font-bold text-center text-indigo-400">Get In Touch</h3>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-center text-slate-400">
            I'm currently seeking new opportunities and challenges. Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          
          <div className="flex justify-center">
             <a
              href="mailto:jestinshaji777@gmail.com" // Update with your real email
              className="flex items-center px-8 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-xl transition duration-300 ease-in-out hover:bg-indigo-700"
            >
              <MailIcon className="mr-2 w-5 h-5" /> Say Hello
            </a>
          </div>
        </section>

      </main>
      
      {/* FOOTER */}
      <footer className="py-8 mt-12 w-full border-t bg-slate-900 border-slate-800">
        <div className="px-4 mx-auto max-w-7xl text-center">
          <div className="flex justify-center mb-4 space-x-6">
            <a href="#" className="transition duration-200 text-slate-400 hover:text-indigo-400" title="GitHub">
              <GitHubIcon className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/jestin-shaji" target="_blank" rel="noopener noreferrer" className="transition duration-200 text-slate-400 hover:text-indigo-400" title="LinkedIn">
              <LinkedInIcon className="w-6 h-6" />
            </a>
          </div>
          <p className="text-sm text-slate-500">
            Designed and Developed by Jestin &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
      
    </div>
  );
};

export default App;
