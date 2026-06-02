import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface SkillMeterProps {
  skill: string;
  level: number;
  delay?: number;
}

export function SkillMeter({ skill, level, delay = 0 }: SkillMeterProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-semibold text-white/90">{skill}</span>
        <motion.span 
          className="text-xs font-mono text-[#ccff00]"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0.7 }}
        >
          {level}%
        </motion.span>
      </div>
      
      <div className="h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#ccff00] to-[#88cc00] relative"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ 
            duration: 1.5, 
            delay: delay,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1,
            }}
          />
        </motion.div>
      </div>
      
      {/* Glow effect on hover */}
      {hovered && (
        <motion.div
          className="absolute inset-0 rounded-lg blur-xl bg-[#ccff00]/20 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </div>
  );
}
