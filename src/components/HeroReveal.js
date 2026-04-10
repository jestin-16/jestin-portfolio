import React from 'react';
import { motion } from 'framer-motion';

const HeroReveal = () => {
  const lineVariants = {
    hidden: { y: 80, rotate: 2, opacity: 0 },
    visible: (custom) => ({ 
      y: 0, 
      rotate: 0,
      opacity: 1,
      transition: { 
        duration: 1, 
        ease: [0.6, 0.01, -0.05, 0.95],
        delay: custom * 0.1
      } 
    })
  };

  const commonProps = (index) => ({
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true },
    custom: index,
    variants: lineVariants
  });

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="overflow-hidden mb-6">
        <motion.p 
          {...commonProps(0)}
          className="font-mono text-[10px] md:text-sm tracking-[0.5em] text-brand-muted uppercase"
        >
          {"// ARCHITECTING_RESILIENCE.V1"}
        </motion.p>
      </div>

      <div className="space-y-[-0.05em]">
        <div className="overflow-hidden">
          <motion.h1 
            {...commonProps(1)}
            className="text-[14vw] md:text-[11vw] font-serif font-black leading-[0.9] tracking-tighter"
          >
            SOPHISTICATED
          </motion.h1>
        </div>

        <div className="overflow-hidden flex flex-col md:flex-row items-baseline gap-8">
          <motion.h1 
            {...commonProps(2)}
            className="text-[14vw] md:text-[11vw] font-serif font-light italic text-outline"
          >
            BACKEND_
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1, ease: "circOut" }}
            className="h-[2px] bg-brand-primary flex-grow hidden md:block origin-left"
          />
        </div>

        <div className="overflow-hidden">
          <motion.h1 
            {...commonProps(3)}
            className="text-[14vw] md:text-[11vw] font-serif font-black leading-[0.9] tracking-tighter"
          >
            SOLUTIONS.
          </motion.h1>
        </div>
      </div>

      <motion.div 
        {...commonProps(4)}
        className="mt-16 flex items-center space-x-12"
      >
        <div className="w-16 h-[1px] bg-brand-primary" />
        <p className="max-w-md text-sm md:text-xl font-medium leading-relaxed text-brand-muted">
           ESTABLISHED IN KERALA. SPECIALIZING IN THE JAVA ECOSYSTEM, MICROSERVICES, AND HIGH-SCALE ARCHITECTURE.
        </p>
      </motion.div>
    </div>
  );
};

export default HeroReveal;
