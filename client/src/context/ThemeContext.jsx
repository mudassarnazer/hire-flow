/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const THEME_STORAGE_KEY = 'hireflow-theme';

export const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';

  // 1. Read from already-applied HTML data-theme (applied by index.html script)
  const domTheme = document.documentElement.dataset.theme;
  if (domTheme === 'light' || domTheme === 'dark') {
    return domTheme;
  }

  // 2. Fallback to localStorage
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // localStorage unavailable or restricted
  }

  // 3. Fallback to system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  // 4. Default fallback
  return 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  // Synchronize DOM data-theme attribute with state
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Synchronize with OS color scheme changes when no user preference is stored
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (!saved) {
          const nextTheme = e.matches ? 'dark' : 'light';
          document.documentElement.dataset.theme = nextTheme;
          setThemeState(nextTheme);
        }
      } catch {
        // Ignore storage access errors
      }
    };

    mediaQuery.addEventListener?.('change', handleSystemChange);
    return () => {
      mediaQuery.removeEventListener?.('change', handleSystemChange);
    };
  }, []);

  const setTheme = useCallback((nextTheme) => {
    if (nextTheme !== 'light' && nextTheme !== 'dark') {
      console.warn(`[ThemeContext] Invalid theme "${nextTheme}". Must be "light" or "dark".`);
      return;
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (err) {
      console.warn('[ThemeContext] Failed to persist theme to localStorage:', err);
    }

    document.documentElement.dataset.theme = nextTheme;
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const nextTheme = current === 'dark' ? 'light' : 'dark';

      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch (err) {
        console.warn('[ThemeContext] Failed to persist theme to localStorage:', err);
      }

      document.documentElement.dataset.theme = nextTheme;
      return nextTheme;
    });
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
