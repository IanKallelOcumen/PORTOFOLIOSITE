import { useState, useEffect, memo } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BackToTop = memo(function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-gradient-to-br from-[#ccff00]/20 to-[#ccff00]/10 backdrop-blur-md border border-[#ccff00]/40 rounded-full flex items-center justify-center hover:border-[#ccff00] hover:bg-gradient-to-br hover:from-[#ccff00]/30 hover:to-[#ccff00]/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] group touch-manipulation min-h-[44px] min-w-[44px]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-[#ccff00] group-hover:text-white transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
});
