import { Card } from './Card';
import { Tag } from './Tag';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectCardProps {
  image: string;
  tag: string;
  title: string;
  description: string;
  onLaunch: () => void;
  mousePosition: { x: number; y: number };
}

export function ProjectCard({ image, tag, title, description, onLaunch, mousePosition }: ProjectCardProps) {
  return (
    <Card className="!p-0 min-h-[350px] md:min-h-[400px] border-white/10" mousePosition={mousePosition}>
      {/* Image */}
      <div className="h-[60%] md:h-[65%] w-full overflow-hidden border-b border-white/10 relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] grayscale brightness-75 hover:grayscale-0 hover:brightness-100 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 flex flex-col justify-between flex-grow" style={{ transform: 'translateZ(30px)' }}>
        <div>
          <Tag className="mb-2.5 text-xs">{tag}</Tag>
          <h3 className="text-xl md:text-2xl font-bold mb-1">{title}</h3>
          <p className="text-[#888] text-sm md:text-base">{description}</p>
        </div>

        <button
          onClick={onLaunch}
          className="mt-4 bg-transparent text-white px-4 py-3 text-sm md:text-base text-center rounded font-bold flex items-center justify-center gap-2 border border-white/20 transition-all duration-300 hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] hover:shadow-[0_0_20px_rgba(204,255,0,0.2)] active:scale-95"
        >
          LAUNCH DEMO
        </button>
      </div>
    </Card>
  );
}