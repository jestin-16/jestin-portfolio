import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Terminal = ({ commands = [], prompt = "jestin@portfolio:~$" }) => {
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
    <div className="terminal-window w-full h-full flex flex-col font-mono text-sm shadow-2xl">
      {/* OS Chrome */}
      <div className="bg-brand-surface border-b border-white/5 px-4 py-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-brand-danger opacity-80" />
          <div className="w-3 h-3 rounded-full bg-brand-warning opacity-80" />
          <div className="w-3 h-3 rounded-full bg-brand-primary opacity-80" />
        </div>
        <div className="text-[10px] text-slate-500 uppercase tracking-widest">zsh — 80x24</div>
        <div className="w-12" />
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-6 overflow-y-auto no-scrollbar font-mono">
        {displayedLines.map((line, i) => (
          <div key={i} className="mb-2">
            {line.type === 'input' ? (
              <div className="flex space-x-2">
                <span className="text-brand-primary">{prompt}</span>
                <span className="text-slate-200">{line.text}</span>
              </div>
            ) : (
              <div className="text-brand-code leading-relaxed pl-4 border-l border-white/5 mt-1">
                {line.text}
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex space-x-2">
            <span className="text-brand-primary">{prompt}</span>
            <span className="text-slate-200">{currentText}</span>
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-brand-primary inline-block self-center"
            />
          </div>
        )}

        {!isTyping && (
          <div className="flex space-x-2">
            <span className="text-brand-primary">{prompt}</span>
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-brand-primary inline-block self-center"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
