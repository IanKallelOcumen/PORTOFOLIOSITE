import { motion } from 'motion/react';

export function EcommerceDemo() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-[70vh] items-center"
    >
      {/* Product Image */}
      <div>
        <motion.img
          initial={{ rotate: -10, scale: 0.9 }}
          animate={{ rotate: -5, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop"
          alt="Volt Runner Sneaker"
          className="w-full rounded-2xl border-2 border-[#ccff00] shadow-[0_0_50px_rgba(204,255,0,0.1)]"
        />
      </div>

      {/* Product Info */}
      <div>
        <span className="inline-block bg-[#ccff00] text-black text-xs font-bold px-3 py-1.5 rounded mb-4">
          NEW ARRIVAL
        </span>
        
        <h1 className="text-6xl md:text-7xl leading-[0.9] mb-4 font-black italic">
          VOLT <br /> RUNNER.
        </h1>
        
        <p className="text-[#888] text-lg mb-8">
          Limited edition drop. 1 of 500 units.
        </p>
        
        <div className="text-5xl text-[#ccff00] font-bold mb-8">
          $249.00
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-12 py-4 font-black text-xl skew-x-[-10deg] hover:bg-[#ccff00] transition-colors duration-300"
        >
          ADD TO CART
        </motion.button>
      </div>
    </motion.div>
  );
}
