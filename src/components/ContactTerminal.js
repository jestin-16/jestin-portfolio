import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const ContactTerminal = () => {
  return (
    <div className="terminal-window max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.06)] overflow-hidden">
      {/* Header - Minimalist Light */}
      <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2 mr-6 opacity-30">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.25em] font-black">gateway_node // secure_contact_v2</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-12 font-mono">
        <div className="mb-12 border-l-4 border-blue-600/10 pl-10 py-4">
          <motion.h3 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl text-slate-950 font-['Outfit'] font-black mb-4 tracking-tighter italic"
          >
            "Let's architect <span className="text-blue-600">the future</span> together."
          </motion.h3>
          <p className="text-slate-500 font-bold text-lg leading-relaxed opacity-60 italic">Handshake initiated. Ready for connection.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-14">
          {/* Action Part */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="text-[10px] text-slate-400 font-black tracking-[0.35em] uppercase">SYSTEM_POST_REQUEST</div>
              <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 text-[12px] leading-relaxed">
                <div className="text-slate-900 font-black mb-2 tracking-tight">POST <span className="text-blue-600">/api/v2/contact_handshake</span></div>
                <div className="text-slate-500 font-medium">Destination: <span className="text-slate-900 font-bold underline decoration-blue-600/30">jestinshaji777@gmail.com</span></div>
                <div className="text-blue-600/40 mt-5 font-black italic tracking-widest text-[9px]">{"/* SYNC_KEY_ACCEPTED */"}</div>
              </div>
            </div>
            
            <a 
              href="mailto:jestinshaji777@gmail.com"
              className="flex items-center justify-center space-x-4 w-full bg-slate-950 text-white py-6 rounded-full font-black shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 hover:bg-blue-600 hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)] hover:scale-[1.02] active:scale-[0.98] group"
            >
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="font-['Outfit'] tracking-widest uppercase text-xs">Establish Connection</span>
            </a>
          </div>

          {/* Social Endpoints */}
          <div className="space-y-8">
            <div className="text-[10px] text-slate-400 font-black tracking-[0.35em] uppercase">NETWORK_ENDPOINTS</div>
            <div className="space-y-5">
              <a 
                href="https://github.com/jestin-16" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl hover:border-blue-600/20 hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] transition-all duration-500 group"
              >
                <div className="flex items-center space-x-5">
                  <span className="text-[10px] text-slate-300 font-black uppercase tracking-tighter">GET</span>
                  <span className="text-slate-950 font-black italic tracking-tight opacity-70">/jestin-16</span>
                </div>
                <Github className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </a>
              <a 
                href="https://www.linkedin.com/in/jestin-shaji" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl hover:border-blue-600/20 hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] transition-all duration-500 group"
              >
                <div className="flex items-center space-x-5">
                  <span className="text-[10px] text-slate-300 font-black uppercase tracking-tighter">GET</span>
                  <span className="text-slate-950 font-black italic tracking-tight opacity-70">/jestin-shaji</span>
                </div>
                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTerminal;
