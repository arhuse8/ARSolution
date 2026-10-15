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
      try {
        const saved = window.localStorage ? (localStorage.getItem('ar_solution_theme') as ThemeMode) : null;
        if (saved === 'midnight' || saved === 'dawn') return saved;
        // Default to dawn mode or check system preference safely
        if (typeof window.matchMedia === 'function') {
          const mq = window.matchMedia('(prefers-color-scheme: dark)');
          if (mq && typeof mq.matches === 'boolean') {
            return mq.matches ? 'midnight' : 'dawn';
          }
        }
      } catch (e) {
        // Safe fallback for mobile private browsing or webviews
        return 'dawn';
      }
    }
    return 'dawn';
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('ar_solution_theme', theme);
      }
    } catch (e) {
      // Ignore storage errors on private mobile browsing
    }
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
