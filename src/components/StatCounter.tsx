import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect } from 'react';

interface StatCounterProps {
  target: number;
  suffix?: string;
  delay?: number;
}

export function StatCounter({ target, suffix = '', delay = 0 }: StatCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, target, { 
      duration: 2,
      delay,
      ease: [0.4, 0, 0.2, 1]
    });

    return controls.stop;
  }, [target, delay, count]);

  return (
    <motion.div 
      className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-[#ccff00] bg-clip-text text-transparent"
    >
      <motion.span>{rounded}</motion.span>
      <span className="text-[#ccff00]">{suffix}</span>
    </motion.div>
  );
}