import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface ToolCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  href: string;
  accentColor: string;
  category: string;
  animationDelay?: string;
}

const ToolCard = ({ icon, name, description, href, accentColor, category, animationDelay }: ToolCardProps) => {
  const style = {
    '--accent-color': accentColor,
    'animationDelay': animationDelay,
  } as React.CSSProperties;

  return (
    <Link to={href} className="group block h-full opacity-0 animate-staggered-fade-slide-up" style={style}>
      <div
        className="relative p-6 rounded-2xl h-full overflow-hidden transition-all duration-300 ease-out
                      bg-secondary/40 backdrop-blur-lg border border-white/10
                      group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-black/30 group-hover:border-white/20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)] to-transparent opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>

        <div className="relative z-10 flex flex-col h-full text-center items-center">
          <div className="mb-4 text-[var(--accent-color)] transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <h3 className="font-heading text-xl font-semibold text-white mb-2">{name}</h3>
          <p className="text-muted-foreground text-sm flex-grow mb-4">{description}</p>
          <Badge variant="secondary" style={{ color: accentColor, borderColor: `${accentColor}40`, background: `${accentColor}15` }}>
            {category}
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;