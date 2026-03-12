import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const ContactTerminal = () => {
  return (
    <div className="terminal-window max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-brand-void/50 border-b border-white/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-brand-danger" />
            <div className="w-3 h-3 rounded-full bg-brand-warning" />
            <div className="w-3 h-3 rounded-full bg-brand-primary" />
          </div>
          <span className="text-xs font-mono text-slate-500">jestin@portfolio:~/contact</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 font-mono">
        <div className="mb-8 border-l-2 border-brand-primary pl-6 py-2">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl md:text-3xl text-white font-bold mb-4"
          >
            "Ready to build something that <span className="text-brand-primary">scales</span>?"
          </motion.h3>
          <p className="text-slate-400">Let's connect and ship great software.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Action Part */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-[10px] text-brand-secondary">HTTP REQUEST</div>
              <div className="p-4 bg-brand-void/50 rounded border border-white/5 text-xs">
                <div className="text-brand-danger">POST <span className="text-slate-300">/contact HTTP/1.1</span></div>
                <div className="text-brand-warning">To: <span className="text-brand-secondary">jestinshaji777@gmail.com</span></div>
                <div className="text-slate-500 mt-2">{"// Body content..."}</div>
              </div>
            </div>
            
            <a 
              href="mailto:jestinshaji777@gmail.com"
              className="flex items-center justify-center space-x-3 w-full bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/30 py-4 rounded text-brand-primary font-bold transition-all group"
            >
              <Mail className="w-5 h-5" />
              <span>[ Send Request → ]</span>
            </a>
          </div>

          {/* Social Endpoints */}
          <div className="space-y-4">
            <div className="text-[10px] text-brand-secondary">API ENDPOINTS</div>
            <div className="space-y-3">
              <a 
                href="https://github.com/jestin-16" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-4 bg-brand-void/30 border border-white/5 rounded hover:border-brand-primary/30 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-brand-code">GET</span>
                  <span className="text-slate-300">/github</span>
                </div>
                <Github className="w-4 h-4 text-slate-500 group-hover:text-white" />
              </a>
              <a 
                href="https://www.linkedin.com/in/jestin-shaji" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-4 bg-brand-void/30 border border-white/5 rounded hover:border-brand-secondary/30 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-brand-code">GET</span>
                  <span className="text-slate-300">/linkedin</span>
                </div>
                <Linkedin className="w-4 h-4 text-slate-500 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTerminal;
