import React, { createContext, useContext, useState, useEffect } from "react";

export const THEMES = {
  dark: {
    name: "Dark",
    icon: "◑",
    bg: "#020408",
    bgGrad: "radial-gradient(ellipse at 20% 50%, #0a0f1e 0%, #020408 60%), radial-gradient(ellipse at 80% 20%, #0d0520 0%, transparent 50%)",
    primary: "#00d4ff",
    secondary: "#7b2fff",
    accent: "#ff2d78",
    text: "#e2e8f0",
    muted: "#4a5568",
    cardBg: "rgba(10,15,30,0.85)",
    border: "rgba(0,212,255,0.3)",
    particleColor: "#00d4ff",
  },
  original: {
    name: "Original",
    icon: "◈",
    bg: "#000",
    bgGrad: "radial-gradient(ellipse at 50% 50%, #0a0015 0%, #000 70%)",
    primary: "#ff00ff",
    secondary: "#00ffff",
    accent: "#ffff00",
    text: "#e0e0e0",
    muted: "#555",
    cardBg: "rgba(0,0,0,0.8)",
    border: "rgba(255,0,255,0.3)",
    particleColor: "#ff00ff",
  },
  light: {
    name: "Light",
    icon: "○",
    bg: "#f0f4ff",
    bgGrad: "radial-gradient(ellipse at 30% 40%, #dbeafe 0%, #f0f4ff 60%), radial-gradient(ellipse at 70% 60%, #ede9fe 0%, transparent 50%)",
    primary: "#4f46e5",
    secondary: "#7c3aed",
    accent: "#db2777",
    text: "#1e1b4b",
    muted: "#6b7280",
    cardBg: "rgba(255,255,255,0.9)",
    border: "rgba(79,70,229,0.3)",
    particleColor: "#4f46e5",
  },
  peaceful: {
    name: "Peaceful",
    icon: "◯",
    bg: "#0a0f14",
    bgGrad: "radial-gradient(ellipse at 40% 60%, #0d1f2d 0%, #0a0f14 70%), radial-gradient(ellipse at 60% 30%, #162032 0%, transparent 50%)",
    primary: "#67e8f9",
    secondary: "#a5f3fc",
    accent: "#7dd3fc",
    text: "#e0f2fe",
    muted: "#4b7a8a",
    cardBg: "rgba(10,15,20,0.85)",
    border: "rgba(103,232,249,0.25)",
    particleColor: "#67e8f9",
  },
  nature: {
    name: "Nature",
    icon: "◇",
    bg: "#030a04",
    bgGrad: "radial-gradient(ellipse at 30% 70%, #071a09 0%, #030a04 60%), radial-gradient(ellipse at 70% 20%, #0d2410 0%, transparent 50%)",
    primary: "#4ade80",
    secondary: "#86efac",
    accent: "#fbbf24",
    text: "#d1fae5",
    muted: "#4a7055",
    cardBg: "rgba(3,10,4,0.85)",
    border: "rgba(74,222,128,0.3)",
    particleColor: "#4ade80",
  },
  hacker: {
    name: "Hacker",
    icon: "▣",
    bg: "#000500",
    bgGrad: "radial-gradient(ellipse at 50% 50%, #001200 0%, #000500 70%)",
    primary: "#00ff41",
    secondary: "#00cc33",
    accent: "#39ff14",
    text: "#ccffcc",
    muted: "#1a4d1a",
    cardBg: "rgba(0,5,0,0.9)",
    border: "rgba(0,255,65,0.25)",
    particleColor: "#00ff41",
  },
  cyberpunk: {
    name: "Cyberpunk",
    icon: "◆",
    bg: "#04010f",
    bgGrad: "radial-gradient(ellipse at 20% 80%, #1a0033 0%, #04010f 60%), radial-gradient(ellipse at 80% 20%, #001a2e 0%, transparent 50%)",
    primary: "#f0ff00",
    secondary: "#ff0080",
    accent: "#00fff9",
    text: "#fff5cc",
    muted: "#5a4a00",
    cardBg: "rgba(4,1,15,0.9)",
    border: "rgba(240,255,0,0.3)",
    particleColor: "#f0ff00",
  },
  alien: {
    name: "Alien",
    icon: "◉",
    bg: "#000d08",
    bgGrad: "radial-gradient(ellipse at 40% 50%, #001a10 0%, #000d08 60%), radial-gradient(ellipse at 80% 30%, #0a1500 0%, transparent 60%)",
    primary: "#39ff9a",
    secondary: "#00ffd5",
    accent: "#b4ff00",
    text: "#ccffe8",
    muted: "#1a4d33",
    cardBg: "rgba(0,13,8,0.9)",
    border: "rgba(57,255,154,0.3)",
    particleColor: "#39ff9a",
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState("dark");
  const theme = THEMES[themeName];

  useEffect(() => {
    const saved = localStorage.getItem("hf_theme");
    if (saved && THEMES[saved]) setThemeName(saved);
  }, []);

  const setTheme = (name) => {
    setThemeName(name);
    localStorage.setItem("hf_theme", name);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}