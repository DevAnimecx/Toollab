import React, { createContext, useState, useContext, ReactNode } from 'react';
import { showError, showSuccess } from '@/utils/toast';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: string, pass: string, code: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (user: string, pass: string, code: string) => {
    if (user === 'Animecx@admin' && pass === 'Mypass@2008' && code === '100100') {
      setIsAuthenticated(true);
      showSuccess('Login successful! Welcome, Admin.');
      return true;
    } else {
      showError('Invalid credentials. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};