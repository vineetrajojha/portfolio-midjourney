import React, { useState, useCallback } from 'react';
import styles from './ThemeToggle.module.css';

const ThemeToggle = ({ theme, setTheme }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTheme = useCallback(() => {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);

    // Handle tooltip
    if (showTooltip) return; // Prevent multiple tooltips
    setShowTooltip(true);
    const timer = setTimeout(() => setShowTooltip(false), 1500);
    return () => clearTimeout(timer);
  }, [theme, setTheme, showTooltip]);

  const getIcon = useCallback(() => {
    switch (theme) {
      case 'light':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        );
      case 'dark':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        );
      case 'system':
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="12" rx="2"/>
            <path d="M8 18h8"/>
            <path d="M12 15v3"/>
          </svg>
        );
    }
  }, [theme]);

  return (
    <div className={styles.themeToggleContainer}>
      <button 
        className={`${styles.themeToggle} ${theme === 'light' ? styles.light : ''}`}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode`}
      >
        {getIcon()}
      </button>
      {showTooltip && (
        <div className={styles.tooltip}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)} Mode
        </div>
      )}
    </div>
  );
};

export default ThemeToggle; 