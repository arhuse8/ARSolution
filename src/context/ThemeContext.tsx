import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dawn' | 'midnight';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  isMidnight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ar_solution_theme') as ThemeMode;
      if (saved === 'midnight' || saved === 'dawn') return saved;
      // Default to dawn mode or check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'midnight' : 'dawn';
    }
    return 'dawn';
  });

  useEffect(() => {
    localStorage.setItem('ar_solution_theme', theme);
    const root = document.documentElement;
    if (theme === 'midnight') {
      root.classList.add('midnight', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('midnight', 'dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dawn' ? 'midnight' : 'dawn'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isMidnight: theme === 'midnight' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
