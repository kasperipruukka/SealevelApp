import { ThemeToggle } from './ThemeToggle';

interface AppShellProps {
  children: React.ReactNode;
}

/** Sovelluksen pääkehys — teema-hallinta + pohja */
export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="app-shell min-h-screen bg-sea-950 text-sea-50 transition-colors duration-300">
      {/* Teemapainike */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {children}
    </div>
  );
};
