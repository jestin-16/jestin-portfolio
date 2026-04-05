import React, { useEffect, useRef } from 'react';

const BackgroundSystem = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Code Rain Setup
    const characters = '0123456789ABCDEF';
    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops = new Array(columns).fill(1).map(() => Math.random() * -100);

    // Dot Grid Setup
    const dotSpacing = 30;
    const dotSize = 1;

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Animated Dot Grid
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let x = 0; x < canvas.width; x += dotSpacing) {
        for (let y = 0; y < canvas.height; y += dotSpacing) {
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pulse = Math.sin(time / 2000 + dist / 200) * 0.5 + 0.5;
          const opacity = 0.02 + pulse * 0.08 * Math.max(0, 1 - dist / 400);
          
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, dotSize * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Scrolling Stellar Dust (Replacement for Code Rain)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      
      for (let i = 0; i < drops.length; i++) {
        // Draw a tiny dot instead of text
        ctx.beginPath();
        ctx.arc(i * fontSize, drops[i] * fontSize, 0.5, 0, Math.PI * 2);
        ctx.fill();

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i] += 0.3;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-brand-void">
      {/* 1. Canvas for Stellar Grid */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* 2. Soft Ambient Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay" />
      
      {/* 3. Corner Brackets Decorations - Minimalist Silver */}
      <div className="absolute top-12 left-12 w-8 h-8 border-t-[0.5px] border-l-[0.5px] border-white/10" />
      <div className="absolute top-12 right-12 w-8 h-8 border-t-[0.5px] border-r-[0.5px] border-white/10" />
      <div className="absolute bottom-12 left-12 w-8 h-8 border-b-[0.5px] border-l-[0.5px] border-white/10" />
      <div className="absolute bottom-12 right-12 w-8 h-8 border-b-[0.5px] border-r-[0.5px] border-white/10" />
      
      {/* Background Gradients for Depth - Monochromatic */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent)]" />
    </div>
  );
};

export default BackgroundSystem;
