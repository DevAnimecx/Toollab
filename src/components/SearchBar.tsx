import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { tools, categories } from '@/data/tools';
import { Button } from './ui/button';

export function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-12 w-full justify-start rounded-full text-md text-muted-foreground bg-secondary border"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5 mr-4 ml-2" />
        <span className="inline-flex">Search tools...</span>
        <kbd className="pointer-events-none absolute right-2.5 top-2.5 hidden h-7 select-none items-center gap-1 rounded-md border bg-muted px-2 font-mono text-[12px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a tool name or category..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {Object.entries(categories).map(([categoryName]) => (
            <CommandGroup key={categoryName} heading={categoryName}>
              {tools
                .filter((tool) => tool.category === categoryName)
                .map((tool) => (
                  <CommandItem
                    key={tool.path}
                    value={`${tool.name} ${tool.category} ${tool.tags.join(' ')}`}
                    onSelect={() => {
                      runCommand(() => navigate(tool.path));
                    }}
                  >
                    <tool.icon className="mr-2 h-4 w-4" />
                    <span>{tool.name}</span>
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}