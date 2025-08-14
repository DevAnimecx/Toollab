import { useState, useEffect, useMemo } from 'react';
import { tools, categories } from '@/data/tools';
import { ToolViewToggle } from '@/components/tools/ToolViewToggle';
import { CategorySidebar } from '@/components/tools/CategorySidebar';
import ToolCard from '@/components/tools/ToolCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const ToolsPage = () => {
  const [view, setView] = useState<'grid'|'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { favorites } = useFavorites();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      // Search filter
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Category filter
      const matchesCategory = 
        selectedCategories.length === 0 || 
        selectedCategories.includes(tool.category);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategories]);

  const favoriteTools = useMemo(() => {
    return filteredTools.filter(tool => favorites.includes(tool.path));
  }, [filteredTools, favorites]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Category Sidebar */}
        <CategorySidebar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="w-full md:w-auto">
              <h1 className="text-3xl font-bold">
                {selectedCategories.length === 1 
                  ? `${filteredTools.length} Tools in '${selectedCategories[0]}'`
                  : `${filteredTools.length} Tools`}
              </h1>
              {selectedCategories.length > 0 && selectedCategories[0] in categories && (
                <p className="text-sm text-muted-foreground">
                  {categories[selectedCategories[0] as keyof typeof categories].description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tools..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ToolViewToggle onChange={setView} />
            </div>
          </div>

          {(selectedCategories.length > 0 || searchTerm) && (
            <div className="mb-4">
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          )}

          {/* Favorites Section */}
          {favoriteTools.length > 0 && !searchTerm && selectedCategories.length === 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Favorites</h2>
              <div className={cn(
                'gap-4',
                view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'space-y-2'
              )}>
                {favoriteTools.map(tool => (
                  <ToolCard key={tool.path} tool={tool} view={view} />
                ))}
              </div>
            </div>
          )}

          {/* Main Tools List */}
          <div className={cn(
            'gap-4',
            view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'space-y-2'
          )}>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))
            ) : (
              filteredTools.map(tool => (
                <ToolCard key={tool.path} tool={tool} view={view} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;