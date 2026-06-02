import { ArrowLeft, Menu, X } from 'lucide-react';
import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  showBack?: boolean;
  onBack?: () => void;
}

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

export const Navigation = memo(function Navigation({ showBack, onBack }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 mb-8 md:mb-12">
      <div className="flex items-center justify-between">
        {showBack ? (
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:border-[#ccff00] transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,255,0,0.2)] min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-[#888] group-hover:text-[#ccff00] transition-colors" />
            <span className="font-bold text-sm md:text-base tracking-[-0.02em] group-hover:text-[#ccff00] transition-colors">BACK</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse" />
            <h1 className="font-bold text-lg md:text-xl tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>PORTFOLIO <span className="text-[#666]">2025</span></h1>
          </div>
        )}

        {/* Desktop Navigation */}
        {!showBack && (
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-[#888] hover:text-[#ccff00] transition-colors duration-300 font-medium min-h-[44px] px-2"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('work')}
              className="text-[#888] hover:text-[#ccff00] transition-colors duration-300 font-medium min-h-[44px] px-2"
            >
              Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-[#888] hover:text-[#ccff00] transition-colors duration-300 font-medium min-h-[44px] px-2"
            >
              Contact
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        {!showBack && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-3 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && !showBack && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 overflow-hidden"
          >
            <div className="bg-[rgba(18,18,18,0.8)] backdrop-blur-md rounded-xl border border-white/5 p-4 space-y-2">
              <button 
                onClick={() => {
                  scrollToSection('about');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-[#888] hover:text-[#ccff00] hover:bg-white/5 transition-all duration-300 font-medium py-3 px-4 rounded-lg min-h-[44px]"
              >
                About
              </button>
              <button 
                onClick={() => {
                  scrollToSection('work');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-[#888] hover:text-[#ccff00] hover:bg-white/5 transition-all duration-300 font-medium py-3 px-4 rounded-lg min-h-[44px]"
              >
                Work
              </button>
              <button 
                onClick={() => {
                  scrollToSection('contact');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-[#888] hover:text-[#ccff00] hover:bg-white/5 transition-all duration-300 font-medium py-3 px-4 rounded-lg min-h-[44px]"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});