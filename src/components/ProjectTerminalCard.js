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
      className="terminal-window group flex flex-col h-full bg-brand-surface/50 hover:border-brand-primary/50 transition-all duration-500"
    >
      {/* Card Header (IDE Style) */}
      <div className="bg-brand-void/50 border-b border-white/5 px-4 py-2 flex items-center justify-between">
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-danger/60 group-hover:bg-brand-danger" />
          <div className="w-2.5 h-2.5 rounded-full bg-brand-warning/60 group-hover:bg-brand-warning" />
          <div className="w-2.5 h-2.5 rounded-full bg-brand-primary/60 group-hover:bg-brand-primary" />
        </div>
        <div className="text-[10px] text-slate-500 font-mono flex items-center space-x-2">
          <Terminal className="w-3 h-3" />
          <span>{project.title.toLowerCase().replace(/\s+/g, '-')}.sh</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col font-mono text-sm relative">
        {/* Fake Git Log */}
        <div className="flex items-center space-x-2 text-[10px] text-brand-secondary mb-4 opacity-70">
          <GitBranch className="w-3 h-3" />
          <span>main</span>
          <span className="text-slate-500">•</span>
          <span>last commit 2h ago</span>
        </div>

        <h4 className="text-lg font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">
          {project.title}
        </h4>
        
        <div className="text-slate-400 text-xs leading-relaxed mb-6 flex-1 italic">
          {"/* "}{project.desc}{" */"}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] text-brand-warning font-mono bg-brand-warning/5 px-2 py-0.5 rounded border border-brand-warning/20">
              @{tag}
            </span>
          ))}
        </div>

        {/* Compile Animation Overlay */}
        <div className="h-12 flex flex-col justify-end">
          {isCompiling && (
            <div className="space-y-1">
              <div className="text-[10px] text-brand-primary animate-pulse">Compiling...</div>
              <div className="w-full h-1 bg-brand-void rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-brand-primary"
                />
              </div>
            </div>
          )}
          {isSuccess && (
            <div className="text-[10px] text-brand-primary font-bold">
              BUILD SUCCESS ✓ [100%]
            </div>
          )}
        </div>

        {/* Buttons (Terminal Command Style) */}
        <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-white/5">
          <button className="flex items-center space-x-2 text-[10px] text-slate-400 hover:text-brand-primary transition-colors group/btn">
            <span className="text-brand-primary opacity-50 group-hover/btn:opacity-100">$</span>
            <span className="flex items-center space-x-1">
              <Github className="w-3 h-3" />
              <span>git clone</span>
            </span>
          </button>
          <button className="flex items-center space-x-2 text-[10px] text-slate-400 hover:text-brand-secondary transition-colors group/btn">
            <span className="text-brand-secondary opacity-50 group-hover/btn:opacity-100">$</span>
            <span className="flex items-center space-x-1">
              <ExternalLink className="w-3 h-3" />
              <span>open demo</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTerminalCard;
