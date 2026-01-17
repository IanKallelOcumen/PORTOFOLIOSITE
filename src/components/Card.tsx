import { ReactNode, useRef, useState, useEffect } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  enableTilt?: boolean;
  mousePosition?: { x: number; y: number };
}

export function Card({ children, className = '', enableTilt = true, mousePosition }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [isMobile, setIsMobile] = useState(false);
  const lastTransformRef = useRef('');

  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Disable tilt on mobile for better performance
    if (!enableTilt || !mousePosition || !cardRef.current || isMobile) {
      const defaultTransform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (lastTransformRef.current !== defaultTransform) {
        setTransform(defaultTransform);
        lastTransformRef.current = defaultTransform;
      }
      return;
    }

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const { x: mouseX, y: mouseY } = mousePosition;

    // Check if mouse is near the card (with 50px buffer)
    const isNear = 
      mouseX >= rect.left - 50 && 
      mouseX <= rect.right + 50 && 
      mouseY >= rect.top - 50 && 
      mouseY <= rect.bottom + 50;

    let newTransform = '';
    
    if (isNear) {
      const x = mouseX - rect.left;
      const y = mouseY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Reduced tilt intensity from 5 to 2 degrees for smoother navigation
      const rotateX = ((y - centerY) / centerY) * -2;
      const rotateY = ((x - centerX) / centerX) * 2;

      newTransform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
    } else {
      newTransform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    // Only update if transform actually changed
    if (lastTransformRef.current !== newTransform) {
      setTransform(newTransform);
      lastTransformRef.current = newTransform;
    }
  }, [mousePosition, enableTilt, isMobile]);

  return (
    <div
      ref={cardRef}
      className={`
        relative bg-[rgba(18,18,18,0.6)] backdrop-blur-xl border border-white/[0.08] 
        rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-col overflow-hidden
        shadow-[0_4px_30px_rgba(0,0,0,0.1)]
        transition-all duration-100 ease-out
        before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-transparent before:via-white/5 before:to-transparent
        before:translate-x-[-100%] before:skew-x-[-25deg] before:pointer-events-none
        hover:before:translate-x-[150%] hover:before:transition-transform hover:before:duration-700
        hover:border-white/30
        group
        ${className}
      `}
      style={{ 
        transform: isMobile ? 'none' : transform,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-[#ccff00]/0 group-hover:border-[#ccff00]/50 transition-all duration-300 rounded-tl-xl md:rounded-tl-2xl" />
      <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-[#ccff00]/0 group-hover:border-[#ccff00]/50 transition-all duration-300 rounded-br-xl md:rounded-br-2xl" />
      
      <div style={{ transform: isMobile ? 'none' : 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  );
}