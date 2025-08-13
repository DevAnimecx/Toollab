import { useFont } from '@/components/FontProvider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Type } from 'lucide-react';

export function FontToggle() {
  const { setFont } = useFont();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Type className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle font style</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setFont('default')}>
          Default
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setFont('elegant')}>
          Elegant
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}