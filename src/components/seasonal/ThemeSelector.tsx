import { useSeasonalTheme } from '@/context/SeasonalThemeProvider';
import { useTheme } from 'next-themes';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface ThemeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ThemeSelector = ({ open, onOpenChange }: ThemeSelectorProps) => {
  const { theme: seasonalTheme, setTheme: setSeasonalTheme, isIndependenceDay } = useSeasonalTheme();
  const { theme, setTheme } = useTheme();

  const handleSeasonalSelect = (newTheme: 'default' | 'independence') => {
    setSeasonalTheme(newTheme);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/20 backdrop-blur-xl border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Display Settings</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Color Theme</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}><Sun className="mr-2 h-4 w-4" />Light</Button>
              <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}><Moon className="mr-2 h-4 w-4" />Dark</Button>
              <Button variant={theme === 'system' ? 'default' : 'outline'} onClick={() => setTheme('system')}><Sparkles className="mr-2 h-4 w-4" />System</Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Seasonal Event Theme</h3>
            <Button
              variant={seasonalTheme === 'default' ? 'default' : 'outline'}
              onClick={() => handleSeasonalSelect('default')}
              className="w-full justify-start mb-2"
            >
              Default Theme
            </Button>
            <Button
              variant={seasonalTheme === 'independence' ? 'default' : 'outline'}
              onClick={() => handleSeasonalSelect('independence')}
              className="w-full justify-start"
              disabled={!isIndependenceDay}
            >
              Independence Day
              {isIndependenceDay && <span className="ml-auto text-xs text-primary">(Active)</span>}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};