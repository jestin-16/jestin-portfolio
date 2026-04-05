import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, GitBranch, Package } from 'lucide-react';

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
      className="terminal-window group flex flex-col h-full bg-white border border-slate-200 hover:border-blue-600/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-700 rounded-3xl overflow-hidden"
    >
      {/* Card Header (Bento Style) */}
      <div className="bg-slate-50/50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        </div>
        <div className="text-[10px] text-slate-400 font-mono flex items-center space-x-2 tracking-widest uppercase font-bold">
          <Package className="w-3.5 h-3.5 opacity-50" />
          <span>package // {project.title.toLowerCase().replace(/\s+/g, '_')}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-8 flex-1 flex flex-col font-sans relative">
        <div className="flex items-center space-x-2 text-[10px] text-blue-600 mb-6 font-bold uppercase tracking-widest bg-blue-50/50 w-fit px-3 py-1 rounded-full border border-blue-100">
          <GitBranch className="w-3 h-3" />
          <span>main_stable</span>
        </div>

        <h4 className="text-2xl font-['Outfit'] font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors tracking-tighter italic">
          {project.title}
        </h4>
        
        <div className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 font-medium leading-loose opacity-80 italic">
          {project.desc}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-0.5 opacity-60">
              #{tag}
            </span>
          ))}
        </div>

        {/* Compile Animation Overlay */}
        <div className="h-14 flex flex-col justify-center">
          {isCompiling && (
            <div className="space-y-2">
              <div className="text-[9px] text-blue-600 font-bold tracking-[0.25em] uppercase opacity-60">Optimizing Assets...</div>
              <div className="w-full h-[1.5px] bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                />
              </div>
            </div>
          )}
          {isSuccess && (
            <div className="text-[9px] text-blue-600 font-black tracking-[0.3em] uppercase">
              VERSION_STABLE_READY_TO_DEPLOY ✓
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-6 mt-6 pt-6 border-t border-slate-100">
          <button className="flex items-center space-x-3 text-[11px] text-slate-400 hover:text-slate-900 transition-all font-black tracking-widest uppercase group/btn">
            <Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            <span>SOURCE</span>
          </button>
          <button className="flex items-center space-x-3 text-[11px] text-slate-400 hover:text-blue-600 transition-all font-black tracking-widest uppercase group/btn">
            <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            <span>LIVE_DEMO</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTerminalCard;
