interface WindCompassProps {
  degrees: number;
  name: string;
  arrow: string;
  className?: string;
}

/** Animoitu tuulen suuntaindikaattori */
export const WindCompass: React.FC<WindCompassProps> = ({ degrees, name, className = '' }) => {
  return (
    <div className={`flex items-center gap-1.5 ${className}`} aria-label={`Tuulen suunta: ${name}`}>
      <span
        className="inline-block text-lg transition-transform duration-300"
        style={{ transform: `rotate(${degrees + 90}deg)` }}
        aria-hidden="true"
      >
        ➤
      </span>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
};
