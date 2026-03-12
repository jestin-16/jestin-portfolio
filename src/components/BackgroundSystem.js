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
      ctx.fillStyle = 'rgba(0, 255, 136, 0.08)';
      for (let x = 0; x < canvas.width; x += dotSpacing) {
        for (let y = 0; y < canvas.height; y += dotSpacing) {
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pulse = Math.sin(time / 1000 + dist / 100) * 0.5 + 0.5;
          const opacity = 0.05 + pulse * 0.15 * Math.max(0, 1 - dist / 300);
          
          ctx.fillStyle = `rgba(0, 255, 136, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Scrolling Code Rain (Matrix Style)
      ctx.fillStyle = 'rgba(0, 212, 255, 0.03)'; // Subtle cyan
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
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
      {/* 1. Canvas for Dot Grid & Code Rain */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* 2. Scanline Texture (CRT Effect) */}
      <div className="absolute inset-0 crt-overlay opacity-20" />
      
      {/* 3. Animated Scanline */}
      <div className="scanline animate-scanline" />

      {/* 4. Corner Brackets Decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-brand-primary opacity-30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-brand-primary opacity-30" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-brand-primary opacity-30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-brand-primary opacity-30" />
      
      {/* Background Gradients for Depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 via-transparent to-brand-secondary/5" />
    </div>
  );
};

export default BackgroundSystem;
