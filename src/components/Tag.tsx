import { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  className?: string;
}

export function Tag({ children, className = '' }: TagProps) {
  return (
    <span 
      className={`
        text-[11px] md:text-xs font-medium tracking-wide
        bg-white/[0.03] px-3 py-1.5 rounded border border-white/10
        inline-flex items-center gap-1.5 transition-all duration-300
        hover:border-[#ccff00] hover:text-[#ccff00] hover:bg-[rgba(204,255,0,0.05)] hover:-translate-y-0.5
        ${className}
      `}
    >
      {children}
    </span>
  );
}