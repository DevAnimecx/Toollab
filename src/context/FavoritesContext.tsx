import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (toolPath: string) => void;
  removeFavorite: (toolPath: string) => void;
  isFavorite: (toolPath: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('toollab-favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const updateLocalStorage = (updatedFavorites: string[]) => {
    setFavorites(updatedFavorites);
    localStorage.setItem('toollab-favorites', JSON.stringify(updatedFavorites));
  };

  const addFavorite = (toolPath: string) => {
    const updatedFavorites = [...favorites, toolPath];
    updateLocalStorage(updatedFavorites);
  };

  const removeFavorite = (toolPath: string) => {
    const updatedFavorites = favorites.filter(fav => fav !== toolPath);
    updateLocalStorage(updatedFavorites);
  };

  const isFavorite = (toolPath: string) => {
    return favorites.includes(toolPath);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};