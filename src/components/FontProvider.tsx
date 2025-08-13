import React, { createContext, useContext, useEffect, useState } from 'react';

type Font = 'default' | 'elegant' | 'poppins' | 'mono';

type FontProviderState = {
  font: Font;
  setFont: (font: Font) => void;
};

const FontProviderContext = createContext<FontProviderState | undefined>(undefined);

export function FontProvider({
  children,
  defaultFont = 'poppins',
  storageKey = 'toollab-font',
}: {
  children: React.ReactNode;
  defaultFont?: Font;
  storageKey?: string;
}) {
  const [font, setFont] = useState<Font>(
    () => (localStorage.getItem(storageKey) as Font) || defaultFont
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('font-default', 'font-elegant', 'font-poppins', 'font-mono');
    root.classList.add(`font-${font}`);
    localStorage.setItem(storageKey, font);
  }, [font, storageKey]);

  const value = { font, setFont };

  return (
    <FontProviderContext.Provider value={value}>
      {children}
    </FontProviderContext.Provider>
  );
}

export const useFont = () => {
  const context = useContext(FontProviderContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};