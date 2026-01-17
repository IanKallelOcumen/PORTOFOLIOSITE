import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CursorEffectsProps {
  mousePosition: { x: number; y: number };
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

export function CursorEffects({ mousePosition }: CursorEffectsProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // Handle click ripples
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples(prev => [...prev, newRipple]);

      // Generate particles on click
      const newParticles: Particle[] = [];
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        newParticles.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * 2,
          vy: Math.sin(angle) * 2,
          life: 1,
        });
      }
      setParticles(prev => [...prev, ...newParticles]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 800);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Update particles
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02,
          }))
          .filter(p => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [particles.length]);

  // Cursor trail - throttled to avoid too many updates
  useEffect(() => {
    const lastPos = lastPosRef.current;
    // Only update if mouse moved more than 5px
    if (lastPos && Math.abs(lastPos.x - mousePosition.x) < 5 && Math.abs(lastPos.y - mousePosition.y) < 5) {
      return;
    }
    
    setTrail(prev => {
      const newTrail = [{ x: mousePosition.x, y: mousePosition.y }, ...prev];
      return newTrail.slice(0, 8);
    });
    lastPosRef.current = mousePosition;
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      {/* Scanline that follows cursor - Horizontal */}
      <div
        className="pointer-events-none fixed z-50 opacity-30"
        style={{
          width: '100vw',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, #ccff00 50%, transparent 100%)',
          top: `${mousePosition.y}px`,
          left: 0,
          transform: 'translateY(-0.5px)',
          boxShadow: '0 0 8px rgba(204,255,0,0.4)',
        }}
      />

      {/* Vertical scanline */}
      <div
        className="pointer-events-none fixed z-50 opacity-20"
        style={{
          width: '1px',
          height: '100vh',
          background: 'linear-gradient(180deg, transparent 0%, #ccff00 50%, transparent 100%)',
          left: `${mousePosition.x}px`,
          top: 0,
          transform: 'translateX(-0.5px)',
          boxShadow: '0 0 8px rgba(204,255,0,0.4)',
        }}
      />

      {/* Cursor trail */}
      {trail.map((pos, index) => (
        <div
          key={index}
          className="pointer-events-none fixed z-50"
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#ccff00',
            left: pos.x - 2,
            top: pos.y - 2,
            opacity: (1 - index / trail.length) * 0.3,
            boxShadow: '0 0 8px rgba(204,255,0,0.6)',
          }}
        />
      ))}

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="pointer-events-none fixed z-50"
            initial={{ 
              width: 20, 
              height: 20,
              opacity: 1,
              left: ripple.x - 10,
              top: ripple.y - 10,
            }}
            animate={{ 
              width: 200, 
              height: 200,
              opacity: 0,
              left: ripple.x - 100,
              top: ripple.y - 100,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              border: '2px solid #ccff00',
              borderRadius: '50%',
              boxShadow: '0 0 20px rgba(204,255,0,0.6)',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Particles */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="pointer-events-none fixed z-50"
            style={{
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: '#ccff00',
              left: particle.x,
              top: particle.y,
              opacity: particle.life,
              boxShadow: '0 0 6px rgba(204,255,0,0.8)',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Custom cursor dot */}
      <div
        className="pointer-events-none fixed z-50"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          border: '2px solid #ccff00',
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          boxShadow: '0 0 15px rgba(204,255,0,0.6), inset 0 0 5px rgba(204,255,0,0.4)',
          background: 'rgba(204,255,0,0.2)',
        }}
      />

      {/* Outer cursor ring */}
      <div
        className="pointer-events-none fixed z-50 transition-all duration-100"
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: '1px solid rgba(204,255,0,0.4)',
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      />
    </>
  );
}