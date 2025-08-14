import { Home, LayoutGrid, Search, Star, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const BottomNavBar = () => {
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/tools', label: 'Tools', icon: LayoutGrid },
    { href: '/tools', label: 'Search', icon: Search }, // Placeholder, will open search modal later
    { href: '/favorites', label: 'Favorites', icon: Star },
    { href: '/about', label: 'About', icon: User }, // Placeholder for Profile/Settings
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md h-16
                    bg-background/70 backdrop-blur-lg border border-white/10 
                    rounded-2xl shadow-lg z-50">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className="relative flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary transition-colors"
            >
              <item.icon className={cn("h-6 w-6", isActive && "text-primary")} />
              {isActive && (
                <motion.span 
                  layoutId="active-nav-label"
                  className="absolute -bottom-1.5 text-[10px] font-bold text-primary"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;