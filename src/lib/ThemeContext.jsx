import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = {
  dark: {
    name: 'Dark',
    emoji: '🌑',
    vars: {
      '--background': '240 15% 4%',
      '--foreground': '210 40% 96%',
      '--card': '240 12% 8%',
      '--card-foreground': '210 40% 96%',
      '--primary': '190 100% 60%',
      '--primary-foreground': '240 15% 4%',
      '--secondary': '270 80% 65%',
      '--secondary-foreground': '210 40% 96%',
      '--muted': '240 10% 14%',
      '--muted-foreground': '210 20% 55%',
      '--accent': '320 80% 60%',
      '--accent-foreground': '210 40% 96%',
      '--border': '240 10% 18%',
      '--input': '240 10% 18%',
      '--ring': '190 100% 60%',
    }
  },
  light: {
    name: 'Light',
    emoji: '☀️',
    vars: {
      '--background': '0 0% 98%',
      '--foreground': '240 10% 10%',
      '--card': '0 0% 100%',
      '--card-foreground': '240 10% 10%',
      '--primary': '200 100% 40%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '270 60% 55%',
      '--secondary-foreground': '0 0% 100%',
      '--muted': '210 20% 92%',
      '--muted-foreground': '215 20% 45%',
      '--accent': '320 70% 50%',
      '--accent-foreground': '0 0% 100%',
      '--border': '214 20% 85%',
      '--input': '214 20% 85%',
      '--ring': '200 100% 40%',
    }
  },
  cyberpunk: {
    name: 'Cyberpunk',
    emoji: '⚡',
    vars: {
      '--background': '0 0% 2%',
      '--foreground': '60 100% 85%',
      '--card': '280 30% 6%',
      '--card-foreground': '60 100% 85%',
      '--primary': '60 100% 50%',
      '--primary-foreground': '0 0% 0%',
      '--secondary': '300 100% 50%',
      '--secondary-foreground': '0 0% 0%',
      '--muted': '280 20% 12%',
      '--muted-foreground': '60 50% 55%',
      '--accent': '180 100% 50%',
      '--accent-foreground': '0 0% 0%',
      '--border': '300 50% 20%',
      '--input': '300 50% 20%',
      '--ring': '60 100% 50%',
    }
  },
  nature: {
    name: 'Nature',
    emoji: '🌿',
    vars: {
      '--background': '140 20% 6%',
      '--foreground': '120 30% 90%',
      '--card': '140 18% 10%',
      '--card-foreground': '120 30% 90%',
      '--primary': '142 70% 45%',
      '--primary-foreground': '0 0% 0%',
      '--secondary': '90 60% 40%',
      '--secondary-foreground': '0 0% 100%',
      '--muted': '140 12% 16%',
      '--muted-foreground': '140 20% 55%',
      '--accent': '50 80% 50%',
      '--accent-foreground': '0 0% 0%',
      '--border': '140 20% 20%',
      '--input': '140 20% 20%',
      '--ring': '142 70% 45%',
    }
  },
  universe: {
    name: 'Universe',
    emoji: '🌌',
    vars: {
      '--background': '240 50% 3%',
      '--foreground': '220 80% 95%',
      '--card': '240 40% 7%',
      '--card-foreground': '220 80% 95%',
      '--primary': '270 100% 75%',
      '--primary-foreground': '240 50% 3%',
      '--secondary': '200 100% 65%',
      '--secondary-foreground': '240 50% 3%',
      '--muted': '240 30% 12%',
      '--muted-foreground': '220 40% 60%',
      '--accent': '320 100% 70%',
      '--accent-foreground': '240 50% 3%',
      '--border': '240 30% 18%',
      '--input': '240 30% 18%',
      '--ring': '270 100% 75%',
    }
  },
  sunset: {
    name: 'Sunset',
    emoji: '🌅',
    vars: {
      '--background': '20 30% 5%',
      '--foreground': '30 80% 92%',
      '--card': '20 25% 9%',
      '--card-foreground': '30 80% 92%',
      '--primary': '25 100% 60%',
      '--primary-foreground': '0 0% 0%',
      '--secondary': '350 80% 55%',
      '--secondary-foreground': '0 0% 100%',
      '--muted': '20 15% 15%',
      '--muted-foreground': '30 40% 55%',
      '--accent': '45 100% 55%',
      '--accent-foreground': '0 0% 0%',
      '--border': '20 20% 20%',
      '--input': '20 20% 20%',
      '--ring': '25 100% 60%',
    }
  },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('fy-theme') || 'dark');

  useEffect(() => {
    const vars = THEMES[theme]?.vars || THEMES.dark.vars;
    const root = document.documentElement;
    Object.entries(vars).forEach(([key, val]) => root.style.setProperty(key, val));
    localStorage.setItem('fy-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);