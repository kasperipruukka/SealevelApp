import { Navigation } from 'lucide-react';

interface WindCompassProps {
  degrees: number;
  name: string;
  arrow: string;
  className?: string;
}

/** Animoitu tuulen suuntaindikaattori – nuoli osoittaa mistä tuuli tulee */
export const WindCompass: React.FC<WindCompassProps> = ({ degrees, name, className = '' }) => {
  // Navigation-ikoni osoittaa oletuksena 45° koilliseen → kompensoidaan -45°
  const rotation = degrees + 180 - 45;
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`} aria-label={`Tuulen suunta: ${name}`}>
      <Navigation
        className="w-5 h-5 text-foam-500 transition-transform duration-300 fill-foam-500/30"
        style={{ transform: `rotate(${rotation}deg)` }}
        aria-hidden="true"
      />
      <span className="text-[8px] sm:text-[10px] leading-none font-medium opacity-50">{name}</span>
    </div>
  );
};
