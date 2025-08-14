import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { cn } from "@/lib/utils";
import { Tool } from "@/data/tools";
import Tilt from 'react-parallax-tilt';
import { Star, Flame, Sparkles } from 'lucide-react';
import { useFavorites } from "@/context/FavoritesContext";
import { motion } from 'framer-motion';

interface ToolCardProps {
  tool: Tool;
  view?: 'grid' | 'list';
  animationDelay?: string;
}

const PopularityBadge = ({ popularity }: { popularity: Tool['popularity'] }) => {
  if (!popularity) return null;

  const badgeConfig = {
    popular: {
      className: "bg-yellow-400/10 text-yellow-300 border-yellow-400/20",
      icon: <Star className="h-3 w-3 mr-1 animate-gold-shine" />,
      text: "Popular"
    },
    hot: {
      className: "bg-red-500/10 text-red-400 border-red-500/20",
      icon: <Flame className="h-3 w-3 mr-1 animate-hot-flame" />,
      text: "Hot"
    },
    new: {
      className: "bg-blue-400/10 text-blue-300 border-blue-400/20 animate-new-glow",
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      text: "New"
    },
  };

  const config = badgeConfig[popularity];

  return (
    <Badge className={cn("absolute top-4 right-4 capitalize flex items-center z-10", config.className)}>
      {config.icon}
      {config.text}
    </Badge>
  );
};

const ToolCard = ({ tool, view = 'grid', animationDelay }: ToolCardProps) => {
  const { name, description, path, icon: Icon, accentColor, category, popularity } = tool;
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(path);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(path);
  };

  const style = {
    '--accent-color': accentColor,
    'animationDelay': animationDelay,
  } as React.CSSProperties;

  if (view === 'list') {
    return (
      <Link to={path} className="group block">
        <motion.div 
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          className="flex items-center gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border transition-colors"
        >
          <div className="p-3 rounded-lg" style={{ backgroundColor: `${accentColor}15` }}>
            <Icon className="h-6 w-6" style={{ color: accentColor }} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white group-hover:text-primary transition-colors">{name}</h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
          </div>
          <button onClick={handleFavoriteClick} className="p-2 text-muted-foreground hover:text-yellow-400 z-10">
            <Star className={cn('h-5 w-5 transition-all', isFav && 'fill-yellow-400 text-yellow-400')} />
          </button>
        </motion.div>
      </Link>
    );
  }

  return (
    <div className="h-full opacity-0 animate-staggered-fade-slide-up" style={style}>
      <Link to={path} className="group block h-full">
        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} scale={1.02} className="h-full">
          <div
            className="relative p-6 rounded-2xl h-full overflow-hidden transition-all duration-300 ease-out
                        bg-card/80 backdrop-blur-xl border border-border
                        hover:border-[var(--accent-color)] hover:shadow-2xl hover:shadow-[var(--accent-color)]/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-50 group-hover:from-foreground/10 transition-opacity duration-300" />
            <PopularityBadge popularity={popularity} />
            <button onClick={handleFavoriteClick} className="absolute top-4 left-4 z-20 p-1 text-muted-foreground hover:text-yellow-400 transition-colors">
              <Star className={cn("h-5 w-5", isFav ? "text-yellow-400 fill-yellow-400" : "")} />
            </button>

            <div className="relative z-10 flex flex-col h-full text-center items-center pt-4">
              <div className="mb-4 text-[var(--accent-color)] transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-10 w-10" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-card-foreground mb-2">{name}</h3>
              <p className="text-muted-foreground text-sm font-body flex-grow mb-4 line-clamp-2">{description}</p>
              <Badge variant="secondary" style={{ color: accentColor, borderColor: `${accentColor}40`, background: `${accentColor}15` }}>
                {category}
              </Badge>
            </div>
          </div>
        </Tilt>
      </Link>
    </div>
  );
};

export default ToolCard;