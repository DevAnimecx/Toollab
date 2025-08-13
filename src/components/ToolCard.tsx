import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { cn } from "@/lib/utils";
import { Tool } from "@/data/tools";

interface ToolCardProps extends Pick<Tool, 'name' | 'description' | 'path' | 'icon' | 'accentColor' | 'category' | 'popularity'> {
  animationDelay?: string;
}

const PopularityBadge = ({ popularity }: { popularity: ToolCardProps['popularity'] }) => {
  if (!popularity) return null;

  const badgeStyles = {
    popular: "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
    hot: "bg-red-500/20 text-red-400 border-red-500/30 animate-pulse",
    new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };

  return (
    <Badge className={cn("absolute top-3 right-3 capitalize", badgeStyles[popularity])}>
      {popularity}
    </Badge>
  );
};

const ToolCard = ({ icon, name, description, href, accentColor, category, popularity, animationDelay }: ToolCardProps) => {
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
        <div className="absolute top-0 left-0 h-1 w-full bg-[var(--accent-color)] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
        <PopularityBadge popularity={popularity} />

        <div className="relative z-10 flex flex-col h-full text-center items-center pt-4">
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