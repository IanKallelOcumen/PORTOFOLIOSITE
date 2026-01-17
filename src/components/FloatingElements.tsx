import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function FloatingElements() {
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce elements on mobile for better performance
  const codeElementCount = isMobile ? 6 : 12;
  const shapeCount = isMobile ? 3 : 6;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {/* Floating Code Symbols */}
      {dimensions.width > 0 && [...Array(codeElementCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#ccff00]/10 font-mono text-lg md:text-2xl"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            y: [null, Math.random() * dimensions.height],
            x: [null, Math.random() * dimensions.width],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          {['</', '/>', '{}', '[]', '()', '&&', '||', '=>'][Math.floor(Math.random() * 8)]}
        </motion.div>
      ))}

      {/* Floating Geometric Shapes */}
      {dimensions.width > 0 && [...Array(shapeCount)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute border border-[#ccff00]/20"
          style={{
            width: 30 + Math.random() * 50,
            height: 30 + Math.random() * 50,
          }}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: [null, Math.random() * dimensions.height],
            rotate: [null, (Math.random() - 0.5) * 720],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 30 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}