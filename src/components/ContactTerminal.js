import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const ContactTerminal = () => {
  return (
    <div className="terminal-window max-w-4xl mx-auto glass-panel">
      {/* Header - Minimalist Silver */}
      <div className="bg-white/[0.03] border-b border-white/[0.08] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 mr-4 opacity-50">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">stellar_core // contact_gateway</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-10 font-mono">
        <div className="mb-10 border-l-[0.5px] border-white/20 pl-8 py-2">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl text-white font-['Outfit'] font-bold mb-4 tracking-tight"
          >
            "Ready to build something <span className="text-slate-400 font-light italic">extraordinary</span>?"
          </motion.h3>
          <p className="text-slate-500 font-light text-lg">Let's connect and architect the future.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Action Part */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="text-[9px] text-slate-600 font-bold tracking-[0.3em] uppercase">SYSTEM_REQUEST</div>
              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/[0.05] text-xs">
                <div className="text-white opacity-80 font-bold mb-1">POST <span className="text-slate-500 font-normal">/contact/message HTTP/3.0</span></div>
                <div className="text-slate-400">Destination: <span className="text-white opacity-60 courier">jestinshaji777@gmail.com</span></div>
                <div className="text-slate-700 mt-3 font-italic">{"/* Handshake initiated... */"}</div>
              </div>
            </div>
            
            <a 
              href="mailto:jestinshaji777@gmail.com"
              className="flex items-center justify-center space-x-3 w-full bg-white text-brand-void py-5 rounded-full font-bold transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] group"
            >
              <Mail className="w-5 h-5" />
              <span className="font-['Outfit'] tracking-wide">INITIALIZE_CHAT</span>
            </a>
          </div>

          {/* Social Endpoints */}
          <div className="space-y-6">
            <div className="text-[9px] text-slate-600 font-bold tracking-[0.3em] uppercase">CLOUD_ENDPOINTS</div>
            <div className="space-y-4">
              <a 
                href="https://github.com/jestin-16" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 group"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-[10px] text-slate-600 font-bold">GET</span>
                  <span className="text-slate-300 font-light">/github/profile</span>
                </div>
                <Github className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://www.linkedin.com/in/jestin-shaji" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 group"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-[10px] text-slate-600 font-bold">GET</span>
                  <span className="text-slate-300 font-light">/linkedin/network</span>
                </div>
                <Linkedin className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTerminal;
