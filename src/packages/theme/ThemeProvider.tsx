import { createContext, useState, useMemo, useContext, useEffect, type ReactNode, useCallback } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme.config';

interface ThemeContextType {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const storedMode = localStorage.getItem('themeMode');
    return (storedMode as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  const value = useMemo(() => ({ toggleTheme, mode }), [mode, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
