import React from 'react';
import { useTheme } from '../theme/ThemeContext';
import ProfileMenu from './ProfileMenu';
import { Sun, Moon } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function HeaderControls() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const location = useLocation();
  const authHidePaths = ['/', '/login', '/register'];
  const isAuthPage = location && authHidePaths.includes(location.pathname);

  return (
    <div className="flex items-center gap-3">
      <button onClick={toggleTheme} aria-label="Toggle theme" className="grid h-10 w-10 place-items-center rounded-xl bg-foreground text-background shadow-lg transition-transform hover:scale-105">
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      {!isAuthPage && <ProfileMenu />}
    </div>
  );
}
