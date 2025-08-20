import { useEffect } from 'react';
import { initializeTheme } from '@/hooks/use-appearance';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // Initialize theme on mount
    initializeTheme();
  }, []);

  return <>{children}</>;
}