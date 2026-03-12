import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillEditor = ({ skills }) => {
  const [activeTab, setActiveTab] = useState(0);

  const ProgressBar = ({ progress }) => (
    <div className="flex items-center space-x-2">
      <div className="text-slate-500 font-mono">[</div>
      <div className="flex-1 h-3 bg-brand-void rounded-sm overflow-hidden flex">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-brand-primary h-full shadow-[0_0_10px_rgba(0,255,136,0.3)]"
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 10px)' 
          }}
        />
        <div className="flex-1 bg-slate-800 h-full" />
      </div>
      <div className="text-slate-500 font-mono">]</div>
      <div className="text-brand-primary font-mono text-xs w-10 text-right">{progress}%</div>
    </div>
  );

  return (
    <div className="terminal-window h-[400px] flex flex-col">
      {/* Editor Tabs */}
      <div className="flex bg-brand-void/50 border-b border-white/5">
        {skills.map((group, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-6 py-2 text-xs font-mono transition-colors border-r border-white/5 ${
              activeTab === i ? 'bg-brand-surface text-brand-primary' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {group.filename}
          </button>
        ))}
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-6 font-mono text-sm overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {skills[activeTab].items.map((skill, j) => (
              <div key={j} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-brand-warning">@Skill</span>
                  <span className="text-slate-400">(level=</span>
                  <span className="text-brand-secondary">"{skill.level}"</span>
                  <span className="text-slate-400">)</span>
                  <span className="text-brand-danger">String</span>
                  <span className="text-brand-code">{skill.name}</span>
                  <span className="text-slate-400">=</span>
                  <span className="text-brand-secondary">"{skill.version}"</span>
                  <span className="text-slate-400">;</span>
                </div>
                <ProgressBar progress={skill.progress} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillEditor;
