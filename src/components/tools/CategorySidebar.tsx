import { useState, useEffect } from 'react';
import { categories } from '@/data/tools';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';

export const CategorySidebar = ({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [isMobile]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category]
    );
  };

  return (
    <div className={`${isOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden`}>
      <div className="pr-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Categories</h3>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          {Object.keys(categories).map(category => (
            <div key={category} className="flex items-center gap-3">
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label htmlFor={`cat-${category}`} className="flex items-center gap-2 text-sm cursor-pointer">
                <categories[category].icon className="h-4 w-4" />
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};