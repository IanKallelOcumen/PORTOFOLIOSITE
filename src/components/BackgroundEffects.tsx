interface BackgroundEffectsProps {
  mousePosition: { x: number; y: number };
}

export function BackgroundEffects({ mousePosition }: BackgroundEffectsProps) {
  return (
    <>
      {/* Ambient Layer */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Animated Grid */}
        <div className="absolute -inset-1/2 w-[200%] h-[200%] opacity-100">
          <div 
            className="absolute inset-0 animate-grid-move"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              transform: 'perspective(500px) rotateX(60deg)',
              maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
            }}
          />
        </div>

        {/* Scanline */}
        <div className="absolute w-full h-1.5 bg-gradient-to-r from-transparent via-[#ccff00] to-transparent opacity-30 shadow-[0_0_30px_#ccff00] animate-scan" />

        {/* Radial gradient orbs */}
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-[#00ccff]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Mouse Spotlight */}
        <div 
          className="fixed w-[600px] h-[600px] pointer-events-none -z-10 mix-blend-screen opacity-60 transition-all duration-100 ease-out"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(204, 255, 0, 0.2) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Noise Overlay */}
      <div 
        className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}