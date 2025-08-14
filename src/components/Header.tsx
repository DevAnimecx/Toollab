import { Link } from "react-router-dom";
import { Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FontToggle } from "@/components/FontToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "./Logo";
import { useState } from 'react';
import { ThemeSelector } from './seasonal/ThemeSelector';
import { useSeasonalTheme } from '@/context/SeasonalThemeProvider';
import { IndianFlagIcon } from './seasonal/IndianFlagIcon';

const SettingsToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, isIndependenceDay } = useSeasonalTheme();
  const isEventActive = theme === 'independence' && isIndependenceDay;

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
        {isEventActive ? <IndianFlagIcon /> : <Settings className="h-[1.2rem] w-[1.2rem]" />}
        <span className="sr-only">Toggle Theme and Settings</span>
      </Button>
      <ThemeSelector open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};

const Header = () => {
  const navLinks = [
    { name: "All Tools", href: "/tools" },
    { name: "Upcoming Tools", href: "/upcoming-tools" },
    { name: "Blog", href: "/blog" },
    { name: "Changelog", href: "/changelog" },
    { name: "Status", href: "/status" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/50 backdrop-blur-xl animate-slide-down opacity-0">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="transition-colors hover:text-white text-foreground/60"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
             {/* The search bar will be added to the home page hero */}
          </div>
          <FontToggle />
          <SettingsToggle />
          
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/"><Logo /></Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;