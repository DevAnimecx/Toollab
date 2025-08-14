import { useState, useEffect } from 'react';
import { Grid3x3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ToolViewToggle = ({ onChange }: { onChange: (view: 'grid'|'list') => void }) => {
  const [view, setView] = useState<'grid'|'list'>(() => {
    return (localStorage.getItem('toolViewPreference') || 'grid') as 'grid'|'list';
  });

  useEffect(() => {
    localStorage.setItem('toolViewPreference', view);
    onChange(view);
  }, [view]);

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary">
      <Button
        variant={view === 'grid' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => setView('grid')}
        className="h-8 w-8"
      >
        <Grid3x3 className="h-4 w-4" />
      </Button>
      <Button
        variant={view === 'list' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => setView('list')}
        className="h-8 w-8"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};