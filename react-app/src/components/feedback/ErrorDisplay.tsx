import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

/** Virheilmoitus — selkeä ja toiminnallinen */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div
      className="bg-level-extreme/10 border border-level-extreme/30 rounded-2xl p-6 text-center"
      role="alert"
    >
      <ExclamationTriangleIcon className="w-12 h-12 text-level-extreme mx-auto mb-3" />
      <h3 className="text-lg font-bold text-sea-50 mb-1">{message}</h3>
      <p className="text-sm text-sea-400 mb-4">
        Tarkista verkkoyhteys ja yritä uudelleen.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-3 bg-foam-500 hover:bg-foam-400 text-sea-950 font-semibold rounded-xl transition-colors min-h-[48px]"
        >
          <ArrowPathIcon className="w-5 h-5" />
          Yritä uudelleen
        </button>
      )}
    </div>
  );
};
