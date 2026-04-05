import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, GitBranch, Package } from 'lucide-react';

const ProjectTerminalCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col h-full bg-white border border-brand-border rounded-lg overflow-hidden transition-all duration-700 hover:border-brand-accent/20"
    >
      {/* Editorial Indicator */}
      <div className="h-1 w-full bg-brand-surface group-hover:bg-brand-accent transition-colors duration-700" />

      {/* Card Content */}
      <div className="p-10 flex-1 flex flex-col relative whitespace-normal">
        {/* Meta Info */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3 text-[9px] text-brand-accent font-black uppercase tracking-[0.4em]">
            <GitBranch className="w-3 h-3" />
            <span>NODE_V1.2_STABLE</span>
          </div>
          <span className="text-[9px] text-brand-muted font-mono uppercase tracking-widest opacity-40">0{project.title.length % 9}.DEPLOY</span>
        </div>

        {/* Title & Description */}
        <div className="space-y-4 mb-10">
          <h4 className="text-3xl font-serif font-black text-brand-primary leading-[1.1] tracking-tight group-hover:text-brand-accent transition-colors duration-500 italic">
            {project.title}
          </h4>
          <p className="text-brand-muted text-[15px] leading-relaxed font-medium opacity-80 line-clamp-3">
            {project.desc}
          </p>
        </div>

        {/* Tech Stack - Editorial Monospace */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10 pb-8 border-b border-brand-border/40">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] text-brand-primary font-black uppercase tracking-tighter opacity-70">
              #{tag.toLowerCase()}
            </span>
          ))}
        </div>

        {/* Actions - Editorial Links */}
        <div className="flex items-center space-x-10 mt-auto">
          <a 
            href="#" 
            className="group/link flex items-center space-x-3 text-[10px] text-brand-primary font-black uppercase tracking-[0.3em] transition-all"
          >
            <Github className="w-4 h-4 text-brand-muted group-hover/link:text-brand-accent transition-colors" />
            <span className="group-hover/link:underline decoration-brand-accent underline-offset-4">Source</span>
          </a>
          <a 
            href="#" 
            className="group/link flex items-center space-x-3 text-[10px] text-brand-accent font-black uppercase tracking-[0.3em] transition-all"
          >
            <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
            <span className="underline decoration-brand-accent/30 underline-offset-4 group-hover/link:underline-offset-8 transition-all">Preview →</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectTerminalCard;
