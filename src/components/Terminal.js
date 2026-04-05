import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Terminal = ({ commands = [] }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex < commands.length) {
      const command = commands[currentLineIndex];
      let charIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (charIndex < command.input.length) {
          setCurrentText(prev => prev + command.input.charAt(charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setDisplayedLines(prev => [...prev, { type: 'input', text: command.input }, { type: 'output', text: command.output }]);
            setCurrentText("");
            setCurrentLineIndex(prev => prev + 1);
          }, 600);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    } else {
      setIsTyping(false);
    }
  }, [currentLineIndex, commands]);

  return (
    <div className="w-full h-full flex flex-col font-mono text-xs bg-white border border-brand-border rounded-lg overflow-hidden transition-all duration-700">
      {/* OS Chrome - Editorial Minimal */}
      <div className="bg-brand-surface border-b border-brand-border px-6 py-4 flex items-center justify-between">
        <div className="flex space-x-3">
          <div className="w-2 h-2 rounded-full bg-brand-accent/40" />
          <div className="w-2 h-2 rounded-full bg-brand-accent/40" />
          <div className="w-2 h-2 rounded-full bg-brand-accent/40" />
        </div>
        <div className="text-[9px] text-brand-muted uppercase tracking-[0.4em] font-black italic">Runtime_Instance_V1.1</div>
        <div className="w-12" />
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-10 overflow-y-auto no-scrollbar font-mono leading-relaxed">
        {displayedLines.map((line, i) => (
          <div key={i} className="mb-6">
            {line.type === 'input' ? (
              <div className="flex space-x-4 items-start">
                <span className="text-brand-accent font-black mt-1">λ</span>
                <span className="text-brand-primary font-black tracking-tight text-[13px]">{line.text}</span>
              </div>
            ) : (
              <div className="text-brand-muted pl-8 border-l border-brand-accent/20 mt-3 text-[12px] font-medium leading-relaxed opacity-90">
                <span className="text-brand-accent font-black mr-2 opacity-50">{"//"}</span>
                {line.text}
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex space-x-4 items-center">
            <span className="text-brand-accent font-black">λ</span>
            <span className="text-brand-primary font-black text-[13px]">{currentText}</span>
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="w-1.5 h-4 bg-brand-accent inline-block"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
