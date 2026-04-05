import React from 'react';
import { motion } from 'framer-motion';
import { FileCode, FileJson, Terminal, Package, Mail } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'jestin.java', icon: FileCode },
  { id: 'about', label: 'about.json', icon: FileJson },
  { id: 'skills', label: 'skills.sh', icon: Terminal },
  { id: 'projects', label: 'projects.yml', icon: Package },
  { id: 'contact', label: 'contact.http', icon: Mail },
];

const VSCodeTabs = ({ activeSection, onTabClick }) => {
  return (
    <div className="flex items-center bg-brand-void/50 backdrop-blur-md border-b border-white/5 px-2 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeSection === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 text-xs font-mono transition-all relative border-r border-white/5 min-w-fit ${
              isActive 
                ? 'bg-brand-surface text-brand-primary' 
                : 'text-slate-500 hover:bg-brand-surface/50 hover:text-slate-300'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-primary' : 'text-slate-500'}`} />
            <span>{tab.label}</span>
            {isActive && (
              <motion.div                 layoutId="activeTabUnderline"
                 className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)]"
               />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default VSCodeTabs;
