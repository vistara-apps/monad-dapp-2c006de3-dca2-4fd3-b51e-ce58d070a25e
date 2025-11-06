'use client';

import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 retro:bg-[#0a0a0a] retro:border-2 retro:border-[#00ff41] border border-gray-300 dark:border-gray-600 w-[42px] h-[42px]" />
    );
  }

  const getThemeIcon = () => {
    if (theme === 'light') {
      return <MoonIcon className="w-5 h-5 text-gray-800" />;
    } else if (theme === 'dark') {
      return <span className="text-xl font-bold text-[#00ff41]">R</span>;
    } else {
      return <SunIcon className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getThemeLabel = () => {
    if (theme === 'light') return 'Switch to dark mode';
    if (theme === 'dark') return 'Switch to retro mode';
    return 'Switch to light mode';
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 retro:bg-[#0a0a0a] retro:border-2 retro:border-[#00ff41] retro:shadow-[0_0_10px_#00ff41] hover:bg-gray-300 dark:hover:bg-gray-700 retro:hover:shadow-[0_0_20px_#00ff41] transition-all duration-200 border border-gray-300 dark:border-gray-600"
      aria-label="Toggle theme"
      title={getThemeLabel()}
    >
      {getThemeIcon()}
    </button>
  );
}
