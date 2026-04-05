import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillEditor = ({ skills }) => {
  const [activeTab, setActiveTab] = useState(0);

  const ProgressBar = ({ progress }) => (
    <div className="flex items-center space-x-3">
      <div className="text-slate-800 font-mono text-[10px]">{"<"}</div>
      <div className="flex-1 h-[2px] bg-white/5 rounded-full overflow-hidden flex">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="bg-white h-full shadow-[0_0_15px_rgba(255,255,255,0.6)]"
        />
      </div>
      <div className="text-slate-800 font-mono text-[10px]">{">"}</div>
      <div className="text-white font-mono text-[10px] w-8 text-right opacity-40">{progress}%</div>
    </div>
  );

  return (
    <div className="terminal-window h-[450px] flex flex-col glass-panel rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
      {/* Editor Tabs - Minimalist Silver */}
      <div className="flex bg-white/[0.02] border-b border-white/[0.05] p-2 gap-1">
        {skills.map((group, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-6 py-2.5 text-[10px] font-mono transition-all duration-500 rounded-xl tracking-widest uppercase font-bold ${
              activeTab === i ? 'bg-white/5 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'text-slate-600 hover:text-slate-400'
            }`}
          >
            {group.filename}
          </button>
        ))}
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-8 font-mono text-sm overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="space-y-8"
          >
            {skills[activeTab].items.map((skill, j) => (
              <div key={j} className="space-y-3">
                <div className="flex items-center flex-wrap gap-2 text-[11px] tracking-tight">
                  <span className="text-slate-600">@TechnicalIntelligence</span>
                  <span className="text-slate-400 opacity-30">(</span>
                  <span className="text-slate-300">level=</span>
                  <span className="text-white">"{skill.level}"</span>
                  <span className="text-slate-400 opacity-30">)</span>
                  <span className="text-slate-500">Node</span>
                  <span className="text-white font-bold">{skill.name}</span>
                  <span className="text-slate-400 opacity-30">=</span>
                  <span className="text-slate-300">"{skill.version}"</span>
                  <span className="text-slate-400 opacity-30">;</span>
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
