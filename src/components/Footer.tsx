import { Code2, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  darkMode?: boolean;
}

export function Footer({ darkMode = true }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  const bgColor = darkMode 
    ? 'bg-black/40 backdrop-blur-md border-t border-white/10' 
    : 'bg-white/80 backdrop-blur-md border-t border-gray-200';
  
  const textColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const accentColor = darkMode ? 'text-[#ccff00]' : 'text-purple-600';

  return (
    <motion.footer 
      className={`${bgColor} py-6 mt-12`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Side - Made by */}
          <motion.div 
            className="flex items-center gap-2 text-sm"
            whileHover={{ scale: 1.02 }}
          >
            <span className={textColor}>Crafted with</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
            <span className={textColor}>by</span>
            <span className={`font-bold ${accentColor}`}>
              Ian Kallel Ocumen
            </span>
          </motion.div>

          {/* Center - Trademark */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Code2 className={`w-5 h-5 ${accentColor}`} />
            <span className={`text-sm font-semibold ${textColor}`}>
              © {currentYear} <span className={accentColor}>Multi-Disciplinary Creator</span>
            </span>
          </motion.div>

          {/* Right Side - Tech Stack Badge */}
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              darkMode 
                ? 'bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30' 
                : 'bg-purple-100 text-purple-700 border border-purple-300'
            }`}>
              React + TypeScript
            </div>
          </div>
        </div>

        {/* Bottom Line - Skills */}
        <motion.div 
          className={`text-center mt-4 pt-4 border-t ${
            darkMode ? 'border-white/5' : 'border-gray-200'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className={`text-xs ${textColor}`}>
            BS IT Student · Digital Artist · Web Developer · Arduino Enthusiast · PC Builder · IT Support
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}