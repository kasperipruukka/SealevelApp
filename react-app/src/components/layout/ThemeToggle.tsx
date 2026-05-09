import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from '@/hooks/useTheme';

/** Teeman vaihtopainike — kuu/aurinko */
export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl hover:bg-sea-700/50 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
      aria-label={theme === 'dark' ? 'Vaihda vaaleaan teemaan' : 'Vaihda tummaan teemaan'}
    >
      {theme === 'dark' ? (
        <SunIcon className="w-6 h-6 text-amber-400" />
      ) : (
        <MoonIcon className="w-6 h-6 text-sea-600" />
      )}
    </button>
  );
};
