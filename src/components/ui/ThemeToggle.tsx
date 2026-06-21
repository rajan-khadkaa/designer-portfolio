'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useThemeContext } from '@/providers/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === 'dark';

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className="theme-toggle-new group relative flex items-center justify-center w-9 h-9 transition-all duration-300 hover:scale-105 active:scale-95 text-black dark:text-white"
      aria-label="Toggle theme"
    >
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: isDark ? 40 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <mask id="theme-toggle-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <motion.circle
            animate={{
              cx: isDark ? 18 : 30,
              cy: isDark ? 6 : 0,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            r="9"
            fill="black"
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          animate={{ r: isDark ? 9 : 5 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          fill="currentColor"
          mask="url(#theme-toggle-mask)"
        />
        <motion.g
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.3 : 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{ originX: '12px', originY: '12px' }}
          stroke="currentColor"
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>
      </motion.svg>
    </button>
  );
}
