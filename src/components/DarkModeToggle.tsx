'use client';

import { useThemeStore } from '@/lib/stores/themeStore';
import styles from './DarkModeToggle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export function DarkModeToggle() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  return (
    <button
      className={styles.toggleButton}
      onClick={toggleDarkMode}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <FontAwesomeIcon icon={faSun} className={styles.icon} />
      ) : (
        <FontAwesomeIcon icon={faMoon} className={styles.icon} />
      )}
    </button>
  );
}
