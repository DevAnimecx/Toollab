import { Link } from "react-router-dom";
import { GlassBadge } from "@/components/ui/GlassBadge";
import React, { useRef } from "react";

interface ToolCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  href: string;
  accentColor: string;
  category: string;
}

const ToolCard = ({ icon, name, description, href, accentColor, category }: ToolCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    cardRef.current.style.setProperty('--rotate-y', `${x * 8}deg`);
    cardRef.current.style.setProperty('--rotate-x', `${-y * 8}deg`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--rotate-y', '0deg');
    cardRef.current.style.setProperty('--rotate-x', '0deg');
  };

  const style = {
    '--accent-color': accentColor,
    '--rotate-x': '0deg',
    '--rotate-y': '0deg',
  } as React.CSSProperties;

  return (
    <Link to={href} className="group block h-full" style={{ perspective: '1000px' }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className="relative p-6 rounded-xl h-full overflow-hidden transition-all duration-300 ease-out
                      bg-[rgba(19,43,71,0.65)] backdrop-blur-lg border border-white/10
                      hover:scale-105 hover:border-[var(--accent-color)]/50 hover:shadow-2xl hover:shadow-[var(--accent-color)]/10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)] to-transparent opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>

        <div className="relative z-10 flex flex-col h-full text-center items-center" style={{ transform: 'rotateX(var(--rotate-x)) rotateY(var(--rotate-y))' }}>
          <div className="mb-4 text-[var(--accent-color)] transition-transform duration-300 group-hover:-translate-y-1">
            {icon}
          </div>
          <h3 className="font-heading text-xl font-bold text-white mb-2">{name}</h3>
          <p className="text-muted-foreground text-sm flex-grow mb-4">{description}</p>
          <GlassBadge accentColor={accentColor}>{category}</GlassBadge>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;