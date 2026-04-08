import React from 'react';
import { motion } from 'framer-motion';

const HeroReveal = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: "100%" },
    visible: {
      y: "0%",
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a trending "jumpy" reveal
      },
    },
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        delay: 1,
      },
    },
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-4 md:space-y-6"
    >
      {/* Editorial Badge Styled Hero Reveal */}
      <div className="overflow-hidden mb-8">
        <motion.div variants={itemVariants} className="flex items-center space-x-4">
          <span className="w-12 h-[2px] bg-brand-accent" />
          <span className="text-[10px] md:text-[12px] font-mono font-black uppercase tracking-[0.6em] text-brand-accent">
            Architecting_The_Future
          </span>
        </motion.div>
      </div>

      {/* Main Title Reveal */}
      <div className="space-y-[-0.1em]">
        <div className="overflow-hidden">
          <motion.h1 
            variants={itemVariants}
            className="text-[12vw] md:text-[10.5vw] font-serif font-black leading-[0.9] tracking-tighter text-brand-primary"
          >
            Developing
          </motion.h1>
        </div>
        
        <div className="overflow-hidden flex flex-col md:flex-row items-baseline">
          <motion.h1 
            variants={itemVariants}
            className="text-[12vw] md:text-[10.5vw] font-serif font-light italic text-brand-muted ml-0 md:ml-32"
          >
            Systems.
          </motion.h1>
          
          <motion.div 
            variants={lineVariants} 
            className="h-[2px] md:h-[4px] bg-brand-accent mt-4 md:mt-0 md:ml-8 hidden md:block" 
          />
        </div>

        <div className="overflow-hidden relative">
          <motion.h1 
            variants={itemVariants}
            className="text-[12vw] md:text-[10.5vw] font-serif font-black leading-[0.9] tracking-tighter text-brand-accent"
          >
            Architecture.
          </motion.h1>
          {/* Decorative Dot - Trending Minimal Element */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute -right-4 md:right-0 top-1/2 w-4 h-4 md:w-8 md:h-8 rounded-full bg-brand-accent hidden lg:block"
          />
        </div>
      </div>

      {/* Tertiary Reveal (Meta Info) */}
      <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-brand-border/30 mt-20">
        {[
          { label: "Location", value: "KERALA_IN" },
          { label: "Focus", value: "SPRING_BOOT" },
          { label: "Stack", value: "JAVA_CORE" },
          { label: "Status", value: "OPEN_TO_WORK" }
        ].map((item, idx) => (
          <div key={idx} className="overflow-hidden">
            <motion.div variants={itemVariants} className="space-y-1">
              <span className="text-[8px] font-mono font-black text-brand-muted uppercase tracking-widest">{item.label}</span>
              <p className="text-[10px] font-mono font-black text-brand-primary uppercase tracking-tighter italic">{item.value}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HeroReveal;
