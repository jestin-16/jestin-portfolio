import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, GitBranch, Terminal } from 'lucide-react';

const ProjectTerminalCard = ({ project }) => {
  const [isCompiling, setIsCompiling] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleHover = () => {
    if (!isCompiling && !isSuccess) {
      setIsCompiling(true);
      setTimeout(() => {
        setIsCompiling(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  const handleLeave = () => {
    setIsCompiling(false);
    setIsSuccess(false);
  };

  return (
    <div 
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="terminal-window group flex flex-col h-full glass-panel hover:bg-white/[0.05] hover:border-white/20 transition-all duration-700 rounded-3xl overflow-hidden"
    >
      {/* Card Header (IDE Style) - Minimalist Silver */}
      <div className="bg-white/[0.03] border-b border-white/[0.05] px-5 py-3 flex items-center justify-between">
        <div className="flex space-x-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
          <div className="w-2 h-2 rounded-full bg-white/20 border border-white/5" />
          <div className="w-2 h-2 rounded-full bg-white/20 border border-white/5" />
          <div className="w-2 h-2 rounded-full bg-white/20 border border-white/5" />
        </div>
        <div className="text-[9px] text-slate-500 font-mono flex items-center space-x-2 tracking-widest uppercase">
          <Terminal className="w-3 h-3 opacity-50" />
          <span>{project.title.toLowerCase().replace(/\s+/g, '_')}.v3</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-8 flex-1 flex flex-col font-mono text-sm relative">
        {/* Fake Git Log */}
        <div className="flex items-center space-x-2 text-[9px] text-slate-500 mb-5 font-bold uppercase tracking-widest">
          <GitBranch className="w-3 h-3" />
          <span>origin/main</span>
          <span className="text-slate-800">•</span>
          <span>stable_build</span>
        </div>

        <h4 className="text-2xl font-['Outfit'] font-bold text-white mb-4 group-hover:text-slate-300 transition-colors tracking-tight">
          {project.title}
        </h4>
        
        <div className="text-slate-500 text-xs leading-relaxed mb-8 flex-1 font-light leading-loose">
          {"// "} {project.desc}
        </div>

        <div className="flex flex-wrap gap-2.5 mb-8">
          {project.tags.map(tag => (
            <span key={tag} className="text-[9px] text-slate-400 font-bold uppercase tracking-widest bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.05]">
              {tag}
            </span>
          ))}
        </div>

        {/* Compile Animation Overlay */}
        <div className="h-14 flex flex-col justify-center">
          {isCompiling && (
            <div className="space-y-2">
              <div className="text-[9px] text-white font-bold tracking-[0.2em] uppercase opacity-50">Linking Modules...</div>
              <div className="w-full h-[1px] bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full bg-white shadow-[0_0_10px_white]"
                />
              </div>
            </div>
          )}
          {isSuccess && (
            <div className="text-[9px] text-white font-bold tracking-[0.2em] uppercase">
              DEPLOYMENT_READY ✓
            </div>
          )}
        </div>

        {/* Buttons (Terminal Command Style) */}
        <div className="flex items-center space-x-6 mt-6 pt-6 border-t border-white/[0.05]">
          <button className="flex items-center space-x-2 text-[10px] text-slate-500 hover:text-white transition-all font-bold tracking-widest uppercase group/btn">
            <span className="text-white opacity-20 group-hover/btn:opacity-100">$</span>
            <span className="flex items-center space-x-2">
              <Github className="w-3 h-3" />
              <span>SOURCE</span>
            </span>
          </button>
          <button className="flex items-center space-x-2 text-[10px] text-slate-500 hover:text-white transition-all font-bold tracking-widest uppercase group/btn">
            <span className="text-white opacity-20 group-hover/btn:opacity-100">$</span>
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3 h-3" />
              <span>LIVE_NODE</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTerminalCard;
