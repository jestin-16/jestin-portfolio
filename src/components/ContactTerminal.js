import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const ContactTerminal = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white border border-brand-border rounded-lg overflow-hidden transition-all duration-1000">
      {/* Editorial Header */}
      <div className="bg-brand-surface border-b border-brand-border p-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="w-10 h-[2px] bg-brand-accent scale-x-150 origin-left" />
          <span className="text-[10px] font-mono text-brand-primary uppercase tracking-[0.5em] font-black italic">Communication_Gateway</span>
        </div>
        <div className="hidden sm:flex items-center space-x-6">
          <span className="text-[8px] font-mono text-brand-muted opacity-40 uppercase tracking-widest italic">ESTABLISHED: 2024</span>
          <div className="w-2 h-2 rounded-full border-2 border-brand-accent animate-ping" />
        </div>
      </div>

      {/* Editorial Content Spread */}
      <div className="p-16 md:p-24 bg-white relative">
        <div className="grid lg:grid-cols-12 gap-20">
          
          {/* Column A: Editorial Heading */}
          <div className="lg:col-span-12 space-y-10 border-l-[6px] border-brand-accent pl-12 py-4 mb-10">
             <h3 className="text-6xl md:text-8xl font-serif font-black text-brand-primary leading-[0.9] tracking-tighter italic uppercase">
                Let's <br /> <span className="text-brand-accent">Collaborate.</span>
             </h3>
             <p className="text-brand-muted text-xl md:text-2xl font-medium leading-relaxed max-w-2xl italic">
                Seeking ambitious engineering roles and collaborative architectural challenges. Reach out for technical consultation or professional inquiries.
             </p>
          </div>

          {/* Column B: Active Connection (Col 1-7) */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="text-[10px] text-brand-accent font-black tracking-[0.4em] uppercase font-mono">01. Direct_Access</div>
              <div className="p-10 bg-brand-paper rounded-sm border border-brand-border/40 group hover:border-brand-accent/30 transition-all duration-700">
                <div className="text-brand-primary font-black mb-4 tracking-tight font-serif text-xl italic uppercase">Email Endpoint</div>
                <div className="text-brand-muted font-mono text-xs mb-8 opacity-70">{"// protocol: SMTP // handshake: SECURE"}</div>
                <div className="text-2xl md:text-3xl text-brand-primary font-black tracking-tight break-all underline decoration-brand-accent/10 underline-offset-8">
                  jestinshaji777@gmail.com
                </div>
              </div>
            </div>
            
            <a 
              href="mailto:jestinshaji777@gmail.com"
              className="inline-flex items-center space-x-6 bg-brand-primary text-white px-16 py-7 rounded-full font-black hover:bg-brand-accent transition-all duration-700 group shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_50px_rgba(227,0,15,0.4)]"
            >
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="font-mono tracking-[0.3em] uppercase text-[10px]">Establish Connection</span>
            </a>
          </div>

          {/* Column C: Network Nodes (Col 8-12) */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="text-[10px] text-brand-muted font-black tracking-[0.4em] uppercase font-mono">02. Network_Nodes</div>
              <div className="grid gap-6">
                <a 
                  href="https://github.com/jestin-16" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-8 bg-white border border-brand-border hover:border-brand-accent/30 transition-all duration-500 group"
                >
                  <div className="flex flex-col">
                    <span className="text-[9px] text-brand-muted font-black uppercase tracking-widest mb-1 opacity-50">Remote: Github</span>
                    <span className="text-brand-primary font-serif font-black italic text-lg uppercase">/jestin-16</span>
                  </div>
                  <Github className="w-5 h-5 text-brand-muted group-hover:text-brand-accent transition-colors" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/jestin-shaji" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-8 bg-white border border-brand-border hover:border-brand-accent/30 transition-all duration-500 group"
                >
                   <div className="flex flex-col">
                    <span className="text-[9px] text-brand-muted font-black uppercase tracking-widest mb-1 opacity-50">Remote: LinkedIn</span>
                    <span className="text-brand-primary font-serif font-black italic text-lg uppercase">/jestin-shaji</span>
                  </div>
                  <Linkedin className="w-5 h-5 text-brand-muted group-hover:text-brand-accent transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Grid Marker */}
        <div className="absolute bottom-10 right-10 flex space-x-2 opacity-10">
           <div className="w-4 h-4 border border-black" />
           <div className="w-4 h-4 border border-black bg-brand-accent" />
           <div className="w-4 h-4 border border-black" />
        </div>
      </div>
    </div>
  );
};

export default ContactTerminal;
