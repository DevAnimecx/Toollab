import { motion } from 'framer-motion';
import { Tool } from '@/data/tools';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const ToolCard = ({ tool, view = 'grid' }: { tool: Tool; view?: 'grid'|'list' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(tool.path);

  if (view === 'list') {
    return (
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border"
      >
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${tool.accentColor}15` }}>
          <tool.icon className="h-6 w-6" style={{ color: tool.accentColor }} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{tool.name}</h3>
            {tool.popularity && (
              <Badge variant="secondary" className="text-xs capitalize">
                {tool.popularity}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{tool.description}</p>
          <div className="flex gap-2 mt-2">
            {tool.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tool.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tool.tags.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(tool.path);
          }}
          className="p-2 text-muted-foreground hover:text-yellow-400"
        >
          <Star className={cn('h-4 w-4', isFav && 'fill-yellow-400 text-yellow-400')} />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 10px 25px -5px ${tool.accentColor}20`
      }}
      className="relative p-6 rounded-2xl h-full overflow-hidden transition-all duration-300 ease-out"
      style={{
        background: 'rgba(15, 25, 45, 0.45)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.15)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-50" />
      
      {tool.popularity && (
        <Badge 
          variant="secondary" 
          className="absolute top-4 right-4 capitalize"
          style={{
            color: tool.accentColor,
            borderColor: `${tool.accentColor}40`,
            background: `${tool.accentColor}15`
          }}
        >
          {tool.popularity}
        </Badge>
      )}

      <div className="relative z-10 flex flex-col h-full text-center items-center pt-4">
        <motion.div 
          className="mb-4 transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <tool.icon className="h-10 w-10" style={{ color: tool.accentColor }} />
        </motion.div>
        
        <h3 className="font-heading text-xl font-semibold text-white mb-2">{tool.name}</h3>
        <p className="text-muted-foreground text-sm font-body flex-grow mb-4">{tool.description}</p>
        
        <Badge 
          variant="secondary" 
          className="mt-auto"
          style={{
            color: tool.accentColor,
            borderColor: `${tool.accentColor}40`,
            background: `${tool.accentColor}15`
          }}
        >
          {tool.category}
        </Badge>
      </div>
    </motion.div>
  );
};