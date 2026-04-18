import useThemeStore from '../../store/themeStore';

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <button
      id="theme-toggle"
      onClick={toggleDarkMode}
      className="relative w-14 h-7 rounded-full bg-sand-200 dark:bg-dune-700 
                 transition-colors duration-300 focus:outline-none focus:ring-2 
                 focus:ring-desert-400/50 group"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full 
                    bg-white dark:bg-dune-900 shadow-md transform transition-transform 
                    duration-300 flex items-center justify-center text-sm
                    ${darkMode ? 'translate-x-7' : 'translate-x-0'}`}
      >
        {darkMode ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
