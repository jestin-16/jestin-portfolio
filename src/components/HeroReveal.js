import React from 'react';
import { motion } from 'framer-motion';

const HeroReveal = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.4
      } 
    }
  };

  const lineVariants = {
    hidden: { y: "100%", rotate: 5, opacity: 0 },
    visible: { 
      y: 0, 
      rotate: 0,
      opacity: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.6, 0.01, -0.05, 0.95] 
      } 
    }
  };

  const staggerSettings = {
    initial: "hidden",
    animate: "visible",
    variants: containerVariants
  };

  return (
    <motion.div {...staggerSettings} className="w-full flex flex-col justify-center">
      <div className="overflow-hidden mb-6">
        <motion.p 
          variants={lineVariants} 
          className="font-mono text-[10px] md:text-sm tracking-[0.5em] text-brand-muted uppercase"
        >
          // ARCHITECTING_RESILIENCE.V1
        </motion.p>
      </div>

      <div className="space-y-[-0.05em]">
        <div className="overflow-hidden">
          <motion.h1 
            variants={lineVariants}
            className="text-[14vw] md:text-[11vw] font-serif font-black leading-[0.9] tracking-tighter"
          >
            SOPHISTICATED
          </motion.h1>
        </div>

        <div className="overflow-hidden flex flex-col md:flex-row items-baseline gap-8">
          <motion.h1 
            variants={lineVariants}
            className="text-[14vw] md:text-[11vw] font-serif font-light italic text-outline"
          >
            BACKEND_
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 1, ease: "circOut" }}
            className="h-[2px] bg-brand-primary flex-grow hidden md:block origin-left"
          />
        </div>

        <div className="overflow-hidden">
          <motion.h1 
            variants={lineVariants}
            className="text-[14vw] md:text-[11vw] font-serif font-black leading-[0.9] tracking-tighter"
          >
            SOLUTIONS.
          </motion.h1>
        </div>
      </div>

      <motion.div 
        variants={lineVariants}
        className="mt-16 flex items-center space-x-12"
      >
        <div className="w-16 h-[1px] bg-brand-primary" />
        <p className="max-w-md text-sm md:text-xl font-medium leading-relaxed text-brand-muted">
           ESTABLISHED IN KERALA. SPECIALIZING IN THE JAVA ECOSYSTEM, MICROSERVICES, AND HIGH-SCALE ARCHITECTURE.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HeroReveal;
