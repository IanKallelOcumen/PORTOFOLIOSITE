import { motion } from 'motion/react';

export function SportsDemo() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4 min-h-[70vh]"
    >
      {/* Sidebar */}
      <aside className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
        <div className="text-[#666] text-xs mb-8">VELOCITY OS</div>
        <div className="flex flex-col gap-4 text-[#aaa]">
          <div className="text-white border-r-2 border-[#ff3366] pr-4">Dashboard</div>
          <div>Team Roster</div>
          <div>Analytics</div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Game Analysis</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="PTS" value="114" />
          <StatCard label="AST" value="23" />
          <StatCard 
            label="WIN CHANCE" 
            value="88%" 
            highlight 
          />
        </div>

        {/* Chart */}
        <div className="bg-[#111] rounded-xl p-6 border border-[#333] h-[300px] flex items-end gap-2.5 pb-0">
          <div className="flex-1 bg-[#222] h-[40%] rounded-t" />
          <div className="flex-1 bg-[#222] h-[60%] rounded-t" />
          <div className="flex-1 bg-[#ff3366] h-[85%] rounded-t shadow-[0_0_20px_#ff3366]" />
          <div className="flex-1 bg-[#222] h-[50%] rounded-t" />
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`
      rounded-xl p-6 border border-[#333] transition-all duration-300
      hover:border-[#ff3366] hover:-translate-y-1
      ${highlight ? 'bg-gradient-to-br from-[#ff3366] to-[#ff0044]' : 'bg-[#111]'}
    `}>
      <div className={`text-sm mb-2 ${highlight ? 'text-white' : 'text-[#888]'}`}>
        {label}
      </div>
      <div className="text-5xl font-bold">{value}</div>
    </div>
  );
}
