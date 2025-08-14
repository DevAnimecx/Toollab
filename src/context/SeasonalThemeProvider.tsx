import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type SeasonalTheme = 'default' | 'independence';

interface SeasonalThemeContextType {
  theme: SeasonalTheme;
  setTheme: (theme: SeasonalTheme) => void;
  isIndependenceDay: boolean;
}

const SeasonalThemeContext = createContext<SeasonalThemeContextType | undefined>(undefined);

const isIndependenceDayPeriod = () => {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed, so August is 7
  const day = now.getDate();
  // Check for August 15th and 16th
  return month === 7 && (day === 15 || day === 16);
};

export const SeasonalThemeProvider = ({ children }: { children: ReactNode }) => {
  const isIndependenceDay = isIndependenceDayPeriod();
  const [theme, setThemeState] = useState<SeasonalTheme>('default');

  useEffect(() => {
    const storedTheme = localStorage.getItem('seasonal-theme') as SeasonalTheme;
    if (storedTheme) {
      setThemeState(storedTheme);
    } else if (isIndependenceDay) {
      setThemeState('independence');
    } else {
      setThemeState('default');
    }
  }, [isIndependenceDay]);

  const setTheme = (newTheme: SeasonalTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('seasonal-theme', newTheme);
  };

  useEffect(() => {
    document.body.classList.remove('theme-independence');
    if (theme === 'independence') {
      document.body.classList.add('theme-independence');
    }
  }, [theme]);

  return (
    <SeasonalThemeContext.Provider value={{ theme, setTheme, isIndependenceDay }}>
      {children}
    </SeasonalThemeContext.Provider>
  );
};

export const useSeasonalTheme = () => {
  const context = useContext(SeasonalThemeContext);
  if (!context) {
    throw new Error('useSeasonalTheme must be used within a SeasonalThemeProvider');
  }
  return context;
};